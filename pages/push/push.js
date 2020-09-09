// pages/push/push.js
var app = getApp();
const api = require('../../utils/api.js')
const util = require('../../utils/util.js')
const locationApi = require('../../utils/getLocation.js')
Page({
  data: {
    baseUrl: "",
    level_02_id: "", //上级页面传递的二级分类id
    heights: null, //可视高度
    default_desc: "", //描述的提示内容（后台获取）
    tags: [], //所有的标签列表（后台获取）
    temp_items: [], //模版内容（后台获取，控制页面显示元素）
    desc: "", //描述（可传递）
    tags_req: "", //选择的标签（可传递）
    upload_files: [], //选择的文件列表（可传递，需处理）
    file_type: "", //上传的文件类型
    linkman: "", //联系人（可传递）
    address_text: "", //信息展示地址（可传递）
    adcode: "", //行政区划代码（可传递）
    link_phone: "", //联系电话（可传递）
    agree: false, //是否同意发布须知
  },
  onLoad(option) {
    this.setData({
      heights: wx.getSystemInfoSync().windowHeight * 0.95,
      level_02_id: option.level_02_id
    })
    //获取描述模版等信息（展示）
    this.getTempInfo();
    //获取地理位置信息
    this.wxLocationInfo();
  },
  //获取模版信息（展示）
  getTempInfo() {
    util.get(api.getTempInfo, {
      cate_id: this.data.level_02_id
    }).then(res => {
      if (res.code == 1) {
        //处理元素
        res.data.temp_items.map(item => {
          if (item.label_type == 2 || item.label_type == 3) {
            item.item_content = item.item_value[0]
          } else {
            item.item_content = "";
          }
        })
        //处理标签
        var tags = [];
        res.data.tags.split(',').map(item => {
          let tag_item = {
            tag_name: item,
            active: false
          }
          tags.push(tag_item);
        })
        this.setData({
          default_desc: res.data.default_desc,
          tags: tags,
          temp_items: res.data.temp_items
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //输入框
  changeInput(e) {
    let i = e.currentTarget.dataset.index;
    this.data.temp_items[i].item_content = e.detail.value;
  },
  //公共部分的输入框
  pubChangeInput(e) {
    this.setData({
      [e.currentTarget.dataset.type]: e.detail.value
    })
  },
  //单选框
  changeRadio(e) {
    let i = e.currentTarget.dataset.index;
    this.data.temp_items[i].item_content = e.detail.value;
  },
  //底部弹框
  changePick(e) {
    let i = e.currentTarget.dataset.index;
    let vi = e.detail.value;
    let temp_items_arr = this.data.temp_items;
    temp_items_arr[i].item_content = temp_items_arr[i].item_value[vi];
    this.setData({
      temp_items: temp_items_arr
    })
  },
  //乘车时间
  pickerTap(e) {
    let i = e.currentTarget.dataset.index;
    this.data.temp_items[i].item_content = e.detail;
  },
  //判断标签选择个数
  judge() {
    let arr = 0;
    this.data.tags.map(item => {
      if (item.active) {
        arr += 1;
      }
    });
    return arr;
  },
  //选择标签
  activeTap(e) {
    var index = e.currentTarget.dataset.index;
    this.data.tags.map((item, i) => {
      if (index == i) {
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
      tags: this.data.tags
    })
  },
  //获取所有被选中的标签
  getActiveTag() {
    let arr = [];
    this.data.tags.map(item => {
      if (item.active) {
        arr.push(item.tag_name)
      }
    });
    return arr.join(',');
  },
  //上传文件
  upLoadFile(req) {
    wx.uploadFile({
      url: api.upLoadImg, //仅为示例，非真实的接口地址
      filePath: req.path,
      name: 'file',
      formData: {
        '_3rd_session': wx.getStorageSync('3rd_session')
      },
      success: (res) => {
        var data = JSON.parse(res.data);
        if (data.code == 1) {
          let fileArr = [];
          fileArr.push(data.data.filename);
          this.setData({
            baseUrl: data.data.prefix,
            upload_files: [...this.data.upload_files, ...fileArr]
          })
        } else {
          this.toast(data.msg);
        }
      }
    })
  },
  //选择文件
  chooseImage() {
    var that = this;
    if (that.data.file_type == '1' && that.data.upload_files.length > 0) {
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
            if (res.type == 'video' && item.duration > 8){
              that.toast("视频长度不能超过8秒");
            } else if (res.type == 'image' && item.size > 5*1024*1024){
              that.toast("图片大小不能超过5M");
            }else{
              //上传文件
              let req = {
                path: item.tempFilePath
              }
              that.upLoadFile(req);
            }
          })
          that.setData({
            file_type: res.type == 'image' ? '1' : '2'
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
      filename: images[index]
    }
    util.get(api.deleteImg, req).then(res => {
      if (res.code == 1) {
        images.splice(index, 1);
        this.setData({
          upload_files: images
        })
      } else {
        this.toast(res.msg);
      }

    })
  },
  //重新选择位置
  chooseLocation() {
    locationApi.chooseLocation().then(res => {
      this.setData({
        address_text: res.info_address,
        adcode: res.town_code
      })
    })
  },
  //获取地理位置信息
  wxLocationInfo() {
    locationApi.judgeAuth().then(res => {
      if (res) {
        locationApi.wxGetLocation().then(res => {
          this.setData({
            address_text: res.info_address,
            adcode: res.town_code
          })
        })
      } else {
        this.setData({
          address_text: '点击授权获取位置'
        })
      }
    })
  },
  //立即发布
  pushNow() {
    if (this.data.desc == '') { //描述
      this.toast("请输入描述！");
    } else if (this.data.address_text == '点击授权获取位置') {
      this.toast("请先获取位置！");
    } else if (this.data.linkman == '') { //联系人
      this.toast("请输入联系人！");
    } else if (this.data.link_phone == '') { //联系电话
      this.toast("请输入联系电话！");
    } else if (!this.data.agree) {
      this.toast("请阅读并同意发布协议！");
    } else {
      // 模版信息
      var temp_arr = [];
      this.data.temp_items.map(item => {
        if (item.item_content != '') {
          let str = item.item_name + ":" + item.item_content;
          temp_arr.push(str)
        }
      })
      var temp_content = temp_arr.join(','); //模版信息（可传递）
      let req = {
        cate_id: this.data.level_02_id,
        tags: this.getActiveTag(),
        desc: this.data.desc,
        view_type: this.data.file_type,
        view_filename: this.data.upload_files.join(","),
        linkman: this.data.linkman,
        link_phone: this.data.link_phone,
        temp_content: temp_content,
        area_code: this.data.adcode,
        address: this.data.address_text
      }
      this.submit(req);
    }
  },
  //统一提交
  submit(req) {
    wx.showModal({
      title: '温馨提示',
      content: "信息将被全镇的人看到，确认发布吗？",
      success: (res) => {
        if (res.confirm) {
          util.post(api.pushInfo, req).then(res => {
            if (res.code == 1) {
              this.toast("发布成功！");
              setTimeout(() => {
                wx.switchTab({
                  url: "/pages/index/index"
                })
              }, 1500);
            } else {
              this.toast(res.msg);
            }
          })
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
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