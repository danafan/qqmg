const api = require('./api.js')
const utils = require('./util.js')
const app = getApp();

function login() {
  const openid = wx.getStorageSync('openid');
  if (openid) {
    //判断微信服务端是否过期
    _checkWXSession();
  } else {
    //微信登录
    _wxLogin();
  }
}

//判断微信服务端是否过期
function _checkWXSession() {
  wx.checkSession({
    success: () => {
      //微信未过期，获取用户状态
      getUserStatus();
    },
    fail: () => {
      //已过期，先微信登录，再用户登录
      _wxLogin();
    }
  })
}

//获取用户状态
function getUserStatus() {
  utils.get(api.getUserStatus, {
    openid: wx.getStorageSync('openid')
  }).then(res => {
    if (res.userInfo){
      app.globalData.userInfo = res.userInfo;
    }
  })
}

//先微信登录，再用户登录
function _wxLogin() {
  wx.login({
    success: (res) => {
      _serLogin(res.code)
    },
    fail: (err) => {
      console.log(err);
    }
  })
}

//用户登录
function _serLogin(code) {
  utils.get(api.getOpenId, {
    code: code
  }).then(res => {
    console.log(res.openid)
    wx.setStorageSync('openid', res.openid);
    //获取用户状态
    getUserStatus();
  })
}

module.exports = {
  login: login
}