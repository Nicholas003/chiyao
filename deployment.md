
## 开始
***
下载代码 

导入到云开发的小程序中

把 [app.js](wxapp/miniprogram/app.js "去查看") 中env修改成自己的环境id

把页面中 [my.js](wxapp/miniprogram/pages/my/my.js "去查看") 中第36行的tmplIds修改为自己的模板ID

把sendMessage云函数中 [index.js](wxapp/cloudfunctions/sendMessage/index.js "去查看") 中第19行的templateId修改为自己的模板id

#### 模板要求：

模板编号：9109

类目：办公

需要的字段： 日程、时间、备注

日程 {{thing1.DATA}}

时间 {{time2.DATA}}

备注 {{thing4.DATA}}



***

#### 新建合集（所有合集均没有初始数据）（共四个）
***
PublishQueue

合集用来存储推送队列

***

Member

存储用户信息
***
MedicationInfo

存储用户的药物信息 包括提醒时间 结束时间等
***
Drug                 

用来存放二维码中的药物信息   ！！注意次合集访问权限需改成所有用户均可读取
***


#### [页面信息](wxapp/miniprogram/)  （共4个页面） 
----

#### [云函数列表](wxapp/cloudfunctions/)  （共8个函数） 
 
##### （使用时请设置所有函数的环境变量 TZ设置为Asia/Shanghai 如不设置有8小时时差）

-----

[login](wxapp/cloudfunctions/login "去查看")  登录函数 存储用户信息

***

[saveMedicationInfo](wxapp/cloudfunctions/saveMedicationInfo "去查看")  保存药品信息 以及增加今日此药品推送队列   

***

[todaySchedule](wxapp/cloudfunctions/todaySchedule "去查看")  获取今日需要推送的列表

***

[delMP](wxapp/cloudfunctions/delMP "去查看")  删除药物信息的方法

***

[createdQrcode](wxapp/cloudfunctions/createdQrcode "去查看")  生成药物信息的小程序码

***

[getRemind](wxapp/cloudfunctions/getRemind "去查看") 获取我的药物信息

***

[addTask](wxapp/cloudfunctions/addTask "去查看") 每天零点添加全部明日需要提醒的信息   本函数需要上传触发器

***

[sendMessage](wxapp/cloudfunctions/sendMessage "去查看") 每分钟执行 查看此时有无需要提醒的消息  本函数需要上传触发器