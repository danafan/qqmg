// pages/management/management.js
const app = getApp()
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({
  data: {
    info_list:[],   //信息列表
    isLoad:true,
    page:1,
    pagesize:6
  },
  onLoad(){
    //获取信息列表
    this.getInfoList();
  },
  //下架之后刷新
  reload(v){
    let index = v.detail.index;
    // 处理获取信息列表
   
  },
  //上拉加载
  onReachBottom() {
    if (this.data.isLoad) {
      this.setData({
        page: this.data.page + 1,
      })
      //获取信息列表
      this.getInfoList();
    }
  },
  //获取信息列表
  getInfoList() {
    //获取信息列表
    let req = {
      type: 1,
      page: this.data.page,
      pagesize: this.data.pagesize
    }
    utils.get(api.infoList, req).then(res => {
      if (res.code == 1) {
        if (res.data.data.length < this.data.pagesize) {
          this.setData({
            isLoad: false
          })
        }
        res.data.data.map(item => {
          //处理时间
          item.dd = item.create_time.split(" ")[0].split('-')[2];
          item.mm = item.create_time.split(" ")[0].split('-')[1];
          //封面图
          if (item.view_file.length > 0) {
            item.file_url = item.host + item.view_file[0];
          } else {
            item.file_url = "";
          }

        })
        this.setData({
          info_list: [...this.data.info_list, ...res.data.data]
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
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  }
  
})