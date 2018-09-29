try {
	var urlParams = XEpg.Util.getUrlParameterObj(document.URL); //获取记录地址里的参数对象	
	var phoneNum = XEpg.Util.getUrlParam(document.URL, "phoneNum");
	var topsetid = XEpg.Util.getUrlParam(document.URL, "topsetid");
	console.log("urlParams:" + urlParams);
	console.log("phoneNum:" + phoneNum);
	console.log("topsetid:" + topsetid);
	var initData = null;
	var dynamicData = null;
	var taskid = null;
	var gameid = null;
	var prizeGrp = null;
	var bGameOver = false;

	// 页面抽奖用户滚动动画
	var cWinnerUser = null;
	var cwinnerUsers = null;
	var cwinnerUsers2 = null;

	//奖品滚动动画
	var prizeList = null;
	var list1 = null;
	var list2 = null;

	//积分排行动画
	var rank_content = null;
	var rank_box1 = null;
	var rank_box2 = null;
	//媒体播放
	var mp = null;
	var nativePlayerInstanceId = null;
	var checktimer = null;
	var cardsTimer
	var mp3url = 'http://110.190.92.72/musics/0.mp3';

} catch (e) {
	console.log("error:" + e.message);
}


window.onunload = function () {
	if (mp) {
		mp.releaseMediaPlayer(nativePlayerInstanceId);
		mp.stop();
	}
	if (checktimer) {
		clearInterval(checktimer);
	}
	if (cardsTimer){
		clearInterval(cardsTimer);
	}
}

window.onload = function () {
	XEpg.Util.setCookie("topsetid", topsetid);
	XEpg.Util.setCookie("phoneNum", phoneNum);
	var url = './happytv/user/' + phoneNum + '/game';
	var content = 'username=' + phoneNum;
	initGame(url, content);


	//document.getElementById("version").innerHTML = 'version:0.9.1 url: ' + document.URL;

	cardsTimer = setInterval(winnerRoll, 60);
	// 手机号码替换
	// 获取所有手机号码
	var phoneArr = document.querySelectorAll("span.phoneNum");

	for (var i = 0; i < phoneArr.length; i++) {
		phoneArr[i].innerHTML = phoneArr[i].innerHTML.substr(0, 3) + "****" + phoneArr[i].innerHTML.substr(7);
	}
	// 中奖用户信息动画
	realData();
	// 排行榜动画
	ranking();
	//奖品滚动动画
	prizescroll();
	//循环播放音乐
	playMusic(mp3url);
	checktimer = setInterval(checkEnd, 1000);
}
function winnerRoll() {
	if (cwinnerUsers2.offsetTop - cWinnerUser.scrollTop <= 0) {
		cWinnerUser.scrollTop -= cwinnerUsers.offsetHeight;
	} else {
		cWinnerUser.scrollTop++;
	}
}

function rankRoll() {
	if (rank_box2.offsetTop - rank_content.scrollTop <= 0) {
		rank_content.scrollTop -= rank_box1.offsetHeight;
	} else {
		rank_content.scrollTop++;
	}
}

function initGame(url, content) {
	XEpg.Util.ajaxPost(url, content, function (e) {
		var res = JSON.parse(e);
		console.log(res);
		if (res.code == 0) {
			initData = res.data;
			gameid = initData.game.id;
			document.getElementById("remainChance").innerHTML = res.data.userChance.gameChance
			document.getElementById("totalCredit").innerHTML = parseInt(res.data.userChance.credit) + parseInt(res.data.userChance.creditUsed);
		} else if (res.code == 205) {
			document.getElementById("remainChance").innerHTML = res.data.userChance.gameChance
			document.getElementById("totalCredit").innerHTML = parseInt(res.data.userChance.credit) + parseInt(res.data.userChance.creditUsed);
			document.getElementById("gameOver").style.display = 'block';
			bGameOver = true;
		} else {
			document.getElementById("totalCredit").innerHTML = 0;
			initData = null;
			console.log("res.msg:" + res.msg);
		}
	});
}

/**
 * 翻牌
 * @param {卡牌序号 1-9}} num 
 */
