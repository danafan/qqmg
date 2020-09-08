// pages/my/my.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    authStatus:false,   //默认没有获取到微信信息
    wxUser: {}, //微信用户信息
    userInfo:{
      active_days:"--",
      publish_num:"--"
    },//注册用户信息
  },
  onLoad() {
    //如果用户没授权
    // if (!app.globalData.wxUser || !app.globalData.userInfo) {
    //   wx.reLaunch({
    //     url: '/pages/auth/auth?page_url=my'
    //   })
    // }else{
    //   this.setData({
    //     authStatus:true,
    //     wxUser: app.globalData.wxUser,
    //     userInfo: app.globalData.userInfo
    //   })
    // }
  },
  //积分说明
  integralDesc(){
    wx.showModal({
      title: '积分说明',
      content: '用户每活跃一天增加1积分，每发布一条信息增加2积分，积分无上限，积分按照等级规则可转换成等级',
      showCancel:false
    })
  },  
  //发布管理
  pushManagement() {
    wx.navigateTo({
      url: "/pages/management/management"
    })
  },

})