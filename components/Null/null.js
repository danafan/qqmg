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
    }
  },
  data: {

  },
  methods: {
    //去发布
    goPush(){
      wx.reLaunch({
        url: '/pages/category/category'
      })
    }
  }
})
