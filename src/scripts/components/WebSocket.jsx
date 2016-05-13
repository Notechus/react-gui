var WebSock = {
    ws: {},
    init: function (url) {
        this.ws = new WebSocket("ws://" + url);
    },
    destroy: function () {
        this.ws.close();
    },
    addMessageHandler: function (handler) {
        this.ws.onmessage = handler;
    },
    removeMessageHandler: function () {
        this.ws.onmessage = null;
    }
};

module.exports = WebSock;