function noNetWorkflop(num) {
	setRowCol(num);
	changeFocus();
	switch (num) {
		case 1:
			showEnlargeResult(1);
			break;
		case 2:
			showEnlargeResult(2);
			break;
		case 3:
			showEnlargeResult(3);
			break;
		case 4:
			showEnlargeResult(4);
			break;
		case 5:
			showEnlargeResult(0);
			break;
		case 6:
			showEnlargeResult(1);
			break;
		case 7:
			showEnlargeResult(2);
			break;
		case 8:
			showEnlargeResult(3);
			break;
		case 9:
			showEnlargeResult(4);
			break;
		default:
			break;
	}
}

/**
 * 翻牌
 * @param {卡牌序号 1-9}} num 
 */
function flop(num) {
	setRowCol(num);
	//var url = './happytv/user/' + 13512345678 + '/game/' + initData.game.id + '/poker/' + (num - 1)
	var url = './happytv/user/' + phoneNum + '/game/' + initData.game.id + '/poker/' + (num - 1)

	var content = ''
	XEpg.Util.ajaxPost(url, content, function (e) {
		var res = JSON.parse(e);
		console.log("res:" + JSON.stringify(res));
		if (res.code == 0) {
			dynamicData = res.data;
			taskid = dynamicData.game.pokers[num - 1].task;
			prizeGrp = dynamicData.prize[num - 1].grp;
			showResult(num);

		} else if (res.code == 204) {
			//XEpg.Util.gotoPage(getTargetUrl(dynamicData.game.pokers[num -1].type));	
		} else {
			console.log("res.msg:" + res.msg);
		}
	});
}


/**
 * 
 * @param {翻牌结果类型} type 
 */
function showEnlargeResult(type) {
	switch (type) {
		case 0:
			document.getElementById('result-Info').style.display = 'block';
			document.getElementById('card_result').innerHTML = getCardInfo(type);
			document.getElementById('result-btn').innerHTML = getBtnText(type);
			document.getElementById('result-other').style.display = 'block';
			break;
		case 1:
			document.getElementById('result-Info').style.display = 'block';
			document.getElementById('card_result').innerHTML = getCardInfo(type);
			document.getElementById('result-btn').innerHTML = getBtnText(type);
			document.getElementById('result-other').style.display = 'block';
			break;
		case 2:
			document.getElementById('result-Info').style.display = 'block';
			document.getElementById('card_result').innerHTML = getCardInfo(type);
			document.getElementById('result-btn').innerHTML = getBtnText(type);
			document.getElementById('result-other').style.display = 'block';
			break;
		case 3:
			document.getElementById('result-Info').style.display = 'block';
			document.getElementById('card_result').innerHTML = getCardInfo(type);
			document.getElementById('result-btn').innerHTML = getBtnText(type);
			document.getElementById('result-other').style.display = 'block';
			break;
		case 4:
			document.getElementById('result-Info').style.display = 'block';
			document.getElementById('card_result').innerHTML = getCardInfo(type);
			document.getElementById('result-btn').innerHTML = getBtnText(type);
			document.getElementById('result-other').style.display = 'block';
			break;
	}
	curFlopType = type;
	isFloped = true;
	isModal = true;	
}

/**
 * cardrow 1 - 3
 * cardcol 1 - 3
 * cardindex (1 - 9)
 */
function getCardIndex() {
	var index = (cardrow - 1) * 3 + cardcol;
	return index;
}
/**
 * 设置卡牌坐标索引值
 * @param {按键数} num 
 */
function setRowCol(num) {
	switch (num) {
		case 1:
			cardrow = 1;
			cardcol = 1;
			break;
		case 2:
			cardrow = 1;
			cardcol = 2;
			break;
		case 3:
			cardrow = 1;
			cardcol = 3;
			break;
		case 4:
			cardrow = 2;
			cardcol = 1;
			break;
		case 5:
			cardrow = 2;
			cardcol = 2;
			break;
		case 6:
			cardrow = 2;
			cardcol = 3;
			break;
		case 7:
			cardrow = 3;
			cardcol = 1;
			break;
		case 8:
			cardrow = 3;
			cardcol = 2;
			break;
		case 9:
			cardrow = 3;
			cardcol = 3;
			break;
	}
}
/**
 * 消除卡牌焦点
 */
function clearFocus() {
	document.getElementById('card_1').className = 'item';
	document.getElementById('card_2').className = 'item';
	document.getElementById('card_3').className = 'item';
	document.getElementById('card_4').className = 'item';
	document.getElementById('card_5').className = 'item';
	document.getElementById('card_6').className = 'item';
	document.getElementById('card_7').className = 'item';
	document.getElementById('card_8').className = 'item';
	document.getElementById('card_9').className = 'item';
	document.getElementById('checkPrize').className = 'item nosel';
	document.getElementById('checkCredit').className = 'item nosel';

}

