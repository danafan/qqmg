//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const locationApi = require('../../utils/getLocation.js')
const dateTime = require('../../utils/dateTime.js')

Page({
  data: {
    fans_total: 0,
    village_name: "", //村地址
    town_name: "", //镇地址
    town_code: "", //镇代码
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
    pagesize: 6,
    info_list: [], //信息列表
    isLoad: true, //默认可以加载
    category_list: [],
    startBarHeight: 0,
    navgationHeight: 0,
    show_desktop: true, //顶部添加到桌面提示
    shouNull: false, //空页面不显示
  },
  onLoad() {
    //获取地理位置信息
    this.wxLocationInfo();
    //判断是否第一次进入（顶部提示）
    const is_first = wx.getStorageSync('is_first');
    if (!is_first) {
      wx.setStorageSync('is_first', 'isfirst');
    }
    this.setData({
      show_desktop: is_first ? false : true
    })

  },
  //关闭顶部添加到桌面提示
  closeDeskTop() {
    this.setData({
      show_desktop: false
    })
  },
  //搜索
  search() {
    wx.navigateTo({
      url: "/pages/search/search?town_code=" + this.data.town_code
    })
  },
  //重新选择位置
  chooseLocation() {
    locationApi.chooseLocation().then(res => {
      this.setData({
        village_name: res.village_name,
        town_name: res.town_name,
        town_code: res.town_code,
        info_list: [],
        shouNull: false,
        page: 1
      })
      //获取信息列表
      let req = {
        area_code: this.data.town_code,
        page: this.data.page,
        pagesize: this.data.pagesize
      }
      this.getInfoList(req);
    })
  },
  //获取地理位置信息
  wxLocationInfo() {
    locationApi.wxLocationInfo().then(res => {
      this.setData({
        village_name: res.village_name,
        town_name: res.town_name,
        town_code: res.town_code,
        page: 1
      })
      //获取顶部导航栏信息
      this.setNavigation();
      //获取一级分类列表
      this.getCateGory();
      //获取信息列表
      let req = {
        area_code: this.data.town_code,
        page: this.data.page,
        pagesize: this.data.pagesize
      }
      this.getInfoList(req);
    })
  },
  //获取一级分类列表
  getCateGory() {
    util.get(api.getCategoryList, {
      level: 1
    }).then(res => {
      if (res.code == 1) {
        let data = res.data;
        let all_obj = {
          cate_id: "0",
          cate_name: "全部",
          icon: "../../images/all_cate.png"
        }
        data.push(all_obj);
        this.setData({
          category_list: data
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
  //上拉加载
  onReachBottom() {
    if (this.data.isLoad) {
      this.setData({
        page: this.data.page + 1,
      })
      //获取信息列表
      let req = {
        area_code: this.data.town_code,
        page: this.data.page,
        pagesize: this.data.pagesize
      }
      this.getInfoList(req);
    }
  },
  //获取信息列表
  getInfoList(req) {
    util.get(api.infoList, req).then(res => {
      if (res.code == 1) {
        if (res.data.data.length < this.data.pagesize) {
          this.setData({
            isLoad: false
          })
        }
        res.data.data.map(item => {
          //处理标签
          item.tags = item.tags.split(",");
          //处理模版
          item.temp_content = item.temp_content.split(",");
          //处理时间显示
          item.create_time = dateTime.getFormatTime(item.create_time);
        })
        this.setData({
          info_list: [...this.data.info_list, ...res.data.data],
          shouNull: true
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
  //信息列表
  service(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/service/service?id=' + id + '&index=' + index + '&town_code=' + this.data.town_code
    })
  },


})