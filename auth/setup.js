var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');



passport.use('local',new LocalStrategy({
  usernameField:'username', // req.body.username
  passwordField:'password' //req.body.password
},findAndComparePassword));

//user object changed to just userID
passport.serializeUser(function(user,done){
  console.log('serializing user');
  done(null,user.id);
});

//userId changed to user object
passport.deserializeUser(function(id,done){
  console.log('deserializing user');
  User.findById(id,function(err,user){
    if (err){
      console.log('error deserializing user',err);
      return done(err);
    }
    done(null,user);
  })
});


function findAndComparePassword(username,password,done){
  console.log('finding and comparing password');
  User.findOne({username:username},function(err,user){
    if (err){
      console.log('error finding user by username',err);
      return done(err);
    }
    if(user){
      console.log('found a user with username',username);

      user.comparePassword(password,function(err,match){
        if(err){
          console.log('error comparing passwords again');
          done(err);
        }else{
          if(match){
            console.log('passwords match');
            done(null,user);
          }else{
            console.log('passwords did not match');
            done(null,false);
          }
        }
      });
    }else{
    console.log('passwords did not match or user was not found');
    //if password or username doesn't match, pass false to done(), user won't be logged in
    return done(null,false);
    }
  });

}
