var baseController = require("../controller/base_controller");

module.exports = function(app) {
    app.get("/", baseController.access);
};
