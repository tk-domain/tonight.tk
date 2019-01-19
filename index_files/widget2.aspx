

var widget235421 = {};
                        
widget235421.scriptUrl = "http://api.content.ad/Scripts/widget2.aspx?id=f1c3cc65-08eb-4c12-a1f2-813c165521ec&d=ZWFydGhza3kub3Jn&wid=235421&cb=1547928721016";
widget235421.b64={key:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this.key.indexOf(input.charAt(i++));enc2=this.key.indexOf(input.charAt(i++));enc3=this.key.indexOf(input.charAt(i++));enc4=this.key.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}return output}};
widget235421.readCookie = function (name) {
    var nameWithEqual = name + "=";
    var params = document.cookie.split(';');
    for(var i = 0; i < params.length; i++) {
        var nameValuePair = params[i];
        while (nameValuePair.charAt(0) == ' ') nameValuePair = nameValuePair.substring(1, nameValuePair.length);
        if (nameValuePair.indexOf(nameWithEqual) == 0) return nameValuePair.substring(nameWithEqual.length, nameValuePair.length);
    }
    return null;
};

widget235421.updateSourceCookie = function (name, value) {
    var d = new Date();
    d.setTime(d.getTime() + (30*60*1000));
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
};

widget235421.params = (function () {
    var result = {}, queryString = widget235421.scriptUrl.substring(widget235421.scriptUrl.indexOf("?")+1), re = /([^&=]+)=([^&]*)/g, m;
    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    var scriptUrlFromDomain = widget235421.scriptUrl.substr(widget235421.scriptUrl.indexOf("://") + 3);
    var server = scriptUrlFromDomain.substr(0, scriptUrlFromDomain.indexOf("/"));
    var url = result["url"] ? decodeURIComponent(result["url"]) : decodeURIComponent(window.location);
    
    result["lazyLoad"] = (result["lazyLoad"] == true ? true : false);
    result["server"] = (result["test"] == true ? "test." + server : server);
    if (result["server"].indexOf(widget235421.b64.decode("YXBpLmNvbnRlbnQuYWQ=")) > -1) {
        result["server"] = widget235421.b64.decode("YXBpLmNvbnRlbnQtYWQubmV0");
    }
    result["title"] = (result["title"] ? result["title"] : encodeURI(escape(document.title)));
    result["url"] = encodeURIComponent(url);
    result["ik"] = encodeURI("2019011912_299b7c16cb5cada8f1bf3ea9b55728d0");
    result["ikb"] = encodeURI("299b7c16cb5cada8f1bf3ea9b55728d0");
    result["duid"] = encodeURI("f613945e7ac405c7211fe887ccbd7634786222e1d9afc06b84ae7e7a88477790");
    result["ls"] = encodeURI("ip-172-18-60-165");
    result["dstlload"] = true;

    if (result["pre"] != undefined) {
        result["pre"] = encodeURIComponent(result["pre"]);
    }

    if (result["clientId"] === undefined && result["clientId2"] === undefined) {
        var pageParams = {}, pageQueryString = url.substring(url.indexOf("?")+1), pm;
	    while (pm = re.exec(pageQueryString)) {
	        pageParams[decodeURIComponent(pm[1])] = decodeURIComponent(pm[2]);
	    }
	    
	    var source = widget235421.readCookie("source");
	    var campaign = widget235421.readCookie("campaign");
        if (pageParams["utm_source"] !== undefined && pageParams["utm_source"] !== "") {
            if (pageParams["utm_source"] !== source) {
                widget235421.updateSourceCookie("source", pageParams["utm_source"]);
            }
            result["clientId"] = pageParams["utm_source"];
        } else if (source !== null && source !== "") {
            result["clientId"] = source;
        }

        if (pageParams["utm_campaign"] !== undefined && pageParams["utm_campaign"] !== "") {
            if (pageParams["utm_campaign"] !== campaign) {
                widget235421.updateSourceCookie("campaign", pageParams["utm_campaign"]);
            }
            result["clientId2"] = pageParams["utm_campaign"];
        } else if (campaign !== null && campaign !== "") {
            result["clientId2"] = campaign;
        }
    }
    return result;
} ());

widget235421.paramList = [];
for (var key in widget235421.params) {
    widget235421.paramList.push(key + '=' + widget235421.params[key]);
}

widget235421.widgetUrl = (location.protocol === 'https:' ? 'https:' : 'http:') + "//" + widget235421.params.server + "/GetWidget.aspx?" + widget235421.paramList.join('&');
widget235421.isLoaded = false;

