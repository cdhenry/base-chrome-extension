const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader", // Creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // Translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader", // Compiles Sass to CSS
                    },
                ],
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
            template: "src/public/popup.html",
            chunks: ["popup"],
        }),
        new HtmlWebpackPlugin({
            filename: "options.html",
            template: "src/public/options.html",
            chunks: ["options"],
        }),
        new HtmlWebpackPlugin({
            filename: "foreground.html",
            template: "src/public/foreground.html",
            chunks: ["foreground"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/public/manifest.json", to: "[name].[ext]" },
                { from: "src/public/background.ts", to: "[name].[ext]" },
                { from: "src/public/inject-script.ts", to: "[name].[ext]" },
                { from: "src/public/icons/*.png", to: "[name].[ext]" },
            ],
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
