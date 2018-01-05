var express = require('express');
var router = express.Router();
var customer = require('../models/customersModel');
var agents = require('../models/serviceAgentModel');
var ticket = require('../models/serviceTicketModel');

/* GET home page. */
router.get('/', function (req, res, next) {
    var payload = {};
    payload.agent = {};
    payload.title = 'New Tickets';
    customer.getCustomers(req, function (err, result) {
        payload.customersList = result.customersList;
        payload.agent.userName = 'agent1';
        res.render('newTicket', {data: payload});
    });
});

router.post('/', function (req, res, next) {
    var body = req.body;
    var data = {};
    var resp = res;
    data.ticketNo = Math.random();
    data.area = body.area;
    data.createdBy = body.createdBy;
    data.comments = body.agentComments;
    data.assignedTo = body.assignedTo;
    data.status = data.assignedTo == "" ? "new" : "open";
    data.agentComments = body.agentComments;
    ticket.insertTicket(data, function (err, result) {
        if (err == null) {
            renderTickets(result, resp);
        }
        else {
            res.render('newTicket', {data: body});
        }
    });

});

router.get('/show', function (req, res, next) {
    renderTickets(req, res);
});

var renderTickets = function (data, resp) {
    var model = {};//preserve data
    var payload = {};
    ticket.getTicketsInfo(data, function (err, result) {
        if (err == null) {
            payload.resultList = result.resultList;
            payload.title = 'Tickets List';
            payload.createdBy = 'agent2';
            resp.render('listTickets', {data: payload});
        }
        else {
            //send error msg to ui
            resp.render('newTicket', {data: model});
        }
    });
};
module.exports = router;
