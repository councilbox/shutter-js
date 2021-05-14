const Client = require('./lib/client');
const { version } = require('./package.json');

module.exports = {
	VERSION: version,
	client: ({ email, password, uri }) => new Client({ email, password, uri })
};
