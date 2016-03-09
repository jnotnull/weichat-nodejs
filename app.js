var express = require("express"),
    exphbs = require("express-handlebars"),
    path = require("path");

var app = express(),
    appConfig = require("./config/app_config"),
    router = require("./app/router");

app.engine(".hbs", exphbs({defaultLayout: "main", extname: ".hbs"}));

app.set("port", process.env.PORT | appConfig.PORT);
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, 'public')));


router.attachAllRouter(app);

app.listen(app.get("port"), function() {
    console.log("server start on http://localhost:" + app.get("port") +
                "; press Ctrl+C to terminate");
});
