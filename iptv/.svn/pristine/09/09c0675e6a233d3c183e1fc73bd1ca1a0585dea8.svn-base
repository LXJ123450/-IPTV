    try{
    	var currentAreaId;
        var tag_id;
        var userId;
        var ajaxUrl;
        var categoryData = [],
            structData   = [],
            flashData    = [],
            navIndexSrc  = [];
        var categoryNumber = 8;
        var categoryCookie = [];
        var imgType;
        var indexData;
        var selectId = XEpg.area("nav2").getSelectId(); //选中的标签id
        var pageNum = 1;//页码
        var pageSize = 8;//每页显示数
        var totalCount;//数据总条数
        var totalPage ;
        var retFromDetail;
        var tag_cat;
        var selectTag;
    	var epgPlatform;
    	var areaCode;
    	var TradeId;
    	var back_epg_url;
    	var urlParams = XEpg.Util.getUrlParameterObj(document.URL);//获取记录地址里的参数对象
    	var back_url;
    	var myselfTagg;
    	var isPlay;
    	var userIP;
    }catch(e){
    	console.log("error:"+e.message);
    }
    window.onload=function()
    {
    	XEpg.Util.setCookie("back_url_epg", "");
    	XEpg.Util.setCookie("photo_url", "album.html");
        getTime();
        userId = XEpg.Util.getCookie('userId');
		if (urlParams != null && urlParams != 'null' && urlParams != undefined) 
		{
			userId = urlParams.userId;
			if (userId != null && userId != 'null' && userId != undefined) 
			{
			  XEpg.Util.setCookie("userId", userId);
			}
			else{
				userId = XEpg.Util.getCookie('userId');
			}
			userIP = urlParams.USERIP;
			if (userIP != null && userIP != 'null' && userIP != undefined && userIP !="") 
			{
			  XEpg.Util.setCookie("userIP", userIP);
			}
			else{
				userIP = XEpg.Util.getCookie('userIP');
			}
			epgPlatform=XEpg.Util.getCookie('epgPlatform');
			if (epgPlatform == null || epgPlatform == 'null' || epgPlatform == undefined) 
			{
			  epgPlatform = urlParams.epgPlatform;
			  XEpg.Util.setCookie("epgPlatform", epgPlatform);
			}
			areaCode = XEpg.Util.getCookie('areaCode');
			if (areaCode == null || areaCode == 'null' || areaCode == undefined) 
			{
			  areaCode = urlParams.areaCode;
			  XEpg.Util.setCookie("areaCode", areaCode);
			}
			TradeId = XEpg.Util.getCookie('TradeId');
			if (TradeId==null || TradeId=='null' || TradeId==undefined) 
			{
			  TradeId = urlParams.TradeId;
			  XEpg.Util.setCookie("TradeId", TradeId);
			}
			back_url = urlParams.back_url;
			if (back_url != null && back_url != 'null' && back_url != undefined) 
			{
			  back_epg_url = decodeURIComponent(back_url);
			  XEpg.Util.setCookie("back_epg_url", back_epg_url);
			  XEpg.Util.setCookie("photo_url11", back_epg_url);
			}
			back_epg_url = XEpg.Util.getCookie('back_epg_url');
			if (back_epg_url == null || back_epg_url == 'null' || back_epg_url == undefined || back_epg_url == "") 
			{
			  try{
				 back_epg_url=Authentication.CTCGetConfig("EPGDomain");
			  }catch(e){
				 console.log("error:"+e.message);
			  }
			  	 XEpg.Util.setCookie("back_epg_url",back_epg_url);
			}
		}
		versionSend();
	    window.focus();
	    selectTag = '全部';
	    if(XEpg.Util.getCookie("structId") != "")
	    {
	    	XEpg.Util.delCookie("structId");
	    }
	    //默认记录焦点，,传了区域ID，没传currentId,则默认取当前区域的第一个元素，页面标识
	    XEpg.My.init({"backType":2});
	    if(XEpg.My.historyObj != null && typeof(XEpg.My.historyObj.currentAreaId) != "undefined")
	    {
	        currentAreaId = XEpg.My.historyObj.currentAreaId;
	    }
	    var tag_txt       = XEpg.Util.getUrlParam(document.URL, "tag_txt"); 
	        retFromDetail = XEpg.Util.getUrlParam(document.URL, "retFromDetail"); 
	        if(retFromDetail)
	        {
	            var pages     = pageNum = XEpg.Util.getUrlParam(document.URL, "pages");
	            var position  =  XEpg.Util.getUrlParam(document.URL, "position");
	                selectTag = imgType = XEpg.Util.getUrlParam(document.URL, "tag");
                	ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' +'&type='+ selectTag 
            		        + '&pages=' + pages + '&pageNumbs=' + pageSize;
	            if(position <= 3)
	            {
	                currentAreaId = 'nav3';
	                tag_id = 'nav3_' + position; 
	            }else if(position > 3){
	                currentAreaId = 'nav4';
	                var a = parseInt(position) - 4;
	                tag_id = 'nav4_' + a;
	            }
	            if(selectTag == '全部'){
	                tag_cat = 'nav2_0';
	            }else if(selectTag == '视频'){
	                tag_cat = 'nav2_1';
	            }else if(selectTag == '家庭'){
	            	tag_cat = 'nav2_2';
	            }else if(selectTag == '人物'){
	                tag_cat =  'nav2_3';
	            }else if(selectTag == '风景'){
	                tag_cat =  'nav2_4';
	            }else if(selectTag == '美食'){
	                tag_cat =  'nav2_5';
	            }else if(selectTag == '旅游'){
	                tag_cat =  'nav2_6';
	            }else if(selectTag == '3D'){
	                tag_cat = 'nav2_7';
	            }else if(selectTag == '其他'){
	                tag_cat = 'nav2_8';
	            }else if(selectTag == '收到的照片'){
	            	tag_cat = 'nav2_9';
	            }else if(selectTag != '全部' || selectTag != '家庭' || selectTag != '人物' || selectTag != '风景' || selectTag != '美食' || selectTag != '旅游' || selectTag != '3D' || selectTag != '其他' || selectTag != '收到的照片'){
	            	XEpg.$("myselfTagg").addStyle("display:block;");
	            	XEpg.$("myselfTagg").html(selectTag);
	            }
	            XEpg.$(tag_cat).addClassName('item_tag_focus');
	            getData(ajaxUrl);
	        }else if(tag_txt){
	        	if(tag_txt == '家庭'){
	        		tag_id = 'nav2_1';
	        	}else if(tag_txt == '视频'){
	        		tag_id = 'nav2_2';
	        	}else if(tag_txt == '人物'){
	        		tag_id =  'nav2_3';
	        	}else if(tag_txt == '风景'){
	        		tag_id =  'nav2_4';
	        	}else if(tag_txt == '美食'){
	        		tag_id =  'nav2_5';
	        	}else if(tag_txt == '旅游'){
	        		tag_id =  'nav2_6';
	            }else if(tag_txt == '3D'){
	                tag_id = 'nav2_7';
	        	}else if(tag_txt == '其他'){
	        		tag_id = 'nav2_8';
	        	}else if(tag_txt == '收到的照片'){
	        		tag_id = 'nav2_9';
	        	}
	        	//接受上一页面传递过来是家庭还是TV
                ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' +'&type='+ tag_txt 
            		      + '&pages=' + pageNum + '&pageNumbs=' + pageSize;
	        }else{
                ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' +'&type=全部&pages='
        			       + pageNum + '&pageNumbs=' + pageSize;
	                
	        }
	        //判断是否有照片，如果没有则弹出提示框提示用户 2017-07-25 14:21 安苏
	        if (!retFromDetail)
	        {
                	XEpg.Util.ajaxPost("getImagesOrVideos","userId="+userId+"&category=0&type=0&pages=1&pageNumbs=8", function(obj)
                	{
        				var res      = JSON.parse(obj);
        				var albumNum = res.data.Img.length;
        				if (albumNum > 0)  
        				{
        					XEpg.My.init({"currentAreaId":"nav2", "currentId":tag_id});
        					XEpg.$("confirm").style("display:none;");
        					tagFocus();
        				}else{
        					XEpg.$("nav11_0").addClassName("item_focus");
        					XEpg.My.init({"currentAreaId":"nav11", "currentId":tag_id});
        					XEpg.$("confirm").style("display:block;");
        				}
                	});
	        }
	       XEpg.My.init({"currentAreaId":currentAreaId, "currentId":tag_id});
	       initNav();
	       XEpg.My.pageLoadShowFocus();
	        
    }
    function getData(url)
    {
        XEpg.Util.ajaxGet(url, function(e)
        {
            var res = JSON.parse(e);
            if(res.code == '100001')
            {
                indexData = res.data.Img;
                totalCount = res.count;
                totalPage = XEpg.Util.getPageTotal(totalCount,pageSize);
                //共多少张照片
                var totalNum = "共" + "<span style='color:#ffbd16'>"+totalCount+"</span>" + "张照片/视频";
                XEpg.$('totalNum').html(totalNum);
                var textCount = pageNum + '/' + totalPage;
                XEpg.$('textCount').html(textCount);
                if(pageNum <= 1)
                {
            		 document.getElementById('prev_page').style.display = 'none'; 
            	     if(pageNum == totalPage)
            	     {
            	    	 document.getElementById('next_page').style.display = 'none';
            	     }else{
            	    	 document.getElementById('next_page').style.display = 'block';
            	     }
                 }else{
                	 document.getElementById('prev_page').style.display = 'block'; 
                	 if(pageNum == totalPage)
                	 {
            	    	 document.getElementById('next_page').style.display = 'none';
            	     }else{
            	    	 document.getElementById('next_page').style.display = 'block';
            	     }
                 }
                insertData(indexData);
            }else{}
        });
    }
    /*将获取的数据插入到页面*/
    function insertData(pageData)
    {
    	var nav3_content_divs = document.getElementById('content');
    	var nav3_imgs = nav3_content_divs.getElementsByClassName('content-img');
    	//获取时间的div
    	var div_div = nav3_content_divs.getElementsByClassName('picTime');
    	var nav3_pacityBgs = nav3_content_divs.getElementsByClassName('pacityBg');
    	var videoPl = nav3_content_divs.getElementsByClassName("video_play");//获取视频图标的div
    	for (var i = 0; i < nav3_imgs.length; i++)
    	{
			nav3_imgs[i].setAttribute('src', 'picture/wait_upload_inner.jpg');
			nav3_imgs[i].style.cssText = "height:188px;width:264px;";
			nav3_pacityBgs[i].style.cssText ="display:none;";
			videoPl[i].style.cssText = "display:none";//初始隐藏
		}
     	if(pageData.length > 0)
     	{
	        for (var i= 0;i < pageData.length; i++)
	        {
	        	//判断是图片还是视频
	        	var typeVideo = pageData[i]['contentType'];
	        	if(typeVideo == "2" || typeVideo == 2)
	        	{
	        		videoPl[i].style.cssText = "display:block";
	        	}else{
	        		videoPl[i].style.cssText = "display:none";
	        	}
	        	//将时间数据添加到页面中
	        	div_div[i].innerHTML=pageData[i]['createTime'].split(" ")[0];
	        	nav3_imgs[i].setAttribute('src', pageData[i]['source']['stbThumbnail']);
				var img_src = pageData[i].source.stbThumbnail;
				nav3_pacityBgs[i].style.cssText ="display:block;";
				var str_before = cutstr(img_src, "_", ".");
				var img_height = str_before.split("x")[1];//0表示之前，1表示之后
				var img_width = str_before.split("x")[0];
				if((str_before.indexOf("x") >= 0) && (img_height > 188) && (img_width > 264))
				{
					var image_top = (img_height - 188)/2;
					var image_left = (img_width - 280)/2;
					nav3_imgs[i].style.cssText = "clip:rect("+(image_top)+"px,"+(image_left+264)+"px,"+(image_top+188)+"px,"+(image_left)+"px);top:-"+image_top+"px;left:-"+(image_left-7)+"px;";
				}else{
					nav3_imgs[i].style.cssText = "height:188px;width:264px;";
				}
	        }
     	}else{
     	}
	}
	/*截取*/
	function cutstr(text, start, end)
	{
		var s = text.indexOf(start);
		if(s>-1)
		{
			var text2 = text.substr(s+start.length);
			var s2 = text2.indexOf(end);
			if(s2 > -1)
			{
				result = text2.substr(0, s2);
			}else result = '';
		}else result = '';
		return result;
	}
    function initNav()
    {
    	//返回按钮
        XEpg.area("nav1").setColumn(1).setRow(1).subClick({"func":ret}).left({"area":{"id":"nav7","isMemory":true}},{"func":changeReturnButtonNoFocus}).down({"area":{"id":"nav2","isMemory":true}},{"func":changeReturnButtonNoFocus}).run();
        //使用帮助
        XEpg.area("nav7").setColumn(1).setRow(1).subClick({"func":bindingManage}).left([{"area":{"id":"nav10"}}]).right({"area":{"id":"nav1","isMemory":true}},{"func":changeReturnButtonFocus}).down([{"area":{"id":"nav2","isMemory":true}}]).run();
        //好友管理
        XEpg.area("nav8").setColumn(1).setRow(1)
        	.down([{"area":{"id":"nav2","isMemory":true}}])
        	.left([{"area":{"id":"nav2"}}])
        	.right({"area":{"id":"nav9","isMemory":true}})
        	.subClick({"func":goBind}).run();
        //按好友查看按钮 
        XEpg.area("nav9").setColumn(1).setRow(1).down([{"area":{"id":"nav2","isMemory":true}}]).left([{"area":{"id":"nav8"}}]).right({"area":{"id":"nav10","isMemory":true}}).subClick({"func":phoneInsert}).run();
        //i视视下载按钮
        XEpg.area("nav10").setColumn(1).setRow(1).down([{"area":{"id":"nav2", "isMemory":true}}]).left([{"area":{"id":"nav2"}}]).right({"area":{"id":"nav7", "isMemory":true}}).subClick({"func":shareFriendAlbum}).run();
        //类别导航条按钮
        XEpg.area("nav2").setColumn(10).setRow(1)
        	.down({"area":{"id":"nav3","isMemory":true}},{"func":addTagBg})
        	.up({"area":{"id":"nav8","isMemory":true}})
        	.subFocus({'func':tagFocus})
        	.right({"area":{"id":"nav12"}})
        	.subBlur({'func':tagBlur}).run();
        //自定义标签
        XEpg.area("nav12").setColumn(1).setRow(1)
        	.left({"area":{"id":"nav2","indexs":[9]}})
        	.down({"area":{"id":"nav13"}})
        	.subFocus({'func':nav12TagFocus})
        	.subClick({"func":nav12Click})
        	.subBlur({"func":nav12SubBlur}).run();
        //自定义标签下面隐藏部分
        XEpg.area("nav13").setColumn(1).setRow(5)
        	.up({"area":{"id":"nav12"}},{"func":nav13Up})
        	.left({"func":nav13Up},{"area":{"id":"nav3","isMemory":true}})
        	.subBlur({"func":nav13SubBlur})
        	.subFocus({"func":nav13subFocus})
        	.subClick({"func":nav13click}).run();
        //图片处理
        XEpg.area("nav3").setColumn(4).setRow(1)
        	.up({"area":{"id":"nav2"}},{'func':removeTaBg})
        	.left({'func':prevPage}).right({'func':nextPage})
        	.down({"area":{"id":"nav4","indexs":[0,1,2,3],'isMemeroy':true}}).run();
        XEpg.area("nav4").setColumn(4).setRow(1).up([{"area":{"id":"nav3","indexs":[0,1,2,3]}}]).left({'func':prevPage}).right({'func':nextPage}).down({"area":{"id":"nav5","isMemory":true}}).run();
        //上一页
        XEpg.area("nav5").setColumn(1).setRow(1).up({"area":{"id":"nav4"}}).right({"area":{"id":"nav6"}}).run();
        //下一页
        XEpg.area("nav6").setColumn(1).setRow(1).subClick({"func":nextPage}).up({"area":{"id":"nav4"}}).left({"area":{"id":"nav5"}}).run();
        //图片偏移&图片点击事件
        XEpg.area("nav3").subFocus({"func":nav3Focus}).subBlur({"func":nav3Blur}).setColumn(4).setRow(1).subClick({"func":navClick3}).run();
        XEpg.area("nav4").subFocus({"func":nav4Focus}).subBlur({"func":nav4Blur}).setColumn(4).setRow(1).subClick({"func":navClick4}).run();
        XEpg.area("nav5").subClick({"func":prevPage}).subFocus([{"func":inputFocus},{"class":"item item_focus"}]).run();
        //弹出框的按钮
        XEpg.area("nav11").setColumn(1).setRow(1).subClick({"func":aletKuang}).run();
    }
    var commTagg;
    function nav13click()
    {
    	temp=0;
    	var a = XEpg.My.currentId;
    	var dd = XEpg.$(a).attr("tag"); 
    	commTagg == dd;
    	XEpg.$("taggBg").addStyle("display:none;");
    	XEpg.$("taggBg").html("");
    	XEpg.$("myselfTagg").addStyle("display:block;");
    	XEpg.$("myselfTagg").html(dd);
    	XEpg.My.init({"currentAreaId":"nav3", "currentId":"nav3_0"});
    	XEpg.My.init({"backType":2});
    	XEpg.My.onFocusById("nav3_0");
    	XEpg.My.pageLoadShowFocus();
    	XEpg.area("nav13").clearObj();
    }
    function nav13Up()
    {
    	temp=0;
    	var a = XEpg.My.currentId;
    	var aa = XEpg.$(a).attr("tag");
    	XEpg.$("myselfTagg").html(aa);
    	XEpg.$("myselfTagg").addStyle("display:block;");
    	if(myselfTagg == "")
    	{
    		myselfTagg = "全部";
    	}
    	selectTag = myselfTagg;
    	ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' + '&type=' + myselfTagg + '&pages=' 
                + pageNum + '&pageNumbs=' + pageSize;
    	getData(ajaxUrl);
        XEpg.$(a).addClassName("item_focus");
    	XEpg.$("taggBg").addStyle("display:none;");
    	XEpg.$("taggBg").html("");
    	XEpg.area("nav13").clearObj();
    }
    function nav13SubBlur()
    {
    	var a = XEpg.My.currentId;
        XEpg.$(a).removeClassName("item_focus");
    }
    /*
     * 描述：焦点移动到下拉的区域的标签上面发送的请求
     * */
    function nav13subFocus()
    {
    	XEpg.area("nav13").clearObj();
    	var a = XEpg.My.currentId;
    	var tagnav13Type  = XEpg.$(a).attr('tag'); 
    	myselfTagg = tagnav13Type;
    	if(tagnav13Type == "")
    	{
    		tagnav13Type = "全部";
    	}
    	selectTag = tagnav13Type;
    	ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' + '&type=' + tagnav13Type + '&pages=' 
                + pageNum + '&pageNumbs=' + pageSize;
    	getData(ajaxUrl);
        XEpg.$(a).addClassName("item_focus");
    }
    function nav12SubBlur()
    {
    	var a = XEpg.My.currentId;
        XEpg.$(a).removeClassName("item_focus");
    	//XEpg.$("taggBg").addStyle("display:none;");
    }
    /*
     * 描述：点击自定义标签向下拉的区域添加数据
     * */
    var temp = 0;
    function nav12Click()
    {
    	if(temp==0){
    		//获取自定义标签
	       	 XEpg.Util.ajaxGet("getTagbyItvNum?itvNum=" + userId, function(data){
	       		 var Result1 = JSON.parse(data).result;
	       		 var html1 = '';
	       		 var top=0;
	       		 for(var i=0;i<Result1.length;i++){
	         			html1 += '<div style="position: absolute;top:'+top+'px;width:398px;" id="nav13_'+i+'" class="contentList" tag="'+Result1[i].tag+'">'+Result1[i].tag+' </div>';
	         	    	XEpg.$("taggBg").addStyle("display:block;");
	         	    	top+=70;
	       		 }
				 if(Result1.length > 0)
				 {
					XEpg.$("taggBg").html(html1);
				 }else{
					 return false;
				 }
	       	 });
	       	 temp=1;
    	}else{
    		nav13Up();
    		temp=0;
    	}
    	
    }
    function nav12TagFocus()
    {
    	var a = XEpg.My.currentId;
        XEpg.$(a).addClassName("tagg item_focus");
    }
    function aletKuang()
    {
    	XEpg.$("confirm").style("display:none;");
    	XEpg.My.onFocusById("nav2_0");
	    //默认记录焦点，,传了区域ID，没传currentId,则默认取当前区域的第一个元素，页面标识
	    XEpg.My.init({"backType":2});
	    XEpg.My.init({"currentAreaId":currentAreaId, "currentId":tag_id});
	      // initNav();
	      // XEpg.My.pageLoadShowFocus();
    }
    function goBind()
    {
    	XEpg.My.gotoPage("frendManage.html");
    }
    /*手机查看按钮执行事件 2017-06-29 18:15 修改人：安苏*/
    function phoneInsert()
    {
    	try{
    		var stbVersion = Authentication.CTCGetConfig("STBVersion");
    	}catch(e){
    		var stbVersion="HWV206015P0000";
    		console.log("error:"+e.message);
    	}
     	var d = Date.parse(new Date());//获取时间戳
     	var procid = codeComplete22(d);	//拼接随机码
     	var uu = "getFort?itvNum=" + userId + "&procid=" + procid+"&boxVession="+stbVersion;
     	XEpg.Util.ajaxGet(uu, function(data)
     	{
     		var res = JSON.parse(data);
     		var resLength = res.result.length;
     		if(resLength > 0)
     		{
     			XEpg.My.gotoPage("phoneNumber.html");
     		}else{
     			return;
     		}
     	});
    }
    /*i视视下载按钮*/
    function shareFriendAlbum()
    {
    	//XEpg.My.gotoPage("scanMa.html?backUrl=album.html&userId="+userId);
		//XEpg.My.gotoPage("new_my_album.html?serial=0NTGB0O98TG6&tag=%E5%AE%B6%E5%BA%AD&desp=&createTime=2017-11-28%2016:45:20&phone=18708146785&view=http://110.190.90.238:9091//image/HGZS16ITVP/view/HGZS16ITVP1C00SQBVK6CNE2_810x1080.png&width=3024&height=4032&itvNum=HGZS16@ITVP&USERIP=10.184.246.137&BACKEPG=http://182.139.247.213:33200/EPG/jsp/hw/en/Category.jsp");
		XEpg.My.gotoPage("http://182.131.0.107:8385/photo-epg/index.jsp?INFO=%3CuserId%3EDMT05%3C%2FuserId%3E%3CuserToken%3EiQ1eW42AWJnW90Oow1oz7fr136461333%3C%2FuserToken%3E%3CTokenExpiretime%3E20170522102945%3C%2FTokenExpiretime%3E%3CstbId%3E4D1091990070321000003CDA2AA6B132%3C%2FstbId%3E%3CareaCode%3E101%3C%2FareaCode%3E%3CuserIP%3E10.76.27.191%3C%2FuserIP%3E%3CGroupId%3E16%3C%2FGroupId%3E%3CTradeId%3E2%3C%2FTradeId%3E%3Ckey%3E3%3A2%3C%2Fkey%3E%3Cback_epg_url%3Ehttp%3A%2F%2F182.138.49.68%3A8080%2Fiptvepg%2Fframe237%2Fportal1.jsp%3FleaveFocusId%3D11%261%3D1%3C%2Fback_epg_url%3E%3CepgPlatform%3E1%3C%2FepgPlatform%3E%3Cback_epg_url_par%3E%3C%2Fback_epg_url_par%3E%3CuserIP%3E%3C%2FuserIP%3E%3CoptFlag%3EAMSPORTALZTE%3C%2FoptFlag%3E%3Cmac%3E3C%3ADA%3A2A%3AA6%3AB1%3A32%3C%2Fmac%3E");
		//XEpg.My.gotoPage("http://218.6.169.98:28090/interactiveZone.html");
		
	}
    /*处理标签栏失焦下移时保留背景色*/
    var currentIdCategory = [];
    function tagFocus()
    {   	
        currentAreaId = 'nav2';
        if(tag_cat)
        {
            XEpg.My.init({"currentAreaId":currentAreaId, "currentId":tag_cat});
            tag_cat = null;
        }
        var a        = XEpg.My.currentId;
            selectId = a;
            imgType  = XEpg.$(a).attr('tag');
        XEpg.$(a).addClassName('item_tag_focus');
    	currentIdCategory.push(XEpg.My.currentId);
		if(currentIdCategory.length == 2)
		{
			if(currentIdCategory[0] != currentIdCategory[1])
			{
				pageNum = 1;
				currentIdCategory.shift();
			}else{
				currentIdCategory.shift();
			}
		}
        selectTag = XEpg.$(currentIdCategory[0]).attr('tag');
        if(imgType==null)
        {
        	imgType = "全部";
        }
        	ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' + '&type='+imgType + '&pages=' 
                    + pageNum + '&pageNumbs=' + pageSize;
        getData(ajaxUrl);
    }
    function tagBlur() 
    {
        var a = XEpg.My.currentId;
        XEpg.$(a).removeClassName('item_tag_focus');
    }
    function addTagBg() 
    {
    	XEpg.$(selectId).addClassName('item_tag_down_focus');
    }
    function removeTaBg() 
    {
    	XEpg.$(selectId).removeClassName('item_tag_down_focus');
    	XEpg.$("myselfTagg").addStyle("display:none;");
    }
    /*按左键删除输入的数字*/
    function clearNum() 
    {
        var str    = XEpg.$('nav5_0').html();
        var strLen = XEpg.Util.getStrRealLen(str);
        var cutLen = strLen - 1;
        if (cutLen <= 0)
        {
            XEpg.$('nav5_0').html('');
        }else{
            var cutStr = XEpg.Util.getSubStr(str,cutLen);
            XEpg.$('nav5_0').html(cutStr);
        }
    }
    /*下一页*/
    XEpg.Nav.key_pageDown_event = nextPage;
    function nextPage() 
    {
        pageNum++;
        if (parseInt(pageNum) == totalPage)
        {
            document.getElementById('next_page').style.display = 'none';        
        }
        if (parseInt(pageNum) > parseInt(totalPage))
        {
            pageNum = totalPage;
            document.getElementById('next_page').style.display = 'none';return;
        }
        document.getElementById('prev_page').style.display = 'block';
        	ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' +'&type=' + imgType + '&pages='
    		+ pageNum+'&pageNumbs='+pageSize;
        getData(ajaxUrl);
    }
    /*上一页*/
    XEpg.Nav.key_pageUp_event = prevPage;
    function prevPage() 
    {
        pageNum--;
        if (pageNum < 1)
        {
            pageNum = 1;
            document.getElementById('prev_page').style.display = 'none';return;
        }
        if (pageNum == 1)
        {
            document.getElementById('prev_page').style.display = 'none';
        }
        	ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' +'&type=' + imgType + '&pages='
                    + pageNum + '&pageNumbs=' + pageSize;
        document.getElementById('next_page').style.display = 'block';
        getData(ajaxUrl);
    }
    /*图片上移*/
    function nav3Focus() 
    {
    	//78  354  630  906
        var a = XEpg.My.currentId;
     	var posIndex = parseInt(XEpg.My.getIdIndex(a));
     	var style = 'top:222px;' + 'left:' + (276*posIndex + 78)+'px;' + 'position:absolute; width:279px; height:203px;';
        XEpg.$(a).addStyle(style);
        XEpg.$(a).addClassName('item_video_focus');
    }
    /*图片复位*/
    function nav3Blur() 
    {
        var a = XEpg.My.currentId;
        var posIndex = parseInt(XEpg.My.getIdIndex(a));
     	var style = 'top:232px;' + 'left:' + (276*posIndex + 78)+'px;' + 'position:absolute; width:279px; height:203px;';
        XEpg.$(a).addStyle(style);
        XEpg.$(a).removeClassName('item_video_focus');
    }
    /*图片上移*/
    function nav4Focus() 
    {
        var a = XEpg.My.currentId;
        var posIndex = parseInt(XEpg.My.getIdIndex(a));
     	var style = 'top:434px;' + 'left:' + (276*posIndex + 78)+'px;' + 'position:absolute; width:279px; height:203px;';
        XEpg.$(a).addStyle(style);
        XEpg.$(a).addClassName('item_video_focus');
    }
    /*图片复位*/
    function nav4Blur() 
    {
        var a = XEpg.My.currentId;
        var posIndex = parseInt(XEpg.My.getIdIndex(a));
     	var style = 'top:444px;' + 'left:' + (276*posIndex + 78)+'px;' + 'position:absolute; width:279px; height:203px;';
        XEpg.$(a).addStyle(style);
        XEpg.$(a).removeClassName('item_video_focus');
    }
    /*返回*/
    XEpg.Nav.key_back_event=ret;
    function ret()
    {
    	if(document.getElementById("taggBg").style.display == "block")
    	{
    		XEpg.$("taggBg").addStyle("display:none;");
    		XEpg.My.init({"currentAreaId":"nav12","currentId":"nav12_0"});
    		XEpg.My.onFocusById("nav12_0");
    		XEpg.My.pageLoadShowFocus();
    	}else{
    		var backUrl2 = XEpg.Util.getCookie('photo_url11');
    		if(backUrl2)
    		{
    			XEpg.Util.gotoPage(backUrl2);
    		}else{//返回第三方入口
    	         var blackUrl1 = XEpg.Util.getCookie('back_epg_url');
    			 if(blackUrl1 == "" || blackUrl1 ==null || blackUrl1=="null" || blackUrl1 == undefined || blackUrl1 == "undefined"){
    				 try{
    					 blackUrl1 =  Authentication.CTCGetConfig("EPGDomain"); 
    				 }catch(e){
    					 console.log("error:"+e.message);
    				 }
    			 }
    			XEpg.Util.gotoPage(blackUrl1);
    		}
    	}
	}
    /*跳转到绑定管理*/
    function bindingManage()
    {
		//XEpg.My.gotoPage("http://110.190.90.211:8090/interactiveZone.jsp?source=0&INFO=%3CuserId%3Ezl237%3C%2FuserId%3E%3CuserToken%3EiQ1eW42AWJnW90Oow1oz7fr136461333%3C%2FuserToken%3E%3CTokenExpiretime%3E20170522102945%3C%2FTokenExpiretime%3E%3CstbId%3E4D1091990070321000003CDA2AA6B132%3C%2FstbId%3E%3CareaCode%3E101%3C%2FareaCode%3E%3CuserIP%3E10.76.27.191%3C%2FuserIP%3E%3CGroupId%3E16%3C%2FGroupId%3E%3CTradeId%3E7%3C%2FTradeId%3E%3Ckey%3E3%3A2%3C%2Fkey%3E%3Cback_epg_url%3Ehttp%3A%2F%2F182.138.49.68%3A8080%2Fiptvepg%2Fframe237%2Fportal1.jsp%3FleaveFocusId%3D11%261%3D1%3C%2Fback_epg_url%3E%3CepgPlatform%3E1%3C%2FepgPlatform%3E%3Cback_epg_url_par%3E%3C%2Fback_epg_url_par%3E%3CuserIP%3E%3C%2FuserIP%3E%3CoptFlag%3EAMSPORTALZTE%3C%2FoptFlag%3E%3Cmac%3E3C%3ADA%3A2A%3AA6%3AB1%3A32%3C%2Fmac%3E")
		XEpg.My.gotoPage("http://218.6.169.98:28090/interactiveZone.jsp?source=0&INFO=%3CuserId%3Ezl237%3C%2FuserId%3E%3CuserToken%3EiQ1eW42AWJnW90Oow1oz7fr136461333%3C%2FuserToken%3E%3CTokenExpiretime%3E20170522102945%3C%2FTokenExpiretime%3E%3CstbId%3E4D1091990070321000003CDA2AA6B132%3C%2FstbId%3E%3CareaCode%3E101%3C%2FareaCode%3E%3CuserIP%3E10.76.27.191%3C%2FuserIP%3E%3CGroupId%3E16%3C%2FGroupId%3E%3CTradeId%3E7%3C%2FTradeId%3E%3Ckey%3E3%3A2%3C%2Fkey%3E%3Cback_epg_url%3Ehttp%3A%2F%2F182.138.49.68%3A8080%2Fiptvepg%2Fframe237%2Fportal1.jsp%3FleaveFocusId%3D11%261%3D1%3C%2Fback_epg_url%3E%3CepgPlatform%3E1%3C%2FepgPlatform%3E%3Cback_epg_url_par%3E%3C%2Fback_epg_url_par%3E%3CuserIP%3E%3C%2FuserIP%3E%3CoptFlag%3EAMSPORTALZTE%3C%2FoptFlag%3E%3Cmac%3E3C%3ADA%3A2A%3AA6%3AB1%3A32%3C%2Fmac%3E");
        //XEpg.My.gotoPage("http://110.190.90.211:8090/interactiveZone.jsp?source=0&INFO=%3CuserId%3EHGZS16%40ITVP%3C%2FuserId%3E%3CuserToken%3EiQ1eW42AWJnW90Oow1oz7fr136461333%3C%2FuserToken%3E%3CTokenExpiretime%3E20170522102945%3C%2FTokenExpiretime%3E%3CstbId%3E4D1091990070321000003CDA2AA6B132%3C%2FstbId%3E%3CareaCode%3E101%3C%2FareaCode%3E%3CuserIP%3E10.76.27.191%3C%2FuserIP%3E%3CGroupId%3E16%3C%2FGroupId%3E%3CTradeId%3E7%3C%2FTradeId%3E%3Ckey%3E3%3A2%3C%2Fkey%3E%3Cback_epg_url%3Ehttp%3A%2F%2F182.138.49.68%3A8080%2Fiptvepg%2Fframe237%2Fportal1.jsp%3FleaveFocusId%3D11%261%3D1%3C%2Fback_epg_url%3E%3CepgPlatform%3E1%3C%2FepgPlatform%3E%3Cback_epg_url_par%3E%3C%2Fback_epg_url_par%3E%3CuserIP%3E%3C%2FuserIP%3E%3CoptFlag%3EAMSPORTALZTE%3C%2FoptFlag%3E%3Cmac%3E3C%3ADA%3A2A%3AA6%3AB1%3A32%3C%2Fmac%3E");
		//XEpg.My.gotoPage("http://218.6.169.98:28090/interactiveZone.html?INFO=<userId>zl237</userId><userToken>iQ1eW42AWJnW90Oow1oz7fr136461333</userToken><TokenExpiretime>20170522102945</TokenExpiretime><stbId>4D1091990070321000003CDA2AA6B132</stbId><areaCode>101</areaCode><userIP>10.76.27.191</userIP><GroupId>16</GroupId><TradeId>2</TradeId><key>3:2</key><back_epg_url>http://182.138.49.68:8080/iptvepg/frame237/portal1.jsp?leaveFocusId=11&1=1</back_epg_url><epgPlatform>1</epgPlatform><back_epg_url_par></back_epg_url_par><userIP></userIP><optFlag>AMSPORTALZTE</optFlag><mac>3C:DA:2A:A6:B1:32</mac>");
		//XEpg.My.gotoPage("iJieShao.html?backUrl=album.html");
    }
    function navClick3 () 
    {
 		var a          = XEpg.area("nav3").getAreaIndexByCurrentId();
     	var serial     = indexData[a]['serial'];
     	var isVideo    = indexData[a]['contentType'];//获取判断是否是视频的字段
        var tag        = selectTag;
     	var desp       = indexData[a]['desp'];
     	var createTime = indexData[a]['createTime'];
     	var phone      = indexData[a]['originMan']['phone'];
     	var view       = indexData[a]['source']['view'];
     	var stbThumbnail = indexData[a]['source']['stbThumbnail'];
     	var width      = indexData[a]['source']['width'];
     	var height     = indexData[a]['source']['height'];
     	var uname      = indexData[a]['name'];
     	//判断是否为高清图片的路径2017-08-02
     	var original   = indexData[a]['originMan']['original'];
     	var thumb4k    = indexData[a]['source']['thumb4k'];
     	var thumbHD    = indexData[a]['source']['thumbHD'];
     	try{
     		var stbVersion = Authentication.CTCGetConfig("STBVersion");
        	//var stbVersion = "HWV206015P0000";
     	}catch(e){
            var stbVersion = "HWV206015P0000";
     		console.log("error:"+e.message);
     	}
    	var vie_img;
    	XEpg.Util.ajaxGet("getTerminal?terminal=" + stbVersion, function(data)
    	{
    		var Result1 = JSON.parse(data).result;
    		//1、判断是否是原图2、如果不是原图  就去VIEW作为 大图显示   3、如果是原图   4K盒子就去4K   高清盒子 就取 HD。
    		if (original == true && Result1 == false)
    		{
    			if(thumbHD != null)
    			{
    				vie_img = thumbHD;
    			}else{
    				vie_img = view;
    			}
    			
    		}else if (original == true && Result1 == true)
    		{
    			if(thumbHD != null)
    			{
        			vie_img = thumb4k;
    			}else{
    				vie_img = view;
    			}
    			
    		}else if (original == false)
    		{
    			vie_img = view;
    		}
    		if(imgType == '全部')
            {
                tag = '全部';
            }
            if(serial)
            {
            	var navclick3 = 'new_my_album.html?userId=' + userId + '&serial=' + serial + '&tag=' + tag
            				  + '&name=' + uname + '&desp=' + desp + '&createTime=' + createTime + '&view='
            				  + view + '&width=' + width + '&height=' + height + '&phone=' + phone 
            				  + '&pageNum='+pageNum+'&position='+a+'&list=true'+'&originMan='+original+'&thumb4k='
            				  + thumb4k+'&thumbHD='+thumbHD + '&stbThumbnail=' + stbThumbnail + "&isPlay=" + isVideo;
            	XEpg.My.gotoPage(navclick3);
            }
    	});
    }
    function navClick4() 
    {
 		var a          = XEpg.area("nav4").getAreaIndexByCurrentId();
 		var b          = parseInt(a) + 4;
     	var serial     = indexData[b]['serial'];
     	var isVideo    = indexData[b]['contentType'];//获取判断是否是视频的字段
        var tag        = selectTag;
     	var desp       = indexData[b]['desp'];
     	var createTime = indexData[b]['createTime'];
     	var phone      = indexData[b]['originMan']['phone'];
     	var view       = indexData[b]['source']['view'];
     	var stbThumbnail = indexData[b]['source']['stbThumbnail'];
     	var width      = indexData[b]['source']['width'];
     	var height     = indexData[b]['source']['height'];
     	var uname      = indexData[b]['name'];
     	//判断是否为高清图片的路径2017-08-02
     	var original   = indexData[b]['originMan']['original'];
     	var thumb4k    = indexData[b]['source']['thumb4k'];
     	var thumbHD    = indexData[b]['source']['thumbHD'];
     	
     	try{
     		var stbVersion = Authentication.CTCGetConfig("STBVersion");
        	//var stbVersion = "HWV206015P0000";
     	}catch(e){
            var stbVersion = "HWV206015P0000";
     		console.log("error:"+e.message);
     	}
    	var vie_imgB;
    	XEpg.Util.ajaxGet("getTerminal?terminal="+stbVersion, function(data)
    	{
    		var Result1 = JSON.parse(data).result;
    		//1、判断是否是原图2、如果不是原图  就去VIEW作为 大图显示   3、如果是原图   4K盒子就去4K   高清盒子 就取 HD。
    		if (original == true && Result1 == false)
    		{
    			if(thumbHD != null)
    			{
    				vie_imgB = thumbHD;
    			}else{
    				vie_imgB = view;
    			}
    			
    		}else if (original == true && Result1 == true)
    		{
    			if(thumbHD != null)
    			{
    				vie_imgB = thumb4k;
    			}else{
    				vie_imgB = view;
    			}
    			
    		}else if (original == false)
    		{
    			vie_imgB = view;
    		}
		 if(imgType == '全部')
	     {
	        tag = '全部';
	     }
	     if(serial)
	     {
        	var navcilik4 = 'new_my_album.html?userId=' + userId + '&serial=' + serial + '&tag=' + tag
        				  + '&name=' + uname + '&desp=' + desp + '&createTime=' + createTime + '&view='
        				  + view + '&width=' + width + '&height=' + height + '&phone=' + phone 
        				  + '&pageNum='+pageNum+'&position='+b+'&list=true'+'&originMan='
        				  + original+'&thumb4k='+thumb4k + '&thumbHD=' + thumbHD + '&stbThumbnail=' + stbThumbnail + "&isPlay=" + isVideo;
	        XEpg.My.gotoPage(navcilik4);
	      }
    	});
    }
    function changeReturnButtonFocus()
    {
        XEpg.$("ret-img").attr('src', './picture/return_focus.png');
    }
    function changeReturnButtonNoFocus()
    {
        XEpg.$("ret-img").attr('src', './picture/return_nofocus.png');
    }
    /*输入框聚焦和输入处理*/
    function inputFocus() 
    {
        XEpg.Nav.key_number_event = function(num) 
        {
            XEpg.$("nav5_0").addHtml(num);
            var t = XEpg.$('nav5_0').html();
            if(parseInt(t) >= parseInt(totalPage))
            {
                XEpg.$("nav5_0").html(totalPage);
            }else if(parseInt(t) <= 1){
                XEpg.$('nav5_0').html(1);
            }
        }
    }
    /*跳转键处理*/
    function jump() 
    {
        if (XEpg.$('nav5_0').html() == '')
        {
           return;
        }
        var inputNum = parseInt(XEpg.$('nav5_0').html());
        if (inputNum >= totalPage)
        {
            inputNum = totalPage;
        }else if(inputNum <=1){
            inputNum = 1;
        }
 		pageNum = inputNum;
 			ajaxUrl = 'getImagesOrVideos?userId=' + userId + '&category=1' +'&type=' + imgType + '&pages='
				    + inputNum + '&pageNumbs=' + pageSize;
 		getData(ajaxUrl);
    }
    /*版本号上送*/
	function versionSend(){
		try{
			var stbVersion = Authentication.CTCGetConfig("STBVersion");
		}catch(e){
			var stbVersion = "HWV206015P0000";
			console.log("error:"+e.message);
		}
		var d = Date.parse(new Date());//获取时间戳
		var procid = codeComplete22(d);	//拼接随机码
		XEpg.Util.ajaxPost("getTopBoxBindingMsg","userId="+userId+"&procid="+procid+"&stbVersion="+stbVersion,function(data){}); 
	}
