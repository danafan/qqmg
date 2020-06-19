//app.js
//获取地理位置
var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
App({
  onLaunch: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //获取用户信息
          this.wxUserInfo();
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
          resolve(res);
        }
      })

    })
  },
  //获取地理位置信息
  wxLocationInfo() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: () => {
        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            this.globalData.locationObj.latitude = res.latitude;
            this.globalData.locationObj.longitude = res.longitude;
            let req = {
              latitude: this.globalData.locationObj.latitude,
              longitude: this.globalData.locationObj.longitude
            }
            this.getApi(req);
          }
        })
      }
    })
  },
  // api
  getApi(req) {
    qqmapsdk = new QQMapWX({
      key: 'L4BBZ-KNVK6-TAXSF-M4PC6-TLLAZ-5UBGR'
    });
    qqmapsdk.reverseGeocoder({
      location: req,
      success: (res) => {
        this.globalData.locationObj.address = res.result.address_component.city;
        console.log(this.globalData.locationObj.address)
      }
    })
  },
  globalData: {
    userInfo: null,
    shareObj: {
      title: '免费的本地信息服务平台',
      imageUrl: "/images/banner_01.png",
      path: '/pages/index/index'
    },
    locationObj: {
      address:"请选择"
    }
  }
})