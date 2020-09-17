const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = (env, argv) => {
  const isDevelopment = argv?.mode === 'development'

  return {
    entry: {
      app: path.join(__dirname, 'src', 'main.js'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          use: {
            loader: '@sucrase/webpack-loader',
            options: {
              transforms: [],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                // See: https://github.com/vuejs/vue-style-loader/issues/46
                esModule: false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json', '.vue'],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
    ],
    devtool: isDevelopment ? 'inline-source-map' : undefined,
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      port: 8000,
      open: true,
    },
  }
}