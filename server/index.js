const ws = require('ws');

((ws) => {
  // url ==> ws://localhost:8000
  // 1. 构建服务
  const server = new ws.Server({ port: 8000 }); // 端口设置 8000 要与前端监听的端口一致

  const init = () => {
    bindEvent();
  };
  init();

  function bindEvent() {
    // 2. 绑定 ws server 服务的几个事件
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    server.on('connection', handleConnection);
  }

  function handleOpen(e) {
    console.log('webSocket open...', e);
  }
  function handleClose(e) {
    console.log('webSocket close...', e);
  }
  function handleError(e) {
    console.log('webSocket error...', e);
  }
  function handleConnection(ev) {
    console.log('webSocket connection...');
    ev.on('message', handleMessage);
  }
  function handleMessage(e) {
    console.log('webSocket message...', e);
    // 3. 接收数据
    server.clients.forEach((c) => {
      // 4. 服务端将数据广播到所有客户端
      c.send(e);
    });
  }
})(ws);
