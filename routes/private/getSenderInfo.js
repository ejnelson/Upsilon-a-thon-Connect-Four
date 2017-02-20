var express = require("express");
var router = express.Router();
var User = require('../../models/user');




router.get('/:username', function (req, res) {

  console.log('req.params.username',req.params.username);
  User.find({username:req.params.username}, function (err, profileObject) {
      console.log('what is in profileObject',profileObject);
    res.send(profileObject);

  });
});





module.exports = router;
