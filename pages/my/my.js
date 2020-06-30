// pages/my/my.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    authStatus: false, //默认未登录
    user_obj:{
      active_day:"--",
      vip:"--",
      num:"--"
    }, //后台获取的用户信息
    wx_user_info: {}, //微信用户信息
  },
  onLoad() {
    if (!app.globalData.wxUser) {
      this.setData({
        authStatus: false,
      })
    } else {
      this.setData({
        authStatus: true,
        wx_user_info: app.globalData.wxUser
      })
      //获取用户信息
      // this.getUserInfo({ user_id: app.globalData.userInfo.user_id });
    }
  },
  //获取用户信息
  getUserInfo(req) {
    util.get(api.getUserInfo, req).then(res => {
      let userData = res.data;
      let number = userData.num + userData.active_day;
      userData.vip = Math.floor(number / 10);
      this.setData({
        user_obj: userData
      })
    })
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