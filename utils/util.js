const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

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
        if (res.data.code == 0) {
          //请求正常200
          resolve(res.data);
        } else {
          //请求失败
          reject("请求失败：" + res.data.code)
        }
      },
      fail: function (err) {
        //服务器连接异常
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}

module.exports = {
  get: get,
  post:post,
  formatTime: formatTime
}
