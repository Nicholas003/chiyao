// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command;
// 云函数入口函数

function make_json({
	openid,
	name,
	time,
	cons
}) {
	let send_res = {
		touser: openid,
		page: "/pages/home/home",
		templateId: 'K3LYRKFI0iNd3dnq8w0Matt3HgKJFemtOuzAF0d4dS8',
		data: {
			thing1: {
				value: name
			},
			time2: {
				value: time
			},
			thing4: {
				value: cons?cons:'无'
			}
		}
	};

	return send_res;
}

function getTime(nS) {
	var date = new Date(parseInt(nS));
	var year = date.getFullYear();
	var mon = date.getMonth() + 1;
	var day = date.getDate();
	var hours = date.getHours();
	var minu = date.getMinutes();
	var sec = date.getSeconds();

	return year + '年' + mon + '月' + day + '日' + ' ' + hours + ':' + minu;
}

exports.main = async (event, context) => {

	let sql = db.collection('PublishQueue').where({
		push_time: _.lte(new Date().getTime()),
		is_push: 0
	});
	let {data} = await sql.get();

	// let res = await sql.update({data: {is_push: 1}});  //把查到的数据都改成 1 正在发送

	for (let i = 0; i < data.length; i++) {

		let {_openid: openid,medication_id,push_time,_id} = data[i];

		let {data:[{medication_reminder}]} = await db.collection('Member').where({_openid: openid}).get();
		
		let state = 3; //0未推送 1在推送队列中 2已推送 3推送失败 4因为推送次数不够所以没推送 如果当前时间大于需要推送的时间表明已经过期 所以设置为已推送

		if(medication_reminder>0){  //如果订阅次数大于等于0

			let {data: {name,cons}} = await db.collection('MedicationInfo').doc(medication_id).get();
			
			try {
	
				let send_res = await cloud.openapi.subscribeMessage.send(make_json({openid,name,time: getTime(push_time),cons}));
	
				db.collection('Member').where({_openid: openid}).update({data: {medication_reminder:_.inc(-1)}});
	
				state = 2;
	
			} catch (error) {
				console.log(error);
				return error;
				// state = 3;
			}
		}else{
			state = 4;
		}



		await db.collection('PublishQueue').doc(_id).update({
			data: {
				is_push: state
			},
		})
		// return make_json({openid,name,time:getTime(push_time)});
	}
	return {
		data,
		// res
	};



}
