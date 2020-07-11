/**
 * @file websocket service
 * @author
 */
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    port: 8181
});

function getRandom() {
    return Math.floor(Math.random() * 10);
}

wss.on('connection', function (ws) {
    console.log('client connected');
    let timer = null;

    ws.on('message', function (message) {
        console.log('message', message);
        if (message) {
            timer = setInterval(() => {
                const num = getRandom();
                // 向客户端发送数据
                ws.send(num);
            }, 1000);
        }
    });

    ws.on('close', function () {
        clearInterval(timer);
        console.log('connection is closed');
    });
});
