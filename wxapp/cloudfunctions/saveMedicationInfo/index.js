// 云函数入口文件
process.env.TZ = "Asia/Shanghai";

const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数

function get_time(in_time){
  let date = new Date();

  let time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${in_time}:00`;

  return new Date(time).getTime();
}

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  event.created_at = new Date().getTime();
  event.on = 1;   //1表示打开

  event.end_time = event.end_time?new Date(event.end_time).getTime():new Date().getTime()+60 * 60 * 1000 * 24 * 30;

  //没有结束时间则设置为30天
  
  let res = await db.collection('MedicationInfo').add({
    data:event
  });

  for(let i=0;i<event.medication_time.length;i++){
    event.medication_time[i] = get_time(event.medication_time[i]);
  }
  
  if(event.cycle==0||event.repeat_week.includes(new Date().getDay())){

    for(let i=0;i<event.medication_time.length;i++){

      let data = {
        push_time:event.medication_time[i],                             //需要发送的时间
        _openid:event.userInfo.openId,
        medication_id:res._id,                                          //药物信息的id
        is_push:new Date().getTime()>event.medication_time[i]?2:0,      //0未推送 1再推送队列中 2已推送 3推送失败  如果当前时间大于需要推送的时间表明已经过期 所以设置为已推送
        confirm:0,                                                      //是否完成  0未完成  1已完成
        name:event.name,
        cons:event.cons||'',
        created_at:new Date().getTime(),
        updata_at:new Date().getTime(),
      }
      await db.collection('PublishQueue').add({data});
    }
    
  }

  


  return res;
}