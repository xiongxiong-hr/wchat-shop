//Page Object
Page({
  data: {
    //轮播图数组
    swiperList:[]
  },
  //options(Object)
  onLoad: function(options){
    //发送异步请求获得轮播图数据
    var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        console.log(result)
      }
    });
  },
  
});