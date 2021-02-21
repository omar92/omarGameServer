// @ts-check
var User = require('../Architecture/User');
var Session = require('../Architecture/Session');

/**
 * @param {import("./RoomManager")} roomManager
 */
module.exports = class UserManager {
    /**
    * @type {Map<number,Session>} 
    */
    #sessions = new Map();
    /**
    * @type {Map<number,User>} 
    */
    #users = new Map();
    #roomManager;

    /**
     * @param {import("./RoomManager")} roomManager
     */
    constructor(roomManager) {
        this.#roomManager = roomManager;
    }

    /**
    * @param {SocketIO.Socket} socket
    * @param {import("socket.io").Server} io
    * @returns {Session}
    */
    addSession(socket, io) {
        var session = new Session(socket, io);
        console.log("new session: " + session.id);
        this.#sessions.set(session.id, session);
        return session;
    }
    /**
     * @param {number} sessionId
     */
    removeSession(sessionId) {
        console.log("remove session: " + sessionId);
        if (this.#sessions.has(sessionId))
            this.#sessions.delete(sessionId);
    }
    /**
     * @param {number} sessionId
     * @param {string} userName
     * @returns {User}
     */
    promoteSession(sessionId, userName) {
        console.log("promote session to user: " + sessionId);
        var session = this.#sessions.get(sessionId);
        var user = new User(sessionId, userName, session.socket, session.io);
        this.#users.set(user.id, user);
        this.removeSession(sessionId);
        this.moveToRoom(user);//lobby
        return user;
    }

    /**
    * @param {User} user
    */
    removeUser(user) {
        this.#users.delete(user.id);
        console.log("user removed: " + user.name);
    }
    /**
    * @param {number} userid
    */
    removeUserById(userid) {
        if (this.#users.has(userid)) {
            this.removeUser(this.#users.get(userid));
        } else {
            console.log("cant remove usersid " + userid + " as he is not exist");
        }
    }


    /**
    * @param {User} user
    * @param {number|any} roomId
    * @returns {boolean}
    */
    moveToRoom(user, roomId) {
        var room = this.#roomManager.getRoom(roomId);
        if (room) {
            if (user.currentRoom) {
                user.currentRoom.removeUser(user)
                this.#roomManager.checkRoom(user.currentRoom);
                user.currentRoom = null;
            }
            if (room.addUser(user)) {
                user.currentRoom = room;
                return true;
            } else {
                this.moveToRoom(user);//return to lobby
                return false;
            }
        } else {
            return false;
        }
    }

    /**
    * @returns {number}
    */
    getUsersNumber() {
        return this.#users.size;
    }

}
