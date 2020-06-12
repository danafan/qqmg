//app.js
App({
  onLaunch: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              console.log(this.globalData.userInfo);
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    shareObj:{
      title: '免费的本地信息服务平台',
      imageUrl: "/images/banner_01.png",
      path: '/pages/index/index'
    }
  }
})