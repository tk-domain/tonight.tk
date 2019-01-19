

var widget235422 = {};
                        
widget235422.scriptUrl = "http://api.content.ad/Scripts/widget2.aspx?id=b5311078-284d-45fa-93df-e7754f6a7ebc&d=ZWFydGhza3kub3Jn&wid=235422&cb=1547928721163";
widget235422.b64={key:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this.key.indexOf(input.charAt(i++));enc2=this.key.indexOf(input.charAt(i++));enc3=this.key.indexOf(input.charAt(i++));enc4=this.key.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}return output}};
widget235422.readCookie = function (name) {
    var nameWithEqual = name + "=";
    var params = document.cookie.split(';');
    for(var i = 0; i < params.length; i++) {
        var nameValuePair = params[i];
        while (nameValuePair.charAt(0) == ' ') nameValuePair = nameValuePair.substring(1, nameValuePair.length);
        if (nameValuePair.indexOf(nameWithEqual) == 0) return nameValuePair.substring(nameWithEqual.length, nameValuePair.length);
    }
    return null;
};

widget235422.updateSourceCookie = function (name, value) {
    var d = new Date();
    d.setTime(d.getTime() + (30*60*1000));
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
};

widget235422.params = (function () {
    var result = {}, queryString = widget235422.scriptUrl.substring(widget235422.scriptUrl.indexOf("?")+1), re = /([^&=]+)=([^&]*)/g, m;
    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    var scriptUrlFromDomain = widget235422.scriptUrl.substr(widget235422.scriptUrl.indexOf("://") + 3);
    var server = scriptUrlFromDomain.substr(0, scriptUrlFromDomain.indexOf("/"));
    var url = result["url"] ? decodeURIComponent(result["url"]) : decodeURIComponent(window.location);
    
    result["lazyLoad"] = (result["lazyLoad"] == true ? true : false);
    result["server"] = (result["test"] == true ? "test." + server : server);
    if (result["server"].indexOf(widget235422.b64.decode("YXBpLmNvbnRlbnQuYWQ=")) > -1) {
        result["server"] = widget235422.b64.decode("YXBpLmNvbnRlbnQtYWQubmV0");
    }
    result["title"] = (result["title"] ? result["title"] : encodeURI(escape(document.title)));
    result["url"] = encodeURIComponent(url);
    result["ik"] = encodeURI("2019011912_50aeec5c90cd74b26df1c28f2e280790");
    result["ikb"] = encodeURI("50aeec5c90cd74b26df1c28f2e280790");
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
	    
	    var source = widget235422.readCookie("source");
	    var campaign = widget235422.readCookie("campaign");
        if (pageParams["utm_source"] !== undefined && pageParams["utm_source"] !== "") {
            if (pageParams["utm_source"] !== source) {
                widget235422.updateSourceCookie("source", pageParams["utm_source"]);
            }
            result["clientId"] = pageParams["utm_source"];
        } else if (source !== null && source !== "") {
            result["clientId"] = source;
        }

        if (pageParams["utm_campaign"] !== undefined && pageParams["utm_campaign"] !== "") {
            if (pageParams["utm_campaign"] !== campaign) {
                widget235422.updateSourceCookie("campaign", pageParams["utm_campaign"]);
            }
            result["clientId2"] = pageParams["utm_campaign"];
        } else if (campaign !== null && campaign !== "") {
            result["clientId2"] = campaign;
        }
    }
    return result;
} ());

widget235422.paramList = [];
for (var key in widget235422.params) {
    widget235422.paramList.push(key + '=' + widget235422.params[key]);
}

widget235422.widgetUrl = (location.protocol === 'https:' ? 'https:' : 'http:') + "//" + widget235422.params.server + "/GetWidget.aspx?" + widget235422.paramList.join('&');
widget235422.isLoaded = false;

