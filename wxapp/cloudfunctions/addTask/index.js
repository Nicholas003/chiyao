// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

const _ = db.command;

//每天零点执行

function getTime() {
	var date = new Date();
	var year = date.getFullYear();
  var mon = date.getMonth() + 1;

  mon = mon[1]?mon:`0${mon}`;

  var day = date.getDate();
  
  // day = day[1]?day:`0${day}`;

	var hours = date.getHours();
	var minu = date.getMinutes();
	var sec = date.getSeconds();

	return  `${year}-${mon}-${day[1]}`;
}


// 云函数入口函数
exports.main = async (event, context) => {

  let res = db.collection('MedicationInfo').where(_.or([
    {
      cycle: 0                                 //获取每天都需要推送消息的的
    },
    {
      repeat_week: new Date().getDay()        // 或者发送的星期是今天的
    }
  ])).get();



  return getTime();
}