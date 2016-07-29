var path              = require('path')
var webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname);
var src       = path.resolve(ROOT_PATH, 'src');

module.exports = {
	entry: {
		main: path.resolve(src, 'main.js')
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		// publicPath: '/dist/',
		chunkFilename: 'js/[id].js?[hash]',
		filename: 'build.js?[hash]'
	},
	/*resolveLoader: {
	 root: path.join(__dirname, 'node_modules'),
	 },*/
	resolve: {
		root: path.join(__dirname, 'node_modules'),
		alias: {
			'vue': 'vue/dist/vue.js'
		},
		extensions: ['', '.js', '.vue', '.scss', '.css'] //设置require或import的时候可以不需要带后缀
	},
	module: {
		noParse: [/vue.js/],
		preLoaders: [
			{ test: /\.js|vue$/, loader: "eslint-loader", exclude: /node_modules/ }
		],
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("css")
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css!sass")
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.html$/,
				loader: 'vue-html'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: 'images/[name].[ext]?[hash]'
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
	plugins: [
		new ExtractTextPlugin("style.css?[hash]"),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: "body"
		}),
	],
	devServer: {
		historyApiFallback: true,
		inline: true,
		hot: true,
		host: '0.0.0.0',
		port: 8200,
		noInfo: false
	},
	vue: { //vue的配置,需要单独出来配置
		loaders: {
			js: 'babel'
		}
	},
	devtool: '#source-map'
};
var vueLoader  = {
	js: 'babel',
	css: ExtractTextPlugin.extract("vue-style!css"),
	scss: ExtractTextPlugin.extract("vue-style!css!sass-loader")
};
if (process.env.NODE_ENV === 'production') {
	module.exports.devtool           = false;
	module.exports.vue.loaders       = vueLoader;
	module.exports.output.publicPath = '/dist';
	// http://vuejs.github.io/vue-loader/workflow/production.html
	module.exports.plugins           = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	])
}
