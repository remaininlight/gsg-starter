
var path = require("path");
var webpack = require("webpack");

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// Required for django-webpack-loader
var BundleTracker  = require('webpack-bundle-tracker');
var DashboardPlugin = require('webpack-dashboard/plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
//const WebpackShellPlugin = require('webpack-shell-plugin');
// TODO get prepack working (reduces runtime computation ie. in module loading)
//var PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

module.exports = {
    mode: 'development',
    entry: {
        bundle: './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'build', 'js'),
        //chunkFilename: '[name].bundle.js',
        publicPath: "/static/js/",
        filename: '[name]-[hash].js'
    },
    plugins: [
        new DashboardPlugin(),
        new LiveReloadPlugin(),
        new BundleTracker({path: __dirname, filename: './build/webpack-stats.json'})
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { babelrc: true }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            }
        ]
    },
    devtool: 'inline-source-map',
    watch: true
}