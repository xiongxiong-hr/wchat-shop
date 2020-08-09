// pages/cart/index.js
import  {showToast,requestPayment} from  "../../utils/asyncWx.js"
import { request } from "../../request/index.js";
Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow: function() {
    // 页面出现在前台时执行,获取缓存中的地址赋值
    const address=wx.getStorageSync("address");
    let cart=wx.getStorageSync("cart")||[];
    cart = cart.filter(v=>v.checked)
    this.setData({
      address
    });
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v => {
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
    });
    //判断数组是否为空
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },
  //点击支付按钮
  async handleOrderPay(){
    try {
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      wx.setStorageSync("token", token);
      if(!token){
        wx.navigateTo({url: '/pages/auth/index'});
        return;
      }
      //1创建订单 2准备发送请求
      // const order_price = this.data.totalPrice;
      // const consignee_addr = this.data.address.all;
      // const cart = this.data.cart;
      // let goods = [];
      // cart.forEach(v => goods.push({
      //   goods_id: v.goods_id,
      //   goods_number: v.num,
      //   goods_price: v.goods_price
      // }))
      // const orderParams = { order_price, consignee_addr, goods };
      // 4 准备发送请求 创建订单 获取订单编号
      //const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
      // 5 发起 预支付接口
      //const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
      //await requestPayment(pay);
      // 7 查询后台 订单状态
      //const res1 = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
      //await showToast({ title: "支付成功" });
      // 8 手动删除缓存中 已经支付了的商品
      // let newCart=wx.getStorageSync("cart");
      // newCart=newCart.filter(v=>!v.checked);
      // wx.setStorageSync("cart", newCart);
      // 8 支付成功了 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index'   
      });
    } catch (error) {
      await showToast({ title: "支付失败" })
      console.log(error);
    }
  }
})

  