//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const locationApi = require('../../utils/getLocation.js')

const dateTime = require('../../utils/dateTime.js')

Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    fans_total: 0,
    village_name: "", //村地址
    town_name:"",     //镇地址
    town_code:"",     //镇代码
    banner_list: [{
      id: "1",
      img_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2226120516,635940438&fm=26&gp=0.jpg"
    }, {
      id: "2",
      img_url: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1171506515,2273340378&fm=26&gp=0.jpg"
    }, {
      id: "3",
      img_url: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3457886639,2496382393&fm=26&gp=0.jpg"
    }], //轮播图
    page: 1, //当前页码
    info_list: [], //信息列表
    isLoad: true, //默认可以加载
    category_list: [],
    startBarHeight: 0,
    navgationHeight: 0,
    show_desktop: true
  },
  onLoad() {
    //获取地理位置信息
    this.wxLocationInfo();
  },
  //关闭左上角提示
  closeDeskTop() {
    this.setData({
      show_desktop: false
    })
  },
  //搜索
  search() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  //重新选择位置
  chooseLocation() {
    locationApi.chooseLocation().then(res => {
      this.setData({
        village_name: res.village_name,
        town_name:res.town_name,
        town_code: res.town_code
      })
    })
  },
  //获取地理位置信息
  wxLocationInfo() {
    locationApi.wxLocationInfo().then(res => {
      this.setData({
        village_name: res.village_name,
        town_name: res.town_name,
        town_code: res.town_code
      })
      //获取粉丝总数
      this.getFansTotal();
      //获取顶部导航栏信息
      this.setNavigation();
      //获取一级分类列表
      this.getCateGory();
      //获取信息列表
      let req = {
        level_01_id: 0
      }
      this.getInfoList(req);
    })
  },
  //获取粉丝总数
  getFansTotal() {
    util.get(api.getFansTotal).then(res => {
      this.setData({
        fans_total: res.data + 8520
      })
    })
  },
  //获取一级分类列表
  getCateGory() {
    util.get(api.getCategoryList, {
      p_id: 0
    }).then(res => {
      let data = res.data;
      this.setData({
        category_list: data
      })
    })
  },
  //获取信息列表
  getInfoList(req) {
    req.page = this.data.page;
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
      this.setData({
        info_list: [...this.data.info_list, ...res.data]
      })
    })
  },
  //获取顶部导航栏信息
  setNavigation() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.setData({
          startBarHeight: statusBarHeight,
          navgationHeight: navHeight - statusBarHeight
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      isLoad: true,
      page: 1,
      info_list: []
    })
    //获取信息列表
    let req = {
      level_01_id: 0,
      page: this.data.page
    }
    this.getInfoList(req);
  },
  //上拉加载
  onReachBottom() {
    if (this.data.isLoad) {
      this.setData({
        page: this.data.page + 1
      })
      //获取信息列表
      let req = {
        level_01_id: 0,
        page: this.data.page
      }
      this.getInfoList(req);
    }
  },
  //点击跳转到服务页面
  service(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/service/service?id=' + id + '&index=' + index
    })
  },


})