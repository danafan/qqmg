// components/RecordItem/record_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Item:{
      type:Object,
      value:{}
    },
    page_type:{
      type:Number,
      value:null
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
    detail(e) {
      let id = e.currentTarget.dataset.id;
      this.triggerEvent('getDetail',id);
    },
    shelves(e) {
      let id  = e.currentTarget.dataset.id;
      this.triggerEvent('Shelves', id);
    },
  }
})
