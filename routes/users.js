var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
module.exports = router;
var teetimes = require('../teetimes/lib/teetimes');
var models = require('../models');
var Course = models.Course;
var Score = models.Score;
var Player = models.Player;
var Promise = require('bluebird');



//router to post a score
router.get('/post', function (req, res, next) {
  res.render('postscore', {course: req.query.course});
});


router.get('/profile/:playerId', function (req, res, next) {
  
  var player = Player.findById(req.params.playerId).exec();
  var scores = Score.find({player:req.params.playerId}).populate('course').exec();

  Promise.all([player, scores])
  .spread(function(playerObj, scoresArr) {
    // res.json(playerObj, scoresArr);
    res.render('profile', {player: playerObj, scores: scoresArr});
  });
});



router.post('/post', function (req, res, next) {
  var coursePlayed = Course.findOne({name: req.body.course});
  var playerPosting = Player.findOrCreate({
    name: req.body.name,
    email: req.body.email
    });

  Promise.all([coursePlayed, playerPosting]).spread(function (course, player) {
    var differential = Math.round(((req.body.score-course.course_rating)*115/course.slope_rating)*100)/100;
    var postScore = new Score({
      score: req.body.score,
      course: course._id, 
      differential: differential,
      player: player._id
    });
    return postScore.save();
  })
  // .then(function(score) {
  //   updateHandicap(score);
  // })
  .then(function(score) {
    //Redirecting to a user's page of scores
    
    res.redirect('/users/profile/' + score.player);
  }).then(null, function(err) {console.log(err);});
});


// function updateHandicap (score) {
//   console.log(score);
//   console.log('Accessed');
//   var playerToUpdate = Player.findOne({ _id: score.player }).exec()
//         .then(function(player) {
//           Score.find({player: player._id}).exec();
//         })
//         .then(function (scores) {
//             if (scores.length === 0) {
//                 return playerToUpdate;
//             } else {
//                 var total_diff =  scores.reduce(function(a, b) {
//                   return a.differential + b.differential;
//                 });
//                 var updatedHandicap = total_diff / scores.length;
//                 console.log("handicap:" + updatedHandicap);
//                 Player.findOne({email: playerToUpdate.email})
//                 .then(function (doc) {
//                     doc.handicap = updatedHandicap;
//                     doc.save();
//                 });
//             }
//         });
//   return score;  
// }

function updateHandicap2 (player) {
    Score.find({player: player._id}).exec()
        .then(function (scores) {
            if (scores.length === 0) {
                return playerToUpdate;
            } else {
                var total_diff =  scores.reduce(function(a, b) {
                  return a.differential + b.differential;
                });
                var updatedHandicap = total_diff / scores.length;
                console.log("handicap:" + updatedHandicap);
                Player.findOne({email: playerToUpdate.email})
                .then(function (doc) {
                    doc.handicap = updatedHandicap;
                    doc.save();
                });
            }
        });
}
