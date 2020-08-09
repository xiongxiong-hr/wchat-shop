// pages/order/index.js
//onshow无法像onLoad一样接收option参数
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部订单",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"待发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ],
    orders:[]
  },
   //根据激活选择标题数组
  changeTitleByIndex(index){
    let {tabs}=this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //点击tab切换
  handleTabsItemChange(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    //根据不同的type值发送请求
    this.getOrders(index+1)
  },
  onShow: function () {
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    wx.setStorageSync("token", token);
    if(!token){
     wx.navigateTo({
       url: '/page/auth/index',
     });
     return;
    }
    //获取小程序的页面栈，长度最大是10个页面
    //数组中索引最大的就是当前页面
    var pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },
  //获取订单列表
  async getOrders(type){
    const res = await request({url:"/my/orders/all",data:{type}});
    console.log(res)
    this.setData({
      orders:res.data.message.orders.map(v=>({...v,create_time_cn:new Date(v.create_time*1000).toLocaleString()}))
    })
  }
})
