//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const locationApi = require('../../utils/getLocation.js')
const dateTime = require('../../utils/dateTime.js')

Page({
  data: {
    fans_total: 0, //粉丝数
    loaction_info: {}, //地址信息
    check_location_id: '1', //1:全市；2:全县；3:全镇
    area_text: "全市",
    area_list: [{
      id: '1',
      name: '全市'
    }, {
      id: '2',
      name: '全县'
    }, {
      id: '3',
      name: '全镇'
    }],
    ctd_address: "", //当前所在区域地址（镇/县/市，中间展示）
    ctd_code: "", //当前区域代码（镇/县/市，筛选条件，可传递）
    banner_list: [{
      id: "1",
      img_url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2226120516,635940438&fm=26&gp=0.jpg"
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
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onLoad() {
    //获取地理位置信息
    this.wxLocationInfo();
    //获取顶部导航栏信息
    this.setNavigation();
    //判断是否第一次进入（顶部提示）
    const is_first = wx.getStorageSync('is_first');
    if (!is_first) {
      wx.setStorageSync('is_first', 'isfirst');
    }
    this.setData({
      show_desktop: is_first ? false : true
    })
  },
  //切换范围
  bindPickerChange(e){
    let pickIndex = e.detail.value;
    this.setData({
      area_text: this.data.area_list[pickIndex].name,
      check_location_id: this.data.area_list[pickIndex].id
    })
    //判断当前区域范围
    this.judgeScope()
  },
  //判断当前区域范围
  judgeScope() {
    if (this.data.check_location_id == '1') { //全市
      this.setData({
        ctd_code: this.data.loaction_info.city_code,
        ctd_address: this.data.loaction_info.city_name
      })
    } else if (this.data.check_location_id == '2') { //全县
      this.setData({
        ctd_code: this.data.loaction_info.district_code,
        ctd_address: this.data.loaction_info.district_name
      })
    } else if (this.data.check_location_id == '3') { //全镇
      this.setData({
        ctd_code: this.data.loaction_info.town_code,
        ctd_address: this.data.loaction_info.town_name
      })
    }
    this.setData({
      isLoad: true,
      info_list: [],
      shouNull: false,
      page: 1
    })
    //获取信息列表
    this.getInfoList();
  },
  //获取地理位置信息
  wxLocationInfo() {
    locationApi.wxLocationInfo().then(res => {
      this.setData({
        loaction_info: res
      })
      //获取一级分类列表
      this.getCateGory();
      //判断当前区域范围
      this.judgeScope();
    })
  },
  //重新选择位置
  chooseLocation() {
    locationApi.chooseLocation().then(res => {
      this.setData({
        loaction_info: res
      })
      //判断当前区域范围
      this.judgeScope();
    })
  },
  //获取一级分类列表
  getCateGory() {
    util.get(api.getCategoryList, {
      level: 1
    }).then(res => {
      if (res.code == 1) {
        let cates = res.data.cates;
        let all_obj = {
          cate_id: "0",
          cate_name: "全部",
          icon: "../../images/all_cate.png"
        }
        cates.push(all_obj);
        this.setData({
          category_list: cates,
          fans_total: 8521 + res.data.user_total
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
  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      info_list: [],
      page: 1,
      isLoad: true,
      shouNull: false
    })
    //获取信息列表
    this.getInfoList();
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
      area_code: this.data.ctd_code,
      area_type: this.data.check_location_id,
      page: this.data.page,
      pagesize: this.data.pagesize
    }
    util.get(api.infoList, req).then(res => {
      wx.stopPullDownRefresh();
      if (res.code == 1) {
        res.data.data.map(item => {
          //处理标签
          item.tags = item.tags != "" ? item.tags.split(",") : [];
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
          isLoad: res.data.last_page == this.data.page ? false : true,
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
  //进入信息列表
  service(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/service/service?id=' + id + '&index=' + index + '&ctd_code=' + this.data.ctd_code + "&check_location_id=" + this.data.check_location_id
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
      url: "/pages/search/search?ctd_code=" + this.data.ctd_code + "&check_location_id=" + this.data.check_location_id
    })
  },

})