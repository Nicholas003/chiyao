//app.js
import {
	bus
} from './common/bus/index.js';

import {
	cloud
} from './common/cloud/index.js';

import { formatTime } from './utils/util.js';

App({
	cloud,
	formatTime,
	onLaunch: async function () {
		wx.cloud.init({
			env: 'chiyao-ct0yu',
			traceUser: true,
		});

		this.db = wx.cloud.database({
			env: 'chiyao-ct0yu'
		});

		let data = await cloud.call('login');
		this.id = data.id;
		// console.log(formatTime(new Date()));

		

    console.log(data)
		// wx.cloud.callFunction({
		// 	name: "Service",
		// 	success: (res) => {
		// 		console.log(res)
		// 	},
		// 	fail(err){
		// 		console.log(err)
		// 	}
		// });



		bus.$on('up_user', this.up_user);
	},
	async up_user(e) {

		console.log(e)
		let res = await this.db.collection('Member').doc('3adec2825f36409000b4bc8d3bf09a8e').get();

		console.log(res)

	},
	bus,
	week:["周日","周一","周二","周三","周四","周五","周六"]
})