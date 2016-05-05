/**
 * Created by notechus on 4/23/16.
 */
var ws = new WebSocket("ws://karnicki.pl/api/WSChat");

ws.onmessage = function (event) {
    $("#websockData").prepend("<p>" + event.data + "</p>");
};

ws.onerror = function (evt) {
    $("#websockData").text(evt.message);
};

ws.onclose = function () {
    $("#websockData").text("disconnected");
};
