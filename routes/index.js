var express = require('express');
var router = express.Router();
var path = require('path');

var AppController = require('../controllers/appController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.get('/test', function(req, res, next) {
  //res.send('testtest');
  res.sendfile(path.resolve( __dirname + '/../views/Test.html'));
});



router.get('/Part1', function(req, res, next) {
  
  res.send('<p style="white-space:pre-line;">' + AppController.partOne() + '</p>');

  //res.sendfile(path.resolve( __dirname + '/../views/Part1.html'));
});

router.get('/Part2', function(req, res, next) {
  res.send('<p style="white-space:pre-line;">' + AppController.partTwo() + '</p>');
});

router.post('/Part3/Price', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send( JSON.stringify(AppController.getPrices(req.body)));
});

router.post('/Part3/Dist', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send( JSON.stringify(AppController.getDistributions(req.body)));
});

module.exports = router;