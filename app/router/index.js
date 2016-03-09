module.exports = {
    attachAllRouter: function(app) {
        this.attachBase(app);
        this.attachView(app);
        this.attachEvent(app);
        this.attachMenu(app);
    },

    attachBase: function(app) {
        require("./base_router")(app);
    },

    attachView: function(app) {
        require("./view_router")(app);
    },

    attachEvent: function(app) {
        require("./event_router")(app);
    },

    attachMenu: function(app) {
        require("./menu_router")(app);
    }
};
