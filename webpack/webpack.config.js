const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const glob = require('glob');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'alex.min.js',
    path: path.resolve(__dirname, '/build')
  },
  resolve: {
    extensions: ['.js'],
    modules: [SRC_PATH, 'node_modules'], // 引用模块查找顺序
    alias: {
      '@imgSource': path.resolve(SRC_PATH, 'app', 'assets', 'img'),
      '@components': path.resolve(SRC_PATH, 'app', 'components')
    }
  },
  module: {
    rules: [
      // css
      {
        test: /\.(scss)$/i, use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'sass-loader'
        ],
      },
      // js
      {
        test: /\.(js|jsx)$/i, use: [
          {loader: 'babel-loader', options: {
            presets: ['@babel/preset-env']
          }},
          {loader: 'eslint-loader', options: {
            exclude: /nodule_modules/
          }}
        ]
      },
      // img
      {
        test: /\.(png|gif|jpg)$/, use: [
          {loader: 'url-loader', options: {
            outputPath: 'img/',
            limit: 4*1024,
            esModule: false
          }}
        ]
      },
      // fonts
      {test: /\.(ttf)$/i, use: [
        {loader: 'url-loader', options: {
          outputPath: 'fonts/',
          limit: 4*1024,
        }}
      ]}
    ]
  },
  plugins: [
    new StylelintPlugin({
      files: ['**/*.css', '**/*.scss', '**/*.html']
    })
  ],
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: '3000',
    // historyApiFallback: true, // 任意的 404 响应都可能需要被替代为 index.html
  }
};

glob.sync(path.resolve(__dirname, 'src', 'app', 'pages', '*.html')).forEach(tplPath => {
  module.exports.plugins.push(
    new HtmlPlugin({
      template: 'html-loader?interpolate!' + tplPath,
      filename: path.basename(tplPath)
    })
  )
});