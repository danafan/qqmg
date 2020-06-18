// pages/category/category.js
const app = getApp();
Page({
  data: {
    categoryList: [{
        id: "1",
        name: "牲畜交易",
        types: [{
          id: "1",
          val: "牛"
        }, {
          id: "2sss",
          val: "羊"
        }, {
          id: "3",
          val: "驴"
        }, {
          id: "4",
          val: "马"
        }, {
          id: "5",
          val: "猪"
        }, {
          id: "6",
          val: "狗"
        }, {
          id: "7",
          val: "家禽"
        }]
      },
      {
        id: "2",
        name: "农用物资",
        types: [{
          id: "1",
          val: "种子"
        }, {
          id: "2",
          val: "化肥"
        }, {
          id: "3",
          val: "农药"
        }]
      },
      {
        id: "3",
        name: "招聘求职",
        types: [{
          id: "1",
          val: "招聘"
        }, {
          id: "2",
          val: "求职"
        }]
      },
      {
        id: "4",
        name: "房产交易",
        types: [{
          id: "1",
          val: "出售"
        }, {
          id: "2",
          val: "出租"
        }, {
          id: "3",
          val: "求租"
        }, {
          id: "4",
          val: "求购"
        }]
      },
      {
        id: "5",
        name: "二手物品",
        types: [{
          id: "1",
          val: "家具家电"
        }, {
          id: "2",
          val: "电子产品"
        }, {
          id: "3",
          val: "交通工具"
        }, {
          id: "4",
          val: "日常用品"
        }]
      },
      {
        id: "6",
        name: "汽车交易",
        types: [{
          id: "1",
          val: "轿车"
        }, {
          id: "2",
          val: "SUV"
        }, {
          id: "3",
          val: "MPV"
          }, {
            id: "4",
            val: "微型"
          }, {
            id: "5",
            val: "皮卡"
          }, {
            id: "6",
            val: "电动车"
          }]
      },
      {
        id: "7",
        name: "本地服务",
        types: [{
          id: "1",
          val: "汽车服务"
        }, {
          id: "2",
          val: "金融服务"
        }, {
          id: "3",
          val: "家政装修"
        }, {
          id: "4",
          val: "旅游休闲"
        }, {
          id: "5",
          val: "婚庆服务"
        }, {
          id: "6",
          val: "宠物兽医"
        }]
      },
      {
        id: "8",
        name: "打车拼车",
        types: [{
          id: "1",
          val: "车找人"
        }, {
          id: "2",
          val: "人找车"
        }]
      }
    ], //一级和二级菜单
    level_01_id:"",    //选中的一级菜单
  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  },
  //点击某一个一级菜单
  checkOneLevel(e){
    this.setData({
      level_01_id:e.currentTarget.dataset.id
    })
  },
  //点击选中某一类型下的某一类
  bindPickerChange(e) {
    console.log(e)
    let level_01_id = this.data.level_01_id;
    let level_02_id = e.detail.value;
    wx.navigateTo({
      url: "/pages/push/push?level_01_id=" + level_01_id + "&level_02_id=" + level_02_id
    })
  }



})