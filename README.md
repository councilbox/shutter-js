# SHUTTER JS SDK

[![License](https://img.shields.io/github/license/Councilbox/shutter-js)]()
[![Version](https://img.shields.io/github/package-json/v/Councilbox/shutter-js)]()
[![NPM](https://img.shields.io/npm/v/@councilbox/shutter-js)]()

A javascript sdk for Shutter built with webpack, babel & es6. This can be used
in node or in the browser*.

NOTE: If used in the browser do not publish your private api key in frontend
code.

- [Install](#install)
- [Setup Client](#setup-client)
- [Methods](#methods)

## Install

- Requires node.js >= 14.x

```sh
npm i @councilbox/shutter-js
```

## Setup Client

Next, require the module and instantiate a shutter client by calling
`new Shutter` and setup the client with basic auth credentials
`(email: 'example@mail.com', password: 'your_pass_here')`. Also need an api url
provided by shutter team.

```js
import Shutter from '@councilbox/shutter-js';

const shutter = new Shutter({
  email: "example@mail.com",
  password: "your_pass_here",
  uri: "example.shutter.com"
});
```

## Methods

The following service methods are available to instantiated clients. The examples assume you have already created a shutter client as `shutter` with valid credentials.

- [users](#users)
  - [me](#me)
  - [create](#create)
  - [delete](#delete)
- [organizations](#organizations)
  - [list](#list)
  - [create](#create-1)
  - [update](#update)
  - [delete](#delete-1)
- [rooms](#rooms)
  - [list](#list-1)
  - [get](#get)
  - [create](#create-2)
  - [update](#update-1)
  - [delete](#delete-2)
  - [startRecording](#startrecording)
  - [stopRecording](#stoprecording)
  - [startStreaming](#startstreaming)
  - [stopStreaming](#stopstreaming)
  - [attendeesUrls](#attendeesurls)
- [attendees](#attendees)
  - [list](#list-2)
  - [get](#get-1)
  - [getURL](#geturl)
  - [create](#create-3)
  - [update](#update-2)
  - [delete](#delete-3)
  - [raiseHand](#raisehand)
  - [lowerHand](#lowerhand)
  - [grantWord](#grantword)
  - [denyWord](#denyword)
- [recordings](#recordings)
  - [list](#list-3)
  - [getIframeUrl](#getiframeurl)

Method naming conventions:

- `get` or `get{{Item}}` - expected response for client is a single object
- `list` or `list{{Items}}` - expected response for client is a list of objects
- `create` or `create{{Item}}` - expected response for client is a single object
- `update` or `update{{Item}}` - expected response is an object with a status
  message
- `delete` or `delete{{Item}}` - expected response is an object with a status
  message

### users

#### me

`shutter.users.me()`

Example:

```js
try {
  const me = await shutter.users.me();
  console.log(me) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```
{
  id: '109bec0f8aaef2395f481059',
  name: 'Example',
  surname: 'test',
  email: 'example@shutter.com',
  type: 'ACCOUNT',
  organizations: [
    {
      id: '109bec1d8aaef2395f48105c',
      name: 'Test Org',
      logo: <logo_url>,
      created: '1620831261329'
    }
  ],
  language: 'en',
  state: 'UNCONFIRMED',
  created: '1620831247972'
}
```

#### create

`shutter.users.create({ user })`

Example:

```js
try {
  const createdUser = await shutter.users.create({
 user: {
  name: "test",
  email: "test@shutter.com"
 }
  });
  console.log(createdUser) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '609ab5190ae391f4e90d10f1',
  name: 'test',
  email: "test@shutter.com"
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
name              | Name of the user.
email             | Email address of the user. Example: "Jhon <jhon@host.com>".

#### delete

`shutter.users.delete({ id })`

Example:

```js
try {
  const deletedUser = await shutter.users.delete({ id: "109e4d75ec5805340e6ccaf7" });
  console.log(deletedUser) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```
{
  id: '109e4d75ec5805340e6ccaf7',
  name: 'Test',
  surname: 'User',
  email: 'test@shutter.com',
  type: 'BASIC',
  language: 'en',
  state: 'UNCONFIRMED',
  created: '1620987253103',
  organizations: []
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
id                | User ID.

### organizations

#### list

`shutter.organizations.list()`

Example:

```js
try {
  const organizations = await shutter.organizations.list();
  console.log(organizations) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
[
  {
    id: '109bec1d8aaef2395f48105c',
    name: 'Test Org 1',
    logo: <logo_url>,
    created: '1620831261329',
    owner: {
      id: '109bec0f8aaef2395f481059',
      name: 'Test',
      surname: 'SHUTTER',
      email: 'test@shutter.com',
      language: 'en',
      created: '1620831247972'
    }
  },
  ...
]
```

#### create

`shutter.organizations.create({ organization })`

Example:

```js
try {
  const organization = await shutter.organizations.create({
   organization: {
    name: `Test Org`,
    logo: {
      filetype: 'png',
      base64: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEySURBVDiNhdJPK0VhEMfxz3UlsmDBQkn+lPxZKJYsRCErO2WpvAXvwXuwJaykJGWHYmFhgZ2UUjZYyC0RizM3zz0d3alper7PzO/Mc2ZKim0ZvTn2gN18Yumfwn7c5+6qrEaoMZc0jDNcFXRVZVMpzAvAEMZwjdFgNwmrsYYCgQ6sRXwOT1ldgSvsROwOT1ldgQlsRmwKT1ldgbtIvMNbeMpqrOgn9qFdNuKRYE8JqysAr5FcKWA1VsIMFuJcwa1smR4wGfw8YSNoidqjMlaxh/cQ+sKl7M1daI5Oq2wcBzjFYhnTmI83fmJLtm2H+MEjThI2iE7M4qUU7WxjI3nKWRQsxXk/YXCMdaw0xJe7cRGX6chew/NjHJCtdaWMObTK9r4n2hbCbfjwN432yPmO2PQLRLdIycezsR4AAAAASUVORK5CYII='
    }
   }
  });
  console.log(organization) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e4d71ec5805340e6ccaf3',
  name: 'Test Org',
  logo: <logo_url>
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
name              | Name of the organization.
logo              | Need two fields: filetype -> file type (png, jpeg, gif...); base64 -> file base64 encoded string.

#### update

`shutter.organizations.update({ organization })`

Example:

```js
try {
  const updatedOrganization = await shutter.organizations.update({
    organization: {
      id: '109e4d71ec5805340e6ccaf3',
      name: `Test Org Updated`,
      logo: {
        filetype: 'png',
        base64: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEySURBVDiNhdJPK0VhEMfxz3UlsmDBQkn+lPxZKJYsRCErO2WpvAXvwXuwJaykJGWHYmFhgZ2UUjZYyC0RizM3zz0d3alper7PzO/Mc2ZKim0ZvTn2gN18Yumfwn7c5+6qrEaoMZc0jDNcFXRVZVMpzAvAEMZwjdFgNwmrsYYCgQ6sRXwOT1ldgSvsROwOT1ldgQlsRmwKT1ldgbtIvMNbeMpqrOgn9qFdNuKRYE8JqysAr5FcKWA1VsIMFuJcwa1smR4wGfw8YSNoidqjMlaxh/cQ+sKl7M1daI5Oq2wcBzjFYhnTmI83fmJLtm2H+MEjThI2iE7M4qUU7WxjI3nKWRQsxXk/YXCMdaw0xJe7cRGX6chew/NjHJCtdaWMObTK9r4n2hbCbfjwN432yPmO2PQLRLdIycezsR4AAAAASUVORK5CYII='
      }
    }
  });
  console.log(updatedOrganization) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e4d71ec5805340e6ccaf3',
  name: 'Test Org Updated',
  logo: <logo_url>
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
id                | Organization ID. (required).
name              | Name of the organization.
logo              | Need two fields: filetype -> file type (png, jpeg, gif...); base64 -> file base64 encoded string.

#### delete

`shutter.organizations.delete({ id })`

Example:

```js
try {
  const deletedOrganization = await shutter.organizations.delete({ id: "109e4d71ec5805340e6ccaf3" });
  console.log(deletedOrganization) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e4d71ec5805340e6ccaf3',
  name: 'Test Org',
  logo: <logo_url>
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
id                | Organization ID.

### rooms

#### list

`shutter.rooms.list()`

Example:

```js
try {
  const rooms = await shutter.rooms.list();
  console.log(rooms) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
[
  {
    roomNumber: '109e5704fd41a639344b9432',
    userID: '109bec0f8aaef2395f481059',
    organizationID: '109e5700fd41a639344b942c',
    type: 'MEET',
    created: '1620989700405',
    displayName: 'Meeting',
    externalID: 'test_1',
    agenda: 'Meeting agenda',
    urlLiveStreaming: '',
    canLiveStreaming: false,
    autoLiveStreaming: false,
    liveStreaming: false,
    locked: false,
    enabledWaitingRoom: false,
    webhook: null,
    data: '',
    attendees: [
  {
   id: '109e5705fd41a639344b943a',
   role: 'SPEAKER',
   canShareScreen: true,
   canBroadcast: true,
   broadcasting: false,
   canChat: true,
   canMuteAudio: true,
   canMuteVideo: true,
   canMuteAudioAll: true,
   canMuteVideoAll: true,
   canShareFiles: false,
   canSeeAttendeesList: true,
   canRaiseHand: true,
   mutedMic: false,
   mutedCam: false,
   displayName: 'Speaker Test',
   language: 'en',
   data: null
  },
  ...
 ],
    url: null,
    canRecord: false,
    autoRecord: false,
    recording: false,
    state: 'DRAFT',
    deletedAt: null
  },
  ...
]
```

#### get

`shutter.rooms.get({ roomNumber })`

Example:

```js
try {
  const room = await shutter.rooms.get({ roomNumber: room.roomNumber });
  console.log(room) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  roomNumber: '109e5704fd41a639344b9432',
    userID: '109bec0f8aaef2395f481059',
    organizationID: '109e5700fd41a639344b942c',
    type: 'MEET',
    created: '1620989700405',
    displayName: 'Meeting',
    externalID: 'test_1',
    agenda: 'Meeting agenda',
    urlLiveStreaming: '',
    canLiveStreaming: false,
    autoLiveStreaming: false,
    liveStreaming: false,
    locked: false,
    enabledWaitingRoom: false,
    webhook: null,
    data: '',
    attendees: [
  {
   id: '109e5705fd41a639344b943a',
   role: 'SPEAKER',
   canShareScreen: true,
   canBroadcast: true,
   broadcasting: false,
   canChat: true,
   canMuteAudio: true,
   canMuteVideo: true,
   canMuteAudioAll: true,
   canMuteVideoAll: true,
   canShareFiles: false,
   canSeeAttendeesList: true,
   canRaiseHand: true,
   mutedMic: false,
   mutedCam: false,
   displayName: 'Speaker Test',
   language: 'en',
   data: null
  },
  ...
 ],
    url: null,
    canRecord: false,
    autoRecord: false,
    recording: false,
    state: 'DRAFT',
    deletedAt: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### create

`shutter.rooms.create({ room, organizationID })`

Example:

```js
try {
  const room = await shutter.rooms.create({
   room: {
  type: 'MEET',
  displayName: `Meeting test`,
  externalID: 'test_2',
  agenda: 'Meeting agenda',
  urlLiveStreaming: '',
  canLiveStreaming: false,
  autoLiveStreaming: false,
  locked: false,
  enabledWaitingRoom: false,
  webhook: null,
  data: '',
  attendees: [
   {
    email: 'moderator@shutter.com',
    role: 'MODERATOR',
    canShareScreen: true,
    canBroadcast: true,
    canChat: true,
    canMuteAudio: true,
    canMuteVideo: true,
    canMuteAudioAll: true,
    canMuteVideoAll: true,
    canShareFiles: true,
    canSeeAttendeesList: true,
    canRaiseHand: true,
    broadcasting: true,
    mutedMic: false,
    mutedCam: false,
    displayName: 'Moderador',
    language: 'es'
   }
  ],
  password: 'abc12345',
  canRecord: false,
  autoRecord: false,
  security: 'PRIVATE',
  state: 'DRAFT'
   },
   organizationID: "109e5700fd41a639344b942c"
  });
  console.log(room) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  userID: '109bec0f8aaef2395f481059',
  organizationID: '109e5700fd41a639344b942c',
  type: 'MEET',
  created: '1620989700405',
  displayName: 'Meeting test',
  externalID: 'test_2',
  agenda: 'Meeting agenda',
  presenterID: null,
  urlLiveStreaming: '',
  canLiveStreaming: false,
  autoLiveStreaming: false,
  liveStreaming: false,
  locked: false,
  enabledWaitingRoom: false,
  webhook: null,
  data: '',
  attendees: [
    {
      id: '109e5704fd41a639344b9433',
      externalID: null,
      role: 'MODERATOR',
      canShareScreen: true,
      canBroadcast: true,
      canChat: true,
      canMuteAudio: true,
      canMuteVideo: true,
      canMuteAudioAll: true,
      canMuteVideoAll: true,
      canShareFiles: true,
      canSeeAttendeesList: true,
      canRaiseHand: true,
      broadcasting: true,
      mutedMic: false,
      mutedCam: false,
      displayName: 'Moderador',
      language: 'es',
      online: false,
      data: null
    }
  ],
  url: null,
  canRecord: false,
  autoRecord: false,
  recording: false,
  state: 'DRAFT',
  roomNumber: '109e5704fd41a639344b9432'
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
room              | Room object
organizationID    | Organization ID that room belongs to.

#### update

`shutter.rooms.update({ room, organizationID })`

Example:

```js
try {
  const updatedRoom = await shutter.rooms.update({
   room: {
  roomNumber: '109e5704fd41a639344b9432',
  type: 'MEET',
  displayName: `Meeting test Updated`,
  externalID: 'test_2',
  agenda: 'Meeting agenda',
  urlLiveStreaming: '',
  canLiveStreaming: false,
  autoLiveStreaming: false,
  locked: false,
  enabledWaitingRoom: false,
  webhook: null,
  data: '',
  attendees: [
   {
    email: 'moderator@shutter.com',
    role: 'MODERATOR',
    canShareScreen: true,
    canBroadcast: true,
    canChat: true,
    canMuteAudio: true,
    canMuteVideo: true,
    canMuteAudioAll: true,
    canMuteVideoAll: true,
    canShareFiles: true,
    canSeeAttendeesList: true,
    canRaiseHand: true,
    broadcasting: true,
    mutedMic: false,
    mutedCam: false,
    displayName: 'Moderador',
    language: 'es'
   }
  ],
  password: 'abc12345',
  canRecord: false,
  autoRecord: false,
  security: 'PRIVATE',
  state: 'DRAFT'
   },
   organizationID: "109e5700fd41a639344b942c"
  console.log(updatedRoom) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
 roomNumber: '109e5704fd41a639344b9432',
 type: 'MEET',
 displayName: `Meeting test Updated`,
 externalID: 'test_2',
 agenda: 'Meeting agenda',
 urlLiveStreaming: '',
 canLiveStreaming: false,
 autoLiveStreaming: false,
 locked: false,
 enabledWaitingRoom: false,
 webhook: null,
 data: '',
 attendees: [
  {
   email: 'moderator@shutter.com',
   role: 'MODERATOR',
   canShareScreen: true,
   canBroadcast: true,
   canChat: true,
   canMuteAudio: true,
   canMuteVideo: true,
   canMuteAudioAll: true,
   canMuteVideoAll: true,
   canShareFiles: true,
   canSeeAttendeesList: true,
   canRaiseHand: true,
   broadcasting: true,
   mutedMic: false,
   mutedCam: false,
   displayName: 'Moderador',
   language: 'es'
  }
 ],
 password: 'abc12345',
 canRecord: false,
 autoRecord: false,
 security: 'PRIVATE',
 state: 'DRAFT'
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
room              | Room object
organizationID    | Organization ID that room belongs to.

#### delete

`shutter.rooms.delete({ roomNumber })`

Example:

```js
try {
  const deletedRoom = await shutter.rooms.delete({ roomNumber: "109e5704fd41a639344b9432" });
  console.log(deletedRoom) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  userID: '109bec0f8aaef2395f481059',
  organizationID: '109e5700fd41a639344b942c',
  type: 'MEET',
  displayName: 'Meeting test Updated',
  urlLiveStreaming: '',
  canLiveStreaming: false,
  autoLiveStreaming: false,
  liveStreaming: false,
  canRecord: false,
  autoRecord: false,
  recording: false,
  deletedAt: '1620989709156'
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### startRecording

`shutter.rooms.startRecording({ roomNumber })`

Example:

```js
try {
  const recordingStarted = await shutter.rooms.startRecording({ roomNumber: "109e5704fd41a639344b9432" });
  console.log(recordingStarted) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  userID: '109bec0f8aaef2395f481059',
  organizationID: '109e5700fd41a639344b942c',
  type: 'MEET',
  displayName: 'Meeting test Updated',
  urlLiveStreaming: '',
  canLiveStreaming: false,
  autoLiveStreaming: false,
  liveStreaming: false,
  canRecord: true,
  autoRecord: false,
  recording: true
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### stopRecording

`shutter.rooms.stopRecording({ roomNumber })`

Example:

```js
try {
  const recordingStopped = await shutter.rooms.stopRecording({ roomNumber: "109e5704fd41a639344b9432" });
  console.log(recordingStopped) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  userID: '109bec0f8aaef2395f481059',
  organizationID: '109e5700fd41a639344b942c',
  type: 'MEET',
  displayName: 'Meeting test Updated',
  urlLiveStreaming: '',
  canLiveStreaming: false,
  autoLiveStreaming: false,
  liveStreaming: false,
  canRecord: true,
  autoRecord: false,
  recording: false
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### startStreaming

`shutter.rooms.startStreaming({ roomNumber })`

Example:

```js
try {
  const streamingStarted = await shutter.rooms.startStreaming({ roomNumber: "109e5704fd41a639344b9432" });
  console.log(streamingStarted) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  userID: '109bec0f8aaef2395f481059',
  organizationID: '109e5700fd41a639344b942c',
  type: 'MEET',
  displayName: 'Meeting test Updated',
  urlLiveStreaming: '',
  canLiveStreaming: ftruealse,
  autoLiveStreaming: false,
  liveStreaming: true,
  canRecord: true,
  autoRecord: false,
  recording: false
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### stopStreaming

`shutter.rooms.stopStreaming({ roomNumber })`

Example:

```js
try {
  const streamingStopped = await shutter.rooms.stopStreaming({ roomNumber: "109e5704fd41a639344b9432" });
  console.log(streamingStopped) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  userID: '109bec0f8aaef2395f481059',
  organizationID: '109e5700fd41a639344b942c',
  type: 'MEET',
  displayName: 'Meeting test Updated',
  urlLiveStreaming: '',
  canLiveStreaming: ftruealse,
  autoLiveStreaming: false,
  liveStreaming: false,
  canRecord: true,
  autoRecord: false,
  recording: false
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### attendeesUrls

`shutter.rooms.attendeesUrls({ roomNumber })`

Example:

```js
try {
  const attendeesUrls = await shutter.rooms.attendeesUrls({ roomNumber: "109e5704fd41a639344b9432" });
  console.log(attendeesUrls) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
[
  {
    attendee: {
      id: '109e5705fd41a639344b9436',
      role: 'MODERATOR',
      canShareScreen: true,
      canBroadcast: true,
      broadcasting: true,
      canChat: true,
      canMuteAudio: true,
      canMuteVideo: true,
      canMuteAudioAll: true,
      canMuteVideoAll: true,
      canShareFiles: true,
      canSeeAttendeesList: true,
      canRaiseHand: true,
      mutedMic: false,
      mutedCam: false,
      displayName: 'Moderador',
      language: 'es',
      data: null
    },
    url: <room_access_url>
  },
  ...
]
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

### attendees

#### list

`shutter.attendees.list({ roomNumber })`

Example:

```js
try {
  const attendees = await shutter.attendees.list({ roomNumber: '109e5704fd41a639344b9432' });
  console.log(attendees) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
[
   {
  id: '109e5705fd41a639344b943a',
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  broadcasting: false,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test',
  language: 'en',
  data: null
 },
 ...
]
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### get

`shutter.attendees.get({ roomNumber, id })`

Example:

```js
try {
  const attendee = await shutter.attendees.get({ roomNumber: '109e5704fd41a639344b9432', id: '109e5705fd41a639344b943a' });
  console.log(attendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  broadcasting: false,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test',
  language: 'en',
  data: null
 }
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
id                | Attendee ID

#### get URL

`shutter.attendees.getURL({ roomNumber, id })`

Example:

```js
try {
  const attendeeURL = await shutter.attendees.getURL({ roomNumber: '109e5704fd41a639344b9432', id: '109e5705fd41a639344b943a' });
  console.log(attendeeURL) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```
https://<shutter_domain>/room/<token>
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
id                | Attendee ID

#### create

`shutter.attendees.create({ roomNumber: room.roomNumber, attendee: newAttendee })`

Example:

```js
try {
  const createdAttendee = await shutter.attendees.create({
   roomNumber: "109e5704fd41a639344b9432"
   attendee: {
  email: 'speaker2@shutter.com',
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  broadcasting: true,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test 2',
  language: 'en'
   }
  });
  console.log(createdAttendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  externalID: null,
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  broadcasting: true,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test 2',
  email: 'speaker2@shutter.com'
  language: 'en',
  data: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room ID that attendee belongs to.
attendee          | Attendee object

#### update

`shutter.attendees.update({ roomNumber: room.roomNumber, attendee: newAttendee })`

Example:

```js
try {
  const updatedAttendee = await shutter.attendees.update({
   roomNumber: "109e5704fd41a639344b9432"
   attendee: {
  id: '109e5705fd41a639344b943a',
  email: 'speaker2@shutter.com',
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  broadcasting: true,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test 2 Updated',
  language: 'en'
   }
  });
  console.log(updatedAttendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  externalID: null,
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  broadcasting: true,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test 2 Updated',
  email: 'speaker2@shutter.com'
  language: 'en',
  data: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room ID that attendee belongs to.
attendee          | Attendee object

#### delete

`shutter.attendees.delete({ roomNumber, id })`

Example:

```js
try {
  const deletedAttendee = await shutter.attendees.delete({ roomNumber: '109e5704fd41a639344b9432', id: '109e5705fd41a639344b943a' });
  console.log(deletedAttendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  externalID: null,
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  broadcasting: true,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test 2 Updated',
  email: 'speaker2@shutter.com'
  language: 'en',
  data: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
id                | Attendee ID

#### raiseHand

`shutter.attendees.raiseHand({ roomNumber, id })`

Example:

```js
try {
  const raisedHandAttendee = await shutter.attendees.raiseHand({ roomNumber: '109e5704fd41a639344b9432', id: '109e5705fd41a639344b943a' });
  console.log(raisedHandAttendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  externalID: null,
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  raisedHand: true, // <--
  broadcasting: false,
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test',
  language: 'en',
  online: false,
  data: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
id                | Attendee ID

#### lowerHand

`shutter.attendees.lowerHand({ roomNumber, id })`

Example:

```js
try {
  const loweredHandAttendee = await shutter.attendees.lowerHand({ roomNumber: '109e5704fd41a639344b9432', id: '109e5705fd41a639344b943a' });
  console.log(loweredHandAttendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  externalID: null,
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  raisedHand: false, // <--
  broadcasting: false, // <-- Put to false also.
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test',
  language: 'en',
  online: false,
  data: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
id                | Attendee ID

#### grantWord

`shutter.attendees.grantWord({ roomNumber, id })`

Example:

```js
try {
  const grantedWordAttendee = await shutter.attendees.grantWord({ roomNumber: '109e5704fd41a639344b9432', id: '109e5705fd41a639344b943a' });
  console.log(grantedWordAttendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  externalID: null,
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  raisedHand: true,
  broadcasting: true, // <--
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test',
  language: 'en',
  online: false,
  data: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
id                | Attendee ID

#### denyWord

`shutter.attendees.denyWord({ roomNumber, id })`

Example:

```js
try {
  const deniedWordAttendee = await shutter.attendees.denyWord({ roomNumber: '109e5704fd41a639344b9432', id: '109e5705fd41a639344b943a' });
  console.log(deniedWordAttendee) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```js
{
  id: '109e5705fd41a639344b943a',
  externalID: null,
  role: 'SPEAKER',
  canShareScreen: true,
  canBroadcast: true,
  canChat: true,
  canMuteAudio: true,
  canMuteVideo: true,
  canMuteAudioAll: true,
  canMuteVideoAll: true,
  canShareFiles: false,
  canSeeAttendeesList: true,
  canRaiseHand: true,
  raisedHand: false, // <-- Put to false also.
  broadcasting: false, // <--
  mutedMic: false,
  mutedCam: false,
  displayName: 'Speaker Test',
  language: 'en',
  online: false,
  data: null
}
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
id                | Attendee ID

### recordings

#### list

`shutter.recordings.list({ roomNumber })`

Example:

```js
try {
  const recordings = await shutter.recordings.list({ roomNumber: '109e5704fd41a639344b9432' });
  console.log(recordings) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```
[
  {
    name: '60b89e4bf36ed0194f4189ca',
    mixed: false,
    mixProgress: 0,
    uploaded: false,
    uploadProgress: 0,
    duration: 0,
    size: 0,
    creationDate: '1622711886052',
    finishDate: null
  },
  ...
]
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.

#### getIframeUrl

`shutter.recordings.getIframeUrl({ roomNumber })`

Example:

```js
try {
  const recordingsIframeUrl = await shutter.recordings.getIframeUrl({ roomNumber: '109e5704fd41a639344b9432' });
  console.log(recordingsIframeUrl) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```
https://<shutter_domain>/recordings/<token>
```

Options:

Parameter         | Description
:---------------- | :-----------------------------------------------------------
roomNumber        | Room number or ID.
