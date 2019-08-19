const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV } = process.env;

const PUG_PAGES = fs.readdirSync(`${__dirname}/src/pages`).filter((fileName) => fileName.endsWith('.pug'));

const JS = {
  test: /\.js$/i,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['@babel/preset-env'] }
  }]
};

const CSS = {
  test: /\.css$/i,
  use: [{
    loader: MiniCssExtractPlugin.loader,
    options: { hmr: NODE_ENV === 'development' }
  },
  { loader: 'css-loader' }
  ]
};

const SASS = {
  test: /\.sass$/i,
  use: [{
    loader: MiniCssExtractPlugin.loader,
    options: { hmr: NODE_ENV === 'development' }
  },
  { loader: 'css-loader' },
  { loader: 'sass-loader', options: { outputStyle: NODE_ENV === 'development' ? 'expanded' : 'compressed' } }
  ]
};

const PUG = {
  test: /\.pug$/i,
  use: ['html-loader?attrs=false', 'pug-html-loader']
};

const settings = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'js/[name].js'
  },
  module: { rules: [SASS, CSS, JS, PUG] },
  plugins: [
    ...PUG_PAGES.map((item) => new HtmlWebpackPlugin({
      filename: item.replace(/\.pug/i, '.html'), template: `src/pages/${item}`, inject: false
    })),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new CopyPlugin([{ from: './src/img', to: './img' }, { from: './src/fonts', to: './fonts' }])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'lib',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -30,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  devtool: NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
  devServer: {
    contentBase: '/',
    overlay: true,
    compress: true,
    historyApiFallback: true,
    port: 3000,
    host: '192.168.1.101'
  }
};

module.exports = (env, { mode }) => {
  switch (mode) {
  case 'production': {
    const plugins = [...settings.plugins, new CleanWebpackPlugin(['./dist/'])];
    return { ...settings, plugins };
  }
  case 'development': {
    return { ...settings, watch: true, watchOptions: { ignored: /node_modules/ } };
  }
  default: {
    return settings;
  }
  }
};
