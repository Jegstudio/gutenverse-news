const rules = require("gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { output } = require("../config.js");
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals, coreExternals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helper = {
	mode: "development",
	devtool: "source-map",
	entry: {
		"deprecated-block": {
			import: path.resolve(__dirname, "../../src/helper/deprecated-block.js"),
		},
		"downgrade-plugin": {
			import: path.resolve(__dirname, "../../src/wizard/downgrade-plugin.js"),
		},
		"dashboard": {
			import: path.resolve(__dirname, "../../src/dashboard/index.js"),
		},
	},
	externals: {
		...externals,
		...coreExternals,
	},
	stats,
	output,
	module: {
		strictExportPresence: true,
		rules,
	},
	plugins: [
		...plugins,
		new DependencyExtractionWebpackPlugin(),
		new FileManagerPlugin(
			{
				events: {
					onEnd: {
						copy: [
							{
								source: "./build/deprecated-block.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/downgrade-plugin.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/downgrade-plugin.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
							{
								source: "./build/dashboard.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/dashboard.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
						],
					},
				},
				runTasksInSeries: true,
			}
		),
	],
};

module.exports = {
	helper,
};
