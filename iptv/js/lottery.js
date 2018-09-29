
try{
	//接收URL参数
  var username = XEpg.Util.getUrlParam(document.URL, "username");
  var taskid = XEpg.Util.getUrlParam(document.URL, "taskid");
	
  var resultData = null;
  var prize = null;
  var winnerInfo = null;
  var winnerUsers = null;
  var winnerUsers2 = null;
  var myprize = null;
  var prizeInfo = null;
  var prizeInfo2 = null;
  var imgs = null;
  var game_timer = null;
  var index = 0;
  var len = 24;
  var targetNum = -1;
  
  var winnerTimer = null;
  var bStop = false;
  var curPrize = null;

  var bThankyou = false;

  var mp = null;
	var nativePlayerInstanceId = null;
	var checktimer = null;
	var mp3url = 'http://110.190.92.72/musics/3.mp3';


  //var prize = XEpg.Util.getUrlParam(document.URL, "prize");;	
}catch(e){
	console.log("error:" + e.message);
}

// 滚动动画---获取DOM 元素  
function winnerRoll(){  
  if(winnerUsers2.offsetTop - winnerInfo.scrollTop <= 0){
    winnerInfo.scrollTop -= winnerUsers.offsetHeight;
  }else{
    winnerInfo.scrollTop++;
  }
}

window.onload = function(){
  //document.getElementById("log").innerHTML = "v:0.9.9.0:";
 
  imgs = document.querySelectorAll("#rotate img");
  len = imgs.length;
  winnerInfo=document.getElementById("winnerInfo");
  winnerUsers = document.getElementById("winnerUsers");
  winnerUsers2 = document.getElementById("winnerUsers2");

  setInterval(myAwardRoll,60);
  winnerTimer=setInterval(winnerRoll,60);
  //document.getElementById("log").innerHTML += "1:" + winnerTimer;
  // 手机号码替换
  // 获取所有手机号码
  var phoneArr=document.querySelectorAll("span.phoneNum");
  for(var i=0; i<phoneArr.length;i++){
    phoneArr[i].innerHTML = phoneArr[i].innerHTML.substr(0,3)+"****"+phoneArr[i].innerHTML.substr(7);
  }
  //document.getElementById("log").innerHTML += "2:";
  //循环播放音乐
	playMusic(mp3url);
	checktimer = setInterval(checkEnd,1000);
  
};
//中将用户信息
usersAnima();
  



function game_stop(){
  bStop = true;
}

function goResult(){
  if(prize != '0'){
    XEpg.Util.gotoPage("./result.html?prize=" + curPrize + "&username=" + username + "&taskid=" + taskid);
  }
}

function game_round(num){
  bStop = false;
  targetNum = num;
  if(game_timer){
    clearInterval(game_timer); 
    game_timer = null;
  }
  game_timer = setInterval(play,25);
  //document.getElementById("log").innerHTML += "7:" + game_timer; 
  setTimeout("game_stop()", 3000);  
}

function play(){  
  if(bStop == true && targetNum == index){
    clearInterval(game_timer); 
    changePic( index );
    if(prize == '0'){
      bThankyou = true;
      document.getElementById("sad-result").style.display = 'block';
    }else{
      setTimeout("goResult()",2000);
    }
  }
  index++;
  if(index >= len){
    index = 0;
  }
  changePic( index );
}


function changePic( curIndex ){
  for(var i=0; i<len; i++){
    imgs[i].className = " ";
  }
  imgs[curIndex].className = "show";
}



function lottery_1(){
  var randNum = Math.round(Math.random()*23); 
 // document.getElementById("log").innerHTML += "3:" + randNum;  
	if(username == '' || username == null || username == 'null'){
    game_round(randNum);
    //document.getElementById("log").innerHTML += "4:" + randNum;  
		return;
	}
	if(taskid == '' || taskid == null || taskid == 'null'){
    //document.getElementById("log").innerHTML += "5:" + randNum;
    game_round(randNum);
		return;
	}
	var url = './happytv/user/' + username + '/task/' + taskid + '/lottery';
	var content = "username=" + username + "&taskId=" + taskid;
	XEpg.Util.ajaxPost(url, content, function(e)
	{
		var res = JSON.parse(e);
		console.log("res:"+JSON.stringify(res));		
		if(res.code == 0)
		{
      resultData = res.data;
      prize = resultData.prize.grp;
      
      curPrize = resultData.prize.name;
      
      rotate_1(prize);
      console.log("prize:"+JSON.stringify(prize));

		}else{
      //document.getElementById("log").innerHTML += "6:" + randNum;
      resultData = null;
      prize = "";      
      curPrize = "";
		}
	});
}

function rotate_1(prize){
  
  if(prize == null || prize == undefined){
    return;
  }
  switch(prize){
    case 'iphone8':
      game_round(0);      
      break;
    case '0':
      game_round(3);
      break;
    case '小米充电宝':
      game_round(8);
      break;
    case '积分':
      game_round(12);
      break;
    case '神秘大奖':
      game_round(16);
      break;  
    case '健康电子称':
      game_round(20);
      break;
    }
}



