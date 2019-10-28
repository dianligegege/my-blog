# WebSocket

`WebSocket`，即 `Web` 浏览器与 `Web` 服务器之间全双工通信标准。其中，`WebSocket` 协议由 `IETF` 定为标准，`WebSocket API` 由 `W3C` 定为标准。
利用 `Ajax` 和 `Comet` 技术进行通信可以提升 `Web` 的浏览速度。但问题在于通信若使用 `HTTP` 协议，就无法彻底解决瓶颈问题。`WebSocket` 网络技术正是为解决这些问题而实现的一套新协议及 `API`。
一旦 `Web` 服务器与客户端之间建立起 `WebSocket` 协议的通信连接，之后所有的通信都依靠这个专用协议进行。通信过程中可互相发送 `JSON`、`XML`、`HTML` 或图片等任意格式的数据。
由于是建立在 `HTTP` 基础上的协议，因此连接的发起方仍是客户端，而一旦确立 `WebSocket` 通信连接，不论服务器还是客户端，任意一方都可直接向对方发送报文。

## 1. WebSocket 协议的主要特点

+ 推送功能
  支持由服务器向客户端推送数据的推送功能。这样，服务器可直接发送数据，而不必等待客户端的请求。

+ 减少通信量
  只要建立起 WebSocket 连接，就希望一直保持连接状态。和 HTTP 相比，不但每次连接时的总开销减少，而且由于 WebSocket 的首部信息很小，通信量也相应减少了。

## 2. 握手

为了实现 `WebSocket` 通信，在 `HTTP` 连接建立之后，需要完成一次“握手”（`Handshaking`）的步骤。

### 2.1 握手 请求

为了实现 `WebSocket` 通信，需要用到 `HTTP` 的 `Upgrade` 首部字段，告知服务器通信协议发生改变，以达到握手的目的。

```txt
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

`Sec-WebSocket-Key` 字段内记录着握手过程中必不可少的键值。`Sec-WebSocket-Protocol` 字段内记录使用的子协议。
子协议按 `WebSocket` 协议标准在连接分开使用时，定义那些连接的名称。

注意: 常规 `HTTP` 状态码只能在握手之前使用。 握手成功后，使用一组不同的状态码。

### 2.2 握手 响应

对于之前的请求，返回状态码 101 Switching Protocols 的响应。

```txt
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

`Sec-WebSocket-Accept` 参数需要服务器通过客户端发送的 `Sec-WebSocket-Key` 计算出来。 怎样计算呢， 把客户发送的 `Sec-WebSocket-Key` 和 "258EAFA5-E914-47DA-95CA-C5AB0DC85B11" (这个叫做 "魔法值")连接起来，把结果用 `SHA-1` 编码，再用 `base64` 编码一次，就可以了。

所以如果 `Sec-WebSocket-Key` 是“dGhlIHNhbXBsZSBub25jZQ==”，`Sec-WebSocket-Accept` 将是“s3pPLMBiTxaQ9kYGzzhZRbK+xOo=”。 一旦服务器发送这个请求头，握手就完成了，你可以开始交换数据！成功握手确立 `WebSocket` 连接之后，通信时不再使用 `HTTP` 的数据帧，而采用 `WebSocket` 独立的数据帧。

