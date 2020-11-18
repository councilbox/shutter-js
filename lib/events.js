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