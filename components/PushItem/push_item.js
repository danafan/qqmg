// components/PushItem/push_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //大图列表
    big_imgs: {
      type: Array,
      value: [{
        id: 0,
        url: "../../images/banner_01.png"
      }, {
        id: 1,
        url: "../../images/banner_02.jpg"
      }, {
        id: 2,
        url: "../../images/banner_03.jpg"
      }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show_img: false, //默认不显示大图  
    imgheights: [], //所有图片的高度
    current: 0      // 默认  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad(e) { //获取图片真实宽度  
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
        ratio = imgwidth / imgheight;
      //计算的高度值  
      var viewHeight = 750 / ratio;
      var imgheight = viewHeight;
      var imgheights = this.data.imgheights;
      //把每一张图片的对应的高度记录到数组里  
      imgheights[e.target.dataset.id] = imgheight;
      this.setData({
        imgheights: imgheights
      })
    },
    bindchange: function(e) {
      this.setData({
        current: e.detail.current
      })
    },
    //拨打电话
    call() {
      wx.makePhoneCall({
        phoneNumber: '1340000' //仅为示例，并非真实的电话号码
      })
    },
    //点击显示大图
    open() {
      this.setData({
        show_img: true
      })
      wx.hideTabBar()
    },
    //点击关闭大图
    close() {
      this.setData({
        show_img: false
      })
      wx.showTabBar()
    }
  }
})