const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: true,
            minify: true,
        }),
    ],
    entry: "./src/index.js",
    output: {
        publicPath: "",
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                use: ['babel-loader']
            },
        ],
    },
    optimization: {
        minimize: true,
    }
}