const { getOperationName } = require('./utils');

const LIST = `
	query rooms {
		rooms {
			roomNumber
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
				id
				externalID
				role
				canShareScreen
				canBroadcast
				canChat
				canMuteAudio
				canMuteVideo
				canMuteAudioAll
				canMuteVideoAll
				canShareFiles
				canSeeAttendeesList
				canRaiseHand
				broadcasting
				mutedMic
				mutedCam
				displayName
				language
				online
				data
			}
			url
			canRecord
			autoRecord
			recording
			state
			deletedAt
		}
	}
`;

const GET = `
	query room($roomNumber: String!){
		room(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
				id
				externalID
				role
				canShareScreen
				canBroadcast
				canChat
				canMuteAudio
				canMuteVideo
				canMuteAudioAll
				canMuteVideoAll
				canShareFiles
				canSeeAttendeesList
				canRaiseHand
				raisedHand
				broadcasting
				mutedMic
				mutedCam
				displayName
				language
				online
				data
			}
			url
			canRecord
			autoRecord
			recording
			state
			deletedAt
		}
	}
`;

const CREATE = `
	mutation createRoom($room: RoomInfo!, $organizationID: String!) {
		createRoom(room: $room, organizationID: $organizationID) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
				id
				externalID
				role
				canShareScreen
				canBroadcast
				canChat
				canMuteAudio
				canMuteVideo
				canMuteAudioAll
				canMuteVideoAll
				canShareFiles
				canSeeAttendeesList
				canRaiseHand
				broadcasting
				mutedMic
				mutedCam
				displayName
				language
				online
				data
			}
			url
			canRecord
			autoRecord
			recording
			state
			roomNumber
		}
	}
`;

const UPDATE = `
	mutation updateRoom($room: UpdateRoomInfo!, $organizationID: String!) {
		updateRoom(room: $room, organizationID: $organizationID) {
			userID
			organizationID
			type
			created
			started
			ended
			displayName
			externalID
			agenda
			presenterID
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			locked
			enabledWaitingRoom
			webhook
			data
			attendees{
				id
				externalID
				role
				canShareScreen
				canBroadcast
				canChat
				canMuteAudio
				canMuteVideo
				canMuteAudioAll
				canMuteVideoAll
				canShareFiles
				canSeeAttendeesList
				canRaiseHand
				broadcasting
				mutedMic
				mutedCam
				displayName
				language
				online
				data
			}
			url
			canRecord
			autoRecord
			recording
			state
			roomNumber
		}
	}
`;

const DELETE = `
	mutation deleteRoom($roomNumber: String!) {
		deleteRoom(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			urlExternalLiveStreaming
		    canExternalLiveStreaming
		    autoExternalLiveStreaming
		    externalLiveStreaming
			canRecord
			autoRecord
			recording
			deletedAt
		}
	}
`;

const START_RECORDING = `
	mutation startRecording($roomNumber: String!) {
		startRecording(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const STOP_RECORDING = `
	mutation stopRecording($roomNumber: String!) {
		stopRecording(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const START_STREAMING = `
	mutation startLiveStreaming($roomNumber: String!) {
		startLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const STOP_STREAMING = `
	mutation stopLiveStreaming($roomNumber: String!) {
		stopLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlLiveStreaming
			canLiveStreaming
			autoLiveStreaming
			liveStreaming
			canRecord
			autoRecord
			recording
		}
	}
`;

const START_EXTERNAL_STREAMING = `
	mutation startExternalLiveStreaming($roomNumber: String!) {
		startExternalLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
			canExternalLiveStreaming
			autoExternalLiveStreaming
			externalLiveStreaming
		}
	}
`;

const STOP_EXTERNAL_STREAMING = `
	mutation stopExternalLiveStreaming($roomNumber: String!) {
		stopExternalLiveStreaming(roomNumber: $roomNumber) {
			userID
			organizationID
			type
			displayName
			urlExternalLiveStreaming
			canExternalLiveStreaming
			autoExternalLiveStreaming
			externalLiveStreaming
		}
	}
`;

const ATTENDEES_URLS = `
	query attendeesURLs($roomNumber: String!){
		attendeesURLs(roomNumber: $roomNumber) {
			attendee{
				id
				role
				canShareScreen
				canBroadcast
				broadcasting
				canChat
				canMuteAudio
				canMuteVideo
				canMuteAudioAll
				canMuteVideoAll
				canShareFiles
				canSeeAttendeesList
				canRaiseHand
				mutedMic
				mutedCam
				displayName
				language
				data
			}
			url
		}
	}
`;


module.exports = class Rooms {
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

		return response.data.rooms;
	}

	async get({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: GET,
			variables,
			operationName: getOperationName(GET)
		});

		if (response.errors) throw response.errors;

		return response.data.room;
	}

	async create({ room, organizationID }) {
		const variables = { room, organizationID };

		const response = await this.#shutterFetch({
			query: CREATE,
			variables,
			operationName: getOperationName(CREATE)
		});

		if (response.errors) throw response.errors;

		return response.data.createRoom;
	}

	async update({ room, organizationID }) {
		const variables = { room, organizationID };

		const response = await this.#shutterFetch({
			query: UPDATE,
			variables,
			operationName: getOperationName(UPDATE)
		});

		if (response.errors) throw response.errors;

		return response.data.updateRoom;
	}

	async delete({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: DELETE,
			variables,
			operationName: getOperationName(DELETE)
		});

		if (response.errors) throw response.errors;

		return response.data.deleteRoom;
	}

	async startRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: START_RECORDING,
			variables,
			operationName: getOperationName(START_RECORDING)
		});

		if (response.errors) throw response.errors;

		return response.data.startRecording;
	}

	async stopRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: STOP_RECORDING,
			variables,
			operationName: getOperationName(STOP_RECORDING)
		});

		if (response.errors) throw response.errors;

		return response.data.stopRecording;
	}

	async startStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: START_STREAMING,
			variables,
			operationName: getOperationName(START_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.startLiveStreaming;
	}

	async stopStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: STOP_STREAMING,
			variables,
			operationName: getOperationName(STOP_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.stopLiveStreaming;
	}

	async startExternalStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: START_EXTERNAL_STREAMING,
			variables,
			operationName: getOperationName(START_EXTERNAL_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.startExternalLiveStreaming;
	}

	async stopExternalStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: STOP_EXTERNAL_STREAMING,
			variables,
			operationName: getOperationName(STOP_EXTERNAL_STREAMING)
		});

		if (response.errors) throw response.errors;

		return response.data.stopExternalLiveStreaming;
	}

	async attendeesUrls({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: ATTENDEES_URLS,
			variables,
			operationName: getOperationName(ATTENDEES_URLS)
		});

		if (response.errors) throw response.errors;

		return response.data.attendeesURLs;
	}
};
