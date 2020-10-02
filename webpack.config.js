const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        historyApiFallback: true,
    },
    entry: {
        popup: path.resolve(__dirname, "./src/index-popup.tsx"),
        options: path.resolve(__dirname, "./src/index-options.tsx"),
        foreground: path.resolve(__dirname, "./src/index-foreground.tsx"),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                {
                                    plugins: ["@babel/plugin-proposal-class-properties"],
                                },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "popup.html",
            template: "src/popup.html",
            chunks: ["popup"],
        }),
        new HtmlWebpackPlugin({
            filename: "options.html",
            template: "src/options.html",
            chunks: ["options"],
        }),
        new HtmlWebpackPlugin({
            filename: "foreground.html",
            template: "src/foreground.html",
            chunks: ["foreground"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/manifest.json", to: "[name].[ext]" },
                { from: "src/background.ts", to: "[name].[ext]" },
                { from: "src/inject-script.ts", to: "[name].[ext]" },
                { from: "src/*.png", to: "[name].[ext]" },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
