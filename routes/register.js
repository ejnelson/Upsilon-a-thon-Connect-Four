var router=require('express').Router();
var User=require('../models/user');


router.post('/',function(req,res){

  User.findOne({username:req.body.username},function(err,user){
    if(err){
      return res.sendStatus(500);
    }
    if(user){
      return res.status(400).send('username already taken');
    }

    var user= new User({
      username:req.body.username,
      password:req.body.password
    });

    user.save(function(err){
      if(err){
        console.log('error saving new user');
        res.status(400).send('username and password required');
      }else{
        console.log('created new user');

        req.login(user, function(err){
          if(err){
            console.log('error logging in newly registered usser',err);
            return res.sendStatus(400);
          }
        });

        res.sendStatus(201);
      }
    });

  });
});




module.exports=router;
