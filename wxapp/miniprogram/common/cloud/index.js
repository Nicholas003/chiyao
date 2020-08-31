
// new Promise

let promise = Promise.resolve();

class cloud{

  constructor(){
    let that = this;
    
    this.interceptor = {
      request:that.request,
      response:that.response
    }
  }

  request(config){


    console.log(config)

    return config;

  }

  response(data){
    // console.log(data)
    if(data.errMsg == "cloud.callFunction:ok"){
      return data.result;
    }else{

      return Promise.reject('云函数调用错误')
    }
    
  }

  call(name,data={}){

    return this.action(name,data);

  }

  callFunction(data){

    return new Promise((res,rej)=>{
      wx.cloud.callFunction(data).then(r=>{
        res(r)
      }).catch(err=>{
        rej(err)
      })
    });
  }

  action(name,data={}){

    let config = {
      name,
      data
    }

    this.promise = Promise.resolve(config);

    // this.promise = this.promise.then(this.request);

    this.promise = this.promise.then(this.interceptor.request);

    this.promise = this.promise.then(this.callFunction,undefined);

    this.promise = this.promise.then(this.interceptor.response,undefined);

    return this.promise;
    

    

  }

}

exports.cloud = new cloud();