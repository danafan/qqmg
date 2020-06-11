// pages/auth/auth.js
var app = getApp();
Page({
  //获取到用户信息赋值给公共变量
  bindGetUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    wx.navigateBack({
      delta: 1
    })
  }
})