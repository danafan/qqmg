// pages/push/push.js
var app = getApp();
Page({
  data: {
    heights: null,
    livestock: "出售", //选中的牲畜交易类型
    supplies: "出售", //选中的农用物资类型
    company: "", //（招聘）公司名称
    work_addres: "", //（招聘）工作地址
    default_desc: "这是描述提示，按分类从后台获取", //描述的提示内容
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
    }], //所有的标签列表
    wage_list: ["面议", "1000以下", "1000-2000", "2000-3000", "3000-5000", "5000-8000", "8000以上"],
    wage: "", //薪资
    sexs: ["不限", "男", "女"],
    sex: "不限", //选中的性别
    experience_list: ["应届生", "一年以下", "1-3年", "3年以上"],
    experience: "", //选中的工作经验
    age: "", //年龄
    house_location: "", //房屋位置
    zg_list: ["出售", "求购"], //二手物品和汽车交易的类型
    zg: "出售", //选中的二手物品类型
    car: "出售", //选中的汽车交易类型
    origin: "", //出发地
    destination: "", //目的地
    origin_time: "", //乘车时间
    number: "", //乘车人数
    upload_files: [], //选择的文件列表（可传递，需处理）
    file_type: "", //上传的文件类型
    contact: "", //联系人（可传递）
    contact_phone: "", //联系电话（可传递）
    agree: false, //是否同意发布须知
    option: {}, //上级页面传递的一级和二级分类
  },
  //分享自定义
  onShareAppMessage: function(res) {
    return app.globalData.shareObj
  },
  onLoad(option) {
    this.setData({
      heights: wx.getSystemInfoSync().windowHeight * 0.95,
      option: option
    })
    console.log(this.data.option)
    // if (!app.globalData.userInfo) {
    //   wx.showModal({
    //     title: '提示',
    //     confirmText: "登录",
    //     content: '先登录才能发布信息哦～',
    //     success(res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url: '/pages/auth/auth',
    //         });
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
  },
  //分享自定义
  onShareAppMessage: function (res) {
    return app.globalData.shareObj
  },
  //输入框输入
  changeInput(e) {
    this.setData({
      [e.currentTarget.dataset.type]: e.detail.value
    })
  },
  //选择工资
  changeWage(e) {
    let index = e.detail.value;
    this.setData({
      wage: this.data.wage_list[index]
    })
  },
  //工作经验
  changeExperience(e) {
    let index = e.detail.value;
    this.setData({
      experience: this.data.experience_list[index]
    })
  },
  //单选框
  changeRadio(e) {
    this.setData({
      [e.currentTarget.dataset.type]: e.detail.value
    })
  },
  //乘车时间
  pickerTap(v) {
    this.setData({
      origin_time: v.detail
    })
  },
  //判断标签选择个数
  judge() {
    let arr = [];
    this.data.taps.map(item => {
      if (item.active) {
        arr.push(item.id);
      }
    });
    this.setData({
      active_taps: arr
    });
    return arr.length;
  },
  //选择标签
  activeTap(e) {
    let tap_id = e.currentTarget.dataset.id;
    this.data.taps.map(item => {
      if (item.id == tap_id) {
        if (item.active) {
          item.active = false;
        } else {
          if (this.judge() == 3) {
            this.toast("最多三个标签哦～");
            return;
          } else {
            item.active = true;
          }
        }
      }
    });
     this.setData({
      taps: this.data.taps
    })
  },
  //选择文件
  chooseImage() {
    var that = this;
    if (this.data.file_type == 'image' && this.data.upload_files.length > 0) {
      wx.chooseImage({
        count: 9,
        success(res) {
          if (that.data.upload_files.length + res.tempFilePaths.length > 9) {
            that.toast("图片不能超过9张");
          } else {
            that.setData({
              upload_files: [...that.data.upload_files, ...res.tempFilePaths]
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
          let arr = [];
          res.tempFiles.map(item => {
            arr.push(item.tempFilePath);
          })
          that.setData({
            file_type: res.type,
            upload_files: [...that.data.upload_files, ...arr]
          })
        }
      })
    }
  },
  //删除文件
  deleteImg(e) {
    let index = e.currentTarget.dataset.index;
    let images = this.data.upload_files;
    images.splice(index, 1);
    this.setData({
      upload_files: images
    })
  },
  //立即发布
  pushNow() {
    if (!app.globalData.userInfo) {
      wx.navigateTo({
        url: '/pages/auth/auth',
      });
    } else {
      switch (this.data.option.level_01_id) {
        case "1": //牲畜交易
          let req_01 = {
            trading: this.data.livestock
          }
          this.submit(req_01);
          break;
        case "2": //农用物资
          let req_02 = {
            trading: this.data.supplies
          }
          this.submit(req_02);
          break;
        case "3": //招聘求职
          let req_03 = {
            sex: this.data.sex
          };
          if (this.data.option.level_02_id == '0') { //招聘
            if (this.data.company != '') {
              req_03.company = this.data.company; //招聘单位
            }
            if (this.data.work_addres != '') {
              req_03.work_addres = this.data.work_addres; //工作地址
            }
          } else { //求职
            if (this.data.experience != '') {
              req_03.experience = this.data.experience; //工作经验
            }
            if (this.data.age != '') {
              req_03.age = this.data.age; //年龄
            }
          }
          if (this.data.wage != '') {
            req_03.wage = this.data.wage; //薪资
          }
          this.submit(req_03);
          break;
        case "4": //房产交易
          let req_04 = {};
          if (this.data.option.level_02_id == '0' || this.data.option.level_02_id == '1') { //出售或出租
            if (this.data.house_location != '') {
              req_04.house_location = this.data.house_location; //房屋位置
            }
          }
          this.submit(req_04);
          break;
        case "5": //二手物品
          let req_05 = {
            zg: this.data.zg
          };
          this.submit(req_05);
          break;
        case "6": //汽车交易
          let req_06 = {
            car: this.data.car
          };
          this.submit(req_06);
          break;
        case "7": //本地服务
          this.submit({});
          break;
        case "8": //打车拼车
          let req_08 = {};
          if (this.data.origin != '') {
            req_08.origin = this.data.origin; //出发地
          }
          if (this.data.destination != '') {
            req_08.destination = this.data.destination; //目的地
          }
          if (this.data.origin_time != '') {
            req_08.origin_time = this.data.origin_time; //乘车时间
          }
          if (this.data.number != '') {
            req_08.number = this.data.number; //人数
          }
          this.submit(req_08);
          break;
        default:
          //统一提交
          this.submit({});
      }
    }
  },
  //统一提交
  submit(req) {
    if (this.data.desc == "") {
      this.toast("请输入描述");
    } else if (this.data.contact == "") {
      this.toast("请输入联系人");
    } else if (this.data.contact_phone == "") {
      this.toast("请输入联系电话");
    } else if (!this.data.agree) {
      this.toast("请阅读并同意发布协议！");
    } else {
      req.level_01_id = this.data.option.level_01_id;
      req.level_02_id = this.data.option.level_02_id;
      req.desc = this.data.desc; //描述
      if (this.data.active_taps.length > 0) { //选中的标签
        req.active_taps = this.data.active_taps.join("_");
      }
      if (this.data.upload_files.length > 0) { //上传的文件
        console.log(this.data.upload_files)
        req.upload_files = this.data.upload_files.join("_");
      }
      req.contact = this.data.contact; //联系人
      req.contact_phone = this.data.contact_phone; //联系电话
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