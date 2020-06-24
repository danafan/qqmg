// components/BigImg/big_img.js
const app = getApp();
Component({
  properties: {
    big_imgs:{
      type:Array,
      value:[]
    },
    current_index:{
      type:String,
      value:""
    }
  },
  data: {
    baseUrl: app.globalData.baseUrl,
    imgheights: [], //所有图片的高度
  },
  methods: {
    close() {
      this.triggerEvent('onEmit');
    },
    //获取图片真实宽度
    imageLoad(e) {
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
        ratio = imgwidth / imgheight;
      //计算的高度值  
      var viewHeight = 750 / ratio;
      var imgheight = viewHeight;
      var imgheights = this.data.imgheights;
      //把每一张图片的对应的高度记录到数组里  
      imgheights[e.target.dataset.index] = imgheight;
      this.setData({
        imgheights: imgheights
      })
    },
    //大图切换
    bindchange(e) {
      this.setData({
        current_index: e.detail.current
      })
    },
  }
})
