class Events {
	constructor(shutterFetch) {
		this.shutterFetch = shutterFetch;
	}

	async create(event){
		const variables = {
			event
		};
		const query = `
			mutation addEvent($event: EventInfo!) {
				addEvent(event: $event) {
					id
					type
					roomNumber
					attendeeID
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
					peerID
					attendeeData
					displayName
					error
					reason
				}
			}
		`;

		const response = await this.shutterFetch({
			query,
			variables
		});

		if(response.errors) throw response.errors;
		return response.data.addEvent;
	}
}

module.exports = Events;