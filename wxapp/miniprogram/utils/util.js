const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getUnix = ()=>{
  let date = new Date();
  return date.getTime();
}

// 获取今天0点0分0秒的时间戳
// const getTodayUnix = ()=>{
//   let date = new Date();
//   date.setHours(0);
//   date.setMinutes(0);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date.getTime();
// }


// const getYearUnix = ()=>{
//   let date = new Date();
//   date.setMonth(0);
//   date.setDate(1);
//   date.setHours(0);
//   date.setMinutes(0);
//   date.setSeconds(0);
//   date.setMilliseconds(0);
//   return date.getTime();
// }

// const getLastDate = (time)=>{
//   let date = new Date(time);
//   let month = date.getMonth() + 1 < 10 ?
//       '0' + (date.getMonth() + 1) : date.getMonth() + 1;
//   let day = date.getDate() < 10 ?
//       "0" + date.getDate() : date.getDate();
//   return date.getFullYear() + '-' + month + '-' + day;
// }

// const getFormatTime = (timestamp)=>{
//   let now = getUnix();
//   let today = getTodayUnix();
//   let year = getYearUnix();
//   let timer = Math.abs((now - timestamp) / 1000); //转化为秒级时间戳
//   let tip = '';
// console.log(now +'-'+ timestamp)
//   if (timer <= 0) {
//       tip = '刚刚'+Math.floor(timer / 60);
//   } else if (Math.floor(timer / 60) <= 0) {
//       tip = Math.floor(timer / 60)
//   } else if (timer < 3600) {
//       tip = Math.floor(timer / 60) + '分钟';
//   } else if (timer >= 3600 && (timestamp - today >= 0)) {
//       tip = Math.floor(timer / 3600) + '小时';
//   } else if (timer / 84600 <= 31) {
//       tip = Math.ceil(timer / 86400) + '天前';
//   } else {
//       tip = getLastDate(timestamp);
//   }
//   return tip;
// }
function getFormatTime (startTime){
    var s1 = new Date(startTime),
    s2 = new Date(),
    runTime = Math.abs(parseInt((s2.getTime() - s1.getTime()) / 1000));
	
    var year = Math.floor(runTime / 86400 / 365);
    runTime = runTime % (86400 * 365);
    var month = Math.floor(runTime / 86400 / 30);
    runTime = runTime % (86400 * 30);
    var day = Math.floor(runTime / 86400);
    runTime = runTime % 86400;
    var hour = Math.floor(runTime / 3600);
	// console.log(`${runTime}/3600`)
    runTime = runTime % 3600;
    var minute = Math.floor(runTime / 60);
    runTime = runTime % 60;
    var second = runTime;
   // console.log(year,month,day,hour,minute,second);
　　return [Math.abs(hour),Math.abs(minute),Math.abs(second)];
 
}  
export {
  formatTime,getFormatTime
}
