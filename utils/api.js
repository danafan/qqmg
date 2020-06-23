//测试地址
const ApiRootUrl = 'http://localhost:8089/admin/';

module.exports = {
  getCategoryList: ApiRootUrl + 'getCategoryList',		//获取一级二级分类
  getCateAndTag: ApiRootUrl + 'getCateAndTag',		    //获取二级分类和标签（发布页面）
}