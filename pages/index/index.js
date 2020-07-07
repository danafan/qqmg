//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const dateTime = require('../../utils/dateTime.js')
//获取地理位置
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    baseUrl:app.globalData.baseUrl,
    fans_total: 0,
    location: "",
    banner_list: [{
      id: "1",
      img_url: "../../images/banner_01.png"
    }, {
      id: "2",
      img_url: "../../images/banner_02.jpg"
    }, {
      id: "3",
      img_url: "../../images/banner_03.jpg"
    }], //轮播图
    page:1,       //当前页码
    info_list: [], //信息列表
    isLoad:true,    //默认可以加载
    category_list: [],
    startBarHeight: 0,
    navgationHeight: 0
  },
  onLoad: function(options) {
    //获取粉丝总数
    this.getFansTotal();
    //获取顶部导航栏信息
    this.setNavigation();
    //获取地理位置信息
    this.wxLocationInfo();
    //获取一级分类列表
    this.getCateGory();
    //获取信息列表
    let req = {level_01_id:0}
    this.getInfoList(req);
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
  getInfoList(req){
    req.page = this.data.page;
    util.get(api.infoList, req).then(res => {
      if (res.data.length < 8){
        this.setData({
          isLoad:false
        })
      }
      res.data.map(item => {
        //处理文件数组
        if(item.file_list){ 
          item.files = item.file_list.split("_");
        }
        //区分图片或视频
        if (item.file_list && item.file_list.indexOf('mp4') > -1){
          item.file_type = 'video'
        }else{
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
          for (var k in diffObj){
            var type = "";
            if (k == 'check_sneq'){
              type = "类型";
            } else if (k == 'sex'){
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
      this.setData({
        info_list: [...this.data.info_list,...res.data]
      })
    })
  },
  //搜索
  search() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  //获取当前位置
  getLocationInfo() {
    if (this.data.location == '点击获取') {
      //获取地理位置信息
      this.openSet();
    }
  },
  //获取地理位置信息
  wxLocationInfo() {
    wx.getSetting({
      success:(res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success:() => {
              this.wxGetLocation();
            },
            fail:(err) => {
              this.setData({
                location: "点击获取"
              })
            }
          })
        }else{
          this.wxGetLocation();
        }
      }
    })
  },
  openSet() {
    wx.openSetting({
      success: (res) => {
        this.wxGetLocation();
      }
    })
  },
  // wx.getLocation
  wxGetLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        app.globalData.locationObj.latitude = res.latitude;
        app.globalData.locationObj.longitude = res.longitude;
        let req = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        this.getApi(req);
      }
    })
  },
  // api
  getApi(req) {
    qqmapsdk = new QQMapWX({
      key: 'L4BBZ-KNVK6-TAXSF-M4PC6-TLLAZ-5UBGR'
    });
    this.setData({
      location: "获取中"
    })
    qqmapsdk.reverseGeocoder({
      location: req,
      success: (res) => {
        let address_obj = res.result.address_component;
        app.globalData.locationObj.address = address_obj.city;
        let detail_address = address_obj.city + address_obj.district + address_obj.street;
        app.globalData.locationObj.detail_address = detail_address;
        this.setData({
          location: res.result.address_component.city
        })
      }
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
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      isLoad:true,
      page: 1,
      info_list:[]
    })
    //获取信息列表
    let req = { level_01_id: 0, page: this.data.page}
    this.getInfoList(req);
  },
  //上拉加载
  onReachBottom(){
    if (this.data.isLoad){
      this.setData({
        page: this.data.page + 1
      })
      //获取信息列表
      let req = { level_01_id: 0, page: this.data.page }
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