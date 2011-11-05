// ==UserScript==
// @name           net.shoozhoo.google.reader
// @namespace      net.shoozhoo.google.reader
// @include        http://www.google.co.jp/reader/view/*
// ==/UserScript==
//
// Google Readerの上の余白を減らして本文のエリアを広げる
//
(function(){
	function style(id, name, val){
		var obj = document.getElementById(id);
		if(obj){
			obj.style[name]=val;
			console.log(name+"/"+val);
		}
	}
	style("viewer-header","height","30px");
	style("lhn-add-subscription-section","height","30px");
	style("top-bar","height","40px");
	style("title-and-status-holder","height","15px");
	style("title-and-status-holder","padding","2px");
	style("chrome-title","fontSize","8px");
	style("entries-status","fontSize","8px");
	style("search","padding","2px");

})();

