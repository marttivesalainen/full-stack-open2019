const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Person = require('./models/person');

if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  app.use(cors());
}

app.use(bodyParser.json());

// Serve client as static files
app.use(express.static('./client/build'));

// Logger properites
morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// API endpoints
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(result => {
      return response.json(result.map(person => person.toJSON()));
    })
    .catch(() => {
      response.status(500);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  if (request.body.name === undefined) {
    return response.status(400).json({ error: 'name missing' });
  }

  const person = new Person({
    ...request.body
  });

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  if (request.body.name === undefined) {
    return response.status(400).json({ error: 'name missing' });
  }

  Person.findOneAndUpdate(request.params.id, { ...request.body }, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(
      `<p>Puhelinluettelossa on ${
        result.length
      } henkilön tiedot.</p><p>${new Date()}`
    );
  });
});

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.errors.name.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
