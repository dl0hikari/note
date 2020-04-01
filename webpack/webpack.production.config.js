const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//
const glob = require('glob');
const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, './build'),
    library: 'ALEXUI'
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
          {
            loader: MiniCssExtractPlugin.loader, options: {
                publicPath: '../'
              }
          },
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
        test: /\.(png|gif|jpg|swf|bmp|svg)$/, use: [
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
    new CleanWebpackPlugin(),
    new StylelintPlugin({
      files: ['**/*.css', '**/*.scss', '**/*.html']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunckFilename: 'css/[id].css'
    })
  ],
  // 当mode: none 可以使用下面代码块进行自由配置压缩
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetWebpackPlugin({
        assetNameRegExp: /\.(scss|css)$/g,
        cssProcessor: require('cssnano'), // 指定一个优化css的处理器，默认cssnano
        cssProcessorOptions: {
          preset: ['default', {
            discardComments: { removeAll: true }, // 对注释的处理
            normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
          }]
        },
        canPrint: true // 是否打印编译过程中的日志
      }),
      new TerserPlugin({
        test: /\.js$/i,
      })
    ]
  },
  // devtool: 'source-map'
};

glob.sync(path.resolve(__dirname, 'src', 'app', 'pages', '*.html')).forEach(tplPath => {
  module.exports.plugins.push(
    new HtmlPlugin({
      template: 'html-loader?interpolate!' + tplPath,
      filename: path.basename(tplPath),
      // minify  Boolean | Object
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      inject: 'body' // 放置js资源位置
    })
  )
});