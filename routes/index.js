var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
module.exports = router;
var fieldbook = require('node-fieldbook');

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

router.get('/', function (req, res, next) {
  book.getSheet(sheet)
  .then(function(data) {
    var cleanedCourses = data.map(function (item) {
      return {course: item.course, city: item.city, state: item.state};
    });
    res.render('index', {courses: cleanedCourses});
  })
  .catch(function(err) {console.log(err);});
});


// router.get('/:course', function (req, res, next) {
//   book.getSheet(sheet, {course: req.params.course})
//   .then(function(data) {{res.status(200).json(data);}})
//   .catch(function(err) {console.log(err);});
// });

router.get('/:course', function (req, res, next) {
  book.getSheet(sheet, {course: req.params.course})
  .then(function (data) {
    res.render('course', {course: data[0]});
  })
  .catch(function(err) {console.log(err);});
});
