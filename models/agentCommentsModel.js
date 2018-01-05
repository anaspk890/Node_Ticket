var dbConnector = require('../DbContext/DbConnector');

var addComments = function (data, callback) {
    data.documentName = 'Comments';
    // var resultList=[];
    dbConnector.readSingle(data, function (err, result) {
        if (result) {
            // for(var i = 0;i<result.length;++i){
            var _item = {
                ticketId: result._id.toString(),
                t_No: result.ticketNo,
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

module.exports.insertComments = addComments;