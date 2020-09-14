Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "../../pages/index/index",
        text: "首页"
      },
      {
        pagePath: "../../pages/category/category",
        iconPath: "/images/push_active.png",
        text: "发布"
      },
      {
        pagePath: "../../pages/my/my",
        text: "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path
      this.setData({
        selected: idx
      })
      wx.switchTab({
        url: path,
      })
    }
  }
})