const api = require('./api.js')
const utils = require('./util.js')

function login() {
  const rd_Session = wx.getStorageSync('3rd_session');
  if (rd_Session) {
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
      getUserInfo();
    },
    fail: () => {
      //已过期，先微信登录，再用户登录
      _wxLogin();
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
  let req = {
    code: code
  }
  utils.get(api.get3rdSession, req).then(res => {
    if (res.code == 1) {
      wx.setStorageSync('3rd_session', res.data);
      //获取用户信息
      getUserInfo();
    } else {
      console.log(res.msg);
    }
  })
}

//获取用户信息
function getUserInfo() {
  utils.get(api.getUserInfo).then(res => {
    if (res.code == 1) { // 如果已经注册，更新用户信息，更新微信头像和昵称；未注册不作处理
      var app = getApp();
      //更新用户信息
      app.globalData.userInfo = res.data;
      wx.getUserInfo({
        success: (res) => {
          let wxUser = {
            wx_head_img: res.userInfo.avatarUrl,
            wx_nickname: res.userInfo.nickName
          }
          //更新微信信息
          app.globalData.wxUser = wxUser;
          //更新用户信息
          updateInfo(wxUser);
        },
        fail: (err) => {
          console.log("用户未授权")
        }
      })
    }
  })
}

//更新用户信息
function updateInfo(wxUser) {
  utils.post(api.updateInfo, wxUser).then(res => {
    if (res.code == 1) {
      console.log('更新成功')
    } else {
      wx.showToast({
        title: res.msg,
        icon: "none",
        mask: true,
        duration: 1500
      })
    }
  })
}
module.exports = {
  login: login
}