![WebSocket 通信](https://note.youdao.com/yws/api/personal/file/WEB147ae81b64117aef54b7361687871eb1?method=download&shareKey=cb1550a2140e7e8e543dc345f4019811)

## 3. 客户端的 API

### 3.1 构造函数

`WebSocket(url[,prorocols])`
返回一个 `WebSocket` 对象

```js
    var ws = new WebSocket('ws://localhost:3000/test');
```

执行上面语句之后，客户端就会与服务器进行连接。

### 3.2 属性

+ WebSocket.readyState
  
    返回当前 `WebSocket` 的链接状态，只读。

    ```txt
    0 (CONNECTING)
    正在链接中
    1 (OPEN)
    已经链接并且可以通讯
    2 (CLOSING)
    连接正在关闭
    3 (CLOSED)
    连接已关闭或者没有链接成功
    ```

+ webSocket.onopen

    `WebSocket.onopen` 属性定义一个事件处理程序，当 `WebSocket` 的连接状态 `readyState` 变为“OPEN”时调用;这意味着当前连接已经准备好发送和接受数据。这个事件处理程序通过 事件（建立连接时）触发。

    ```js
    ws.onopen = function () {
        console.log('Hello Server!');
    }
    ```

+ webSocket.onclose

    `WebSocket.onclose` 属性定义一个事件处理程序，当 `WebSocket` 的连接状态 `readyState` 变为“CLOSED”时调用;它接收一个名字为“close”的 `CloseEvent` 事件。

    ```js
    ws.onclose = function(event) {
    var code = event.code;
    var reason = event.reason;
    var wasClean = event.wasClean;
    // handle close event
    };
    ```

+ webSocket.onmessage

    `WebSocket.onmessage` 属性返回一事件监听器，当从服务器收到一条消息时，该监听器将被调用。该监听器接受一命名为 `message` 的 `MessageEvent`。

    ```js
    ws.onmessage = function(event) {
        var data = event.data;
        // 处理数据
    };
    ```

+ webSocket.binaryType

    `WebSocket.binaryType` 返回 `websocket` 连接所传输二进制数据的类型。

    返回值：
        1. `"blob"`  如果传输的是 `Blob` 类型的数据
        2. `"arraybuffer"`  如果传输的是 `ArrayBuffer` 类型的数据。

    ```js
    var binaryType = ws.binaryType
    ```

+ webSocket.bufferedAmount

    `WebSocket.bufferedAmount` 是一个只读属性，用于返回已经被 `send()` 方法放入队列中但还没有被发送到网络中的数据的字节数。一旦队列中的所有数据被发送至网络，则该属性值将被重置为 0。但是，若在发送过程中连接被关闭，则属性值不会重置为 0。如果你不断地调用 `send()`，则该属性值会持续增长，它可以用来判断发送是否结束。

    ```js
    var data = new ArrayBuffer(10000000);
    socket.send(data);

    if (socket.bufferedAmount === 0) {
    // 发送完毕
    } else {
    // 发送还没结束
    }
    ```

+ webSocket.onerror

    `WebSocket.onerror` 属性中，你可以定义一个发生错误时执行的回调函数，此事件的事件名为"error"。

    ```js
    socket.onerror = function(event) {
    // handle error event
    };
    ```

### 3.3 方法

+ webSocket.send()

    `WebSocket.onmessage` 属性返回一事件监听器，当从服务器收到一条消息时，该监听器将被调用。该监听器接受一命名为 `message` 的 `MessageEvent`。

    传输数据 `data` 的类型：
    1. `USVString` 文本字符串。字符串将以 UTF-8 格式添加到缓冲区，并且 `bufferedAmount` 将加上该字符串以 `UTF-8` 格式编码时的字节数的值。
    2. `ArrayBuffer`  可以使用一有类型的数组对象发送底层二进制数据；其二进制数据内存将被缓存于缓冲区，`bufferedAmount` 将加上所需字节数的值。
    3. `Blob`  `Blob` 类型将队列 `blob` 中的原始数据以二进制中传输。 `bufferedAmount` 将加上原始数据的字节数的值。
    4. `ArrayBufferView`  可以以二进制帧的形式发送任何 `JavaScript` 类数组对象 ；其二进制数据内容将被队列于缓冲区中。值 `bufferedAmount` 将加上必要字节数的值。

    ```js
    ws.onmessage = function(event) {
        var data = event.data;
        // 处理数据
    };

    // 发送Blob对象的例子
    var file = document.querySelector('#some').files[0];
    ws.send(file);
    ```

+ webSocket.close()

    `WebSocket.onerror` 方法关闭 `WebSocket`  连接或连接尝试（如果有的话）。 如果连接已经关闭,则此方法不执行任何操作。

    参数：

    1. `code` 可选，一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用 1005。
    2. `reason` 可选，一个人类可读的字符串，它解释了连接关闭的原因。这个 `UTF-8` 编码的字符串不能超过 123 个字节。

    ```js
    ws.close()
    ```

### 3.4 实例

```html
<a href="JAVASCRIPT:jsre()">发送信息到ws服务器</a>
<a href="JAVASCRIPT:sendBinary()">请求二进制信息到ws服务器</a>
<a href="JAVASCRIPT:ws.close()">关闭ws链接</a>
<input type="file" name="some" id="some">
<a href="JAVASCRIPT:sendpic()">发送Blob对象</a>
<script>

    var ws = new WebSocket('ws://localhost:3000/test');

    console.log('ws.readyState' + ws.readyState);

    function jsre() {
        console.log('ws.readyState' + ws.readyState);

        ws.send('Hello,发送给服务端的信息');
    }

    // 关闭ws链接
    ws.onclose = function(event) {
        console.log('ws.readyState'+ ws.readyState);
        console.log('关闭链接',event);
    }

    // .onmessage 用于指定收到服务器数据后的回调函数
    ws.onmessage = function(event) {
        console.log(event.data);
        // 返回的数据可能是字符串或二进制
        if(typeof event.data === 'string') {
            console.log("String" + event.data);
        }
    }

    // .onopen,用于指定链接成功后的回调函数
    ws.onopen = function() {
        console.log('onopen' + 'ws.readyState' + ws.readyState);
    }

    // 发送Blob对象
    function sendpic() {
        var file = document.querySelector('#some').files[0];
        console.log(typeof file) // object
        console.log(file);
        ws.send(file);
    }

    ws.onerror = function(event) {
        console.log(event);
    }
</script>
```

## 4. Websocket 服务端

使用 `Node.js` 搭建 `WebSocket` 服务器的常用包

1. [websocket](https://www.npmjs.com/package/websocket)
2. [ws](https://www.npmjs.com/package/ws)

使用 `ws` 构建服务器例子：

```js
// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3000
});

wss.on('connection', function(ws) {
    console.log(`链接上 [SERVER] connection()`)
    ws.on('message', function(message) {
        console.log('服务端收到信息' + message);
        // 发送二进制数据
        if (message === 'binary') {
            console.log(`服务端收到请求二进制的数据 [SERVER] Received: ${message}`);
            const array1 = new Float32Array(5);
            for (var i = 0; i < array1.length; ++i) {
                array1[i] = i / 2;
            }
            // var blob = new Blob(['{name: "blob"}'],{type: 'application/json'});
            // ws.send(blob);
            ws.send(array1)
        }else {
            console.log(`服务端收到信息为字符串 [SERVER] Received: ${message}`);
            ws.send(`服务端发送信息 ECHO: ${message}`, (err) => {
                if(err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            })
        }
    })
})
```

## 5. 参考链接

[ 1 ] [MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

[ 2 ] [WebSocket 教程 阮一峰](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

[ 3 ] [WebSocket 廖雪峰](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001472780997905c8f293615c5a42eab058b6dc29936a5c000)

[ 4 ] [图解HTTP](https://book.douban.com/subject/25863515/)
