module.exports = {
    menuData: {
        button: [
            {
                name: "菜单",
                sub_button: [
                    {
                        type: "click",
                        name: "问候",
                        key: "hello"
                    },
                    {
                        type: "click",
                        name: "随便",
                        key: "cqmyg"
                    }
                ]
            },
            {
                name: "网页",
                sub_button: [
                    {
                        type: "view",
                        name: "hello",
                        url: "" // 网页的地址
                    },
                    {
                        type: "view",
                        name: "关于",
                        url: "" // 网页的地址
                    }
                ]
            }
        ]
    }

};
