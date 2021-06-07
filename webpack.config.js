const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        index: './src/index',
    },
    resolve: {
        alias: {
            'react': 'preact/compat',
            'react-dom': 'preact/compat'
        }
    },
    module: {
        rules: [{
            test: /\.m?jsx?$/,
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"]
                }
            }
        }, {
            test: [/.module.css$/i, /.module.scss$/i],
            use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {modules: true, url: false}}, 'postcss-loader'],
        }, {
            test: [/.css$/i, /.scss$/i],
            use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader'],
            exclude: [/.module.css$/i, /.module.scss$/i]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            use: [
                {
                    loader: 'url-loader'
                }
            ]
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
          h: ['preact', 'h'],
          Fragment: ['preact', 'Fragment'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {from: './public', to: path.resolve('../../', 'static/dist/aiijc')}
                ]
            }
        )
    ],
    watch: (process.env.NODE_ENV === 'development'),
    devtool: (process.env.NODE_ENV === 'development') ? 'cheap-inline-module-source-map' : false,
    output: {
        filename: '[name].min.js',
        path: path.resolve('../../', 'static/dist/aiijc'),
        publicPath: '/',
    }
};
