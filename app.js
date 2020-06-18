//app.js
App({
  onLaunch: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //获取用户信息
          this.wxUserInfo();
        }
        if (res.authSetting['scope.userLocation']) {
          //获取地理位置信息
          this.wxLocationInfo();
        }
      }
    })
  },
  //获取用户信息
  wxUserInfo() {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          console.log(res);
          this.globalData.userInfo = res.userInfo;
          // if (this.userInfoReadyCallback) {
          //   this.userInfoReadyCallback(res)
          // }
          resolve(res);
        }
      })
  
    })
  },
  //获取地理位置信息
  wxLocationInfo() {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          that.globalData.locationObj.latitude = res.latitude;
          that.globalData.locationObj.longitude = res.longitude;
          resolve(res);
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    shareObj: {
      title: '免费的本地信息服务平台',
      imageUrl: "/images/banner_01.png",
      path: '/pages/index/index'
    },
    locationObj: {}
  }
})