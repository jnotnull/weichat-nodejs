var viewController = require("../controller/view_controller");

module.exports = function(app) {
    app.get("/hello", viewController.hello);
    app.get("/about", viewController.about);
};
