var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.get('/test', function(req, res, next) {
  //res.send('testtest');
  res.sendfile(path.resolve( __dirname + '/../views/Test.html'));
});

module.exports = router;