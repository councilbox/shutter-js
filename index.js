const client = require( './lib/client');
const { version } = require('./package.json');

module.exports = {
	VERSION: version,
	client: function(options) {
		return new client(options);
	}
};