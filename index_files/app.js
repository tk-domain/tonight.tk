(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; /*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2015, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/(function($,window,document,undefined){'use strict';var header_helpers=function header_helpers(class_array){var head=$('head');head.prepend($.map(class_array,function(class_name){if(head.has('.'+class_name).length===0){return '<meta class="'+class_name+'" />';}}));};header_helpers(['foundation-mq-small','foundation-mq-small-only','foundation-mq-medium','foundation-mq-medium-only','foundation-mq-large','foundation-mq-large-only','foundation-mq-xlarge','foundation-mq-xlarge-only','foundation-mq-xxlarge','foundation-data-attribute-namespace']); // Enable FastClick if present
$(function(){if(typeof FastClick!=='undefined'){ // Don't attach to body if undefined
if(typeof document.body!=='undefined'){FastClick.attach(document.body);}}}); // private Fast Selector wrapper,
// returns jQuery object. Only use where
// getElementById is not available.
var S=function S(selector,context){if(typeof selector==='string'){if(context){var cont;if(context.jquery){cont=context[0];if(!cont){return context;}}else {cont=context;}return $(cont.querySelectorAll(selector));}return $(document.querySelectorAll(selector));}return $(selector,context);}; // Namespace functions.
var attr_name=function attr_name(init){var arr=[];if(!init){arr.push('data');}if(this.namespace.length>0){arr.push(this.namespace);}arr.push(this.name);return arr.join('-');};var add_namespace=function add_namespace(str){var parts=str.split('-'),i=parts.length,arr=[];while(i--){if(i!==0){arr.push(parts[i]);}else {if(this.namespace.length>0){arr.push(this.namespace,parts[i]);}else {arr.push(parts[i]);}}}return arr.reverse().join('-');}; // Event binding and data-options updating.
var bindings=function bindings(method,options){var self=this,bind=function bind(){var $this=S(this),should_bind_events=!$this.data(self.attr_name(true)+'-init');$this.data(self.attr_name(true)+'-init',$.extend({},self.settings,options||method,self.data_options($this)));if(should_bind_events){self.events(this);}};if(S(this.scope).is('['+this.attr_name()+']')){bind.call(this.scope);}else {S('['+this.attr_name()+']',this.scope).each(bind);} // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
if(typeof method==='string'){return this[method].call(this,options);}};var single_image_loaded=function single_image_loaded(image,callback){function loaded(){callback(image[0]);}function bindLoad(){this.one('load',loaded);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var src=this.attr('src'),param=src.match(/\?/)?'&':'?';param+='random='+new Date().getTime();this.attr('src',src+param);}}if(!image.attr('src')){loaded();return;}if(image[0].complete||image[0].readyState===4){loaded();}else {bindLoad.call(image);}}; /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */window.matchMedia||(window.matchMedia=function(){"use strict"; // For browsers that support matchMedium api such as IE 9 and webkit
var styleMedia=window.styleMedia||window.media; // For those that don't support matchMedium
if(!styleMedia){var style=document.createElement('style'),script=document.getElementsByTagName('script')[0],info=null;style.type='text/css';style.id='matchmediajs-test';script.parentNode.insertBefore(style,script); // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
info='getComputedStyle' in window&&window.getComputedStyle(style,null)||style.currentStyle;styleMedia={matchMedium:function matchMedium(media){var text='@media '+media+'{ #matchmediajs-test { width: 1px; } }'; // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
if(style.styleSheet){style.styleSheet.cssText=text;}else {style.textContent=text;} // Test if media query is true or false
return info.width==='1px';}};}return function(media){return {matches:styleMedia.matchMedium(media||'all'),media:media||'all'};};}()); /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */(function(jQuery){ // requestAnimationFrame polyfill adapted from Erik Möller
// fixes from Paul Irish and Tino Zijdel
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
var animating,lastTime=0,vendors=['webkit','moz'],requestAnimationFrame=window.requestAnimationFrame,cancelAnimationFrame=window.cancelAnimationFrame,jqueryFxAvailable='undefined'!==typeof jQuery.fx;for(;lastTime<vendors.length&&!requestAnimationFrame;lastTime++){requestAnimationFrame=window[vendors[lastTime]+'RequestAnimationFrame'];cancelAnimationFrame=cancelAnimationFrame||window[vendors[lastTime]+'CancelAnimationFrame']||window[vendors[lastTime]+'CancelRequestAnimationFrame'];}function raf(){if(animating){requestAnimationFrame(raf);if(jqueryFxAvailable){jQuery.fx.tick();}}}if(requestAnimationFrame){ // use rAF
window.requestAnimationFrame=requestAnimationFrame;window.cancelAnimationFrame=cancelAnimationFrame;if(jqueryFxAvailable){jQuery.fx.timer=function(timer){if(timer()&&jQuery.timers.push(timer)&&!animating){animating=true;raf();}};jQuery.fx.stop=function(){animating=false;};}}else { // polyfill
window.requestAnimationFrame=function(callback){var currTime=new Date().getTime(),timeToCall=Math.max(0,16-(currTime-lastTime)),id=window.setTimeout(function(){callback(currTime+timeToCall);},timeToCall);lastTime=currTime+timeToCall;return id;};window.cancelAnimationFrame=function(id){clearTimeout(id);};}})($);function removeQuotes(string){if(typeof string==='string'||string instanceof String){string=string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g,'');}return string;}function MediaQuery(selector){this.selector=selector;this.query='';}MediaQuery.prototype.toString=function(){return this.query||(this.query=S(this.selector).css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,''));};window.Foundation={name:'Foundation',version:'5.5.3',media_queries:{'small':new MediaQuery('.foundation-mq-small'),'small-only':new MediaQuery('.foundation-mq-small-only'),'medium':new MediaQuery('.foundation-mq-medium'),'medium-only':new MediaQuery('.foundation-mq-medium-only'),'large':new MediaQuery('.foundation-mq-large'),'large-only':new MediaQuery('.foundation-mq-large-only'),'xlarge':new MediaQuery('.foundation-mq-xlarge'),'xlarge-only':new MediaQuery('.foundation-mq-xlarge-only'),'xxlarge':new MediaQuery('.foundation-mq-xxlarge')},stylesheet:$('<style></style>').appendTo('head')[0].sheet,global:{namespace:undefined},init:function init(scope,libraries,method,options,response){var args=[scope,method,options,response],responses=[]; // check RTL
this.rtl=/rtl/i.test(S('html').attr('dir')); // set foundation global scope
this.scope=scope||this.scope;this.set_namespace();if(libraries&&typeof libraries==='string'&&!/reflow/i.test(libraries)){if(this.libs.hasOwnProperty(libraries)){responses.push(this.init_lib(libraries,args));}}else {for(var lib in this.libs){responses.push(this.init_lib(lib,libraries));}}S(window).load(function(){S(window).trigger('resize.fndtn.clearing').trigger('resize.fndtn.dropdown').trigger('resize.fndtn.equalizer').trigger('resize.fndtn.interchange').trigger('resize.fndtn.joyride').trigger('resize.fndtn.magellan').trigger('resize.fndtn.topbar').trigger('resize.fndtn.slider');});return scope;},init_lib:function init_lib(lib,args){if(this.libs.hasOwnProperty(lib)){this.patch(this.libs[lib]);if(args&&args.hasOwnProperty(lib)){if(typeof this.libs[lib].settings!=='undefined'){$.extend(true,this.libs[lib].settings,args[lib]);}else if(typeof this.libs[lib].defaults!=='undefined'){$.extend(true,this.libs[lib].defaults,args[lib]);}return this.libs[lib].init.apply(this.libs[lib],[this.scope,args[lib]]);}args=args instanceof Array?args:new Array(args);return this.libs[lib].init.apply(this.libs[lib],args);}return function(){};},patch:function patch(lib){lib.scope=this.scope;lib.namespace=this.global.namespace;lib.rtl=this.rtl;lib['data_options']=this.utils.data_options;lib['attr_name']=attr_name;lib['add_namespace']=add_namespace;lib['bindings']=bindings;lib['S']=this.utils.S;},inherit:function inherit(scope,methods){var methods_arr=methods.split(' '),i=methods_arr.length;while(i--){if(this.utils.hasOwnProperty(methods_arr[i])){scope[methods_arr[i]]=this.utils[methods_arr[i]];}}},set_namespace:function set_namespace(){ // Description:
//    Don't bother reading the namespace out of the meta tag
//    if the namespace has been set globally in javascript
//
// Example:
//    Foundation.global.namespace = 'my-namespace';
// or make it an empty string:
//    Foundation.global.namespace = '';
//
//
// If the namespace has not been set (is undefined), try to read it out of the meta element.
// Otherwise use the globally defined namespace, even if it's empty ('')
var namespace=this.global.namespace===undefined?$('.foundation-data-attribute-namespace').css('font-family'):this.global.namespace; // Finally, if the namsepace is either undefined or false, set it to an empty string.
// Otherwise use the namespace value.
this.global.namespace=namespace===undefined||/false/i.test(namespace)?'':namespace;},libs:{}, // methods that can be inherited in libraries
utils:{ // Description:
//    Fast Selector wrapper returns jQuery object. Only use where getElementById
//    is not available.
//
// Arguments:
//    Selector (String): CSS selector describing the element(s) to be
//    returned as a jQuery object.
//
//    Scope (String): CSS selector describing the area to be searched. Default
//    is document.
//
// Returns:
//    Element (jQuery Object): jQuery object containing elements matching the
//    selector within the scope.
S:S, // Description:
//    Executes a function a max of once every n milliseconds
//
// Arguments:
//    Func (Function): Function to be throttled.
//
//    Delay (Integer): Function execution threshold in milliseconds.
//
// Returns:
//    Lazy_function (Function): Function with throttling applied.
throttle:function throttle(func,delay){var timer=null;return function(){var context=this,args=arguments;if(timer==null){timer=setTimeout(function(){func.apply(context,args);timer=null;},delay);}};}, // Description:
//    Executes a function when it stops being invoked for n seconds
//    Modified version of _.debounce() http://underscorejs.org
//
// Arguments:
//    Func (Function): Function to be debounced.
//
//    Delay (Integer): Function execution threshold in milliseconds.
//
//    Immediate (Bool): Whether the function should be called at the beginning
//    of the delay instead of the end. Default is false.
//
// Returns:
//    Lazy_function (Function): Function with debouncing applied.
debounce:function debounce(func,delay,immediate){var timeout,result;return function(){var context=this,args=arguments;var later=function later(){timeout=null;if(!immediate){result=func.apply(context,args);}};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,delay);if(callNow){result=func.apply(context,args);}return result;};}, // Description:
//    Parses data-options attribute
//
// Arguments:
//    El (jQuery Object): Element to be parsed.
//
// Returns:
//    Options (Javascript Object): Contents of the element's data-options
//    attribute.
data_options:function data_options(el,data_attr_name){data_attr_name=data_attr_name||'options';var opts={},ii,p,opts_arr,data_options=function data_options(el){var namespace=Foundation.global.namespace;if(namespace.length>0){return el.data(namespace+'-'+data_attr_name);}return el.data(data_attr_name);};var cached_options=data_options(el);if((typeof cached_options==='undefined'?'undefined':_typeof(cached_options))==='object'){return cached_options;}opts_arr=(cached_options||':').split(';');ii=opts_arr.length;function isNumber(o){return !isNaN(o-0)&&o!==null&&o!==''&&o!==false&&o!==true;}function trim(str){if(typeof str==='string'){return $.trim(str);}return str;}while(ii--){p=opts_arr[ii].split(':');p=[p[0],p.slice(1).join(':')];if(/true/i.test(p[1])){p[1]=true;}if(/false/i.test(p[1])){p[1]=false;}if(isNumber(p[1])){if(p[1].indexOf('.')===-1){p[1]=parseInt(p[1],10);}else {p[1]=parseFloat(p[1]);}}if(p.length===2&&p[0].length>0){opts[trim(p[0])]=trim(p[1]);}}return opts;}, // Description:
//    Adds JS-recognizable media queries
//
// Arguments:
//    Media (String): Key string for the media query to be stored as in
//    Foundation.media_queries
//
//    Class (String): Class name for the generated <meta> tag
register_media:function register_media(media,media_class){if(Foundation.media_queries[media]===undefined){$('head').append('<meta class="'+media_class+'"/>');Foundation.media_queries[media]=removeQuotes($('.'+media_class).css('font-family'));}}, // Description:
//    Add custom CSS within a JS-defined media query
//
// Arguments:
//    Rule (String): CSS rule to be appended to the document.
//
//    Media (String): Optional media query string for the CSS rule to be
//    nested under.
add_custom_rule:function add_custom_rule(rule,media){if(media===undefined&&Foundation.stylesheet){Foundation.stylesheet.insertRule(rule,Foundation.stylesheet.cssRules.length);}else {var query=Foundation.media_queries[media];if(query!==undefined){Foundation.stylesheet.insertRule('@media '+Foundation.media_queries[media]+'{ '+rule+' }',Foundation.stylesheet.cssRules.length);}}}, // Description:
//    Performs a callback function when an image is fully loaded
//
// Arguments:
//    Image (jQuery Object): Image(s) to check if loaded.
//
//    Callback (Function): Function to execute when image is fully loaded.
image_loaded:function image_loaded(images,callback){var self=this,unloaded=images.length;function pictures_has_height(images){var pictures_number=images.length;for(var i=pictures_number-1;i>=0;i--){if(images.attr('height')===undefined){return false;};};return true;}if(unloaded===0||pictures_has_height(images)){callback(images);}images.each(function(){single_image_loaded(self.S(this),function(){unloaded-=1;if(unloaded===0){callback(images);}});});}, // Description:
//    Returns a random, alphanumeric string
//
// Arguments:
//    Length (Integer): Length of string to be generated. Defaults to random
//    integer.
//
// Returns:
//    Rand (String): Pseudo-random, alphanumeric string.
random_str:function random_str(){if(!this.fidx){this.fidx=0;}this.prefix=this.prefix||[this.name||'F',(+new Date()).toString(36)].join('-');return this.prefix+(this.fidx++).toString(36);}, // Description:
//    Helper for window.matchMedia
//
// Arguments:
//    mq (String): Media query
//
// Returns:
//    (Boolean): Whether the media query passes or not
match:function match(mq){return window.matchMedia(mq).matches;}, // Description:
//    Helpers for checking Foundation default media queries with JS
//
// Returns:
//    (Boolean): Whether the media query passes or not
is_small_up:function is_small_up(){return this.match(Foundation.media_queries.small);},is_medium_up:function is_medium_up(){return this.match(Foundation.media_queries.medium);},is_large_up:function is_large_up(){return this.match(Foundation.media_queries.large);},is_xlarge_up:function is_xlarge_up(){return this.match(Foundation.media_queries.xlarge);},is_xxlarge_up:function is_xxlarge_up(){return this.match(Foundation.media_queries.xxlarge);},is_small_only:function is_small_only(){return !this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up();},is_medium_only:function is_medium_only(){return this.is_medium_up()&&!this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up();},is_large_only:function is_large_only(){return this.is_medium_up()&&this.is_large_up()&&!this.is_xlarge_up()&&!this.is_xxlarge_up();},is_xlarge_only:function is_xlarge_only(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&!this.is_xxlarge_up();},is_xxlarge_only:function is_xxlarge_only(){return this.is_medium_up()&&this.is_large_up()&&this.is_xlarge_up()&&this.is_xxlarge_up();}}};$.fn.foundation=function(){var args=Array.prototype.slice.call(arguments,0);return this.each(function(){Foundation.init.apply(Foundation,[this].concat(args));return this;});};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.abide={name:'abide',version:'5.5.3',settings:{live_validate:true, // validate the form as you go
validate_on_blur:true, // validate whenever you focus/blur on an input field
// validate_on: 'tab', // tab (when user tabs between fields), change (input changes), manual (call custom events)
focus_on_invalid:true, // automatically bring the focus to an invalid input field
error_labels:true, // labels with a for="inputId" will receive an `error` class
error_class:'error', // labels with a for="inputId" will receive an `error` class
// the amount of time Abide will take before it validates the form (in ms).
// smaller time will result in faster validation
timeout:1000,patterns:{alpha:/^[a-zA-Z]+$/,alpha_numeric:/^[a-zA-Z0-9]+$/,integer:/^[-+]?\d+$/,number:/^[-+]?\d*(?:[\.\,]\d+)?$/, // amex, visa, diners
card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/, // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/, // http://blogs.lse.ac.uk/lti/2008/04/23/a-regular-expression-to-match-any-url/
url:/^(https?|ftp|file|ssh):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%\/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/, // abc.de
domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,datetime:/^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/, // YYYY-MM-DD
date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/, // HH:MM:SS
time:/^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,dateISO:/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/, // MM/DD/YYYY
month_day_year:/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/, // DD/MM/YYYY
day_month_year:/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/, // #FFF or #FFFFFF
color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},validators:{equalTo:function equalTo(el,required,parent){var from=document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,to=el.value,valid=from===to;return valid;}}},timer:null,init:function init(scope,method,options){this.bindings(method,options);},events:function events(scope){var self=this,form=self.S(scope).attr('novalidate','novalidate'),settings=form.data(this.attr_name(true)+'-init')||{};this.invalid_attr=this.add_namespace('data-invalid');function validate(originalSelf,e){clearTimeout(self.timer);self.timer=setTimeout(function(){self.validate([originalSelf],e);}.bind(originalSelf),settings.timeout);}form.off('.abide').on('submit.fndtn.abide',function(e){var is_ajax=/ajax/i.test(self.S(this).attr(self.attr_name()));return self.validate(self.S(this).find('input, textarea, select').not(":hidden, [data-abide-ignore]").get(),e,is_ajax);}).on('validate.fndtn.abide',function(e){if(settings.validate_on==='manual'){self.validate([e.target],e);}}).on('reset',function(e){return self.reset($(this),e);}).find('input, textarea, select').not(":hidden, [data-abide-ignore]").off('.abide').on('blur.fndtn.abide change.fndtn.abide',function(e){var id=this.getAttribute('id'),eqTo=form.find('[data-equalto="'+id+'"]'); // old settings fallback
// will be deprecated with F6 release
if(settings.validate_on_blur&&settings.validate_on_blur===true){validate(this,e);} // checks if there is an equalTo equivalent related by id
if(typeof eqTo.get(0)!=="undefined"&&eqTo.val().length){validate(eqTo.get(0),e);} // new settings combining validate options into one setting
if(settings.validate_on==='change'){validate(this,e);}}).on('keydown.fndtn.abide',function(e){var id=this.getAttribute('id'),eqTo=form.find('[data-equalto="'+id+'"]'); // old settings fallback
// will be deprecated with F6 release
if(settings.live_validate&&settings.live_validate===true&&e.which!=9){validate(this,e);} // checks if there is an equalTo equivalent related by id
if(typeof eqTo.get(0)!=="undefined"&&eqTo.val().length){validate(eqTo.get(0),e);} // new settings combining validate options into one setting
if(settings.validate_on==='tab'&&e.which===9){validate(this,e);}else if(settings.validate_on==='change'){validate(this,e);}}).on('focus',function(e){if(navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)){$('html, body').animate({scrollTop:$(e.target).offset().top},100);}});},reset:function reset(form,e){var self=this;form.removeAttr(self.invalid_attr);$('['+self.invalid_attr+']',form).removeAttr(self.invalid_attr);$('.'+self.settings.error_class,form).not('small').removeClass(self.settings.error_class);$(':input',form).not(':button, :submit, :reset, :hidden, [data-abide-ignore]').val('').removeAttr(self.invalid_attr);},validate:function validate(els,e,is_ajax){var validations=this.parse_patterns(els),validation_count=validations.length,form=this.S(els[0]).closest('form'),submit_event=/submit/.test(e.type); // Has to count up to make sure the focus gets applied to the top error
for(var i=0;i<validation_count;i++){if(!validations[i]&&(submit_event||is_ajax)){if(this.settings.focus_on_invalid){els[i].focus();}form.trigger('invalid.fndtn.abide');this.S(els[i]).closest('form').attr(this.invalid_attr,'');return false;}}if(submit_event||is_ajax){form.trigger('valid.fndtn.abide');}form.removeAttr(this.invalid_attr);if(is_ajax){return false;}return true;},parse_patterns:function parse_patterns(els){var i=els.length,el_patterns=[];while(i--){el_patterns.push(this.pattern(els[i]));}return this.check_validation_and_apply_styles(el_patterns);},pattern:function pattern(el){var type=el.getAttribute('type'),required=typeof el.getAttribute('required')==='string';var pattern=el.getAttribute('pattern')||'';if(this.settings.patterns.hasOwnProperty(pattern)&&pattern.length>0){return [el,this.settings.patterns[pattern],required];}else if(pattern.length>0){return [el,new RegExp(pattern),required];}if(this.settings.patterns.hasOwnProperty(type)){return [el,this.settings.patterns[type],required];}pattern=/.*/;return [el,pattern,required];}, // TODO: Break this up into smaller methods, getting hard to read.
check_validation_and_apply_styles:function check_validation_and_apply_styles(el_patterns){var i=el_patterns.length,validations=[];if(i==0){return validations;}var form=this.S(el_patterns[0][0]).closest('[data-'+this.attr_name(true)+']'),settings=form.data(this.attr_name(true)+'-init')||{};while(i--){var el=el_patterns[i][0],required=el_patterns[i][2],value=el.value.trim(),direct_parent=this.S(el).parent(),validator=el.getAttribute(this.add_namespace('data-abide-validator')),is_radio=el.type==='radio',is_checkbox=el.type==='checkbox',label=this.S('label[for="'+el.getAttribute('id')+'"]'),valid_length=required?el.value.length>0:true,el_validations=[];var parent,valid; // support old way to do equalTo validations
if(el.getAttribute(this.add_namespace('data-equalto'))){validator='equalTo';}if(!direct_parent.is('label')){parent=direct_parent;}else {parent=direct_parent.parent();}if(is_radio&&required){el_validations.push(this.valid_radio(el,required));}else if(is_checkbox&&required){el_validations.push(this.valid_checkbox(el,required));}else if(validator){ // Validate using each of the specified (space-delimited) validators.
var validators=validator.split(' ');var last_valid=true,all_valid=true;for(var iv=0;iv<validators.length;iv++){valid=this.settings.validators[validators[iv]].apply(this,[el,required,parent]);el_validations.push(valid);all_valid=valid&&last_valid;last_valid=valid;}if(all_valid){this.S(el).removeAttr(this.invalid_attr);parent.removeClass('error');if(label.length>0&&this.settings.error_labels){label.removeClass(this.settings.error_class).removeAttr('role');}$(el).triggerHandler('valid');}else {this.S(el).attr(this.invalid_attr,'');parent.addClass('error');if(label.length>0&&this.settings.error_labels){label.addClass(this.settings.error_class).attr('role','alert');}$(el).triggerHandler('invalid');}}else {if(el_patterns[i][1].test(value)&&valid_length||!required&&el.value.length<1||$(el).attr('disabled')){el_validations.push(true);}else {el_validations.push(false);}el_validations=[el_validations.every(function(valid){return valid;})];if(el_validations[0]){this.S(el).removeAttr(this.invalid_attr);el.setAttribute('aria-invalid','false');el.removeAttribute('aria-describedby');parent.removeClass(this.settings.error_class);if(label.length>0&&this.settings.error_labels){label.removeClass(this.settings.error_class).removeAttr('role');}$(el).triggerHandler('valid');}else {this.S(el).attr(this.invalid_attr,'');el.setAttribute('aria-invalid','true'); // Try to find the error associated with the input
var errorElem=parent.find('small.'+this.settings.error_class,'span.'+this.settings.error_class);var errorID=errorElem.length>0?errorElem[0].id:'';if(errorID.length>0){el.setAttribute('aria-describedby',errorID);} // el.setAttribute('aria-describedby', $(el).find('.error')[0].id);
parent.addClass(this.settings.error_class);if(label.length>0&&this.settings.error_labels){label.addClass(this.settings.error_class).attr('role','alert');}$(el).triggerHandler('invalid');}}validations=validations.concat(el_validations);}return validations;},valid_checkbox:function valid_checkbox(el,required){var el=this.S(el),valid=el.is(':checked')||!required||el.get(0).getAttribute('disabled');if(valid){el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);$(el).triggerHandler('valid');}else {el.attr(this.invalid_attr,'').parent().addClass(this.settings.error_class);$(el).triggerHandler('invalid');}return valid;},valid_radio:function valid_radio(el,required){var name=el.getAttribute('name'),group=this.S(el).closest('[data-'+this.attr_name(true)+']').find("[name='"+name+"']"),count=group.length,valid=false,disabled=false; // Has to count up to make sure the focus gets applied to the top error
for(var i=0;i<count;i++){if(group[i].getAttribute('disabled')){disabled=true;valid=true;}else {if(group[i].checked){valid=true;}else {if(disabled){valid=false;}}}} // Has to count up to make sure the focus gets applied to the top error
for(var i=0;i<count;i++){if(valid){this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);$(group[i]).triggerHandler('valid');}else {this.S(group[i]).attr(this.invalid_attr,'').parent().addClass(this.settings.error_class);$(group[i]).triggerHandler('invalid');}}return valid;},valid_equal:function valid_equal(el,required,parent){var from=document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,to=el.value,valid=from===to;if(valid){this.S(el).removeAttr(this.invalid_attr);parent.removeClass(this.settings.error_class);if(label.length>0&&settings.error_labels){label.removeClass(this.settings.error_class);}}else {this.S(el).attr(this.invalid_attr,'');parent.addClass(this.settings.error_class);if(label.length>0&&settings.error_labels){label.addClass(this.settings.error_class);}}return valid;},valid_oneof:function valid_oneof(el,required,parent,doNotValidateOthers){var el=this.S(el),others=this.S('['+this.add_namespace('data-oneof')+']'),valid=others.filter(':checked').length>0;if(valid){el.removeAttr(this.invalid_attr).parent().removeClass(this.settings.error_class);}else {el.attr(this.invalid_attr,'').parent().addClass(this.settings.error_class);}if(!doNotValidateOthers){var _this=this;others.each(function(){_this.valid_oneof.call(_this,this,null,null,true);});}return valid;},reflow:function reflow(scope,options){var self=this,form=self.S('['+this.attr_name()+']').attr('novalidate','novalidate');self.S(form).each(function(idx,el){self.events(el);});}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.accordion={name:'accordion',version:'5.5.3',settings:{content_class:'content',active_class:'active',multi_expand:false,toggleable:true,callback:function callback(){}},init:function init(scope,method,options){this.bindings(method,options);},events:function events(instance){var self=this;var S=this.S;self.create(this.S(instance));S(this.scope).off('.fndtn.accordion').on('click.fndtn.accordion','['+this.attr_name()+'] > dd > a, ['+this.attr_name()+'] > li > a',function(e){var accordion=S(this).closest('['+self.attr_name()+']'),groupSelector=self.attr_name()+'='+accordion.attr(self.attr_name()),settings=accordion.data(self.attr_name(true)+'-init')||self.settings,target=S('#'+this.href.split('#')[1]),aunts=$('> dd, > li',accordion),siblings=aunts.children('.'+settings.content_class),active_content=siblings.filter('.'+settings.active_class);e.preventDefault();if(accordion.attr(self.attr_name())){siblings=siblings.add('['+groupSelector+'] dd > '+'.'+settings.content_class+', ['+groupSelector+'] li > '+'.'+settings.content_class);aunts=aunts.add('['+groupSelector+'] dd, ['+groupSelector+'] li');}if(settings.toggleable&&target.is(active_content)){target.parent('dd, li').toggleClass(settings.active_class,false);target.toggleClass(settings.active_class,false);S(this).attr('aria-expanded',function(i,attr){return attr==='true'?'false':'true';});settings.callback(target);target.triggerHandler('toggled',[accordion]);accordion.triggerHandler('toggled',[target]);return;}if(!settings.multi_expand){siblings.removeClass(settings.active_class);aunts.removeClass(settings.active_class);aunts.children('a').attr('aria-expanded','false');}target.addClass(settings.active_class).parent().addClass(settings.active_class);settings.callback(target);target.triggerHandler('toggled',[accordion]);accordion.triggerHandler('toggled',[target]);S(this).attr('aria-expanded','true');});},create:function create($instance){var self=this,accordion=$instance,aunts=$('> .accordion-navigation',accordion),settings=accordion.data(self.attr_name(true)+'-init')||self.settings;aunts.children('a').attr('aria-expanded','false');aunts.has('.'+settings.content_class+'.'+settings.active_class).addClass(settings.active_class).children('a').attr('aria-expanded','true');if(settings.multi_expand){$instance.attr('aria-multiselectable','true');}},toggle:function toggle(options){var options=typeof options!=='undefined'?options:{};var selector=typeof options.selector!=='undefined'?options.selector:'';var toggle_state=typeof options.toggle_state!=='undefined'?options.toggle_state:'';var $accordion=typeof options.$accordion!=='undefined'?options.$accordion:this.S(this.scope).closest('['+this.attr_name()+']');var $items=$accordion.find('> dd'+selector+', > li'+selector);if($items.length<1){if(window.console){console.error('Selection not found.',selector);}return false;}var S=this.S;var active_class=this.settings.active_class;$items.each(function(){var $item=S(this);var is_active=$item.hasClass(active_class);if(is_active&&toggle_state==='close'||!is_active&&toggle_state==='open'||toggle_state===''){$item.find('> a').trigger('click.fndtn.accordion');}});},open:function open(options){var options=typeof options!=='undefined'?options:{};options.toggle_state='open';this.toggle(options);},close:function close(options){var options=typeof options!=='undefined'?options:{};options.toggle_state='close';this.toggle(options);},off:function off(){},reflow:function reflow(){}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.alert={name:'alert',version:'5.5.3',settings:{callback:function callback(){}},init:function init(scope,method,options){this.bindings(method,options);},events:function events(){var self=this,S=this.S;$(this.scope).off('.alert').on('click.fndtn.alert','['+this.attr_name()+'] .close',function(e){var alertBox=S(this).closest('['+self.attr_name()+']'),settings=alertBox.data(self.attr_name(true)+'-init')||self.settings;e.preventDefault();if(Modernizr.csstransitions){alertBox.addClass('alert-close');alertBox.on('transitionend webkitTransitionEnd oTransitionEnd',function(e){S(this).trigger('close.fndtn.alert').remove();settings.callback();});}else {alertBox.fadeOut(300,function(){S(this).trigger('close.fndtn.alert').remove();settings.callback();});}});},reflow:function reflow(){}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.clearing={name:'clearing',version:'5.5.3',settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a>'+'<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'+'<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>'+'<a href="#" class="clearing-main-next"><span></span></a></div>'+'<img class="clearing-preload-next" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'+'<img class="clearing-preload-prev" style="display: none" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />'}, // comma delimited list of selectors that, on click, will close clearing,
// add 'div.clearing-blackout, div.visible-img' to close on background click
close_selectors:'.clearing-close, div.clearing-blackout', // Default to the entire li element.
open_selectors:'', // Image will be skipped in carousel.
skip_selector:'',touch_label:'', // event initializer and locks
init:false,locked:false},init:function init(scope,method,options){var self=this;Foundation.inherit(this,'throttle image_loaded');this.bindings(method,options);if(self.S(this.scope).is('['+this.attr_name()+']')){this.assemble(self.S('li',this.scope));}else {self.S('['+this.attr_name()+']',this.scope).each(function(){self.assemble(self.S('li',this));});}},events:function events(scope){var self=this,S=self.S,$scroll_container=$('.scroll-container');if($scroll_container.length>0){this.scope=$scroll_container;}S(this.scope).off('.clearing').on('click.fndtn.clearing','ul['+this.attr_name()+'] li '+this.settings.open_selectors,function(e,current,target){var current=current||S(this),target=target||current,next=current.next('li'),settings=current.closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init'),image=S(e.target);e.preventDefault();if(!settings){self.init();settings=current.closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init');} // if clearing is open and the current image is
// clicked, go to the next image in sequence
if(target.hasClass('visible')&&current[0]===target[0]&&next.length>0&&self.is_open(current)){target=next;image=S('img',target);} // set current and target to the clicked li if not otherwise defined.
self.open(image,current,target);self.update_paddles(target);}).on('click.fndtn.clearing','.clearing-main-next',function(e){self.nav(e,'next');}).on('click.fndtn.clearing','.clearing-main-prev',function(e){self.nav(e,'prev');}).on('click.fndtn.clearing',this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this);});$(document).on('keydown.fndtn.clearing',function(e){self.keydown(e);});S(window).off('.clearing').on('resize.fndtn.clearing',function(){self.resize();});this.swipe_events(scope);},swipe_events:function swipe_events(scope){var self=this,S=self.S;S(this.scope).on('touchstart.fndtn.clearing','.visible-img',function(e){if(!e.touches){e=e.originalEvent;}var data={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:new Date().getTime(),delta_x:0,is_scrolling:undefined};S(this).data('swipe-transition',data);e.stopPropagation();}).on('touchmove.fndtn.clearing','.visible-img',function(e){if(!e.touches){e=e.originalEvent;} // Ignore pinch/zoom events
if(e.touches.length>1||e.scale&&e.scale!==1){return;}var data=S(this).data('swipe-transition');if(typeof data==='undefined'){data={};}data.delta_x=e.touches[0].pageX-data.start_page_x;if(Foundation.rtl){data.delta_x=-data.delta_x;}if(typeof data.is_scrolling==='undefined'){data.is_scrolling=!!(data.is_scrolling||Math.abs(data.delta_x)<Math.abs(e.touches[0].pageY-data.start_page_y));}if(!data.is_scrolling&&!data.active){e.preventDefault();var direction=data.delta_x<0?'next':'prev';data.active=true;self.nav(e,direction);}}).on('touchend.fndtn.clearing','.visible-img',function(e){S(this).data('swipe-transition',{});e.stopPropagation();});},assemble:function assemble($li){var $el=$li.parent();if($el.parent().hasClass('carousel')){return;}$el.after('<div id="foundationClearingHolder"></div>');var grid=$el.detach(),grid_outerHTML='';if(grid[0]==null){return;}else {grid_outerHTML=grid[0].outerHTML;}var holder=this.S('#foundationClearingHolder'),settings=$el.data(this.attr_name(true)+'-init'),data={grid:'<div class="carousel">'+grid_outerHTML+'</div>',viewing:settings.templates.viewing},wrapper='<div class="clearing-assembled"><div>'+data.viewing+data.grid+'</div></div>',touch_label=this.settings.touch_label;if(Modernizr.touch){wrapper=$(wrapper).find('.clearing-touch-label').html(touch_label).end();}holder.after(wrapper).remove();},open:function open($image,current,target){var self=this,body=$(document.body),root=target.closest('.clearing-assembled'),container=self.S('div',root).first(),visible_image=self.S('.visible-img',container),image=self.S('img',visible_image).not($image),label=self.S('.clearing-touch-label',container),error=false,loaded={}; // Event to disable scrolling on touch devices when Clearing is activated
$('body').on('touchmove',function(e){e.preventDefault();});image.error(function(){error=true;});function startLoad(){setTimeout(function(){this.image_loaded(image,function(){if(image.outerWidth()===1&&!error){startLoad.call(this);}else {cb.call(this,image);}}.bind(this));}.bind(this),100);}function cb(image){var $image=$(image);$image.css('visibility','visible');$image.trigger('imageVisible'); // toggle the gallery
body.css('overflow','hidden');root.addClass('clearing-blackout');container.addClass('clearing-container');visible_image.show();this.fix_height(target).caption(self.S('.clearing-caption',visible_image),self.S('img',target)).center_and_label(image,label).shift(current,target,function(){target.closest('li').siblings().removeClass('visible');target.closest('li').addClass('visible');});visible_image.trigger('opened.fndtn.clearing');}if(!this.locked()){visible_image.trigger('open.fndtn.clearing'); // set the image to the selected thumbnail
loaded=this.load($image);if(loaded.interchange){image.attr('data-interchange',loaded.interchange).foundation('interchange','reflow');}else {image.attr('src',loaded.src).attr('data-interchange','');}image.css('visibility','hidden');startLoad.call(this);}},close:function close(e,el){e.preventDefault();var root=function(target){if(/blackout/.test(target.selector)){return target;}else {return target.closest('.clearing-blackout');}}($(el)),body=$(document.body),container,visible_image;if(el===e.target&&root){body.css('overflow','');container=$('div',root).first();visible_image=$('.visible-img',container);visible_image.trigger('close.fndtn.clearing');this.settings.prev_index=0;$('ul['+this.attr_name()+']',root).attr('style','').closest('.clearing-blackout').removeClass('clearing-blackout');container.removeClass('clearing-container');visible_image.hide();visible_image.trigger('closed.fndtn.clearing');} // Event to re-enable scrolling on touch devices
$('body').off('touchmove');return false;},is_open:function is_open(current){return current.parent().prop('style').length>0;},keydown:function keydown(e){var clearing=$('.clearing-blackout ul['+this.attr_name()+']'),NEXT_KEY=this.rtl?37:39,PREV_KEY=this.rtl?39:37,ESC_KEY=27;if(e.which===NEXT_KEY){this.go(clearing,'next');}if(e.which===PREV_KEY){this.go(clearing,'prev');}if(e.which===ESC_KEY){this.S('a.clearing-close').trigger('click.fndtn.clearing');}},nav:function nav(e,direction){var clearing=$('ul['+this.attr_name()+']','.clearing-blackout');e.preventDefault();this.go(clearing,direction);},resize:function resize(){var image=$('img','.clearing-blackout .visible-img'),label=$('.clearing-touch-label','.clearing-blackout');if(image.length){this.center_and_label(image,label);image.trigger('resized.fndtn.clearing');}}, // visual adjustments
fix_height:function fix_height(target){var lis=target.parent().children(),self=this;lis.each(function(){var li=self.S(this),image=li.find('img');if(li.height()>image.outerHeight()){li.addClass('fix-height');}}).closest('ul').width(lis.length*100+'%');return this;},update_paddles:function update_paddles(target){target=target.closest('li');var visible_image=target.closest('.carousel').siblings('.visible-img');if(target.next().length>0){this.S('.clearing-main-next',visible_image).removeClass('disabled');}else {this.S('.clearing-main-next',visible_image).addClass('disabled');}if(target.prev().length>0){this.S('.clearing-main-prev',visible_image).removeClass('disabled');}else {this.S('.clearing-main-prev',visible_image).addClass('disabled');}},center_and_label:function center_and_label(target,label){if(!this.rtl&&label.length>0){label.css({marginLeft:-(label.outerWidth()/2),marginTop:-(target.outerHeight()/2)-label.outerHeight()-10});}else {label.css({marginRight:-(label.outerWidth()/2),marginTop:-(target.outerHeight()/2)-label.outerHeight()-10,left:'auto',right:'50%'});}return this;}, // image loading and preloading
load:function load($image){var href,interchange,closest_a;if($image[0].nodeName==='A'){href=$image.attr('href');interchange=$image.data('clearing-interchange');}else {closest_a=$image.closest('a');href=closest_a.attr('href');interchange=closest_a.data('clearing-interchange');}this.preload($image);return {'src':href?href:$image.attr('src'),'interchange':href?interchange:$image.data('clearing-interchange')};},preload:function preload($image){this.img($image.closest('li').next(),'next').img($image.closest('li').prev(),'prev');},img:function img(_img,sibling_type){if(_img.length){var preload_img=$('.clearing-preload-'+sibling_type),new_a=this.S('a',_img),src,interchange,image;if(new_a.length){src=new_a.attr('href');interchange=new_a.data('clearing-interchange');}else {image=this.S('img',_img);src=image.attr('src');interchange=image.data('clearing-interchange');}if(interchange){preload_img.attr('data-interchange',interchange);}else {preload_img.attr('src',src);preload_img.attr('data-interchange','');}}return this;}, // image caption
caption:function caption(container,$image){var caption=$image.attr('data-caption');if(caption){var containerPlain=container.get(0);containerPlain.innerHTML=caption;container.show();}else {container.text('').hide();}return this;}, // directional methods
go:function go($ul,direction){var current=this.S('.visible',$ul),target=current[direction](); // Check for skip selector.
if(this.settings.skip_selector&&target.find(this.settings.skip_selector).length!=0){target=target[direction]();}if(target.length){this.S('img',target).trigger('click.fndtn.clearing',[current,target]).trigger('change.fndtn.clearing');}},shift:function shift(current,target,callback){var clearing=target.parent(),old_index=this.settings.prev_index||target.index(),direction=this.direction(clearing,current,target),dir=this.rtl?'right':'left',left=parseInt(clearing.css('left'),10),width=target.outerWidth(),skip_shift;var dir_obj={}; // we use jQuery animate instead of CSS transitions because we
// need a callback to unlock the next animation
// needs support for RTL **
if(target.index()!==old_index&&!/skip/.test(direction)){if(/left/.test(direction)){this.lock();dir_obj[dir]=left+width;clearing.animate(dir_obj,300,this.unlock());}else if(/right/.test(direction)){this.lock();dir_obj[dir]=left-width;clearing.animate(dir_obj,300,this.unlock());}}else if(/skip/.test(direction)){ // the target image is not adjacent to the current image, so
// do we scroll right or not
skip_shift=target.index()-this.settings.up_count;this.lock();if(skip_shift>0){dir_obj[dir]=-(skip_shift*width);clearing.animate(dir_obj,300,this.unlock());}else {dir_obj[dir]=0;clearing.animate(dir_obj,300,this.unlock());}}callback();},direction:function direction($el,current,target){var lis=this.S('li',$el),li_width=lis.outerWidth()+lis.outerWidth()/4,up_count=Math.floor(this.S('.clearing-container').outerWidth()/li_width)-1,target_index=lis.index(target),response;this.settings.up_count=up_count;if(this.adjacent(this.settings.prev_index,target_index)){if(target_index>up_count&&target_index>this.settings.prev_index){response='right';}else if(target_index>up_count-1&&target_index<=this.settings.prev_index){response='left';}else {response=false;}}else {response='skip';}this.settings.prev_index=target_index;return response;},adjacent:function adjacent(current_index,target_index){for(var i=target_index+1;i>=target_index-1;i--){if(i===current_index){return true;}}return false;}, // lock management
lock:function lock(){this.settings.locked=true;},unlock:function unlock(){this.settings.locked=false;},locked:function locked(){return this.settings.locked;},off:function off(){this.S(this.scope).off('.fndtn.clearing');this.S(window).off('.fndtn.clearing');},reflow:function reflow(){this.init();}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.dropdown={name:'dropdown',version:'5.5.3',settings:{active_class:'open',disabled_class:'disabled',mega_class:'mega',align:'bottom',is_hover:false,hover_timeout:150,opened:function opened(){},closed:function closed(){}},init:function init(scope,method,options){Foundation.inherit(this,'throttle');$.extend(true,this.settings,method,options);this.bindings(method,options);},events:function events(scope){var self=this,S=self.S;S(this.scope).off('.dropdown').on('click.fndtn.dropdown','['+this.attr_name()+']',function(e){var settings=S(this).data(self.attr_name(true)+'-init')||self.settings;if(!settings.is_hover||Modernizr.touch){e.preventDefault();if(S(this).parent('[data-reveal-id]').length){e.stopPropagation();}self.toggle($(this));}}).on('mouseenter.fndtn.dropdown','['+this.attr_name()+'], ['+this.attr_name()+'-content]',function(e){var $this=S(this),dropdown,target;clearTimeout(self.timeout);if($this.data(self.data_attr())){dropdown=S('#'+$this.data(self.data_attr()));target=$this;}else {dropdown=$this;target=S('['+self.attr_name()+'="'+dropdown.attr('id')+'"]');}var settings=target.data(self.attr_name(true)+'-init')||self.settings;if(S(e.currentTarget).data(self.data_attr())&&settings.is_hover){self.closeall.call(self);}if(settings.is_hover){self.open.apply(self,[dropdown,target]);}}).on('mouseleave.fndtn.dropdown','['+this.attr_name()+'], ['+this.attr_name()+'-content]',function(e){var $this=S(this);var settings;if($this.data(self.data_attr())){settings=$this.data(self.data_attr(true)+'-init')||self.settings;}else {var target=S('['+self.attr_name()+'="'+S(this).attr('id')+'"]'),settings=target.data(self.attr_name(true)+'-init')||self.settings;}self.timeout=setTimeout(function(){if($this.data(self.data_attr())){if(settings.is_hover){self.close.call(self,S('#'+$this.data(self.data_attr())));}}else {if(settings.is_hover){self.close.call(self,$this);}}}.bind(this),settings.hover_timeout);}).on('click.fndtn.dropdown',function(e){var parent=S(e.target).closest('['+self.attr_name()+'-content]');var links=parent.find('a');if(links.length>0&&parent.attr('aria-autoclose')!=='false'){self.close.call(self,S('['+self.attr_name()+'-content]'));}if(e.target!==document&&!$.contains(document.documentElement,e.target)){return;}if(S(e.target).closest('['+self.attr_name()+']').length>0){return;}if(!S(e.target).data('revealId')&&parent.length>0&&(S(e.target).is('['+self.attr_name()+'-content]')||$.contains(parent.first()[0],e.target))){e.stopPropagation();return;}self.close.call(self,S('['+self.attr_name()+'-content]'));}).on('opened.fndtn.dropdown','['+self.attr_name()+'-content]',function(){self.settings.opened.call(this);}).on('closed.fndtn.dropdown','['+self.attr_name()+'-content]',function(){self.settings.closed.call(this);});S(window).off('.dropdown').on('resize.fndtn.dropdown',self.throttle(function(){self.resize.call(self);},50));this.resize();},close:function close(dropdown){var self=this;dropdown.each(function(idx){var original_target=$('['+self.attr_name()+'='+dropdown[idx].id+']')||$('aria-controls='+dropdown[idx].id+']');original_target.attr('aria-expanded','false');if(self.S(this).hasClass(self.settings.active_class)){self.S(this).css(Foundation.rtl?'right':'left','-99999px').attr('aria-hidden','true').removeClass(self.settings.active_class).prev('['+self.attr_name()+']').removeClass(self.settings.active_class).removeData('target');self.S(this).trigger('closed.fndtn.dropdown',[dropdown]);}});dropdown.removeClass('f-open-'+this.attr_name(true));},closeall:function closeall(){var self=this;$.each(self.S('.f-open-'+this.attr_name(true)),function(){self.close.call(self,self.S(this));});},open:function open(dropdown,target){this.css(dropdown.addClass(this.settings.active_class),target);dropdown.prev('['+this.attr_name()+']').addClass(this.settings.active_class);dropdown.data('target',target.get(0)).trigger('opened.fndtn.dropdown',[dropdown,target]);dropdown.attr('aria-hidden','false');target.attr('aria-expanded','true');dropdown.focus();dropdown.addClass('f-open-'+this.attr_name(true));},data_attr:function data_attr(){if(this.namespace.length>0){return this.namespace+'-'+this.name;}return this.name;},toggle:function toggle(target){if(target.hasClass(this.settings.disabled_class)){return;}var dropdown=this.S('#'+target.data(this.data_attr()));if(dropdown.length===0){ // No dropdown found, not continuing
return;}this.close.call(this,this.S('['+this.attr_name()+'-content]').not(dropdown));if(dropdown.hasClass(this.settings.active_class)){this.close.call(this,dropdown);if(dropdown.data('target')!==target.get(0)){this.open.call(this,dropdown,target);}}else {this.open.call(this,dropdown,target);}},resize:function resize(){var dropdown=this.S('['+this.attr_name()+'-content].open');var target=$(dropdown.data("target"));if(dropdown.length&&target.length){this.css(dropdown,target);}},css:function css(dropdown,target){var left_offset=Math.max((target.width()-dropdown.width())/2,8),settings=target.data(this.attr_name(true)+'-init')||this.settings,parentOverflow=dropdown.parent().css('overflow-y')||dropdown.parent().css('overflow');this.clear_idx();if(this.small()){var p=this.dirs.bottom.call(dropdown,target,settings);dropdown.attr('style','').removeClass('drop-left drop-right drop-top').css({position:'absolute',width:'95%','max-width':'none',top:p.top});dropdown.css(Foundation.rtl?'right':'left',left_offset);} // detect if dropdown is in an overflow container
else if(parentOverflow!=='visible'){var offset=target[0].offsetTop+target[0].offsetHeight;dropdown.attr('style','').css({position:'absolute',top:offset});dropdown.css(Foundation.rtl?'right':'left',left_offset);}else {this.style(dropdown,target,settings);}return dropdown;},style:function style(dropdown,target,settings){var css=$.extend({position:'absolute'},this.dirs[settings.align].call(dropdown,target,settings));dropdown.attr('style','').css(css);}, // return CSS property object
// `this` is the dropdown
dirs:{ // Calculate target offset
_base:function _base(t,s){var o_p=this.offsetParent(),o=o_p.offset(),p=t.offset();p.top-=o.top;p.left-=o.left; //set some flags on the p object to pass along
p.missRight=false;p.missTop=false;p.missLeft=false;p.leftRightFlag=false; //lets see if the panel will be off the screen
//get the actual width of the page and store it
var actualBodyWidth;var windowWidth=window.innerWidth;if(document.getElementsByClassName('row')[0]){actualBodyWidth=document.getElementsByClassName('row')[0].clientWidth;}else {actualBodyWidth=windowWidth;}var actualMarginWidth=(windowWidth-actualBodyWidth)/2;var actualBoundary=actualBodyWidth;if(!this.hasClass('mega')&&!s.ignore_repositioning){var outerWidth=this.outerWidth();var o_left=t.offset().left; //miss top
if(t.offset().top<=this.outerHeight()){p.missTop=true;actualBoundary=windowWidth-actualMarginWidth;p.leftRightFlag=true;} //miss right
if(o_left+outerWidth>o_left+actualMarginWidth&&o_left-actualMarginWidth>outerWidth){p.missRight=true;p.missLeft=false;} //miss left
if(o_left-outerWidth<=0){p.missLeft=true;p.missRight=false;}}return p;},top:function top(t,s){var self=Foundation.libs.dropdown,p=self.dirs._base.call(this,t,s);this.addClass('drop-top');if(p.missTop==true){p.top=p.top+t.outerHeight()+this.outerHeight();this.removeClass('drop-top');}if(p.missRight==true){p.left=p.left-this.outerWidth()+t.outerWidth();}if(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu)){self.adjust_pip(this,t,s,p);}if(Foundation.rtl){return {left:p.left-this.outerWidth()+t.outerWidth(),top:p.top-this.outerHeight()};}return {left:p.left,top:p.top-this.outerHeight()};},bottom:function bottom(t,s){var self=Foundation.libs.dropdown,p=self.dirs._base.call(this,t,s);if(p.missRight==true){p.left=p.left-this.outerWidth()+t.outerWidth();}if(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu)){self.adjust_pip(this,t,s,p);}if(self.rtl){return {left:p.left-this.outerWidth()+t.outerWidth(),top:p.top+t.outerHeight()};}return {left:p.left,top:p.top+t.outerHeight()};},left:function left(t,s){var p=Foundation.libs.dropdown.dirs._base.call(this,t,s);this.addClass('drop-left');if(p.missLeft==true){p.left=p.left+this.outerWidth();p.top=p.top+t.outerHeight();this.removeClass('drop-left');}return {left:p.left-this.outerWidth(),top:p.top};},right:function right(t,s){var p=Foundation.libs.dropdown.dirs._base.call(this,t,s);this.addClass('drop-right');if(p.missRight==true){p.left=p.left-this.outerWidth();p.top=p.top+t.outerHeight();this.removeClass('drop-right');}else {p.triggeredRight=true;}var self=Foundation.libs.dropdown;if(t.outerWidth()<this.outerWidth()||self.small()||this.hasClass(s.mega_menu)){self.adjust_pip(this,t,s,p);}return {left:p.left+t.outerWidth(),top:p.top};}}, // Insert rule to style psuedo elements
adjust_pip:function adjust_pip(dropdown,target,settings,position){var sheet=Foundation.stylesheet,pip_offset_base=8;if(dropdown.hasClass(settings.mega_class)){pip_offset_base=position.left+target.outerWidth()/2-8;}else if(this.small()){pip_offset_base+=position.left-8;}this.rule_idx=sheet.cssRules.length; //default
var sel_before='.f-dropdown.open:before',sel_after='.f-dropdown.open:after',css_before='left: '+pip_offset_base+'px;',css_after='left: '+(pip_offset_base-1)+'px;';if(position.missRight==true){pip_offset_base=dropdown.outerWidth()-23;sel_before='.f-dropdown.open:before',sel_after='.f-dropdown.open:after',css_before='left: '+pip_offset_base+'px;',css_after='left: '+(pip_offset_base-1)+'px;';} //just a case where right is fired, but its not missing right
if(position.triggeredRight==true){sel_before='.f-dropdown.open:before',sel_after='.f-dropdown.open:after',css_before='left:-12px;',css_after='left:-14px;';}if(sheet.insertRule){sheet.insertRule([sel_before,'{',css_before,'}'].join(' '),this.rule_idx);sheet.insertRule([sel_after,'{',css_after,'}'].join(' '),this.rule_idx+1);}else {sheet.addRule(sel_before,css_before,this.rule_idx);sheet.addRule(sel_after,css_after,this.rule_idx+1);}}, // Remove old dropdown rule index
clear_idx:function clear_idx(){var sheet=Foundation.stylesheet;if(typeof this.rule_idx!=='undefined'){sheet.deleteRule(this.rule_idx);sheet.deleteRule(this.rule_idx);delete this.rule_idx;}},small:function small(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches;},off:function off(){this.S(this.scope).off('.fndtn.dropdown');this.S('html, body').off('.fndtn.dropdown');this.S(window).off('.fndtn.dropdown');this.S('[data-dropdown-content]').off('.fndtn.dropdown');},reflow:function reflow(){}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.equalizer={name:'equalizer',version:'5.5.3',settings:{use_tallest:true,before_height_change:$.noop,after_height_change:$.noop,equalize_on_stack:false,act_on_hidden_el:false},init:function init(scope,method,options){Foundation.inherit(this,'image_loaded');this.bindings(method,options);this.reflow();},events:function events(){this.S(window).off('.equalizer').on('resize.fndtn.equalizer',function(e){this.reflow();}.bind(this));},equalize:function equalize(equalizer){var isStacked=false,group=equalizer.data('equalizer'),settings=equalizer.data(this.attr_name(true)+'-init')||this.settings,vals,firstTopOffset;if(settings.act_on_hidden_el){vals=group?equalizer.find('['+this.attr_name()+'-watch="'+group+'"]'):equalizer.find('['+this.attr_name()+'-watch]');}else {vals=group?equalizer.find('['+this.attr_name()+'-watch="'+group+'"]:visible'):equalizer.find('['+this.attr_name()+'-watch]:visible');}if(vals.length===0){return;}settings.before_height_change();equalizer.trigger('before-height-change.fndth.equalizer');vals.height('inherit');if(settings.equalize_on_stack===false){firstTopOffset=vals.first().offset().top;vals.each(function(){if($(this).offset().top!==firstTopOffset){isStacked=true;return false;}});if(isStacked){return;}}var heights=vals.map(function(){return $(this).outerHeight(false);}).get();if(settings.use_tallest){var max=Math.max.apply(null,heights);vals.css('height',max);}else {var min=Math.min.apply(null,heights);vals.css('height',min);}settings.after_height_change();equalizer.trigger('after-height-change.fndtn.equalizer');},reflow:function reflow(){var self=this;this.S('['+this.attr_name()+']',this.scope).each(function(){var $eq_target=$(this),media_query=$eq_target.data('equalizer-mq'),ignore_media_query=true;if(media_query){media_query='is_'+media_query.replace(/-/g,'_');if(Foundation.utils.hasOwnProperty(media_query)){ignore_media_query=false;}}self.image_loaded(self.S('img',this),function(){if(ignore_media_query||Foundation.utils[media_query]()){self.equalize($eq_target);}else {var vals=$eq_target.find('['+self.attr_name()+'-watch]:visible');vals.css('height','auto');}});});}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.interchange={name:'interchange',version:'5.5.3',cache:{},images_loaded:false,nodes_loaded:false,settings:{load_attr:'interchange',named_queries:{'default':'only screen','small':Foundation.media_queries['small'],'small-only':Foundation.media_queries['small-only'],'medium':Foundation.media_queries['medium'],'medium-only':Foundation.media_queries['medium-only'],'large':Foundation.media_queries['large'],'large-only':Foundation.media_queries['large-only'],'xlarge':Foundation.media_queries['xlarge'],'xlarge-only':Foundation.media_queries['xlarge-only'],'xxlarge':Foundation.media_queries['xxlarge'],'landscape':'only screen and (orientation: landscape)','portrait':'only screen and (orientation: portrait)','retina':'only screen and (-webkit-min-device-pixel-ratio: 2),'+'only screen and (min--moz-device-pixel-ratio: 2),'+'only screen and (-o-min-device-pixel-ratio: 2/1),'+'only screen and (min-device-pixel-ratio: 2),'+'only screen and (min-resolution: 192dpi),'+'only screen and (min-resolution: 2dppx)'},directives:{replace:function replace(el,path,trigger){ // The trigger argument, if called within the directive, fires
// an event named after the directive on the element, passing
// any parameters along to the event that you pass to trigger.
//
// ex. trigger(), trigger([a, b, c]), or trigger(a, b, c)
//
// This allows you to bind a callback like so:
// $('#interchangeContainer').on('replace', function (e, a, b, c) {
//   console.log($(this).html(), a, b, c);
// });
if(el!==null&&/IMG/.test(el[0].nodeName)){var orig_path=$.each(el,function(){this.src=path;}); // var orig_path = el[0].src;
if(new RegExp(path,'i').test(orig_path)){return;}el.attr("src",path);return trigger(el[0].src);}var last_path=el.data(this.data_attr+'-last-path'),self=this;if(last_path==path){return;}if(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i.test(path)){$(el).css('background-image','url('+path+')');el.data('interchange-last-path',path);return trigger(path);}return $.get(path,function(response){el.html(response);el.data(self.data_attr+'-last-path',path);trigger();});}}},init:function init(scope,method,options){Foundation.inherit(this,'throttle random_str');this.data_attr=this.set_data_attr();$.extend(true,this.settings,method,options);this.bindings(method,options);this.reflow();},get_media_hash:function get_media_hash(){var mediaHash='';for(var queryName in this.settings.named_queries){mediaHash+=matchMedia(this.settings.named_queries[queryName]).matches.toString();}return mediaHash;},events:function events(){var self=this,prevMediaHash;$(window).off('.interchange').on('resize.fndtn.interchange',self.throttle(function(){var currMediaHash=self.get_media_hash();if(currMediaHash!==prevMediaHash){self.resize();}prevMediaHash=currMediaHash;},50));return this;},resize:function resize(){var cache=this.cache;if(!this.images_loaded||!this.nodes_loaded){setTimeout($.proxy(this.resize,this),50);return;}for(var uuid in cache){if(cache.hasOwnProperty(uuid)){var passed=this.results(uuid,cache[uuid]);if(passed){this.settings.directives[passed.scenario[1]].call(this,passed.el,passed.scenario[0],function(passed){if(arguments[0] instanceof Array){var args=arguments[0];}else {var args=Array.prototype.slice.call(arguments,0);}return function(){passed.el.trigger(passed.scenario[1],args);};}(passed));}}}},results:function results(uuid,scenarios){var count=scenarios.length;if(count>0){var el=this.S('['+this.add_namespace('data-uuid')+'="'+uuid+'"]');while(count--){var mq,rule=scenarios[count][2];if(this.settings.named_queries.hasOwnProperty(rule)){mq=matchMedia(this.settings.named_queries[rule]);}else {mq=matchMedia(rule);}if(mq.matches){return {el:el,scenario:scenarios[count]};}}}return false;},load:function load(type,force_update){if(typeof this['cached_'+type]==='undefined'||force_update){this['update_'+type]();}return this['cached_'+type];},update_images:function update_images(){var images=this.S('img['+this.data_attr+']'),count=images.length,i=count,loaded_count=0,data_attr=this.data_attr;this.cache={};this.cached_images=[];this.images_loaded=count===0;while(i--){loaded_count++;if(images[i]){var str=images[i].getAttribute(data_attr)||'';if(str.length>0){this.cached_images.push(images[i]);}}if(loaded_count===count){this.images_loaded=true;this.enhance('images');}}return this;},update_nodes:function update_nodes(){var nodes=this.S('['+this.data_attr+']').not('img'),count=nodes.length,i=count,loaded_count=0,data_attr=this.data_attr;this.cached_nodes=[];this.nodes_loaded=count===0;while(i--){loaded_count++;var str=nodes[i].getAttribute(data_attr)||'';if(str.length>0){this.cached_nodes.push(nodes[i]);}if(loaded_count===count){this.nodes_loaded=true;this.enhance('nodes');}}return this;},enhance:function enhance(type){var i=this['cached_'+type].length;while(i--){this.object($(this['cached_'+type][i]));}return $(window).trigger('resize.fndtn.interchange');},convert_directive:function convert_directive(directive){var trimmed=this.trim(directive);if(trimmed.length>0){return trimmed;}return 'replace';},parse_scenario:function parse_scenario(scenario){ // This logic had to be made more complex since some users were using commas in the url path
// So we cannot simply just split on a comma
var directive_match=scenario[0].match(/(.+),\s*(\w+)\s*$/), // getting the mq has gotten a bit complicated since we started accounting for several use cases
// of URLs. For now we'll continue to match these scenarios, but we may consider having these scenarios
// as nested objects or arrays in F6.
// regex: match everything before close parenthesis for mq
media_query=scenario[1].match(/(.*)\)/);if(directive_match){var path=directive_match[1],directive=directive_match[2];}else {var cached_split=scenario[0].split(/,\s*$/),path=cached_split[0],directive='';}return [this.trim(path),this.convert_directive(directive),this.trim(media_query[1])];},object:function object(el){var raw_arr=this.parse_data_attr(el),scenarios=[],i=raw_arr.length;if(i>0){while(i--){ // split array between comma delimited content and mq
// regex: comma, optional space, open parenthesis
var scenario=raw_arr[i].split(/,\s?\(/);if(scenario.length>1){var params=this.parse_scenario(scenario);scenarios.push(params);}}}return this.store(el,scenarios);},store:function store(el,scenarios){var uuid=this.random_str(),current_uuid=el.data(this.add_namespace('uuid',true));if(this.cache[current_uuid]){return this.cache[current_uuid];}el.attr(this.add_namespace('data-uuid'),uuid);return this.cache[uuid]=scenarios;},trim:function trim(str){if(typeof str==='string'){return $.trim(str);}return str;},set_data_attr:function set_data_attr(init){if(init){if(this.namespace.length>0){return this.namespace+'-'+this.settings.load_attr;}return this.settings.load_attr;}if(this.namespace.length>0){return 'data-'+this.namespace+'-'+this.settings.load_attr;}return 'data-'+this.settings.load_attr;},parse_data_attr:function parse_data_attr(el){var raw=el.attr(this.attr_name()).split(/\[(.*?)\]/),i=raw.length,output=[];while(i--){if(raw[i].replace(/[\W\d]+/,'').length>4){output.push(raw[i]);}}return output;},reflow:function reflow(){this.load('images',true);this.load('nodes',true);}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';var Modernizr=Modernizr||false;Foundation.libs.joyride={name:'joyride',version:'5.5.3',defaults:{expose:false, // turn on or off the expose feature
modal:true, // Whether to cover page with modal during the tour
keyboard:true, // enable left, right and esc keystrokes
tip_location:'bottom', // 'top', 'bottom', 'left' or 'right' in relation to parent
nub_position:'auto', // override on a per tooltip bases
scroll_speed:1500, // Page scrolling speed in milliseconds, 0 = no scroll animation
scroll_animation:'linear', // supports 'swing' and 'linear', extend with jQuery UI.
timer:0, // 0 = no timer , all other numbers = timer in milliseconds
start_timer_on_click:true, // true or false - true requires clicking the first button start the timer
start_offset:0, // the index of the tooltip you want to start on (index of the li)
next_button:true, // true or false to control whether a next button is used
prev_button:true, // true or false to control whether a prev button is used
tip_animation:'fade', // 'pop' or 'fade' in each tip
pause_after:[], // array of indexes where to pause the tour after
exposed:[], // array of expose elements
tip_animation_fade_speed:300, // when tipAnimation = 'fade' this is speed in milliseconds for the transition
cookie_monster:false, // true or false to control whether cookies are used
cookie_name:'joyride', // Name the cookie you'll use
cookie_domain:false, // Will this cookie be attached to a domain, ie. '.notableapp.com'
cookie_expires:365, // set when you would like the cookie to expire.
tip_container:'body', // Where will the tip be attached
abort_on_close:true, // When true, the close event will not fire any callback
tip_location_patterns:{top:['bottom'],bottom:[], // bottom should not need to be repositioned
left:['right','top','bottom'],right:['left','top','bottom']},post_ride_callback:function post_ride_callback(){}, // A method to call once the tour closes (canceled or complete)
post_step_callback:function post_step_callback(){}, // A method to call after each step
pre_step_callback:function pre_step_callback(){}, // A method to call before each step
pre_ride_callback:function pre_ride_callback(){}, // A method to call before the tour starts (passed index, tip, and cloned exposed element)
post_expose_callback:function post_expose_callback(){}, // A method to call after an element has been exposed
template:{ // HTML segments for tip layout
link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:'' // One or more space-separated class names to be added to exposed element
},init:function init(scope,method,options){Foundation.inherit(this,'throttle random_str');this.settings=this.settings||$.extend({},this.defaults,options||method);this.bindings(method,options);},go_next:function go_next(){if(this.settings.$li.next().length<1){this.end();}else if(this.settings.timer>0){clearTimeout(this.settings.automate);this.hide();this.show();this.startTimer();}else {this.hide();this.show();}},go_prev:function go_prev(){if(this.settings.$li.prev().length<1){ // Do nothing if there are no prev element
}else if(this.settings.timer>0){clearTimeout(this.settings.automate);this.hide();this.show(null,true);this.startTimer();}else {this.hide();this.show(null,true);}},events:function events(){var self=this;$(this.scope).off('.joyride').on('click.fndtn.joyride','.joyride-next-tip, .joyride-modal-bg',function(e){e.preventDefault();this.go_next();}.bind(this)).on('click.fndtn.joyride','.joyride-prev-tip',function(e){e.preventDefault();this.go_prev();}.bind(this)).on('click.fndtn.joyride','.joyride-close-tip',function(e){e.preventDefault();this.end(this.settings.abort_on_close);}.bind(this)).on('keyup.fndtn.joyride',function(e){ // Don't do anything if keystrokes are disabled
// or if the joyride is not being shown
if(!this.settings.keyboard||!this.settings.riding){return;}switch(e.which){case 39: // right arrow
e.preventDefault();this.go_next();break;case 37: // left arrow
e.preventDefault();this.go_prev();break;case 27: // escape
e.preventDefault();this.end(this.settings.abort_on_close);}}.bind(this));$(window).off('.joyride').on('resize.fndtn.joyride',self.throttle(function(){if($('['+self.attr_name()+']').length>0&&self.settings.$next_tip&&self.settings.riding){if(self.settings.exposed.length>0){var $els=$(self.settings.exposed);$els.each(function(){var $this=$(this);self.un_expose($this);self.expose($this);});}if(self.is_phone()){self.pos_phone();}else {self.pos_default(false);}}},100));},start:function start(){var self=this,$this=$('['+this.attr_name()+']',this.scope),integer_settings=['timer','scrollSpeed','startOffset','tipAnimationFadeSpeed','cookieExpires'],int_settings_count=integer_settings.length;if(!$this.length>0){return;}if(!this.settings.init){this.events();}this.settings=$this.data(this.attr_name(true)+'-init'); // non configureable settings
this.settings.$content_el=$this;this.settings.$body=$(this.settings.tip_container);this.settings.body_offset=$(this.settings.tip_container).position();this.settings.$tip_content=this.settings.$content_el.find('> li');this.settings.paused=false;this.settings.attempts=0;this.settings.riding=true; // can we create cookies?
if(typeof $.cookie!=='function'){this.settings.cookie_monster=false;} // generate the tips and insert into dom.
if(!this.settings.cookie_monster||this.settings.cookie_monster&&!$.cookie(this.settings.cookie_name)){this.settings.$tip_content.each(function(index){var $this=$(this);this.settings=$.extend({},self.defaults,self.data_options($this)); // Make sure that settings parsed from data_options are integers where necessary
var i=int_settings_count;while(i--){self.settings[integer_settings[i]]=parseInt(self.settings[integer_settings[i]],10);}self.create({$li:$this,index:index});}); // show first tip
if(!this.settings.start_timer_on_click&&this.settings.timer>0){this.show('init');this.startTimer();}else {this.show('init');}}},resume:function resume(){this.set_li();this.show();},tip_template:function tip_template(opts){var $blank,content;opts.tip_class=opts.tip_class||'';$blank=$(this.settings.template.tip).addClass(opts.tip_class);content=$.trim($(opts.li).html())+this.prev_button_text(opts.prev_button_text,opts.index)+this.button_text(opts.button_text)+this.settings.template.link+this.timer_instance(opts.index);$blank.append($(this.settings.template.wrapper));$blank.first().attr(this.add_namespace('data-index'),opts.index);$('.joyride-content-wrapper',$blank).append(content);return $blank[0];},timer_instance:function timer_instance(index){var txt;if(index===0&&this.settings.start_timer_on_click&&this.settings.timer>0||this.settings.timer===0){txt='';}else {txt=$(this.settings.template.timer)[0].outerHTML;}return txt;},button_text:function button_text(txt){if(this.settings.tip_settings.next_button){txt=$.trim(txt)||'Next';txt=$(this.settings.template.button).append(txt)[0].outerHTML;}else {txt='';}return txt;},prev_button_text:function prev_button_text(txt,idx){if(this.settings.tip_settings.prev_button){txt=$.trim(txt)||'Previous'; // Add the disabled class to the button if it's the first element
if(idx==0){txt=$(this.settings.template.prev_button).append(txt).addClass('disabled')[0].outerHTML;}else {txt=$(this.settings.template.prev_button).append(txt)[0].outerHTML;}}else {txt='';}return txt;},create:function create(opts){this.settings.tip_settings=$.extend({},this.settings,this.data_options(opts.$li));var buttonText=opts.$li.attr(this.add_namespace('data-button'))||opts.$li.attr(this.add_namespace('data-text')),prevButtonText=opts.$li.attr(this.add_namespace('data-button-prev'))||opts.$li.attr(this.add_namespace('data-prev-text')),tipClass=opts.$li.attr('class'),$tip_content=$(this.tip_template({tip_class:tipClass,index:opts.index,button_text:buttonText,prev_button_text:prevButtonText,li:opts.$li}));$(this.settings.tip_container).append($tip_content);},show:function show(init,is_prev){var $timer=null; // are we paused?
if(this.settings.$li===undefined||$.inArray(this.settings.$li.index(),this.settings.pause_after)===-1){ // don't go to the next li if the tour was paused
if(this.settings.paused){this.settings.paused=false;}else {this.set_li(init,is_prev);}this.settings.attempts=0;if(this.settings.$li.length&&this.settings.$target.length>0){if(init){ //run when we first start
this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip);if(this.settings.modal){this.show_modal();}}this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip);if(this.settings.modal&&this.settings.expose){this.expose();}this.settings.tip_settings=$.extend({},this.settings,this.data_options(this.settings.$li));this.settings.timer=parseInt(this.settings.timer,10);this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location]; // scroll and hide bg if not modal and not expose
if(!/body/i.test(this.settings.$target.selector)&&!this.settings.expose){var joyridemodalbg=$('.joyride-modal-bg');if(/pop/i.test(this.settings.tipAnimation)){joyridemodalbg.hide();}else {joyridemodalbg.fadeOut(this.settings.tipAnimationFadeSpeed);}this.scroll_to();}if(this.is_phone()){this.pos_phone(true);}else {this.pos_default(true);}$timer=this.settings.$next_tip.find('.joyride-timer-indicator');if(/pop/i.test(this.settings.tip_animation)){$timer.width(0);if(this.settings.timer>0){this.settings.$next_tip.show();setTimeout(function(){$timer.animate({width:$timer.parent().width()},this.settings.timer,'linear');}.bind(this),this.settings.tip_animation_fade_speed);}else {this.settings.$next_tip.show();}}else if(/fade/i.test(this.settings.tip_animation)){$timer.width(0);if(this.settings.timer>0){this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show();setTimeout(function(){$timer.animate({width:$timer.parent().width()},this.settings.timer,'linear');}.bind(this),this.settings.tip_animation_fade_speed);}else {this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);}}this.settings.$current_tip=this.settings.$next_tip; // skip non-existant targets
}else if(this.settings.$li&&this.settings.$target.length<1){this.show(init,is_prev);}else {this.end();}}else {this.settings.paused=true;}},is_phone:function is_phone(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches;},hide:function hide(){if(this.settings.modal&&this.settings.expose){this.un_expose();}if(!this.settings.modal){$('.joyride-modal-bg').hide();} // Prevent scroll bouncing...wait to remove from layout
this.settings.$current_tip.css('visibility','hidden');setTimeout($.proxy(function(){this.hide();this.css('visibility','visible');},this.settings.$current_tip),0);this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip);},set_li:function set_li(init,is_prev){if(init){this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset);this.set_next_tip();this.settings.$current_tip=this.settings.$next_tip;}else {if(is_prev){this.settings.$li=this.settings.$li.prev();}else {this.settings.$li=this.settings.$li.next();}this.set_next_tip();}this.set_target();},set_next_tip:function set_next_tip(){this.settings.$next_tip=$('.joyride-tip-guide').eq(this.settings.$li.index());this.settings.$next_tip.data('closed','');},set_target:function set_target(){var cl=this.settings.$li.attr(this.add_namespace('data-class')),id=this.settings.$li.attr(this.add_namespace('data-id')),$sel=function $sel(){if(id){return $(document.getElementById(id));}else if(cl){return $('.'+cl).first();}else {return $('body');}};this.settings.$target=$sel();},scroll_to:function scroll_to(){var window_half,tipOffset;window_half=$(window).height()/2;tipOffset=Math.ceil(this.settings.$target.offset().top-window_half+this.settings.$next_tip.outerHeight());if(tipOffset!=0){$('html, body').stop().animate({scrollTop:tipOffset},this.settings.scroll_speed,'swing');}},paused:function paused(){return $.inArray(this.settings.$li.index()+1,this.settings.pause_after)===-1;},restart:function restart(){this.hide();this.settings.$li=undefined;this.show('init');},pos_default:function pos_default(init){var $nub=this.settings.$next_tip.find('.joyride-nub'),nub_width=Math.ceil($nub.outerWidth()/2),nub_height=Math.ceil($nub.outerHeight()/2),toggle=init||false; // tip must not be "display: none" to calculate position
if(toggle){this.settings.$next_tip.css('visibility','hidden');this.settings.$next_tip.show();}if(!/body/i.test(this.settings.$target.selector)){var topAdjustment=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,leftAdjustment=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;if(this.bottom()){if(this.rtl){this.settings.$next_tip.css({top:this.settings.$target.offset().top+nub_height+this.settings.$target.outerHeight()+topAdjustment,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+leftAdjustment});}else {this.settings.$next_tip.css({top:this.settings.$target.offset().top+nub_height+this.settings.$target.outerHeight()+topAdjustment,left:this.settings.$target.offset().left+leftAdjustment});}this.nub_position($nub,this.settings.tip_settings.nub_position,'top');}else if(this.top()){if(this.rtl){this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-nub_height+topAdjustment,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()});}else {this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-nub_height+topAdjustment,left:this.settings.$target.offset().left+leftAdjustment});}this.nub_position($nub,this.settings.tip_settings.nub_position,'bottom');}else if(this.right()){this.settings.$next_tip.css({top:this.settings.$target.offset().top+topAdjustment,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+nub_width+leftAdjustment});this.nub_position($nub,this.settings.tip_settings.nub_position,'left');}else if(this.left()){this.settings.$next_tip.css({top:this.settings.$target.offset().top+topAdjustment,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-nub_width+leftAdjustment});this.nub_position($nub,this.settings.tip_settings.nub_position,'right');}if(!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length){$nub.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts];this.settings.attempts++;this.pos_default();}}else if(this.settings.$li.length){this.pos_modal($nub);}if(toggle){this.settings.$next_tip.hide();this.settings.$next_tip.css('visibility','visible');}},pos_phone:function pos_phone(init){var tip_height=this.settings.$next_tip.outerHeight(),tip_offset=this.settings.$next_tip.offset(),target_height=this.settings.$target.outerHeight(),$nub=$('.joyride-nub',this.settings.$next_tip),nub_height=Math.ceil($nub.outerHeight()/2),toggle=init||false;$nub.removeClass('bottom').removeClass('top').removeClass('right').removeClass('left');if(toggle){this.settings.$next_tip.css('visibility','hidden');this.settings.$next_tip.show();}if(!/body/i.test(this.settings.$target.selector)){if(this.top()){this.settings.$next_tip.offset({top:this.settings.$target.offset().top-tip_height-nub_height});$nub.addClass('bottom');}else {this.settings.$next_tip.offset({top:this.settings.$target.offset().top+target_height+nub_height});$nub.addClass('top');}}else if(this.settings.$li.length){this.pos_modal($nub);}if(toggle){this.settings.$next_tip.hide();this.settings.$next_tip.css('visibility','visible');}},pos_modal:function pos_modal($nub){this.center();$nub.hide();this.show_modal();},show_modal:function show_modal(){if(!this.settings.$next_tip.data('closed')){var joyridemodalbg=$('.joyride-modal-bg');if(joyridemodalbg.length<1){var joyridemodalbg=$(this.settings.template.modal);joyridemodalbg.appendTo('body');}if(/pop/i.test(this.settings.tip_animation)){joyridemodalbg.show();}else {joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);}}},expose:function expose(){var expose,exposeCover,el,origCSS,origClasses,randId='expose-'+this.random_str(6);if(arguments.length>0&&arguments[0] instanceof $){el=arguments[0];}else if(this.settings.$target&&!/body/i.test(this.settings.$target.selector)){el=this.settings.$target;}else {return false;}if(el.length<1){if(window.console){console.error('element not valid',el);}return false;}expose=$(this.settings.template.expose);this.settings.$body.append(expose);expose.css({top:el.offset().top,left:el.offset().left,width:el.outerWidth(true),height:el.outerHeight(true)});exposeCover=$(this.settings.template.expose_cover);origCSS={zIndex:el.css('z-index'),position:el.css('position')};origClasses=el.attr('class')==null?'':el.attr('class');el.css('z-index',parseInt(expose.css('z-index'))+1);if(origCSS.position=='static'){el.css('position','relative');}el.data('expose-css',origCSS);el.data('orig-class',origClasses);el.attr('class',origClasses+' '+this.settings.expose_add_class);exposeCover.css({top:el.offset().top,left:el.offset().left,width:el.outerWidth(true),height:el.outerHeight(true)});if(this.settings.modal){this.show_modal();}this.settings.$body.append(exposeCover);expose.addClass(randId);exposeCover.addClass(randId);el.data('expose',randId);this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,el);this.add_exposed(el);},un_expose:function un_expose(){var exposeId,el,expose,origCSS,origClasses,clearAll=false;if(arguments.length>0&&arguments[0] instanceof $){el=arguments[0];}else if(this.settings.$target&&!/body/i.test(this.settings.$target.selector)){el=this.settings.$target;}else {return false;}if(el.length<1){if(window.console){console.error('element not valid',el);}return false;}exposeId=el.data('expose');expose=$('.'+exposeId);if(arguments.length>1){clearAll=arguments[1];}if(clearAll===true){$('.joyride-expose-wrapper,.joyride-expose-cover').remove();}else {expose.remove();}origCSS=el.data('expose-css');if(origCSS.zIndex=='auto'){el.css('z-index','');}else {el.css('z-index',origCSS.zIndex);}if(origCSS.position!=el.css('position')){if(origCSS.position=='static'){ // this is default, no need to set it.
el.css('position','');}else {el.css('position',origCSS.position);}}origClasses=el.data('orig-class');el.attr('class',origClasses);el.removeData('orig-classes');el.removeData('expose');el.removeData('expose-z-index');this.remove_exposed(el);},add_exposed:function add_exposed(el){this.settings.exposed=this.settings.exposed||[];if(el instanceof $||(typeof el==='undefined'?'undefined':_typeof(el))==='object'){this.settings.exposed.push(el[0]);}else if(typeof el=='string'){this.settings.exposed.push(el);}},remove_exposed:function remove_exposed(el){var search,i;if(el instanceof $){search=el[0];}else if(typeof el=='string'){search=el;}this.settings.exposed=this.settings.exposed||[];i=this.settings.exposed.length;while(i--){if(this.settings.exposed[i]==search){this.settings.exposed.splice(i,1);return;}}},center:function center(){var $w=$(window);this.settings.$next_tip.css({top:($w.height()-this.settings.$next_tip.outerHeight())/2+$w.scrollTop(),left:($w.width()-this.settings.$next_tip.outerWidth())/2+$w.scrollLeft()});return true;},bottom:function bottom(){return (/bottom/i.test(this.settings.tip_settings.tip_location));},top:function top(){return (/top/i.test(this.settings.tip_settings.tip_location));},right:function right(){return (/right/i.test(this.settings.tip_settings.tip_location));},left:function left(){return (/left/i.test(this.settings.tip_settings.tip_location));},corners:function corners(el){if(el.length===0){return [false,false,false,false];}var w=$(window),window_half=w.height()/2, //using this to calculate since scroll may not have finished yet.
tipOffset=Math.ceil(this.settings.$target.offset().top-window_half+this.settings.$next_tip.outerHeight()),right=w.width()+w.scrollLeft(),offsetBottom=w.height()+tipOffset,bottom=w.height()+w.scrollTop(),top=w.scrollTop();if(tipOffset<top){if(tipOffset<0){top=0;}else {top=tipOffset;}}if(offsetBottom>bottom){bottom=offsetBottom;}return [el.offset().top<top,right<el.offset().left+el.outerWidth(),bottom<el.offset().top+el.outerHeight(),w.scrollLeft()>el.offset().left];},visible:function visible(hidden_corners){var i=hidden_corners.length;while(i--){if(hidden_corners[i]){return false;}}return true;},nub_position:function nub_position(nub,pos,def){if(pos==='auto'){nub.addClass(def);}else {nub.addClass(pos);}},startTimer:function startTimer(){if(this.settings.$li.length){this.settings.automate=setTimeout(function(){this.hide();this.show();this.startTimer();}.bind(this),this.settings.timer);}else {clearTimeout(this.settings.automate);}},end:function end(abort){if(this.settings.cookie_monster){$.cookie(this.settings.cookie_name,'ridden',{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain});}if(this.settings.timer>0){clearTimeout(this.settings.automate);}if(this.settings.modal&&this.settings.expose){this.un_expose();} // Unplug keystrokes listener
$(this.scope).off('keyup.joyride');this.settings.$next_tip.data('closed',true);this.settings.riding=false;$('.joyride-modal-bg').hide();this.settings.$current_tip.hide();if(typeof abort==='undefined'||abort===false){this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip);this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip);}$('.joyride-tip-guide').remove();},off:function off(){$(this.scope).off('.joyride');$(window).off('.joyride');$('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');$('.joyride-tip-guide, .joyride-modal-bg').remove();clearTimeout(this.settings.automate);},reflow:function reflow(){}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs['magellan-expedition']={name:'magellan-expedition',version:'5.5.3',settings:{active_class:'active',threshold:0, // pixels from the top of the expedition for it to become fixes
destination_threshold:20, // pixels from the top of destination for it to be considered active
throttle_delay:30, // calculation throttling to increase framerate
fixed_top:0, // top distance in pixels assigend to the fixed element on scroll
offset_by_height:true, // whether to offset the destination by the expedition height. Usually you want this to be true, unless your expedition is on the side.
duration:700, // animation duration time
easing:'swing' // animation easing
},init:function init(scope,method,options){Foundation.inherit(this,'throttle');this.bindings(method,options);},events:function events(){var self=this,S=self.S,settings=self.settings; // initialize expedition offset
self.set_expedition_position();S(self.scope).off('.magellan').on('click.fndtn.magellan','['+self.add_namespace('data-magellan-arrival')+'] a[href*=#]',function(e){var sameHost=this.hostname===location.hostname||!this.hostname,samePath=self.filterPathname(location.pathname)===self.filterPathname(this.pathname),testHash=this.hash.replace(/(:|\.|\/)/g,'\\$1'),anchor=this;if(sameHost&&samePath&&testHash){e.preventDefault();var expedition=$(this).closest('['+self.attr_name()+']'),settings=expedition.data('magellan-expedition-init'),hash=this.hash.split('#').join(''),target=$('a[name="'+hash+'"]');if(target.length===0){target=$('#'+hash);} // Account for expedition height if fixed position
var scroll_top=target.offset().top-settings.destination_threshold+1;if(settings.offset_by_height){scroll_top=scroll_top-expedition.outerHeight();}$('html, body').stop().animate({'scrollTop':scroll_top},settings.duration,settings.easing,function(){if(history.pushState){history.pushState(null,null,anchor.pathname+anchor.search+'#'+hash);}else {location.hash=anchor.pathname+anchor.search+'#'+hash;}});}}).on('scroll.fndtn.magellan',self.throttle(this.check_for_arrivals.bind(this),settings.throttle_delay));},check_for_arrivals:function check_for_arrivals(){var self=this;self.update_arrivals();self.update_expedition_positions();},set_expedition_position:function set_expedition_position(){var self=this;$('['+this.attr_name()+'=fixed]',self.scope).each(function(idx,el){var expedition=$(this),settings=expedition.data('magellan-expedition-init'),styles=expedition.attr('styles'), // save styles
top_offset,fixed_top;expedition.attr('style','');top_offset=expedition.offset().top+settings.threshold; //set fixed-top by attribute
fixed_top=parseInt(expedition.data('magellan-fixed-top'));if(!isNaN(fixed_top)){self.settings.fixed_top=fixed_top;}expedition.data(self.data_attr('magellan-top-offset'),top_offset);expedition.attr('style',styles);});},update_expedition_positions:function update_expedition_positions(){var self=this,window_top_offset=$(window).scrollTop();$('['+this.attr_name()+'=fixed]',self.scope).each(function(){var expedition=$(this),settings=expedition.data('magellan-expedition-init'),styles=expedition.attr('style'), // save styles
top_offset=expedition.data('magellan-top-offset'); //scroll to the top distance
if(window_top_offset+self.settings.fixed_top>=top_offset){ // Placeholder allows height calculations to be consistent even when
// appearing to switch between fixed/non-fixed placement
var placeholder=expedition.prev('['+self.add_namespace('data-magellan-expedition-clone')+']');if(placeholder.length===0){placeholder=expedition.clone();placeholder.removeAttr(self.attr_name());placeholder.attr(self.add_namespace('data-magellan-expedition-clone'),'');expedition.before(placeholder);}expedition.css({position:'fixed',top:settings.fixed_top}).addClass('fixed');}else {expedition.prev('['+self.add_namespace('data-magellan-expedition-clone')+']').remove();expedition.attr('style',styles).css('position','').css('top','').removeClass('fixed');}});},update_arrivals:function update_arrivals(){var self=this,window_top_offset=$(window).scrollTop();$('['+this.attr_name()+']',self.scope).each(function(){var expedition=$(this),settings=expedition.data(self.attr_name(true)+'-init'),offsets=self.offsets(expedition,window_top_offset),arrivals=expedition.find('['+self.add_namespace('data-magellan-arrival')+']'),active_item=false;offsets.each(function(idx,item){if(item.viewport_offset>=item.top_offset){var arrivals=expedition.find('['+self.add_namespace('data-magellan-arrival')+']');arrivals.not(item.arrival).removeClass(settings.active_class);item.arrival.addClass(settings.active_class);active_item=true;return true;}});if(!active_item){arrivals.removeClass(settings.active_class);}});},offsets:function offsets(expedition,window_offset){var self=this,settings=expedition.data(self.attr_name(true)+'-init'),viewport_offset=window_offset;return expedition.find('['+self.add_namespace('data-magellan-arrival')+']').map(function(idx,el){var name=$(this).data(self.data_attr('magellan-arrival')),dest=$('['+self.add_namespace('data-magellan-destination')+'='+name+']');if(dest.length>0){var top_offset=dest.offset().top-settings.destination_threshold;if(settings.offset_by_height){top_offset=top_offset-expedition.outerHeight();}top_offset=Math.floor(top_offset);return {destination:dest,arrival:$(this),top_offset:top_offset,viewport_offset:viewport_offset};}}).sort(function(a,b){if(a.top_offset<b.top_offset){return -1;}if(a.top_offset>b.top_offset){return 1;}return 0;});},data_attr:function data_attr(str){if(this.namespace.length>0){return this.namespace+'-'+str;}return str;},off:function off(){this.S(this.scope).off('.magellan');this.S(window).off('.magellan');},filterPathname:function filterPathname(pathname){pathname=pathname||'';return pathname.replace(/^\//,'').replace(/(?:index|default).[a-zA-Z]{3,4}$/,'').replace(/\/$/,'');},reflow:function reflow(){var self=this; // remove placeholder expeditions used for height calculation purposes
$('['+self.add_namespace('data-magellan-expedition-clone')+']',self.scope).remove();}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.offcanvas={name:'offcanvas',version:'5.5.3',settings:{open_method:'move',close_on_click:false},init:function init(scope,method,options){this.bindings(method,options);},events:function events(){var self=this,S=self.S,move_class='',right_postfix='',left_postfix='',top_postfix='',bottom_postfix='';if(this.settings.open_method==='move'){move_class='move-';right_postfix='right';left_postfix='left';top_postfix='top';bottom_postfix='bottom';}else if(this.settings.open_method==='overlap_single'){move_class='offcanvas-overlap-';right_postfix='right';left_postfix='left';top_postfix='top';bottom_postfix='bottom';}else if(this.settings.open_method==='overlap'){move_class='offcanvas-overlap';}S(this.scope).off('.offcanvas').on('click.fndtn.offcanvas','.left-off-canvas-toggle',function(e){self.click_toggle_class(e,move_class+right_postfix);if(self.settings.open_method!=='overlap'){S('.left-submenu').removeClass(move_class+right_postfix);}$('.left-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.left-off-canvas-menu a',function(e){var settings=self.get_settings(e);var parent=S(this).parent();if(settings.close_on_click&&!parent.hasClass('has-submenu')&&!parent.hasClass('back')){self.hide.call(self,move_class+right_postfix,self.get_wrapper(e));parent.parent().removeClass(move_class+right_postfix);}else if(S(this).parent().hasClass('has-submenu')){e.preventDefault();S(this).siblings('.left-submenu').toggleClass(move_class+right_postfix);}else if(parent.hasClass('back')){e.preventDefault();parent.parent().removeClass(move_class+right_postfix);}$('.left-off-canvas-toggle').attr('aria-expanded','true');}) //end of left canvas
.on('click.fndtn.offcanvas','.right-off-canvas-toggle',function(e){self.click_toggle_class(e,move_class+left_postfix);if(self.settings.open_method!=='overlap'){S('.right-submenu').removeClass(move_class+left_postfix);}$('.right-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.right-off-canvas-menu a',function(e){var settings=self.get_settings(e);var parent=S(this).parent();if(settings.close_on_click&&!parent.hasClass('has-submenu')&&!parent.hasClass('back')){self.hide.call(self,move_class+left_postfix,self.get_wrapper(e));parent.parent().removeClass(move_class+left_postfix);}else if(S(this).parent().hasClass('has-submenu')){e.preventDefault();S(this).siblings('.right-submenu').toggleClass(move_class+left_postfix);}else if(parent.hasClass('back')){e.preventDefault();parent.parent().removeClass(move_class+left_postfix);}$('.right-off-canvas-toggle').attr('aria-expanded','true');}) //end of right canvas
.on('click.fndtn.offcanvas','.top-off-canvas-toggle',function(e){self.click_toggle_class(e,move_class+bottom_postfix);if(self.settings.open_method!=='overlap'){S('.top-submenu').removeClass(move_class+bottom_postfix);}$('.top-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.top-off-canvas-menu a',function(e){var settings=self.get_settings(e);var parent=S(this).parent();if(settings.close_on_click&&!parent.hasClass('has-submenu')&&!parent.hasClass('back')){self.hide.call(self,move_class+bottom_postfix,self.get_wrapper(e));parent.parent().removeClass(move_class+bottom_postfix);}else if(S(this).parent().hasClass('has-submenu')){e.preventDefault();S(this).siblings('.top-submenu').toggleClass(move_class+bottom_postfix);}else if(parent.hasClass('back')){e.preventDefault();parent.parent().removeClass(move_class+bottom_postfix);}$('.top-off-canvas-toggle').attr('aria-expanded','true');}) //end of top canvas
.on('click.fndtn.offcanvas','.bottom-off-canvas-toggle',function(e){self.click_toggle_class(e,move_class+top_postfix);if(self.settings.open_method!=='overlap'){S('.bottom-submenu').removeClass(move_class+top_postfix);}$('.bottom-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.bottom-off-canvas-menu a',function(e){var settings=self.get_settings(e);var parent=S(this).parent();if(settings.close_on_click&&!parent.hasClass('has-submenu')&&!parent.hasClass('back')){self.hide.call(self,move_class+top_postfix,self.get_wrapper(e));parent.parent().removeClass(move_class+top_postfix);}else if(S(this).parent().hasClass('has-submenu')){e.preventDefault();S(this).siblings('.bottom-submenu').toggleClass(move_class+top_postfix);}else if(parent.hasClass('back')){e.preventDefault();parent.parent().removeClass(move_class+top_postfix);}$('.bottom-off-canvas-toggle').attr('aria-expanded','true');}) //end of bottom
.on('click.fndtn.offcanvas','.exit-off-canvas',function(e){self.click_remove_class(e,move_class+left_postfix);S('.right-submenu').removeClass(move_class+left_postfix);if(right_postfix){self.click_remove_class(e,move_class+right_postfix);S('.left-submenu').removeClass(move_class+left_postfix);}$('.right-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.exit-off-canvas',function(e){self.click_remove_class(e,move_class+left_postfix);$('.left-off-canvas-toggle').attr('aria-expanded','false');if(right_postfix){self.click_remove_class(e,move_class+right_postfix);$('.right-off-canvas-toggle').attr('aria-expanded','false');}}).on('click.fndtn.offcanvas','.exit-off-canvas',function(e){self.click_remove_class(e,move_class+top_postfix);S('.bottom-submenu').removeClass(move_class+top_postfix);if(bottom_postfix){self.click_remove_class(e,move_class+bottom_postfix);S('.top-submenu').removeClass(move_class+top_postfix);}$('.bottom-off-canvas-toggle').attr('aria-expanded','true');}).on('click.fndtn.offcanvas','.exit-off-canvas',function(e){self.click_remove_class(e,move_class+top_postfix);$('.top-off-canvas-toggle').attr('aria-expanded','false');if(bottom_postfix){self.click_remove_class(e,move_class+bottom_postfix);$('.bottom-off-canvas-toggle').attr('aria-expanded','false');}});},toggle:function toggle(class_name,$off_canvas){$off_canvas=$off_canvas||this.get_wrapper();if($off_canvas.is('.'+class_name)){this.hide(class_name,$off_canvas);}else {this.show(class_name,$off_canvas);}},show:function show(class_name,$off_canvas){$off_canvas=$off_canvas||this.get_wrapper();$off_canvas.trigger('open.fndtn.offcanvas');$off_canvas.addClass(class_name);},hide:function hide(class_name,$off_canvas){$off_canvas=$off_canvas||this.get_wrapper();$off_canvas.trigger('close.fndtn.offcanvas');$off_canvas.removeClass(class_name);},click_toggle_class:function click_toggle_class(e,class_name){e.preventDefault();var $off_canvas=this.get_wrapper(e);this.toggle(class_name,$off_canvas);},click_remove_class:function click_remove_class(e,class_name){e.preventDefault();var $off_canvas=this.get_wrapper(e);this.hide(class_name,$off_canvas);},get_settings:function get_settings(e){var offcanvas=this.S(e.target).closest('['+this.attr_name()+']');return offcanvas.data(this.attr_name(true)+'-init')||this.settings;},get_wrapper:function get_wrapper(e){var $off_canvas=this.S(e?e.target:this.scope).closest('.off-canvas-wrap');if($off_canvas.length===0){$off_canvas=this.S('.off-canvas-wrap');}return $off_canvas;},reflow:function reflow(){}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';var noop=function noop(){};var Orbit=function Orbit(el,settings){ // Don't reinitialize plugin
if(el.hasClass(settings.slides_container_class)){return this;}var self=this,container,slides_container=el,number_container,bullets_container,timer_container,idx=0,animate,timer,locked=false,adjust_height_after=false;self.slides=function(){return slides_container.children(settings.slide_selector);};self.slides().first().addClass(settings.active_slide_class);self.update_slide_number=function(index){if(settings.slide_number){number_container.find('span:first').text(parseInt(index)+1);number_container.find('span:last').text(self.slides().length);}if(settings.bullets){bullets_container.children().removeClass(settings.bullets_active_class);$(bullets_container.children().get(index)).addClass(settings.bullets_active_class);}};self.update_active_link=function(index){var link=$('[data-orbit-link="'+self.slides().eq(index).attr('data-orbit-slide')+'"]');link.siblings().removeClass(settings.bullets_active_class);link.addClass(settings.bullets_active_class);};self.build_markup=function(){slides_container.wrap('<div class="'+settings.container_class+'"></div>');container=slides_container.parent();slides_container.addClass(settings.slides_container_class);if(settings.stack_on_small){container.addClass(settings.stack_on_small_class);}if(settings.navigation_arrows){container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));}if(settings.timer){timer_container=$('<div>').addClass(settings.timer_container_class);timer_container.append('<span>');timer_container.append($('<div>').addClass(settings.timer_progress_class));timer_container.addClass(settings.timer_paused_class);container.append(timer_container);}if(settings.slide_number){number_container=$('<div>').addClass(settings.slide_number_class);number_container.append('<span></span> '+settings.slide_number_text+' <span></span>');container.append(number_container);}if(settings.bullets){bullets_container=$('<ol>').addClass(settings.bullets_container_class);container.append(bullets_container);bullets_container.wrap('<div class="orbit-bullets-container"></div>');self.slides().each(function(idx,el){var bullet=$('<li>').attr('data-orbit-slide',idx).on('click',self.link_bullet);;bullets_container.append(bullet);});}};self._goto=function(next_idx,start_timer){ // if (locked) {return false;}
if(next_idx===idx){return false;}if((typeof timer==='undefined'?'undefined':_typeof(timer))==='object'){timer.restart();}var slides=self.slides();var dir='next';locked=true;if(next_idx<idx){dir='prev';}if(next_idx>=slides.length){if(!settings.circular){return false;}next_idx=0;}else if(next_idx<0){if(!settings.circular){return false;}next_idx=slides.length-1;}var current=$(slides.get(idx));var next=$(slides.get(next_idx));current.css('zIndex',2);current.removeClass(settings.active_slide_class);next.css('zIndex',4).addClass(settings.active_slide_class);slides_container.trigger('before-slide-change.fndtn.orbit');settings.before_slide_change();self.update_active_link(next_idx);var callback=function callback(){var unlock=function unlock(){idx=next_idx;locked=false;if(start_timer===true){timer=self.create_timer();timer.start();}self.update_slide_number(idx);slides_container.trigger('after-slide-change.fndtn.orbit',[{slide_number:idx,total_slides:slides.length}]);settings.after_slide_change(idx,slides.length);};if(slides_container.outerHeight()!=next.outerHeight()&&settings.variable_height){slides_container.animate({'height':next.outerHeight()},250,'linear',unlock);}else {unlock();}};if(slides.length===1){callback();return false;}var start_animation=function start_animation(){if(dir==='next'){animate.next(current,next,callback);}if(dir==='prev'){animate.prev(current,next,callback);}};if(next.outerHeight()>slides_container.outerHeight()&&settings.variable_height){slides_container.animate({'height':next.outerHeight()},250,'linear',start_animation);}else {start_animation();}};self.next=function(e){e.stopImmediatePropagation();e.preventDefault();self._goto(idx+1);};self.prev=function(e){e.stopImmediatePropagation();e.preventDefault();self._goto(idx-1);};self.link_custom=function(e){e.preventDefault();var link=$(this).attr('data-orbit-link');if(typeof link==='string'&&(link=$.trim(link))!=''){var slide=container.find('[data-orbit-slide='+link+']');if(slide.index()!=-1){self._goto(slide.index());}}};self.link_bullet=function(e){var index=$(this).attr('data-orbit-slide');if(typeof index==='string'&&(index=$.trim(index))!=''){if(isNaN(parseInt(index))){var slide=container.find('[data-orbit-slide='+index+']');if(slide.index()!=-1){self._goto(slide.index()+1);}}else {self._goto(parseInt(index));}}};self.timer_callback=function(){self._goto(idx+1,true);};self.compute_dimensions=function(){var current=$(self.slides().get(idx));var h=current.outerHeight();if(!settings.variable_height){self.slides().each(function(){if($(this).outerHeight()>h){h=$(this).outerHeight();}});}slides_container.height(h);};self.create_timer=function(){var t=new Timer(container.find('.'+settings.timer_container_class),settings,self.timer_callback);return t;};self.stop_timer=function(){if((typeof timer==='undefined'?'undefined':_typeof(timer))==='object'){timer.stop();}};self.toggle_timer=function(){var t=container.find('.'+settings.timer_container_class);if(t.hasClass(settings.timer_paused_class)){if(typeof timer==='undefined'){timer=self.create_timer();}timer.start();}else {if((typeof timer==='undefined'?'undefined':_typeof(timer))==='object'){timer.stop();}}};self.init=function(){self.build_markup();if(settings.timer){timer=self.create_timer();Foundation.utils.image_loaded(this.slides().children('img'),timer.start);}animate=new FadeAnimation(settings,slides_container);if(settings.animation==='slide'){animate=new SlideAnimation(settings,slides_container);}container.on('click','.'+settings.next_class,self.next);container.on('click','.'+settings.prev_class,self.prev);if(settings.next_on_click){container.on('click','.'+settings.slides_container_class+' [data-orbit-slide]',self.link_bullet);}container.on('click',self.toggle_timer);if(settings.swipe){container.on('touchstart.fndtn.orbit',function(e){if(!e.touches){e=e.originalEvent;}var data={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:new Date().getTime(),delta_x:0,is_scrolling:undefined};container.data('swipe-transition',data);e.stopPropagation();}).on('touchmove.fndtn.orbit',function(e){if(!e.touches){e=e.originalEvent;} // Ignore pinch/zoom events
if(e.touches.length>1||e.scale&&e.scale!==1){return;}var data=container.data('swipe-transition');if(typeof data==='undefined'){data={};}data.delta_x=e.touches[0].pageX-data.start_page_x;if(typeof data.is_scrolling==='undefined'){data.is_scrolling=!!(data.is_scrolling||Math.abs(data.delta_x)<Math.abs(e.touches[0].pageY-data.start_page_y));}if(!data.is_scrolling&&!data.active){e.preventDefault();var direction=data.delta_x<0?idx+1:idx-1;data.active=true;self._goto(direction);}}).on('touchend.fndtn.orbit',function(e){container.data('swipe-transition',{});e.stopPropagation();});}container.on('mouseenter.fndtn.orbit',function(e){if(settings.timer&&settings.pause_on_hover){self.stop_timer();}}).on('mouseleave.fndtn.orbit',function(e){if(settings.timer&&settings.resume_on_mouseout){timer.start();}});$(document).on('click','[data-orbit-link]',self.link_custom);$(window).on('load resize',self.compute_dimensions);Foundation.utils.image_loaded(this.slides().children('img'),self.compute_dimensions);Foundation.utils.image_loaded(this.slides().children('img'),function(){container.prev('.'+settings.preloader_class).css('display','none');self.update_slide_number(0);self.update_active_link(0);slides_container.trigger('ready.fndtn.orbit');});};self.init();};var Timer=function Timer(el,settings,callback){var self=this,duration=settings.timer_speed,progress=el.find('.'+settings.timer_progress_class),start,timeout,left=-1;this.update_progress=function(w){var new_progress=progress.clone();new_progress.attr('style','');new_progress.css('width',w+'%');progress.replaceWith(new_progress);progress=new_progress;};this.restart=function(){clearTimeout(timeout);el.addClass(settings.timer_paused_class);left=-1;self.update_progress(0);};this.start=function(){if(!el.hasClass(settings.timer_paused_class)){return true;}left=left===-1?duration:left;el.removeClass(settings.timer_paused_class);start=new Date().getTime();progress.animate({'width':'100%'},left,'linear');timeout=setTimeout(function(){self.restart();callback();},left);el.trigger('timer-started.fndtn.orbit');};this.stop=function(){if(el.hasClass(settings.timer_paused_class)){return true;}clearTimeout(timeout);el.addClass(settings.timer_paused_class);var end=new Date().getTime();left=left-(end-start);var w=100-left/duration*100;self.update_progress(w);el.trigger('timer-stopped.fndtn.orbit');};};var SlideAnimation=function SlideAnimation(settings,container){var duration=settings.animation_speed;var is_rtl=$('html[dir=rtl]').length===1;var margin=is_rtl?'marginRight':'marginLeft';var animMargin={};animMargin[margin]='0%';this.next=function(current,next,callback){current.animate({marginLeft:'-100%'},duration);next.animate(animMargin,duration,function(){current.css(margin,'100%');callback();});};this.prev=function(current,prev,callback){current.animate({marginLeft:'100%'},duration);prev.css(margin,'-100%');prev.animate(animMargin,duration,function(){current.css(margin,'100%');callback();});};};var FadeAnimation=function FadeAnimation(settings,container){var duration=settings.animation_speed;var is_rtl=$('html[dir=rtl]').length===1;var margin=is_rtl?'marginRight':'marginLeft';this.next=function(current,next,callback){next.css({'margin':'0%','opacity':'0.01'});next.animate({'opacity':'1'},duration,'linear',function(){current.css('margin','100%');callback();});};this.prev=function(current,prev,callback){prev.css({'margin':'0%','opacity':'0.01'});prev.animate({'opacity':'1'},duration,'linear',function(){current.css('margin','100%');callback();});};};Foundation.libs=Foundation.libs||{};Foundation.libs.orbit={name:'orbit',version:'5.5.3',settings:{animation:'slide',timer_speed:10000,pause_on_hover:true,resume_on_mouseout:false,next_on_click:true,animation_speed:500,stack_on_small:false,navigation_arrows:true,slide_number:true,slide_number_text:'of',container_class:'orbit-container',stack_on_small_class:'orbit-stack-on-small',next_class:'orbit-next',prev_class:'orbit-prev',timer_container_class:'orbit-timer',timer_paused_class:'paused',timer_progress_class:'orbit-progress',slides_container_class:'orbit-slides-container',preloader_class:'preloader',slide_selector:'*',bullets_container_class:'orbit-bullets',bullets_active_class:'active',slide_number_class:'orbit-slide-number',caption_class:'orbit-caption',active_slide_class:'active',orbit_transition_class:'orbit-transitioning',bullets:true,circular:true,timer:true,variable_height:false,swipe:true,before_slide_change:noop,after_slide_change:noop},init:function init(scope,method,options){var self=this;this.bindings(method,options);},events:function events(instance){var orbit_instance=new Orbit(this.S(instance),this.S(instance).data('orbit-init'));this.S(instance).data(this.name+'-instance',orbit_instance);},reflow:function reflow(){var self=this;if(self.S(self.scope).is('[data-orbit]')){var $el=self.S(self.scope);var instance=$el.data(self.name+'-instance');instance.compute_dimensions();}else {self.S('[data-orbit]',self.scope).each(function(idx,el){var $el=self.S(el);var opts=self.data_options($el);var instance=$el.data(self.name+'-instance');instance.compute_dimensions();});}}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';var openModals=[];Foundation.libs.reveal={name:'reveal',version:'5.5.3',locked:false,settings:{animation:'fadeAndPop',animation_speed:250,close_on_background_click:true,close_on_esc:true,dismiss_modal_class:'close-reveal-modal',multiple_opened:false,bg_class:'reveal-modal-bg',root_element:'body',open:function open(){},opened:function opened(){},close:function close(){},closed:function closed(){},on_ajax_error:$.noop,bg:$('.reveal-modal-bg'),css:{open:{'opacity':0,'visibility':'visible','display':'block'},close:{'opacity':1,'visibility':'hidden','display':'none'}}},init:function init(scope,method,options){$.extend(true,this.settings,method,options);this.bindings(method,options);},events:function events(scope){var self=this,S=self.S;S(this.scope).off('.reveal').on('click.fndtn.reveal','['+this.add_namespace('data-reveal-id')+']:not([disabled])',function(e){e.preventDefault();if(!self.locked){var element=S(this),ajax=element.data(self.data_attr('reveal-ajax')),replaceContentSel=element.data(self.data_attr('reveal-replace-content'));self.locked=true;if(typeof ajax==='undefined'){self.open.call(self,element);}else {var url=ajax===true?element.attr('href'):ajax;self.open.call(self,element,{url:url},{replaceContentSel:replaceContentSel});}}});S(document).on('click.fndtn.reveal',this.close_targets(),function(e){e.preventDefault();if(!self.locked){var settings=S('['+self.attr_name()+'].open').data(self.attr_name(true)+'-init')||self.settings,bg_clicked=S(e.target)[0]===S('.'+settings.bg_class)[0];if(bg_clicked){if(settings.close_on_background_click){e.stopPropagation();}else {return;}}self.locked=true;self.close.call(self,bg_clicked?S('['+self.attr_name()+'].open:not(.toback)'):S(this).closest('['+self.attr_name()+']'));}});if(S('['+self.attr_name()+']',this.scope).length>0){S(this.scope) // .off('.reveal')
.on('open.fndtn.reveal',this.settings.open).on('opened.fndtn.reveal',this.settings.opened).on('opened.fndtn.reveal',this.open_video).on('close.fndtn.reveal',this.settings.close).on('closed.fndtn.reveal',this.settings.closed).on('closed.fndtn.reveal',this.close_video);}else {S(this.scope) // .off('.reveal')
.on('open.fndtn.reveal','['+self.attr_name()+']',this.settings.open).on('opened.fndtn.reveal','['+self.attr_name()+']',this.settings.opened).on('opened.fndtn.reveal','['+self.attr_name()+']',this.open_video).on('close.fndtn.reveal','['+self.attr_name()+']',this.settings.close).on('closed.fndtn.reveal','['+self.attr_name()+']',this.settings.closed).on('closed.fndtn.reveal','['+self.attr_name()+']',this.close_video);}return true;}, // PATCH #3: turning on key up capture only when a reveal window is open
key_up_on:function key_up_on(scope){var self=this; // PATCH #1: fixing multiple keyup event trigger from single key press
self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal',function(event){var open_modal=self.S('['+self.attr_name()+'].open'),settings=open_modal.data(self.attr_name(true)+'-init')||self.settings; // PATCH #2: making sure that the close event can be called only while unlocked,
//           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
if(settings&&event.which===27&&settings.close_on_esc&&!self.locked){ // 27 is the keycode for the Escape key
self.close.call(self,open_modal);}});return true;}, // PATCH #3: turning on key up capture only when a reveal window is open
key_up_off:function key_up_off(scope){this.S('body').off('keyup.fndtn.reveal');return true;},open:function open(target,ajax_settings){var self=this,modal;if(target){if(typeof target.selector!=='undefined'){ // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
modal=self.S('#'+target.data(self.data_attr('reveal-id'))).first();}else {modal=self.S(this.scope);ajax_settings=target;}}else {modal=self.S(this.scope);}var settings=modal.data(self.attr_name(true)+'-init');settings=settings||this.settings;if(modal.hasClass('open')&&target!==undefined&&target.attr('data-reveal-id')==modal.attr('id')){return self.close(modal);}if(!modal.hasClass('open')){var open_modal=self.S('['+self.attr_name()+'].open');if(typeof modal.data('css-top')==='undefined'){modal.data('css-top',parseInt(modal.css('top'),10)).data('offset',this.cache_offset(modal));}modal.attr('tabindex','0').attr('aria-hidden','false');this.key_up_on(modal); // PATCH #3: turning on key up capture only when a reveal window is open
// Prevent namespace event from triggering twice
modal.on('open.fndtn.reveal',function(e){if(e.namespace!=='fndtn.reveal')return;});modal.on('open.fndtn.reveal').trigger('open.fndtn.reveal');if(open_modal.length<1){this.toggle_bg(modal,true);}if(typeof ajax_settings==='string'){ajax_settings={url:ajax_settings};}var openModal=function openModal(){if(open_modal.length>0){if(settings.multiple_opened){self.to_back(open_modal);}else {self.hide(open_modal,settings.css.close);}} // bl: add the open_modal that isn't already in the background to the openModals array
if(settings.multiple_opened){openModals.push(modal);}self.show(modal,settings.css.open);};if(typeof ajax_settings==='undefined'||!ajax_settings.url){openModal();}else {var old_success=typeof ajax_settings.success!=='undefined'?ajax_settings.success:null;$.extend(ajax_settings,{success:function success(data,textStatus,jqXHR){if($.isFunction(old_success)){var result=old_success(data,textStatus,jqXHR);if(typeof result=='string'){data=result;}}if(typeof options!=='undefined'&&typeof options.replaceContentSel!=='undefined'){modal.find(options.replaceContentSel).html(data);}else {modal.html(data);}self.S(modal).foundation('section','reflow');self.S(modal).children().foundation();openModal();}}); // check for if user initalized with error callback
if(settings.on_ajax_error!==$.noop){$.extend(ajax_settings,{error:settings.on_ajax_error});}$.ajax(ajax_settings);}}self.S(window).trigger('resize');},close:function close(modal){var modal=modal&&modal.length?modal:this.S(this.scope),open_modals=this.S('['+this.attr_name()+'].open'),settings=modal.data(this.attr_name(true)+'-init')||this.settings,self=this;if(open_modals.length>0){modal.removeAttr('tabindex','0').attr('aria-hidden','true');this.locked=true;this.key_up_off(modal); // PATCH #3: turning on key up capture only when a reveal window is open
modal.trigger('close.fndtn.reveal');if(settings.multiple_opened&&open_modals.length===1||!settings.multiple_opened||modal.length>1){self.toggle_bg(modal,false);self.to_front(modal);}if(settings.multiple_opened){var isCurrent=modal.is(':not(.toback)');self.hide(modal,settings.css.close,settings);if(isCurrent){ // remove the last modal since it is now closed
openModals.pop();}else { // if this isn't the current modal, then find it in the array and remove it
openModals=$.grep(openModals,function(elt){var isThis=elt[0]===modal[0];if(isThis){ // since it's not currently in the front, put it in the front now that it is hidden
// so that if it's re-opened, it won't be .toback
self.to_front(modal);}return !isThis;});} // finally, show the next modal in the stack, if there is one
if(openModals.length>0){self.to_front(openModals[openModals.length-1]);}}else {self.hide(open_modals,settings.css.close,settings);}}},close_targets:function close_targets(){var base='.'+this.settings.dismiss_modal_class;if(this.settings.close_on_background_click){return base+', .'+this.settings.bg_class;}return base;},toggle_bg:function toggle_bg(modal,state){if(this.S('.'+this.settings.bg_class).length===0){this.settings.bg=$('<div />',{'class':this.settings.bg_class}).appendTo('body').hide();}var visible=this.settings.bg.filter(':visible').length>0;if(state!=visible){if(state==undefined?visible:!state){this.hide(this.settings.bg);}else {this.show(this.settings.bg);}}},show:function show(el,css){ // is modal
if(css){var settings=el.data(this.attr_name(true)+'-init')||this.settings,root_element=settings.root_element,context=this;if(el.parent(root_element).length===0){var placeholder=el.wrap('<div style="display: none;" />').parent();el.on('closed.fndtn.reveal.wrapped',function(){el.detach().appendTo(placeholder);el.unwrap().unbind('closed.fndtn.reveal.wrapped');});el.detach().appendTo(root_element);}var animData=getAnimationData(settings.animation);if(!animData.animate){this.locked=false;}if(animData.pop){css.top=$(window).scrollTop()-el.data('offset')+'px';var end_css={top:$(window).scrollTop()+el.data('css-top')+'px',opacity:1};return setTimeout(function(){return el.css(css).animate(end_css,settings.animation_speed,'linear',function(){context.locked=false;el.trigger('opened.fndtn.reveal');}).addClass('open');},settings.animation_speed/2);}css.top=$(window).scrollTop()+el.data('css-top')+'px';if(animData.fade){var end_css={opacity:1};return setTimeout(function(){return el.css(css).animate(end_css,settings.animation_speed,'linear',function(){context.locked=false;el.trigger('opened.fndtn.reveal');}).addClass('open');},settings.animation_speed/2);}return el.css(css).show().css({opacity:1}).addClass('open').trigger('opened.fndtn.reveal');}var settings=this.settings; // should we animate the background?
if(getAnimationData(settings.animation).fade){return el.fadeIn(settings.animation_speed/2);}this.locked=false;return el.show();},to_back:function to_back(el){el.addClass('toback');},to_front:function to_front(el){el.removeClass('toback');},hide:function hide(el,css){ // is modal
if(css){var settings=el.data(this.attr_name(true)+'-init'),context=this;settings=settings||this.settings;var animData=getAnimationData(settings.animation);if(!animData.animate){this.locked=false;}if(animData.pop){var end_css={top:-$(window).scrollTop()-el.data('offset')+'px',opacity:0};return setTimeout(function(){return el.animate(end_css,settings.animation_speed,'linear',function(){context.locked=false;el.css(css).trigger('closed.fndtn.reveal');}).removeClass('open');},settings.animation_speed/2);}if(animData.fade){var end_css={opacity:0};return setTimeout(function(){return el.animate(end_css,settings.animation_speed,'linear',function(){context.locked=false;el.css(css).trigger('closed.fndtn.reveal');}).removeClass('open');},settings.animation_speed/2);}return el.hide().css(css).removeClass('open').trigger('closed.fndtn.reveal');}var settings=this.settings; // should we animate the background?
if(getAnimationData(settings.animation).fade){return el.fadeOut(settings.animation_speed/2);}return el.hide();},close_video:function close_video(e){var video=$('.flex-video',e.target),iframe=$('iframe',video);if(iframe.length>0){iframe.attr('data-src',iframe[0].src);iframe.attr('src',iframe.attr('src'));video.hide();}},open_video:function open_video(e){var video=$('.flex-video',e.target),iframe=video.find('iframe');if(iframe.length>0){var data_src=iframe.attr('data-src');if(typeof data_src==='string'){iframe[0].src=iframe.attr('data-src');}else {var src=iframe[0].src;iframe[0].src=undefined;iframe[0].src=src;}video.show();}},data_attr:function data_attr(str){if(this.namespace.length>0){return this.namespace+'-'+str;}return str;},cache_offset:function cache_offset(modal){var offset=modal.show().height()+parseInt(modal.css('top'),10)+modal.scrollY;modal.hide();return offset;},off:function off(){$(this.scope).off('.fndtn.reveal');},reflow:function reflow(){}}; /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */function getAnimationData(str){var fade=/fade/i.test(str);var pop=/pop/i.test(str);return {animate:fade||pop,pop:pop,fade:fade};}})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.slider={name:'slider',version:'5.5.3',settings:{start:0,end:100,step:1,precision:2,initial:null,display_selector:'',vertical:false,trigger_input_change:false,on_change:function on_change(){}},cache:{},init:function init(scope,method,options){Foundation.inherit(this,'throttle');this.bindings(method,options);this.reflow();},events:function events(){var self=this;$(this.scope).off('.slider').on('mousedown.fndtn.slider touchstart.fndtn.slider pointerdown.fndtn.slider','['+self.attr_name()+']:not(.disabled, [disabled]) .range-slider-handle',function(e){if(!self.cache.active){e.preventDefault();self.set_active_slider($(e.target));}}).on('mousemove.fndtn.slider touchmove.fndtn.slider pointermove.fndtn.slider',function(e){if(!!self.cache.active){e.preventDefault();if($.data(self.cache.active[0],'settings').vertical){var scroll_offset=0;if(!e.pageY){scroll_offset=window.scrollY;}self.calculate_position(self.cache.active,self.get_cursor_position(e,'y')+scroll_offset);}else {self.calculate_position(self.cache.active,self.get_cursor_position(e,'x'));}}}).on('mouseup.fndtn.slider touchend.fndtn.slider pointerup.fndtn.slider',function(e){if(!self.cache.active){ // if the user has just clicked into the slider without starting to drag the handle
var slider=$(e.target).attr('role')==='slider'?$(e.target):$(e.target).closest('.range-slider').find("[role='slider']");if(slider.length&&!slider.parent().hasClass('disabled')&&!slider.parent().attr('disabled')){self.set_active_slider(slider);if($.data(self.cache.active[0],'settings').vertical){var scroll_offset=0;if(!e.pageY){scroll_offset=window.scrollY;}self.calculate_position(self.cache.active,self.get_cursor_position(e,'y')+scroll_offset);}else {self.calculate_position(self.cache.active,self.get_cursor_position(e,'x'));}}}self.remove_active_slider();}).on('change.fndtn.slider',function(e){self.settings.on_change();});self.S(window).on('resize.fndtn.slider',self.throttle(function(e){self.reflow();},300)); // update slider value as users change input value
this.S('['+this.attr_name()+']').each(function(){var slider=$(this),handle=slider.children('.range-slider-handle')[0],settings=self.initialize_settings(handle);if(settings.display_selector!=''){$(settings.display_selector).each(function(){if($(this).attr('value')){$(this).off('change').on('change',function(){slider.foundation("slider","set_value",$(this).val());});}});}});},get_cursor_position:function get_cursor_position(e,xy){var pageXY='page'+xy.toUpperCase(),clientXY='client'+xy.toUpperCase(),position;if(typeof e[pageXY]!=='undefined'){position=e[pageXY];}else if(typeof e.originalEvent[clientXY]!=='undefined'){position=e.originalEvent[clientXY];}else if(e.originalEvent.touches&&e.originalEvent.touches[0]&&typeof e.originalEvent.touches[0][clientXY]!=='undefined'){position=e.originalEvent.touches[0][clientXY];}else if(e.currentPoint&&typeof e.currentPoint[xy]!=='undefined'){position=e.currentPoint[xy];}return position;},set_active_slider:function set_active_slider($handle){this.cache.active=$handle;},remove_active_slider:function remove_active_slider(){this.cache.active=null;},calculate_position:function calculate_position($handle,cursor_x){var self=this,settings=$.data($handle[0],'settings'),handle_l=$.data($handle[0],'handle_l'),handle_o=$.data($handle[0],'handle_o'),bar_l=$.data($handle[0],'bar_l'),bar_o=$.data($handle[0],'bar_o');requestAnimationFrame(function(){var pct;if(Foundation.rtl&&!settings.vertical){pct=self.limit_to((bar_o+bar_l-cursor_x)/bar_l,0,1);}else {pct=self.limit_to((cursor_x-bar_o)/bar_l,0,1);}pct=settings.vertical?1-pct:pct;var norm=self.normalized_value(pct,settings.start,settings.end,settings.step,settings.precision);self.set_ui($handle,norm);});},set_ui:function set_ui($handle,value){var settings=$.data($handle[0],'settings'),handle_l=$.data($handle[0],'handle_l'),bar_l=$.data($handle[0],'bar_l'),norm_pct=this.normalized_percentage(value,settings.start,settings.end),handle_offset=norm_pct*(bar_l-handle_l)-1,progress_bar_length=norm_pct*100,$handle_parent=$handle.parent(),$hidden_inputs=$handle.parent().children('input[type=hidden]');if(Foundation.rtl&&!settings.vertical){handle_offset=-handle_offset;}handle_offset=settings.vertical?-handle_offset+bar_l-handle_l+1:handle_offset;this.set_translate($handle,handle_offset,settings.vertical);if(settings.vertical){$handle.siblings('.range-slider-active-segment').css('height',progress_bar_length+'%');}else {$handle.siblings('.range-slider-active-segment').css('width',progress_bar_length+'%');}$handle_parent.attr(this.attr_name(),value).trigger('change.fndtn.slider');$hidden_inputs.val(value);if(settings.trigger_input_change){$hidden_inputs.trigger('change.fndtn.slider');}if(!$handle[0].hasAttribute('aria-valuemin')){$handle.attr({'aria-valuemin':settings.start,'aria-valuemax':settings.end});}$handle.attr('aria-valuenow',value);if(settings.display_selector!=''){$(settings.display_selector).each(function(){if(this.hasAttribute('value')){$(this).val(value);}else {$(this).text(value);}});}},normalized_percentage:function normalized_percentage(val,start,end){return Math.min(1,(val-start)/(end-start));},normalized_value:function normalized_value(val,start,end,step,precision){var range=end-start,point=val*range,mod=(point-point%step)/step,rem=point%step,round=rem>=step*0.5?step:0;return (mod*step+round+start).toFixed(precision);},set_translate:function set_translate(ele,offset,vertical){if(vertical){$(ele).css('-webkit-transform','translateY('+offset+'px)').css('-moz-transform','translateY('+offset+'px)').css('-ms-transform','translateY('+offset+'px)').css('-o-transform','translateY('+offset+'px)').css('transform','translateY('+offset+'px)');}else {$(ele).css('-webkit-transform','translateX('+offset+'px)').css('-moz-transform','translateX('+offset+'px)').css('-ms-transform','translateX('+offset+'px)').css('-o-transform','translateX('+offset+'px)').css('transform','translateX('+offset+'px)');}},limit_to:function limit_to(val,min,max){return Math.min(Math.max(val,min),max);},initialize_settings:function initialize_settings(handle){var settings=$.extend({},this.settings,this.data_options($(handle).parent())),decimal_places_match_result;if(settings.precision===null){decimal_places_match_result=(''+settings.step).match(/\.([\d]*)/);settings.precision=decimal_places_match_result&&decimal_places_match_result[1]?decimal_places_match_result[1].length:0;}if(settings.vertical){$.data(handle,'bar_o',$(handle).parent().offset().top);$.data(handle,'bar_l',$(handle).parent().outerHeight());$.data(handle,'handle_o',$(handle).offset().top);$.data(handle,'handle_l',$(handle).outerHeight());}else {$.data(handle,'bar_o',$(handle).parent().offset().left);$.data(handle,'bar_l',$(handle).parent().outerWidth());$.data(handle,'handle_o',$(handle).offset().left);$.data(handle,'handle_l',$(handle).outerWidth());}$.data(handle,'bar',$(handle).parent());return $.data(handle,'settings',settings);},set_initial_position:function set_initial_position($ele){var settings=$.data($ele.children('.range-slider-handle')[0],'settings'),initial=typeof settings.initial=='number'&&!isNaN(settings.initial)?settings.initial:Math.floor((settings.end-settings.start)*0.5/settings.step)*settings.step+settings.start,$handle=$ele.children('.range-slider-handle');this.set_ui($handle,initial);},set_value:function set_value(value){var self=this;$('['+self.attr_name()+']',this.scope).each(function(){$(this).attr(self.attr_name(),value);});if(!!$(this.scope).attr(self.attr_name())){$(this.scope).attr(self.attr_name(),value);}self.reflow();},reflow:function reflow(){var self=this;self.S('['+this.attr_name()+']').each(function(){var handle=$(this).children('.range-slider-handle')[0],val=$(this).attr(self.attr_name());self.initialize_settings(handle);if(val){self.set_ui($(handle),parseFloat(val));}else {self.set_initial_position($(this));}});}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.tab={name:'tab',version:'5.5.3',settings:{active_class:'active',callback:function callback(){},deep_linking:false,scroll_to_content:true,is_hover:false},default_tab_hashes:[],init:function init(scope,method,options){var self=this,S=this.S; // Store the default active tabs which will be referenced when the
// location hash is absent, as in the case of navigating the tabs and
// returning to the first viewing via the browser Back button.
S('['+this.attr_name()+'] > .active > a',this.scope).each(function(){self.default_tab_hashes.push(this.hash);});this.bindings(method,options);this.handle_location_hash_change();},events:function events(){var self=this,S=this.S;var usual_tab_behavior=function usual_tab_behavior(e,target){var settings=S(target).closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init');if(!settings.is_hover||Modernizr.touch){ // if user did not pressed tab key, prevent default action
var keyCode=e.keyCode||e.which;if(keyCode!==9){e.preventDefault();e.stopPropagation();}self.toggle_active_tab(S(target).parent());}};S(this.scope).off('.tab') // Key event: focus/tab key
.on('keydown.fndtn.tab','['+this.attr_name()+'] > * > a',function(e){var keyCode=e.keyCode||e.which; // if user pressed tab key
if(keyCode===13||keyCode===32){ // enter or space
var el=this;usual_tab_behavior(e,el);}}) // Click event: tab title
.on('click.fndtn.tab','['+this.attr_name()+'] > * > a',function(e){var el=this;usual_tab_behavior(e,el);}) // Hover event: tab title
.on('mouseenter.fndtn.tab','['+this.attr_name()+'] > * > a',function(e){var settings=S(this).closest('['+self.attr_name()+']').data(self.attr_name(true)+'-init');if(settings.is_hover){self.toggle_active_tab(S(this).parent());}}); // Location hash change event
S(window).on('hashchange.fndtn.tab',function(e){e.preventDefault();self.handle_location_hash_change();});},handle_location_hash_change:function handle_location_hash_change(){var self=this,S=this.S;S('['+this.attr_name()+']',this.scope).each(function(){var settings=S(this).data(self.attr_name(true)+'-init');if(settings.deep_linking){ // Match the location hash to a label
var hash;if(settings.scroll_to_content){hash=self.scope.location.hash;}else { // prefix the hash to prevent anchor scrolling
hash=self.scope.location.hash.replace('fndtn-','');}if(hash!=''){ // Check whether the location hash references a tab content div or
// another element on the page (inside or outside the tab content div)
var hash_element=S(hash);if(hash_element.hasClass('content')&&hash_element.parent().hasClass('tabs-content')){ // Tab content div
self.toggle_active_tab($('['+self.attr_name()+'] > * > a[href='+hash+']').parent());}else { // Not the tab content div. If inside the tab content, find the
// containing tab and toggle it as active.
var hash_tab_container_id=hash_element.closest('.content').attr('id');if(hash_tab_container_id!=undefined){self.toggle_active_tab($('['+self.attr_name()+'] > * > a[href=#'+hash_tab_container_id+']').parent(),hash);}}}else { // Reference the default tab hashes which were initialized in the init function
for(var ind=0;ind<self.default_tab_hashes.length;ind++){self.toggle_active_tab($('['+self.attr_name()+'] > * > a[href='+self.default_tab_hashes[ind]+']').parent());}}}});},toggle_active_tab:function toggle_active_tab(tab,location_hash){var self=this,S=self.S,tabs=tab.closest('['+this.attr_name()+']'),tab_link=tab.find('a'),anchor=tab.children('a').first(),target_hash='#'+anchor.attr('href').split('#')[1],target=S(target_hash),siblings=tab.siblings(),settings=tabs.data(this.attr_name(true)+'-init'),interpret_keyup_action=function interpret_keyup_action(e){ // Light modification of Heydon Pickering's Practical ARIA Examples: http://heydonworks.com/practical_aria_examples/js/a11y.js
// define current, previous and next (possible) tabs
var $original=$(this);var $prev=$(this).parents('li').prev().children('[role="tab"]');var $next=$(this).parents('li').next().children('[role="tab"]');var $target; // find the direction (prev or next)
switch(e.keyCode){case 37:$target=$prev;break;case 39:$target=$next;break;default:$target=false;break;}if($target.length){$original.attr({'tabindex':'-1','aria-selected':null});$target.attr({'tabindex':'0','aria-selected':true}).focus();} // Hide panels
$('[role="tabpanel"]').attr('aria-hidden','true'); // Show panel which corresponds to target
$('#'+$(document.activeElement).attr('href').substring(1)).attr('aria-hidden',null);},go_to_hash=function go_to_hash(hash){ // This function allows correct behaviour of the browser's back button when deep linking is enabled. Without it
// the user would get continually redirected to the default hash.
var default_hash=settings.scroll_to_content?self.default_tab_hashes[0]:'fndtn-'+self.default_tab_hashes[0].replace('#','');if(hash!==default_hash||window.location.hash){window.location.hash=hash;}}; // allow usage of data-tab-content attribute instead of href
if(anchor.data('tab-content')){target_hash='#'+anchor.data('tab-content').split('#')[1];target=S(target_hash);}if(settings.deep_linking){if(settings.scroll_to_content){ // retain current hash to scroll to content
go_to_hash(location_hash||target_hash);if(location_hash==undefined||location_hash==target_hash){tab.parent()[0].scrollIntoView();}else {S(target_hash)[0].scrollIntoView();}}else { // prefix the hashes so that the browser doesn't scroll down
if(location_hash!=undefined){go_to_hash('fndtn-'+location_hash.replace('#',''));}else {go_to_hash('fndtn-'+target_hash.replace('#',''));}}} // WARNING: The activation and deactivation of the tab content must
// occur after the deep linking in order to properly refresh the browser
// window (notably in Chrome).
// Clean up multiple attr instances to done once
tab.addClass(settings.active_class).triggerHandler('opened');tab_link.attr({'aria-selected':'true',tabindex:0});siblings.removeClass(settings.active_class);siblings.find('a').attr({'aria-selected':'false' /*,  tabindex : -1*/});target.siblings().removeClass(settings.active_class).attr({'aria-hidden':'true' /*,  tabindex : -1*/});target.addClass(settings.active_class).attr('aria-hidden','false').removeAttr('tabindex');settings.callback(tab);target.triggerHandler('toggled',[target]);tabs.triggerHandler('toggled',[tab]);tab_link.off('keydown').on('keydown',interpret_keyup_action);},data_attr:function data_attr(str){if(this.namespace.length>0){return this.namespace+'-'+str;}return str;},off:function off(){},reflow:function reflow(){}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.tooltip={name:'tooltip',version:'5.5.3',settings:{additional_inheritable_classes:[],tooltip_class:'.tooltip',append_to:'body',touch_close_text:'Tap To Close',disable_for_touch:false,hover_delay:200,fade_in_duration:150,fade_out_duration:150,show_on:'all',tip_template:function tip_template(selector,content){return '<span data-selector="'+selector+'" id="'+selector+'" class="'+Foundation.libs.tooltip.settings.tooltip_class.substring(1)+'" role="tooltip">'+content+'<span class="nub"></span></span>';}},cache:{},init:function init(scope,method,options){Foundation.inherit(this,'random_str');this.bindings(method,options);},should_show:function should_show(target,tip){var settings=$.extend({},this.settings,this.data_options(target));if(settings.show_on==='all'){return true;}else if(this.small()&&settings.show_on==='small'){return true;}else if(this.medium()&&settings.show_on==='medium'){return true;}else if(this.large()&&settings.show_on==='large'){return true;}return false;},medium:function medium(){return matchMedia(Foundation.media_queries['medium']).matches;},large:function large(){return matchMedia(Foundation.media_queries['large']).matches;},events:function events(instance){var self=this,S=self.S;self.create(this.S(instance));function _startShow(elt,$this,immediate){if(elt.timer){return;}if(immediate){elt.timer=null;self.showTip($this);}else {elt.timer=setTimeout(function(){elt.timer=null;self.showTip($this);}.bind(elt),self.settings.hover_delay);}}function _startHide(elt,$this){if(elt.timer){clearTimeout(elt.timer);elt.timer=null;}self.hide($this);}$(this.scope).off('.tooltip').on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip','['+this.attr_name()+']',function(e){var $this=S(this),settings=$.extend({},self.settings,self.data_options($this)),is_touch=false;if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)&&S(e.target).is('a')){return false;}if(/mouse/i.test(e.type)&&self.ie_touch(e)){return false;}if($this.hasClass('open')){if(Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)){e.preventDefault();}self.hide($this);}else {if(settings.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)){return;}else if(!settings.disable_for_touch&&Modernizr.touch&&/touchstart|MSPointerDown/i.test(e.type)){e.preventDefault();S(settings.tooltip_class+'.open').hide();is_touch=true; // close other open tooltips on touch
if($('.open['+self.attr_name()+']').length>0){var prevOpen=S($('.open['+self.attr_name()+']')[0]);self.hide(prevOpen);}}if(/enter|over/i.test(e.type)){_startShow(this,$this);}else if(e.type==='mouseout'||e.type==='mouseleave'){_startHide(this,$this);}else {_startShow(this,$this,true);}}}).on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip','['+this.attr_name()+'].open',function(e){if(/mouse/i.test(e.type)&&self.ie_touch(e)){return false;}if($(this).data('tooltip-open-event-type')=='touch'&&e.type=='mouseleave'){return;}else if($(this).data('tooltip-open-event-type')=='mouse'&&/MSPointerDown|touchstart/i.test(e.type)){self.convert_to_touch($(this));}else {_startHide(this,$(this));}}).on('DOMNodeRemoved DOMAttrModified','['+this.attr_name()+']:not(a)',function(e){_startHide(this,S(this));});},ie_touch:function ie_touch(e){ // How do I distinguish between IE11 and Windows Phone 8?????
return false;},showTip:function showTip($target){var $tip=this.getTip($target);if(this.should_show($target,$tip)){return this.show($target);}return;},getTip:function getTip($target){var selector=this.selector($target),settings=$.extend({},this.settings,this.data_options($target)),tip=null;if(selector){tip=this.S('span[data-selector="'+selector+'"]'+settings.tooltip_class);}return (typeof tip==='undefined'?'undefined':_typeof(tip))==='object'?tip:false;},selector:function selector($target){var dataSelector=$target.attr(this.attr_name())||$target.attr('data-selector');if(typeof dataSelector!='string'){dataSelector=this.random_str(6);$target.attr('data-selector',dataSelector).attr('aria-describedby',dataSelector);}return dataSelector;},create:function create($target){var self=this,settings=$.extend({},this.settings,this.data_options($target)),tip_template=this.settings.tip_template;if(typeof settings.tip_template==='string'&&window.hasOwnProperty(settings.tip_template)){tip_template=window[settings.tip_template];}var $tip=$(tip_template(this.selector($target),$('<div></div>').html($target.attr('title')).html())),classes=this.inheritable_classes($target);$tip.addClass(classes).appendTo(settings.append_to);if(Modernizr.touch){$tip.append('<span class="tap-to-close">'+settings.touch_close_text+'</span>');$tip.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip',function(e){self.hide($target);});}$target.removeAttr('title').attr('title','');},reposition:function reposition(target,tip,classes){var width,nub,nubHeight,nubWidth,objPos;tip.css('visibility','hidden').show();width=target.data('width');nub=tip.children('.nub');nubHeight=nub.outerHeight();nubWidth=nub.outerWidth();if(this.small()){tip.css({'width':'100%'});}else {tip.css({'width':width?width:'auto'});}objPos=function objPos(obj,top,right,bottom,left,width){return obj.css({'top':top?top:'auto','bottom':bottom?bottom:'auto','left':left?left:'auto','right':right?right:'auto'}).end();};var o_top=target.offset().top;var o_left=target.offset().left;var outerHeight=target.outerHeight();objPos(tip,o_top+outerHeight+10,'auto','auto',o_left);if(this.small()){objPos(tip,o_top+outerHeight+10,'auto','auto',12.5,$(this.scope).width());tip.addClass('tip-override');objPos(nub,-nubHeight,'auto','auto',o_left);}else {if(Foundation.rtl){nub.addClass('rtl');o_left=o_left+target.outerWidth()-tip.outerWidth();}objPos(tip,o_top+outerHeight+10,'auto','auto',o_left); // reset nub from small styles, if they've been applied
if(nub.attr('style')){nub.removeAttr('style');}tip.removeClass('tip-override');var tip_outerHeight=tip.outerHeight();if(classes&&classes.indexOf('tip-top')>-1){if(Foundation.rtl){nub.addClass('rtl');}objPos(tip,o_top-tip_outerHeight,'auto','auto',o_left).removeClass('tip-override');}else if(classes&&classes.indexOf('tip-left')>-1){objPos(tip,o_top+outerHeight/2-tip_outerHeight/2,'auto','auto',o_left-tip.outerWidth()-nubHeight).removeClass('tip-override');nub.removeClass('rtl');}else if(classes&&classes.indexOf('tip-right')>-1){objPos(tip,o_top+outerHeight/2-tip_outerHeight/2,'auto','auto',o_left+target.outerWidth()+nubHeight).removeClass('tip-override');nub.removeClass('rtl');}}tip.css('visibility','visible').hide();},small:function small(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches;},inheritable_classes:function inheritable_classes($target){var settings=$.extend({},this.settings,this.data_options($target)),inheritables=['tip-top','tip-left','tip-bottom','tip-right','radius','round'].concat(settings.additional_inheritable_classes),classes=$target.attr('class'),filtered=classes?$.map(classes.split(' '),function(el,i){if($.inArray(el,inheritables)!==-1){return el;}}).join(' '):'';return $.trim(filtered);},convert_to_touch:function convert_to_touch($target){var self=this,$tip=self.getTip($target),settings=$.extend({},self.settings,self.data_options($target));if($tip.find('.tap-to-close').length===0){$tip.append('<span class="tap-to-close">'+settings.touch_close_text+'</span>');$tip.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose',function(e){self.hide($target);});}$target.data('tooltip-open-event-type','touch');},show:function show($target){var $tip=this.getTip($target);if($target.data('tooltip-open-event-type')=='touch'){this.convert_to_touch($target);}this.reposition($target,$tip,$target.attr('class'));$target.addClass('open');$tip.fadeIn(this.settings.fade_in_duration);},hide:function hide($target){var $tip=this.getTip($target);$tip.fadeOut(this.settings.fade_out_duration,function(){$tip.find('.tap-to-close').remove();$tip.off('click.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose');$target.removeClass('open');});},off:function off(){var self=this;this.S(this.scope).off('.fndtn.tooltip');this.S(this.settings.tooltip_class).each(function(i){$('['+self.attr_name()+']').eq(i).attr('title',$(this).text());}).remove();},reflow:function reflow(){}};})(jQuery,window,window.document);;(function($,window,document,undefined){'use strict';Foundation.libs.topbar={name:'topbar',version:'5.5.3',settings:{index:0,start_offset:0,sticky_class:'sticky',custom_back_text:true,back_text:'Back',mobile_show_parent_link:true,is_hover:true,scrolltop:true, // jump to top when sticky nav menu toggle is clicked
sticky_on:'all',dropdown_autoclose:true},init:function init(section,method,options){Foundation.inherit(this,'add_custom_rule register_media throttle');var self=this;self.register_media('topbar','foundation-mq-topbar');this.bindings(method,options);self.S('['+this.attr_name()+']',this.scope).each(function(){var topbar=$(this),settings=topbar.data(self.attr_name(true)+'-init'),section=self.S('section, .top-bar-section',this);topbar.data('index',0);var topbarContainer=topbar.parent();if(topbarContainer.hasClass('fixed')||self.is_sticky(topbar,topbarContainer,settings)){self.settings.sticky_class=settings.sticky_class;self.settings.sticky_topbar=topbar;topbar.data('height',topbarContainer.outerHeight());topbar.data('stickyoffset',topbarContainer.offset().top);}else {topbar.data('height',topbar.outerHeight());}if(!settings.assembled){self.assemble(topbar);}if(settings.is_hover){self.S('.has-dropdown',topbar).addClass('not-click');}else {self.S('.has-dropdown',topbar).removeClass('not-click');} // Pad body when sticky (scrolled) or fixed.
self.add_custom_rule('.f-topbar-fixed { padding-top: '+topbar.data('height')+'px }');if(topbarContainer.hasClass('fixed')){self.S('body').addClass('f-topbar-fixed');}});},is_sticky:function is_sticky(topbar,topbarContainer,settings){var sticky=topbarContainer.hasClass(settings.sticky_class);var smallMatch=matchMedia(Foundation.media_queries.small).matches;var medMatch=matchMedia(Foundation.media_queries.medium).matches;var lrgMatch=matchMedia(Foundation.media_queries.large).matches;if(sticky&&settings.sticky_on==='all'){return true;}if(sticky&&this.small()&&settings.sticky_on.indexOf('small')!==-1){if(smallMatch&&!medMatch&&!lrgMatch){return true;}}if(sticky&&this.medium()&&settings.sticky_on.indexOf('medium')!==-1){if(smallMatch&&medMatch&&!lrgMatch){return true;}}if(sticky&&this.large()&&settings.sticky_on.indexOf('large')!==-1){if(smallMatch&&medMatch&&lrgMatch){return true;}}return false;},toggle:function toggle(toggleEl){var self=this,topbar;if(toggleEl){topbar=self.S(toggleEl).closest('['+this.attr_name()+']');}else {topbar=self.S('['+this.attr_name()+']');}var settings=topbar.data(this.attr_name(true)+'-init');var section=self.S('section, .top-bar-section',topbar);if(self.breakpoint()){if(!self.rtl){section.css({left:'0%'});$('>.name',section).css({left:'100%'});}else {section.css({right:'0%'});$('>.name',section).css({right:'100%'});}self.S('li.moved',section).removeClass('moved');topbar.data('index',0);topbar.toggleClass('expanded').css('height','');}if(settings.scrolltop){if(!topbar.hasClass('expanded')){if(topbar.hasClass('fixed')){topbar.parent().addClass('fixed');topbar.removeClass('fixed');self.S('body').addClass('f-topbar-fixed');}}else if(topbar.parent().hasClass('fixed')){if(settings.scrolltop){topbar.parent().removeClass('fixed');topbar.addClass('fixed');self.S('body').removeClass('f-topbar-fixed');window.scrollTo(0,0);}else {topbar.parent().removeClass('expanded');}}}else {if(self.is_sticky(topbar,topbar.parent(),settings)){topbar.parent().addClass('fixed');}if(topbar.parent().hasClass('fixed')){if(!topbar.hasClass('expanded')){topbar.removeClass('fixed');topbar.parent().removeClass('expanded');self.update_sticky_positioning();}else {topbar.addClass('fixed');topbar.parent().addClass('expanded');self.S('body').addClass('f-topbar-fixed');}}}},timer:null,events:function events(bar){var self=this,S=this.S;S(this.scope).off('.topbar').on('click.fndtn.topbar','['+this.attr_name()+'] .toggle-topbar',function(e){e.preventDefault();self.toggle(this);}).on('click.fndtn.topbar contextmenu.fndtn.topbar','.top-bar .top-bar-section li a[href^="#"],['+this.attr_name()+'] .top-bar-section li a[href^="#"]',function(e){var li=$(this).closest('li'),topbar=li.closest('['+self.attr_name()+']'),settings=topbar.data(self.attr_name(true)+'-init');if(settings.dropdown_autoclose&&settings.is_hover){var hoverLi=$(this).closest('.hover');hoverLi.removeClass('hover');}if(self.breakpoint()&&!li.hasClass('back')&&!li.hasClass('has-dropdown')){self.toggle();}}).on('click.fndtn.topbar','['+this.attr_name()+'] li.has-dropdown',function(e){var li=S(this),target=S(e.target),topbar=li.closest('['+self.attr_name()+']'),settings=topbar.data(self.attr_name(true)+'-init');if(target.data('revealId')){self.toggle();return;}if(self.breakpoint()){return;}if(settings.is_hover&&!Modernizr.touch){return;}e.stopImmediatePropagation();if(li.hasClass('hover')){li.removeClass('hover').find('li').removeClass('hover');li.parents('li.hover').removeClass('hover');}else {li.addClass('hover');$(li).siblings().removeClass('hover');if(target[0].nodeName==='A'&&target.parent().hasClass('has-dropdown')){e.preventDefault();}}}).on('click.fndtn.topbar','['+this.attr_name()+'] .has-dropdown>a',function(e){if(self.breakpoint()){e.preventDefault();var $this=S(this),topbar=$this.closest('['+self.attr_name()+']'),section=topbar.find('section, .top-bar-section'),dropdownHeight=$this.next('.dropdown').outerHeight(),$selectedLi=$this.closest('li');topbar.data('index',topbar.data('index')+1);$selectedLi.addClass('moved');if(!self.rtl){section.css({left:-(100*topbar.data('index'))+'%'});section.find('>.name').css({left:100*topbar.data('index')+'%'});}else {section.css({right:-(100*topbar.data('index'))+'%'});section.find('>.name').css({right:100*topbar.data('index')+'%'});}topbar.css('height',$this.siblings('ul').outerHeight(true)+topbar.data('height'));}});S(window).off('.topbar').on('resize.fndtn.topbar',self.throttle(function(){self.resize.call(self);},50)).trigger('resize.fndtn.topbar').load(function(){ // Ensure that the offset is calculated after all of the pages resources have loaded
S(this).trigger('resize.fndtn.topbar');});S('body').off('.topbar').on('click.fndtn.topbar',function(e){var parent=S(e.target).closest('li').closest('li.hover');if(parent.length>0){return;}S('['+self.attr_name()+'] li.hover').removeClass('hover');}); // Go up a level on Click
S(this.scope).on('click.fndtn.topbar','['+this.attr_name()+'] .has-dropdown .back',function(e){e.preventDefault();var $this=S(this),topbar=$this.closest('['+self.attr_name()+']'),section=topbar.find('section, .top-bar-section'),settings=topbar.data(self.attr_name(true)+'-init'),$movedLi=$this.closest('li.moved'),$previousLevelUl=$movedLi.parent();topbar.data('index',topbar.data('index')-1);if(!self.rtl){section.css({left:-(100*topbar.data('index'))+'%'});section.find('>.name').css({left:100*topbar.data('index')+'%'});}else {section.css({right:-(100*topbar.data('index'))+'%'});section.find('>.name').css({right:100*topbar.data('index')+'%'});}if(topbar.data('index')===0){topbar.css('height','');}else {topbar.css('height',$previousLevelUl.outerHeight(true)+topbar.data('height'));}setTimeout(function(){$movedLi.removeClass('moved');},300);}); // Show dropdown menus when their items are focused
S(this.scope).find('.dropdown a').focus(function(){$(this).parents('.has-dropdown').addClass('hover');}).blur(function(){$(this).parents('.has-dropdown').removeClass('hover');});},resize:function resize(){var self=this;self.S('['+this.attr_name()+']').each(function(){var topbar=self.S(this),settings=topbar.data(self.attr_name(true)+'-init');var stickyContainer=topbar.parent('.'+self.settings.sticky_class);var stickyOffset;if(!self.breakpoint()){var doToggle=topbar.hasClass('expanded');topbar.css('height','').removeClass('expanded').find('li').removeClass('hover');if(doToggle){self.toggle(topbar);}}if(self.is_sticky(topbar,stickyContainer,settings)){if(stickyContainer.hasClass('fixed')){ // Remove the fixed to allow for correct calculation of the offset.
stickyContainer.removeClass('fixed');stickyOffset=stickyContainer.offset().top;if(self.S(document.body).hasClass('f-topbar-fixed')){stickyOffset-=topbar.data('height');}topbar.data('stickyoffset',stickyOffset);stickyContainer.addClass('fixed');}else {stickyOffset=stickyContainer.offset().top;topbar.data('stickyoffset',stickyOffset);}}});},breakpoint:function breakpoint(){return !matchMedia(Foundation.media_queries['topbar']).matches;},small:function small(){return matchMedia(Foundation.media_queries['small']).matches;},medium:function medium(){return matchMedia(Foundation.media_queries['medium']).matches;},large:function large(){return matchMedia(Foundation.media_queries['large']).matches;},assemble:function assemble(topbar){var self=this,settings=topbar.data(this.attr_name(true)+'-init'),section=self.S('section, .top-bar-section',topbar); // Pull element out of the DOM for manipulation
section.detach();self.S('.has-dropdown>a',section).each(function(){var $link=self.S(this),$dropdown=$link.siblings('.dropdown'),url=$link.attr('href'),$titleLi;if(!$dropdown.find('.title.back').length){if(settings.mobile_show_parent_link==true&&url){$titleLi=$('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li class="parent-link hide-for-medium-up"><a class="parent-link js-generated" href="'+url+'">'+$link.html()+'</a></li>');}else {$titleLi=$('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5>');} // Copy link to subnav
if(settings.custom_back_text==true){$('h5>a',$titleLi).html(settings.back_text);}else {$('h5>a',$titleLi).html('&laquo; '+$link.html());}$dropdown.prepend($titleLi);}}); // Put element back in the DOM
section.appendTo(topbar); // check for sticky
this.sticky();this.assembled(topbar);},assembled:function assembled(topbar){topbar.data(this.attr_name(true),$.extend({},topbar.data(this.attr_name(true)),{assembled:true}));},height:function height(ul){var total=0,self=this;$('> li',ul).each(function(){total+=self.S(this).outerHeight(true);});return total;},sticky:function sticky(){var self=this;this.S(window).on('scroll',function(){self.update_sticky_positioning();});},update_sticky_positioning:function update_sticky_positioning(){var klass='.'+this.settings.sticky_class,$window=this.S(window),self=this;if(self.settings.sticky_topbar&&self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(),this.settings)){var distance=this.settings.sticky_topbar.data('stickyoffset')+this.settings.start_offset;if(!self.S(klass).hasClass('expanded')){if($window.scrollTop()>distance){if(!self.S(klass).hasClass('fixed')){self.S(klass).addClass('fixed');self.S('body').addClass('f-topbar-fixed');}}else if($window.scrollTop()<=distance){if(self.S(klass).hasClass('fixed')){self.S(klass).removeClass('fixed');self.S('body').removeClass('f-topbar-fixed');}}}}},off:function off(){this.S(this.scope).off('.fndtn.topbar');this.S(window).off('.fndtn.topbar');},reflow:function reflow(){}};})(jQuery,window,window.document);

},{}],2:[function(require,module,exports){
(function (process,__filename){
/** vim: et:ts=4:sw=4:sts=4
 * @license amdefine 1.0.0 Copyright (c) 2011-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/amdefine for details
 */

/*jslint node: true */
/*global module, process */
'use strict';

/**
 * Creates a define for node.
 * @param {Object} module the "module" object that is defined by Node for the
 * current module.
 * @param {Function} [requireFn]. Node's require function for the current module.
 * It only needs to be passed in Node versions before 0.5, when module.require
 * did not exist.
 * @returns {Function} a define function that is usable for the current node
 * module.
 */
function amdefine(module, requireFn) {
    'use strict';
    var defineCache = {},
        loaderCache = {},
        alreadyCalled = false,
        path = require('path'),
        makeRequire, stringRequire;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
        var i, part;
        for (i = 0; ary[i]; i+= 1) {
            part = ary[i];
            if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
            } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                    //End of the line. Keep at least one non-dot
                    //path segment at the front so it can be mapped
                    //correctly to disk. Otherwise, there is likely
                    //no path mapping for a path starting with '..'.
                    //This can still fail, but catches the most reasonable
                    //uses of ..
                    break;
                } else if (i > 0) {
                    ary.splice(i - 1, 2);
                    i -= 2;
                }
            }
        }
    }

    function normalize(name, baseName) {
        var baseParts;

        //Adjust any relative paths.
        if (name && name.charAt(0) === '.') {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
            }
        }

        return name;
    }

    /**
     * Create the normalize() function passed to a loader plugin's
     * normalize method.
     */
    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(id) {
        function load(value) {
            loaderCache[id] = value;
        }

        load.fromText = function (id, text) {
            //This one is difficult because the text can/probably uses
            //define, and any relative paths and requires should be relative
            //to that id was it would be found on disk. But this would require
            //bootstrapping a module/require fairly deeply from node core.
            //Not sure how best to go about that yet.
            throw new Error('amdefine does not implement load.fromText');
        };

        return load;
    }

    makeRequire = function (systemRequire, exports, module, relId) {
        function amdRequire(deps, callback) {
            if (typeof deps === 'string') {
                //Synchronous, single module require('')
                return stringRequire(systemRequire, exports, module, deps, relId);
            } else {
                //Array of dependencies with a callback.

                //Convert the dependencies to modules.
                deps = deps.map(function (depName) {
                    return stringRequire(systemRequire, exports, module, depName, relId);
                });

                //Wait for next tick to call back the require call.
                if (callback) {
                    process.nextTick(function () {
                        callback.apply(null, deps);
                    });
                }
            }
        }

        amdRequire.toUrl = function (filePath) {
            if (filePath.indexOf('.') === 0) {
                return normalize(filePath, path.dirname(module.filename));
            } else {
                return filePath;
            }
        };

        return amdRequire;
    };

    //Favor explicit value, passed in if the module wants to support Node 0.4.
    requireFn = requireFn || function req() {
        return module.require.apply(module, arguments);
    };

    function runFactory(id, deps, factory) {
        var r, e, m, result;

        if (id) {
            e = loaderCache[id] = {};
            m = {
                id: id,
                uri: __filename,
                exports: e
            };
            r = makeRequire(requireFn, e, m, id);
        } else {
            //Only support one define call per file
            if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
            }
            alreadyCalled = true;

            //Use the real variables from node
            //Use module.exports for exports, since
            //the exports in here is amdefine exports.
            e = module.exports;
            m = module;
            r = makeRequire(requireFn, e, m, module.id);
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return r(depName);
            });
        }

        //Call the factory with the right dependencies.
        if (typeof factory === 'function') {
            result = factory.apply(m.exports, deps);
        } else {
            result = factory;
        }

        if (result !== undefined) {
            m.exports = result;
            if (id) {
                loaderCache[id] = m.exports;
            }
        }
    }

    stringRequire = function (systemRequire, exports, module, id, relId) {
        //Split the ID by a ! so that
        var index = id.indexOf('!'),
            originalId = id,
            prefix, plugin;

        if (index === -1) {
            id = normalize(id, relId);

            //Straight module lookup. If it is one of the special dependencies,
            //deal with it, otherwise, delegate to node.
            if (id === 'require') {
                return makeRequire(systemRequire, exports, module, relId);
            } else if (id === 'exports') {
                return exports;
            } else if (id === 'module') {
                return module;
            } else if (loaderCache.hasOwnProperty(id)) {
                return loaderCache[id];
            } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                return loaderCache[id];
            } else {
                if(systemRequire) {
                    return systemRequire(originalId);
                } else {
                    throw new Error('No module with ID: ' + id);
                }
            }
        } else {
            //There is a plugin in play.
            prefix = id.substring(0, index);
            id = id.substring(index + 1, id.length);

            plugin = stringRequire(systemRequire, exports, module, prefix, relId);

            if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
            } else {
                //Normalize the ID normally.
                id = normalize(id, relId);
            }

            if (loaderCache[id]) {
                return loaderCache[id];
            } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});

                return loaderCache[id];
            }
        }
    };

    //Create a define function specific to the module asking for amdefine.
    function define(id, deps, factory) {
        if (Array.isArray(id)) {
            factory = deps;
            deps = id;
            id = undefined;
        } else if (typeof id !== 'string') {
            factory = id;
            id = deps = undefined;
        }

        if (deps && !Array.isArray(deps)) {
            factory = deps;
            deps = undefined;
        }

        if (!deps) {
            deps = ['require', 'exports', 'module'];
        }

        //Set up properties for this module. If an ID, then use
        //internal cache. If no ID, then use the external variables
        //for this node module.
        if (id) {
            //Put the module in deep freeze until there is a
            //require call for it.
            defineCache[id] = [id, deps, factory];
        } else {
            runFactory(id, deps, factory);
        }
    }

    //define.require, which has access to all the values in the
    //cache. Useful for AMD modules that all have IDs in the file,
    //but need to finally export a value to node based on one of those
    //IDs.
    define.require = function (id) {
        if (loaderCache[id]) {
            return loaderCache[id];
        }

        if (defineCache[id]) {
            runFactory.apply(null, defineCache[id]);
            return loaderCache[id];
        }
    };

    define.amd = {};

    return define;
}

