var app = getApp();
const api = require('./api.js')
const utils = require('./util.js')

//获取地理位置
var QQMapWX = require('./qqmap-wx-jssdk.min.js');
var qqmapsdk;

//判断是否授权地址
function judgeAuth() {
  return new Promise(
    function(resolve, reject) {
      wx.getSetting({
        success: (res) => {
          resolve(res.authSetting['scope.userLocation']);
        }
      })
    })
}
//重新选择位置
function chooseLocation() {
  return new Promise(
    function(resolve, reject) {
      judgeAuth().then(res => {
        if (!res) { //未授权
          wx.openSetting({
            success: () => {
              resolve(wxGetLocation());
            }
          })
        } else {
          // 选择位置方法
          wx.chooseLocation({
            success: (res) => {
              let req = {
                latitude: res.latitude,
                longitude: res.longitude
              }
              getApi(req).then(res => {
                resolve(res)
              })
            },
          })
        }
      })
    })
}

//获取地理位置信息
function wxLocationInfo() {
  return new Promise(
    function(resolve, reject) {
      judgeAuth().then(res => {
        if (!res) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              resolve(wxGetLocation());
            },
            fail: (err) => {
              wx.reLaunch({
                url: '/pages/auth/auth'
              })
            }
          })
        } else {
          resolve(wxGetLocation());
        }
      })
    })
}

// wx.getLocation
function wxGetLocation() {
  return new Promise(
    function(resolve, reject) {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          let req = {
            latitude: res.latitude,
            longitude: res.longitude
          }
          getApi(req).then(res => {
            resolve(res)
          })
        }
      })
    }
  )
}
// api
function getApi(req) {
  qqmapsdk = new QQMapWX({
    key: 'L4BBZ-KNVK6-TAXSF-M4PC6-TLLAZ-5UBGR'
  });
  return new Promise(
    function(resolve, reject) {
      qqmapsdk.reverseGeocoder({
        location: req,
        success: (res) => {
          let result = res.result;
          console.log(result)
          let town_title = result.address_reference.town.title;
          let landmark_l2_title = result.address_reference.landmark_l2.title;
          let location_info = {
            town_name: result.address_reference.town.title, //镇名称
            village_name: landmark_l2_title, //村名称
            town_code: result.address_reference.town.id, //镇代码
            register_address: result.address, //注册地址
            info_address: town_title + landmark_l2_title //信息地址
          }
          resolve(location_info);
        }
      })
    })
}

module.exports = {
  wxLocationInfo: wxLocationInfo,
  chooseLocation: chooseLocation,
  wxGetLocation: wxGetLocation,
  judgeAuth: judgeAuth
}