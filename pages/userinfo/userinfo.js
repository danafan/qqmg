// pages/userinfo/userinfo.js
const app = getApp();
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({
  data: {
    user_obj:{},    //用户信息
    info_list: [],  //信息列表
    user_id: "",   //用户id
    isLoad:true,
    page:1,
    pagesize:6
  },
  onLoad(option){
    this.setData({
      user_id: option.user_id,
    })
    //获取用户信息
    this.getUserInfo();
    //获取信息列表
    this.getInfoList();
  },
  //获取用户信息
  getUserInfo(req){
    utils.get(api.getUserInfo, { other_user_id: this.data.user_id }).then(res => {
      if (res.code == 1) {
        this.setData({
          user_obj:res.data
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
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
    //获取信息列表
    let req = {
      type: 2,
      other_user_id: this.data.user_id,
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
          if (item.view_file.length > 0){
            item.file_url = item.host + item.view_file[0];
          }else{
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