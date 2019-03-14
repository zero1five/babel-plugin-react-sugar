const os = require('os');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  appSrc: resolveApp('application'),
  appRoot: resolveApp(''),
};

module.exports = {
  entry: {
    app: './application/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
    clientLogLevel: 'none',
    watchContentBase: true,
    quiet: true,
    overlay: false,
    inline: true,
    publicPath: '/',
    watchOptions: {
      ignored: /\bnode_modules\b/,
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: 'happypack/loader?id=JSLoader',
        include: paths.appSrc,
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'less-loader'],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: paths.appRoot,
      verbose: false,
    }),
    new HappyPack({
      id: 'JSLoader',
      loaders: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
            ],
            plugins: [
              require.resolve('@babel/plugin-transform-runtime'),
              require.resolve('@babel/plugin-proposal-class-properties'),
              [require.resolve('./lib/cjs')],
            ],
          },
        },
      ],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HtmlWebpackPlugin({
      template: './application/public/index.html',
      favicon: './application/public/favicon.ico',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextWebpackPlugin('css/style.css'),
  ],
};
