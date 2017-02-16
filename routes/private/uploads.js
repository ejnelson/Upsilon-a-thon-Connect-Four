// var express = require('express');
// var router = express.Router();
// var fs = require('fs');
// var Upload = require('../../models/upload');
// var Room = require('../../models/room');
// var multer = require('multer');
//
// var multerS3 = require('multer-s3');
// var aws = require('aws-sdk');
// var s3 = new aws.S3();
//
// var express = require('express');
// var app=express();
// var http = require('http').Server(app);
// // var server = require('http').Server(app);
// var io = require('socket.io')(http);
//
// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.S3_BUCKET_NAME,//alternately, if you are not using a .env file you can just use a string for the name of your bucket here, 'your-bucket-name'
//     acl: 'public-read',//default is private, set to public-read is so the public can view your pictures
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
//
// });
// io.on('connection', function(socket){
//
//   var room = socket.handshake['query']['r_var'];
//   socket.join(room);
//   console.log('user joined room #'+room);
//
//   socket.on('disconnect', function() {
//     socket.leave(room);
//     socket.disconnect();
//     socket.disconnect(true);
//     console.log('user disconnected');
//
//   });
// });
// //upload.single('file') is the line that uploads to AWS, the rest is MongoDB
//   router.post('/', upload.single('file'), function(req, res) {
//     console.log('here is the req.body',req.body);
//
//     var msgObject={
//       date: Date.now(),
//       file: req.file,
//       text: req.body.text,
//       roomId:req.body.roomId,
//       sender:req.user.username
//     };
//     io.to(req.body.roomId).emit('chat message', msgObject);
//
//     Room.update(
//       {_id:req.body.roomId},
//       {$push:{messages:{
//         text:req.body.text,
//         sender:req.user.username,
//         date:Date.now(),
//         pic:req.file
//       }}},
//       function(err){
//         if (err) {
//           console.log(err);
//           res.sendStatus(500);
//         } else {
//           return;
//           // res.send(newUpload);
//         }
//       });
//   });
//
//   //gets all the uploads recorded in the database
//   router.get('/', function (req, res) {
//     Upload.find({}, function (err, data) {
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }
//       res.send(data);
//     });
//    });
//
//
//
//
//
// module.exports = router;
