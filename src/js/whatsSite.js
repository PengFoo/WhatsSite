/*******
 *WhatsSite
 *tell the catogory of a site
 *
 *author:Pan Foo.
 *last modified : 2014/07/17-15:46
 ************/

//nead jquery first

//get the site meta-description for search engines

$("#btn_submit").click(
	function() {
		//alert(2);
		getSend();
	});

function getMetaDes(source) {

}
/**
 * GET request
 * */
function getSend() {
	console.log("in!");
	$.ajax({
		url: "http://www.baidu.com/s?wd=" + $("#search").val(),
		type: "get",
		jsonp: "callback",
		success: function(data) {
			$("#siteSource").empty();
			var resultDOM = $(".result,.result-op", data);
			for (var i = 0; i <= resultDOM.length - 1; i++) {

				var resultWithA = $("a[href]", resultDOM[i])[0];
				console.log(resultWithA);


				var linkWithA = resultWithA.getAttribute("href");
				//console.log(linkWithA);
				if (linkWithA.indexOf("http") != -1)
					$("#siteSource").html($("#siteSource").html() + linkWithA + "<br/>");
				if (linkWithA.indexOf("baike.baidu" != -1)) {
					//var baikeResult = getBaike(linkWithA);
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

