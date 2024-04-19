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
		backend: {
			import: path.resolve( __dirname, "../../src/helper/backend.js" ),
		},
		tinyslider: {
			import: path.resolve( __dirname, "../../src/helper/tiny-slider.js" ),
		},
		newsticker: {
			import: path.resolve( __dirname, "../../src/helper/newsticker.js" ),
		},
		slider: {
			import: path.resolve( __dirname, "../../src/helper/block-slider.js" ),
		},
		carousel: {
			import: path.resolve( __dirname, "../../src/helper/block-carousel.js" ),
		},
		hero: {
			import: path.resolve( __dirname, "../../src/helper/gvnewshero.js" ),
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
								source: "./build/backend.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/backend.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
							{
								source: "./build/tinyslider.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/tinyslider.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
							{
								source: "./build/newsticker.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/newsticker.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
							{
								source: "./build/slider.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/slider.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
							{
								source: "./build/carousel.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/carousel.asset.php*",
								destination: "./gutenverse-news/lib/dependencies/",
							},
							{
								source: "./build/hero.js*",
								destination: "./gutenverse-news/assets/js/",
							},
							{
								source: "./build/hero.asset.php*",
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
