/**
 * Created by kodo on 16/1/26.
 */
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var vue = require('vue-loader');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var getEntry = function () {
    var entry = {};
    glob.sync('./source/**/*.js').forEach(function (name) {
        var n = name.slice(name.lastIndexOf('source/') + 7, name.length - 3);
        n = n.slice(0, n.lastIndexOf('/'));
        entry[n] = name;
    });
    console.log(entry);
    return entry;
};

module.exports = {
    entry: getEntry(), //路口
    output: { //输出位置
        path: path.resolve(__dirname, './public/'), //配置输出路径
        filename: './js/[name].js' //文件输出形式
    },
    resolve: {//一些配置项
        extensions: ['', '.js', '.vue','.scss'] //设置require或import的时候可以不需要带后缀
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: "vue"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", 'css-loader!autoprefixer!sass-loader')
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=10000&name=./images/[name].[ext]?[hash:10]',
                /*query: {
                    limit: 10000,
                    name: './images/[name].[ext]?[hash:8]'
                }*/
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: '[name].[ext]?mimetype=image/svg+xml'
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: '[name].[ext]?mimetype=application/font-woff2'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query: {
                    name: '[name].[ext]?mimetype=application/font-woff2'
                }
            }
        ]
    },
    babel: { //配置babel
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    plugins: [ //编译的时候所执行的插件数组
        new ExtractTextPlugin('./css/[name].css')
        //new HtmlWebpackPlugin('./html/[name].html')
    ],
    vue: { //vue的配置,需要单独出来配置
        loaders: {
            js: 'babel'
        }
    }
};
var vueLoader = {
    js: 'babel',
    css: ExtractTextPlugin.extract("vue-style-loader", "css-loader"),
    sass: ExtractTextPlugin.extract("vue-style-loader", "css-loader", 'sass-loader')
};
if (process.env.NODE_ENV === 'production') {
    module.exports.vue.loaders = vueLoader;
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
} else {
    module.exports.devtool = 'source-map';
}
