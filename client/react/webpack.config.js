var path = require('path');
var HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'react.bundle.js',
		path: path.resolve(__dirname, '../../dist/react'),
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
			},
			{
        test: /\.html$/,
        use: [{
					loader: "html-loader"
				}]
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
		}
    ]
	},
	plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};