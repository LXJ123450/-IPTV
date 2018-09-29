try{
	//接收URL参数
  var prize = XEpg.Util.getUrlParam(document.URL, "prize");
  //接收URL参数
	var username = XEpg.Util.getUrlParam(document.URL, "username");
	var taskid = XEpg.Util.getUrlParam(document.URL, "taskid");
}catch(e){
	console.log("error:" + e.message);
}



window.onload = function(){
  document.getElementById("resultInfo").innerHTML = prize;
  document.getElementById("time").innerHTML = getCurTimeStr();
};


/**
 * 获取当前的日期和时间
 * @return {[type]} [description]
 */
function getCurTimeStr() {
	var week = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
	var time = new Date();
	var weekDay = time.getDay();// 获取星期
	var day = time.getDate();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	//var year=time.getFullYear();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	for (var i = 0; i < week.length; i++) {
		if (weekDay == i) {
			weekDay = week[i];
		}
	}

	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	
	if (second < 10) {
		second = "0" + second;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}

	var date = year + '-' + month + '-' + day;
	return date;
	
}