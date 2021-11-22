const { getOperationName } = require('./utils');

const LIST = `
	query frames($roomNumber: String!, $attendeeID: String) {
		frames(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			status
			date
			roomNumber
			attendeeID
			url
		}
	}
`;

const CAPTURE_ROOM = `
	mutation captureRoomFrame($roomNumber: String!) {
		captureRoomFrame(roomNumber: $roomNumber) {
			id
			status
			date
			roomNumber
			attendeeID
		}
	}
`;

const CAPTURE_ATTENDEE = `
	mutation captureAttendeeFrame($roomNumber: String!, $attendeeID: String!) {
		captureAttendeeFrame(roomNumber: $roomNumber, attendeeID: $attendeeID) {
			id
			status
			date
			roomNumber
			attendeeID
		}
	}
`;


module.exports = class Recordings {
	#shutterFetch

	constructor(shutterFetch) {
		this.#shutterFetch = shutterFetch;
	}

	async list({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: LIST,
			variables,
			operationName: getOperationName(LIST)
		});

		if (response.errors) throw response.errors;

		return response.data.frames;
	}

	async captureRoom({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: CAPTURE_ROOM,
			variables,
			operationName: getOperationName(CAPTURE_ROOM)
		});

		if (response.errors) throw response.errors;

		return response.data.captureRoomFrame;
	}
	
	async captureAttendee({ roomNumber, attendeeID }) {
		const variables = { roomNumber, attendeeID };

		const response = await this.#shutterFetch({
			query: CAPTURE_ATTENDEE,
			variables,
			operationName: getOperationName(CAPTURE_ATTENDEE)
		});

		if (response.errors) throw response.errors;

		return response.data.captureAttendeeFrame;
	}
};
