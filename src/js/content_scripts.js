var metaKeyWords = $("meta[name='keywords']:first").attr("content")
console.log(metaKeyWords);
var metaDes = $("meta[name='description']:first").attr("content")
console.log(metaDes);
chrome.runtime.sendMessage({
	"metaKeyWords": metaKeyWords,
	"metaDes": metaDes
},function(response){console.log(response.farewell);});