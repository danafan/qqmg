// components/RecordItem/record_item.js
const api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Component({
  properties: {
    Item: {
      type: Object,
      value: {}
    },
    Index:{
      type: String,
      value: 0
    },
    page_type: {
      type: Number,
      value: null
    }
  },
  methods: {
    //进入详情
    detail(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/detail/detail?id=" + id
      })
    },
    //下架
    shelves(e) {
      wx.showModal({
        title: '提示',
        content: "确认下架该信息？",
        success: (res) => {
          if (res.confirm) {
            let req = {
              info_id: e.currentTarget.dataset.id
            }
            utils.post(api.deleteInfo, req).then(res => {
              if (res.code == 1) {
                wx.showToast({
                  title: '下架成功',
                  icon: "none",
                  mask: true,
                  duration: 1500,
                  success: () => {
                    //获取信息列表
                    this.triggerEvent('onEmit', { index: this.data.Index});
                  }
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: "none",
                  mask: true,
                  duration: 1500
                })
              }
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    }
  }
})