module.exports = amdefine;

}).call(this,require('_process'),"/node_modules/amdefine/amdefine.js")
},{"_process":36,"path":35}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _handlebarsRuntime = require('./handlebars.runtime');

var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

// Compiler imports

var _handlebarsCompilerAst = require('./handlebars/compiler/ast');

var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

var _handlebarsCompilerBase = require('./handlebars/compiler/base');

var _handlebarsCompilerCompiler = require('./handlebars/compiler/compiler');

var _handlebarsCompilerJavascriptCompiler = require('./handlebars/compiler/javascript-compiler');

var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

var _handlebarsCompilerVisitor = require('./handlebars/compiler/visitor');

var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

var _create = _handlebarsRuntime2['default'].create;
function create() {
  var hb = _create();

  hb.compile = function (input, options) {
    return _handlebarsCompilerCompiler.compile(input, options, hb);
  };
  hb.precompile = function (input, options) {
    return _handlebarsCompilerCompiler.precompile(input, options, hb);
  };

  hb.AST = _handlebarsCompilerAst2['default'];
  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
  hb.Parser = _handlebarsCompilerBase.parser;
  hb.parse = _handlebarsCompilerBase.parse;

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst.Visitor = _handlebarsCompilerVisitor2['default'];

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars.runtime":5,"./handlebars/compiler/ast":7,"./handlebars/compiler/base":8,"./handlebars/compiler/compiler":10,"./handlebars/compiler/javascript-compiler":12,"./handlebars/compiler/visitor":15,"./handlebars/no-conflict":29}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars/base":6,"./handlebars/exception":19,"./handlebars/no-conflict":29,"./handlebars/runtime":30,"./handlebars/safe-string":31,"./handlebars/utils":32}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.5';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];


},{"./decorators":17,"./exception":19,"./helpers":20,"./logger":28,"./utils":32}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var AST = {
  // Public API used to evaluate derived attributes regarding AST nodes
  helpers: {
    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    helperExpression: function helperExpression(node) {
      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
    },

    scopedId: function scopedId(path) {
      return (/^\.|this\b/.test(path.original)
      );
    },

    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    simpleId: function simpleId(path) {
      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
    }
  }
};

