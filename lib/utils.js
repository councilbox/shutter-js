const gql = require('graphql-tag');

const getOperationName = query => {
	const doc = gql`${query}`;

	return doc.definitions
		.filter(definition => definition.kind === 'OperationDefinition' && definition.name)
		.map(x => x.name.value)[0] || null;
};

module.exports = {
	getOperationName
};
