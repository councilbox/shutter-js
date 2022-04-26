const { getOperationName } = require('./utils');

const LIST = `
	query recordings($roomNumber: String!){
        recordings(roomNumber: $roomNumber){
			id
            name
			mixed
			mixProgress
			uploaded
			uploadProgress
			duration
			size
			hash
			hashType
			creationDate
			finishDate
			posterUrl
			downloadUrl
			streamingUrl
			audioFile
			extractedAudio
			extractAudioProgress
			uploadedAudio
			uploadAudioProgress
			audioDuration
			audioSize
			audioHash
			audioHashType
			downloadAudioUrl
  			streamingAudioUrl
        }
    }
`;

const GET_IFRAME_URL = `
	query recordingsIframeUrl($roomNumber: String!) {
		recordingsIframeUrl(roomNumber: $roomNumber)
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

		return response.data.recordings;
	}

	async getIframeUrl({ roomNumber }) {
		const variables = { roomNumber };

		const response = await this.#shutterFetch({
			query: GET_IFRAME_URL,
			variables,
			operationName: getOperationName(GET_IFRAME_URL)
		});

		if (response.errors) throw response.errors;

		return response.data.recordingsIframeUrl;
	}
};
