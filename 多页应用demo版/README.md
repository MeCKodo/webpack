## WebPack在项目配置中的探索(持续更新中)

> * webpack + gulp + vue (thinkPHP后台配置)

#### 一、项目需求(请认真看目录结构,项目构建很大都基于目录来的)

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
    |--- index (一个业务需求模块,每个业务需求模块下会有很多页面)
    |    |--- index (index 页面)
    |    |	  |--- images	
    |    |    |--- index.html 
    |    |    |--- app.vue
    |    |    |--- index.js
    |    |    |--- style.scss
    |    |    |--- ...
    |    |--- topics (topics 页面)
    |    |    |--- images
    |    |    |--- topics.html
    | 	 |	  |	...
    |--- crowd (另外一个业务需求模块,每个业务需求模块下会有很多页面)          
    |    |--- index 
    |    |    |--- index.html
  
```

以上是我们的一个项目结构

> * 1.我所想要的是每一个业务需求模块下(source/index)会有很多页面

> * 每一个页面都是一个文件夹(source/index/index,source/index/topics)

> * 2.项目无需后台环境浏览器可以直接打开访问

> * 3.每个页面资源如.sass文件,.js文件等就近维护,用.vue + es6的形式进行组件模块化的开发

> * 4.开发时拥有良好的sourseMap调试 

> * 5.当我们不需要这个业务模块,或者某个页面的时候可以直接删除整个文件夹即可


webpack会帮助我们会为每一个页面生成他自己的css文件,js文件. 

由于是多页应用,在这我的html都是手动创建的(还没找到什么好的解决办法),所以我们直接在我们的index页面里link和script他们

```html
    <link rel="stylesheet" href="../../../Public/css/index/index.css">
	<script src="../../../Public/js/index/index.js"></script>

```

当我们需要上线的时候在用gulp把相对路径给替换成线上路径

#### 二、webpack

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

这很简单就不过多介绍,由于我们是多页应用,我们需要编写一个函数获取所有路口js,生成一个我们想要的路径的对象.

#### 三、entry

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
	*	 entry = { 
	*				'crowd/index' : './source/crowd/index/index.js',
	*				'index/index' : './source/index/index/index.js'
	*  			 }
    *
    **/
    //最后返回entry  给 webpack的entry
    return entry; 
};
```

#### 四、output

```javascript

output: { //输出位置
	path: path.resolve(__dirname, './public/'), //配置输出路径
	filename: './js/[name].js' //文件输出形式
	//关于filename 我们有个变量就是 [name] = entry的key  当然还有别的变量比如[id],[hash]等,大家可以自行发挥
	//我们也能把filename写成  filename : [name]/[name].[name].js 也是可以的
},

```

#### 五、loader 

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


#### 六、 plugins

> * 这里我就只用到一个就是生成 独立的css文件,style嵌套在页面里的方式实在是丑得不行

#### 七、 vue 

这没啥好说的,vue更新之后需要单独出来配置了

```javascript
vue: { //vue的配置,需要单独出来配置
	loaders: {
		js: 'babel'
	}
}
```

####八、 NODE_ENV

> * 以上都是我们的开发配置,在生产环境中,我们还需要添加一些东西

> * 关于调试 在这里我也处理了非常久,如果开发的时候直接把vue的配置都写好,那在 页面是有问题的.所以我们得另外写一套vue,专门在生产环境中使用

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


####九、 gulp 

> * 仅仅只有webpack部分还是没法满足我们的初衷,所以我们需要gulp进行辅助

webpack仅仅只会把我们js路口里的所有东西都处理了,但是我们的页面都是我们自己手动写的(还没想到更好的解决方案)

所以我们需要借助gulp的力量,把我们的.html移入我们想要的目录

但是这样的目录结构输出其实是有问题的

```javascript

--- source (前端开发目录)
    |--- index (一个业务需求模块,每个业务需求模块下会有很多页面)
    |    |--- index (index 页面)
    |    |	  |--- images	
    |    |    |--- index.html 
    |    |    |--- app.vue
    |    |    |--- index.js
    |    |    |--- style.scss
    |    |    |--- ...
    |    |--- topics (topics 页面)
    |    |    |--- images
    |    |    |--- topics.html
    | 	 |	  |	...
    |--- crowd (另外一个业务需求模块,每个业务需求模块下会有很多页面)          
    |    |--- index 
    |    |    |--- index.html

//我们可以知道gulp通过通配符 ./source/**/*.html 匹配到的文件 输入输出目录结构都是相同的

//那我们就会得到以下错误的输出结构

--- Application (错误结构)
    |--- Home
    |   |--- View (线上用户访问的.html目录)
	|		 |--- index (一个业务需求模块)
    | 		 | 	 |--- index (index 页面,多余的目录)
    |		 |	 |	 |--- index.html
    |		 |	 |--- topics (topics页面,多余的目录)
    | 		 |	 |	 |--- topics.html
    |		 |--- crowd (crowd业务模块)
    |		 |	 |--- index (crowd业务模块 index页面,多余的目录)
    |		 |	 |	 |--- index.html

//我们的业务模块文件应该包含所有的业务页面,而无需一个页面就是一个文件夹.
//所以以下才是正确的目录结构

--- Application (正确结构)
    |--- Home
    |   |--- View (线上用户访问的.html目录)
	|	|	|--- index (一个业务需求模块)
    |	|	|	 |--- index.html
    |	|	|	 |--- topics.html
    |	|	|--- crowd (另一个业务需求模块)
    |	|	|	 |--- index.html    			 	
    			 	
```

> * 本人想了非常多种方式都没办法实现,最后找到了唯一的办法(非常的愚蠢的办法,如果您有更好的办法麻烦告诉我 T.T)

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

### 十、后话

年终,前端各种战争大家也都看见了.在这样一个前端需求极速增长,百家争鸣,百花齐放的黄金时代.大家应该持续保持学习的热情

关注时代发展,观望技术发展,不盲目跟风,选择最适合自己的,最符合现有项目的.

倘若一个工具没法为你们的项目带来更好的效率,给开发带来更有益的发展.那你最好保持观望,别盲从.

本人没有经历过grunt时代,但是自从学习前端自动化构建以来也是一路从 grunt -> gulp -> webpack 过渡的

在这期间完全可以了解他们之前的差异和不同,更多的应该学习思想

你应该多质问自己,为什么这个工具当下会火呢?你应该不应该学习?

我十分不赞同那些拿来即用的同学,说什么不久之后就死了,学也没什么用,浪费时间,我抄一个不就好了吗?

虽然我写得都很基础,但我还是希望您别看我的文章.

> * 如果能给您带来不错的学习体验,麻烦请右上角star : ) ` hava a nice day `