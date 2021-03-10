var api = require("../../utils/api")
var app = getApp();
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    min_id: 0,
    max_id: 0,
    userInfo:null,
    chooseimage:[
      {add:'/static/images/icon/home_superstar_icon_show.png',content:'热门文章',src:'/pages/hotNews/hotNews'},
      {add:'/static/images/icon/home_essays_icon_show.png',content:'精品文章',src:'/pages/goodNews/goodNews'},
      {add:'/static/images/icon/home_viewpoint_icon_show_20201223154402.png',content:'话题',src:'/pages/topic/topic'},
    ],
    img:['https://mini-1304610462.cos.ap-beijing.myqcloud.com/picture4.jpg','https://mini-1304610462.cos.ap-beijing.myqcloud.com/picture9.jpg']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: api.News,
    //   dataType: 'json',
    //   method: 'GET',
    //   responseType: 'text',
    //   success: (result) => {
    //     console.log(result.data);
    //     this.setData({
    //       imageList:result.data,
    //       min_id:result.data[result.data.length - 1].id,
    //       max_id:result.data[0].id
    //     })

    //   },
    //   fail: (res) => {},
    //   complete: (res) => {},
    // })
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
    })
    wx.request({
      url: api.News,
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        for(var item in result.data){
          result.data[item].user.nickname = JSON.parse(result.data[item].user.nickname);
        }
        this.setData({
          imageList:result.data,
          min_id:result.data[result.data.length - 1].id,
          max_id:result.data[0].id
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
    wx.request({
      url: api.News,
      data:{
        max_id:this.data.max_id
      },
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        for(var item in result.data){
          result.data[item].user.nickname = JSON.parse(result.data[item].user.nickname);
        }
        if(!result.data.length){
          wx.showToast({
            title: '已经是最新数据',
            icon:'none'
          })
          wx.stopPullDownRefresh()
          return
        }
        var dataList = result.data.reverse()
        this.setData({
          imageList:dataList.concat(this.data.imageList),
          max_id:result.data[0].id
        })

      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.request({
      url: api.News,
      data: {
        min_id:this.data.min_id
      },
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        console.log(result.data);
        for(var item in result.data){
          result.data[item].user.nickname = JSON.parse(result.data[item].user.nickname);
        }
        if(!result.data.length){
          wx.showToast({
            title: '已经到底部的',
            icon:'none'
          })
          return
        }
        this.setData({
          imageList:this.data.imageList.concat(result.data),
          min_id:result.data[result.data.length - 1].id,
        })

      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


})