// Must be exported as an object rather than the root of the module as the jison lexer
// must modify the object to operate properly.
exports['default'] = AST;
module.exports = exports['default'];


},{}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.parse = parse;
// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _whitespaceControl = require('./whitespace-control');

var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

var _helpers = require('./helpers');

var Helpers = _interopRequireWildcard(_helpers);

var _utils = require('../utils');

exports.parser = _parser2['default'];

var yy = {};
_utils.extend(yy, Helpers);

function parse(input, options) {
  // Just return if an already-compiled AST was passed in.
  if (input.type === 'Program') {
    return input;
  }

  _parser2['default'].yy = yy;

  // Altering the shared object here, but this is ok as parser is a sync operation
  yy.locInfo = function (locInfo) {
    return new yy.SourceLocation(options && options.srcName, locInfo);
  };

  var strip = new _whitespaceControl2['default'](options);
  return strip.accept(_parser2['default'].parse(input));
}


},{"../utils":32,"./helpers":11,"./parser":13,"./whitespace-control":16}],9:[function(require,module,exports){
/* global define */
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

var SourceNode = undefined;

try {
  /* istanbul ignore next */
  if (typeof define !== 'function' || !define.amd) {
    // We don't support this in AMD environments. For these environments, we asusme that
    // they are running on the browser and thus have no need for the source-map library.
    var SourceMap = require('source-map');
    SourceNode = SourceMap.SourceNode;
  }
} catch (err) {}
/* NOP */

/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
if (!SourceNode) {
  SourceNode = function (line, column, srcFile, chunks) {
    this.src = '';
    if (chunks) {
      this.add(chunks);
    }
  };
  /* istanbul ignore next */
  SourceNode.prototype = {
    add: function add(chunks) {
      if (_utils.isArray(chunks)) {
        chunks = chunks.join('');
      }
      this.src += chunks;
    },
    prepend: function prepend(chunks) {
      if (_utils.isArray(chunks)) {
        chunks = chunks.join('');
      }
      this.src = chunks + this.src;
    },
    toStringWithSourceMap: function toStringWithSourceMap() {
      return { code: this.toString() };
    },
    toString: function toString() {
      return this.src;
    }
  };
}

function castChunk(chunk, codeGen, loc) {
  if (_utils.isArray(chunk)) {
    var ret = [];

    for (var i = 0, len = chunk.length; i < len; i++) {
      ret.push(codeGen.wrap(chunk[i], loc));
    }
    return ret;
  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
    // Handle primitives that the SourceNode will throw up on
    return chunk + '';
  }
  return chunk;
}

function CodeGen(srcFile) {
  this.srcFile = srcFile;
  this.source = [];
}

CodeGen.prototype = {
  isEmpty: function isEmpty() {
    return !this.source.length;
  },
  prepend: function prepend(source, loc) {
    this.source.unshift(this.wrap(source, loc));
  },
  push: function push(source, loc) {
    this.source.push(this.wrap(source, loc));
  },

  merge: function merge() {
    var source = this.empty();
    this.each(function (line) {
      source.add(['  ', line, '\n']);
    });
    return source;
  },

  each: function each(iter) {
    for (var i = 0, len = this.source.length; i < len; i++) {
      iter(this.source[i]);
    }
  },

  empty: function empty() {
    var loc = this.currentLocation || { start: {} };
    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
  },
  wrap: function wrap(chunk) {
    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

    if (chunk instanceof SourceNode) {
      return chunk;
    }

    chunk = castChunk(chunk, this, loc);

    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
  },

  functionCall: function functionCall(fn, type, params) {
    params = this.generateList(params);
    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
  },

  quotedString: function quotedString(str) {
    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
    .replace(/\u2029/g, '\\u2029') + '"';
  },

  objectLiteral: function objectLiteral(obj) {
    var pairs = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var value = castChunk(obj[key], this);
        if (value !== 'undefined') {
          pairs.push([this.quotedString(key), ':', value]);
        }
      }
    }

    var ret = this.generateList(pairs);
    ret.prepend('{');
    ret.add('}');
    return ret;
  },

  generateList: function generateList(entries) {
    var ret = this.empty();

    for (var i = 0, len = entries.length; i < len; i++) {
      if (i) {
        ret.add(',');
      }

      ret.add(castChunk(entries[i], this));
    }

    return ret;
  },

  generateArray: function generateArray(entries) {
    var ret = this.generateList(entries);
    ret.prepend('[');
    ret.add(']');

    return ret;
  }
};

