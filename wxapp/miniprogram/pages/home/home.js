// miniprogram/pages/home/home.js
let app = getApp();
import {
	formatTime,
	getFormatTime
} from "../../utils/util.js"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show_index: null,
		list: [],
		show_loading:true
	},

	action({currentTarget: {dataset: {index}}}) {

		if (this.data.show_index == index) {
			index = null
		}
		
		this.setData({
			show_index: index
		});
		
		if(this.data.list.length-1==index){
			wx.pageScrollTo({
			  scrollTop: 10000,
			  duration: 300
			})
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function(options) {

		this.load_sync();
		
		app.bus.$on('home_refresh',()=>{
			this.load_sync();
		})
		
	},
	async load_sync(){
		
		clearInterval(this.intval)
		
		let {data} = await app.cloud.call('todaySchedule');
		
		this.data.data = data;
		
		wx.stopPullDownRefresh()
		
		this.intval = setInterval(() => {
			
			this.set_list()
			
		}, 1000)
		
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

		this.load_sync()

	},
	set_list() {

		let data = this.data.data;

		for (let i = 0; i < data.length; i++) {

			let show_time = formatTime(new Date(data[i].push_time)).split(' ')[1];

			data[i].distance_time = getFormatTime(data[i].push_time);

			let time = Math.round(new Date());

			let distance_time = (time - data[i].push_time) / 1000; //距离发送时间 小于零说明时间还没到  大于零说明超时了

			data[i].overtime = distance_time <= 0 ? false : true;

			data[i].show_time = show_time;

		}
		
		this.setData({
			
			show_loading:false,
			list: data,
			
		})
	},
	async complete({currentTarget: {dataset: {id,index,state}}}) {
		
		let res = await app.db.collection('PublishQueue').doc(id).update({data: {confirm: state}});
		
		let key = `list[${index}].confirm`;
		
		this.setData({
			show_index: null
		});
		
		setTimeout(() => {
			this.setData({
				[key]: state,
			})
		}, 500)

	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},


	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
