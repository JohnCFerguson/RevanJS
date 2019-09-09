const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    watch: false,
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                rules: [
                  {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                  }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [{
                  loader: 'style-loader', // inject CSS to page
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                  loader: 'postcss-loader', // Run post css actions
                  options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                      return [
                        require('precss'),
                        require('autoprefixer')
                      ];
                    }
                  }
                }, {
                  loader: 'sass-loader' // compiles Sass to CSS
                }]
              },
              {
                rules: [
                  {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                      },
                    ],
                  },
                ],
              },
        ]
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
    ]
};
