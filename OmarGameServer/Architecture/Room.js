// @ts-check

var roomidIterator = -1;

module.exports = class Room {

    id = -1;
    name = "Room";
    /**
    * @type {Map<number,import("./User")>} 
    */
    #users = new Map();

    /**
     * @param {string} roomName
     */
    constructor(roomName) {
        roomidIterator++;
        this.id = roomidIterator;
        this.name = roomName || "Room" + this.id;
        console.log("room created: " + this.name);
    }
    /**
     * @param {import("./User")} user
     * @returns {boolean}
     */
    addUser(user) {
        this.#users.set(user.id, user);
        console.log("user " + user.name + " joined room " + this.name);
        return true;
    }

    /**
    * @param {import("./User")} user
    */
    removeUser(user) {
        if (this.#users.has(user.id)) {
            this.#users.delete(user.id);
            console.log("user " + user.name + " left room " + this.name);
        } else {
            console.log("cant remove user " + user.name + " as he is not not in the room " + this.name);
        }
    }

    /**
      * @param {string} event
      * @param {any} params
      */
    broadcats(event, params) {
        Object.entries(this.#users).forEach(([uid, user]) => {
            user.send(...arguments);
        });
    }

    /**
    * @returns {number} 
    */
    getUsersNumber() {
        return this.#users.size;
    }
}
