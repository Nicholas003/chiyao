const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.get({
        path: 'pages/add/add?id='+event._id,
        width: 430
      })
    return result
  } catch (err) {
    return err
  }
}