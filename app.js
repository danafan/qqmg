//app.js
const api = require('./utils/api.js')
const utils = require('./utils/util.js')
App({
  onLaunch: function() {
    //获取后台用户信息
    this.login();
    //获取微信用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //获取用户信息
          this.wxUserInfo();
        }
      }
    })
  },
  login() {
    const openid = wx.getStorageSync('openid');
    if (openid) {
      //判断微信服务端是否过期
      this._checkWXSession();
    } else {
      //微信登录
      this. _wxLogin();
    }
  },

  //判断微信服务端是否过期
  _checkWXSession() {
    wx.checkSession({
      success: () => {
        //微信未过期，获取用户状态
        this.getUserStatus();
      },
      fail: () => {
        //已过期，先微信登录，再用户登录
        this._wxLogin();
      }
    })
  },

  //获取用户状态
  getUserStatus() {
    utils.get(api.getUserStatus, {
      openid: wx.getStorageSync('openid')
    }).then(res => {
      if (res.userInfo) {
        this.globalData.userInfo = res.userInfo;
        console.log(this.globalData.userInfo)
      } else {
        this.globalData.userInfo = null;
      }
    })
  },

  //先微信登录，再用户登录
  _wxLogin() {
    wx.login({
      success: (res) => {
        this._serLogin(res.code)
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  //用户登录
  _serLogin(code) {
    utils.get(api.getOpenId, {
      code: code
    }).then(res => {
      wx.setStorageSync('openid', res.openid);
      this.globalData.session_key = res.session_key;
      //获取用户状态
      this.getUserStatus();
    })
  },
  //获取微信用户信息
  wxUserInfo() {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          this.globalData.wxUser = res.userInfo;
          resolve(res);
        }
      })

    })
  },
  globalData: {
    baseUrl: "http://localhost:8089/static/uploads/",
    wxUser: null, //微信用户信息
    userInfo: null, //后台用户信息
    session_key:null,
    shareObj: {
      title: '免费的本地信息服务平台',
      imageUrl: "/images/banner_01.png",
      path: '/pages/index/index'
    }, //自定义分享的内容
    locationObj: {},//用户地址信息（市，经纬度）
  }
})