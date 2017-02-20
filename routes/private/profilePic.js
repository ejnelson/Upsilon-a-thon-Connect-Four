var express = require("express");
var router = express.Router();
var User = require('../../models/user');


router.get('/', function (req, res) {
  console.log('getting profile from db');
  User.findById(req.user.id, function (err, profile) {
      console.log('what is in profile',profile);
    res.send(profile);

  });
});


module.exports = router;
