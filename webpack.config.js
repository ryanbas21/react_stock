
module.exports = {
  entry: './public/app.jsx',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
    },
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
		contentBase: './',
		port: 8080,
		noInfo: true,
		//hot: true,
		inline: true,
		proxy: {
			'/': {
				bypass: function (req, res, proxyOptions) {
					return '/public/index.html';
				}
			},
   		'/stock': { target: 'http://localhost:3000', secure: false }
		}
	},
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};
