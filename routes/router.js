var express = require("express");

var pg = require("pg");
var config = { database: "chatapp" };
var router = express.Router();
// initialize connection Pool
// think of as 'how I connect to DB'
var pool = new pg.Pool(config);





module.exports = router;
