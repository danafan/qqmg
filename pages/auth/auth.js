// pages/auth/auth.js
var app = getApp();
//获取地理位置
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    type: "",
    page_type:""
  },
  onLoad(option) {
    this.setData({
      page_type: option.page_type
    })
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
        title: '获取位置'    // 其他页面传过来的标题名
      })
    } else if (!app.globalData.wxUser) { //微信信息
      this.setData({
        type: '1'
      })
      wx.setNavigationBarTitle({
        title: '微信授权'   // 其他页面传过来的标题名
      })
    } else if (!app.globalData.userInfo) { //手机号
      this.setData({
        type: '2'
      })
      wx.setNavigationBarTitle({
        title: '用户注册'    // 其他页面传过来的标题名
      })
    }
  },
  //获取地理位置信息
  wxLocationInfo() {
    wx.openSetting({
      success: (res) => {
        this.wxGetLocation();
      }
    })
  },
  // wx.getLocation
  wxGetLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        let req = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        this.getApi(req);
      }
    })
  },
  // api
  getApi(req) {
    qqmapsdk = new QQMapWX({
      key: 'L4BBZ-KNVK6-TAXSF-M4PC6-TLLAZ-5UBGR'
    });
    qqmapsdk.reverseGeocoder({
      location: req,
      success: (res) => {
        let result = res.result;
        console.log(res.result)
        app.globalData.locationObj.address = result.address_reference.town.title; //镇名称
        app.globalData.locationObj.adcode = result.address_reference.town.id;     //镇代码
        app.globalData.locationObj.detail_address = result.address;               //注册地址（详细）
        wx.switchTab({
          url: `/pages/index/index`
        })
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

  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
})