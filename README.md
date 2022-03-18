# webSocket

## 主要事件监听

        1. open
        2. close
        3. error
        4. message
        5. connection

# 前端

## 主要事件监听

        1. open
        2. close
        3. error
        4. message

## 页面：

        1. entry.html
            input userName
            click for enter the chatting room
            localStorage to save the userName
        2. index.html
            list - show message list
            input - message
            button - send message

## 构建：

1. cd chat
2. npm init -y
3. yarn add vite -D
4. 将 package.json 中脚本命令修改成

   `"scripts": { "dev": "vite" },`

## 执行:

`npm run dev`

## 访问

    `http://localhost:3000/entry.html`

地址：[访问地址](http://localhost:3000/entry.html)

# 后端

## 主要事件监听

    1. open
    2. close
    3. error
    4. message
    5. connection

## 构建：

1. cd server
2. npm init -y
3. yarn add ws
4. yarn add nodemon -g （这个工具如果全局安装过了，就可以不用安装了）

   - nodemon：可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于 node.js 的应用程序。

5. 将 package.json 中脚本命令修改成

   `"scripts": "scripts": { "dev": "nodemon index.js" },`

## 执行：

`npm run dev`
