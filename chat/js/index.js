((doc) => {
  const oList = doc.querySelector('#list');
  const oMessage = doc.querySelector('#message');
  const oSend = doc.querySelector('#send');
  let userName = '';
  const reader = new FileReader();

  // 1. 启动服务
  const ws = new WebSocket('ws://localhost:8000'); // 监听的端口 8000 必须与服务端设置的端口一致

  const init = () => {
    bindEvent();
  };
  init();

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
    }
  }
  function handleClose(e) {
    console.log('webSocket close...', e);
  }
  function handleError(e) {
    console.log('webSocket error...', e);
  }
  function handleMessage(e) {
    console.log('webSocket message...', e);
    // 4. 接收服务器广播的数据，进行处理
    const data = e.data;
    reader.readAsText(data, 'utf-8');
    reader.onload = function (e) {
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
})(document);
