var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("getting home page"+__dirname);
 // res.render('index', { title: 'Express' });
    // res.sendFile(__dirname + "/index.html" );
    res.sendFile("app/views/index.html");
});

module.exports = router;
