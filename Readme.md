# Wake On LAN server

REST API server made with Node.js and Express that contains a single endpoint, which receives a mac address and broadcasts a Wake On LAN magic packet over the specified network.

## Getting started

Install dependencies:

```bash
npm i
```

Start the server:

```bash
node server.js
```

---

**Note**: the default server port and other variables can be edited in file `config.js`.

---

## API documentation

The API contains a single endpoint that accepts a **POST** request:

```text
http://[server-ip]:[server-port]/wake-on-lan
```

Checkout this curl example:

```bash
curl --location 'http://localhost:3000/wake-on-lan' \
--header 'Content-Type: application/json' \
--data '{
    "macAddress": "24:fc:e5:55:d5:74",
    "broadcastIP": "192.168.2.255",
    "port": 9
}'
```

### Parameters

- `macAddress`: **required**. The mac address of the device that will be awaken. The correct format is a string separated in chunks of two digits by colons `XX:YY:ZZ:AA:BB:CC`.
- `broadcastIP`: **optional**. The IP that will be used for the broadcast message. The default value is `192.168.1.255`.
- `port`: **optional**. The port where the device is listening for broadcast sockets. The default value is `7`.
