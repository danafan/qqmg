/**
 * GET请求封装
 */
function get(url, data = {}) {
  return request(url, data, 'GET')
}

/**
 * POST请求封装
 */
function post(url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * 微信的request
 */
function request(url, data = {}, method = "GET") {
  wx.showLoading({
    mask:true,
    title: '加载中',
  })
  var contentType = 'application/json'
  return new Promise(function (resolve, reject) {
    var req = {};
    if (wx.getStorageSync('3rd_session')){
      req = {...data, ...{ _3rd_session: wx.getStorageSync('3rd_session')}} 
    }else{
        req = data
    }
    wx.request({
      url: url,
      data: req,
      method: method,
      header: {
        'Content-Type': contentType
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data);
      },
      fail: function (err) {
        wx.hideLoading()
        //服务器连接异常
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}

module.exports = {
  get: get,
  post: post
}