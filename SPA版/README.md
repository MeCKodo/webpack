
### 前言

> thinkjs + vue + vueRouter + webpack 的 SPA配置 (其实可以看我repo thinkjs-vue-blog )

### dev

> npm run dev

主站 http://localhost:8200/source/index.html

### build

> npm run build

### 结合后台测试

> npm run start

主站 http://localhost:8360

#### 目录介绍

由于后台使用了 `thinkjs` 框架的ES6模式

`src` 为后台编写文件, `app` 则为后台编译后的文件

线上的页面需要放在 `view/home` 下

静态资源文件全放在 `www/static` 下

前端开发目录为 `source`

#### 前端开发约定（目录）

```javascript
- source 
	- common          // 公用.vue
	- components      // 对应controller下的组件
	- static          // 第三方静态资源
	- unitTest        // 数据测试json
	- views           // 页面
	index.html        // 主站入口html
	index.sass        // 主站全局sass
	main.js           // 主站入口js
	router.js         // 主站路由
	admin.html        // 后台入口html
	admin.js          // 后台入口js
	admin.router.js   // 后台路由
```

#### 难点

output要好好设置,这涉及到开发环境下,你的路径去哪里找js.以及build后线上环境又是怎么样的个路径去找js

有的人可能有疑问,vue-cli生成的项目.为什么直接 `npm run dev` 就可以开始跑了呢?明明连js文件都没有,浏览器怎么还能找到文件呢?

其实这就是webpack的一个强大之处,在dev过程中,js的确有编译,但是仅仅是编译在内存中,你的确看不见那个文件,所以一样可以使用

了解这一点后,我们的output就很明白到底要如何设置了

```javascript
output: {
        path: path.resolve(__dirname, './www/static'),
        publicPath: '/static/',
        chunkFilename: 'js/[id].js',
        filename: '[name].build.js'
    }
```

文字表达的确很难能感受到是为什么,建议大家clone我这个repo,然后感受下具体是怎么样的过程.

#### 模板html文件

在SPA中,我们就可以用webpack插件来为我们生成html模板到所对应的目录了.

```javascript
//webpack的plugin里加入以下插件
new HtmlWebpackPlugin({ //为了配合thinkjs的目录定义 需要输出在view/home/[controller]/index.html 下
            filename : "../../view/home/index/index.html",
            template : "./source/index.html",
            inject:false
        })
```

别的基本大同小异,我就不具体再介绍一次了
