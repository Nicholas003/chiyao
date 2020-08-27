// miniprogram/pages/add/add.js
import {
	formatTime
} from '../../utils/util.js';
let app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		eat_time: [{
				time: '08:00'
			},
			{
				time: '12:30'
			},
			{
				time: ''
			}
		],
		consumption: [
			[],
			[],
			['片', '袋', '克', '毫克', '毫升', '杯', '国际单位'],
		],
		cycle: ['每天', '每周'],
		cycle_index: 0,
		consumption_index: [0, 0, 0],
		week: [{
				'name': '星期一',
				'checked': false,
				'key': 1
			},
			{
				'name': '星期二',
				'checked': false,
				'key': 2
			},
			{
				'name': '星期三',
				'checked': false,
				'key': 3
			},
			{
				'name': '星期四',
				'checked': false,
				'key': 4
			},
			{
				'name': '星期五',
				'checked': false,
				'key': 5
			},
			{
				'name': '星期六',
				'checked': false,
				'key': 6
			},
			{
				'name': '星期日',
				'checked': false,
				'key': 0
			}
		],
		end_time: ''
	},
	input({currentTarget: {dataset: {name}},detail: {value}}) {

		this.setData({
			[name]: value
		})

	},
	TimeChange({currentTarget: {dataset: {index}},detail: {value}}) {

		console.log(index, value)

		let key = `eat_time[${index}].time`;

		this.setData({
			[key]: value
		})

	},
	end_time_change({detail: {value: end_time}}) {
		// console.log(value)
		this.setData({
			end_time
		})
	},
	move_time({currentTarget: {dataset: {index}}}) {
		console.log(index);
		let {eat_time} = this.data;

		eat_time.splice(index, 1);

		this.setData({
			eat_time
		})
	},
	add_time() {

		let data = {
			time: ''
		};

		let {eat_time} = this.data;

		eat_time.push(data);

		this.setData({
			eat_time
		})


	},
	ChooseCheckbox({currentTarget: {dataset: {index}}}) {

		let key = `week[${index}].checked`;

		this.setData({
			[key]: !this.data.week[index].checked
		})
		// console.log(e)

	},
	async qrcode_handle({id}){
		console.log(id)

		let {data:{consumption_index,cycle:cycle_index,medication_time,name,repeat_week,duration=0},data} = await app.db.collection('Drug').doc(id).get();

		console.log(data);

		let eat_time = [];
		medication_time.forEach(item=>{  //设置时间
			eat_time.push({
				time:item
			})
		})

		let week = this.data.week;
		if(cycle_index==1){
			week.forEach(item=>{
				if(repeat_week.includes(item.key)){
					item.checked = true;
				}
				return item
			})
		}
		let end_time
		if(duration){
			console.log(duration);
			let today = Math.round(new Date().setHours(0,0,0,0));// 当天0点
			let end = (today + 60*60*24*1000*(duration+1))-100;
			console.log()
			end_time = app.formatTime(new Date(end)).split(' ')[0];
			// console.log(end_time)
		}

		this.setData({
			consumption_index,cycle_index,eat_time,name,week,end_time,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (e) {

		console.log(e)
		this.qrcode_handle(e)
		this.setData({
			start: app.formatTime(new Date()).split(' ')[0],
			end: app.formatTime(new Date(new Date().getTime() + 60 * 60 * 1000 * 24 * 30)).split(' ')[0]
		});


		let one = [];

		let two = [];

		for (let i = 0; i < 99; i++) {
			if (i < 10) {
				two.push(`.${i}`);
			}
			one.push(i)
		}
		this.setData({
			'consumption[0]': one,
			'consumption[1]': two,
		})
	},
	change_consumption({detail:{value}}) {

		this.setData({
			consumption_index: value
		})

	},
	zq_change({detail: {value}}) {

		this.setData({
			cycle_index: value
		})

	},
	get_from_data() {

		let {
			name,
			eat_time,
			consumption,
			consumption_index,
			cycle_index,
			end_time,
			week
		} = this.data;

		if (!name) {
			wx.showToast({
				title: '请输入名称',
				icon: 'none'
			})
			return false;
		}

		let medication_time = [];

		let cons = !consumption_index[0] && !consumption_index[1] ? 0 : `${consumption[0][consumption_index[0]]}${consumption[1][consumption_index[1]]}${consumption[2][consumption_index[2]]}`; //用量

		let cycle = cycle_index; //重复周期 0代表每天重复  1代表每周某几天重复

		let repeat_week = []; //每周哪几天重复

		eat_time.forEach(item => {
			if (item.time) {
				medication_time.push(item.time)
			}
		});

		if (cycle == 1) {
			week.forEach(value => {
				if (value.checked) {
					repeat_week.push(value.key)
				}
			});
			if (repeat_week.length < 1) {
				wx.showToast({
					title: '至少选择一天',
					icon: 'none'
				});
				return false;
			}
		}

		console.log(name, medication_time, cons, end_time, cycle, repeat_week);
		let from_data = {
			name,
			medication_time,
			cons,
			end_time,
			cycle,
			repeat_week
		}
		console.log(from_data)
		return from_data;
	},
	async save() {

		let from_data = this.get_from_data();
		console.log(new Date().getTime())

		if (!from_data) {
			return false;
		}

		wx.showLoading({
			title: '保存中'
		})

		let res = await app.cloud.call('saveMedicationInfo', from_data);

		wx.hideLoading()

		console.log(res);

		app.bus.$emit('remind_refresh', {});

		app.bus.$emit('home_refresh', {});

		if (app.user.medication_reminder < 3) { //通知次数小于三   就提示去增加次数

			wx.showModal({
				title: '提示',
				showCancel: false,
				content: `当前可推送次数为${app.user.medication_reminder},实在太少了，点击确定立即增加！`,
				success(res) {
					wx.switchTab({
						url: '/pages/my/my'
					})
				}
			})

		} else {

			wx.switchTab({
				url: '/pages/remind/remind'
			})

		}
	},
	async created_qrcode() {
		// let res = await app.cloud.call('createdQrcode');
		// console.log(res)
		// return;
		let from_data = this.get_from_data();
		if (from_data) {

			from_data.consumption_index = this.data.consumption_index;

			if (from_data.end_time) {
				let end_date = new Date(new Date(from_data.end_time).toLocaleDateString());

				let on_date = Math.round(new Date().setHours(0, 0, 0, 0));

				let duration = Math.ceil((end_date.getTime() - on_date) / (1000 * 60 * 60 * 24));

				from_data.duration = duration; //加入持续时间
			}

			console.log(from_data);
			wx.showLoading({
				title: '保存中'
			})
			// Drug
			let {_id} = await app.db.collection('Drug').add({
				data:from_data
			});
			
			let res = await app.cloud.call('createdQrcode', {_id});
			console.log(res)
			if (res.errCode) {
				wx.hideLoading();
				wx.showToast({
					title: '生成失败', 
					icon: 'none'
				})
			}else{
			const wxFile = wx.getFileSystemManager();
			const filePath = wx.env.USER_DATA_PATH + '/test.jpg';
			// 把图片写在本地
			wxFile.writeFile({
					filePath,
					encoding: "binary",
					data: res.buffer,
					complete:(res)=>{
						console.log(res);  //writeFile:ok
						wx.hideLoading()
						if(res.errMsg == "writeFile:ok"){
							wx.previewImage({
								current: filePath, // 当前显示图片的http链接
								urls: [filePath] // 需要预览的图片http链接列表
							})
						}else{
							wx.showToast({
								title: '生成失败',
								icon:'none'
							})
						}

					}
			})
			}
		

		}


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