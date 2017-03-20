var path = require('path')
module.exports = {
	context: path.resolve(__dirname + ''),
	entry: './src/app.jsx',
	output: {
		pathinfo: true,
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
				'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
			],
			// query: {
			// 	presets: ['es2015', 'react']
			// }
		}]
	}
}