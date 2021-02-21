
// @ts-check
module.exports = class User {
    id = -1;
    name = "player";
    /**
     * @type {SocketIO.Socket}
     */
    socket;
    /**
     * @type {SocketIO.Server} 
     */
    #io;
    /**
    * @param {import("./Room")} currentRoom
    */
   currentRoom ;

    /**
     * @param {number} id
     * @param {string} name
     * @param {SocketIO.Socket} socket
     * @param {import("socket.io").Server} io
     */
    constructor(id, name, socket, io) {
        name = name || this.name + id;
        console.log("new user created: " + name);
        this.id = id;
        this.name = name;
        socket['user'] = this;
        this.socket = socket;
        this.#io = io;
    }
    /**
     * @param {string} event
     * @param {any} params
     */
    send(event, params) {
        // @ts-ignore
        this.#io.to(this.socket.id).emit(...arguments);
    }
    /**
    * @param {string} event
    * @param {any} callback
    */
    on(event, callback) {
        // @ts-ignore
        this.socket.on(...arguments);
    }
}
