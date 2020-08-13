// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  eat_time:[
		  {
			time:'08:00'
		  },
		  {
			time:'12:30'
		  },
		  {
		  	time:'--:--'
		  }
	  ],
	  consumption:[
		  [],
		  [],
		  ['片','克','毫克','毫升','杯','国际单位'],
	  ],
	  cycle:['每天','每周'],
	  cycle_index:0,
	  consumption_index: [0, 0, 0],
	  week:[
		  {
			  'name':'星期一',
			  'checked':false
		  },
		  {
			  'name':'星期二',
			  'checked':false
		  },
		  {
			  'name':'星期三',
			  'checked':false
		  },
		  {
			  'name':'星期四',
			  'checked':false
		  },
		  {
			  'name':'星期五',
			  'checked':false
		  },
		  {
			  'name':'星期六',
			  'checked':false
		  },
		  {
			  'name':'星期日',
			  'checked':false
		  }
	  ]
  },
  TimeChange({currentTarget:{dataset:{index}},detail:{value}}){
	  
	  console.log(index,value)
	  // this.data.eat_time[index].time = value;
	  let key = `eat_time[${index}].time`;
	  this.setData({
		  [key]:value
	  })
	  
  },
  move_time({currentTarget:{dataset:{index}}}){
	  console.log(index);
	  let {eat_time} = this.data;
	  
	  eat_time.splice(index,1);
	  
	  this.setData({
		  eat_time
	  })
  },
  add_time(){
	  
	let data =  {time:''};
	
	let {eat_time} = this.data;
	
	eat_time.push(data);
	
	this.setData({
		eat_time
	})
	  
	  
  },
  ChooseCheckbox({currentTarget:{dataset:{index}}}){
	  
	  let key = `week[${index}].checked`;
	  
	  this.setData({
		  [key]:!this.data.week[index].checked
	  })
	  // console.log(e)
	  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  
	  let one = [];
	  
	  let two = [];
	  
	  for(let i=0;i<99;i++){
		  if(i<10){
			  two.push(`.${i}`);
		  }
		  one.push(i)
	  }
	  this.setData({
		  'consumption[0]':one,
		  'consumption[1]':two,
	})
  },
  change_consumption({detail:{value}}){
	  
	  
	  this.setData({
		  consumption_index:value
	  })
	  
	  // console.log(e)
	  
  },
  zq_change({detail:{value}}){
	  console.log(value);
	  
	  this.setData({
		  cycle_index:value
	  })
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