try{	
	var round = 0;
	var curQuestionIndex = 0;
	//接收URL参数
	var username = XEpg.Util.getUrlParam(document.URL, "username"); 
	var taskid = XEpg.Util.getUrlParam(document.URL, "taskid");
	console.log("username:" + username);
	console.log("taskid:" + taskid);
	var resultData = null;
	var questionCount = -1;
	var questionIndex = -1;
	var quizStatus = -1;
	var quizid = 'quizid';
	
	var mp = null;
	var nativePlayerInstanceId = null;
	var checktimer = null;
	var mp3url = 'http://110.190.92.72/musics/4.mp3';
		

	
}catch(e){
	console.log("error:" + e.message);
}

window.onload=function()
{
	//初始化题
	init();	

	//循环播放音乐
	playMusic(mp3url);
	checktimer = setInterval(checkEnd,1000);

}

function clearFocus(){
	document.getElementById('option_1').className  = "option-item option-one";
	document.getElementById('option_2').className  = "option-item option-two";
	document.getElementById('option_3').className  = "option-item option-three";
	document.getElementById('option_4').className  = "option-item option-four";
	document.getElementById('continue').className  = "";
	document.getElementById('to-card').className  = "";
}

function changeFocus(){
	clearFocus();
	switch(cursel){
		case 1:
		    document.getElementById('option_1').className  = "option-item option-one quesBorder";
			break;
		case 2:
		    document.getElementById('option_2').className  = "option-item option-two quesBorder";
			break;
		case 3:
			document.getElementById('option_3').className  = "option-item option-three quesBorder";
			break;
		case 4:
			document.getElementById('option_4').className  = "option-item option-four quesBorder";
			break;
	}
	switch(confirmSel){
		case 1:
			document.getElementById('continue').className  = "border";
			break;
		case 2:
			document.getElementById('to-card').className  = "border";
			break;
	}
}

function init(){
	if(username == '' || username == null){
		return;
	}
	if(taskid == '' || taskid == null){
		return;
	}
	cursel = 1;
	confirmSel = 1;
	var url = './happytv/user/' + username + '/task/' + taskid + '/quiz';
	var content = "username=" + username + "&task=" + taskid;
	XEpg.Util.ajaxPost(url, content, function(e)
	{
		var res = JSON.parse(e);
		console.log("res:"+JSON.stringify(res));		
		if(res.code == 0)
		{
			resultData = res.data;
			questionCount = res.data.questionCount;
			questionIndex = res.data.questionIndex;
			quizid = res.data.quizId;
			showQuestion();
		}else{
			resultData = null;
		}
	});
}

function showQuestion(){
	document.getElementById('numTitle').innerHTML = '第' + questionIndex  + '/' + questionCount + '题';
	document.getElementById('quzTitle').innerHTML = resultData.question.description;
	document.getElementById('option_1').innerHTML = resultData.question.options[0];
	document.getElementById('option_2').innerHTML = resultData.question.options[1];
	document.getElementById('option_3').innerHTML = resultData.question.options[2];
	document.getElementById('option_4').innerHTML = resultData.question.options[3];	
	cursel = 1;
	changeFocus();
}

function verifyAnswer(){
	if(username == '' || username == null){
		return;
	}
	if(taskid == '' || taskid == null){
		return;
	}
	if(questionIndex == undefined || questionIndex == null){
		return;
	}
	
	var url = './happytv/user/' + username + '/quiz/' + quizid + '/question/' + questionIndex + '/answer/' + (cursel - 1);
	var content = "username=" + username + "&quiz=" + taskid + '&index=' + questionIndex + '&answer=' + cursel;
	XEpg.Util.ajaxPost(url, content, function(e)
	{
		var res = JSON.parse(e);
		console.log("res:"+JSON.stringify(res));		
		if(res.code == 0)
		{
			resultData = res.data;
			quizStatus = resultData.quizStatus;
			questionIndex = resultData.questionIndex;
			
			if(quizStatus == 2){
				var str = "Lottery.html?" + "username=" +  username + "&taskid=" + taskid;
				XEpg.Util.gotoPage(str);	
			}else if(quizStatus == 0){
				showQuestion();
			}else if(quizStatus == 1){
				document.getElementById("result-wrong").style.display = 'block';
				document.getElementById("quizId").innerHTML = "题目编号："+resultData.questionId;

				isErrorConfim = true;
				//XEpg.Util.gotoPage(str);	
			}
		}else{
			//XEpg.Util.gotoPage("lottery.html?" + "username=" +  username + "&taskid=" + taskid);
		}
	});
}

function gotoConfirmPage(){
	switch(confirmSel){
		case 1://继续答题
			document.getElementById("result-wrong").style.display = 'none';
			isErrorConfim = false;
			init();
			//刷新题目
			break;
		case 2://回到翻牌页
			XEpg.Util.gotoPage("./cards.html?phoneNum=" + username + "&topsetid=" + 'xxxxxx');
			break;
	}
}

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




