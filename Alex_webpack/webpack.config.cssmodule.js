
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

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
                // css scss
                {test: /\.(css)$/i, use: [
                    {loader: MiniCssExtractPlugin.loader, options: {
                        publicPath: '../'
                    }},
                    {loader: 'css-loader', options: {
                        modules: {  // css module
                          mode: 'local',
                          localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }},
                    {loader: 'postcss-loader', options: {
                        plugins: [
                            require('autoprefixer')
                        ]
                    }}
                ]},
                {test: /\.(scss)$/i, use: [
                    // _env.production ? {loader: MiniCssExtractPlugn.loader, options: {
                    //     publicPath: '../'
                    // }} : 'style-loader',

                    {loader: MiniCssExtractPlugin.loader, options: {
                        publicPath: '../'
                    }},
                    {loader: 'css-loader', options: {
                        modules: {
                          mode: 'local',
                          localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }},
                    {loader: 'postcss-loader', options: {
                        plugins: [
                            require('autoprefixer')
                        ]
                    }},
                    'sass-loader'
                ]},
                // js
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        {loader: 'babel-loader', options: {
                            presets: ['@babel/preset-env']
                        }},
                        'eslint-loader'
                    ],
                    exclude: /node_modules/
                },
                // img
                {test: /\.(png|jpg|gif)$/i, use: [
                    {loader: 'url-loader', options: {
                        outputPath: 'imgs/', // 表示输出文件路径前缀
                        limit: 4*1024,
                        esModule: false,  // html文件中src引用显示 [object Module]
                        // publicPath: '../test' // 打包文件中引用图片文件的路径前缀--优先级高于output下的publicPath 高于 MiniCssExtractPlugin下的publicPath
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