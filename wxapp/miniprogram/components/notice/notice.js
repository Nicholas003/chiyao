// components/notice/notice.js
let app = getApp();

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		type: {
			type: String,
			value: 'home'
		}
	},
	lifetimes: {
		attached: function() {
			console.log('attached')
			app.bus.$on('set_medication_reminder',(e)=>{
				this.total_handler(e)
			});
			
			app.bus.$emit('get_medication_reminder',(e)=>{

				this.total_handler(e)
			});

		},
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		show: false
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		total_handler({total=0}){
			console.log('组件',total)
			let show = true;
			if(total>9){
				show = false;
				// wx.hideTabBarRedDot({
				// 	index:2
				// })
			}else{
				// wx.showTabBarRedDot({
				// 	index:2
				// })
			}
			this.setData({
				show
			})
		}
	}
})
