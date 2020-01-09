
const MiniCssExtractPlugn=require('mini-css-extract-plugin');

module.exports = function(env, args){
    const _env = env || {};
    let conf=null;
    if (_env.development) {
        conf = require('./config/development.config');
    } else if(_env.production) {
        conf = require('./config/production.config');
    } else {
        conf = require('./config/test.config');
    }
    return {
        entry: {
          main: './src/js/index',
          vendor: ['jquery']
        },
        module: {
            rules: [
                // css
                {test: /\.(scss)$/i, use: [
                    // _env.production ? {loader: MiniCssExtractPlugn.loader, options: {
                    //     publicPath: '../'
                    // }} : 'style-loader',

                    {loader: MiniCssExtractPlugn.loader, options: {
                        publicPath: '../'
                    }},
                    'css-loader',
                    {loader: 'postcss-loader', options: {
                        plugins: [
                            require('autoprefixer')
                        ]
                    }},
                    'sass-loader'
                ]},
                // js
                {test: /\.(js|jsx)$/, use: [
                    {loader: 'babel-loader', options: {
                        presets: ['@babel/preset-env']
                    }},
                    {loader: 'eslint-loader', options: {
                        exclude: /node_modules/
                    }}
                ]},
                // img
                {test: /\.(png|jpg|gif)$/i, use: [
                    {loader: 'url-loader', options: {
                        outputPath: 'imgs/', // 表示输出文件路径前缀
                        limit: 4*1024,
                        esModule: false,
                        // publicPath: '../'
                    }}
                ]},
                // fonts
                {test: /\.(ttf)$/i, use: [
                    {loader: 'url-loader', options: {
                        outputPath: 'fonts/',
                        limit: 4*1024
                    }}
                ]}
            ]
        },
        ...conf

    }
}