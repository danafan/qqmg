//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onPullDownRefresh: function () {
    //显示加载动画
    wx.showNavigationBarLoading();
    //获取数据
    this.getData();
  },
  //获取数据
  getData() {
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },2000)
  }
  
})
