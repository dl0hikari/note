const StylelintPlugin=require('stylelint-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        filename: "bundle.min.js",
    },
    plugins: [
        new StylelintPlugin({
            files: ['**/*.css', '**/*.sass', '**/*.html', '**/*.vue']
        })
    ]
};