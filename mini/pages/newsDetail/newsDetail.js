// pages/newsDetail/newsDetail.js
var api = require('../../utils/api.js');
var app = getApp();
var login = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:null,
    isShowCommentModal:false,
    reply:{},
    userinfo:null,
  },

  doFavor:function(e){
    var reuslt = login.is_login();
    if(!reuslt){
      return
    }
    var newsId = e.currentTarget.dataset.news;
    wx.request({
      url: api.FavorAPI,
      data: {
        news:newsId
      },
      dataType: 'json',
      header: {
        Authorization:app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      method: "POST",
      responseType: "text",
      success: (res) => {
        if(res.statusCode == 200){
          this.setData({
            ['news.favor_count']:res.data.favor_count,
            ['news.is_favor']:false
          })
        }else if(res.statusCode == 201){
          this.setData({
            ['news.favor_count']:res.data.favor_count,
            ['news.is_favor']:true
          })
        }else{
          wx.showToast({
            title: '请求错误',
            icon:'none'
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },

  doCollect:function(e){
    var reuslt = login.is_login();
    if(!reuslt){
      return
    }
    var newsId = e.currentTarget.dataset.news;
    wx.request({
      url: api.CollectAPI,
      data: {
        news:newsId
      },
      dataType: 'json',
      header: {
        Authorization:app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      method: "POST",
      responseType: "text",
      success: (res) => {
        console.log(res.data.collect_count)
        if(res.statusCode == 200){
          this.setData({
            ['news.collect_count']:res.data.collect_count,
            ['news.is_collect']:false
          })
        }else if(res.statusCode == 201){
          this.setData({
            ['news.collect_count']:res.data.collect_count,
            ['news.is_collect']:true
          })
        }else{
          wx.showToast({
            title: '请求错误',
            icon:'none'
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })

  },

  doCommentFavor:function(e){
    var reuslt = login.is_login();
    if(!reuslt){
      return
    }
    var commentId = e.currentTarget.dataset.cid;
    var news = this.data.news
    wx.request({
      url: api.CommentFavorAPI,
      data: {
       comment:commentId
      },
      dataType: 'json',
      header: {
        Authorization:app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      method: "POST",
      responseType: "text",
      success: (res) => {
        if(res.statusCode == 200){
          for(var item in news.comment){
            if(news.comment[item].id == commentId){   
              this.setData({
                ['news.comment[' + item + '].favor_count']:res.data.favor_count,
                ['news.comment[' + item + '].is_comment']:false
              })
            }else{
              for(var index in news.comment[item].child){
              if(news.comment[item].child[index].id == commentId){
                this.setData({
                  ['news.comment[' + item + '].child[' + index + '].favor_count']:res.data.favor_count,
                  ['news.comment[' + item + '].child[' + index + '].is_comment']:false
                })
              }
            }
            }
            
          }
        }else if(res.statusCode == 201){
          for(var item in news.comment){
            if(news.comment[item].id == commentId){
              this.setData({
                ['news.comment[' + item + '].favor_count']:res.data.favor_count,
                ['news.comment[' + item + '].is_comment']:true
              })
            }else{
              for(var index in news.comment[item].child){
              if(news.comment[item].child[index].id == commentId){
                this.setData({
                  ['news.comment[' + item + '].child[' + index + '].favor_count']:res.data.favor_count,
                  ['news.comment[' + item + '].child[' + index + '].is_comment']:true
                })
              }
            }
            }
          }
        }else{
          wx.showToast({
            title: '请求错误',
            icon:'none'
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  getMore:function(e){
    var rootId = e.currentTarget.dataset.root;
    var idx = e.currentTarget.dataset.idx;
    // console.log(this.data.news.comment);
    wx.request({
      url: api.CommentAPT,
      data: {
        root:rootId
      },
      dataType: 'json',
      method:"GET",
      responseType: 'text',
      success: (res) => {
        console.log(res.data);
        this.setData({
          ['news.comment[' + idx + '].getmore']:false,
          ['news.comment[' + idx + '].child']:res.data
        })     
      },
      fail: (res) => {},
      complete: (res) => {},
      })
  },

  inputComment:function(e){
    // console.log(e)
    this.setData({
      ['reply.comment']:e.detail.value
    })
  },

  onClickShowCommentModal:function(e){
    // console.log(this.data.userInfo);
    if(!app.globalData.userInfo){
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    this.setData({
      isShowCommentModal:true,
      reply:e.currentTarget.dataset
    })
  },

  onClickCancelCommentModal:function(){
    this.setData({
      isShowCommentModal:false,
      reply:{}
    })
  },

  onClickClearReply:function(){
    this.setData({
      reply:{
        depth:1,
        nid:this.data.reply.nid
      }
    })
  },

  onClickPostComment:function(){
    var userInfo = app.globalData.userInfo;
    if(!this.data.reply.comment){
      wx.showToast({
        title: '评论不能为空',
        icon:'none'
      })
    }
    wx.request({
      url: api.CommentAPT,
      data: {
        news:this.data.reply.nid,
        depth:this.data.reply.depth,
        comment:this.data.reply.comment,
        reply:this.data.reply.cid,
        root:this.data.reply.rid,
        favor_count:0
      },
      dataType: 'json',
      method: "POST",
      header:{
        Authorization: userInfo ? userInfo.token : null
      },
      responseType: 'text',
      success: (res) => {
        console.log(res.data)
        if(res.statusCode == 201){
          if(this.data.reply.rootindex == undefined){
            var dataList = this.data.news.comment;
            dataList.unshift(res.data);
            this.setData({
              ['news.comment']:dataList,
              ['news.comment_count']:this.data.news.comment_count + 1
            });
            this.onClickCancelCommentModal();
          }else{
            var childCommentList = this.data.news.comment[this.data.reply.rootindex].child;
            childCommentList.unshift(res.data);
            this.setData({
              ['news.comment[' + this.data.reply.rootindex + '].child']:childCommentList,
              ['news.comment_count']:this.data.news.comment_count + 1
            });
            this.onClickCancelCommentModal()
          }

        }
      },
      fail: (res) => {},
      complete: (res) => {},
    })
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
        if(result.statusCode == 200){
          this.setData({
            ['news.user.follow']:false,
          })
        }
        if(result.statusCode == 201){
          this.setData({
            ['news.user.follow']:true,
          })
        }
        if(result.statusCode == 203){
          wx.showToast({
            title: '不能关注本人',
            icon: 'none'
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
    var userInfo = app.globalData.userInfo;
    var newsId = options.newsId;
    // console.log(newsId);
    wx.request({
      url: api.News + newsId + '/',
      dataType: 'json',
      method: 'GET',
      header:{
        Authorization: userInfo ? userInfo.token : null
      },
      responseType: 'text',
      success: (res) => {
        console.log(res.data);
        res.data.user.nickname = JSON.parse(res.data.user.nickname);
        for(var item in res.data.comment){
          res.data.comment[item].user__nickname = JSON.parse(res.data.comment[item].user__nickname);
        }
        this.setData({
          news:res.data
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
    this.setData({
      userinfo:app.globalData.userInfo
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