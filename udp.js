const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

module.exports.connect = (callback) => {
    socket.on("listening", callback)
    socket.bind()
}

module.exports.enableBroadcast = (enable) => {
    socket.setBroadcast(enable)
}

module.exports.send = (host, port, payload, callback) => {
    socket.send(payload, 0, payload.length, port, host, callback)
}

module.exports.magicPacket = (macAddress) => {
    /* This is the payload of a magic packet for an
    example mac address of 1a:2b:3c:4d:5f:67
    FF FF FF FF FF FF
    1A 2B 3C 4D 5F 67 (repeated 16 times)
    00 00 00 00 00 00
    */
    var payload = new Uint8Array(108)
    const payloadHeader = new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
    const macAddressByteArray = hexStringToByteArray(macAddress)
    const macAddressRepeatCount = 16

    payload.set(payloadHeader, 0)
    for (let index = 0; index < macAddressRepeatCount; index++) {
        const offset = payloadHeader.length + index * macAddressByteArray.length
        payload.set(macAddressByteArray, offset)
    }
    return payload
}

function hexStringToByteArray(string) {
    // divide the string into chunks of 2 hex characters
    // because 1 byte (8 bits) is made out of 2 hex characters:
    // example: 0xFF <- 1111 1111
    const chunks = string.match(/.{1,2}/g)
    // now we have an array of chunks like ["2c", "4f", "82", ...]
    // for each element in the array, transform the hex string
    // into the actual hex. For example: "2c" -> 0x2c
    const array = chunks.map((value) => {
        const firstCharacter = hexCharacterToByte(value[0])
        const secondCharacter = hexCharacterToByte(value[1])
        // make a byte out of concatenating 2 groups of 4 bits
        // example: expected result -> 1001 0100
        // first character -> 1001, second character -> 0100
        // 1. shift left first character 4 positions: 1001 0000
        // 2. apply OR operand to the result: 1001 0000 | 0000 = 1001 0100
        const result = firstCharacter << 4 | secondCharacter
        return result
    })
    const result = new Uint8Array(array)
    return result;
}

// sorry for this, I did not find a better way to 
// convert an hex string into the actual hex value :)
function hexCharacterToByte(character) {
    character = character.toLowerCase();
    switch(character) {
        case '0': return 0x0
        case '1': return 0x1
        case '2': return 0x2
        case '3': return 0x3
        case '4': return 0x4
        case '5': return 0x5
        case '6': return 0x6
        case '7': return 0x7
        case '8': return 0x8
        case '9': return 0x9
        case 'a': return 0xa
        case 'b': return 0xb
        case 'c': return 0xc
        case 'd': return 0xd
        case 'e': return 0xe
        case 'f': return 0xf
        default: return
    }
}