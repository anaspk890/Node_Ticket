var dbConnector = require('../DbContext/DbConnector');

var getCustomers = function (data, callback) {
    data.documentName = 'Customers';
    var customersList = [];
    dbConnector.readMany(data, function (err, result) {
        if (result) {
            for (var i = 0; i < result.length; ++i) {
                var item = {
                    customerId: result[i]._id.toString(),
                    customerName: result[i].customerName,
                    otherInfo: result[i].otherInfo
                };
                customersList.push(item);
            }
        }
        result.customersList = customersList;
        callback(err, result);
    });
};

module.exports.getCustomers = getCustomers;