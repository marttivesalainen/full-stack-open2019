const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const PATHS = {
  src: path.resolve('./src'),
  build: path.resolve('./build')
};

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  devServer: {
    proxy: {
      '/api': 'http://localhost:3003'
    },
    port: '3000',
    contentBase: PATHS.build,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    })
  ],
  output: {
    filename: '[name].js',
    path: PATHS.build,
    publicPath: '/'
  }
};
