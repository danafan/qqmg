// pages/service/service.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const dateTime = require('../../utils/dateTime.js')
Page({
  data: {
    category_list: [], //一级分类列表
    active_index: 0, //默认选中的顶部导航下标
    service_list: [], //信息列表
    show_index: 0, //解决顶部滑动bug
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  onLoad(option) {
    this.setData({
      active_index: option.index == '-1' ? 0 : parseInt(option.index) + 1,
      show_index: option.index >= 5 ? 5 : option.index == '-1' ? 0 : option.index
    })
    //获取一级分类列表
    this.getCateGory();
    //获取信息列表
    let req = { level_01_id: option.id };
    this.getInfoList(req);
  },
  //获取一级分类列表
  getCateGory() {
    util.get(api.getCategoryList, {
      p_id: 0
    }).then(res => {
      let data = res.data;
      let obj = {
        category_id:0,
        category_name:'全部'
      }
      data.unshift(obj);
      this.setData({
        category_list: data
      })
    })
  },
  //点击切换顶部导航
  changeCurrent(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.setData({
      active_index: index
    })
    let req = { level_01_id: id };
    //获取信息列表
    this.getInfoList(req);
  },
  //获取信息列表
  getInfoList(req) {
    util.get(api.infoList, req).then(res => {
      res.data.map(item => {
        //处理文件数组
        if (item.file_list) {
          item.files = item.file_list.split("_");
        }
        //区分图片或视频
        if (item.file_list && item.file_list.indexOf('mp4') > -1) {
          item.file_type = 'video'
        } else {
          item.file_type = 'image'
        }
        //处理标签数组
        if (item.tag_ids) {
          item.tags = item.tag_ids.split("_");
        }
        //处理时间显示
        item.ddd = dateTime.getFormatTime(item.create_time);
        //处理不同的信息
        if (item.diff_data) {
          let diffObj = JSON.parse(item.diff_data);
          var diffArr = [];
          for (var k in diffObj) {
            var type = "";
            if (k == 'check_sneq') {
              type = "类型";
            } else if (k == 'sex') {
              type = "性别";
            } else if (k == 'company') {
              type = "公司名称";
            } else if (k == 'wage') {
              type = "薪资";
            } else if (k == 'work_addres') {
              type = "工作地址";
            } else if (k == 'experience') {
              type = "工作经验";
            } else if (k == 'age') {
              type = "年龄";
            } else if (k == 'house_location') {
              type = "房屋地址";
            } else if (k == 'destination') {
              type = "目的地";
            } else if (k == 'origin') {
              type = "出发地";
            } else if (k == 'number') {
              type = "乘坐人数";
            } else if (k == 'origin_time') {
              type = "乘车时间";
            }
            diffArr.push({ type: type, val: diffObj[k] })
          }
          item.diff_data = diffArr
        }
      })
      console.log(res.data)
      this.setData({
        service_list: res.data
      })
    })
  },
  //拨打电话
  call(v) {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      let phone = v.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  },
  //点击进入详情
  detail() {
    wx.navigateTo({
      url: "/pages/detail/detail"
    })
  }
})