/**
 * 改变卡牌焦点
 */

function changeFocus() {
	if (isFloped == true) {
		return;
	}

	clearFocus();
	if (isInfoStatus == true) {
		switch (infocol) {
			case 1:
				document.getElementById('checkPrize').className = 'item checked';
				break;
			case 2:
				document.getElementById('checkCredit').className = 'item checked';
				break;
		}
		return;
	}

	var index = (cardrow - 1) * 3 + cardcol;
	switch (index) {
		case 1:
			document.getElementById('card_1').className = 'item cardBorder';
			break;
		case 2:
			document.getElementById('card_2').className = 'item cardBorder';
			break;
		case 3:
			document.getElementById('card_3').className = 'item cardBorder';
			break;
		case 4:
			document.getElementById('card_4').className = 'item cardBorder';
			break;
		case 5:
			document.getElementById('card_5').className = 'item cardBorder';
			break;
		case 6:
			document.getElementById('card_6').className = 'item cardBorder';
			break;
		case 7:
			document.getElementById('card_7').className = 'item cardBorder';
			break;
		case 8:
			document.getElementById('card_8').className = 'item cardBorder';
			break;
		case 9:
			document.getElementById('card_9').className = 'item cardBorder';
			break;
	}
}

/**
 * 获取翻牌信息文本
 * @param {类型代码} type 
 */
function getCardInfo(type) {
	var str = '';
	switch (type) {
		case 0:
			str = "未知";
			break;
		case 1:
			str = "观看精彩内容，可获得一次抽奖机会!";
			break;
		case 2:
			str = "完整观看视频，可获得一次抽奖机会!";
			break;
		case 3:
			str = "参与答题，赢取超级奖品!";
			break;
		case 4:
			str = "恭喜您获得一次抽奖机会！";
			break;
	}
	return str;
}


/**
 * 获取跳转URL
 * @param {类型代码} type 
 */
function getTargetUrl(type) {
	var str = '';
	switch (type) {
		case 0:
			str = "./cards.html?phoneNum=" + phoneNum + "&topsetid=" + 'xxxxxx';
			break;
		case 1:
			str = "advert.html?" + "username=" + phoneNum + "&taskid=" + taskid;
			break;
			2
		case 2:
			str = "player.html?" + "username=" + phoneNum + "&taskid=" + taskid;
			break;
		case 3:
			str = "question.html?" + "username=" + phoneNum + "&taskid=" + taskid;
			break;
		case 4:
			str = "Lottery.html?" + "username=" + phoneNum + "&taskid=" + taskid;
			break;
	}
	return str;
}

/**
 * 获取按纽文本
 * @param {类型代码} type 
 */
function getBtnText(type) {
	var str = '';
	switch (type) {
		case 0:
			str = "无法确认";
			break;
		case 1:
			str = "点击播放";
			break;
		case 2:
			str = "点击播放";
			break;
		case 3:
			str = "点击答题";
			break;
		case 4:
			str = "点击抽奖";
			break;
	}
	return str;
}

/**
 * 
 * @param {牌索引} num 
 */
function showResult(num) {
	changeFocus();
	showEnlargeResult(dynamicData.game.pokers[num - 1].type);
}


function playMusic(url) {
	var mp3url = url;
	mp = new MediaPlayer();
	var json = '';
	json += '[{mediaUrl:"' + mp3url + '",';
	json += 'mediaCode: "jsoncode1",';
	json += 'mediaType:4,';
	json += 'audioType:2,';
	json += 'videoType:1,';
	json += 'streamType:1,';
	json += 'drmType:1,';
	json += 'fingerPrint:0,';
	json += 'copyProtection:1,';
	json += 'allowTrickmode:1,';
	json += 'startTime:0,';
	json += 'endTime:2000.3,';
	json += 'entryID:"jsonentry1"}]';
	//全屏播放
	nativePlayerInstanceId = mp.getNativePlayerInstanceID();
	mp.setSingleMedia(json);
	mp.playFromStart(); //开始播放
}

function stopMusic() {
	if (mp) {
		mp.releaseMediaPlayer(nativePlayerInstanceId);
		mp.stop();
	}
}

function checkEnd() {
	var curTime = mp.getCurrentPlayTime();
	var allTime = mp.getMediaDuration();
	if (!curTime) {
		return;
	}
	if ((allTime == curTime) && (curTime != 0) && (curTime != undefined)) {
		stopMusic();
		playMusic(mp3url);
	}
}

