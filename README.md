## SHUTTER SDK JS
```
import Shutter from 'shutter-sdk-js';
const options = {
	email: "example@mail.com",
	password: "your_pass"
}
const ShutterClient = new Shutter.client(options);
const shutter = await ShutterClient.initialize();

const rooms = shutter.rooms.getAll();
``