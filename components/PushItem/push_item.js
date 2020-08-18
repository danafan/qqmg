// components/PushItem/push_item.js
var app = getApp();
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
const userStatus = require('../../utils/userStatus.js')
Component({
  /**
   * 组件的属性列表
   */
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
    baseUrl: app.globalData.baseUrl,
    show_img: false, //默认不显示大图  
    imgheights: [], //所有图片的高度
    big_imgs: [], //所有大图列表
    current_index: 0, //当前选中的大图下标
  },
  methods: {
    //获取图片真实宽度
    imageLoad(e) {
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
        ratio = imgwidth / imgheight;
      //计算的高度值  
      var viewHeight = 750 / ratio;
      var imgheight = viewHeight;
      var imgheights = this.data.imgheights;
      //把每一张图片的对应的高度记录到数组里  
      imgheights[e.target.dataset.index] = imgheight;
      this.setData({
        imgheights: imgheights
      })
    },
    //大图切换
    bindchange(e) {
      this.setData({
        current_index: e.detail.current
      })
    },
    //拨打电话
    call(e) {
      userStatus.getUserStatus().then(res => {
        if (res) {
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone
          })
        }
      })
    },
    //点击显示大图
    open(e) {
      let img_obj = e.currentTarget.dataset;
      this.setData({
        big_imgs: img_obj.imgs,
        current_index: img_obj.index,
        show_img: true
      })
      if (this.data.page_type == 'index') {
        wx.hideTabBar()
      }
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
      let user_id = e.currentTarget.dataset.infoobj.create_user_id;
      let create_user_img = e.currentTarget.dataset.infoobj.create_user_img;
      let create_user_nickname = e.currentTarget.dataset.infoobj.create_user_nickname;
      wx.navigateTo({
        url: '/pages/userinfo/userinfo?user_id=' + user_id + '&create_user_img=' + create_user_img + '&create_user_nickname=' + create_user_nickname
      });
    }
  }
})