const HtmlWebpackPlugin=require('html-webpack-plugin');
const StylelintPlugin=require('stylelint-webpack-plugin');
const path=require('path');
const glob=require('glob');
const MiniCssExtrectPlugin=require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const DashboardPlugin=require('webpack-dashboard/plugin');
const webpack=require('webpack');

module.exports = {
    mode: 'development',
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, '../build')
    },
    plugins: [
        new StylelintPlugin({
            files: ['**/*.css', '**/*.scss', '**/*.html', '**/*.vue']
        }),
        new MiniCssExtrectPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new HappyPack({
            id: 'js',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ]
        }),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        // historyApiFallback: true,  // 当使用HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: {
            rewrites: [
              { from: /./, to: '/build/404.html' }
            ]
        },
        disableHostCheck: true, // 绕过主机检查
        // allowedHosts: [],
        port: 3000,
        progress: true,
        host: 'localhost',
        publicPath: '/build/', // 与output path 相配合
        // hot: true,
    }
};

glob.sync(path.resolve(__dirname, '../', 'templates', '*.html')).forEach(tplPath => {
    module.exports.plugins.push(
        new HtmlWebpackPlugin({
            template: 'html-loader?interpolate!' + tplPath,
            filename: path.basename(tplPath)
        })
    )
});
