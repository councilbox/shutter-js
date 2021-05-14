# SHUTTER JS SDK

[![License](https://img.shields.io/github/license/Councilbox/shutter-js)]()
[![Version](https://img.shields.io/github/package-json/v/Councilbox/shutter-js)]()
[![NPM](https://img.shields.io/npm/v/shutter-js)]()

A javascript sdk for Shutter built with webpack, babel & es6. This can be used in node or in the browser*.

NOTE: If used in the browser do not publish your private api key in frontend code.

  - [Install](#install)
  - [Setup Client](#setup-client)
  - [Methods](#methods)

----

## Install

- Requires node.js >= 14.x

```sh
npm i @councilbox/shutter-js
```
----

## Setup Client

Next, require the module and instantiate a shutter client by calling `new Shutter` and setup the client with basic auth credentials `(email: 'example@mail.com', password: 'your_pass_here')`. Also need an api url provided by shutter team.

```js
import Shutter from '@councilbox/shutter-js';


const shutter = new Shutter({
  email: "example@mail.com",
  password: "your_pass_here",
  uri: "example.shutter.com"
});
```

----

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
  - [rooms](#rooms)
    - [list](#list-1)
	- [get](#get)
    - [create](#create-2)
    - [update](#update-1)
	- [delete](#delete-1)
	- [startRecording](#start-recording)
	- [stopRecording](#stop-recording)
	- [startStreaming](#start-streaming)
	- [stopStreaming](#start-streaming)
	- [attendeesUrls](#attendees-urls)
  - [attendees](#attendees)
    - [list](#list-2)
	- [get](#get-1)
    - [create](#create-3)
    - [update](#update-2)
	- [delete](#delete-2)
	- [raiseHand](#raise-hand)
	- [lowerHand](#lower-hand)
	- [grantWord](#grant-word)
	- [denyWord](#deny-word)

Method naming conventions:
- `get` or `get{{Item}}` - expected response for client is a single object
- `list` or `list{{Items}}` - expected response for client is a list of objects
- `create` or `create{{Item}}` - expected response for client is a single object
- `update` or `update{{Item}}` - expected response is an object with a status message
- `delete` or `delete{{Item}}` - expected response is an object with a status message

----

### users

#### create

`shutter.users.create({user})`

Example:

```js
try {
  const createdUser = await shutter.users.create({
    name: "test",
    email: "test@shutter.com"
  });
  console.log(createdUser) // logs response data
} catch (err) {
  console.log(err); // logs any error
}
```

Promise Returns:

```
{
  id: '609ab5190ae391f4e90d10f1',
  name: 'test',
  email: "test@shutter.com"
}
```

Options:

Parameter         | Description
:---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
name              | Name of the user.
email             | Email address of the user. Example: "Jhon <jhon@host.com>".