exports['default'] = CodeGen;
module.exports = exports['default'];


},{"../utils":32,"source-map":37}],10:[function(require,module,exports){
/* eslint-disable new-cap */

'use strict';

exports.__esModule = true;
exports.Compiler = Compiler;
exports.precompile = precompile;
exports.compile = compile;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

var _utils = require('../utils');

var _ast = require('./ast');

var _ast2 = _interopRequireDefault(_ast);

var slice = [].slice;

function Compiler() {}

// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.

Compiler.prototype = {
  compiler: Compiler,

  equals: function equals(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var opcode = this.opcodes[i],
          otherOpcode = other.opcodes[i];
      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
        return false;
      }
    }

    // We know that length is the same between the two arrays because they are directly tied
    // to the opcode behavior above.
    len = this.children.length;
    for (var i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }

    return true;
  },

  guid: 0,

  compile: function compile(program, options) {
    this.sourceNode = [];
    this.opcodes = [];
    this.children = [];
    this.options = options;
    this.stringParams = options.stringParams;
    this.trackIds = options.trackIds;

    options.blockParams = options.blockParams || [];

    // These changes will propagate to the other compiler components
    var knownHelpers = options.knownHelpers;
    options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true,
      'lookup': true
    };
    if (knownHelpers) {
      for (var _name in knownHelpers) {
        /* istanbul ignore else */
        if (_name in knownHelpers) {
          options.knownHelpers[_name] = knownHelpers[_name];
        }
      }
    }

    return this.accept(program);
  },

  compileProgram: function compileProgram(program) {
    var childCompiler = new this.compiler(),
        // eslint-disable-line new-cap
    result = childCompiler.compile(program, this.options),
        guid = this.guid++;

    this.usePartial = this.usePartial || result.usePartial;

    this.children[guid] = result;
    this.useDepths = this.useDepths || result.useDepths;

    return guid;
  },

  accept: function accept(node) {
    /* istanbul ignore next: Sanity code */
    if (!this[node.type]) {
      throw new _exception2['default']('Unknown type: ' + node.type, node);
    }

    this.sourceNode.unshift(node);
    var ret = this[node.type](node);
    this.sourceNode.shift();
    return ret;
  },

  Program: function Program(program) {
    this.options.blockParams.unshift(program.blockParams);

    var body = program.body,
        bodyLength = body.length;
    for (var i = 0; i < bodyLength; i++) {
      this.accept(body[i]);
    }

    this.options.blockParams.shift();

    this.isSimple = bodyLength === 1;
    this.blockParams = program.blockParams ? program.blockParams.length : 0;

    return this;
  },

  BlockStatement: function BlockStatement(block) {
    transformLiteralToPath(block);

    var program = block.program,
        inverse = block.inverse;

    program = program && this.compileProgram(program);
    inverse = inverse && this.compileProgram(inverse);

    var type = this.classifySexpr(block);

    if (type === 'helper') {
      this.helperSexpr(block, program, inverse);
    } else if (type === 'simple') {
      this.simpleSexpr(block);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('blockValue', block.path.original);
    } else {
      this.ambiguousSexpr(block, program, inverse);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('ambiguousBlockValue');
    }

    this.opcode('append');
  },

  DecoratorBlock: function DecoratorBlock(decorator) {
    var program = decorator.program && this.compileProgram(decorator.program);
    var params = this.setupFullMustacheParams(decorator, program, undefined),
        path = decorator.path;

    this.useDecorators = true;
    this.opcode('registerDecorator', params.length, path.original);
  },

  PartialStatement: function PartialStatement(partial) {
    this.usePartial = true;

    var program = partial.program;
    if (program) {
      program = this.compileProgram(partial.program);
    }

    var params = partial.params;
    if (params.length > 1) {
      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
    } else if (!params.length) {
      if (this.options.explicitPartialContext) {
        this.opcode('pushLiteral', 'undefined');
      } else {
        params.push({ type: 'PathExpression', parts: [], depth: 0 });
      }
    }

    var partialName = partial.name.original,
        isDynamic = partial.name.type === 'SubExpression';
    if (isDynamic) {
      this.accept(partial.name);
    }

    this.setupFullMustacheParams(partial, program, undefined, true);

    var indent = partial.indent || '';
    if (this.options.preventIndent && indent) {
      this.opcode('appendContent', indent);
      indent = '';
    }

    this.opcode('invokePartial', isDynamic, partialName, indent);
    this.opcode('append');
  },
  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
    this.PartialStatement(partialBlock);
  },

  MustacheStatement: function MustacheStatement(mustache) {
    this.SubExpression(mustache);

    if (mustache.escaped && !this.options.noEscape) {
      this.opcode('appendEscaped');
    } else {
      this.opcode('append');
    }
  },
  Decorator: function Decorator(decorator) {
    this.DecoratorBlock(decorator);
  },

  ContentStatement: function ContentStatement(content) {
    if (content.value) {
      this.opcode('appendContent', content.value);
    }
  },

  CommentStatement: function CommentStatement() {},

  SubExpression: function SubExpression(sexpr) {
    transformLiteralToPath(sexpr);
    var type = this.classifySexpr(sexpr);

    if (type === 'simple') {
      this.simpleSexpr(sexpr);
    } else if (type === 'helper') {
      this.helperSexpr(sexpr);
    } else {
      this.ambiguousSexpr(sexpr);
    }
  },
  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
    var path = sexpr.path,
        name = path.parts[0],
        isBlock = program != null || inverse != null;

    this.opcode('getContext', path.depth);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    path.strict = true;
    this.accept(path);

    this.opcode('invokeAmbiguous', name, isBlock);
  },

  simpleSexpr: function simpleSexpr(sexpr) {
    var path = sexpr.path;
    path.strict = true;
    this.accept(path);
    this.opcode('resolvePossibleLambda');
  },

  helperSexpr: function helperSexpr(sexpr, program, inverse) {
    var params = this.setupFullMustacheParams(sexpr, program, inverse),
        path = sexpr.path,
        name = path.parts[0];

    if (this.options.knownHelpers[name]) {
      this.opcode('invokeKnownHelper', params.length, name);
    } else if (this.options.knownHelpersOnly) {
      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
    } else {
      path.strict = true;
      path.falsy = true;

      this.accept(path);
      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
    }
  },

  PathExpression: function PathExpression(path) {
    this.addDepth(path.depth);
    this.opcode('getContext', path.depth);

    var name = path.parts[0],
        scoped = _ast2['default'].helpers.scopedId(path),
        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

    if (blockParamId) {
      this.opcode('lookupBlockParam', blockParamId, path.parts);
    } else if (!name) {
      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
      this.opcode('pushContext');
    } else if (path.data) {
      this.options.data = true;
      this.opcode('lookupData', path.depth, path.parts, path.strict);
    } else {
      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
    }
  },

  StringLiteral: function StringLiteral(string) {
    this.opcode('pushString', string.value);
  },

  NumberLiteral: function NumberLiteral(number) {
    this.opcode('pushLiteral', number.value);
  },

  BooleanLiteral: function BooleanLiteral(bool) {
    this.opcode('pushLiteral', bool.value);
  },

  UndefinedLiteral: function UndefinedLiteral() {
    this.opcode('pushLiteral', 'undefined');
  },

  NullLiteral: function NullLiteral() {
    this.opcode('pushLiteral', 'null');
  },

  Hash: function Hash(hash) {
    var pairs = hash.pairs,
        i = 0,
        l = pairs.length;

    this.opcode('pushHash');

    for (; i < l; i++) {
      this.pushParam(pairs[i].value);
    }
    while (i--) {
      this.opcode('assignToHash', pairs[i].key);
    }
    this.opcode('popHash');
  },

  // HELPERS
  opcode: function opcode(name) {
    this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
  },

  addDepth: function addDepth(depth) {
    if (!depth) {
      return;
    }

    this.useDepths = true;
  },

  classifySexpr: function classifySexpr(sexpr) {
    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

    // a mustache is an eligible helper if:
    // * its id is simple (a single part, not `this` or `..`)
    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

    // if a mustache is an eligible helper but not a definite
    // helper, it is ambiguous, and will be resolved in a later
    // pass or at runtime.
    var isEligible = !isBlockParam && (isHelper || isSimple);

    // if ambiguous, we can possibly resolve the ambiguity now
    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
    if (isEligible && !isHelper) {
      var _name2 = sexpr.path.parts[0],
          options = this.options;

      if (options.knownHelpers[_name2]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }

    if (isHelper) {
      return 'helper';
    } else if (isEligible) {
      return 'ambiguous';
    } else {
      return 'simple';
    }
  },

  pushParams: function pushParams(params) {
    for (var i = 0, l = params.length; i < l; i++) {
      this.pushParam(params[i]);
    }
  },

  pushParam: function pushParam(val) {
    var value = val.value != null ? val.value : val.original || '';

    if (this.stringParams) {
      if (value.replace) {
        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
      }

      if (val.depth) {
        this.addDepth(val.depth);
      }
      this.opcode('getContext', val.depth || 0);
      this.opcode('pushStringParam', value, val.type);

      if (val.type === 'SubExpression') {
        // SubExpressions get evaluated and passed in
        // in string params mode.
        this.accept(val);
      }
    } else {
      if (this.trackIds) {
        var blockParamIndex = undefined;
        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
          blockParamIndex = this.blockParamIndex(val.parts[0]);
        }
        if (blockParamIndex) {
          var blockParamChild = val.parts.slice(1).join('.');
          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
        } else {
          value = val.original || value;
          if (value.replace) {
            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
          }

          this.opcode('pushId', val.type, value);
        }
      }
      this.accept(val);
    }
  },

  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
    var params = sexpr.params;
    this.pushParams(params);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    if (sexpr.hash) {
      this.accept(sexpr.hash);
    } else {
      this.opcode('emptyHash', omitEmpty);
    }

    return params;
  },

  blockParamIndex: function blockParamIndex(name) {
    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
      var blockParams = this.options.blockParams[depth],
          param = blockParams && _utils.indexOf(blockParams, name);
      if (blockParams && param >= 0) {
        return [depth, param];
      }
    }
  }
};

