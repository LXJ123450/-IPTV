var pic_head = "http://182.140.237.80:8109/";//图片路径

//跳转的列表页类型数组
var gotoPageArray = ['','picList.jsp','textlist.jsp','categoryList.jsp','mixList.jsp','hmfw.jsp','lyfw.jsp','peopleList.jsp','bus.jsp','question.jsp','inquiry.jsp','picture.jsp','tips.jsp'];
var pageTitleArray = [];
var titlecookie = XEpg.Util.getCookie("titleCookie");
if(titlecookie!=""){
	pageTitleArray = eval("("+titlecookie+")");
}
var EPGname = XEpg.Util.getCookie("EPGname");
if(EPGname!=""&&EPGname!=null){
	XEpg.$('EPGname').html(EPGname);
}
var EPGpic = XEpg.Util.getCookie("EPGpic");
if(EPGpic!=""&&EPGpic!=null){
	XEpg.$('EPGpic').attr("src",EPGpic);
}
/**
 * 获取当前的日期和时间
 * @return {[type]} [description]
 */
function getTime() {
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
	var timer = weekDay + ' ' + hour + ":" + minute
	XEpg.$("date").html(date);
	XEpg.$("time").html(timer);
	setTimeout("getTime()", 60000)
}

//code补全32位
function codeComplete(id){
    var completeCode = "00000000000000000000000000000000";//32个0
    var playCode = "";
    if(id){
        if(id.length >= 32){
            playCode = id;
        }else{
            id = "3" + completeCode.substring(0,(32-(id+"").length-1))+ id;
            playCode = id;
        }
    }
    return playCode;
}


function getResult(param){
	var temp=param.split(">");
	var tempKey=new Array();
	var tempValue=new Array();
	var result={};
	for(var i in temp){
		if(i%2==0){
			tempKey.push(temp[i].substring(1,temp[i].length));
		}else{
			tempValue.push(temp[i].substring(0,temp[i].indexOf("<")));
		}
	}
	for(var i in tempKey){
		result[tempKey[i]]=tempValue[i];
	}
	return result;
}


//code补全22位
function codeComplete22(id){
    var completeCode = "0000000000000000000000";//32个0
    var playCode = "";
	//生成随机数
	var Num=""; 
	for(var i=0;i<5;i++){ 
		Num+=Math.floor(Math.random()*10); 
	} 
    if(id){
        if(id.length >= 22){
            playCode = id;
        }else{
            id = "3" + Num + completeCode.substring(0,(17-(id+"").length-1))+ id;
            playCode = id;
        }
    }
    return playCode;
}



function getUnencodeUrlParams(){
	var currentEncodeUrl = document.URL;//获取当前URL
	//var currentEncodeUrl = "epgtest.jsp?INFO=%3CuserId%3EHGZS16@ITVP%3C/userId%3E%3CuserToken%3E0D51E03A316F36949284C48C57327C32%3C/userToken%3E%3CTokenExpiretime%3E20170408163922%3C/TokenExpiretime%3E%3CGroupId%3E1%3C/GroupId%3E%3CuserIP%3E10.161.232.231%3C/userIP%3E%3CareaCode%3E10026%3C/areaCode%3E%3CTradeId%3E1%3C/TradeId%3E%3Ckey%3E4%3A2%3C/key%3E%3CstbId%3E00100199006021011120210HB7151799%3C/stbId%3E%3CVAStoEPG%3E%3C/VAStoEPG%3E%3Cback_epg_url%3Ehttp%3A%2F%2F182.139.242.84%3A33200%2FEPG%2Fjsp%2FSTZB%2Fen%2FjumpTransPage.jsp%3C/back_epg_url%3E%3Cback_epg_url_par%3E%3C/back_epg_url_par%3E%3CoptFlag%3EKALAOK%3C/optFlag%3E%3CepgPlatform%3E2%3C/epgPlatform%3E";
  	var currentUnencodeUrl = decodeURIComponent(currentEncodeUrl);//解码URL
  	var params = XEpg.Util.getUrlParameterObj(currentUnencodeUrl);//获取URL参数
  	return params;
}
