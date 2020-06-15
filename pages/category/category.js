// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [{
        id: "1",
        name: "牲畜交易",
        types:[{
            id:"1",
            val:"牛"
        }, {
            id: "2",
            val: "羊"
          }, {
            id: "3",
            val: "驴"
          }, {
            id: "4",
            val: "马"
          }, {
            id: "5",
            val: "猪"
          }, {
            id: "6",
            val: "狗"
          }, {
            id: "7",
            val: "家禽"
          },
        ]
      },
      {
        id: "2",
        name: "农用物资"
      },
      {
        id: "3",
        name: "招聘求职"
      },
      {
        id: "4",
        name: "房产交易"
      },
      {
        id: "5",
        name: "二手物品"
      },
      {
        id: "6",
        name: "汽车交易"
      },
      {
        id: "7",
        name: "本地服务"
      },
      {
        id: "8",
        name: "打车拼车"
      }
    ]
  },
  bindPickerChange(e){
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})