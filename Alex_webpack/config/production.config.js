const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const StylelintPlugin=require('stylelint-webpack-plugin');
const { CleanWebpackPlugin }=require('clean-webpack-plugin');
const Uglifyjs=require('uglifyjs-webpack-plugin');
const MiniCssExtrectPlugin=require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin=require('optimize-css-assets-webpack-plugin');
const glob=require('glob');


module.exports = {
    mode: 'development',
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, '../build'),
        // publicPath: 'http://www.baidu.com/'  // 打包文件中引用文件的路径前缀
    },
    plugins: [
        new StylelintPlugin({
            files: ['**/*.css', '**/*.scss', '**/*.html', '**/*.vue']
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtrectPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new OptimizeCssAssetPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new Uglifyjs()
    ]
};

glob.sync(path.resolve(__dirname, '../', 'templates', '*.html')).forEach(tplPath => {
    module.exports.plugins.push(
        new HtmlWebpackPlugin({
            template: 'html-loader?interpolate!' + tplPath,
            filename: path.basename(tplPath)
        })
    )
});