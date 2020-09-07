//app.js
App({
  onLaunch: function() {
    const login = require('./utils/login.js')
    //获取后台用户信息
    login.login();
  },
  globalData: {
    baseUrl: "http://localhost:8089/static/uploads/",
    wxUser: null, //微信用户信息
    userInfo: null, //后台用户信息
    detail_address: null,//注册地址
    session_key: null,
    shareObj: {
      title: '免费的本地信息服务平台',
      imageUrl: "/images/banner_01.png",
      path: '/pages/index/index'
    }, //自定义分享的内容
  }
})