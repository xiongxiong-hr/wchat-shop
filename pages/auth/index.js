// pages/auth/index.js
import  { login } from  "../../utils/asyncWx.js"
import { request } from "../../request/index.js";
Page({
 async handleGetUserInfo(e){
   try {
      //获取用户信息
      const {encryptedData,rawData,iv,signature} = e.detail;
      //获取小程序登录成功后的code
      const {code} = await login();
      const loginParams = {encryptedData,rawData,iv,signature,code}
      const res = await request({url:"/users/wxlogin",data:loginParams,methods:"post"});
      // console.log(res)
      // wx.setStorage({
      //   key: 'token',
      //   data: token
      // });
      wx.navigateBack({
        delta: 1
    });
   } catch (error) {
     console.log(error);
   }
  }
})