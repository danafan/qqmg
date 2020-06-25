//测试地址
const ApiRootUrl = 'http://localhost:8089/admin/';

module.exports = {
  getCategoryList: ApiRootUrl + 'getCategoryList',		//获取一级二级分类
  getCateAndTag: ApiRootUrl + 'getCateAndTag',		    //获取二级分类和标签（发布页面）
  upLoadImg: ApiRootUrl + 'uploadImg',                //上传文件
  deleteImg: ApiRootUrl + 'deleteImg',                //删除文件
  pushInfo: ApiRootUrl + 'pushInfo',                  //发布信息
  infoList: ApiRootUrl + 'infoList',                  //获取信息列表
  getInfoDetail: ApiRootUrl + 'getInfoDetail',        //获取信息详情
}