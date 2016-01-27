var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
module.exports = router;
var fieldbook = require('node-fieldbook');
var Kimono = require('kimono');
var teetimes = require('../teetimes/lib/teetimes');
var models = require('../models');
var Course = models.Course;
var Score = models.Score;
var Player = models.Player;


var kimono = new Kimono('REK0Ffj1XIg1BhGMU3wDHLBv9kQbB2ur');


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log(req.path, req.method);
    next();
});

var sheet = 'nyccourses';

var book = new fieldbook({
            username: 'key-1',
            password: 'w8vy4ZJcVEtBvzUGkm3V',
            book: '56a3cf62986e730300c844f4'
            });

var course;


//KIMONO TEE TIMES
function courseName() {
    for (var i = 0; i < this.cleanTimes.length; i++) {
        this.cleanTimes[i]['course'] = courseKey[this.cleanTimes[i]['course']];
    }
};




router.get('/', function (req, res, next) {
  Course.find()
  .then(function(data) {
    var cleanedCourses = data.map(function (item) {
      return {name: item.name, city: item.city, state: item.state};
    });
    res.render('index', {courses: cleanedCourses});
  })
  .then(null, function(err) {console.log(err);});
});

//route to bring to page to add courses
router.get('/add', function (req, res, next) {
  res.render('addcourse');
});

//OLD calls from Fieldbook
// router.get('/:course', function (req, res, next) {
//   book.getSheet(sheet, {course: req.params.course})
//   .then(function (data) {
//     res.render('course', {course: data[0]});
//   })
//   .catch(function(err) {console.log(err);});
// });


//router to post a score
router.get('/post', function (req, res, next) {
  res.render('postscore', {course: req.query.course});
});


//New Course get method that pulls in data from mongo
router.get('/:course', function (req, res, next) {
  Course.findOne({name: req.params.course})
  .then(function(course){
      res.render('course', {course});
    })
  .then(null, function(err) {
    console.log(err);
  });
});


router.get('/:course/teetimes', function (req, res, next) {
  kimono.retrieve('4ujite74', {
  kimlimit: 1500
}, function (err, data) {
    var times = new teetimes(data.results.collection1);
    times.cleaning();
    times.filterForCourse(req.params.course);

  res.render('teetimes', {teetimes: times.searchCourseTimes});
  // res.json(times.searchCourseTimes); 
});
});

router.post('/add', function (req, res, next) {
  console.log(req.body);
  var courseToPost = new Course(req.body);
  return courseToPost.save().then(res.redirect('/'));
});


//Post the score, where course name is send in the POST body
router.post('/post', function (req, res, next) {
  console.log(req.body);
  Course.findOne({name: req.body.course})
  .then(function (course) {
    var differential = (req.body.score-course.course_rating)*115/course.slope_rating;
    var postScore = new Score({
      score: req.body.score,
      course: course._id, 
      differential: differential
    });
    return postScore.save();
  })
  .then(function(score) {
    //SHOULD BE CHANGED TO REDIRECT TO A USER'S PROFILE
    res.redirect('/');
  }).then(null, function(err) {console.log(err);});
});



