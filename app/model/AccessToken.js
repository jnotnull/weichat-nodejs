var accessToken = null;

module.exports = {
    getAccessToken: function() {
        return accessToken;
    },

    setAccessToken: function(token) {
        accessToken = token;
    },

    isEmpty: function() {
        return accessToken === null;
    }
};
