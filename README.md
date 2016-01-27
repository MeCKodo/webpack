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

1.我所想的是每一个业务需求模块下(source/index1)会有很多页面
	每一个页面都是一个文件夹(source/index1/index1-1,source/index1/index1-2)

2.项目无需后台环境可以浏览器可以直接打开访问

3.每个页面资源.sass文件,.js文件等就近维护,用.vue + es6的形式进行组件模块的开发

4.当我们不需要这个业务模块,或者某个页面的时候可以直接删除整个文件夹即可


webpack会帮助我们会为每一个页面生成他自己的css文件,js文件. 所以我们直接在我们的index页面里link和script他们

```html
    <link rel="stylesheet" href="../../../Public/css/index/index.css">
	<script src="../../../Public/js/index/index.js"></script>

```

当我们需要上线的时候再把相对路径给替换成线上环境



