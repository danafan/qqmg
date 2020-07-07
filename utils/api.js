//测试地址
const ApiRootUrl = 'http://localhost:8089/admin/';

module.exports = {
  getFansTotal: ApiRootUrl + 'getFansTotal',          //获取总粉丝数（banner待完成）   
  getCategoryList: ApiRootUrl + 'getCategoryList',		//获取一级二级分类
  getCateAndTag: ApiRootUrl + 'getCateAndTag',		    //获取二级分类和标签（发布页面）
  upLoadImg: ApiRootUrl + 'uploadImg',                //上传文件
  deleteImg: ApiRootUrl + 'deleteImg',                //删除文件
  pushInfo: ApiRootUrl + 'pushInfo',                  //发布信息
  infoList: ApiRootUrl + 'infoList',                  //获取信息列表
  getInfoDetail: ApiRootUrl + 'getInfoDetail',        //获取信息详情
  deleteInfo: ApiRootUrl + 'deleteInfo',              //删除信息
  getUserInfo: ApiRootUrl + 'getUserInfo',            //根据用户ID获取用户信息
  getOpenId: ApiRootUrl + 'getOpenId',                //根据code获取openid
  getUserStatus: ApiRootUrl + 'getUserStatus',        //根据openid获取用户信息
}