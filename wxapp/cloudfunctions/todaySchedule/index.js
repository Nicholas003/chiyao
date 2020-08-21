// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

let start = Math.round(new Date().setHours(0,0,0,0));// 当天0点

let end = Math.round(new Date().setHours(23,59,59,999)); //今晚0点

const db = cloud.database();

const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  let {OPENID:openid} = wxContext;

  let {data} = await db.collection('PublishQueue').where({

    _openid:openid,
    push_time:_.gte(start).and(_.lt(end))

  }).orderBy('push_time','asc').get()

  return {
    data
  }
}