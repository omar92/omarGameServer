// @ts-check

var uidIterator = 0;
module.exports = class Session {
    /**
    * @type {SocketIO.Socket} 
    */
    socket;
    /**
    * @type {import("socket.io").Server} 
    */
    io;
    /**
    * @type {number} 
    */
    id;
    /**
     * @param {SocketIO.Socket} socket
     * @param {import("socket.io").Server} io
     */
    constructor(socket, io) {
        this.io = io;
        this.socket = socket;
        this.id = uidIterator++;
    }
}
