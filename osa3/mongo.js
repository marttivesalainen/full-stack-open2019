const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-srz0u.mongodb.net/phonebook?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('Auth error');
  } else {
    console.log('Authenticated...');
  }
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person
    .save()
    .then(() => {
      console.log('Person saved');
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(error);
    });
} else if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    });
}
