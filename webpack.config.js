// ./node_modules/.bin/webpack -d --watch
let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: './src/js/index.jsx',
    output: {
        path:  path.resolve(__dirname, 'public/js'),
        filename: 'main.js'
    },
    devtool: 'cheap-source-map',
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                },
            },
            {
                test: /.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
