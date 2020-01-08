const HtmlWebpackPlugin=require('html-webpack-plugin');
const StylelintPlugin=require('stylelint-webpack-plugin');
const path=require('path');
const glob=require('glob');
const MiniCssExtrectPlugin=require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    output: {
        filename: "bundle.min.js"
    },
    plugins: [
        new StylelintPlugin({
            files: ['**/*.css', '**/*.sass', '**/*.html', '**/*.vue']
        })
    ],
    devtool: 'source-map',
    devServer: {
        port: 3000,
        progress: true,
        host: 'localhost'
    }
};

glob.sync(path.resolve(__dirname, '../', 'templates', '*.html')).forEach(tplPath => {
    module.exports.plugins.push(
        new HtmlWebpackPlugin({
            template: 'html-loader?interpolate!' + tplPath,
            filename: path.basename(tplPath)
        }),
        new MiniCssExtrectPlugin()
    )
});