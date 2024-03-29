const { getOperationName } = require('./utils');

const LIST = `
	query organizations ($filters: [Filter], $pagination: Pagination) {
        organizations(filters: $filters, pagination: $pagination) {
			list {
				id
				name
				logo
				created
				owner {
					id
					name
					surname
					email
					language
					created
				}
			}
			total
		}
	}
`;

const CREATE = `
	mutation createOrganization($organization: OrganizationInfo!) {
		createOrganization(organization: $organization) {
			id
			name
			logo
		}
	}
`;

const UPDATE = `
	mutation updateOrganization($organization: OrganizationUpdateInfo!) {
		updateOrganization(organization: $organization) {
			id
			name
			logo
		}
	}
`;

const DELETE = `
	mutation removeOrganization($id: String!) {
		removeOrganization(id: $id) {
			id
			name
			logo
		}
	}
`;


module.exports = class Organizations {
	#shutterFetch

	constructor(shutterFetch) {
		this.#shutterFetch = shutterFetch;
	}

	async list() {
		const variables = {};

		const response = await this.#shutterFetch({
			query: LIST,
			variables,
			operationName: getOperationName(LIST)
		});

		if (response.errors) throw response.errors;

		return response.data.organizations.list;
	}

	async create({ organization }) {
		const variables = { organization };

		const response = await this.#shutterFetch({
			query: CREATE,
			variables,
			operationName: getOperationName(CREATE)
		});

		if (response.errors) throw response.errors;

		return response.data.createOrganization;
	}

	async update({ organization }) {
		const variables = { organization };

		const response = await this.#shutterFetch({
			query: UPDATE,
			variables,
			operationName: getOperationName(UPDATE)
		});

		if (response.errors) throw response.errors;

		return response.data.updateOrganization;
	}

	async delete({ id }) {
		const variables = { id };

		const response = await this.#shutterFetch({
			query: DELETE,
			variables,
			operationName: getOperationName(DELETE)
		});

		if (response.errors) throw response.errors;

		return response.data.removeOrganization;
	}
};
