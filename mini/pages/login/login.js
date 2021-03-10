const api = require("../../utils/api");

// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    code:""
  },

  bindphone:function(e){
    this.setData({phone:e.detail.value});
  },
  bindcode:function(e){
    this.setData({code:e.detail.value});
  },

  messagecode:function(e){
    
    if(this.data.phone.length == 0){
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
      return
    }
    var reg = /^(1[3|4|5|8])\d{9}$/;
    if(!reg.test(this.data.phone)){
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: api.MessageAPI,
      data: {phone:this.data.phone},
      method: 'GET',
      dataType: 'json',
      success:function(res){
        if(res.data.status){
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },

  onClickSubmit:function(e){
    // console.log(e.detail.userInfo)
    wx.login({
      success: (response) => {
        // console.log(response);
        wx.request({
          url: api.LoginAPI,
          data:{
            phone: this.data.phone,
            code: this.data.code,
            nickname:e.detail.userInfo.nickName,
            avatar:e.detail.userInfo.avatarUrl,
            wx_code:response.code
          },
          method:'POST',
          dataType:'json',
          success:function(res){
            // console.log(res.data);
            if(res.data.status){
             app.initUserInfo(res.data.data,e.detail.userInfo);
              wx.navigateBack({});
            }else{
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              });
            }
          }
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    })
    // console.log(e.detail.userInfo)
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