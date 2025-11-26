const { blocks } = require('./scripts/blocks');
const { helper } = require('./scripts/helper');
const { dashboard } = require('./scripts/dashboarod');
const { frontendModular } = require( './scripts/frontend-modular' );


module.exports = [
	blocks,
	helper,
	frontendModular,
	dashboard
];
