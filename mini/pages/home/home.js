const api = require("../../utils/api");
var app = getApp();

// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    Data:[]
  },

  none:function(){
    wx.showToast({
      title: '暂未开通该服务',
      icon:'none'
    })
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
    this.setData({
      userInfo:app.globalData.userInfo
    });
    var userInfo = this.data.userInfo;
    if(userInfo){
      wx.request({
        url: api.HomeAPI,
        data:{
          token:userInfo.token
        },
        dataType: 'json',
        method:"GET",
        responseType: 'text',
        success: (result) => {
          // console.log(result.data)
          this.setData({
            Data:result.data
          })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
    
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