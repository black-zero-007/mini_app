const api = require("../../utils/api");

// pages/followDetail/follow_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FollowList:[],
    FansList:[],
    Follow_exists:false,
    Fans_exists:false,
    choose:null
  },

  onClickPostFollow:function(e){
    var userInfo = app.globalData.userInfo;
    var uid = e.currentTarget.dataset.uid;
    wx.request({
      url: api.FollowAPI,
      data: {
        user:uid
      },
      dataType:'json',
      header: {
        Authorization: userInfo ? userInfo.token : null
      },
      method: "POST",
      responseType: "text",
      success: (result) => {
        if(result.statusCode == 201){
          this.setData({
            ['news.user.follow']:true,
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      choose:options.choose
    })
    wx.request({
      url: api.HomeAPI,
      data: {
        token:options.token
      },
      dataType: 'json',
      method:"GET",
      responseType: "text",
      success: (result) => {
        console.log(result.data);
        for(var item in result.data.fans_user.user){
          if(typeof result.data.fans_user.user[item].nickname == 'string'){
            result.data.fans_user.user[item].nickname=JSON.parse(result.data.fans_user.user[item].nickname)
          }
        };
        for(var item in result.data.follow_user.user){
          if(typeof result.data.follow_user.user[item].nickname == 'string'){
            result.data.follow_user.user[item].nickname=JSON.parse(result.data.follow_user.user[item].nickname)
          }
        };
        this.setData({
          Follow_exists:result.data.follow_user.exists,
          FollowList:result.data.follow_user.user,
          FansList:result.data.fans_user.user,
          Fans_exists:result.data.fans_user.exists
        });
        console.log(this.data.choose);
      },
      fail: (res) => {},
      complete: (res) => {},
    })
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