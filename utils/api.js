//测试地址
const ApiRootUrl = 'http://114.67.110.57/mobile/';

module.exports = {
  register: ApiRootUrl + 'user/register',               //用户注册
  get3rdSession: ApiRootUrl + 'user/get3rdsession',     //获取3rdsession
  getUserInfo: ApiRootUrl + 'user/getuserinfo',         //获取用户信息
  updateInfo: ApiRootUrl + 'user/updateinfo',           //更新用户信息
  getCategoryList: ApiRootUrl + 'category/list',		    //获取一级二级分类
  infoList: ApiRootUrl + 'info/infolist',               //获取信息列表
  getTempInfo: ApiRootUrl + 'category/getcatetempinfo', //获取模版信息（发布页面）
  upLoadImg: ApiRootUrl + 'file/upload',                //上传文件
  pushInfo: ApiRootUrl + 'info/publish',                //发布信息
  deleteImg: ApiRootUrl + 'file/del',                   //删除文件
  getInfoDetail: ApiRootUrl + 'info/getdetail',         //获取信息详情
  deleteInfo: ApiRootUrl + 'info/setstatus',            //下架信息

}