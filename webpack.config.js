'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: [
        '!!style!css!purecss/build/pure-min.css',
        'whatwg-fetch',
        path.resolve(__dirname, 'frontend/index.jsx')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'frontend'),
                exclude: '/node_modules/',
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ]
                }
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'frontend'),
                exclude: '/node_modules/',
                loader: "style-loader!css-loader"
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/index.html',
            hash: true
        })
    ]
};

module.exports = config;
