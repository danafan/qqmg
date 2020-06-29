// pages/search/search.js
const app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const dateTime = require('../../utils/dateTime.js')
Page({
  data: {
    search_val: "", //输入的关键词
    taps_list: [], //标签列表
    service_list: [], //信息列表
    isNull:false,
    page: 1,
    isLoad: true
  },
  onLoad() {
    //获取分类列表
    this.getCategoryList()
  },
  //获取分类列表
  getCategoryList() {
    util.get(api.getCategoryList, {
      p_id: ''
    }).then(res => {
      var data = res.data;
      let arr = [];
      data.map(item => {
        if (item.p_id != 0) {
          arr.push(item)
        }
      })
      this.setData({
        taps_list: arr
      })
    })
  },
  //上拉加载
  onReachBottom() {
    if (this.data.isLoad) {
      this.setData({
        page: this.data.page + 1
      })
      //获取信息列表
      this.getInfoList();
    }
  },
  //获取信息列表
  getInfoList() {
    let req = {
      page: this.data.page,
      search_txt: this.data.search_val
    }
    util.get(api.infoList, req).then(res => {
      if (res.data.length < 8) {
        this.setData({
          isLoad: false
        })
      }
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
        if (item.tag_txts) {
          item.tag_txts = item.tag_txts.split("_");
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
            diffArr.push({
              type: type,
              val: diffObj[k]
            })
          }
          item.diff_data = diffArr
        }
      })
      console.log(res.data)
      this.setData({
        service_list: [...this.data.service_list, ...res.data],
        isNull:true
      })
    })
  },
  //点击标签
  checkTag(e) {
    this.setData({
      search_val: e.currentTarget.dataset.name,
      isNull:false
    })
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  //监听输入
  searchInput(e) {
    this.setData({
      search_val: e.detail.value
    })
    if (e.detail.value == ''){
      this.setData({
        isNull: false
      })
    }
  },
  //搜索
  search() {
    if (this.data.search_val == '') {
      wx.showToast({
        title: "请输入搜索内容",
        icon: "none",
        mask: true,
        duration: 1500
      })
      return;
    }
    this.setData({
      service_list: []
    })
    //获取信息列表
    this.getInfoList();
  },
  //点击我要发布
  goPush() {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      wx.reLaunch({
        url: '/pages/category/category'
      })
    }
  },

})