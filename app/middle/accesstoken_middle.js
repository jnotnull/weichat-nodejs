var AccessToken = require("../model/AccessToken"),
    baseService = require("../service/base_service"),
    logService = require("../service/log_service");

module.exports = {
    validateAccessToken: function(req, res, next) {
        if (AccessToken.isEmpty()) {
            baseService.getAccessToken(function(error, body) {
                if (!error && body.access_token) {
                    AccessToken.setAccessToken(body.access_token);
                    next();
                } else {
                    logService.recordError(error);
                    req.end();
                }
            });
        } else {
            next();
        }
    }
};
