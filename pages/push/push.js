// pages/push/push.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const userStatus = require('../../utils/userStatus.js')
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    heights: null, //可视高度
    default_desc: "", //描述的提示内容（后台获取）
    taps: [], //所有的标签列表（后台获取）
    temp_id: "", //模版ID（后台获取，控制页面显示元素）
    group_list: ["出售", "求购"], //牲、农、二、汽的交易类型
    check_sneq: "出售", //选中的牲、农、二、汽的交易类型
    company: "", //（招聘）公司名称
    work_addres: "", //（招聘）工作地址
    desc: "", //输入的描述内容（可传递）
    wage_list: ["面议", "1000以下", "1000-2000", "2000-3000", "3000-5000", "5000-8000", "8000以上"],
    wage: "", //薪资
    sexs: ["不限", "男", "女"],
    sex: "不限", //选中的性别
    experience_list: ["应届生", "一年以下", "1-3年", "3年以上"],
    experience: "", //选中的工作经验
    age: "", //年龄
    house_location: "", //房屋位置
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
    //获取描述模版等信息（展示）
    this.getCateAndTag({
      category_id: this.data.option.level_02_id
    })
  },
  //获取描述模版等信息（展示）
  getCateAndTag(req) {
    util.get(api.getCateAndTag, req).then(res => {
      this.setData({
        default_desc: res.data.category_desc,
        taps: res.data.tags,
        temp_id: res.data.temp_id
      })
    })
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
        arr.push(item.tag_id);
      }
    });
    return arr.length;
  },
  //选择标签
  activeTap(e) {
    let tap_id = e.currentTarget.dataset.id;
    this.data.taps.map(item => {
      if (item.tag_id == tap_id) {
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
  //获取所有被选中的标签
  getActiveTag() {
    let arr = [];
    let tags = [];
    this.data.taps.map(item => {
      if (item.active) {
        arr.push(item.tag_id);
        tags.push(item.tag_name)
      }
    });
    let obj = {
      arr: arr,
      tags: tags
    }
    return obj;
  },
  //上传文件
  upLoadFile(req) {
    wx.uploadFile({
      url: api.upLoadImg, //仅为示例，非真实的接口地址
      filePath: req.path,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data);
        let fileArr = [];
        fileArr.push(data.data.imgName)
        this.setData({
          upload_files: [...this.data.upload_files, ...fileArr]
        })
      }
    })
  },
  //选择文件
  chooseImage() {
    var that = this;
    if (that.data.file_type == 'image' && that.data.upload_files.length > 0) {
      wx.chooseImage({
        count: 9,
        success(res) {
          if (that.data.upload_files.length + res.tempFilePaths.length > 9) {
            that.toast("图片不能超过9张");
          } else {
            res.tempFilePaths.map(item => {
              //上传文件
              let req = {
                path: item
              }
              that.upLoadFile(req);
            })
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
          res.tempFiles.map(item => {
            //上传文件
            let req = {
              path: item.tempFilePath
            }
            that.upLoadFile(req);
          })
          that.setData({
            file_type: res.type
          })
        }
      })
    }
  },
  //删除文件
  deleteImg(e) {
    var index = e.currentTarget.dataset.index;
    var images = this.data.upload_files;
    let req = {
      imgurl: images[index]
    }
    util.get(api.deleteImg, req).then(res => {
      images.splice(index, 1);
      this.setData({
        upload_files: images
      })
    })
  },
  //立即发布
  pushNow() {
    if (!app.globalData.wxUser || !app.globalData.userInfo) {
      wx.navigateTo({
        url: "/pages/auth/auth",
      });
    } else {
      var diff_data = {}
      switch (this.data.temp_id) {
        case 1: //牲、农、二、汽
          diff_data = {
            check_sneq: this.data.check_sneq
          }
          this.submit(JSON.stringify(diff_data));
          break;
        case 2: //招聘
          diff_data = {
            sex: this.data.sex
          }
          if (this.data.company != '') {
            diff_data.company = this.data.company; //招聘单位
          }
          if (this.data.work_addres != '') {
            diff_data.work_addres = this.data.work_addres; //工作地址
          }
          if (this.data.wage != '') {
            diff_data.wage = this.data.wage; //薪资
          }
          this.submit(JSON.stringify(diff_data));
          break;
        case 3: //求职
          diff_data = {
            sex: this.data.sex,
          }
          if (this.data.experience != '') {
            diff_data.experience = this.data.experience; //工作经验
          }
          if (this.data.age != '') {
            diff_data.age = this.data.age; //年龄
          }
          if (this.data.wage != '') {
            diff_data.wage = this.data.wage; //薪资
          }
          this.submit(JSON.stringify(diff_data));
          break;
        case 4: //出售、出租
          diff_data = {};
          if (this.data.house_location != '') {
            diff_data.house_location = this.data.house_location;
          }
          this.submit(JSON.stringify(diff_data));
          break;
        case 5: //基本（求租、求购、本地服务）
          diff_data = {};
          this.submit(JSON.stringify(diff_data));
          break;
        case 6: //打车拼车
          diff_data = {}
          if (this.data.origin != '') {
            diff_data.origin = this.data.origin; //出发地
          }
          if (this.data.destination != '') {
            diff_data.destination = this.data.destination; //目的地
          }
          if (this.data.origin_time != '') {
            diff_data.origin_time = this.data.origin_time; //乘车时间
          }
          if (this.data.number != '') {
            diff_data.number = this.data.number; //人数
          }
          this.submit(JSON.stringify(diff_data));
          break;
        default:
          //统一提交
          this.submit({});
      }
    }
  },
  //统一提交
  submit(diff_data) {
    if (this.data.desc == "") {
      this.toast("请输入描述");
    } else if (this.data.contact == "") {
      this.toast("请输入联系人");
    } else if (this.data.contact_phone == "") {
      this.toast("请输入联系电话");
    } else if (!this.data.agree) {
      this.toast("请阅读并同意发布协议！");
    } else {
      var submitObj = {
        create_user_nickname: app.globalData.wxUser.nickName,
        create_user_img: app.globalData.wxUser.avatarUrl,
        create_user_id: app.globalData.userInfo.user_id,
        level_01_id: this.data.option.level_01_id,
        level_02_id: this.data.option.level_02_id,
        temp_id:this.data.temp_id,
        info_desc: this.data.desc,
        contact: this.data.contact,
        contact_phone: this.data.contact_phone
      }
      if (diff_data != "{}") { //传递的区分的参数
        submitObj.diff_data = diff_data;
      }
      if (this.getActiveTag().arr.length > 0) { //选中的标签
        submitObj.tag_ids = this.getActiveTag().arr.join("_");
        submitObj.tag_txts = this.getActiveTag().tags.join("_");
      }
      if (this.data.upload_files.length > 0) { //上传的文件
        submitObj.file_list = this.data.upload_files.join("_");
      }
      console.log(submitObj);
      wx.showModal({
        title: '温馨提示',
        content: "你发布的信息将被全兴安盟的人看到，确认发布吗？",
        success:(res) => {
          if (res.confirm) {
            userStatus.getUserStatus().then(res => {
              if (res) {
                util.post(api.pushInfo, submitObj).then(res => {
                  this.toast("发布成功！");
                  setTimeout(() => {
                    wx.switchTab({
                      url: "/pages/index/index"
                    })
                  }, 1500);
                })
              }
            })
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