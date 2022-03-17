# webSocket

    1. open
    2. close
    3. error
    4. message
    5. connection

# 前端

    1. open
    2. close
    3. error
    4. message

    页面：
        1. entry.html
            input userName
            click for enter the chatting room
            localStorage to save the userName
        2. index.html
            list - show message list
            input - message
            btn - send message

构建：
cd chat
npm init -y
yarn add vite -D
将 package.json 中脚本命令修改成
`"scripts": { "dev": "vite" },`
执行:
npm run dev
访问 : http://localhost:3000/entry.html

# 后端

    1. open
    2. close
    3. error
    4. message
    5. connection

构建：
cd server
npm init -y
yarn add ws
yarn add nodemon -g （这个工具如果全局安装过了，就可以不用安装了）
将 package.json 中脚本命令修改成
`"scripts": "scripts": { "dev": "nodemon index.js" },`
执行：
npm run dev
