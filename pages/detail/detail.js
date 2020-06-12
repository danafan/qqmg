// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    dateilObj: {
      id: "1",
      images: [
        "../../images/banner_01.png",
        "../../images/banner_02.jpg",
        "../../images/banner_03.jpg"
      ],
      title: "崇化小区一楼出租,有天然气,干净整洁,领包入住",
      taps: ["天然气", "家电齐全", "拎包入住"],
      category_name: "房屋租售",
      create_time: "2020-05-26",
      browse: "132",
      user_img: "../../images/banner_01.png",
      username: "姜大卫",
      phone: "13067882143",
      desc: "有专门的管家给您贴心带看，床、衣柜、床头柜、书桌、座椅、台灯、床头灯，更多空间自己搭配，成为你一个温馨的家",
    }, //详情
    current_index: 0, //默认选中图片的下标
    show_img: false, //默认不显示大图
    shu: 1, //默认banner当前数
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return {
      title: this.data.dateilObj.title,
      imageUrl: this.data.dateilObj.images[0],
      path: '/pages/detail/detail'
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
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      let phone = this.data.dateilObj.phone;
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
})