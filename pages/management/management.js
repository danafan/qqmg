// pages/management/management.js
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    baseUrl:app.globalData.baseUrl,
    push_list:[],   //信息列表
  },
  onLoad(){
    //获取信息列表
    this.getInfoList({create_user_id:app.globalData.user_id});
  },
  //获取信息列表
  getInfoList(req) {
    util.get(api.infoList, req).then(res => {
      res.data.map(item => {
        //处理显示图片
        if (item.file_list) {
          item.file_url = this.data.baseUrl + item.file_list.split("_")[0];
        } else {
          item.file_url = '../../images/banner_01.png';
        }
        //区分图片或视频
        if (item.file_list && item.file_list.indexOf('mp4') > -1) {
          item.file_type = 'video'
        } else {
          item.file_type = 'image'
        }
        //处理时间显示
        var time = new Date(parseInt(item.create_time));
        var y = time.getFullYear();
        item.m = (time.getMonth() + 1) + '月';
        item.d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
      })
      this.setData({
        push_list: res.data
      })
    })
  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  },
  //点击进入详情
  detail(e) {
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + e.detail
    })
  },
  //下架
  shelves(e){
    wx.showModal({
      title: '提示',
      content: "确认下架该信息？",
      success:(res) => {
        if (res.confirm) {
          let req = { info_id: e.detail}
          util.post(api.deleteInfo, req).then(res => {
            wx.showToast({
              title: '下架成功',
              icon: "none",
              mask: true,
              duration: 1500, 
              success:() => {
                //获取信息列表
                this.getInfoList({ create_user_id: app.globalData.user_id });
              }
            })
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  }
})