const Client = require('./lib/client');
const { version } = require('./package.json');

module.exports = {
	VERSION: version,
	client({ email, password, uri }) {
		return new Client({ email, password, uri });
	}
};
