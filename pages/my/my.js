// pages/my/my.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    authStatus:false,   //默认没有获取到微信信息
    user_obj: {
      active_day: "--",
      vip: "--",
      num: "--"
    }, //后台获取的用户信息
    wx_user_info: {}, //微信用户信息
  },
  onLoad() {
    //如果用户没授权
    if (!app.globalData.wxUser || !app.globalData.userInfo) {
      wx.reLaunch({
        url: '/pages/auth/auth'
      })
    }else{
      this.setData({
        authStatus:true,
        wx_user_info: app.globalData.wxUser
      })
      //获取用户信息
      this.getUserInfo({ user_id: app.globalData.userInfo.user_id })
    }
  },
  //获取用户信息
  getUserInfo(req) {
    util.get(api.getUserInfo, req).then(res => {
      let userData = res.data;
      let number = userData.num + userData.active_day;
      userData.vip = Math.floor(number / 10) > 10 ? 10 : Math.floor(number / 10);
      this.setData({
        user_obj: userData
      })
    })
  },
  //分享自定义
  // onShareAppMessage: function(res) {
  //   return app.globalData.shareObj
  // },
  //发布管理
  pushManagement() {
    wx.navigateTo({
      url: "/pages/management/management"
    })
  },


})