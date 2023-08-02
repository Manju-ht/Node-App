var express = require('express');
var router = express.Router();
//const {app} = require('../app')
const passport = require('passport')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



module.exports = router;
