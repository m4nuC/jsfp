var webpack = require("webpack");

var BUILD_FOLDER = __dirname + "/dist";

module.exports = {
	context: __dirname,
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	watch: true,
	entry: "./src/index",
	output: {
		path: BUILD_FOLDER,
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