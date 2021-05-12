const { gql } = require('@apollo/client');


const LIST = gql`
	query attendees($roomNumber: String!){
		attendees(roomNumber: $roomNumber) {
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
	}
`;

const GET = gql`
	query attendee($roomNumber: String!, $attendeeID: String!){
		attendee(roomNumber: $roomNumber, attendeeID: $attendeeID) {
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
	}
`;

const CREATE = gql`
	mutation addAttendee($roomNumber: String!, $attendee: AttendeeInfo!) {
		addAttendee(roomNumber: $roomNumber, attendee: $attendee) {
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
			data
		}
	}
`;

const UPDATE = gql`
	mutation updateAttendee($roomNumber: String!, $attendee: UpdateAttendeeInfo!) {
		updateAttendee(roomNumber: $roomNumber, attendee: $attendee) {
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
			data
		}
	}
`;

const DELETE = gql`
	mutation deleteAttendee($roomNumber: String!, $attendeeID: String!) {
		deleteAttendee(roomNumber: $roomNumber, attendeeID: $attendeeID) {
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
	}
`;

const RAISE_HAND = gql`
	mutation raiseHand($roomNumber: String!, $attendeeID: String!) {
		raiseHand(roomNumber: $roomNumber, attendeeID: $attendeeID) {
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
	}
`;

const LOWER_HAND = gql`
	mutation lowerHand($roomNumber: String!, $attendeeID: String!) {
		lowerHand(roomNumber: $roomNumber, attendeeID: $attendeeID) {
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
	}
`;

const GRANT_WORD = gql`
	mutation grantWord($roomNumber: String!, $attendeeID: String!) {
		grantWord(roomNumber: $roomNumber, attendeeID: $attendeeID) {
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
	}
`;

const DENY_WORD = gql`
	mutation denyWord($roomNumber: String!, $attendeeID: String!) {
		denyWord(roomNumber: $roomNumber, attendeeID: $attendeeID) {
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
	}
`;


module.exports = class Rooms {
	constructor(shutterFetch) {
		this.shutterFetch = shutterFetch;
	}

	async list({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.shutterFetch.query({
			query: LIST,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.attendees;
	}

	async get({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.shutterFetch.query({
			query: GET,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.attendee;
	}

	async create({ roomNumber, attendee }) {
		const variables = { roomNumber, attendee };

		const response = await this.shutterFetch.mutate({
			mutation: CREATE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.addAttendee;
	}

	async update({ roomNumber, attendee }) {
		const variables = { roomNumber, attendee };

		const response = await this.shutterFetch.mutate({
			mutation: UPDATE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.updateAttendee;
	}

	async delete({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.shutterFetch.mutate({
			mutation: DELETE,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.deleteAttendee;
	}

	async raiseHand({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.shutterFetch.mutate({
			mutation: RAISE_HAND,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.raiseHand;
	}

	async lowerHand({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.shutterFetch.mutate({
			mutation: LOWER_HAND,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.lowerHand;
	}

	async grantWord({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.shutterFetch.mutate({
			mutation: GRANT_WORD,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.grantWord;
	}

	async denyWord({ roomNumber, id }) {
		const variables = { roomNumber, attendeeID: id };

		const response = await this.shutterFetch.mutate({
			mutation: DENY_WORD,
			variables
		});

		if (response.errors) throw response.errors;

		return response.data.denyWord;
	}
};
