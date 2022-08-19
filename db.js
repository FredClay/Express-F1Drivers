const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/f1-api', { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err);
  return console.log('Connection successful!');
});

// Driver @Entity
const driverSchema = new Schema({
  name: {
    type: String,
    min: 2,
  },
  nationality: String,
  age: {
    type: Number,
    min: 18,
    max: 50,
  },
  height: {
    type: Number,
    min: 140,
    max: 200,
  },
});

// Team @Entity
const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  homeCountry: String,
  yearFounded: {
    type: Number,
    min: 1950,
    max: new Date().getFullYear(),
  },
  teamPrincipal: String,
});

const Driver = mongoose.model('driver', driverSchema);
const Team = mongoose.model('team', teamSchema);

module.exports = { Team, Driver };
