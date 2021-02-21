// @ts-check
module.exports = class ServerHook {
    /**
     * @type {import("../server")} 
     */
    #ogs;
    /**
      * @param {import("../server")} ogs
      */
    constructor(ogs) {
        this.#ogs = ogs;
    }

    OnInit() {
    }
    /**
     * @param {import("../Architecture/Session")} session
     */
    OnNewSession(session) {

    }
    /**
     * @param {import("../Architecture/Session")} session
     * @param {{ (userName: string): void; (): void; }} onSuccess
     * @param {() => void} OnFail
     */
    ValidateSession(session, onSuccess, OnFail) {
        // socket.on('validate', (msg) => {
        //     onSuccess(user);
        // });
        onSuccess();
    }
    /**
     * @param {import("../Architecture/User")} user
     */
    onUserConnected(user) {
        var room = this.#ogs.roomManager.openRoom();
        this.#ogs.userManager.moveToRoom(user, room.id);
        room = this.#ogs.roomManager.openRoom();
        this.#ogs.userManager.moveToRoom(user, room.id);
        this.#ogs.userManager.moveToRoom(user);
    }
    /**
     * @param {import("../Architecture/User")} user
     */
    onUserdisconnecting(user) {

    }
}
