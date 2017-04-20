var path = require('path');
var webpack = require("webpack");
module.exports = {
	context: path.resolve(__dirname + ''),
	entry: './src/app.jsx',
	output: {
		// pathinfo: true,
		path: path.resolve(__dirname + '/assets'),
		publicPath: '/assets',
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: [
				// 'react-hot',
				'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
			],
			// query: {
			// 	presets: ['es2015', 'react']
			// }
		}]
	}/*,
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
	]*/
}