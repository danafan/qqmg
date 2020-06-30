// pages/auth/auth.js
var app = getApp();
Page({
  data: {
    type: "0"
  },
  onLoad(option) {
    //判断哪一个没授权
    this.judgeAuth();
  },
  //判断哪一个没授权
  judgeAuth(){
    if (!app.globalData.wxUser){
      this.setData({
        type:'1'
      })
    } else if (!app.globalData.userInfo){
      this.setData({
        type: '2'
      })
    }
  },
  //获取到用户信息赋值给公共变量
  bindGetUserInfo(e) {
    if (!app.globalData.userInfo) {
      this.setData({
        type: '2'
      })
    }else{
      app.globalData.wxUser = e.detail.userInfo;
      wx.navigateBack({
        delta: 1
      })
    }
    
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
})