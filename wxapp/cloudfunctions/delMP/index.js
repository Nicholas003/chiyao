// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let {id} = event;
  var state = 0; 
  try {
    let {stats:{removed}} = await db.collection('MedicationInfo').doc(id).remove();
	let {stats:{removed:p_removed}} = await db.collection('PublishQueue').where({medication_id:id}).remove();
    state=1
  } catch (error) {
    state=0
  }
  
  
  return {
    state
  }
}