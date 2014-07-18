/*******
 *WhatsSite
 *tell the catogory of a site
 *
 *author:Pan Foo.
 *last modified : 2014/07/18-23.00
 ************/

//nead jquery first


//get the site meta-description for search engines
var bgPage = chrome.extension.getBackgroundPage();
var siteDomain = bgPage.siteDomain;
var metaKey = bgPage.metaKey;
var metaDes = bgPage.metaDes;

function checkMeta() {
	console.log(bgPage.siteUrl);

	console.log("check in!");
	$.ajax({
		url: bgPage.siteUrl,
		type: "get",
		success: function(data) {
			metaKey = getKeywords(data);
			metaDes = getDes(data);
			console.log(metaDes);

		}

	});

}
$(document).ready(function() {
	$("#siteSource").empty();
	$("#siteSource").html($("#siteSource").html() + "<em>siteUrl:</em>" + siteDomain + "<br/>" + "<em>metaKey:</em>" + metaKey + "<br/>" + "<em>metaDes:</em>" + metaDes + "<br/>");
	$("#siteSource").html($("#siteSource").html() + "<em>baikeAbstract:</em>" + bgPage.baikeResult + "<br/>");
	
});

function getKeywords(source) {
	var keywords1;
	if (source.split("<meta name=\"keywords").length > 1) {
		source = source.split("<meta name=\"keywords")[1];
		source = source.split("content=\"")[1];
		keywords1 = source.split("\"")[0];
		//localStorage['Key'] =  localStorage['Key']+keywords1;
		return keywords1;
	}
}

function getDes(source) {
	var des;
	if (source.split("<meta name=\"description").length > 1) {
		source = source.split("<meta name=\"description")[1].split("content=\"")[1];
		des = source.split("\"")[0];
		//localStorage['Des'] =  localStorage['Des']+des;
		return des;
	}
}

$("#btn_submit").click(
	function() {
		//get current tab page
		getSend();
	});

var metaK;
var metaD;


/**
 * GET request
 * */
function getSend() {
	console.log("in!");
	$.ajax({
		url: "http://www.baidu.com/s?wd=" + bgPage.siteDomain,
		type: "get",
		jsonp: "callback",
		success: function(data) {

			var resultDOM = $(".result,.result-op", data);
			for (var i = 0; i <= resultDOM.length - 1; i++) {

				var resultWithA = $("a[href]", resultDOM[i])[0];
				console.log(resultWithA);


				var linkWithA = resultWithA.getAttribute("href");
				//console.log(linkWithA);
				if (linkWithA.indexOf("http") != -1) {
					//$("#siteSource").html($("#siteSource").html() + linkWithA + "<br/>");
				}

				if (linkWithA.indexOf("baike.baidu") != -1) {
					var baikeResult = $("p:first", resultDOM[i])[0].innerText;
					//localStorage['baikeAbstract'] =  localStorage['baikeAbstract']+baikeResult;
					console.log(baikeResult);

				}



			};
			//$("#siteSource").text();
			//$("#siteSource").text(data);
			//console.log(data);
		}
	});
}
//meta data including <meta keywords> && <meta description>
//there is other information useful include site title
function getMetas(linkUrl) {
	$.ajax({
		url: linkUrl,
		type: "get",
		jsonp: "callback",
		success: function(data) {

		}
		//$("#siteSource").text();
		//$("#siteSource").text(data);
		//console.log(data);
	});
}

function getBaike(linkUrl) {
	$.ajax({
		url: linkUrl,
		type: "get",
		jsonp: "callback",
		success: function(data) {

		}

	});
}