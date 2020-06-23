// pages/category/category.js
const app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    level_01_list:[],   //一级菜单列表
    level_02_list:[],   //二级菜单列表
    level_01_id:"",    //选中的一级菜单
  },
  onLoad(){
    //获取分类列表
    let req = {p_id:0}
    this.getCategoryList(req,'1');
  },
  //获取分类列表
  getCategoryList(req,type){
    util.get(api.getCategoryList, req).then(res => {
      if(type == '1'){
        this.setData({
          level_01_list: res.data
        })
      } else if (type == '2'){
        this.setData({
          level_02_list: res.data
        })
      }
    })
  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  },
  //点击一级菜单
  checkOneLevel(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      level_01_id: id
    })
    //获取分类列表
    let req = {
      p_id: id
    }
    this.getCategoryList(req, '2');
    
  },
  //点击二级菜单
  bindPickerChange(e) {
    let level_01_id = this.data.level_01_id;
    let pickIndex = e.detail.value;
    let level_02_id = this.data.level_02_list[pickIndex].category_id;
    wx.navigateTo({
      url: "/pages/push/push?level_01_id=" + level_01_id + "&level_02_id=" + level_02_id
    })
  }



})