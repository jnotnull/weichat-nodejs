var xmlparser = require("express-xml-bodyparser");

var eventController = require("../controller/event_controller");

module.exports = function(app) {
    app.post("/", xmlparser({explicitArray: true}), eventController.eventReceiver);
};
