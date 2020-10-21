// @ts-check

/**
 * @param {SocketIO.Server} io
 */
module.exports = function (io) {
    return new GameServer(io);
}

class User {
    uid = 0;
    name = "player";
    /**
     * @param {SocketIO.Socket} io
     */
    socket;
    /**
     * @param {SocketIO.Server} io
     */
    #io;
    /**
    * @param {SocketIO.Server} io
    */
    constructor(io) {
        this.#io = io;
    }
    /**
     * @param {string} event
     * @param {any} params
     */
    send(event, params) {
        this.#io.to(this.socket.id).emit(...arguments);
    }
    /**
    * @param {string} event
    * @param {any} callback
    */
    on(event, callback) {
        this.socket.on(...arguments);
    }

}


class GameServer {
    onlineUsers = 0;
    #uidIterator=0;
    #users = {};

    /**
     * @param {SocketIO.Server} io
     */
    constructor(io) {
        console.log("new GameServer");
        io.on('connection', (socket) => {
            console.log("new session");
            this.validateUser(socket,
                (userName) => {
                    var user = this.#createUser(userName, socket, io);

                    this.#users['' + user.uid] = user;
                    socket['user'] = user;
                    this.onlineUsers++;
                    this.onUserConnected(user);

                    user.on("disconnecting", () => {
                        this.onUserdisconnecting(user);
                        this.onlineUsers--;
                        delete this.#users['' + user.uid];
                    })

                }, () => {
                    //disconnect the session
                }
            );

            //  socket.broadcast.emit('chat message','userJoined '+socket.id);

            socket.on('sync', (msg) => {
                console.log('sync: ' + msg);
                io.emit('sync', msg);
            });

        });
    }



    /**
     * @param {SocketIO.Socket} socket
     * @param {{ (userName: any): void; (): void; }} onSuccess
     * @param {() => void} OnFail
     */
    validateUser(socket, onSuccess, OnFail) {
        // socket.on('validate', (msg) => {
        //     onSuccess(user);
        // });
        console.log("user valid");
        onSuccess();
    }

    /**
     * @param {User} user
     */
    onUserConnected(user) {
        console.log("connected " + user.name);
    }

    /**
     * @param {User} user
     */
    onUserdisconnecting(user) {
        console.log("disconnecting " + user.name);
    }

    /**
     * @param {string} userName
     * @param {SocketIO.Socket} socket
     * @param {import("socket.io").Server} io
     */
    // @ts-ignore
    #createUser(userName, socket, io) {
        var user = new User(io);
        user.uid = ++this.#uidIterator;
        user.name = userName || (user.name + user.uid);
        user.socket = socket;
        return user;
    }
}

