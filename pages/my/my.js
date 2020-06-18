// pages/my/my.js
var app = getApp();
Page({
  data: {
    authStatus: false, //默认未登录
    res_user_info: {
      vip_level_count: 0,
      vip_level: "--",
      push_count: "--",
      signing_count: "--"
    }, //后台获取的用户信息
    wx_user_info: {}, //微信用户信息
  },
  //登录
  login() {
    wx.navigateTo({
      url: '/pages/auth/auth',
    });
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  onShow() {
    if (!app.globalData.userInfo) {
      console.log("未登录")
      this.setData({
        authStatus: false,
      })
    } else {
      console.log("登录")
      this.setData({
        authStatus: true,
        wx_user_info: app.globalData.userInfo
      })
      //获取用户信息（根据微信用户获取）
      this.getUserInfo();
    }
  },
  //获取用户信息（根据微信用户获取）
  getUserInfo() {
    let userObj = {
      vip_level_count: 28,
      vip_level: "8",
      push_count: "13",
      signing_count: "45"
    }
    this.setData({
      res_user_info: userObj
    })
  },
  //发布管理
  pushManagement() {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      wx.navigateTo({
        url: "/pages/management/management"
      })
    }
  },


})