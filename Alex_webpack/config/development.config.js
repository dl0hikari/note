const HtmlWebpackPlugin=require('html-webpack-plugin');
const StylelintPlugin=require('stylelint-webpack-plugin');
const path=require('path');
const glob=require('glob');

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
    // devServer: {

    // }
};

glob.sync(path.resolve(__dirname, '../', 'templates', '*.html')).forEach(tplPath => {
    module.exports.plugins.push(
        new HtmlWebpackPlugin({
            template: 'html-loader?interpolate!' + tplPath,
            filename: path.basename(tplPath)
        })
    )
});