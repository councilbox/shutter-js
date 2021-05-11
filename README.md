# SHUTTER SDK JS

[![License](https://img.shields.io/github/license/Councilbox/shutter-sdk-js)]()
[![Version](https://img.shields.io/github/package-json/v/Councilbox/shutter-sdk-js)]()
[![NPM](https://img.shields.io/npm/v/shutter-sdk-js)]()

A javascript sdk for Shutter built with webpack, babel & es6. This can be used in node or in the browser*.

NOTE: If used in the browser do not publish your private api key in frontend code.

  - [Install](#install)
  - [Setup Client](#setup-client)
  - [Methods](#methods)

----

## Install

- Requires node.js >= 14.x

```sh
npm i shutter-sdk-js
```
----

## Setup Client

Next, require the module and instantiate a shutter client by calling `new Shutter.client` and setup the client with basic auth credentials `(email: 'example@mail.com', password: 'your_pass_here')`. Also need an api url provided by shutter team.

```js
import Shutter from 'shutter-sdk-js';


const shutter = new Shutter.client({
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
  - [organizations](#domains)
    - [list](#list)
    - [create](#create-1)
    - [update](#update)

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

HTML/TEXT Example:

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

