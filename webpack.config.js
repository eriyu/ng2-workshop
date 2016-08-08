var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.ts', '.css', '.scss'],
    modulesDirectories:['node_modules','app']
  },
  entry:{
    'polyfill':[
      'zone.js/dist/zone.js',
      'core-js/client/shim.js',
      'reflect-metadata/Reflect.js'
    ],
    'vendor':'vendor.ts',
    'app':['webpack/hot/dev-server','main.ts']
  },
  output: {
    path: __dirname + "/dist",
    filename: "scripts/[name].bundle.js?[hash]"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['raw-loader']
      },
      {
        test: /\.ts/,
        loaders: ['ts-loader','angular2-template-loader'],
        exclude: /node_modules/
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!sass?sourceMap")},
      { test: /\.woff(2)?(\?v=.+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]" },
      { test: /\.(ttf|eot|svg)(\?v=.+)?$/, loader: 'file?name=fonts/[hash].[ext]' },
      {
        test:/\.(png|jpg|jpeg|gif)$/,
        loader:"url?limit=1024&name=images/[name].[ext]"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:"app/index.html",
      filename:"index.html",
      inject:true
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfill'], minChunks: Infinity }),
    new ExtractTextPlugin("styles.css?[hash]")
  ]
}