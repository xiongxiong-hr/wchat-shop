// pages/user/index.js
Page({
  data: {
    userinfo:{},
    //被收藏的商品数量
    collectNums:0
  },

  
  onShow: function () {
    const userinfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      userinfo,
      collectNums:collect.length
    })
  }
})