const mongoose = require('mongoose');
// const bcrypt=require('bcrypt');
// const SALT_ROUNDS=10;

const messagesSchema= new mongoose.Schema({
  text:String,
  sender:String,
  date:Date,
  pic:String,
  gif:String
});

const roomSchema = new mongoose.Schema({
  users: Array,
  usernames:Array,
  messages:[messagesSchema]
});


//ensure each time a user is saved that we hash the Password
// roomSchema.pre('save',function(done){
//   var user=this;
//   console.log('checking if password is modified');
//
//   if(user.isModified('password')){
//     console.log('password is modified');
//     bcrypt.hash(user.password,SALT_ROUNDS,function(err,hash){
//       if(err){
//         console.log('error hashing password',err);
//         return done(err);
//       }
//       user.password=hash;
//       done();
//       console.log('succesfully hashed password');
//     });
//   }else{
//     console.log('password is not modified');
//     done();
//   }
// });
//
// userSchema.methods.comparePassword=function(password,done){
//   var user=this;
//   bcrypt.compare(password,user.password,function(err,match){
//     if(err){
//       console.log('error comparing password',err);
//       done(err);
//     }else{
//       done(null,match);
//     }
//
//   });
// }

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
