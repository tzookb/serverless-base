const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' ) // Ding
const isProd = process.env.ENV === 'local' ? false : true;
const buildMode = isProd ? 'production' : 'development';
const entryFile = isProd ? slsw.lib.entries : path.resolve('./src/local-serve.js');

module.exports = function() {
  return {
    entry: entryFile,
    target: 'node',
    devtool: 'source-map',
    // Since 'aws-sdk' is not compatible with webpack,
    // we exclude all node dependencies
    externals: [nodeExternals()],
    mode: buildMode,
    optimization: {
      // We no not want to minimize our code.
      minimize: false,
    },
    performance: {
      // Turn off size warnings for entry points
      hints: false,
    },
    plugins: [
      new NodemonPlugin(),
    ],
    // Run babel on all .js files and skip those in node_modules
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: __dirname,
          exclude: /node_modules/,
        },
      ],
    }
  };
};