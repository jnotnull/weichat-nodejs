var baseService = require("../service/base_service");

exports.access = function(req, res) {
    var query = req.query;
    if (baseService.checkSignature(query.timestamp, query.nonce, query.signature)) {
        res.write(query.echostr);
    }
    res.end();
};
