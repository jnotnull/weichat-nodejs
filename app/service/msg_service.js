var request = require("request"),
    weichatConfig = require("../../config/weichat_config"),
    weiUtil = require("../utils/weiUtil");

function sendTextMsg(touser, msg, callback) {
    var msgBody = {
        touser: touser,
        msgtype: "text",
        text: {
            content: msg
        }
    };
    sendMsg(msgBody, callback);
}

function sendNews(touser, articles, callback) {
    var msgBody = {
        touser: touser,
        msgtype: "news",
        news: {
            articles: articles
        }
    };

    sendMsg(msgBody, callback);
}

function sendMsg(msgBody, callback) {
    var msgUrl = weiUtil.buildAccessUrl(weichatConfig.url.customService.sendMsg);

    request.post({url: msgUrl, body: msgBody, json: true}, function(error, sendRequest, body) {
        if (weiUtil.isFunction(callback)) {
            if (error) {
                callback(error);
            } else if (+body.errcode !== weichatConfig.successCode) {
                callback(body);
            } else {
                callback(null, body);
            }
        }
    });
}

module.exports.sendTextMsg = sendTextMsg;
module.exports.sendNews = sendNews;
