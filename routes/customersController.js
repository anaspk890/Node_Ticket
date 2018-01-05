var express = require('express');
var router = express.Router();
var customerModel = require('../models/customersModel');

/* GET home page. */
router.get('/', function (req, res, next) {

    var data = req;
    customerModel.getCustomers(data, function (err, result) {
        res.render('customers', {title: 'Customers', customers: result.customersList});
    });
});

module.exports = router;
