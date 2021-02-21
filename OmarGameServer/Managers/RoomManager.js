// @ts-check
var Room = require('../Architecture/Room');
module.exports = new class RoomManager {
    /**
    * @type {number} 
    */
    roomsNum = 0;
    /**
    * @type {Room} 
    */
    lobby;
    /**
    * @type {Map<number,Room>} 
    */
    #rooms = new Map();



    constructor() {
        this.lobby = this.openRoom("lobby")
    }

    /**
    * @param {string|any} roomName
    * @returns {Room}
    */
    openRoom(roomName) {
        var room = new Room(roomName);
        this.#rooms.set(room.id, room);
        console.log("room opened:" + room.name);
        return room;
    }

    /**
    * @param {Room} room
    */
    closeRoom(room) {
        this.#rooms.delete(room.id);
        console.log("room closed: " + room.name);
    }
    /**
    * @param {number} roomid
    */
    closeRoomById(roomid) {
        if (this.#rooms.has(roomid)) {
            this.closeRoom(this.#rooms.get(roomid));
        } else {
            console.log("cant close roomid " + roomid + " as it is not exist");
        }
    }

    /**
    * @param {number} roomId
    * @returns {Room}
    */
    getRoom(roomId) {
        roomId = roomId || this.lobby.id;
        return this.#rooms.get(roomId);
    }

    /**
    * @returns {number}
    */
    getRoomsNumber() {
        return this.#rooms.size;
    }

    /**
    * @param {Room} room
    */
    checkRoom(room) {
        if (room.getUsersNumber() <= 0 && room.id > 0) {
            this.closeRoom(room);
        }
    }
}
