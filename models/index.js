var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/teetimes');

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






