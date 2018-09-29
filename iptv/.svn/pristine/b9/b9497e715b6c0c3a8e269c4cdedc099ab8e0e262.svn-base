(function(window){
var UtilObj = {
/**
 * 描述：获取记录地址里的参数对象
 * @function getUrlParameterObj
 * @param {string} url 地址
 * @return {object} 参数对象
 * */
getUrlParameterObj:function(url)
{
	if(typeof(url)=="undefined" || url==null)
    	url=window.location.href;
    var pos = url.indexOf("?");
    var obj = null;
     //没有参数，则直接跳出
    if(pos == -1 && url.indexOf("=") == -1)
      return obj;
    var parastr = url.substring(pos + 1);
    var para = parastr.split("&");
    obj = {};
    for (i = 0; i < para.length; i++) {
        var tempstr = para[i];       
        pos=tempstr.indexOf("=");
        obj[tempstr.substring(0,pos)]=tempstr.substring(pos+1);
    }
    return obj;
},
/**
 * @function gotoPage
 * @param {string} url 跳转地址
 * @description 页面跳转
 */
gotoPage:function(url)
{
	window.location.href = url;
},
/**
 * @function getPageTotal
 * @param {number} totalNum 总条数
 * @param {number} pageSize 每页条数
 * @return {number} 总页数
 * @description 根据总条数与每页条数，计算出总页数
 */
getPageTotal:function(totalNum,pageSize)
{
	return Math.ceil(parseInt(totalNum,10)/parseInt(pageSize,10));
}
}
//如果Epg类没有创建
if(!(typeof(window["XEpg"])=="object" && typeof(window["XEpg"])!=null)){
	window["XEpg"]={};
}
//赋值让外部调用
window["XEpg"].Util = UtilObj;
})(window);
function setCookie(key,val){
    var Days = 7; //此 cookie 将被保存 7 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie=key +"="+escape(val)+";expires="+exp.toGMTString()+";path=/";
}
function getCookie(key){
    var arr=null;
    if(document.cookie!=null && document.cookie.length>0)
       arr=document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
}
function delCookie(key){
	//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
	var date = new Date(); 
	date.setTime(date.getTime()-10000); 
	document.cookie=key+"=;expires="+date.toGMTString()+";path=/"; 
}
var imghttp = "http://110.190.90.212:8869/";
//var imghttp = "http://img.tyfo.com:8869/";
//var imghttp = "http://110.190.90.210:4869";//测试地址

var playUrl1;
function playv(procid,playaddress){
	Epg.ajax({
		url:"/PHOTO_EPG/selectVideosByVoideoId?procid="+procid+"&loginNo=zl237&networktype=1&programCode="+playaddress,
		data:'',
		type:'get',
		dataType:'jsonp',
		success:function(xhr,rsp){
		 var result1 = JSON.parse(rsp);		
			playUrl1=result1.result.playUrl;
		}
	});	
}
function playVedio(playUrl1){
	G("Frame").src="/PHOTO_EPG/html/media_player.html?palyUrl="+encodeURIComponent(playUrl1)+"&method=playFromProgram&mp=33&programId=33&mode=listRandomForever&dolog=false&display=smallvod&left=882&top=117&width=346&height=263&source=photo_home&sourceType=column&metadataType=smallvod";
}

//全屏播放
function fullscreenPlay()
{
	
	var returnURI = escape('/PHOTO_EPG/home/home.html?1=1&addAccessLog=true&p=&source=ggly_play_exit_recommend&dir=fallback&f='+Epg.btn.current.id);
	//location.href='/PHOTO_EPG/html/media_player.html?mp=33&method=addVideo&andPlay=true&code='+window.frames['videoFrame'].MP.current.code+'&mode=listCycleOnce&source=photo_home&sourceType=column&metadataType=program&addAccessLog=true&&display=fullscreen&returnURI='+returnURI;
	location.href='/PHOTO_EPG/html/media_player.html?palyUrl='+encodeURIComponent(playUrl1)+'&mp=33&method=addVideo&andPlay=true&code='+window.frames['Frame'].MP.current.code+'&mode=listCycleOnce&source=photo_home&sourceType=column&metadataType=program&addAccessLog=true&&display=fullscreen&returnURI='+returnURI;
}

//视频iframe加载完毕时执行的方法
function videoWindowOnload()
{
	window.frames['Frame'].menuWindow = Epg.getParent();//注意这里不能用this，因为执行环境不是这里
}

var login_userid=Epg.cookie.get('userid');
//alert(Epg.cookie.get('userid'));
if (login_userid == ''||login_userid == undefined ||login_userid == null || login_userid == '""') {
	login_userid="10000100000";
	//alert("游客");
}else{
	//alert("用户："+login_userid);
	login_userid=login_userid;
}

function getvisiteddata(buttonType,buttonName){
		
    var moduleid="009";
   // login_userid = getCookie('userid_photo');   
  //  console.log("用户："+login_userid);
    /* 数据库里对应字段msisdn：手机号 ， imei， moduleid， channelid：频道*/
    Epg.ajax({   
         type:"post", 
         url:"/PHOTO_EPG/addCycleLog",   
         dataType:"json",       
         async: false, 
        data:{
        	 "msisdn":login_userid,
        	 "moduleid":buttonType,
        	 "buttonType":moduleid,
        	 "buttonName":buttonName,
        	// "logId":"222",
        	// "recommendId":"eee",
        	// "order":"10",          
         },         
         success:function(data){
        	// alert('请求成功');
        	
         }, 
         error:function(){
         }   
     });   
    
}