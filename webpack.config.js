const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'dist';
const PLATFORM = process.env.NODE_ENV;

let plugins = [
  new Dotenv({ path: '.env' }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
  }),
  new webpack.HotModuleReplacementPlugin(),
  new WebpackPwaManifest({
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    background_color: '#ffffff',
    crossorigin: 'use-credentials',
    icons: [
      // {
      //   src: path.resolve('src/assets/icon.png'),
      //   sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      // },
      // {
      //   src: path.resolve('src/assets/large-icon.png'),
      //   size: '1024x1024' // you can also use the specifications pattern
      // },
      // {
      //   src: path.resolve('src/assets/maskable-icon.png'),
      //   size: '1024x1024',
      //   purpose: 'maskable'
      // }
    ],
  }),
];

if (PLATFORM === 'production') {
  plugins = plugins.concat(
    new MiniCssExtractPlugin({ filename: 'css/[name]_[hash].css' }),
    new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'static' }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CopyPlugin(
      [
        { from: './src/client/assets/fonts', to: './fonts' },
      ],
    ),
  );
}

if (PLATFORM === 'development') {
  plugins = plugins.concat(
    new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: 'static' }),
  );
}

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/client/index.js',
  ],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: `js/main${PLATFORM === 'production' ? '_[hash]' : ''}.js`,
    publicPath: `${PLATFORM === 'production' ? './' : '/'}`,
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.s?css$/,
      use: [
        PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.svg$/,
      use: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [
                { removeTitle: false },
              ],
              floatPrecision: 2,
            },
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf)$/,
      exclude: /node_modules/,
      loader: 'url-loader',
      options: {
        name: './fonts/[name].[ext]?[hash]',
        outputPath: './fonts/',
        publicPath: './fonts/',
      },
    },
    {
      test: /\.(jpg|png|webp|gif)$/,
      exclude: /node_modules/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]',
        outputPath: './image/',
        publicPath: './image/',
      },
    },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      client: path.resolve(__dirname, 'src/client'),
      server: path.resolve(__dirname, 'src/server'),
    },
  },
  devServer: {
    publicPath: '/',
    host: '0.0.0.0',
    contentBase: './',
    port: process.env.PORT_LOCAL_CLIENT,
    open: false,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': `http://0.0.0.0:${process.env.PORT_LOCAL_SERVER}`,
      secure: false,
      changeOrigin: false,
    },
  },
  plugins,
  node: {
    fs: 'empty',
  },
};
