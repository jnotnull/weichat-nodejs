var weichatConfig = require("../../config/weichat_config"),
    AccessToken = require("../model/AccessToken");

module.exports = {
    buildAccessUrl: function(suffixUrl) {
        var url = weichatConfig.url.baseUrl + suffixUrl;
        url = url + "?access_token=" + AccessToken.getAccessToken();
        return url;
    },

    isFunction: function(fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    }
};
