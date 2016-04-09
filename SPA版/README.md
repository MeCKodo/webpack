
### 前言

webpack配置其实大体是一致的，但在SPA的项目中，我们就可以不必使用gulp配合了，首先看看目录。

### 目录

由于后台使用了`thinkjs`框架的ES6模式

`src`为后台编写文件,`app`则为后台编译后的文件

线上的页面需要放在`view/home`下

静态资源文件全放在`www/static`下

前端开发目录为`source`

### 前端开发约定（目录）

`source/index.html` 为我们开发时候使用的测试页面
`source/tpl.html` 是build输出到相应目录下(view/home/index/index.html)所需的模板页面

所以webpack中会有这一段
```javascript
plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin({ 
    //为了配合thinkjs的目录定义 需要输出在view/home/[controller]/index.html 下
        filename : "../../view/home/index/index.html",
        template : "./source/tpl.html"
    })
],
```


```javascript
--- assets（开发所需第三方资源）
    |--- css
    |--- ifont
    ...
--- common(公用组件)
    |--- 404.vue
    |--- login.vue
    ...
--- components（存放对应views组件）
    |--- index(对应index业务模块)
        |--- indexDetail.vue（index页面组件下的一个组件）
        |--- indexAside.vue （index页面下侧边栏组件）
        ...
    |--- shop
        |--- ...
--- views (页面组件)
    |--- index（index业务模块，相当于是一个页面）
        |--- index.vue
        |--- detail.vue
        ...
    |--- shop
        |--- index.vue
        |--- detail.vue
--- unitTest (测试目录)
```

如果你看过多页应用那篇，会知道我希望把一个业务就是一个文件夹区分，所以`views/index` 是一个业务模块，有可能这个业务模块下会很多页面，我不希望业务页面和细分组件都放在一起，所以我们需要一个`components`文件夹来存放对应业务模块的对应细分组件。

别的基本没什么好说的了。

开发

> npm run dev

由于我们dev和build的路径会略有不同,开发过程中静态资源路径需要www/static，而线上不需要，所以开发过程中我们的output则为

```javascript
output: {
    path: path.resolve(__dirname, './www/static'),
    publicPath: '/www/static/',
    chunkFilename: 'js/[id].js',
    filename: 'build.js'
},
```
线上build需要修改publicPath(详见webpack配置)

```javascript
module.exports.output.publicPath = 'static/';
```

上线

> npm run build 

服务器环境调试（启动thinkjs）

> npm run start




