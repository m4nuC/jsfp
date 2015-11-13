var webpack = require("webpack");

module.exports = {
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	watch: true,
	entry: "./src/index",
	output: {
		path: './dist',
		filename: "fp-utils.js"
	},

	module: {
		preLoaders: [
			{
				test: /\.js?$/,
				loaders: ['eslint'],
				// include: path.resolve(ROOT_PATH, 'app')
			}
		],


		loaders: [
			// BABEL
			{
				test: /\.js?$/,
      		exclude: /node_modules/,
            loader: 'babel?presets[]=es2015'
			}
		]
	},

	eslint: {
		configFile: '.eslintrc'
	}
}