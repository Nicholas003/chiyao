// miniprogram/pages/add/add.js
import { formatTime } from '../../utils/util.js';
let app = getApp();
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
		  	time:''
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
				'checked':false,
				'key':0
		  },
		  {
			  'name':'星期二',
				'checked':false,
				'key':1
		  },
		  {
			  'name':'星期三',
				'checked':false,
				'key':2
		  },
		  {
			  'name':'星期四',
				'checked':false,
				'key':3
		  },
		  {
			  'name':'星期五',
				'checked':false,
				'key':4
		  },
		  {
			  'name':'星期六',
				'checked':false,
				'key':5
		  },
		  {
			  'name':'星期日',
				'checked':false,
				'key':6
		  }
		],
		end_time:''
	},
	input({currentTarget:{dataset:{name}},detail:{value}}){
		
		this.setData({
			[name]:value
		})

	},
  TimeChange({currentTarget:{dataset:{index}},detail:{value}}){
	  
	  console.log(index,value)
	  // this.data.eat_time[index].time = value;
	  let key = `eat_time[${index}].time`;
	  this.setData({
		  [key]:value
	  })
	  
	},
	end_time_change({detail:{value:end_time}}){
		// console.log(value)
		this.setData({
			end_time
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
		console.log(app.formatTime(new Date()));
		
		this.setData({
			start:app.formatTime(new Date()).split(' ')[0]
		});

 
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
	async save(){

		console.log(new Date().getTime())

		let {name,eat_time,consumption,consumption_index,cycle_index,end_time,week} = this.data;

		let medication_time = [];
		// {{consumption[0][consumption_index[0]]}}{{consumption[1][consumption_index[1]]}}{{consumption[2][consumption_index[2]]}}
		
		let cons =!consumption_index[0]&&!consumption_index[1]?0:`${consumption[0][consumption_index[0]]}${consumption[1][consumption_index[1]]}${consumption[2][consumption_index[2]]}`; //用量

		let cycle = cycle_index;   //重复周期 0代表每天重复  1代表每周某几天重复

		let repeat_week = [];  //每周哪几天重复

		eat_time.forEach(item=>{
			if(item.time){
				medication_time.push(item.time)
			}
		});

		if(cycle==1){
			week.forEach(value=>{
				if(value.checked){
					repeat_week.push(value.key)
				}
			})
		}
		
		console.log(name,medication_time,cons,end_time,cycle,repeat_week);
		let from_data = {
			name,medication_time,cons,end_time,cycle,repeat_week
		}
		console.log(from_data)
		let res = await app.cloud.call('saveMedicationInfo',from_data);

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