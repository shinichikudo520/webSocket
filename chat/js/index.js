((doc) => {
    const oList = doc.querySelector('#list');
    const oMessage = doc.querySelector('#message');
    const oSend = doc.querySelector('#send');
    let userName = '';
    const reader = new FileReader();

    const WS_STATE = {
            CONNECTING,
            OPEN,
            CLOSING,
            CLOSED,
        }
        /** 最后一次与服务端通信的时间 */
    const lastActive = undefined;

    // 1. 启动服务
    const ws = new WebSocket('ws://localhost:8000'); // 监听的端口 8000 必须与服务端设置的端口一致

    const init = () => {
        bindEvent();
    };
    init();
    /** 更新通信时间 */
    const updateLastActive = () => {
        lastActive = performance.now()
    }

    function bindEvent() {
        oSend.addEventListener('click', handleSendBtnClick, false);

        // 2. 绑定 ws 服务的几个事件
        ws.addEventListener('open', handleOpen, false);
        ws.addEventListener('close', handleClose, false);
        ws.addEventListener('error', handleError, false);
        ws.addEventListener('message', handleMessage, false);
    }

    function handleSendBtnClick() {
        console.log('send message...');

        const msg = oMessage.value;

        if (!msg.trim().length) {
            return;
        }

        if (!ws) {
            return
        }

        // 3. 发送消息到服务端
        ws.send(
            JSON.stringify({
                user: userName,
                dataTime: new Date().getTime(),
                message: msg,
            })
        );

        oMessage.value = '';
    }

    function handleOpen(e) {
        console.log('webSocket open...', e);
        userName = localStorage.getItem('userName');

        if (!userName) {
            location.href = 'entry.html';
            return;
        }

        updateLastActive(); // 更新通信时间
        /** 心跳机制 */
        const keepAlive = () => {
            if (ws && ws.readyState === WS_STATE.OPEN) {
                if (lastActive && performance.now() - lastActive > 30000) { // 30s 发送一次心跳
                    ws.send('ping');
                    console.log('ping!');
                    updateLastActive(); // 更新通信时间
                }
                requestAnimationFrame(keepAlive);
            } else {
                console.log('ws close state...')
            }
        }
        keepAlive();
    }

    function handleClose(e) {
        console.log('webSocket close...', e);
        lastActive = undefined; // 清除通信时间
    }

    function handleError(e) {
        console.log('webSocket error...', e);
    }

    function handleMessage(e) {
        console.log('webSocket message...', e);
        updateLastActive(); // 更新通信时间
        // 4. 接收服务器广播的数据，进行处理
        const data = e.data;
        reader.readAsText(data, 'utf-8');
        reader.onload = function(e) {
            console.info('webSocket message text...', reader.result);
            const jsonData = JSON.parse(reader.result);
            oList.appendChild(createMsg(jsonData));
        };
    }

    function createMsg(data) {
        const { user, dataTime, message } = data;
        const oLi = doc.createElement('li');
        oLi.innerHTML = `
        <p>
            <span>${user}</span>
            <i>${new Date(dataTime)}：</i>
        </p>
        <p>${message}</p>
      `;
        return oLi;
    }

    function close() {
        console.log('客户端主动 close ws...');
        lastActive = undefined; // 清除通信时间
        if (ws) {
            ws.close();
            ws = null;
        }
    }
})(document);