const path = require('path')
const webpack = require('webpack')

//additional plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//module settings
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app:[
      './js/app.js',
      './scss/style.scss'
    ],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '../'
  },
  devServer: {
    contentBase: './app'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            },
          ],
          fallback:'style-loader',
        })
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(
      './css/[name].css'
    ),
  ],
}