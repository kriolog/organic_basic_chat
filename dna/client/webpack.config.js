var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

module.exports = {
  'resolve': {
    'extensions': ['', '.tag', '.js'],
    'modulesDirectories': ['web_modules', 'node_modules', 'client/common']
  },
  'plugins': [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'oval': 'organic-oval',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('[name].css')
  ],
  'module': {
    'preLoaders': [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loaders: [
          'organic-oval/webpack/oval-loader',
          'organic-oval/webpack/oval-control-statements-loader'
        ]
      }
    ],
    'loaders': [
      {
        test: /\.js|.tag$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['transform-react-jsx', { pragma: 'createElement' }]
          ],
          presets: ['es2015']
        }
      },
      // Extract css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'less-loader?modules&importLoaders=1!postcss-loader')
      },
      // extract less files
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1!less-loader!postcss-loader')
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer]
  }
}
