// pages/category/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList:[],
    //右侧菜单数据
    rightContent:[],
    //被点击的菜单
    currentIndex:0,
    scrollTop:0
  },
//接口返回数据
Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先判断本地存储中有没有旧的数据
    //没有旧的数据就直接发送请求
    //有旧的数据且旧的数据没有过期，就用旧的数据
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      //有旧的数据，定义过期时间10s
      if(Date.now()-Cates.time>1000*10){
        //发送请求
        this.getCates();
      }else{
        //可以使用旧的数据
        this.Cates = Cates.data;
        //构造左侧数据
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        //构造右侧数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    
  },
   //获取楼层数据
   async getCates() {
    // request({url:'/categories'})
    // .then((res)=>{
    //   this.Cates=res.data.message;
    //   //把接口数据存到本地存储中
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    //   //构造左侧数据
    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
    //   //构造右侧数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
      const res = await request({url:'/categories'});
      this.Cates=res.data.message;
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧菜单点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset
    //构造右侧数据
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
    
  }
})