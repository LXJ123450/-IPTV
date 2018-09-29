var timeNum = document.getElementById("time");
//接收URL参数
var username = XEpg.Util.getUrlParam(document.URL, "username"); 
var taskid = XEpg.Util.getUrlParam(document.URL, "taskid");
var resultData = null;
var url = '';
var content = '';
var pagetimer = null;

var mp = null;
var nativePlayerInstanceId = null;
var checktimer = null;
var mp3url = 'http://110.190.92.72/musics/3.mp3';


window.onunload = function(){
	stopMusic();
	clearInterval(checktimer);	
};


window.onload = function()
{
	url = './happytv/user/' + username + '/task/' + taskid + '/ad';
	content = "username=" + username + "&task=" + taskid;
	XEpg.Util.ajaxPost(url, content, function(e)
	{
		var res = JSON.parse(e);
		console.log("res:"+JSON.stringify(res));		
		if(res.code == 0)
		{
			resultData = res.data;
			console.log(resultData.task.task); 
			if(resultData.task.task == null){
				document.getElementById("adimg").src =   "../images/ad/ad.gif";    
			}else{
				document.getElementById("adimg").src =   resultData.task.task;    
			} 
		}else{
			resultData = null;
		}
	});

	// 15秒后跳转
	pagetimer = setInterval(function(){
	timeNum.innerHTML--;
	if(timeNum.innerHTML == 0){
		location.href="./Lottery.html?" + "username=" + username + "&taskid=" + taskid;
		clearInterval(pagetimer);
	}
	},1000);

	//循环播放音乐
	playMusic(mp3url);
	checktimer = setInterval(checkEnd,1000);
};

function playMusic(url){
	var mp3url = url;
	mp = new MediaPlayer();
	var json = '';
		json += '[{mediaUrl:"'+ mp3url +'",';
		json +=	'mediaCode: "jsoncode1",';
		json +=	'mediaType:4,';
		json +=	'audioType:2,';
		json +=	'videoType:1,';
		json +=	'streamType:1,';
		json +=	'drmType:1,';
		json +=	'fingerPrint:0,';
		json +=	'copyProtection:1,';
		json +=	'allowTrickmode:1,';
		json +=	'startTime:0,';
		json +=	'endTime:2000.3,';
		json +=	'entryID:"jsonentry1"}]';
	//全屏播放
	nativePlayerInstanceId = mp.getNativePlayerInstanceID();
	mp.setSingleMedia(json);	
	mp.playFromStart();//开始播放
}

function stopMusic(){
	if(mp){
		mp.releaseMediaPlayer(nativePlayerInstanceId);
		mp.stop();
	}		
}

function checkEnd(){	
	var curTime = mp.getCurrentPlayTime();
	var allTime = mp.getMediaDuration();
	if(!curTime){
		return;
	}	
	if((allTime == curTime) && (curTime != 0)  && (curTime != undefined)){
		stopMusic();
		playMusic(mp3url);		
	}
} 
