// ==UserScript==
// @name        Backlog Ajust
// @author      Nakahara
// @description Backlog sleipnir extension.
// @icon        https://github.com/shoozhoo/etc/raw/master/sleipnir_backlog/ic_backlog.png
// @include     https://*.backlog.jp/*
// @version     0.1
// ==/UserScript==

(function(){
	var $ = jQuery;

	function wrapCenter($o,css){
		if(!css){
			css = {};
		}
		css["text-align"]="center";
		return wrap($o, css);
	}
	function wrap($o,css){
		var $div=$("<div></div>");
		if(css){
			$div.css(css)
		}
		return $div.append($o);
	}
	
	$("head").append($('<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0"/>'));
	
	$("#header").css({"padding":"0"});
	$("#header hgroup h2").css({"font-size":"120%"});
	$("#subnav li").css({"padding":"0 5px"});
	$("#projectNav").css({"padding":"0"});
	$("#projectNav ul li").css({"min-width":"60"});
	$("#projectNav ul li a").css({"line-height":"25px", "min-height":"25px", });
	//$("#searchbox").css({"width":"70px"})
	$(".subMenu a").css({"line-height":"200%"});
	$("#bodySection-col1").css({"margin":"0"});
	$("footer").css("margin-top","10px");
	
	
	// ログイン
	if($("#loginWrap").length>0){
		$("#contents").css("padding-top","0px");
		$("#login").css({"width":"100%"})
		$("#loginWrap").css({"width":"auto"});
		$(".TextInput").css({"width":"200px"});
		$("th").css({"width":"auto"});
		$(".ActionMessage").css({"width":"auto"});
		$(".Utility-box").css({"width":"", "padding":"0px", "text-align":"center"});
	}
	
	
	// プロジェクトトップ
	if(location.href.indexOf("backlog.jp/projects/")>0){
		$("#bodySection-col2").css({"margin":"0px"});
		
		$("#bodyLeftInner").css({"margin-right":"0px"});
		$("#bodyRight").css({"display":"none"});
		
		$("table tr").each(function(){
			$(".ico", this)
			.append(wrapCenter($("td.key *", this)))
			.append(wrapCenter($("td.icon *", this)))
			
			var $user = $("td.user *", this)
			var updated = $("td.updated *", this).append("<span>　</span>").text();
			
			
			var btm = $("<div style='margin-top:10px;'></div>");
			btm.append(wrap($user,{"float":"left"}));
			btm.append(wrap(updated,{"float":"right", "text-align":"right"}));
			
			$(".desc", this)
			.append(btm)
			.css({"width":"auto"});
			
			$("td.key", this).remove();
			$("td.icon", this).remove();
			$("td.user", this).remove();
			$("td.updated", this).remove();
		});
	}
	
	//検索画面
	function createTable(ths, tds){
		var r = $("<table/>").css({"width":"100%"});
		for(var i=1; i<ths.length; i++){
			var $th = $(ths[i]);
			if($th.css('display')!="none"){
				var $tr = $("<tr/>");
				$tr.append(
					$("<td/>")
					.append($th.contents().clone())
					.css({"border":"0 none"})
				);
				if(!tds[i]){ continue; }
				console.log(tds[i]);
				$tr.append($("<td/>").append(wrap(tds[i])).css({"border":"0 none"}));
				r.append($tr);
			}
		}
		$("td:gt(1)",r).css({"border":"0 none", "border-top":"1px dashed #CCCCCC"})
		return r;
	}
	$(".subMenu a").css({"line-height":"200%"});
	var $btn = $("#conditionString .Button");
	$("#conditionString .Strings-list").parent().after($("<tr/>").append($btn));
	$("#findIssueForm").prepend($(".ChgSearch").css("position","static"));
	$("#conditionToggleArea,#advancedContents").css({"padding":"0"});
	
	var list=[]
	$("#basicConditionArea td").each(function(){
		list.push(this);
	});
	for(var i=0; i<list.length; i++){
		$("#basicConditionArea ").append($("<tr/>").append(list[i]));
	}
	$("#basicConditionArea .chop").attr("size","2");
	
	$(".pager tr").each(function(){
		var $opt = $("td:eq(1)",this);
		$(this).after($("<tr/>").append($opt))
	});
	
	$("#issues-table .p_summary").each(function(){
		// 件名を大きくする
		var $this = $(this);
		$this.append(
			$("<div/>")
			.append($this.contents())
			.css({"font-size":"120%"})
		);
	});
	var thList = []
	$("#issues-table tr:first th").each(function(){
		thList.push($(this).clone());
	});
	$("#issues-table tr:first").remove();//ヘッダ行を削除
	$("#issues-table tr").each(function(){
		var tdList = [];
		$(">td",this).each(function(){
			tdList.push($(this).css("display","").contents().clone());
		});
		$(">td",this).remove();
		$(this)
		.append(
			$("<td/>")
			.append(createTable(thList, tdList))
			.css({"border-top":"1px solid #999", "border-right":"0 none"})
		);
	});
	
	// タスク画面
	$("#bodyRight").css({"display":"none"});
	$("#bodyLeftInner").css({"margin-right":"0"});
	$("#bodySection-col2").css({"margin":"0"});
	$("#issuecard").css({"padding":"0"});
	$("#issuecard .summary").css({"padding":"3px 0"});
	$("#issuecard .properties").css({"padding":"0"});
	$("#issueDescription").css({"margin-left":"0"});
	$(".CommentContent").css({"margin-left":"0"});

	// タスク追加
	$("#editissuecard").css("overflow-x","hidden");
	$("#editissuecard, .properties").css({"padding":"0"});
	$("#issue_properties tr").each(function(){
		var tds = $(">*",this);
		if(tds.length!=4){
			return;
		}
		$(this).after($("<tr/>").append(tds[2]).append(tds[3]));
	});
	
	$("#attachment").css({"display":"none"});//添付ファイル表示しない
	function addAjust(){
		$("#issue_properties th").css({"padding":"5px 5px", "font-size":"70%", "max-width":"60px"});
		$("#issue_properties td").css({"font-size":"70%"});
		$(".chzn-container").css({"max-width":"140px"});
		$("#issue_properties .Sub-link").before($("<br/>"));
	}
	addAjust();
	setTimeout(addAjust,1000);
	
})();
