var crypto = require("crypto"),
    request = require("request");

var weichatConfig = require("../../config/weichat_config");

function checkSignature(timestamp, nonce, signature) {
    var tmpArr = [timestamp, nonce, weichatConfig.token];

    tmpArr = tmpArr.sort();
    var tmpStr = tmpArr.join("");
    var sha1 = crypto.createHash("sha1");

    sha1.update(tmpStr);

    return sha1.digest("hex") === signature;
}


/*
 * access_token 有过期时间限制,需要在过期前进行刷新
 * 本程序并未进行 access_token 过期后刷新的处理
 */
function getAccessToken(callback) {
    var accessUrl = weichatConfig.url.baseUrl + weichatConfig.url.accessToken,
        queryArg = {
            grant_type: weichatConfig.grantType,
            appid: weichatConfig.appid,
            secret: weichatConfig.appsecret
        };

    request({url: accessUrl, qs: queryArg}, function(error, response, body) {
        body = JSON.parse(body);
        if (!error && body.access_token) {
            // 临时保存到 weichatConfig 中
            weichatConfig.accessToken = body.access_token;
        }
        callback(error, body);
    });
}

module.exports.checkSignature = checkSignature;
module.exports.getAccessToken = getAccessToken;
