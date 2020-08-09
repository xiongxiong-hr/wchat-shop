import {request} from "../../request/index.js"

// pages/search/index.js
Page({
  data: {
    goods:[],
    isFocus:false,
    //输入框的值
    inpValue:""
  },
  TimeId:-1,
  handleInput(e){
    const {value} = e.detail;
    clearTimeout(this.TimeId);
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    //准备发送请求
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
    },1000);
   
  },
  async qsearch(query){
    const res = await request({url:"/goods/search",data:{query}});
    console.log(res);
    this.setData({
      goods:res.data.message.goods
    })
  },
  //点击取消
  handleCalcel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})