const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/[name].[contenthash].js",
        path: path.resolve(__dirname, "./dist"),
        assetModuleFilename: 'images/[name][ext]'
    },
    mode: "development",
    module: {
        rules: [{
            test: /.s?css$/i,
            use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        require('tailwindcss'),
                                        require('autoprefixer')
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|svg|jpeg)$/i,
                type: 'asset/resource',
                // use: [{
                //     loader: 'file-loader',
                //     options: {
                //       name: '[name].[ext]',
                //       outputPath: 'fonts/IRANSansX',
                //       publicPath: './src/fonts/IRANSansX'
                //     }
                //   }]
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                use: ["url-loader"]
              },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ESLintPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 9000,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
};