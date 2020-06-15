// pages/service/service.js
var app = getApp();
Page({
  data: {
    category_list: [{
        id: "0",
        name: "全部"
      },
      {
        id: "1",
        name: "招聘求职"
      },
      {
        id: "2",
        name: "房屋租售"
      },
      {
        id: "3",
        name: "店铺转让"
      },
      {
        id: "4",
        name: "汽车交易"
      },
      {
        id: "5",
        name: "牲畜交易"
      },
      {
        id: "6",
        name: "二手物品"
      },
      {
        id: "7",
        name: "家政服务"
      },
      {
        id: "8",
        name: "农副产品"
      },
    ], //所有类别
    active_index: 0, //默认选中的顶部导航下标
    active_cate_id: "", //选中的导航id
    service_list: [{
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
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=694357891,2697756894&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1410842032,2730421252&fm=26&gp=0.jpg", "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1559105924,2340006983&fm=26&gp=0.jpg"
      ],
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
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2728969359,3430466718&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2615551809,611271473&fm=15&gp=0.jpg", "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2476494870,1509703343&fm=26&gp=0.jpg", "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1674318272,2224049709&fm=15&gp=0.jpg", "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1236388489,293554175&fm=26&gp=0.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1492600424,36195930&fm=26&gp=0.jpg", "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1404254628,3315059032&fm=26&gp=0.jpg", "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=343243997,1469454983&fm=26&gp=0.jpg"
      ],
      create_time: "8小时前",
      browse: "6"
    }], //服务列表
    show_index: 0, //解决顶部滑动bug
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  onLoad(option) {
    if (option.index) {
      this.setData({
        active_index: option.index
      })
      if (option.index >= 5) {
        this.setData({
          show_index: 5
        })
      } else {
        this.setData({
          show_index: option.index
        })
      }
    }

  },
  //点击切换顶部导航
  changeCurrent(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      active_index: index,
      active_cate_id: this.data.category_list[index].id
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