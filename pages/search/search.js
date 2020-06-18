// pages/search/search.js
const app = getApp();
Page({
  data: {
    search_val: "", //输入的关键词
    taps_list: ["种子", "化肥", "农药", "招聘", "求职", "出售", "出租", "求租", "求购", "家具家电", "电子产品", "交通工具", "日常用品", "轿车", "金融服务"], //标签列表
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
    }, ], //信息列表
    isNull:true,   //列表是否为空
  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  },
  //监听输入
  searchInput(e) {
    this.setData({
      search_val: e.detail.value
    })
  },
  //点击我要发布
  goPush() {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      wx.reLaunch({
        url: '/pages/push/push'
      })
    }
  },

})