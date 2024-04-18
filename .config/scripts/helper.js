const rules                             = require( "gutenverse-core/.config/rules" );
const path                              = require( "path" );
const FileManagerPlugin                 = require( "filemanager-webpack-plugin" );
const { output }                        = require( "../config.js" );
const { stats, plugins }                = require( "gutenverse-core/.config/config" );
const { externals, coreExternals }      = require( "gutenverse-core/.config/externals" );
const DependencyExtractionWebpackPlugin = require( "@wordpress/dependency-extraction-webpack-plugin" );
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helper = {
	mode: "development",
	devtool: "cheap-module-source-map",
	entry: {
		helper: {
			import: path.resolve( __dirname, "../../src/helper/index.js" ),
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
								source: "./.config/vendor/scripts/*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/helper.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/helper.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
							{
								source: "./src/helper/isotope.js",
								destination: "./gutenverse-news/assets/js/",
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
