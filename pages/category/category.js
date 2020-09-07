// pages/category/category.js
const app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    category_list:[],
    index:0
  },
  onLoad(){
    //如果用户没授权
    if (!app.globalData.wxUser || !app.globalData.userInfo) {
      wx.reLaunch({
        url: '/pages/auth/auth?page_url=category'
      })
    } else {
      //获取分类列表
      this.getCategoryList();
    }
    
  },
  //获取分类列表
  getCategoryList(){
    util.get(api.getCategoryList, { level: 0 }).then(res => {
      if (res.code == 1) {
        this.setData({
          category_list: res.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //分享自定义
  // onShareAppMessage: function (res) {
  //   return app.globalData.shareObj
  // },
  //点击一级菜单
  checkOneLevel(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    })
  },
  //点击二级菜单
  bindPickerChange(e) {
    let pickIndex = e.detail.value;
    let level_02_id = this.data.category_list[this.data.index].children[pickIndex].cate_id;
    wx.navigateTo({
      url: "/pages/push/push?level_02_id=" + level_02_id
    })
  }



})