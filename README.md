## 在webpack配置中的探索(持续更新中)

> * webpack + gulp + vue (thinkPHP后台配置)

#### 项目需求

```javascript
--- Application
    |--- Home
    |   |--- View (线上用户访问的.html目录)
--- Public (线上资源文件目录)
    |--- js
    |--- images
    |--- css
    |--- ...
--- source (前端开发目录)
    |--- index1 (一个业务需求模块)
    |    |--- index1-1 (index 页面)
    |    |	  |--- images	
    |    |    |--- index.html 
    |    |    |--- app.vue
    |    |    |--- index.js
    |    |    |--- style.scss
    |    |    |--- ...
    |    |--- index1-2 (index2 页面)
    |    |    |--- images
    |    |    |--- ...
    |--- index2 (另外一个业务需求模块)          
    |    |--- index2-1 
    |    |    |--- ...
  
```

以上是我们的一个项目结构

> * 1.我所想的是每一个业务需求模块下(source/index1)会有很多页面

> * 每一个页面都是一个文件夹(source/index1/index1-1,source/index1/index1-2)

> * 2.项目无需后台环境可以浏览器可以直接打开访问

> * 3.每个页面资源.sass文件,.js文件等就近维护,用.vue + es6的形式进行组件模块的开发

> * 4.开发时良好的sourseMap调试

> * 5.当我们不需要这个业务模块,或者某个页面的时候可以直接删除整个文件夹即可


webpack会帮助我们会为每一个页面生成他自己的css文件,js文件. 所以我们直接在我们的index页面里link和script他们

```html
    <link rel="stylesheet" href="../../../Public/css/index/index.css">
	<script src="../../../Public/js/index/index.js"></script>

```

当我们需要上线的时候再把相对路径给替换成线上环境

#### webpack

```javascript
module.exports = {
    entry: {}, //路口
    output: { }, //输出出口
    module: {
        loaders: [ ]
    },
    babel: { //配置babel
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    plugins: [ ],//编译的时候所执行的插件数组
    vue: { },//vue的配置,需要单独出来配置
    devtool : "source-map" //调试模式
};

```

这很简单就不过多介绍,由于我们是多页应用,我们需要编写一个获取所有路口js,生成一个我们想要的路径的对象.

##### entry

```javascript

//需要用到glob模块
var glob = require('glob');

var getEntry = function () {
    var entry = {};
    //首先我们先读取我们的开发目录
    glob.sync('./source/**/*.js').forEach(function (name) {
        var n = name.slice(name.lastIndexOf('source/') + 7, name.length - 3);
        n = n.slice(0, n.lastIndexOf('/'));
        //接着我对路径字符串进行了一些裁剪成想要的路径
        entry[n] = name;
    });
    
    console.log(entry); 
    /**
	*	 entry = { 'crowd/index' : './source/crowd/index/index.js',
	*  			   'index/index' : './source/index/index/index.js'
	*  			 }
    *
    **/
    //最后返回entry  给 webpack的entry
    return entry; 
};
```

##### output

```javascript

output: { //输出位置
	path: path.resolve(__dirname, './public/'), //配置输出路径
	filename: './js/[name].js' //文件输出形式
	//关于filename 我们有个变量就是 [name] = entry的key  当然还有别的变量比如[id],[hash]等,大家可以自行发挥
	我们也能把filename写成  filename : [name]/[name].[name].js 也是可以的
},

```

##### loader 

关于loader,其实有两种写法

```javascript

{
	test: /\.(png|jpg|gif)$/,
	loader: 'url?limit=10000&name=./images/[name].[ext]?[hash:10]',
	/*query: {
		limit: 10000,
		name: './images/[name].[ext]?[hash:8]'
	}*/
},

//在这无论是直接loader 后面跟参数(像url跟参一样),或者是后面跟着一个对象 query,都是可以的.

```


##### plugins

> * 这里我就只用到一个就是生成 独立的css文件,style嵌套在页面里的方式实在是丑得不行

##### vue 

这没啥好说的,vue更新之后需要单独出来配置了

```javascript
vue: { //vue的配置,需要单独出来配置
	loaders: {
		js: 'babel'
	}
}
```

##### NODE_ENV

> * 以上都是我们的开发配置,在生产环境中,我们还需要添加一些东西

```javascript

//由于我们的.vue文件模块化开发,里面自然也有 css与sass,我们也需要配置最后导出css文件
var vueLoader = {
    js: 'babel',
    css: ExtractTextPlugin.extract("vue-style-loader", "css-loader"),
    sass: ExtractTextPlugin.extract("vue-style-loader", "css-loader", 'sass-loader')
};

if (process.env.NODE_ENV === 'production') { //判断是否为生产环境

    module.exports.vue.loaders = vueLoader;
    //以下直接借鉴尤大大的了
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]);
} else { //不是生产环境则配置devtool 调试
    module.exports.devtool = 'source-map';
}

```


#### gulp 部分

> * 仅仅只有webpack部分还是没法满足我们的初衷,所以我们需要gulp进行辅助

webpack仅仅只会把我们js路口里的所有东西都处理了,但是我们的页面都是我们自己手动写的(还没想到更好的解决方案)

所以我们需要借助gulp的力量,把我们的.html移入我们想要的目录

但是这样的目录结构输出其实是有问题的

```javascript

--- source (前端开发目录)
    |--- index1 (一个业务需求模块)
    |    |--- index1-1 (index 页面)
    |    |    |--- index.html 

--- Application (错误结构)
    |--- Home
    |   |--- View (线上用户访问的.html目录)
	|		 |--- index (一个业务需求模块)
    | 		 | 	 |--- index (index 页面)
    |		 |	 |	|--- index.html
    |		 |	 |--- topics
    | 		 |	 |	|--- topics.html
    |		 |--- crowd
    |		 |	 |--- index
    |		 |	 |	|--- index.html

--- Application (正确结构)
    |--- Home
    |   |--- View (线上用户访问的.html目录)
	|	|	|--- index (一个业务需求模块)
    |	|	|		|--- index.html
    |	|	|	 	|--- topics.html
    |	|	|--- crowd
    |	|	|	 |--- index
    |	|	|	 |	|--- index.html    			 	
    			 	
```

观察发现,这其实会多了一层无用的index1-1目录(因为我们的一个目录就是一个文件,这层其实是很不必要的,我们要想办法去除)

> * 想了非常多种方式都没办法实现,最后找到了唯一的办法(非常的愚蠢的办法,如果您有更好的办法麻烦告诉我 T.T)

```javascript 
var map = require('map-stream');
var vfs = require('vinyl-fs');

gulp.task('view', function () {

    var log = function(file, cb) { 
    	//定义输出路径
        var view = __dirname + '/Application/Home/View';
        
        //又是一段切割过程 获取我们想要的结构
        var target = file.path.split('/').splice(-3);
        var qqqq = target.splice(1, 1);
        
        //设置我们的文件输出path
        file.path = view + '/' + target.join('/'); 
        cb(null, file);
    };
    vfs.src('./source/**/*.html')
        .pipe(rev()) //这里您可以做一些pipe的操作
        .pipe(map(log))
        .pipe(vfs.dest('./output')); //这里会多输出一次

    gulp.start(['clean']); //我们需要执行一次clean 清理了多余的那层目录
});

```

> * 这样我们就能获得我们想要的目录! 并且还能经过pipe对html文件的操作! 最大的难点也就在这里

以上基本是我们所有的配置了,关于热加载,或者是browserSync等别的辅助开发工具,大家可以在这基础上自行拓展.

` hava a nice day : )`