const rules                              = require( "../../../gutenverse-core/.config/rules" );
const path                               = require( "path" );
const FileManagerPlugin                  = require( "filemanager-webpack-plugin" );
const { outputBlocks, assets, jsonCopy } = require( "../config" );
const { stats, plugins }                 = require( "../../../gutenverse-core/.config/config" );
const { externals, coreExternals }       = require( "../../../gutenverse-core/.config/externals" );
const DependencyExtractionWebpackPlugin  = require( "@wordpress/dependency-extraction-webpack-plugin" );
const copyPath                           = jsonCopy();

const blocks = {
	mode: "development",
	devtool: "cheap-module-source-map",
	entry: {
		blocks: {
			import: path.resolve( __dirname, "../../src/blocks/index.js" ),
		},
	},
	externals: {
		...externals,
		...coreExternals,
	},
	stats,
	output: outputBlocks,
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
						...assets,
						...copyPath,
						{
							source: "./build/blocks/blocks.js*",
							destination: "./gutenverse-news/assets/js/",
						},
						{
							source: "./build/blocks/blocks.asset.php*",
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
	blocks,
};
