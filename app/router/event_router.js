var xmlparser = require("express-xml-bodyparser");

var eventController = require("../controller/event_controller"),
    accesstokenMiddle = require("../middle/accesstoken_middle");

module.exports = function(app) {
    app.post("/", accesstokenMiddle.validateAccessToken,
                  xmlparser({explicitArray: true}),
                  eventController.eventReceiver);
};
