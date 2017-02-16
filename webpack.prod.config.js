'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    devtool: 'cheap-module-source-map',
    entry: [
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
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: '/node_modules/',
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.(png)$/,
                exclude: '/node_modules/',
                loader: 'file?name=themes/default/assets/images/[name].[ext]'
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }),
        new HtmlWebpackPlugin({
            template: 'frontend/index.html',
            hash: true
        })
    ]
};

module.exports = config;
