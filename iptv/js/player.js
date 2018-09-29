var nativePlayerInstanceId = null;
var resultData = null;
var checktimer = null;
var url = 'http://118.123.60.14:8106/fonsview_hpd/fh_2018072487';
// var url2 = 'http://118.123.60.84:8006/scclsypd/movi7da4b93cf2942cc944835d17.mp4'
var url2 = null;

//接收URL参数
var username = XEpg.Util.getUrlParam(document.URL, "username"); 
var taskid = XEpg.Util.getUrlParam(document.URL, "taskid");
var mp = null;

function destroy(){
	clearInterval(checktimer);
	if(mp){
		mp.releaseMediaPlayer(nativePlayerInstanceId);
		mp.stop();
	}		
}


function isEnd(){
	
	var curTime = mp.getCurrentPlayTime();
	var allTime = mp.getMediaDuration();
	
	//document.getElementById("echo").innerHTML += " curTime:" + curTime;
	//document.getElementById("echo").innerHTML += " allTime:" + allTime;
	var times = document.getElementById("time");
	times.innerHTML = allTime - curTime;
	if((allTime == curTime) && (curTime != 0)){
		clearInterval(checktimer);
		mp.releaseMediaPlayer(nativePlayerInstanceId);
		window.location.href = "Lottery.html?" + "username=" + username + "&taskid=" + taskid;
	}
} 

function playVideo(){	
	
	mp = new MediaPlayer();
	var instanceId 			= mp.getNativePlayerInstanceID();
	var playListFlag 		= 0;
	var videoDisplayMode 	= 0; 		// 0-自定义尺寸,1-全屏(默认),255-不显示在背后播放
	var height 				= 300;
	var width 				= 500;
	var left 				= 200; 		// 自定义尺寸必须指定
	var top		 			= 200;  		// 自定义尺寸必须指定
	var muteFlag 			= 0; 		// 0-有声(默认),1-静音
	var useNativeUIFlag 	= 1; 		// 0-不使用player的本地UI显示功能,1-使用player的本地UI显示功能(默认)
	var subtitleFlag 		= 0; 		// 0-不显示字幕(默认),1-显示字幕
	var videoAlpha 			= 0; 		// 0-不透明(默认),100-完全透明
	var cycleFlag 			= 1;		// 0-设置为循环播放（默认值）, 1-设置为单次播放 
	var randomFlag 			= 0;
	var autoDelFlag 		= 0;
	nativePlayerInstanceId = mp.getNativePlayerInstanceID();
	//mpeg2 ts流播放
	var json = '';
		json += '[{mediaUrl:"' + url + '",';
		json +=	'mediaCode: "jsoncode1",';
		json +=	'mediaType:2,';
		json +=	'audioType:1,';
		json +=	'videoType:1,';
		json +=	'streamType:1,';
		json +=	'drmType:1,';
		json +=	'fingerPrint:0,';
		json +=	'copyProtection:1,';
		json +=	'allowTrickmode:1,';
		json +=	'startTime:0,';
		json +=	'endTime:2000.3,';
		json +=	'entryID:"jsonentry1"}]';
	//mp4 流播放
	var json2 = '';
		json2 += '[{mediaUrl:"' + url2 + '",';
		json2 +=	'mediaCode: "jsoncode1",';
		json2 +=	'mediaType:2,';
		json2 +=	'audioType:4,';
		json2 +=	'videoType:3,';
		json2 +=	'streamType:3,';
		json2 +=	'drmType:1,';
		json2 +=	'fingerPrint:0,';
		json2 +=	'copyProtection:1,';
		json2 +=	'allowTrickmode:1,';
		json2 +=	'startTime:0,';
		json2 +=	'endTime:3000,';
		json2 +=	'entryID:"jsonentry1"}]';

	//全屏播放
	mp.setSingleMedia(json2);
	mp.setVideoDisplayMode(1);
	mp.refreshVideoDisplay();
	mp.playFromStart();
	
	checktimer = setInterval(isEnd,1000);
}


function init(){
	var dataurl = './happytv/user/' + username + '/task/' + taskid + '/ad';
	var content = "username=" + username + "&task=" + taskid;
	XEpg.Util.ajaxPost(dataurl, content, function(e)
	{
		var res = JSON.parse(e);
		console.log("res:"+JSON.stringify(res));		
		if(res.code == 0){
			resultData = res.data;
			if(resultData.task.task == null){
				url2 = 'http://118.123.60.84:8006/scclsypd/movi7da4b93cf2942cc944835d17.mp4';
			}else{
				url2 = resultData.task.task;
			}
			playVideo();
		}else{
			resultData = null;
		}
	});
}

