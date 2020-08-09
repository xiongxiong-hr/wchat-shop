// pages/cart/index.js
import  {getSetting,chooseAddress,openSetting,showModal,showToast} from  "../../utils/asyncWx.js"
Page({
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow: function() {
    // 页面出现在前台时执行,获取缓存中的地址赋值
    const address=wx.getStorageSync("address");
    const cart=wx.getStorageSync("cart")||[];
    //every数组方法，回遍历一个会接收一个回调函数，当没每一个回调函数都返回true了，那么every方法的返回值都是true
    //空数组调用every，返回值就是true
    // const allChecked=cart.length?cart.every(v=>v.checked):false;
    this.setData({
      address
    });
    this.setCart(cart);
  },
  async handleChooseAddress(){
    try {
      //获取权限状态
      const res = await getSetting();
      console.log(res)
      const scopeAddress = res.authSetting["scope.address"];
      //判断权限状态
      if( scopeAddress === false){
        //先诱导用户打开授权页面
        await openSetting(); 
      }
      //调用收货地址api
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      //把收货地址存入到缓存中
      wx.setStorageSync("address",address);    
    } catch (error) {
      console.log(error)
    }
  },
  // 复选框改变事件
  handleItemChange(e){
    const goods_id=e.currentTarget.dataset.index;
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },
  //设置购物车状态，重新计算底部工具栏的数据
  setCart(cart){
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false
      }
    });
    //判断数组是否为空
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart",cart)
  },
  //购物车全选
  handleItemAllCheck(){
    //获取data
    let {cart,allChecked} = this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  // 数量加减事件
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      const res = await showModal({content: '您是否需要删除?'});
      console.log(res)
      if(res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }
  },
  //点击结算事件
  async handlePay(){
    const{address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title: '您还没有选择收货地址'});
      return;
    }
    if(totalNum===0){
      await showToast({title: '您还没有选购商品'});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})

  