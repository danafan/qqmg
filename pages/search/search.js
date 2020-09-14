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
    hot_cate_list:[], //热门分类
    isLoad: true, //默认可以加载
    isNull:false,
    ctd_code:"",
    check_location_id:"",
    timeOut:null
  },
  onLoad: function (options) {
    this.setData({
      ctd_code: options.ctd_code,
      check_location_id: options.check_location_id,
    })
    //获取顶部导航栏信息
    this.setNavigation();
    //获取热门分类
    this.getHotCate();
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
  //获取热门分类
  getHotCate(){
    util.get(api.getHotCate).then(res => {
      if (res.code == 1) {
        this.setData({
          hot_cate_list:res.data
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
  //点击热门搜索
  checkKeyword(e){
    let keyword = e.currentTarget.dataset.keyword;
    //监听搜索内容
    this.changeInput(keyword);
  },
  //监听搜索内容
  changeInput(v) {
    if (this.data.timeOut) {
      clearTimeout(this.data.timeOut);
    }
    let search_value = v.detail ? v.detail.value : v;
    this.setData({
      search_val: search_value,
      info_list: [],
      isNull: false,
      timeOut: setTimeout(() => {
        if (this.data.search_val != '') {
          //获取信息列表
          this.getInfoList();
        }
      }, 800)
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
      area_code: this.data.ctd_code,
      area_type: this.data.check_location_id,
      page: this.data.page,
      pagesize: this.data.pagesize
    }
    util.get(api.infoList, req).then(res => {
      if (res.code == 1) {
        if (res.data.last_page == this.data.page) {
          this.setData({
            isLoad: false
          })
        }
        res.data.data.map(item => {
          //处理标签
          item.tags = item.tags != ''?item.tags.split(","):[];
          //处理模版
          let temp_content = item.temp_content;
          if (temp_content == '') {
            item.temp_content = [];
          } else {
            var temp_arr = [];
            temp_content.split(",").map(temp_item => {
              let temp_obj = {};
              temp_obj.k = temp_item.split(":")[0];
              temp_obj.v = temp_item.split(":")[1];
              temp_arr.push(temp_obj);
            })
            item.temp_content = temp_arr;
          }
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