const gql = require('graphql-tag');


function filterDefinition({ kind, name }) {
	return kind === 'OperationDefinition' && name;
}

function mapDefinition({ name: { value } }) {
	return value;
}


const getOperationName = query => {
	const doc = gql`${query}`;

	return doc.definitions
		.filter(filterDefinition)
		.map(mapDefinition)[0];
};

module.exports = {
	getOperationName
};
