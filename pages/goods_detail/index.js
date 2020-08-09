// pages/goods_detail/index.js
import {request} from "../../request/index.js"
Page({
  data: {
    goodsObj:{},
    isCollect:false
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
 onShow: function () {
    var pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  //点击获取商品详情
  async getGoodsDetail(goods_id){
    const res=await request({url:"/goods/detail",data:{goods_id}});
    const goodsObj=res.data.message;
    this.GoodsInfo=goodsObj;
    //收藏功能
    let collect = wx.getStorageSync("collect")||[];
    //判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //ipone不支持webp格式的图片，需替换成就JPG格式的图片
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  //点击图片预览
  handleItemPreview(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    console.log(e)
    wx.previewImage({
      current: current,
      urls: urls
    });
  },
  //点击加入购物车
  handleCartAdd(){
    //获取购物车缓存中的数组
    let cart=wx.getStorageSync("cart") || [];
    console.log(this.GoodsInfo)
    //判断商品对象是否存在购物车中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    console.log(index)
    if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++;
    }
    //把购物车都添加回缓存中
    wx.setStorageSync("cart", cart);
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
    });
  },
  //点击收藏
  handleCollect(){
    let isCollect = false;
     //获取收藏缓存中的数组
     let collect=wx.getStorageSync("collect") || [];
     let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
     if(index!==-1){
       collect.splice(index,1);
       isCollect = false;
       wx.showToast({
         title: '取消成功',
         icon: 'none',
         mask: true
       });
     }else{
        collect.push(this.GoodsInfo);
        isCollect = true;
        wx.showToast({
          title: '收藏成功',
          icon: 'none',
          mask: true
        });
     }
     wx.setStorageSync("collect", collect);
     this.setData({
       isCollect
     })
  }
})