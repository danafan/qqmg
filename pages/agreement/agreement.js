// pages/agreement/agreement.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  },
})