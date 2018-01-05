module.exports.viewFolderPath = function () {
    var _folder = __dirname;
    return _folder + "\\views";
};

module.exports.mongoDbUrl = function () {
    return 'mongodb://localhost:27017/DB2';
};

module.exports.isAjaxRequest = function (request) {
    //writeToLog(request);
    var _xhr = request.xhr;
    var _json = request.headers.accept.indexOf('json') > -1;
    var _result = _xhr || _json;
    return _result;

    //return (request.xhr || request.headers.accept.indexOf('json') > -1);
};

module.exports.generateUniqueId = function () {
    var d = new Date();
    var mm = d.getMonth();
    var dd = d.getDay();
    var yy = d.getYear();
    var hh = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    var id = mm + dd + yy + hh + min + sec;
    return id;
};

function writeToLog(data) {
    console.log(data);
}

module.exports.writeToLog = writeToLog;