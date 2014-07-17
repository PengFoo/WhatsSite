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

var objXMLHttp;
/**
 * 进行createXMLHttpRequest对象的创建，由于不同的浏览器厂商对于XMLHttpRequest的支持不一样，因此创建的时候需要根据不同的浏览器进行创建
 * */
function createXMLHttpRequest() {
	//对于Firefox,Opera等遵守DOM 2规范的浏览器
	if (window.XMLHttpRequest) {
		objXMLHttp = new XMLHttpRequest();
	}
	//对于IE浏览器
	else {
		//将IE浏览器不同的XMLHttp实现声明为数组
		var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
		//依次对每个XMLHttp创建XMLHttpRequest对象
		for (var i = 0; n < MSXML.length; i++) {
			try {
				//微软发布的是ActiveX控件
				objXMLHttp = new ActiveXObject(MSXML[i]);
				//如果正常创建XMLHttpRequest对象就使用break跳出循环
				break;
			} catch (e) {
				alert("创建XMLHttpRequest对象失败");
			}
		}
	}
}


/**
 * 通过GET请求
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
/**
 * 设定的回调函数
 * */
function processResponse() {
	//响应完成且响应正常
	if (objXMLHttp.readyState == 1) {
		alert("XMLHttpRequest对象开始发送请求");
	} else if (objXMLHttp.readyState == 2) {
		alert("XMLHttpRequest对象的请求发送完成");
	} else if (objXMLHttp.readyState == 3) {
		alert("XMLHttpRequest对象开始读取服务器的响应");
	} else if (objXMLHttp.readyState == 4) {
		alert("XMLHttpRequest对象读取服务器响应结束");
		if (objXMLHttp.status == 200) {
			//信息已经成功返回，开始处理信息
			//先捕获下所有的请求头
			var headers = objXMLHttp.getAllResponseHeaders();
			alert("所有的请求头= " + headers);
			//得到服务器返回的信息
			var infor = objXMLHttp.responseText;
			alert("服务器端的响应 = " + infor);
		} else {
			alert("所请求的服务器端出了问题");
		}
	}
}