function precompile(input, options, env) {
  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }
  if (options.compat) {
    options.useDepths = true;
  }

  var ast = env.parse(input, options),
      environment = new env.Compiler().compile(ast, options);
  return new env.JavaScriptCompiler().compile(environment, options);
}

function compile(input, options, env) {
  if (options === undefined) options = {};

  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
  }

  if (!('data' in options)) {
    options.data = true;
  }
  if (options.compat) {
    options.useDepths = true;
  }

  var compiled = undefined;

  function compileInput() {
    var ast = env.parse(input, options),
        environment = new env.Compiler().compile(ast, options),
        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
    return env.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  function ret(context, execOptions) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled.call(this, context, execOptions);
  }
  ret._setup = function (setupOptions) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled._setup(setupOptions);
  };
  ret._child = function (i, data, blockParams, depths) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled._child(i, data, blockParams, depths);
  };
  return ret;
}

function argEquals(a, b) {
  if (a === b) {
    return true;
  }

  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (!argEquals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
}

function transformLiteralToPath(sexpr) {
  if (!sexpr.path.parts) {
    var literal = sexpr.path;
    // Casting to string here to make false and 0 literal values play nicely with the rest
    // of the system.
    sexpr.path = {
      type: 'PathExpression',
      data: false,
      depth: 0,
      parts: [literal.original + ''],
      original: literal.original + '',
      loc: literal.loc
    };
  }
}


},{"../exception":19,"../utils":32,"./ast":7}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.SourceLocation = SourceLocation;
exports.id = id;
exports.stripFlags = stripFlags;
exports.stripComment = stripComment;
exports.preparePath = preparePath;
exports.prepareMustache = prepareMustache;
exports.prepareRawBlock = prepareRawBlock;
exports.prepareBlock = prepareBlock;
exports.prepareProgram = prepareProgram;
exports.preparePartialBlock = preparePartialBlock;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

