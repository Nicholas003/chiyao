// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  let { OPENID } = wxContext;


  let send_res = {
    touser:'o_PkU0crNK1UbY4Vepn-iiP0DliY',
    page:"/pages/home/home",
    templateId: 'UsFM7aGRTyt9QAnRaSIiWyH6exT1z58qvs9Om2cutRc',
    data:{
      thing1: {
        value: '339208499'
      },
      time2: {
        value: '2019年10月1日 15:01'
      },
      thing3: {
        value: 'TIT创意园'
      },
      thing6: {
        value: '广州市新港中路397号'
      }
    }
  };

  try{

    let res = await cloud.openapi.subscribeMessage.send(send_res);

    return res;

  }catch(err){

    return err;

  }
  


  return res;
}