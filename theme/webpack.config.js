const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  devtool: 'source-map',
  entry: {
    main: [
      path.resolve(__dirname, './src/index.tsx'),
      path.resolve(__dirname, './src/index.scss')
    ],
    polyfills: [
      'core-js',
      'whatwg-fetch'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        include: path.resolve(__dirname, './node_modules/rest-hooks'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
            }
          }
        ],
      },
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        include: path.resolve(__dirname, './src')
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:8]' : '[name]__[local]--[hash:base64:5]'
              },
              importLoaders: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|mp4|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader',
          'glsify-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? '/wp-content/themes/custom-theme/dist/' : 'http://localhost:8081/'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ],
  devServer: {
    port: 8081,
    stats: 'minimal',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}

module.exports = config