function validateClose(open, close) {
  close = close.path ? close.path.original : close;

  if (open.path.original !== close) {
    var errorNode = { loc: open.path.loc };

    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
  }
}

function SourceLocation(source, locInfo) {
  this.source = source;
  this.start = {
    line: locInfo.first_line,
    column: locInfo.first_column
  };
  this.end = {
    line: locInfo.last_line,
    column: locInfo.last_column
  };
}

function id(token) {
  if (/^\[.*\]$/.test(token)) {
    return token.substr(1, token.length - 2);
  } else {
    return token;
  }
}

function stripFlags(open, close) {
  return {
    open: open.charAt(2) === '~',
    close: close.charAt(close.length - 3) === '~'
  };
}

function stripComment(comment) {
  return comment.replace(/^\{\{~?\!-?-?/, '').replace(/-?-?~?\}\}$/, '');
}

function preparePath(data, parts, loc) {
  loc = this.locInfo(loc);

  var original = data ? '@' : '',
      dig = [],
      depth = 0,
      depthString = '';

  for (var i = 0, l = parts.length; i < l; i++) {
    var part = parts[i].part,

    // If we have [] syntax then we do not treat path references as operators,
    // i.e. foo.[this] resolves to approximately context.foo['this']
    isLiteral = parts[i].original !== part;
    original += (parts[i].separator || '') + part;

    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
      if (dig.length > 0) {
        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
      } else if (part === '..') {
        depth++;
        depthString += '../';
      }
    } else {
      dig.push(part);
    }
  }

  return {
    type: 'PathExpression',
    data: data,
    depth: depth,
    parts: dig,
    original: original,
    loc: loc
  };
}

function prepareMustache(path, params, hash, open, strip, locInfo) {
  // Must use charAt to support IE pre-10
  var escapeFlag = open.charAt(3) || open.charAt(2),
      escaped = escapeFlag !== '{' && escapeFlag !== '&';

  var decorator = /\*/.test(open);
  return {
    type: decorator ? 'Decorator' : 'MustacheStatement',
    path: path,
    params: params,
    hash: hash,
    escaped: escaped,
    strip: strip,
    loc: this.locInfo(locInfo)
  };
}

function prepareRawBlock(openRawBlock, contents, close, locInfo) {
  validateClose(openRawBlock, close);

  locInfo = this.locInfo(locInfo);
  var program = {
    type: 'Program',
    body: contents,
    strip: {},
    loc: locInfo
  };

  return {
    type: 'BlockStatement',
    path: openRawBlock.path,
    params: openRawBlock.params,
    hash: openRawBlock.hash,
    program: program,
    openStrip: {},
    inverseStrip: {},
    closeStrip: {},
    loc: locInfo
  };
}

function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
  if (close && close.path) {
    validateClose(openBlock, close);
  }

  var decorator = /\*/.test(openBlock.open);

  program.blockParams = openBlock.blockParams;

  var inverse = undefined,
      inverseStrip = undefined;

  if (inverseAndProgram) {
    if (decorator) {
      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
    }

    if (inverseAndProgram.chain) {
      inverseAndProgram.program.body[0].closeStrip = close.strip;
    }

    inverseStrip = inverseAndProgram.strip;
    inverse = inverseAndProgram.program;
  }

  if (inverted) {
    inverted = inverse;
    inverse = program;
    program = inverted;
  }

  return {
    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
    path: openBlock.path,
    params: openBlock.params,
    hash: openBlock.hash,
    program: program,
    inverse: inverse,
    openStrip: openBlock.strip,
    inverseStrip: inverseStrip,
    closeStrip: close && close.strip,
    loc: this.locInfo(locInfo)
  };
}

function prepareProgram(statements, loc) {
  if (!loc && statements.length) {
    var firstLoc = statements[0].loc,
        lastLoc = statements[statements.length - 1].loc;

    /* istanbul ignore else */
    if (firstLoc && lastLoc) {
      loc = {
        source: firstLoc.source,
        start: {
          line: firstLoc.start.line,
          column: firstLoc.start.column
        },
        end: {
          line: lastLoc.end.line,
          column: lastLoc.end.column
        }
      };
    }
  }

  return {
    type: 'Program',
    body: statements,
    strip: {},
    loc: loc
  };
}

function preparePartialBlock(open, program, close, locInfo) {
  validateClose(open, close);

  return {
    type: 'PartialBlockStatement',
    name: open.path,
    params: open.params,
    hash: open.hash,
    program: program,
    openStrip: open.strip,
    closeStrip: close && close.strip,
    loc: this.locInfo(locInfo)
  };
}


},{"../exception":19}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _base = require('../base');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

var _utils = require('../utils');

var _codeGen = require('./code-gen');

var _codeGen2 = _interopRequireDefault(_codeGen);

function Literal(value) {
  this.value = value;
}

function JavaScriptCompiler() {}

JavaScriptCompiler.prototype = {
  // PUBLIC API: You can override these methods in a subclass to provide
  // alternative compiled forms for name lookup and buffering semantics
  nameLookup: function nameLookup(parent, name /* , type*/) {
    if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
      return [parent, '.', name];
    } else {
      return [parent, '[', JSON.stringify(name), ']'];
    }
  },
  depthedLookup: function depthedLookup(name) {
    return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
  },

  compilerInfo: function compilerInfo() {
    var revision = _base.COMPILER_REVISION,
        versions = _base.REVISION_CHANGES[revision];
    return [revision, versions];
  },

  appendToBuffer: function appendToBuffer(source, location, explicit) {
    // Force a source as this simplifies the merge logic.
    if (!_utils.isArray(source)) {
      source = [source];
    }
    source = this.source.wrap(source, location);

    if (this.environment.isSimple) {
      return ['return ', source, ';'];
    } else if (explicit) {
      // This is a case where the buffer operation occurs as a child of another
      // construct, generally braces. We have to explicitly output these buffer
      // operations to ensure that the emitted code goes in the correct location.
      return ['buffer += ', source, ';'];
    } else {
      source.appendToBuffer = true;
      return source;
    }
  },

  initializeBuffer: function initializeBuffer() {
    return this.quotedString('');
  },
  // END PUBLIC API

  compile: function compile(environment, options, context, asObject) {
    this.environment = environment;
    this.options = options;
    this.stringParams = this.options.stringParams;
    this.trackIds = this.options.trackIds;
    this.precompile = !asObject;

    this.name = this.environment.name;
    this.isChild = !!context;
    this.context = context || {
      decorators: [],
      programs: [],
      environments: []
    };

    this.preamble();

    this.stackSlot = 0;
    this.stackVars = [];
    this.aliases = {};
    this.registers = { list: [] };
    this.hashes = [];
    this.compileStack = [];
    this.inlineStack = [];
    this.blockParams = [];

    this.compileChildren(environment, options);

    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

    var opcodes = environment.opcodes,
        opcode = undefined,
        firstLoc = undefined,
        i = undefined,
        l = undefined;

    for (i = 0, l = opcodes.length; i < l; i++) {
      opcode = opcodes[i];

      this.source.currentLocation = opcode.loc;
      firstLoc = firstLoc || opcode.loc;
      this[opcode.opcode].apply(this, opcode.args);
    }

    // Flush any trailing content that might be pending.
    this.source.currentLocation = firstLoc;
    this.pushSource('');

    /* istanbul ignore next */
    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
      throw new _exception2['default']('Compile completed with content left on stack');
    }

    if (!this.decorators.isEmpty()) {
      this.useDecorators = true;

      this.decorators.prepend('var decorators = container.decorators;\n');
      this.decorators.push('return fn;');

      if (asObject) {
        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
      } else {
        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
        this.decorators.push('}\n');
        this.decorators = this.decorators.merge();
      }
    } else {
      this.decorators = undefined;
    }

    var fn = this.createFunctionContext(asObject);
    if (!this.isChild) {
      var ret = {
        compiler: this.compilerInfo(),
        main: fn
      };

      if (this.decorators) {
        ret.main_d = this.decorators; // eslint-disable-line camelcase
        ret.useDecorators = true;
      }

      var _context = this.context;
      var programs = _context.programs;
      var decorators = _context.decorators;

      for (i = 0, l = programs.length; i < l; i++) {
        if (programs[i]) {
          ret[i] = programs[i];
          if (decorators[i]) {
            ret[i + '_d'] = decorators[i];
            ret.useDecorators = true;
          }
        }
      }

      if (this.environment.usePartial) {
        ret.usePartial = true;
      }
      if (this.options.data) {
        ret.useData = true;
      }
      if (this.useDepths) {
        ret.useDepths = true;
      }
      if (this.useBlockParams) {
        ret.useBlockParams = true;
      }
      if (this.options.compat) {
        ret.compat = true;
      }

      if (!asObject) {
        ret.compiler = JSON.stringify(ret.compiler);

        this.source.currentLocation = { start: { line: 1, column: 0 } };
        ret = this.objectLiteral(ret);

        if (options.srcName) {
          ret = ret.toStringWithSourceMap({ file: options.destName });
          ret.map = ret.map && ret.map.toString();
        } else {
          ret = ret.toString();
        }
      } else {
        ret.compilerOptions = this.options;
      }

      return ret;
    } else {
      return fn;
    }
  },

  preamble: function preamble() {
    // track the last context pushed into place to allow skipping the
    // getContext opcode when it would be a noop
    this.lastContext = 0;
    this.source = new _codeGen2['default'](this.options.srcName);
    this.decorators = new _codeGen2['default'](this.options.srcName);
  },

  createFunctionContext: function createFunctionContext(asObject) {
    var varDeclarations = '';

    var locals = this.stackVars.concat(this.registers.list);
    if (locals.length > 0) {
      varDeclarations += ', ' + locals.join(', ');
    }

    // Generate minimizer alias mappings
    //
    // When using true SourceNodes, this will update all references to the given alias
    // as the source nodes are reused in situ. For the non-source node compilation mode,
    // aliases will not be used, but this case is already being run on the client and
    // we aren't concern about minimizing the template size.
    var aliasCount = 0;
    for (var alias in this.aliases) {
      // eslint-disable-line guard-for-in
      var node = this.aliases[alias];

      if (this.aliases.hasOwnProperty(alias) && node.children && node.referenceCount > 1) {
        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
        node.children[0] = 'alias' + aliasCount;
      }
    }

    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

    if (this.useBlockParams || this.useDepths) {
      params.push('blockParams');
    }
    if (this.useDepths) {
      params.push('depths');
    }

    // Perform a second pass over the output to merge content when possible
    var source = this.mergeSource(varDeclarations);

    if (asObject) {
      params.push(source);

      return Function.apply(this, params);
    } else {
      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
    }
  },
  mergeSource: function mergeSource(varDeclarations) {
    var isSimple = this.environment.isSimple,
        appendOnly = !this.forceBuffer,
        appendFirst = undefined,
        sourceSeen = undefined,
        bufferStart = undefined,
        bufferEnd = undefined;
    this.source.each(function (line) {
      if (line.appendToBuffer) {
        if (bufferStart) {
          line.prepend('  + ');
        } else {
          bufferStart = line;
        }
        bufferEnd = line;
      } else {
        if (bufferStart) {
          if (!sourceSeen) {
            appendFirst = true;
          } else {
            bufferStart.prepend('buffer += ');
          }
          bufferEnd.add(';');
          bufferStart = bufferEnd = undefined;
        }

        sourceSeen = true;
        if (!isSimple) {
          appendOnly = false;
        }
      }
    });

    if (appendOnly) {
      if (bufferStart) {
        bufferStart.prepend('return ');
        bufferEnd.add(';');
      } else if (!sourceSeen) {
        this.source.push('return "";');
      }
    } else {
      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

      if (bufferStart) {
        bufferStart.prepend('return buffer + ');
        bufferEnd.add(';');
      } else {
        this.source.push('return buffer;');
      }
    }

    if (varDeclarations) {
      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
    }

    return this.source.merge();
  },

  // [blockValue]
  //
  // On stack, before: hash, inverse, program, value
  // On stack, after: return value of blockHelperMissing
  //
  // The purpose of this opcode is to take a block of the form
  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
  // replace it on the stack with the result of properly
  // invoking blockHelperMissing.
  blockValue: function blockValue(name) {
    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
        params = [this.contextName(0)];
    this.setupHelperArgs(name, 0, params);

    var blockName = this.popStack();
    params.splice(1, 0, blockName);

    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
  },

  // [ambiguousBlockValue]
  //
  // On stack, before: hash, inverse, program, value
  // Compiler value, before: lastHelper=value of last found helper, if any
  // On stack, after, if no lastHelper: same as [blockValue]
  // On stack, after, if lastHelper: value
  ambiguousBlockValue: function ambiguousBlockValue() {
    // We're being a bit cheeky and reusing the options value from the prior exec
    var blockHelperMissing = this.aliasable('helpers.blockHelperMissing'),
        params = [this.contextName(0)];
    this.setupHelperArgs('', 0, params, true);

    this.flushInline();

    var current = this.topStack();
    params.splice(1, 0, current);

    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
  },

  // [appendContent]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Appends the string value of `content` to the current buffer
  appendContent: function appendContent(content) {
    if (this.pendingContent) {
      content = this.pendingContent + content;
    } else {
      this.pendingLocation = this.source.currentLocation;
    }

    this.pendingContent = content;
  },

  // [append]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Coerces `value` to a String and appends it to the current buffer.
  //
  // If `value` is truthy, or 0, it is coerced into a string and appended
  // Otherwise, the empty string is appended
  append: function append() {
    if (this.isInline()) {
      this.replaceStack(function (current) {
        return [' != null ? ', current, ' : ""'];
      });

      this.pushSource(this.appendToBuffer(this.popStack()));
    } else {
      var local = this.popStack();
      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
      if (this.environment.isSimple) {
        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
      }
    }
  },

  // [appendEscaped]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Escape `value` and append it to the buffer
  appendEscaped: function appendEscaped() {
    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
  },

  // [getContext]
  //
  // On stack, before: ...
  // On stack, after: ...
  // Compiler value, after: lastContext=depth
  //
  // Set the value of the `lastContext` compiler value to the depth
  getContext: function getContext(depth) {
    this.lastContext = depth;
  },

  // [pushContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext, ...
  //
  // Pushes the value of the current context onto the stack.
  pushContext: function pushContext() {
    this.pushStackLiteral(this.contextName(this.lastContext));
  },

  // [lookupOnContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext[name], ...
  //
  // Looks up the value of `name` on the current context and pushes
  // it onto the stack.
  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
    var i = 0;

    if (!scoped && this.options.compat && !this.lastContext) {
      // The depthed query is expected to handle the undefined logic for the root level that
      // is implemented below, so we evaluate that directly in compat mode
      this.push(this.depthedLookup(parts[i++]));
    } else {
      this.pushContext();
    }

    this.resolvePath('context', parts, i, falsy, strict);
  },

  // [lookupBlockParam]
  //
  // On stack, before: ...
  // On stack, after: blockParam[name], ...
  //
  // Looks up the value of `parts` on the given block param and pushes
  // it onto the stack.
  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
    this.useBlockParams = true;

    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
    this.resolvePath('context', parts, 1);
  },

  // [lookupData]
  //
  // On stack, before: ...
  // On stack, after: data, ...
  //
  // Push the data lookup operator
  lookupData: function lookupData(depth, parts, strict) {
    if (!depth) {
      this.pushStackLiteral('data');
    } else {
      this.pushStackLiteral('container.data(data, ' + depth + ')');
    }

    this.resolvePath('data', parts, 0, true, strict);
  },

  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
    // istanbul ignore next

    var _this = this;

    if (this.options.strict || this.options.assumeObjects) {
      this.push(strictLookup(this.options.strict && strict, this, parts, type));
      return;
    }

    var len = parts.length;
    for (; i < len; i++) {
      /* eslint-disable no-loop-func */
      this.replaceStack(function (current) {
        var lookup = _this.nameLookup(current, parts[i], type);
        // We want to ensure that zero and false are handled properly if the context (falsy flag)
        // needs to have the special handling for these values.
        if (!falsy) {
          return [' != null ? ', lookup, ' : ', current];
        } else {
          // Otherwise we can use generic falsy handling
          return [' && ', lookup];
        }
      });
      /* eslint-enable no-loop-func */
    }
  },

  // [resolvePossibleLambda]
  //
  // On stack, before: value, ...
  // On stack, after: resolved value, ...
  //
  // If the `value` is a lambda, replace it on the stack by
  // the return value of the lambda
  resolvePossibleLambda: function resolvePossibleLambda() {
    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
  },

  // [pushStringParam]
  //
  // On stack, before: ...
  // On stack, after: string, currentContext, ...
  //
  // This opcode is designed for use in string mode, which
  // provides the string value of a parameter along with its
  // depth rather than resolving it immediately.
  pushStringParam: function pushStringParam(string, type) {
    this.pushContext();
    this.pushString(type);

    // If it's a subexpression, the string result
    // will be pushed after this opcode.
    if (type !== 'SubExpression') {
      if (typeof string === 'string') {
        this.pushString(string);
      } else {
        this.pushStackLiteral(string);
      }
    }
  },

  emptyHash: function emptyHash(omitEmpty) {
    if (this.trackIds) {
      this.push('{}'); // hashIds
    }
    if (this.stringParams) {
      this.push('{}'); // hashContexts
      this.push('{}'); // hashTypes
    }
    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
  },
  pushHash: function pushHash() {
    if (this.hash) {
      this.hashes.push(this.hash);
    }
    this.hash = { values: [], types: [], contexts: [], ids: [] };
  },
  popHash: function popHash() {
    var hash = this.hash;
    this.hash = this.hashes.pop();

    if (this.trackIds) {
      this.push(this.objectLiteral(hash.ids));
    }
    if (this.stringParams) {
      this.push(this.objectLiteral(hash.contexts));
      this.push(this.objectLiteral(hash.types));
    }

    this.push(this.objectLiteral(hash.values));
  },

  // [pushString]
  //
  // On stack, before: ...
  // On stack, after: quotedString(string), ...
  //
  // Push a quoted version of `string` onto the stack
  pushString: function pushString(string) {
    this.pushStackLiteral(this.quotedString(string));
  },

  // [pushLiteral]
  //
  // On stack, before: ...
  // On stack, after: value, ...
  //
  // Pushes a value onto the stack. This operation prevents
  // the compiler from creating a temporary variable to hold
  // it.
  pushLiteral: function pushLiteral(value) {
    this.pushStackLiteral(value);
  },

  // [pushProgram]
  //
  // On stack, before: ...
  // On stack, after: program(guid), ...
  //
  // Push a program expression onto the stack. This takes
  // a compile-time guid and converts it into a runtime-accessible
  // expression.
  pushProgram: function pushProgram(guid) {
    if (guid != null) {
      this.pushStackLiteral(this.programExpression(guid));
    } else {
      this.pushStackLiteral(null);
    }
  },

  // [registerDecorator]
  //
  // On stack, before: hash, program, params..., ...
  // On stack, after: ...
  //
  // Pops off the decorator's parameters, invokes the decorator,
  // and inserts the decorator into the decorators list.
  registerDecorator: function registerDecorator(paramSize, name) {
    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
        options = this.setupHelperArgs(name, paramSize);

    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
  },

  // [invokeHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // Pops off the helper's parameters, invokes the helper,
  // and pushes the helper's return value onto the stack.
  //
  // If the helper is not found, `helperMissing` is called.
  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
    var nonHelper = this.popStack(),
        helper = this.setupHelper(paramSize, name),
        simple = isSimple ? [helper.name, ' || '] : '';

    var lookup = ['('].concat(simple, nonHelper);
    if (!this.options.strict) {
      lookup.push(' || ', this.aliasable('helpers.helperMissing'));
    }
    lookup.push(')');

    this.push(this.source.functionCall(lookup, 'call', helper.callParams));
  },

  // [invokeKnownHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // This operation is used when the helper is known to exist,
  // so a `helperMissing` fallback is not required.
  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
    var helper = this.setupHelper(paramSize, name);
    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
  },

  // [invokeAmbiguous]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of disambiguation
  //
  // This operation is used when an expression like `{{foo}}`
  // is provided, but we don't know at compile-time whether it
  // is a helper or a path.
  //
  // This operation emits more code than the other options,
  // and can be avoided by passing the `knownHelpers` and
  // `knownHelpersOnly` flags at compile-time.
  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
    this.useRegister('helper');

    var nonHelper = this.popStack();

    this.emptyHash();
    var helper = this.setupHelper(0, name, helperCall);

    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
    if (!this.options.strict) {
      lookup[0] = '(helper = ';
      lookup.push(' != null ? helper : ', this.aliasable('helpers.helperMissing'));
    }

    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
  },

  // [invokePartial]
  //
  // On stack, before: context, ...
  // On stack after: result of partial invocation
  //
  // This operation pops off a context, invokes a partial with that context,
  // and pushes the result of the invocation back.
  invokePartial: function invokePartial(isDynamic, name, indent) {
    var params = [],
        options = this.setupParams(name, 1, params);

    if (isDynamic) {
      name = this.popStack();
      delete options.name;
    }

    if (indent) {
      options.indent = JSON.stringify(indent);
    }
    options.helpers = 'helpers';
    options.partials = 'partials';
    options.decorators = 'container.decorators';

    if (!isDynamic) {
      params.unshift(this.nameLookup('partials', name, 'partial'));
    } else {
      params.unshift(name);
    }

    if (this.options.compat) {
      options.depths = 'depths';
    }
    options = this.objectLiteral(options);
    params.push(options);

    this.push(this.source.functionCall('container.invokePartial', '', params));
  },

  // [assignToHash]
  //
  // On stack, before: value, ..., hash, ...
  // On stack, after: ..., hash, ...
  //
  // Pops a value off the stack and assigns it to the current hash
  assignToHash: function assignToHash(key) {
    var value = this.popStack(),
        context = undefined,
        type = undefined,
        id = undefined;

    if (this.trackIds) {
      id = this.popStack();
    }
    if (this.stringParams) {
      type = this.popStack();
      context = this.popStack();
    }

    var hash = this.hash;
    if (context) {
      hash.contexts[key] = context;
    }
    if (type) {
      hash.types[key] = type;
    }
    if (id) {
      hash.ids[key] = id;
    }
    hash.values[key] = value;
  },

  pushId: function pushId(type, name, child) {
    if (type === 'BlockParam') {
      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
    } else if (type === 'PathExpression') {
      this.pushString(name);
    } else if (type === 'SubExpression') {
      this.pushStackLiteral('true');
    } else {
      this.pushStackLiteral('null');
    }
  },

  // HELPERS

  compiler: JavaScriptCompiler,

  compileChildren: function compileChildren(environment, options) {
    var children = environment.children,
        child = undefined,
        compiler = undefined;

    for (var i = 0, l = children.length; i < l; i++) {
      child = children[i];
      compiler = new this.compiler(); // eslint-disable-line new-cap

      var index = this.matchExistingProgram(child);

      if (index == null) {
        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
        index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
        this.context.decorators[index] = compiler.decorators;
        this.context.environments[index] = child;

        this.useDepths = this.useDepths || compiler.useDepths;
        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
      } else {
        child.index = index;
        child.name = 'program' + index;

        this.useDepths = this.useDepths || child.useDepths;
        this.useBlockParams = this.useBlockParams || child.useBlockParams;
      }
    }
  },
  matchExistingProgram: function matchExistingProgram(child) {
    for (var i = 0, len = this.context.environments.length; i < len; i++) {
      var environment = this.context.environments[i];
      if (environment && environment.equals(child)) {
        return i;
      }
    }
  },

  programExpression: function programExpression(guid) {
    var child = this.environment.children[guid],
        programParams = [child.index, 'data', child.blockParams];

    if (this.useBlockParams || this.useDepths) {
      programParams.push('blockParams');
    }
    if (this.useDepths) {
      programParams.push('depths');
    }

    return 'container.program(' + programParams.join(', ') + ')';
  },

  useRegister: function useRegister(name) {
    if (!this.registers[name]) {
      this.registers[name] = true;
      this.registers.list.push(name);
    }
  },

  push: function push(expr) {
    if (!(expr instanceof Literal)) {
      expr = this.source.wrap(expr);
    }

    this.inlineStack.push(expr);
    return expr;
  },

  pushStackLiteral: function pushStackLiteral(item) {
    this.push(new Literal(item));
  },

  pushSource: function pushSource(source) {
    if (this.pendingContent) {
      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
      this.pendingContent = undefined;
    }

    if (source) {
      this.source.push(source);
    }
  },

  replaceStack: function replaceStack(callback) {
    var prefix = ['('],
        stack = undefined,
        createdStack = undefined,
        usedLiteral = undefined;

    /* istanbul ignore next */
    if (!this.isInline()) {
      throw new _exception2['default']('replaceStack on non-inline');
    }

    // We want to merge the inline statement into the replacement statement via ','
    var top = this.popStack(true);

    if (top instanceof Literal) {
      // Literals do not need to be inlined
      stack = [top.value];
      prefix = ['(', stack];
      usedLiteral = true;
    } else {
      // Get or create the current stack name for use by the inline
      createdStack = true;
      var _name = this.incrStack();

      prefix = ['((', this.push(_name), ' = ', top, ')'];
      stack = this.topStack();
    }

    var item = callback.call(this, stack);

    if (!usedLiteral) {
      this.popStack();
    }
    if (createdStack) {
      this.stackSlot--;
    }
    this.push(prefix.concat(item, ')'));
  },

  incrStack: function incrStack() {
    this.stackSlot++;
    if (this.stackSlot > this.stackVars.length) {
      this.stackVars.push('stack' + this.stackSlot);
    }
    return this.topStackName();
  },
  topStackName: function topStackName() {
    return 'stack' + this.stackSlot;
  },
  flushInline: function flushInline() {
    var inlineStack = this.inlineStack;
    this.inlineStack = [];
    for (var i = 0, len = inlineStack.length; i < len; i++) {
      var entry = inlineStack[i];
      /* istanbul ignore if */
      if (entry instanceof Literal) {
        this.compileStack.push(entry);
      } else {
        var stack = this.incrStack();
        this.pushSource([stack, ' = ', entry, ';']);
        this.compileStack.push(stack);
      }
    }
  },
  isInline: function isInline() {
    return this.inlineStack.length;
  },

  popStack: function popStack(wrapped) {
    var inline = this.isInline(),
        item = (inline ? this.inlineStack : this.compileStack).pop();

    if (!wrapped && item instanceof Literal) {
      return item.value;
    } else {
      if (!inline) {
        /* istanbul ignore next */
        if (!this.stackSlot) {
          throw new _exception2['default']('Invalid stack pop');
        }
        this.stackSlot--;
      }
      return item;
    }
  },

  topStack: function topStack() {
    var stack = this.isInline() ? this.inlineStack : this.compileStack,
        item = stack[stack.length - 1];

    /* istanbul ignore if */
    if (item instanceof Literal) {
      return item.value;
    } else {
      return item;
    }
  },

  contextName: function contextName(context) {
    if (this.useDepths && context) {
      return 'depths[' + context + ']';
    } else {
      return 'depth' + context;
    }
  },

  quotedString: function quotedString(str) {
    return this.source.quotedString(str);
  },

  objectLiteral: function objectLiteral(obj) {
    return this.source.objectLiteral(obj);
  },

  aliasable: function aliasable(name) {
    var ret = this.aliases[name];
    if (ret) {
      ret.referenceCount++;
      return ret;
    }

    ret = this.aliases[name] = this.source.wrap(name);
    ret.aliasable = true;
    ret.referenceCount = 1;

    return ret;
  },

  setupHelper: function setupHelper(paramSize, name, blockHelper) {
    var params = [],
        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
    var foundHelper = this.nameLookup('helpers', name, 'helper'),
        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : {}');

    return {
      params: params,
      paramsInit: paramsInit,
      name: foundHelper,
      callParams: [callContext].concat(params)
    };
  },

  setupParams: function setupParams(helper, paramSize, params) {
    var options = {},
        contexts = [],
        types = [],
        ids = [],
        objectArgs = !params,
        param = undefined;

    if (objectArgs) {
      params = [];
    }

    options.name = this.quotedString(helper);
    options.hash = this.popStack();

    if (this.trackIds) {
      options.hashIds = this.popStack();
    }
    if (this.stringParams) {
      options.hashTypes = this.popStack();
      options.hashContexts = this.popStack();
    }

    var inverse = this.popStack(),
        program = this.popStack();

    // Avoid setting fn and inverse if neither are set. This allows
    // helpers to do a check for `if (options.fn)`
    if (program || inverse) {
      options.fn = program || 'container.noop';
      options.inverse = inverse || 'container.noop';
    }

    // The parameters go on to the stack in order (making sure that they are evaluated in order)
    // so we need to pop them off the stack in reverse order
    var i = paramSize;
    while (i--) {
      param = this.popStack();
      params[i] = param;

      if (this.trackIds) {
        ids[i] = this.popStack();
      }
      if (this.stringParams) {
        types[i] = this.popStack();
        contexts[i] = this.popStack();
      }
    }

    if (objectArgs) {
      options.args = this.source.generateArray(params);
    }

    if (this.trackIds) {
      options.ids = this.source.generateArray(ids);
    }
    if (this.stringParams) {
      options.types = this.source.generateArray(types);
      options.contexts = this.source.generateArray(contexts);
    }

    if (this.options.data) {
      options.data = 'data';
    }
    if (this.useBlockParams) {
      options.blockParams = 'blockParams';
    }
    return options;
  },

  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
    var options = this.setupParams(helper, paramSize, params);
    options = this.objectLiteral(options);
    if (useRegister) {
      this.useRegister('options');
      params.push('options');
      return ['options=', options];
    } else if (params) {
      params.push(options);
      return '';
    } else {
      return options;
    }
  }
};

(function () {
  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for (var i = 0, l = reservedWords.length; i < l; i++) {
    compilerWords[reservedWords[i]] = true;
  }
})();

JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
};

function strictLookup(requireTerminal, compiler, parts, type) {
  var stack = compiler.popStack(),
      i = 0,
      len = parts.length;
  if (requireTerminal) {
    len--;
  }

  for (; i < len; i++) {
    stack = compiler.nameLookup(stack, parts[i], type);
  }

  if (requireTerminal) {
    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ')'];
  } else {
    return stack;
  }
}

