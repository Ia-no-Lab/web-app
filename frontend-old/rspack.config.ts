import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];
const path = require("path");


export default defineConfig({
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	output: {
    	path: path.resolve(__dirname, "dist"),
    	filename: "bundle.js",
   	 	publicPath: "/",
    },
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
	  	alias: {
			"@": path.resolve(__dirname),
	  	},
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/i,
				type: "asset"
			},
		    {
        		test: /\.css$/,
        		use: ["postcss-loader"],
				type: "css",
      		},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
		isDev ? new RefreshPlugin() : null
	].filter(Boolean),
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	devServer: {
		static: {
		  directory: path.join(__dirname, "dist"),
		},
		historyApiFallback: true,
		port: 5173,
		open: true,
    },
	experiments: {
		css: true
	}
});
