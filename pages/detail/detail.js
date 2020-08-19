// pages/detail/detail.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const userStatus = require('../../utils/userStatus.js')
const dateTime = require('../../utils/dateTime.js')
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    info_detail: {}, //详情
    current_index: 0, //默认选中图片的下标
    show_img: false, //默认不显示大图
    shu: 1, //默认banner当前数
    isShare: false, //是否是分享页面进来的
    current_id: "", //当前信息的id
  },
  onLoad(option) {
    this.setData({
      current_id: option.id
    })
    if (option.isShare) {
      this.setData({
        isShare: option.isShare
      })
    }
    //获取信息详情
    this.getInfoDetail();
  },
  //获取信息详情
  getInfoDetail() {
    let req = {
      info_id: this.data.current_id
    }
    util.get(api.getInfoDetail, req).then(res => {
      let data = res.data;
      //处理时间显示
      data.create_time = dateTime.getFormatTime(data.create_time);
      //处理文件数组
      if (data.file_list) {
        data.files = data.file_list.split("_");
      }
      //处理标签数组
      if (data.tag_txts) {
        data.tag_txts = data.tag_txts.split("_");
      }
      //区分图片或视频
      if (data.file_list && data.file_list.indexOf('mp4') > -1) {
        data.file_type = 'video'
      } else {
        data.file_type = 'image'
      }
      this.setData({
        info_detail: res.data
      })
    })
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return {
      title: this.data.info_detail.info_desc,
      path: '/pages/detail/detail?id=' + this.data.current_id + "&isShare=" + this.data.isShare
    }
  },
  //监听banner变化
  changeBanner(e) {
    this.setData({
      shu: e.detail.current + 1
    })
  },
  //打开大图
  openBigImg(e) {
    let img_obj = e.currentTarget.dataset;
    this.setData({
      current_index: img_obj.index,
      show_img: true
    })
  },
  //关闭大图
  close() {
    this.setData({
      show_img: false
    })
  },
  //拨打电话
  call(e) {
    if (!app.globalData.wxUser || !app.globalData.userInfo) {
      wx.navigateTo({
        url: "/pages/auth/auth",
      });
    } else {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })
    }
  },
  //点击用户
  getUserInfo(){
    let user_id = this.data.info_detail.create_user_id;
    let create_user_img = this.data.info_detail.create_user_img;
    let create_user_nickname = this.data.info_detail.create_user_nickname;
    wx.navigateTo({
      url: '/pages/userinfo/userinfo?user_id=' + user_id + '&create_user_img=' + create_user_img + '&create_user_nickname=' + create_user_nickname
    });
  }
})