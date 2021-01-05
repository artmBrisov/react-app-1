const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),
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
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    watch: true,
    watchOptions: {
        ignored: ["node_modules"]
    },
    devtool: 'source-map',
    optimization: {
        minimize: false
    }
}