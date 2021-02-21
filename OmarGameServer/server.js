// @ts-check

const Session = require("./Architecture/Session");
const User = require("./Architecture/User");
const ServerHook = require("./Hooks/ServerHook");


module.exports = class GameServer {
    roomManager = require('./Managers/RoomManager');
    userManager = new (require('./Managers/userManager'))(this.roomManager);

    /**
     * @type {ServerHook} 
     */
    #serverHook;

    constructor() {
    }
    /**
     * @param {SocketIO.Server} io
     * @param {import("./Hooks/ServerHook")|any} serverHook
     */
    Start(io, serverHook) {

        if (this.#serverHook) {
            this.#serverHook = serverHook;
        } else {
            // @ts-ignore
            this.#serverHook = new ServerHook(this);
        }

        console.log("new GameServer");
        this.#serverHook.OnInit();
        io.on('connection', (socket) => {
            var session = this.userManager.addSession(socket, io);
            var sessionId = session.id;
            this.#serverHook.OnNewSession(session);
            this.validateSession(session,
                (userName) => {
                    var user = this.userManager.promoteSession(sessionId, userName);
                    this.onUserConnected(user);
                    user.on("disconnecting", () => {
                        this.onUserdisconnecting(user);
                        this.userManager.removeUser(user);
                    })
                }, () => {
                    this.userManager.removeSession(sessionId);
                    //disconnect the session
                }
            );
        });
    }

    /**
     * @param {Session} session
     * @param {{ (userName: string): void; (): void; }} onSuccess
     * @param {() => void} OnFail
     */
    validateSession(session, onSuccess, OnFail) {
        this.#serverHook.ValidateSession(session, onSuccess, OnFail);
    }

    /**
     * @param {User} user
     */
    onUserConnected(user) {
        console.log("user connected success: " + user.name);
        this.#serverHook.onUserConnected(user);
    }

    /**
     * @param {User} user
     */
    onUserdisconnecting(user) {
        console.log("disconnecting user " + user.name);
        this.#serverHook.onUserdisconnecting(user);
    }
}

