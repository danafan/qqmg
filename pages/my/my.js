// pages/my/my.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    authStatus:false,   //默认没有获取到微信信息
    wxUser: {}, //微信用户信息
    userInfo:{},//注册用户信息
  },
  onLoad() {
    //如果用户没授权
    if (!app.globalData.wxUser || !app.globalData.userInfo) {
      wx.reLaunch({
        url: '/pages/auth/auth?page_url=my'
      })
    }else{
      this.setData({
        authStatus:true,
        wxUser: app.globalData.wxUser,
        userInfo: app.globalData.userInfo
      })
    }
  },
  //发布管理
  pushManagement() {
    wx.navigateTo({
      url: "/pages/management/management"
    })
  },

})