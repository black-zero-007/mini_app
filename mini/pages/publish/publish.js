// pages/login/login.js
var COS = require('../../utils/cos-wx-sdk-v5.js');
var api = require('../../utils/api.js');
var app = getApp();
var cos;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    content:"",
    address:"",
    topicId: null,
    topicTitle:"请选择话题"
  },

  AddImage:function(){
  
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res)=>{
        var oldLength = parseInt(this.data.imageList.length);
        let totalCount = res.tempFiles.length + this.data.imageList.length;
        if(totalCount > 9){
          wx.showToast({
            title: '最多上传九张图片',
            icon: 'none'
          });
          return
        }
        // console.log(res.tempFiles);
        this.setData({imageList:this.data.imageList.concat(res.tempFiles)});
        // console.log(this.data.imageList[0].Key);
        cos = new COS({
          // 必选参数
          getAuthorization: function (options, callback) {
              // 服务端示例：https://github.com/tencentyun/qcloud-cos-sts-sdk/edit/master/scope.md
              wx.request({
                  url: api.credential,
                  data: {
                    // 可从 options 取需要的参数
                  },
                  success: function (result) {
                    // console.log(result);
                    var data = result.data;
                    var credentials = data.credentials;
                    callback({
                        TmpSecretId: credentials.tmpSecretId,
                        TmpSecretKey: credentials.tmpSecretKey,
                        XCosSecurityToken: credentials.sessionToken,
                        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                        ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
                    });
                  }
              });
          }
        });
        for(var index in res.tempFiles){
          let filePath = res.tempFiles[index].path;
          var filePathSplit = filePath.split('.');
          var ext = filePathSplit[filePathSplit.length - 1];
          let randowString = Math.random().toString(36).slice(-8) + String(new Date().getTime());
          // console.log(randowString);
          var fileKey = randowString + '.' + ext;
          var targetIndex = parseInt(oldLength) + parseInt(index);
          this.setData({
            ["imageList["+ targetIndex + "].key"]:fileKey
          });
          var that = this;
          (function(idx){
            cos.postObject({
              Bucket: 'mini-1304610462',
              Region: 'ap-beijing',
              Key: fileKey  ,
              FilePath: filePath,
              onProgress: (info)=> {
                that.setData({
                  ["imageList[" + idx + "].percent"]:info.percent*100
                });
                
              }
            }, (err, data)=> {
              if(err){
                wx.showToast({
                  title: '上传失败',
                  icon:'none'
                });
                that.setData({
                  ["imageList[" + idx + "].error"]:true,
                  ["imageList[" + idx + "].percent"]:100
                })
              }else{
                // console.log(data);
                that.setData({
                  ["imageList[" + idx + "].cos_path"]:data.headers.Location
                })
                console.log(that.data.imageList);
              }
                // console.log(data.Location);
                // onlineImageList.push(data.Location);

            });
          })(targetIndex)
          
        }   
      },
      
      // fail: (res) => {},
      // complete: (res) => {},
    });
  },

  removeImage:function(event){
    // console.log(event);
    var index = event.currentTarget.dataset['index'];
    var item = event.currentTarget.dataset['item'];
    if(item.percent == 100){
      cos.deleteObject({
        Bucket: 'mini-1304610462',
        Region: 'ap-beijing',
        Key: item.key,
      },(err, data)=> {
        if(err){
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }else{
          var imageList = this.data.imageList;
          imageList.splice(index,1);//删除图片
          this.setData({
            imageList:imageList
          })
        }
      });
    }
  },

  getLocation:function(){
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          address:res.address
        })
      },
    })
  },

  updateTopic:function(item){
    this.setData({
      topicId:item.id,
      topicTitle:item.title
    })
  },

  bindContentInput:function(e){
    // console.log('e',e);
    this.setData({
      content:e.detail.value
    })
  },

  publishNews:function(){
    if(this.data.imageList.length < 1){
      wx.showToast({
        title: '至少选择一张图片',
        icon:'none'
      });
      return
    };
    if(this.data.content.length < 1){
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      });
      return
    };
    wx.showLoading({
      title: '发送中。。。',
    });
    var userInfo = app.globalData.userInfo;
    wx.request({
      url: api.News,
      data: {
        cover:this.data.imageList[0].cos_path,
        content:this.data.content,
        topic:this.data.topicId,
        address:this.data.address,
        imageList:this.data.imageList
      },
      method: 'POST',
      header:{
        Authorization:app.globalData.userInfo ? app.globalData.userInfo.token : null
      },
      dataType: 'json',
      responseType: 'text',
      success:(res)=>{
        console.log(res)
        if(res.statusCode == 201){
          wx.showToast({
            title: '发布成功',
            icon: 'none'
          })
          wx.navigateBack({});
        }else{
          wx.showToast({
            title: '发布失败，服务器错误',
            icon: 'none'
          })
        }
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