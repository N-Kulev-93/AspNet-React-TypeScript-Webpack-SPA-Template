import path from "node:path";
import { fileURLToPath } from "node:url";
import webpack from "webpack";
import "webpack-dev-server";
import HtmlBundlerPlugin from "html-bundler-webpack-plugin";
import FaviconsBundlerPlugin from "html-bundler-webpack-plugin/plugins/favicons-bundler-plugin"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: [{ loader: "babel-loader" }]
            },
            {
                test: /\.s?css$/,
                use: ['css-loader', 'sass-loader'],
            },
            {
                test: /\.(ico|png|jpe?g|svg)/,
                type: 'asset/resource',
                generator: {
                    filename: '[name].[hash:8][ext]',
                },
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '...'],
        alias: {
            '@src': path.join(__dirname, 'src'),
            '@images': path.join(__dirname, 'images')
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
                outputPath: "dist/assets/js"
            }
        }),
        new FaviconsBundlerPlugin({
            enabled: 'auto',
            faviconOptions: {
                path: '/dist/assets/images',
                icons: {
                    android: true,
                    favicons: true,
                    windows: false,
                    yandex: false,
                    appleIcon: false,
                    appleStartup: false
                }
            }
        })
    ]
};

export default config;