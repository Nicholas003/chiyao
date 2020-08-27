//app.js
import {
	bus
} from './common/bus/index.js';

import {
	cloud
} from './common/cloud/index.js';

import {
	formatTime
} from './utils/util.js';

App({
	cloud,
	formatTime,
	onLaunch: async function() {
		wx.cloud.init({
			env: 'chiyao-ct0yu',
			traceUser: true,
		});

		this.db = wx.cloud.database({
			env: 'chiyao-ct0yu'
		});

		let data = await cloud.call('login');
		
		this.id = data.id;
		
		console.log(data)

		
		
		this.up_user();
	},
	async up_user() {

		let res = await this.db.collection('Member').doc(this.id).get();

		this.user = res.data;
		

		bus.$emit('up_user',res.data);

	},
	user:{},
	bus,
	week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
})
