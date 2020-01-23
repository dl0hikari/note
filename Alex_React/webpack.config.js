const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['node_modules'],
      alias: []
    },
    module: {
      rules: [
        {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_module/}
      ]
    },
    devServer: {
      host: 'localhost'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      })
    ]
};
