var express = require("express");
var router = express.Router();
var Room = require('../../models/room');


router.get('/:id', function (req, res) {
  console.log(req.params.id);
  Room.findById(req.params.id, function (err, roomObject) {
      // console.log('what is in foundRoom',roomObject);
    if (err) {
      res.sendStatus(500);
    }else{

      res.status(200).send(roomObject);
    }

  });
});



module.exports = router;
