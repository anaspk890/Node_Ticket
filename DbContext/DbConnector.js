var config = require('../config');
var url = config.mongoDbUrl();
var mongoDb = require('mongodb');
var mongoClient = mongoDb.MongoClient;

var readSingle = function (data, callBack) {
    console.log('in dbConn readSingle');
    console.log('data :' + data);
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callBack(err, null);
        } else {
            console.log('readSingle Connection established to', url);
            var documentName = data.documentName;
            var filter = data.filter;

            var db = client.db('DB2');

            db.collection(documentName).findOne(filter, function (err, document) {
                if (err) {
                    console.log('in readSingle findOne Err : ', err);
                    //client.close('DB2');
                    callBack(err, null);
                } else if (document) {
                    console.log('document : ', document);
                    //client.close('DB2');
                    callBack(null, document);
                } else {
                    console.log('document : ', document);
                    //client.close('DB2');
                    callBack(null, null);
                }
            });
        }
    });
};
var readMany = function (data, callBack) {
    console.log('in dbConn readMany');
    console.log('data :' + data);
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. readMany Error:', err);
            callBack(err, null);
        } else {
            console.log('readMany Connection established to', url);
            var documentName = data.documentName;
            var filter = data.filter;

            var db = client.db('DB2');

            db.collection(documentName).find(filter).toArray(function (err, result) {
                if (err) {
                    console.log('in readMany find Err : ', err);
                    //client.close('DB2');
                    callBack(err, null);
                } else if (result) {
                    console.log('result : ', result);
                    //client.close('DB2');
                    callBack(null, result);
                } else {
                    console.log('result : ', result);
                    //client.close('DB2');
                    callBack(null, null);
                }
            });
        }
    });
};
var writeSingle = function (data, callBack) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Unable to connect to the MongoDB server. writeSingle Error:', err);
            callBack(err, null);
        } else {
            console.log('writeSingle Connection established to', url);

            var db = client.db('DB2');
            var documentName = data.documentName;
            var documentData = data.documentData;

            db.collection(documentName).insertOne(documentData, function (err, result) {
                if (err) {
                    console.log('documentName : ', documentName);
                    console.log('documentData : ', documentData);
                    console.log('Error in insertOne:', err);
                    callBack(err, null);
                } else {
                    console.log("Inserted a document into  collection. Name : ", documentName);
                    var objectId = new mongoDb.ObjectID(result.insertedId);
                    result.newObjectId = objectId;
                    callBack(null, result);
                }
            });
        }
    });
};
var writeMany = function (data, callBack) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Unable to connect to the MongoDB server. Error writeMany:', err);
            callBack(err, null);
        } else {
            console.log('writeMany Connection established to ', url);

            var db = client.db('DB2');
            var documentName = data.documentName;
            var documentData = data.documentData;

            db.collection(documentName).insertMany(documentData, function (err, result) {
                if (err) {
                    console.log('documentName : ', documentName);
                    console.log('documentData : ', documentData);
                    console.log('Error in insertMany :', err);
                    callBack(err, null);
                }
                else {
                    console.log("writeMany Inserted a document into  collection. Name : ", documentName);
                    var objectId = new mongoDb.ObjectID(result.insertedId);
                    result.newObjectId = objectId;
                }
                callBack(null, result);
            });
        }
    });
};
var findOneAndUpdate = function (data, callBack) {
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('Unable to connect to the MongoDB server. Error findAndModify:', err);
            callBack(err, null);
        } else {
            console.log('findAndModify Connection established to ', url);

            var db = client.db('DB2');
            var documentName = data.documentName;
            var query = data.filter;
            var updateData = data.newData;

            db.collection(documentName).findOneAndUpdate({query: query, update: updateData}, function (err, result) {
                if (err) {
                    console.log('documentName : ', documentName);
                    console.log('query : ', query);
                    console.log('updateData : ', updateData);
                    console.log('Error in findAndModify :', err);
                    callBack(err, null);
                }
                else {
                    console.log("findAndModify updated Name : ", documentName);
                    var objectId = new mongoDb.ObjectID(result.insertedId);
                    result.newObjectId = objectId;
                }
                callBack(null, result);
            });
        }
    });
};
var initDb = function (data, callBack) {
    /*if(data==null){data={};}
    if(callBack!=='function'){callBack = function () {
console.log('db init completed');
    }}*/

    var ts = new Date();
    var _date = ts.toLocaleDateString();
    var documentName = 'Customers';
    var documentData = {customerName: 'Name 1', otherInfo: 'Cust_1 Other information'};
    data.documentName = documentName;
    data.documentData = documentData;
    writeSingle(data, function (err, result) {

        documentName = 'ServiceAgents';
        documentData = [
            {agentName: 'agent 1', userName: 'agent1', password: 'agent1', area: 'front desk', type: 'rep'},
            {agentName: 'agent 2', userName: 'agent2', password: 'agent2', area: 'technical', type: 'exec'},
            {agentName: 'agent 3', userName: 'agent3', password: 'agent3', area: 'non technical', type: 'exec'}
        ];
        data.documentData = documentData;
        data.documentName = documentName;
        writeMany(data, function (err, result) {

            documentName = 'Tickets';
            documentData = [
                {
                    ticketNo: '1',
                    customerName: 'Name -1 ',
                    createdBy: 'agent1',
                    createdOn: _date,
                    assignedTo: 'agent2',
                    status: 'Open',
                    area: 'technical'
                },
                {
                    ticketNo: '2',
                    customerName: 'Name -2 ',
                    createdBy: 'agent1',
                    createdOn: _date,
                    assignedTo: 'agent3',
                    status: 'Open',
                    area: 'non technical'
                },
                {
                    ticketNo: '3',
                    customerName: 'Name -3 ',
                    createdBy: 'agent1',
                    createdOn: _date,
                    assignedTo: '',
                    status: 'New',
                    area: '-'
                }
            ];
            data.documentData = documentData;
            data.documentName = documentName;
            writeMany(data, function (err, result) {

                console.log("Inserted a document into  collection. Name : ", documentName);
                documentName = 'Comments';
                documentData = [
                    {t_No: '1', createdBy: 'agent1', comment: 'comment 1 goes here', commentedDate: _date},
                    {t_No: '1', createdBy: 'agent2', comment: 'comment 2 goes here', commentedDate: _date},
                    {t_No: '1', createdBy: 'agent3', comment: 'comment 3 goes here', commentedDate: _date},
                    {t_No: '1', createdBy: 'agent4', comment: 'comment 4 goes here', commentedDate: _date},
                    {t_No: '1', createdBy: 'agent5', comment: 'comment 5 goes here', commentedDate: _date},
                    {t_No: '2', createdBy: 'agent1', comment: 'comment 1 of 2 goes here', commentedDate: _date}
                ];
                data.documentData = documentData;
                data.documentName = documentName;
                writeMany(data, function (err, result) {
                    console.log("Inserted a document into  collection. Name : ", documentName);
                    callBack(err, result);
                });

            });
        });

    });
};

module.exports.readSingle = readSingle;
module.exports.readMany = readMany;
module.exports.insertSingle = writeSingle;
module.exports.insertMany = writeMany;
module.exports.updateSingle = findOneAndUpdate;

module.exports.initDb = initDb;

//initDb();