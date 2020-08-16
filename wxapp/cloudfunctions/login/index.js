// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();



exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext();

  let member = await db.collection('Member').where({
    _openid: wxContext.OPENID
  }).get();

  let has = member.data.length > 0 ? true : false; //检测用户是否存在

  let id;

  if (has) {

    id = member.data[0]._id;

  } else {

    let {_id} = await db.collection('Member').add({
      data: {
        'medication_reminder': 0,
        'created_at': parseInt(new Date().getTime() / 1000),
        'last_login_at': parseInt(new Date().getTime() / 1000),
        '_openid':wxContext.OPENID
      }
    });

    id = _id;
  }

  return {
    id
  };
  // console.log(event)
  // console.log(context);


  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  //   env: wxContext.ENV,
  // }
}