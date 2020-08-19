// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

const _ = db.command;

每天零点执行

// 云函数入口函数
exports.main = async (event, context) => {

  let res = db.collection('MedicationInfo').where(_.or([
    {
      cycle: 0                                 //获取每天都需要推送消息的的
    },
    {
      repeat_week: new Date().getDay()        // 或者发送的星期是今天的
    }
  ])).get()

  // let res = await db.collection('MedicationInfo').where({
  //   "cycle": 1
  // }).get();

  return res;
}