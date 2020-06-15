// pages/push/push.js
var app = getApp();
Page({
  data: {
    category_list: [{
        id: "1",
        name: "招聘求职"
      },
      {
        id: "2",
        name: "房屋租售"
      },
      {
        id: "3",
        name: "店铺转让"
      },
      {
        id: "4",
        name: "汽车交易"
      },
      {
        id: "5",
        name: "牲畜交易"
      },
      {
        id: "6",
        name: "二手物品"
      },
      {
        id: "7",
        name: "家政服务"
      },
      {
        id: "8",
        name: "农副产品"
      },
    ], //所有类别
    active_category_id: "", //当前选中的类别id（可传递）
    category_text: "", //信息类别显示文字
    title: "", //标题（可传递）
    desc: "", //输入的描述内容（可传递）
    active_taps: [], //选中的标签id列表（可传递，需处理）
    taps: [{
      id: "1",
      text: "膘肥体壮"
    }, {
      id: "2",
      text: "产奶多"
    }, {
      id: "3",
      text: "口小"
    }, {
      id: "4",
      text: "颜色正"
    }, {
      id: "5",
      text: "膘肥体壮"
    }, {
      id: "6",
      text: "产奶多"
    }, {
      id: "7",
      text: "口小"
    }, {
      id: "8",
      text: "颜色正"
    }], //所有的标签列表
    upload_files: [], //选择的文件列表（可传递，需处理）
    file_type: "", //上传的文件类型
    contact: "", //联系人（可传递）
    contact_phone: "", //联系电话（可传递）
    agree: false, //是否同意发布须知
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  onLoad() {
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '提示',
        confirmText: "登录",
        content: '先登录才能发布信息哦～',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/auth/auth',
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  //切换信息类别
  bindPickerChange(e) {
    let index = e.detail.value;
    let obj = this.data.category_list[index];
    this.setData({
      active_category_id: obj.id,
      category_text: obj.name
    })
    console.log(this.data.active_category_id)
  },
  //监听标题输入
  changeTitle(e) {
    let title = e.detail.value;
    this.setData({
      title: title
    })
  },
  //监听输入的描述内容
  changeDesc(e) {
    let desc = e.detail.value;
    this.setData({
      desc: desc
    })
  },
  //点击标签
  activeTap(e) {
    let tap_id = e.currentTarget.dataset.id;
    this.setData({
      active_taps: []
    })
    this.data.taps.map(item => {
      if (item.id == tap_id) {
        if (item.active) {
          item.active = false;
        } else {
          item.active = true;
        }
      }
      if (item.active) {
        this.setData({
          active_taps: [...this.data.active_taps, ...item.id]
        })
      }
    });
    this.setData({
      taps: this.data.taps
    })
  },
  //点击选择图片
  chooseImage() {
    var that = this;
    if (this.data.file_type == 'image' && this.data.upload_files.length > 0) {
      wx.chooseImage({
        count: 9,
        success(res) {
          if (that.data.upload_files.length + res.tempFilePaths.length > 9) {
            that.toast("图片不能超过9张");
          } else {
            let arr = [];
            res.tempFilePaths.map(item => {
              let obj = {
                tempFilePath: item
              }
              arr.push(obj);
            })
            that.setData({
              upload_files: [...that.data.upload_files, ...arr]
            });
          }
        }
      })
    } else {
      wx.chooseMedia({
        count: 9,
        mediaType: ['image', 'video'],
        sourceType: ['album', 'camera'],
        maxDuration: 8,
        camera: 'back',
        success(res) {
          that.setData({
            file_type: res.type,
            upload_files: [...that.data.upload_files, ...res.tempFiles]
          })
        }
      })
    }
    

  },
  //点击删除图片
  deleteImg(e) {
    let index = e.currentTarget.dataset.index;
    let images = this.data.upload_files;
    images.splice(index, 1);
    this.setData({
      upload_files: images
    })
  },
  //监听联系人
  changeContact(e) {
    let contact = e.detail.value;
    this.setData({
      contact: contact
    })
  },
  //监听联系电话
  changePhone(e) {
    let phone = e.detail.value;
    this.setData({
      contact_phone: phone
    })
  },
  //立即发布
  pushNow() {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      if (this.data.category_text == "") {
        this.toast("请选择信息类别");
      } else if (this.data.title == "") {
        this.toast("请输入标题");
      } else if (this.data.contact == "") {
        this.toast("请输入联系人");
      } else if (this.data.contact_phone == "") {
        this.toast("请输入联系电话");
      } else if (!this.data.agree) {
        this.toast("请阅读并同意发布协议！");
      } else {
        let req = {
          active_category_id: this.data.active_category_id,
          title: this.data.title,
          desc: this.data.desc,
          active_taps: this.data.active_taps.join("_"),
          upload_images: this.data.upload_images.join("_"),
          contact: this.data.contact,
          contact_phone: this.data.contact_phone
        }
        console.log(req);
        wx.showModal({
          title: '提示',
          content: "先别急发布，后台还没写呢，都做好了才能发布，先看看样式",
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    }
  },
  //公共提示方法
  toast(v) {
    wx.showToast({
      title: v,
      icon: "none",
      mask: true,
      duration: 1500
    })
  },
  //点击是否同意协议
  agree() {
    this.setData({
      agree: !this.data.agree
    })
  },
  //查看协议
  goAgreement() {
    wx.navigateTo({
      url: "/pages/agreement/agreement"
    })
  },

})