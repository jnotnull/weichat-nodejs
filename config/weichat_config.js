var WeiChatConfig = {
    token: "******",
    grantType: "client_credential",
    appid: "******",
    appsecret: "*******",
    successCode: 0,
    // 临时存放 access_token
    accessToken: null,

    event: {
        subscribe: "subscribe",
        click: "click"
    },
    url: {
        baseUrl: "https://api.weixin.qq.com/cgi-bin",

        accessToken: "/token",
        customService: {
            sendMsg: "/message/custom/send"
        },
        menu: {
            create: "/menu/create"
        }
    }
};

module.exports = WeiChatConfig;
