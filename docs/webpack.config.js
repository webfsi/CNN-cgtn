const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: ['./scripts/main.js', './css/sass/style.scss']
  },
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'scripts'),
    publicPath: path.resolve("/scripts") 
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          // 'group-css-media-queries-loader',
          'sass-loader',
        ],
      },
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      }
    ]
  },
  plugins: [
      /*new webpack.HotModuleReplacementPlugin(),*/
      new MiniCssExtractPlugin({
        filename: 'main.css',
      })
  ],
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    hot: true,
    port: 8085
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })],
  },
};