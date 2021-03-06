module.exports = {
  // 项目配置
  app: {
    // node 环境变量方式
    port: process.env.PORT || 3000
    // 配置完成后命令行设置端口：set PORT=5656(cmd) $env:PORT=5656(powershell)
  },
  // 数据库配置
  db: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/techinfoapi'
  },
  // jwt 使用的秘钥
  jwtPrivateKey: 'fc54d49e-6302-4c57-b1cc-c9d8b49d2d30'
}