function realData() {
	XEpg.Util.ajaxGet("./happytv/prize/users?n=100", function (res) {
		var res = JSON.parse(res);
		if (res.data.length < 4) {
			virtualData();
		} else {
			var html = '';
			for (var i = 0; i < res.data.length; i++) {
				var infos = res.data[i];
				html += '<p>用户<span class="phoneNum">' + infos.username + "</span>抽中了" + infos.prize.name + "</p>";
			}
			document.getElementById("cardswinnerUsers").innerHTML = html;
			var phoneArr = document.querySelectorAll("span.phoneNum");
			cWinnerUser = document.getElementById("cardsWinnerUser");
			cwinnerUsers = document.getElementById("cardswinnerUsers");
			cwinnerUsers2 = document.getElementById("cardswinnerUsers2");
			cwinnerUsers2.innerHTML = cwinnerUsers.innerHTML;
			for (var i = 0; i < phoneArr.length; i++) {
				phoneArr[i].innerHTML = phoneArr[i].innerHTML.substr(0, 3) + "****" + phoneArr[i].innerHTML.substr(7);
			}
		}

	});
}

function virtualData() {
	var phoneArr = document.querySelectorAll("span.phoneNum");
	var html = " ";
	var awardInfos1 = ['小米充电宝', '健康电子秤', '获得Cherry键盘', '神秘大奖', '100积分', '200积分', '300积分', '空气净化器', 'kindle阅读器', '漫步者音箱', '台灯', '国内外名著书籍'];
	var telFront = ['173', '177', '183', '133', '153', '180', '181', '189'];
	var telEnd1 = rnd(1000, 9999);
	for (var i = 0; i < 20; i++) {
		html += '<p>用户<span class="phoneNum">' + telFront[rnd(0, 7)] + "****" + rnd(1000, 9999) + "</span>抽中了" + awardInfos1[rnd(0, 4)] + "</p>";
	}
	document.getElementById("cardswinnerUsers").innerHTML = html;
	cWinnerUser = document.getElementById("cardsWinnerUser");
	cwinnerUsers = document.getElementById("cardswinnerUsers");
	cwinnerUsers2 = document.getElementById("cardswinnerUsers2");
	cwinnerUsers2.innerHTML = cwinnerUsers.innerHTML;
}

function rnd(n, m) {
	return Math.floor(Math.random() * (m - n + 1) + n)
}

function ranking() {
	XEpg.Util.ajaxGet("./happytv/user/" + phoneNum + "/ranking?n=200", function (res) {
		var res = JSON.parse(res);

		rank_content = document.getElementById("rank_content");
		rank_box1 = document.getElementById("rank_box1");
		rank_box2 = document.getElementById("rank_box2");

		console.log(res);
		var html = '';
		var mycredit = res.data.activeUser.credit;
		var myrank = res.data.activeUser.rank;
		document.getElementById("rank").innerHTML = myrank;
		document.getElementById("credit").innerHTML = mycredit;

		for (var i = 0; i < res.data.rankings.length; i++) {
			var rank = res.data.rankings[i];
			html += "<p><span>" + rank.rank + "</span><span class='phoneNum'>" + rank.username + "</span><span>" + rank.credit + "</span></p>";
		}		
		if (res.data.rankings.length < 8) {
			document.getElementById("rank_box1").innerHTML = html;
		} else {
			document.getElementById("rank_box1").innerHTML = html;
			rank_box2.innerHTML = rank_box1.innerHTML;
		}
		var phoneArr = document.querySelectorAll("span.phoneNum");
		for (var i = 0; i < phoneArr.length; i++) {
			phoneArr[i].innerHTML = phoneArr[i].innerHTML.substr(0, 3) + "****" + phoneArr[i].innerHTML.substr(7);
		}
		setInterval(rankRoll, 60);
	})
}
//奖品滚动动画
function prizescroll() {
	prizeList = document.getElementById('prizeList');
	list1 = document.getElementById('list1');
	list2 = document.getElementById('list2');
	list2.innerHTML = list1.innerHTML;

	function Marquee() {
		if (list2.offsetTop - prizeList.scrollTop <= 0) {
			prizeList.scrollTop = 0;
		} else {
			prizeList.scrollTop++;
		}

	}
	var timer = setInterval(Marquee, 60);

}