widget235422.init = function (widgetId, widgetUrl, lazyLoad, loadMultiple) {
    if (typeof (window["contentAd" + widgetId]) == 'undefined') {
        if (!widget235422.isLoaded) {
            widget235422.isLoaded = true;
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
        setTimeout(function () { widget235422.init(widgetId, widgetUrl, lazyLoad, loadMultiple) }, 50);
    } else {
        var content = window["contentAd" + widgetId]();
        var container = document.getElementById(widget235422.b64.decode("Y29udGVudGFk") + widgetId);
        var newDiv = document.createElement("div");
        newDiv.innerHTML = content;
        if (container === undefined || container === null) {
            var scripts = document.getElementsByTagName("script");
		    for (var i = 0; i < scripts.length; i++) {
			    if (scripts[i].innerHTML !== undefined && scripts[i].innerHTML.toLowerCase().indexOf("b5311078-284d-45fa-93df-e7754f6a7ebc") !== -1) {
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
	            widget235422.customContent = window["widget" + widgetId].renderCustomStyleAndHtml();
	            widget235422.customContainer = document.createElement("div");
	            widget235422.customContainer.innerHTML = widget235422.customContent;
	            
	            if (window["widget" + widgetId].customPlacement() === 'top') {
	                newDiv.parentNode.insertBefore(widget235422.customContainer, newDiv);
	            } else {
	                newDiv.parentNode.insertBefore(widget235422.customContainer, newDiv.nextSibling);
	            }
            }
            
            if (typeof (window["widget" + widgetId].renderCustomScript) != 'undefined') {
                widget235422.customScript = window["widget" + widgetId].renderCustomScript();
                widget235422.customScriptTag = document.createElement("script");
                widget235422.customScriptTag.innerHTML = widget235422.customScript;
                
                widget235422.documentWrite = document.write;
                widget235422.customScriptOutput = document.createElement("div");
                widget235422.customScriptOutput.innerHTML = '';
				document.write = function(line) {
				    widget235422.customScriptOutput.innerHTML += line;
				}
				
                if (window["widget" + widgetId].customPlacement() === 'top') {
                    newDiv.parentNode.insertBefore(widget235422.customScriptTag, newDiv);
                    newDiv.parentNode.insertBefore(widget235422.customScriptOutput, newDiv);
                } else {
                    if (typeof (window["widget" + widgetId].renderCustomStyleAndHtml) != 'undefined') {
                        newDiv.parentNode.insertBefore(widget235422.customScriptTag, newDiv.nextSibling.nextSibling);
                        newDiv.parentNode.insertBefore(widget235422.customScriptOutput, newDiv.nextSibling.nextSibling);
                    } else {
                        newDiv.parentNode.insertBefore(widget235422.customScriptTag, newDiv.nextSibling);
                        newDiv.parentNode.insertBefore(widget235422.customScriptOutput, newDiv.nextSibling);
                    }                
                }
                
                document.write = widget235422.documentWrite;
            }
        }
    }
};

widget235422.updatePopCookie = function () {
    if (document.cookie.indexOf("popdays") == -1) {
        var d = new Date();
        if (widget235422.params.exitPopExpireDays === undefined) {
            widget235422.params.exitPopExpireDays = 0;
            d.setTime(d.getTime() + (30*60*1000));
        } else {
            d.setTime(d.getTime() + (widget235422.params.exitPopExpireDays*24*60*60*1000));
        }
        document.cookie = "popdays=" + widget235422.params.exitPopExpireDays + ";path=/;expires=" + d.toUTCString();

        widget235422.init(widget235422.params.wid, widget235422.widgetUrl, widget235422.params.lazyLoad, widget235422.params.loadMultiple);
    } else {
        if (widget235422.params.exitPopExpireDays > 0 && widget235422.readCookie("popdays") != widget235422.params.exitPopExpireDays) {
            var d = new Date();
            d.setTime(d.getTime() + (widget235422.params.exitPopExpireDays*24*60*60*1000));
            document.cookie = "popdays=" + widget235422.params.exitPopExpireDays + ";path=/;expires=" + d.toUTCString();
        } else if (widget235422.params.exitPopExpireDays <= 0) {
            document.cookie = "popdays=-1;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
            widget235422.init(widget235422.params.wid, widget235422.widgetUrl, widget235422.params.lazyLoad, widget235422.params.loadMultiple);
        } else if (widget235422.params.exitPopExpireDays === undefined && widget235422.readCookie("popdays") > 0) {
            var d = new Date();
            d.setTime(d.getTime() + (30*60*1000));
            document.cookie = "popdays=0;path=/;expires=" + d.toUTCString();
        }
    }
};

widget235422.scrollChange = function () {
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
    var isScrollingUp = tempScroll < widget235422.lowestScroll;
    var hasScrolledDown = widget235422.lowestScroll > 100;
    
    if (widget235422.lowestScroll === undefined || tempScroll > widget235422.lowestScroll) {
        widget235422.lowestScroll = tempScroll;
    }

    if ((atEndOfPage || (hasScrolledDown && isScrollingUp)) && !widget235422.isLoaded) {
        widget235422.updatePopCookie();
    }
};

widget235422.mouseCoordinates = function (e) {
    var tempX = 0, tempY = 0;

    if (!e) var e = window.event;
    tempX = e.clientX;
    tempY = e.clientY;
        
    if (tempX < 0) tempX = 0;
    if (tempY < 0) tempY = 0;
    
    if (widget235422.lowestY === undefined || tempY > widget235422.lowestY) {
        widget235422.lowestY = tempY;
    }
    
    if (tempY <= 20 && tempY < widget235422.lowestY && widget235422.lowestY > 100 && !widget235422.isLoaded) {
        widget235422.updatePopCookie();
    }
};

widget235422.exitPopMobile = false;
if (widget235422.params.exitPopMobile === 'true' || widget235422.params.exitPopMobile === '1') {
    widget235422.exitPopMobile = true;
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
        setInterval(widget235422.scrollChange, 50);
    }
}

widget235422.exitPop = false;
if (widget235422.params.exitPop === 'true' || widget235422.params.exitPop === '1') {
    widget235422.exitPop = true;
    if (widget235422.params.exitPopExpireDays === undefined && widget235422.readCookie("popdays") == 0) {
        var d = new Date();
        d.setTime(d.getTime() + (30*60*1000));
        document.cookie = "popdays=0;path=/;expires=" + d.toUTCString();
    }
    var isInternetExplorer = document.all ? true : false;
    if (!isInternetExplorer) document.captureEvents(Event.MOUSEMOVE);
    try {
        document.addEventListener('mousemove', widget235422.mouseCoordinates, false);
    } catch (e) {
        document.attachEvent('onmousemove', widget235422.mouseCoordinates);
    } finally {
        try {
            if (document.onmousemove) {
                var oldOnMouseMove = document.onmousemove;
                document.onmousemove = function(e) {
                    oldOnMouseMove(e);
                    widget235422.mouseCoordinates(e);
                };
            } else {
                document.onmousemove = function(e) {
                   widget235422.mouseCoordinates(e);
                };
            }
        } catch(e) {
        
        }
    }
} 

if (!widget235422.exitPop && !widget235422.exitPopMobile) {
    widget235422.init(widget235422.params.wid, widget235422.widgetUrl, widget235422.params.lazyLoad, widget235422.params.loadMultiple);
}