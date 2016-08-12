

## webpack + vue + vuex + vue-router + vue-resource + bootstrap

```js

--- src
	|--- apis // api目录
		|--- [controller].api.js
	|--- assets //静态资源文件
		|--- css
		|--- ifonts
		|--- images
	|--- components // 页面组件
		|--- somePage
			|--- somePage-component.vue
		...
	|--- config
		|--- routers (不在细分目录)
			|--- index.js index业务模块所有的路由都在这
			|--- exam.js exam业务模块所有路由都在这
	|--- mock
		|--- controller 不细分文件夹,一种业务模块就是一个js文件
			|--- 业务1.js  faq业务模块下的所有controller都在这里面
			|--- 业务2.js
		|--- 业务1 (数据模拟文件)
			|--- xxx.js
			...
		_apidoc.js
		apidoc.json
		app.js  入口server
	|--- pages // 页面组件
		|--- page1
			|--- .scss
			|--- .js
			|--- .{.png,.jpg...}
			|--- .{eot,...}
	|--- scss 
	App.vue 入口文件
	main.js 入口js文件
	main.scss 全局sass
	router.js 路由文件
index.html 入口页面	

```
