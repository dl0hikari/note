const path=require('path');
const webpack=require('webpack');
const dllAssetPath=path.resolve(__dirname, 'dll');
const dllLibraryName='dllAlex';

module.exports = {
    mode: 'production',
    entry: ['jquery'],
    output: {
        path: dllAssetPath,
        filename: 'vendorExm.js',
        library: dllLibraryName
    },
    plugins: [
        new webpack.DllPlugin({
            name: dllLibraryName,
            path: path.resolve(dllAssetPath, 'manifest.json')
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
};
