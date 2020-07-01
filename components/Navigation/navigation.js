// components/Navigation/navigation.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startBarHeight:{
      type:Number,
      value:null
    },
    navgationHeight: {
      type: Number,
      value: null
    },
    location: {
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    //搜索
    search(){
      wx.navigateTo({
        url: "/pages/search/search"
      })
    },
    //获取当前位置
    getLocationInfo(){
      if (this.data.location == '点击获取') {
        this.triggerEvent('onEmit');
      }
    }
  }
})
