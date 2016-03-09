var async = require("async"),
    weiChatConfig = require("../../config/weichat_config"),
    msgConfig = require("../../config/msg_config"),
    baseService = require("../service/base_service"),
    msgService = require("../service/msg_service");

var eventHandlerMap = {};
eventHandlerMap[weiChatConfig.event.subscribe] = handleSubscribeEvent;
eventHandlerMap[weiChatConfig.event.click] = handleClickEvent;

exports.eventReceiver = function(req, res) {
    var xmlBody = req.body.xml,
        eventName = xmlBody.event[0].toLowerCase();
    if (eventHandlerMap[eventName]) {
        eventHandlerMap[eventName](xmlBody, req, res);
    } else {
        res.end("");
    }
};

// 处理被关注时的事件
function handleSubscribeEvent(xmlBody, req, res) {
    var user = xmlBody.fromusername[0];
    // 如果没有 accessToken 则进行获取
    if (weiChatConfig.accessToken === null) {
        baseService.getAccessToken(function(error) {
            if (error) {
                return res.end();
            }
            msgService.sendNews(user, buildSubscribeMsg());
        });
    } else {
        msgService.sendNews(user, buildSubscribeMsg());
    }
    res.end("");

    // 构建图文消息
    function buildSubscribeMsg() {
        var subscribeMsg = msgConfig.subscribeMsg;

        return [{
            title: subscribeMsg.title,
            description: subscribeMsg.description,
            url: subscribeMsg.url,
            picurl: subscribeMsg.picurl
        }];
    }
}


// 处理点击自定义菜单事件
function handleClickEvent(xmlBody, req, res) {
    var user = xmlBody.fromusername[0],
        eventKey = xmlBody.eventkey[0];

    async.waterfall([function(waterfallCallback) {
        // 获取 accessToken
        if (weiChatConfig.accessToken === null) {
            baseService.getAccessToken(function(error) {
                if (error) {
                    waterfallCallback(error);
                } else {
                    waterfallCallback(null);
                }
            });
        } else {
            waterfallCallback(null);
        }
    }, function(waterfallCallback) {
        var msg = msgConfig.notSupport;

        if (eventKey === "hello") {
            msg = msgConfig.hello;
        }
        msgService.sendTextMsg(user, msg, waterfallCallback);
    }], function(error) {
        if (error) {
            console.log("处理自定义菜单点击事件出错 =>" + error);
        }
        res.end("");
    });
}
