const gql = require('graphql-tag');
const { getOperationName } = require('./utils');


const ADD_EVENT = gql`
	mutation addEvent($event: EventInfo!) {
		addEvent(event: $event) {
			id
			type
			roomNumber
			attendeeID
			date
			ip
			platform {
				osName
				osVersion
				browserName
				browserVersion
				userAgent
			}
			audioSource
			videoSource
			audioDevices {
				deviceId
				label
				kind
				groupId
			}
			videoDevices {
				deviceId
				label
				kind
				groupId
			}
			peerID
			displayName
			error
			reason
			content
			old
		}
	}
`;


module.exports = class Events {
	#shutterFetch

	constructor(shutterFetch) {
		this.#shutterFetch = shutterFetch;
	}

	async create(event) {
		const variables = {
			event
		};

		const response = await this.#shutterFetch({
			query: ADD_EVENT,
			variables,
			operationName: getOperationName(ADD_EVENT)
		});

		if (response.errors) throw response.errors;

		return response.data.addEvent;
	}
};
