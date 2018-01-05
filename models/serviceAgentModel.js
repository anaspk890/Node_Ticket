var dbConnector = require('../DbContext/DbConnector');

var validateCredentials = function (data, callback) {
    data.documentName = 'ServiceAgents';
    data.filter =
        {
            $and: [
                {userName: data.agent.userName},
                {password: data.agent.password}]
        };
    dbConnector.readSingle(data, function (err, result) {
        if (result) {
            // for(var i = 0;i<result.length;++i){
            var _item = {
                ticketId: result._id.toString(),
                agentName: result.agentName,
                userName: result.userName,
                password: result.password,
                area: result.area,
                type: result.type
            };
            //resultList.push(_item);
            // }
            result.dataItem = _item;
        }

        callback(err, result);
    });
};

module.exports.validateCredentials = validateCredentials;