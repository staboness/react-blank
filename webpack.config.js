const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
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
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
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
    ],
    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: './build',
        watchContentBase: true,
        hot: true
    },
};