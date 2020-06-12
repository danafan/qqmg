// pages/management/management.js
const app = getApp()
Page({
  data: {
    push_list:[
      {
        id:"1",
        goods_img:"../../images/banner_02.jpg",
        title:"室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        create_time:"2020-05-26"
      },
      {
        id: "2",
        goods_img: "../../images/banner_01.png",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        create_time: "2020-05-26"
      },
      {
        id: "3",
        goods_img: "../../images/banner_03.jpg",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        create_time: "2020-05-26"
      },
      {
        id: "4",
        goods_img: "../../images/banner_02.jpg",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        create_time: "2020-05-26"
      },
      {
        id: "5",
        goods_img: "../../images/banner_01.png",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        create_time: "2020-05-26"
      },
      {
        id: "6",
        goods_img: "../../images/banner_01.png",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        create_time: "2020-05-26"
      },
    ]

  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  },
  //点击进入详情
  detail() {
    wx.navigateTo({
      url: "/pages/detail/detail"
    })
  },
  //下架
  shelves(){
    wx.showModal({
      title: '提示',
      content: "确认下架该信息？",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})