let ajaxTimes=0;
export const request=(params)=>{
   // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
   let header={...params.header};
   if(params.url.includes("/my/")){
     // 拼接header 带上token
     header["Authorization"]=wx.getStorageSync("token");
   } 
    ajaxTimes++;
    wx.showLoading({
        title:"加载中",
        mask: true,
    });
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        var reqTask = wx.request({
           ...params,
           header:header,
           url:baseUrl+params.url,
           success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: () =>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading();
                }
            }
        });
    })
}

