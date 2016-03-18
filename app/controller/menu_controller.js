var menuConfig = require("../../config/menu_config"),
    menuService = require("../service/menu_service"),
    logService = require("../service/log_service");

function createMenu(req, res) {
    menuService.createMenu(menuConfig.menuData, function(error) {
        if (error) {
            logService.recordError(error);
            res.end("创建菜单失败 !");
        } else {
            res.end("创建菜单成功 !");
        }
    });
}

module.exports.createMenu = createMenu;
