const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const SALT_ROUNDS=10;



const userSchema = new mongoose.Schema({
  username: String,
  password: String
});


//ensure each time a user is saved that we hash the Password
userSchema.pre('save',function(done){
  var user=this;
  console.log('checking if password is modified');

  if(user.isModified('password')){
    console.log('password is modified');
    bcrypt.hash(user.password,SALT_ROUNDS,function(err,hash){
      if(err){
        console.log('error hashing password',err);
        return done(err);
      }
      user.password=hash;
      done();
      console.log('succesfully hashed password');
    });
  }else{
    console.log('password is not modified');
    done();
  }
});

userSchema.methods.comparePassword=function(password,done){
  var user=this;
  bcrypt.compare(password,user.password,function(err,match){
    if(err){
      console.log('error comparing password',err);
      done(err);
    }else{
      done(null,match);
    }

  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
