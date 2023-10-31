const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Coffee Shop App',
    inject: 'body',
    template: path.join(__dirname, './src/index.html'),
    // templateParameters: {
    //   titleValue: 'This is Cool!'
    // }
  })]
};