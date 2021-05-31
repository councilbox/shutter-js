const getOperationName = doc => (doc.definitions
	.filter(definition => definition.kind === 'OperationDefinition' && definition.name)
	.map(x => x.name.value)[0] || null);

module.exports = {
	getOperationName
};
