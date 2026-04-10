import path from "node:path";
import { fileURLToPath } from "node:url";
import webpack from "webpack";
import "webpack-dev-server";
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { title } from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
    mode: "development",
    devServer: {
        hot: true,
        open: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8001',
            },
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: ['react-refresh/babel']
                        }
                    },
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@src': path.join(__dirname, 'src'),
            '@public': path.join(__dirname, 'public')
        }
    },
    output: {
        path: path.resolve(__dirname, "../wwwroot"),
    },
    plugins: [
        new HtmlBundlerPlugin({
            entry: {
                index: {
                    import: "public/index.html",
                    data: {
                        title: "Welcome to fat cats SPA template."
                    }
                }
            },
            js: {
                filename: "[name].bundle.js",
                outputPath: "dist/assets/js"
            }
        }),
        new ReactRefreshWebpackPlugin()
    ]
};

export default config;