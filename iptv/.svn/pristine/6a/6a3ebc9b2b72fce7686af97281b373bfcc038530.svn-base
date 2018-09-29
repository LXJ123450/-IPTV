


/**
 * @fileOverview 工具类
 * @author suzy
 * @version 2.0
 */
(function(window){

	 /**
	 * @function trim
	 * @param {string} 需要清理空格字符串
	 * @return {string} 转换完成字符串
	 * @description 字符串方法拓展，清除字符串里的空格
	 * @example var testStr = "test test2 ".trim();
	 */
	String.prototype.trim=function() { 
	  return this.replace(/<\/?.+?>/g,"").replace(/[\r\n]/g,"").replace(/(^\s*)|(\s*$)/g,""); 
	} 
	

	/**
	 * @function jsonTrim
	 * @param {string} 需要过滤特殊字符json字符串
	 * @return {string} 过滤完成字符串
	 * @description 字符串方法拓展，过滤json字符串里特殊字符
	 * @example var testStr = "{\"content\":\"test2 \n \r \"}".jsonTrim();
	 */
	String.prototype.jsonTrim=function() { 
	  return this.replace(/\r/g,' ').replace(/\n/g,' ');
	} 
	
	/**
	 * @function replaceAll
	 * @param {string} s1 被替换原始字符串
	 * @param {string} s2 替换字符串
	 * @return {string} 替换完毕字符串
	 * @description 字符串方法拓展，批量替换字符串
	 * @example var testStr = "content com".replaceAll("co","test");
	 */
	String.prototype.replaceAll = function(s1, s2){
	  return this.replace(new RegExp(s1, "gm"), s2);
	}	
	
	 /**
		* @class UtilObj
		* @constructor
		* @author suzy
		* @description 工具类;由于本类加入命名空间XEpg
		* @example UtilObj;
		* @since version 2.0
		*/
	var UtilObj = {

		/**
		 * @function createJsonp
		 * @param {string} id 自动创建script的id
		 * @param {string} url 请求地址
		 * @description jsonp请求创建
		 * @example XEpg.Util.createJsonp("jsonp1","test.htm");
		 */
		createJsonp:function(id,url){
		 var eleScript= document.createElement("script");
		 eleScript.type = "text/javascript";
		 eleScript.id = id;
		 eleScript.src = url;
		 document.getElementsByTagName("HEAD")[0].appendChild(eleScript);
		},
		
		/**
		 * @function createJsonp
		 * @param {string} id 自动创建script的id
		 * @description jsonp script移除，对不适用的json进行清理，减少资源占用,需要与createJsonp 一一对应
		 * @example XEpg.Util.deleteJsonp("jsonp1");
		 */
		deleteJsonp:function(id){
			var tempObj = document.getElementById(id);
			document.head.removeChild(tempObj);
		},
		
		/**
		 * @function jsonTrim
		 * @param {string} str 待替换字符串
		 * @description 清除字符串里的换行与回车
		 * @example XEpg.Util.jsonTrim("test \n str");
		 */
		jsonTrim:function(str){
			return str.replace(/\r/g,' ').replace(/\n/g,' ');
	  },
	  
	  /**
		 * @function isArray
		 * @param {object} obj 待判断对象
		 * @description 判断对象是否为数组
		 * @example XEpg.Util.isArray([1,2]);
		 */
	  isArray:function(obj) {
	  	var isArr = Object.prototype.toString.call(obj) === '[object Array]';
	  	//兼容ipanel低端盒子
	  	if(!isArr && obj!=null){
	  		 isArr = obj.constructor==Array;
	  	}
	  	return isArr;
		},
		/**
		 * @function argumentsToArray
		 * @param {object} setObj arguments参数对象
		 * @description 参数对象转数组
		 * @example XEpg.Util.argumentsToArray(arguments); 
		 */
		argumentsToArray:function(setObj){
			var tempArray = [];
			//如果传的是个数组，则直接数组赋值
			if(setObj.length==1 && XEpg.Util.isArray(setObj[0])){
				 tempArray = setObj[0];
			}else{
				for(var i=0,len=setObj.length;i<len;i++){
					if(typeof(setObj[i])=="object" && setObj[i] !=null){
						tempArray.push(setObj[i]);
					}
		  	}
		  }
	  	//如果没有参数，则为null
	  	if(tempArray.length==0)
	  	   tempArray=null;
	  	return tempArray;
		},
		
		/**
		 * @function ajaxGet
		 * @param {string} url ajax请求地址
		 * @param {function} callBack 回调方法
		 * @return {string} 返回数据
		 * @description ajax get请求，如果传callBack，则异步执行，不传为同步执行，结果直接返回，由于同步会阻塞线程，使用需谨慎
		 * @example XEpg.Util.ajaxGet("test.htm?p1=a&p2=b",testAjax);  function testAjax(contentStr){alert(contentStr);} 异步实例
		 * @example var contentStr = XEpg.Util.ajaxGet("test.htm?p1=a&p2=b"); 同步实例
		 */
		ajaxGet:function(url,callBack){
			var xmlhttp;
			var responseText="";
			if(window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			}else{// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function(){
			  if(xmlhttp.readyState==4 && xmlhttp.status==200){
				  if(typeof(callBack)=="function")
				   callBack(window["XEpg"].Util.jsonTrim(xmlhttp.responseText)); //兼容低级盒子，不能扩展string
			  }
			}
			if(typeof(callBack)=="function")
			  xmlhttp.open("GET",url,true);
			else
			  xmlhttp.open("GET",url,false);
			xmlhttp.send();
			return window["XEpg"].Util.jsonTrim(xmlhttp.responseText);
		},
		
		/**
		 * @function ajaxPost
		 * @param {string} url ajax请求地址
		 * @param {string} content ajax请求内容
		 * @param {function} callBack 回调方法
		 * @return {string} 返回数据
		 * @description ajax post请求，如果传callBack，则异步执行，不传为同步执行，结果直接返回，由于同步会阻塞线程，使用需谨慎
		 * @example XEpg.Util.ajaxPost("test.htm","p1=a&p2=b",testAjax);  function testAjax(contentStr){alert(contentStr);} 异步实例
		 * @example var contentStr = XEpg.Util.ajaxPost("test.htm","p1=a&p2=b"); 同步实例
		 */
		ajaxPost:function(url,content,callBack)
		{
			var xmlhttp;
			var responseText="";
			if(window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			}else{// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function(){
			  if(xmlhttp.readyState==4 && xmlhttp.status==200){
				  if(typeof(callBack)=="function")
				   callBack(window["XEpg"].Util.jsonTrim(xmlhttp.responseText));
			  }
			}
			if(typeof(callBack)=="function")
			  xmlhttp.open("POST",url,true);
			else
			  xmlhttp.open("POST",url,false);
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.send(content);
			return window["XEpg"].Util.jsonTrim(xmlhttp.responseText);
		},
		
		/**
		 * @function gotoPage
		 * @param {string} url 跳转地址
		 * @description 页面跳转
		 * @example XEpg.Util.gotoPage("test.htm");
		 */
		gotoPage:function(url){
			window.location.href = url;
		},
		/**
		 * 记录日志
		 */
		log:function(info){
			XEpg.Util.ajaxGet("writeLog?info="+info, function(e){});
		},
		/**
		 * @function setCookie
		 * @param {string} key 关键字，需唯一
		 * @param {string} val 值
		 * @description 设置cookie
		 * @example XEpg.Util.setCookie("testCookie1","p1=a&p2=b");
		 */
		setCookie:function(key,val){
		    var Days = 7; //此 cookie 将被保存 7 天
		    var exp = new Date();    //new Date("December 31, 9998");
		    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		    document.cookie=key +"="+escape(val)+";expires="+exp.toGMTString()+";path=/";
		},
		
	/**
	 * @function getCookie
	 * @param {string} key 关键字，需唯一,与setCookie对应
	 * @return {string} 值
	 * @description 获取cookie存储的值
	 * @example XEpg.Util.getCookie("testCookie1");
	 */
		getCookie:function(key) {
		    var arr=null;
		    if(document.cookie!=null && document.cookie.length>0)
		       arr=document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
		    if (arr != null)
		        return unescape(arr[2]);
		    return null;
		},
	
		/**
		 * @function delCookie
		 * @param {string} key 关键字，需唯一,与setCookie对应
		 * @description 删除cookie
		 * @example XEpg.Util.delCookie("testCookie1");
		 */
		delCookie:function(key){
			//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
			var date = new Date(); 
			date.setTime(date.getTime()-10000); 
			document.cookie=key+"=;expires="+date.toGMTString()+";path=/"; 
		}, 
		
	/**
	 * @function objectToStr
	 * @param {object} jsonObj json对象
	 * @return {string} 字符串
	 * @description json对象转换为字符串
	 * @example var str = XEpg.Util.objectToStr({"id":"3","name":"test"});
	 */
		objectToStr:function(jsonObj){
		 var reStr="";
		 if(jsonObj!=null && typeof(jsonObj)=="object"){
			 var beginStr = "{";
			 var endStr = "}";
			 if(this.isArray(jsonObj)){
				 beginStr = "[";
				 endStr = "]";
			 }	
			 for(var item in jsonObj){
			 	if(Array.prototype.hasOwnProperty(item))continue;
				 //JSON 对象
				 if(!(item>=0)){
					 reStr += "\""+ item + "\"\:";
				 }
				 var type=typeof(jsonObj[item]);
				 if(type=="number"){
					 reStr +=jsonObj[item];
				 }else if(type=="object"){
					 reStr += this.objectToStr(jsonObj[item]);
				 }else{
					 reStr +="\""+jsonObj[item]+"\""; 
				 }
				 reStr +=",";
			 }
			 if(reStr.length>0)
				 reStr = reStr.substr(0,reStr.length-1);
			 reStr = beginStr+reStr+endStr;
		 }
		 return reStr;
		},
	
		/**
		 * @function getStrRealLen
		 * @param {string} str 字符串
		 * @return {number} 字符长度
		 * @description 获取字符串真实长度,中文字符算2长度
		 * @example var str = XEpg.Util.getStrRealLen("test测试");
		 */
		getStrRealLen:function(str)
		{  
		    if(typeof(str)!="string" || str.length==0)
		    	return 0;
		    var len = 0;
		    var strLen = str.length;
		    for(var i = 0;i<strLen;i++){
		         a = str.charAt(i);
		         len++;
		         if(escape(a).length > 4)
		         {//中文字符的长度经编码之后大于4
		        	 len++;
		          }          
		     }
		     return len;
		},
	
		/**
		 * @function getSubStr
		 * @param {string} str 截取前字符串
		 * @param {number} len 截取长度,中文字符算2长度
		 * @param {boolean} isSuffix 是否加省略号，默认不加
		 * @return {string} 截取后字符串
		 * @description 截取字符串,中文字符算2长度
		 * @example var str = XEpg.Util.getSubStr("test测试",6); //普通截取
		 * @example var str = XEpg.Util.getSubStr("test测试",6,true); //截取后面加省略号
		 */
		getSubStr:function(str,len,isSuffix)
		{  
		    if(typeof(str)!="string" || str.length==0)
		    	return "";
		    var realLen = this.getStrRealLen(str);
		    if(realLen<=len){
		    	return str;
		    }else{
		        var str_length = 0;
		        var str_cut = new String();
		        var str_len = str.length;
		        if(isSuffix)
		        	len -=3; 
		        for(var i = 0;i<str_len;i++){
		            var a = str.charAt(i);
		             str_length++;
		             if(escape(a).length > 4)
		             {
		              //中文字符的长度经编码之后大于4
		              str_length++;
		              }
		              str_cut = str_cut.concat(a);
		              if(str_length>=len)
		              {
		            	 if(isSuffix){ 
		                      str_cut = str_cut.concat("...");
		            	 }
		                 return str_cut;
		              }
		         }
		         //如果给定字符串小于指定长度，则返回源字符串；
		         if(str_length<len)
		         	return  str;    	    	
		    }
		},

	  /**
		 * @function numSupplyZero
		 * @param {string} initNumStr 初始化字符串
		 * @param {string} numStr 需要格式化数字
		 * @return {string} 格式化后字符串
		 * @description 数字前面补0 
		 * @example var str = XEpg.Util.numSupplyZero("112","0000"); 结果为:0112
		 */
	  numSupplyZero:function(initNumStr,numStr){
		  var len=initNumStr.length;
		  initNumStr =numStr+initNumStr;
		  return initNumStr.substring(initNumStr.length-numStr.length);
	  },
	  
	  /**
		 * @function getPageTotal
		 * @param {number} totalNum 总条数
		 * @param {number} pageSize 每页条数
		 * @return {number} 总页数
		 * @description 根据总条数与每页条数，计算出总页数
		 * @example XEpg.Util.getPageTotal(112,10); 
		 */
	  getPageTotal:function(totalNum,pageSize){
		  return Math.ceil(parseInt(totalNum,10)/parseInt(pageSize,10));
	  },
	
	  /**
		 * @function getSliceList
		 * @param {array} objs 列表数组
		 * @param {number} pageIndex 开始页
		 * @param {number} pageSize 每页条数
		 * @return {array} 本页数组
		 * @description 根据数组开始页与每页条数，计算出当前页数组列表
		 * @example XEpg.Util.getSliceList([1,3,5,6,8,9,7],2,3); 
		 */
	  getSliceList:function(objs,pageIndex,pageSize){
	     var tempObj=objs;
	     if(objs!=null && typeof(objs)=="object" && objs.length>0){
	        pageIndex = parseInt(pageIndex,10);
	        pageSize =  parseInt(pageSize,10);
	        var len = objs.length;
	        if(pageIndex>0 && pageSize>0 && len>0){
	           var begin = pageSize*(pageIndex-1);
	           if(begin<0)
	              begin=0;
	           var end = pageSize*pageIndex;
	           if(end>len)
	              end = len;
	           tempObj = objs.slice(begin,end); 
	        }
	     }
	     return tempObj;
	  },
	  
	  /**
		 * @function replaceUrlParams
		 * @param {string} url 地址
		 * @param {string} key url参数关键字
		 * @param {string|number} value 参数值
		 * @return {string} 替换后地址
		 * @description 替换地址里的参数值,如果地址里没有该参数，则再末尾补参数与值
		 * @example XEpg.Util.replaceUrlParams("test.htm?a=cc&b=kk","a","oo"); 
		 */
		replaceUrlParams:function(url,key,value){
			var index= url.indexOf(key+"=");
			if(index>-1){
				var before =  url.substring(0,index);
				var after =  url.substring(index);
				index = after.indexOf("&");
			    after = (index>-1) ?  after.substring(index) : "";		
				url = before+key+"="+value+after;
			}else{
				url += (url.indexOf("?")>-1) ? "&" : "?";
				url += key+"="+value;
			}
			return url;
		},
		

		/**
		 * @function getUrlParam
		 * @param {string} url 地址
		 * @param {string} strname url参数关键字
		 * @return {string} 参数值
		 * @description 获取URL地址中的参数值
		 * @example XEpg.Util.getUrlParam("a","test.htm?a=cc&b=kk"); 
		 */
		getUrlParam:function(url,strname) {
		    var hrefstr, pos, parastr, para, tempstr;
		    hrefstr = window.location.href;
		    if(typeof(url)!="undefined")
		    	hrefstr=url;
		    pos = hrefstr.indexOf("?");
		    //没有参数，则直接跳出
		    if(pos == -1 && hrefstr.indexOf("=") == -1)
		      return null;
		    parastr = decodeURI(hrefstr.substring(pos + 1));
		    para = parastr.split("&");
		    tempstr = "";
		    for (i = 0; i < para.length; i++) {
		        tempstr = para[i];
		        pos = tempstr.indexOf("=");
		        if (tempstr.substring(0, pos) == strname) {
		            var temppath = tempstr.substring(pos + 1);
		            return temppath;
		        }
		    }
		    return null;
		},
		

		/**
		 * @function getUrlParameterObj
		 * @param {string} url 地址
		 * @return {object} 参数对象
		 * @description 获取记录地址里的参数对象
		 * @example XEpg.Util.getUrlParameterObj("test.htm?a=cc&b=kk");  结果为 {"a":"cc","b":"kk"}
		 */
		getUrlParameterObj:function(url){
				if(typeof(url)=="undefined" || url==null)
		    	url=window.location.href;
		    var pos = url.indexOf("?");
		    var obj = null;
		     //没有参数，则直接跳出
		    if(pos == -1 && url.indexOf("=") == -1)
		      return obj;
		    var parastr = decodeURI(url.substring(pos + 1));
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
		 * @function timeFormat
		 * @param {number} time 需要格式化数值,单位秒s
		 * @return {string} 格式化完成字符串
		 * @description 时间格式化 hh24:mi:ss
		 * @example XEpg.Util.timeFormat("5700");
		 */
		timeFormat:function(time){
	      var hour = parseInt(time / 3600);
	      time = parseInt(time % 3600);
	      var minute = parseInt(time / 60);
	      time = parseInt(time % 60);
	      var second = parseInt(time);
	
	      var timeStr = "";
	      if (hour < 10)
	          timeStr += "0";
	      timeStr += hour + ":";
	      if (minute < 10)
	          timeStr += "0";
	      timeStr += minute+":";
	      if (second < 10)
	          timeStr += "0";
	      timeStr += second;
	      return timeStr;
		 },
		 
		 /**
		 * @function addNavigationUrl
		 * @param {string} url 地址
		 * @description 导航地址压入数组
		 * @example XEpg.Util.addNavigationUrl("test.htm?a=cc&b=kk");
		 */
		 addNavigationUrl:function(url){
			var nav = this.getCookie("navRecord");
			var navUrlStr = "";
			var navUrlArray = null;
			if(nav==null || nav.length<1){
				navUrlArray = new Array();
			}else{
				navUrlArray = nav.split(',');
			}
			if(navUrlArray.length>0){
				//如果已存在地址，则不记录数组
				if(navUrlArray[navUrlArray.length-1]==url){
		           return; 
				}
			}
			var temp = url.split("?");
			url = temp[0];
			if(temp.length>1)
				url += "?" + encodeURI(temp[1]);
			navUrlArray.push(url);
			navUrlStr= navUrlArray.join(","); 
			this.setCookie("navRecord",navUrlStr); 
		},
		
	  /**
		 * @function gotoBackNavigationUrl
		 * @description 跳回前一导航页面
		 * @example XEpg.Util.gotoBackNavigationUrl();
		 */
		gotoBackNavigationUrl:function(){
			var nav = this.getCookie("navRecord");
			var navUrlStr = "";
			var navUrlArray = null;
			var url = "";
			if(nav!=null){
				navUrlArray = nav.split(',');
        if(navUrlArray.length>0){
           url=navUrlArray.pop();
           if(url.length<1 && navUrlArray.length>0)
        	   url=navUrlArray.pop();
           navUrlStr=navUrlArray.join(","); 
           this.setCookie("navRecord",navUrlStr);
           if(url.length>0){
             window.location.href = decodeURI(url);
           }
        }
			}
		},
		
		/**
		 * @function getLastNavigationUrl
		 * @return {string} 上一次访问地址字符串
		 * @description 获取上一次访问地址,不清理导航记录
		 * @example XEpg.Util.getLastNavigationUrl();
		 */
		getLastNavigationUrl:function(){
			var url = "";
			var nav = this.getCookie("navRecord");
			if(nav!=null){
				var navUrlArray = nav.split(',');
		        if(navUrlArray.length>0){
		        	url=navUrlArray[navUrlArray.length-1];
		        }
			}
			return url;
		},
		
		/**
		 * @function getBackNavigationUrl
		 * @return {string} 上一次访问地址字符串
		 * @description 获取上一次访问地址,并清理导航记录
		 * @example XEpg.Util.getBackNavigationUrl();
		 */
		getBackNavigationUrl:function(){
		  var lastUrl = this.getLastNavigationUrl();
		  var currentUrl = window.location.href;
		  var reUrl="";
		  //如果同一个页面
		  if(lastUrl.split("?")[0]==currentUrl.split("?")[0]){
			  reUrl=lastUrl;
			  var nav = this.getCookie("navRecord");
			  var navUrlArray = nav.split(',');
			  navUrlArray.pop();
			  var navUrlStr=navUrlArray.join(","); 
		    this.setCookie("navRecord",navUrlStr);
		  }
		  return reUrl;
		},

		/**
		 * @function animate 
		 * @param {elem,options} elem 地址 options {left: left值(int),duration: 动画时间}
		 * @description 动画函数
		 * @example XEpg.Util.animate();
		 */
		animate:function(elem, options){
	    var requestId;
		var timerId;
		var createTime = function(){
			return  (+new Date);
		}
		
	    if(options.left!=null){
			if(!isNaN(elem.style['left'])){
			    options.leftstart=parseInt(elem.style['left']);
			}else{
				options.leftstart=parseInt(elem.style['left'].substring(0,elem.style['left'].toString().length-2));
			}
		}
		
		if(options.top!=null){
			if(!isNaN(elem.style['top'])){
				 options.topstart=parseInt(elem.style['top']);
			}else{
			     options.topstart=parseInt(elem.style['top'].substring(0,elem.style['top'].toString().length-2));
			}
		}
		 window.requestAFrame = (function () {
			       return  function (callback) {
	                    return window.setTimeout(callback, 1000 / 60);
	                };
	     })();

	    // handle multiple browsers for cancelAnimationFrame()
	    window.cancelAFrame = (function () {
	        return window.cancelAnimationFrame ||
	                window.webkitCancelAnimationFrame ||
	                window.mozCancelAnimationFrame ||
	                window.oCancelAnimationFrame ||
	                function (id) {
	                    window.clearTimeout(id);
	                };
	    })();		
	   
	   //动画开始时间
	    var startTime = createTime();

		function render(){	
		    // window.WKepgLock=true;
			//每次变化的时间
			var remaining = Math.max(0, startTime + options.duration - createTime());
			var temp = remaining / options.duration || 0;
			var percent = 1 - temp;
			
			var stop = function(){
				//停止动画
				if (requestId)
                window.cancelAFrame(requestId);
				window.WKepgLock=false;	
				
			};
			var setStyle = function(value){
			    if(value["left"]!=null){
					 var leftstart=value.leftstart;
					 var leftend=value.left;
					 var now = (leftend - leftstart) * percent + leftstart;
					
					 elem.style['left'] = now + 'px';
					
				}
				if(value["top"]!=null){
					 var leftstart=value.topstart;
					 var leftend=value.top;
					 var now = (leftend - leftstart) * percent + leftstart;
					 elem.style['top'] = now + 'px';
					
				}
			};
			//移动的距离
			if(percent === 1){
				setStyle(options)
				stop();
			}else{
				setStyle(options)
				requestId = window.requestAFrame(render);
			}
	     }
         requestId = window.requestAFrame(render);
     },

  };
  
	
	//如果Epg类没有创建
	if(!(typeof(window["XEpg"])=="object" && typeof(window["XEpg"])!=null)){
		window["XEpg"]={};
	}
	
	//赋值让外部调用
	window["XEpg"].Util = UtilObj;

})(window);



/**
 * @fileOverview 导航类
 * @author suzy
 * @version 2.0
 */

(function(window){	
	 /**
		* @class NavObj
		* @constructor
		* @author suzy
		* @description 导航类
		* @example UtilObj;
		* @since version 2.0
		*/
	var NavObj = {
		isOnkeypress:false,
		isOnkeydown:false,

		/**
		 * @function keyBind
		 * @description 键值绑定
		 * @example XEpg.Nav.keyBind();
		 */
		keyBind:function() {
			window.document.onkeydown = window["XEpg"].Nav.onkeydownKeyEvent;
			window.document.onkeypress = window["XEpg"].Nav.onkeypressKeyEvent;
		},
		

		/**
		 * @function onkeypressKeyEvent
		 * @param {object} event 按键事件
		 * @description 按键按下松开处理
		 * @example window.document.onkeypress = window["XEpg"].Nav.onkeypressKeyEvent;
		 */
		onkeypressKeyEvent:function(event) {
			var obj = window["XEpg"].Nav;
			//如果执行了onkeypress则不再执行onkeydown
			if(obj.isOnkeydown){
				obj.isOnkeydown = false; //用过一次后，需要还原
			  return;
			}if(!obj.isOnkeypress){
			  obj.isOnkeypress=true;
			}
			var keyCode = event.which ? event.which: event.keyCode;
			//window["XEpg"].$('').innerHTML = keyCode;
			obj.keyHandle(keyCode);
			if(keyCode==340) //禁止华数ipanel盒子自动返回
				return 0;  //兼容ipannel 返回
		},
		
		/**
		 * @function onkeydownKeyEvent
		 * @param {object} event 按键事件
		 * @description 按键按下处理
		 * @example window.document.onkeydown = window["XEpg"].Nav.onkeydownKeyEvent;
		 */
		onkeydownKeyEvent:function(event) {
			var obj = window["XEpg"].Nav;
			//如果执行了onkeypress则不再执行onkeydown
			if(obj.isOnkeypress){
			 obj.isOnkeypress=false; //用过一次后，需要还原，防止烽火盒子确定键只发一个
			 return;
			}if(!obj.isOnkeydown){
			  obj.isOnkeydown=true;
			}
			var keyCode = event.which ? event.which: event.keyCode;
			obj.keyHandle(keyCode);
			if(keyCode==1 || keyCode==2 || keyCode==3 || keyCode==4 || keyCode==340) //禁止华数ipanel盒子自动返回,上，下，左,右执行
				return 0;  //兼容ipannel 返回
		},
		
		/**
		 * @function keyHandle
		 * @param {number} keyCode 按键键值
		 * @description 键值处理
		 * @example  XEpg.Nav.keyHandle(37);
		 */
		keyHandle:function(keyCode){
			var KEY_BACK=8,KEY_OK=13,KEY_LEFT=37,KEY_UP=38,KEY_RIGHT=39,KEY_DOWN=40,KEY_PAGEUP=33,KEY_PAGEDOWN=34,KEY_0=48,KEY_1=49,KEY_2=50,KEY_3=51,KEY_4=52,KEY_5=53,KEY_6=54,KEY_7=55,KEY_8=56,KEY_9=57,KEY_VOLUP=259,KEY_VOLDOWN=260,KEY_DEL=46,KEY_VOLUP=259,KEY_VOLDOWN=260,KEY_MUTE = 261,KEY_MPEVENT = 768; //del海信键值
			switch(keyCode) {
				case KEY_0:
				case KEY_1:
				case KEY_2:
				case KEY_3:
				case KEY_4:
				case KEY_5:
				case KEY_6:
				case KEY_7:
				case KEY_8:
				case KEY_9:
					this.key_number_event(keyCode-48);
					break;
				case 1:  //ipannel 
				case KEY_UP:
					this.key_up_event();
					break;
				case 2:  //ipannel 
				case KEY_DOWN:
					this.key_down_event();
					break;
				case 3:  //ipannel 
				case KEY_LEFT:
					this.key_left_event();
					break;
				case 4:  //ipannel 
				case KEY_RIGHT:
					this.key_right_event();
					break;
				case KEY_OK:
					this.key_ok_event();
					break;
				case 32: //空格键
				case 45: //兼容云平台
				case 340: //ipannel 返回
				case 1249: //兼容烽火盒子
				case KEY_BACK:
					this.key_back_event();
					break;
				case KEY_PAGEUP:
					this.key_pageUp_event();
					break;
				case KEY_PAGEDOWN:
					this.key_pageDown_event();
					break;
				case KEY_DEL:
					this.key_del_event();
					break;
				case KEY_VOLUP:
					this.key_volumeUp_event();
					break;
				case KEY_VOLDOWN:
					this.key_volumeDown_event();
					break;
				case KEY_MUTE:
					this.key_mute_event();
				case 768:
					this.key_play_event();
					break;
				default:
					this.key_default_event(keyCode);
				  break;
			}
		},

	 key_play_event:function(){},

	 key_volumeUp_event:function(){
		//Epg.Mp.volUp();
	 },key_volumeDown_event:function(){
		 //Epg.Mp.volDown();
	 },key_mute_event:function(){},	
	 	/**
		 * @function key_default_event
		 * @description 键值默认处理，不在case处理中的其他键值
		 * @example  XEpg.Nav.key_default_event();
		 */	
	 key_default_event:function(){},
	 	 /**
		 * @function key_number_event
		 * @param {number} num 数字键值
		 * @description 数字键处理
		 * @example  XEpg.Nav.key_number_event(49);
		 */	
	 key_number_event:function(num){
		
	 },
	 	 	/**
		 * @function key_up_event
		 * @description 上键事件处理
		 * @example  XEpg.Nav.key_up_event();
		 */	
	 key_up_event:function(){this.key_up_opt();},
	 	 	/**
		 * @function key_down_event
		 * @description 下键事件处理
		 * @example  XEpg.Nav.key_down_event();
		 */	
	 key_down_event:function(){this.key_down_opt();},
	 	 	/**
		 * @function key_left_event
		 * @description 左键事件处理
		 * @example  XEpg.Nav.key_left_event();
		 */	
	 key_left_event:function(){this.key_left_opt();},
	 	 	/**
		 * @function key_right_event
		 * @description 右键事件处理
		 * @example  XEpg.Nav.key_right_event();
		 */	
	 key_right_event:function(){this.key_right_opt();},
	 	 	/**
		 * @function key_ok_event
		 * @description 确认OK键事件处理
		 * @example  XEpg.Nav.key_ok_event();
		 */	
	 key_ok_event:function(){this.key_click_opt();},
	 	 	/**
		 * @function key_back_event
		 * @description  返回键事件处理
		 * @example  XEpg.Nav.key_back_event();
		 */	
	 key_back_event:function(){this.key_back_opt();},
	 	 	/**
		 * @function key_pageUp_event
		 * @description 上页键事件处理
		 * @example  XEpg.Nav.key_pageUp_event();
		 */	
	 key_pageUp_event:function(){},
	 	 	/**
		 * @function key_pageDown_event
		 * @description 下页键事件处理
		 * @example  XEpg.Nav.key_pageDown_event();
		 */	
	 key_pageDown_event:function(){
		
	 },
	 	 	/**
		 * @function key_del_event
		 * @description 删除键事件处理
		 * @example  XEpg.Nav.key_del_event();
		 */	
	 	key_del_event:function(){},
	 

		keyPageUpTimeObj:null,
		/**
		 * @function timeKeyPageUp
		 * @description 延时500毫秒上页键事件处理，防止过快跳页
		 * @example  XEpg.Nav.timeKeyPageUp();
		 */	
		timeKeyPageUp:function(){
		   
		},
				

		keyPageDownTimeObj:null,
		/**
		 * @function timeKeyPageDown
		 * @description 延时500毫秒下页键事件处理，防止过快跳页
		 * @example  XEpg.Nav.timeKeyPageDown();
		 */	
		timeKeyPageDown:function(){
		    
		},
			
	 	/**
		 * @function key_up_opt
		 * @description 上键处理
		 * @example  XEpg.Nav.key_up_opt();
		 */	
		key_up_opt:function(){		
			
		},
		
	 	/**
		 * @function key_down_opt
		 * @description 下键处理
		 * @example  XEpg.Nav.key_down_opt();
		 */	
		key_down_opt:function(){
			
		},
		
	 	/**
		 * @function key_left_opt
		 * @description 左键处理
		 * @example  XEpg.Nav.key_left_opt();
		 */	
		key_left_opt:function(){
			
		},

	 	/**
		 * @function key_right_opt
		 * @description 右键处理
		 * @example  XEpg.Nav.key_right_opt();
		 */	
		key_right_opt:function(){
			
		},
				
	 	/**
		 * @function key_click_opt
		 * @description 确定键处理
		 * @example  XEpg.Nav.key_click_opt();
		 */
		key_click_opt:function(){			
			XEpg.Util.gotoPage("./cards.html?phoneNum=" + username + "&topsetid=" + 'xxxxxx');
		},
				
	 	/**
		 * @function key_back_opt
		 * @description 返回键处理
		 * @example  XEpg.Nav.key_back_opt();
		 */
		key_back_opt:function(){
			XEpg.Util.gotoPage("./cards.html?phoneNum=" + username + "&topsetid=" + 'xxxxxx');
    	},
    
  };
  
	
	//如果Epg类没有创建
	if(!(typeof(window["XEpg"])=="object" && typeof(window["XEpg"])!=null)){
		window["XEpg"]={};
	}
	
	//赋值让外部调用
	window["XEpg"].Nav=NavObj;
	window["XEpg"].Nav.keyBind(); //默认绑定

})(window);

 /**
 * @fileOverview 区域封装类
 * @author suzy
 * @version 2.0
 */


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






function getUnencodeUrlParams(){
	var currentEncodeUrl = document.URL;//获取当前URL
	//var currentEncodeUrl = "epgtest.jsp?INFO=%3CuserId%3EHGZS16@ITVP%3C/userId%3E%3CuserToken%3E0D51E03A316F36949284C48C57327C32%3C/userToken%3E%3CTokenExpiretime%3E20170408163922%3C/TokenExpiretime%3E%3CGroupId%3E1%3C/GroupId%3E%3CuserIP%3E10.161.232.231%3C/userIP%3E%3CareaCode%3E10026%3C/areaCode%3E%3CTradeId%3E1%3C/TradeId%3E%3Ckey%3E4%3A2%3C/key%3E%3CstbId%3E00100199006021011120210HB7151799%3C/stbId%3E%3CVAStoEPG%3E%3C/VAStoEPG%3E%3Cback_epg_url%3Ehttp%3A%2F%2F182.139.242.84%3A33200%2FEPG%2Fjsp%2FSTZB%2Fen%2FjumpTransPage.jsp%3C/back_epg_url%3E%3Cback_epg_url_par%3E%3C/back_epg_url_par%3E%3CoptFlag%3EKALAOK%3C/optFlag%3E%3CepgPlatform%3E2%3C/epgPlatform%3E";
  	var currentUnencodeUrl = decodeURIComponent(currentEncodeUrl);//解码URL
  	var params = XEpg.Util.getUrlParameterObj(currentUnencodeUrl);//获取URL参数
  	return params;
}
