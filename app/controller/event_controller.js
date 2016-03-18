var weiChatConfig = require("../../config/weichat_config"),
    msgConfig = require("../../config/msg_config"),
    logService = require("../service/log_service"),
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

    msgService.sendNews(user, buildSubscribeMsg());
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
        eventKey = xmlBody.eventkey[0],
        msg = msgConfig.notSupport;
    // 即 menu_config.js 里面配置的 name
    if (eventKey === "hello") {
        msg = msgConfig.hello;
    }
    msgService.sendTextMsg(user, msg, function(error) {
        if (error) {
            logService.recordError(error);
        }
        res.end("");
    });

}
