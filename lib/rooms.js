const { gql } = require('@apollo/client');


const LIST = gql`
	query {
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

const GET = gql`
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

const CREATE = gql`
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

const UPDATE = gql`
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

const DELETE = gql`
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
			canRecord
			autoRecord
			recording
			deletedAt
		}
	}
`;

const START_RECORDING = gql`
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

const STOP_RECORDING = gql`
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

const START_STREAMING = gql`
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

const STOP_STREAMING = gql`
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

const ATTENDEES_URLS = gql`
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

		const response = await this.#shutterFetch.query({
			query: LIST,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.rooms;
	}

	async get({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch.query({
			query: GET,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.room;
	}

	async create({ room, organizationID }) {
		const variables = { room, organizationID };

		const response = await this.#shutterFetch.mutate({
			mutation: CREATE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.createRoom;
	}

	async update({ room, organizationID }) {
		const variables = { room, organizationID };

		const response = await this.#shutterFetch.mutate({
			mutation: UPDATE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.updateRoom;
	}

	async delete({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch.mutate({
			mutation: DELETE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.deleteRoom;
	}

	async startRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch.mutate({
			mutation: START_RECORDING,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.startRecording;
	}

	async stopRecording({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch.mutate({
			mutation: STOP_RECORDING,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.stopRecording;
	}

	async startStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch.mutate({
			mutation: START_STREAMING,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.startLiveStreaming;
	}

	async stopStreaming({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch.mutate({
			mutation: STOP_STREAMING,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.stopLiveStreaming;
	}

	async attendeesUrls({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch.mutate({
			mutation: ATTENDEES_URLS,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.attendeesURLs;
	}
};
