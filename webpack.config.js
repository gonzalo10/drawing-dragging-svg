const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimize: false // <---- disables uglify.
		// minimizer: [new UglifyJsPlugin()] if you want to customize it.
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: { loader: 'html-loader' }
			}
		]
	}
};
