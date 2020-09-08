// pages/search/search.js
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const dateTime = require('../../utils/dateTime.js')
Page({
  data: {
    startBarHeight: 0,
    navgationHeight: 0,
    search_val: "",
    page: 1, //当前页码
    pagesize: 10,
    info_list: [], //信息列表
    isLoad: true, //默认可以加载
    isNull:false,
    town_code:"",
    timeOut:null
  },
  onLoad: function (options) {
    this.setData({
      town_code: options.town_code
    })
    //获取顶部导航栏信息
    this.setNavigation();
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
  //监听搜索内容
  changeInput(v) {
    if (this.data.timeOut) {
      clearTimeout(this.data.timeOut);
    }
    this.setData({
      timeOut:setTimeout(() => {
        let search_value = v.detail.value;
        this.setData({
          search_val: search_value,
          info_list: [],
          isNull: false
        })
        if (this.data.search_val != ''){
          //获取信息列表
          this.getInfoList();  
        }
      }, 1000)
    })
    
  },
  //上拉加载
  onReachBottom() {
    if (this.data.isLoad) {
      this.setData({
        page: this.data.page + 1,
      })
      //获取信息列表
      this.getInfoList();
    }
  },
  //获取信息列表
  getInfoList() {
    let req = {
      keyword: this.data.search_val,
      area_code: this.data.town_code,
      page: this.data.page,
      pagesize: this.data.pagesize
    }
    util.get(api.infoList, req).then(res => {
      if (res.code == 1) {
        if (res.data.data.length < this.data.pagesize) {
          this.setData({
            isLoad: false
          })
        }
        res.data.data.map(item => {
          //处理标签
          item.tags = item.tags != ''?item.tags.split(","):[];
          //处理模版
          item.temp_content = item.temp_content != ''?item.temp_content.split(","):[];
          //处理时间显示
          item.create_time = dateTime.getFormatTime(item.create_time);
        })
        this.setData({
          info_list: [...this.data.info_list, ...res.data.data],
          isNull:true
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //清空内容
  clearInput() {
    this.setData({
      search_val: '',
      info_list: []
    })
  },
  //返回上一页面
  goBack() {
    wx.navigateBack({
      delta: 1
    })

  }
})