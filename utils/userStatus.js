var app = getApp();
const api = require('../utils/api.js')
const utils = require('../utils/util.js')

function getUserStatus() {
  if (!app.globalData.wxUser || !app.globalData.userInfo) {
    return new Promise(
      function (resolve, reject) {
        wx.navigateTo({
          url: "/pages/auth/auth",
        })
        resolve(false)
      }
    )
  } else {
    return new Promise(
      function(resolve, reject) {
        utils.get(api.getUserStatus, {
          openid: wx.getStorageSync('openid')
        }).then(res => {
          if (res.userInfo.status == '2') {
            wx.showModal({
              title: '提示',
              content: '您当前不能拨打电话或发布信息，如有疑问请在微信公众号留言联系管理员!',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            resolve(false)
          } else {
            resolve(true)
          }
        })
      }

    )
  }

}

module.exports = {
  getUserStatus: getUserStatus
}