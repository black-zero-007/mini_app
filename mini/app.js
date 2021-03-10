App({
  onLaunch: function(){
    // wx.removeStorageSync('userInfo');
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.globalData.userInfo = userInfo;
    }
  },

  globalData:{
    userInfo: null,
  },
  initUserInfo:function(res,localinfo){
    var info = {
      token:res.token,
      phone:res.phone,
      nickName:localinfo.nickName,
      avatarUrl:localinfo.avatarUrl,
      gender:localinfo.gender,
      address:localinfo.city
    };
    this.globalData.userInfo = info;
    wx.setStorageSync('userInfo', info)
  },
  delUserInfo:function(){
    this.globalData.userInfo = null;
    wx.removeStorageSync('userInfo')
  }
})