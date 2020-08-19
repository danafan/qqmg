// pages/category/category.js
const app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    category_list:[],
    index:0,
    level_01_id:"",    //选中的一级菜单
  },
  onLoad(){
    //获取分类列表
    this.getCategoryList();
  },
  //获取分类列表
  getCategoryList(){
    util.get(api.getCategoryList, { p_id: '' }).then(res => {
      var data = res.data;
      var data_01 = [];
      data.map(item => {
        if (item.p_id == 0){
          item.children = [];
          data_01.push(item)
        }
      })
      data_01.map(item => {
        data.map(item_01 => {
          if (item.category_id == item_01.p_id) {
            item.children.push(item_01);
          }
        })
      })
      this.setData({
        category_list: data_01
      })
    })
  },
  //分享自定义
  // onShareAppMessage: function (res) {
  //   return app.globalData.shareObj
  // },
  //点击一级菜单
  checkOneLevel(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.setData({
      level_01_id: id,
      index: index
    })
  },
  //点击二级菜单
  bindPickerChange(e) {
    let level_01_id = this.data.level_01_id;
    let pickIndex = e.detail.value;
    let level_02_id = this.data.category_list[this.data.index].children[pickIndex].category_id;
    wx.navigateTo({
      url: "/pages/push/push?level_01_id=" + level_01_id + "&level_02_id=" + level_02_id
    })
  }



})