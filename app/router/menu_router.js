var menuController = require("../controller/menu_controller"),
    accesstokenMiddle = require("../middle/accesstoken_middle");

module.exports = function(app) {
    app.post("/menu/create", accesstokenMiddle.validateAccessToken, menuController.createMenu);
};
