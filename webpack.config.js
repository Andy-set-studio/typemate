// Define webpack stuff
var isProduction = process.env.NODE_ENV === 'production';
var path = require('path');
var plugins = [];

var settings = {
    libraryName: 'typemate',
    inputs: {
        js: {
            entryPath: '/src/typemate.js'
        }
    },
    outputs: {
        js: {
            fileName: 'typemate.js',
            path: 'dist'
        }
    }
};
var webpack = require('webpack');

if(isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
    entry: path.join(__dirname, settings.inputs.js.entryPath),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, settings.outputs.js.path),
        filename: settings.outputs.js.fileName,
        library: settings.libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: plugins
};