exports['default'] = JavaScriptCompiler;
module.exports = exports['default'];


},{"../base":6,"../exception":19,"../utils":32,"./code-gen":9}],13:[function(require,module,exports){
/* istanbul ignore next */
/* Jison generated parser */
"use strict";

var handlebars = (function () {
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition_plus0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$
        /**/) {

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                    this.$ = yy.prepareProgram($$[$0]);
                    break;
                case 3:
                    this.$ = $$[$0];
                    break;
                case 4:
                    this.$ = $$[$0];
                    break;
                case 5:
                    this.$ = $$[$0];
                    break;
                case 6:
                    this.$ = $$[$0];
                    break;
                case 7:
                    this.$ = $$[$0];
                    break;
                case 8:
                    this.$ = $$[$0];
                    break;
                case 9:
                    this.$ = {
                        type: 'CommentStatement',
                        value: yy.stripComment($$[$0]),
                        strip: yy.stripFlags($$[$0], $$[$0]),
                        loc: yy.locInfo(this._$)
                    };

                    break;
                case 10:
                    this.$ = {
                        type: 'ContentStatement',
                        original: $$[$0],
                        value: $$[$0],
                        loc: yy.locInfo(this._$)
                    };

                    break;
                case 11:
                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                    break;
                case 12:
                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
                    break;
                case 13:
                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
                    break;
                case 14:
                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
                    break;
                case 15:
                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                    break;
                case 16:
                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                    break;
                case 17:
                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                    break;
                case 18:
                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
                    break;
                case 19:
                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
                    program.chained = true;

                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

                    break;
                case 20:
                    this.$ = $$[$0];
                    break;
                case 21:
                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
                    break;
                case 22:
                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                    break;
                case 23:
                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                    break;
                case 24:
                    this.$ = {
                        type: 'PartialStatement',
                        name: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1],
                        indent: '',
                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                        loc: yy.locInfo(this._$)
                    };

                    break;
                case 25:
                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                    break;
                case 26:
                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
                    break;
                case 27:
                    this.$ = $$[$0];
                    break;
                case 28:
                    this.$ = $$[$0];
                    break;
                case 29:
                    this.$ = {
                        type: 'SubExpression',
                        path: $$[$0 - 3],
                        params: $$[$0 - 2],
                        hash: $$[$0 - 1],
                        loc: yy.locInfo(this._$)
                    };

                    break;
                case 30:
                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
                    break;
                case 31:
                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
                    break;
                case 32:
                    this.$ = yy.id($$[$0 - 1]);
                    break;
                case 33:
                    this.$ = $$[$0];
                    break;
                case 34:
                    this.$ = $$[$0];
                    break;
                case 35:
                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
                    break;
                case 36:
                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
                    break;
                case 37:
                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
                    break;
                case 38:
                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
                    break;
                case 39:
                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
                    break;
                case 40:
                    this.$ = $$[$0];
                    break;
                case 41:
                    this.$ = $$[$0];
                    break;
                case 42:
                    this.$ = yy.preparePath(true, $$[$0], this._$);
                    break;
                case 43:
                    this.$ = yy.preparePath(false, $$[$0], this._$);
                    break;
                case 44:
                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
                    break;
                case 45:
                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
                    break;
                case 46:
                    this.$ = [];
                    break;
                case 47:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 48:
                    this.$ = [$$[$0]];
                    break;
                case 49:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 50:
                    this.$ = [];
                    break;
                case 51:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 58:
                    this.$ = [];
                    break;
                case 59:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 64:
                    this.$ = [];
                    break;
                case 65:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 70:
                    this.$ = [];
                    break;
                case 71:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 78:
                    this.$ = [];
                    break;
                case 79:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 82:
                    this.$ = [];
                    break;
                case 83:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 86:
                    this.$ = [];
                    break;
                case 87:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 90:
                    this.$ = [];
                    break;
                case 91:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 94:
                    this.$ = [];
                    break;
                case 95:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 98:
                    this.$ = [$$[$0]];
                    break;
                case 99:
                    $$[$0 - 1].push($$[$0]);
                    break;
                case 100:
                    this.$ = [$$[$0]];
                    break;
                case 101:
                    $$[$0 - 1].push($$[$0]);
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 13: 40, 15: [1, 20], 17: 39 }, { 20: 42, 56: 41, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 45, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 48, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 42, 56: 49, 64: 43, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 50, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 51] }, { 72: [1, 35], 86: 52 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 53, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 54, 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 55, 47: [2, 54] }, { 28: 60, 43: 61, 44: [1, 59], 47: [2, 56] }, { 13: 63, 15: [1, 20], 18: [1, 62] }, { 15: [2, 48], 18: [2, 48] }, { 33: [2, 86], 57: 64, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 65, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 66, 47: [1, 67] }, { 30: 68, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 69, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 70, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 71, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 75, 33: [2, 80], 50: 72, 63: 73, 64: 76, 65: [1, 44], 69: 74, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 80] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 51] }, { 20: 75, 53: 81, 54: [2, 84], 63: 82, 64: 76, 65: [1, 44], 69: 83, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 84, 47: [1, 67] }, { 47: [2, 55] }, { 4: 85, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 86, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 87, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 88, 47: [1, 67] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 75, 33: [2, 88], 58: 89, 63: 90, 64: 76, 65: [1, 44], 69: 91, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 92, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 93, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 31: 94, 33: [2, 60], 63: 95, 64: 76, 65: [1, 44], 69: 96, 70: 77, 71: 78, 72: [1, 79], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 66], 36: 97, 63: 98, 64: 76, 65: [1, 44], 69: 99, 70: 77, 71: 78, 72: [1, 79], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 22: 100, 23: [2, 52], 63: 101, 64: 76, 65: [1, 44], 69: 102, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 75, 33: [2, 92], 62: 103, 63: 104, 64: 76, 65: [1, 44], 69: 105, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 106] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 107, 72: [1, 108], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 109], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 110] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 56, 39: [1, 58], 43: 57, 44: [1, 59], 45: 112, 46: 111, 47: [2, 76] }, { 33: [2, 70], 40: 113, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 114] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 75, 63: 116, 64: 76, 65: [1, 44], 67: 115, 68: [2, 96], 69: 117, 70: 77, 71: 78, 72: [1, 79], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 118] }, { 32: 119, 33: [2, 62], 74: 120, 75: [1, 121] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 122, 74: 123, 75: [1, 121] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 124] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 125] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 109] }, { 20: 75, 63: 126, 64: 76, 65: [1, 44], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 75, 33: [2, 72], 41: 127, 63: 128, 64: 76, 65: [1, 44], 69: 129, 70: 77, 71: 78, 72: [1, 79], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 130] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 131] }, { 33: [2, 63] }, { 72: [1, 133], 76: 132 }, { 33: [1, 134] }, { 33: [2, 69] }, { 15: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 135, 74: 136, 75: [1, 121] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 138], 77: [1, 137] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 139] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
        defaultActions: { 4: [2, 1], 55: [2, 55], 57: [2, 20], 61: [2, 57], 74: [2, 81], 83: [2, 85], 87: [2, 18], 91: [2, 89], 102: [2, 53], 105: [2, 93], 111: [2, 19], 112: [2, 77], 117: [2, 97], 120: [2, 63], 123: [2, 69], 124: [2, 12], 136: [2, 75], 137: [2, 32] },
        parseError: function parseError(str, hash) {
            throw new Error(str);
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = "",
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            this.lexer.setInput(input);
            this.lexer.yy = this.yy;
            this.yy.lexer = this.lexer;
            this.yy.parser = this;
            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
            var yyloc = this.lexer.yylloc;
            lstack.push(yyloc);
            var ranges = this.lexer.options && this.lexer.options.ranges;
            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = self.lexer.lex() || 1;
                if (typeof token !== "number") {
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == "undefined") {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === "undefined" || !action.length || !action[0]) {
                    var errStr = "";
                    if (!recovering) {
                        expected = [];
                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
                            expected.push("'" + this.terminals_[p] + "'");
                        }
                        if (this.lexer.showPosition) {
                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                        } else {
                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                        }
                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
                    }
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            if (recovering > 0) recovering--;
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                        if (typeof r !== "undefined") {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        }
    };
    /* Jison generated lexer */
    var lexer = (function () {
        var lexer = { EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },
            setInput: function setInput(input) {
                this._input = input;
                this._more = this._less = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
                if (this.options.ranges) this.yylloc.range = [0, 0];
                this.offset = 0;
                return this;
            },
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) this.yylloc.range[1]++;

                this._input = this._input.slice(1);
                return ch;
            },
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) this.yylineno -= lines.length - 1;
                var r = this.yylloc.range;

                this.yylloc = { first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                return this;
            },
            more: function more() {
                this._more = true;
                return this;
            },
            less: function less(n) {
                this.unput(this.match.slice(n));
            },
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) this.done = true;

                var token, match, tempMatch, index, col, lines;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (!this.options.flex) break;
                    }
                }
                if (match) {
                    lines = match[0].match(/(?:\r\n?|\n).*/g);
                    if (lines) this.yylineno += lines.length;
                    this.yylloc = { first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
                    this.yytext += match[0];
                    this.match += match[0];
                    this.matches = match;
                    this.yyleng = this.yytext.length;
                    if (this.options.ranges) {
                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
                    }
                    this._more = false;
                    this._input = this._input.slice(match[0].length);
                    this.matched += match[0];
                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                    if (this.done && this._input) this.done = false;
                    if (token) return token;else return;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
                }
            },
            lex: function lex() {
                var r = this.next();
                if (typeof r !== 'undefined') {
                    return r;
                } else {
                    return this.lex();
                }
            },
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            popState: function popState() {
                return this.conditionStack.pop();
            },
            _currentRules: function _currentRules() {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            },
            topState: function topState() {
                return this.conditionStack[this.conditionStack.length - 2];
            },
            pushState: function begin(condition) {
                this.begin(condition);
            } };
        lexer.options = {};
        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START
        /**/) {

            function strip(start, end) {
                return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
            }

            var YYSTATE = YY_START;
            switch ($avoiding_name_collisions) {
                case 0:
                    if (yy_.yytext.slice(-2) === "\\\\") {
                        strip(0, 1);
                        this.begin("mu");
                    } else if (yy_.yytext.slice(-1) === "\\") {
                        strip(0, 1);
                        this.begin("emu");
                    } else {
                        this.begin("mu");
                    }
                    if (yy_.yytext) return 15;

                    break;
                case 1:
                    return 15;
                    break;
                case 2:
                    this.popState();
                    return 15;

                    break;
                case 3:
                    this.begin('raw');return 15;
                    break;
                case 4:
                    this.popState();
                    // Should be using `this.topState()` below, but it currently
                    // returns the second top instead of the first top. Opened an
                    // issue about it at https://github.com/zaach/jison/issues/291
                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
                        return 15;
                    } else {
                        yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
                        return 'END_RAW_BLOCK';
                    }

                    break;
                case 5:
                    return 15;
                    break;
                case 6:
                    this.popState();
                    return 14;

                    break;
                case 7:
                    return 65;
                    break;
                case 8:
                    return 68;
                    break;
                case 9:
                    return 19;
                    break;
                case 10:
                    this.popState();
                    this.begin('raw');
                    return 23;

                    break;
                case 11:
                    return 55;
                    break;
                case 12:
                    return 60;
                    break;
                case 13:
                    return 29;
                    break;
                case 14:
                    return 47;
                    break;
                case 15:
                    this.popState();return 44;
                    break;
                case 16:
                    this.popState();return 44;
                    break;
                case 17:
                    return 34;
                    break;
                case 18:
                    return 39;
                    break;
                case 19:
                    return 51;
                    break;
                case 20:
                    return 48;
                    break;
                case 21:
                    this.unput(yy_.yytext);
                    this.popState();
                    this.begin('com');

                    break;
                case 22:
                    this.popState();
                    return 14;

                    break;
                case 23:
                    return 48;
                    break;
                case 24:
                    return 73;
                    break;
                case 25:
                    return 72;
                    break;
                case 26:
                    return 72;
                    break;
                case 27:
                    return 87;
                    break;
                case 28:
                    // ignore whitespace
                    break;
                case 29:
                    this.popState();return 54;
                    break;
                case 30:
                    this.popState();return 33;
                    break;
                case 31:
                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
                    break;
                case 32:
                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
                    break;
                case 33:
                    return 85;
                    break;
                case 34:
                    return 82;
                    break;
                case 35:
                    return 82;
                    break;
                case 36:
                    return 83;
                    break;
                case 37:
                    return 84;
                    break;
                case 38:
                    return 81;
                    break;
                case 39:
                    return 75;
                    break;
                case 40:
                    return 77;
                    break;
                case 41:
                    return 72;
                    break;
                case 42:
                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
                    break;
                case 43:
                    return 'INVALID';
                    break;
                case 44:
                    return 5;
                    break;
            }
        };
        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
})();exports.__esModule = true;
exports['default'] = handlebars;


},{}],14:[function(require,module,exports){
/* eslint-disable new-cap */
'use strict';

exports.__esModule = true;
exports.print = print;
exports.PrintVisitor = PrintVisitor;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _visitor = require('./visitor');

var _visitor2 = _interopRequireDefault(_visitor);

function print(ast) {
  return new PrintVisitor().accept(ast);
}

function PrintVisitor() {
  this.padding = 0;
}

PrintVisitor.prototype = new _visitor2['default']();

PrintVisitor.prototype.pad = function (string) {
  var out = '';

  for (var i = 0, l = this.padding; i < l; i++) {
    out += '  ';
  }

  out += string + '\n';
  return out;
};

PrintVisitor.prototype.Program = function (program) {
  var out = '',
      body = program.body,
      i = undefined,
      l = undefined;

  if (program.blockParams) {
    var blockParams = 'BLOCK PARAMS: [';
    for (i = 0, l = program.blockParams.length; i < l; i++) {
      blockParams += ' ' + program.blockParams[i];
    }
    blockParams += ' ]';
    out += this.pad(blockParams);
  }

  for (i = 0, l = body.length; i < l; i++) {
    out += this.accept(body[i]);
  }

  this.padding--;

  return out;
};

PrintVisitor.prototype.MustacheStatement = function (mustache) {
  return this.pad('{{ ' + this.SubExpression(mustache) + ' }}');
};
PrintVisitor.prototype.Decorator = function (mustache) {
  return this.pad('{{ DIRECTIVE ' + this.SubExpression(mustache) + ' }}');
};

PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function (block) {
  var out = '';

  out += this.pad((block.type === 'DecoratorBlock' ? 'DIRECTIVE ' : '') + 'BLOCK:');
  this.padding++;
  out += this.pad(this.SubExpression(block));
  if (block.program) {
    out += this.pad('PROGRAM:');
    this.padding++;
    out += this.accept(block.program);
    this.padding--;
  }
  if (block.inverse) {
    if (block.program) {
      this.padding++;
    }
    out += this.pad('{{^}}');
    this.padding++;
    out += this.accept(block.inverse);
    this.padding--;
    if (block.program) {
      this.padding--;
    }
  }
  this.padding--;

  return out;
};

PrintVisitor.prototype.PartialStatement = function (partial) {
  var content = 'PARTIAL:' + partial.name.original;
  if (partial.params[0]) {
    content += ' ' + this.accept(partial.params[0]);
  }
  if (partial.hash) {
    content += ' ' + this.accept(partial.hash);
  }
  return this.pad('{{> ' + content + ' }}');
};
PrintVisitor.prototype.PartialBlockStatement = function (partial) {
  var content = 'PARTIAL BLOCK:' + partial.name.original;
  if (partial.params[0]) {
    content += ' ' + this.accept(partial.params[0]);
  }
  if (partial.hash) {
    content += ' ' + this.accept(partial.hash);
  }

  content += ' ' + this.pad('PROGRAM:');
  this.padding++;
  content += this.accept(partial.program);
  this.padding--;

  return this.pad('{{> ' + content + ' }}');
};

PrintVisitor.prototype.ContentStatement = function (content) {
  return this.pad("CONTENT[ '" + content.value + "' ]");
};

PrintVisitor.prototype.CommentStatement = function (comment) {
  return this.pad("{{! '" + comment.value + "' }}");
};

PrintVisitor.prototype.SubExpression = function (sexpr) {
  var params = sexpr.params,
      paramStrings = [],
      hash = undefined;

  for (var i = 0, l = params.length; i < l; i++) {
    paramStrings.push(this.accept(params[i]));
  }

  params = '[' + paramStrings.join(', ') + ']';

  hash = sexpr.hash ? ' ' + this.accept(sexpr.hash) : '';

  return this.accept(sexpr.path) + ' ' + params + hash;
};

PrintVisitor.prototype.PathExpression = function (id) {
  var path = id.parts.join('/');
  return (id.data ? '@' : '') + 'PATH:' + path;
};

PrintVisitor.prototype.StringLiteral = function (string) {
  return '"' + string.value + '"';
};

PrintVisitor.prototype.NumberLiteral = function (number) {
  return 'NUMBER{' + number.value + '}';
};

PrintVisitor.prototype.BooleanLiteral = function (bool) {
  return 'BOOLEAN{' + bool.value + '}';
};

PrintVisitor.prototype.UndefinedLiteral = function () {
  return 'UNDEFINED';
};

PrintVisitor.prototype.NullLiteral = function () {
  return 'NULL';
};

PrintVisitor.prototype.Hash = function (hash) {
  var pairs = hash.pairs,
      joinedPairs = [];

  for (var i = 0, l = pairs.length; i < l; i++) {
    joinedPairs.push(this.accept(pairs[i]));
  }

  return 'HASH{' + joinedPairs.join(', ') + '}';
};
PrintVisitor.prototype.HashPair = function (pair) {
  return pair.key + '=' + this.accept(pair.value);
};
/* eslint-enable new-cap */


},{"./visitor":15}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

function Visitor() {
  this.parents = [];
}

Visitor.prototype = {
  constructor: Visitor,
  mutating: false,

  // Visits a given value. If mutating, will replace the value if necessary.
  acceptKey: function acceptKey(node, name) {
    var value = this.accept(node[name]);
    if (this.mutating) {
      // Hacky sanity check: This may have a few false positives for type for the helper
      // methods but will generally do the right thing without a lot of overhead.
      if (value && !Visitor.prototype[value.type]) {
        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
      }
      node[name] = value;
    }
  },

  // Performs an accept operation with added sanity check to ensure
  // required keys are not removed.
  acceptRequired: function acceptRequired(node, name) {
    this.acceptKey(node, name);

    if (!node[name]) {
      throw new _exception2['default'](node.type + ' requires ' + name);
    }
  },

  // Traverses a given array. If mutating, empty respnses will be removed
  // for child elements.
  acceptArray: function acceptArray(array) {
    for (var i = 0, l = array.length; i < l; i++) {
      this.acceptKey(array, i);

      if (!array[i]) {
        array.splice(i, 1);
        i--;
        l--;
      }
    }
  },

  accept: function accept(object) {
    if (!object) {
      return;
    }

    /* istanbul ignore next: Sanity code */
    if (!this[object.type]) {
      throw new _exception2['default']('Unknown type: ' + object.type, object);
    }

    if (this.current) {
      this.parents.unshift(this.current);
    }
    this.current = object;

    var ret = this[object.type](object);

    this.current = this.parents.shift();

    if (!this.mutating || ret) {
      return ret;
    } else if (ret !== false) {
      return object;
    }
  },

  Program: function Program(program) {
    this.acceptArray(program.body);
  },

  MustacheStatement: visitSubExpression,
  Decorator: visitSubExpression,

  BlockStatement: visitBlock,
  DecoratorBlock: visitBlock,

  PartialStatement: visitPartial,
  PartialBlockStatement: function PartialBlockStatement(partial) {
    visitPartial.call(this, partial);

    this.acceptKey(partial, 'program');
  },

  ContentStatement: function ContentStatement() /* content */{},
  CommentStatement: function CommentStatement() /* comment */{},

  SubExpression: visitSubExpression,

  PathExpression: function PathExpression() /* path */{},

  StringLiteral: function StringLiteral() /* string */{},
  NumberLiteral: function NumberLiteral() /* number */{},
  BooleanLiteral: function BooleanLiteral() /* bool */{},
  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
  NullLiteral: function NullLiteral() /* literal */{},

  Hash: function Hash(hash) {
    this.acceptArray(hash.pairs);
  },
  HashPair: function HashPair(pair) {
    this.acceptRequired(pair, 'value');
  }
};

function visitSubExpression(mustache) {
  this.acceptRequired(mustache, 'path');
  this.acceptArray(mustache.params);
  this.acceptKey(mustache, 'hash');
}
function visitBlock(block) {
  visitSubExpression.call(this, block);

  this.acceptKey(block, 'program');
  this.acceptKey(block, 'inverse');
}
function visitPartial(partial) {
  this.acceptRequired(partial, 'name');
  this.acceptArray(partial.params);
  this.acceptKey(partial, 'hash');
}

exports['default'] = Visitor;
module.exports = exports['default'];


},{"../exception":19}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _visitor = require('./visitor');

var _visitor2 = _interopRequireDefault(_visitor);

function WhitespaceControl() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  this.options = options;
}
WhitespaceControl.prototype = new _visitor2['default']();

WhitespaceControl.prototype.Program = function (program) {
  var doStandalone = !this.options.ignoreStandalone;

  var isRoot = !this.isRootSeen;
  this.isRootSeen = true;

  var body = program.body;
  for (var i = 0, l = body.length; i < l; i++) {
    var current = body[i],
        strip = this.accept(current);

    if (!strip) {
      continue;
    }

    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
        openStandalone = strip.openStandalone && _isPrevWhitespace,
        closeStandalone = strip.closeStandalone && _isNextWhitespace,
        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

    if (strip.close) {
      omitRight(body, i, true);
    }
    if (strip.open) {
      omitLeft(body, i, true);
    }

    if (doStandalone && inlineStandalone) {
      omitRight(body, i);

      if (omitLeft(body, i)) {
        // If we are on a standalone node, save the indent info for partials
        if (current.type === 'PartialStatement') {
          // Pull out the whitespace from the final line
          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
        }
      }
    }
    if (doStandalone && openStandalone) {
      omitRight((current.program || current.inverse).body);

      // Strip out the previous content node if it's whitespace only
      omitLeft(body, i);
    }
    if (doStandalone && closeStandalone) {
      // Always strip the next node
      omitRight(body, i);

      omitLeft((current.inverse || current.program).body);
    }
  }

  return program;
};

WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
  this.accept(block.program);
  this.accept(block.inverse);

  // Find the inverse program that is involed with whitespace stripping.
  var program = block.program || block.inverse,
      inverse = block.program && block.inverse,
      firstInverse = inverse,
      lastInverse = inverse;

  if (inverse && inverse.chained) {
    firstInverse = inverse.body[0].program;

    // Walk the inverse chain to find the last inverse that is actually in the chain.
    while (lastInverse.chained) {
      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
    }
  }

  var strip = {
    open: block.openStrip.open,
    close: block.closeStrip.close,

    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
    // so our parent can determine if we actually are standalone
    openStandalone: isNextWhitespace(program.body),
    closeStandalone: isPrevWhitespace((firstInverse || program).body)
  };

  if (block.openStrip.close) {
    omitRight(program.body, null, true);
  }

  if (inverse) {
    var inverseStrip = block.inverseStrip;

    if (inverseStrip.open) {
      omitLeft(program.body, null, true);
    }

    if (inverseStrip.close) {
      omitRight(firstInverse.body, null, true);
    }
    if (block.closeStrip.open) {
      omitLeft(lastInverse.body, null, true);
    }

    // Find standalone else statments
    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
      omitLeft(program.body);
      omitRight(firstInverse.body);
    }
  } else if (block.closeStrip.open) {
    omitLeft(program.body, null, true);
  }

  return strip;
};

WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
  return mustache.strip;
};

WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
  /* istanbul ignore next */
  var strip = node.strip || {};
  return {
    inlineStandalone: true,
    open: strip.open,
    close: strip.close
  };
};

function isPrevWhitespace(body, i, isRoot) {
  if (i === undefined) {
    i = body.length;
  }

  // Nodes that end with newlines are considered whitespace (but are special
  // cased for strip operations)
  var prev = body[i - 1],
      sibling = body[i - 2];
  if (!prev) {
    return isRoot;
  }

  if (prev.type === 'ContentStatement') {
    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
  }
}
function isNextWhitespace(body, i, isRoot) {
  if (i === undefined) {
    i = -1;
  }

  var next = body[i + 1],
      sibling = body[i + 2];
  if (!next) {
    return isRoot;
  }

  if (next.type === 'ContentStatement') {
    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
  }
}

// Marks the node to the right of the position as omitted.
// I.e. {{foo}}' ' will mark the ' ' node as omitted.
//
// If i is undefined, then the first child will be marked as such.
//
// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
// content is met.
function omitRight(body, i, multiple) {
  var current = body[i == null ? 0 : i + 1];
  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
    return;
  }

  var original = current.value;
  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
  current.rightStripped = current.value !== original;
}

// Marks the node to the left of the position as omitted.
// I.e. ' '{{foo}} will mark the ' ' node as omitted.
//
// If i is undefined then the last child will be marked as such.
//
// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
// content is met.
function omitLeft(body, i, multiple) {
  var current = body[i == null ? body.length - 1 : i - 1];
  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
    return;
  }

  // We omit the last node if it's whitespace only and not preceeded by a non-content node.
  var original = current.value;
  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
  current.leftStripped = current.value !== original;
  return current.leftStripped;
}

