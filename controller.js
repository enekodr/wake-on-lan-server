const udp = require("./udp")
const config = require("./config.json")

module.exports.broadcastWakeOnLan = (req, res) => {
    // make socket payload based on mac address (magic packet)
    const macAddress = req.body.macAddress
    const parsedMacAddress = macAddress.split(":").join("")
    const payload = udp.magicPacket(parsedMacAddress)
    
    // make udp broadcast message
    const host = req.body.broadcastIP ?? config.defaultBroadcastIP
    const port = req.body.port ?? config.defaultBroadcastPort
    console.log("Broadcasting wake on lan for " + macAddress)
    udp.send(host, port, payload, (error, bytes) => {
        console.log("Broadcast was sent for " + macAddress)
        if (error) {
            res.status(500).send(error)
        } else {
            const data = {"host": host, "port": port, "length": bytes, "payload": payload}
            const message = "Packet sent successfully. Data: \n" + JSON.stringify(data)
            res.status(200).send(message)
        }
    })
}