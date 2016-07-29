module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "globals" : {
        "window":true,
        "document":true,
        "$":true
    },
    "plugins": [
        'html'
    ],
    "rules" : {
		"global-require": 0,
        "indent": [0, "tab"], // 去掉tab约定,IDE会有问题
		"no-trailing-spaces": [0, { "skipBlankLines": true }]// 去掉行未得空格
    }
};