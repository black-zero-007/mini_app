// pages/topic/topic.js
var api = require('../../utils/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopicList:[]
  },

  choseTopic:function(res){
    // console.log(res);
    var TopicInfo = res.currentTarget.dataset.xx;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    // console.log(prevPage.route);
    if(prevPage.route == 'pages/publish/publish'){
      prevPage.updateTopic(TopicInfo);
      wx.navigateBack({});
    }else{
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userInfo = app.globalData.userInfo;
    wx.request({
      url: api.TopicAPI,
      dataType: 'json',
      header:{
        Authorization: userInfo ? userInfo.token : null
      },
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        // console.log(result.data);
        this.setData({
          TopicList:result.data
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})