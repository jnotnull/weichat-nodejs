var menuController = require("../controller/menu_controller");

module.exports = function(app) {
    app.post("/menu/create", menuController.createMenu);
};
