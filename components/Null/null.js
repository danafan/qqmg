// components/Null/null.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toast_text:{
      type:String,
      value: "这里啥都没有，赶快去发布吧～"
    }
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
    //去发布
    goPush(){
      this.triggerEvent('goPush');
    }
  }
})
