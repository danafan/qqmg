// pages/search/search.js
Page({
  data: {
    startBarHeight: 0,
    navgationHeight: 0,
    search_val: ""
  },
  onLoad: function (options) {
    //获取顶部导航栏信息
    this.setNavigation();
  },
  //获取顶部导航栏信息
  setNavigation() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.setData({
          startBarHeight: statusBarHeight,
          navgationHeight: navHeight - statusBarHeight
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  //监听搜索内容
  changeInput(v) {
    let search_value = v.detail.value;
    this.setData({
      search_val: search_value
    })
  },
  //清空内容
  clearInput() {
    this.setData({
      search_val: ''
    })
  },
  //返回上一页面
  goBack() {
    wx.navigateBack({
      delta: 1
    })

  }
})