var dbConnector = require('../DbContext/DbConnector');
var config = require('../config');
var url = config.mongoDbUrl();
var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;

var getTickets = function (data, callback) {
    data.documentName = 'Tickets';
    var resultList = [];
    dbConnector.readMany(data, function (err, result) {
        if (result) {
            for (var i = 0; i < result.length; ++i) {
                var _item = {
                    ticketId: result[i]._id.toString(),
                    ticketNo: result[i].ticketNo,
                    createdBy: result[i].createdBy,
                    assignedTo: result[i].assignedTo,
                    status: result[i].status
                };
                resultList.push(_item);
            }
        }
        result.resultList = resultList;
        callback(err, result);
    });
};

var getTicketsInfo = function (data, callBack) {
    console.log('in getTicketsInfo');
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. getTicketsInfo Error:', err);
            callBack(err, null);
        } else {
            console.log('getTicketsInfo Connection established to', url);
            var documentName = 'Tickets';
            var db = client.db('DB2');

            db.collection(documentName).aggregate([{
                $lookup:
                    {
                        from: "Comments",
                        localField: "ticketNo",
                        foreignField: "t_No",
                        as: "comments"
                    }
            }], function (err, result) {
                if (err == null) {
                    result.toArray(function (err, data) {
                        result.resultList = data;
                        callBack(err, result);
                    });
                }
                else {
                    callBack(err, result);
                }
            });
        }
    });
};
//getTicketsInfo();
var getTicketByNo = function (data, callback) {
    data.documentName = 'Tickets';
    data.filter = {ticketNo: {$eq: data.ticketNo}};

    dbConnector.readSingle(data, function (err, result) {
        if (result) {
            // for(var i = 0;i<result.length;++i){
            var _item = {
                ticketId: result._id.toString(),
                ticketNo: result.ticketNo,
                createdBy: result.createdBy,
                assignedTo: result.assignedTo,
                status: result.status
            };
            //resultList.push(_item);
            // }
            result.dataItem = _item;
        }

        callback(err, result);
    });
};

var updateTicketByNo = function (data, callback) {
    var documentName = 'Customers';
    data.filter = {status: {$ne: 'closed'}};

    var documentData = {
        ticketNo: data.ticketNo,
        createdBy: data.createdBy,
        assignedTo: data.assignedTo,
        status: data.status
    };
    data.documentName = documentName;
    data.documentData = documentData;
    dbConnector.updateSingle(data, function (err, result) {
        callback(err, result);
    });
};

var insertTicket = function (data, callback) {
    var documentName = 'Customers';
    var documentData = {
        ticketNo: data.ticketNo,
        createdBy: data.createdBy,
        assignedTo: data.assignedTo,
        status: data.status
    };
    data.documentName = documentName;
    data.documentData = documentData;
    dbConnector.insertSingle(data, function (err, result) {
        callback(err, result);
    });
};

module.exports.getTickets = getTickets;
module.exports.getTicketByNo = getTicketByNo;
module.exports.updateTicketByNo = updateTicketByNo;
module.exports.insertTicket = insertTicket;
module.exports.getTicketsInfo = getTicketsInfo;