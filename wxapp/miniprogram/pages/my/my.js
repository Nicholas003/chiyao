// const { send } = require("process");

// miniprogram/pages/my/my.js
let app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show_login_btn: false,
		user: {}
	},

	async send() {

		let res = await app.cloud.call('sendMessage');

		console.log(res)
	},
	async task(){
		// let res = await app.db.collection('MedicationInfo').doc('d644cf8b5f3cbd5f0018a44e2637103f').get()
		
		
		let res = await app.cloud.call('addTask');
		
		console.log(res)
		
	},
	async ding() {

		const _ = app.db.command;
		
		wx.requestSubscribeMessage({
			tmplIds: ['K3LYRKFI0iNd3dnq8w0Matt3HgKJFemtOuzAF0d4dS8'],
			success:async (res)=>{
				console.log(res)
				for (let key in res) {
					if (res[key] == 'accept') {
						let res = await app.db.collection('Member').doc(app.id).update({
							data: {
								medication_reminder: _.inc(1)
							}
						});
						console.log(res)
						if (res.errMsg == "document.update:ok") {
							this.data.user.medication_reminder++
							this.setData({
								user: this.data.user
							})
						}
					}
				}

			},
			fail(err) {
				console.log(err)
			}
		})

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function(options) {

		let {
			data
		} = await app.db.collection('Member').doc(app.id).get();

		console.log(data);

		this.setData({
			user: data
		})
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
		this.onLoad()
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
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

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
