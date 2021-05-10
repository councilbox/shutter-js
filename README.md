# SHUTTER SDK JS

```js
import Shutter from 'shutter-sdk-js';

const options = {
  email: "example@mail.com",
  password: "your_pass"
}

const shutter = new Shutter.client(options);

const rooms = shutter.rooms.getAll();
``
