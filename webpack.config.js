const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        }),
        new DashboardPlugin(),
    ],
}
