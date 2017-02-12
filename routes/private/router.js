var express = require("express");
var router = express.Router();
var User = require('../../models/user');

router.get('/:username', function (req, res) {
  console.log(req.params.username);
  User.find({username:req.params.username}, function (err, foundArray) {
      console.log('what is in foundArray',foundArray+' '+foundArray.length);
    if (typeof foundArray[0] !== 'undefined' && foundArray[0] !== null) {
      res.send(true);
    }else{

      res.send(false);
    }

  });
});



router.post('/', function (req, res) {
  console.log('Req body', req.body);
  var person = new User(req.body);

  person.save(function (err) {
    if (err) {
      console.log('Error saving', err);
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201); //created
  });
});


router.put('/', function (req, res) {
  console.log('req.body',req.body);
  console.log('req.user.id',req.user.id);
  var id = req.user.id;

  // User.findByIdAndUpdate(id, person,function (err) {
    User.update(
      {_id:id},
      {$push:{contacts:req.body.contact}},
    function(err){
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
  });
});


router.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log('id received', id);
  User.findByIdAndRemove(id, function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
  });
});

module.exports = router;
