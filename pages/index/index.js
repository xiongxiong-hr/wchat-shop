//Page Object
import {request} from "../../request/index.js"
Page({
  data: {
    //轮播图数组
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
   //发送异步请求获得轮播图数据
  getSwiperList() {
    request({url:'/home/swiperdata'})
    .then((result)=>{
      const swiperList = result.data.message;
      swiperList.forEach(v => {
        v.navigator_url =  v.navigator_url.replace('main', 'index')
      });
      this.setData({
        swiperList
      })
    })
  },
  //获取导航数据
  getCateList() {
    request({url:'/home/catitems'})
    .then((result)=>{
      this.setData({
           catesList:result.data.message
        })
    })
  },
  //获取楼层数据
  getFloorList() {
    request({url:'/home/floordata'})
    .then((result)=>{
      const floorList = result.data.message
      floorList.forEach(v=>{
        v.product_list.forEach(v=>{
          v.navigator_url =  v.navigator_url.replace('?','/index?')
        })
      })
      this.setData({
           floorList
        })
    })
  },
});