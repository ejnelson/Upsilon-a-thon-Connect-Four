var express = require("express");
var router = express.Router();
var User = require('../../models/user');


router.get('/senderInfo/:username', function (req, res) {
  console.log('req.params.username',req.params.username);
  User.find({username:req.params.username}, function (err, profileObject) {
      console.log('what is in profileObject',profileObject);
    res.send(profileObject);

  });
});
router.get('/', function (req, res) {
  console.log('req.user.id',req.user.id);
  User.find({_id:req.user.id}, function (err, profileObject) {
      console.log('what is in profileObject',profileObject);
    res.send(profileObject);

  });
});

router.get('/senderInfo/:username', function (req, res) {
  console.log('req.params.username',req.params.username);
  User.find({username:req.params.username}, function (err, profileObject) {
      console.log('what is in profileObject',profileObject);
    res.send(profileObject);

  });
});

//
// router.post('/', function (req, res) {
//   console.log('Req body', req.body);
//   var person = new User(req.body);
//
//   person.save(function (err) {
//     if (err) {
//       console.log('Error saving', err);
//       res.sendStatus(500);
//       return;
//     }
//
//     res.sendStatus(201); //created
//   });
// });
//
//
router.put('/', function (req, res) {
  console.log('req.body',req.body);
  console.log('req.user.id',req.user.id);
  var id = req.user.id;

  // User.findByIdAndUpdate(id, person,function (err) {
    User.update(
      {_id:id},
      {firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      bio:req.body.bio},
    function(err){
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
  });
});
//
//
// router.delete('/:id', function (req, res) {
//   var id = req.params.id;
//   console.log('id received', id);
//   User.findByIdAndRemove(id, function (err) {
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }
//
//       res.sendStatus(204);
//   });
// });

module.exports = router;
