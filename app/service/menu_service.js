var request = require("request"),
    weichatConfig = require("../../config/weichat_config"),
    weiUtil = require("../utils/weiUtil");

function createMenu(menuData, callback) {
    var createMenuUrl = weiUtil.buildAccessUrl(weichatConfig.url.menu.create);
    request.post({url: createMenuUrl, body: menuData, json: true}, function(error, request, body) {
        if (error) {
            callback(error);
        } else if (+body.errcode !== weichatConfig.successCode) {
            callback(body);
        } else {
            callback(null, body);
        }
    });
}

module.exports.createMenu = createMenu;
