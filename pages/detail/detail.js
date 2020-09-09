// pages/detail/detail.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const dateTime = require('../../utils/dateTime.js')
Page({
  data: {
    info_detail: {}, //详情
    big_imgs:[],    //大图的列表
    current_index: 0, //默认选中图片的下标
    show_img: false, //默认不显示大图
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
  closeToast(){
    this.setData({
      isShare:false
    })
  },
  //获取信息详情
  getInfoDetail() {
    let req = {
      info_id: this.data.current_id
    }
    util.get(api.getInfoDetail, req).then(res => {
      if(res.code == 1){
        //标签
        res.data.tags = res.data.tags != ''?res.data.tags.split(","):'';
        //文件
        res.data.view_file = res.data.view_file != ''?res.data.view_file.split(","):'';
        // 模版
        let temp_content = res.data.temp_content;
        if (temp_content == ''){
          res.data.temp_content = [];
        }else{
          var temp_arr = [];
          temp_content.split(",").map(item => {
            let temp_obj = {};
            temp_obj.k = item.split(":")[0];
            temp_obj.v = item.split(":")[1];
            temp_arr.push(temp_obj);
          })
          res.data.temp_content = temp_arr;
        }
        // 时间
        res.data.create_time = dateTime.getFormatTime(res.data.create_time);
        this.setData({
          info_detail: res.data
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
  //分享自定义
  onShareAppMessage: function(res) {
    return {
      title: this.data.info_detail.info_desc,
      path: '/pages/detail/detail?id=' + this.data.current_id + "&isShare=" + this.data.isShare
    }
  },
  //打开大图
  openBigImg(e) {
    let img_obj = e.currentTarget.dataset;
    var base_url = img_obj.base_url;
    var img_arr = [];
    img_obj.imgs.map(item => {
      img_arr.push(base_url + item);
    })
    this.setData({
      big_imgs: img_arr,
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
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  //点击用户
  getUserInfo(){
    let user_id = this.data.info_detail.user_id;
    wx.navigateTo({
      url: '/pages/userinfo/userinfo?user_id=' + user_id
    });
  }
})