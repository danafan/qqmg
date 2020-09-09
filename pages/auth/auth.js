// pages/auth/auth.js
var app = getApp();
const locationApi = require('../../utils/getLocation.js')
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({
  data: {
    type: "",
    page_url:""
  },
  onLoad(option) {
    if (option.page_url){
      this.setData({
        page_url: option.page_url
      })
    }
    //判断哪一个没授权
    this.judgeAuth();
  },
  //判断哪一个没授权
  judgeAuth() {
    if (!app.globalData.detail_address) { //注册地址
      this.setData({
        type: '-1'
      })
      wx.setNavigationBarTitle({
        title: '获取当前位置'
      })
    } else if (!app.globalData.wxUser) { //微信信息
      this.setData({
        type: '1'
      })
      wx.setNavigationBarTitle({
        title: '微信授权' 
      })
    } else if (!app.globalData.userInfo) { //手机号
      this.setData({
        type: '2'
      })
      wx.setNavigationBarTitle({
        title: '快速注册' 
      })
    }
  },
  //获取地理位置信息(只有首页用)
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
  //获取微信头像和昵称
  bindGetUserInfo(e) {
    app.globalData.wxUser = {
      wx_head_img: e.detail.userInfo.avatarUrl,
      wx_nickname: e.detail.userInfo.nickName
    }
    if (!app.globalData.userInfo) {
      this.setData({
        type: '2'
      })
      wx.setNavigationBarTitle({
        title: '用户注册' // 其他页面传过来的标题名
      })
    } else {
      app.globalData.wxUser = e.detail.userInfo;
      wx.navigateBack({
        delta: 1
      })
    }
  },
  // 注册
  register() {
    let req = {
      phone: parseInt((Math.random() + 1) * Math.pow(10, 11 - 1)),
      wx_head_img: app.globalData.wxUser.wx_head_img,
      wx_nickname: app.globalData.wxUser.wx_nickname,
      create_addr: app.globalData.detail_address
    }
    util.get(api.register, req).then(res => {
      if (res.code == 1) {
        wx.switchTab({
          url: `/pages/${this.data.page_url}/${this.data.page_url}`
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  }
  //获取用户手机号
  // getPhoneNumber(e) {
  //   let iv = e.detail.iv;
  //   let encryptedData = e.detail.encryptedData;
  //   let address = app.globalData.locationObj.detail_address;
  //   let openid = wx.getStorageSync('openid');
  //   let session_key = app.globalData.session_key;

  // }
})