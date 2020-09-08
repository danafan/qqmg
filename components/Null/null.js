// components/Null/null.js
Component({
  properties: {
    toast_text:{
      type:String,
      value: ""
    },
    showPush:{
      type:Boolean,
      value:true
    },
    isIndex:{
      type:Boolean,
      value:false
    }
  },
  data: {

  },
  methods: {
    //重新选择位置
    onEmit(){
      this.triggerEvent('onEmit');
    },
    //去发布
    goPush(){
      wx.reLaunch({
        url: '/pages/category/category'
      })
    }
  }
})
