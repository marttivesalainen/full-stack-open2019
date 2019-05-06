const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected');
  })
  .catch(error => {
    console.log('Error:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: String,
  minlength: 8,
  required: true
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
