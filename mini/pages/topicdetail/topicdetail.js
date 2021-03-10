// pages/topicdetail/topicdetail.js
var api = require('../../utils/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    TopicList:[],
    min_id: 0,
    max_id: 0,
    topicId: 0,
    cover:['https://mini-1304610462.cos.ap-beijing.myqcloud.com/picture9.jpg']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.globalData.userInfo;
    var that = this;
    var topic_id = that.options.topic_id;
    // console.log(topic_id)
    wx.request({
      url: api.TopictitleAPI,
      data:{
        topic_id:topic_id
      },
      dataType: 'json',
      header:{
        Authorization: userInfo ? userInfo.token : null
      },
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        console.log(result.data);
        this.setData({
          TopicList:result.data,
          topicId:topic_id
        })
      },
      fail: (res) => {},
      complete: (res) => {},
    });
    wx.request({
      url: api.TopicAPI + topic_id + '/',
      dataType: 'json',
      method: 'GET',
      responseType: 'text',
      success: (result) => {
        // console.log(result.data);
        for(var item in result.data){
          result.data[item].user.nickname = JSON.parse(result.data[item].user.nickname);
        }
        if(result.data.length > 0){

          this.setData({
          imageList:result.data,
          min_id:result.data[result.data.length - 1].id,
          max_id:result.data[0].id
        })  
      }else{
        this.setData({
          imageList:result.data,
        })  
      }
                        
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
      url: api.TopicAPI + this.data.topicId + '/',
      data:{
        max_id:this.data.max_id,
        topic_id:this.data.topicId
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
      url: api.TopicAPI + this.data.topicId + '/',
      data: {
        min_id:this.data.min_id,
        topic_id:this.data.topicId
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

  }
})