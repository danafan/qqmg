//index.js
//获取应用实例
const app = getApp()
//获取地理位置
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    location:"请选择",
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
    info_list: [{
      id: "1",
      user_img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1165765833,86180705&fm=26&gp=0.jpg",
      username: "胖葫芦",
      user_id: "1",
      phone: "13067882143",
      info_type: "房屋租售",
      taps: ["干净整洁", "家电齐全", "交通便利"],
      desc: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
      imgs: [
        "http://img5.imgtn.bdimg.com/it/u=276815822,2703331779&fm=26&gp=0.jpg", "http://img5.imgtn.bdimg.com/it/u=234393529,3203191822&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=2426846869,4265052253&fm=26&gp=0.jpg", "http://img3.imgtn.bdimg.com/it/u=2362296928,3787617057&fm=26&gp=0.jpg", "http://img1.imgtn.bdimg.com/it/u=4027125397,1071762676&fm=15&gp=0.jpg"
      ],
      create_time: "3分钟前",
      browse: "12"
    }, {
      id: "2",
      user_img: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1522381966,644466171&fm=26&gp=0.jpg",
      username: "@听雨",
      user_id: "2",
      phone: "13067882143",
      info_type: "牲畜交易",
      taps: ["膘肥体壮", "黑白花", "产奶量高"],
      desc: "这头牛的两只眼睛像铜铃一样大,两只弯角青里透亮,特别是那一身黄毛,像绸子一样光亮",
      imgs: [
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=694357891,2697756894&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1410842032,2730421252&fm=26&gp=0.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1559105924,2340006983&fm=26&gp=0.jpg"
      ],
      create_time: "8小时前",
      browse: "6"
    }, {
      id: "3",
      user_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1629861,1032092665&fm=11&gp=0.jpg",
      username: "蓝天白云",
      user_id: "3",
      phone: "13067882143",
      info_type: "招聘求职",
      taps: ["高薪", "不加班", "法定假日", "免费零食"],
      desc: "公司工作环境优雅，同事相处和睦，法定节假日，生日礼物",
      imgs: [
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2728969359,3430466718&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2615551809,611271473&fm=15&gp=0.jpg", "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2476494870,1509703343&fm=26&gp=0.jpg", "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1674318272,2224049709&fm=15&gp=0.jpg", "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1236388489,293554175&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1492600424,36195930&fm=26&gp=0.jpg", "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1404254628,3315059032&fm=26&gp=0.jpg", "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=343243997,1469454983&fm=26&gp=0.jpg"
      ], //信息列表
      create_time: "昨天",
      browse: "108"
    }], //信息列表
    category_list: [{
      id: "1",
      icon: "../../images/cate_01.png",
      name: "牲畜交易"
    }, {
      id: "2",
      icon: "../../images/cate_07.png",
      name: "农用物资"
    }, {
      id: "3",
      icon: "../../images/cate_03.png",
      name: "招聘求职"
    }, {
      id: "4",
      icon: "../../images/cate_04.png",
      name: "房产交易"
    }, {
      id: "5",
      icon: "../../images/cate_05.png",
      name: "二手物品"
    }, {
      id: "6",
      icon: "../../images/cate_06.png",
      name: "汽车交易"
    }, {
      id: "7",
      icon: "../../images/cate_02.png",
      name: "本地服务"
    }, {
      id: "8",
      icon: "../../images/cate_08.png",
      name: "打车拼车"
    }],
    startBarHeight: 0,
    navgationHeight: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取顶部导航栏信息
    this.setNavigation();
    //获取地理位置信息
    this.wxLocationInfo();
  },
  //获取地理位置信息
  wxLocationInfo() {
    wx.authorize({
      scope: 'scope.userLocation',
      success: () => {
        this.wxGetLocation();
      }
    })
  },
  openSet(){
    wx.openSetting({
      success:(res) => {
        this.wxGetLocation();
      }
    })
  },
  // wx.getLocation
  wxGetLocation(){
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
    qqmapsdk.reverseGeocoder({
      location: req,
      success: (res) => {
        app.globalData.locationObj.address = res.result.address_component.city;
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
  onPullDownRefresh: function() {
    //显示加载动画
    wx.showNavigationBarLoading();
    //获取数据
    this.getData();
  },
  //获取数据
  getData() {
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000)
  },
  //点击进入详情
  detail() {
    wx.navigateTo({
      url: "/pages/detail/detail"
    })
  },
  //点击跳转到服务页面
  service(e) {
    let i = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/service/service?index=' + i
    })
  },


})