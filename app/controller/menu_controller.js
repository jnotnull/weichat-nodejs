var async = require("async"),
    menuConfig = require("../../config/menu_config"),
    weiChatConfig = require("../../config/weichat_config"),
    baseService = require("../service/base_service"),
    menuService = require("../service/menu_service");

function createMenu(req, res) {
    async.waterfall([function(waterfallCallback) {
        if (weiChatConfig.accessToken === null) {
            baseService.getAccessToken(function(error) {
                if (error) {
                    return waterfallCallback(error);
                }
                waterfallCallback(null);
            });
        } else {
            waterfallCallback(null);
        }
    }, function(waterfallCallback) {
        menuService.createMenu(menuConfig.menuData, waterfallCallback);
    }], function(error) {
        if(error) {
            console.log("创建菜单出错 => " + JSON.stringify(error));
            res.end("创建菜单失败");
        } else {
            res.end("创建菜单成功");
        }
    });

}

module.exports.createMenu = createMenu;
