var metaKey;
var metaDes;
var siteUrl;
var siteDomain;
var siteUrl;
var baikeResult;


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//console.log("background onMessage in");
	chrome.tabs.getSelected(null, function(tab) {
		metaKey = "";
		metaDes = "";
		baikeResult = "";
		siteUrl = tab.url;
		///http://www.cnblogs.com/cart55free99/p/3753722.html

		var domain = tab.url.split("//")[1].split("/")[0];
		//www.cnblogs.com
		//w1.w2.w3.cnblogs.com
		//cnblogs.com
		//no regex, not robust enough
		//var re = /\..*\.(com|net|cn|org|edu|gov|info|mobi|)/
		siteDomain = domain.split(".")[domain.split(".").length - 2];
		siteUrl = "http://www." + domain.split(".")[domain.split(".").length - 2] + "." + domain.split(".")[domain.split(".").length - 1];
		if (siteDomain == "com" || siteDomain == "org" || siteDomain == "co" || siteDomain == "net") {
			siteDomain = domain.split(".")[domain.split(".").length - 3];
			siteUrl = "http://www." + domain.split(".")[domain.split(".").length - 3] + "." + domain.split(".")[domain.split(".").length - 2] + "." + domain.split(".")[domain.split(".").length - 1];
		}
		getSend();
		metaKey = request.metaKeyWords;
		metaDes = request.metaDes;
		checkMeta();
	});


	sendResponse({
		farewell: metaKey
	});
});

function checkMeta() {
	//console.log(siteUrl);

	//console.log("check in!");
	$.ajax({
		url: siteUrl,
		type: "get",
		success: function(data) {
			var t1, t2;
			t1 = getKeywords(data);
			t2 = getDes(data);
			if (metaKey == undefined || t1 != undefined)
				metaKey = t1;
			if (metaDes == undefined || t2 != undefined)
				metaDes = t2;
			//console.log(metaDes);

		}

	});

}

function getKeywords(source) {
	var keywords1;
	if (source.split("<meta name=\"keywords").length > 1) {
		source = source.split("<meta name=\"keywords")[1];
		source = source.split("content=\"")[1];
		keywords1 = source.split("\"")[0];
		var arrKey = keywords1.split(",");
		for (var k in arrKey) {
			//console.log(k);
			if ((localStorage['Key'] + "").indexOf(arrKey[k]) < 0)
				localStorage['Key'] = localStorage['Key'] + "," + arrKey[k];

		}
		return keywords1;
	}
}

function getDes(source) {
	var des;
	if (source.split("<meta name=\"description").length > 1) {
		source = source.split("<meta name=\"description")[1].split("content=\"")[1];
		des = source.split("\"")[0];
		if ((localStorage['Des'] + "").indexOf(des) < 0)
			localStorage['Des'] = localStorage['Des'] + "|" + des;
		return des;
	}
}

var metaK;
var metaD;

function getSend() {
	//console.log("in!");
	$.ajax({
		url: "http://www.baidu.com/s?wd=" + siteDomain,
		type: "get",
		jsonp: "callback",
		success: function(data) {

			var resultDOM = $(".result,.result-op", data);
			for (var i = 0; i <= resultDOM.length - 1; i++) {

				var resultWithA = $("a[href]", resultDOM[i])[0];
				//console.log(resultWithA);


				var linkWithA = resultWithA.getAttribute("href");
				//console.log(linkWithA);
				if (linkWithA.indexOf("http") != -1) {
					//$("#siteSource").html($("#siteSource").html() + linkWithA + "<br/>");
				}

				if (linkWithA.indexOf("baike.baidu") != -1) {
					baikeResult = $("p:first", resultDOM[i])[0].innerText;
					if ((localStorage['baikeAbstract'] + "").indexOf(baikeResult) < 0)
						localStorage['baikeAbstract'] = localStorage['baikeAbstract'] + "|" + baikeResult;
					//console.log(baikeResult);
				}
			};
			//$("#siteSource").text();
			//$("#siteSource").text(data);
			//console.log(data);
		}
	});
}