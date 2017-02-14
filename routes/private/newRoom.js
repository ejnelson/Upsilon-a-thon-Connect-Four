var express = require("express");
var router = express.Router();
var Room = require('../../models/room');

router.get('/', function (req, res) {
  console.log(req.user.id);
  Room.find({users:{$in:[req.user.id]}}, function (err, foundRoom) {
      console.log('what is in foundRoom',foundRoom);
    if (err) {
      res.sendStatus(500);
    }else{

      res.status(200).send(foundRoom);
    }

  });
});



router.post('/', function (req, res) {
  console.log(req.body);
  console.log(req.user.id);
 var usersObject=req.body;
  usersObject.users.push(req.user.id);
  console.log(usersObject);

  var room = new Room(usersObject);

  room.save(function (err,roomstuff) {
    if (err) {
      console.log('Error saving', err);
      res.sendStatus(500);
      return;
    }

      res.status(201).send(roomstuff);
  });
});

//
// router.put('/', function (req, res) {
//   console.log('req.body',req.body);
//   console.log('req.user.id',req.user.id);
//   var id = req.user.id;
//
//   // User.findByIdAndUpdate(id, person,function (err) {
//     User.update(
//       {_id:id},
//       {$push:{contacts:req.body.contact}},
//     function(err){
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }
//
//       res.sendStatus(204);
//   });
// });
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
