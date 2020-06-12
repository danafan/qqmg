//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    location:"杭州",
    swipers_data: {
      radio_list: [{
        id: "1",
        username: "胖葫芦",
        type_text: "二手物品"
      }, {
        id: "2",
        username: "蓝天白云",
        type_text: "招聘信息"
      }, {
        id: "3",
        username: "@听雨",
        type_text: "牲畜交易"
      }],
      banner_list: [{
        id: "1",
        img_url: "../../images/banner_01.png"
      }, {
        id: "2",
        img_url: "../../images/banner_02.jpg"
      }, {
        id: "3",
        img_url: "../../images/banner_03.jpg"
      }]
    }, //轮播广告和轮播图
    info_list: [{
      id: "1",
      user_img: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1165765833,86180705&fm=26&gp=0.jpg",
      username: "胖葫芦",
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
        phone: "13067882143",
        info_type: "牲畜交易",
        taps: ["膘肥体壮", "黑白花", "产奶量高"],
        desc: "这头牛的两只眼睛像铜铃一样大,两只弯角青里透亮,特别是那一身黄毛,像绸子一样光亮",
        imgs: [
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=694357891,2697756894&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1410842032,2730421252&fm=26&gp=0.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1559105924,2340006983&fm=26&gp=0.jpg"],
        create_time: "8小时前",
        browse: "6"
      }, {
        id: "3",
        user_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1629861,1032092665&fm=11&gp=0.jpg",
        username: "蓝天白云",
        phone: "13067882143",
        info_type: "招聘求职",
        taps: ["高薪", "不加班", "法定假日", "免费零食"],
        desc: "公司工作环境优雅，同事相处和睦，法定节假日，生日礼物",
        imgs: [
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2728969359,3430466718&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2615551809,611271473&fm=15&gp=0.jpg", "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2476494870,1509703343&fm=26&gp=0.jpg", "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1674318272,2224049709&fm=15&gp=0.jpg", "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1236388489,293554175&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1492600424,36195930&fm=26&gp=0.jpg", "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1404254628,3315059032&fm=26&gp=0.jpg", "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=343243997,1469454983&fm=26&gp=0.jpg"],
        create_time: "昨天",
        browse: "108"
      }]
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    // this.getAddressDetail();
  },

  /**
     * 获取地理位置信息详情
     */
  getAddressDetail: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84',// 参考系
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        // 构建请求地址
        var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + latitude + ',' +
          longitude + "&key=" + 'XVLBZ-BSU66-ULJSQ-MFGXD-TM7GZ-55F2M' + "&get_poi=1";
        that.sendRequest(qqMapApi);
      }
    })
  },
  sendRequest: function (qqMapApi) {
    let that = this;
    // 调用请求
    wx.request({
      url: qqMapApi,
      data: {},
      method: 'GET',
      success: (res) => {
        if (res.statusCode == 200 && res.data.status == 0) {
          console.log(res.data.result.address_component)
          // 从返回值中提取需要的业务地理信息数据
          that.setData({ location: res.data.result.address_component.city });
          // that.setData({ province: res.data.result.address_component.province });
          // that.setData({ city: res.data.result.address_component.city });
          // that.setData({ district: res.data.result.address_component.district });
          // that.setData({ street: res.data.result.address_component.street });
        }
      }
    })
  },
  //分享自定义
  onShareAppMessage: function (res) {
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
  service(e){
    let i = e.currentTarget.dataset.index;
    wx.reLaunch({
      url: '/pages/service/service?index=' + i
    })
  },


})