function lottery(){
	if(username == '' || username == null || username == 'null'){
    $('#rotate').rotate({
      angle: 240,
      animateTo: 1860,
      duration: 8000,
      callback: function () {
      }
    });
		return;
	}
	if(taskid == '' || taskid == null || taskid == 'null'){
    $('#rotate').rotate({
      angle: 240,
      animateTo: 1860,
      duration: 8000,
      callback: function () {
      }
    });
		return;
	}
	var url = './happytv/user/' + username + '/task/' + taskid + '/lottery';
	var content = "username=" + username + "&taskId=" + taskid;
	XEpg.Util.ajaxPost(url, content, function(e)
	{
		var res = JSON.parse(e);
		console.log("res:"+JSON.stringify(res));		
		if(res.code == 0)
		{
      resultData = res.data;
      prize = resultData.prize.grp;
      rotate(prize);
      console.log("prize:"+JSON.stringify(prize));	
		}else{
			resultData = null;
		}
	});
}

function rotate(prize){
  if(prize == null || prize == undefined){
    return;
  }
  switch(prize){
    case 'iphone8':
      $('#rotate').rotate({
        angle: 0,
        animateTo: 1800,
        duration: 8000,
        callback: function () {
        }
      });
      break;
    case '健康电子称':
      $('#rotate').rotate({
        angle: 60,
        animateTo: 1800,
        duration: 8000,
        callback: function () {
        }
      });
      break;
    case 'I视视流量':
      $('#rotate').rotate({
        angle: 120,
        animateTo: 1800,
        duration: 8000,
        callback: function () {
        }
      });
      break;
    case '积分':
      $('#rotate').rotate({
        angle: 180,
        animateTo: 1800,
        duration: 8000,
        callback: function () {
        }
      });
      break;
    case '小米充电宝':
      $('#rotate').rotate({
        angle: 240,
        animateTo: 1800,
        duration: 8000,
        callback: function () {
        }
      });
      break;
    case 0:
      $('#rotate').rotate({
        angle: 300,
        animateTo: 1800,
        duration: 8000,
        callback: function () {
        }
      });
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

function usersAnima(){
	XEpg.Util.ajaxGet("./happytv/prize/users?n=100",function(res){
    var res = JSON.parse(res);
    console.log(res);
		if(res.data.length<50){
			virtualData();
		}else{
			var html='';
			for(var i=0;i<res.data.length;i++){
				var infos = res.data[i];
				html +='<p>用户<span class="phoneNum">'+infos.username+"</span>抽中了"+infos.prize.name+"</p>";
			}
			document.getElementById("winnerUsers").innerHTML=html;
			var phoneArr=document.querySelectorAll("span.phoneNum");
			cWinnerUser = document.getElementById("winnerBox");
			cwinnerUsers = document.getElementById("winnerInfo");
			cwinnerUsers2 = document.getElementById("winnerUsers2");
      cwinnerUsers2.innerHTML = cwinnerUsers.innerHTML;
      
			for(var i=0; i<phoneArr.length;i++){
				phoneArr[i].innerHTML=phoneArr[i].innerHTML.substr(0,3)+"****"+phoneArr[i].innerHTML.substr(7);
			}
		}
		
	});
}

function virtualData(){
	var html=" ";
	var awardInfos1 = ['小米充电宝', '健康电子秤', '获得Cherry键盘', '神秘大奖', '100积分', '200积分','300积分','空气净化器','kindle阅读器','漫步者音箱','台灯','国内外名著书籍'];
	var telFront = ['173', '177', '183', '133', '153', '180', '181', '189'];
	var telEnd1 = rnd(1000, 9999);
	for(var i=0;i<100;i++){
		html += '<p>用户<span class="phoneNum">'+telFront[rnd(0,7)]+"****"+rnd(1000,9999)+"</span>抽中了"+awardInfos1[rnd(0,4)];+"</p>";
	}
	document.getElementById("winnerUsers").innerHTML=html;
	cWinnerUser = document.getElementById("winnerBox");
  cwinnerUsers = document.getElementById("winnerInfo");
  cwinnerUsers2 = document.getElementById("winnerUsers2");
  cwinnerUsers2.innerHTML = cwinnerUsers.innerHTML;
	winnerUsers2.innerHTML = cwinnerUsers.innerHTML;
} 
function rnd(n, m) {
	return Math.floor(Math.random() * (m - n + 1) + n)
}

myPrize = document.getElementById("myPrize");
prizeInfo = document.getElementById("prizeInfo");
prizeInfo2 = document.getElementById("prizeInfo2");

function myAwardRoll(){	
	if(prizeInfo2.offsetTop - myPrize.scrollTop <= 0){
		myPrize.scrollTop -= prizeInfo.offsetHeight;
	}else{
		myPrize.scrollTop++;
	}
}

Date.prototype.toLocaleString = function() {
  return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
};

checkWard(username);
function checkWard(user){
  XEpg.Util.ajaxGet("./happytv/user/"+username,function(res){
    var res = JSON.parse(res);
    console.log(res);
    var myInfo = res.data.user.prizes;
    var html = '';
    var times = [];
    for(var i=0; i<myInfo.length; i++){
      var info = myInfo[i];
      times.push(parseInt(info.ts));
      prizeType = info.type;
      address = info.addrName;
      html +="<p>"+ "<span>"+info.name+"</span>"+
      "<span>"+new Date(times[i]).toLocaleString()+"</span>";
      if(address == null&&(prizeType == 1 ||prizeType == 4 ||prizeType == 5 || prizeType == 2)){
        html += "<span>待领取</span>";
      }else{
          html += "<span>已领取</span>";
      }
        html += "</p>"
       if(myInfo.length < 3){
         document.getElementById("prizeInfo").innerHTML=html;
       }else{
        document.getElementById("prizeInfo").innerHTML=html;
        prizeInfo2.innerHTML = prizeInfo.innerHTML;
       }
      
    }
  });
  
}

