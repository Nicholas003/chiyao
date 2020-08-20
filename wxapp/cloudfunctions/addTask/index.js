// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

const _ = db.command;

//每天零点执行

// function getTime() {

//   var nowdate = new Date().toLocaleDateString();
//   let now_arr = nowdate.split('/');
//   return `${now_arr[2]}-${now_arr[0]}-${now_arr[1]}`;
// }
function get_time(in_time){
  let date = new Date();

  let time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${in_time}:00`;

  return new Date(time).getTime();
}

// 云函数入口函数
exports.main = async (event, context) => {

  let {data} = await db.collection('MedicationInfo').where(_.or([
    {
      cycle: 0                                 //获取每天都需要推送消息的的
    },
    {
      repeat_week: new Date().getDay()        // 或者发送的星期是今天的
    }
  ])).get();

  for(let i=0;i<data.length;i++){
    let {medication_time} = data[i];
    // return data;
    for(let e=0;e<medication_time.length;e++){
      let add_data = {
        push_time:get_time(medication_time[e]),                             //需要发送的时间
        _openid:data[i].userInfo.openId,
        medication_id:data[i]._id,                                          //药物信息的id
        is_push:0,      //0未推送 1再推送队列中 2已推送 3推送失败  如果当前时间大于需要推送的时间表明已经过期 所以设置为已推送
        confirm:0,                                                      //是否完成  0未完成  1已完成
        created_at:new Date().getTime(),
        updata_at:new Date().getTime(),
      }
      await db.collection('PublishQueue').add({data:add_data});
      // return add_data;
    }
  }
}