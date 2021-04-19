const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    node: {
        global: true
    },
    resolve: {
        alias: {},
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "http": false,
            "https": false,
            "crypto": false,
            "stream": require.resolve("stream-browserify"),
            "vm": require.resolve("vm-browserify"),
            "os": require.resolve("os-browserify/browser")
        }
    },
    module: {
        rules: [{
                resolve: {
                    extensions: ['.js', '.jsx']
                },
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                resolve: {
                    extensions: ['.ts', '.tsx']
                },
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.(css|scss|less)$/,
                use: [
                    'style-loader', 'css-loader'
                    /* {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    } */
                ]
            },
            {
                test: /\.less$/,
                loader: "less-loader",
            },
            {
                test: /\.(png|jpe?g|gif|svg|otf|ttf|eot|woff2|woff)$/i,
                use: [{
                    loader: 'file-loader',
                }],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React application',
            template: './public/index.html',
            inject: false
        }),
        //Crucial for some libs
        new webpack.ProvidePlugin({
            process: "process/browser.js",
            Buffer: ['buffer', 'Buffer']
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: './build',
        watchContentBase: true,
        hot: true,
        historyApiFallback: true
    },
};
