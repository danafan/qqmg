// pages/service/service.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const dateTime = require('../../utils/dateTime.js')
Page({
  data: {
    category_list: [], //一级分类列表
    active_index: 0, //默认选中的顶部导航下标
    info_list: [], //信息列表
    show_index: 0, //解决顶部滑动bug
    town_code:"",   //地址编码
    cate_id:"",     //选中的导航ID
    isLoad:true,
    page:1,
    pagesize:6,
    shouNull:false
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  onLoad(option) {
    this.setData({
      active_index: option.index == '-1' ? 0 : parseInt(option.index) + 1,
      show_index: option.index >= 5 ? 5 : option.index == '-1' ? 0 : option.index,
      cate_id: option.id,
      town_code: option.town_code
    })
    //获取一级分类列表
    this.getCateGory();
    //获取信息列表
    this.getInfoList();
  },
  //获取一级分类列表
  getCateGory() {
    util.get(api.getCategoryList, { level: 1 }).then(res => {
      if (res.code == 1) {
        let data = res.data;
        let obj = {
          cate_id: "0",
          cate_name: '全部'
        }
        data.unshift(obj);
        this.setData({
          category_list: data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //点击切换顶部导航
  changeCurrent(e) {
    this.setData({
      cate_id: e.currentTarget.dataset.id,
      info_list:[],
      active_index: e.currentTarget.dataset.index,
      isLoad:true,
      shouNull:false,
      page:1
    })
    //获取信息列表
    this.getInfoList();
  },
  //上拉加载
  onReachBottom() {
    if (this.data.isLoad) {
      this.setData({
        page: this.data.page + 1
      })
      //获取信息列表
      this.getInfoList();
    }
  },
  //获取信息列表
  getInfoList() {
    let req = { 
      type:2,
      page: this.data.page, 
      pagesize:this.data.pagesize,
      cate1: this.data.cate_id, 
      area_code: this.data.town_code, 
    };
    util.get(api.infoList, req).then(res => {
      if (res.code == 1) {
        if (res.data.data.length < this.data.pagesize) {
          this.setData({
            isLoad: false
          })
        }
        res.data.data.map(item => {
          //处理标签
          item.tags = item.tags.split(",");
          //处理模版
          item.temp_content = item.temp_content.split(",");
          //处理时间显示
          item.create_time = dateTime.getFormatTime(item.create_time);
        })
        this.setData({
          info_list: [...this.data.info_list, ...res.data.data],
          shouNull:true
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
})