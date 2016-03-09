var weichatConfig = require("../../config/weichat_config");

module.exports = {
    buildAccessUrl: function(suffixUrl) {
        var url = weichatConfig.url.baseUrl + suffixUrl;
        url = url + "?access_token=" + weichatConfig.accessToken;
        return url;
    },

    isFunction: function(fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    }
};
