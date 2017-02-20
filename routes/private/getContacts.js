var express = require("express");
var router = express.Router();
var User = require('../../models/user');


router.get('/', function (req, res) {
  console.log('getting contacts from db');
  User.findById(req.user.id,'contacts', function (err, contactsArray) {
      console.log('what is in contactsArray',contactsArray+' '+contactsArray.length);
    res.send(contactsArray);

  });
});

router.get('/getContactsData', function (req, res) {
  console.log('getting contacts Data from db',req.query.contacts);
  var query=JSON.parse(req.query.contacts);
  // console.log(Array.isArray(query));//used to find out that the original req.query needed a JSON.parse
  User.find({username:{$in:query}}, function (err, contactsArray) {
    if(err){
      console.log('error finding contacts Data',err);
      return;
    }else{
      console.log('what is in contactsArray',contactsArray+' '+contactsArray.length);
      res.send(contactsArray);
    }
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
