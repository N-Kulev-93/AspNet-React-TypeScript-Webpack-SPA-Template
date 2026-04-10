import path from "node:path";
import { fileURLToPath } from "node:url";
import webpack from "webpack";
import "webpack-dev-server";
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
    mode: "production",
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
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlBundlerPlugin({
            entry: {
                index: {
                    import: "index.html",
                    data: {
                        title: "Welcome to fat cats SPA template."
                    }
                }
            },
            js: {
                filename: "[name].bundle.js",
                outputPath: "assets/js"
            }
        })
    ]
};

export default config;