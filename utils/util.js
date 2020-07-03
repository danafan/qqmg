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
    title: '加载中',
    mask:true
  })
  var contentType = 'application/json'
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == 0) {
          //请求正常200
          resolve(res.data);
        } else if (res.data.code == -1){  //信息被下架之后进入详情
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: true,
            success:() => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              },1500);
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (err) {
        wx.hideLoading()
        //服务器连接异常
        wx.showToast({
          title: "服务器连接异常，请检查网络再试",
          icon: 'none',
          duration: 1500
        })
      }
    })
  });
}

module.exports = {
  get: get,
  post:post
}
