// components/PushItem/push_item.js
var app = getApp();
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Component({
  properties: {
    infoItem: {
      type: Object, //类型
      value: {} //默认值
    },
    page_type: {
      type: String, //类型
      value: 'index' //默认值
    }
  },
  data: {
    show_img: false, //默认不显示大图  
    big_imgs: [], //所有大图列表
    current_index: 0, //当前选中的大图下标
  },
  methods: {
    //拨打电话
    call(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })
    },
    //点击显示大图
    open(e) {
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
      if (this.data.page_type == 'index') {
        wx.hideTabBar()
      }
    },
    //大图切换
    bindchange(e) {
      this.setData({
        current_index: e.detail.current
      })
    },
    //点击关闭大图
    close() {
      this.setData({
        show_img: false
      })
      if (this.data.page_type == 'index') {
        wx.showTabBar()
      }
    },
    //点击进入详情
    detail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/detail/detail?id=" + id
      })
    },
    //查看用户详情
    getUserInfo(e) {
      let user_id = e.currentTarget.dataset.user_id;
      wx.navigateTo({
        url: '/pages/userinfo/userinfo?user_id=' + user_id
      });
    }
  }
})