exports['default'] = WhitespaceControl;
module.exports = exports['default'];


},{"./visitor":15}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":18}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];


},{"../utils":32}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  if (loc) {
    this.lineNumber = line;
    this.column = column;
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}


},{"./helpers/block-helper-missing":21,"./helpers/each":22,"./helpers/helper-missing":23,"./helpers/if":24,"./helpers/log":25,"./helpers/lookup":26,"./helpers/with":27}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];


},{"../utils":32}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];


},{"../exception":19,"../utils":32}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];


},{"../exception":19}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];


},{"../utils":32}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];


},{}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];


},{}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];


},{"../utils":32}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];


},{"./utils":32}],29:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context !== depths[0]) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    options.data = _base.createFrame(options.data);
    partialBlock = options.data['partial-block'] = options.fn;

    if (partialBlock.partials) {
      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
    }
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}


},{"./base":6,"./exception":19,"./utils":32}],31:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}


},{}],33:[function(require,module,exports){
// USAGE:
// var handlebars = require('handlebars');
/* eslint-disable no-var */

// var local = handlebars.create();

var handlebars = require('../dist/cjs/handlebars')['default'];

var printer = require('../dist/cjs/handlebars/compiler/printer');
handlebars.PrintVisitor = printer.PrintVisitor;
handlebars.print = printer.print;

module.exports = handlebars;

// Publish a Node.js require() handler for .handlebars and .hbs files
function extension(module, filename) {
  var fs = require('fs');
  var templateString = fs.readFileSync(filename, 'utf8');
  module.exports = handlebars.compile(templateString);
}
/* istanbul ignore else */
if (typeof require !== 'undefined' && require.extensions) {
  require.extensions['.handlebars'] = extension;
  require.extensions['.hbs'] = extension;
}

},{"../dist/cjs/handlebars":4,"../dist/cjs/handlebars/compiler/printer":14,"fs":3}],34:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  var Instafeed;

  Instafeed = (function() {
    function Instafeed(params, context) {
      var option, value;
      this.options = {
        target: 'instafeed',
        get: 'popular',
        resolution: 'thumbnail',
        sortBy: 'none',
        links: true,
        mock: false,
        useHttp: false
      };
      if (typeof params === 'object') {
        for (option in params) {
          value = params[option];
          this.options[option] = value;
        }
      }
      this.context = context != null ? context : this;
      this.unique = this._genKey();
    }

    Instafeed.prototype.hasNext = function() {
      return typeof this.context.nextUrl === 'string' && this.context.nextUrl.length > 0;
    };

    Instafeed.prototype.next = function() {
      if (!this.hasNext()) {
        return false;
      }
      return this.run(this.context.nextUrl);
    };

    Instafeed.prototype.run = function(url) {
      var header, instanceName, script;
      if (typeof this.options.clientId !== 'string') {
        if (typeof this.options.accessToken !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if (typeof this.options.accessToken !== 'string') {
        if (typeof this.options.clientId !== 'string') {
          throw new Error("Missing clientId or accessToken.");
        }
      }
      if ((this.options.before != null) && typeof this.options.before === 'function') {
        this.options.before.call(this);
      }
      if (typeof document !== "undefined" && document !== null) {
        script = document.createElement('script');
        script.id = 'instafeed-fetcher';
        script.src = url || this._buildUrl();
        header = document.getElementsByTagName('head');
        header[0].appendChild(script);
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = new Instafeed(this.options, this);
        window[instanceName].unique = this.unique;
      }
      return true;
    };

    Instafeed.prototype.parse = function(response) {
      var anchor, childNodeCount, childNodeIndex, childNodesArr, e, eMsg, fragment, header, htmlString, httpProtocol, i, image, imageObj, imageString, imageUrl, images, img, imgHeight, imgOrient, imgUrl, imgWidth, instanceName, j, k, len, len1, len2, node, parsedLimit, reverse, sortSettings, targetEl, tmpEl;
      if (typeof response !== 'object') {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'Invalid JSON data');
          return false;
        } else {
          throw new Error('Invalid JSON response');
        }
      }
      if (response.meta.code !== 200) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, response.meta.error_message);
          return false;
        } else {
          throw new Error("Error from Instagram: " + response.meta.error_message);
        }
      }
      if (response.data.length === 0) {
        if ((this.options.error != null) && typeof this.options.error === 'function') {
          this.options.error.call(this, 'No images were returned from Instagram');
          return false;
        } else {
          throw new Error('No images were returned from Instagram');
        }
      }
      if ((this.options.success != null) && typeof this.options.success === 'function') {
        this.options.success.call(this, response);
      }
      this.context.nextUrl = '';
      if (response.pagination != null) {
        this.context.nextUrl = response.pagination.next_url;
      }
      if (this.options.sortBy !== 'none') {
        if (this.options.sortBy === 'random') {
          sortSettings = ['', 'random'];
        } else {
          sortSettings = this.options.sortBy.split('-');
        }
        reverse = sortSettings[0] === 'least' ? true : false;
        switch (sortSettings[1]) {
          case 'random':
            response.data.sort(function() {
              return 0.5 - Math.random();
            });
            break;
          case 'recent':
            response.data = this._sortBy(response.data, 'created_time', reverse);
            break;
          case 'liked':
            response.data = this._sortBy(response.data, 'likes.count', reverse);
            break;
          case 'commented':
            response.data = this._sortBy(response.data, 'comments.count', reverse);
            break;
          default:
            throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
        }
      }
      if ((typeof document !== "undefined" && document !== null) && this.options.mock === false) {
        images = response.data;
        parsedLimit = parseInt(this.options.limit, 10);
        if ((this.options.limit != null) && images.length > parsedLimit) {
          images = images.slice(0, parsedLimit);
        }
        fragment = document.createDocumentFragment();
        if ((this.options.filter != null) && typeof this.options.filter === 'function') {
          images = this._filter(images, this.options.filter);
        }
        if ((this.options.template != null) && typeof this.options.template === 'string') {
          htmlString = '';
          imageString = '';
          imgUrl = '';
          tmpEl = document.createElement('div');
          for (i = 0, len = images.length; i < len; i++) {
            image = images[i];
            imageObj = image.images[this.options.resolution];
            if (typeof imageObj !== 'object') {
              eMsg = "No image found for resolution: " + this.options.resolution + ".";
              throw new Error(eMsg);
            }
            imgWidth = imageObj.width;
            imgHeight = imageObj.height;
            imgOrient = "square";
            if (imgWidth > imgHeight) {
              imgOrient = "landscape";
            }
            if (imgWidth < imgHeight) {
              imgOrient = "portrait";
            }
            imageUrl = imageObj.url;
            httpProtocol = window.location.protocol.indexOf("http") >= 0;
            if (httpProtocol && !this.options.useHttp) {
              imageUrl = imageUrl.replace(/https?:\/\//, '//');
            }
            imageString = this._makeTemplate(this.options.template, {
              model: image,
              id: image.id,
              link: image.link,
              type: image.type,
              image: imageUrl,
              width: imgWidth,
              height: imgHeight,
              orientation: imgOrient,
              caption: this._getObjectProperty(image, 'caption.text'),
              likes: image.likes.count,
              comments: image.comments.count,
              location: this._getObjectProperty(image, 'location.name')
            });
            htmlString += imageString;
          }
          tmpEl.innerHTML = htmlString;
          childNodesArr = [];
          childNodeIndex = 0;
          childNodeCount = tmpEl.childNodes.length;
          while (childNodeIndex < childNodeCount) {
            childNodesArr.push(tmpEl.childNodes[childNodeIndex]);
            childNodeIndex += 1;
          }
          for (j = 0, len1 = childNodesArr.length; j < len1; j++) {
            node = childNodesArr[j];
            fragment.appendChild(node);
          }
        } else {
          for (k = 0, len2 = images.length; k < len2; k++) {
            image = images[k];
            img = document.createElement('img');
            imageObj = image.images[this.options.resolution];
            if (typeof imageObj !== 'object') {
              eMsg = "No image found for resolution: " + this.options.resolution + ".";
              throw new Error(eMsg);
            }
            imageUrl = imageObj.url;
            httpProtocol = window.location.protocol.indexOf("http") >= 0;
            if (httpProtocol && !this.options.useHttp) {
              imageUrl = imageUrl.replace(/https?:\/\//, '//');
            }
            img.src = imageUrl;
            if (this.options.links === true) {
              anchor = document.createElement('a');
              anchor.href = image.link;
              anchor.appendChild(img);
              fragment.appendChild(anchor);
            } else {
              fragment.appendChild(img);
            }
          }
        }
        targetEl = this.options.target;
        if (typeof targetEl === 'string') {
          targetEl = document.getElementById(targetEl);
        }
        if (targetEl == null) {
          eMsg = "No element with id=\"" + this.options.target + "\" on page.";
          throw new Error(eMsg);
        }
        targetEl.appendChild(fragment);
        header = document.getElementsByTagName('head')[0];
        header.removeChild(document.getElementById('instafeed-fetcher'));
        instanceName = "instafeedCache" + this.unique;
        window[instanceName] = void 0;
        try {
          delete window[instanceName];
        } catch (_error) {
          e = _error;
        }
      }
      if ((this.options.after != null) && typeof this.options.after === 'function') {
        this.options.after.call(this);
      }
      return true;
    };

    Instafeed.prototype._buildUrl = function() {
      var base, endpoint, final;
      base = "https://api.instagram.com/v1";
      switch (this.options.get) {
        case "popular":
          endpoint = "media/popular";
          break;
        case "tagged":
          if (!this.options.tagName) {
            throw new Error("No tag name specified. Use the 'tagName' option.");
          }
          endpoint = "tags/" + this.options.tagName + "/media/recent";
          break;
        case "location":
          if (!this.options.locationId) {
            throw new Error("No location specified. Use the 'locationId' option.");
          }
          endpoint = "locations/" + this.options.locationId + "/media/recent";
          break;
        case "user":
          if (!this.options.userId) {
            throw new Error("No user specified. Use the 'userId' option.");
          }
          endpoint = "users/" + this.options.userId + "/media/recent";
          break;
        default:
          throw new Error("Invalid option for get: '" + this.options.get + "'.");
      }
      final = base + "/" + endpoint;
      if (this.options.accessToken != null) {
        final += "?access_token=" + this.options.accessToken;
      } else {
        final += "?client_id=" + this.options.clientId;
      }
      if (this.options.limit != null) {
        final += "&count=" + this.options.limit;
      }
      final += "&callback=instafeedCache" + this.unique + ".parse";
      return final;
    };

    Instafeed.prototype._genKey = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return "" + (S4()) + (S4()) + (S4()) + (S4());
    };

    Instafeed.prototype._makeTemplate = function(template, data) {
      var output, pattern, ref, varName, varValue;
      pattern = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/;
      output = template;
      while (pattern.test(output)) {
        varName = output.match(pattern)[1];
        varValue = (ref = this._getObjectProperty(data, varName)) != null ? ref : '';
        output = output.replace(pattern, function() {
          return "" + varValue;
        });
      }
      return output;
    };

    Instafeed.prototype._getObjectProperty = function(object, property) {
      var piece, pieces;
      property = property.replace(/\[(\w+)\]/g, '.$1');
      pieces = property.split('.');
      while (pieces.length) {
        piece = pieces.shift();
        if ((object != null) && piece in object) {
          object = object[piece];
        } else {
          return null;
        }
      }
      return object;
    };

    Instafeed.prototype._sortBy = function(data, property, reverse) {
      var sorter;
      sorter = function(a, b) {
        var valueA, valueB;
        valueA = this._getObjectProperty(a, property);
        valueB = this._getObjectProperty(b, property);
        if (reverse) {
          if (valueA > valueB) {
            return 1;
          } else {
            return -1;
          }
        }
        if (valueA < valueB) {
          return 1;
        } else {
          return -1;
        }
      };
      data.sort(sorter.bind(this));
      return data;
    };

    Instafeed.prototype._filter = function(images, filter) {
      var filteredImages, fn, i, image, len;
      filteredImages = [];
      fn = function(image) {
        if (filter(image)) {
          return filteredImages.push(image);
        }
      };
      for (i = 0, len = images.length; i < len; i++) {
        image = images[i];
        fn(image);
      }
      return filteredImages;
    };

    return Instafeed;

  })();

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      return module.exports = factory();
    } else {
      return root.Instafeed = factory();
    }
  })(this, function() {
    return Instafeed;
  });

}).call(this);

},{}],35:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":36}],36:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],37:[function(require,module,exports){
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = require('./source-map/source-map-generator').SourceMapGenerator;
exports.SourceMapConsumer = require('./source-map/source-map-consumer').SourceMapConsumer;
exports.SourceNode = require('./source-map/source-node').SourceNode;

},{"./source-map/source-map-consumer":44,"./source-map/source-map-generator":45,"./source-map/source-node":46}],38:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = {};
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };

  /**
   * Return how many unique items are in this ArraySet. If duplicates have been
   * added, than those do not count towards the size.
   *
   * @returns Number
   */
  ArraySet.prototype.size = function ArraySet_size() {
    return Object.getOwnPropertyNames(this._set).length;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var isDuplicate = this.has(aStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set[util.toSetString(aStr)] = idx;
    }
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    return Object.prototype.hasOwnProperty.call(this._set,
                                                util.toSetString(aStr));
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (this.has(aStr)) {
      return this._set[util.toSetString(aStr)];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  exports.ArraySet = ArraySet;

});

},{"./util":47,"amdefine":2}],39:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64 = require('./base64');

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string via the out parameter.
   */
  exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (aIndex >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }

      digit = base64.decode(aStr.charCodeAt(aIndex++));
      if (digit === -1) {
        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      }

      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aIndex;
  };

});

},{"./base64":40,"amdefine":2}],40:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  exports.encode = function (number) {
    if (0 <= number && number < intToCharMap.length) {
      return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + aNumber);
  };

  /**
   * Decode a single base 64 character code digit to an integer. Returns -1 on
   * failure.
   */
  exports.decode = function (charCode) {
    var bigA = 65;     // 'A'
    var bigZ = 90;     // 'Z'

    var littleA = 97;  // 'a'
    var littleZ = 122; // 'z'

    var zero = 48;     // '0'
    var nine = 57;     // '9'

    var plus = 43;     // '+'
    var slash = 47;    // '/'

    var littleOffset = 26;
    var numberOffset = 52;

    // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
    if (bigA <= charCode && charCode <= bigZ) {
      return (charCode - bigA);
    }

    // 26 - 51: abcdefghijklmnopqrstuvwxyz
    if (littleA <= charCode && charCode <= littleZ) {
      return (charCode - littleA + littleOffset);
    }

    // 52 - 61: 0123456789
    if (zero <= charCode && charCode <= nine) {
      return (charCode - zero + numberOffset);
    }

    // 62: +
    if (charCode == plus) {
      return 62;
    }

    // 63: /
    if (charCode == slash) {
      return 63;
    }

    // Invalid base64 digit.
    return -1;
  };

});

},{"amdefine":2}],41:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  exports.GREATEST_LOWER_BOUND = 1;
  exports.LEAST_UPPER_BOUND = 2;

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the index of
    //      the next-closest element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element than the one we are searching for, so we return -1.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid], true);
    if (cmp === 0) {
      // Found the element we are looking for.
      return mid;
    }
    else if (cmp > 0) {
      // Our needle is greater than aHaystack[mid].
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
      }

      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (3) or (2) and return the appropriate thing.
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return aHigh < aHaystack.length ? aHigh : -1;
      } else {
        return mid;
      }
    }
    else {
      // Our needle is less than aHaystack[mid].
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
      }

      // we are in termination case (3) or (2) and return the appropriate thing.
      if (aBias == exports.LEAST_UPPER_BOUND) {
        return mid;
      } else {
        return aLow < 0 ? -1 : aLow;
      }
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the index of the closest element if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) {
      return -1;
    }

    var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                                aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) {
      return -1;
    }

    // We have found either the exact element, or the next-closest element than
    // the one we are searching for. However, there may be more than one such
    // element. Make sure we always return the smallest of these.
    while (index - 1 >= 0) {
      if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
        break;
      }
      --index;
    }

    return index;
  };

});

},{"amdefine":2}],42:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');

  /**
   * Determine whether mappingB is after mappingA with respect to generated
   * position.
   */
  function generatedPositionAfter(mappingA, mappingB) {
    // Optimized for most common case
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA ||
           util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }

  /**
   * A data structure to provide a sorted view of accumulated mappings in a
   * performance conscious manner. It trades a neglibable overhead in general
   * case for a large speedup in case of mappings being added in order.
   */
  function MappingList() {
    this._array = [];
    this._sorted = true;
    // Serves as infimum
    this._last = {generatedLine: -1, generatedColumn: 0};
  }

  /**
   * Iterate through internal items. This method takes the same arguments that
   * `Array.prototype.forEach` takes.
   *
   * NOTE: The order of the mappings is NOT guaranteed.
   */
  MappingList.prototype.unsortedForEach =
    function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };

  /**
   * Add the given source mapping.
   *
   * @param Object aMapping
   */
  MappingList.prototype.add = function MappingList_add(aMapping) {
    var mapping;
    if (generatedPositionAfter(this._last, aMapping)) {
      this._last = aMapping;
      this._array.push(aMapping);
    } else {
      this._sorted = false;
      this._array.push(aMapping);
    }
  };

  /**
   * Returns the flat, sorted array of mappings. The mappings are sorted by
   * generated position.
   *
   * WARNING: This method returns internal data without copying, for
   * performance. The return value must NOT be mutated, and should be treated as
   * an immutable borrow. If you want to take ownership, you must make your own
   * copy.
   */
  MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
      this._array.sort(util.compareByGeneratedPositionsInflated);
      this._sorted = true;
    }
    return this._array;
  };

  exports.MappingList = MappingList;

});

},{"./util":47,"amdefine":2}],43:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  // It turns out that some (most?) JavaScript engines don't self-host
  // `Array.prototype.sort`. This makes sense because C++ will likely remain
  // faster than JS when doing raw CPU-intensive sorting. However, when using a
  // custom comparator function, calling back and forth between the VM's C++ and
  // JIT'd JS is rather slow *and* loses JIT type information, resulting in
  // worse generated code for the comparator function than would be optimal. In
  // fact, when sorting with a comparator, these costs outweigh the benefits of
  // sorting in C++. By using our own JS-implemented Quick Sort (below), we get
  // a ~3500ms mean speed-up in `bench/bench.html`.

  /**
   * Swap the elements indexed by `x` and `y` in the array `ary`.
   *
   * @param {Array} ary
   *        The array.
   * @param {Number} x
   *        The index of the first item.
   * @param {Number} y
   *        The index of the second item.
   */
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y];
    ary[y] = temp;
  }

  /**
   * Returns a random integer within the range `low .. high` inclusive.
   *
   * @param {Number} low
   *        The lower bound on the range.
   * @param {Number} high
   *        The upper bound on the range.
   */
  function randomIntInRange(low, high) {
    return Math.round(low + (Math.random() * (high - low)));
  }

  /**
   * The Quick Sort algorithm.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   * @param {Number} p
   *        Start index of the array
   * @param {Number} r
   *        End index of the array
   */
  function doQuickSort(ary, comparator, p, r) {
    // If our lower bound is less than our upper bound, we (1) partition the
    // array into two pieces and (2) recurse on each half. If it is not, this is
    // the empty array and our base case.

    if (p < r) {
      // (1) Partitioning.
      //
      // The partitioning chooses a pivot between `p` and `r` and moves all
      // elements that are less than or equal to the pivot to the before it, and
      // all the elements that are greater than it after it. The effect is that
      // once partition is done, the pivot is in the exact place it will be when
      // the array is put in sorted order, and it will not need to be moved
      // again. This runs in O(n) time.

      // Always choose a random pivot so that an input array which is reverse
      // sorted does not cause O(n^2) running time.
      var pivotIndex = randomIntInRange(p, r);
      var i = p - 1;

      swap(ary, pivotIndex, r);
      var pivot = ary[r];

      // Immediately after `j` is incremented in this loop, the following hold
      // true:
      //
      //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
      //
      //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
      for (var j = p; j < r; j++) {
        if (comparator(ary[j], pivot) <= 0) {
          i += 1;
          swap(ary, i, j);
        }
      }

      swap(ary, i + 1, j);
      var q = i + 1;

      // (2) Recurse on each half.

      doQuickSort(ary, comparator, p, q - 1);
      doQuickSort(ary, comparator, q + 1, r);
    }
  }

  /**
   * Sort the given array in-place with the given comparator function.
   *
   * @param {Array} ary
   *        An array to sort.
   * @param {function} comparator
   *        Function to use to compare two items.
   */
  exports.quickSort = function (ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
  };

});

},{"amdefine":2}],44:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');
  var quickSort = require('./quick-sort').quickSort;

  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    return sourceMap.sections != null
      ? new IndexedSourceMapConsumer(sourceMap)
      : new BasicSourceMapConsumer(sourceMap);
  }

  SourceMapConsumer.fromSourceMap = function(aSourceMap) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
  }

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    get: function () {
      if (!this.__generatedMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__generatedMappings;
    }
  });

  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    get: function () {
      if (!this.__originalMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }

      return this.__originalMappings;
    }
  });

  SourceMapConsumer.prototype._charIsMappingSeparator =
    function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer.LEAST_UPPER_BOUND = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      var sourceRoot = this.sourceRoot;
      mappings.map(function (mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        if (source != null && sourceRoot != null) {
          source = util.join(sourceRoot, source);
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    };

  /**
   * Returns all generated line and column information for the original source,
   * line, and column provided. If no column is provided, returns all mappings
   * corresponding to a either the line we are searching for or the next
   * closest line that has any mappings. Otherwise, returns all mappings
   * corresponding to the given line and either the column we are searching for
   * or the next closest column that has any offsets.
   *
   * The only argument is an object with the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: Optional. the column number in the original source.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.allGeneratedPositionsFor =
    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, 'line');

      // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
      // returns the index of the closest mapping less than the needle. By
      // setting needle.originalColumn to 0, we thus find the last mapping for
      // the given line, provided such a mapping exists.
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: line,
        originalColumn: util.getArg(aArgs, 'column', 0)
      };

      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source);
      }
      if (!this._sources.has(needle.source)) {
        return [];
      }
      needle.source = this._sources.indexOf(needle.source);

      var mappings = [];

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    "originalLine",
                                    "originalColumn",
                                    util.compareByOriginalPositions,
                                    binarySearch.LEAST_UPPER_BOUND);
      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (aArgs.column === undefined) {
          var originalLine = mapping.originalLine;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we found. Since
          // mappings are sorted, this is guaranteed to find all mappings for
          // the line we found.
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, 'generatedLine', null),
              column: util.getArg(mapping, 'generatedColumn', null),
              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;

          // Iterate until either we run out of mappings, or we run into
          // a mapping for a different line than the one we were searching for.
          // Since mappings are sorted, this is guaranteed to find all mappings for
          // the line we are searching for.
          while (mapping &&
                 mapping.originalLine === line &&
                 mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, 'generatedLine', null),
              column: util.getArg(mapping, 'generatedColumn', null),
              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
            });

            mapping = this._originalMappings[++index];
          }
        }
      }

      return mappings;
    };

  exports.SourceMapConsumer = SourceMapConsumer;

  /**
   * A BasicSourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function BasicSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    sources = sources.map(util.normalize);

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);

    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }

  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

  /**
   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns BasicSourceMapConsumer
   */
  BasicSourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap(aSourceMap) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);

      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot);
      smc.file = aSourceMap._file;

      // Because we are modifying the entries (by converting string sources and
      // names to indices into the sources and names ArraySets), we have to make
      // a copy of the entry or else bad things happen. Shared mutable state
      // strikes again! See github issue #191.

      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];

      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping;
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;

        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;

          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }

          destOriginalMappings.push(destMapping);
        }

        destGeneratedMappings.push(destMapping);
      }

      quickSort(smc.__originalMappings, util.compareByOriginalPositions);

      return smc;
    };

  /**
   * The version of the source mapping spec that we are consuming.
   */
  BasicSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
      }, this);
    }
  });

  /**
   * Provide the JIT with a nice shape / hidden class.
   */
  function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
  }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  BasicSourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;

      while (index < length) {
        if (aStr.charAt(index) === ';') {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        }
        else if (aStr.charAt(index) === ',') {
          index++;
        }
        else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;

          // Because each offset is encoded relative to the previous one,
          // many segments often have the same encoding. We can exploit this
          // fact by caching the parsed variable length fields of each segment,
          // allowing us to avoid a second parse if we encounter the same
          // segment again.
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);

          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }

            if (segment.length === 2) {
              throw new Error('Found a source, but no line and column');
            }

            if (segment.length === 3) {
              throw new Error('Found a source and line, but no column');
            }

            cachedSegments[str] = segment;
          }

          // Generated column.
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;

          if (segment.length > 1) {
            // Original source.
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];

            // Original line.
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;

            // Original column.
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;

            if (segment.length > 4) {
              // Original name.
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }

          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === 'number') {
            originalMappings.push(mapping);
          }
        }
      }

      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;

      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  BasicSourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator, aBias) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
  BasicSourceMapConsumer.prototype.computeColumnSpans =
    function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];

        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];

          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }

        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity;
      }
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  BasicSourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._generatedMappings[index];

        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, 'source', null);
          if (source !== null) {
            source = this._sources.at(source);
            if (this.sourceRoot != null) {
              source = util.join(this.sourceRoot, source);
            }
          }
          var name = util.getArg(mapping, 'name', null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source: source,
            line: util.getArg(mapping, 'originalLine', null),
            column: util.getArg(mapping, 'originalColumn', null),
            name: name
          };
        }
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
    function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() &&
        !this.sourcesContent.some(function (sc) { return sc == null; });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
  BasicSourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }

      if (this.sourceRoot != null) {
        aSource = util.relative(this.sourceRoot, aSource);
      }

      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)];
      }

      var url;
      if (this.sourceRoot != null
          && (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
        if (url.scheme == "file"
            && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == "/")
            && this._sources.has("/" + aSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
        }
      }

      // This function is used recursively from
      // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
      // don't want to throw if we can't find the source - we just want to
      // return null, so we provide a flag to exit gracefully.
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  BasicSourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, 'source');
      if (this.sourceRoot != null) {
        source = util.relative(this.sourceRoot, source);
      }
      if (!this._sources.has(source)) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      source = this._sources.indexOf(source);

      var needle = {
        source: source,
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
      );

      if (index >= 0) {
        var mapping = this._originalMappings[index];

        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          };
        }
      }

      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };

  exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

  /**
   * An IndexedSourceMapConsumer instance represents a parsed source map which
   * we can query for information. It differs from BasicSourceMapConsumer in
   * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
   * input.
   *
   * The only parameter is a raw source map (either as a JSON string, or already
   * parsed to an object). According to the spec for indexed source maps, they
   * have the following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - file: Optional. The generated file this source map is associated with.
   *   - sections: A list of section definitions.
   *
   * Each value under the "sections" field has two fields:
   *   - offset: The offset into the original specified at which this section
   *       begins to apply, defined as an object with a "line" and "column"
   *       field.
   *   - map: A source map definition. This source map could also be indexed,
   *       but doesn't have to be.
   *
   * Instead of the "map" field, it's also possible to have a "url" field
   * specifying a URL to retrieve a source map from, but that's currently
   * unsupported.
   *
   * Here's an example source map, taken from the source map spec[0], but
   * modified to omit a section which uses the "url" field.
   *
   *  {
   *    version : 3,
   *    file: "app.js",
   *    sections: [{
   *      offset: {line:100, column:10},
   *      map: {
   *        version : 3,
   *        file: "section.js",
   *        sources: ["foo.js", "bar.js"],
   *        names: ["src", "maps", "are", "fun"],
   *        mappings: "AAAA,E;;ABCDE;"
   *      }
   *    }],
   *  }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
   */
  function IndexedSourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sections = util.getArg(sourceMap, 'sections');

    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    this._sources = new ArraySet();
    this._names = new ArraySet();

    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map(function (s) {
      if (s.url) {
        // The url field will require support for asynchronicity.
        // See https://github.com/mozilla/source-map/issues/16
        throw new Error('Support for url field in sections not implemented.');
      }
      var offset = util.getArg(s, 'offset');
      var offsetLine = util.getArg(offset, 'line');
      var offsetColumn = util.getArg(offset, 'column');

      if (offsetLine < lastOffset.line ||
          (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
        throw new Error('Section offsets must be ordered and non-overlapping.');
      }
      lastOffset = offset;

      return {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util.getArg(s, 'map'))
      }
    });
  }

  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

  /**
   * The version of the source mapping spec that we are consuming.
   */
  IndexedSourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
    get: function () {
      var sources = [];
      for (var i = 0; i < this._sections.length; i++) {
        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      };
      return sources;
    }
  });

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  IndexedSourceMapConsumer.prototype.originalPositionFor =
    function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      // Find the section containing the generated position we're trying to map
      // to an original position.
      var sectionIndex = binarySearch.search(needle, this._sections,
        function(needle, section) {
          var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }

          return (needle.generatedColumn -
                  section.generatedOffset.generatedColumn);
        });
      var section = this._sections[sectionIndex];

      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }

      return section.consumer.originalPositionFor({
        line: needle.generatedLine -
          (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn -
          (section.generatedOffset.generatedLine === needle.generatedLine
           ? section.generatedOffset.generatedColumn - 1
           : 0),
        bias: aArgs.bias
      });
    };

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
    function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function (s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  IndexedSourceMapConsumer.prototype.sourceContentFor =
    function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      }
      else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  IndexedSourceMapConsumer.prototype.generatedPositionFor =
    function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];

        // Only consider this section if the requested source is in the list of
        // sources of the consumer.
        if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line +
              (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column +
              (section.generatedOffset.generatedLine === generatedPosition.line
               ? section.generatedOffset.generatedColumn - 1
               : 0)
          };
          return ret;
        }
      }

      return {
        line: null,
        column: null
      };
    };

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  IndexedSourceMapConsumer.prototype._parseMappings =
    function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[i];

          var source = section.consumer._sources.at(mapping.source);
          if (section.consumer.sourceRoot !== null) {
            source = util.join(section.consumer.sourceRoot, source);
          }
          this._sources.add(source);
          source = this._sources.indexOf(source);

          var name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);

          // The mappings coming from the consumer for the section have
          // generated positions relative to the start of the section, so we
          // need to offset them to be relative to the start of the concatenated
          // generated file.
          var adjustedMapping = {
            source: source,
            generatedLine: mapping.generatedLine +
              (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.column +
              (section.generatedOffset.generatedLine === mapping.generatedLine)
              ? section.generatedOffset.generatedColumn - 1
              : 0,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: name
          };

          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === 'number') {
            this.__originalMappings.push(adjustedMapping);
          }
        };
      };

      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };

  exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

});

},{"./array-set":38,"./base64-vlq":39,"./binary-search":41,"./quick-sort":43,"./util":47,"amdefine":2}],45:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;
  var MappingList = require('./mapping-list').MappingList;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util.getArg(aArgs, 'file', null);
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = new MappingList();
    this._sourcesContents = null;
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
  SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      });
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };

        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };

          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }

        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }

      if (source != null && !this._sources.has(source)) {
        this._sources.add(source);
      }

      if (name != null && !this._names.has(name)) {
        this._names.add(name);
      }

      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      });
    };

  /**
   * Set the source content for a source file.
   */
  SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }

      if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = {};
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
  SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      // Make "sourceFile" relative if an absolute Url is passed.
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet();
      var newNames = new ArraySet();

      // Find mappings for the "sourceFile"
      this._mappings.unsortedForEach(function (mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            // Copy mapping
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source)
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }

        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }

        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }

      }, this);
      this._sources = newSources;
      this._names = newNames;

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile);
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile);
          }
          this.setSourceContent(sourceFile, content);
        }
      }, this);
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;

      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            result += ',';
          }
        }

        result += base64VLQ.encode(mapping.generatedColumn
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;

        if (mapping.source != null) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
                                     - previousSource);
          previousSource = this._sources.indexOf(mapping.source);

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.originalLine - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;

          result += base64VLQ.encode(mapping.originalColumn
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;

          if (mapping.name != null) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name)
                                       - previousName);
            previousName = this._names.indexOf(mapping.name);
          }
        }
      }

      return result;
    };

  SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
                                                    key)
          ? this._sourcesContents[key]
          : null;
      }, this);
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }

      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };

  exports.SourceMapGenerator = SourceMapGenerator;

});

},{"./array-set":38,"./base64-vlq":39,"./mapping-list":42,"./util":47,"amdefine":2}],46:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
  var util = require('./util');

  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
  var REGEX_NEWLINE = /(\r?\n)/;

  // Newline character code for charCodeAt() comparisons
  var NEWLINE_CODE = 10;

  // Private symbol for identifying `SourceNode`s when multiple versions of
  // the source-map library are loaded. This MUST NOT CHANGE across
  // versions!
  var isSourceNode = "$$$isSourceNode$$$";

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
  SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode();

      // All even indices of this array are one line of the generated code,
      // while all odd indices are the newlines between two adjacent lines
      // (since `REGEX_NEWLINE` captures its match).
      // Processed fragments are removed from this array, by calling `shiftNextLine`.
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var shiftNextLine = function() {
        var lineContents = remainingLines.shift();
        // The last line of a file might not have a newline.
        var newLine = remainingLines.shift() || "";
        return lineContents + newLine;
      };

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null;

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            var code = "";
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[0];
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn);
            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            // No more remaining code, continue
            lastMapping = mapping;
            return;
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[0];
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[0] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      // We have processed all mappings.
      if (remainingLines.length > 0) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.join(""));
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });

      return node;

      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code);
        } else {
          var source = aRelativePath
            ? util.join(aRelativePath, mapping.source)
            : mapping.source;
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  source,
                                  code,
                                  mapping.name));
        }
      }
    };

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source,
                       line: this.line,
                       column: this.column,
                       name: this.name });
        }
      }
    }
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
  SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }

      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source !== null
          && original.line !== null
          && original.column !== null) {
        if(lastOriginalSource !== original.source
           || lastOriginalLine !== original.line
           || lastOriginalColumn !== original.column
           || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length; idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          // Mappings end at eol
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function (sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;

});

},{"./source-map-generator":45,"./util":47,"amdefine":2}],47:[function(require,module,exports){
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module, require);
}
define(function (require, exports, module) {

  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
  var dataUrlRegexp = /^data:.+\,.+$/;

  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    if (!match) {
      return null;
    }
    return {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    };
  }
  exports.urlParse = urlParse;

  function urlGenerate(aParsedUrl) {
    var url = '';
    if (aParsedUrl.scheme) {
      url += aParsedUrl.scheme + ':';
    }
    url += '//';
    if (aParsedUrl.auth) {
      url += aParsedUrl.auth + '@';
    }
    if (aParsedUrl.host) {
      url += aParsedUrl.host;
    }
    if (aParsedUrl.port) {
      url += ":" + aParsedUrl.port
    }
    if (aParsedUrl.path) {
      url += aParsedUrl.path;
    }
    return url;
  }
  exports.urlGenerate = urlGenerate;

  /**
   * Normalizes a path, or the path portion of a URL:
   *
   * - Replaces consequtive slashes with one slash.
   * - Removes unnecessary '.' parts.
   * - Removes unnecessary '<dir>/..' parts.
   *
   * Based on code in the Node.js 'path' core module.
   *
   * @param aPath The path or url to normalize.
   */
  function normalize(aPath) {
    var path = aPath;
    var url = urlParse(aPath);
    if (url) {
      if (!url.path) {
        return aPath;
      }
      path = url.path;
    }
    var isAbsolute = (path.charAt(0) === '/');

    var parts = path.split(/\/+/);
    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
      part = parts[i];
      if (part === '.') {
        parts.splice(i, 1);
      } else if (part === '..') {
        up++;
      } else if (up > 0) {
        if (part === '') {
          // The first part is blank if the path is absolute. Trying to go
          // above the root is a no-op. Therefore we can remove all '..' parts
          // directly after the root.
          parts.splice(i + 1, up);
          up = 0;
        } else {
          parts.splice(i, 2);
          up--;
        }
      }
    }
    path = parts.join('/');

    if (path === '') {
      path = isAbsolute ? '/' : '.';
    }

    if (url) {
      url.path = path;
      return urlGenerate(url);
    }
    return path;
  }
  exports.normalize = normalize;

  /**
   * Joins two paths/URLs.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be joined with the root.
   *
   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
   *   first.
   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
   *   is updated with the result and aRoot is returned. Otherwise the result
   *   is returned.
   *   - If aPath is absolute, the result is aPath.
   *   - Otherwise the two paths are joined with a slash.
   * - Joining for example 'http://' and 'www.example.com' is also supported.
   */
  function join(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }
    if (aPath === "") {
      aPath = ".";
    }
    var aPathUrl = urlParse(aPath);
    var aRootUrl = urlParse(aRoot);
    if (aRootUrl) {
      aRoot = aRootUrl.path || '/';
    }

    // `join(foo, '//www.example.org')`
    if (aPathUrl && !aPathUrl.scheme) {
      if (aRootUrl) {
        aPathUrl.scheme = aRootUrl.scheme;
      }
      return urlGenerate(aPathUrl);
    }

    if (aPathUrl || aPath.match(dataUrlRegexp)) {
      return aPath;
    }

    // `join('http://', 'www.example.com')`
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
      aRootUrl.host = aPath;
      return urlGenerate(aRootUrl);
    }

    var joined = aPath.charAt(0) === '/'
      ? aPath
      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

    if (aRootUrl) {
      aRootUrl.path = joined;
      return urlGenerate(aRootUrl);
    }
    return joined;
  }
  exports.join = join;

  /**
   * Make a path relative to a URL or another path.
   *
   * @param aRoot The root path or URL.
   * @param aPath The path or URL to be made relative to aRoot.
   */
  function relative(aRoot, aPath) {
    if (aRoot === "") {
      aRoot = ".";
    }

    aRoot = aRoot.replace(/\/$/, '');

    // It is possible for the path to be above the root. In this case, simply
    // checking whether the root is a prefix of the path won't work. Instead, we
    // need to remove components from the root one by one, until either we find
    // a prefix that fits, or we run out of components to remove.
    var level = 0;
    while (aPath.indexOf(aRoot + '/') !== 0) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0) {
        return aPath;
      }

      // If the only part of the root that is left is the scheme (i.e. http://,
      // file:///, etc.), one or more slashes (/), or simply nothing at all, we
      // have exhausted all components, so the path is not relative to the root.
      aRoot = aRoot.slice(0, index);
      if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
        return aPath;
      }

      ++level;
    }

    // Make sure we add a "../" for each component we removed from the root.
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  }
  exports.relative = relative;

  /**
   * Because behavior goes wacky when you set `__proto__` on objects, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  function toSetString(aStr) {
    return '$' + aStr;
  }
  exports.toSetString = toSetString;

  function fromSetString(aStr) {
    return aStr.substr(1);
  }
  exports.fromSetString = fromSetString;

  /**
   * Comparator between two mappings where the original positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same original source/line/column, but different generated
   * line and column the same. Useful when searching for a mapping with a
   * stubbed out mapping.
   */
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = mappingA.source - mappingB.source;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0 || onlyCompareOriginal) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    return mappingA.name - mappingB.name;
  };
  exports.compareByOriginalPositions = compareByOriginalPositions;

  /**
   * Comparator between two mappings with deflated source and name indices where
   * the generated positions are compared.
   *
   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
   * mappings with the same generated line and column, but different
   * source/name/original line and column the same. Useful when searching for a
   * mapping with a stubbed out mapping.
   */
  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0 || onlyCompareGenerated) {
      return cmp;
    }

    cmp = mappingA.source - mappingB.source;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }

    return mappingA.name - mappingB.name;
  };
  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

  function strcmp(aStr1, aStr2) {
    if (aStr1 === aStr2) {
      return 0;
    }

    if (aStr1 > aStr2) {
      return 1;
    }

    return -1;
  }

  /**
   * Comparator between two mappings with inflated source and name strings where
   * the generated positions are compared.
   */
  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = strcmp(mappingA.source, mappingB.source);
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalLine - mappingB.originalLine;
    if (cmp !== 0) {
      return cmp;
    }

    cmp = mappingA.originalColumn - mappingB.originalColumn;
    if (cmp !== 0) {
      return cmp;
    }

    return strcmp(mappingA.name, mappingB.name);
  };
  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

});

},{"amdefine":2}],48:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],49:[function(require,module,exports){
'use strict';

var $ = window.$;

$(function () {
  var authPhoto = $('.photo').attr('src');
  $('.auth-photo').css('background-image', 'url(\'' + authPhoto + '\')');
});

},{}],50:[function(require,module,exports){
'use strict';

var $ = window.$,
    pathname = window.location.pathname;

$(function () {
  if (pathname === '/') {
    $('body').addClass('home-page');
  }
  if (pathname === '/subscribe') {
    $('body').addClass('subscribe-page');
  }
  if (pathname === '/earthsky-a-clear-voice-for-science') {
    $('body').addClass('about-es-page');
  }
  if (pathname === '/team') {
    $('body').addClass('team-page');
  }
  if (pathname === '/image-submissions') {
    $('body').addClass('image-submissions');
  }
  if (pathname === '/donate') {
    $('body').addClass('donate');
  }
});

},{}],51:[function(require,module,exports){
module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["templates/browser/example.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Browser template example</h1>";
},"useData":true});

return this["JST"];

};
},{}],52:[function(require,module,exports){
'use strict';

var $ = window.$;

$(function () {
  // $('#menu-item-238930 a, .header-subscribe').on('click', (e) => {
  //   e.preventDefault();
  //   $('#subscribeModal').foundation('reveal', 'open');
  // });
  $('.more-post-trigger-icon').on('click', function (e) {
    $('.more-post-trigger').delay(100).slideUp();
    $('.more-post-wrapper').slideToggle('slow');
  });
  $('.close-donate').on('click', function () {
    $('.donate').slideUp('slow');
    localStorage.setItem('close-donation', new Date().getTime().toString());
  });
  if (localStorage.getItem('close-donation')) {
    var time = parseFloat(localStorage.getItem('close-donation'));
    if (new Date().getTime() - time > 60 * 60) {
      $('.donate-callout').hide();
    } else {
      $('.donate-callout').slideDown('slow');
    }
  } else {
    $('.donate-callout').slideDown('slow');
  }
  $('.search-icon').on('click', function () {
    $('.search-form').toggleClass('active');
  });
});

},{}],53:[function(require,module,exports){
'use strict';

window.foundation = require('../bower_components/foundation/js/foundation.js');
window.Instafeed = require('instafeed.js');

var $ = window.$,
    partial = window.location.pathname.split('/')[1];

require('./templates');
require('./home-page');
require('./article');
require('./sub-menu');
require('./mobile-nav');
require('./body');
require('./stargazing');

// Instafeed
$(function () {
  var feed = new window.Instafeed({
    get: 'user',
    userId: 1077654968,
    clientId: 'dc9c4636491c470198d02eaa4da7d42f',
    accessToken: '1077654968.ba4c844.a9345838bb4948d98ee7f7fcb4bf0126',
    resolution: 'low_resolution'
  });
  feed.run();
});

if (window.location.pathname === '/donate' && window.location.protocol === 'http:') {
  window.location.href = 'https://' + window.location.hostname + '/donate';
}

if (window.location.pathname === '/earthsky-comment-policy') {
  $('#sidebar').remove();
  $('#content').css({
    'margin': '0 auto',
    'padding-right': '6%',
    'padding-left': '6%'
  });
}

function makeActiveSubnav(name) {
  window.$('#menu-sub-menu > li > a').each(function (index, el) {
    var $el = window.$(el);
    if ($el.text().toLowerCase() === name.toLowerCase()) {
      $el.parent().addClass('current-menu-item');
    }
  });
}

if (partial) {
  if (partial === 'space') {
    makeActiveSubnav('space');
  }
  if (partial === 'earth') {
    makeActiveSubnav('earth');
  }
  if (partial === 'tonight') {
    makeActiveSubnav('tonight');
  }
  if (partial === 'human-world') {
    makeActiveSubnav('human-world');
  }
  if (partial === 'todays-image') {
    makeActiveSubnav('todays-image');
  }
}

},{"../bower_components/foundation/js/foundation.js":1,"./article":49,"./body":50,"./home-page":52,"./mobile-nav":54,"./stargazing":55,"./sub-menu":56,"./templates":57,"instafeed.js":34}],54:[function(require,module,exports){
'use strict';

var $ = window.$;

$(function () {
  $('.m-menu-trigger').on('click', function () {
    $('.m-menu-container').addClass('active');
    $('body').css({ overflow: 'hidden' });
  });

  $('.close-icon').on('click', function () {
    $('.m-menu-container').removeClass('active');
    $('body').css({ overflow: 'auto' });
  });
});

},{}],55:[function(require,module,exports){
'use strict';

var $ = window.$,
    google = window.google,
    infoWindows = [],
    handlebars = require('handlebars');

function getStargazingData(next) {
  $.ajax({
    url: '/?stargazing=stargazing',
    type: 'GET',
    contentType: 'application/json',
    success: function success(data) {
      next(null, data);
    },
    error: next
  });
}

function updateSidebar(location) {
  var source = $('#location-template').html(),
      template = handlebars.compile(source);
  $('.sidebar-widget').hide();
  $('.location-container').show().html(template(location));
  $('.recommend-container').hide();
}

function setupMap() {
  var mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(29.9770, -46.9606) },
      // Denver
  mapElement = document.getElementById('map'),
      map = new google.maps.Map(mapElement, mapOptions);
  window.map = map;

  getStargazingData(function (err, data) {
    if (err) return console.log(err);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var location = _step.value;

        var latLng = {
          lat: parseFloat(location.fields.latitude),
          lng: parseFloat(location.fields.longitude)
        },
            marker = new google.maps.Marker({
          map: map,
          position: latLng,
          flat: true,
          optimized: false,
          icon: {
            url: '/wp-content/themes/earthsky_techpines/static/img/map-marker-1.png',
            scaledSize: new google.maps.Size(40, 37)
          }
        }),
            infowindow = new google.maps.InfoWindow();
        infoWindows.push(infowindow);
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(location.post_title);
          updateSidebar(location);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = infoWindows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var info = _step2.value;

              info.close();
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          infowindow.open(map, marker);
        });
        google.maps.event.addListener(infowindow, 'closeclick', function () {
          $('.sidebar-widget').show();
          $('.location-container').hide();
          $('.recommend-container').show();
        });
      };

      for (var _iterator = data.locations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
}

function closeLocation() {
  $('.sidebar-widget').show();
  $('.location-container').hide();
  $('.recommend-container').show();
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = infoWindows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var info = _step3.value;

      info.close();
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function openModal(e) {
  e.preventDefault();
  $('#stargazeModal').foundation('reveal', 'open');
}

function closeModal(e) {
  e.preventDefault();
  $('#stargazeModal').foundation('reveal', 'close');
}

function setup() {
  $('.stargaze-modal-button').on('click', openModal);
  $('.close-modal, .submit-info').on('click', closeModal);
  $('body').on('click', '.place-container h3 i', closeLocation);
  google.maps.event.addDomListener(window, 'load', setupMap);
}

if (window.location.pathname === '/stargazing') {
  setup();
  $('.donate,#footer').remove();
}

},{"handlebars":33}],56:[function(require,module,exports){
'use strict';

var $ = window.$;

$(function () {
  var tonightLink = $('.recent-link').attr('href');

  $('.menu-item.menu-item-241716').addClass('tonight-link');
  $($('.tonight-link a')[0]).attr('href', '' + tonightLink);
});

},{}],57:[function(require,module,exports){
'use strict';

var handlebars = require('handlebars'),
    compiledTemplates = require('./compiled/templates')(handlebars),
    _ = require('underscore'),
    templates = {};

_.each(compiledTemplates, function (value, key) {
  templates[key.replace('templates/browser/', '').replace('.hbs', '')] = value;
});

handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return v1 === v2 ? options.fn(undefined) : options.inverse(undefined);
    case '===':
      return v1 === v2 ? options.fn(undefined) : options.inverse(undefined);
    case '<':
      return v1 < v2 ? options.fn(undefined) : options.inverse(undefined);
    case '<=':
      return v1 <= v2 ? options.fn(undefined) : options.inverse(undefined);
    case '>':
      return v1 > v2 ? options.fn(undefined) : options.inverse(undefined);
    case '>=':
      return v1 >= v2 ? options.fn(undefined) : options.inverse(undefined);
    case '&&':
      return v1 && v2 ? options.fn(undefined) : options.inverse(undefined);
    case '||':
      return v1 || v2 ? options.fn(undefined) : options.inverse(undefined);
    default:
      return options.inverse(undefined);
  }
});

module.exports = templates;

},{"./compiled/templates":51,"handlebars":33,"underscore":48}]},{},[53]);
