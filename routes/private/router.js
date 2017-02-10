var express = require("express");
var router = express.Router();
var Person = require('../../models/user');

router.get('/', function (req, res) {
  Person.find({}, function (err, persons) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(persons);
  });
});

router.post('/', function (req, res) {
  console.log('Req body', req.body);
  var person = new Person(req.body);

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
  console.log('help');
  var id = req.body._id;
  var person = new Person(req.body);
  console.log('id received', id);
  Person.findByIdAndUpdate(id, person,function (err) {
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
  Person.findByIdAndRemove(id, function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
  });
});

module.exports = router;