widget235421.init = function (widgetId, widgetUrl, lazyLoad, loadMultiple) {
    if (typeof (window["contentAd" + widgetId]) == 'undefined') {
        if (!widget235421.isLoaded) {
            widget235421.isLoaded = true;
            if (lazyLoad) {
                (function () {
                    function asyncLoad() {
                        var s = document.createElement('script');
                        s.type = 'text/javascript';
                        s.async = true;
                        s.src = widgetUrl;
                        var x = document.getElementsByTagName('script')[0];
                        x.parentNode.insertBefore(s, x);
                    }
                    if (window.attachEvent)
                        window.attachEvent('onload', asyncLoad);
                    else
                        window.addEventListener('load', asyncLoad, false);
                })();
            } else {
                (function () {
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = widgetUrl;
                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                })();
            }
        }
        setTimeout(function () { widget235421.init(widgetId, widgetUrl, lazyLoad, loadMultiple) }, 50);
    } else {
        var content = window["contentAd" + widgetId]();
        var container = document.getElementById(widget235421.b64.decode("Y29udGVudGFk") + widgetId);
        var newDiv = document.createElement("div");
        newDiv.innerHTML = content;
        if (container === undefined || container === null) {
            var scripts = document.getElementsByTagName("script");
		    for (var i = 0; i < scripts.length; i++) {
			    if (scripts[i].innerHTML !== undefined && scripts[i].innerHTML.toLowerCase().indexOf("f1c3cc65-08eb-4c12-a1f2-813c165521ec") !== -1) {
			        scripts[i].parentNode.insertBefore(newDiv, scripts[i]);
			    }
	        }
        } else {            
            container.parentNode.insertBefore(newDiv, container);
        }
        
        if (typeof (window["initJQuery" + widgetId]) != 'undefined') {
            window["initJQuery" + widgetId]();
        }
        if (loadMultiple) {
            window["contentAd" + widgetId] = undefined;
        }
        
        if (typeof (window["widget" + widgetId]) != 'undefined' && typeof (window["widget" + widgetId].customPlacement) != 'undefined') {
            if (typeof (window["widget" + widgetId].renderCustomStyleAndHtml) != 'undefined') {
	            widget235421.customContent = window["widget" + widgetId].renderCustomStyleAndHtml();
	            widget235421.customContainer = document.createElement("div");
	            widget235421.customContainer.innerHTML = widget235421.customContent;
	            
	            if (window["widget" + widgetId].customPlacement() === 'top') {
	                newDiv.parentNode.insertBefore(widget235421.customContainer, newDiv);
	            } else {
	                newDiv.parentNode.insertBefore(widget235421.customContainer, newDiv.nextSibling);
	            }
            }
            
            if (typeof (window["widget" + widgetId].renderCustomScript) != 'undefined') {
                widget235421.customScript = window["widget" + widgetId].renderCustomScript();
                widget235421.customScriptTag = document.createElement("script");
                widget235421.customScriptTag.innerHTML = widget235421.customScript;
                
                widget235421.documentWrite = document.write;
                widget235421.customScriptOutput = document.createElement("div");
                widget235421.customScriptOutput.innerHTML = '';
				document.write = function(line) {
				    widget235421.customScriptOutput.innerHTML += line;
				}
				
                if (window["widget" + widgetId].customPlacement() === 'top') {
                    newDiv.parentNode.insertBefore(widget235421.customScriptTag, newDiv);
                    newDiv.parentNode.insertBefore(widget235421.customScriptOutput, newDiv);
                } else {
                    if (typeof (window["widget" + widgetId].renderCustomStyleAndHtml) != 'undefined') {
                        newDiv.parentNode.insertBefore(widget235421.customScriptTag, newDiv.nextSibling.nextSibling);
                        newDiv.parentNode.insertBefore(widget235421.customScriptOutput, newDiv.nextSibling.nextSibling);
                    } else {
                        newDiv.parentNode.insertBefore(widget235421.customScriptTag, newDiv.nextSibling);
                        newDiv.parentNode.insertBefore(widget235421.customScriptOutput, newDiv.nextSibling);
                    }                
                }
                
                document.write = widget235421.documentWrite;
            }
        }
    }
};

widget235421.updatePopCookie = function () {
    if (document.cookie.indexOf("popdays") == -1) {
        var d = new Date();
        if (widget235421.params.exitPopExpireDays === undefined) {
            widget235421.params.exitPopExpireDays = 0;
            d.setTime(d.getTime() + (30*60*1000));
        } else {
            d.setTime(d.getTime() + (widget235421.params.exitPopExpireDays*24*60*60*1000));
        }
        document.cookie = "popdays=" + widget235421.params.exitPopExpireDays + ";path=/;expires=" + d.toUTCString();

        widget235421.init(widget235421.params.wid, widget235421.widgetUrl, widget235421.params.lazyLoad, widget235421.params.loadMultiple);
    } else {
        if (widget235421.params.exitPopExpireDays > 0 && widget235421.readCookie("popdays") != widget235421.params.exitPopExpireDays) {
            var d = new Date();
            d.setTime(d.getTime() + (widget235421.params.exitPopExpireDays*24*60*60*1000));
            document.cookie = "popdays=" + widget235421.params.exitPopExpireDays + ";path=/;expires=" + d.toUTCString();
        } else if (widget235421.params.exitPopExpireDays <= 0) {
            document.cookie = "popdays=-1;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
            widget235421.init(widget235421.params.wid, widget235421.widgetUrl, widget235421.params.lazyLoad, widget235421.params.loadMultiple);
        } else if (widget235421.params.exitPopExpireDays === undefined && widget235421.readCookie("popdays") > 0) {
            var d = new Date();
            d.setTime(d.getTime() + (30*60*1000));
            document.cookie = "popdays=0;path=/;expires=" + d.toUTCString();
        }
    }
};

