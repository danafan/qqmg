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
          app.globalData.detail_address = result.address; //注册地址
          console.log(result)
          let town_name = result.address_reference.town.title;                //镇名称
          let town_code = result.address_reference.town.id;                   //镇代码
          let district_name = result.ad_info.district;                        //县/区名称
          let ad_code = result.ad_info.adcode;                                //县/区代码
          let city_name = result.ad_info.city;                                //市名称
          let city_code = result.ad_info.city_code;                           //市代码
          let village_name = result.address_reference.landmark_l2.title; //村名称
          //返回参数
          let location_info = {
            town_name: town_name, //镇名称
            town_code: town_code, //镇代码
            district_name: district_name, //县/区名称
            district_code: ad_code,             //县/区代码
            city_name: city_name,         //市名称
            city_code: city_code,         //市代码
            village_name: village_name, //村名称
            info_address: town_name + village_name //信息地址（镇+村）
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