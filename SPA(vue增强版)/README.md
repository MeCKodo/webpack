# panda

> panda teacher

## webpack + vue + vuex + vue-router + vue-resource + bootstrap

```js
--- src
	|--- apis // api目录
		|--- somePage
	|--- assets //静态资源文件
		|--- css
		|--- ifonts
		|--- images
	|--- components // 页面组件
		|--- somePage
			|--- somePage-components.vue
		...
	|--- config
		|--- routers (不在细分目录)
			|--- index.js index业务模块所有的路由都在这
			|--- exam.js exam业务模块所有路由都在这
	|--- js // 可能需要的js或第三方js
	|--- mock // 模拟数据(可搭node层)
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
