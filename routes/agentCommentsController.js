var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var userName = req.body.userName;
    var ticketNo = req.body.ticketNo;
    var payload = {};
    payload.title = 'Comments';
    payload.userName = userName;
    payload.ticketNo = ticketNo;
    res.render('newComment', {data: payload});
});

router.post('/', function (req, res, next) {
    res.render('index', {title: 'Comments [POST]'});
});


module.exports = router;
