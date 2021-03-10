// pages/bind/bind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:"迪迦存在吗",
    answer:"这个世上没有迪迦",
    name:"",
    path:"/static/images/default.png",
    localpath:"当前位置"
  },

  changeData: function(){
    console.log(this.data.answer);
    this.setData({answer:"迪迦是存在的！！！"})
  },

  getLocalPath:function(){
    var that = this;
    wx.chooseLocation({
      success:function(res){
        console.log(res);
        that.setData({localpath:res.address})
      }
    })
  },

  getUsrinfo: function(){
    var that = this
    wx.getUserInfo({
      success: function(res){
        console.log('success',res),
        that.setData({
          name:res.userInfo.nickName,
          path:res.userInfo.avatarUrl
        })
      },
      fail:function(res){
        console.log('fail',res)
      }
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