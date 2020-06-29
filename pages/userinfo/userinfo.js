// pages/userinfo/userinfo.js
const app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
Page({
  data: {
    baseUrl:app.globalData.baseUrl,
    user_obj:{},    //用户信息
    push_list: [],  //信息列表
    user_id:"",   //用户id
    isLoad:true,
    page:1
  },
  onLoad(option){
    this.setData({
      user_id: option.user_id
    })
    //获取用户信息
    this.getUserInfo({ user_id: this.data.user_id });
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
  //获取用户信息
  getUserInfo(req){
    util.get(api.getUserInfo, req).then(res => {
      let userData = res.data;
      let number = userData.num + userData.active_day;
      userData.vip = Math.floor(number / 10);
      this.setData({
        user_obj: userData
      })
    })
  },
  //获取信息列表
  getInfoList() {
    let req = { create_user_id: this.data.user_id,page:this.data.page };
    util.get(api.infoList, req).then(res => {
      if (res.data.length < 8) {
        this.setData({
          isLoad: false
        })
      }
      res.data.map(item => {
        //处理显示图片
        if (item.file_list) {
          item.file_url = this.data.baseUrl + item.file_list.split("_")[0];
        }else{
          item.file_url = '../../images/banner_01.png';
        }
        //区分图片或视频
        if (item.file_list && item.file_list.indexOf('mp4') > -1) {
          item.file_type = 'video'
        } else {
          item.file_type = 'image'
        }
        //处理时间显示
        function addDateZero(num) {
          return (num < 10 ? "0" + num : num);
        }
        let datetime = new Date(item.create_time);
        item.m = datetime.getMonth() + 1 + '月'
        item.d = addDateZero(datetime.getDate())
      })
      this.setData({
        push_list: [...this.data.push_list,...res.data]
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
})