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
        goods_img: "https://pic2.58cdn.com.cn/anjuke_58/0b309b722c5fb413046e9a53262a34e0?w=240&h=180&ss=1&crop=1&cpos=middle&w=240&h=180&crop=1&t=1",
        title: "崇华小区，房屋出租，拎包入住",
        category: "房屋出租",
        describes: "房子采光好，环境整洁，交通便利，生活超级便利，离地铁站近，周边有菜市场",
        tags: ['采光好', '拎包入住', '满五唯一'],
        browse: "108",
        phone: "13067882143"
      },
      {
        id: "2",
        goods_img: "../../images/banner_02.jpg",
        title: "二手商品转让",
        category: "二手物品",
        describes: "本人有一个限量款马克杯，九成新，现忍痛割爱",
        tags: ['九成新', '保值'],
        browse: "10",
        phone: "13067882143"
      },
      {
        id: "3",
        goods_img: "../../images/banner_03.jpg",
        title: "卖20头奶牛",
        category: "牲畜交易",
        describes: "育肥牛，膘好",
        tags: ['口小'],
        browse: "8",
        phone: "13067882143"
      },
      {
        id: "4",
        goods_img: "../../images/banner_01.png",
        title: "2020款雅阁低价转让，看好的来",
        category: "汽车交易",
        describes: "新款雅阁，电动天窗，因本人去外地所以诚信转让",
        tags: ['保养好', '无划痕', '无事故', '白色', '高配', '干净'],
        browse: "30",
        phone: "13067882143"
      },
      {
        id: "5",
        goods_img: "../../images/banner_03.jpg",
        title: "崇华小区，房屋出租，拎包入住",
        category: "房屋出租",
        describes: "房子采光好，环境整洁，交通便利，生活超级便利，离地铁站近，周边有菜市场",
        tags: ['采光好', '拎包入住', '满五唯一'],
        browse: "108",
        phone: "13067882143"
      }
    ], //服务列表
    show_index: 0, //解决顶部滑动bug
  },
  //分享自定义
  onShareAppMessage: function (res) {
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