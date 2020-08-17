// miniprogram/pages/my/my.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
	  show_login_btn:false
  },
  
  

  async ding() {

    
    // console.log(123)
    // let res = await wx.cloud.callFunction({name: "login"});

    // console.log(res)
	// this.setData({
	// 	show_login_btn:true
	// })
	
	// let res = await app.db.collection('Member').add({
	// 	data:{
	// 		subscriptions_total:123
	// 	}
	// })
	
	
  // console.log(res)
   // wx.cloud.callFunction({
        //   name:"sendMessage",
        //   success:(res)=>{
        //     console.log(res)
        //   } 
        // });
    wx.requestSubscribeMessage({
      tmplIds: ['UsFM7aGRTyt9QAnRaSIiWyH6exT1z58qvs9Om2cutRc'],
      success(res) {
       

      },
      fail(err) {
        console.log(err)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})