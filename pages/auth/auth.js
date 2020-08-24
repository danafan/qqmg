// pages/auth/auth.js
var app = getApp();
const locationApi = require('../../utils/getLocation.js')

Page({
  data: {
    type: ""
  },
  onLoad(option) {
    //判断哪一个没授权
    this.judgeAuth();
  },
  //判断哪一个没授权
  judgeAuth() {
    if (!app.globalData.locationObj.adcode) { //行政区划代码
      this.setData({
        type: '-1'
      })
      wx.setNavigationBarTitle({
        title: '获取位置' // 其他页面传过来的标题名
      })
    } else if (!app.globalData.wxUser) { //微信信息
      this.setData({
        type: '1'
      })
      wx.setNavigationBarTitle({
        title: '微信授权' // 其他页面传过来的标题名
      })
    } else if (!app.globalData.userInfo) { //手机号
      this.setData({
        type: '2'
      })
      wx.setNavigationBarTitle({
        title: '用户注册' // 其他页面传过来的标题名
      })
    }
  },
  //获取地理位置信息
  wxLocationInfo() {
    wx.openSetting({
      success: (res) => {
        locationApi.wxGetLocation().then(res => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        });
      }
    })
  },
  //获取到用户信息赋值给公共变量
  bindGetUserInfo(e) {
    if (!app.globalData.userInfo) {
      this.setData({
        type: '2'
      })
    } else {
      app.globalData.wxUser = e.detail.userInfo;
      wx.navigateBack({
        delta: 1
      })
    }

  },
  //获取用户手机号
  getPhoneNumber(e) {
    let iv = e.detail.iv;
    let encryptedData = e.detail.encryptedData;
    let address = app.globalData.locationObj.detail_address;
    let openid = wx.getStorageSync('openid');
    let session_key = app.globalData.session_key;

  }
})