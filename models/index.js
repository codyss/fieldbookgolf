var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/golfdemo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var courseSchema = new Schema({
  name: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  address: String,
  par: Number,
  course_rating: Number,
  slope_rating: Number,
  holes: Number,
  yardage: Number,
  phone: String,
  website: String
});

var playerSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, require: true, unique: true},
  handicap: Number,
  age: Number
});

var scoreSchema = new Schema({
  score: Number,
  differential: Number,
  course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
  player: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
});


var Course = mongoose.model('Course', courseSchema);
var Player = mongoose.model('Player', playerSchema);
var Score = mongoose.model('Score', scoreSchema);

module.exports = {
  Course: Course,
  Player: Player,
  Score: Score
};



