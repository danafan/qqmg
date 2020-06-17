// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    push_list: [
      {
        id: "1",
        goods_img: "../../images/banner_02.jpg",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        boswer: "268"
      },
      {
        id: "2",
        goods_img: "../../images/banner_01.png",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        boswer: "268"
      },
      {
        id: "3",
        goods_img: "../../images/banner_03.jpg",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        boswer: "268"
      },
      {
        id: "4",
        goods_img: "../../images/banner_02.jpg",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        boswer: "268"
      },
      {
        id: "5",
        goods_img: "../../images/banner_01.png",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        boswer: "268"
      },
      {
        id: "6",
        goods_img: "../../images/banner_01.png",
        title: "室内配置：配备品牌家具家电、配套床垫、抱枕、台灯、桌椅、衣柜、空调、洗衣机、冰箱和宽带。",
        boswer: "268"
      },
    ],
  },
  onLoad(option){
    console.log(option)
  },
  //点击进入详情
  detail(e) {
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + e.detail
    })
  },
})