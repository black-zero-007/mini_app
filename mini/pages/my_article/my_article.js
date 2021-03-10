const api = require("../../utils/api");

// pages/article_collect/article_collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    NewsList:[],
    max_id: 0,
    min_id: 0,
    token: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      token:options.token
    })
    wx.request({
      url: api.MyNewsAPI,
      data: {
        token:options.token
      },
      dataType: 'json',
      method: "GET",
      responseType: 'text',
      success: (result) => {
        // console.log(result.data);
        for(var item in result.data){
          result.data[item].user.nickname = JSON.parse(result.data[item].user.nickname);
        };
        this.setData({
          NewsList:result.data,
          min_id:result.data[result.data.length - 1].id,
          max_id:result.data[0].id
        })
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
    wx.request({
      url: api.MyNewsAPI,
      data:{
        max_id:this.data.max_id,
        token:this.data.token
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
          NewsList:dataList.concat(this.data.NewsList),
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
      url: api.MyNewsAPI,
      data: {
        min_id:this.data.min_id,
        token:this.data.token
      },
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        // console.log(result.data);
        for(var item in result.data){
          result.data[item].user.nickname = JSON.parse(result.data[item].user.nickname);
        }
        console.log(result.data.length)
        if(!result.data.length){
          wx.showToast({
            title: '已经到底部的',
            icon:'none'
          })
          return
        }
        this.setData({
          NewsList:this.data.NewsList.concat(result.data),
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

  }
})