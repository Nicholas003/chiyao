// miniprogram/pages/remind/remind.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week:app.week
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let {data} = await app.cloud.call('getRemind');

    for(let i=0;i<data.length;i++){
      let end_time = app.formatTime(new Date(data[i].end_time)).split(' ')[0];
      console.log(end_time);
      data[i].end_time = end_time;
    }

    this.setData({
      data
    });
    wx.stopPullDownRefresh();
  },
  async on_change({currentTarget:{dataset:{id}},detail:{value}}){
    // console.log(id,value)
    const _ = app.db.command;
    let res = await app.db.collection('MedicationInfo').doc(id).update({
      data: {
        on:_.set(value)
      }
    });
    console.log(res)
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
    this.onLoad();
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