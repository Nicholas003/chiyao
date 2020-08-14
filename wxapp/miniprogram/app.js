//app.js
import {bus} from './common/bus/index.js';

App({
  onLaunch: function () {
	  
	  
	  
	  
	  
	  wx.cloud.init({
	    env: 'chiyao-ct0yu',
	    traceUser: true,
	  });
	  
	  this.db = wx.cloud.database({
	    env: 'chiyao-ct0yu'
	  })
	  
	  bus.$on('up_user',this.up_user);
  },
  async up_user(e){
	  
	  console.log(e)
	  let res = await this.db.collection('Member').doc('3adec2825f36409000b4bc8d3bf09a8e').get();
	  
	  console.log(res)
	  
  },
  bus
})