widget235421.scrollChange = function () {
    var totalHeight, currentScroll, visibleHeight;
      
    if (document.documentElement.scrollTop) {
        currentScroll = document.documentElement.scrollTop;
    } else { 
        currentScroll = document.body.scrollTop;
    }
      
    totalHeight = document.body.offsetHeight;
    visibleHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var tempScroll = currentScroll + visibleHeight;
    var atEndOfPage = totalHeight <= tempScroll + (totalHeight * 0.10);
    var isScrollingUp = tempScroll < widget235421.lowestScroll;
    var hasScrolledDown = widget235421.lowestScroll > 100;
    
    if (widget235421.lowestScroll === undefined || tempScroll > widget235421.lowestScroll) {
        widget235421.lowestScroll = tempScroll;
    }

    if ((atEndOfPage || (hasScrolledDown && isScrollingUp)) && !widget235421.isLoaded) {
        widget235421.updatePopCookie();
    }
};

widget235421.mouseCoordinates = function (e) {
    var tempX = 0, tempY = 0;

    if (!e) var e = window.event;
    tempX = e.clientX;
    tempY = e.clientY;
        
    if (tempX < 0) tempX = 0;
    if (tempY < 0) tempY = 0;
    
    if (widget235421.lowestY === undefined || tempY > widget235421.lowestY) {
        widget235421.lowestY = tempY;
    }
    
    if (tempY <= 20 && tempY < widget235421.lowestY && widget235421.lowestY > 100 && !widget235421.isLoaded) {
        widget235421.updatePopCookie();
    }
};

widget235421.exitPopMobile = false;
if (widget235421.params.exitPopMobile === 'true' || widget235421.params.exitPopMobile === '1') {
    widget235421.exitPopMobile = true;
    var touchEnabled = ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);
    var isMobile = false;
    if (navigator.userAgent !== undefined) {
        var userAgent = navigator.userAgent.toLowerCase();
        var iPhoneIndex = userAgent.indexOf("iphone");
        var iPadIndex = userAgent.indexOf("ipad");
        var isIPhone = (iPhoneIndex !== -1 && iPadIndex === -1) || (iPhoneIndex !== -1 && iPhoneIndex < iPadIndex);
        var isAndroid = userAgent.indexOf("android") !== -1 && userAgent.indexOf("mobile") !== -1;
        var isOtherMobile = userAgent.match(/^.*?(ipod|blackberry|mini|windows\\sce|palm|phone|mobile|smartphone|iemobile).*?$/) != null;
        isMobile = isIPhone || isAndroid || isOtherMobile;
    }
    
    if (touchEnabled && isMobile) {
        setInterval(widget235421.scrollChange, 50);
    }
}

widget235421.exitPop = false;
if (widget235421.params.exitPop === 'true' || widget235421.params.exitPop === '1') {
    widget235421.exitPop = true;
    if (widget235421.params.exitPopExpireDays === undefined && widget235421.readCookie("popdays") == 0) {
        var d = new Date();
        d.setTime(d.getTime() + (30*60*1000));
        document.cookie = "popdays=0;path=/;expires=" + d.toUTCString();
    }
    var isInternetExplorer = document.all ? true : false;
    if (!isInternetExplorer) document.captureEvents(Event.MOUSEMOVE);
    try {
        document.addEventListener('mousemove', widget235421.mouseCoordinates, false);
    } catch (e) {
        document.attachEvent('onmousemove', widget235421.mouseCoordinates);
    } finally {
        try {
            if (document.onmousemove) {
                var oldOnMouseMove = document.onmousemove;
                document.onmousemove = function(e) {
                    oldOnMouseMove(e);
                    widget235421.mouseCoordinates(e);
                };
            } else {
                document.onmousemove = function(e) {
                   widget235421.mouseCoordinates(e);
                };
            }
        } catch(e) {
        
        }
    }
} 

if (!widget235421.exitPop && !widget235421.exitPopMobile) {
    widget235421.init(widget235421.params.wid, widget235421.widgetUrl, widget235421.params.lazyLoad, widget235421.params.loadMultiple);
}