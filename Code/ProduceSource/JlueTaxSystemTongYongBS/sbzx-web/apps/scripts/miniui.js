/*
 * miniui v1.0.20
 * Copyright 2013-2017
 */
function js_isTouchDevice(){try{return document.createEvent("TouchEvent"),!0}catch(a){return!1}}function js_touchScroll(a){if(js_isTouchDevice()){var b="string"==typeof a?document.getElementById(a):a,c=0;b.addEventListener("touchstart",function(a){c=this.scrollTop+a.touches[0].pageY,a.preventDefault()},!1),b.addEventListener("touchmove",function(a){this.scrollTop=c-a.touches[0].pageY,a.preventDefault()},!1)}}function UUID(){for(var a=[],b="0123456789ABCDEF".split(""),c=0;36>c;c++)a[c]=Math.floor(16*Math.random());a[14]=4,a[19]=3&a[19]|8;for(var c=0;36>c;c++)a[c]=b[a[c]];return a[8]=a[13]=a[18]=a[23]="-",a.join("")}function __OnIFrameMouseDown(){jQuery(document).trigger("mousedown")}function __BindIFrames(){for(var a=document.getElementsByTagName("iframe"),b=0,c=a.length;c>b;b++){var d=a[b];try{if(d.contentWindow){var e=d.contentWindow.document;jQuery(e).bind("mousedown",__OnIFrameMouseDown)}}catch(f){}}}mini={components:{},uids:{},ux:{},isReady:!1,byClass:function(a,b){return"string"==typeof b&&(b=mini.byId(b)),jQuery("."+a,b)[0]},getComponents:function(){var a=[];for(var b in mini.components){var c=mini.components[b];a.push(c)}return a},get:function(a){if(!a)return null;if(mini.isControl(a))return a;if("string"==typeof a&&"#"==a.charAt(0)&&(a=a.substr(1)),"string"==typeof a)return mini.components[a];var b=mini.uids[a.uid];return b&&b.el==a?b:null},getbyUID:function(a){return mini.uids[a]},findControls:function(a,b){if(!a)return[];b=b||mini;var c=[],d=mini.uids;for(var e in d){var f=d[e],g=a.call(b,f);if((g===!0||1===g)&&(c.push(f),1===g))break}return c},getChildControls:function(a){var b=mini.get(a);if(!b)return[];var c=a.el?a.el:a,d=mini.findControls(function(b){return b.el&&a!=b&&mini.isAncestor(c,b.el)&&b.within?!0:!1});return d},emptyFn:function(){},createNameControls:function(a,b){if(a&&a.el){b||(b="_");for(var c=a.el,d=mini.findControls(function(a){return a.el&&a.name&&mini.isAncestor(c,a.el)?!0:!1}),e=0,f=d.length;f>e;e++){var g=d[e],h=b+g.name;b===!0&&(h=g.name[0].toUpperCase()+g.name.substring(1,g.name.length)),a[h]=g}}},getbyName:function(a,b){var c=mini.isControl(b),d=b;b&&c&&(b=b.el),b=mini.byId(b),b=b||document.body;var e=this.findControls(function(c){return c.el&&c.name==a&&mini.isAncestor(b,c.el)?1:!1},this);return c&&0==e.length&&d&&d.getbyName?d.getbyName(a):e[0]},getParams:function(a){a||(a=location.href),a=a.split("?")[1];var b={};if(a)for(var c=a.split("&"),d=0,e=c.length;e>d;d++){var f=c[d].split("=");try{b[f[0]]=decodeURIComponent(unescape(f[1]))}catch(g){}}return b},reg:function(a){this.components[a.id]=a,this.uids[a.uid]=a},unreg:function(a){delete mini.components[a.id],delete mini.uids[a.uid]},classes:{},uiClasses:{},getClass:function(a){return a?this.classes[a.toLowerCase()]:null},getClassByUICls:function(a){return this.uiClasses[a.toLowerCase()]},idPre:"mini-",idIndex:1,newId:function(a){return(a||this.idPre)+this.idIndex++},copyTo:function(a,b){if(a&&b)for(var c in b)a[c]=b[c];return a},copyIf:function(a,b){if(a&&b)for(var c in b)mini.isNull(a[c])&&(a[c]=b[c]);return a},createDelegate:function(a,b){return a?function(){return a.apply(b,arguments)}:function(){}},isControl:function(a){return!(!a||!a.isControl)},isElement:function(a){return a&&a.appendChild},isDate:function(a){return!(!a||!a.getFullYear)},isArray:function(a){return!(!a||!a.unshift)},isNull:function(a){return null===a||void 0===a},isNumber:function(a){return!isNaN(a)&&"number"==typeof a},isEquals:function(a,b){return 0===a||0===b||!mini.isNull(a)&&""!=a||!mini.isNull(b)&&""!=b?a&&b&&a.getFullYear&&b.getFullYear?a.getTime()===b.getTime():"object"==typeof a&&"object"==typeof b?mini.encode(a)==mini.encode(b):String(a)===String(b):!0},forEach:function(a,b,c){for(var d=a.clone(),e=0,f=d.length;f>e;e++){var g=d[e];if(b.call(c,g,e,a)===!1)break}},sort:function(a,b,c){c=c||a,a.sort(b)},removeNode:function(a){jQuery(a).remove()},elWarp:document.createElement("div")},mini_regClass=function(a,b){b=b.toLowerCase(),mini.classes[b]||(mini.classes[b]=a,a.prototype.type=b);var c=a.prototype.uiCls;mini.isNull(c)||mini.uiClasses[c]||(mini.uiClasses[c]=a)},mini_extend=function(a,b,c){if("function"!=typeof b)return this;var d=a,e=d.prototype,f=b.prototype;if(d.superclass!=f){d.superclass=f,d.superclass.constructor=b;for(var g in f)e[g]=f[g];if(c)for(var g in c)e[g]=c[g];return d}},mini.copyTo(mini,{extend:mini_extend,regClass:mini_regClass,debug:!1}),mini.namespace=function(a){if("string"==typeof a){a=a.split(".");for(var b=window,c=0,d=a.length;d>c;c++){var e=a[c],f=b[e];f||(f=b[e]={}),b=f}}},mini._getFunctoin=function(a){if("string"!=typeof a)return null;for(var b=a.split("."),c=null,d=0,e=b.length;e>d;d++){var f=b[d];if(c=c?c[f]:window[f],!c)break}return c},mini._getMap=function(name,obj){if(!name)return null;if(-1==name.indexOf(".")&&-1==name.indexOf("["))return obj[name];var s="obj."+name;try{var v=eval(s)}catch(e){return null}return v},mini._setMap=function(a,b,c){function d(a,b,c,d){var e=a[b];e||(e=a[b]=[]);for(var f=0;c>=f;f++){var g=e[f];g||(g=null===d||void 0===d?e[f]={}:e[f]=d)}return a[b][c]}if(c&&"string"==typeof a){for(var e=a.split("."),f=null,g=0,h=e.length;h-1>=g;g++){var a=e[g];if(g==h-1){if(-1==a.indexOf("]"))c[a]=b;else{var i=a.split("["),j=i[0],k=parseInt(i[1]);d(c,j,k,""),c[j][k]=b}break}if(-1==a.indexOf("]"))f=c[a],h-2>=g&&null==f&&(c[a]=f={}),c=f;else{var i=a.split("["),j=i[0],k=parseInt(i[1]);c=d(c,j,k)}}return b}},mini.getAndCreate=function(a){return a?"string"==typeof a?mini.components[a]:"object"==typeof a?mini.isControl(a)?a:mini.isElement(a)?mini.uids[a.uid]:mini.create(a):null:null},mini.create=function(a){if(!a)return null;if(mini.get(a.id)===a)return a;var b=this.getClass(a.type);if(!b)return null;var c=new b;return c.set(a),c},__mini_setControls=function(a,b,c){b=b||this._contentEl,c=c||this,a||(a=[]),mini.isArray(a)||(a=[a]);for(var d=0,e=a.length;e>d;d++){var f=a[d];"string"==typeof f?0==f.indexOf("#")&&(f=mini.byId(f)):mini.isElement(f)||(f=mini.getAndCreate(f),f=f.el),f&&mini.append(b,f)}return mini.parse(b),c.doLayout(),c},mini._Layouts={},mini.layout=function(a,b){function c(a){if(a){var d=mini.get(a);if(d)d.doLayout&&(mini._Layouts[d.uid]||(mini._Layouts[d.uid]=d,(b!==!1||0==d.isFixedSize())&&d.doLayout(!1),delete mini._Layouts[d.uid]));else{var e=a.childNodes;if(e)for(var f=0,g=e.length;g>f;f++){var h=e[f];c(h)}}}}document.body&&(a||(a=document.body),c(a),a==document.body&&mini.layoutIFrames())},mini.applyTo=function(a){if(a=mini.byId(a),!a)return this;if(mini.get(a))throw new Error("not applyTo a mini control");var b=this.getAttrs(a);delete b._applyTo,mini.isNull(b.defaultValue)&&!mini.isNull(b.value)&&(b.defaultValue=b.value);var c=a.parentNode;return c&&this.el!=a&&c.replaceChild(this.el,a),this.set(b),this._afterApply(a),this},mini._Removes=[],mini._ParseString=function(a,b,c){for(var d=0,e=c.length;e>d;d++){var f=c[d],g=mini.getAttr(a,f);g&&(b[f]=g)}},mini._ParseBool=function(a,b,c){for(var d=0,e=c.length;e>d;d++){var f=c[d],g=mini.getAttr(a,f);g&&(b[f]="true"==g?!0:!1)}},mini._ParseInt=function(a,b,c){for(var d=0,e=c.length;e>d;d++){var f=c[d],g=parseInt(mini.getAttr(a,f));isNaN(g)||(b[f]=g)}},mini._ParseColumns=function(el){for(var columns=[],cs=mini.getChildNodes(el),i=0,l=cs.length;l>i;i++){var node=cs[i],jq=jQuery(node),column={},editor=null,filter=null,subCs=mini.getChildNodes(node);if(subCs)for(var ii=0,li=subCs.length;li>ii;ii++){var subNode=subCs[ii],property=jQuery(subNode).attr("property");if(property&&(property=property.toLowerCase(),"columns"==property&&(column.columns=mini._ParseColumns(subNode),jQuery(subNode).remove()),"editor"==property||"filter"==property)){for(var className=subNode.className,classes=className.split(" "),i3=0,l3=classes.length;l3>i3;i3++){var cls=classes[i3],clazz=mini.getClassByUICls(cls);if(clazz){var ui=new clazz;"filter"==property?(filter=ui.getAttrs(subNode),filter.type=ui.type):(editor=ui.getAttrs(subNode),editor.type=ui.type);break}}jQuery(subNode).remove()}}column.header=node.innerHTML,mini._ParseString(node,column,["name","header","field","editor","filter","renderer","width","type","renderer","headerAlign","align","headerCls","cellCls","headerStyle","cellStyle","displayField","dateFormat","listFormat","mapFormat","trueValue","falseValue","dataType","vtype","currencyUnit","digit","summaryType","summaryRenderer","groupSummaryType","groupSummaryRenderer","defaultValue","defaultText","decimalPlaces","data-options","emptyText"]),mini._ParseBool(node,column,["visible","readOnly","allowSort","allowResize","allowMove","allowDrag","autoShowPopup","unique","showPercent","autoEscape"]),void 0===column.autoEscape&&(column.autoEscape=!0),editor&&(column.editor=editor),filter&&(column.filter=filter),column.dataType&&(column.dataType=column.dataType.toLowerCase()),"true"===column.defaultValue&&(column.defaultValue=!0),"false"===column.defaultValue&&(column.defaultValue=!1),columns.push(column);var options=column["data-options"];options&&(options=eval("("+options+")"),options&&mini.copyTo(column,options))}return columns},mini._topWindow=null,mini._getTopWindow=function(){function a(c){try{c.___try=1,b.push(c)}catch(d){}c.parent&&c.parent!=c&&a(c.parent)}if(mini._topWindow)return mini._topWindow;var b=[];return a(window),mini._topWindow=b[b.length-1],mini._topWindow};var __ps=mini.getParams();if(__ps._winid)try{window.Owner=mini._getTopWindow()[__ps._winid]}catch(ex){}mini._WindowID="w"+Math.floor(1e4*Math.random()),mini._getTopWindow()[mini._WindowID]=window,mini.__IFrameCreateCount=1,mini.createIFrame=function(a,b){function c(){0!=j&&setTimeout(function(){b&&b(i,k),k=!1},1)}var d="__iframe_onload"+mini.__IFrameCreateCount++;window[d]=c,a||(a="");var e=a.split("#");a=e[0];var f="_t="+Math.floor(1e6*Math.random());a+=-1==a.indexOf("?")?"?"+f:"&"+f,e[1]&&(a=a+"#"+e[1]);var g='<iframe style="width:100%;height:100%;" onload="'+d+'()"  frameborder="0"></iframe>',h=document.createElement("div"),i=mini.append(h,g),j=!1;setTimeout(function(){i&&(i.src=a,j=!0)},5);var k=!0;return i._ondestroy=function(){window[d]=mini.emptyFn,i.onload=function(){},jQuery(i).unbind("load"),i.src="";try{i.contentWindow.document.write(""),i.contentWindow.document.close()}catch(a){}i._ondestroy=null,i=null},i},mini._doOpen=function(a){"string"==typeof a&&(a={url:a}),a=mini.copyTo({width:700,height:400,allowResize:!0,allowModal:!0,closeAction:"destroy",title:"",titleIcon:"",iconCls:"",iconStyle:"",bodyStyle:"padding: 0",url:"",showCloseButton:!0,showFooter:!1},a),a.closeAction||(a.closeAction="destroy");var b=a.onload;delete a.onload;var c=a.ondestroy;delete a.ondestroy;var d=a.url;delete a.url;var e=new mini.Window;return e.set(a),e.load(d,b,c),e.show(),e},mini.open=function(a){function b(a){try{a.mini&&o.push(a),a.parent&&a.parent!=a&&b(a.parent)}catch(c){}}if(a){var c=a.currentWindow;c||(c=!1);var d=a.url;d||(d="");var e=d.split("#"),d=e[0],f="_winid="+mini._WindowID;d+=-1==d.indexOf("?")?"?"+f:"&"+f,e[1]&&(d=d+"#"+e[1]);var g=-1!=d.indexOf("http");if(g)a.url=d;else if(c)a.url=d;else{var h=document.getElementsByTagName("BASE"),i=h&&h.length?h[0].href:null;if(i)a.url=i+"/"+d;else{var j=d.substr(0,1);if("/"==j)a.url=window.location.protocol+"//"+window.location.host+d;else{var k=location.href,l=-1!=k.indexOf("?");l&&(k=k.substring(0,k.indexOf("?")));var m=k.split("/");m.length=m.length-1;var n=m.join("/");a.url=n+"/"+d}}}a.Owner=window;var o=[];b(window);var p=o[o.length-1];return a.win=p,a.beforeopen&&a.beforeopen(a),c?mini._doOpen(a):p.mini._doOpen(a)}},mini.openTop=mini.open,mini.getData=function(a,b,c,d,e){var f=mini.getText(a,b,c,d,e),g=mini.decode(f);return g},mini.getText=function(a,b,c,d,e){var f=null;return mini.ajax({url:a,data:b,async:!1,type:e?e:"get",cache:!1,success:function(a,b){f=a,c&&c(a,b)},error:d}),f},mini.update=function(a,b){"string"==typeof a&&(a={url:a}),b&&(a.el=b);var c=mini.loadText(a.url);mini.innerHTML(a.el,c),mini.parse(a.el)},mini.createSingle=function(a){if("string"==typeof a&&(a=mini.getClass(a)),"function"==typeof a){var b=a.single;return b||(b=a.single=new a),b}},mini.createTopSingle=function(a){if("function"==typeof a){var b=a.prototype.type;return top&&top!=window&&top.mini&&top.mini.getClass(b)?top.mini.createSingle(b):mini.createSingle(a)}},mini.sortTypes={string:function(a){return String(a).toUpperCase()},date:function(a){return a?mini.isDate(a)?a.getTime():mini.parseDate(String(a)):0},"float":function(a){var b=parseFloat(String(a).replace(/,/g,""));return isNaN(b)?-(1/0):b},"int":function(a){var b=parseInt(String(a).replace(/,/g,""),10);return isNaN(b)?-(1/0):b},currency:function(a){var b=parseFloat(String(a).replace(/,/g,""));return isNaN(b)?-(1/0):b},percent:function(a){var b=parseFloat(String(a).replace(/,/g,""));return isNaN(b)?-(1/0):b}},mini.emptyFn=function(){},mini.clone=function(a,b){function c(a){for(var b=0,d=a.length;d>b;b++){var e=a[b];delete e._state,delete e._id,delete e._pid,delete e._uid;for(var f in e){var g=e[f];g instanceof Array&&c(g)}}}if(null===a||void 0===a)return a;var d=mini.encode(a),e=mini.decode(d);return b!==!1&&c(e instanceof Array?e:[e]),e},mini.append=function(a,b){if(a=mini.byId(a),b&&a){if("string"==typeof b){if("#"==b.charAt(0)){if(b=mini.byId(b),!b)return;return a.appendChild(b),b}if(0==b.indexOf("<tr"))return jQuery(a).append(b)[0].lastChild;var c=document.createElement("div");for(c.innerHTML=b,b=c.firstChild;c.firstChild;)a.appendChild(c.firstChild);return b}return a.appendChild(b),b}},mini.prepend=function(a,b){if("string"==typeof b)if("#"==b.charAt(0))b=mini.byId(b);else{var c=document.createElement("div");c.innerHTML=b,b=c.firstChild}return jQuery(a).prepend(b)[0].firstChild},mini.after=function(a,b){if("string"==typeof b)if("#"==b.charAt(0))b=mini.byId(b);else{var c=document.createElement("div");c.innerHTML=b,b=c.firstChild}if(b&&a)return a.nextSibling?a.parentNode.insertBefore(b,a.nextSibling):a.parentNode.appendChild(b),b},mini.before=function(a,b){if("string"==typeof b)if("#"==b.charAt(0))b=mini.byId(b);else{var c=document.createElement("div");c.innerHTML=b,b=c.firstChild}if(b&&a)return a.parentNode.insertBefore(b,a),b},mini.__wrap=document.createElement("div"),mini.createElements=function(a){mini.removeChilds(mini.__wrap);var b=0==a.indexOf("<tr");return b&&(a="<table>"+a+"</table>"),mini.__wrap.innerHTML=a,b?mini.__wrap.firstChild.rows:mini.__wrap.childNodes},mini_byId=function(a,b){if("string"==typeof a){"#"==a.charAt(0)&&(a=a.substr(1));var c=document.getElementById(a);if(c)return c;if(b){for(var d=b.getElementsByTagName("*"),e=0,f=d.length;f>e;e++){var c=d[e];if(c.id==a)return c}c=null}return c}return a},mini_hasClass=function(a,b){if(a=mini.byId(a)){if(!a.className)return!1;var c=String(a.className).split(" ");return-1!=c.indexOf(b)}},mini_addClass=function(a,b){b&&0==mini.hasClass(a,b)&&jQuery(a).addClass(b)},mini_removeClass=function(a,b){b&&jQuery(a).removeClass(b)},mini_getMargins=function(a){a=mini.byId(a);var b=jQuery(a);return{top:parseInt(b.css("margin-top"),10)||0,left:parseInt(b.css("margin-left"),10)||0,bottom:parseInt(b.css("margin-bottom"),10)||0,right:parseInt(b.css("margin-right"),10)||0}},mini_getBorders=function(a){a=mini.byId(a);var b=jQuery(a);return{top:parseInt(b.css("border-top-width"),10)||0,left:parseInt(b.css("border-left-width"),10)||0,bottom:parseInt(b.css("border-bottom-width"),10)||0,right:parseInt(b.css("border-right-width"),10)||0}},mini_getPaddings=function(a){a=mini.byId(a);var b=jQuery(a);return{top:parseInt(b.css("padding-top"),10)||0,left:parseInt(b.css("padding-left"),10)||0,bottom:parseInt(b.css("padding-bottom"),10)||0,right:parseInt(b.css("padding-right"),10)||0}},mini_setWidth=function(a,b){if(a=mini.byId(a),b=parseInt(b),!isNaN(b)&&a){if(jQuery.boxModel){var c=mini.getPaddings(a),d=mini.getBorders(a);b=b-c.left-c.right-d.left-d.right}0>b&&(b=0),a.style.width=b+"px"}},mini_setHeight=function(a,b){if(a=mini.byId(a),b=parseInt(b),!isNaN(b)&&a){if(jQuery.boxModel){var c=mini.getPaddings(a),d=mini.getBorders(a);b=b-c.top-c.bottom-d.top-d.bottom}0>b&&(b=0),a.style.height=b+"px"}},mini_getWidth=function(a,b){return a=mini.byId(a),"none"==a.style.display||"text/javascript"==a.type?0:b?jQuery(a).width():jQuery(a).outerWidth()},mini_getHeight=function(a,b){return a=mini.byId(a),jQuery(a).is(":visible")&&"text/javascript"!=a.type?b?jQuery(a).height():jQuery(a).outerHeight():0},mini_setBox=function(a,b,c,d,e){void 0===c&&(c=b.y,d=b.width,e=b.height,b=b.x),mini.setXY(a,b,c),mini.setWidth(a,d),mini.setHeight(a,e)},mini_getBox=function(a){var b=mini.getXY(a),c=mini.getWidth(a),d=mini.getHeight(a),e={x:b[0],y:b[1],width:c,height:d};return e.left=e.x,e.top=e.y,e.right=e.x+e.width,e.bottom=e.y+e.height,e},mini_setStyle=function(a,b){if(a=mini.byId(a),a&&"string"==typeof b)for(var c=jQuery(a),d=b.toLowerCase().split(";"),e=0,f=d.length;f>e;e++){var g=d[e],h=g.split(":");if(h.length>1)if(h.length>2){var i=h[0].trim();h.removeAt(0);var j=h.join(":").trim();c.css(i,j)}else c.css(h[0].trim(),h[1].trim())}},mini_getStyle=function(){var a=document.defaultView;return new Function("el","style",["style.indexOf('-')>-1 && (style=style.replace(/-(\\w)/g,function(m,a){return a.toUpperCase()}));","style=='float' && (style='",a?"cssFloat":"styleFloat","');return el.style[style] || ",a?"window.getComputedStyle(el, null)[style]":"el.currentStyle[style]"," || null;"].join(""))}(),mini_isAncestor=function(a,b){var c=!1;if(a=mini.byId(a),b=mini.byId(b),a===b)return!0;if(a&&b)if(a.contains)try{return a.contains(b)}catch(d){return!1}else{if(a.compareDocumentPosition)return!!(16&a.compareDocumentPosition(b));for(;b=b.parentNode;)c=b==a||c}return c},mini_findParent=function(a,b,c){a=mini.byId(a);var d,e=document.body,f=0;for(c=c||50,"number"!=typeof c&&(d=mini.byId(c),c=10);a&&1==a.nodeType&&c>f&&a!=e&&a!=d;){if(mini.hasClass(a,b))return a;f++,a=a.parentNode}return null},mini.copyTo(mini,{byId:mini_byId,hasClass:mini_hasClass,addClass:mini_addClass,removeClass:mini_removeClass,getMargins:mini_getMargins,getBorders:mini_getBorders,getPaddings:mini_getPaddings,setWidth:mini_setWidth,setHeight:mini_setHeight,getWidth:mini_getWidth,getHeight:mini_getHeight,setBox:mini_setBox,getBox:mini_getBox,setStyle:mini_setStyle,getStyle:mini_getStyle,repaint:function(a){a||(a=document.body),mini.addClass(a,"mini-repaint"),setTimeout(function(){mini.removeClass(a,"mini-repaint")},1)},getSize:function(a,b){return{width:mini.getWidth(a,b),height:mini.getHeight(a,b)}},setSize:function(a,b,c){mini.setWidth(a,b),mini.setHeight(a,c)},setX:function(a,b){b=parseInt(b);var c=jQuery(a).offset(),d=parseInt(c.top);void 0===d&&(d=c[1]),mini.setXY(a,b,d)},setY:function(a,b){b=parseInt(b);var c=jQuery(a).offset(),d=parseInt(c.left);void 0===d&&(d=c[0]),mini.setXY(a,d,b)},setXY:function(a,b,c){var d={left:parseInt(b),top:parseInt(c)};jQuery(a).offset(d)},getXY:function(a){var b=jQuery(a).offset();return[parseInt(b.left),parseInt(b.top)]},getViewportBox:function(){var a=jQuery(window).width(),b=jQuery(window).height(),c=jQuery(document).scrollLeft(),d=jQuery(document.body).scrollTop();return document.documentElement&&(d=document.documentElement.scrollTop),{x:c,y:d,top:d,left:c,width:a,height:b,right:c+a,bottom:d+b}},getChildNodes:function(a,b){if(a=mini.byId(a)){for(var c=a.childNodes,d=[],e=0,f=c.length;f>e;e++){var g=c[e];(1==g.nodeType||b===!0)&&d.push(g)}return d}},removeChilds:function(a,b){if(a=mini.byId(a))for(var c=mini.getChildNodes(a,!0),d=0,e=c.length;e>d;d++){var f=c[d];b&&f==b||a.removeChild(c[d])}},isAncestor:mini_isAncestor,findParent:mini_findParent,findChild:function(a,b){a=mini.byId(a);for(var c=a.getElementsByTagName("*"),d=0,e=c.length;e>d;d++){var a=c[d];if(mini.hasClass(a,b))return a}},isAncestor:function(a,b){var c=!1;if(a=mini.byId(a),b=mini.byId(b),a===b)return!0;if(a&&b)if(a.contains)try{return a.contains(b)}catch(d){return!1}else{if(a.compareDocumentPosition)return!!(16&a.compareDocumentPosition(b));for(;b=b.parentNode;)c=b==a||c}return c},getOffsetsTo:function(a,b){var c=this.getXY(a),d=this.getXY(b);return[c[0]-d[0],c[1]-d[1]]},scrollIntoView:function(a,b,c){var d=mini.byId(b)||document.body,e=this.getOffsetsTo(a,d),f=e[0]+d.scrollLeft,g=e[1]+d.scrollTop,h=g+a.offsetHeight,i=f+a.offsetWidth,j=d.clientHeight,k=parseInt(d.scrollTop,10),l=parseInt(d.scrollLeft,10),m=k+j,n=l+d.clientWidth;return a.offsetHeight>j||k>g?d.scrollTop=g:h>m&&(d.scrollTop=h-j),d.scrollTop=d.scrollTop,c!==!1&&(a.offsetWidth>d.clientWidth||l>f?d.scrollLeft=f:i>n&&(d.scrollLeft=i-d.clientWidth),d.scrollLeft=d.scrollLeft),this},setOpacity:function(a,b){jQuery(a).css({opacity:b})},selectable:function(a,b){a=mini.byId(a),b?(jQuery(a).removeClass("mini-unselectable"),isIE?a.unselectable="off":(a.style.MozUserSelect="",a.style.KhtmlUserSelect="",a.style.UserSelect="")):(jQuery(a).addClass("mini-unselectable"),isIE?a.unselectable="on":(a.style.MozUserSelect="none",a.style.UserSelect="none",a.style.KhtmlUserSelect="none"))},selectRange:function(a,b,c){if(a.createTextRange){var d=a.createTextRange();d.moveStart("character",b),d.moveEnd("character",c-a.value.length),d.select()}else a.setSelectionRange&&a.setSelectionRange(b,c);try{a.focus()}catch(e){}},getSelectRange:function(a){if(a=mini.byId(a)){try{a.focus()}catch(b){}var c=0,d=0;if(a.createTextRange){var e=document.selection.createRange().duplicate();e.moveEnd("character",a.value.length),c=""===e.text?a.value.length:a.value.lastIndexOf(e.text);var e=document.selection.createRange().duplicate();e.moveStart("character",-a.value.length),d=e.text.length}else c=a.selectionStart,d=a.selectionEnd;return[c,d]}}}),function(){var a={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},b=document.createElement("div");b.setAttribute("class","t");var c="t"===b.className;mini.setAttr=function(b,d,e){b.setAttribute(c?d:a[d]||d,e)},mini.getAttr=function(b,d){if("value"==d&&(isIE6||isIE7)){var e=b.attributes[d];return e?e.value:null}var f=b.getAttribute(c?d:a[d]||d);if("function"==typeof f&&(f=b.attributes[d].value),!f&&"onload"==d){var g=b.getAttributeNode?b.getAttributeNode(d):null;g&&(f=g.nodeValue)}return f}}(),mini.copyTo(mini,{treeToArray:function(a,b,c,d,e){b||(b="children");for(var f=[],g=0,h=a.length;h>g;g++){var i=a[g];f[f.length]=i,d&&(i[d]=e);var j=i[b];if(j&&j.length>0){var k=i[c],l=this.treeToArray(j,b,c,d,k);f.addRange(l)}}return f},arrayToTree:function(a,b,c,d){b||(b="children"),c=c||"_id",d=d||"_pid";for(var e=[],f={},g=0,h=a.length;h>g;g++){var i=a[g];if(i){var j=i[c];null!==j&&void 0!==j&&(f[j]=i),delete i[b]}}for(var g=0,h=a.length;h>g;g++){var i=a[g],k=f[i[d]];k?(k[b]||(k[b]=[]),k[b].push(i)):e.push(i)}return e}}),mini.treeToList=mini.treeToArray,mini.listToTree=mini.arrayToTree,mini.copyTo(mini,{measureText:function(a,b,c){if(this.measureEl||(this.measureEl=mini.append(document.body,"<div></div>")),this.measureEl.style.cssText="position:absolute;left:-1000px;top:-1000px;visibility:hidden;","string"==typeof a)this.measureEl.className=a;else{this.measureEl.className="";for(var d=jQuery(a),e=jQuery(this.measureEl),f=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],g=0,h=f.length;h>g;g++){var i=f[g];e.css(i,d.css(i))}}return c&&mini.setStyle(this.measureEl,c),this.measureEl.innerHTML=b,mini.getSize(this.measureEl)}}),mini.__LastWindowWidth=document.documentElement.clientWidth,mini.__LastWindowHeight=document.documentElement.clientHeight,mini.allowLayout=!0,mini.isDisplay=function(a,b){for(var c=b||document.body;;){if(null==a||!a.style)return!1;if(a&&a.style&&"none"==a.style.display)return!1;if(a==c)return!0;a=a.parentNode}return!0},mini.isWindowDisplay=function(){try{var a=window.parent,b=a!=window;if(b){for(var c=a.document.getElementsByTagName("iframe"),d=a.document.getElementsByTagName("frame"),e=[],f=0,g=c.length;g>f;f++)e.push(c[f]);for(var f=0,g=d.length;g>f;f++)e.push(d[f]);for(var h=null,f=0,g=e.length;g>f;f++){var i=e[f];if(i.contentWindow==window){h=i;break}}return h?mini.isDisplay(h,a.document.body):!1}return!0}catch(j){return!0}},mini.WindowVisible=mini.isWindowDisplay(),mini.layoutIFrames=function(a){if(a||(a=document.body),a){var b=a.getElementsByTagName("iframe");setTimeout(function(){for(var c=0,d=b.length;d>c;c++){var e=b[c];try{mini.isDisplay(e)&&mini.isAncestor(a,e)&&(e.contentWindow.mini&&(0==e.contentWindow.mini.WindowVisible?(e.contentWindow.mini.WindowVisible=e.contentWindow.mini.isWindowDisplay(),e.contentWindow.mini.layout()):e.contentWindow.mini.layout(null,!1)),e.contentWindow.mini.layoutIFrames())}catch(f){}}},30)}},mini.zIndex=1e3,mini.getMaxZIndex=function(){return mini.zIndex++},mini._placeholder=function(a){function b(){var b=a._placeholder_label;if(b){var c=a.getAttribute("placeholder");c||(c=a.placeholder),a.value?b.style.display="none":(b.innerHTML=c,b.style.display="",a.disabled&&(b.disabled=!0))}}if(a=mini.byId(a),a&&isIE&&!isIE10){if(a._placeholder)return void b();a._placeholder=!0;var c=document.createElement("label");c.className="mini-placeholder-label",a.parentNode.appendChild(c),a._placeholder_label=c,c.onmousedown=function(){a.focus()},a.onpropertychange=function(a){a=a||window.event,"value"==a.propertyName&&b()},b(),mini.on(a,"focus",function(b){a.readOnly||(c.style.display="none")}),mini.on(a,"blur",function(a){b()})}},mini.removeChildUI=function(a,b){if("string"==typeof a&&(a=document.getElementById(a)),a){for(var c=mini.getChildNodes(a,!1),d=0;d<c.length;d++){var e=c[d];if(e.uid){var f=mini.get(e);mini.isControl(f)&&f.destroy()}else mini.removeChildUI(e)}b&&jQuery(a).html("")}},mini.ajax=function(a){return a.dataType||(a.dataType="text"),window.jQuery.ajax(a)},mini.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:"bottomleft"==a?{top:b.top+b.height,left:b.left}:"bottomright"==a?{top:b.top+b.height,left:b.left+b.width-c}:"topleft"==a?{top:b.top-d,left:b.left}:"topright"==a?{top:b.top-d,left:b.left+b.width-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},mini.objToLine=function(a,b){function c(a,b){for(var c in a){var e=a[c];null===e||void 0===e?b?d[b+"."+c]=a[c]:d[c]=a[c]:"[object Object]"==Object.prototype.toString.call(a[c])?b?arguments.callee(e,b+"."+c):arguments.callee(e,c):b?d[b+"."+c]=a[c]:d[c]=a[c]}}var d={};return null==a?d:(c(a,b),d)},jQuery.ajaxSetup({cache:!1}),"undefined"==typeof window.rootpath&&(rootpath="/"),"undefined"==typeof mini_debugger&&(mini_debugger=!0),"undefined"==typeof mini_useShims&&(mini_useShims=!1),"undefined"==typeof mini_autoRun&&(mini_autoRun=!0),mini_CreateJSPath=function(a){for(var b=document.getElementsByTagName("script"),c="",d=0,e=b.length;e>d;d++){var f=b[d].src;if(-1!=f.indexOf(a)){var g=f.split(a);c=g[0];break}}var h=location.href;h=h.split("#")[0],h=h.split("?")[0];var g=h.split("/");return g.length=g.length-1,h=g.join("/"),-1==c.indexOf("http:")&&-1==c.indexOf("file:")&&(c=h+"/"+c),c},window.mini_JSPath||(mini_JSPath=mini_CreateJSPath("miniui.js"));var ua=navigator.userAgent.toLowerCase(),check=function(a){return a.test(ua)},DOC=document,isStrict="CSS1Compat"==document.compatMode,version=function(a,b){var c;return a&&(c=b.exec(ua))?parseFloat(c[1]):0},docMode=document.documentMode,isOpera=check(/opera/),isOpera10_5=isOpera&&check(/version\/10\.5/),isChrome=check(/\bchrome\b/),isWebKit=check(/webkit/),isSafari=!isChrome&&check(/safari/),isSafari2=isSafari&&check(/applewebkit\/4/),isSafari3=isSafari&&check(/version\/3/),isSafari4=isSafari&&check(/version\/4/),isSafari5_0=isSafari&&check(/version\/5\.0/),isSafari5=isSafari&&check(/version\/5/),isIE=!isOpera&&check(/msie/),isIE7=isIE&&(check(/msie 7/)&&8!=docMode&&9!=docMode&&10!=docMode||7==docMode),isIE8=isIE&&(check(/msie 8/)&&7!=docMode&&9!=docMode&&10!=docMode||8==docMode),isIE9=isIE&&(check(/msie 9/)&&7!=docMode&&8!=docMode&&10!=docMode||9==docMode),isIE10=isIE&&(check(/msie 10/)&&7!=docMode&&8!=docMode&&9!=docMode||10==docMode),isIE11=ua.indexOf("trident")>-1&&ua.indexOf("rv")>-1,isIE6=isIE&&!isIE7&&!isIE8&&!isIE9&&!isIE10&&!isIE11,isFirefox=navigator.userAgent.indexOf("Firefox")>0,isGecko=!isWebKit&&check(/gecko/),isGecko3=isGecko&&check(/rv:1\.9/),isGecko4=isGecko&&check(/rv:2\.0/),isGecko5=isGecko&&check(/rv:5\./),isGecko10=isGecko&&check(/rv:10\./),isFF3_0=isGecko3&&check(/rv:1\.9\.0/),isFF3_5=isGecko3&&check(/rv:1\.9\.1/),isFF3_6=isGecko3&&check(/rv:1\.9\.2/),isWindows=check(/windows|win32/),isMac=check(/macintosh|mac os x/),isAir=check(/adobeair/),isLinux=check(/linux/),scrollbarSize=null,chromeVersion=version(!0,/\bchrome\/(\d+\.\d+)/),firefoxVersion=version(!0,/\bfirefox\/(\d+\.\d+)/),ieVersion=version(isIE,/msie (\d+\.\d+)/),operaVersion=version(isOpera,/version\/(\d+\.\d+)/),safariVersion=version(isSafari,/version\/(\d+\.\d+)/),webKitVersion=version(isWebKit,/webkit\/(\d+\.\d+)/),isSecure=/^https/i.test(window.location.protocol),isBorderBox=isIE&&!isStrict;if(isIE6)try{DOC.execCommand("BackgroundImageCache",!1,!0)}catch(e){}mini.boxModel=!isBorderBox,mini.isIE=isIE,mini.isIE6=isIE6,mini.isIE7=isIE7,mini.isIE8=isIE8,mini.isIE9=isIE9,mini.isFirefox=isFirefox,mini.isOpera=isOpera,mini.isSafari=isSafari,jQuery&&(jQuery.boxModel=mini.boxModel),mini.noBorderBox=!1,0==jQuery.boxModel&&isIE&&0==isIE9&&(mini.noBorderBox=!0),mini.copyTo(Array.prototype,{add:Array.prototype.enqueue=function(a){return this[this.length]=a,this},getRange:function(a,b){for(var c=[],d=a;b>=d;d++){var e=this[d];e&&(c[c.length]=e)}return c},addRange:function(a){for(var b=0,c=a.length;c>b;b++)this[this.length]=a[b];return this},clear:function(){return this.length=0,this},clone:function(){return 1===this.length?[this[0]]:Array.apply(null,this)},contains:function(a){return this.indexOf(a)>=0},indexOf:function(a,b){for(var c=this.length,d=0>b?Math.max(0,c+b):b||0;c>d;d++)if(this[d]===a)return d;return-1},dequeue:function(){return this.shift()},insert:function(a,b){return this.splice(a,0,b),this},insertRange:function(a,b){for(var c=b.length-1;c>=0;c--){var d=b[c];this.splice(a,0,d)}return this},remove:function(a){var b=this.indexOf(a);return b>=0&&this.splice(b,1),b>=0},removeAt:function(a){var b=this[a];return this.splice(a,1),b},removeRange:function(a){a=a.clone();for(var b=0,c=a.length;c>b;b++)this.remove(a[b])}}),Date.prototype.getHalfYear=function(){if(!this.getMonth)return null;var a=this.getMonth();return 6>a?0:1},Date.prototype.getQuarter=function(){if(!this.getMonth)return null;var a=this.getMonth();return 3>a?0:6>a?1:9>a?2:3};var DAY_MS=864e5,HOUR_MS=36e5,MINUTE_MS=6e4;mini.copyTo(mini,{clearTime:function(a){return a?new Date(a.getFullYear(),a.getMonth(),a.getDate()):null},maxTime:function(a){return a?new Date(a.getFullYear(),a.getMonth(),a.getDate(),23,59,59):null},cloneDate:function(a){return a?new Date(a.getTime()):null},addDate:function(a,b,c){switch(c||(c="D"),a=new Date(a.getTime()),c.toUpperCase()){case"Y":a.setFullYear(a.getFullYear()+b);break;case"MO":a.setMonth(a.getMonth()+b);break;case"D":a.setDate(a.getDate()+b);break;case"H":a.setHours(a.getHours()+b);break;case"M":a.setMinutes(a.getMinutes()+b);break;case"S":a.setSeconds(a.getSeconds()+b);break;case"MS":a.setMilliseconds(a.getMilliseconds()+b)}return a},getWeek:function(a,b,c){b+=1;var d=Math.floor((14-b)/12),e=a+4800-d,f=b+12*d-3,g=c+Math.floor((153*f+2)/5)+365*e+Math.floor(e/4)-Math.floor(e/100)+Math.floor(e/400)-32045,h=(g+31741-g%7)%146097%36524%1461,i=Math.floor(h/1460),j=(h-i)%365+i;return NumberOfWeek=Math.floor(j/7)+1,NumberOfWeek},getWeekStartDate:function(a,b){if(b||(b=0),b>6||0>b)throw new Error("out of weekday");var c=a.getDay(),d=b-c;b>c&&(d-=7);var e=new Date(a.getFullYear(),a.getMonth(),a.getDate()+d);return e},getShortWeek:function(a){var b=this.dateInfo.daysShort;return b[a]},getLongWeek:function(a){var b=this.dateInfo.daysLong;return b[a]},getShortMonth:function(a){
var b=this.dateInfo.monthsShort;return b[a]},getLongMonth:function(a){var b=this.dateInfo.monthsLong;return b[a]},dateInfo:{monthsLong:["January","Febraury","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],daysLong:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Su","Mo","Tu","We","Th","Fr","Sa"],quarterLong:["Q1","Q2","Q3","Q4"],quarterShort:["Q1","Q2","Q3","Q4"],halfYearLong:["first half","second half"],patterns:{d:"M/d/yyyy",D:"dddd, MMMM dd, yyyy",f:"dddd, MMMM dd, yyyy H:mm tt",F:"dddd, MMMM dd, yyyy H:mm:ss tt",g:"M/d/yyyy H:mm tt",G:"M/d/yyyy H:mm:ss tt",m:"MMMM dd",o:"yyyy-MM-ddTHH:mm:ss.fff",s:"yyyy-MM-ddTHH:mm:ss",t:"H:mm tt",T:"H:mm:ss tt",U:"dddd, MMMM dd, yyyy HH:mm:ss tt",y:"MMM, yyyy"},tt:{AM:"AM",PM:"PM"},ten:{Early:"Early",Mid:"Mid",Late:"Late"},today:"Today",clockType:24}}),mini.formatDate=function(a,b,c){if(!a||!a.getFullYear||isNaN(a))return"";var d=a.toString(),e=mini.dateInfo;if(e||(e=mini.dateInfo),"undefined"!=typeof e){var f="undefined"!=typeof e.patterns[b]?e.patterns[b]:b,g=a.getFullYear(),h=a.getMonth(),i=a.getDate();if("yyyy-MM-dd"==b)return h=10>h+1?"0"+(h+1):h+1,i=10>i?"0"+i:i,g+"-"+h+"-"+i;if("MM/dd/yyyy"==b)return h=10>h+1?"0"+(h+1):h+1,i=10>i?"0"+i:i,h+"/"+i+"/"+g;d=f.replace(/yyyy/g,g),d=d.replace(/yy/g,(g+"").substring(2));var j=a.getHalfYear();d=d.replace(/hy/g,e.halfYearLong[j]);var k=a.getQuarter();d=d.replace(/Q/g,e.quarterLong[k]),d=d.replace(/q/g,e.quarterShort[k]),d=d.replace(/MMMM/g,e.monthsLong[h].escapeDateTimeTokens()),d=d.replace(/MMM/g,e.monthsShort[h].escapeDateTimeTokens()),d=d.replace(/MM/g,10>h+1?"0"+(h+1):h+1),d=d.replace(/(\\)?M/g,function(a,b){return b?a:h+1});var l=a.getDay();d=d.replace(/dddd/g,e.daysLong[l].escapeDateTimeTokens()),d=d.replace(/ddd/g,e.daysShort[l].escapeDateTimeTokens()),d=d.replace(/dd/g,10>i?"0"+i:i),d=d.replace(/(\\)?d/g,function(a,b){return b?a:i});var m=a.getHours(),n=m>12?m-12:m;12==e.clockType&&m>12&&(m-=12),d=d.replace(/HH/g,10>m?"0"+m:m),d=d.replace(/(\\)?H/g,function(a,b){return b?a:m}),d=d.replace(/hh/g,10>n?"0"+n:n),d=d.replace(/(\\)?h/g,function(a,b){return b?a:n});var o=a.getMinutes();d=d.replace(/mm/g,10>o?"0"+o:o),d=d.replace(/(\\)?m/g,function(a,b){return b?a:o});var p=a.getSeconds();d=d.replace(/ss/g,10>p?"0"+p:p),d=d.replace(/(\\)?s/g,function(a,b){return b?a:p}),d=d.replace(/fff/g,a.getMilliseconds()),d=d.replace(/tt/g,a.getHours()>12||0==a.getHours()?e.tt.PM:e.tt.AM);var a=a.getDate(),q="";q=10>=a?e.ten.Early:20>=a?e.ten.Mid:e.ten.Late,d=d.replace(/ten/g,q)}return d.replace(/\\/g,"")},mini.fixDate=function(a,b){if(+a)for(;a.getDate()!=b.getDate();)a.setTime(+a+(b>a?1:-1)*HOUR_MS)},mini.parseDate=function(s,ignoreTimezone){try{var d=eval(s);if(d&&d.getFullYear)return d}catch(ex){}if("object"==typeof s)return isNaN(s)?null:s;if("number"==typeof s){var d=new Date(1e3*s);return d.getTime()!=s?null:isNaN(d)?null:d}if("string"==typeof s){if(m=s.match(/^([0-9]{4})([0-9]{2})([0-9]{0,2})$/),m){var date=new Date(parseInt(m[1],10),parseInt(m[2],10)-1);return m[3]&&date.setDate(m[3]),date}if(m=s.match(/^([0-9]{4}).([0-9]*)$/),m){var date=new Date(m[1],m[2]-1);return date}if(s.match(/^\d+(\.\d+)?$/)){var d=new Date(1e3*parseFloat(s));return d.getTime()!=s?null:d}void 0===ignoreTimezone&&(ignoreTimezone=!0);var d=mini.parseISO8601(s,ignoreTimezone)||(s?new Date(s):null);return isNaN(d)?null:d}return null},mini.parseISO8601=function(a,b){var c=a.match(/^([0-9]{4})([-\/\.]([0-9]{1,2})([-\/\.]([0-9]{1,2})([T ]([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);if(!c){if(c=a.match(/^([0-9]{4})[-\/\.]([0-9]{2})[-\/\.]([0-9]{2})[T ]([0-9]{1,2})/)){var d=new Date(c[1],c[2]-1,c[3],c[4]);return d}if(c=a.match(/^([0-9]{4}).([0-9]*)/)){var d=new Date(c[1],c[2]-1);return d}if(c=a.match(/^([0-9]{4}).([0-9]*).([0-9]*)/)){var d=new Date(c[1],c[2]-1,c[3]);return d}if(c=a.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/)){var d=new Date(c[3],c[1]-1,c[2]);return d}return null}var d=new Date(c[1],0,1);if(b||!c[14]){var e=new Date(c[1],0,1,9,0);c[3]&&(d.setMonth(c[3]-1),e.setMonth(c[3]-1)),c[5]&&(d.setDate(c[5]),e.setDate(c[5])),mini.fixDate(d,e),c[7]&&d.setHours(c[7]),c[8]&&d.setMinutes(c[8]),c[10]&&d.setSeconds(c[10]),c[12]&&d.setMilliseconds(1e3*Number("0."+c[12])),mini.fixDate(d,e)}else{d.setUTCFullYear(c[1],c[3]?c[3]-1:0,c[5]||1),d.setUTCHours(c[7]||0,c[8]||0,c[10]||0,c[12]?1e3*Number("0."+c[12]):0);var f=60*Number(c[16])+(c[18]?Number(c[18]):0);f*="-"==c[15]?1:-1,d=new Date(+d+60*f*1e3)}return d},mini.parseTime=function(a,b){if(!a)return null;var c=parseInt(a);if(c==a&&b)return d=new Date(0),"H"==b[0]?d.setHours(c):"m"==b[0]?d.setMinutes(c):"s"==b[0]&&d.setSeconds(c),d;var d=mini.parseDate(a);if(!d){var e=a.split(":"),f=parseInt(parseFloat(e[0])),g=parseInt(parseFloat(e[1])),h=parseInt(parseFloat(e[2]));isNaN(f)||isNaN(g)||isNaN(h)||(d=new Date(0),d.setHours(f),d.setMinutes(g),d.setSeconds(h)),isNaN(f)||"H"!=b&&"HH"!=b?isNaN(f)||isNaN(g)||"H:mm"!=b&&"HH:mm"!=b?isNaN(f)||isNaN(g)||"mm:ss"!=b||(d=new Date(0),d.setMinutes(f),d.setSeconds(g)):(d=new Date(0),d.setHours(f),d.setMinutes(g)):(d=new Date(0),d.setHours(f))}return d},mini.Cookie={get:function(a){for(var b=document.cookie.split("; "),c=null,d=0;d<b.length;d++){var e=b[d].split("=");a==e[0]&&(c=e)}if(c){var f=c[1];return void 0===f?f:unescape(f)}return null},set:function(a,b,c,d){var e=new Date;null!=c&&(e=new Date(e.getTime()+1e3*c*3600*24)),document.cookie=a+"="+escape(b)+(null==c?"":"; expires="+e.toGMTString())+";path=/"+(d?"; domain="+d:"")},del:function(a,b){this.set(a,null,-100,b)}},mini.htmlEncode=function(a){if("string"!=typeof a)return a;var b="";return 0==a.length?"":(b=a,b=b.replace(/</g,"&lt;"),b=b.replace(/>/g,"&gt;"),b=b.replace(/ /g,"&nbsp;"),b=b.replace(/\'/g,"&#39;"),b=b.replace(/\"/g,"&quot;"))},mini.htmlDecode=function(a){if("string"!=typeof a)return a;var b="";return 0==a.length?"":(b=a.replace(/&gt;/g,"&"),b=b.replace(/&lt;/g,"<"),b=b.replace(/&gt;/g,">"),b=b.replace(/&nbsp;/g," "),b=b.replace(/&#39;/g,"'"),b=b.replace(/&quot;/g,'"'))},mini.JSON=new function(){var sb=[],_dateFormat=null,useHasOwn=!!{}.hasOwnProperty,replaceString=function(a,b){var c=m[b];return c?c:(c=b.charCodeAt(),"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16))},doEncode=function(a,b){if(null===a)return void(sb[sb.length]="null");var c=typeof a;if("undefined"==c)return void(sb[sb.length]="null");if(a.push){sb[sb.length]="[";var d,e,f,g=a.length;for(e=0;g>e;e+=1)f=a[e],c=typeof f,"undefined"==c||"function"==c||"unknown"==c||(d&&(sb[sb.length]=","),doEncode(f),d=!0);return void(sb[sb.length]="]")}{if(!a.getFullYear){if("string"==c)return strReg1.test(a)?(sb[sb.length]='"',sb[sb.length]=a.replace(strReg2,replaceString),void(sb[sb.length]='"')):void(sb[sb.length]='"'+a+'"');if("number"==c)return void(sb[sb.length]=a);if("boolean"==c)return void(sb[sb.length]=String(a));sb[sb.length]="{";var d,e,f;for(e in a)(!useHasOwn||a.hasOwnProperty&&a.hasOwnProperty(e))&&(f=a[e],c=typeof f,"undefined"==c||"function"==c||"unknown"==c||(d&&(sb[sb.length]=","),doEncode(e),sb[sb.length]=":",doEncode(f,e),d=!0));return void(sb[sb.length]="}")}if(_dateFormat)sb[sb.length]='"',"function"==typeof _dateFormat?sb[sb.length]=_dateFormat(a,b):sb[sb.length]=mini.formatDate(a,_dateFormat),sb[sb.length]='"';else{var h;sb[sb.length]='"',sb[sb.length]=a.getFullYear(),sb[sb.length]="-",h=a.getMonth()+1,sb[sb.length]=10>h?"0"+h:h,sb[sb.length]="-",h=a.getDate(),sb[sb.length]=10>h?"0"+h:h,sb[sb.length]="T",h=a.getHours(),sb[sb.length]=10>h?"0"+h:h,sb[sb.length]=":",h=a.getMinutes(),sb[sb.length]=10>h?"0"+h:h,sb[sb.length]=":",h=a.getSeconds(),sb[sb.length]=10>h?"0"+h:h,sb[sb.length]='"'}}},m={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},strReg1=/["\\\x00-\x1f]/,strReg2=/([\x00-\x1f\\"])/g;this.encode=function(){return function(a,b){return sb=[],_dateFormat=b,doEncode(a),_dateFormat=null,sb.join("")}}(),this.decode=function(){var dateRe1=/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2}(?:\.*\d*)?)Z*$/,dateRe2=new RegExp("^/+Date\\(([0-9]+).*\\)/+$","g"),re=/[\"\'](\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})[\"\']/g;return function(json,parseDate){function evalParse(json){return parseDate!==!1&&(json=json.replace(__js_dateRegEx,"$1new Date($2)"),json=json.replace(re,"new Date($1,$2-1,$3,$4,$5,$6)"),json=json.replace(__js_dateRegEx2,"new Date($1)")),eval("("+json+")")}if(""===json||null===json||void 0===json)return json;"object"==typeof json&&(json=this.encode(json));var data=null;if(window.JSON&&window.JSON.parse){var dateReviver=function(a,b){if("string"==typeof b){dateRe1.lastIndex=0;var c=dateRe1.exec(b);if(c)return b=new Date(c[1],c[2]-1,c[3],c[4],c[5],c[6]);dateRe2.lastIndex=0;var c=dateRe2.exec(b);if(c)return b=new Date(parseInt(c[1]))}return b};try{var json2=json.replace(__js_dateRegEx,'$1"/Date($2)/"');data=window.JSON.parse(json2,dateReviver)}catch(ex){data=evalParse(json)}}else data=evalParse(json);return data}}()},__js_dateRegEx=new RegExp('(^|[^\\\\])\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\"',"g"),__js_dateRegEx2=new RegExp("[\"']/Date\\(([0-9]+)\\)/[\"']","g"),mini.encode=mini.JSON.encode,mini.decode=mini.JSON.decode,mini.Keyboard={Left:37,Top:38,Right:39,Bottom:40,PageUp:33,PageDown:34,End:35,Home:36,Enter:13,ESC:27,Space:32,Tab:9,Del:46,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123},mini.MouseButton={Left:0,Middle:1,Right:2},isIE&&!isIE9&&(mini.MouseButton={Left:1,Middle:4,Right:2}),String.format=function(a){var b=Array.prototype.slice.call(arguments,1);return a=a||"",a.replace(/\{(\d+)\}/g,function(a,c){return b[c]})},String.prototype.trim=function(){var a=/^\s+|\s+$/g;return function(){return this.replace(a,"")}}(),String.prototype.escapeDateTimeTokens=function(){return this.replace(/([dMyHmsft])/g,"\\$1")},mini.util={},mini.util.StringUtil={},mini.util.CookieUtil={},mini.util.HtmlUtil={},mini.util.MathUtil={},mini.util.StringUtil.lTrim=function(a){for(var b=0;b<a.length;b++)if(" "!=a.charAt(b))return a.substring(b,a.length);return""},mini.util.StringUtil.rTrim=function(a){for(var b=a.length-1;b>=0;b--)if(" "!=a.charAt(b))return a.substring(0,b+1);return""},mini.util.StringUtil.nvl=function(a,b){return null==a||""==a?b:a},mini.util.StringUtil.trimSpace=function(a){return mini.util.StringUtil.rTrim(mini.util.StringUtil.lTrim(a))},mini.util.StringUtil.trimAllSpace=function(a){return a.replace(/\s/g,"")},mini.util.StringUtil.clearEnter=function(a){var b="",c="",d=0;for(d=0;d<a.length;d++)b=a.charAt(d),"\n"!=b&&"\r"!=b&&(c+=b);return mini.util.StringUtil.trimSpace(c)},mini.util.StringUtil.getLength=function(a){var b,c;for(c=0,b=0;b<a.length;b++)c+=a.charCodeAt(b)>=0&&a.charCodeAt(b)<=255?1:2;return c},mini.util.StringUtil.formatMoney=function(a,b,c){function d(a,b){function c(a){for(var b="",c=0;a>c;c++)b+="0";return b}var d=a.indexOf(".");if(-1!=d){var e=a.substring(d+1,a.length);a+=c(b-e.length)}else b>0&&(a+=".",a+=c(b));for(var f=/^(-?\d+)(\d{3})(\.?\d*)/;f.test(a);)a=a.replace(f,"$1,$2$3");return a}if(void 0===b&&(b=2),!mini.util.MathUtil.isNumber(a)){if(void 0==a||""==a)return"";if(a=new String(a),a=a.replace(/\,/g,""),a=new Number(a),isNaN(a))return""}return a=mini.util.MathUtil.toFixed(a,b),a+="",c=c||"",c+d(a,b)},mini.util.MathUtil.toFixed=function(a,b){return mini.util.MathUtil.isNumber(a)?mini.util.MathUtil.isNumber(b)?(a*=Math.pow(10,b),a=Math.round(a),a/=Math.pow(10,b)):a:null},mini.util.MathUtil.toFixed2=function(a,b){function c(a){for(var b="",c=0;a>c;c++)b+="0";return b}a=mini.util.MathUtil.toFixed(a,b),a+="";var d=a.indexOf(".");if(-1!=d){var e=a.substring(d+1,a.length);a+=c(b-e.length)}else b>0&&(a+=".",a+=c(b));return a},mini.util.MathUtil.isNumber=function(a){return $.isNumeric(a)},mini.util.HtmlUtil.getURI=function(){return protocol=window.location.protocol,host=window.location.host,url=window.location.href,url.replace(protocol+"//"+host,"")},mini.util.CookieUtil.getCookie=function(a){return $.cookie(a)},mini.util.CookieUtil.setCookie=function(a,b,c){$.cookie(a,b,option)},mini.util.disableBackspaceToPreviousPage=function(){$(document).unbind("keydown").bind("keydown",function(a){var b=!1;if(8===a.keyCode){var c=a.srcElement||a.target;b="INPUT"===c.tagName.toUpperCase()&&("TEXT"===c.type.toUpperCase()||"PASSWORD"===c.type.toUpperCase()||"FILE"===c.type.toUpperCase()||"EMAIL"===c.type.toUpperCase()||"SEARCH"===c.type.toUpperCase()||"DATE"===c.type.toUpperCase())||"TEXTAREA"===c.tagName.toUpperCase()?c.readOnly||c.disabled:!0}b&&a.preventDefault()})},mini.util.getMap=function(a,b){return mini._getMap(a,b)},mini.util.setMap=function(a,b,c){return mini._setMap(a,b,c)},mini=mini||{},mini_onOne=function(a,b,c,d){var e="on"+b.toLowerCase();a[e]=function(a){a=a||window.event,a.target=a.target||a.srcElement,a.preventDefault||(a.preventDefault=function(){window.event&&(window.event.returnValue=!1)}),a.stopPropogation||(a.stopPropogation=function(){window.event&&(window.event.cancelBubble=!0)});var b=c.call(d,a);if(window.event)try{a.stopPropogation=null,a.preventDefault=null}catch(a){}return b===!1?!1:void 0}},mini_on=function(a,b,c,d){if(a=mini.byId(a),d=d||a,!(a&&b&&c&&d&&jQuery(a)&&0!=jQuery(a).length))return!1;var e=mini.findListener(a,b,c,d);if(e)return!1;var f=mini.createDelegate(c,d);mini.listeners.push([a,b,c,d,f]),isFirefox&&"mousewheel"==b&&(b="DOMMouseScroll"),jQuery(a).bind(b,f)},mini_un=function(a,b,c,d){if(a=mini.byId(a),d=d||a,!(a&&b&&c&&d&&jQuery(a)&&0!=jQuery(a).length))return!1;var e=mini.findListener(a,b,c,d);return e?(mini.listeners.remove(e),isFirefox&&"mousewheel"==b&&(b="DOMMouseScroll"),void jQuery(a).unbind(b,e[4])):!1},mini.copyTo(mini,{listeners:[],on:mini_on,un:mini_un,findListener:function(a,b,c,d){if(a=mini.byId(a),d=d||a,!(a&&b&&c&&d&&jQuery(a)&&0!=jQuery(a).length))return!1;for(var e=mini.listeners,f=0,g=e.length;g>f;f++){var h=e[f];if(h[0]==a&&h[1]==b&&h[2]==c&&h[3]==d)return h}},clearEvent:function(a,b){if(a=mini.byId(a),!a||!jQuery(a)||0==jQuery(a).length)return!1;for(var c=mini.listeners,d=c.length-1;d>=0;d--){var e=c[d];e[0]==a&&(b&&b!=e[1]||mini.un(a,e[1],e[2],e[3]))}a.onmouseover=a.onmousedown=null}}),mini.__windowResizes=[],mini.onWindowResize=function(a,b){mini.__windowResizes.push([a,b])},mini._BindCallbacks=[],mini._BindEvents=function(a,b){mini._BindCallbacks.push([a,b]),mini._EventTimer||mini._FireBindEvents()},mini._FireBindEvents=function(){for(var a=0,b=mini._BindCallbacks.length;b>a;a++){var c=mini._BindCallbacks[a];c[0].call(c[1])}mini._BindCallbacks=[],mini._EventTimer=null},mini=mini||{},mini.doWindowResizeTimer=null,mini_onresize=function(a){if(mini.doWindowResizeTimer&&clearTimeout(mini.doWindowResizeTimer),mini.WindowVisible=mini.isWindowDisplay(),0!=mini.WindowVisible&&0!=mini.allowLayout)if("undefined"!=typeof Ext)mini.doWindowResizeTimer=setTimeout(function(){var a=document.documentElement.clientWidth,b=document.documentElement.clientHeight;mini.__LastWindowWidth==a&&mini.__LastWindowHeight==b||(mini.__LastWindowWidth=a,mini.__LastWindowHeight=b,mini.layout(null,!1)),mini.doWindowResizeTimer=null},300);else{var b=100;try{parent&&parent!=window&&parent.mini&&(b=0)}catch(c){}mini.doWindowResizeTimer=setTimeout(function(){var a=document.documentElement.clientWidth,b=document.documentElement.clientHeight;mini.__LastWindowWidth==a&&mini.__LastWindowHeight==b||(mini.__LastWindowWidth=a,mini.__LastWindowHeight=b,mini.layout(null,!1)),mini.doWindowResizeTimer=null},b)}},mini_onload=function(a){mini.layout(null,!1),mini.on(window,"resize",mini_onresize)},mini_unload=function(a){try{var b=mini._getTopWindow();b[mini._WindowID]="",delete b[mini._WindowID]}catch(c){}var d=document.body.getElementsByTagName("iframe");if(d.length>0){for(var e=[],f=0,g=d.length;g>f;f++)e.push(d[f]);for(var f=0,g=e.length;g>f;f++)try{var h=e[f];h._ondestroy=null,h.onload=function(){},jQuery(h).unbind("load"),h.src="";try{h.contentWindow.document.write(""),h.contentWindow.document.close()}catch(c){}h.parentNode&&h.parentNode.removeChild(h)}catch(a){}}for(var i=mini.getComponents(),f=0,g=i.length;g>f;f++){var j=i[f];j.destroyed!==!0&&j.destroy(!1)}i.length=0,i=null,mini.un(window,"unload",mini_unload),mini.un(window,"load",mini_onload),mini.un(window,"resize",mini_onresize),mini.clearEvent(window),mini.clearEvent(document),mini.components={},mini.classes={},mini.uiClasses={},mini.uids={},mini._topWindow=null,window.Owner=null,window.CloseOwnerWindow=null,delete String.prototype.trim,delete String.prototype.escapeDateTimeTokens,delete String.format,delete Array.prototype.add,delete Array.prototype.enqueue,delete Array.prototype.getRange,delete Array.prototype.addRange,delete Array.prototype.clear,delete Array.prototype.clone,delete Array.prototype.contains,delete Array.prototype.indexOf,delete Array.prototype.dequeue,delete Array.prototype.insert,delete Array.prototype.insertRange,delete Array.prototype.remove,delete Array.prototype.removeAt,delete Array.prototype.removeRange,delete Date.prototype.getHalfYear,delete Date.prototype.getQuarter;try{CollectGarbage()}catch(a){}},mini=mini||{},mini.Drag=function(a){mini.copyTo(this,a)},mini.Drag.prototype={onStart:mini.emptyFn,onMove:mini.emptyFn,onStop:mini.emptyFn,capture:!1,fps:20,event:null,delay:80,destroy:function(a){mini.clearEvent(document),delete this.trigger,this.context&&(mini.clearEvent(this.context),this.context.parentNode.removeChild(this.context),this.context=null)},start:function(a){a.preventDefault(),a&&(this.event=a),this.now=this.init=[this.event.pageX,this.event.pageY];var b=document;mini.on(b,"mousemove",this.move,this),mini.on(b,"mouseup",this.stop,this),mini.on(b,"contextmenu",this.contextmenu,this),this.context&&mini.on(this.context,"contextmenu",this.contextmenu,this),this.trigger=a.target,mini.selectable(this.trigger,!1),mini.selectable(b.body,!1),this.capture&&(isIE?this.trigger.setCapture(!0):document.captureEvents&&document.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP|Event.MOUSEDOWN)),this.started=!1,this.startTime=new Date},contextmenu:function(a){this.context&&mini.un(this.context,"contextmenu",this.contextmenu,this),mini.un(document,"contextmenu",this.contextmenu,this),a.preventDefault(),a.stopPropagation()},move:function(a){if(!(this.delay&&new Date-this.startTime<this.delay)){this.started||(this.started=!0,this.onStart(this));var b=this;this.timer||(this.timer=setTimeout(function(){b.now=[a.pageX,a.pageY],b.event=a,b.onMove(b),b.timer=null},5))}},stop:function(a){this.now=[a.pageX,a.pageY],this.event=a,this.timer&&(clearTimeout(this.timer),this.timer=null);var b=document;mini.selectable(this.trigger,!0),mini.selectable(b.body,!0),isIE&&(this.trigger.setCapture(!1),this.trigger.releaseCapture());var c=mini.MouseButton.Right!=a.button;0==c&&a.preventDefault(),mini.un(b,"mousemove",this.move,this),mini.un(b,"mouseup",this.stop,this);var d=this;setTimeout(function(){mini.un(document,"contextmenu",d.contextmenu,d),d.context&&mini.un(d.context,"contextmenu",d.contextmenu,d)},1),this.started&&d.onStop(d,c)}},mini=mini||{},mini.loadJS=function(a,b){return a?"function"==typeof b?loadJS._async(a,b):loadJS._sync(a):void 0},mini.loadJS._js={},mini.loadJS._async=function(a,b){function c(){for(var a=0;a<d.callbacks.length;a++){var b=d.callbacks[a];b&&b()}d.callbacks.length=0}var d=mini.loadJS._js[a];if(d||(d=mini.loadJS._js[a]={create:!1,loaded:!1,callbacks:[]}),d.loaded)return void setTimeout(function(){b()},1);if(d.callbacks.push(b),!d.create){d.create=!0;var e=document.getElementsByTagName("head")[0],f=document.createElement("script");return f.src=a,f.type="text/javascript",setTimeout(function(){document.all?f.onreadystatechange=function(){("loaded"==f.readyState||"complete"==f.readyState)&&(c(),d.loaded=!0)}:f.onload=function(){c(),d.loaded=!0},e.appendChild(f)},1),f}},mini.loadJS._sync=function(a){if(!loadJS._js[a]){loadJS._js[a]={create:!0,loaded:!0,callbacks:[]};var b=document.getElementsByTagName("head")[0],c=document.createElement("script");return c.type="text/javascript",c.text=loadText(a),b.appendChild(c),c}},mini.loadText=function(a){function b(){if(4==e.readyState){var a=d?0:200;e.status==a&&(c=e.responseText)}}var c="",d=document.all&&"file:"==location.protocol,e=null;d?e=new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest?e=new XMLHttpRequest:window.ActiveXObject&&(e=new ActiveXObject("Microsoft.XMLHTTP")),e.onreadystatechange=b;var f="_t="+(new Date).getTime();return f=-1==a.indexOf("?")?"?"+f:"&"+f,a+=f,e.open("GET",a,!1),e.send(null),c},mini.loadJSON=function(url){var text=loadText(url),o=eval("("+text+")");return o},mini.loadCSS=function(a,b){if(a&&!loadCSS._css[a]){var c=document.getElementsByTagName("head")[0],d=document.createElement("link");return b&&(d.id=b),d.href=a,d.rel="stylesheet",d.type="text/css",c.appendChild(d),d}},mini.loadCSS._css={},mini.innerHTML=function(a,b){if("string"==typeof a&&(a=document.getElementById(a)),a){b='<div style="display:none">&nbsp;</div>'+b,a.innerHTML=b,mini.__executeScripts(a);a.firstChild}},mini.__executeScripts=function(a){for(var b=a.getElementsByTagName("script"),c=0,d=b.length;d>c;c++){var e=b[c],f=e.src;if(f)mini.loadJS(f);else{var g=document.createElement("script");g.type="text/javascript",g.text=e.text,a.appendChild(g)}}for(var c=b.length-1;c>=0;c--){var e=b[c];e.parentNode.removeChild(e)}},mini=mini||{},mini._MaskID=1,mini._MaskObjects={},mini.mask=function(a){function b(){g.style.display="block";var a=mini.getSize(g);g.style.marginLeft=-a.width/2+"px",g.style.marginTop=-a.height/2+"px"}var c=mini.byId(a);mini.isElement(c)?a={el:c}:"string"==typeof a&&(a={html:a}),a=mini.copyTo({html:"",cls:"",style:"",iconCls:"",message:"",backStyle:"background:#ccc"},a),a.el=mini.byId(a.el),a.el||(a.el=document.body);var c=a.el;mini.unmask(a.el),c._maskid=mini._MaskID++,mini._MaskObjects[c._maskid]=a;var d='<div class="'+a.iconCls+'"></div>',e='<table class="mini-messagebox-table"  cellspacing="0" cellpadding="0"><tr><td>'+d+'</td><td  class="mini-messagebox-content-text">'+(a.html||a.message||"")+"</td></tr></table>",f=mini.append(c,'<div class="mini-mask"><div class="mini-mask-background" style="'+a.backStyle+'"></div><div class="mini-mask-msg '+a.cls+'" style="'+a.style+'">'+e+"</div></div>");c==document.body&&mini.addClass(f,"mini-fixed"),a.maskEl=f,mini.isNull(a.opacity)||mini.setOpacity(f.firstChild,a.opacity);var g=f.lastChild;g.style.display="none",setTimeout(function(){b()},0)},mini.unmask=function(a){a=mini.byId(a),a||(a=document.body);var b=mini._MaskObjects[a._maskid];if(b){delete mini._MaskObjects[a._maskid];var c=b.maskEl;b.maskEl=null,c&&c.parentNode&&c.parentNode.removeChild(c)}},mini=mini||{},mini._Columns={},mini._getColumn=function(a){var b=mini._Columns[a.toLowerCase()];return b?b():{}},mini.IndexColumn=function(a){return mini.copyTo({width:30,cellCls:"",align:"center",draggable:!1,allowDrag:!0,init:function(a){a.on("addrow",this.__OnIndexChanged,this),a.on("removerow",this.__OnIndexChanged,this),a.on("moverow",this.__OnIndexChanged,this),a.isTree&&(a.on("loadnode",this.__OnIndexChanged,this),this._gridUID=a.uid,this._rowIdField="_id")},getNumberId:function(a){return this._gridUID+"$number$"+a[this._rowIdField]},createNumber:function(a,b){return mini.isNull(a.pageIndex)?b+1:a.pageIndex*a.pageSize+b+1},renderer:function(a){var b=a.sender;this.draggable&&(a.cellStyle||(a.cellStyle=""),a.cellStyle+=";cursor:move;");var c='<div id="'+this.getNumberId(a.record)+'">';return c+=mini.isNull(b.pageIndex)?a.rowIndex+1:b.pageIndex*b.pageSize+a.rowIndex+1,c+="</div>"},__OnIndexChanged:function(a){for(var b=a.sender,c=b.toArray(),d=0,e=c.length;e>d;d++){var f=c[d],g=this.getNumberId(f),h=document.getElementById(g);h&&(h.innerHTML=this.createNumber(b,d))}}},a)},mini._Columns.indexcolumn=mini.IndexColumn,mini.CheckColumn=function(a){return mini.copyTo({width:30,cellCls:"mini-checkcolumn",headerCls:"mini-checkcolumn",_multiRowSelect:!0,header:function(a){var b=this.uid+"checkall",c='<input type="checkbox" id="'+b+'" />';return 0==this.multiSelect&&(c=""),c},getCheckId:function(a){return this._gridUID+"$checkcolumn$"+a[this._rowIdField]},init:function(a){a.on("selectionchanged",this.__OnSelectionChanged,this),a.on("HeaderCellClick",this.__OnHeaderCellClick,this)},renderer:function(a){var b=this.getCheckId(a.record),c=a.sender.isSelected?a.sender.isSelected(a.record):!1,d="checkbox",e=a.sender;return 0==e.multiSelect&&(d="radio"),'<input type="'+d+'" id="'+b+'" '+(c?"checked":"")+' hidefocus style="outline:none;" onclick="return false"/>'},__OnHeaderCellClick:function(a){var b=a.sender;if(a.column==this){var c=b.uid+"checkall",d=document.getElementById(c);d&&a.htmlEvent.target.id==c&&(b.getMultiSelect()?d.checked?b.selectAll():b.deselectAll():(b.deselectAll(),d.checked&&b.select(0)),b.fire("checkall"))}},__OnSelectionChanged:function(a){for(var b=a.sender,c=b.toArray(),d=0,e=c.length;e>d;d++){var f=c[d],g=b.isSelected(f),h=b.uid+"$checkcolumn$"+f[b._rowIdField],i=document.getElementById(h);i&&(i.checked=g)}},_doCheckState:function(a){var b=a.getData();if(0!=b.length){var c=a.uid+"checkall",d=document.getElementById(c);if(d&&a._getSelectAllCheckState){var e=a._getSelectAllCheckState();"has"==e?(d.indeterminate=!0,d.checked=!0):(d.indeterminate=!1,d.checked=e)}}}},a)},mini._Columns.checkcolumn=mini.CheckColumn,mini.ExpandColumn=function(a){return mini.copyTo({width:30,cellCls:"",align:"center",draggable:!1,cellStyle:"padding:0",renderer:function(a){return'<a class="mini-grid-ecIcon" href="javascript:#" onclick="return false"></a>'},init:function(a){a.on("cellclick",this.__OnCellClick,this)},__OnCellClick:function(a){var b=a.sender;if(a.column==this&&b.isShowRowDetail&&mini.findParent(a.htmlEvent.target,"mini-grid-ecIcon")){var c=b.isShowRowDetail(a.record);b.autoHideRowDetail&&b.hideAllRowDetail(),c?b.hideRowDetail(a.record):b.showRowDetail(a.record)}}},a)},mini._Columns.expandcolumn=mini.ExpandColumn,mini.CheckBoxColumn=function(a){return mini.copyTo({_type:"checkboxcolumn",header:"#",headerAlign:"center",cellCls:"mini-checkcolumn",trueValue:!0,falseValue:!1,readOnly:!1,getCheckId:function(a){return this._gridUID+"$checkbox$"+a[this._rowIdField]},getCheckBoxEl:function(a){return document.getElementById(this.getCheckId(a))},renderer:function(a){var b=this.getCheckId(a.record),c=mini._getMap(a.field,a.record),d=c==this.trueValue?!0:!1,e="checkbox";return'<input type="'+e+'" id="'+b+'" '+(d?"checked":"")+' hidefocus style="outline:none;" onclick="return false;"/>'},init:function(a){function b(b){if(!a.isReadOnly()&&!this.readOnly&&(b.value=mini._getMap(b.field,b.record),a.fire("cellbeginedit",b),b.cancel!==!0)){var c=mini._getMap(b.column.field,b.record),d=c==this.trueValue?this.falseValue:this.trueValue;a._OnCellCommitEdit&&a._OnCellCommitEdit(b.record,b.column,d)}}function c(c){if(c.column==this){var d=this.getCheckId(c.record),e=c.htmlEvent.target;e.id==d&&(a.allowCellEdit?(c.cancel=!1,b.call(this,c)):a.isEditingRow&&a.isEditingRow(c.record)&&setTimeout(function(){e.checked=!e.checked},1))}}this.grid=a,a.on("cellclick",c,this),mini.on(this.grid.el,"keydown",function(c){if(32==c.keyCode&&a.allowCellEdit){var d=a.getCurrentCell();if(!d)return;var e={record:d[0],column:d[1]};b.call(this,e),c.preventDefault()}},this);var d=parseInt(this.trueValue),e=parseInt(this.falseValue);isNaN(d)||(this.trueValue=d),isNaN(e)||(this.falseValue=e)}},a)},mini._Columns.checkboxcolumn=mini.CheckBoxColumn,mini.ComboBoxColumn=function(a){return mini.copyTo({renderer:function(a){var b=mini.isNull(a.value)?"":String(a.value),c=b.split(","),d="id",e="text",f={},g=a.column.editor;if(g&&"combobox"==g.type){var h=this.__editor;h||(mini.isControl(g)?h=g:(g=mini.clone(g),h=mini.create(g)),this.__editor=h),d=h.getValueField(),e=h.getTextField(),f={};for(var i=h.getData(),j=0,k=i.length;k>j;j++){var l=i[j];f[l[d]]=l}this._valueMaps=f}for(var m=[],j=0,k=c.length;k>j;j++){var n=c[j],l=f[n];if(l){var o=l[e];(null===o||void 0===o)&&(o=""),m.push(o)}}return m.join(",")}},a)},mini._Columns.comboboxcolumn=mini.ComboBoxColumn,mini.RadioButtonColumn=function(a){return mini.copyTo({_type:"radiobuttoncolumn",header:"",headerAlign:"center",cellCls:"mini-checkcolumn",trueValue:!0,falseValue:!1,readOnly:!1,getCheckId:function(a){return this._gridUID+"$radio$"+a[this._rowIdField]},getCheckBoxEl:function(a){return document.getElementById(this.getCheckId(a))},renderer:function(a){var b=a.sender,c=this.getCheckId(a.record),d=mini._getMap(a.field,a.record),e=d==this.trueValue?!0:!1,f="radio",g=b._id+a.column.field,h='<div style="position:relative;">';return h+='<input name="'+g+'" type="'+f+'" id="'+c+'" '+(e?"checked":"")+' hidefocus style="outline:none;" onclick="return false;" style="position:relative;z-index:1;"/>',b.allowCellEdit||b.isEditingRow(a.record)||(h+='<div class="mini-grid-radio-mask"></div>'),h+="</div>"},init:function(a){function b(b){if(!a.isReadOnly()&&!this.readOnly&&(b.value=mini._getMap(b.field,b.record),a.fire("cellbeginedit",b),b.cancel!==!0)){var c=mini._getMap(b.column.field,b.record);if(c==this.trueValue)return;for(var d=c==this.trueValue?this.falseValue:this.trueValue,e=a.data,f=0,g=e.length;g>f;f++){var h=e[f];if(h!=b.record){var c=mini._getMap(b.column.field,h);c!=this.falseValue&&a.updateRow(h,b.column.field,this.falseValue)}}a._OnCellCommitEdit&&a._OnCellCommitEdit(b.record,b.column,d)}}function c(c){if(c.column==this){var d=this.getCheckId(c.record),e=c.htmlEvent.target;if(e.id==d)if(a.allowCellEdit)c.cancel=!1,b.call(this,c);else if(a.isEditingRow&&a.isEditingRow(c.record)){var f=this;setTimeout(function(){e.checked=!0;for(var b=a.getData(),d=0,g=b.length;g>d;d++){var h=b[d];if(h!=c.record){var i=c.column.field,j=mini._getMap(i,h);if(j!=f.falseValue&&h!=c.record)if(a._dataSource)mini._setMap(c.column.field,f.falseValue,h),a._dataSource._setModified(h,i,j);else{var k={};mini._setMap(i,f.falseValue,k),a._doUpdateRow(h,k)}}}},1)}}}this.grid=a,a.on("cellclick",c,this),mini.on(this.grid.el,"keydown",function(c){if(32==c.keyCode&&a.allowCellEdit){var d=a.getCurrentCell();if(!d)return;if(d[1]!=this)return;var e={record:d[0],column:d[1]};e.field=e.column.field,b.call(this,e),c.preventDefault()}},this);var d=parseInt(this.trueValue),e=parseInt(this.falseValue);isNaN(d)||(this.trueValue=d),isNaN(e)||(this.falseValue=e)}},a)},mini._Columns.radiobuttoncolumn=mini.RadioButtonColumn,mini=mini||{},mini._firstParse=!0,mini.parse=function(a){if(mini._firstParse){mini._firstParse=!1;for(var b=document.getElementsByTagName("iframe"),c=[],d=0,e=b.length;e>d;d++){var f=b[d];c.push(f)}for(var d=0,e=c.length;e>d;d++){var f=c[d],g=$(f).attr("src");g&&(f.loaded=!1,f._onload=f.onload,f._src=g,f.onload=function(){},f.src="")}setTimeout(function(){for(var a=0,b=c.length;b>a;a++){var d=c[a];d._src&&""==$(d).attr("src")&&(d.loaded=!0,d.onload=d._onload,d.src=d._src,d._src=d._onload=null)}},20)}if("string"==typeof a){var h=a;a=mini.byId(h),a||(a=document.body)}a&&!mini.isElement(a)&&(a=a.el),a||(a=document.body);var i=mini.WindowVisible;isIE&&(mini.WindowVisible=!1),mini._doParse(a),mini.WindowVisible=i,mini.layout(a)},mini._doParse=function(a){if(a){var b=a.nodeName.toLowerCase();if(b){var c=a.className;if(c&&c.split){var d=mini.get(a);if(!d)for(var e=c.split(" "),f=0,g=e.length;g>f;f++){var h=e[f],i=mini.getClassByUICls(h);if(i){mini.removeClass(a,h);var j=new i;j._allowLayout=!1,j=mini.applyTo.call(j,a),a=j.el,j._allowLayout=!0;break}}}if(!("select"==b||mini.hasClass(a,"mini-menu")||mini.hasClass(a,"mini-datagrid")||mini.hasClass(a,"mini-treegrid")||mini.hasClass(a,"mini-tree")||mini.hasClass(a,"mini-button")||mini.hasClass(a,"mini-textbox")||mini.hasClass(a,"mini-buttonedit")))for(var k=mini.getChildNodes(a,!0),f=0,g=k.length;g>f;f++){var l=k[f];1==l.nodeType&&l.parentNode==a&&mini._doParse(l)}}}},jQuery(function(){mini_autoRun&&mini.run()}),mini.run=function(){
mini.isReady=!0,mini.parse(),mini._FireBindEvents(),"hidden"!=mini.getStyle(document.body,"overflow")&&"hidden"!=mini.getStyle(document.documentElement,"overflow")||!isIE6&&!isIE7||(jQuery(document.body).css("overflow","visible"),jQuery(document.documentElement).css("overflow","visible")),mini.__LastWindowWidth=document.documentElement.clientWidth,mini.__LastWindowHeight=document.documentElement.clientHeight,mini_autoRun?mini.on(window,"load",mini_onload):mini_onload(null),mini.on(window,"resize",function(a){for(var b=mini.__windowResizes,c=0,d=b.length;d>c;c++){var e=b[c];e[0].call(e[1],a)}}),mini.on(window,"unload",mini_unload),isIE&&setInterval(function(){CollectGarbage()},1e3)},mini=mini||{},mini._ValidateVType=function(a,b,c,d){for(var e=a.split(";"),f=0,g=e.length;g>f;f++){var a=e[f].trim(),h=a.split(":"),i=h[0],j=h[1];j=j?j.split(","):[];var k=mini.VTypes[i];if(k){var l=k(b,j);if(l!==!0){c.isValid=!1;var m=h[0]+"ErrorText";c.errorText=d[m]||mini.VTypes[m]||"",c.errorText=String.format(c.errorText,j[0],j[1],j[2],j[3],j[4]);break}}}},mini._getErrorText=function(a,b){return a&&a[b]?a[b]:mini.VTypes[b]},mini.VTypes={uniqueErrorText:"\u4e0d\u80fd\u91cd\u590d.",requiredErrorText:"\u4e0d\u80fd\u4e3a\u7a7a.",emailErrorText:"\u8bf7\u8f93\u5165\u90ae\u4ef6\u683c\u5f0f.",urlErrorText:"\u8bf7\u8f93\u5165URL\u683c\u5f0f.",floatErrorText:"\u8bf7\u8f93\u5165\u6570\u5b57.",intErrorText:"\u8bf7\u8f93\u5165\u6574\u6570.",dateErrorText:"\u8bf7\u8f93\u5165\u65e5\u671f\u683c\u5f0f {0}.",maxLengthErrorText:"\u4e0d\u80fd\u8d85\u8fc7 {0} \u4e2a\u5b57\u7b26.",minLengthErrorText:"\u4e0d\u80fd\u5c11\u4e8e {0} \u4e2a\u5b57\u7b26.",maxErrorText:"\u6570\u5b57\u4e0d\u80fd\u5927\u4e8e {0}.",minErrorText:"\u6570\u5b57\u4e0d\u80fd\u5c0f\u4e8e {0}.",rangeLengthErrorText:"\u5b57\u7b26\u957f\u5ea6\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4.",rangeCharErrorText:"\u5b57\u7b26\u6570\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4.",rangeErrorText:"\u6570\u5b57\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4.",rangeDecimalsErrorText:"\u8bf7\u4fdd\u7559\u5c0f\u6570\u70b9\u540e {0} \u4f4d\u5c0f\u6570.",moneyErrorText:"\u91d1\u989d\u683c\u5f0f\u5e94\u4e3a9,999,999.00.",required:function(a,b){return mini.isNull(a)||""===a?!1:!0},email:function(a,b){return mini.isNull(a)||""===a?!0:-1!=a.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)?!0:!1},url:function(a,b){function c(a){a=a.toLowerCase();var b="^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$",c=new RegExp(b);return c.test(a)?!0:!1}return mini.isNull(a)||""===a?!0:c(a)},"int":function(a,b){function c(a){0>a&&(a=-a);var b=String(a);return b.length>0&&!/[^0-9]/.test(b)}return mini.isNull(a)||""===a?!0:c(a)},"float":function(a,b){function c(a){0>a&&(a=-a);var b=String(a),c=/^([-]?)([1-9]\d*(\.\d+){0,1})$|^0(\.\d+){0,1}$/;return b.length>0&&c.test(b)}return mini.isNull(a)||""===a?!0:c(a)},date:function(a,b){if(mini.isNull(a)||""===a)return!0;if(!a)return!1;var c=null,d=b[0];if(d){if(c=mini.parseDate(a,d),c&&c.getFullYear&&mini.formatDate(c,d)==a)return!0}else if(c=mini.parseDate(a,"yyyy-MM-dd"),c||(c=mini.parseDate(a,"yyyy/MM/dd")),c||(c=mini.parseDate(a,"MM/dd/yyyy")),c&&c.getFullYear)return!0;return!1},maxLength:function(a,b){if(mini.isNull(a)||""===a)return!0;var c=parseInt(b);return!a||isNaN(c)?!0:a.length<=c?!0:!1},minLength:function(a,b){if(mini.isNull(a)||""===a)return!0;var c=parseInt(b);return isNaN(c)?!0:a.length>=c?!0:!1},rangeLength:function(a,b){if(mini.isNull(a)||""===a)return!0;if(!a)return!1;var c=parseFloat(b[0]),d=parseFloat(b[1]);return isNaN(c)||isNaN(d)?!0:c<=a.length&&a.length<=d?!0:!1},rangeChar:function(a,b){function c(a){var b=/[^\x00-\xff]/gi;return null!=a.match(b)?!0:!1}if(mini.isNull(a)||""===a)return!0;var d=parseFloat(b[0]),e=parseFloat(b[1]);if(isNaN(d)||isNaN(e))return!0;for(var f=0,g=String(a).split(""),h=0,i=g.length;i>h;h++)f+=c(g[h])?2:1;return f>=d&&e>=f?!0:!1},range:function(a,b){if(0==mini.VTypes["float"](a,b))return!1;if(mini.isNull(a)||""===a)return!0;if(a=parseFloat(a),isNaN(a))return!1;var c=parseFloat(b[0]),d=parseFloat(b[1]);return isNaN(c)||isNaN(d)?!0:a>=c&&d>=a?!0:!1},rangeDecimals:function(a,b){if(mini.isNull(a)||""===a)return!0;if(-1==a.indexOf("."))return!0;var c=parseInt(b);if(isNaN(c))return!0;var d=new RegExp("^-?0\\.\\d{1,"+c+"}$|^-?[1-9]\\d*\\.\\d{1,"+c+"}$");return null!=a.match(d)?!0:!1},money:function(a,b){if(mini.isNull(a)||""===a)return!0;var c;if(c=/^[\d|\,\.]*$/,!c.test(a))return!1;var d=parseInt(b);return c=isNaN(d)?"^-?([1-9]{1,3})(,\\d{3})*(\\.\\d+)?$|^-?(0\\.\\d+)$":"^-?([1-9]{1,3})(,\\d{3})*(\\.\\d{"+d+"})$|^-?(0\\.\\d{"+d+"})$",c=new RegExp(c),null!=a.match(c)?!0:!1}},mini.summaryTypes={count:function(a){return a||(a=[]),a.length},max:function(a,b){a||(a=[]);for(var c=null,d=0,e=a.length;e>d;d++){var f=a[d],g=parseFloat(f[b]);null===g||void 0===g||isNaN(g)||(null==c||g>c)&&(c=g)}return c},min:function(a,b){a||(a=[]);for(var c=null,d=0,e=a.length;e>d;d++){var f=a[d],g=parseFloat(f[b]);null===g||void 0===g||isNaN(g)||(null==c||c>g)&&(c=g)}return c},avg:function(a,b){if(a||(a=[]),0==a.length)return 0;for(var c=0,d=0,e=a.length;e>d;d++){var f=a[d],g=parseFloat(f[b]);null===g||void 0===g||isNaN(g)||(c+=g)}var h=c/a.length;return h},sum:function(a,b){a||(a=[]);for(var c=0,d=0,e=a.length;e>d;d++){var f=a[d],g=parseFloat(f[b]);null===g||void 0===g||isNaN(g)||(c+=g)}return c}},mini.formatCurrency=function(a,b){a=String(a).replace(/\$|\,/g,""),isNaN(a)&&(a="0"),sign=a==(a=Math.abs(a)),a=Math.floor(100*a+.50000000001),cents=a%100,a=Math.floor(a/100).toString(),cents<10&&(cents="0"+cents);for(var c=0;c<Math.floor((a.length-(1+c))/3);c++)a=a.substring(0,a.length-(4*c+3))+","+a.substring(a.length-(4*c+3));return b=b||"",b+((sign?"":"-")+a+"."+cents)},mini.formatPercent=function(a,b,c){a=Number(a),isNaN(a)&&(a="0");var d="%";return b===!1&&(d=""),parseFloat((100*a).toFixed(c))+d},mini._Resizer=function(a){this.owner=a,mini.on(this.owner.el,"mousedown",this.__OnMouseDown,this)},mini._Resizer.prototype={destroy:function(a){this._resizeDragger&&this._resizeDragger.destroy()},__OnMouseDown:function(a){var b=mini.hasClass(a.target,"mini-resizer-trigger");if(b&&this.owner.allowResize){var c=this._getResizeDrag();c.start(a)}},_getResizeDrag:function(){return this._resizeDragger||(this._resizeDragger=new mini.Drag({capture:!0,onStart:mini.createDelegate(this._OnDragStart,this),onMove:mini.createDelegate(this._OnDragMove,this),onStop:mini.createDelegate(this._OnDragStop,this)})),this._resizeDragger},_OnDragStart:function(a){this.proxy=mini.append(document.body,'<div class="mini-resizer-proxy"></div>'),this.proxy.style.cursor="se-resize",this.elBox=mini.getBox(this.owner.el),mini.setBox(this.proxy,this.elBox)},_OnDragMove:function(a){var b=this.owner,c=this,d=a.now[0]-a.init[0],e=a.now[1]-a.init[1],f=this.elBox.width+d,g=this.elBox.height+e;f<b.minWidth&&(f=b.minWidth),g<b.minHeight&&(g=b.minHeight),f>b.maxWidth&&(f=b.maxWidth),g>b.maxHeight&&(g=b.maxHeight),mini.setSize(this.proxy,f,g),this._moveTimer=setTimeout(function(){c._moveTimer&&clearTimeout(c._moveTimer),c._moveTimer=null,c.owner.fire("move.resizer",{w:f,h:g})},50)},_OnDragStop:function(a,b){if(this.proxy){var c=mini.getBox(this.proxy);jQuery(this.proxy).remove(),this.proxy=null,this.elBox=null,b&&(this.owner.setWidth(c.width),this.owner.setHeight(c.height),this.owner.fire("resize"))}}},mini=mini||{},mini.Component=function(){this._events={},this.uid=mini.newId(this._idPre),this._id=this.uid,this.id||(this.id=this.uid),mini.reg(this)},mini.Component.prototype={defaultValueTriggerChange:!1,isControl:!0,id:null,_idPre:"mini-",_idSet:!1,_canFire:!0,set:function(a){if("string"==typeof a)return this;var b=this._allowLayout;this._allowLayout=!1;var c=a.renderTo||a.render;delete a.renderTo,delete a.render;for(var d in a)if(0==d.toLowerCase().indexOf("on")){var e=a[d];this.on(d.substring(2,d.length).toLowerCase(),e),delete a[d]}for(var d in a){var f=a[d],g="set"+d.charAt(0).toUpperCase()+d.substring(1,d.length),h=this[g];h?"value"==d?h.call(this,f,this.defaultValueTriggerChange):h.call(this,f):this[d]=f}return c&&this.render&&this.render(c),this._allowLayout=b,this.doLayout&&this.doLayout(),this},fire:function(a,b){if(0!=this._canFire){a=a.toLowerCase();var c=this._events[a];if(c){b||(b={}),b&&b!=this&&(b.source=b.sender=this,b.type||(b.type=a));for(var d=0,e=c.length;e>d;d++){var f=c[d];f&&f[0].apply(f[1],[b])}}}},on:function(type,fn,scope){if("string"==typeof fn){var f=mini._getFunctoin(fn);if(f)fn=f;else{var id=mini.newId("__str_");window[id]=fn,eval("fn = function(e){var s = "+id+";var fn = mini._getFunctoin(s); if(fn) {fn.call(this, e)}else{eval(s);}}")}}if("function"!=typeof fn||!type)return!1;type=type.toLowerCase();var event=this._events[type];return event||(event=this._events[type]=[]),scope=scope||this,this.findListener(type,fn,scope)||event.push([fn,scope]),this},un:function(a,b,c){if("function"!=typeof b)return!1;a=a.toLowerCase();var d=this._events[a];if(d){c=c||this;var e=this.findListener(a,b,c);e&&d.remove(e)}return this},findListener:function(a,b,c){a=a.toLowerCase(),c=c||this;var d=this._events[a];if(d)for(var e=0,f=d.length;f>e;e++){var g=d[e];if(g[0]===b&&g[1]===c)return g}},setId:function(a){if(!a)throw new Error("id not null");if(this._idSet)throw new Error("id just set only one");mini.unreg(this),this.id=a,this.el&&(this.el.id=a),this._textEl&&(this._textEl.id=a+"$text"),this._valueEl&&(this._valueEl.id=a+"$value"),this._idSet=!0,mini.reg(this)},getId:function(){return this.id},destroy:function(){mini.unreg(this),this.fire("destroy")}},mini=mini||{},mini.Control=function(){mini.Control.superclass.constructor.call(this),this._create(),this.el.uid=this.uid,this._initEvents(),this._clearBorder&&(this.el.style.borderWidth="0",this.el.style.padding="0px"),this.addCls(this.uiCls),this.setWidth(this.width),this.setHeight(this.height),this.el.style.display=this.visible?this._displayStyle:"none"},mini.extend(mini.Control,mini.Component,{jsName:null,width:"",height:"",visible:!0,readOnly:!1,enabled:!0,tooltip:"",_readOnlyCls:"mini-readonly",_disabledCls:"mini-disabled",_create:function(){this.el=document.createElement("div")},_initEvents:function(){},within:function(a){return mini.isAncestor(this.el,a.target)?!0:!1},name:"",setName:function(a){this.name=a},getName:function(){return this.name},isAutoHeight:function(){var a=this.el.style.height;return"auto"==a||""==a},isAutoWidth:function(){var a=this.el.style.width;return"auto"==a||""==a},isFixedSize:function(){var a=this.width,b=this.height;return parseInt(a)+"px"==a&&parseInt(b)+"px"==b?!0:!1},isRender:function(a){return!!(this.el&&this.el.parentNode&&this.el.parentNode.tagName)},render:function(a,b){"string"==typeof a&&(a="#body"==a?document.body:mini.byId(a)),a&&(b||(b="append"),b=b.toLowerCase(),"before"==b?jQuery(a).before(this.el):"prepend"==b?jQuery(a).prepend(this.el):"after"==b?jQuery(a).after(this.el):a.appendChild(this.el),this.el.id=this.id,this.doLayout(),this.fire("render"))},getEl:function(){return this.el},setJsName:function(a){this.jsName=a,window[a]=this},getJsName:function(){return this.jsName},setTooltip:function(a){this.tooltip=a,this.el.title=a},getTooltip:function(){return this.tooltip},_sizeChaned:function(){this.doLayout()},setWidth:function(a){parseInt(a)==a&&(a+="px"),this.width=a,this.el.style.width=a,this._sizeChaned()},getWidth:function(a){var b=a?jQuery(this.el).width():jQuery(this.el).outerWidth();if(a&&this._borderEl){var c=mini.getBorders(this._borderEl);b=b-c.left-c.right}return b},setHeight:function(a){parseInt(a)==a&&(a+="px"),this.height=a,this.el.style.height=a,this._sizeChaned()},getHeight:function(a){var b=a?jQuery(this.el).height():jQuery(this.el).outerHeight();if(a&&this._borderEl){var c=mini.getBorders(this._borderEl);b=b-c.top-c.bottom}return b},getBox:function(){return mini.getBox(this.el)},setBorderStyle:function(a){var b=this._borderEl||this.el;mini.setStyle(b,a),this.doLayout()},getBorderStyle:function(){return this.borderStyle},_clearBorder:!0,setStyle:function(a){this.style=a,mini.setStyle(this.el,a),this._clearBorder&&(this.el.style.borderWidth="0"),this.width=this.el.style.width,this.height=this.el.style.height,this._sizeChaned()},getStyle:function(){return this.style},setCls:function(a){this.addCls(a)},getCls:function(){return this.cls},addCls:function(a){mini.addClass(this.el,a)},removeCls:function(a){mini.removeClass(this.el,a)},_doReadOnly:function(){this.readOnly?this.addCls(this._readOnlyCls):this.removeCls(this._readOnlyCls)},setReadOnly:function(a){this.readOnly=a,this._doReadOnly()},getReadOnly:function(){return this.readOnly},getParent:function(a){for(var b=document,c=this.el.parentNode;c!=b&&null!=c;){var d=mini.get(c);if(d){if(!mini.isControl(d))return null;if(!a||d.uiCls==a)return d}c=c.parentNode}return null},isReadOnly:function(){if(this.readOnly||!this.enabled)return!0;var a=this.getParent();return a?a.isReadOnly():!1},setEnabled:function(a){this.enabled=a,this.enabled?this.removeCls(this._disabledCls):this.addCls(this._disabledCls),this._doReadOnly()},getEnabled:function(){return this.enabled},enable:function(){this.setEnabled(!0)},disable:function(){this.setEnabled(!1)},_displayStyle:"",setVisible:function(a){this.visible=a,this.el&&(this.el.style.display=a?this._displayStyle:"none",this.doLayout())},getVisible:function(){return this.visible},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},isDisplay:function(){return 0==mini.isWindowDisplay()?!1:jQuery(this.el).is(":visible")},_allowUpdate:!0,beginUpdate:function(){this._allowUpdate=!1},endUpdate:function(){this._allowUpdate=!0,this.doUpdate()},doUpdate:function(){},canLayout:function(){return 0==this._allowLayout?!1:this.isDisplay()},doLayout:function(){},layoutChanged:function(){0!=this.canLayout()&&this.doLayout()},_destroyChildren:function(a){if(this.el)for(var b=mini.getChildControls(this),c=0,d=b.length;d>c;c++){var e=b[c];e.destroyed!==!0&&e.destroy(a)}},destroy:function(a){if(this.destroyed!==!0&&this._destroyChildren(a),this.el&&(mini.clearEvent(this.el),a!==!1)){var b=this.el.parentNode;b&&b.removeChild(this.el)}this._borderEl=null,this.el=null,mini.clearEvent(this),mini.unreg(this),this.destroyed=!0,this.fire("destroy")},parseUrl:function(urlPar){if(!urlPar)return null;if("#"==urlPar.substring(0,1)){var name=urlPar.substring(1,urlPar.length);try{return eval(name)}catch(e){return null}}return urlPar},focus:function(){try{var a=this;a.el.focus()}catch(b){}},blur:function(){try{var a=this;a.el.blur()}catch(b){}},allowAnim:!0,setAllowAnim:function(a){this.allowAnim=a},getAllowAnim:function(){return this.allowAnim},_getMaskWrapEl:function(){return this.el},mask:function(a){"string"==typeof a&&(a={html:a}),a=a||{},a.el=this._getMaskWrapEl(),a.cls||(a.cls=this._maskCls),mini.mask(a)},unmask:function(){mini.unmask(this._getMaskWrapEl())},_maskCls:"mini-mask-loading",loadingMsg:"Loading...",loading:function(a){this.mask(a||this.loadingMsg)},setLoadingMsg:function(a){this.loadingMsg=a},getLoadingMsg:function(){return this.loadingMsg},_getContextMenu:function(a){var b=a;return"string"==typeof a?(b=mini.get(a),b||(mini.parse(a),b=mini.get(a))):mini.isArray(a)?b={type:"menu",items:a}:mini.isControl(a)||(b=mini.create(a)),b},__OnHtmlContextMenu:function(a){var b={popupEl:this.el,htmlEvent:a,cancel:!1};return this.contextMenu.fire("BeforeOpen",b),1!=b.cancel&&(this.contextMenu.fire("opening",b),1!=b.cancel)?(this.contextMenu.showAtPos(a.pageX,a.pageY),this.contextMenu.fire("Open",b),!1):void 0},contextMenu:null,setContextMenu:function(a){var b=this._getContextMenu(a);b&&this.contextMenu!==b&&(this.contextMenu=b,this.contextMenu.owner=this,mini.on(this.el,"contextmenu",this.__OnHtmlContextMenu,this))},getContextMenu:function(){return this.contextMenu},setDefaultValue:function(a){this.defaultValue=a},getDefaultValue:function(){return this.defaultValue},setValue:function(a){this.value=a},getValue:function(){return this.value},_afterApply:function(a){},dataField:"",setDataField:function(a){this.dataField=a},getDataField:function(){return this.dataField},getAttrs:function(el){var attrs={},cls=el.className;cls&&(attrs.cls=cls),el.value&&(attrs.value=el.value),mini._ParseString(el,attrs,["id","name","width","height","borderStyle","value","defaultValue","contextMenu","tooltip","ondestroy","data-options","dataField"]),mini._ParseBool(el,attrs,["visible","enabled","readOnly"]),el.readOnly&&"false"!=el.readOnly&&(attrs.readOnly=!0);var style=el.style.cssText;if(style&&(attrs.style=style),isIE9){var bg=el.style.background;bg&&(attrs.style||(attrs.style=""),attrs.style+=";background:"+bg)}this.style&&(attrs.style?attrs.style=this.style+";"+attrs.style:attrs.style=this.style),this.borderStyle&&(attrs.borderStyle?attrs.borderStyle=this.borderStyle+";"+attrs.borderStyle:attrs.borderStyle=this.borderStyle);var ts=mini._attrs;if(ts)for(var i=0,l=ts.length;l>i;i++){var t=ts[i],name=t[0],type=t[1];type||(type="string"),"string"==type?mini._ParseString(el,attrs,[name]):"bool"==type?mini._ParseBool(el,attrs,[name]):"int"==type&&mini._ParseInt(el,attrs,[name])}var options=attrs["data-options"];return options&&(options=eval("("+options+")"),options&&mini.copyTo(attrs,options)),attrs}}),mini._attrs=null,mini.regHtmlAttr=function(a,b){a&&(b||(b="string"),mini._attrs||(mini._attrs=[]),mini._attrs.push([a,b]))},mini=mini||{},mini.Container=function(){mini.Container.superclass.constructor.call(this),this._contentEl=this.el},mini.extend(mini.Container,mini.Control,{setControls:__mini_setControls,getContentEl:function(){return this._contentEl},getBodyEl:function(){return this._contentEl}}),mini=mini||{},mini.ValidatorBase=function(){mini.ValidatorBase.superclass.constructor.call(this)},mini.extend(mini.ValidatorBase,mini.Control,{required:!1,requiredErrorText:"\u4e0d\u80fd\u4e3a\u7a7a.",_requiredCls:"mini-required",errorText:"",_errorCls:"mini-error",_invalidCls:"mini-invalid",errorMode:"icon",validateOnChanged:!0,validateOnLeave:!0,_IsValid:!0,indentSpace:!1,_indentCls:"mini-indent",setIndentSpace:function(a){a?this.addCls(this._indentCls):this.removeCls(this._indentCls),this.indentSpace=a},getIndentSpace:function(){return this.indentSpace},_tryValidate:function(){this.validate()},validate:function(){if(0==this.enabled)return this.setIsValid(!0),!0;var a={value:this.getValue(),errorText:"",isValid:!0};return this.required&&(mini.isNull(a.value)||""===String(a.value).trim())&&(a.isValid=!1,a.errorText=this.requiredErrorText),this.fire("validation",a),this.errorText=a.errorText,this.setIsValid(a.isValid),this.isValid()},isValid:function(){return this._IsValid},setIsValid:function(a){this._IsValid=a,this.doUpdateValid()},getIsValid:function(){return this._IsValid},setValidateOnChanged:function(a){this.validateOnChanged=a},getValidateOnChanged:function(a){return this.validateOnChanged},setValidateOnLeave:function(a){this.validateOnLeave=a},getValidateOnLeave:function(a){return this.validateOnLeave},setErrorMode:function(a){a||(a="none"),this.errorMode=a.toLowerCase(),0==this._IsValid&&this.doUpdateValid()},getErrorMode:function(){return this.errorMode},setErrorText:function(a){this.errorText=a,0==this._IsValid&&this.doUpdateValid()},getErrorText:function(){return this.errorText},setRequired:function(a){this.required=a,this.required?this.addCls(this._requiredCls):this.removeCls(this._requiredCls)},getRequired:function(){return this.required},setRequiredErrorText:function(a){this.requiredErrorText=a},getRequiredErrorText:function(){return this.requiredErrorText},errorIconEl:null,getErrorIconEl:function(){return this._errorIconEl},_RemoveErrorIcon:function(){},doUpdateValid:function(){var a=this;this._doUpdateValidTimer=setTimeout(function(){a.__doUpdateValid()},1)},__doUpdateValid:function(){if(this.el){if(this.removeCls(this._errorCls),this.removeCls(this._invalidCls),0==this._IsValid)switch(this.errorMode){case"icon":this.addCls(this._errorCls);var a=this.getErrorIconEl();a&&(a.title=this.errorText);break;case"border":this.addCls(this._invalidCls),this.el.title=this.errorText;default:this._RemoveErrorIcon()}else this.el.title==this.errorText&&(this.el.title=""),this._RemoveErrorIcon();this.doLayout()}},_OnValueChanged:function(){this.validateOnChanged&&this._tryValidate(),this.fire("valuechanged",{value:this.getValue()})},onValueChanged:function(a,b){this.on("valuechanged",a,b)},onValidation:function(a,b){this.on("validation",a,b)},getAttrs:function(a){var b=mini.ValidatorBase.superclass.getAttrs.call(this,a);mini._ParseString(a,b,["onvaluechanged","onvalidation","requiredErrorText","errorMode"]),mini._ParseBool(a,b,["validateOnChanged","validateOnLeave","indentSpace"]);var c=a.getAttribute("required");if(c||(c=a.required),!c){var d=a.attributes.required;d&&(c="null"==d.value?null:"true")}return c&&(b.required="false"!=c?!0:!1),b}}),mini=mini||{},mini.ListControl=function(){this.data=[],this._selecteds=[],mini.ListControl.superclass.constructor.call(this),this.doUpdate()},mini.extend(mini.ListControl,mini.ValidatorBase,{defaultValue:"",value:"",valueField:"id",textField:"text",delimiter:",",data:null,url:"",_itemCls:"mini-list-item",_itemHoverCls:"mini-list-item-hover",_itemSelectedCls:"mini-list-item-selected",set:function(a){if("string"==typeof a)return this;var b=a.value;delete a.value;var c=a.url;delete a.url;var d=a.data;return delete a.data,mini.ListControl.superclass.set.call(this,a),mini.isNull(d)||this.setData(d),mini.isNull(c)||this.setUrl(c),mini.isNull(b)||this.setValue(b,this.defaultValueTriggerChange),this},uiCls:"mini-list",_create:function(){},_initEvents:function(){mini._BindEvents(function(){mini_onOne(this.el,"click",this.__OnClick,this),mini_onOne(this.el,"dblclick",this.__OnDblClick,this),mini_onOne(this.el,"mousedown",this.__OnMouseDown,this),mini_onOne(this.el,"mouseup",this.__OnMouseUp,this),mini_onOne(this.el,"mousemove",this.__OnMouseMove,this),mini_onOne(this.el,"mouseover",this.__OnMouseOver,this),mini_onOne(this.el,"mouseout",this.__OnMouseOut,this),mini_onOne(this.el,"keydown",this.__OnKeyDown,this),mini_onOne(this.el,"keyup",this.__OnKeyUp,this),mini_onOne(this.el,"contextmenu",this.__OnContextMenu,this)},this)},destroy:function(a){this.el&&(this.el.onclick=null,this.el.ondblclick=null,this.el.onmousedown=null,this.el.onmouseup=null,this.el.onmousemove=null,this.el.onmouseover=null,this.el.onmouseout=null,this.el.onkeydown=null,this.el.onkeyup=null,this.el.oncontextmenu=null),this._valueEl&&(mini.clearEvent(this._valueEl),this._valueEl.parentNode.removeChild(this._valueEl),this._valueEl=null),delete this._focusedItem,delete this.data,delete this._selecteds,mini.ListControl.superclass.destroy.call(this,a)},name:"",setName:function(a){this.name=a,this._valueEl&&mini.setAttr(this._valueEl,"name",this.name)},getItemByEvent:function(a){var b=mini.findParent(a.target,this._itemCls);if(b){var c=parseInt(mini.getAttr(b,"index"));return this.data[c]}},addItemCls:function(a,b){var c=this.getItemEl(a);c&&mini.addClass(c,b)},removeItemCls:function(a,b){var c=this.getItemEl(a);c&&mini.removeClass(c,b)},getItemEl:function(a){a=this.getItem(a);var b=this.data.indexOf(a),c=this._createItemId(b);return document.getElementById(c)},_focusItem:function(a,b){if(a=this.getItem(a)){var c=this.getItemEl(a);if(b&&c&&this.scrollIntoView(a),this._focusedItem==a)return void(c&&mini.addClass(c,this._itemHoverCls));this._blurItem(),this._focusedItem=a,c&&mini.addClass(c,this._itemHoverCls)}},_blurItem:function(){if(this._focusedItem){try{var a=this.getItemEl(this._focusedItem);a&&mini.removeClass(a,this._itemHoverCls)}catch(b){}this._focusedItem=null}},getFocusedItem:function(){return this._focusedItem},getFocusedIndex:function(){return this.data.indexOf(this._focusedItem)},_scrollViewEl:null,scrollIntoView:function(a){try{var b=this.getItemEl(a),c=this._scrollViewEl||this.el;mini.scrollIntoView(b,c,!1)}catch(d){}},getItem:function(a){return"object"==typeof a?a:"number"==typeof a?this.data[a]:this.findItems(a)[0]},getCount:function(){return this.data.length},indexOf:function(a){return this.data.indexOf(a)},getAt:function(a){return this.data[a]},updateItem:function(a,b){a=this.getItem(a),a&&(mini.copyTo(a,b),this.doUpdate())},load:function(a){"string"==typeof a?this.setUrl(a):this.setData(a)},loadData:function(a){this.setData(a)},setData:function(data){if("string"==typeof data&&(data=eval(data)),mini.isArray(data)||(data=[]),this.data=data,this.doUpdate(),""!=this.value){this.deselectAll();var records=this.findItems(this.value);this.selects(records)}},getData:function(){return this.data.clone()},setUrl:function(a){this.url=this.parseUrl(a),this._doLoad({})},getUrl:function(){return this.url},_doLoad:function(params){try{var url=eval(this.url);void 0!=url&&(this.url=url)}catch(e){}var e={url:this.url,async:!1,type:"get",params:params,data:params,cache:!1,cancel:!1,timeout:3e4};if(this.fire("beforeload",e),e.data!=e.params&&e.params!=params&&(e.data=e.params),1!=e.cancel){var sf=this,url=e.url;mini.copyTo(e,{success:function(a){var b=null;try{b=mini.decode(a)}catch(c){b=[],1==mini_debugger&&alert(url+"\njson is error.")}sf.dataField&&(b=mini._getMap(sf.dataField,b)),b||(b=[]);var c={data:b,cancel:!1};sf.fire("preload",c),1!=c.cancel&&(sf.setData(c.data),sf.fire("load"),setTimeout(function(){sf.doLayout()},100))},error:function(a,b,c){var d={xmlHttp:a,errorMsg:a.responseText,errorCode:a.status};1==mini_debugger&&alert(url+"\n"+d.errorCode+"\n"+d.errorMsg),sf.fire("loaderror",d)}}),this._ajaxer=mini.ajax(e)}},setValue:function(a,b){if(mini.isNull(a)&&(a=""),!mini.isEquals(this.value,a)){this.deselectAll(),this.value=a,this._valueEl&&(this._valueEl.value=a);var c=this.findItems(this.value);this.selects(c),void 0===b&&(b=!0),b&&this._OnValueChanged()}},getValue:function(){return this.value},getFormValue:function(){return this.value},setValueField:function(a){this.valueField=a},getValueField:function(){return this.valueField},setTextField:function(a){this.textField=a},getTextField:function(){return this.textField},getItemValue:function(a){return String(mini._getMap(this.valueField,a))},getItemText:function(a){var b=mini._getMap(this.textField,a);return mini.isNull(b)?"":String(b)},getValueAndText:function(a){mini.isNull(a)&&(a=[]),mini.isArray(a)||(a=this.findItems(a));for(var b=[],c=[],d=0,e=a.length;e>d;d++){var f=a[d];f&&(b.push(this.getItemValue(f)),c.push(this.getItemText(f)))}return[b.join(this.delimiter),c.join(this.delimiter)]},findItems:function(a){mini.isNull(a)&&(a="");for(var b=String(a).split(this.delimiter),c=this.data,d={},e=0,f=c.length;f>e;e++){var g=c[e],h=g[this.valueField];d[h]=g}for(var i=[],j=0,k=b.length;k>j;j++){var h=b[j],g=d[h];g&&i.push(g)}return i},removeAll:function(){var a=this.getData();this.removeItems(a)},addItems:function(a,b){mini.isArray(a)&&(mini.isNull(b)&&(b=this.data.length),this.data.insertRange(b,a),this.doUpdate())},addItem:function(a,b){a&&-1==this.data.indexOf(a)&&(mini.isNull(b)&&(b=this.data.length),this.data.insert(b,a),this.doUpdate())},removeItems:function(a){mini.isArray(a)&&(this.data.removeRange(a),this._checkSelecteds(),this.doUpdate())},removeItem:function(a){var b=this.data.indexOf(a);-1!=b&&(this.data.removeAt(b),this._checkSelecteds(),this.doUpdate())},moveItem:function(a,b){a&&mini.isNumber(b)&&(0>b&&(b=0),b>this.data.length&&(b=this.data.length),this.data.remove(a),this.data.insert(b,a),this.doUpdate())},_selected:null,_selecteds:[],multiSelect:!1,_checkSelecteds:function(){for(var a=this._selecteds.length-1;a>=0;a--){var b=this._selecteds[a];-1==this.data.indexOf(b)&&this._selecteds.removeAt(a)}var c=this.getValueAndText(this._selecteds);this.value=c[0],this._valueEl&&(this._valueEl.value=this.value)},setMultiSelect:function(a){this.multiSelect=a},getMultiSelect:function(){return this.multiSelect},isSelected:function(a){return a?-1!=this._selecteds.indexOf(a):!1},getSelecteds:function(){var a=this._selecteds.clone(),b=this;return mini.sort(a,function(a,c){var d=b.indexOf(a),e=b.indexOf(c);return d>e?1:e>d?-1:0}),a},setSelected:function(a){a&&(this._selected=a,this.select(a))},getSelected:function(){return this._selected},select:function(a){a=this.getItem(a),a&&(this.isSelected(a)||this.selects([a]))},deselect:function(a){a=this.getItem(a),a&&this.isSelected(a)&&this.deselects([a])},selectAll:function(){var a=this.data.clone();this.selects(a)},deselectAll:function(){this.deselects(this._selecteds)},clearSelect:function(){this.deselectAll()},selects:function(a){if(a&&0!=a.length){a=a.clone();for(var b=0,c=a.length;c>b;b++){var d=a[b];this.isSelected(d)||this._selecteds.push(d)}var e=this;e._doSelects()}},deselects:function(a){if(a&&0!=a.length){a=a.clone();for(var b=a.length-1;b>=0;b--){var c=a[b];this.isSelected(c)&&this._selecteds.remove(c)}var d=this;d._doSelects()}},_doSelects:function(){var a=this.getValueAndText(this._selecteds);this.value=a[0],this._valueEl&&(this._valueEl.value=this.value);for(var b=0,c=this.data.length;c>b;b++){var d=this.data[b],e=this.isSelected(d);e?this.addItemCls(d,this._itemSelectedCls):this.removeItemCls(d,this._itemSelectedCls);var f=this.data.indexOf(d),g=this._createCheckId(f),h=document.getElementById(g);h&&(h.checked=!!e,h.defaultChecked=!!e)}},_OnSelectionChanged:function(a,b){var c=this.getValueAndText(this._selecteds);this.value=c[0],this._valueEl&&(this._valueEl.value=this.value);var d={selecteds:this.getSelecteds(),selected:this.getSelected(),value:this.getValue()};this.fire("SelectionChanged",d)},_createCheckId:function(a){return this.uid+"$ck$"+a},_createItemId:function(a){return this.uid+"$"+a},__OnClick:function(a){this._fireEvent(a,"Click")},__OnDblClick:function(a){this._fireEvent(a,"Dblclick")},__OnMouseDown:function(a){this._fireEvent(a,"MouseDown")},__OnMouseUp:function(a){this._fireEvent(a,"MouseUp")},__OnMouseMove:function(a){this._fireEvent(a,"MouseMove")},__OnMouseOver:function(a){this._fireEvent(a,"MouseOver")},__OnMouseOut:function(a){this._fireEvent(a,"MouseOut")},__OnKeyDown:function(a){this._fireEvent(a,"KeyDown"),this.__OnInputKeyDown&&this.__OnInputKeyDown(a)},__OnKeyUp:function(a){this._fireEvent(a,"KeyUp")},__OnContextMenu:function(a){this._fireEvent(a,"ContextMenu")},_fireEvent:function(a,b){if(this.enabled){var c=this.getItemByEvent(a);if(c){var d=this["_OnItem"+b];if(d)d.call(this,c,a);else{var e={item:c,htmlEvent:a};this.fire("item"+b,e)}}}},_OnItemClick:function(a,b){if(this.isReadOnly()||0==this.enabled||a.enabled===!1)return void b.preventDefault();var c=this.getValue();this.multiSelect?(this.isSelected(a)?(this.deselect(a),this._selected==a&&(this._selected=null)):(this.select(a),this._selected=a),this._OnSelectionChanged()):this.isSelected(a)||(this.deselectAll(),this.select(a),this._selected=a,this._OnSelectionChanged()),c!=this.getValue()&&this._OnValueChanged();var b={item:a,htmlEvent:b};this.fire("itemclick",b)},_blurOnOut:!0,_OnItemMouseOut:function(a,b){if(mini.repaint(this.el),this.enabled){this._blurOnOut&&this._blurItem();var b={item:a,htmlEvent:b};this.fire("itemmouseout",b)}},_OnItemMouseMove:function(a,b){if(mini.repaint(this.el),this.enabled&&a.enabled!==!1){this._focusItem(a);var b={item:a,htmlEvent:b};this.fire("itemmousemove",b)}},onItemClick:function(a,b){this.on("itemclick",a,b)},onItemMouseDown:function(a,b){this.on("itemmousedown",a,b)},onBeforeLoad:function(a,b){this.on("beforeload",a,b)},onLoad:function(a,b){this.on("load",a,b)},onLoadError:function(a,b){this.on("loaderror",a,b)},onPreLoad:function(a,b){this.on("preload",a,b)},getAttrs:function(a){var b=mini.ListControl.superclass.getAttrs.call(this,a);mini._ParseString(a,b,["url","data","value","textField","valueField","onitemclick","onitemmousemove","onselectionchanged","onitemdblclick","onbeforeload","onload","onloaderror","ondataload"]),mini._ParseBool(a,b,["multiSelect"]);var c=b.valueField||this.valueField,d=b.textField||this.textField;
if("select"==a.nodeName.toLowerCase()){for(var e=[],f=0,g=a.length;g>f;f++){var h=a.options[f],i={};i[d]=h.text,i[c]=h.value,e.push(i)}e.length>0&&(b.data=e)}return b}}),mini.CheckBox=function(){mini.CheckBox.superclass.constructor.call(this)},mini.extend(mini.CheckBox,mini.Control,{formField:!0,_clearText:!1,text:"",checked:!1,defaultValue:!1,trueValue:!0,falseValue:!1,uiCls:"mini-checkbox",_create:function(){var a=this.uid+"$check";this.el=document.createElement("span"),this.el.className="mini-checkbox",this.el.innerHTML='<input id="'+a+'" name="'+this.id+'" type="checkbox" class="mini-checkbox-check"><label for="'+a+'" onclick="return false;">'+this.text+"</label>",this._checkEl=this.el.firstChild,this._labelEl=this.el.lastChild},destroy:function(a){this._checkEl&&(this._checkEl.onmouseup=null,this._checkEl.onclick=null,mini.clearEvent(this._checkEl),this.el.removeChild(this._checkEl),this._checkEl=null),this._labelEl&&(mini.clearEvent(this._labelEl),this.el.removeChild(this._labelEl),this._labelEl=null),mini.CheckBox.superclass.destroy.call(this,a)},_initEvents:function(){mini._BindEvents(function(){mini.on(this.el,"click",this.__onClick,this),this._checkEl.onmouseup=function(){return!1};var a=this;this._checkEl.onclick=function(){return a.isReadOnly()?!1:void 0},mini.on(this._checkEl,"keydown",this.__OnInputKeyDown,this)},this)},setName:function(a){this.name=a,mini.setAttr(this._checkEl,"name",this.name)},setText:function(a){this.text!==a&&(this.text=a,this._labelEl.innerHTML=a)},getText:function(){return this.text},setChecked:function(a,b){a=a===!0?!0:a==this.trueValue?!0:"true"==a?!0:1===a?!0:"Y"==a?!0:!1,this.checked!==a&&(this.checked=!!a,this._checkEl.checked=this.checked,this.value=this.getValue(),void 0===b&&(b=!0),b&&(this.fire("checkedchanged",{checked:this.checked}),this.fire("valuechanged",{value:this.getValue()})))},getChecked:function(){return this.checked},setValue:function(a,b){this.checked!=a&&(this.setChecked(a,b),this.value=this.getValue())},getValue:function(){return String(1==this.checked?this.trueValue:this.falseValue)},getFormValue:function(){return this.getValue()},setTrueValue:function(a){this._checkEl.value=a,this.trueValue=a},getTrueValue:function(){return this.trueValue},setFalseValue:function(a){this.falseValue=a},getFalseValue:function(){return this.falseValue},__onClick:function(a){this.isReadOnly()||(this.setChecked(!this.checked),this.fire("click",a,this))},focus:function(){this._checkEl.focus()},__OnInputKeyDown:function(a){var b={htmlEvent:a};13==a.keyCode&&this.fire("enter",b),27==a.keyCode&&a.preventDefault()},getAttrs:function(a){var b=mini.CheckBox.superclass.getAttrs.call(this,a),c=jQuery(a);b.text=a.innerHTML,mini._ParseString(a,b,["text","oncheckedchanged","onclick","onvaluechanged"]),mini._ParseBool(a,b,["enabled"]);var d=mini.getAttr(a,"checked");d&&(b.checked="true"==d||"checked"==d?!0:!1);var e=c.attr("trueValue");e&&(b.trueValue=e,e=parseInt(e),isNaN(e)||(b.trueValue=e));var f=c.attr("falseValue");return f&&(b.falseValue=f,f=parseInt(f),isNaN(f)||(b.falseValue=f)),b}}),mini.regClass(mini.CheckBox,"checkbox"),mini.CheckBoxList=function(){mini.CheckBoxList.superclass.constructor.call(this)},mini.extend(mini.CheckBoxList,mini.ListControl,{formField:!0,multiSelect:!0,repeatItems:0,repeatLayout:"none",repeatDirection:"horizontal",_itemCls:"mini-checkboxlist-item",_itemHoverCls:"mini-checkboxlist-item-hover",_itemSelectedCls:"mini-checkboxlist-item-selected",_tableCls:"mini-checkboxlist-table",_tdCls:"mini-checkboxlist-td",_checkType:"checkbox",uiCls:"mini-checkboxlist",_create:function(){this.el=document.createElement("div");this.el.className=this.uiCls,this.el.innerHTML='<div class="mini-list-inner"></div><div class="mini-errorIcon"></div><input type="hidden" />',this._innerEl=this.el.firstChild,this._valueEl=this.el.lastChild,this._errorIconEl=this.el.childNodes[1]},_getRepeatTable:function(){var a=[];if(this.repeatItems>0)if("horizontal"==this.repeatDirection){for(var b=[],c=0,d=this.data.length;d>c;c++){var e=this.data[c];b.length==this.repeatItems&&(a.push(b),b=[]),b.push(e)}a.push(b)}else{for(var f=this.repeatItems>this.data.length?this.data.length:this.repeatItems,c=0,d=f;d>c;c++)a.push([]);for(var c=0,d=this.data.length;d>c;c++){var e=this.data[c],g=c%this.repeatItems;a[g].push(e)}}else a=[this.data.clone()];return a},doUpdate:function(){for(var a=this.data,b="",c=0,d=a.length;d>c;c++){var e=a[c];e._i=c}if("flow"==this.repeatLayout)for(var f=this._getRepeatTable(),c=0,d=f.length;d>c;c++){for(var g=f[c],h=0,i=g.length;i>h;h++){var e=g[h];b+=this._createItemHtml(e,e._i)}c!=d-1&&(b+="<br/>")}else if("table"==this.repeatLayout){var f=this._getRepeatTable();b+='<table class="'+this._tableCls+'" cellpadding="0" cellspacing="1">';for(var c=0,d=f.length;d>c;c++){var g=f[c];b+="<tr>";for(var h=0,i=g.length;i>h;h++){var e=g[h];b+='<td class="'+this._tdCls+'">',b+=this._createItemHtml(e,e._i),b+="</td>"}b+="</tr>"}b+="</table>"}else for(var c=0,d=a.length;d>c;c++){var e=a[c];b+=this._createItemHtml(e,c)}this._innerEl.innerHTML=b;for(var c=0,d=a.length;d>c;c++){var e=a[c];delete e._i}},destroy:function(a){this._valueEl&&(this._valueEl=null),this._errorIconEl&&(this._errorIconEl=null),this._innerEl&&(this._innerEl=null),mini.CheckBoxList.superclass.destroy.call(this,a)},_createItemHtml:function(a,b){var c=this._OnDrawItem(a,b),d=this._createItemId(b),e=this._createCheckId(b),f=this.getItemValue(a),g="",h='<div id="'+d+'" index="'+b+'" class="'+this._itemCls+" ";a.enabled===!1&&(h+=" mini-disabled ",g="disabled");var i='onclick="return false"';return i='onmousedown="this._checked = this.checked;" onclick="this.checked = this._checked"',h+=c.itemCls+'" style="'+c.itemStyle+'"><input '+i+" "+g+' value="'+f+'" id="'+e+'" type="'+this._checkType+'" /><label for="'+e+'" onclick="return false;">',h+=c.itemHtml+"</label></div>"},_OnDrawItem:function(a,b){var c=this.getItemText(a),d={index:b,item:a,itemHtml:c,itemCls:"",itemStyle:""};return this.fire("drawitem",d),(null===d.itemHtml||void 0===d.itemHtml)&&(d.itemHtml=""),d},focus:function(){jQuery(this._innerEl).find("input:checked:enabled").length>0?jQuery(this._innerEl).find("input:checked:enabled:first").focus():jQuery(this._innerEl).find("input:first").focus()},__OnInputKeyDown:function(a){var b={htmlEvent:a};13==a.keyCode&&this.fire("enter",b),27==a.keyCode&&a.preventDefault()},setRepeatItems:function(a){a=parseInt(a),isNaN(a)&&(a=0),this.repeatItems!=a&&(this.repeatItems=a,this.doUpdate())},getRepeatItems:function(){return this.repeatItems},setRepeatLayout:function(a){"flow"!=a&&"table"!=a&&(a="none"),this.repeatLayout!=a&&(this.repeatLayout=a,this.doUpdate())},getRepeatLayout:function(){return this.repeatLayout},setRepeatDirection:function(a){"vertical"!=a&&(a="horizontal"),this.repeatDirection!=a&&(this.repeatDirection=a,this.doUpdate())},getRepeatDirection:function(){return this.repeatDirection},getAttrs:function(a){var b=mini.CheckBoxList.superclass.getAttrs.call(this,a),c=jQuery(a),d=parseInt(c.attr("repeatItems"));isNaN(d)||(b.repeatItems=d);var e=c.attr("repeatLayout");e&&(b.repeatLayout=e);var f=c.attr("repeatDirection");f&&(b.repeatDirection=f);var g=c.attr("ondrawitem");return g&&(b.ondrawitem=g),b}}),mini.regClass(mini.CheckBoxList,"checkboxlist"),mini.Box=function(){mini.Box.superclass.constructor.call(this)},mini.extend(mini.Box,mini.Container,{style:"",borderStyle:"",bodyStyle:"",uiCls:"mini-box",_create:function(){this.el=document.createElement("div"),this.el.className="mini-box",this.el.innerHTML='<div class="mini-box-border"></div>',this._bodyEl=this._borderEl=this.el.firstChild,this._contentEl=this._bodyEl},_initEvents:function(){},doLayout:function(){if(this.canLayout()){var a=this.isAutoHeight(),b=(this.isAutoWidth(),mini.getPaddings(this._bodyEl)),c=mini.getMargins(this._bodyEl);if(a)this._bodyEl.style.height="";else{var d=this.getHeight(!0);jQuery.boxModel&&(d=d-b.top-b.bottom),d=d-c.top-c.bottom,0>d&&(d=0),this._bodyEl.style.height=d+"px"}var e=this.getWidth(!0);e=e-c.left-c.right,jQuery.boxModel&&(e=e-b.left-b.right),0>e&&(e=0),this._bodyEl.style.width=e+"px",mini.layout(this._borderEl),this.fire("layout")}},setBody:function(a){if(a){mini.isArray(a)||(a=[a]);for(var b=0,c=a.length;c>b;b++)mini.append(this._bodyEl,a[b]);mini.parse(this._bodyEl),this.doLayout()}},set_bodyParent:function(a){if(a){for(var b=this._bodyEl,c=a;c.firstChild;)b.appendChild(c.firstChild);this.doLayout()}},setBodyStyle:function(a){mini.setStyle(this._bodyEl,a),this.doLayout()},getAttrs:function(a){var b=mini.Box.superclass.getAttrs.call(this,a);return b._bodyParent=a,mini._ParseString(a,b,["bodyStyle"]),b}}),mini.regClass(mini.Box,"box"),mini=mini||{},mini.Button=function(){mini.Button.superclass.constructor.call(this)},mini.extend(mini.Button,mini.Control,{text:"",iconCls:"",iconStyle:"",plain:!1,checkOnClick:!1,checked:!1,groupName:"",_plainCls:"mini-button-plain",_hoverCls:"mini-button-hover",_pressedCls:"mini-button-pressed",_checkedCls:"mini-button-checked",_disabledCls:"mini-button-disabled",allowCls:"",_clearBorder:!1,set:function(a){return"string"==typeof a?this:(this._allowUpdate=a.text||a.iconStyle||a.iconCls||a.iconPosition,mini.Button.superclass.set.call(this,a),this._allowUpdate===!1&&(this._allowUpdate=!0,this.doUpdate()),this)},uiCls:"mini-button",_create:function(){this.el=document.createElement("a"),this.el.className="mini-button",this.el.hideFocus=!0,this.el.href="javascript:void(0)",this.doUpdate()},_initEvents:function(){mini._BindEvents(function(){mini_onOne(this.el,"mousedown",this.__OnMouseDown,this),mini_onOne(this.el,"click",this.__OnClick,this)},this)},destroy:function(a){this.el&&(this.el.onclick=null,this.el.onmousedown=null),this.menu&&(this.menu.owner=null),this.menu=null,mini.Button.superclass.destroy.call(this,a)},doUpdate:function(){if(this._allowUpdate!==!1){var a="",b=this.text;this.iconCls&&b?a=" mini-button-icon "+this.iconCls:this.iconCls&&""===b?(a=" mini-button-iconOnly "+this.iconCls,b="&nbsp;"):""==b&&(b="&nbsp;");var c='<span class="mini-button-text '+a+'">'+b+"</span>";this.allowCls&&(c=c+'<span class="mini-button-allow '+this.allowCls+'"></span>'),this.el.innerHTML=c}},href:"",setHref:function(a){this.href=a,this.el.href=a;var b=this.el;setTimeout(function(){b.onclick=null},100)},getHref:function(){return this.href},target:"",setTarget:function(a){this.target=a,this.el.target=a},getTarget:function(){return this.target},setText:function(a){this.text!=a&&(this.text=a,this.doUpdate())},getText:function(){return this.text},setIconCls:function(a){this.iconCls=a,this.doUpdate()},getIconCls:function(){return this.iconCls},setIconStyle:function(a){this.iconStyle=a,this.doUpdate()},getIconStyle:function(){return this.iconStyle},setIconPosition:function(a){this.iconPosition="left",this.doUpdate()},getIconPosition:function(){return this.iconPosition},setPlain:function(a){this.plain=a,a?this.addCls(this._plainCls):this.removeCls(this._plainCls)},getPlain:function(){return this.plain},setGroupName:function(a){this.groupName=a},getGroupName:function(){return this.groupName},setCheckOnClick:function(a){this.checkOnClick=a},getCheckOnClick:function(){return this.checkOnClick},setChecked:function(a){var b=this.checked!=a;this.checked=a,a?this.addCls(this._checkedCls):this.removeCls(this._checkedCls),b&&this.fire("CheckedChanged")},getChecked:function(){return this.checked},doClick:function(){this.__OnClick(null)},__OnClick:function(a){if(!this.readOnly&&0!=this.enabled){if(this.focus(),this.checkOnClick)if(this.groupName){var b=this.groupName,c=mini.findControls(function(a){return"button"==a.type&&a.groupName==b?!0:void 0});if(c.length>0){for(var d=0,e=c.length;e>d;d++){var f=c[d];f!=this&&f.setChecked(!1)}this.setChecked(!0)}else this.setChecked(!this.checked)}else this.setChecked(!this.checked);return this.fire("click",{htmlEvent:a}),!1}},__OnMouseDown:function(a){this.isReadOnly()||(this.addCls(this._pressedCls),mini.on(document,"mouseup",this.__OnDocMouseUp,this))},__OnDocMouseUp:function(a){this.removeCls(this._pressedCls),mini.un(document,"mouseup",this.__OnDocMouseUp,this)},onClick:function(a,b){this.on("click",a,b)},getAttrs:function(a){var b=mini.Button.superclass.getAttrs.call(this,a);return b.text=a.innerHTML,mini._ParseString(a,b,["text","href","iconCls","iconStyle","iconPosition","groupName","menu","onclick","oncheckedchanged","target"]),mini._ParseBool(a,b,["plain","checkOnClick","checked"]),b}}),mini.regClass(mini.Button,"button"),mini=mini||{},mini.ButtonEdit=function(){mini.ButtonEdit.superclass.constructor.call(this);var a=this.isReadOnly();(a||0==this.allowInput)&&(this._textEl.readOnly=!0),0==this.enabled&&this.addCls(this._disabledCls),a&&this.addCls(this._readOnlyCls),this.required&&this.addCls(this._requiredCls)},mini.extend(mini.ButtonEdit,mini.ValidatorBase,{name:"",formField:!0,selectOnFocus:!1,showClose:!1,emptyText:"",defaultValue:"",value:"",text:"",maxLength:1e3,minLength:0,width:125,height:21,delimiter:",",inputAsValue:!1,allowInput:!0,_noInputCls:"mini-buttonedit-noInput",_readOnlyCls:"mini-buttonedit-readOnly",_disabledCls:"mini-buttonedit-disabled",_emptyCls:"mini-buttonedit-empty",_focusCls:"mini-buttonedit-focus",_buttonCls:"mini-buttonedit-button",_buttonHoverCls:"mini-buttonedit-button-hover",_buttonPressedCls:"mini-buttonedit-button-pressed",_closeCls:"mini-buttonedit-close",showToolTip:!0,set:function(a){if("string"==typeof a)return this;var b=a.value;delete a.value;var c=a.text;return delete a.text,this._allowUpdate=!(0==a.enabled||0==a.allowInput||a.readOnly),mini.ButtonEdit.superclass.set.call(this,a),this._allowUpdate===!1&&(this._allowUpdate=!0,this.doUpdate()),mini.isNull(c)||this.setText(c),mini.isNull(b)||this.setValue(b,this.defaultValueTriggerChange),a.showClose||this.setShowClose(this.showClose),a.showToolTip||this.setShowToolTip(this.showToolTip),this},uiCls:"mini-buttonedit",_getButtonsHTML:function(){var a='<span class="mini-buttonedit-close"></span>'+this._getButtonHtml();return'<span class="mini-buttonedit-buttons">'+a+"</span>"},_getButtonHtml:function(){var a="onmouseover=\"mini.addClass(this, '"+this._buttonHoverCls+"');\" onmouseout=\"mini.removeClass(this, '"+this._buttonHoverCls+"');\"";return'<span class="mini-buttonedit-button" '+a+'><span class="mini-buttonedit-icon"></span></span>'},_create:function(){this.el=document.createElement("span"),this.el.className="mini-buttonedit";var a=this._getButtonsHTML();this.el.innerHTML='<span class="mini-buttonedit-border"><input type="input" class="mini-buttonedit-input" autocomplete="off"/>'+a+'</span><input name="'+this.name+'" type="hidden"/>',this._borderEl=this.el.firstChild,this._textEl=this._borderEl.firstChild,this._valueEl=this.el.lastChild,this._buttonsEl=this._borderEl.lastChild,this._buttonEl=this._buttonsEl.lastChild,this._closeEl=this._buttonEl.previousSibling,this._doEmpty()},_addTooltip:function(a){this.tooltip=new mini.ButtonEditTip(this._textEl,this.delimiter)},_destroyTooltip:function(a){this.tooltip&&(mini.clearEvent(this.tooltip),this.tooltip.destroy(a),this.tooltip=null)},destroy:function(a){this.el&&(this.el.onmousedown=null,this.el.onmousewheel=null,this.el.onmouseover=null,this.el.onmouseout=null),this._destroyTooltip(a),this._textEl&&(this._textEl.readOnly=null,this._textEl.onchange=null,this._textEl.onfocus=null,this._textEl.onmouseover=null,this._textEl.onmouseout=null,this._textEl.placeholder=null,this._textEl.onpropertychange=null,this._textEl._placeholder_label&&(this._textEl._placeholder_label.onmousedown=null,this._textEl._placeholder_label.parentNode.removeChild(this._textEl._placeholder_label),this._textEl._placeholder_label=null),mini.clearEvent(this._textEl),this._textEl.parentNode.removeChild(this._textEl),this._textEl=null),this._buttonEl&&(this._buttonEl.onmouseover=null,this._buttonEl.onmouseout=null,mini.clearEvent(this._buttonEl),this._buttonEl.parentNode.removeChild(this._buttonEl),this._buttonEl=null),this._closeEl&&(this._closeEl.onclick=null,mini.clearEvent(this._closeEl),this._closeEl.parentNode.removeChild(this._closeEl),this._closeEl=null),this._buttonsEl&&(mini.clearEvent(this._buttonsEl),this._buttonsEl.parentNode.removeChild(this._buttonsEl),this._buttonsEl=null),this._borderEl&&(mini.clearEvent(this._borderEl),this._borderEl.parentNode.removeChild(this._borderEl),this._borderEl=null),this._valueEl&&(mini.clearEvent(this._valueEl),this._valueEl.parentNode.removeChild(this._valueEl),this._valueEl=null),mini.ButtonEdit.superclass.destroy.call(this,a)},_initEvents:function(){mini._BindEvents(function(){mini_onOne(this.el,"mousedown",this.__OnMouseDown,this),mini_onOne(this._textEl,"focus",this.__OnFocus,this),mini_onOne(this._textEl,"change",this.__OnInputTextChanged,this),mini_onOne(this._closeEl,"click",this._onClearClick,this);var a=this.text;this.text=null,this.setText(a)},this)},_onClearClick:function(){this.enabled&&!this.readOnly&&(this.setValue(""),this.setText(""))},_inputEventsInited:!1,_initInputEvents:function(){this._inputEventsInited||(this._inputEventsInited=!0,mini.on(this.el,"click",this.__OnClick,this),mini.on(this._textEl,"blur",this.__OnBlur,this),mini.on(this._textEl,"keydown",this.__OnInputKeyDown,this),mini.on(this._textEl,"keyup",this.__OnInputKeyUp,this),mini.on(this._textEl,"keypress",this.__OnInputKeyPress,this))},_buttonWidth:20,_closeWidth:20,_doInputLayout:function(){this.doLayout()},doLayout:function(){this.showClose&&(this.value?this._closeEl.style.display="inline-block":this._closeEl.style.display="none");var a=this._buttonsEl.offsetWidth+2;this._borderEl.style.paddingRight=a+"px"},setHeight:function(a){parseInt(a)==a&&(a+="px"),this.height=a},focus:function(){if(0!=this.enabled)try{this._textEl.focus();var a=this;setTimeout(function(){a._focused&&a._textEl.focus()},10)}catch(b){}},blur:function(){try{this._textEl.blur()}catch(a){}},selectText:function(){this._textEl.select()},getTextEl:function(){return this._textEl},setName:function(a){this.name=a,this._valueEl&&mini.setAttr(this._valueEl,"name",this.name)},setText:function(a){(null===a||void 0===a)&&(a="");this.text!==a;this.text=a,this._textEl.value=a,this._doEmpty()},getText:function(){var a=this._textEl.value;return a},setValue:function(a,b){var c=this.getValue();(null===a||void 0===a)&&(a="");this.value!==a;this.value=a,this._valueEl.value=this.getFormValue(),mini.isEquals(this.value,c)||(void 0===b&&(b=!0),b&&this._OnValueChanged())},setShowToolTip:function(a){this.showToolTip=a,this.showToolTip&&this._addTooltip(this.el)},_OnValueChanged:function(){mini.ButtonEdit.superclass._OnValueChanged.call(this),this._doInputLayout()},getValue:function(){return this.value},getFormValue:function(){return value=this.value,(null===value||void 0===value)&&(value=""),String(value)},_doEmpty:function(a){this._textEl.placeholder=this.emptyText,(this.emptyText||a)&&mini._placeholder(this._textEl)},setEmptyText:function(a){this.emptyText!=a&&(this.emptyText=a,this._doEmpty(!0))},getEmptyText:function(){return this.emptyText},setMaxLength:function(a){a=parseInt(a),isNaN(a)||(this.maxLength=a,this._textEl.maxLength=a)},getMaxLength:function(){return this.maxLength},setMinLength:function(a){a=parseInt(a),isNaN(a)||(this.minLength=a)},getMinLength:function(){return this.minLength},setEnabled:function(a){mini.ButtonEdit.superclass.setEnabled.call(this,a),this._textEl._placeholder_label&&(this._textEl._placeholder_label.disabled=!0),this._tryValidate()},_doReadOnly:function(){var a=this.isReadOnly();a||0==this.allowInput?this._textEl.readOnly=!0:this._textEl.readOnly=!1,a?this.addCls(this._readOnlyCls):this.removeCls(this._readOnlyCls),this.allowInput?this.removeCls(this._noInputCls):this.addCls(this._noInputCls),this.enabled?this._textEl.disabled=!1:this._textEl.disabled=!0},setAllowInput:function(a){this.allowInput=a,this._doReadOnly()},getAllowInput:function(){return this.allowInput},setInputAsValue:function(a){this.inputAsValue=a},getInputAsValue:function(){return this.inputAsValue},_errorIconEl:null,getErrorIconEl:function(){return this._errorIconEl||(this._errorIconEl=mini.append(this.el,'<span class="mini-errorIcon"></span>')),this._errorIconEl},_RemoveErrorIcon:function(){if(this._errorIconEl){var a=this._errorIconEl;jQuery(a).remove()}this._errorIconEl=null},__OnClick:function(a){if(!this.isReadOnly()&&0!=this.enabled&&mini.isAncestor(this._borderEl,a.target)){new Date;mini.isAncestor(this._buttonEl,a.target)&&this._OnButtonClick(a),mini.findParent(a.target,this._closeCls)&&this.fire("closeclick",{htmlEvent:a})}},__OnMouseDown:function(a){if(!this.isReadOnly()&&0!=this.enabled&&mini.isAncestor(this._borderEl,a.target)&&!mini.isAncestor(this._textEl,a.target)){this._clickTarget=a.target;var b=this;if(setTimeout(function(){b.focus(),mini.selectRange(b._textEl,1e3,1e3)},1),mini.isAncestor(this._buttonEl,a.target)){var c=mini.findParent(a.target,"mini-buttonedit-up"),d=mini.findParent(a.target,"mini-buttonedit-down");c?(mini.addClass(c,this._buttonPressedCls),this._OnButtonMouseDown(a,"up")):d?(mini.addClass(d,this._buttonPressedCls),this._OnButtonMouseDown(a,"down")):(mini.addClass(this._buttonEl,this._buttonPressedCls),this._OnButtonMouseDown(a)),mini.on(document,"mouseup",this.__OnDocMouseUp,this)}}},__OnDocMouseUp:function(a){this._clickTarget=null;var b=this;setTimeout(function(){for(var a=b._buttonEl.getElementsByTagName("*"),c=0,d=a.length;d>c;c++)mini.removeClass(a[c],b._buttonPressedCls);mini.removeClass(b._buttonEl,b._buttonPressedCls),mini.removeClass(b.el,b._pressedCls)},80),mini.un(document,"mouseup",this.__OnDocMouseUp,this)},__OnFocus:function(a){this.doUpdate(),this._initInputEvents(),this.isReadOnly()||(this._focused=!0,this.addCls(this._focusCls),this.selectOnFocus&&this.selectText(),this.fire("focus",{htmlEvent:a}))},__doFocusCls:function(){0==this._focused&&this.removeCls(this._focusCls)},__fireBlur:function(a){function b(){0==c._focused&&(c.removeCls(c._focusCls),c.validateOnLeave&&c._tryValidate(),this.fire("blur",{htmlEvent:a}))}var c=this;setTimeout(function(){b.call(c)},2)},__OnBlur:function(a){this._focused=!1;var b=this;setTimeout(function(){b.__fireBlur(a)},10)},__OnInputKeyDown:function(a){var b={htmlEvent:a};if(this.fire("keydown",b),8==a.keyCode&&(this.isReadOnly()||0==this.allowInput))return!1;if(27==a.keyCode||13==a.keyCode||9==a.keyCode){var c=this;if(c.__OnInputTextChanged(null),13==a.keyCode){var d=this;d.fire("enter",b)}}27==a.keyCode&&a.preventDefault()},__OnInputTextChanged:function(){var a=this._textEl.value;this.getValue();this.setValue(a)},__OnInputKeyUp:function(a){this.fire("keyup",{htmlEvent:a})},__OnInputKeyPress:function(a){this.fire("keypress",{htmlEvent:a})},_OnButtonClick:function(a){var b={htmlEvent:a,cancel:!1};this.fire("beforebuttonclick",b),1!=b.cancel&&this.fire("buttonclick",b)},_OnButtonMouseDown:function(a,b){this.focus(),this.addCls(this._focusCls),this.fire("buttonmousedown",{htmlEvent:a,spinType:b})},onButtonClick:function(a,b){this.on("buttonclick",a,b)},onButtonMouseDown:function(a,b){this.on("buttonmousedown",a,b)},onTextChanged:function(a,b){this.on("textchanged",a,b)},textName:"",setTextName:function(a){this.textName=a,this._textEl&&mini.setAttr(this._textEl,"name",this.textName)},getTextName:function(){return this.textName},setSelectOnFocus:function(a){this.selectOnFocus=a},getSelectOnFocus:function(a){return this.selectOnFocus},setShowClose:function(a){this.showClose=a},getShowClose:function(a){return this.showClose},inputStyle:"",setInputStyle:function(a){this.inputStyle=a,mini.setStyle(this._textEl,a)},getAttrs:function(a){var b=mini.ButtonEdit.superclass.getAttrs.call(this,a);jQuery(a);return mini._ParseString(a,b,["value","text","textName","emptyText","inputStyle","onenter","onkeydown","onkeyup","onkeypress","onbuttonclick","onbuttonmousedown","ontextchanged","onfocus","onblur","oncloseclick"]),mini._ParseBool(a,b,["allowInput","inputAsValue","selectOnFocus","showClose","showToolTip"]),mini._ParseInt(a,b,["maxLength","minLength"]),b}}),mini.regClass(mini.ButtonEdit,"buttonedit"),mini.ButtonEditTip=function(a,b){this.textEl=a,this.attr="",this.attrDelimiter=b||",",this._create()},mini.ButtonEditTip.prototype={delimiter:"<br/>",attrDelimiter:",",_create:function(){this.el=document.createElement("div"),this.el.className="mini-buttonedittip",this.el.innerHTML='<div class="mini-buttonedittip-colortip"><div class="mini-buttonedittip-content"></div></div>',this._contentEl=this.el.firstChild.childNodes[0];var a=document.getElementById("lengthspan");if(a)this._lengthspanEl=a;else{var b=document.createElement("span");b.className="lengthspan",b.id="lengthspan",document.body.appendChild(b),this._lengthspanEl=b}document.body.appendChild(this.el),mini_on(this.textEl.parentNode,"mouseenter",this.show,this),mini_on(document,"mousemove",this.hide,this)},destroy:function(a){this.textEl&&(this.textEl.parentNode.onmouseenter=null,this.textEl.onmouseleave=null,mini.clearEvent(this.textEl),mini_un(document,"mousemove",this.hide,this)),this.el=null,this._lengthspanEl=null,this._contentEl=null},_doUpdate:function(a){a=mini.htmlEncode(a).split(mini.htmlEncode(this.attrDelimiter)).join(this.delimiter),this._contentEl.innerHTML=a},isOverFlow:function(a,b){if(mini.isNull(b)||""===b)return!1;b.length>300&&(b=b.substring(0,300));var c;c=document.defaultView?document.defaultView.getComputedStyle(a,null):a.currentStyle;var d=c.fontSize,e=c.fontFamily;return this._lengthspanEl.innerHTML=b,this._lengthspanEl.style.fontSize=d,this._lengthspanEl.style.fontFamily=e,this._lengthspanEl.offsetWidth-2>a.clientWidth?!0:!1},show:function(){var a=this.textEl.value;if(this.isOverFlow(this.textEl,a)){this._doUpdate(a);var b=mini.getBox(this.textEl);this._contentEl.height="auto";var c=Math.max(parseInt(this.textEl.clientWidth)+10,200),d=b.x+b.width/2-c/2,e=b.y+b.height+1;d+c>jQuery(window).width()&&(d=jQuery(window).width()-c),0>d&&(d=0),this.el.style.left=d+5+"px",this.el.style.top=e+"px",this.el.style.display="block",this._contentEl.style.height="auto",mini.setWidth(this._contentEl,c),mini.getHeight(this._contentEl)>200&&mini.setHeight(this._contentEl,188),this.el.focus(),this.isshow=!0}},hide:function(a){mini.findParent(a.target,"mini-buttonedittip")||mini.findParent(a.target,"mini-buttonedit-border")||(this.el.style.display="none")},setIsshow:function(a){this.isshow!=a&&(this.isshow=a,this.isshow?this.show():this.hide())},getIsshow:function(){return this.isshow}},mini.Calendar=function(){this.viewDate=new Date,this._selectedDates=[],mini.Calendar.superclass.constructor.call(this)},mini.extend(mini.Calendar,mini.Control,{width:220,height:160,monthPicker:!1,_clearBorder:!1,viewDate:null,_selectedDate:"",_selectedDates:[],multiSelect:!1,firstDayOfWeek:0,yesterdayText:"Yesterday",todayText:"Today",clearText:"Clear",okText:"OK",cancelText:"Cancel",daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],format:"MMM, yyyy",timeFormat:"H:mm",showTime:!1,currentTime:!0,rows:1,columns:1,headerCls:"",bodyCls:"",footerCls:"",_todayCls:"mini-calendar-today",_weekendCls:"mini-calendar-weekend",_otherMonthCls:"mini-calendar-othermonth",_selectedDateCls:"mini-calendar-selected",showHeader:!0,showFooter:!0,showWeekNumber:!1,showDaysHeader:!0,showMonthButtons:!0,showYearButtons:!0,showTodayButton:!0,showClearButton:!0,showOkButton:!1,showYesterdayButton:!1,isWeekend:function(a){var b=a.getDay();return 0==b||6==b},getFirstDateOfMonth:function(a){var a=new Date(a.getFullYear(),a.getMonth(),1);return mini.getWeekStartDate(a,this.firstDayOfWeek)},getShortWeek:function(a){return this.daysShort[a]},uiCls:"mini-calendar",_create:function(){var a='<tr style="width:100%;"><td style="width:100%;"></td></tr>';a+='<tr ><td><div class="mini-calendar-footer"><span style="display:inline-block;"><input name="time" class="mini-timespinner" style="width:80px" format="'+this.timeFormat+'"/><span class="mini-calendar-footerSpace"></span></span><span class="mini-calendar-tadayButton">'+this.todayText+'</span><span class="mini-calendar-footerSpace"></span><span class="mini-calendar-clearButton">'+this.clearText+'</span><span class="mini-calendar-okButton">'+this.okText+'</span><a href="#" class="mini-calendar-focus" style="position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none" hideFocus></a></div></td></tr>';var b='<table class="mini-calendar" cellpadding="0" cellspacing="0">'+a+"</table>",c=document.createElement("div");c.innerHTML=b,this.el=c.firstChild;var d=(this.el.getElementsByTagName("tr"),this.el.getElementsByTagName("td"));this._innerEl=d[0],this._footerEl=mini.byClass("mini-calendar-footer",this.el),this.timeWrapEl=this._footerEl.childNodes[0],this.todayButtonEl=this._footerEl.childNodes[1],this.footerSpaceEl=this._footerEl.childNodes[2],this.closeButtonEl=this._footerEl.childNodes[3],this.okButtonEl=this._footerEl.childNodes[4],this._focusEl=this._footerEl.lastChild,this.yesterdayButtonEl=mini.after(this.todayButtonEl,'<span class="mini-calendar-tadayButton yesterday">'+this.yesterdayText+"</span>"),mini.parse(this._footerEl),this.timeSpinner=mini.getbyName("time",this.el),this.doUpdate()},focus:function(){try{this._focusEl.focus()}catch(a){}},destroy:function(a){this._innerEl=this._footerEl=this.timeWrapEl=this.todayButtonEl=this.footerSpaceEl=this.closeButtonEl=null,mini.Calendar.superclass.destroy.call(this,a)},_initEvents:function(){this.timeSpinner&&this.timeSpinner.on("valuechanged",this.__OnTimeChanged,this),mini._BindEvents(function(){mini.on(this.el,"click",this.__OnClick,this),mini.on(this.el,"mousedown",this.__OnMouseDown,this),mini.on(this.el,"keydown",this.__OnKeyDown,this)},this)},getDateEl:function(a){if(!a)return null;var b=this.uid+"$"+mini.clearTime(a).getTime();return document.getElementById(b)},within:function(a){return mini.isAncestor(this.el,a.target)?!0:this.menuEl&&mini.isAncestor(this.menuEl,a.target)?!0:!1},setShowHeader:function(a){this.showHeader=a,this.doUpdate()},getShowHeader:function(){return this.showHeader},setShowFooter:function(a){this.showFooter=a,this.doUpdate()},getShowFooter:function(){return this.showFooter},setShowWeekNumber:function(a){this.showWeekNumber=a,this.doUpdate()},getShowWeekNumber:function(){return this.showWeekNumber},setShowDaysHeader:function(a){this.showDaysHeader=a,this.doUpdate()},getShowDaysHeader:function(){return this.showDaysHeader},setShowMonthButtons:function(a){this.showMonthButtons=a,this.doUpdate()},getShowMonthButtons:function(){return this.showMonthButtons},setShowYearButtons:function(a){this.showYearButtons=a,this.doUpdate()},getShowYearButtons:function(){return this.showYearButtons},setShowTodayButton:function(a){this.showTodayButton=a,this.todayButtonEl.style.display=this.showTodayButton?"":"none",this.doUpdate()},getShowTodayButton:function(){return this.showTodayButton},setShowYesterdayButton:function(a){this.showYesterdayButton=a,this.yesterdayButtonEl.style.display=this.showYesterdayButton?"":"none",this.doUpdate()},getShowYesterdayButton:function(){return this.showYesterdayButton},setShowClearButton:function(a){this.showClearButton=a,this.closeButtonEl.style.display=this.showClearButton?"":"none",this.doUpdate()},getShowClearButton:function(){return this.showClearButton},setShowOkButton:function(a){this.showOkButton=a,this.okButtonEl.style.display=this.showOkButton?"":"none",this.doUpdate()},getShowOkButton:function(){return this.showOkButton},setViewDate:function(a){a=mini.parseDate(a),a||(a=new Date),mini.isDate(a)&&(a=new Date(a.getTime())),this.viewDate=a,this.doUpdate()},getViewDate:function(){return this.viewDate},setSelectedDate:function(a){a=mini.parseDate(a),a=mini.isDate(a)?new Date(a.getTime()):"";var b=this.getDateEl(this._selectedDate);b&&mini.removeClass(b,this._selectedDateCls),this._selectedDate=a,this._selectedDate&&(this._selectedDate=mini.cloneDate(this._selectedDate));var b=this.getDateEl(this._selectedDate);b&&mini.addClass(b,this._selectedDateCls),this.fire("datechanged")},setSelectedDates:function(a){mini.isArray(a)||(a=[]),this._selectedDates=a,
this.doUpdate()},getSelectedDate:function(){return this._selectedDate?this._selectedDate:""},setTime:function(a){this.timeSpinner.setValue(a)},getTime:function(){return this.timeSpinner.getFormValue()},setValue:function(a){this.setSelectedDate(a),a||(a=new Date),this.setTime(a)},getValue:function(){var a=this._selectedDate;if(a&&(a=mini.clearTime(a),this.showTime)){var b=this.timeSpinner.getValue();b&&(a.setHours(b.getHours()),a.setMinutes(b.getMinutes()),a.setSeconds(b.getSeconds()))}return a?a:""},getFormValue:function(){var a=this.getValue();return a?mini.formatDate(a,"yyyy-MM-dd HH:mm:ss"):""},isSelectedDate:function(a){return a&&this._selectedDate?mini.clearTime(a).getTime()==mini.clearTime(this._selectedDate).getTime():!1},setMultiSelect:function(a){this.multiSelect=a,this.doUpdate()},getMultiSelect:function(){return this.multiSelect},setRows:function(a){isNaN(a)||(1>a&&(a=1),this.rows=a,this.doUpdate())},getRows:function(){return this.rows},setColumns:function(a){isNaN(a)||(1>a&&(a=1),this.columns=a,this.doUpdate())},getColumns:function(){return this.columns},setShowTime:function(a){this.showTime!=a&&(this.showTime=a,this.timeWrapEl.style.display=this.showTime?"":"none",this.doLayout())},getShowTime:function(){return this.showTime},setTimeFormat:function(a){this.timeFormat!=a&&(this.timeSpinner.setFormat(a),this.timeFormat=this.timeSpinner.format)},getTimeFormat:function(){return this.timeFormat},doLayout:function(){if(this.canLayout()){this.timeWrapEl.style.display=this.showTime?"":"none",this.todayButtonEl.style.display=this.showTodayButton?"":"none",this.closeButtonEl.style.display=this.showClearButton?"":"none",this.yesterdayButtonEl.style.display=this.showYesterdayButton?"":"none",this.okButtonEl.style.display=this.showOkButton?"":"none",this.footerSpaceEl.style.display=this.showClearButton&&this.showTodayButton?"":"none",this._footerEl.style.display=this.showFooter?"":"none";var a=this._innerEl.firstChild,b=this.isAutoHeight();b?a.parentNode.style.height="":(a.parentNode.style.height="100px",h=jQuery(this.el).height(),h-=jQuery(this._footerEl).outerHeight(),a.parentNode.style.height=h+"px"),mini.layout(this._footerEl),this.monthPicker&&this._tryShowMenu()}},doUpdate:function(){if(this._allowUpdate){for(var a=new Date(this.viewDate.getTime()),b=(1==this.rows&&1==this.columns,100/this.rows),c='<table class="mini-calendar-views" border="0" cellpadding="0" cellspacing="0">',d=0,e=this.rows;e>d;d++){c+="<tr >";for(var f=0,g=this.columns;g>f;f++)c+='<td style="height:'+b+'%">',c+=this._CreateView(a,d,f),c+="</td>",a=new Date(a.getFullYear(),a.getMonth()+1,1);c+="</tr>"}c+="</table>",this._innerEl.innerHTML=c;var h=this.el;setTimeout(function(){mini.repaint(h)},100),this.doLayout()}},_CreateView:function(a,b,c){var d=a.getMonth(),e=this.getFirstDateOfMonth(a),f=new Date(e.getTime()),g=mini.clearTime(new Date).getTime(),h=(this.value?mini.clearTime(this.value).getTime():-1,this.rows>1||this.columns>1),i="";if(i+='<table class="mini-calendar-view" border="0" cellpadding="0" cellspacing="0">',this.showHeader&&(i+='<tr ><td colSpan="10" class="mini-calendar-header"><div class="mini-calendar-headerInner">',0==b&&0==c&&(i+='<div class="mini-calendar-prev">',this.showYearButtons&&(i+='<span class="mini-calendar-yearPrev"></span>'),this.showMonthButtons&&(i+='<span class="mini-calendar-monthPrev"></span>'),i+="</div>"),0==b&&c==this.columns-1&&(i+='<div class="mini-calendar-next">',this.showMonthButtons&&(i+='<span class="mini-calendar-monthNext"></span>'),this.showYearButtons&&(i+='<span class="mini-calendar-yearNext"></span>'),i+="</div>"),i+='<span class="mini-calendar-title">'+mini.formatDate(a,this.format),i+="</div></td></tr>"),this.showDaysHeader){i+='<tr class="mini-calendar-daysheader"><td class="mini-calendar-space"></td>',this.showWeekNumber&&(i+='<td sclass="mini-calendar-weeknumber"></td>');for(var j=this.firstDayOfWeek,k=j+7;k>j;j++){var l=this.getShortWeek(j);i+='<td yAlign="middle">',i+=l,i+="</td>",e=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1)}i+='<td class="mini-calendar-space"></td></tr>'}e=f;for(var m=0;5>=m;m++){if(i+='<tr class="mini-calendar-days"><td class="mini-calendar-space"></td>',this.showWeekNumber){var n=mini.getWeek(e.getFullYear(),e.getMonth()+1,e.getDate());1==String(n).length&&(n="0"+n),i+='<td class="mini-calendar-weeknumber" yAlign="middle">'+n+"</td>"}for(var j=this.firstDayOfWeek,k=j+7;k>j;j++){var o=this.isWeekend(e),p=mini.clearTime(e).getTime(),q=p==g,r=this.isSelectedDate(e);d!=e.getMonth()&&h&&(p=-1);var s=this._OnDrawDate(e);i+='<td yAlign="middle" id="',i+=this.uid+"$"+p,i+='" class="mini-calendar-date ',o&&(i+=" mini-calendar-weekend "),0==s.allowSelect&&(i+=" mini-calendar-disabled "),d!=e.getMonth()&&h||(r&&(i+=" "+this._selectedDateCls+" "),q&&(i+=" mini-calendar-today ")),d!=e.getMonth()&&(i+=" mini-calendar-othermonth "),s.dateCls&&(i+=" "+s.dateCls),i+='" style="',s.dateStyle&&(i+=s.dateStyle),i+='">',d!=e.getMonth()&&h||(i+=s.dateHtml),i+="</td>",e=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1)}i+='<td class="mini-calendar-space"></td></tr>'}return i+='<tr class="mini-calendar-bottom" colSpan="10"><td ></td></tr>',i+="</table>"},_OnDrawDate:function(a){var b={date:a,dateCls:"",dateStyle:"",dateHtml:a.getDate(),allowSelect:!0};return this.fire("drawdate",b),b},_OnDateClick:function(a,b){this.hideMenu();var c={date:a,action:b};this.fire("dateclick",c),this._OnValueChanged()},menuEl:null,menuYear:null,menuSelectMonth:null,menuSelectYear:null,_tryShowMenu:function(){if(!this.menuEl){var a=this;setTimeout(function(){a.showMenu()},1)}},showMenu:function(){this.hideMenu(),this.menuYear=10*parseInt(this.viewDate.getFullYear()/10),this._menuselectMonth=this.viewDate.getMonth(),this._menuselectYear=this.viewDate.getFullYear();var a='<div class="mini-calendar-menu"></div>';this.menuEl=mini.append(document.body,a),this.updateMenu(this.viewDate);var b=this.getBox();"0px"==this.el.style.borderWidth&&(this.menuEl.style.border="0"),mini.setBox(this.menuEl,b),mini.on(this.menuEl,"click",this.__OnMenuClick,this),mini.on(this.menuEl,"dblclick",this.__OnMenuDblClick,this),mini.on(document,"mousedown",this.__OnBodyMenuMouseDown,this)},hideMenu:function(){this.menuEl&&(mini.un(this.menuEl,"click",this.__OnMenuClick,this),mini.un(document,"mousedown",this.__OnBodyMenuMouseDown,this),jQuery(this.menuEl).remove(),this.menuEl=null)},updateMenu:function(){if(this.menuEl){for(var a='<div class="mini-calendar-menu-months">',b=0,c=12;c>b;b++){var d=mini.getShortMonth(b),e="";this._menuselectMonth==b&&(e="mini-calendar-menu-selected"),a+='<a id="'+b+'" class="mini-calendar-menu-month '+e+'" href="javascript:void(0);" hideFocus onclick="return false">'+d+"</a>"}a+='<div style="clear:both;"></div></div>',a+='<div class="mini-calendar-menu-years">';for(var b=this.menuYear,c=this.menuYear+10;c>b;b++){var d=b,e="";this._menuselectYear==b&&(e="mini-calendar-menu-selected"),a+='<a id="'+b+'" class="mini-calendar-menu-year '+e+'" href="javascript:void(0);" hideFocus onclick="return false">'+d+"</a>"}a+='<div class="mini-calendar-menu-prevYear"></div><div class="mini-calendar-menu-nextYear"></div><div style="clear:both;"></div></div>',a+='<div class="mini-calendar-footer"><span class="mini-calendar-okButton">'+this.okText+'</span><span class="mini-calendar-footerSpace"></span><span class="mini-calendar-cancelButton">'+this.cancelText+'</span></div><div style="clear:both;"></div>',this.menuEl.innerHTML=a}},__OnMenuClick:function(a){function b(){setTimeout(function(){c.updateMenu()},30)}var c=this,d=a.target,e=mini.findParent(d,"mini-calendar-menu-month"),f=mini.findParent(d,"mini-calendar-menu-year");e?(this._menuselectMonth=parseInt(e.id),b()):f?(this._menuselectYear=parseInt(f.id),b()):mini.findParent(d,"mini-calendar-menu-prevYear")?(this.menuYear=this.menuYear-1,this.menuYear=10*parseInt(this.menuYear/10),b()):mini.findParent(d,"mini-calendar-menu-nextYear")?(this.menuYear=this.menuYear+11,this.menuYear=10*parseInt(this.menuYear/10),b()):mini.findParent(d,"mini-calendar-okButton")?this.__getMonthYear():mini.findParent(d,"mini-calendar-cancelButton")&&(this.monthPicker?this._OnDateClick(null,"cancel"):this.hideMenu())},__OnMenuDblClick:function(a){var b=mini.findParent(a.target,"mini-calendar-menu-year"),c=mini.findParent(a.target,"mini-calendar-menu-month"),d=mini.findParent(a.target,"mini-calendar-date ");(b||c||d)&&(!this.monthPicker||c||b)&&this.__getMonthYear()},__getMonthYear:function(){var a=new Date(this._menuselectYear,this._menuselectMonth,1);this.monthPicker?(this.setViewDate(a),this.setSelectedDate(a),this._OnDateClick(a)):(this.setViewDate(a),this.hideMenu())},__OnBodyMenuMouseDown:function(a){mini.findParent(a.target,"mini-calendar-menu")||mini.findParent(a.target,"mini-monthpicker")||this.hideMenu()},__OnClick:function(a){var b=this.viewDate;if(0!=this.enabled){var c=a.target,d=mini.findParent(a.target,"mini-calendar-title");if(mini.findParent(c,"mini-calendar-monthNext"))b.setDate(1),b.setMonth(b.getMonth()+1),this.setViewDate(b);else if(mini.findParent(c,"mini-calendar-yearNext"))b.setDate(1),b.setFullYear(b.getFullYear()+1),this.setViewDate(b);else if(mini.findParent(c,"mini-calendar-monthPrev"))b.setMonth(b.getMonth()-1),this.setViewDate(b);else if(mini.findParent(c,"mini-calendar-yearPrev"))b.setFullYear(b.getFullYear()-1),this.setViewDate(b);else if(mini.findParent(c,"mini-calendar-tadayButton")){var e=!!mini.findParent(c,"yesterday"),f=new Date;if(e&&f.setDate(f.getDate()-1),this.setViewDate(f),this.setSelectedDate(f),this.currentTime){var g=new Date;this.setTime(g)}this._OnDateClick(f,"today")}else mini.findParent(c,"mini-calendar-clearButton")?(this.setSelectedDate(null),this.setTime(null),this._OnDateClick(null,"clear")):mini.findParent(c,"mini-calendar-okButton")?this._OnDateClick(null,"ok"):d&&this.showMenu();var h=mini.findParent(a.target,"mini-calendar-date");if(h&&!mini.hasClass(h,"mini-calendar-disabled")){var i=h.id.split("$"),j=parseInt(i[i.length-1]);if(-1==j)return;var k=new Date(j);this._OnDateClick(k)}}},__OnMouseDown:function(a){if(0!=this.enabled){var b=mini.findParent(a.target,"mini-calendar-date");if(b&&!mini.hasClass(b,"mini-calendar-disabled")){var c=b.id.split("$"),d=parseInt(c[c.length-1]);if(-1==d)return;var e=new Date(d);this.setSelectedDate(e)}}},__OnTimeChanged:function(a){this.fire("timechanged"),this._OnValueChanged()},__OnKeyDown:function(a){if(0!=this.enabled){var b=this.getSelectedDate();switch(b||(b=new Date(this.viewDate.getTime())),a.keyCode){case 27:break;case 13:return void(b&&this._OnDateClick(b));case 37:b=mini.addDate(b,-1,"D");break;case 38:b=mini.addDate(b,-7,"D");break;case 39:b=mini.addDate(b,1,"D");break;case 40:b=mini.addDate(b,7,"D")}var c=this;b.getMonth()!=c.viewDate.getMonth()&&(c.setViewDate(mini.cloneDate(b)),c.focus());var d=this.getDateEl(b);d&&mini.hasClass(d,"mini-calendar-disabled")||(c.setSelectedDate(b),(37==a.keyCode||38==a.keyCode||39==a.keyCode||40==a.keyCode)&&a.preventDefault())}},_OnValueChanged:function(){this.fire("valuechanged")},getAttrs:function(a){var b=mini.Calendar.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["viewDate","rows","columns","ondateclick","ondrawdate","ondatechanged","timeFormat","ontimechanged","onvaluechanged"]),mini._ParseBool(a,b,["multiSelect","showHeader","showFooter","showWeekNumber","showDaysHeader","showMonthButtons","showYearButtons","showTodayButton","showClearButton","showYesterdayButton","showTime","showOkButton"]),b}}),mini.regClass(mini.Calendar,"calendar"),mini.CalendarYear=function(){this.viewDate=new Date,this._selectedDates=[],mini.CalendarYear.superclass.constructor.call(this)},mini.extend(mini.CalendarYear,mini.Control,{width:220,_clearBorder:!1,uiCls:"mini-calendaryear",_create:function(){this.el=document.createElement("div"),this.startYear=10*parseInt(this.viewDate.getFullYear()/10),this.selectYear=this.viewDate.getFullYear(),s='<div class="mini-calendaryear-years"></div>',this.el.innerHTML=s,this.yearsEl=this.el.childNodes[0],this.updateYears()},_initEvents:function(){mini.on(this.el,"click",this.__OnClick,this)},updateYears:function(){for(var a="",b=this.startYear,c=this.startYear+20;c>b;b++){var d=b,e="";this.selectYear==b&&(e="mini-calendaryear-year-selected"),a+='<a id="'+b+'" class="mini-calendaryear-year '+e+'" href="javascript:void(0);" hideFocus onclick="return false">'+d+"</a>"}a+='<div class="mini-calendaryear-prevYear"></div><div class="mini-calendaryear-nextYear"></div><div style="clear:both;"></div>',this.yearsEl.innerHTML=a},__OnClick:function(a){var b=a.target,c=mini.findParent(b,"mini-calendaryear-year");c?(this.selectYear=parseInt(c.id),this.setValue(this.selectYear),this.updateYears(),this._OnDateClick(this.selectYear)):mini.findParent(b,"mini-calendaryear-prevYear")?(this.startYear=this.startYear-20,this.updateYears()):mini.findParent(b,"mini-calendaryear-nextYear")&&(this.startYear=this.startYear+20,this.updateYears())},_OnDateClick:function(a,b){var c={year:a,action:b};this.fire("dateclick",c)},setValue:function(a){this.value=a,this.selectYear=a,this.startYear=10*parseInt(this.selectYear/10)},getValue:function(){return this.value}}),mini.regClass(mini.CalendarYear,"calendaryear"),mini.DataSet=function(){this._sources={},this._data={},this._links=[],this._originals={},mini.DataSet.superclass.constructor.call(this)},mini.extend(mini.DataSet,mini.Component,{add:function(a,b){a&&b&&(this._sources[a]=b,this._data[a]=[],b.autoCreateNewID=!0,b._originalIdField=b.getIdField(),b._clearOriginals=!1,b.on("addrow",this.__OnRowChanged,this),b.on("updaterow",this.__OnRowChanged,this),b.on("deleterow",this.__OnRowChanged,this),b.on("removerow",this.__OnRowChanged,this),b.on("preload",this.__OnDataPreLoad,this),b.on("selectionchanged",this.__OnDataSelectionChanged,this))},addLink:function(a,b,c){if(a&&b&&c&&this._sources[a]&&this._sources[b]){var d={parentName:a,childName:b,parentField:c};this._links.push(d)}},clearData:function(){this._data={},this._originals={};for(var a in this._sources)this._data=[]},getData:function(){return this._data},_getNameByListControl:function(a){for(var b in this._sources){var c=this._sources[b];if(c==a)return b}},_getRecord:function(a,b,c){var d=this._data[a];if(!d)return!1;for(var e=0,f=d.length;f>e;e++){var g=d[e];if(g[c]==b[c])return g}return null},__OnRowChanged:function(a){var b=a.type,c=a.record,d=this._getNameByListControl(a.sender),e=this._getRecord(d,c,a.sender.getIdField()),f=this._data[d];if(e){var f=this._data[d];f.remove(e)}if("removerow"==b&&"added"==c._state||f.push(c),this._originals[d]=a.sender._originals,"added"==c._state){var g=this._getParentSource(a.sender);if(g){var h=g.getSelected();h?c._parentId=h[g.getIdField()]:f.remove(c)}}},__OnDataPreLoad:function(a){for(var b=a.sender,c=this._getNameByListControl(b),d=a.sender.getIdField(),e=this._data[c],f={},g=0,h=e.length;h>g;g++){var i=e[g];f[i[d]]=i}var j=this._originals[c];j&&(b._originals=j);for(var k=a.data||[],g=0,h=k.length;h>g;g++){var i=k[g],l=f[i[d]];l&&(delete l._uid,mini.copyTo(i,l))}var m=this._getParentSource(b);if(b.getPageIndex&&0==b.getPageIndex()){for(var n=[],g=0,h=e.length;h>g;g++){var i=e[g];if("added"==i._state)if(m){var o=m.getSelected();o&&o[m.getIdField()]==i._parentId&&n.push(i)}else n.push(i)}n.reverse(),k.insertRange(0,n)}for(var p=[],g=k.length-1;g>=0;g--){var i=k[g],l=f[i[d]];l&&"removed"==l._state&&(k.removeAt(g),p.push(l))}},_getParentSource:function(a){for(var b=this._getNameByListControl(a),c=0,d=this._links.length;d>c;c++){var e=this._links[c];if(e.childName==b)return this._sources[e.parentName]}},_getLinks:function(a){for(var b=this._getNameByListControl(a),c=[],d=0,e=this._links.length;e>d;d++){var f=this._links[d];f.parentName==b&&c.push(f)}return c},__OnDataSelectionChanged:function(a){for(var b=a.sender,c=b.getSelected(),d=this._getLinks(b),e=0,f=d.length;f>e;e++){var g=d[e],h=this._sources[g.childName];if(c){var i={};i[g.parentField]=c[b.getIdField()],h.load(i)}else h.loadData([])}}}),mini.regClass(mini.DataSet,"dataset"),mini.FileUpload=function(a){this.postParam={},mini.FileUpload.superclass.constructor.call(this,a),this.on("validation",this.__OnValidation,this)},mini.extend(mini.FileUpload,mini.ButtonEdit,{width:180,buttonText:"\u6d4f\u89c8...",_buttonWidth:56,limitTypeErrorText:"\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",readOnly:!0,_cellSpacing:0,limitSize:"",limitType:"",typesDescription:"\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f",uploadLimit:0,queueLimit:"",flashUrl:"",uploadUrl:"",showUploadProgress:!0,usequerystring:!1,postParam:null,uploadOnSelect:!1,updateFileName:"flashPlayerSetup.zip",uiCls:"mini-fileupload",_create:function(){mini.FileUpload.superclass._create.call(this),mini.addClass(this.el,"mini-htmlfile"),this._progressbarEl=mini.append(this._borderEl,'<div id="'+this._id+'$progressbar"  class="mini-fileupload-progressbar"><div id="'+this._id+'$complete" class="mini-fileupload-complete"></div></div>'),this._completeEl=this._progressbarEl.firstChild,this._uploadId=this.uid+"$button_placeholder",this._fileEl=mini.append(this.el,'<span id="'+this._uploadId+'"></span>'),this.uploadEl=this._fileEl,mini.on(this._borderEl,"mousemove",this.__OnMouseMove,this),mini.on(this._borderEl,"click",this.__OnClick,this)},_getButtonHtml:function(){var a="onmouseover=\"mini.addClass(this, '"+this._buttonHoverCls+"');\" onmouseout=\"mini.removeClass(this, '"+this._buttonHoverCls+"');\"";return'<span class="mini-buttonedit-button" '+a+">"+this.buttonText+"</span>"},destroy:function(a){this._innerEl&&(mini.clearEvent(this._innerEl),this._innerEl=null),mini.FileUpload.superclass.destroy.call(this,a)},doLayout:function(){if(mini.FileUpload.superclass.doLayout.call(this),this.swfUpload){var a=this.swfUpload.movieElement;a.style.width=this._borderEl.style.width}},flashChecker:function(){var a=0,b=0;if(document.all)try{var c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");c&&(a=1,VSwf=c.GetVariable("$version"),b=parseInt(VSwf.split(" ")[1].split(",")[0]))}catch(d){}else if(navigator.plugins&&navigator.plugins.length>0){var c=navigator.plugins["Shockwave Flash"];if(c){a=1;for(var e=c.description.split(" "),f=0;f<e.length;++f)isNaN(parseInt(e[f]))||(b=parseInt(e[f]))}}return{hasFlash:a,version:b}},__OnClick:function(a){if(!this.flashChecker().hasFlash){var b=mini_CreateJSPath("swfupload.js");return void mini.showMessageBox({width:250,title:"Flash Player\u5b89\u88c5",buttons:[],message:"Flash Player\u5b89\u88c5",html:"<a href='"+b+this.updateFileName+"' target='freshme'>Flash Player\u672a\u5b89\u88c5\uff0c\u8bf7\u70b9\u51fb\u6b64\u5904\u5b89\u88c5\uff0c\u5b89\u88c5\u5b8c\u540e\u8bf7\u91cd\u542f\u6d4f\u89c8\u5668\u3002</a><iframe style='width:0px;height:0px;border:none;' name='freshme'></iframe>"})}if(this.flashChecker().version<10){var b=mini_CreateJSPath("swfupload.js");return void mini.showMessageBox({width:250,title:"Flash Player\u5347\u7ea7",buttons:[],message:"Flash Player\u5347\u7ea7",html:"<a href='"+b+this.updateFileName+"' target='freshme'>\u60a8\u7684Flash Player\u7248\u672c\u592a\u4f4e\uff0c\u8bf7\u70b9\u51fb\u6b64\u5904\u5347\u7ea7\uff0c\u5347\u7ea7\u5b8c\u540e\u8bf7\u91cd\u542f\u6d4f\u89c8\u5668\u3002</a><iframe style='width:0px;height:0px;border:none;' name='freshme'></iframe>"})}},__OnMouseMove:function(a){if(0!=this.enabled){var b=this;if(!this.swfUpload){if(!this.flashChecker().hasFlash)return;if(this.flashChecker().version<10)return;var c=new SWFUpload({file_post_name:this.name,upload_url:b.uploadUrl,flash_url:b.flashUrl,file_size_limit:b.limitSize,file_types:b.limitType,file_types_description:b.typesDescription,file_upload_limit:parseInt(b.uploadLimit),file_queue_limit:b.queueLimit,use_query_string:b.usequerystring,file_queued_handler:mini.createDelegate(this.__on_file_queued,this),file_queue_error_handler:mini.createDelegate(this.__on_file_queued_error,this),upload_error_handler:mini.createDelegate(this.__on_upload_error,this),upload_success_handler:mini.createDelegate(this.__on_upload_success,this),upload_complete_handler:mini.createDelegate(this.__on_upload_complete,this),upload_progress_handler:mini.createDelegate(this.__on_upload_progress,this),button_placeholder_id:this._uploadId,button_width:1e3,button_height:50,button_window_mode:"transparent",button_action:SWFUpload.BUTTON_ACTION.SELECT_FILE,debug:!1});c.flashReady(),this.swfUpload=c;var d=this.swfUpload.movieElement;d.style.zIndex=1e3,d.style.position="absolute",d.style.left="0px",d.style.top="0px",d.style.width="100%",d.style.height="50px"}}},setLimitSize:function(a){this.limitSize=a},addPostParam:function(a){mini.copyTo(this.postParam,a)},getPostParam:function(){return this.postParam},setLimitType:function(a){this.limitType=a,this.swfUpload&&this.swfUpload.setFileTypes(this.limitType,this.typesDescription+"\uff08"+a+"\uff09")},getLimitType:function(){return this.limitType},setTypesDescription:function(a){this.typesDescription=a,this.swfUpload&&this.swfUpload.setFileTypes(this.limitType,this.typesDescription)},getTypesDescription:function(){return this.typesDescription},setButtonText:function(a){this.buttonText=a,this._buttonEl.innerHTML=a},getButtonText:function(){return this.buttonText},setUploadLimit:function(a){this.uploadLimit=a},setQueueLimit:function(a){this.queueLimit=a},setUseQueryString:function(a){this.usequerystring=a},setFlashUrl:function(a){this.flashUrl=a},setUploadUrl:function(a){this.swfUpload&&this.swfUpload.setUploadURL(a),this.uploadUrl=a},getUploadUrl:function(){return this.uploadUrl},setPostParam:function(a){this.swfUpload&&this.swfUpload.setPostParams(a),this.postParam=a},setName:function(a){this.name=a},setUpdateFileName:function(a){this.updateFileName=a},startUpload:function(a){if(""==this.getValue())return void mini.alert("\u8bf7\u9009\u62e9\u4e0a\u4f20\u6587\u4ef6\u3002");var b={cancel:!1};if(this.fire("beforeupload",b),1!=b.cancel&&this.swfUpload){this.swfUpload.setPostParams(this.postParam);var c=this.swfUpload.getStats(),d=this.swfUpload.getFile(c.files_queued+c.successful_uploads+c.upload_errors+c.queue_errors-1);this.swfUpload.startUpload(d.id)}},setShowUploadProgress:function(a){this.showUploadProgress=a,this._progressbarEl.style.display=a?"block":"none"},getShowUploadProgress:function(){return this.showUploadProgress},__on_upload_progress:function(a,b,c){if(this.showUploadProgress){var d=mini.getWidth(this._progressbarEl),e=d*b/c;mini.setWidth(this._completeEl,e)}this._progressbarEl.style.display=this.showUploadProgress?"block":"none";var f={file:a,complete:b,total:c};this.fire("uploadprogress",f)},__on_file_queued:function(a){var b={file:a};this.uploadOnSelect&&this.startUpload(),this.setText(a.name),this.setValue(a.name),this.fire("fileselect",b)},__on_file_queued_error:function(a,b,c){switch(b){case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:var d=a.size;d>0&&(d=parseInt(d/1024/1024*10),d/=10),mini.alert("\u4e0a\u4f20\u6587\u4ef6\u592a\u5927, \u6587\u4ef6\u540d: "+a.name+", \u5927\u5c0f: "+d+"MB"),this.setValue("");break;case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:mini.alert("\u6587\u4ef6\u5927\u5c0f\u4e3a0, \u6587\u4ef6\u540d: "+a.name),this.setValue("");break;case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:mini.alert("\u6587\u4ef6\u7c7b\u578b\u4e0d\u7b26, \u6587\u4ef6\u540d: "+a.name),this.setValue("")}},__on_upload_success:function(a,b){var c={file:a,serverData:b};this.fire("uploadsuccess",c),this._progressbarEl.style.display="none"},__on_upload_error:function(a,b,c){if("File Cancelled"!=c){this._progressbarEl.style.display="none";var d={file:a,code:b,message:c};this.fire("uploaderror",d)}},__on_upload_complete:function(a){this._progressbarEl.style.display="none",this.fire("uploadcomplete",a)},__fileError:function(){},setValue:function(a,b){mini.FileUpload.superclass.setValue.call(this,a,b),mini.FileUpload.superclass.setText.call(this,a)},getAttrs:function(a){var b=mini.FileUpload.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["limitType","limitSize","flashUrl","uploadUrl","uploadLimit","buttonText","showUploadProgress","onuploadsuccess","onuploaderror","onuploadcomplete","onfileselect","onuploadprogress","usequerystring","updateFileName"]),mini._ParseBool(a,b,["uploadOnSelect"]),b}}),mini.regClass(mini.FileUpload,"fileupload"),mini.Fit=function(){mini.Fit.superclass.constructor.call(this)},mini.extend(mini.Fit,mini.Container,{style:"",_clearBorder:!1,uiCls:"mini-fit",_create:function(){this.el=document.createElement("div"),this.el.className="mini-fit",this._bodyEl=this.el},_initEvents:function(){},isFixedSize:function(){return!1},doLayout:function(){if(this.canLayout()){var a=this.el.parentNode,b=mini.getChildNodes(a);a==document.body&&(this.el.style.height="0px");for(var c=mini.getHeight(a,!0),d=0,e=b.length;e>d;d++){var f=b[d],g=f.tagName?f.tagName.toLowerCase():"";if(f!=this.el&&"style"!=g&&"script"!=g){var h=mini.getStyle(f,"position");if("absolute"!=h&&"fixed"!=h){var i=mini.getHeight(f),j=mini.getMargins(f);c=c-i-j.top-j.bottom}}}var k=mini.getBorders(this.el),l=mini.getPaddings(this.el),j=mini.getMargins(this.el);c=c-j.top-j.bottom,jQuery.boxModel&&(c=c-l.top-l.bottom-k.top-k.bottom),0>c&&(c=0),this.el.style.height=c+"px";try{b=mini.getChildNodes(this.el);for(var d=0,e=b.length;e>d;d++){var f=b[d];mini.layout(f)}}catch(m){}}},set_bodyParent:function(a){if(a){for(var b=this._bodyEl,c=a;c.firstChild;)try{b.appendChild(c.firstChild)}catch(d){}this.doLayout()}},getAttrs:function(a){var b=mini.Fit.superclass.getAttrs.call(this,a);return b._bodyParent=a,b}}),mini.regClass(mini.Fit,"fit"),mini.Form=function(a){if(this.el=mini.byId(a),!this.el)throw new Error("form element not null");mini.Form.superclass.constructor.call(this)},mini.extend(mini.Form,mini.Component,{el:null,getFields:function(){if(!this.el)return[];var a=mini.findControls(function(a){return a.el&&1==a.formField&&mini.isAncestor(this.el,a.el)?!0:!1},this);return a},getFieldsMap:function(){for(var a=this.getFields(),b={},c=0,d=a.length;d>c;c++){var e=a[c];e.name&&(b[e.name]=e)}return b},getField:function(a){return this.el?mini.getbyName(a,this.el):null},getData:function(a,b,c){mini.isNull(b)&&(b=!0);for(var d=a?"getFormValue":"getValue",e=this.getFields(),f={},g={},h=0,i=e.length;i>h;h++){var j=e[h],k=j[d];k&&(j.name&&(g[j.name]=j.name,1==b?mini._setMap(j.name,k.call(j),f):f[j.name]=k.call(j)),j.textName&&j.getText&&(1==b?f[j.textName]=j.getText():mini._setMap(j.textName,j.getText(),f)))}if(c)for(var l=jQuery(this.el).find(":input:hidden"),m=0;m<l.length;m++){var n=mini.getAttr(l[m],"name"),o=l[m].value;n&&!g[n]&&(1==b?g[n]||mini._setMap(n,l[m].value,f):f[n]=o)}return f},setData:function(a,b,c,d){mini.isNull(c)&&(c=!0),"object"!=typeof a&&(a={});var e=this.getFieldsMap();for(var f in e){var g=e[f];if(g){if(g.setValue){var h=a[f];if(1==c&&(h=mini._getMap(f,a)),void 0===h&&!b)continue;null===h&&(h=""),g.setValue(h,d)}if(g.setText&&g.textName){var i=a[g.textName];1==c&&(i=mini._getMap(g.textName,a)),mini.isNull(i)&&(i=""),g.setText(i)}}}},getChanges:function(a,b){function c(a){return""==a?null:a}for(var d,e,f=this.getFields(),g=a?"getFormValue":"getValue",h={},i={},j=0,k=f.length;k>j;j++){var l=f[j],m=l[g],n=l.getValue,o=l.getDefaultValue;if(m&&o&&n){if(d=o.call(l),e=n.call(l),"mini-datepicker"==l.uiCls){if(!d&&!e)continue;if(d&&e&&(d=mini.parseDate(d),e-d==0))continue}else if("mini-timespinner"==l.uiCls){if(!d&&!e)continue;if(d&&e&&(d=mini.parseTime(d,l.format),mini.formatDate(e,"H:mm:ss")==mini.formatDate(d,"H:mm:ss")))continue}else if(c(d)==c(e))continue;l.name&&(i[l.name]=l.name,1==b?mini._setMap(l.name,m.call(l),h):h[l.name]=m.call(l)),l.textName&&l.getText&&(1==b?h[l.textName]=l.getText():mini._setMap(l.textName,l.getText(),h))}}return h},reset:function(){for(var a=this.getFields(),b=0,c=a.length;c>b;b++){var d=a[b];!d.destroyed&&d.setValue&&(d.setText&&d._clearText!==!1&&d.setText(""),d.setValue(d.defaultValue,!0))}this.setIsValid(!0)},clear:function(){for(var a=this.getFields(),b=0,c=a.length;c>b;b++){var d=a[b];d.setValue&&(d.setText&&d._clearText!==!1&&d.setText(""),d.setValue("",!0))}this.setIsValid(!0)},validate:function(a,b){for(var c=this.getFields(),d=0,e=c.length;e>d;d++){var f=c[d];if(f.validate&&(void 0===b&&(b=!1),f.isDisplay&&f.isDisplay()||b)){var g=f.validate();if(0==g&&a===!1)break}}return this.isValid(b)},setIsValid:function(a){for(var b=this.getFields(),c=0,d=b.length;d>c;c++){var e=b[c];!e.destroyed&&e.setIsValid&&e.setIsValid(a)}},isValid:function(a){for(var b=this.getFields(),c=0,d=b.length;d>c;c++){var e=b[c];if(e.isValid&&(void 0===a&&(a=!1),(e.isDisplay&&e.isDisplay()||a)&&0==e.isValid()))return!1}return!0},getErrorTexts:function(){for(var a=[],b=this.getErrors(),c=0,d=b.length;d>c;c++){var e=b[c];a.push(e.errorText)}return a},getErrors:function(){for(var a=[],b=this.getFields(),c=0,d=b.length;d>c;c++){var e=b[c];e.isValid&&0==e.isValid()&&a.push(e)}return a},mask:function(a){"string"==typeof a&&(a={html:a}),a=a||{},a.el=this.el,a.cls||(a.cls=this._maskCls),mini.mask(a)},unmask:function(){mini.unmask(this.el)},_maskCls:"mini-mask-loading",loadingMsg:"\u6570\u636e\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...",loading:function(a){this.mask(a||this.loadingMsg)},__OnValueChanged:function(a){this._changed=!0},_changed:!1,setChanged:function(a){this._changed=a;for(var b=this.getFields(),c=0,d=b.length;d>c;c++){var e=b[c];e.on("valuechanged",this.__OnValueChanged,this)}},isChanged:function(){return this._changed},setEnabled:function(a){for(var b=this.getFields(),c=0,d=b.length;d>c;c++){var e=b[c];e.setEnabled(a)}},setEnterKeyNext:function(){function a(a){function c(a){function c(a){var d=b[a+1];if(d)if("mini-textbox"==d.uiCls||"mini-textarea"==d.uiCls||"mini-password"==d.uiCls||"mini-treeselect"==d.uiCls||"mini-combobox"==d.uiCls&&"pagesize"!=d.name||"mini-datepicker"==d.uiCls||"mini-monthpicker"==d.uiCls||"mini-yearpicker"==d.uiCls||"mini-timespinner"==d.uiCls||"mini-spinner"==d.uiCls||"mini-checkbox"==d.uiCls||"mini-radiobuttonlist"==d.uiCls||"mini-checkboxlist"==d.uiCls||"mini-autocomplete"==d.uiCls){if(d.isShowPopup&&d.isShowPopup())return;d.focus(),d.showPopup&&"mini-autocomplete"!=d.uiCls&&setTimeout(function(){d.showPopup()},1)}else a++,c(a)}var d=a.sender,e=b.indexOf(d);c(e)}a.on("enter",c)}for(var b=this.getFields(),c=0,d=b.length;d>c;c++){var e=b[c];a(e)}}}),mini=mini||{},mini.Hidden=function(){mini.Hidden.superclass.constructor.call(this)},mini.extend(mini.Hidden,mini.Control,{_clearBorder:!1,formField:!0,value:"",uiCls:"mini-hidden",_create:function(){this.el=document.createElement("input"),this.el.type="hidden",this.el.className="mini-hidden"},setName:function(a){this.name=a,this.el.name=a},setValue:function(a){if((null===a||void 0===a)&&(a=""),this.value=a,mini.isDate(a)){var b=a.getFullYear(),c=a.getMonth()+1,d=a.getDate();c=10>c?"0"+c:c,d=10>d?"0"+d:d,this.el.value=b+"-"+c+"-"+d}else this.el.value=a},getValue:function(){return this.value},getFormValue:function(){return this.el.value}}),mini.regClass(mini.Hidden,"hidden"),mini.HtmlFile=function(){mini.HtmlFile.superclass.constructor.call(this),this.on("validation",this.__OnValidation,this)},mini.extend(mini.HtmlFile,mini.ButtonEdit,{width:180,buttonText:"\u6d4f\u89c8...",_buttonWidth:56,limitType:"",limitTypeErrorText:"\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",allowInput:!1,readOnly:!0,_cellSpacing:0,uiCls:"mini-htmlfile",_create:function(){mini.HtmlFile.superclass._create.call(this),this._fileEl=mini.append(this.el,'<input type="file" hideFocus class="mini-htmlfile-file" name="'+this.name+'" ContentEditable=false/>'),mini.on(this._borderEl,"mousemove",this.__OnMouseMove,this),mini.on(this._fileEl,"change",this.__OnFileChange,this)},_getButtonHtml:function(){var a="onmouseover=\"mini.addClass(this, '"+this._buttonHoverCls+"');\" onmouseout=\"mini.removeClass(this, '"+this._buttonHoverCls+"');\"";return'<span class="mini-buttonedit-button" '+a+">"+this.buttonText+"</span>"},__OnFileChange:function(a){this.value=this._textEl.value=this._fileEl.value,this._OnValueChanged(),a={htmlEvent:a
},this.fire("fileselect",a)},__OnMouseMove:function(a){var b=a.pageX,c=a.pageY,d=mini.getBox(this.el);b=b-d.x-5,c=c-d.y-5,0==this.enabled&&(b=-20,c=-20),this._fileEl.style.display="",this._fileEl.style.left=b+"px",this._fileEl.style.top=c+"px"},__OnValidation:function(a){if(this.limitType){var b=a.value.split("."),c="*."+b[b.length-1],d=this.limitType.split(";");d.length>0&&-1==d.indexOf(c)&&(a.errorText=this.limitTypeErrorText+this.limitType,a.isValid=!1)}},setName:function(a){this.name=a,mini.setAttr(this._fileEl,"name",this.name)},getValue:function(){return this._textEl.value},setButtonText:function(a){this.buttonText=a},getButtonText:function(){return this.buttonText},setLimitType:function(a){this.limitType=a},getLimitType:function(){return this.limitType},getAttrs:function(a){var b=mini.HtmlFile.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["limitType","buttonText","limitTypeErrorText","onfileselect"]),b}}),mini.regClass(mini.HtmlFile,"htmlfile"),mini.Include=function(){mini.Include.superclass.constructor.call(this)},mini.extend(mini.Include,mini.Control,{url:"",uiCls:"mini-include",_create:function(){this.el=document.createElement("div"),this.el.className="mini-include"},_initEvents:function(){},doLayout:function(){if(this.canLayout()){var a=this.el.childNodes;if(a)for(var b=0,c=a.length;c>b;b++){var d=a[b];mini.layout(d)}}},setUrl:function(a){this.url=this.parseUrl(a),mini.update({url:this.url,el:this.el,async:this.async}),this.doLayout()},getUrl:function(a){return this.url},getAttrs:function(a){var b=mini.Include.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["url"]),b}}),mini.regClass(mini.Include,"include"),mini.Layout=function(){this.regions=[],this.regionMap={},mini.Layout.superclass.constructor.call(this)},mini.extend(mini.Layout,mini.Control,{regions:[],splitSize:5,collapseWidth:28,collapseHeight:25,regionWidth:150,regionHeight:80,regionMinWidth:50,regionMinHeight:25,regionMaxWidth:2e3,regionMaxHeight:2e3,uiCls:"mini-layout",destroy:function(a){mini.un(document,"mousedown",this.__OnDocMouseDown,this),this._borderEl&&(mini.clearEvent(this._borderEl),this._borderEl.parentNode.removeChild(this._borderEl),this._borderEl=null),this.drag&&(mini.clearEvent(this.drag),this.drag.destroy(a),this.drag=null);var b=this;$.each(this.regions,function(){b._destroyRegionEl(this)}),delete this.regions,delete this.regionMap,mini.Layout.superclass.destroy.call(this,a)},_create:function(){this.el=document.createElement("div"),this.el.className="mini-layout",this.el.innerHTML='<div class="mini-layout-border"></div>',this._borderEl=this.el.firstChild,this.doUpdate()},_initEvents:function(){mini._BindEvents(function(){mini.on(this.el,"click",this.__OnClick,this),mini.on(this.el,"mousedown",this.__OnMouseDown,this),mini.on(this.el,"mouseover",this.__OnMouseOver,this),mini.on(this.el,"mouseout",this.__OnMouseOut,this),mini.on(document,"mousedown",this.__OnDocMouseDown,this)},this)},getRegionEl:function(a){var a=this.getRegion(a);return a?a._el:null},getRegionHeaderEl:function(a){var a=this.getRegion(a);return a?a._header:null},getRegionBodyEl:function(a){var a=this.getRegion(a);return a?a._body:null},getRegionSplitEl:function(a){var a=this.getRegion(a);return a?a._split:null},getRegionProxyEl:function(a){var a=this.getRegion(a);return a?a._proxy:null},getRegionBox:function(a){var b=this.getRegionEl(a);return b?mini.getBox(b):null},getRegion:function(a){return"string"==typeof a?this.regionMap[a]:a},_getButton:function(a,b){for(var c=a.buttons,d=0,e=c.length;e>d;d++){var f=c[d];if(f.name==b)return f}},_createRegion:function(a){var b=mini.copyTo({region:"",title:"",iconCls:"",iconStyle:"",showCloseButton:!1,showCollapseButton:!0,buttons:[{name:"close",cls:"mini-tools-close",html:"",visible:!1},{name:"collapse",cls:"mini-tools-collapse",html:"",visible:!0}],showSplitIcon:!1,showSplit:!0,showHeader:!0,splitSize:this.splitSize,collapseSize:this.collapseWidth,width:this.regionWidth,height:this.regionHeight,minWidth:this.regionMinWidth,minHeight:this.regionMinHeight,maxWidth:this.regionMaxWidth,maxHeight:this.regionMaxHeight,allowResize:!0,cls:"",style:"",headerCls:"",headerStyle:"",bodyCls:"",bodyStyle:"",visible:!0,expanded:!0},a);return b},_CreateRegionEl:function(a){var a=this.getRegion(a);a&&(mini.append(this._borderEl,'<div id="'+a.region+'" class="mini-layout-region"><div class="mini-layout-region-header" style="'+a.headerStyle+'"></div><div class="mini-layout-region-body '+a.bodyCls+'" style="'+a.bodyStyle+'"></div></div>'),a._el=this._borderEl.lastChild,a._header=a._el.firstChild,a._body=a._el.lastChild,mini.on(a._body,"scroll",function(){$("body").trigger("mousedown")},this),a.cls&&mini.addClass(a._el,a.cls),a.style&&mini.setStyle(a._el,a.style),mini.addClass(a._el,"mini-layout-region-"+a.region),"center"!=a.region&&(mini.append(this._borderEl,'<div uid="'+this.uid+'" id="'+a.region+'" class="mini-layout-split"><div class="mini-layout-spliticon"></div></div>'),a._split=this._borderEl.lastChild,mini.addClass(a._split,"mini-layout-split-"+a.region)),"center"!=a.region&&(mini.append(this._borderEl,'<div id="'+a.region+'" class="mini-layout-proxy"></div>'),a._proxy=this._borderEl.lastChild,mini.addClass(a._proxy,"mini-layout-proxy-"+a.region)))},_destroyRegionEl:function(a){a&&(a._header&&(mini.clearEvent(a._header),a._header.parentNode.removeChild(a._header),a._header=null),a._body&&(mini.clearEvent(a._body),a._body.parentNode.removeChild(a._body),a._body=null),a._el&&(mini.clearEvent(a._el),a._el.parentNode.removeChild(a._el),a._el=null),a._split&&(mini.clearEvent(a._split),a._split.parentNode.removeChild(a._split),a._split=null),a._proxy&&(mini.clearEvent(a._proxy),a._proxy.parentNode.removeChild(a._proxy),a._proxy=null),mini.clearEvent(a),a=null)},setRegionControls:function(a,b){var a=this.getRegion(a);if(a){var c=this.getRegionBodyEl(a);__mini_setControls(b,c,this)}},setRegions:function(a){if(mini.isArray(a))for(var b=0,c=a.length;c>b;b++)this.addRegion(a[b])},addRegion:function(a,b){var c=a;a=this._createRegion(a),a.region||(a.region="center"),a.region=a.region.toLowerCase(),"center"==a.region&&c&&!c.showHeader&&(a.showHeader=!1),("north"==a.region||"south"==a.region)&&(c.collapseSize||(a.collapseSize=this.collapseHeight)),this._measureRegion(a),"number"!=typeof b&&(b=this.regions.length);var d=this.regionMap[a.region];if(!d){this.regions.insert(b,a),this.regionMap[a.region]=a,this._CreateRegionEl(a);var e=this.getRegionBodyEl(a),f=a.body;if(delete a.body,f){mini.isArray(f)||(f=[f]);for(var g=0,h=f.length;h>g;g++)mini.append(e,f[g])}if(a.bodyParent)for(var i=a.bodyParent;i.firstChild;)e.appendChild(i.firstChild);delete a.bodyParent,a.controls&&(this.setRegionControls(a,a.controls),delete a.controls),this.doUpdate()}},removeRegion:function(a){var a=this.getRegion(a);a&&(this.regions.remove(a),delete this.regionMap[a.region],jQuery(a._el).remove(),jQuery(a._split).remove(),jQuery(a._proxy).remove(),this.doUpdate())},moveRegion:function(a,b){var a=this.getRegion(a);if(a){var c=this.regions[b];if(c&&c!=a){this.regions.remove(a);var b=this.region.indexOf(c);this.regions.insert(b,a),this.doUpdate()}}},_measureRegion:function(a){var b=this._getButton(a,"close");b.visible=a.showCloseButton;var b=this._getButton(a,"collapse");b.visible=a.showCollapseButton,a.width<a.minWidth&&(a.width=a.minWidth),a.width>a.maxWidth&&(a.width=a.maxWidth),a.height<a.minHeight&&(a.height=a.minHeight),a.height>a.maxHeight&&(a.height=a.maxHeight)},updateRegion:function(a,b){a=this.getRegion(a),a&&(b&&delete b.region,mini.copyTo(a,b),this._measureRegion(a),this.doUpdate())},expandRegion:function(a){a=this.getRegion(a),a&&(a.expanded=!0,this.doUpdate())},collapseRegion:function(a){a=this.getRegion(a),a&&(a.expanded=!1,this.doUpdate())},toggleRegion:function(a){a=this.getRegion(a),a&&(a.expanded?this.collapseRegion(a):this.expandRegion(a))},showRegion:function(a){a=this.getRegion(a),a&&(a.visible=!0,this.doUpdate())},hideRegion:function(a){a=this.getRegion(a),a&&(a.visible=!1,this.doUpdate())},isExpandRegion:function(a){return a=this.getRegion(a),a?this.region.expanded:null},isVisibleRegion:function(a){return a=this.getRegion(a),a?this.region.visible:null},_tryToggleRegion:function(a){a=this.getRegion(a);var b={region:a,cancel:!1};a.expanded?(this.fire("BeforeCollapse",b),0==b.cancel&&this.collapseRegion(a)):(this.fire("BeforeExpand",b),0==b.cancel&&this.expandRegion(a))},_getProxyElByEvent:function(a){var b=mini.findParent(a.target,"mini-layout-proxy");return b},_getRegionElByEvent:function(a){var b=mini.findParent(a.target,"mini-layout-region");return b},__OnClick:function(a){if(!this._inAniming){var b=this._getProxyElByEvent(a);if(b){var c=b.id,d=mini.findParent(a.target,"mini-tools-collapse");d?this._tryToggleRegion(c):this._VirtualToggle(c)}var e=this._getRegionElByEvent(a);if(e&&mini.findParent(a.target,"mini-layout-region-header")){var c=e.id,d=mini.findParent(a.target,"mini-tools-collapse");d&&this._tryToggleRegion(c);var f=mini.findParent(a.target,"mini-tools-close");f&&this.updateRegion(c,{visible:!1})}if(mini.hasClass(a.target,"mini-layout-spliticon")){var c=a.target.parentNode.id;this._tryToggleRegion(c)}}},_OnButtonClick:function(a,b,c){this.fire("buttonclick",{htmlEvent:c,region:a,button:b,index:this.buttons.indexOf(b),name:b.name})},_OnButtonMouseDown:function(a,b,c){this.fire("buttonmousedown",{htmlEvent:c,region:a,button:b,index:this.buttons.indexOf(b),name:b.name})},hoverProxyEl:null,__OnMouseOver:function(a){var b=this._getProxyElByEvent(a);b&&(mini.addClass(b,"mini-layout-proxy-hover"),this.hoverProxyEl=b)},__OnMouseOut:function(a){this.hoverProxyEl&&mini.removeClass(this.hoverProxyEl,"mini-layout-proxy-hover"),this.hoverProxyEl=null},onButtonClick:function(a,b){this.on("buttonclick",a,b)},onButtonMouseDown:function(a,b){this.on("buttonmousedown",a,b)}}),mini.copyTo(mini.Layout.prototype,{_createHeader:function(a,b){var c='<div class="mini-tools">';if(b)c+='<span class="mini-tools-collapse"></span>';else for(var d=a.buttons.length-1;d>=0;d--){var e=a.buttons[d];c+='<span class="'+e.cls+'" style="',c+=e.style+";"+(e.visible?"":"display:none;")+'">'+e.html+"</span>"}return c+="</div>",c+='<div class="mini-layout-region-icon '+a.iconCls+'" style="'+a.iconStyle+";"+(a.iconStyle||a.iconCls?"":"display:none;")+'"></div>',c+='<div class="mini-layout-region-title">'+a.title+"</div>"},doUpdate:function(){for(var a=0,b=this.regions.length;b>a;a++){var c=this.regions[a],d=(c.region,c._el),e=c._split;c._proxy;c.cls&&mini.addClass(d,c.cls),c._header.style.display=c.showHeader?"":"none",c._header.innerHTML=this._createHeader(c),c._proxy&&(c._proxy.innerHTML=this._createHeader(c,!0)),e&&(mini.removeClass(e,"mini-layout-split-nodrag"),0!=c.expanded&&c.allowResize||mini.addClass(e,"mini-layout-split-nodrag"))}this.doLayout()},doLayout:function(){if(this.canLayout()&&!this._inAniming){var a=mini.getHeight(this.el,!0),b=mini.getWidth(this.el,!0),c={x:0,y:0,width:b,height:a},d=this.regions.clone(),e=this.getRegion("center");d.remove(e),e&&d.push(e);for(var f=0,g=d.length;g>f;f++){var h=d[f];h._Expanded=!1,mini.removeClass(h._el,"mini-layout-popup");var i=h.region,j=h._el,k=h._split,l=h._proxy;if(0!=h.visible){j.style.display="","center"!=i&&(k.style.display=l.style.display="");var m=c.x,n=c.y,b=c.width,a=c.height,o=h.width,p=h.height;switch(h.expanded||("west"==i||"east"==i?(o=h.collapseSize,mini.setWidth(j,h.width)):("north"==i||"south"==i)&&(p=h.collapseSize,mini.setHeight(j,h.height))),i){case"north":a=p,c.y+=p,c.height-=p;break;case"south":a=p,n=c.y+c.height-p,c.height-=p;break;case"west":b=o,c.x+=o,c.width-=o;break;case"east":b=o,m=c.x+c.width-o,c.width-=o;break;case"center":break;default:continue}0>b&&(b=0),0>a&&(a=0),("west"==i||"east"==i)&&mini.setHeight(j,a),("north"==i||"south"==i)&&mini.setWidth(j,b);var q=j;h.expanded?l&&(l.style.left="-1500px",l.style.top="-100px"):(q=l,j.style.top="-100px",j.style.left="-1500px"),q.style.left=m+"px",q.style.top=n+"px",mini.setWidth(q,b),mini.setHeight(q,a),isIE6&&mini.setWidth(h._body,b);var r=jQuery(h._el).height(),s=h.showHeader?jQuery(h._header).outerHeight():0;if(mini.setHeight(h._body,r-s),"center"!=i){o=p=h.splitSize;var m=c.x,n=c.y,b=c.width,a=c.height;switch(i){case"north":a=p,c.y+=p,c.height-=p;break;case"south":a=p,n=c.y+c.height-p,c.height-=p;break;case"west":b=o,c.x+=o,c.width-=o;break;case"east":b=o,m=c.x+c.width-o,c.width-=o;break;case"center":}0>b&&(b=0),0>a&&(a=0),k.style.left=m+"px",k.style.top=n+"px",mini.setWidth(k,b),mini.setHeight(k,a),h.showSplit&&h.expanded&&1==h.allowResize?mini.removeClass(k,"mini-layout-split-nodrag"):mini.addClass(k,"mini-layout-split-nodrag"),k.firstChild.style.display=h.showSplitIcon?"block":"none",h.expanded?mini.removeClass(k.firstChild,"mini-layout-spliticon-collapse"):mini.addClass(k.firstChild,"mini-layout-spliticon-collapse")}}else j.style.display="none","center"!=i&&(k.style.display=l.style.display="none")}mini.layout(this._borderEl),this.fire("layout")}},__OnMouseDown:function(a){if(!this._inAniming&&mini.findParent(a.target,"mini-layout-split")){var b=jQuery(a.target).attr("uid");if(b!=this.uid)return;var c=this.getRegion(a.target.id);if(0==c.expanded||!c.allowResize||!c.showSplit)return;this.dragRegion=c;var d=this._getDrag();d.start(a)}},_getDrag:function(){return this.drag||(this.drag=new mini.Drag({capture:!0,onStart:mini.createDelegate(this._OnDragStart,this),onMove:mini.createDelegate(this._OnDragMove,this),onStop:mini.createDelegate(this._OnDragStop,this)})),this.drag},_OnDragStart:function(a){this._maskProxy=mini.append(document.body,'<div class="mini-resizer-mask"></div>'),this._dragProxy=mini.append(document.body,'<div class="mini-proxy"></div>'),this._dragProxy.style.cursor="n-resize",("west"==this.dragRegion.region||"east"==this.dragRegion.region)&&(this._dragProxy.style.cursor="w-resize"),this.splitBox=mini.getBox(this.dragRegion._split),mini.setBox(this._dragProxy,this.splitBox),this.elBox=mini.getBox(this.el,!0)},_OnDragMove:function(a){var b=a.now[0]-a.init[0],c=this.splitBox.x+b,d=a.now[1]-a.init[1],e=this.splitBox.y+d,f=(c+this.splitBox.width,e+this.splitBox.height,this.getRegion("west")),g=this.getRegion("east"),h=this.getRegion("north"),i=this.getRegion("south"),j=this.getRegion("center"),k=f&&f.visible?f.width:0,l=g&&g.visible?g.width:0,m=h&&h.visible?h.height:0,n=i&&i.visible?i.height:0,o=f&&f.showSplit?mini.getWidth(f._split):0,p=g&&g.showSplit?mini.getWidth(g._split):0,q=h&&h.showSplit?mini.getHeight(h._split):0,r=i&&i.showSplit?mini.getHeight(i._split):0,s=this.dragRegion,t=s.region;if("west"==t){var u=this.elBox.width-l-p-o-j.minWidth;c-this.elBox.x>u&&(c=u+this.elBox.x),c-this.elBox.x<s.minWidth&&(c=s.minWidth+this.elBox.x),c-this.elBox.x>s.maxWidth&&(c=s.maxWidth+this.elBox.x),mini.setX(this._dragProxy,c)}else if("east"==t){var u=this.elBox.width-k-o-p-j.minWidth;this.elBox.right-(c+this.splitBox.width)>u&&(c=this.elBox.right-u-this.splitBox.width),this.elBox.right-(c+this.splitBox.width)<s.minWidth&&(c=this.elBox.right-s.minWidth-this.splitBox.width),this.elBox.right-(c+this.splitBox.width)>s.maxWidth&&(c=this.elBox.right-s.maxWidth-this.splitBox.width),mini.setX(this._dragProxy,c)}else if("north"==t){var v=this.elBox.height-n-r-q-j.minHeight;e-this.elBox.y>v&&(e=v+this.elBox.y),e-this.elBox.y<s.minHeight&&(e=s.minHeight+this.elBox.y),e-this.elBox.y>s.maxHeight&&(e=s.maxHeight+this.elBox.y),mini.setY(this._dragProxy,e)}else if("south"==t){var v=this.elBox.height-m-q-r-j.minHeight;this.elBox.bottom-(e+this.splitBox.height)>v&&(e=this.elBox.bottom-v-this.splitBox.height),this.elBox.bottom-(e+this.splitBox.height)<s.minHeight&&(e=this.elBox.bottom-s.minHeight-this.splitBox.height),this.elBox.bottom-(e+this.splitBox.height)>s.maxHeight&&(e=this.elBox.bottom-s.maxHeight-this.splitBox.height),mini.setY(this._dragProxy,e)}},_OnDragStop:function(a){var b=mini.getBox(this._dragProxy),c=this.dragRegion,d=c.region;if("west"==d){var e=b.x-this.elBox.x;this.updateRegion(c,{width:e})}else if("east"==d){var e=this.elBox.right-b.right;this.updateRegion(c,{width:e})}else if("north"==d){var f=b.y-this.elBox.y;this.updateRegion(c,{height:f})}else if("south"==d){var f=this.elBox.bottom-b.bottom;this.updateRegion(c,{height:f})}jQuery(this._dragProxy).remove(),this._dragProxy=null,this.elBox=this.handlerBox=null,jQuery(this._maskProxy).remove(),this._maskProxy=null},_VirtualToggle:function(a){a=this.getRegion(a),a._Expanded===!0?this._VirtualCollapse(a):this._VirtualExpand(a)},_VirtualExpand:function(a){if(!this._inAniming){this.doLayout();var b=a.region,c=a._el;a._Expanded=!0,mini.addClass(c,"mini-layout-popup");var d=mini.getBox(a._proxy),e=mini.getBox(a._el),f={};if("east"==b){var g=d.x,h=d.y,i=d.height;mini.setHeight(c,i),mini.setX(c,g),c.style.top=a._proxy.style.top;var j=parseInt(c.style.left);f={left:j-e.width}}else if("west"==b){var g=d.right-e.width,h=d.y,i=d.height;mini.setHeight(c,i),mini.setX(c,g),c.style.top=a._proxy.style.top;var j=parseInt(c.style.left);f={left:j+e.width}}else if("north"==b){var g=d.x,h=d.bottom-e.height,k=d.width;mini.setWidth(c,k),mini.setXY(c,g,h);var l=parseInt(c.style.top);f={top:l+e.height}}else if("south"==b){var g=d.x,h=d.y,k=d.width;mini.setWidth(c,k),mini.setXY(c,g,h);var l=parseInt(c.style.top);f={top:l-e.height}}mini.addClass(a._proxy,"mini-layout-maxZIndex"),this._inAniming=!0;var m=this,n=jQuery(c);n.animate(f,250,function(){mini.removeClass(a._proxy,"mini-layout-maxZIndex"),m._inAniming=!1})}},_VirtualCollapse:function(a){if(!this._inAniming){a._Expanded=!1;var b=a.region,c=a._el,d=mini.getBox(c),e={};if("east"==b){var f=parseInt(c.style.left);e={left:f+d.width}}else if("west"==b){var f=parseInt(c.style.left);e={left:f-d.width}}else if("north"==b){var g=parseInt(c.style.top);e={top:g-d.height}}else if("south"==b){var g=parseInt(c.style.top);e={top:g+d.height}}mini.addClass(a._proxy,"mini-layout-maxZIndex"),this._inAniming=!0;var h=this,i=jQuery(c);i.animate(e,250,function(){mini.removeClass(a._proxy,"mini-layout-maxZIndex"),h._inAniming=!1,h.doLayout()})}},__OnDocMouseDown:function(a){if(!this._inAniming)for(var b=0,c=this.regions.length;c>b;b++){var d=this.regions[b];d._Expanded&&(mini.isAncestor(d._el,a.target)||mini.isAncestor(d._proxy,a.target)||this._VirtualCollapse(d))}},getAttrs:function(a){var b=mini.Layout.superclass.getAttrs.call(this,a),c=jQuery(a),d=parseInt(c.attr("splitSize"));isNaN(d)||(b.splitSize=d);for(var e=[],f=mini.getChildNodes(a),g=0,h=f.length;h>g;g++){var i=f[g],j={};e.push(j),j.cls=i.className,j.style=i.style.cssText,mini._ParseString(i,j,["region","title","iconCls","iconStyle","cls","headerCls","headerStyle","bodyCls","bodyStyle"]),mini._ParseBool(i,j,["allowResize","visible","showCloseButton","showCollapseButton","showSplit","showHeader","expanded","showSplitIcon"]),mini._ParseInt(i,j,["splitSize","collapseSize","width","height","minWidth","minHeight","maxWidth","maxHeight"]),j.bodyParent=i}return b.regions=e,b}}),mini.regClass(mini.Layout,"layout"),mini.ListBox=function(){mini.ListBox.superclass.constructor.call(this)},mini.extend(mini.ListBox,mini.ListControl,{formField:!0,width:200,columns:null,columnWidth:80,showNullItem:!1,nullItemText:"",showEmpty:!1,emptyText:"",showCheckBox:!1,showAllCheckBox:!0,multiSelect:!1,_itemCls:"mini-listbox-item",_itemHoverCls:"mini-listbox-item-hover",_itemSelectedCls:"mini-listbox-item-selected",uiCls:"mini-listbox",_create:function(){this.el=document.createElement("div");this.el.className="mini-listbox",this.el.innerHTML='<div class="mini-listbox-border"><div class="mini-listbox-header"></div><div class="mini-listbox-view"></div><input type="hidden"/></div><div class="mini-errorIcon"></div>',this._borderEl=this.el.firstChild,this._headerEl=this._borderEl.firstChild,this._viewEl=this._borderEl.childNodes[1],this._valueEl=this._borderEl.childNodes[2],this._errorIconEl=this.el.lastChild,this._scrollViewEl=this._viewEl,this._viewEl.innerHTML='<div class="mini-listbox-content"></div>'},destroy:function(a){this._viewEl&&(this._viewEl.onscroll=null,mini.clearEvent(this._viewEl),this._borderEl.removeChild(this._viewEl),this._scrollViewEl=null,this._viewEl=null),this._headerEl&&(mini.clearEvent(this._headerEl),this._borderEl.removeChild(this._headerEl),this._headerEl=null),this._valueEl&&(mini.clearEvent(this._valueEl),this._borderEl.removeChild(this._valueEl),this._valueEl=null),this._borderEl&&(mini.clearEvent(this._borderEl),this.el.removeChild(this._borderEl),this._borderEl=null),this._errorIconEl&&(mini.clearEvent(this._errorIconEl),this.el.removeChild(this._errorIconEl),this._errorIconEl=null),delete this.data,delete this.columns,mini.ListBox.superclass.destroy.call(this,a)},_initEvents:function(){mini.ListBox.superclass._initEvents.call(this),mini._BindEvents(function(){mini_onOne(this._viewEl,"scroll",this.__OnScroll,this)},this)},setColumns:function(a){mini.isArray(a)||(a=[]),this.columns=a;for(var b=0,c=this.columns.length;c>b;b++){var d=this.columns[b];if(d.type){mini.isNull(d.header)||"function"==typeof d.header||""==d.header.trim()&&delete d.header;var e=mini._getColumn(d.type);if(e){var f=mini.copyTo({},d);mini.copyTo(d,e),mini.copyTo(d,f)}}var g=parseInt(d.width);mini.isNumber(g)&&String(g)==d.width&&(d.width=g+"px"),mini.isNull(d.width)&&(d.width=this.columnWidth+"px")}this.doUpdate()},getColumns:function(){return this.columns},__OnMouseMove:function(a){mini.ListBox.superclass.__OnMouseMove.call(this,a);var b=a.target;if("TD"==a.target.parentNode.tagName&&(b=a.target.parentNode),"TD"==b.tagName)if(b.scrollWidth>b.clientWidth){var c=b.innerText||b.textContent||"";b.title=c.trim()}else b.title=""},__OnMouseOut:function(a){mini.ListBox.superclass.__OnMouseOut.call(this,a);var b=a.target;"TD"==a.target.parentNode.tagName&&(b=a.target.parentNode),b.title=""},doUpdate:function(){if(this._allowUpdate!==!1){var a=this.columns&&this.columns.length>0;a?mini.addClass(this.el,"mini-listbox-showColumns"):mini.removeClass(this.el,"mini-listbox-showColumns"),this._headerEl.style.display=a?"":"none";var b=[];if(a&&this.showColumns){b[b.length]='<table class="mini-listbox-headerInner" cellspacing="0" cellpadding="0"><tr>';var c=this.uid+"$ck$all";b[b.length]='<td class="mini-listbox-checkbox"><input type="checkbox" id="'+c+'"></td>';for(var d=0,e=this.columns.length;e>d;d++){var f=this.columns[d],g=f.header;mini.isNull(g)&&(g="&nbsp;");var h=f.width;mini.isNumber(h)&&(h+="px"),b[b.length]='<td class="',f.headerCls&&(b[b.length]=f.headerCls),b[b.length]='" style="',f.headerStyle&&(b[b.length]=f.headerStyle+";"),h&&(b[b.length]="width:"+h+";"),f.headerAlign&&(b[b.length]="text-align:"+f.headerAlign+";"),b[b.length]='">',b[b.length]=g,b[b.length]="</td>"}b[b.length]="</tr></table>"}this._headerEl.innerHTML=b.join("");var b=[],i=this.data;if(b[b.length]='<table class="mini-listbox-items" cellspacing="0" cellpadding="0">',this.showEmpty&&0==i.length)b[b.length]='<tr><td colspan="20">'+this.emptyText+"</td></tr>";else{this._doNullItem();for(var j=0,k=i.length;k>j;j++){var l=i[j],m=-1,n=" ",o=-1,p=" ";b[b.length]='<tr id="',b[b.length]=this._createItemId(j),b[b.length]='" index="',b[b.length]=j,b[b.length]='" class="mini-listbox-item ',l.enabled===!1&&(b[b.length]=" mini-disabled "),m=b.length,b[b.length]=n,b[b.length]='" style="',o=b.length,b[b.length]=p,b[b.length]='">';var q=this._createCheckId(j),r=(this.name,this.getItemValue(l),"");if(l.enabled===!1&&(r="disabled"),b[b.length]='<td class="mini-listbox-checkbox"><input '+r+' id="'+q+'" type="checkbox" ></td>',a)for(var d=0,e=this.columns.length;e>d;d++){var f=this.columns[d],s=this._OnDrawCell(l,j,f),h=f.width;"number"==typeof h&&(h+="px"),b[b.length]='<td class="',s.cellCls&&(b[b.length]=s.cellCls),b[b.length]='" style="',s.cellStyle&&(b[b.length]=s.cellStyle+";"),h&&(b[b.length]="width:"+h+";"),f.align&&(b[b.length]="text-align:"+f.align+";"),b[b.length]='">',b[b.length]=s.cellHtml,b[b.length]="</td>",s.rowCls&&(n=s.rowCls),s.rowStyle&&(p=s.rowStyle)}else{var s=this._OnDrawCell(l,j,null);b[b.length]='<td class="',s.cellCls&&(b[b.length]=s.cellCls),b[b.length]='" style="',s.cellStyle&&(b[b.length]=s.cellStyle),b[b.length]='">',b[b.length]=s.cellHtml,b[b.length]="</td>",s.rowCls&&(n=s.rowCls),s.rowStyle&&(p=s.rowStyle)}b[m]=n,b[o]=p,b[b.length]="</tr>"}}b[b.length]="</table>";var t=b.join("");this._viewEl.firstChild.innerHTML=t,this._doSelects(),this.doLayout()}},doLayout:function(){if(this.canLayout()){this.columns&&this.columns.length>0?mini.addClass(this.el,"mini-listbox-showcolumns"):mini.removeClass(this.el,"mini-listbox-showcolumns"),this.showCheckBox?mini.removeClass(this.el,"mini-listbox-hideCheckBox"):mini.addClass(this.el,"mini-listbox-hideCheckBox");var a=this.uid+"$ck$all",b=document.getElementById(a);b&&(b.style.display=this.showAllCheckBox?"":"none");var c=this.isAutoHeight();h=this.getHeight(!0),j=this.getWidth(!0);var d=j,e=this._viewEl;if(e.style.width=j+"px",c)e.style.height="auto";else{var f=mini.getHeight(this._headerEl);h-=f,e.style.height=h+"px"}if(isIE){var g=this._headerEl.firstChild,i=this._viewEl.firstChild.firstChild;if(this._viewEl.offsetHeight>=this._viewEl.scrollHeight)i.style.width="100%",g&&(g.style.width="100%");else{var j=parseInt(i.parentNode.offsetWidth-17)+"px";i.style.width=j,g&&(g.style.width=j)}}this._viewEl.offsetHeight<this._viewEl.scrollHeight?this._headerEl.style.width=d-17+"px":this._headerEl.style.width="100%"}},setShowCheckBox:function(a){this.showCheckBox=a,this.doLayout()},getShowCheckBox:function(){return this.showCheckBox},setShowAllCheckBox:function(a){this.showAllCheckBox=a,this.doLayout()},getShowAllCheckBox:function(){return this.showAllCheckBox},setShowColumns:function(a){this.showColumns=a,this.doUpdate()},getShowColumns:function(){return this.showColumns},setShowNullItem:function(a){this.showNullItem!=a&&(this.showNullItem=a,this._doNullItem(),this.doUpdate())},getShowNullItem:function(){return this.showNullItem},setNullItemText:function(a){this.nullItemText!=a&&(this.nullItemText=a,this._doNullItem(),this.doUpdate())},getNullItemText:function(){return this.nullItemText},_doNullItem:function(){for(var a=0,b=this.data.length;b>a;a++){var c=this.data[a];if(c.__NullItem){this.data.removeAt(a);break}}if(this.showNullItem){var c={__NullItem:!0};c[this.textField]=this.nullItemText,c[this.valueField]="",this.data.insert(0,c)}},_OnDrawCell:function(a,b,c){var d=c?a[c.field]:this.getItemText(a),e={sender:this,index:b,rowIndex:b,record:a,item:a,column:c,field:c?c.field:null,value:d,cellHtml:d,rowCls:null,cellCls:c?c.cellCls||"":"",rowStyle:null,cellStyle:c?c.cellStyle||"":""},f=this.columns&&this.columns.length>0;if(f||0==b&&this.showNullItem&&(e.cellHtml=this.nullItemText),e.cellHtml=mini.htmlEncode(e.cellHtml),c){c.dateFormat&&(mini.isDate(e.value)?e.cellHtml=mini.formatDate(d,c.dateFormat):e.cellHtml=d);var g=c.renderer;g&&(fn="function"==typeof g?g:window[g],fn&&(e.cellHtml=fn.call(c,e)))}return this.fire("drawcell",e),(null===e.cellHtml||void 0===e.cellHtml||""===e.cellHtml)&&(e.cellHtml="&nbsp;"),e},__OnScroll:function(a){this._headerEl.scrollLeft=this._viewEl.scrollLeft},__OnClick:function(a){var b=this.uid+"$ck$all";if(a.target.id!=b)this._fireEvent(a,"Click");else{var c=document.getElementById(b);if(c){var d=c.checked,e=this.getValue();d?this.selectAll():this.deselectAll(),this._OnSelectionChanged(),e!=this.getValue()&&(this._OnValueChanged(),this.fire("itemclick",{htmlEvent:a}))}}},getAttrs:function(a){var b=mini.ListBox.superclass.getAttrs.call(this,a);if(mini._ParseString(a,b,["nullItemText","ondrawcell","emptyText"]),mini._ParseBool(a,b,["showCheckBox","showAllCheckBox","showNullItem","showColumns","showEmpty"]),"select"!=a.nodeName.toLowerCase())for(var c=mini.getChildNodes(a),d=0,e=c.length;e>d;d++){var f=c[d],g=jQuery(f).attr("property");g&&(g=g.toLowerCase(),"columns"==g?b.columns=mini._ParseColumns(f):"data"==g&&(b.data=f.innerHTML))}return b}}),mini.regClass(mini.ListBox,"listbox"),mini.Popup=function(){mini.Popup.superclass.constructor.call(this),this.setVisible(!1),this.setAllowDrag(this.allowDrag),this.setAllowResize(this.allowResize)},mini.extend(mini.Popup,mini.Container,{_clearBorder:!1,uiCls:"mini-popup",_create:function(){this.el=document.createElement("div");this.el.className="mini-popup",this._contentEl=this.el},_initEvents:function(){mini._BindEvents(function(){mini_onOne(this.el,"mouseover",this.__OnMouseOver,this)},this)},doLayout:function(){if(this.canLayout()){mini.Popup.superclass.doLayout.call(this),this._doShadow();var a=this.el.childNodes;if(a)for(var b=0,c=a.length;c>b;b++){var d=a[b];mini.layout(d)}}},destroy:function(a){this.el&&(this.el.onmouseover=null),this._contentEl=null,mini.un(document,"mousedown",this.__OnBodyMouseDown,this),mini.un(window,"resize",this.__OnWindowResize,this),this._modalEl&&(this._modalEl.parentNode.removeChild(this._modalEl),this._modalEl=null),this.shadowEl&&(this.shadowEl.parentNode.removeChild(this.shadowEl),this.shadowEl=null),this.popupEl&&(this._unbindPopupEl(),this.popupEl=null),mini.Popup.superclass.destroy.call(this,a)},setWidth:function(a){if(parseInt(a)==a&&(a+="px"),this.width=a,-1!=a.indexOf("px")){if(isIE){var b=mini.getBorders(this.el);b.left||(a=a.substring(0,a.indexOf("px"))-2+"px")}mini.setWidth(this.el,a)}else this.el.style.width=a;this._sizeChaned()},setHeight:function(a){parseInt(a)==a&&(a+="px"),this.height=a,-1!=a.indexOf("px")?mini.setHeight(this.el,a):this.el.style.height=a,this._sizeChaned()},setBody:function(a){if(a){mini.isArray(a)||(a=[a]);for(var b=0,c=a.length;c>b;b++)mini.append(this._contentEl,a[b])}},getAttrs:function(a){var b=mini.Popup.superclass.getAttrs.call(this,a);mini._ParseString(a,b,["popupEl","popupCls","showAction","hideAction","xAlign","yAlign","modalStyle","onbeforeopen","open","onbeforeclose","onclose"]),mini._ParseBool(a,b,["showModal","showShadow","allowDrag","allowResize"]),mini._ParseInt(a,b,["showDelay","hideDelay","xOffset","yOffset","minWidth","minHeight","maxWidth","maxHeight"]);var c=mini.getChildNodes(a,!0);return b.body=c,b}}),mini.regClass(mini.Popup,"popup"),mini.Popup_prototype={isPopup:!1,popupEl:null,popupCls:"",showAction:"mouseover",hideAction:"outerclick",showDelay:300,hideDelay:500,xAlign:"left",yAlign:"below",xOffset:0,yOffset:0,minWidth:50,minHeight:25,maxWidth:2e3,maxHeight:2e3,showModal:!1,showShadow:!0,modalStyle:"opacity:0.2",_dragCls:"mini-popup-drag",_resizeCls:"mini-popup-resize",allowDrag:!1,allowResize:!1,_unbindPopupEl:function(){this.popupEl&&(mini.un(this.popupEl,"click",this.__OnLeftClick,this),mini.un(this.popupEl,"contextmenu",this.__OnRightClick,this),mini.un(this.popupEl,"mouseover",this.__OnMouseOver,this))},_bindPopupEl:function(){this.popupEl&&(mini.on(this.popupEl,"click",this.__OnLeftClick,this),mini.on(this.popupEl,"contextmenu",this.__OnRightClick,this),mini.on(this.popupEl,"mouseover",this.__OnMouseOver,this))},_doShim:function(){function a(){this._shimEl.style.display="";var a=mini.getBox(this.el),b=this._shimEl.style;b.width=a.width+"px",b.height=a.height+"px",b.left=a.x+"px",b.top=a.y+"px";var c=mini.getStyle(this.el,"zIndex");isNaN(c)||(this._shimEl.style.zIndex=c-3)}if(mini.isIE&&mini_useShims){if(!this._shimEl){var b="<iframe frameborder='0' style='position: absolute; z-index: -1; width: 0; height: 0; top: 0;left:0;scrolling:no;'></iframe>";this._shimEl=mini.append(document.body,b)}this._shimEl.style.display="none",this._doShimTimer&&(clearTimeout(this._doShimTimer),this._doShimTimer=null);var c=this;this._doShimTimer=setTimeout(function(){c._doShimTimer=null,a.call(c)},20)}},doShow:function(a){var b={popupEl:this.popupEl,htmlEvent:a,cancel:!1};if(this.fire("BeforeOpen",b),1!=b.cancel&&(this.fire("opening",b),1!=b.cancel))if(this.popupEl){var c={};a&&(c.xy=[a.pageX,a.pageY]),this.showAtEl(this.popupEl,c)}else this.show()},doHide:function(a){var b={popupEl:this.popupEl,htmlEvent:a,cancel:!1};this.fire("BeforeClose",b),1!=b.cancel&&this.close()},show:function(a,b){this.showAtPos(a,b)},showAtPos:function(a,b){this.render(document.body),
a||(a="center"),b||(b="middle"),this.el.style.position="absolute",this.el.style.left="-2000px",this.el.style.top="-2000px",this.el.style.display="",this._measureSize();var c=mini.getViewportBox(),d=mini.getBox(this.el);"left"==a&&(a=0),"center"==a&&(a=c.width/2-d.width/2),"right"==a&&(a=c.width-d.width),"top"==b&&(b=0),"middle"==b&&(b=c.y+c.height/2-d.height/2),"bottom"==b&&(b=c.height-d.height),a+d.width>c.right&&(a=c.right-d.width),b+d.height>c.bottom&&(b=c.bottom-d.height-20),this._Show(a,b)},_doModal:function(){if(jQuery(this._modalEl).remove(),this.showModal&&0!=this.visible){var a=document.documentElement,b=parseInt(Math.max(document.body.scrollWidth,a?a.scrollWidth:0)),c=parseInt(Math.max(document.body.scrollHeight,a?a.scrollHeight:0)),d=mini.getViewportBox(),e=d.height;c>e&&(e=c);var f=d.width;b>f&&(f=b),this._modalEl=mini.append(document.body,'<div class="mini-modal"></div>'),this._modalEl.style.height=e+"px",this._modalEl.style.width=f+"px",this._modalEl.style.zIndex=mini.getStyle(this.el,"zIndex")-1,mini.setStyle(this._modalEl,this.modalStyle)}},_doShadow:function(){function a(){this.shadowEl.style.display="";var a=mini.getBox(this.el),b=this.shadowEl.style;b.width=a.width+"px",b.height=a.height+"px",b.left=a.x+"px",b.top=a.y+"px";var c=mini.getStyle(this.el,"zIndex");isNaN(c)||(this.shadowEl.style.zIndex=c-2)}if(this.shadowEl||(this.shadowEl=mini.append(document.body,'<div class="mini-shadow"></div>')),this.shadowEl.style.display=this.showShadow?"":"none",this.showShadow){this.shadowEl.style.display="none",this._doShadowTimer&&(clearTimeout(this._doShadowTimer),this._doShadowTimer=null);var b=this;this._doShadowTimer=setTimeout(function(){b._doShadowTimer=null,a.call(b)},20)}},_measureSize:function(){this.el.style.display="";var a=mini.getBox(this.el);a.width>this.maxWidth&&(mini.setWidth(this.el,this.maxWidth),a=mini.getBox(this.el)),a.height>this.maxHeight&&(mini.setHeight(this.el,this.maxHeight),a=mini.getBox(this.el)),a.width<this.minWidth&&(mini.setWidth(this.el,this.minWidth),a=mini.getBox(this.el)),a.height<this.minHeight&&(mini.setHeight(this.el,this.minHeight),a=mini.getBox(this.el))},showAtEl:function(a,b){if(a=mini.byId(a)){this.isRender()&&this.el.parentNode==document.body||this.render(document.body);var c={xAlign:this.xAlign,yAlign:this.yAlign,xOffset:this.xOffset,yOffset:this.yOffset,popupCls:this.popupCls};mini.copyTo(c,b),mini.addClass(a,c.popupCls),a.popupCls=c.popupCls,this._popupEl=a,this.el.style.position="absolute",this.el.style.left="-2000px",this.el.style.top="-2000px",this.el.style.display="",this.doLayout(),this._measureSize();var d=mini.getViewportBox(),e=mini.getBox(this.el),f=mini.getBox(a),g=c.xy,h=(c.xAlign,c.yAlign,d.width/2-e.width/2),i=0;switch(g&&(h=g[0],i=g[1]),c.xAlign){case"outleft":h=f.x-e.width;break;case"left":h=f.x;break;case"center":h=f.x+f.width/2-e.width/2;break;case"right":h=f.right-e.width;break;case"outright":h=f.right}switch(c.yAlign){case"above":i=f.y-e.height;break;case"top":i=f.y;break;case"middle":i=f.y+f.height/2-e.height/2;break;case"bottom":i=f.bottom-e.height;break;case"below":i=f.bottom}if(h=parseInt(h),i=parseInt(i),c.outYAlign||c.outXAlign){if("above"==c.outYAlign&&i+e.height>d.bottom&&(i=f.y-e.height,0>i&&(i=f.y-this.minHeight,this.setHeight(this.minHeight))),"outleft"==c.outXAlign&&h+e.width>d.right){var j=f.x-d.x,k=d.right-f.right;j>k&&(h=f.x-e.width)}"right"==c.outXAlign&&h+e.width>d.right&&(h=f.right-e.width),this._Show(h,i)}else this.showAtPos(h+c.xOffset,i+c.yOffset)}},_Show:function(a,b){this.el.style.display="",this.el.style.zIndex=mini.getMaxZIndex(),mini.setX(this.el,a),mini.setY(this.el,b),this.setVisible(!0),"mouseout"==this.hideAction&&mini.on(document,"mousemove",this.__OnBodyMouseMove,this);this._doShadow(),this._doModal(),this._doShim(),mini.layoutIFrames(this.el),this.isPopup=!0,mini.on(document,"mousedown",this.__OnBodyMouseDown,this),mini.on(window,"resize",this.__OnWindowResize,this),this.fire("Open")},open:function(){this.show()},close:function(){this.hide()},hide:function(){this.el&&(this.popupEl&&mini.removeClass(this.popupEl,this.popupEl.popupCls),this._popupEl&&mini.removeClass(this._popupEl,this._popupEl.popupCls),this._popupEl=null,jQuery(this._modalEl).remove(),this.shadowEl&&(this.shadowEl.style.display="none"),this._shimEl&&(this._shimEl.style.display="none"),mini.un(document,"mousemove",this.__OnBodyMouseMove,this),mini.un(document,"mousedown",this.__OnBodyMouseDown,this),mini.un(window,"resize",this.__OnWindowResize,this),this.setVisible(!1),this.isPopup=!1,this.fire("Close"))},setPopupEl:function(a){a=mini.byId(a),a&&(this._unbindPopupEl(),this.popupEl=a,this._bindPopupEl())},setPopupCls:function(a){this.popupCls=a},setShowAction:function(a){this.showAction=a},setHideAction:function(a){this.hideAction=a},setShowDelay:function(a){this.showDelay=a},setHideDelay:function(a){this.hideDelay=a},setXAlign:function(a){this.xAlign=a},setYAlign:function(a){this.yAlign=a},setxOffset:function(a){a=parseInt(a),isNaN(a)&&(a=0),this.xOffset=a},setyOffset:function(a){a=parseInt(a),isNaN(a)&&(a=0),this.yOffset=a},setShowModal:function(a){this.showModal=a},setShowShadow:function(a){this.showShadow=a},setMinWidth:function(a){isNaN(a)||(this.minWidth=a)},setMinHeight:function(a){isNaN(a)||(this.minHeight=a)},setMaxWidth:function(a){isNaN(a)||(this.maxWidth=a)},setMaxHeight:function(a){isNaN(a)||(this.maxHeight=a)},setAllowDrag:function(a){this.allowDrag=a,mini.removeClass(this.el,this._dragCls),a&&mini.addClass(this.el,this._dragCls)},setAllowResize:function(a){this.allowResize=a,mini.removeClass(this.el,this._resizeCls),a&&mini.addClass(this.el,this._resizeCls)},__OnLeftClick:function(a){if(!this._inAniming&&"leftclick"==this.showAction){var b=jQuery(this.popupEl).attr("allowPopup");"false"!=String(b)&&this.doShow(a)}},__OnRightClick:function(a){if(!this._inAniming&&"rightclick"==this.showAction){var b=jQuery(this.popupEl).attr("allowPopup");"false"!=String(b)&&(a.preventDefault(),this.doShow(a))}},__OnMouseOver:function(a){if(!this._inAniming&&"mouseover"==this.showAction){var b=jQuery(this.popupEl).attr("allowPopup");if("false"!=String(b)&&(clearTimeout(this._hideTimer),this._hideTimer=null,!this.isPopup)){var c=this;this._showTimer=setTimeout(function(){c.doShow(a)},this.showDelay)}}},__OnBodyMouseMove:function(a){"mouseout"==this.hideAction&&this._tryHide(a)},__OnBodyMouseDown:function(a){"outerclick"==this.hideAction&&this.isPopup&&(this.within(a)||this.popupEl&&mini.isAncestor(this.popupEl,a.target)||this.doHide(a))},_tryHide:function(a){if(mini.isAncestor(this.el,a.target)||this.popupEl&&mini.isAncestor(this.popupEl,a.target));else{if(clearTimeout(this._showTimer),this._showTimer=null,this._hideTimer)return;var b=this;this._hideTimer=setTimeout(function(){b.doHide(a)},this.hideDelay)}},__OnWindowResize:function(a){this.isDisplay()&&!mini.isIE6&&this._doModal()},within:function(a){if(mini.isAncestor(this.el,a.target))return!0;for(var b=mini.getChildControls(this),c=0,d=b.length;d>c;c++){var e=b[c];if(e.within(a))return!0}return!1}},mini.copyTo(mini.Popup.prototype,mini.Popup_prototype),mini.OutlookBar=function(){this._initGroups(),mini.OutlookBar.superclass.constructor.call(this)},mini.extend(mini.OutlookBar,mini.Control,{width:180,expandOnLoad:!0,activeIndex:-1,autoCollapse:!1,groupCls:"",groupStyle:"",groupHeaderCls:"",groupHeaderStyle:"",groupBodyCls:"",groupBodyStyle:"",groupHoverCls:"",groupActiveCls:"",allowAnim:!0,set:function(a){if("string"==typeof a)return this;var b=this._allowLayout;this._allowLayout=!1;var c=a.activeIndex;return delete a.activeIndex,mini.OutlookBar.superclass.set.call(this,a),mini.isNumber(c)&&this.setActiveIndex(c),this._allowLayout=b,this.doLayout(),this},uiCls:"mini-outlookbar",_create:function(){this.el=document.createElement("div"),this.el.className="mini-outlookbar",this.el.innerHTML='<div class="mini-outlookbar-border"></div>',this._borderEl=this.el.firstChild},destroy:function(a){this._borderEl&&(mini.clearEvent(this._borderEl),this.el.removeChild(this._borderEl),this._borderEl=null),mini.OutlookBar.superclass.destroy.call(this,a)},_initEvents:function(){mini._BindEvents(function(){mini.on(this.el,"click",this.__OnClick,this)},this)},_createGroupId:function(a){return this.uid+"$"+a._id},_GroupId:1,_initGroups:function(){this.groups=[]},_createGroupEl:function(a){var b=this._createGroupId(a),c='<div id="'+b+'" class="mini-outlookbar-group '+a.cls+'" style="'+a.style+'"><div class="mini-outlookbar-groupHeader '+a.headerCls+'" style="'+a.headerStyle+';"></div><div class="mini-outlookbar-groupBody '+a.bodyCls+'" style="'+a.bodyStyle+';"></div></div>',d=mini.append(this._borderEl,c),e=d.lastChild,f=a.body;if(delete a.body,f){mini.isArray(f)||(f=[f]);for(var g=0,h=f.length;h>g;g++){var i=f[g];mini.append(e,i)}f.length=0}if(a.bodyParent)for(var j=a.bodyParent;j.firstChild;)e.appendChild(j.firstChild);return delete a.bodyParent,d},createGroup:function(a){var b=mini.copyTo({_id:this._GroupId++,name:"",title:"",cls:"",style:"",iconCls:"",iconStyle:"",headerCls:"",headerStyle:"",bodyCls:"",bodyStyle:"",visible:!0,enabled:!0,showCollapseButton:!0,expanded:this.expandOnLoad},a);return b},setGroups:function(a){if(mini.isArray(a)){this.removeAll();for(var b=0,c=a.length;c>b;b++)this.addGroup(a[b])}},getGroups:function(){return this.groups},addGroup:function(a,b){"string"==typeof a&&(a={title:a}),a=this.createGroup(a),"number"!=typeof b&&(b=this.groups.length),this.groups.insert(b,a);var c=this._createGroupEl(a);a._el=c;var b=this.groups.indexOf(a),d=this.groups[b+1];if(d){var e=this.getGroupEl(d);jQuery(e).before(c)}return this.doUpdate(),a},updateGroup:function(a,b){var a=this.getGroup(a);a&&(mini.copyTo(a,b),this.doUpdate())},removeGroup:function(a){if(a=this.getGroup(a)){var b=this.getGroupEl(a);b&&b.parentNode.removeChild(b),this.groups.remove(a),this.doUpdate()}},removeAll:function(){for(var a=this.groups.length-1;a>=0;a--)this.removeGroup(a)},moveGroup:function(a,b){if(a=this.getGroup(a)){target=this.getGroup(b);var c=this.getGroupEl(a);if(this.groups.remove(a),target){b=this.groups.indexOf(target),this.groups.insert(b,a);var d=this.getGroupEl(target);jQuery(d).before(c)}else this.groups.add(a),this._borderEl.appendChild(c);this.doUpdate()}},doUpdate:function(){for(var a=0,b=this.groups.length;b>a;a++){var c=this.groups[a],d=c._el,e=d.firstChild,f=d.lastChild,g='<div class="mini-outlookbar-icon '+c.iconCls+'" style="'+c.iconStyle+';"></div>',h="";c.showCollapseButton&&(h+='<div class="mini-tools"><span class="mini-tools-collapse"></span></div>'),h+=(c.iconStyle||c.iconCls?g:"")+'<div class="mini-outlookbar-groupTitle">'+c.title+'</div><div style="clear:both;"></div>',e.innerHTML=h,c.enabled?mini.removeClass(d,"mini-disabled"):mini.addClass(d,"mini-disabled"),mini.addClass(d,c.cls),mini.setStyle(d,c.style),mini.addClass(f,c.bodyCls),mini.setStyle(f,c.bodyStyle),mini.addClass(e,c.headerCls),mini.setStyle(e,c.headerStyle),mini.removeClass(d,"mini-outlookbar-firstGroup"),mini.removeClass(d,"mini-outlookbar-lastGroup"),0==a&&mini.addClass(d,"mini-outlookbar-firstGroup"),a==b-1&&mini.addClass(d,"mini-outlookbar-lastGroup")}this.doLayout()},doLayout:function(){if(this.canLayout()&&!this._inAniming){this._doLayoutInner();for(var a=0,b=this.groups.length;b>a;a++){var c=this.groups[a],d=c._el,e=d.lastChild;if(c.expanded?(mini.addClass(d,"mini-outlookbar-expand"),mini.removeClass(d,"mini-outlookbar-collapse")):(mini.removeClass(d,"mini-outlookbar-expand"),mini.addClass(d,"mini-outlookbar-collapse")),e.style.height="auto",e.style.display=c.expanded?"block":"none",d.style.display=c.visible?"":"none",!isIE||isIE6){var f=mini.getWidth(d,!0),g=mini.getPaddings(e),h=mini.getBorders(e);jQuery.boxModel&&(f=f-g.left-g.right-h.left-h.right),e.style.width=f+"px"}}var i=this.isAutoHeight(),j=this.getActiveGroup();if(!i&&this.autoCollapse&&j){var d=this.getGroupEl(this.activeIndex);d.lastChild.style.height=this._getFillGroupBodyHeight()+"px"}if(isIE){var g=mini.getPaddings(this.el.parentNode);this._borderEl.offsetHeight>this.el.parentNode.offsetHeight-g.top-g.bottom?this.el.style.width=this.el.parentNode.clientWidth-20+"px":this.el.style.width=this.width}mini.layout(this._borderEl)}},_doLayoutInner:function(){if(this.isAutoHeight())this._borderEl.style.height="auto";else{var a=this.getHeight(!0);if(!jQuery.boxModel){var b=mini.getBorders(this._borderEl);a=a+b.top+b.bottom}0>a&&(a=0),this._borderEl.style.height=a+"px"}},_getFillGroupBodyHeight:function(){var a=jQuery(this.el).height(),b=mini.getBorders(this._borderEl);a=a-b.top-b.bottom;for(var c=this.getActiveGroup(),d=0,e=0,f=this.groups.length;f>e;e++){var g=this.groups[e],h=this.getGroupEl(g);if(0!=g.visible&&g!=c){var i=h.lastChild.style.display;h.lastChild.style.display="none";var j=jQuery(h).outerHeight();h.lastChild.style.display=i;var k=mini.getMargins(h);j=j+k.top+k.bottom,d+=j}}a-=d;var l=this.getGroupEl(this.activeIndex);if(!l)return 0;if(a-=jQuery(l.firstChild).outerHeight(),jQuery.boxModel){var m=mini.getPaddings(l.lastChild),n=mini.getBorders(l.lastChild);a=a-m.top-m.bottom-n.top-n.bottom}var m=mini.getPaddings(l),n=mini.getBorders(l),k=mini.getMargins(l);return a=a-k.top-k.bottom,a=a-m.top-m.bottom-n.top-n.bottom,0>a&&(a=0),a},getGroup:function(a){if("object"==typeof a)return a;if("number"==typeof a)return this.groups[a];for(var b=0,c=this.groups.length;c>b;b++){var d=this.groups[b];if(d.name==a)return d}},_getGroupById:function(a){for(var b=0,c=this.groups.length;c>b;b++){var d=this.groups[b];if(d._id==a)return d}},getGroupEl:function(a){var b=this.getGroup(a);return b?b._el:null},getGroupBodyEl:function(a){var b=this.getGroupEl(a);return b?b.lastChild:null},setAutoCollapse:function(a){this.autoCollapse=a},getAutoCollapse:function(){return this.autoCollapse},setExpandOnLoad:function(a){this.expandOnLoad=a},getExpandOnLoad:function(){return this.expandOnLoad},setActiveIndex:function(a){var b=this.getGroup(a);this.getGroup(this.activeIndex);b?this.activeIndex=this.groups.indexOf(b):this.activeIndex=-1;var b=this.getGroup(this.activeIndex);if(b){var c=this.allowAnim;this.allowAnim=!1,this.expandGroup(b),this.allowAnim=c}},getActiveIndex:function(){return this.activeIndex},getActiveGroup:function(){return this.getGroup(this.activeIndex)},showGroup:function(a){a=this.getGroup(a),a&&1!=a.visible&&(a.visible=!0,this.doUpdate())},hideGroup:function(a){a=this.getGroup(a),a&&0!=a.visible&&(a.visible=!1,this.doUpdate())},toggleGroup:function(a){a=this.getGroup(a),a&&(this._allowLayout=!1,a.expanded?this.collapseGroup(a):this.expandGroup(a),this._allowLayout=!0,this.doLayout())},collapseGroup:function(a){if(a=this.getGroup(a)){var b=a.expanded,c=0;this.autoCollapse&&!this.isAutoHeight()&&(c=this._getFillGroupBodyHeight());var d=!1;a.expanded=!1;var e=this.groups.indexOf(a);e==this.activeIndex&&(this.activeIndex=-1,d=!0);var f=this.getGroupBodyEl(a);if(this.allowAnim&&b){this._inAniming=!0,f.style.display="block",f.style.height="auto",this.autoCollapse&&!this.isAutoHeight()&&(f.style.height=c+"px");var g={height:"1px"};mini.addClass(f,"mini-outlookbar-overflow");var h=this,i=jQuery(f);i.animate(g,180,function(){h._inAniming=!1,mini.removeClass(f,"mini-outlookbar-overflow"),h.doLayout()})}else this.doLayout();var j={group:a,index:this.groups.indexOf(a),name:a.name};this.fire("Collapse",j),d&&this.fire("activechanged")}},expandGroup:function(a){if(a=this.getGroup(a)){var b=a.expanded;if(a.expanded=!0,this.activeIndex=this.groups.indexOf(a),fire=!0,this.autoCollapse)for(var c=0,d=this.groups.length;d>c;c++){var e=this.groups[c];e.expanded&&e!=a&&this.collapseGroup(e)}var f=this.getGroupBodyEl(a);if(this.allowAnim&&0==b){if(this._inAniming=!0,f.style.display="block",this.autoCollapse&&!this.isAutoHeight()){var g=this._getFillGroupBodyHeight();f.style.height=g+"px"}else f.style.height="auto";var h=mini.getHeight(f);f.style.height="1px";var i={height:h+"px"},j=f.style.overflow;f.style.overflow="hidden",mini.addClass(f,"mini-outlookbar-overflow");var k=this,l=jQuery(f);l.animate(i,180,function(){f.style.overflow=j,mini.removeClass(f,"mini-outlookbar-overflow"),k._inAniming=!1,k.doLayout()})}else this.doLayout();var m={group:a,index:this.groups.indexOf(a),name:a.name};this.fire("Expand",m),fire&&this.fire("activechanged")}},_tryToggleGroup:function(a){a=this.getGroup(a);var b={group:a,groupIndex:this.groups.indexOf(a),groupName:a.name,cancel:!1};a.expanded?(this.fire("BeforeCollapse",b),0==b.cancel&&this.collapseGroup(a)):(this.fire("BeforeExpand",b),0==b.cancel&&this.expandGroup(a))},_getGroupByEvent:function(a){var b=mini.findParent(a.target,"mini-outlookbar-group");if(!b)return null;var c=b.id.split("$"),d=c[c.length-1];return this._getGroupById(d)},__OnClick:function(a){if(!this._inAniming){var b=mini.findParent(a.target,"mini-outlookbar-groupHeader");if(b){var c=this._getGroupByEvent(a);c&&this._tryToggleGroup(c)}}},parseGroups:function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f={};b.push(f),f.style=e.style.cssText,mini._ParseString(e,f,["name","title","cls","iconCls","iconStyle","headerCls","headerStyle","bodyCls","bodyStyle"]),mini._ParseBool(e,f,["visible","enabled","showCollapseButton","expanded"]),f.bodyParent=e}return b},getAttrs:function(a){var b=mini.OutlookBar.superclass.getAttrs.call(this,a);mini._ParseString(a,b,["onactivechanged","oncollapse","onexpand"]),mini._ParseBool(a,b,["autoCollapse","allowAnim","expandOnLoad"]),mini._ParseInt(a,b,["activeIndex"]);var c=mini.getChildNodes(a);return b.groups=this.parseGroups(c),b}}),mini.regClass(mini.OutlookBar,"outlookbar"),mini.MenuItem=function(){mini.MenuItem.superclass.constructor.call(this)},mini.extend(mini.MenuItem,mini.Control,{text:"",iconCls:"",iconStyle:"",iconPosition:"left",showIcon:!0,showAllow:!0,checked:!1,checkOnClick:!1,groupName:"",_hoverCls:"mini-menuitem-hover",_pressedCls:"mini-menuitem-pressed",_checkedCls:"mini-menuitem-checked",_clearBorder:!1,menu:null,uiCls:"mini-menuitem",_create:function(){this.el=document.createElement("div");this.el.className="mini-menuitem",this.el.innerHTML='<div class="mini-menuitem-inner"><div class="mini-menuitem-icon"></div><div class="mini-menuitem-text"></div><div class="mini-menuitem-allow"></div></div>',this._innerEl=this.el.firstChild,this._iconEl=this._innerEl.firstChild,this._textEl=this._innerEl.childNodes[1],this.allowEl=this._innerEl.lastChild},_initEvents:function(){mini._BindEvents(function(){mini_onOne(this.el,"mouseover",this.__OnMouseOver,this)},this)},_inputEventsInited:!1,_initInputEvents:function(){this._inputEventsInited||(this._inputEventsInited=!0,mini_onOne(this.el,"click",this.__OnClick,this),mini_onOne(this.el,"mouseup",this.__OnMouseUp,this),mini_onOne(this.el,"mouseout",this.__OnMouseOut,this))},destroy:function(a){this.el&&(this.el.onmouseover=null),this.menu=this._innerEl=this._iconEl=this._textEl=this.allowEl=null,mini.MenuItem.superclass.destroy.call(this,a)},within:function(a){return mini.isAncestor(this.el,a.target)?!0:this.menu&&this.menu.within(a)?!0:!1},_doUpdateIcon:function(){var a=this.iconStyle||this.iconCls||this.checkOnClick;this._iconEl&&(mini.setStyle(this._iconEl,this.iconStyle),mini.addClass(this._iconEl,this.iconCls),this._iconEl.style.display=a?"block":"none"),"top"==this.iconPosition?mini.addClass(this.el,"mini-menuitem-icontop"):mini.removeClass(this.el,"mini-menuitem-icontop")},doUpdate:function(){this._textEl&&(this._textEl.innerHTML=this.text),this._doUpdateIcon(),this.checked?mini.addClass(this.el,this._checkedCls):mini.removeClass(this.el,this._checkedCls),this.allowEl&&(this.menu&&this.menu.items.length>0?this.allowEl.style.display="block":this.allowEl.style.display="none")},setText:function(a){this.text=a,this._textEl&&(this._textEl.innerHTML=this.text)},getText:function(){return this.text},setIconCls:function(a){mini.removeClass(this._iconEl,this.iconCls),this.iconCls=a,this._doUpdateIcon()},getIconCls:function(){return this.iconCls},setIconStyle:function(a){this.iconStyle=a,this._doUpdateIcon()},getIconStyle:function(){return this.iconStyle},setIconPosition:function(a){this.iconPosition=a,this._doUpdateIcon()},getIconPosition:function(){return this.iconPosition},setCheckOnClick:function(a){this.checkOnClick=a,a?mini.addClass(this.el,"mini-menuitem-showcheck"):mini.removeClass(this.el,"mini-menuitem-showcheck"),this.doUpdate()},getCheckOnClick:function(){return this.checkOnClick},setChecked:function(a){this.checked!=a&&(this.checked=a,this.doUpdate(),this.fire("checkedchanged"))},getChecked:function(){return this.checked},setGroupName:function(a){this.groupName!=a&&(this.groupName=a)},getGroupName:function(){return this.groupName},setChildren:function(a){this.setMenu(a)},setMenu:function(a){mini.isArray(a)&&(a={type:"menu",items:a}),this.menu!==a&&(this.menu=mini.getAndCreate(a),this.menu.hide(),this.menu.ownerItem=this,this.doUpdate(),this.menu.on("itemschanged",this.__OnItemsChanged,this))},getMenu:function(){return this.menu},getMenuItems:function(){return this.menu.items},showMenu:function(){if(this.menu&&0==this.menu.isDisplay()){this.menu.setHideAction("outerclick");var a={xAlign:"outright",yAlign:"top",outXAlign:"outleft",popupCls:"mini-menu-popup"};this.ownerMenu&&0==this.ownerMenu.vertical&&(a.xAlign="left",a.yAlign="below",a.outXAlign=null),this.menu.showAtEl(this.el,a)}},hideMenu:function(){this.menu&&this.menu.hide()},hide:function(){this.hideMenu(),this.setVisible(!1)},__OnItemsChanged:function(a){this.doUpdate()},getTopMenu:function(){return this.ownerMenu?this.ownerMenu.ownerItem?this.ownerMenu.ownerItem.getTopMenu():this.ownerMenu:null},__OnClick:function(a){if(!this.isReadOnly()){if(this.checkOnClick)if(this.ownerMenu&&this.groupName){var b=this.ownerMenu.getGroupItems(this.groupName);if(b.length>0){if(0==this.checked){for(var c=0,d=b.length;d>c;c++){var e=b[c];e!=this&&e.setChecked(!1)}this.setChecked(!0)}}else this.setChecked(!this.checked)}else this.setChecked(!this.checked);this.fire("click");var f=this.getTopMenu();f&&f._OnItemClick(this,a)}},__OnMouseUp:function(a){if(!this.isReadOnly()&&this.ownerMenu){var b=this;setTimeout(function(){b.isDisplay()&&b.ownerMenu.showItemMenu(b)},1)}},__OnMouseOver:function(a){this.isReadOnly()||(this._initInputEvents(),mini.addClass(this.el,this._hoverCls),this.el.title=this.text,this._textEl.scrollWidth>this._textEl.clientWidth?this.el.title=this.text:this.el.title="",this.ownerMenu&&(1==this.ownerMenu.isVertical()?this.ownerMenu.showItemMenu(this):this.ownerMenu.hasShowItemMenu()&&this.ownerMenu.showItemMenu(this)))},__OnMouseOut:function(a){mini.removeClass(this.el,this._hoverCls)},onClick:function(a,b){this.on("click",a,b)},onCheckedChanged:function(a,b){this.on("checkedchanged",a,b)},getAttrs:function(a){var b=mini.MenuItem.superclass.getAttrs.call(this,a);jQuery(a);return b.text=a.innerHTML,mini._ParseString(a,b,["text","iconCls","iconStyle","iconPosition","groupName","onclick","oncheckedchanged"]),mini._ParseBool(a,b,["checkOnClick","checked"]),b}}),mini.regClass(mini.MenuItem,"menuitem"),mini.MenuButton=function(){mini.MenuButton.superclass.constructor.call(this)},mini.extend(mini.MenuButton,mini.Button,{uiCls:"mini-menubutton",allowCls:"mini-button-menu",setMenu:function(a){if(mini.isArray(a)&&(a={type:"menu",items:a}),"string"==typeof a){var b=mini.byId(a);if(!b)return;mini.parse(a),a=mini.get(a)}this.menu!==a&&(this.menu=mini.getAndCreate(a),this.menu.setPopupEl(this.el),this.menu.setPopupCls("mini-button-popup"),this.menu.setShowAction("leftclick"),this.menu.setHideAction("outerclick"),this.menu.setXAlign("left"),this.menu.setYAlign("below"),this.menu.hide(),this.menu.owner=this)},setEnabled:function(a){this.enabled=a,a?this.removeCls(this._disabledCls):this.addCls(this._disabledCls),jQuery(this.el).attr("allowPopup",!!a)}}),mini.regClass(mini.MenuButton,"menubutton"),mini.Menu=function(){this.items=[],mini.Menu.superclass.constructor.call(this)},mini.extend(mini.Menu,mini.Control),mini.copyTo(mini.Menu.prototype,mini.Popup_prototype);var mini_Popup_prototype_hide=mini.Popup_prototype.hide;mini.copyTo(mini.Menu.prototype,{height:"auto",width:"auto",minWidth:140,vertical:!0,allowSelectItem:!1,_selectedItem:null,_itemSelectedCls:"mini-menuitem-selected",textField:"text",resultAsTree:!1,idField:"id",parentField:"pid",itemsField:"children",showNavArrow:!0,_clearBorder:!1,showAction:"none",hideAction:"outerclick",getbyName:function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.name==a)return d;if(d.menu){var e=d.menu.getbyName(a);if(e)return e}}return null},set:function(a){if("string"==typeof a)return this;var b=a.url;return delete a.url,mini.Menu.superclass.set.call(this,a),b&&this.setUrl(b),this},uiCls:"mini-menu",_create:function(){this.el=document.createElement("div"),this.el.className="mini-menu",this.el.innerHTML='<div class="mini-menu-border"><a class="mini-menu-topArrow" href="#" onclick="return false"></a><div class="mini-menu-inner"></div><a class="mini-menu-bottomArrow" href="#" onclick="return false"></a></div>',this._borderEl=this.el.firstChild,this._topArrowEl=this._borderEl.childNodes[0],this._bottomArrowEl=this._borderEl.childNodes[2],this._innerEl=this._borderEl.childNodes[1],this._innerEl.innerHTML='<div class="mini-menu-float"></div><div class="mini-menu-toolbar"></div><div style="clear:both;"></div>',this._contentEl=this._innerEl.firstChild,this._toolbarEl=this._innerEl.childNodes[1],0==this.isVertical()&&mini.addClass(this.el,"mini-menu-horizontal")},destroy:function(a){this._topArrowEl&&(this._topArrowEl.onmousedown=this._bottomArrowEl.onmousedown=null),this._popupEl=this.popupEl=this._borderEl=this._innerEl=this._contentEl=null,this._topArrowEl=this._bottomArrowEl=null,this.owner=null,mini.un(document,"mousedown",this.__OnBodyMouseDown,this),mini.un(window,"resize",this.__OnWindowResize,this),this.el.onmouseover=null,this.el.oncontextmenu=null,mini.Menu.superclass.destroy.call(this,a)},_disableContextMenu:!1,_initEvents:function(){mini._BindEvents(function(){mini.on(document,"mousedown",this.__OnBodyMouseDown,this),mini_onOne(this.el,"mouseover",this.__OnMouseOver,this),mini.on(window,"resize",this.__OnWindowResize,this),this._disableContextMenu&&mini_onOne(this.el,"contextmenu",function(a){a.preventDefault()},this),mini_onOne(this._topArrowEl,"mousedown",this.__OnTopMouseDown,this),mini_onOne(this._bottomArrowEl,"mousedown",this.__OnBottomMouseDown,this)},this)},within:function(a){if(mini.isAncestor(this.el,a.target))return!0;for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.within(a))return!0}return!1},setVertical:function(a){this.vertical=a,a?mini.removeClass(this.el,"mini-menu-horizontal"):mini.addClass(this.el,"mini-menu-horizontal")},getVertical:function(){return this.vertical},isVertical:function(){return this.vertical},show:function(){this.setVisible(!0)},hide:function(){this.hideItems(),mini_Popup_prototype_hide.call(this)},hideItems:function(){for(var a=0,b=this.items.length;b>a;a++){var c=this.items[a];c.hideMenu()}},showItemMenu:function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d==a?d.showMenu():d.hideMenu()}},hasShowItemMenu:function(){for(var a=0,b=this.items.length;b>a;a++){var c=this.items[a];if(c&&c.menu&&c.menu.isPopup)return!0}return!1},showAllItems:function(a){function b(a){for(var c=0;c<a.length;c++){var d=a[c];if(d.show(),d.enable(),d.menu&&d.menu.items){var e=d.menu.items;b(e)}}}var c;a?(a.show(),a.enable(),c=a.getMenuItems()):c=this.getItems(),b(c)},hideAllItems:function(a){function b(a){for(var c=0;c<a.length;c++){var d=a[c];if(d.hide(),d.menu&&d.menu.items){var e=d.menu.items;b(e)}}}var c;a?(a.hide(),c=a.getMenuItems()):c=this.getItems(),b(c)},setData:function(a){mini.isArray(a)||(a=[]),this.setItems(a)},getData:function(){return this.getItems()},setItems:function(a){mini.isArray(a)||(a=[]),this.removeAll();for(var b=(new Date,0),c=a.length;c>b;b++)this.addItem(a[b])},getItems:function(){return this.items},addItem:function(a){return"-"==a||"|"==a||"separator"==a.type?void mini.append(this._contentEl,'<span class="mini-separator"></span>'):(mini.isControl(a)||mini.getClass(a.type)||(a.type="menuitem"),a=mini.getAndCreate(a),this.items.push(a),this._contentEl.appendChild(a.el),a.ownerMenu=this,void this.fire("itemschanged"))},removeItem:function(a){a=mini.get(a),a&&(this.items.remove(a),this._contentEl.removeChild(a.el),this.fire("itemschanged"))},removeItemAt:function(a){var b=this.items[a];this.removeItem(b)},removeAll:function(){for(var a=this.items.clone(),b=a.length-1;b>=0;b--)this.removeItem(a[b]);this._contentEl.innerHTML=""},getGroupItems:function(a){if(!a)return[];for(var b=[],c=0,d=this.items.length;d>c;c++){var e=this.items[c];e.groupName==a&&b.push(e)}return b},getItem:function(a){if("number"==typeof a)return this.items[a];if("string"==typeof a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.id==a)return d}return null}return a&&-1!=this.items.indexOf(a)?a:null},setAllowSelectItem:function(a){this.allowSelectItem=a},getAllowSelectItem:function(){return this.allowSelectItem},setSelectedItem:function(a){a=this.getItem(a),this._OnItemSelect(a)},getSelectedItem:function(a){return this._selectedItem},setShowNavArrow:function(a){this.showNavArrow=a},getShowNavArrow:function(){return this.showNavArrow},setTextField:function(a){this.textField=a},getTextField:function(){return this.textField},setResultAsTree:function(a){this.resultAsTree=a},getResultAsTree:function(){return this.resultAsTree},setIdField:function(a){this.idField=a},getIdField:function(){return this.idField},setParentField:function(a){this.parentField=a},getParentField:function(){return this.parentField},doLayout:function(){if(this.canLayout())if(this.isAutoHeight())this._borderEl.style.height="auto",this._contentEl.style.height="auto";else{var a=mini.getHeight(this.el,!0);if(mini.setHeight(this._borderEl,a),this._topArrowEl.style.display=this._bottomArrowEl.style.display="none",this._contentEl.style.height="auto",this.showNavArrow&&this._borderEl.scrollHeight>this._borderEl.clientHeight){this._topArrowEl.style.display=this._bottomArrowEl.style.display="block",a=mini.getHeight(this._borderEl,!0);var b=mini.getHeight(this._topArrowEl),c=mini.getHeight(this._bottomArrowEl),d=a-b-c;0>d&&(d=0),mini.setHeight(this._contentEl,d)}else this._contentEl.style.height="auto"}},_measureSize:function(){if("auto"==this.height){this.el.style.height="auto",this._borderEl.style.height="auto",this._contentEl.style.height="auto",this._topArrowEl.style.display=this._bottomArrowEl.style.display="none";var a=mini.getViewportBox(),b=mini.getBox(this.el);if(this.maxHeight=a.height-25,this.ownerItem){var b=mini.getBox(this.ownerItem.el),c=b.top,d=a.height-b.bottom,e=c>d?c:d;e-=10,this.maxHeight=e}}this.el.style.display="";var b=mini.getBox(this.el);b.width>this.maxWidth&&(mini.setWidth(this.el,this.maxWidth),b=mini.getBox(this.el)),b.height>this.maxHeight&&(mini.setHeight(this.el,this.maxHeight),b=mini.getBox(this.el)),b.width<this.minWidth&&(mini.setWidth(this.el,this.minWidth),b=mini.getBox(this.el)),b.height<this.minHeight&&(mini.setHeight(this.el,this.minHeight),b=mini.getBox(this.el))},url:"",_doLoad:function(){var a=mini.getData(this.url);this.dataField&&(a=mini._getMap(this.dataField,a)),a||(a=[]),0==this.resultAsTree&&(a=mini.arrayToTree(a,this.itemsField,this.idField,this.parentField));for(var b=mini.treeToArray(a,this.itemsField,this.idField,this.parentField),c=0,d=b.length;d>c;c++){var e=b[c];e.text=mini._getMap(this.textField,e),mini.isNull(e.text)&&(e.text="")}new Date;this.setItems(a),this.fire("load")},loadList:function(a,b,c){if(a){b=b||this.idField,c=c||this.parentField;for(var d=0,e=a.length;e>d;d++){var f=a[d];f.text=mini._getMap(this.textField,f),mini.isNull(f.text)&&(f.text="")}var g=mini.arrayToTree(a,this.itemsField,b,c);this.load(g)}},load:function(a){"string"==typeof a?this.setUrl(a):this.setItems(a)},setUrl:function(a){this.url=this.parseUrl(a),this._doLoad()},getUrl:function(){return this.url},hideOnClick:!0,
setHideOnClick:function(a){this.hideOnClick=a},getHideOnClick:function(){return this.hideOnClick},_OnItemClick:function(a,b){var c={item:a,isLeaf:!a.menu,htmlEvent:b};this.hideOnClick&&(this.isPopup?this.hide():this.hideItems()),this.allowSelectItem&&this._selectedItem!=a&&this.setSelectedItem(a),this.fire("itemclick",c),this.ownerItem},_OnItemSelect:function(a){this._selectedItem&&this._selectedItem.removeCls(this._itemSelectedCls),this._selectedItem=a,this._selectedItem&&this._selectedItem.addCls(this._itemSelectedCls);var b={item:this._selectedItem};this.fire("itemselect",b)},onItemClick:function(a,b){this.on("itemclick",a,b)},onItemSelect:function(a,b){this.on("itemselect",a,b)},__OnTopMouseDown:function(a){this._startScrollMove(-20)},__OnBottomMouseDown:function(a){this._startScrollMove(20)},_startScrollMove:function(a){clearInterval(this._scrollTimer);var b=function(){clearInterval(c._scrollTimer),mini.un(document,"mouseup",b)};mini.on(document,"mouseup",b);var c=this;this._scrollTimer=setInterval(function(){c._contentEl.scrollTop+=a},50)},setToolbar:function(a){__mini_setControls(a,this._toolbarEl,this)},parseItems:function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];if("separator"!=e.className){var f=mini.getChildNodes(e),g=f[0],h=f[1],i=new mini.MenuItem;if(h){mini.applyTo.call(i,g),i.render(document.body);var j=new mini.Menu;mini.applyTo.call(j,h),i.setMenu(j),j.render(document.body),b.add(i)}else mini.applyTo.call(i,e),b.add(i)}else b.add("-")}return b.clone()},getAttrs:function(a){var b=mini.Menu.superclass.getAttrs.call(this,a),c=jQuery(a);mini._ParseString(a,b,["popupEl","popupCls","showAction","hideAction","xAlign","yAlign","modalStyle","onbeforeopen","open","onbeforeclose","onclose","url","onitemclick","onitemselect","textField","idField","parentField"]),mini._ParseBool(a,b,["resultAsTree","hideOnClick","showNavArrow"]);for(var d=mini.getChildNodes(a),e=d.length-1;e>=0;e--){var f=d[e],g=jQuery(f).attr("property");g&&(g=g.toLowerCase(),"toolbar"==g&&(b.toolbar=f,f.parentNode.removeChild(f)))}var d=mini.getChildNodes(a),h=this.parseItems(d);h.length>0&&(b.items=h);var i=c.attr("vertical");i&&(b.vertical="true"==i?!0:!1);var j=c.attr("allowSelectItem");return j&&(b.allowSelectItem="true"==j?!0:!1),b}}),mini.regClass(mini.Menu,"menu"),mini.MenuBar=function(){mini.MenuBar.superclass.constructor.call(this)},mini.extend(mini.MenuBar,mini.Menu,{uiCls:"mini-menubar",vertical:!1,setVertical:function(a){this.vertical=!1}}),mini.regClass(mini.MenuBar,"menubar"),mini.OutlookMenu=function(){mini.OutlookMenu.superclass.constructor.call(this),this.data=[]},mini.extend(mini.OutlookMenu,mini.OutlookBar,{url:"",textField:"text",iconField:"iconCls",urlField:"url",resultAsTree:!1,itemsField:"children",idField:"id",parentField:"pid",style:"width:100%;height:100%;",set:function(a){if("string"==typeof a)return this;var b=a.url;delete a.url;var c=a.activeIndex;return delete a.activeIndex,mini.OutlookMenu.superclass.set.call(this,a),b&&this.setUrl(b),mini.isNumber(c)&&this.setActiveIndex(c),this},uiCls:"mini-outlookmenu",destroy:function(a){if(this._menus){for(var b=this._menus.clone(),c=0,d=b.length;d>c;c++){var e=b[c];e.destroy()}this._menus.length=0}mini.OutlookMenu.superclass.destroy.call(this,a)},_doParseFields:function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];d.text=d[this.textField],d.url=d[this.urlField],d.iconCls=d[this.iconField]}},_doLoad:function(){var a=[];try{a=mini.getData(this.url)}catch(b){1==mini_debugger&&alert("outlooktree json is error.")}this.dataField&&(a=mini._getMap(this.dataField,a)),a||(a=[]),0==this.resultAsTree&&(a=mini.arrayToTree(a,this.itemsField,this.idField,this.parentField));var c=mini.treeToArray(a,this.itemsField,this.idField,this.parentField);this._doParseFields(c),this.createNavBarMenu(a),this.fire("load")},loadList:function(a,b,c){b=b||this.idField,c=c||this.parentField,this._doParseFields(a);var d=mini.arrayToTree(a,this.nodesField,b,c);this.load(d)},load:function(a){if("string"==typeof a)this.setUrl(a);else{0==this.resultAsTree&&(a=mini.arrayToTree(a,this.itemsField,this.idField,this.parentField));var b=mini.treeToArray(a,this.itemsField,this.idField,this.parentField);this._doParseFields(b),this.createNavBarMenu(a)}},setData:function(a){this.load(a)},setUrl:function(a){this.url=this.parseUrl(a),this._doLoad()},getUrl:function(){return this.url},setTextField:function(a){this.textField=a},getTextField:function(){return this.textField},setIconField:function(a){this.iconField=a},getIconField:function(){return this.iconField},setUrlField:function(a){this.urlField=a},getUrlField:function(){return this.urlField},setResultAsTree:function(a){this.resultAsTree=a},getResultAsTree:function(){return this.resultAsTree},setNodesField:function(a){this.nodesField=a},getNodesField:function(){return this.nodesField},setIdField:function(a){this.idField=a},getIdField:function(){return this.idField},setParentField:function(a){this.parentField=a},getParentField:function(){return this.parentField},_selected:null,getSelected:function(){return this._selected},selectNode:function(a){if(a=this.getNode(a)){var b=this._getOwnerMenu(a);b&&(this.expandGroup(b._ownerGroup),setTimeout(function(){try{b.setSelectedItem(a)}catch(c){}},100))}},findNodes:function(a,b){var c=[];b=b||this;for(var d=0,e=this._menus.length;e>d;d++){for(var f=this._menus[d].getItems(),g=[],h=0,i=f.length;i>h;h++){var j=f[h];a&&a.call(b,j)===!0&&g.push(j)}c.addRange(g)}return c},getNode:function(a){for(var b=0,c=this._menus.length;c>b;b++){var d=this._menus[b],e=d.getItem(a);if(e)return e}return null},getList:function(){for(var a=[],b=0,c=this._menus.length;c>b;b++){var d=this._menus[b],e=d.getItems();a.addRange(e)}return a},_getOwnerMenu:function(a){if(a)for(var b=0,c=this._menus.length;c>b;b++){var d=this._menus[b],e=d.getItem(a);if(e)return d}},getAttrs:function(a){var b=mini.OutlookMenu.superclass.getAttrs.call(this,a);return b.text=a.innerHTML,mini._ParseString(a,b,["url","textField","urlField","idField","parentField","itemsField","iconField","onitemclick","onitemselect"]),mini._ParseBool(a,b,["resultAsTree"]),b},autoCollapse:!0,activeIndex:0,createNavBarMenu:function(a){mini.isArray(a)||(a=[]),this.data=a;for(var b=[],c=0,d=this.data.length;d>c;c++){var e=this.data[c],f={};f.title=e.text,f.iconCls=e.iconCls,b.push(f),f._children=e[this.itemsField]}this.setGroups(b),this.getExpandOnLoad()&&this.setActiveIndex(this.activeIndex),this._menus=[];for(var c=0,d=this.groups.length;d>c;c++){var f=this.groups[c],g=this.getGroupBodyEl(f),h=new mini.Menu;h._ownerGroup=f,h.set({showNavArrow:!1,style:"width:100%;height:100%;border:0;background:none",borderStyle:"border:0",allowSelectItem:!0,items:f._children}),h.render(g),h.on("itemclick",this.__OnItemClick,this),h.on("itemselect",this.__OnItemSelect,this),this._menus.push(h),delete f._children}},__OnItemClick:function(a){var b={item:a.item,htmlEvent:a.htmlEvent};this.fire("itemclick",b)},__OnItemSelect:function(a){if(a.item){for(var b=0,c=this._menus.length;c>b;b++){var d=this._menus[b];d!=a.sender&&d.setSelectedItem(null)}var e={item:a.item,htmlEvent:a.htmlEvent};this._selected=a.item,this.fire("itemselect",e)}}}),mini.regClass(mini.OutlookMenu,"outlookmenu"),mini.ContextMenu=function(){mini.ContextMenu.superclass.constructor.call(this)},mini.extend(mini.ContextMenu,mini.Menu,{uiCls:"mini-contextmenu",vertical:!0,visible:!1,_disableContextMenu:!0,setVertical:function(a){this.vertical=!0}}),mini.regClass(mini.ContextMenu,"contextmenu"),mini.DataBinding=function(){this._bindFields=[],this._bindForms=[],mini.DataBinding.superclass.constructor.call(this)},mini.extend(mini.DataBinding,mini.Component,{bindField:function(a,b,c,d,e){if(a=mini.get(a),b=mini.get(b),a&&b&&c){var f={control:a,source:b,field:c,convert:e,mode:d};this._bindFields.push(f),b.on("currentchanged",this.__OnCurrentChanged,this),a.on("valuechanged",this.__OnValueChanged,this)}},bindForm:function(a,b,c,d){if(a=mini.byId(a),b=mini.get(b),a&&b)for(var a=new mini.Form(a),e=a.getFields(),f=0,g=e.length;g>f;f++){var h=e[f];this.bindField(h,b,h.getName(),c,d)}},__OnCurrentChanged:function(a){if(!this._doSetting){this._doSetting=!0;for(var b=a.sender,c=a.record,d=0,e=this._bindFields.length;e>d;d++){var f=this._bindFields[d];if(f.source==b){var g=f.control,h=f.field;if(g.setValue)if(c){var i=c[h];g.setValue(i)}else g.setValue("");g.setText&&g.textName&&(c?g.setText(c[g.textName]):g.setText(""))}}var j=this;setTimeout(function(){j._doSetting=!1},10)}},__OnValueChanged:function(a){if(!this._doSetting){this._doSetting=!0;for(var b=a.sender,c=b.getValue(),d=0,e=this._bindFields.length;e>d;d++){var f=this._bindFields[d];if(f.control==b&&f.mode!==!1){var g=f.source,h=g.getCurrent();if(h){var i={};i[f.field]=c,b.getText&&b.textName&&(i[b.textName]=b.getText()),g.updateRow(h,i)}}}var j=this;setTimeout(function(){j._doSetting=!1},10)}}}),mini.regClass(mini.DataBinding,"databinding"),mini.MessageBox={alertTitle:"\u63d0\u9192",confirmTitle:"\u786e\u8ba4",prompTitle:"\u8f93\u5165",prompMessage:"\u8bf7\u8f93\u5165\u5185\u5bb9\uff1a",buttonText:{ok:"\u786e\u5b9a",cancel:"\u53d6\u6d88",yes:"\u662f",no:"\u5426"},show:function(a){a=mini.copyTo({width:"auto",height:"auto",showModal:!0,minWidth:150,maxWidth:800,minHeight:100,maxHeight:350,showHeader:!0,title:"",titleIcon:"",iconCls:"",iconStyle:"",message:"",html:"",spaceStyle:"margin-right:15px",showCloseButton:!0,buttons:null,buttonWidth:58,callback:null},a);var b=a.callback,c=new mini.Window;c.setShowModal(a.showModal),c.setShowFooter(!0),c.setTitle(a.title||""),c.setIconCls(a.titleIcon),c.setShowHeader(a.showHeader),c.setCls("mini-messagebox"),c.setShowCloseButton(a.showCloseButton);var d=c.uid+"$table",e=c.uid+"$content",f='<div class="'+a.iconCls+'" style="'+a.iconStyle+'"></div>',g='<table class="mini-messagebox-table" id="'+d+'" style="" cellspacing="0" cellpadding="0"><tr><td>'+f+'</td><td id="'+e+'" class="mini-messagebox-content-text">'+(a.message||"")+"</td></tr></table>",h='<div class="mini-messagebox-content"></div>';c._bodyEl.innerHTML=h,c._footerEl.innerHTML='<div class="mini-messagebox-buttons"></div>';var i=c._bodyEl.firstChild;a.html?"string"==typeof a.html?i.innerHTML=a.html:mini.isElement(a.html)&&i.appendChild(a.html):i.innerHTML=g,c._Buttons=[];var j=c._footerEl.firstChild;if(a.buttons&&a.buttons.length>0)for(var k=0,l=a.buttons.length;l>k;k++){var m=a.buttons[k],n=mini.MessageBox.buttonText[m];n||(n=m);var o=new mini.Button;o.setText(n),o.setWidth(a.buttonWidth),o.render(j),o.action=m,o.on("click",function(a){var d=a.sender;b&&b(d.action),mini&&mini.MessageBox.hide(c)}),k!=l-1&&o.setStyle(a.spaceStyle),c._Buttons.push(o)}else j.style.display="none";c.setMinWidth(a.minWidth),c.setMinHeight(a.minHeight),c.setMaxWidth(a.maxWidth),c.setMaxHeight(a.maxHeight),c.setWidth(a.width),c.setHeight(a.height),c.show();var p=c.getWidth();c.setWidth(p);var q=c.getHeight();c.setHeight(q);var r=document.getElementById(d);r&&(r.style.width="100%");var s=document.getElementById(e);s&&(s.style.width="100%");var t=c._Buttons[0];return t?setTimeout(function(){t.focus()},100):c.focus(),c.on("beforebuttonclick",function(a){b&&b("close"),a.cancel=!0,mini.MessageBox.hide(c)}),mini.on(c.el,"keydown",function(a){27==a.keyCode&&(b&&b("close"),a.cancel=!0,mini.MessageBox.hide(c))}),c.uid},hide:function(a){if(a){var b="object"==typeof a?a:mini.getbyUID(a);if(b){for(var c=0,d=b._Buttons.length;d>c;c++){var e=b._Buttons[c];e.destroy()}b._Buttons=null,b.destroy()}}},alert:function(a,b,c){return mini.MessageBox.show({maxWidth:400,minWidth:250,title:b||mini.MessageBox.alertTitle,buttons:["ok"],message:a,iconCls:"mini-messagebox-warning",callback:c})},confirm:function(a,b,c){return mini.MessageBox.show({maxWidth:400,minWidth:250,title:b||mini.MessageBox.confirmTitle,buttons:["ok","cancel"],message:a,iconCls:"mini-messagebox-question",callback:c})},prompt:function(a,b,c,d){var e,f,g=("prompt$"+(new Date).getTime(),a||mini.MessageBox.promptMessage);jQuery("<div></div>");d?(e=new mini.TextArea,e.setWidth("230"),e.setHeight("70"),f="190"):(e=new mini.TextBox,e.setWidth("230"),f="140",g+="<br/>");var h=mini.MessageBox.show({title:b||mini.MessageBox.promptTitle,buttons:["ok","cancel"],width:280,height:f,html:'<div id="pzf" style="overflow:auto;padding:5px;padding-left:10px;">'+g+"</div>",callback:function(a){c&&c(a,e.getValue())}});return e.render(jQuery("#pzf")[0]),e.focus(),h},loading:function(a,b){return mini.MessageBox.show({maxWidth:400,minHeight:50,title:b,showCloseButton:!1,message:a,iconCls:"mini-messagebox-waiting"})},showTips:function(a){var b=jQuery;a=b.extend({content:"",state:"",x:"center",y:"top",offset:[10,10],fixed:!0,timeout:2e3},a);var c="mini-tips-"+a.state,d='<div class="mini-tips '+c+'">'+a.content+"</div>",e=b(d).appendTo(document.body);a.el=e[0],a.timeoutHandler=function(){e.slideUp(),setTimeout(function(){e.remove()},2e3)},mini.showAt(a),e.hide().slideDown()}},mini.alert=mini.MessageBox.alert,mini.confirm=mini.MessageBox.confirm,mini.prompt=mini.MessageBox.prompt,mini.loading=mini.MessageBox.loading,mini.showMessageBox=mini.MessageBox.show,mini.hideMessageBox=mini.MessageBox.hide,mini.showTips=mini.MessageBox.showTips,mini.NavBar=function(){mini.NavBar.superclass.constructor.call(this)},mini.extend(mini.NavBar,mini.OutlookBar,{uiCls:"mini-navbar"}),mini.regClass(mini.NavBar,"navbar"),mini.NavBarMenu=function(){mini.NavBarMenu.superclass.constructor.call(this)},mini.extend(mini.NavBarMenu,mini.OutlookMenu,{uiCls:"mini-navbarmenu"}),mini.regClass(mini.NavBarMenu,"navbarmenu"),mini.Panel=function(){this._initButtons(),mini.Panel.superclass.constructor.call(this),this.url&&this.setUrl(this.url),this._contentEl=this._bodyEl,this._doVisibleEls(),this._Resizer=new mini._Resizer(this),this._doTools()},mini.extend(mini.Panel,mini.Container,{width:250,title:"",iconCls:"",iconStyle:"",allowResize:!1,url:"",refreshOnExpand:!1,maskOnLoad:!0,showCollapseButton:!1,showCloseButton:!1,closeAction:"display",showHeader:!0,showToolbar:!1,showFooter:!1,headerCls:"",headerStyle:"",bodyCls:"",bodyStyle:"",footerCls:"",footerStyle:"",toolbarCls:"",toolbarStyle:"",minWidth:180,minHeight:100,maxWidth:5e3,maxHeight:3e3,set:function(a){if("string"==typeof a)return this;var b=this._allowLayout;this._allowLayout=!1;var c=a.toolbar;delete a.toolbar;var d=a.footer;delete a.footer;var e=a.url;return delete a.url,mini.Panel.superclass.set.call(this,a),c&&this.setToolbar(c),d&&this.setFooter(d),e&&this.setUrl(e),this._allowLayout=b,this.doLayout(),this},uiCls:"mini-panel",_create:function(){this.el=document.createElement("div"),this.el.className="mini-panel";var a='<div class="mini-panel-border"><div class="mini-panel-header" ><div class="mini-panel-header-inner" ><span class="mini-panel-icon"></span><div class="mini-panel-title" ></div><div class="mini-tools" ></div></div></div><div class="mini-panel-viewport"><div class="mini-panel-toolbar"></div><div class="mini-panel-body" ></div><div class="mini-panel-footer"></div><div class="mini-resizer-trigger"></div></div></div>';this.el.innerHTML=a,this._borderEl=this.el.firstChild,this._headerEl=this._borderEl.firstChild,this._viewportEl=this._borderEl.lastChild,this._toolbarEl=mini.byClass("mini-panel-toolbar",this.el),this._bodyEl=mini.byClass("mini-panel-body",this.el),this._footerEl=mini.byClass("mini-panel-footer",this.el),this._resizeGridEl=mini.byClass("mini-resizer-trigger",this.el);mini.byClass("mini-panel-header-inner",this.el);this._iconEl=mini.byClass("mini-panel-icon",this.el),this._titleEl=mini.byClass("mini-panel-title",this.el),this._toolsEl=mini.byClass("mini-tools",this.el),mini.setStyle(this._bodyEl,this.bodyStyle),this._doTitle()},destroy:function(a){this._doRemoveIFrame(),this._iframeEl=null,this._headerEl&&(mini.clearEvent(this._headerEl),this._borderEl.removeChild(this._headerEl),this._headerEl=null),this._viewportEl&&(mini.clearEvent(this._viewportEl),this._borderEl.removeChild(this._viewportEl),this._viewportEl=null),this._borderEl&&(mini.clearEvent(this._borderEl),this.el.removeChild(this._borderEl),this._borderEl=null),this._toolbarEl&&($(this._toolbarEl).remove(),this._toolbarEl=null),this._bodyEl&&($(this._bodyEl).remove(),this._bodyEl=null),this._footerEl&&($(this._footerEl).remove(),this._footerEl=null),this._resizeGridEl&&($(this._resizeGridEl).remove(),this._resizeGridEl=null),this._iconEl&&($(this._iconEl).remove(),this._iconEl=null),this._titleEl&&($(this._titleEl).remove(),this._titleEl=null),this._toolsEl&&($(this._toolsEl).remove(),this._toolsEl=null),mini.Panel.superclass.destroy.call(this,a)},_initEvents:function(){mini._BindEvents(function(){mini.on(this.el,"click",this.__OnClick,this)},this)},_doVisibleEls:function(){this._headerEl.style.display=this.showHeader?"":"none",this._toolbarEl.style.display=this.showToolbar?"":"none",this._footerEl.style.display=this.showFooter?"":"none"},doLayout:function(){if(this.canLayout()){this._resizeGridEl.style.display=this.allowResize?"":"none";var a=this.isAutoHeight();this.isAutoWidth(),mini.getWidth(this._viewportEl,!0);if(a)this._viewportEl.style.height="auto",this._bodyEl.style.height="auto";else{var b=this.getViewportHeight();mini.setHeight(this._viewportEl,b);var c=this.getBodyHeight(!0);mini.setHeight(this._bodyEl,c)}mini.layout(this._borderEl),this.fire("layout")}},deferLayout:function(a){if(a||(a=10),!this._layoutTimer){var b=this;this._layoutTimer=setTimeout(function(){b._layoutTimer=null,b.doLayout()},a)}},_stopLayout:function(){clearTimeout(this._layoutTimer),this._layoutTimer=null},getViewportWidth:function(a){return mini.getWidth(this._viewportEl,a)},getViewportHeight:function(a){var b=this.getHeight(!0)-this.getHeaderHeight();if(a){var c=mini.getPaddings(this._viewportEl),d=mini.getBorders(this._viewportEl),e=mini.getMargins(this._viewportEl);jQuery.boxModel&&(b=b-c.top-c.bottom-d.top-d.bottom),b=b-e.top-e.bottom}return b},getBodyHeight:function(a){var b=this.getViewportHeight(),b=b-this.getToolbarHeight()-this.getFooterHeight();if(a){var c=mini.getPaddings(this._viewportEl),d=mini.getBorders(this._viewportEl),e=mini.getMargins(this._viewportEl);jQuery.boxModel&&(b=b-c.top-c.bottom-d.top-d.bottom),b=b-e.top-e.bottom}return 0>b&&(b=0),b},getHeaderHeight:function(){var a=this.showHeader?jQuery(this._headerEl).outerHeight():0;return a},getToolbarHeight:function(){var a=this.showToolbar?jQuery(this._toolbarEl).outerHeight():0;return a},getFooterHeight:function(){var a=this.showFooter?jQuery(this._footerEl).outerHeight():0;return a},setHeaderStyle:function(a){this.headerStyle=a,mini.setStyle(this._headerEl,a),this.doLayout()},getHeaderStyle:function(){return this.headerStyle},setBodyStyle:function(a){this.bodyStyle=a,mini.setStyle(this._bodyEl,a),this.doLayout()},getBodyStyle:function(){return this.bodyStyle},setToolbarStyle:function(a){this.toolbarStyle=a,mini.setStyle(this._toolbarEl,a),this.doLayout()},getToolbarStyle:function(){return this.toolbarStyle},setFooterStyle:function(a){this.footerStyle=a,mini.setStyle(this._footerEl,a),this.doLayout()},getFooterStyle:function(){return this.footerStyle},setHeaderCls:function(a){jQuery(this._headerEl).removeClass(this.headerCls),jQuery(this._headerEl).addClass(a),this.headerCls=a,this.doLayout()},getHeaderCls:function(){return this.headerCls},setBodyCls:function(a){jQuery(this._bodyEl).removeClass(this.bodyCls),jQuery(this._bodyEl).addClass(a),this.bodyCls=a,this.doLayout()},getBodyCls:function(){return this.bodyCls},setToolbarCls:function(a){jQuery(this._toolbarEl).removeClass(this.toolbarCls),jQuery(this._toolbarEl).addClass(a),this.toolbarCls=a,this.doLayout()},getToolbarCls:function(){return this.toolbarCls},setFooterCls:function(a){jQuery(this._footerEl).removeClass(this.footerCls),jQuery(this._footerEl).addClass(a),this.footerCls=a,this.doLayout()},getFooterCls:function(){return this.footerCls},_doTitle:function(){this._titleEl.innerHTML=this.title,this._iconEl.style.display=this.iconCls||this.iconStyle?"inline":"none",this._iconEl.className="mini-panel-icon "+this.iconCls,mini.setStyle(this._iconEl,this.iconStyle)},setTitle:function(a){this.title=a,this._doTitle()},getTitle:function(){return this.title},setIconCls:function(a){this.iconCls=a,this._doTitle()},getIconCls:function(){return this.iconCls},_doTools:function(){for(var a="",b=this.buttons.length-1;b>=0;b--){var c=this.buttons[b];a+='<span id="'+b+'" class="'+c.cls+" "+(c.enabled?"":"mini-disabled")+'" style="'+c.style+";"+(c.visible?"":"display:none;")+'"></span>'}this._toolsEl.innerHTML=a},setShowCloseButton:function(a){this.showCloseButton=a;var b=this.getButton("close");b.visible=a,this._doTools()},getShowCloseButton:function(){return this.showCloseButton},setCloseAction:function(a){this.closeAction=a},getCloseAction:function(){return this.closeAction},setShowCollapseButton:function(a){this.showCollapseButton=a;var b=this.getButton("collapse");b.visible=a,this._doTools()},getShowCollapseButton:function(){return this.showCollapseButton},setShowHeader:function(a){this.showHeader=a,this._doVisibleEls(),this.deferLayout()},getShowHeader:function(){return this.showHeader},setShowToolbar:function(a){this.showToolbar=a,this._doVisibleEls(),this.deferLayout()},getShowToolbar:function(){return this.showToolbar},setShowFooter:function(a){this.showFooter=a,this._doVisibleEls(),this.deferLayout()},getShowFooter:function(){return this.showFooter},__OnClick:function(a){if(mini.isAncestor(this._headerEl,a.target)){var b=mini.findParent(a.target,"mini-tools");if(b){var c=this.getButton(parseInt(a.target.id));c&&this._OnButtonClick(c,a)}}},_OnButtonClick:function(a,b){var c={button:a,index:this.buttons.indexOf(a),name:a.name.toLowerCase(),htmlEvent:b,cancel:!1};this.fire("beforebuttonclick",c);var d=!0;try{"close"==c.name&&"destroy"==this.closeAction&&this._iframeEl&&this._iframeEl.contentWindow&&(d=this._iframeEl.contentWindow.CloseWindow?this._iframeEl.contentWindow.CloseWindow("close"):this._iframeEl.contentWindow.CloseOwnerWindow?this._iframeEl.contentWindow.CloseOwnerWindow("close"):this._CloseOwnerWindow("close"))}catch(e){d=this._CloseOwnerWindow("close")}return d===!1&&(c.cancel=!0),1==c.cancel?c:(this.fire("buttonclick",c),"close"==c.name&&("destroy"==this.closeAction?(this.__HideAction="close",this.destroy()):this.hide()),"collapse"==c.name&&(this.toggle(),this.refreshOnExpand&&this.expanded&&this.url&&this.reload()),c)},onButtonClick:function(a,b){this.on("buttonclick",a,b)},_initButtons:function(){this.buttons=[];var a=this.createButton({name:"close",cls:"mini-tools-close",visible:this.showCloseButton});this.buttons.push(a);var b=this.createButton({name:"collapse",cls:"mini-tools-collapse",visible:this.showCollapseButton});this.buttons.push(b)},createButton:function(a){var b=mini.copyTo({name:"",cls:"",style:"",visible:!0,enabled:!0,html:""},a);return b},addButton:function(a,b){"string"==typeof a&&(a={iconCls:a}),a=this.createButton(a),"number"!=typeof b&&(b=this.buttons.length),this.buttons.insert(b,a),this._doTools()},updateButton:function(a,b){var c=this.getButton(a);c&&(mini.copyTo(c,b),this._doTools())},removeButton:function(a){var b=this.getButton(a);b&&(this.buttons.remove(b),this._doTools())},getButton:function(a){if("number"==typeof a)return this.buttons[a];for(var b=0,c=this.buttons.length;c>b;b++){var d=this.buttons[b];if(d.name==a)return d}},setBody:function(a){__mini_setControls(a,this._bodyEl,this)},set_bodyParent:function(a){},setToolbar:function(a){__mini_setControls(a,this._toolbarEl,this)},setFooter:function(a){__mini_setControls(a,this._footerEl,this)},getHeaderEl:function(){return this._headerEl},getToolbarEl:function(){return this._toolbarEl},getBodyEl:function(){return this._bodyEl},getFooterEl:function(){return this._footerEl},getIFrameEl:function(a){return this._iframeEl},_getMaskWrapEl:function(){return this._bodyEl},_doRemoveIFrame:function(a){if(this._iframeEl){var b=this._iframeEl;b._ondestroy&&b._ondestroy();try{this._iframeEl.parentNode.removeChild(this._iframeEl),this._iframeEl.removeNode(!0)}catch(c){}}this._iframeEl=null,a===!0&&mini.removeChilds(this._bodyEl)},_deferLoadingTime:80,_doLoad:function(){function a(a){c.__HideAction=a;var b=!0;if(c.__onDestroy&&(b=c.__onDestroy(a)),b===!1)return!1;var d={iframe:c._iframeEl,action:a};c.fire("unload",d),setTimeout(function(){c.destroy()},10)}this._doRemoveIFrame(!0);var b=new Date,c=this;this.loadedUrl=this.url,this.maskOnLoad&&this.loading(),jQuery(this._bodyEl).css("overflow","hidden"),c._CloseOwnerWindow=a;var d=mini.createIFrame(this.url,function(d,e){var f=b-new Date+c._deferLoadingTime;0>f&&(f=0),setTimeout(function(){c.unmask()},f);try{c._iframeEl.contentWindow.Owner=c.Owner,c._iframeEl.contentWindow.CloseOwnerWindow=a}catch(g){}c.__onLoad&&c.__onLoad();var g={iframe:c._iframeEl};c.fire("load",g)});this._bodyEl.appendChild(d),this._iframeEl=d},load:function(a,b,c){this.setUrl(a,b,c)},reload:function(){this.setUrl(this.parseUrl(this.url))},setUrl:function(a,b,c){this.url=a,this.__onLoad=b,this.__onDestroy=c,this.expanded&&this._doLoad()},getUrl:function(){return this.url},setRefreshOnExpand:function(a){this.refreshOnExpand=a},getRefreshOnExpand:function(){return this.refreshOnExpand},setMaskOnLoad:function(a){this.maskOnLoad=a},getMaskOnLoad:function(a){return this.maskOnLoad},setAllowResize:function(a){this.allowResize!=a&&(this.allowResize=a,this.doLayout())},getAllowResize:function(){return this.allowResize},expanded:!0,setExpanded:function(a){this.expanded!=a&&(this.expanded=a,this.expanded?this.expand():this.collapse())},toggle:function(){this.expanded?this.collapse():this.expand()},collapse:function(){this.expanded=!1,this._height=this.el.style.height,this.el.style.height="auto",this._viewportEl.style.display="none",mini.addClass(this.el,"mini-panel-collapse"),this.doLayout()},expand:function(){this.expanded=!0,this.el.style.height=this._height,this._viewportEl.style.display="block",delete this._height,mini.removeClass(this.el,"mini-panel-collapse"),this.url&&this.url!=this.loadedUrl&&this._doLoad(),this.doLayout()},getAttrs:function(a){var b=mini.Panel.superclass.getAttrs.call(this,a);mini._ParseString(a,b,["title","iconCls","iconStyle","headerCls","headerStyle","bodyCls","bodyStyle","footerCls","footerStyle","toolbarCls","toolbarStyle","footer","toolbar","url","closeAction","loadingMsg","onbeforebuttonclick","onbuttonclick","onload"]),mini._ParseBool(a,b,["allowResize","showCloseButton","showHeader","showToolbar","showFooter","showCollapseButton","refreshOnExpand","maskOnLoad","expanded"]);for(var c=mini.getChildNodes(a,!0),d=c.length-1;d>=0;d--){var e=c[d],f=jQuery(e).attr("property");f&&(f=f.toLowerCase(),"toolbar"==f?b.toolbar=e:"footer"==f&&(b.footer=e))}return b.body=c,b}}),mini.regClass(mini.Panel,"panel"),mini=mini||{},mini.TextBox=function(){mini.TextBox.superclass.constructor.call(this)},mini.extend(mini.TextBox,mini.ValidatorBase,{name:"",formField:!0,selectOnFocus:!1,minWidth:10,minHeight:15,maxLength:5e3,emptyText:"",text:"",value:"",defaultValue:"",width:125,height:21,_emptyCls:"mini-textbox-empty",_focusCls:"mini-textbox-focus",_disabledCls:"mini-textbox-disabled",uiCls:"mini-textbox",_InputType:"text",_create:function(){var a='<input type="'+this._InputType+'" class="mini-textbox-input" autocomplete="off"/>';"textarea"==this._InputType&&(a='<textarea class="mini-textbox-input" autocomplete="off"/></textarea>'),a='<span class="mini-textbox-border">'+a+"</span>",a+='<input type="hidden"/>',this.el=document.createElement("span"),this.el.className="mini-textbox",this.el.innerHTML=a,this._borderEl=this.el.firstChild,this._textEl=this._borderEl.firstChild,this._valueEl=this.el.lastChild,this._doEmpty()},_initEvents:function(){mini._BindEvents(function(){mini_onOne(this._textEl,"drop",this.__OnDropText,this),mini_onOne(this._textEl,"change",this.__OnInputTextChanged,this),mini_onOne(this._textEl,"focus",this.__OnFocus,this),mini_onOne(this.el,"mousedown",this.__OnMouseDown,this),mini_onOne(this._textEl,"paste",this.__OnPaste,this);var a=this.value;this.value="",this.setValue(a)},this),this.on("validation",this.__OnValidation,this)},_inputEventsInited:!1,_initInputEvents:function(){this._inputEventsInited||(this._inputEventsInited=!0,mini.on(this._textEl,"blur",this.__OnBlur,this),mini.on(this._textEl,"keydown",this.__OnInputKeyDown,this),mini.on(this._textEl,"keyup",this.__OnInputKeyUp,this),mini.on(this._textEl,"keypress",this.__OnInputKeyPress,this))},destroy:function(a){this.el&&(this.el.onmousedown=null),this._textEl&&(this._textEl.ondrop=null,this._textEl.onchange=null,this._textEl.onfocus=null,this._textEl.placeholder=null,this._textEl.onpropertychange=null,this._textEl._placeholder_label&&(this._textEl._placeholder_label.onmousedown=null,this._textEl._placeholder_label.parentNode.removeChild(this._textEl._placeholder_label),this._textEl._placeholder_label=null),mini.clearEvent(this._textEl),this._textEl.parentNode.removeChild(this._textEl),this._textEl=null),this._borderEl&&(mini.clearEvent(this._borderEl),this._borderEl.parentNode.removeChild(this._borderEl),this._borderEl=null),this._valueEl&&(mini.clearEvent(this._valueEl),this._valueEl.parentNode.removeChild(this._valueEl),this._valueEl=null),this._errorIconEl&&(mini.clearEvent(this._errorIconEl),this._errorIconEl.parentNode.removeChild(this._errorIconEl),this._errorIconEl=null),mini.TextBox.superclass.destroy.call(this,a)},doLayout:function(){},setHeight:function(a){parseInt(a)==a&&(a+="px"),this.height=a,"textarea"==this._InputType&&(this.el.style.height=a,this.doLayout())},setName:function(a){this.name!=a&&(this.name=a,this._valueEl&&mini.setAttr(this._valueEl,"name",this.name))},setValue:function(a,b){(null===a||void 0===a)&&(a=""),a=String(a),a.length>this.maxLength&&(a=a.substring(0,this.maxLength),this._textEl.value=a),this.value!==a&&(this.value=a,this._valueEl.value=this._textEl.value=a,this._doEmpty(),void 0===b&&(b=!0),b&&this._OnValueChanged())},getValue:function(){return this.value},getFormValue:function(){return value=this.value,(null===value||void 0===value)&&(value=""),String(value)},setAllowInput:function(a){this.allowInput!=a&&(this.allowInput=a,this.doUpdate())},getAllowInput:function(){return this.allowInput},_placeholdered:!1,_doEmpty:function(){this._textEl.placeholder=this.emptyText,this.emptyText&&mini._placeholder(this._textEl)},setEmptyText:function(a){this.emptyText!=a&&(this.emptyText=a,this._doEmpty())},getEmptyText:function(){return this.emptyText},setMaxLength:function(a){this.maxLength=a,mini.setAttr(this._textEl,"maxLength",a),"textarea"==this._InputType&&mini.isIE&&mini.on(this._textEl,"keypress",this.__OnMaxLengthKeyUp,this)},__OnMaxLengthKeyUp:function(a){this._textEl.value.length>=this.maxLength&&a.preventDefault()},getMaxLength:function(){return this.maxLength},setReadOnly:function(a){this.readOnly!=a&&(this.readOnly=a,this.doUpdate())},setEnabled:function(a){this.enabled!=a&&(this.enabled=a,this.doUpdate(),this._tryValidate())},doUpdate:function(){this.enabled?this.removeCls(this._disabledCls):this.addCls(this._disabledCls),this.isReadOnly()||0==this.allowInput?(this._textEl.readOnly=!0,mini.addClass(this.el,"mini-textbox-readOnly")):(this._textEl.readOnly=!1,mini.removeClass(this.el,"mini-textbox-readOnly")),this.required?this.addCls(this._requiredCls):this.removeCls(this._requiredCls),this.enabled?this._textEl.disabled=!1:this._textEl.disabled=!0},focus:function(){try{this._textEl.focus()}catch(a){}},blur:function(){try{this._textEl.blur()}catch(a){}},selectText:function(){function a(){try{b._textEl.select()}catch(a){}}var b=this;a()},getTextEl:function(){return this._textEl},getInputText:function(){return this._textEl.value},setInputText:function(a){return this._textEl.value=a},setSelectOnFocus:function(a){this.selectOnFocus=a},getSelectOnFocus:function(a){return this.selectOnFocus},_errorIconEl:null,getErrorIconEl:function(){return this._errorIconEl||(this._errorIconEl=mini.append(this.el,'<span class="mini-errorIcon"></span>')),this._errorIconEl},_RemoveErrorIcon:function(){
if(this._errorIconEl){var a=this._errorIconEl;jQuery(a).remove()}this._errorIconEl=null},__OnMouseDown:function(a){var b=this;mini.isAncestor(this._textEl,a.target)?setTimeout(function(){try{b._textEl.focus()}catch(a){}},1):setTimeout(function(){b.focus(),mini.selectRange(b._textEl,1e3,1e3)},1)},__OnPaste:function(a){var b=this;setTimeout(function(){b.fire("paste",{htmlEvent:a,inputText:b.getInputText()})},1)},__OnInputTextChanged:function(a,b){var c=this.value;this.setValue(this._textEl.value),c!==this.getValue()||b===!0},__OnDropText:function(a){var b=this;setTimeout(function(){b.__OnInputTextChanged(a)},0)},__OnInputKeyDown:function(a){var b={htmlEvent:a};if(this.fire("keydown",b),8==a.keyCode&&(this.isReadOnly()||0==this.allowInput))return!1;if(13==a.keyCode||9==a.keyCode)if("textarea"==this._InputType&&13==a.keyCode);else if(this.__OnInputTextChanged(null,!0),13==a.keyCode){var c=this;c.fire("enter",b)}},__OnInputKeyUp:function(a){this.fire("keyup",{htmlEvent:a})},__OnInputKeyPress:function(a){this.fire("keypress",{htmlEvent:a})},__OnFocus:function(a){this.doUpdate(),this.isReadOnly()||(this._focused=!0,this.addCls(this._focusCls),this._initInputEvents(),this.selectOnFocus&&this.selectText(),this.fire("focus",{htmlEvent:a}))},__OnBlur:function(a){this._textEl.value!=this._valueEl.value&&this.setValue(this._textEl.value),this._focused=!1;var b=this;setTimeout(function(){0==b._focused&&b.removeCls(b._focusCls)},2),this.fire("blur",{htmlEvent:a}),this.validateOnLeave&&this._tryValidate()},inputStyle:"",setInputStyle:function(a){this.inputStyle=a,mini.setStyle(this._textEl,a)},getAttrs:function(a){var b=mini.TextBox.superclass.getAttrs.call(this,a);jQuery(a);return mini._ParseString(a,b,["value","text","emptyText","inputStyle","onenter","onkeydown","onkeyup","onkeypress","onpaste","maxLengthErrorText","minLengthErrorText","onfocus","onblur","vtype","emailErrorText","urlErrorText","floatErrorText","intErrorText","dateErrorText","minErrorText","maxErrorText","rangeLengthErrorText","rangeErrorText","rangeCharErrorText"]),isIE7&&jQuery(a).attr("width")&&(b.width=jQuery(a).attr("width")),mini._ParseBool(a,b,["allowInput","selectOnFocus"]),mini._ParseInt(a,b,["maxLength","minLength","minHeight","minWidth"]),b},vtype:"",setVtype:function(a){this.vtype=a},getVtype:function(){return this.vtype},__OnValidation:function(a){0!=a.isValid&&mini._ValidateVType(this.vtype,a.value,a,this)},setEmailErrorText:function(a){this.emailErrorText=a},getEmailErrorText:function(){return this.emailErrorText},setUrlErrorText:function(a){this.urlErrorText=a},getUrlErrorText:function(){return this.urlErrorText},setFloatErrorText:function(a){this.floatErrorText=a},getFloatErrorText:function(){return this.floatErrorText},setIntErrorText:function(a){this.intErrorText=a},getIntErrorText:function(){return this.intErrorText},setDateErrorText:function(a){this.dateErrorText=a},getDateErrorText:function(){return this.dateErrorText},setMaxLengthErrorText:function(a){this.maxLengthErrorText=a},getMaxLengthErrorText:function(){return this.maxLengthErrorText},setMinLengthErrorText:function(a){this.minLengthErrorText=a},getMinLengthErrorText:function(){return this.minLengthErrorText},setMaxErrorText:function(a){this.maxErrorText=a},getMaxErrorText:function(){return this.maxErrorText},setMinErrorText:function(a){this.minErrorText=a},getMinErrorText:function(){return this.minErrorText},setRangeLengthErrorText:function(a){this.rangeLengthErrorText=a},getRangeLengthErrorText:function(){return this.rangeLengthErrorText},setRangeCharErrorText:function(a){this.rangeCharErrorText=a},getRangeCharErrorText:function(){return this.rangeCharErrorText},setRangeErrorText:function(a){this.rangeErrorText=a},getRangeErrorText:function(){return this.rangeErrorText}}),mini.regClass(mini.TextBox,"textbox"),mini.MoneyBox=function(){mini.MoneyBox.superclass.constructor.call(this)},mini.extend(mini.MoneyBox,mini.TextBox,{digit:2,minValue:NaN,maxValue:NaN,uiCls:"mini-moneybox",setText:function(a){a=this._formatText(this.value),(null===a||void 0===a)&&(a=""),this.text=a,this._textEl.value=a},setValue:function(a,b){(null===a||void 0===a)&&(a=""),a=String(a),a.length>this.maxLength&&(a=a.substring(0,this.maxLength)),this.value!==a&&(a=this._formatValue(a),this.value=a,this._valueEl.value=a,this.setText(a),this._doEmpty(),void 0===b&&(b=!0),b&&this._OnValueChanged())},_formatText:function(a){return mini.util.StringUtil.formatMoney(a,this.digit)},_formatValue:function(a){if(void 0==a||""==a||!a)return"";a=a.replace(/\,/g,"");var b=new Number(a);return isNaN(b)?"":(b=new Number(this._ValueLimit(a)),b=mini.util.MathUtil.toFixed(b,this.digit))},_ValueLimit:function(a){return isNaN(this.minValue)&&isNaN(this.maxValue)?a:this.minValue>this.maxValue?a:(!isNaN(this.minValue)&&a<this.minValue&&(a=this.minValue),!isNaN(this.maxValue)&&a>this.maxValue&&(a=this.maxValue),a)},getAttrs:function(a){var b=mini.MoneyBox.superclass.getAttrs.call(this,a);return mini._ParseInt(a,b,["digit","minValue","maxValue"]),b}}),mini.regClass(mini.MoneyBox,"moneybox"),mini=mini||{},mini.Password=function(){mini.Password.superclass.constructor.call(this)},mini.extend(mini.Password,mini.TextBox,{uiCls:"mini-password",_InputType:"password"}),mini.regClass(mini.Password,"password"),mini=mini||{},mini.PopupEdit=function(){mini.PopupEdit.superclass.constructor.call(this),this._createPopup(),this.el.className+=" mini-popupedit"},mini.extend(mini.PopupEdit,mini.ButtonEdit,{uiCls:"mini-popupedit",popup:null,popupCls:"mini-buttonedit-popup",_hoverCls:"mini-buttonedit-hover",_pressedCls:"mini-buttonedit-pressed",destroy:function(a){this.isShowPopup()&&this.hidePopup(),this.el&&(this.el.onmouseover=null,this.el.onmouseout=null),this._popupInner&&(this._popupInner.owner=null,this._popupInner=null),this.popup&&(mini.clearEvent(this.popup.el),mini.clearEvent(this.popup),this.popup.owner=null,this.popup.destroy(a),this.popup=null),this._clickTarget=null,mini.un(document,"mouseup",this.__OnDocMouseUp,this),mini.PopupEdit.superclass.destroy.call(this,a)},_initEvents:function(){mini.PopupEdit.superclass._initEvents.call(this),mini._BindEvents(function(){mini_onOne(this.el,"mouseover",this.__OnMouseOver,this),mini_onOne(this.el,"mouseout",this.__OnMouseOut,this)},this)},_initButtons:function(){this.buttons=[];var a=this.createButton({cls:"mini-buttonedit-popup",iconCls:"mini-buttonedit-icons-popup",name:"popup"});this.buttons.push(a)},__OnBlur:function(a){this._focused=!1,this._clickTarget&&mini.isAncestor(this.el,this._clickTarget)||this.isShowPopup()||mini.PopupEdit.superclass.__OnBlur.call(this,a)},__OnMouseOver:function(a){this.isReadOnly()||this.allowInput||mini.findParent(a.target,"mini-buttonedit-border")&&this.addCls(this._hoverCls)},__OnMouseOut:function(a){this.isReadOnly()||this.allowInput||this.removeCls(this._hoverCls)},__OnMouseDown:function(a){this.isReadOnly()||(mini.PopupEdit.superclass.__OnMouseDown.call(this,a),0==this.allowInput&&mini.findParent(a.target,"mini-buttonedit-border")&&(mini.addClass(this.el,this._pressedCls),mini.on(document,"mouseup",this.__OnDocMouseUp,this)))},__OnInputKeyDown:function(a){return this.fire("keydown",{htmlEvent:a}),8!=a.keyCode||!this.isReadOnly()&&0!=this.allowInput?9==a.keyCode?void this.hidePopup():27==a.keyCode?void this.hidePopup():(13==a.keyCode&&this.fire("enter"),void(this.isShowPopup()&&(13==a.keyCode||27==a.keyCode)&&a.stopPropagation())):!1},within:function(a){return mini.isAncestor(this.el,a.target)?!0:this.popup.within(a)?!0:!1},popupWidth:"100%",popupMinWidth:50,popupMaxWidth:2e3,popupHeight:"",popupMinHeight:100,popupMaxHeight:2e3,setPopup:function(a){"string"==typeof a&&(mini.parse(a),a=mini.get(a));var b=mini.getAndCreate(a);b&&(b.setVisible(!0),b.render(this.popup._contentEl),b.owner=this,b.on("beforebuttonclick",this.__OnPopupButtonClick,this))},getPopup:function(){return this.popup||this._createPopup(),this.popup},_createPopup:function(){this.popup=new mini.Popup,this.popup.setShowAction("none"),this.popup.setHideAction("outerclick"),this.popup.setPopupEl(this.el),this.popup.on("BeforeClose",this.__OnPopupBeforeClose,this),this.popup.on("close",this.__OnPopupClose,this),mini.on(this.popup.el,"keydown",this.__OnPopupKeyDown,this)},__OnPopupClose:function(a){},__OnPopupBeforeClose:function(a){this.within(a.htmlEvent)&&(a.cancel=!0)},__OnPopupKeyDown:function(a){},showPopup:function(){var a={cancel:!1};if(this.fire("beforeshowpopup",a),1==a.cancel)return!1;var b=this.getPopup();this._syncShowPopup(),b.on("Close",this.__OnPopupHide,this),this.fire("showpopup")},doLayout:function(){mini.PopupEdit.superclass.doLayout.call(this),this.isShowPopup()},_syncShowPopup:function(){var a=this.getPopup();this._popupInner&&this._popupInner.el.parentNode!=this.popup._contentEl&&(this.popup._contentEl.appendChild(this._popupInner.el),this._popupInner.setVisible(!0));var b=this.getBox(),c=this.popupWidth;this.popupWidth&&"string"==typeof this.popupWidth&&-1!=this.popupWidth.indexOf("%")&&(c=parseInt(b.width*this.popupWidth.substring(0,this.popupWidth.length-1)/100)),a.setWidth(c);var d=parseInt(this.popupHeight);isNaN(d)?a.setHeight("auto"):a.setHeight(d),a.setMinWidth(this.popupMinWidth),a.setMinHeight(this.popupMinHeight),a.setMaxWidth(this.popupMaxWidth),a.setMaxHeight(this.popupMaxHeight),a.showAtEl(this.el,{xAlign:"left",yAlign:"below",outYAlign:"above",outXAlign:"right",popupCls:this.popupCls})},__OnPopupHide:function(a){this.__doFocusCls(),this.fire("hidepopup")},hidePopup:function(){if(this.isShowPopup()){var a=this.getPopup();a.close()}},isShowPopup:function(){return this.popup&&this.popup.isDisplay()?!0:!1},setPopupWidth:function(a){this.popupWidth=a},setPopupMaxWidth:function(a){this.popupMaxWidth=a},setPopupMinWidth:function(a){this.popupMinWidth=a},getPopupWidth:function(a){return this.popupWidth},getPopupMaxWidth:function(a){return this.popupMaxWidth},getPopupMinWidth:function(a){return this.popupMinWidth},setPopupHeight:function(a){this.popupHeight=a},setPopupMaxHeight:function(a){this.popupMaxHeight=a},setPopupMinHeight:function(a){this.popupMinHeight=a},getPopupHeight:function(a){return this.popupHeight},getPopupMaxHeight:function(a){return this.popupMaxHeight},getPopupMinHeight:function(a){return this.popupMinHeight},__OnClick:function(a){if(!this.isReadOnly()){if(mini.isAncestor(this._buttonEl,a.target)&&this._OnButtonClick(a),mini.findParent(a.target,this._closeCls))return this.isShowPopup()&&this.hidePopup(),void this.fire("closeclick",{htmlEvent:a});if(0==this.allowInput||mini.isAncestor(this._buttonEl,a.target))if(this.isShowPopup())this.hidePopup();else{var b=this;setTimeout(function(){b.showPopup(),b.focus()},1)}}},__OnPopupButtonClick:function(a){"close"==a.name&&this.hidePopup(),a.cancel=!0},getAttrs:function(a){var b=mini.PopupEdit.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["popupWidth","popupHeight","popup","onshowpopup","onhidepopup","onbeforeshowpopup"]),mini._ParseInt(a,b,["popupMinWidth","popupMaxWidth","popupMinHeight","popupMaxHeight"]),b}}),mini.regClass(mini.PopupEdit,"popupedit"),mini.DatePicker=function(){mini.DatePicker.superclass.constructor.call(this),mini.addClass(this.el,"mini-datepicker"),this.on("validation",this.__OnValidation,this)},mini.extend(mini.DatePicker,mini.PopupEdit,{valueFormat:"",format:"yyyy-MM-dd",maxDate:null,minDate:null,popupWidth:"",viewDate:new Date,showTime:!1,timeFormat:"H:mm",showTodayButton:!0,showClearButton:!0,showOkButton:!1,uiCls:"mini-datepicker",_getCalendar:function(){var a=new mini.Calendar;return a.setStyle("border:0;"),a},_createPopup:function(){mini.DatePicker.superclass._createPopup.call(this),this._calendar=this._getCalendar()},__OnPopupClose:function(a){this._calendar&&this._calendar.hideMenu()},destroy:function(a){delete this._calendar,mini.DatePicker.superclass.destroy.call(this,a)},_monthPicker:!1,showPopup:function(){function a(){if(this._calendar.hideMenu(),this._calendar._target){var a=this._calendar._target;this._calendar.un("timechanged",a.__OnTimeChanged,a),this._calendar.un("dateclick",a.__OnDateClick,a),this._calendar.un("drawdate",a.__OnDrawDate,a)}this._calendar.on("timechanged",this.__OnTimeChanged,this),this._calendar.on("dateclick",this.__OnDateClick,this),this._calendar.on("drawdate",this.__OnDrawDate,this),this._calendar.endUpdate(),this._calendar._allowLayout=!0,this._calendar.doLayout(),this._calendar.focus(),this._calendar._target=this}if(this._calendar.beginUpdate(),this._calendar._allowLayout=!1,this._calendar.el.parentNode!=this.popup._contentEl&&this._calendar.render(this.popup._contentEl),this._calendar.set({monthPicker:this._monthPicker,showTime:this.showTime,timeFormat:this.timeFormat,showClearButton:this.showClearButton,showTodayButton:this.showTodayButton,showOkButton:this.showOkButton}),this._calendar.setValue(this.value),this.value?this._calendar.setViewDate(this.value):this._calendar.setViewDate(this.viewDate),mini.DatePicker.superclass.showPopup.call(this)!==!1){var b=this;a.call(b)}},hidePopup:function(){mini.DatePicker.superclass.hidePopup.call(this),this._calendar&&(this._calendar.un("timechanged",this.__OnTimeChanged,this),this._calendar.un("dateclick",this.__OnDateClick,this),this._calendar.un("drawdate",this.__OnDrawDate,this))},within:function(a){return mini.isAncestor(this.el,a.target)?!0:this._calendar.within(a)?!0:!1},__OnPopupKeyDown:function(a){13==a.keyCode&&this.__OnDateClick(),27==a.keyCode&&(this.hidePopup(),this.focus())},minDateErrorText:"",maxDateErrorText:"",__OnValidation:function(a){if(0!=a.isValid){var b=this.value;if(mini.isDate(b)){var c=mini.parseDate(this.maxDate),d=mini.parseDate(this.minDate),e=this.maxDateErrorText||mini.VTypes.maxDateErrorText,f=this.minDateErrorText||mini.VTypes.minDateErrorText;mini.isDate(c)&&b.getTime()>c.getTime()&&(a.isValid=!1,a.errorText=String.format(e,mini.formatDate(c,this.format))),mini.isDate(d)&&b.getTime()<d.getTime()&&(a.isValid=!1,a.errorText=String.format(f,mini.formatDate(d,this.format)))}}},__OnDrawDate:function(a){var b=a.date,c=mini.parseDate(this.maxDate),d=mini.parseDate(this.minDate);mini.isDate(c)&&b.getTime()>c.getTime()&&(a.allowSelect=!1),mini.isDate(d)&&b.getTime()<d.getTime()&&(a.allowSelect=!1),this.fire("drawdate",a)},__OnDateClick:function(a){if(!this.showOkButton||"ok"==a.action){var b=this._calendar.getValue();this.getFormValue("U");this.setValue(b),this.hidePopup(),this.focus()}},__OnTimeChanged:function(a){if(!this.showOkButton){var b=this._calendar.getValue();this.setValue(b)}},setFormat:function(a){"string"==typeof a&&this.format!=a&&(this.format=a,this._textEl.value=this._valueEl.value=this.getFormValue())},getFormat:function(){return this.format},setValueFormat:function(a){"string"==typeof a&&this.valueFormat!=a&&(this.valueFormat=a)},getValueFormat:function(){return this.valueFormat},setValue:function(a,b){a=mini.parseDate(a),mini.isNull(a)&&(a=""),mini.isDate(a)&&(a=new Date(a.getTime())),mini.isEquals(this.value,a)||(this.value=a,this.text=this._textEl.value=this._valueEl.value=this.getFormValue(),void 0===b&&(b=!0),b&&this._OnValueChanged())},nullValue:"",setNullValue:function(a){"null"==a&&(a=null),this.nullValue=a},getNullValue:function(){return this.nullValue},getValue:function(){if(!mini.isDate(this.value))return this.nullValue;var a=this.value;return this.valueFormat&&(a=mini.formatDate(a,this.valueFormat)),a},getFormValue:function(a){return mini.isDate(this.value)?(a=a||this.format,mini.formatDate(this.value,a)):""},setViewDate:function(a){a=mini.parseDate(a),mini.isDate(a)&&(this.viewDate=a)},getViewDate:function(){return this._calendar.getViewDate()},setShowTime:function(a){this.showTime!=a&&(this.showTime=a)},getShowTime:function(){return this.showTime},setTimeFormat:function(a){this.timeFormat!=a&&(this.timeFormat=a)},getTimeFormat:function(){return this.timeFormat},setShowTodayButton:function(a){this.showTodayButton=a},getShowTodayButton:function(){return this.showTodayButton},setShowClearButton:function(a){this.showClearButton=a},getShowClearButton:function(){return this.showClearButton},setShowOkButton:function(a){this.showOkButton=a},getShowOkButton:function(){return this.showOkButton},setMaxDate:function(a){this.maxDate=a},getMaxDate:function(){return this.maxDate},setMinDate:function(a){this.minDate=a},getMinDate:function(){return this.minDate},setMaxDateErrorText:function(a){this.maxDateErrorText=a},getMaxDateErrorText:function(){return this.maxDateErrorText},setMinDateErrorText:function(a){this.minDateErrorText=a},getMinDateErrorText:function(){return this.minDateErrorText},__OnInputTextChanged:function(a){var b=this._textEl.value,c=mini.parseDate(b);(!c||isNaN(c)||1970==c.getFullYear())&&(c=null);this.getFormValue("U");this.setValue(c),null==c&&(this._textEl.value="")},__OnInputKeyDown:function(a){var b={htmlEvent:a};if(this.fire("keydown",b),8==a.keyCode&&(this.isReadOnly()||0==this.allowInput))return!1;if(9==a.keyCode)return void(this.isShowPopup()&&this.hidePopup());if(!this.isReadOnly())switch(a.keyCode){case 27:a.preventDefault(),this.isShowPopup()&&a.stopPropagation(),this.hidePopup();break;case 9:case 13:if(this.isShowPopup())a.preventDefault(),a.stopPropagation(),this.hidePopup();else{this.__OnInputTextChanged(null);var c=this;setTimeout(function(){c.fire("enter",b)},10)}break;case 37:break;case 38:a.preventDefault();break;case 39:break;case 40:a.preventDefault(),this.showPopup()}},getAttrs:function(a){var b=mini.DatePicker.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["format","viewDate","timeFormat","ondrawdate","minDate","maxDate","valueFormat","nullValue","minDateErrorText","maxDateErrorText"]),mini._ParseBool(a,b,["showTime","showTodayButton","showClearButton","showOkButton"]),b}}),mini.regClass(mini.DatePicker,"datepicker"),mini.MonthPicker=function(){mini.MonthPicker.superclass.constructor.call(this)},mini.extend(mini.MonthPicker,mini.DatePicker,{uiCls:"mini-monthpicker",valueFormat:"",format:"yyyy-MM",_monthPicker:!0}),mini.regClass(mini.MonthPicker,"monthpicker"),mini.YearPicker=function(){mini.YearPicker.superclass.constructor.call(this),mini.addClass(this.el,"mini-datepicker"),this.on("validation",this.__OnValidation,this)},mini.extend(mini.YearPicker,mini.PopupEdit,{uiCls:"mini-yearpicker",popupWidth:"",_getCalendar:function(){if(!mini.YearPicker._Calendar){var a=mini.YearPicker._Calendar=new mini.CalendarYear;a.setStyle("border:0;")}return mini.YearPicker._Calendar},_createPopup:function(){mini.YearPicker.superclass._createPopup.call(this),this._calendar=this._getCalendar()},showPopup:function(){function a(){if(this._checkYear(this.value)?(this._calendar.setValue(this.value),this._calendar.updateYears()):(this._calendar.setValue(mini.formatDate(new Date,"yyyy")),this._calendar.updateYears()),this._calendar._target){var a=this._calendar._target;this._calendar.un("dateclick",a.__OnDateClick,a)}this._calendar.on("dateclick",this.__OnDateClick,this),this._calendar.endUpdate(),this._calendar._allowLayout=!0,this._calendar.focus(),this._calendar._target=this}if(this._calendar=this._getCalendar(),this._calendar.beginUpdate(),this._calendar._allowLayout=!1,this._calendar.el.parentNode!=this.popup._contentEl&&this._calendar.render(this.popup._contentEl),mini.YearPicker.superclass.showPopup.call(this)!==!1){var b=this;a.call(b)}},hidePopup:function(){mini.YearPicker.superclass.hidePopup.call(this),this._calendar.un("dateclick",this.__OnDateClick,this)},setValue:function(a){this.value!=a&&(this.value=a,this.text=this._textEl.value=this._valueEl.value=this.value,this._calendar.setValue(this.value),this._calendar.updateYears(),this._OnValueChanged())},__OnDateClick:function(a){if(!this.showOkButton||"ok"==a.action){var b=this._calendar.getValue();this.setValue(b),this.hidePopup(),this.focus()}},__OnValidation:function(a){0!=a.isValid&&""!=this.value&&(this._checkYear(this.value)||(a.isValid=!1,a.errorText="\u683c\u5f0f\u9519\u8bef"))},_checkYear:function(a){var b=/^[1-9]\d{3}$/;return b.test(a)}}),mini.regClass(mini.YearPicker,"yearpicker"),mini.ComboBox=function(){this.data=[],this.columns=[],mini.ComboBox.superclass.constructor.call(this);var a=this;isFirefox&&(this._textEl.oninput=function(){a._tryQuery()})},mini.extend(mini.ComboBox,mini.PopupEdit,{text:"",value:"",valueField:"id",textField:"text",delimiter:",",showColumns:!1,multiSelect:!1,data:[],url:"",columns:[],allowInput:!1,valueFromSelect:!1,popupMaxHeight:200,set:function(a){if("string"==typeof a)return this;var b=a.value;delete a.value;var c=a.url;delete a.url;var d=a.data;return delete a.data,a.onvaluechanged||(this.defaultValueTriggerChange=!1),mini.ComboBox.superclass.set.call(this,a),mini.isNull(d)||(this.setData(d),a.data=d),mini.isNull(c)||(this.setUrl(c),a.url=c),mini.isNull(b)||(this.setValue(b,this.defaultValueTriggerChange),a.value=b),this},uiCls:"mini-combobox",destroy:function(a){this._listbox&&(mini.clearEvent(this._listbox),this._listbox.destroy(a),this._listbox=null),delete this.data,delete this.columns,mini.ComboBox.superclass.destroy.call(this,a)},_createPopup:function(){mini.ComboBox.superclass._createPopup.call(this),this._listbox=new mini.ListBox,this._listbox.setBorderStyle("border:0;"),this._listbox.setStyle("width:100%;height:auto;"),this._listbox.render(this.popup._contentEl),this._listbox.on("itemclick",this.__OnItemClick,this),this._listbox.on("drawcell",this.__OnItemDrawCell,this);var a=this;this._listbox.on("beforeload",function(b){a.fire("beforeload",b)},this),this._listbox.on("load",function(b){a.fire("load",b)},this),this._listbox.on("loaderror",function(b){a.fire("loaderror",b)},this)},showPopup:function(){if(this._listbox.setHeight("auto"),mini.ComboBox.superclass.showPopup.call(this)!==!1){var a=this.popup.el.style.height;""==a||"auto"==a?this._listbox.setHeight("auto"):this._listbox.setHeight("100%"),this._listbox.setValue(this.value)}},select:function(a){this._listbox.deselectAll(),a=this.getItem(a),a&&(this._listbox.select(a),this.__OnItemClick(),this._listbox.setValue(""))},getItem:function(a){return"object"==typeof a?a:this.data[a]},indexOf:function(a){return this.data.indexOf(a)},getAt:function(a){return this.data[a]},load:function(a){"string"==typeof a?this.setUrl(a):this.setData(a)},setData:function(data){if("string"==typeof data&&(data=eval("("+data+")")),mini.isArray(data)||(data=[]),this._listbox.setData(mini.clone(data)),this.data=this._listbox.data,this.valueFromSelect)this.setValue(this.tempvalue,!1);else{var vts=this._listbox.getValueAndText(this.value);this.text=this._textEl.value=vts[1]}},getData:function(){return this.data},setUrl:function(a){this.getPopup(),this._listbox.setUrl(this.parseUrl(a)),this.url=this._listbox.url,this.data=this._listbox.data;var b=this._listbox.getValueAndText(this.value);this.text=this._textEl.value=b[1]},getUrl:function(){return this.url},setValueField:function(a){this.valueField=a,this._listbox&&this._listbox.setValueField(a)},getValueField:function(){return this.valueField},setTextField:function(a){this._listbox&&this._listbox.setTextField(a),this.textField=a},getTextField:function(){return this.textField},setShowColumns:function(a){this._listbox&&this._listbox.setShowColumns(a),this.showColumns=a},getShowColumns:function(){return this.showColumns},setDisplayField:function(a){this.setTextField(a)},setDataField:function(a){this._listbox&&this._listbox.setDataField(a),this.dataField=a},setValue:function(a,b){var c=this.value,d=this._listbox.getValueAndText(a);this.valueFromSelect?(this.value=d[0],this.tempvalue=a):this.value=a,this._valueEl.value=this.value,this.setText(d[1]),mini.isEquals(c,this.value)||(void 0===b&&(b=!0),b&&this._OnValueChanged())},setText:function(a){mini.isEquals(this.emptyText,a)?mini.ComboBox.superclass.setText.call(this,""):mini.ComboBox.superclass.setText.call(this,a)},setMultiSelect:function(a){this.multiSelect!=a&&(this.multiSelect=a,this._listbox&&(this._listbox.setMultiSelect(a),this._listbox.setShowCheckBox(a)))},getMultiSelect:function(){return this.multiSelect},setColumns:function(a){mini.isArray(a)||(a=[]),this.columns=a,this._listbox.setColumns(a)},getColumns:function(){return this.columns},showNullItem:!1,setShowNullItem:function(a){this.showNullItem!=a&&(this.showNullItem=a,this._listbox.setShowNullItem(a))},getShowNullItem:function(){return this.showNullItem},setNullItemText:function(a){this.nullItemText!=a&&(this.nullItemText=a,this.emptyText=a,this._listbox.setNullItemText(a))},getNullItemText:function(){return this.nullItemText},setValueFromSelect:function(a){this.valueFromSelect=a},getValueFromSelect:function(){return this.valueFromSelect},_OnValueChanged:function(){this.validateOnChanged&&this.validate();var a=this.getValue(),b=this.getSelecteds(),c=b[0],d=this;d.fire("valuechanged",{value:a,selecteds:b,selected:c})},getSelecteds:function(){return this._listbox.findItems(this.value)},getSelected:function(){return this.getSelecteds()[0]},__OnItemDrawCell:function(a){this.fire("drawcell",a)},__OnItemClick:function(a){var b=this._listbox.getSelecteds(),c=this._listbox.getValueAndText(b);this.getValue();this.setValue(c[0]),a&&(this.multiSelect||this.hidePopup(),this.focus(),this.fire("itemclick",{item:a.item}))},__OnInputKeyDown:function(a){if(this.fire("keydown",{htmlEvent:a}),8==a.keyCode&&(this.isReadOnly()||0==this.allowInput))return!1;if(9==a.keyCode)return void this.hidePopup();if(!this.isReadOnly())switch(a.keyCode){case 27:a.preventDefault(),this.isShowPopup()&&a.stopPropagation(),this.hidePopup();break;case 13:if(this.isShowPopup()){a.preventDefault(),a.stopPropagation();var b=this._listbox.getFocusedIndex();if(-1!=b){var c=this._listbox.getAt(b);this.multiSelect||(this._listbox.deselectAll(),this._listbox.select(c));var d=this._listbox.getSelecteds(),e=this._listbox.getValueAndText(d);this.setValue(e[0]),this.setText(e[1])}this.hidePopup()}else this.fire("enter");break;case 37:break;case 38:a.preventDefault();var b=this._listbox.getFocusedIndex();if(-1==b&&(b=0,!this.multiSelect)){var c=this._listbox.findItems(this.value)[0];c&&(b=this._listbox.indexOf(c))}this.isShowPopup()&&(this.multiSelect||(b-=1,0>b&&(b=0),this._listbox._focusItem(b,!0)));break;case 39:break;case 40:a.preventDefault();var b=this._listbox.getFocusedIndex();if(-1==b&&(b=0,!this.multiSelect)){var c=this._listbox.findItems(this.value)[0];c&&(b=this._listbox.indexOf(c))}this.isShowPopup()?this.multiSelect||(b+=1,b>this._listbox.getCount()-1&&(b=this._listbox.getCount()-1),this._listbox._focusItem(b,!0)):(this.showPopup(),this.multiSelect||this._listbox._focusItem(b,!0));break;default:this._tryQuery(this._textEl.value)}},__OnInputKeyUp:function(a){this.fire("keyup",{htmlEvent:a})},__OnInputKeyPress:function(a){this.fire("keypress",{htmlEvent:a})},_tryQuery:function(a){var b=this;setTimeout(function(){var c=b._textEl.value;c!=a&&b._doQuery(c)},10)},_doQuery:function(a){if(1!=this.multiSelect){for(var b=[],c=0,d=this.data.length;d>c;c++){var e=this.data[c],f=mini._getMap(this.textField,e),g=mini._getMap(this.valueField,e);"string"==typeof f&&(f=f.toUpperCase(),g=g.toUpperCase(),a=a.toUpperCase(),(-1!=f.indexOf(a)||-1!=g.indexOf(a))&&b.push(e))}if(this._listbox.setData(b),this._filtered=!0,""!==a||this.isShowPopup()){this.showPopup();var h=0;this._listbox.getShowNullItem()&&(h=1);var i=this;i._listbox._focusItem(h,!0)}}},__OnPopupHide:function(a){this._filtered&&(this._filtered=!1,this._listbox.el&&this._listbox.setData(this.data)),this.fire("hidepopup")},findItems:function(a){return this._listbox.findItems(a)},__OnInputTextChanged:function(a){if(0==this.multiSelect){for(var b=this._textEl.value,c=this.getData(),d=null,e=0,f=c.length;f>e;e++){var g=c[e],h=g[this.textField];if(h==b){d=g;break}}if(d){this._listbox.setValue(d?d[this.valueField]:"");var i=this._listbox.getValue(),j=this._listbox.getValueAndText(i);this.getValue();this.setValue(i),this.setText(j[1])}else this.valueFromSelect?(this.setValue(""),this.setText("")):(this.setValue(b),this.setText(b))}},getAttrs:function(a){var b=mini.ComboBox.superclass.getAttrs.call(this,a);mini._ParseString(a,b,["url","data","textField","valueField","displayField","nullItemText","ondrawcell","onbeforeload","onload","onloaderror","onitemclick"]),mini._ParseBool(a,b,["multiSelect","showNullItem","valueFromSelect","showColumns"]),b.displayField&&(b.textField=b.displayField);var c=b.valueField||this.valueField,d=b.textField||this.textField;if("select"==a.nodeName.toLowerCase()){for(var e=[],f=0,g=a.length;g>f;f++){var h=a.options[f],i={};i[d]=h.text,i[c]=h.value,e.push(i)}e.length>0&&(b.data=e)}else for(var j=mini.getChildNodes(a),f=0,g=j.length;g>f;f++){var k=j[f],l=jQuery(k).attr("property");l&&(l=l.toLowerCase(),"columns"==l?b.columns=mini._ParseColumns(k):"data"==l&&(b.data=k.innerHTML))}return b}}),mini.regClass(mini.ComboBox,"combobox"),mini.AutoComplete=function(){mini.AutoComplete.superclass.constructor.call(this);var a=this;a._ValueChangeTimer=null,this._buttonEl.style.display="none",this._doInputLayout()},mini.extend(mini.AutoComplete,mini.ComboBox,{url:"",allowInput:!0,delay:150,searchField:"key",minChars:0,_buttonWidth:0,uiCls:"mini-autocomplete",_initInputEvents:function(){mini.AutoComplete.superclass._initInputEvents.call(this),mini.on(this._textEl,"paste",this.__OnPaste,this)},setUrl:function(a){this.url=this.parseUrl(a)},setValue:function(a){mini.isNull(a)&&(a="");var b=this.value;if(this.value=a,!mini.isEquals(b,this.value)){this.value=a,this._valueEl.value=this.value;var c=this._listbox.getValueAndText(a);c[0]&&c[1]&&this.setText(c[1]),this._OnValueChanged()}},setText:function(a){mini.isNull(a)&&(a=""),this.text!=a&&(this.text=a,this._LastInputText=a),this._textEl.value=this.text},__OnPaste:function(a){this._tryQuery(this._textEl.value)},__OnItemClick:function(a){var b=this._listbox.getSelecteds(),c=this._listbox.getValueAndText(b);this.getValue();this.setValue(c[0]),this.setText(c[1]),a&&(this.multiSelect||this.hidePopup(),this.focus(),this.fire("itemclick",{item:a.item}))},setMinChars:function(a){this.minChars=a},getMinChars:function(){return this.minChars},setSearchField:function(a){this.searchField=a},getSearchField:function(){return this.searchField},popupLoadingText:"<span class='mini-textboxlist-popup-loading'>\u52a0\u8f7d\u4e2d...</span>",popupErrorText:"<span class='mini-textboxlist-popup-error'>\u7a0b\u5e8f\u51fa\u9519</span>",popupEmptyText:"<span class='mini-textboxlist-popup-noresult'>\u65e0\u8bb0\u5f55</span>",showPopup:function(a){var b=(this.getPopup(),this._listbox);b.showEmpty=!0,b.emptyText=this.popupEmptyText,"loading"==a?(b.emptyText=this.popupLoadingText,this._listbox.setData([])):"error"==a&&(b.emptyText=this.popupLoadingText,this._listbox.setData([])),this._listbox.doUpdate(),mini.AutoComplete.superclass.showPopup.call(this)},__OnInputKeyDown:function(a){if(this.fire("keydown",{htmlEvent:a}),8==a.keyCode&&(this.isReadOnly()||0==this.allowInput))return!1;if(9==a.keyCode)return void this.hidePopup();if(!this.isReadOnly())switch(a.keyCode){case 17:break;case 27:this.isShowPopup()&&a.stopPropagation(),this.hidePopup();break;case 13:if(this.isShowPopup()){a.preventDefault(),a.stopPropagation();var b=this._listbox.getFocusedIndex();if(-1!=b){var c=this._listbox.getAt(b),d=this._listbox.getValueAndText([c]),e=d[0];this.setText(d[1]),mini.isFirefox&&(this.blur(),this.focus()),this.setValue(e,!1),this.hidePopup()}}else this.fire("enter");break;case 37:break;case 38:var b=this._listbox.getFocusedIndex();if(-1==b&&(b=0,!this.multiSelect)){var c=this._listbox.findItems(this.value)[0];c&&(b=this._listbox.indexOf(c))}this.isShowPopup()&&(this.multiSelect||(b-=1,0>b&&(b=0),this._listbox._focusItem(b,!0)));break;case 39:break;case 40:var b=this._listbox.getFocusedIndex();this.isShowPopup()?this.multiSelect||(b+=1,b>this._listbox.getCount()-1&&(b=this._listbox.getCount()-1),this._listbox._focusItem(b,!0)):this._tryQuery(this._textEl.value);break;case 91:break;default:this._tryQuery(this._textEl.value)}},doQuery:function(){this._tryQuery()},_tryQuery:function(a){var b=this;
this._queryTimer&&(clearTimeout(this._queryTimer),this._queryTimer=null),this._queryTimer=setTimeout(function(){var a=b._textEl.value;b._doQuery(a)},this.delay),this.showPopup("loading")},_doQuery:function(a){if(this.url){this._ajaxer&&this._ajaxer.abort();var b=this.url,c="post";b&&(-1!=b.indexOf(".txt")||-1!=b.indexOf(".json"))&&(c="get");var d={};d[this.searchField]=a;var e={url:b,async:!0,params:d,data:d,type:c,cache:!1,cancel:!1};if(this.fire("beforeload",e),e.data!=e.params&&e.params!=d&&(e.data=e.params),!e.cancel){var f=sf=this;mini.copyTo(e,{success:function(a){try{var b=mini.decode(a)}catch(c){throw new Error("autocomplete json is error")}sf.dataField&&(b=mini._getMap(sf.dataField,b)),b||(b=[]),f._listbox.setData(b),f.showPopup(),f._listbox._focusItem(0,!0),f.data=b,f.fire("load",{data:b})},error:function(a,b,c){f.showPopup("error")}}),this._ajaxer=mini.ajax(e)}}},getAttrs:function(a){var b=mini.AutoComplete.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["searchField"]),b}}),mini.regClass(mini.AutoComplete,"autocomplete"),mini.Lookup=function(){this.data=[],mini.Lookup.superclass.constructor.call(this),mini.on(this._textEl,"mouseup",this.__OnMouseUp,this),this.on("showpopup",this.__OnShowPopup,this)},mini.extend(mini.Lookup,mini.PopupEdit,{allowInput:!0,valueField:"id",textField:"text",delimiter:",",multiSelect:!1,data:[],grid:null,uiCls:"mini-lookup",destroy:function(a){this.grid&&(this.grid.un("rowclick",this.__OnGridRowClickChanged,this),this.grid.un("load",this.__OnGridLoad,this),this.grid=null),mini.Lookup.superclass.destroy.call(this,a)},setMultiSelect:function(a){this.multiSelect=a,this.grid&&this.grid.setMultiSelect(a)},setGrid:function(a){"string"==typeof a&&(mini.parse(a),a=mini.get(a)),this.grid=mini.getAndCreate(a),this.grid&&(this.grid.setMultiSelect(this.multiSelect),this.grid.setCheckSelectOnLoad(!1),this.grid.on("rowclick",this.__OnGridRowClickChanged,this),this.grid.on("load",this.__OnGridLoad,this),this.grid.on("checkall",this.__OnGridRowClickChanged,this))},getGrid:function(){return this.grid},setValueField:function(a){this.valueField=a},getValueField:function(){return this.valueField},setTextField:function(a){this.textField=a},getTextField:function(){return this.textField},deselectAll:function(){this.data=[],this.setValue(""),this.setText(""),this.grid&&this.grid.deselectAll()},getItemValue:function(a){return String(a[this.valueField])},getItemText:function(a){var b=a[this.textField];return mini.isNull(b)?"":String(b)},getValueAndText:function(a){mini.isNull(a)&&(a=[]);for(var b=[],c=[],d=0,e=a.length;e>d;d++){var f=a[d];f&&(b.push(this.getItemValue(f)),c.push(this.getItemText(f)))}return[b.join(this.delimiter),c.join(this.delimiter)]},_createData:function(){"string"!=typeof this.value&&(this.value=""),"string"!=typeof this.text&&(this.text="");var a=[],b=this.value.split(this.delimiter),c=this.text.split(this.delimiter),d=b.length;if(this.value)for(var e=0,f=d;f>e;e++){var g={},h=b[e],i=c[e];g[this.valueField]=h?h:"",g[this.textField]=i?i:"",a.push(g)}this.data=a},_getValueMaps:function(a){for(var b={},c=0,d=a.length;d>c;c++){var e=a[c],f=e[this.valueField];b[f]=e}return b},setValue:function(a){mini.Lookup.superclass.setValue.call(this,a),this._createData()},setText:function(a){mini.Lookup.superclass.setText.call(this,a),this._createData()},__OnGridRowClickChanged:function(a){var b=this._getValueMaps(this.grid.getData()),c=this._getValueMaps(this.grid.getSelecteds()),d=this._getValueMaps(this.data);0==this.multiSelect&&(d={},this.data=[]);var e={};for(var f in d){var g=d[f];b[f]&&(c[f]||(e[f]=g))}for(var h=this.data.length-1;h>=0;h--){var g=this.data[h],f=g[this.valueField];e[f]&&this.data.removeAt(h)}for(var f in c){var g=c[f];d[f]||this.data.push(g)}var i=this.getValueAndText(this.data);this.setValue(i[0]),this.setText(i[1]),this._OnValueChanged()},__OnGridLoad:function(a){this.__OnShowPopup(a)},__OnShowPopup:function(a){for(var b=String(this.value).split(this.delimiter),c={},d=0,e=b.length;e>d;d++){var f=b[d];c[f]=1}for(var g=this.grid.getData(),h=[],d=0,e=g.length;e>d;d++){var i=g[d],j=i[this.valueField];c[j]&&h.push(i)}this.grid.selects(h)},doUpdate:function(){mini.Lookup.superclass.doUpdate.call(this),this._textEl.readOnly=!0,this.el.style.cursor="default"},__OnInputKeyDown:function(a){switch(mini.Lookup.superclass.__OnInputKeyDown.call(this,a),a.keyCode){case 46:case 8:break;case 37:break;case 39:}},__OnMouseUp:function(a){if(!this.isReadOnly()){var b=mini.getSelectRange(this._textEl),c=b[0];b[1],this._findTextIndex(c)}},_findTextIndex:function(a){var b=-1;if(""==this.text)return b;for(var c=String(this.text).split(this.delimiter),d=0,e=0,f=c.length;f>e;e++){var g=c[e];if(a>d&&a<=d+g.length){b=e;break}d=d+g.length+1}return b},getAttrs:function(a){var b=mini.Lookup.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["grid","valueField","textField"]),mini._ParseBool(a,b,["multiSelect"]),b}}),mini.regClass(mini.Lookup,"lookup"),mini.Pager=function(){mini.Pager.superclass.constructor.call(this)},mini.extend(mini.Pager,mini.Control,{pageIndex:0,pageSize:10,totalCount:0,totalPage:0,showPageIndex:!0,showPageSize:!0,showTotalCount:!0,showPageInfo:!0,showReloadButton:!0,_clearBorder:!1,showButtonText:!1,showButtonIcon:!0,firstText:"\u9996\u9875",prevText:"\u4e0a\u4e00\u9875",nextText:"\u4e0b\u4e00\u9875",lastText:"\u5c3e\u9875",pageInfoText:"\u6bcf\u9875 {0} \u6761, \u5171 {1} \u6761",sizeList:[10,20,50,100],uiCls:"mini-pager",_create:function(){this.el=document.createElement("div"),this.el.className="mini-pager";var a='<div class="mini-pager-left"></div><div class="mini-pager-right"></div>';this.el.innerHTML=a,this.buttonsEl=this._leftEl=this.el.childNodes[0],this._rightEl=this.el.childNodes[1],this.sizeEl=mini.append(this.buttonsEl,'<span class="mini-pager-size"></span>'),this.sizeCombo=new mini.ComboBox,this.sizeCombo.setName("pagesize"),this.sizeCombo.setWidth(48),this.sizeCombo.render(this.sizeEl),mini.append(this.sizeEl,'<span class="separator"></span>'),this.firstButton=new mini.Button,this.firstButton.render(this.buttonsEl),this.prevButton=new mini.Button,this.prevButton.render(this.buttonsEl),this.indexEl=document.createElement("span"),this.indexEl.className="mini-pager-index",this.indexEl.innerHTML='<input id="" type="text" class="mini-pager-num"/><span class="mini-pager-pages">/ 0</span>',this.buttonsEl.appendChild(this.indexEl),this.numInput=this.indexEl.firstChild,this.pagesLabel=this.indexEl.lastChild,this.nextButton=new mini.Button,this.nextButton.render(this.buttonsEl),this.lastButton=new mini.Button,this.lastButton.render(this.buttonsEl),mini.append(this.buttonsEl,'<span class="separator"></span>'),this.reloadButton=new mini.Button,this.reloadButton.render(this.buttonsEl),this.firstButton.setPlain(!0),this.prevButton.setPlain(!0),this.nextButton.setPlain(!0),this.lastButton.setPlain(!0),this.reloadButton.setPlain(!0),this.update()},destroy:function(a){this.pageSelect&&(mini.clearEvent(this.pageSelect),this.pageSelect=null),this.sizeCombo&&(mini.clearEvent(this.sizeCombo),this.sizeCombo.destroy(a),this.sizeCombo=null),this.sizeEl&&(mini.clearEvent(this.sizeEl),this.buttonsEl.removeChild(this.sizeEl),this.sizeEl=null),this.firstButton&&(mini.clearEvent(this.firstButton),this.firstButton.destroy(a),this.firstButton=null),this.prevButton&&(mini.clearEvent(this.prevButton),this.prevButton.destroy(a),this.prevButton=null),this.numInput&&(mini.clearEvent(this.numInput),this.indexEl.removeChild(this.numInput),this.numInput=null),this.pagesLabel&&(mini.clearEvent(this.pagesLabel),this.indexEl.removeChild(this.pagesLabel),this.pagesLabel=null),this.indexEl&&(mini.clearEvent(this.indexEl),this.buttonsEl.removeChild(this.indexEl),this.indexEl=null),this.nextButton&&(mini.clearEvent(this.nextButton),this.nextButton.destroy(a),this.nextButton=null),this.lastButton&&(mini.clearEvent(this.lastButton),this.lastButton.destroy(a),this.lastButton=null),this.reloadButton&&(mini.clearEvent(this.reloadButton),this.reloadButton.destroy(a),this.reloadButton=null),this.buttonsEl&&(mini.clearEvent(this.buttonsEl),this.el.removeChild(this.buttonsEl),this.buttonsEl=null,this._leftEl=null),this._rightEl&&(mini.clearEvent(this._rightEl),this.el.removeChild(this._rightEl),this._rightEl=null),mini.Pager.superclass.destroy.call(this,a)},_initEvents:function(){function a(){if(!b){b=!0;var a=parseInt(this.numInput.value);isNaN(a)?this.update():this._OnPageChanged(a-1),setTimeout(function(){b=!1},100)}}mini.Pager.superclass._initEvents.call(this),this.firstButton.on("click",function(a){this._OnPageChanged(0)},this),this.prevButton.on("click",function(a){this._OnPageChanged(this.pageIndex-1)},this),this.nextButton.on("click",function(a){this._OnPageChanged(this.pageIndex+1)},this),this.lastButton.on("click",function(a){this._OnPageChanged(this.totalPage)},this),this.reloadButton.on("click",function(a){this._OnPageChanged()},this);var b=!1;mini.on(this.numInput,"change",function(b){a.call(this)},this),mini.on(this.numInput,"keydown",function(b){13==b.keyCode&&(a.call(this),b.stopPropagation())},this),this.sizeCombo.on("valuechanged",this.__OnPageSelectChanged,this)},doLayout:function(){this.canLayout()&&(mini.layout(this._leftEl),mini.layout(this._rightEl))},setPageIndex:function(a){isNaN(a)||(this.pageIndex=a,this.update())},getPageIndex:function(){return this.pageIndex},setPageSize:function(a){isNaN(a)||(this.pageSize=a,this.update())},getPageSize:function(){return this.pageSize},setTotalCount:function(a){a=parseInt(a),isNaN(a)||(this.totalCount=a,this.update())},getTotalCount:function(){return this.totalCount},setSizeList:function(a){mini.isArray(a)&&(this.sizeList=a,this.update())},getSizeList:function(){return this.sizeList},setShowPageSize:function(a){this.showPageSize=a,this.update()},getShowPageSize:function(){return this.showPageSize},setShowPageIndex:function(a){this.showPageIndex=a,this.update()},getShowPageIndex:function(){return this.showPageIndex},setShowTotalCount:function(a){this.showTotalCount=a,this.update()},getShowTotalCount:function(){return this.showTotalCount},setShowPageInfo:function(a){this.showPageInfo=a,this.update()},getShowPageInfo:function(){return this.showPageInfo},setShowReloadButton:function(a){this.showReloadButton=a,this.update()},getShowReloadButton:function(){return this.showReloadButton},getTotalPage:function(){return this.totalPage},update:function(a,b,c){mini.isNumber(a)&&(this.pageIndex=parseInt(a)),mini.isNumber(b)&&(this.pageSize=parseInt(b)),mini.isNumber(c)&&(this.totalCount=parseInt(c)),this.totalPage=parseInt(this.totalCount/this.pageSize)+1,(this.totalPage-1)*this.pageSize==this.totalCount&&(this.totalPage-=1),0==this.totalCount&&(this.totalPage=0),this.pageIndex>this.totalPage-1&&(this.pageIndex=this.totalPage-1),this.pageIndex<=0&&(this.pageIndex=0),this.totalPage<=0&&(this.totalPage=0),this.firstButton.enable(),this.prevButton.enable(),this.nextButton.enable(),this.lastButton.enable(),0==this.pageIndex&&(this.firstButton.disable(),this.prevButton.disable()),this.pageIndex>=this.totalPage-1&&(this.nextButton.disable(),this.lastButton.disable()),this.numInput.value=this.pageIndex>-1?this.pageIndex+1:0,this.pagesLabel.innerHTML="/ "+this.totalPage;var d=this.sizeList.clone();-1==d.indexOf(this.pageSize)&&(d.push(this.pageSize),d=d.sort(function(a,b){return a>b}));for(var e=[],f=0,g=d.length;g>f;f++){var h=d[f],i={};i.text=h,i.id=h,e.push(i)}this.sizeCombo.setData(e),this.sizeCombo.setValue(this.pageSize);var j=this.firstText,k=this.prevText,l=this.nextText,m=this.lastText;0==this.showButtonText&&(j=k=l=m=""),this.firstButton.setText(j),this.prevButton.setText(k),this.nextButton.setText(l),this.lastButton.setText(m);var j=this.firstText,k=this.prevText,l=this.nextText,m=this.lastText;1==this.showButtonText&&(j=k=l=m=""),this.firstButton.setTooltip(j),this.prevButton.setTooltip(k),this.nextButton.setTooltip(l),this.lastButton.setTooltip(m),this.firstButton.setIconCls(this.showButtonIcon?"mini-pager-first":""),this.prevButton.setIconCls(this.showButtonIcon?"mini-pager-prev":""),this.nextButton.setIconCls(this.showButtonIcon?"mini-pager-next":""),this.lastButton.setIconCls(this.showButtonIcon?"mini-pager-last":""),this.reloadButton.setIconCls(this.showButtonIcon?"mini-pager-reload":""),this.reloadButton.setVisible(this.showReloadButton);var n=this.reloadButton.el.previousSibling;n&&(n.style.display=this.showReloadButton?"":"none"),this._rightEl.innerHTML=String.format(this.pageInfoText,this.pageSize,this.totalCount),this.indexEl.style.display=this.showPageIndex?"":"none",this.sizeEl.style.display=this.showPageSize?"":"none",this._rightEl.style.display=this.showPageInfo?"":"none"},__OnPageSelectChanged:function(a){var b=parseInt(this.sizeCombo.getValue());this._OnPageChanged(0,b)},_OnPageChanged:function(a,b){var c={pageIndex:mini.isNumber(a)?a:this.pageIndex,pageSize:mini.isNumber(b)?b:this.pageSize,totalCount:this.totalCount,cancel:!1,isreload:void 0===a&&void 0===b};c.pageIndex>this.totalPage-1&&(c.pageIndex=this.totalPage-1),c.pageIndex<0&&(c.pageIndex=0),this.fire("beforepagechanged",c),1!=c.cancel&&(this.fire("pagechanged",c),this.update(c.pageIndex,c.pageSize))},onPageChanged:function(a,b){this.on("pagechanged",a,b)},getAttrs:function(el){var attrs=mini.Pager.superclass.getAttrs.call(this,el);return mini._ParseString(el,attrs,["onpagechanged","sizeList","onbeforepagechanged"]),mini._ParseBool(el,attrs,["showPageIndex","showPageSize","showTotalCount","showPageInfo","showReloadButton","showButtonText","showButtonIcon"]),mini._ParseInt(el,attrs,["pageIndex","pageSize","totalCount"]),"string"==typeof attrs.sizeList&&(attrs.sizeList=eval(attrs.sizeList)),attrs}}),mini.regClass(mini.Pager,"pager"),mini.PagerNoTotal=function(){mini.PagerNoTotal.superclass.constructor.call(this)},mini.extend(mini.PagerNoTotal,mini.Control,{pageIndex:0,pageSize:10,showPageIndex:!0,showPageSize:!0,showReloadButton:!0,_clearBorder:!1,showButtonText:!1,showButtonIcon:!0,firstText:"\u9996\u9875",prevText:"\u4e0a\u4e00\u9875",nextText:"\u4e0b\u4e00\u9875",sizeList:[10,20,50,100],uiCls:"mini-pagernototal",_create:function(){this.el=document.createElement("div"),this.el.className="mini-pager";var a='<div class="mini-pager-left"></div>';this.el.innerHTML=a,this.buttonsEl=this._leftEl=this.el.childNodes[0],this.sizeEl=mini.append(this.buttonsEl,'<span class="mini-pager-size"></span>'),this.sizeCombo=new mini.ComboBox,this.sizeCombo.setName("pagesize"),this.sizeCombo.setWidth(48),this.sizeCombo.render(this.sizeEl),mini.append(this.sizeEl,'<span class="separator"></span>'),this.firstButton=new mini.Button,this.firstButton.render(this.buttonsEl),this.prevButton=new mini.Button,this.prevButton.render(this.buttonsEl),this.indexEl=document.createElement("span"),this.indexEl.className="mini-pager-index",this.indexEl.innerHTML='<input id="" type="text" class="mini-pager-num"/>',this.buttonsEl.appendChild(this.indexEl),this.numInput=this.indexEl.firstChild,this.nextButton=new mini.Button,this.nextButton.render(this.buttonsEl),mini.append(this.buttonsEl,'<span class="separator"></span>'),this.reloadButton=new mini.Button,this.reloadButton.render(this.buttonsEl),this.firstButton.setPlain(!0),this.prevButton.setPlain(!0),this.nextButton.setPlain(!0),this.reloadButton.setPlain(!0),this.update()},destroy:function(a){this.pageSelect&&(mini.clearEvent(this.pageSelect),this.pageSelect=null),this.sizeCombo&&(mini.clearEvent(this.sizeCombo),this.sizeCombo.destroy(a),this.sizeCombo=null),this.sizeEl&&(mini.clearEvent(this.sizeEl),this.buttonsEl.removeChild(this.sizeEl),this.sizeEl=null),this.firstButton&&(mini.clearEvent(this.firstButton),this.firstButton.destroy(a),this.firstButton=null),this.prevButton&&(mini.clearEvent(this.prevButton),this.prevButton.destroy(a),this.prevButton=null),this.numInput&&(mini.clearEvent(this.numInput),this.indexEl.removeChild(this.numInput),this.numInput=null),this.indexEl&&(mini.clearEvent(this.indexEl),this.buttonsEl.removeChild(this.indexEl),this.indexEl=null),this.nextButton&&(mini.clearEvent(this.nextButton),this.nextButton.destroy(a),this.nextButton=null),this.reloadButton&&(mini.clearEvent(this.reloadButton),this.reloadButton.destroy(a),this.reloadButton=null),this.buttonsEl&&(mini.clearEvent(this.buttonsEl),this.el.removeChild(this.buttonsEl),this.buttonsEl=null,this._leftEl=null),mini.Pager.superclass.destroy.call(this,a)},_initEvents:function(){function a(){if(!b){b=!0;var a=parseInt(this.numInput.value);isNaN(a)?this.update():this._OnPageChanged(a-1),setTimeout(function(){b=!1},100)}}mini.Pager.superclass._initEvents.call(this),this.firstButton.on("click",function(a){this._OnPageChanged(0)},this),this.prevButton.on("click",function(a){this._OnPageChanged(this.pageIndex-1)},this),this.nextButton.on("click",function(a){this._OnPageChanged(this.pageIndex+1)},this),this.reloadButton.on("click",function(a){this._OnPageChanged()},this);var b=!1;mini.on(this.numInput,"change",function(b){a.call(this)},this),mini.on(this.numInput,"keydown",function(b){13==b.keyCode&&(a.call(this),b.stopPropagation())},this),this.sizeCombo.on("valuechanged",this.__OnPageSelectChanged,this)},doLayout:function(){this.canLayout()&&mini.layout(this._leftEl)},setPageIndex:function(a){isNaN(a)||(this.pageIndex=a,this.update())},getPageIndex:function(){return this.pageIndex},setPageSize:function(a){isNaN(a)||(this.pageSize=a,this.update())},getPageSize:function(){return this.pageSize},setSizeList:function(a){mini.isArray(a)&&(this.sizeList=a,this.update())},getSizeList:function(){return this.sizeList},setShowPageSize:function(a){this.showPageSize=a,this.update()},getShowPageSize:function(){return this.showPageSize},setShowPageIndex:function(a){this.showPageIndex=a,this.update()},getShowPageIndex:function(){return this.showPageIndex},setShowTotalCount:function(a){this.showTotalCount=a,this.update()},getShowTotalCount:function(){return this.showTotalCount},setShowPageInfo:function(a){this.showPageInfo=a,this.update()},getShowPageInfo:function(){return this.showPageInfo},setShowReloadButton:function(a){this.showReloadButton=a,this.update()},getShowReloadButton:function(){return this.showReloadButton},getTotalPage:function(){return this.totalPage},update:function(a,b,c){mini.isNumber(a)&&(this.pageIndex=parseInt(a)),mini.isNumber(b)&&(this.pageSize=parseInt(b)),mini.isNumber(c)&&(this.totalCount=parseInt(c)),this.pageIndex<=0&&(this.pageIndex=0),this.firstButton.enable(),this.prevButton.enable(),this.nextButton.enable(),0==this.pageIndex&&(this.firstButton.disable(),this.prevButton.disable()),this.totalCount<this.pageSize&&this.nextButton.disable(),this.numInput.value=this.pageIndex>-1?this.pageIndex+1:0;var d=this.sizeList.clone();-1==d.indexOf(this.pageSize)&&(d.push(this.pageSize),d=d.sort(function(a,b){return a>b}));for(var e=[],f=0,g=d.length;g>f;f++){var h=d[f],i={};i.text=h,i.id=h,e.push(i)}this.sizeCombo.setData(e),this.sizeCombo.setValue(this.pageSize);var j=this.firstText,k=this.prevText,l=this.nextText,m=this.lastText;0==this.showButtonText&&(j=k=l=m=""),this.firstButton.setText(j),this.prevButton.setText(k),this.nextButton.setText(l);var j=this.firstText,k=this.prevText,l=this.nextText;1==this.showButtonText&&(j=k=l=""),this.firstButton.setTooltip(j),this.prevButton.setTooltip(k),this.nextButton.setTooltip(l),this.firstButton.setIconCls(this.showButtonIcon?"mini-pager-first":""),this.prevButton.setIconCls(this.showButtonIcon?"mini-pager-prev":""),this.nextButton.setIconCls(this.showButtonIcon?"mini-pager-next":""),this.reloadButton.setIconCls(this.showButtonIcon?"mini-pager-reload":""),this.reloadButton.setVisible(this.showReloadButton);var n=this.reloadButton.el.previousSibling;n&&(n.style.display=this.showReloadButton?"":"none"),this.indexEl.style.display=this.showPageIndex?"":"none",this.sizeEl.style.display=this.showPageSize?"":"none"},__OnPageSelectChanged:function(a){var b=parseInt(this.sizeCombo.getValue());this._OnPageChanged(0,b)},_OnPageChanged:function(a,b){var c={pageIndex:mini.isNumber(a)?a:this.pageIndex,pageSize:mini.isNumber(b)?b:this.pageSize,cancel:!1,isreload:void 0===a&&void 0===b};c.pageIndex<0&&(c.pageIndex=0),this.fire("beforepagechanged",c),1!=c.cancel&&(this.fire("pagechanged",c),this.update(c.pageIndex,c.pageSize))},onPageChanged:function(a,b){this.on("pagechanged",a,b)},getAttrs:function(el){var attrs=mini.Pager.superclass.getAttrs.call(this,el);return mini._ParseString(el,attrs,["onpagechanged","sizeList","onbeforepagechanged"]),mini._ParseBool(el,attrs,["showPageIndex","showPageSize","showReloadButton"]),mini._ParseInt(el,attrs,["pageIndex","pageSize"]),"string"==typeof attrs.sizeList&&(attrs.sizeList=eval(attrs.sizeList)),attrs}}),mini.regClass(mini.PagerNoTotal,"pagernototal"),mini.DataGrid=function(){this.data=[],this._idRows={},this._removes=[],this._originals={},this.columns=[],this._bottomColumns=[],this._idColumns={},this._nameColumns={},this._selecteds=[],this._idSelecteds={},this._cellErrors=[],this._cellMapErrors={},mini.DataGrid.superclass.constructor.call(this),this.doUpdate();var a=this;setTimeout(function(){a.autoLoad&&a.reload()},1)},mini.DataGrid.RowID=0,mini.DataGrid.ColumnID=0,mini.extend(mini.DataGrid,mini.Control,{_displayStyle:"block",width:300,height:"auto",onlyCheckSelection:!1,allowCellValid:!1,cellEditAction:"cellclick",showEmptyText:!1,dataLoaded:!1,loadErrorAlert:!0,emptyText:"No data returned.",showModified:!0,dependMerge:!1,minWidth:300,minHeight:150,maxWidth:5e3,maxHeight:3e3,_viewRegion:null,_virtualRows:50,virtualScroll:!1,allowCellWrap:!1,allowHeaderWrap:!1,showColumnsMenu:!1,bodyCls:"",bodyStyle:"",footerCls:"",footerStyle:"",pagerCls:"",pagerStyle:"",idField:"id",data:[],columns:null,allowResize:!1,selectOnLoad:!1,_rowIdField:"_uid",columnWidth:120,columnMinWidth:20,columnMaxWidth:2e3,fitColumns:!0,autoHideRowDetail:!0,showHeader:!0,showFooter:!0,showTop:!1,showHGridLines:!0,showVGridLines:!0,showFilterRow:!1,showSummaryRow:!1,sortMode:"server",allowSortColumn:!0,allowMoveColumn:!0,allowResizeColumn:!0,enableHotTrack:!0,allowRowSelect:!0,multiSelect:!1,allowAlternating:!1,_alternatingCls:"mini-grid-row-alt",allowUnselect:!1,_frozenCls:"mini-grid-frozen",_frozenCellCls:"mini-grid-frozenCell",frozenStartColumn:-1,frozenEndColumn:-1,isFrozen:function(){return this.frozenStartColumn>=0&&this.frozenEndColumn>=this.frozenStartColumn},_rowCls:"mini-grid-row",_rowHoverCls:"mini-grid-row-hover",_rowSelectedCls:"mini-grid-row-selected",_headerCellCls:"mini-grid-headerCell",_cellCls:"mini-grid-cell",set:function(a){var b=a.columns;delete a.columns;var c=a.pageSize;delete a.pageSize;var d=a.pager;return delete a.pager,void 0!==a.ignoreTotalBusiness&&(this.setIgnoreTotalBusiness(a.ignoreTotalBusiness),delete a.ignoreTotalBusiness),this._createPager(),mini.DataGrid.superclass.set.call(this,a),c&&this.setPageSize(c),d&&this.setPager(d),b&&this.setColumns(b),this},uiCls:"mini-datagrid",_create:function(){this.el=document.createElement("div");this.el.className="mini-grid",this.el.style.display="block",this.el.tabIndex=1;var a='<div class="mini-grid-border"><div class="mini-grid-header"><div class="mini-grid-headerInner"></div></div><div class="mini-grid-filterRow"></div><div class="mini-grid-body"><div class="mini-grid-bodyInner"></div><div class="mini-grid-body-scrollHeight"></div></div><div class="mini-grid-scroller"><div></div></div><div class="mini-grid-summaryRow"></div><div class="mini-grid-footer"></div><div class="mini-resizer-trigger" style=""></div><a href="#" class="mini-grid-focus" style="position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none;" hideFocus onclick="return false" ></a></div>';this.el.innerHTML=a,this._borderEl=this.el.firstChild,this._headerEl=this._borderEl.childNodes[0],this._filterEl=this._borderEl.childNodes[1],this._bodyEl=this._borderEl.childNodes[2],this._bodyInnerEl=this._bodyEl.childNodes[0],this._bodyScrollEl=this._bodyEl.childNodes[1],this._headerInnerEl=this._headerEl.firstChild,this._scrollEl=this._borderEl.childNodes[3],this._summaryEl=this._borderEl.childNodes[4],this._footerEl=this._borderEl.childNodes[5],this._resizeEl=this._borderEl.childNodes[6],this._focusEl=this._borderEl.childNodes[7],this._doUpdateFilterRow(),this._doUpdateSummaryRow(),mini.setStyle(this._bodyEl,this.bodyStyle),mini.addClass(this._bodyEl,this.bodyCls),this._doShowRows()},destroy:function(a){this._destroyEditors(),this._Resizer.destroy(a),this._Splitter.destroy(a),this._ColumnMove.destroy(a),this._Select.destroy(a),this._CellTip.destroy(a),this._Sort.destroy(a),this._ColumnsMenu.destroy(a),this._scrollEl&&(mini.clearEvent(this._scrollEl),this._borderEl.removeChild(this._scrollEl),this._scrollEl=null),this._summaryEl&&(mini.clearEvent(this._summaryEl),this._borderEl.removeChild(this._summaryEl),this._summaryEl=null),this.pager&&(mini.clearEvent(this.pager),this.pager.destroy(a),this.pager=null),this._footerEl&&(mini.clearEvent(this._footerEl),this._borderEl.removeChild(this._footerEl),this._footerEl=null),this._resizeEl&&(mini.clearEvent(this._resizeEl),this._borderEl.removeChild(this._resizeEl),this._resizeEl=null),this._focusEl&&(mini.clearEvent(this._focusEl),this._borderEl.removeChild(this._focusEl),this._focusEl=null),this._bodyInnerEl&&(mini.clearEvent(this._bodyInnerEl),this._bodyEl.removeChild(this._bodyInnerEl),this._bodyInnerEl=null),this._bodyScrollEl&&(mini.clearEvent(this._bodyScrollEl),this._bodyEl.removeChild(this._bodyScrollEl),this._bodyScrollEl=null),this._bodyEl&&(mini.clearEvent(this._bodyEl),this._borderEl.removeChild(this._bodyEl),this._bodyEl=null),this._filterEl&&(mini.clearEvent(this._filterEl),this._borderEl.removeChild(this._filterEl),this._filterEl=null),this._topRightCellEl&&(mini.clearEvent(this._topRightCellEl),this._headerInnerEl.removeChild(this._topRightCellEl),this._topRightCellEl=null),this._headerInnerEl&&(mini.clearEvent(this._headerInnerEl),this._headerEl.removeChild(this._headerInnerEl),this._headerInnerEl=null),this._headerEl&&(mini.clearEvent(this._headerEl),this._borderEl.removeChild(this._headerEl),this._headerEl=null),this._borderEl&&(mini.clearEvent(this._borderEl),this.el.removeChild(this._borderEl),this._borderEl=null),delete this.data,delete this._idRows,delete this._removes,delete this._originals,delete this.columns,delete this._bottomColumns,delete this._idColumns,delete this._nameColumns,delete this._selecteds,delete this._idSelecteds,delete this._cellErrors,delete this._cellMapErrors,delete this._margedCells,delete this._mergedCellMaps,delete this._groupDataView,mini.DataGrid.superclass.destroy.call(this,a)},_initEvents:function(){js_touchScroll(this._bodyEl),mini._BindEvents(function(){mini.on(this.el,"click",this.__OnClick,this),mini.on(this.el,"dblclick",this.__OnDblClick,this),mini.on(this.el,"mousedown",this.__OnMouseDown,this),mini.on(this.el,"mouseup",this.__OnMouseUp,this),mini.on(this.el,"mousemove",this.__OnMouseMove,this),mini.on(this.el,"mouseover",this.__OnMouseOver,this),mini.on(this.el,"mouseout",this.__OnMouseOut,this),mini.on(this.el,"keydown",this.__OnKeyDown,this),mini.on(this.el,"keyup",this.__OnKeyUp,this),mini.on(this.el,"contextmenu",this.__OnContextMenu,this),mini.on(this._bodyEl,"scroll",this.__OnBodyScroll,this),mini.on(this._scrollEl,"scroll",this.__OnHScroll,this),mini.on(this.el,"mousewheel",this.__OnMousewheel,this)},this),this._Resizer=new mini._Resizer(this),this._Splitter=new mini._ColumnSplitter(this),this._ColumnMove=new mini._ColumnMove(this),this._Select=new mini._GridSelect(this),this._CellTip=new mini._CellToolTip(this),this._Sort=new mini._GridSort(this),this._ColumnsMenu=new mini._ColumnsMenu(this)},_doShowRows:function(){this._resizeEl.style.display=this.allowResize?"":"none",this._footerEl.style.display=this.showFooter?"":"none",this._summaryEl.style.display=this.showSummaryRow?"":"none",this._filterEl.style.display=this.showFilterRow?"":"none",this._headerEl.style.display=this.showHeader?"":"none"},focus:function(){try{var a=this.getCurrent();if(a){var b=this._getRowEl(a);if(b){var c=mini.getBox(b);mini.setY(this._focusEl,c.top),isOpera?b.focus():isChrome?this.el.focus():isGecko?this.el.focus():this._focusEl.focus()}}else this._focusEl.focus()}catch(d){}},_createPager:function(){this.ignoreTotalBusiness?this.pager=new mini.PagerNoTotal:this.pager=new mini.Pager,this.pager.render(this._footerEl),this.bindPager(this.pager)},setPager:function(a){if("string"==typeof a){var b=mini.byId(a);if(!b)return;mini.parse(a),a=mini.get(a),this.diypager=a}a&&(a.update(this.pageIndex,this.pageSize,this.totalCount),this.bindPager(a))},bindPager:function(a){a.on("beforepagechanged",this.__OnPageChanged,this),this.on("load",function(b){a.update(this.pageIndex,this.pageSize,this.totalCount),this.totalPage=a.totalPage},this)},setIdField:function(a){this.idField=a},getIdField:function(){return this.idField},setUrl:function(a){this.url=this.parseUrl(a)},getUrl:function(a){return this.url},setAutoLoad:function(a){this.autoLoad=a},getAutoLoad:function(a){return this.autoLoad},setCheckSelectionOnly:function(a){this.onlyCheckSelection=a},getCheckSelectionOnly:function(){return this.onlyCheckSelection},accept:function(){this._canUpdateRowEl=!1;for(var a=this.data,b=0,c=a.length;c>b;b++){var d=a[b];this.acceptRecord(d)}this._canUpdateRowEl=!0,this.doUpdate()},acceptRecord:function(a){a=this._getRow(a),a&&("removed"==a._state&&this._removes.remove(a),delete this._originals[a._uid],delete a._state,this._canUpdateRowEl&&this._updateRowEl(a))},_clearOriginals:!0,loadData:function(a){mini.isArray(a)||(a=[]),this.data=a,1==this._clearOriginals&&(this._originals={}),this._removes=[],this._idRows={},this._selecteds=[],this._idSelecteds={},this._cellErrors=[],this._cellMapErrors={},this._margedCells=null,this._mergedCellMaps=null,this._groupDataView=null;for(var b=0,c=a.length;c>b;b++){var d=a[b];d._uid=mini.DataGrid.RowID,d._index=b,this._idRows[d._uid]=d,mini.DataGrid.RowID+=1}this.isVirtualScroll()&&this.scrollIntoView(this._getRow(0)),this.doUpdate()},setData:function(a){if(this.dataLoaded=!0,this.loadData(a),0==a.length&&this.pager){this.pageIndex=0,this.totalCount=0;var b={result:{data:a,total:a.length},data:a,total:this.totalCount,cancel:!1};this.fire("load",b)}},getData:function(){return mini.clone(this.data,!1)},toArray:function(){return this.data.clone()},getRange:function(a,b){if(a>b){var c=a;a=b,b=c}for(var d=this.data,e=[],f=a,g=b;g>=f;f++){var h=d[f];e.push(h)}return e},selectRange:function(a,b){if(mini.isNumber(a)||(a=this.indexOf(a)),mini.isNumber(b)||(b=this.indexOf(b)),!mini.isNull(a)&&!mini.isNull(b)){var c=this.getRange(a,b);this.selects(c)}},getHeaderHeight:function(){return this.showHeader?mini.getHeight(this._headerEl):0},getFooterHeight:function(){return this.showFooter?mini.getHeight(this._footerEl):0},getFilterRowHeight:function(){return this.showFilterRow?mini.getHeight(this._filterEl):0},getSummaryRowHeight:function(){return this.showSummaryRow?mini.getHeight(this._summaryEl):0},_getScrollHeight:function(){return this.isFrozen()?mini.getHeight(this._scrollEl):0},_CreateTopTr:function(a){var b="empty"==a,c=0;b&&0==this.showEmptyText&&(c=1);var d="",e=this.getBottomColumns();d+=b?'<tr style="height:'+c+'px">':isIE?isIE6||isIE7||isIE8&&!mini.boxModel||isIE9&&!mini.boxModel?'<tr style="display:none;">':"<tr >":'<tr style="height:'+c+'px">';for(var f=0,g=e.length;g>f;f++){var h=e[f],i=(h.width,this._createColumnId(h)+"$"+a);d+='<td id="'+i+'" style="padding:0;border:0;margin:0;height:'+c+"px;",h.width&&(d+="width:"+h.width),(f<this.frozenStartColumn||0==h.visible)&&(d+=";display:none;"),d+='" ></td>'}return d+="</tr>"},_doUpdateFilterRow:function(){this._filterEl.firstChild&&this._filterEl.removeChild(this._filterEl.firstChild);var a=this.isFrozen(),b=this.getBottomColumns(),c=[];c[c.length]='<table class="mini-grid-table" cellspacing="0" cellpadding="0">',c[c.length]=this._CreateTopTr("filter"),c[c.length]="<tr >";for(var d=0,e=b.length;e>d;d++){var f=b[d],g=this._createFilterCellId(f);
c[c.length]='<td id="',c[c.length]=g,c[c.length]='" class="mini-grid-filterCell" style="',(a&&d<this.frozenStartColumn||0==f.visible||1==f._hide)&&(c[c.length]=";display:none;"),c[c.length]='"><span class="mini-grid-hspace"></span></td>'}c[c.length]='</tr></table><div class="mini-grid-scrollCell"></div>',this._filterEl.innerHTML=c.join("");for(var d=0,e=b.length;e>d;d++){var f=b[d];if(f.filter){var h=this.getFilterCellEl(d);f.filter.render(h)}}},_deferUpdateSummaryRow:function(){var a=this;this._summaryTimer||(this._summaryTimer=setTimeout(function(){a._doUpdateSummaryRow(),a._summaryTimer=null},1))},_doUpdateSummaryRow:function(){var a=this.data;this._summaryEl.firstChild&&this._summaryEl.removeChild(this._summaryEl.firstChild);var b=this.isFrozen(),c=this.getBottomColumns(),d=[];d[d.length]='<table class="mini-grid-table" cellspacing="0" cellpadding="0">',d[d.length]=this._CreateTopTr("summary"),d[d.length]="<tr >";for(var e=0,f=c.length;f>e;e++){var g=c[e],h=this._createSummaryCellId(g),i=this._OnDrawSummaryCell(a,g);d[d.length]='<td id="',d[d.length]=h,d[d.length]='" class="mini-grid-summaryCell '+i.cellCls+'" style="'+i.cellStyle+";",(b&&e<this.frozenStartColumn||0==g.visible||1==g._hide)&&(d[d.length]=";display:none;"),d[d.length]='">',d[d.length]=i.cellHtml,d[d.length]="</td>"}d[d.length]='</tr></table><div class="mini-grid-scrollCell"></div>',this._summaryEl.innerHTML=d.join("")},_createHeaderText:function(a){var b=a.header;return"function"==typeof b&&(b=b.call(this,a)),(mini.isNull(b)||""===b)&&(b="&nbsp;"),b},_isLastColumn:function(a){function b(a){var d=c(a,f);if(!d)return!1;var g=c(d,f);if(!g)return d._id==e._id?!0:!1;var h=g.columns.indexOf(d);if(h!=g.columns.length-1)return!1;var i=c(d,f);return i?b(d)?!0:void 0:!0}function c(a){for(var b=0;b<f.length;b++){var c=d(a,f[b]);if(c)return c}}function d(a,b){if(a._pid==b._id)return b;var c=b.columns;if(!c)return null;for(var e=0;e<c.length;e++){var f=d(a,c[e]);if(f)return f}}var e=this.columns[this.columns.length-1],f=this.columns;return c(a,f)?b(a)?!0:void 0:!0},_doUpdateHeader:function(a){a=a||"";var b=this.isFrozen(),c=this.getColumnRows(),d=this.getBottomColumns(),e=(d.length,[]);e[e.length]='<table style="'+a+';display:table" class="mini-grid-table" cellspacing="0" cellpadding="0"  id="mini-grid-table-head'+this.getId()+'">',e[e.length]=this._CreateTopTr("header");for(var f=0,g=c.length;g>f;f++){var h=c[f];e[e.length]="<tr >";for(var i=0,j=h.length;j>i;i++){var k=h[i],l=this._createHeaderText(k),m=this._createColumnId(k),n="";this.sortField==k.field&&(n="asc"==this.sortOrder?"mini-grid-asc":"mini-grid-desc"),e[e.length]='<td id="',e[e.length]=m,e[e.length]='" class="mini-grid-headerCell '+n+" "+(k.headerCls||"")+" ",i==j-1&&this._isLastColumn(k)&&(e[e.length]=" mini-grid-last-column ");var o=d.indexOf(k);e[e.length]='" style="',(b&&-1!=o&&o<this.frozenStartColumn||0==k.visible||1==k._hide)&&(e[e.length]=";display:none;"),k.columns&&k.columns.length>0&&0==k.colspan&&(e[e.length]=";display:none;"),k.headerStyle&&(e[e.length]=k.headerStyle+";"),k.headerAlign&&(e[e.length]="text-align:"+k.headerAlign+";"),e[e.length]='" ',k.rowspan&&(e[e.length]='rowspan="'+k.rowspan+'" '),k.colspan&&(e[e.length]='colspan="'+k.colspan+'" '),e[e.length]='><div class="mini-grid-cellInner">',e[e.length]=l,n&&(e[e.length]='<span class="mini-grid-sortIcon"></span>'),e[e.length]="</div>",e[e.length]="</td>"}e[e.length]="</tr>"}e[e.length]="</table>";var p=e.join("");p='<div class="mini-grid-header">'+p+"</div>";var p='<div class="mini-grid-scrollHeaderCell"></div>';p+='<div class="mini-grid-topRightCell"></div>',this._headerInnerEl.innerHTML=e.join("")+p,this._topRightCellEl=this._headerInnerEl.lastChild,this.fire("refreshHeader")},_destroyEditors:function(){for(var a=mini.getChildControls(this),b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.el&&mini.findParent(e.el,this._rowCls)&&(b.push(e),e.destroy())}},_doUpdateBody:function(){this._destroyEditors();for(var a=this.getBottomColumns(),b=0,c=a.length;c>b;b++){var d=a[b];delete d._hide}this._doUpdateHeader();var e=this.data,f=this.isVirtualScroll(),g=this._markRegion(),h=[],i=this.isAutoHeight(),j=0;if(f&&(j=g.top),i?h[h.length]='<table class="mini-grid-table" cellspacing="0" cellpadding="0" id="mini-grid-table-body'+this.getId()+'">':h[h.length]='<table style="position:absolute;top:'+j+'px;left:0;" class="mini-grid-table" cellspacing="0" cellpadding="0" id="mini-grid-table-body'+this.getId()+'">',h[h.length]=this._CreateTopTr("body"),e.length>0)if(this.isGrouping())for(var k=0,l=this._getGroupDataView(),m=this.getVisibleColumns(),n=0,o=l.length;o>n;n++){var p=l[n],q=this.uid+"$group$"+p.id,r=this._OnDrawGroup(p);if(h[h.length]='<tr id="'+q+'" class="mini-grid-groupRow">',this.__fzhj){for(var s={},t=0,u=p.rows.length;u>t;t++)for(var v in this.__fzhj)this.__fzhj[v]||(this.__fzhj[v]=function(a,b){return a+b}),s[v]=this.__fzhj[v](s[v]||0,p.rows[t][v],p);for(var w=0,x=this.columns.length;x>w;w++)this.columns[w].field==this._groupField?(h.push('<td class="mini-grid-groupCell"><div class="mini-grid-groupHeader">'),h[h.length]='<div class="mini-grid-group-ecicon"></div>',h[h.length]='<div class="mini-grid-groupTitle">'+r.cellHtml+"</div>",h[h.length]="</div></td>"):h.push('<td class="mini-grid-groupCell">'+(s[this.columns[w].field]||"")+"</td>")}else h.push('<td class="mini-grid-groupCell" colspan="'+m.length+'"><div class="mini-grid-groupHeader">'),h[h.length]='<div class="mini-grid-group-ecicon"></div>',h[h.length]='<div class="mini-grid-groupTitle">'+r.cellHtml+"</div>",h[h.length]="</div></td>";h.push("</tr>");for(var y=p.rows,b=0,c=y.length;c>b;b++){var z=y[b];this._createRow(z,h,k++)}this.showGroupSummary}else if(f)for(var A=g.start,B=g.end,b=A,c=B;c>b;b++){var z=e[b];this._createRow(z,h,b)}else for(var b=0,c=e.length;c>b;b++){var z=e[b];this._createRow(z,h,b)}else this.showEmptyText&&(this._resultObject||this.dataLoaded)&&(h[h.length]='<tr ><td class="mini-grid-emptyText" colspan="'+this.getVisibleColumns().length+'">'+this.emptyText+"</td></tr>");if(h[h.length]="</table>",this._bodyInnerEl.firstChild&&this._bodyInnerEl.removeChild(this._bodyInnerEl.firstChild),this._bodyInnerEl.innerHTML=h.join(""),f){this._rowHeight=23;try{var C=this._bodyInnerEl.firstChild.rows[1];C&&(this._rowHeight=C.offsetHeight)}catch(D){}var E=this._rowHeight*this.data.length;this._bodyScrollEl.style.display="block",this._bodyScrollEl.style.height=E+"px"}else this._bodyScrollEl.style.display="none"},showNewRow:!0,_createRow:function(a,b,c){mini.isNumber(c)||(c=this.indexOf(a));var d=c==this.data.length-1,e=this.isFrozen(),f=!b;b||(b=[]);var g=this.getBottomColumns(),h=-1,i=" ",j=-1,k=" ";b[b.length]='<tr id="',b[b.length]=this._createRowId(a),b[b.length]='" class="mini-grid-row ',this.isSelected(a)&&(b[b.length]=this._rowSelectedCls,b[b.length]=" "),"deleted"==a._state&&(b[b.length]="mini-grid-deleteRow "),"added"==a._state&&this.showNewRow&&(b[b.length]="mini-grid-newRow "),this.allowAlternating&&c%2==1&&(b[b.length]=this._alternatingCls,b[b.length]=" "),h=b.length,b[b.length]=i,b[b.length]='" style="',j=b.length,b[b.length]=k,b[b.length]='">';for(var l=g.length-1,m=0,n=l;n>=m;m++){var o=g[m],p=o.field?this._HasRowModified(a,o.field):!1,q=this.getCellError(a,o),r=this._OnDrawCell(a,o,c,m),s=this._createCellId(a,o);b[b.length]='<td id="',b[b.length]=s,b[b.length]='" class="mini-grid-cell ',r.cellCls&&(b[b.length]=r.cellCls),q&&(b[b.length]=" mini-grid-cell-error "),this._currentCell&&this._currentCell[0]==a&&this._currentCell[1]==o&&(b[b.length]=" ",b[b.length]=this._cellSelectedCls),d&&(b[b.length]=" mini-grid-last-row "),m==l&&(b[b.length]=" mini-grid-last-column "),e&&this.frozenStartColumn<=m&&m<=this.frozenEndColumn&&(b[b.length]=" ",b[b.length]=this._frozenCellCls+" "),b[b.length]='" style="',o.align&&(b[b.length]="text-align:",b[b.length]=o.align,b[b.length]=";"),r.allowCellWrap&&(b[b.length]="white-space:normal;text-overflow:normal;word-break:break-all;"),r.cellStyle&&(b[b.length]=r.cellStyle,b[b.length]=";"),(e&&m<this.frozenStartColumn||0==o.visible||1==o._hide)&&(b[b.length]="display:none;"),0==r.visible&&(b[b.length]="display:none;"),b[b.length]='" ',r.rowSpan&&(b[b.length]='rowspan="'+r.rowSpan+'"'),r.colSpan&&(b[b.length]='colspan="'+r.colSpan+'"'),b[b.length]=">",p&&this.showModified&&(b[b.length]='<div class="mini-grid-cell-inner mini-grid-cell-dirty" style="',b[b.length]='">'),b[b.length]=r.cellHtml,p&&(b[b.length]="</div>"),b[b.length]="</td>",r.rowCls&&(i=r.rowCls),r.rowStyle&&(k=r.rowStyle)}return b[h]=i,b[j]=k,b[b.length]="</tr>",f?b.join(""):void 0},isVirtualScroll:function(){return this.virtualScroll&&0==this.isAutoHeight()&&0==this.isGrouping()},getScrollLeft:function(){return this.isFrozen()?this._scrollEl.scrollLeft:this._bodyEl.scrollLeft},doUpdate:function(){new Date;if(this._allowUpdate!==!1){if(1==this.isAutoHeight()?this.addCls("mini-grid-auto"):this.removeCls("mini-grid-auto"),this._doUpdateSummaryRow&&this._doUpdateSummaryRow(),this._doUpdateBody(),this.isFrozen()){var a=this;a._doScrollFrozen(!0)}this.doLayout()}},_fixIE:function(){isIE&&(this._borderEl.style.display="none",h=this.getHeight(!0),w=this.getWidth(!0),this._borderEl.style.display="")},_deferLayout:function(){var a=this;this._layoutTimer||(this._layoutTimer=setTimeout(function(){a.doLayout(),a._layoutTimer=null},1))},doLayout:function(){if(this.canLayout()){this._filterEl.scrollLeft=this._summaryEl.scrollLeft=this._headerInnerEl.scrollLeft=this._bodyEl.scrollLeft;var a=(new Date,this.isFrozen()),b=this._headerInnerEl.firstChild,c=this._bodyInnerEl.firstChild,d=this._filterEl.firstChild,e=this._summaryEl.firstChild,f=this.isAutoHeight();h=this.getHeight(!0),o=this.getWidth(!0);var g=this.data,i=o;17>i&&(i=17),h<0&&(h=0);var j=i,k=2e3;f?this._bodyEl.style.height="auto":(h=h-this.getHeaderHeight()-this.getFooterHeight()-this.getFilterRowHeight()-this.getSummaryRowHeight()-this._getScrollHeight(),h<0&&(h=0),this._bodyEl.style.height=h+"px",k=h);var l=this._bodyEl.scrollHeight,m=this._bodyEl.clientHeight;if(this.isFitColumns()){var n=this.getMaxColumnLevel();if(m>=l||f){var o=j-1+"px";b.style.width=o,c.style.width=o,d.style.width=o,e.style.width=o,this._topRightCellEl.style.borderLeftWidth="0px",mini.isIE8&&this.data.length>0&&mini.addClass(this._bodyEl,"mini-grid-hidden-y")}else{var o=parseInt(j-18);0>o&&(o=0),o+="px",b.style.width=o,c.style.width=o,d.style.width=o,e.style.width=o,n>0&&(this._topRightCellEl.style.borderLeftWidth="1px"),mini.isIE8&&this.data.length>0&&mini.removeClass(this._bodyEl,"mini-grid-hidden-y")}0==g.length&&(mini.isIE?c.style.height="1px":c.firstChild.firstChild.style.height="1px",this._bodyEl.scrollWidth>this._bodyEl.clientWidth?c.style.height="1px":c.style.height="auto"),f&&(j>=this._bodyEl.scrollWidth-1?this._bodyEl.style.height="auto":this._bodyEl.style.height=c.offsetHeight+17+"px"),f&&a&&(this._bodyEl.style.height="auto")}else b.style.width=c.style.width="0px",d.style.width=e.style.width="0px",m>=l||f?mini.isIE8&&this.data.length>0&&mini.addClass(this._bodyEl,"mini-grid-hidden-y"):mini.isIE8&&this.data.length>0&&mini.removeClass(this._bodyEl,"mini-grid-hidden-y"),0==g.length&&(c.firstChild.firstChild.style.height="1px",this._bodyEl.scrollWidth>this._bodyEl.clientWidth?c.style.height="1px":c.style.height="auto");if(this.isFitColumns())if(l>m){var o=i-18;0>o&&(o=0)}else this._headerInnerEl.style.width="100%",this._filterEl.style.width="100%",this._summaryEl.style.width="100%",this._footerEl.style.width="auto";else this._headerInnerEl.style.width="100%",this._filterEl.style.width="100%",this._summaryEl.style.width="100%",this._footerEl.style.width="auto";if(this.isFrozen()&&(m<this._bodyEl.scrollHeight?this._scrollEl.style.width=i-17+"px":this._scrollEl.style.width=i+"px",this._bodyEl.offsetWidth<c.offsetWidth||this.isFrozen()?(this._scrollEl.firstChild.style.width=this._getColumnsScrollWidth()+"px",b.style.width=c.style.width="0px",d.style.width=e.style.width="0px"):this._scrollEl.firstChild.style.width="0px"),0==this.data.length)this._doInnerLayout();else{var p=this;this._innerLayoutTimer||(this._innerLayoutTimer=setTimeout(function(){p._doInnerLayout(),p._innerLayoutTimer=null},10))}this._doLayoutTopRightCell(),this.fire("layout"),this.isFrozen()&&this._scrollEl.scrollLeft!=this.__frozenScrollLeft&&this._doScrollFrozen()}},_doLayoutTopRightCell:function(){var a=this._headerInnerEl.firstChild,b=a.offsetWidth+1,c=a.offsetHeight-1;0>c&&(c=0),this._topRightCellEl.style.left=b+"px",this._topRightCellEl.style.height=c+"px"},_doInnerLayout:function(){this._doLayoutDetailRows(),this._doLayoutEditingRows(),mini.layout(this._filterEl),mini.layout(this._summaryEl),mini.layout(this._footerEl),mini.repaint(this.el),this._doLayouted=!0},setFitColumns:function(a){this.fitColumns=a,this.fitColumns?mini.removeClass(this.el,"mini-grid-fixcolumns"):mini.addClass(this.el,"mini-grid-fixcolumns"),this.doLayout()},getFitColumns:function(a){return this.fitColumns},isFitColumns:function(){return this.fitColumns&&!this.isFrozen()},_getColumnsScrollWidth:function(){if(this._bodyEl.offsetWidth<this._bodyInnerEl.firstChild.offsetWidth||this.isFrozen()){for(var a=0,b=this.getBottomColumns(),c=0,d=b.length;d>c;c++){var e=b[c];a+=this.getColumnWidth(e)}return a}return 0},_createRowId:function(a){return this.uid+"$"+a._uid},_createCellId:function(a,b){return this.uid+"$"+a._uid+"$"+b._id},_createFilterCellId:function(a){return this.uid+"$filter$"+a._id},_createSummaryCellId:function(a){return this.uid+"$summary$"+a._id},_createRowDetailId:function(a){return this.uid+"$detail$"+a._uid},_getHeaderScrollEl:function(){return this._headerInnerEl},getFilterCellEl:function(a){return a=this.getColumn(a),a?mini.byId(this._createFilterCellId(a),this.el):null},getSummaryCellEl:function(a){return a=this.getColumn(a),a?mini.byId(this._createSummaryCellId(a),this.el):null},_getRowEl:function(a){if(a=this._getRow(a),!a)return null;var b=this._createRowId(a);return mini.byId(b,this.el)},getCellBox:function(a,b){if(a=this._getRow(a),b=this.getColumn(b),!a||!b)return null;var c=this._getCellEl(a,b);return c?mini.getBox(c):null},getRowBox:function(a){var b=this._getRowEl(a);return b?mini.getBox(b):null},getRowsBox:function(){for(var a=[],b=this.data,c=0,d=0,e=b.length;e>d;d++){var f=b[d],g=this._createRowId(f),h=document.getElementById(g);if(h){var i=h.offsetHeight;a[d]={top:c,height:i,bottom:c+i},c+=i}}return a},setColumnWidth:function(a,b){if(a=this.getColumn(a)){mini.isNumber(b)&&(b+="px"),a.width=b;var c=this._createColumnId(a)+"$header",d=this._createColumnId(a)+"$body",e=this._createColumnId(a)+"$filter",f=this._createColumnId(a)+"$summary",g=document.getElementById(c),h=document.getElementById(d),i=document.getElementById(e),j=document.getElementById(f);g&&(g.style.width=b),h&&(h.style.width=b),i&&(i.style.width=b),j&&(j.style.width=b),this.doLayout(),this.fire("columnschanged")}},getColumnWidth:function(a){if(a=this.getColumn(a),!a)return 0;if(0==a.visible)return 0;var b=0,c=this._createColumnId(a)+"$body",d=document.getElementById(c);if(d){var e=d.style.display;d.style.display="",b=mini.getWidth(d),d.style.display=e}return b},_doVisibleColumn:function(a,b){var c=document.getElementById(this._createColumnId(a));c&&(c.style.display=b?"":"none");var d=document.getElementById(this._createFilterCellId(a));d&&(d.style.display=b?"":"none");var e=document.getElementById(this._createSummaryCellId(a));e&&(e.style.display=b?"":"none");var f=this._createColumnId(a)+"$header",g=this._createColumnId(a)+"$body",h=this._createColumnId(a)+"$filter",i=this._createColumnId(a)+"$summary",j=document.getElementById(f);j&&(j.style.display=b?"":"none");var k=document.getElementById(h);k&&(k.style.display=b?"":"none");var l=document.getElementById(i);if(l&&(l.style.display=b?"":"none"),m){if(b&&""==m.style.display)return;if(!b&&"none"==m.style.display)return}var m=document.getElementById(g);m&&(m.style.display=b?"":"none");var n=this.data;if(this.isVirtualScroll())for(var o=this._markRegion(),p=o.start,q=o.end,r=p,s=q;s>r;r++){var t=n[r],u=this._createCellId(t,a),v=document.getElementById(u);v&&(v.style.display=b?"":"none")}else for(var r=0,s=this.data.length;s>r;r++){var t=this.data[r],u=this._createCellId(t,a),v=document.getElementById(u);v&&(v.style.display=b?"":"none")}},_doClassColumn:function(a,b,c){var d=this.data;if(this.isVirtualScroll())for(var e=this._markRegion(),f=e.start,g=e.end,h=f,i=g;i>h;h++){var j=d[h],k=this._createCellId(j,a),l=document.getElementById(k);l&&(c?mini.addClass(l,b):mini.removeClass(l,b))}else for(var h=0,i=this.data.length;i>h;h++){var j=this.data[h],k=this._createCellId(j,a),l=document.getElementById(k);l&&(c?mini.addClass(l,b):mini.removeClass(l,b))}},__doFrozen:function(){this._scrollEl.scrollLeft=this._headerInnerEl.scrollLeft=this._bodyEl.scrollLeft=0;var a=this.isFrozen();a?mini.addClass(this.el,this._frozenCls):mini.removeClass(this.el,this._frozenCls);var b=this.getBottomColumns(),c=this._filterEl.firstChild,d=this._summaryEl.firstChild;if(a?(c.style.height=jQuery(c).outerHeight()+"px",d.style.height=jQuery(d).outerHeight()+"px"):(c.style.height="auto",d.style.height="auto"),this.isFrozen()){for(var e=0,f=b.length;f>e;e++){var g=b[e];this.frozenStartColumn<=e&&e<=this.frozenEndColumn?this._doClassColumn(g,this._frozenCellCls,!0):this._doClassColumn(g,this._frozenCellCls,!1)}this._doFixRowsHeight(!0)}else{for(var e=0,f=b.length;f>e;e++){var g=b[e];delete g._hide,g.visible&&this._doVisibleColumn(g,!0),this._doClassColumn(g,this._frozenCellCls,!1)}this._doUpdateHeader(),this._doFixRowsHeight(!1)}this.doLayout(),this._fixIE()},_deferFrozen:function(){this._headerTableHeight=mini.getHeight(this._headerInnerEl.firstChild);var a=this;this._deferFrozenTimer&&clearTimeout(this._deferFrozenTimer),this._deferFrozenTimer=setTimeout(function(){a.__doFrozen()},1)},setFrozenStartColumn:function(a){new Date;a=parseInt(a),isNaN(a)||(this.frozenStartColumn=a,this._deferFrozen())},getFrozenStartColumn:function(){return this.frozenStartColumn},setFrozenEndColumn:function(a){a=parseInt(a),isNaN(a)||(this.frozenEndColumn=a,this._deferFrozen())},getFrozenEndColumn:function(){return this.frozenEndColumn},unFrozenColumns:function(){this.setFrozenStartColumn(-1),this.setFrozenEndColumn(-1)},frozenColumns:function(a,b){this.unFrozenColumns(),this.setFrozenStartColumn(a),this.setFrozenEndColumn(b)},_rowHeight:23,_markRegion:function(){for(var a=this._getViewNowRegion(),b=this._rowHeight,c=(this._bodyEl.scrollTop,a.start),d=a.end,e=0,f=this.data.length;f>e;e+=this._virtualRows){var g=e+this._virtualRows;c>=e&&g>c&&(c=e),d>e&&g>=d&&(d=g)}d>this.data.length&&(d=this.data.length);var h=c*b;return this._viewRegion={start:c,end:d,top:h},this._viewRegion},_getViewNowRegion:function(){var a=this._rowHeight,b=this._bodyEl.scrollTop,c=this._bodyEl.offsetHeight,d=parseInt(b/a),e=parseInt((b+c)/a)+1;e>this.data.length&&(e=this.data.length);var f={start:d,end:e};return f},_canVirtualUpdate:function(){if(null==this.data||0==this.data.length)return!1;if(!this._viewRegion)return!0;var a=this._getViewNowRegion();return this._viewRegion.start<=a.start&&a.end<=this._viewRegion.end?!1:!0},_tryUpdateScroll:function(){var a=this._canVirtualUpdate();a&&this.doUpdate()},__OnBodyScroll:function(a){this._filterEl.scrollLeft=this._summaryEl.scrollLeft=this._headerInnerEl.scrollLeft=this._bodyEl.scrollLeft;var b=this;if(setTimeout(function(){b._headerInnerEl.scrollLeft=b._bodyEl.scrollLeft},10),this.isVirtualScroll()){var b=this;this._scrollTopTimer&&clearTimeout(this._scrollTopTimer),this._scrollTopTimer=setTimeout(function(){b._scrollTopTimer=null,b._tryUpdateScroll()},100)}},__OnHScroll:function(a){var b=this;this._HScrollTimer||(this._HScrollTimer=setTimeout(function(){b._doScrollFrozen(),b._HScrollTimer=null},30))},_doScrollFrozen:function(a){if(this.isFrozen()){var b=this.getBottomColumns(),c=this._scrollEl.scrollLeft;this.__frozenScrollLeft=c;for(var d=this.frozenEndColumn,e=0,f=d+1,g=b.length;g>f;f++){var h=b[f];if(h.visible){var i=this.getColumnWidth(h);if(e>=c)break;d=f,e+=i}}if(a||this._lastStartColumn!==d){this._lastStartColumn=d;for(var f=0,g=b.length;g>f;f++){var h=b[f];delete h._hide,this.frozenEndColumn<f&&d>=f&&(h._hide=!0)}for(var f=0,g=b.length;g>f;f++){var h=b[f];f<this.frozenStartColumn||f>this.frozenEndColumn&&d>f||0==h.visible?this._doVisibleColumn(h,!1):this._doVisibleColumn(h,!0)}var j="width:100%;";(this._scrollEl.offsetWidth<this._scrollEl.scrollWidth||!this.isFitColumns())&&(j="width:0px"),this._doUpdateHeader(j);var k=this._headerTableHeight;mini.isIE9&&(k-=1),mini.setHeight(this._headerInnerEl.firstChild,k);for(var f=this.frozenEndColumn+1,g=b.length;g>f;f++){var h=b[f];h.visible&&(d>=f?this._doVisibleColumn(h,!1):this._doVisibleColumn(h,!0))}this._doUpdateDetailColSpan(),this._doMargeCells(),this._doLayoutTopRightCell(),this.fire("layout")}}},_doFixRowsHeight:function(a){for(var b=this.data,c=0,d=b.length;d>c;c++){var e=b[c],f=this._getRowEl(e);if(f)if(a){var g=0;f.style.height=g+"px"}else f.style.height=""}},_doGridLines:function(){this.showVGridLines?mini.removeClass(this.el,"mini-grid-hideVLine"):mini.addClass(this.el,"mini-grid-hideVLine"),this.showHGridLines?mini.removeClass(this.el,"mini-grid-hideHLine"):mini.addClass(this.el,"mini-grid-hideHLine")},setShowHGridLines:function(a){this.showHGridLines!=a&&(this.showHGridLines=a,this._doGridLines(),this.doLayout())},getShowHGridLines:function(){return this.showHGridLines},setShowVGridLines:function(a){this.showVGridLines!=a&&(this.showVGridLines=a,this._doGridLines(),this.doLayout())},getShowVGridLines:function(){return this.showVGridLines},setShowFilterRow:function(a){this.showFilterRow!=a&&(this.showFilterRow=a,this._doShowRows(),this.doLayout())},getShowFilterRow:function(){return this.showFilterRow},setShowSummaryRow:function(a){this.showSummaryRow!=a&&(this.showSummaryRow=a,this._doShowRows(),this.doLayout())},getShowSummaryRow:function(){return this.showSummaryRow},_doAlternating:function(){if(0!=this.allowAlternating)for(var a=this.data,b=0,c=a.length;c>b;b++){var d=a[b],e=this._getRowEl(d);e&&(this.allowAlternating&&b%2==1?mini.addClass(e,this._alternatingCls):mini.removeClass(e,this._alternatingCls))}},setAllowAlternating:function(a){this.allowAlternating!=a&&(this.allowAlternating=a,this._doAlternating())},getAllowAlternating:function(){return this.allowAlternating},setEnableHotTrack:function(a){this.enableHotTrack!=a&&(this.enableHotTrack=a)},getEnableHotTrack:function(){return this.enableHotTrack},setShowLoading:function(a){this.showLoading=a},setAllowCellWrap:function(a){this.allowCellWrap!=a&&(this.allowCellWrap=a)},getAllowCellWrap:function(){return this.allowCellWrap},setAllowHeaderWrap:function(a){this.allowHeaderWrap=a,mini.removeClass(this.el,"mini-grid-headerWrap"),a&&mini.addClass(this.el,"mini-grid-headerWrap")},getAllowHeaderWrap:function(){return this.allowHeaderWrap},setShowColumnsMenu:function(a){this.showColumnsMenu=a},getShowColumnsMenu:function(){return this.showColumnsMenu},setEditNextOnEnterKey:function(a){this.editNextOnEnterKey=a},getEditNextOnEnterKey:function(){return this.editNextOnEnterKey},setEditOnTabKey:function(a){this.editOnTabKey=a},getEditOnTabKey:function(){return this.editOnTabKey},setVirtualScroll:function(a){this.virtualScroll!=a&&(this.virtualScroll=a)},getVirtualScroll:function(){return this.virtualScroll},setScrollTop:function(a){this.scrollTop=a,this._bodyEl.scrollTop=a},getScrollTop:function(){return this._bodyEl.scrollTop},setBodyStyle:function(a){this.bodyStyle=a,mini.setStyle(this._bodyEl,a)},getBodyStyle:function(){return this.bodyStyle},setBodyCls:function(a){this.bodyCls=a,mini.addClass(this._bodyEl,a)},getBodyCls:function(){return this.bodyCls},setFooterStyle:function(a){this.footerStyle=a,mini.setStyle(this._footerEl,a)},getFooterStyle:function(){return this.footerStyle},setFooterCls:function(a){this.footerCls=a,mini.addClass(this._footerEl,a)},getFooterCls:function(){return this.footerCls},setShowHeader:function(a){this.showHeader=a,this._doShowRows(),this.doLayout()},setShowPager:function(a){this.setShowFooter(a)},getShowPager:function(){return this.showFooter},setShowFooter:function(a){this.showFooter=a,this._doShowRows(),this.doLayout()},getShowFooter:function(){return this.showFooter},setAutoHideRowDetail:function(a){this.autoHideRowDetail=a},setSortMode:function(a){this.sortMode=a},getSortMode:function(){return this.sortMode},setAllowSortColumn:function(a){this.allowSortColumn=a},getAllowSortColumn:function(){return this.allowSortColumn},setAllowMoveColumn:function(a){this.allowMoveColumn=a},getAllowMoveColumn:function(){return this.allowMoveColumn},setAllowResizeColumn:function(a){this.allowResizeColumn=a},getAllowResizeColumn:function(){return this.allowResizeColumn},setSelectOnLoad:function(a){this.selectOnLoad=a},getSelectOnLoad:function(){return this.selectOnLoad},setAllowResize:function(a){this.allowResize=a,this._resizeEl.style.display=this.allowResize?"":"none"},getAllowResize:function(){return this.allowResize},setShowEmptyText:function(a){this.showEmptyText=a},getShowEmptyText:function(){return this.showEmptyText},setEmptyText:function(a){this.emptyText=a},getEmptyText:function(){return this.emptyText},setShowModified:function(a){this.showModified=a},getShowModified:function(){return this.showModified},setShowNewRow:function(a){this.showNewRow=a},getShowNewRow:function(){return this.showNewRow},setCellEditAction:function(a){this.cellEditAction=a},getCellEditAction:function(){return this.cellEditAction},setAllowCellValid:function(a){this.allowCellValid=a},getAllowCellValid:function(){return this.allowCellValid},__allowLayout:!0,showAllRowDetail:function(){this.__allowLayout=!1;for(var a=0,b=this.data.length;b>a;a++){var c=this.data[a];this.showRowDetail(c)}this.__allowLayout=!0,this.doLayout()},hideAllRowDetail:function(){this.__allowLayout=!1;for(var a=0,b=this.data.length;b>a;a++){var c=this.data[a];this.isShowRowDetail(c)&&this.hideRowDetail(c)}this.__allowLayout=!0,this.doLayout()},showRowDetail:function(a){if(a=this._getRow(a)){var b=this.getRowDetailEl(a);b.style.display="",a._showDetail=!0;var c=this._getRowEl(a);mini.addClass(c,"mini-grid-expandRow"),this.fire("showrowdetail",{record:a}),this.__allowLayout&&this.doLayout()}},hideRowDetail:function(a){if(a=this._getRow(a)){var b=this._createRowDetailId(a),c=document.getElementById(b);c&&(c.style.display="none"),delete a._showDetail;var d=this._getRowEl(a);mini.removeClass(d,"mini-grid-expandRow"),this.fire("hiderowdetail",{record:a}),this.__allowLayout&&this.doLayout()}},toggleRowDetail:function(a){a=this._getRow(a),a&&(grid.isShowRowDetail(a)?grid.hideRowDetail(a):grid.showRowDetail(a))},isShowRowDetail:function(a){return a=this._getRow(a),a?!!a._showDetail:!1},getRowDetailEl:function(a){if(a=this._getRow(a),!a)return null;var b=this._createRowDetailId(a),c=document.getElementById(b);return c||(c=this._createRowDetail(a)),c},getRowDetailCellEl:function(a){var b=this.getRowDetailEl(a);return b?b.cells[0]:void 0},_createRowDetail:function(a){var b=this._getRowEl(a),c=this._createRowDetailId(a),d=this.getBottomColumns().length;return jQuery(b).after('<tr id="'+c+'" class="mini-grid-detailRow"><td class="mini-grid-detailCell" colspan="'+d+'"></td></tr>'),this._doUpdateDetailColSpan(),document.getElementById(c)},_getColSpan:function(){for(var a=this._bodyInnerEl.firstChild.getElementsByTagName("tr")[0],b=a.getElementsByTagName("td"),c=0,d=0,e=b.length;e>d;d++){var f=b[d];"none"!=f.style.display&&c++}return c},_doUpdateDetailColSpan:function(){for(var a=jQuery(".mini-grid-detailRow",this.el),b=this._getColSpan(),c=0,d=a.length;d>c;c++){var e=a[c],f=e.firstChild;f.colSpan=b}},_doLayoutDetailRows:function(){for(var a=0,b=this.data.length;b>a;a++){var c=this.data[a];if(1==c._showDetail){var d=this._createRowDetailId(c),e=document.getElementById(d);e&&mini.layout(e)}}},_doLayoutEditingRows:function(){for(var a=0,b=this.data.length;b>a;a++){var c=this.data[a];if(1==c._editing){var d=this._getRowEl(c);d&&mini.layout(d)}}},__OnPageChanged:function(a){return 0!=this.data.length||a.isreload?(this.fire("pagechanged",a),void(1!=a.cancel&&this.gotoPage(a.pageIndex,a.pageSize,a.totalCount))):void this.setPageSize(a.pageSize)},setShowReloadButton:function(a){this.pager.setShowReloadButton(a)},getShowReloadButton:function(){return this.pager.getShowReloadButton()},setShowPageInfo:function(a){this.pager.setShowPageInfo(a)},getShowPageInfo:function(){return this.pager.getShowPageInfo()},setSizeList:function(a){mini.isArray(a)&&this.pager.setSizeList(a)},getSizeList:function(){return this.pager.getSizeList()},setPageSize:function(a){a=parseInt(a),isNaN(a)||(this.pageSize=a,this.pager&&this.pager.update(this.pageIndex,this.pageSize,this.totalCount),this.diypager&&this.diypager.update(this.pageIndex,this.pageSize,this.totalCount))},getPageSize:function(){return this.pageSize},setPageIndex:function(a){a=parseInt(a),isNaN(a)||(this.pageIndex=a,this.pager&&this.pager.update(this.pageIndex,this.pageSize,this.totalCount),this.diypager&&this.diypager.update(this.pageIndex,this.pageSize,this.totalCount))},getPageIndex:function(){return this.pageIndex},setShowPageSize:function(a){this.showPageSize=a,this.pager.setShowPageSize(a)},getShowPageSize:function(){return this.showPageSize},setShowPageIndex:function(a){this.showPageIndex=a,this.pager.setShowPageIndex(a)},getShowPageIndex:function(){return this.showPageIndex},setShowTotalCount:function(a){this.showTotalCount=a,this.pager.setShowTotalCount(a)},setIgnoreTotalBusiness:function(a){this.ignoreTotalBusiness=a},getShowTotalCount:function(){return this.showTotalCount},setPageIndexField:function(a){this.pageIndexField=a},getPageIndexField:function(){return this.pageIndexField},setPageSizeField:function(a){this.pageSizeField=a},getPageSizeField:function(){return this.pageSizeField},setSortFieldField:function(a){this.sortFieldField=a},getSortFieldField:function(){return this.sortFieldField},setSortOrderField:function(a){this.sortOrderField=a},getSortOrderField:function(){return this.sortOrderField},setTotalField:function(a){this.totalField=a},getTotalField:function(){return this.totalField},setDependMerge:function(a){this.dependMerge=a},getDependMerge:function(){return this.dependMerge},setDataField:function(a){this.dataField=a},getDataField:function(){return this.dataField},getSortField:function(){return this.sortField},getSortOrder:function(){return this.sortOrder},pageIndex:0,pageSize:10,totalCount:0,totalPage:0,showPageInfo:!0,pageIndexField:"pageIndex",pageSizeField:"pageSize",sortFieldField:"sortField",sortOrderField:"sortOrder",totalField:"total",showPageSize:!0,showPageIndex:!0,showTotalCount:!0,ignoreTotalBusiness:!1,setTotalCount:function(a){this.totalCount=a,this.pager.setTotalCount(a),this.diypager&&this.diypager.setTotalCount(a)},getTotalCount:function(){return this.totalCount},getTotalPage:function(){return this.totalPage},sortField:"",sortOrder:"",url:"",autoLoad:!1,loadParams:null,ajaxAsync:!0,ajaxMethod:"post",ajaxTimeout:3e4,showLoading:!0,resultAsData:!1,checkSelectOnLoad:!0,setCheckSelectOnLoad:function(a){this.checkSelectOnLoad=a},getCheckSelectOnLoad:function(){return this.checkSelectOnLoad},totalField:"total",dataField:"data",_getFromData:function(a){return a.data},getResultObject:function(){return this._resultObject?this._resultObject:{}},_doLoad:function(params,success,fail){try{var url=eval(this.url);void 0!=url&&(this.url=url)}catch(e){}params=params||{},mini.isNull(params.pageIndex)&&(params.pageIndex=0),mini.isNull(params.pageSize)&&(params.pageSize=this.pageSize),params.sortField=this.sortField,params.sortOrder=this.sortOrder,"server"!=this.sortMode&&(params.sortField=this.sortField="",params.sortOrder=this.sortOrder=""),this.loadParams=params;var o={};o[this.pageIndexField]=params.pageIndex,o[this.pageSizeField]=params.pageSize,params.sortField&&(o[this.sortFieldField]=params.sortField),params.sortOrder&&(o[this.sortOrderField]=params.sortOrder),
mini.copyTo(params,o);var url=this.url,ajaxMethod=this.ajaxMethod,e={url:url,async:this.ajaxAsync,type:ajaxMethod,data:params,params:params,timeout:this.ajaxTimeout,cache:!1,cancel:!1};if(this.fire("beforeload",e),e.data!=e.params&&e.params!=params&&(e.data=e.params),1==e.cancel)return params.pageIndex=this.getPageIndex(),void(params.pageSize=this.getPageSize());this.showLoading&&this.loading(),this._selectedValue=this._selected?this._selected[this.idField]:null;var sf=me=this,url=e.url;mini.copyTo(e,{success:function(a,b,c){var d=null;try{d=mini.decode(a)}catch(e){1==mini_debugger&&alert(url+"\ndatagrid json is error.")}if(d&&!mini.isArray(d))d.total=parseInt(mini._getMap(me.totalField,d)),d.data=mini._getMap(me.dataField,d);else if(null==d)d={},d.data=[],d.total=0;else if(mini.isArray(d)){var f={};f.data=d,f.total=d.length,d=f}d.data||(d.data=[]),d.total||(d.total=0);var g=sf.getPageIndex();if(!sf.ignoreTotalBusiness&&g>0&&d.total>0&&0==d.data.length)return g-=1,void sf.gotoPage(g);if(sf._resultObject=d,sf.unmask(),mini.isNumber(d.error)&&0!=d.error){var h={errorCode:d.error,xmlHttp:c,errorMsg:d.message,result:d};return sf.fire("loaderror",h),void(fail&&fail.call(sf,h))}var i=d.total,j=sf._getFromData(d);mini.isNumber(params.pageIndex)&&(sf.pageIndex=params.pageIndex),mini.isNumber(params.pageSize)&&(sf.pageSize=params.pageSize),sf.ignoreTotalBusiness?sf.totalCount=j.length:mini.isNumber(i)&&(sf.totalCount=i);var e={result:d,data:j,total:i,cancel:!1,xmlHttp:c};if(sf.fire("preload",e),1!=e.cancel){var k=sf._allowLayout;if(sf._allowLayout=!1,sf.loadData(e.data),sf._selectedValue&&sf.checkSelectOnLoad){var l=sf.getRowById(sf._selectedValue);l?sf.select(l):sf.deselectAll()}else sf._selected&&sf.deselectAll();null==sf.getSelected()&&sf.selectOnLoad&&sf.data.length>0&&sf.select(0),sf.collapseGroupOnLoad&&sf.collapseGroups(),sf._allowLayout=k,sf.doLayout(),sf.fire("load",e),success&&success.call(sf,e)}},error:function(a,b,c){var d={xmlHttp:a,errorMsg:a.responseText,errorCode:a.status};1==mini_debugger&&1==this.loadErrorAlert&&alert("network error"),sf.fire("loaderror",d),sf.unmask(),fail&&fail.call(sf,d)}}),this._ajaxer=mini.ajax(e)},load:function(a,b,c){this._loadTimer&&clearTimeout(this._loadTimer);var d=this,e=mini.byClass("mini-grid-emptyText",this.el);e&&(e.style.display="none"),this.cancelEdit(),this.loadParams=a||{},this.ajaxAsync?this._loadTimer=setTimeout(function(){d._doLoad(a,b,c)},1):d._doLoad(a,b,c)},reload:function(a,b){this.accept(),this.load(this.loadParams,a,b)},gotoPage:function(a,b,c){var d=this.loadParams||{};mini.isNumber(a)&&(d.pageIndex=a),mini.isNumber(b)&&(d.pageSize=b),mini.isNumber(c)&&(d.totalCount=c),this.load(d)},sortBy:function(a,b){if(this.sortField=a,this.sortOrder="asc"==b?"asc":"desc","server"==this.sortMode&&this.url&&this.data.length>0){var c=this.loadParams||{};c.sortField=a,c.sortOrder=b,c.pageIndex=this.pageIndex;var d=this;this.load(c,function(){d.fire("sort")})}else{var e=this.data.clone(),f=this._getSortFnByField(a);if(!f)return;for(var g=[],h=e.length-1;h>=0;h--){var i=e[h],j=mini._getMap(a,i);(mini.isNull(j)||""===j)&&(g.insert(0,i),e.removeAt(h))}e=e.clone(),mini.sort(e,f,this),e.insertRange(0,g),"desc"==this.sortOrder&&e.reverse(),this.data=e,this.doUpdate(),this.fire("sort")}},clearSort:function(){this.sortField="",this.sortOrder="",this.reload()},_getSortFnByField:function(a){function b(b,c){var d=mini._getMap(a,b),e=mini._getMap(a,c),f=i(d),g=i(e);return f>g?1:f==g?0:-1}if(!a)return null;for(var c="string",d=null,e=this.getBottomColumns(),f=0,g=e.length;g>f;f++){var h=e[f];if(h.field==a){h.dataType&&(c=h.dataType.toLowerCase());break}}var i=mini.sortTypes[c];return i||(i=mini.sortTypes.string),d=b},allowCellSelect:!1,allowCellEdit:!1,_cellSelectedCls:"mini-grid-cell-selected",_currentCell:null,_editingCell:null,_editingControl:null,_editWrap:null,_doCurrentCell:function(a){if(this._currentCell){var b=this._currentCell[0],c=this._currentCell[1],d=this._getCellEl(b,c);d&&(a?mini.addClass(d,this._cellSelectedCls):mini.removeClass(d,this._cellSelectedCls))}},setCurrentCell:function(a){if(this._currentCell!=a){if(this._doCurrentCell(!1),this._currentCell=a,a){var b=this._getRow(a[0]),c=this.getColumn(a[1]);b&&c?this._currentCell=[b,c]:this._currentCell=null}this._doCurrentCell(!0),a&&(this.isFrozen()?this.scrollIntoView(a[0]):this.scrollIntoView(a[0])),this.fire("currentcellchanged")}},getCurrentCell:function(){var a=this._currentCell;return a&&-1==this.data.indexOf(a[0])&&(this._currentCell=null,a=null),a},setAllowCellSelect:function(a){this.allowCellSelect=a},getAllowCellSelect:function(a){return this.allowCellSelect},setAllowCellEdit:function(a){this.allowCellEdit=a},getAllowCellEdit:function(a){return this.allowCellEdit},beginEditCell:function(a,b){a=this._getRow(a),b=this.getColumn(b);var c=[a,b];a&&b&&this.setCurrentCell(c);var c=this.getCurrentCell();if((!this._editingCell||!c||this._editingCell[0]!=c[0]||this._editingCell[1]!=c[1])&&(this._editingCell&&this.commitEdit(),c)){var a=c[0],b=c[1],d=this._OnCellBeginEdit(a,b,this.getCellEditor(b));d!==!1&&(this.scrollIntoView(a,b),this._editingCell=c,this._OnCellShowingEdit(a,b))}},isEditingCell:function(a){return this._editingCell&&this._editingCell[0]==a[0]&&this._editingCell[1]==a[1]},cancelEdit:function(){if(this.allowCellEdit)this._editingCell&&this._OnCellEndEdit();else if(this.isEditing()){this._allowLayout=!1;for(var a=this.data.clone(),b=0,c=a.length;c>b;b++){var d=a[b];1==d._editing&&this.cancelEditRow(b)}this._allowLayout=!0,this.doLayout()}},commitEdit:function(){if(this.allowCellEdit)this._editingCell&&(this._OnCellCommitEdit(this._editingCell[0],this._editingCell[1]),this._OnCellEndEdit());else if(this.isEditing()){this._allowLayout=!1;for(var a=this.data.clone(),b=0,c=a.length;c>b;b++){var d=a[b];1==d._editing&&this.commitEditRow(b)}this._allowLayout=!0,this.doLayout()}},getCellEditor:function(a,b){if(a=this.getColumn(a)){if(this.allowCellEdit){var c=a.__editor;return c||(c=mini.getAndCreate(a.editor)),c&&c!=a.editor&&(a.editor=c),c}if(b=this._getRow(b),a=this.getColumn(a),b||(b=this.getEditingRow()),!b||!a)return null;var d=this.uid+"$"+b._uid+"$"+a._id+"$editor";return mini.get(d)}},_OnCellBeginEdit:function(a,b,c){var d=mini._getMap(b.field,a),e={sender:this,rowIndex:this.data.indexOf(a),row:a,record:a,column:b,field:b.field,editor:c,value:d,cancel:!1};if(this.fire("cellbeginedit",e),!mini.isNull(b.defaultValue)&&(mini.isNull(e.value)||""===e.value)){var f=b.defaultValue,g=mini.clone({d:f});e.value=g.d}var c=e.editor;if(d=e.value,e.cancel)return!1;if(!c)return!1;if(mini.isNull(d)&&(d=""),c.setValue&&c.setValue(d),c.ownerRowID=a._uid,b.displayField&&c.setText){var h=mini._getMap(b.displayField,a);if(!mini.isNull(b.defaultText)&&(mini.isNull(h)||""===h)){var g=mini.clone({d:b.defaultText});h=g.d}c.setText(h)}return this.allowCellEdit&&(this._editingControl=e.editor),!0},_OnCellCommitEdit:function(a,b,c,d){var e={sender:this,record:a,rowIndex:this.data.indexOf(a),row:a,column:b,field:b.field,editor:d?d:this.getCellEditor(b),value:mini.isNull(c)?"":c,text:"",cancel:!1};e.editor&&e.editor.getValue&&(e.editor.getFormValue?e.value=e.editor.getFormValue():e.value=e.editor.getValue()),e.editor&&e.editor.getText&&(e.text=e.editor.getText());var f=a[b.field],g=e.value;if(mini.isEquals(f,g))return e;if(this.fire("cellcommitedit",e),0==e.cancel&&this.allowCellEdit){var h={};if(mini._setMap(b.field,e.value,h),b.displayField&&mini._setMap(b.displayField,e.text,h),e.editor&&e.editor.textName&&mini._setMap(e.editor.textName,e.text,h),this.updateRow(a,h),this._mergedCellMaps){var i=this.getBottomColumns(),j=a._index,k=i.indexOf(b);if(this._mergedCellMaps[j+":"+k])for(var l=j+1;l<this.data.length&&1==this._mergedCellMaps[l+":"+k];l++)this.updateRow(this._getRow(l),h)}}return e},_OnCellEndEdit:function(){if(this._editingCell){var a=this._editingCell[0],b=this._editingCell[1],c={sender:this,record:a,rowIndex:this.data.indexOf(a),row:a,column:b,field:b.field,editor:this._editingControl,value:a[b.field]};if(this.fire("cellendedit",c),this.allowCellEdit){var d=c.editor;d&&d.setIsValid&&d.setIsValid(!0),this._editWrap&&(this._editWrap.style.display="none");for(var e=this._editWrap.childNodes,f=e.length-1;f>=0;f--){var g=e[f];this._editWrap.removeChild(g)}d&&d.hidePopup&&d.hidePopup(),d&&d.setValue&&d.setValue(""),this._editingControl=null,this._editingCell=null,this.allowCellValid&&this.validateCell(a,b)}}},_OnCellShowingEdit:function(a,b){if(!this._editingControl)return!1;var c=this.getCellBox(a,b),d=mini.getViewportBox().width;c.right>d&&(c.width=d-c.left,c.width<10&&(c.width=10),c.right=c.left+c.width);var e={sender:this,rowIndex:this.data.indexOf(a),record:a,row:a,column:b,field:b.field,cellBox:c,editor:this._editingControl};this.fire("cellshowingedit",e);var f=e.editor;f&&f.setIsValid&&f.setIsValid(!0);var g=this._getCellEl(a,b);this._getEditWrap(c,g);if(this._editWrap.style.zIndex=mini.getMaxZIndex(),f.render?(f.render(this._editWrap),setTimeout(function(){if(f.focus(),f.selectText&&f.selectText(),"radiobuttonlist"==f.type||"checkboxlist"==f.type){var a=f.getValue();f.setValue(""),f.setValue(a)}},50),f.setVisible&&f.setVisible(!0)):f.el&&(this._editWrap.appendChild(f.el),setTimeout(function(){try{f.el.focus()}catch(a){}},50)),f.setWidth){var h=c.width;20>h&&(h=20),f.setWidth(h)}if(f.setHeight&&"textarea"==f.type){var i=c.height-1;f.minHeight&&i<f.minHeight&&(i=f.minHeight),f.setHeight(i)}if(f.setWidth&&"textarea"==f.type){var h=c.width-1;f.minWidth&&h<f.minWidth&&(h=f.minWidth),f.setWidth(h)}mini.on(document,"mousedown",this.__OnBodyMouseDown,this),b.autoShowPopup&&f.showPopup&&f.showPopup()},__OnBodyMouseDown:function(a){if(this._editingControl){var b=this._getCellByEvent(a);if(this._editingCell&&b&&this._editingCell[0]==b.record&&this._editingCell[1]==b.column)return!1;var c=!1;if(c=this._editingControl.within?this._editingControl.within(a):mini.isAncestor(this._editWrap,a.target),0==c){var d=this;if(0==mini.isAncestor(this._bodyEl,a.target))setTimeout(function(){d.commitEdit()},1);else{var e=d._editingCell;setTimeout(function(){var a=d._editingCell;e==a&&d.commitEdit()},70)}mini.un(document,"mousedown",this.__OnBodyMouseDown,this)}}},_getEditWrap:function(a,b){this._editWrap||(this._editWrap=mini.append(document.body,'<div class="mini-grid-editwrap" style="position:absolute;"></div>'),mini.on(this._editWrap,"keydown",this.___OnEditControlKeyDown,this));var c=$(b).css("line-height");c.indexOf("px")&&(c=c.substr(0,c.length-2));var d=a.y+(a.height-c)/2;this._editWrap.style.zIndex=1e9,this._editWrap.style.display="block",mini.setXY(this._editWrap,a.x,d),mini.setWidth(this._editWrap,a.width),mini.setHeight(this._editWrap,c);var e=mini.getViewportBox().width;return a.x>e&&mini.setX(this._editWrap,-1e3),this._editWrap},___OnEditControlKeyDown:function(a){var b=this._editingControl;if(13!=a.keyCode||!b||"textarea"!=b.type)if(13==a.keyCode){var c=this._editingCell;if(c&&c[1]&&c[1].enterCommit===!1)return;this.commitEdit(),this.focus(),this.editNextOnEnterKey&&(this.fire("celleditenter",{record:c[0]}),this._beginEditNextCell(0==a.shiftKey))}else 27==a.keyCode?(this.cancelEdit(),this.focus()):9==a.keyCode&&(this.commitEdit(),this.editOnTabKey&&(a.preventDefault(),this.commitEdit(),this._beginEditNextCell(0==a.shiftKey)))},editNextOnEnterKey:!1,editOnTabKey:!0,createOnEnter:!1,_beginEditNextCell:function(a){var b=this,c=this.getCurrentCell();if(c){this.focus();var d=b.getBottomVisibleColumns(),e=c?c[1]:null,f=c?c[0]:null,g=d.indexOf(e),h=b.indexOf(f);b.data.length;if(a===!1){if(g-=1,e=d[g],!e&&(e=d[d.length-1],f=b.getAt(h-1),!f))return}else if(g+=1,e=d[g],!e&&(e=d[0],f=b.getAt(h+1),!f)){if(!this.createOnEnter)return;f={},this.addRow(f)}var c=[f,e];b.setCurrentCell(c),b.onlyCheckSelection||b.getCurrent()!=f&&(b.deselectAll(),b.setCurrent(f)),b.scrollIntoView(f,e),b.beginEditCell()}},getEditorOwnerRow:function(a){var b=a.ownerRowID;return this.getRowByUID(b)},beginEditRow:function(row){if(!this.allowCellEdit){var sss=new Date;if(row=this._getRow(row)){var rowEl=this._getRowEl(row);if(rowEl){row._editing=!0;var s=this._createRow(row),rowEl=this._getRowEl(row);jQuery(rowEl).before(s),rowEl.parentNode.removeChild(rowEl);var rowEl=this._getRowEl(row);mini.addClass(rowEl,"mini-grid-rowEdit");for(var columns=this.getBottomColumns(),i=0,l=columns.length;l>i;i++){var column=columns[i],value=row[column.field],cellId=this._createCellId(row,columns[i]),cellEl=document.getElementById(cellId);if(cellEl){"string"==typeof column.editor&&(column.editor=eval("("+column.editor+")"));var editorConfig=mini.copyTo({},column.editor);editorConfig.id=this.uid+"$"+row._uid+"$"+column._id+"$editor";var editor=mini.create(editorConfig);if(this._OnCellBeginEdit(row,column,editor)&&editor&&(mini.addClass(cellEl,"mini-grid-cellEdit"),cellEl.innerHTML="",cellEl.appendChild(editor.el),mini.addClass(editor.el,"mini-grid-editor"),"radiobuttonlist"==editor.type||"checkboxlist"==editor.type)){var value=editor.getValue();editor.setValue(""),editor.setValue(value)}}}this.doLayout()}}}},cancelEditRow:function(a){if(!this.allowCellEdit&&(a=this._getRow(a),a&&a._editing)){delete a._editing;for(var b=this._getRowEl(a),c=this.getBottomColumns(),d=0,e=c.length;e>d;d++){var f=(c[d],this._createCellId(a,c[d])),g=document.getElementById(f),h=g.firstChild,i=mini.get(h);i&&i.destroy()}var j=this._createRow(a);jQuery(b).before(j),b.parentNode.removeChild(b),this.doLayout()}},commitEditRow:function(a){if(!this.allowCellEdit&&(a=this._getRow(a),a&&a._editing)){var b=this.getEditRowData(a);this._canUpdateRowEl=!1,this.updateRow(a,b),this._canUpdateRowEl=!0,this.cancelEditRow(a)}},isEditing:function(){for(var a=0,b=this.data.length;b>a;a++){var c=this.data[a];if(1==c._editing)return!0}return!1},isEditingRow:function(a){return a=this._getRow(a),a?!!a._editing:!1},isNewRow:function(a){return"added"==a._state},getEditingRows:function(){for(var a=[],b=0,c=this.data.length;c>b;b++){var d=this.data[b];1==d._editing&&a.push(d)}return a},getEditingRow:function(){var a=this.getEditingRows();return a[0]},getEditData:function(a){for(var b=[],c=0,d=this.data.length;d>c;c++){var e=this.data[c];if(1==e._editing){var f=this.getEditRowData(c,a);f._index=c,b.push(f)}}return b},getEditRowData:function(a,b){if(a=this._getRow(a),!a||!a._editing)return null;for(var c={},d=this.getBottomColumns(),e=0,f=d.length;f>e;e++){var g=d[e],h=this._createCellId(a,d[e]),i=document.getElementById(h),j=null;if("checkboxcolumn"==g.type||"radiobuttoncolumn"==g.type){var k=g.getCheckBoxEl(a),l=k.checked?g.trueValue:g.falseValue;j=this._OnCellCommitEdit(a,g,l)}else{var m=i.firstChild,n=mini.get(m);if(!n)continue;j=this._OnCellCommitEdit(a,g,null,n)}mini._setMap(g.field,j.value,c),g.displayField&&mini._setMap(g.displayField,j.text,c)}if(mini._setMap(this.idField,a[this.idField],c),b){var o=mini.copyTo({},a);c=mini.copyTo(o,c)}return c},getChanges:function(a,b){var c=[];a&&"removed"!=a||c.addRange(this._removes);for(var d=0,e=this.data.length;e>d;d++){var f=this.data[d];!f._state||a&&a!=f._state||c.push(f)}if(b)for(var d=0,e=c.length;e>d;d++){var f=c[d];if("modified"==f._state){var g={};g[this.idField]=f[this.idField];for(var h in f){var i=this._HasRowModified(f,h);i&&(g[h]=f[h])}c[d]=g}}return c},isChanged:function(){var a=this.getChanges();return a.length>0},_originalIdField:"_uid",_getOriginal:function(a){var b=a[this._originalIdField],c=this._originals[b];return c||(c=this._originals[b]={}),c},_HasRowModified:function(a,b){var c=this._originals[a[this._originalIdField]];return c?mini.isNull(b)?!1:c.hasOwnProperty(b):!1},_doUpdateRow:function(a,b){var c=!1,d=mini.objToLine(b);for(var e in d){var f,g;if(f=null==b[e]?mini._getMap(e,b):b[e],g=null==a[e]?mini._getMap(e,a):a[e],!mini.isEquals(g,f)){if(mini._setMap(e,f,a),"added"!=a._state){a._state="modified";var h=this._getOriginal(a);h.hasOwnProperty(e)||(h[e]=g)}c=!0}}return c},_canUpdateRowEl:!0,_updateRowEl:function(a){var b=this,c=b._createRow(a),d=b._getRowEl(a);jQuery(d).before(c),d.parentNode.removeChild(d)},updateRow:function(a,b,c){if(a=this._getRow(a),a&&b){if("string"==typeof b){var d={};d[b]=c,b=d}var e=this._doUpdateRow(a,b);0!=e&&(this._canUpdateRowEl&&this._updateRowEl(a),"modified"==a._state&&this.fire("updaterow",{record:a,row:a}),a==this.getSelected()&&this._OnCurrentChanged(a),this._doMargeCells(),this._deferUpdateSummaryRow(),this._deferLayout())}},deleteRows:function(a){if(mini.isArray(a)){a=a.clone();for(var b=0,c=a.length;c>b;b++)this.deleteRow(a[b])}},deleteRow:function(a){if(a=this._getRow(a),a&&"deleted"!=a._state){if("added"==a._state)this.removeRow(a,!0);else{this.isEditingRow(a)&&this.cancelEditRow(a),a._state="deleted";var b=this._getRowEl(a);mini.addClass(b,"mini-grid-deleteRow"),this.fire("deleterow",{record:a,row:a})}this._doUpdateSummaryRow()}},removeRows:function(a,b){if(mini.isArray(a)){a=a.clone();for(var c=0,d=a.length;d>c;c++)this.removeRow(a[c],b)}},removeSelected:function(){var a=this.getSelected();a&&this.removeRow(a,!0)},removeRow:function(a,b){if(a=this._getRow(a)){var c=a==this.getSelected(),d=this.isSelected(a),e=this.data.indexOf(a);this.data.remove(a),"added"!=a._state&&(a._state="removed",this._removes.push(a),delete this._originals[a[this._originalIdField]]),delete this._idRows[a._uid];var f=(this._createRow(a),this._getRowEl(a));f&&f.parentNode.removeChild(f);var g=this._createRowDetailId(a),h=document.getElementById(g);if(h&&h.parentNode.removeChild(h),d&&b){var i=this.getAt(e);i||(i=this.getAt(e-1)),this.deselectAll(),this.select(i)}this._checkSelecteds(),this._removeRowError(a),this.fire("removerow",{record:a,row:a}),c&&this._OnCurrentChanged(a),this._doAlternating(),this._deferLayout(),this._deferUpdateMergeCells(),this._deferUpdateSummaryRow()}},autoCreateNewID:!1,addRows:function(a,b){if(mini.isArray(a)){a=a.clone();for(var c=0,d=a.length;d>c;c++)this.addRow(a[c],b),!mini.isNull(b)&&mini.isNumber(b)&&b++}},addRow:function(a,b){mini.isNull(b)&&(b=this.data.length),b=this.indexOf(b);var c=this._getRow(b);if(this.data.insert(b,a),!a[this.idField]){this.autoCreateNewID&&(a[this.idField]=UUID());var d={row:a,record:a};this.fire("beforeaddrow",d)}a._state="added",delete this._idRows[a._uid],a._uid=mini.DataGrid.RowID++,this._idRows[a._uid]=a;var e=this._createRow(a);if(c){var f=this._getRowEl(c);jQuery(f).before(e)}else mini.append(this._bodyInnerEl.firstChild,e);this._doAlternating(),this._deferLayout(),this.fire("addrow",{record:a,row:a});var g=jQuery(".mini-grid-emptyText",this._bodyEl)[0];g&&mini.removeNode(g.parentNode),this._doUpdateMergeCells(),this._deferUpdateSummaryRow()},moveRow:function(a,b){if(a=this._getRow(a),a&&!(0>b||b>this.data.length)){var c=this._getRow(b);if(a!=c){this.data.remove(a);var d=this._getRowEl(a);if(c){b=this.data.indexOf(c),this.data.insert(b,a);var e=this._getRowEl(c);jQuery(e).before(d)}else{this.data.insert(this.data.length,a);var f=this._bodyInnerEl.firstChild;mini.append(f.firstChild||f,d)}this._doAlternating(),this._deferLayout(),this.scrollIntoView(a),this.fire("moverow",{record:a,row:a,index:b}),this._doMargeCells()}}},moveUp:function(a){if(mini.isArray(a)){var b=this;a=a.sort(function(a,c){var d=b.indexOf(a),e=b.indexOf(c);return d>e?1:-1});for(var c=0,d=a.length;d>c;c++){var e=a[c],f=this.indexOf(e);this.moveRow(e,f-1)}}},moveDown:function(a){if(mini.isArray(a)){var b=this;a=a.sort(function(a,c){var d=b.indexOf(a),e=b.indexOf(c);return d>e?1:-1}),a.reverse();for(var c=0,d=a.length;d>c;c++){var e=a[c],f=this.indexOf(e);this.moveRow(e,f+2)}}},clearRows:function(){this.data=[],this.doUpdate()},indexOf:function(a){if("number"==typeof a)return a;if(this.isGrouping()){var b=this._getGroupDataView();return b.data.indexOf(a)}return this.data.indexOf(a)},getAt:function(a){if(this.isGrouping()){var b=this._getGroupDataView();return b.data[a]}return this.data[a]},getRow:function(a){if(null==a)return null;var b=typeof a;return"number"==b?this.data[a]:"object"==b?void 0==a._index?a:this.data[a._index]:this.getRowById(a)},_getRow:function(a){var b=typeof a;return"number"==b?this.data[a]:"object"==b?a:this.getRowById(a)},getRowByValue:function(a){for(var b=0,c=this.data.length;c>b;b++){var d=this.data[b];if(d[this.idField]==a)return d}},getRowById:function(a){return this.getRowByValue(a)},getRowByUID:function(a){return this._idRows[a]},findRows:function(a){var b=[];if(a)for(var c=0,d=this.data.length;d>c;c++){var e=this.data[c],f=a(e);if(f===!0&&b.push(e),1===f)break}return b},findRow:function(a){if(a)for(var b=0,c=this.data.length;c>b;b++){var d=this.data[b];if(a(d)===!0)return d}},collapseGroupOnLoad:!1,setCollapseGroupOnLoad:function(a){this.collapseGroupOnLoad=a},getCollapseGroupOnLoad:function(){return this.collapseGroupOnLoad},showGroupSummary:!1,setShowGroupSummary:function(a){this.showGroupSummary=a},getShowGroupSummary:function(){return this.showGroupSummary},collapseGroups:function(){if(this._groupDataView)for(var a=0,b=this._groupDataView.length;b>a;a++){var c=this._groupDataView[a];this._CollapseGroup(c)}},expandGroups:function(){if(this._groupDataView)for(var a=0,b=this._groupDataView.length;b>a;a++){var c=this._groupDataView[a];this._ExpandGroup(c)}},_CollapseGroup:function(a){for(var b=a.rows,c=0,d=b.length;d>c;c++){var e=b[c],f=this._getRowEl(e);f&&(f.style.display="none");var f=this.getRowDetailEl(e);f&&(f.style.display="none")}a.expanded=!1;var g=this.uid+"$group$"+a.id,h=document.getElementById(g);h&&mini.addClass(h,"mini-grid-group-collapse"),this.doLayout()},_ExpandGroup:function(a){for(var b=a.rows,c=0,d=b.length;d>c;c++){var e=b[c],f=this._getRowEl(e);f&&(f.style.display="");var f=this.getRowDetailEl(e);f&&(f.style.display=e._showDetail?"":"none")}a.expanded=!0;var g=this.uid+"$group$"+a.id,h=document.getElementById(g);h&&mini.removeClass(h,"mini-grid-group-collapse"),this.doLayout()},_GroupID:1,_groupField:"",_groupDir:"",groupBy:function(a,b,c){a&&(this._groupField=a,"string"==typeof b&&(b=b.toLowerCase()),this._groupDir=b,this.__fzhj=c,this._groupDataView=null,this.doUpdate())},clearGroup:function(){this._groupField="",this._groupDir="",this._groupDataView=null,this.doUpdate()},getGroupField:function(){return this._groupField},getGroupDir:function(){return this._groupDir},isGrouping:function(){return""!=this._groupField},_getGroupDataView:function(){if(0==this.isGrouping())return null;if(!this._groupDataView){var a=this._groupField,b=this._groupDir,c=this.data.clone();"function"==typeof b?mini.sort(c,b):(mini.sort(c,function(b,c){var d=b[a],e=c[a];return d>e?1:0},this),"desc"==b&&c.reverse());for(var d=[],e={},f=0,g=c.length;g>f;f++){var h=c[f],i=h[a],j=mini.isDate(i)?i.getTime():i,k=e[j];k||(k=e[j]={},k.header=a,k.field=a,k.dir=b,k.value=i,k.rows=[],d.push(k),k.id=this._GroupID++),k.rows.push(h)}this._groupDataView=d;for(var c=[],f=0,g=d.length;g>f;f++)c.addRange(d[f].rows);this._groupDataView.data=c}return this._groupDataView},_getGroupByID:function(a){if(!this._groupDataView)return null;for(var b=this._groupDataView,c=0,d=b.length;d>c;c++){var e=b[c];if(e.id==a)return e}},_OnDrawGroup:function(a){var b={group:a,rows:a.rows,field:a.field,dir:a.dir,value:a.value,cellHtml:a.header+" : "+a.value};return this.fire("drawgroup",b),b},onDrawGroupHeader:function(a,b){this.on("drawgroupheader",a,b)},onDrawGroupSummary:function(a,b){this.on("drawgroupsummary",a,b)},mergeColumns:function(a){function b(a){for(var b=[],c=0;c<f.length;c++)for(var d=0;d<a.length;d++)f[c].name==a[d]&&b.push(a[d]);return b}function c(a){if(a.field){for(var b=[],c=-1,d=1,e=f.indexOf(a),h=null,i=0,j=g.length;j>i;i++){var k=g[i],l=k[a.field];if(-1==c||l!=h){if(d>1){var m={rowIndex:c,columnIndex:e,rowSpan:d,colSpan:1};b.push(m)}c=i,d=1,h=l}else d++}return b}}function d(a,b,c){function d(a,b,c){for(var d=[],e=-1,g=1,h=f.indexOf(a),i=null,j=0,k=b.rowSpan;k>=j;j++){var l=c[b.rowIndex+j],m=l[a.field];if(-1==e||m!=i||j==k){if(g>1){var n={rowIndex:e,columnIndex:h,rowSpan:g,colSpan:1};d.push(n)}e=b.rowIndex+j,g=1,i=m}else g++}return d}if(a.field){for(var e=[],h=(f.indexOf(a),f.indexOf(c),0),i=b.length;i>h;h++){var j=d(a,b[h],g);j&&e.addRange(j)}return e}}a&&0==mini.isArray(a)&&(a=[a]),this.mergeColumnsData=a;var e=this,f=e.getBottomColumns();a||(a=f);var g=e.data.clone();g.push({});var h,i,j=[];this.dependMerge&&(a=b(a));for(var k=0,l=a.length;l>k;k++){var m=a[k];if(m=e.getColumn(m)){var n;this.dependMerge?(n=0==k?c(m):d(m,h,i),h=n,i=m):n=c(m),n&&j.addRange(n)}}e.mergeCells(j)},mergeCells:function(a){function b(a,b,d,e,f){for(var g=a,h=a+d;h>g;g++)for(var i=b,j=b+e;j>i;i++)g==a&&i==b?c[g+":"+i]=f:c[g+":"+i]=!0}if(mini.isArray(a)){this._margedCells=a,this._doMargeCells();var c=this._mergedCellMaps={},a=this._margedCells;if(a)for(var d=0,e=a.length;e>d;d++){var f=a[d];f.rowSpan||(f.rowSpan=1),f.colSpan||(f.colSpan=1),b(f.rowIndex,f.columnIndex,f.rowSpan,f.colSpan,f)}}},margeCells:function(a){this.mergeCells(a)},_isCellVisible:function(a,b){if(!this._mergedCellMaps)return!0;var c=this._mergedCellMaps[a+":"+b];return!(c===!0)},_deferUpdateMergeCells:function(){var a=this;this._mergeTimer||(this._mergeTimer=setTimeout(function(){a._doUpdateMergeCells(),a._mergeTimer=null},1))},_doUpdateMergeCells:function(){function a(a){for(var b={},c=0,d=a.length;d>c;c++){var e=a[c];b[e.columnIndex]?b[e.columnIndex].push(e):(b[e.columnIndex]=[],b[e.columnIndex].push(e))}return b}var b=this._margedCells;if(b){var c=a(b);this._clearMergeCell(c),this.mergeColumns(this.mergeColumnsData),this._doUpdateBody()}},_clearMergeCell:function(a){var b=[];for(rowIndex in a)for(var c=0,d=this.getData().length;d>c;c++){var e={rowIndex:c,columnIndex:rowIndex,rowSpan:1,colSpan:1};b.push(e)}this.mergeCells(b)},_doMargeCells:function(){function a(){var a=this._margedCells;if(a)for(var b=0,c=a.length;c>b;b++){var d=a[b];d.rowSpan||(d.rowSpan=1),d.colSpan||(d.colSpan=1);for(var e=this._getCellEls(d.rowIndex,d.columnIndex,d.rowSpan,d.colSpan),f=0,g=e.length;g>f;f++){var h=e[f];0!=f?h.style.display="none":(h.rowSpan=d.rowSpan,h.colSpan=d.colSpan)}}}a.call(this)},_getCellEls:function(a,b,c,d){var e=[];if(!mini.isNumber(a))return[];if(!mini.isNumber(b))return[];for(var f=(this.getBottomColumns(),this.data,a),g=a+c;g>f;f++)for(var h=b,i=b+d;i>h;h++){var j=this._getCellEl(f,h);j&&e.push(j)}return e},_selected:null,_selecteds:[],_checkSelecteds:function(){for(var a=this._selecteds,b=a.length-1;b>=0;b--){var c=a[b];0==!!this._idRows[c._uid]&&(a.removeAt(b),delete this._idSelecteds[c._uid])}this._selected&&0==!!this._idSelecteds[this._selected._uid]&&(this._selected=null)},setAllowUnselect:function(a){this.allowUnselect=a},getAllowUnselect:function(a){return this.allowUnselect},setAllowRowSelect:function(a){this.allowRowSelect=a},getAllowRowSelect:function(a){return this.allowRowSelect},setMultiSelect:function(a){this.multiSelect!=a&&(this.multiSelect=a,this._doUpdateHeader())},getMultiSelect:function(){return this.multiSelect},_getSelectAllCheckState:function(){var a=this.data,b=!0;if(0==a.length)return b=!1;for(var c=0,d=0,e=a.length;e>d;d++){var f=a[d];this.isSelected(f)&&c++}return b=a.length==c?!0:0==c?!1:"has"},_fireSelect:function(a,b){var c={record:a,cancel:!1};return this.fire(b,c),!c.cancel},isSelected:function(a){return a=this._getRow(a),a?!!this._idSelecteds[a._uid]:!1},getSelecteds:function(){return this._checkSelecteds(),this._selecteds.clone()},setCurrent:function(a){this.setSelected(a)},getCurrent:function(){return this.getSelected()},getSelected:function(){return this._checkSelecteds(),this._selected},scrollIntoView:function(a,b){try{if(b){var c=this._getCellEl(a,b);mini.scrollIntoView(c,this._bodyEl,!0)}else{var d=this._getRowEl(a);mini.scrollIntoView(d,this._bodyEl,!1)}}catch(e){}},setSelected:function(a){a?this.select(a):this.deselect(this._selected),this._selected&&this.scrollIntoView(this._selected),this._blurRow()},select:function(a,b){0==this.multiSelect&&this.deselectAll(),a=this._getRow(a),a&&(this._selected=a,this.selects([a],b))},deselect:function(a,b){a=this._getRow(a),a&&this.deselects([a],b)},selectAll:function(a){var b=this.data.clone();this.selects(b,a)},deselectAll:function(a){var b=this._selecteds.clone();this._selected=null,this.deselects(b,a)},clearSelect:function(a){this.deselectAll(a)},selects:function(a,b){if(a&&0!=a.length){new Date;a=a.clone();for(var c=a.length-1;c>=0;c--){var d=this._getRow(a[c]);d?a[c]=d:a.removeAt(c)}for(var e={},f=this.data,c=0,g=f.length;g>c;c++){var h=this._getRow(f[c]),i=h[this.idField];i&&(e[h[this.idField]]=h)}for(var j=[],c=0,g=a.length;g>c;c++){var d=a[c],k=this._idRows[d._uid];k||(d=e[d[this.idField]]),d&&j.push(d)}a=j,a=a.clone(),this._doSelects(a,!0);for(var c=0,g=a.length;g>c;c++){var d=a[c];if(!this.isSelected(d)){if(b!==!1&&!this._fireSelect(d,"beforeselect"))continue;this._selecteds.push(d),this._idSelecteds[d._uid]=d,b!==!1&&this.fire("select",{record:d})}}this._OnSelectionChanged()}},deselects:function(a,b){a||(a=[]),a=a.clone();for(var c=a.length-1;c>=0;c--){var d=this._getRow(a[c]);d?a[c]=d:a.removeAt(c)}a=a.clone(),this._doSelects(a,!1);for(var c=a.length-1;c>=0;c--){var d=a[c];if(this.isSelected(d)){if(b!==!1&&!this._fireSelect(d,"beforedeselect"))continue;for(var e=0,f=0;f<this._selecteds.length;f++)this._selecteds[f]._uid===d._uid&&(e=f);e>=0&&this._selecteds.splice(e,1),delete this._idSelecteds[d._uid],b!==!1&&this.fire("deselect",{record:d})}}-1!=a.indexOf(this._selected)&&(this._selected=null),this._OnSelectionChanged()},_doSelects:function(a,b){for(var c=(new Date,0),d=a.length;d>c;c++){var e=a[c];b?this.addRowCls(e,this._rowSelectedCls):this.removeRowCls(e,this._rowSelectedCls)}},_OnSelectionChanged:function(){this._selectionTimer&&clearTimeout(this._selectionTimer);var a=this;this._selectionTimer=setTimeout(function(){var b={selecteds:a.getSelecteds(),selected:a.getSelected()};a.fire("SelectionChanged",b),a._OnCurrentChanged(b.selected)},1)},_OnCurrentChanged:function(a){this._currentTimer&&clearTimeout(this._currentTimer);var b=this;this._currentTimer=setTimeout(function(){var c={record:a,row:a};b.fire("CurrentChanged",c),b._currentTimer=null},1)},addRowCls:function(a,b){var c=this._getRowEl(a);c&&mini.addClass(c,b)},removeRowCls:function(a,b){var c=this._getRowEl(a);c&&mini.removeClass(c,b)},setReadOnly:function(a){mini.DataGrid.superclass.setReadOnly.call(this,a);for(var b=mini.getChildControls(this),c=0,d=b.length;d>c;c++){var e=b[c];e.el&&mini.findParent(e.el,this._rowCls)&&e.setReadOnly&&e.setReadOnly(a)}},_focusRow:function(a,b){if(a=this._getRow(a),a&&a!=this._focusedRow){var c=this._getRowEl(a);b&&c&&this.scrollIntoView(a),this._focusedRow!=a&&(this._blurRow(),this._focusedRow=a,mini.addClass(c,this._rowHoverCls))}},_blurRow:function(){if(this._focusedRow){var a=this._getRowEl(this._focusedRow);a&&mini.removeClass(a,this._rowHoverCls),this._focusedRow=null}},_getRecordByEvent:function(a){var b=mini.findParent(a.target,this._rowCls);if(!b)return null;var c=b.id.split("$"),d=c[c.length-1];return this.getRowByUID(d)},__OnMousewheel:function(a,b){this.allowCellEdit&&this.commitEdit();var c=jQuery(this._bodyEl).css("overflow-y");if("hidden"==c){var d=a.wheelDelta||24*-a.detail,e=this._bodyEl.scrollTop;e-=d,this._bodyEl.scrollTop=e,e==this._bodyEl.scrollTop&&a.preventDefault();var a={scrollTop:this._bodyEl.scrollTop,direction:"vertical"};this.fire("scroll",a)}},__OnClick:function(a){var b=mini.findParent(a.target,"mini-grid-groupRow");if(b){var c=b.id.split("$"),d=c[c.length-1],e=this._getGroupByID(d);if(e){var f=!(e.expanded===!1?!1:!0);f?this._ExpandGroup(e):this._CollapseGroup(e)}}else this._fireEvent(a,"Click")},_tryFocus:function(a){if(!a.target.tagName)return!1;var b=a.target.tagName.toLowerCase();if("input"!=b&&"textarea"!=b&&"select"!=b&&mini.findParent(a.target,"mini-grid"))if(mini.isAncestor(this._filterEl,a.target)||mini.isAncestor(this._summaryEl,a.target)||mini.isAncestor(this._footerEl,a.target)||mini.findParent(a.target,"mini-grid-rowEdit")||mini.findParent(a.target,"mini-grid-detailRow"));else{var c=this;c.focus()}},__OnDblClick:function(a){
this._fireEvent(a,"Dblclick")},__OnMouseDown:function(a){this._fireEvent(a,"MouseDown"),this._tryFocus(a)},__OnMouseUp:function(a){mini.isAncestor(this.el,a.target)&&(this._tryFocus(a),this._fireEvent(a,"MouseUp"))},__OnMouseMove:function(a){this._fireEvent(a,"MouseMove")},__OnMouseOver:function(a){this._fireEvent(a,"MouseOver")},__OnMouseOut:function(a){this._fireEvent(a,"MouseOut")},__OnKeyDown:function(a){this._fireEvent(a,"KeyDown")},__OnKeyUp:function(a){this._fireEvent(a,"KeyUp")},__OnContextMenu:function(a){this._fireEvent(a,"ContextMenu")},_fireEvent:function(a,b){if(this.enabled){var c=this._getCellByEvent(a),d=c.record,e=c.column;if(d){var f={record:d,row:d,htmlEvent:a},g=this["_OnRow"+b];g?g.call(this,f):this.fire("row"+b,f)}if(e){var f={column:e,field:e.field,htmlEvent:a},g=this["_OnColumn"+b];g?g.call(this,f):this.fire("column"+b,f)}if(d&&e){var f={sender:this,record:d,row:d,column:e,field:e.field,htmlEvent:a},g=this["_OnCell"+b];g?g.call(this,f):this.fire("cell"+b,f),e["onCell"+b]&&e["onCell"+b].call(e,f)}if(!d&&e){var f={column:e,htmlEvent:a},g=this["_OnHeaderCell"+b];if(g)g.call(this,f);else{var h="onheadercell"+b.toLowerCase();e[h]&&(f.sender=this,e[h](f)),this.fire("headercell"+b,f)}}d||this._blurRow()}},_OnDrawCell:function(a,b,c,d){var e=mini._getMap(b.field,a),f={sender:this,rowIndex:c,columnIndex:d,record:a,row:a,column:b,field:b.field,value:e,cellHtml:e,rowCls:null,cellCls:b.cellCls||"",rowStyle:null,cellStyle:b.cellStyle||"",allowCellWrap:this.allowCellWrap,autoEscape:b.autoEscape};if(f.visible=this._isCellVisible(c,d),1==f.visible&&this._mergedCellMaps){var g=this._mergedCellMaps[c+":"+d];g&&(f.rowSpan=g.rowSpan,f.colSpan=g.colSpan)}if(b.dateFormat)if(mini.isDate(f.value))f.cellHtml=mini.formatDate(e,b.dateFormat);else if(mini.isNull(e)||""===e)f.cellHtml=e;else{var h=new Date(e.split(".")[0].replace(/-/g,"/"));f.cellHtml=mini.formatDate(h,b.dateFormat)}if("int"==b.dataType){var e=parseFloat(f.value);isNaN(e)||(f.cellHtml=mini.util.MathUtil.toFixed(e,0))}if("float"==b.dataType){var e=parseFloat(f.value);if(!isNaN(e)){var i=parseInt(b.decimalPlaces);isNaN(i)&&(i=2),f.cellHtml=mini.util.MathUtil.toFixed2(e,i)}}if("currency"==b.dataType&&(mini.isNull(e)||""===e?f.cellHtml=b.emptyText||"":f.cellHtml=mini.util.StringUtil.formatMoney(f.cellHtml,b.decimalPlaces,b.currencyUnit)),"percent"==b.dataType)if(mini.isNull(e)||""===e)f.cellHtml=b.emptyText||"";else{var i=parseInt(b.decimalPlaces);isNaN(i)&&(i=2),f.cellHtml=mini.formatPercent(f.value,b.showPercent,i)}b.displayField&&(f.cellHtml=mini._getMap(b.displayField,a)),1==f.autoEscape&&(f.cellHtml=mini.htmlEncode(f.cellHtml));var j=b.renderer;return j&&(fn="function"==typeof j?j:mini._getFunctoin(j),fn&&(f.cellHtml=fn.call(b,f))),this.fire("drawcell",f),f.cellHtml&&f.cellHtml.unshift&&0==f.cellHtml.length&&(f.cellHtml="&nbsp;"),(null===f.cellHtml||void 0===f.cellHtml||""===f.cellHtml)&&(f.cellHtml="&nbsp;"),f},_OnDrawSummaryCell:function(a,b){var c={result:this.getResultObject(),sender:this,data:a,column:b,field:b.field,value:"",cellHtml:"",cellCls:b.cellCls||"",cellStyle:b.cellStyle||"",allowCellWrap:this.allowCellWrap};if(b.summaryType){var d=mini.summaryTypes[b.summaryType];d&&(c.value=d(a,b.field))}var e=c.value;if(c.cellHtml=e,b.dateFormat&&(mini.isDate(c.value)?c.cellHtml=mini.formatDate(e,b.dateFormat):c.cellHtml=e),"currency"==b.dataType&&(c.cellHtml=mini.util.StringUtil.formatMoney(c.cellHtml,b.decimalPlaces,b.currencyUnit)),"int"==b.dataType&&(c.cellHtml=mini.util.MathUtil.toFixed(e,0)),"float"==b.dataType){var f=parseInt(b.decimalPlaces);isNaN(f)&&(f=2),c.cellHtml=mini.util.MathUtil.toFixed2(e,f)}if("percent"==b.dataType){var f=parseInt(b.decimalPlaces);isNaN(f)&&(f=2),c.cellHtml=mini.formatPercent(c.value,b.showPercent,f)}var g=b.summaryRenderer;return g&&(d="function"==typeof g?g:window[g],d&&(c.cellHtml=d.call(b,c))),b.summaryValue=c.value,this.fire("drawsummarycell",c),(null===c.cellHtml||void 0===c.cellHtml||""===c.cellHtml)&&(c.cellHtml="&nbsp;"),c},_OnDrawGroupSummaryCell:function(a,b){var c={sender:this,data:a,column:b,field:b.field,value:"",cellHtml:"",cellCls:b.cellCls||"",cellStyle:b.cellStyle||"",allowCellWrap:this.allowCellWrap};if(b.groupSummaryType){var d=mini.groupSummaryType[b.summaryType];d&&(c.value=d(a,b.field))}c.cellHtml=c.value;var e=b.groupSummaryRenderer;return e&&(d="function"==typeof e?e:window[e],d&&(c.cellHtml=d.call(b,c))),this.fire("drawgroupsummarycell",c),(null===c.cellHtml||void 0===c.cellHtml||""===c.cellHtml)&&(c.cellHtml="&nbsp;"),c},_OnCellMouseDown:function(a){a.record;this.fire("cellmousedown",a)},_OnRowMouseOut:function(a){this.enabled&&mini.isAncestor(this.el,a.target)},_OnRowMouseMove:function(a){if(record=a.record,this.enabled&&record.enabled!==!1&&0!=this.enableHotTrack){this.fire("rowmousemove",a);var b=this;b._focusRow(record)}},_OnHeaderCellClick:function(a){a.sender=this;var b=a.column;if(!mini.hasClass(a.htmlEvent.target,"mini-grid-splitter")){if(this.allowSortColumn&&0==this.isEditing()&&(!b.columns||0==b.columns.length)&&b.field&&b.allowSort!==!1){var c="asc";this.sortField==b.field&&(c="asc"==this.sortOrder?"desc":"asc"),this.sortBy(b.field,c)}this.fire("headercellclick",a)}},__OnHtmlContextMenu:function(a){var b={popupEl:this.el,htmlEvent:a,cancel:!1};if(mini.isAncestor(this._headerEl,a.target)){if(this.headerContextMenu){if(this.headerContextMenu.fire("BeforeOpen",b),1==b.cancel)return;if(this.headerContextMenu.fire("opening",b),1==b.cancel)return;this.headerContextMenu.showAtPos(a.pageX,a.pageY),this.headerContextMenu.fire("Open",b)}}else{var c=mini.findParent(a.target,"mini-grid-detailRow");if(c&&mini.isAncestor(this.el,c))return;if(this.contextMenu){if(this.contextMenu.fire("BeforeOpen",b),1==b.cancel)return;if(this.contextMenu.fire("opening",b),1==b.cancel)return;this.contextMenu.showAtPos(a.pageX,a.pageY),this.contextMenu.fire("Open",b)}}return!1},headerContextMenu:null,setHeaderContextMenu:function(a){var b=this._getContextMenu(a);b&&this.headerContextMenu!==b&&(this.headerContextMenu=b,this.headerContextMenu.owner=this,mini.on(this.el,"contextmenu",this.__OnHtmlContextMenu,this))},getHeaderContextMenu:function(){return this.headerContextMenu},columnsMenu:null,createColumnsMenu:function(){this.columnsMenu||(this.columnsMenu=mini.create({type:"menu",items:[{type:"menuitem",text:"Sort Asc"},{type:"menuitem",text:"Sort Desc"},"-",{type:"menuitem",text:"Columns",name:"columns",items:[]}]}));return this.columnsMenu},_doShowColumnsMenu:function(a){var b=this.createColumnsMenu(),c=this._getColumnEl(a),d=mini.getBox(c);b.showAtPos(d.right-17,d.bottom)},onRowDblClick:function(a,b){this.on("rowdblclick",a,b)},onRowClick:function(a,b){this.on("rowclick",a,b)},onRowMouseDown:function(a,b){this.on("rowmousedown",a,b)},onRowContextMenu:function(a,b){this.on("rowcontextmenu",a,b)},onCellClick:function(a,b){this.on("cellclick",a,b)},onCellMouseDown:function(a,b){this.on("cellmousedown",a,b)},onCellContextMenu:function(a,b){this.on("cellcontextmenu",a,b)},onBeforeLoad:function(a,b){this.on("beforeload",a,b)},onLoad:function(a,b){this.on("load",a,b)},onLoadError:function(a,b){this.on("loaderror",a,b)},onPreLoad:function(a,b){this.on("preload",a,b)},onDrawCell:function(a,b){this.on("drawcell",a,b)},onCellBeginEdit:function(a,b){this.on("cellbeginedit",a,b)},getAttrs:function(el){for(var attrs=mini.DataGrid.superclass.getAttrs.call(this,el),cs=mini.getChildNodes(el),i=0,l=cs.length;l>i;i++){var node=cs[i],property=jQuery(node).attr("property");property&&(property=property.toLowerCase(),"columns"==property?attrs.columns=mini._ParseColumns(node):"data"==property&&(attrs.data=node.innerHTML))}return mini._ParseString(el,attrs,["url","sizeList","bodyCls","bodyStyle","footerCls","footerStyle","pagerCls","pagerStyle","onheadercellclick","onheadercellmousedown","onheadercellcontextmenu","oncelleditenter","onrowdblclick","onselect","ondeselect","onbeforeselect","onbeforedeselect","onrowclick","onrowmousedown","onrowcontextmenu","oncellclick","oncellmousedown","oncellcontextmenu","oncelldblclick","onbeforeload","onpreload","onloaderror","onload","ondrawcell","oncellbeginedit","onselectionchanged","onshowrowdetail","onhiderowdetail","idField","valueField","ajaxMethod","ondrawgroup","pager","oncellcommitedit","oncellendedit","headerContextMenu","loadingMsg","emptyText","cellEditAction","sortMode","oncellvalidation","onsort","pageIndexField","pageSizeField","sortFieldField","sortOrderField","totalField","dataField","ondrawsummarycell","ondrawgroupsummarycell","onresize","oncolumnschanged","onpagechanged"]),mini._ParseBool(el,attrs,["showHeader","showPager","showFooter","showTop","allowSortColumn","allowMoveColumn","allowResizeColumn","showHGridLines","showVGridLines","showFilterRow","showSummaryRow","showFooter","showTop","fitColumns","showLoading","multiSelect","allowAlternating","resultAsData","allowRowSelect","allowUnselect","enableHotTrack","showPageIndex","showPageSize","showTotalCount","checkSelectionOnly","checkSelectOnLoad","allowResize","autoLoad","autoHideRowDetail","allowCellSelect","allowCellEdit","allowCellWrap","allowHeaderWrap","selectOnLoad","virtualScroll","collapseGroupOnLoad","showGroupSummary","showEmptyText","allowCellValid","showModified","showColumnsMenu","showPageInfo","showReloadButton","showNewRow","editNextOnEnterKey","createOnEnter","dependMerge","ignoreTotalBusiness"]),mini._ParseInt(el,attrs,["columnWidth","frozenStartColumn","frozenEndColumn","pageIndex","pageSize","ajaxTimeout"]),"string"==typeof attrs.sizeList&&(attrs.sizeList=eval(attrs.sizeList)),!attrs.idField&&attrs.valueField&&(attrs.idField=attrs.valueField),attrs}}),mini.regClass(mini.DataGrid,"datagrid"),mini_Column_Prototype={_getColumnEl:function(a){if(a=this.getColumn(a),!a)return null;var b=this._createColumnId(a);return document.getElementById(b)},_getCellEl:function(a,b){if(a=this._getRow?this._getRow(a):this.getNode(a),b=this.getColumn(b),!a||!b)return null;var c=this._createCellId(a,b);return document.getElementById(c)},getCellEl:function(a,b){return this._getCellEl(a,b)},_getCellByEvent:function(a){var b=this._getRecordByEvent?this._getRecordByEvent(a):this._getNodeByEvent(a),c=this._getColumnByEvent(a);return{record:b,column:c}},_getColumnByEvent:function(a){var b=mini.findParent(a.target,this._cellCls);if(b||(b=mini.findParent(a.target,this._headerCellCls)),b){var c=b.id.split("$"),d=c[c.length-1];return this._getColumnById(d)}return null},_createColumnId:function(a){return this.uid+"$column$"+a._id},getColumnBox:function(a){var b=this._createColumnId(a),c=document.getElementById(b);if(c){var d=mini.getBox(c);return d.x-=1,d.left=d.x,d.right=d.x+d.width,d}},setColumns:function(value){function init(column,index,parentColumn){if(column.type){mini.isNull(column.header)||"function"==typeof column.header||""==column.header.trim()&&delete column.header;var col=mini._getColumn(column.type);if(col){var _column=mini.copyTo({},column);mini.copyTo(column,col),mini.copyTo(column,_column)}}var width=parseInt(column.width);if(mini.isNumber(width)&&String(width)==column.width&&(column.width=width+"px"),mini.isNull(column.width)&&(column.width=this.columnWidth+"px"),column.visible=column.visible!==!1,column.allowResize=column.allowResize!==!1,column.allowMove=column.allowMove!==!1,column.allowSort=column.allowSort===!0,column.allowDrag=!!column.allowDrag,column.readOnly=!!column.readOnly,column.autoEscape=!!column.autoEscape,void 0!=column.digit&&(column.decimalPlaces=column.digit),column._id||(column._id=mini.DataGrid.ColumnID++),column._gridUID=this.uid,column._rowIdField=this._rowIdField,column._pid=parentColumn==this?-1:parentColumn._id,this._idColumns[column._id]=column,column.name&&(this._nameColumns[column.name]=column),column.columns&&0!=column.columns.length||this._bottomColumns.push(column),column.level=level,level+=1,this.eachColumns(column,init,this),level-=1,column.level>this.maxColumnLevel&&(this.maxColumnLevel=column.level),"string"==typeof column.editor){var cls=mini.getClass(column.editor);cls?column.editor={type:column.editor}:column.editor=eval("("+column.editor+")")}"string"==typeof column.filter&&(column.filter=eval("("+column.filter+")")),column.filter&&!column.filter.el&&(column.filter=mini.create(column.filter)),"function"==typeof column.init&&1!=column.inited&&column.init(this),column.inited=!0}mini.isArray(value)||(value=[]),this.columns=value,this._idColumns={},this._nameColumns={},this._bottomColumns=[],this.maxColumnLevel=0;var level=0;this.eachColumns(this,init,this),this._doUpdateFilterRow&&this._doUpdateFilterRow(),this.doUpdate(),this.fire("columnschanged")},getColumns:function(){return this.columns},getBottomColumns:function(){return this._bottomColumns},getVisibleColumns:function(){for(var a=this.getBottomColumns(),b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.visible&&b.push(e)}return b},getBottomVisibleColumns:function(){for(var a=[],b=0,c=this._bottomColumns.length;c>b;b++){var d=this._bottomColumns[b];this.isVisibleColumn(d)&&a.push(d)}return a},eachColumns:function(a,b,c){var d=a.columns;if(d)for(var e=d.clone(),f=0,g=e.length;g>f;f++){var h=e[f];if(b.call(c,h,f,a)===!1)break}},getColumn:function(a){var b=typeof a;return"number"==b?this.getBottomColumns()[a]:"object"==b?a:this._nameColumns[a]},getColumnByField:function(a){if(a){for(var b=this.getBottomColumns(),c=0,d=b.length;d>c;c++){var e=b[c];if(e.field==a)return e}return e}},_getColumnById:function(a){return this._idColumns[a]},getParentColumn:function(a){a=this.getColumn(a);var b=a._pid;return-1==b?this:this._idColumns[b]},getAncestorColumns:function(a){for(var b=[];;){var c=this.getParentColumn(a);if(!c||c==this)break;b[b.length]=c,a=c}return b.reverse(),b},isAncestorColumn:function(a,b){if(a==b)return!0;if(!a||!b)return!1;for(var c=this.getAncestorColumns(b),d=0,e=c.length;e>d;d++)if(c[d]==a)return!0;return!1},isVisibleColumn:function(a){a=this.getColumn(a);for(var b=this.getAncestorColumns(a),c=0,d=b.length;d>c;c++)if(0==b[c].visible)return!1;return!0},updateColumn:function(a,b){a=this.getColumn(a),a&&(mini.copyTo(a,b),this.setColumns(this.columns))},removeColumn:function(a){a=this.getColumn(a);var b=this.getParentColumn(a);return a&&b&&(b.columns.remove(a),this.setColumns(this.columns)),a},moveColumn:function(a,b,c){if(a=this.getColumn(a),b=this.getColumn(b),a&&b&&c&&a!=b&&!this.isAncestorColumn(a,b)){var d=this.getParentColumn(a);d&&d.columns.remove(a);var e=b,f=c;if("before"==f)e=this.getParentColumn(b),f=e.columns.indexOf(b);else if("after"==f)e=this.getParentColumn(b),f=e.columns.indexOf(b)+1;else if("add"==f||"append"==f)e.columns||(e.columns=[]),f=e.columns.length;else if(!mini.isNumber(f))return;e.columns.insert(f,a),this.setColumns(this.columns)}},hideColumns:function(a){this.allowCellEdit&&this.commitEdit();for(var b=0,c=a.length;c>b;b++){var d=this.getColumn(a[b]);d&&(d.visible=!1)}this.setColumns(this.columns)},showColumns:function(a){this.allowCellEdit&&this.commitEdit();for(var b=0,c=a.length;c>b;b++){var d=this.getColumn(a[b]);d&&(d.visible=!0)}this.setColumns(this.columns)},hideColumn:function(a){a=this.getColumn(a),a&&(this.allowCellEdit&&this.commitEdit(),a.visible=!1,this.setColumns(this.columns))},showColumn:function(a){a=this.getColumn(a),a&&(this.allowCellEdit&&this.commitEdit(),a.visible=!0,this.setColumns(this.columns))},getColumnRows:function(){function a(a){for(var b=mini.treeToArray(a.columns,"columns"),c=0,d=0,e=b.length;e>d;d++){var f=b[d];1==f.visible&&1!=f._hide&&(f.columns&&0!=f.columns.length||(c+=1))}return c}for(var b=this.getMaxColumnLevel(),c=[],d=0,e=b;e>=d;d++)c.push([]);for(var f=mini.treeToArray(this.columns,"columns"),d=0,e=f.length;e>d;d++){var g=f[d],h=c[g.level];g.columns&&g.columns.length>0&&(g.colspan=a(g)),(!g.columns||0==g.columns.length)&&g.level<b&&(g.rowspan=b-g.level+1),h.push(g)}return c},getMaxColumnLevel:function(){return this.maxColumnLevel},getPrint:function(a){var b=new mini.DataGrid_Print(this,a);return b}},mini.copyTo(mini.DataGrid.prototype,mini_Column_Prototype),mini._GridSort=function(a){this.grid=a,mini.on(a._headerEl,"mousemove",this.__OnGridHeaderMouseMove,this),mini.on(a._headerEl,"mouseout",this.__OnGridHeaderMouseOut,this)},mini._GridSort.prototype={destroy:function(a){if(this._focusedColumnEl){mini.clearEvent(this._focusedColumnEl);var b=this._focusedColumnEl.parentNode;b&&b.removeChild(this._focusedColumnEl),this._focusedColumnEl=null}},__OnGridHeaderMouseOut:function(a){this._focusedColumnEl&&mini.removeClass(this._focusedColumnEl,"mini-grid-headerCell-hover")},__OnGridHeaderMouseMove:function(a){var b=mini.findParent(a.target,"mini-grid-headerCell");b&&(mini.addClass(b,"mini-grid-headerCell-hover"),this._focusedColumnEl=b)},__onGridHeaderCellClick:function(a){}},mini._ColumnSplitter=function(a){this.grid=a,mini.on(this.grid.el,"mousedown",this.__onGridMouseDown,this),a.on("layout",this.__OnGridLayout,this)},mini._ColumnSplitter.prototype={destroy:function(a){this.splittersEl&&(mini.clearEvent(this.splittersEl),mini.removeNode(this.splittersEl),this.splittersEl=null),this.drag&&(this.drag.destroy(),this.drag=null)},__OnGridLayout:function(a){if(this.splittersEl&&mini.removeNode(this.splittersEl),!this.splitterTimer){var b=this.grid;if(0!=b.isDisplay()){var c=this;this.splitterTimer=setTimeout(function(){for(var a=b.getBottomColumns(),d=(a.length,mini.getBox(b._headerEl,!0)),e=b.getScrollLeft(),f=[],g=0,h=a.length;h>g;g++){var i=a[g],j=b.getColumnBox(i);if(!j)break;var k=j.top-d.top,l=j.right-d.left-2,m=j.height;b.isFrozen&&b.isFrozen()?g>=b.frozenStartColumn:l+=e;var n=b.getParentColumn(i);n&&n.columns&&n.columns[n.columns.length-1]==i&&m+5<d.height&&(k=0,m=d.height),b.allowResizeColumn&&i.allowResize&&(f[f.length]='<div id="'+i._id+'" class="mini-grid-splitter" style="left:'+(l-1)+"px;top:"+k+"px;height:"+m+'px;"></div>')}var o=f.join("");c.splittersEl=document.createElement("div"),c.splittersEl.className="mini-grid-splitters",c.splittersEl.innerHTML=o;var p=b._getHeaderScrollEl();p.appendChild(c.splittersEl),c.splitterTimer=null},100)}}},__onGridMouseDown:function(a){var b=this.grid,c=a.target;if(mini.hasClass(c,"mini-grid-splitter")){var d=b._idColumns[c.id];b.allowResizeColumn&&d&&d.allowResize&&(this.splitterColumn=d,this.getDrag().start(a))}},getDrag:function(){return this.drag||(this.drag=new mini.Drag({capture:!0,onStart:mini.createDelegate(this._OnDragStart,this),onMove:mini.createDelegate(this._OnDragMove,this),onStop:mini.createDelegate(this._OnDragStop,this)})),this.drag},_OnDragStart:function(a){var b=this.grid,c=b.getColumnBox(this.splitterColumn);this.columnBox=c,this._dragProxy=mini.append(document.body,'<div class="mini-grid-proxy"></div>');var d=b.getBox(!0);d.x=c.x,d.width=c.width,d.right=c.right,mini.setBox(this._dragProxy,d)},_OnDragMove:function(a){var b=this.grid,c=mini.copyTo({},this.columnBox),d=c.width+(a.now[0]-a.init[0]);d<b.columnMinWidth&&(d=b.columnMinWidth),d>b.columnMaxWidth&&(d=b.columnMaxWidth),mini.setWidth(this._dragProxy,d)},_OnDragStop:function(a){this.columnBox=null;var b=this.grid,c=mini.getBox(this._dragProxy),d=this,e=b.allowSortColumn;b.allowSortColumn=!1,setTimeout(function(){jQuery(d._dragProxy).remove(),d._dragProxy=null,b.allowSortColumn=e},10);var f=this.splitterColumn,g=parseInt(f.width);if(g+"%"!=f.width){var h=b.getColumnWidth(f),i=parseInt(g/h*c.width);b.setColumnWidth(f,i)}}},mini._ColumnMove=function(a){this.grid=a,mini.on(this.grid.el,"mousedown",this.__onGridMouseDown,this)},mini._ColumnMove.prototype={destroy:function(a){this.drag&&(this.drag.destroy(),this.drag=null)},__onGridMouseDown:function(a){var b=this.grid;if(!(b.isEditing&&b.isEditing()||mini.hasClass(a.target,"mini-grid-splitter")||a.button==mini.MouseButton.Right)){var c=mini.findParent(a.target,b._headerCellCls);if(c){this._remove();var d=b._getColumnByEvent(a);b.allowMoveColumn&&d&&d.allowMove&&(this.dragColumn=d,this._columnEl=c,this.getDrag().start(a))}}},getDrag:function(){return this.drag||(this.drag=new mini.Drag({capture:!1,onStart:mini.createDelegate(this._OnDragStart,this),onMove:mini.createDelegate(this._OnDragMove,this),onStop:mini.createDelegate(this._OnDragStop,this)})),this.drag},_OnDragStart:function(a){function b(a){var b=a.header;return"function"==typeof b&&(b=b.call(c,a)),(mini.isNull(b)||""===b)&&(b="&nbsp;"),b}var c=this.grid;this._dragProxy=mini.append(document.body,'<div class="mini-grid-columnproxy"></div>'),this._dragProxy.innerHTML='<div class="mini-grid-columnproxy-inner" style="height:26px;">'+b(this.dragColumn)+"</div>",mini.setXY(this._dragProxy,a.now[0]+15,a.now[1]+18),mini.addClass(this._dragProxy,"mini-grid-no"),this.moveTop=mini.append(document.body,'<div class="mini-grid-movetop"></div>'),this.moveBottom=mini.append(document.body,'<div class="mini-grid-movebottom"></div>')},_OnDragMove:function(a){var b=this.grid,c=a.now[0];mini.setXY(this._dragProxy,c+15,a.now[1]+18),this.targetColumn=this.insertAction=null;var d=mini.findParent(a.event.target,b._headerCellCls);if(d){var e=b._getColumnByEvent(a.event);if(e&&e!=this.dragColumn){var f=b.getParentColumn(this.dragColumn),g=b.getParentColumn(e);if(f==g){this.targetColumn=e,this.insertAction="before";var h=b.getColumnBox(this.targetColumn);c>h.x+h.width/2&&(this.insertAction="after")}}}if(this.targetColumn){mini.addClass(this._dragProxy,"mini-grid-ok"),mini.removeClass(this._dragProxy,"mini-grid-no");var i=b.getColumnBox(this.targetColumn);this.moveTop.style.display="block",this.moveBottom.style.display="block","before"==this.insertAction?(mini.setXY(this.moveTop,i.x-4,i.y-9),mini.setXY(this.moveBottom,i.x-4,i.bottom)):(mini.setXY(this.moveTop,i.right-4,i.y-9),mini.setXY(this.moveBottom,i.right-4,i.bottom))}else mini.removeClass(this._dragProxy,"mini-grid-ok"),mini.addClass(this._dragProxy,"mini-grid-no"),this.moveTop.style.display="none",this.moveBottom.style.display="none"},_remove:function(){this.grid;mini.removeNode(this._dragProxy),mini.removeNode(this.moveTop),mini.removeNode(this.moveBottom),this._dragProxy=this.moveTop=this.moveBottom=this.dragColumn=this.targetColumn=null},_OnDragStop:function(a){var b=this.grid;b.moveColumn(this.dragColumn,this.targetColumn,this.insertAction),this._remove()}},mini._GridSelect=function(a){this.grid=a,this.grid.on("cellmousedown",this.__onGridCellMouseDown,this),this.grid.on("cellclick",this.__onGridCellClick,this),this.grid.on("celldblclick",this.__onGridCellClick,this),mini.on(this.grid.el,"keydown",this.__OnGridKeyDown,this)},mini._GridSelect.prototype={destroy:function(a){delete this.currentRecord},__OnGridKeyDown:function(a){var b=this.grid;if(!(mini.isAncestor(b._filterEl,a.target)||mini.isAncestor(b._summaryEl,a.target)||mini.isAncestor(b._footerEl,a.target)||mini.findParent(a.target,"mini-grid-detailRow")||mini.findParent(a.target,"mini-grid-rowEdit"))){var c=b.getCurrentCell();if(!(a.shiftKey||a.ctrlKey||a.altKey)){(37==a.keyCode||38==a.keyCode||39==a.keyCode||40==a.keyCode)&&a.preventDefault();var d=b.getBottomVisibleColumns(),e=c?c[1]:null,f=c?c[0]:null;c||(f=b.getCurrent());var g=d.indexOf(e),h=b.indexOf(f),i=b.getData().length;switch(a.keyCode){case 9:if(b.allowCellEdit&&b.editOnTabKey)return a.preventDefault(),void b._beginEditNextCell(0==a.shiftKey);break;case 27:break;case 13:if(b.allowCellEdit&&b.editNextOnEnterKey&&(b.isEditingCell(c)||!e.editor))return void b._beginEditNextCell(0==a.shiftKey);b.allowCellEdit&&c&&!e.readOnly&&b.beginEditCell();break;case 37:e?g>0&&(g-=1):g=0;break;case 38:f?h>0&&(h-=1):h=0,0!=h&&b.isVirtualScroll()&&b._viewRegion.start>h&&(b._bodyEl.scrollTop-=b._rowHeight,b._tryUpdateScroll());break;case 39:e?g<d.length-1&&(g+=1):g=0;break;case 40:f?i-1>h&&(h+=1):h=0,b.isVirtualScroll()&&b._viewRegion.end<h&&(b._bodyEl.scrollTop+=b._rowHeight,b._tryUpdateScroll())}if(e=d[g],f=b.getAt(h),e&&f&&b.allowCellSelect){var c=[f,e];b.setCurrentCell(c),b.scrollIntoView(f,e)}b.onlyCheckSelection||f&&b.allowRowSelect&&(b.deselectAll(),b.setCurrent(f))}}},__onGridCellClick:function(a){var b=this.grid;if(0!=b.allowCellEdit&&this.grid.cellEditAction==a.type){var c=(a.record,a.column);c.readOnly||this.grid.isReadOnly()||a.htmlEvent.shiftKey||a.htmlEvent.ctrlKey||this.grid.beginEditCell()}},__onGridCellMouseDown:function(a){var b=this;b.__doSelect(a)},__doSelect:function(a){var b=a.record,c=a.column,d=this.grid;if(this.grid.allowCellSelect){var e=[b,c];this.grid.setCurrentCell(e)}if((!d.onlyCheckSelection||c._multiRowSelect)&&d.allowRowSelect)if(d.multiSelect)if(this.grid.el.onselectstart=function(){},a.htmlEvent.shiftKey)if(this.grid.el.onselectstart=function(){return!1},a.htmlEvent.preventDefault(),this.currentRecord){if(this.currentRecord._index==b._index)return;var f=this.currentRecord._index,g=b._index;this.currentRecord._index>b._index&&(f=b._index,g=this.currentRecord._index);for(var h=f;g>=h;h++)d.isSelected(h)||d.select(h)}else this.grid.select(b),this.currentRecord=this.grid.getSelected();else{if(this.grid.el.onselectstart=function(){},a.htmlEvent.ctrlKey){this.grid.el.onselectstart=function(){return!1};try{a.htmlEvent.preventDefault()}catch(i){}}a.column._multiRowSelect===!0||a.htmlEvent.ctrlKey||d.allowUnselect?d.isSelected(b)?d.deselect(b):d.select(b):d.isSelected(b)||(d.deselectAll(),d.select(b)),this.currentRecord=this.grid.getSelected()}else d.isSelected(b)?a.htmlEvent.ctrlKey&&d.deselectAll():(d.deselectAll(),d.select(b))}},mini._CellToolTip=function(a){this.grid=a,mini.on(this.grid.el,"mousemove",this.__onGridMouseMove,this),mini.on(this.grid.el,"mouseout",this.__onGridMouseOut,this)},mini._CellToolTip.prototype={destroy:function(a){},__onGridMouseMove:function(a){var b=this.grid,c=b._getCellByEvent(a),d=b._getCellEl(c.record,c.column),e=b.getCellError(c.record,c.column);if(d){if(e)return void(d.title=e.errorText);if(d.firstChild&&(mini.hasClass(d.firstChild,"mini-grid-cell-inner")||mini.hasClass(d.firstChild,"mini-treegrid-treecolumn-inner"))&&(d=d.firstChild),d.scrollWidth>d.clientWidth){var f=d.innerText||d.textContent||"";d.title=f.trim()}else d.title=""}},__onGridMouseOut:function(a){var b=this.grid,c=b._getCellByEvent(a),d=b._getCellEl(c.record,c.column);d&&(d.title="")}},mini._ColumnsMenu=function(a){this.grid=a,this.menu=this.createMenu(),mini.on(a.el,"contextmenu",this.__OnContextMenu,this)},mini._ColumnsMenu.prototype={destroy:function(a){this.arrowEl&&(mini.clearEvent(this.arrowEl),this.arrowEl.parentNode.removeChild(this.arrowEl),this.arrowEl=null)},createMenu:function(){var a=mini.create({type:"menu",hideOnClick:!1});return a.on("itemclick",this.__OnItemClick,this),a},updateMenu:function(){for(var a=this.grid,b=this.menu,c=a.getBottomColumns(),d=[],e=0,f=c.length;f>e;e++){var g=c[e],h={};h.checked=g.visible,h.checkOnClick=!0,h.text=a._createHeaderText(g),"&nbsp;"==h.text&&("indexcolumn"==g.type&&(h.text="\u5e8f\u53f7"),"checkcolumn"==g.type&&(h.text="\u9009\u62e9")),d.push(h),h._column=g}b.setItems(d)},__OnContextMenu:function(a){var b=this.grid;if(0!=b.showColumnsMenu&&0!=mini.isAncestor(b._headerEl,a.target))return this.updateMenu(),this.menu.showAtPos(a.pageX,a.pageY),!1},__OnItemClick:function(a){for(var b=this.grid,c=this.menu,d=(b.getBottomColumns(),c.getItems()),e=a.item,f=e._column,g=0,h=0,i=d.length;i>h;h++){var j=d[h];j.getChecked()&&g++}1>g&&e.setChecked(!0);var k=e.getChecked();k?b.showColumn(f):b.hideColumn(f)}},mini_CellValidator_Prototype={getCellErrors:function(){for(var a=this._cellErrors.clone(),b=this.data,c=0,d=a.length;d>c;c++){var e=a[c],f=e.record,g=e.column;if(-1==b.indexOf(f)){var h=f[this._rowIdField]+"$"+g._id;delete this._cellMapErrors[h],this._cellErrors.remove(e)}}return this._cellErrors},getCellError:function(a,b){if(a=this.getNode?this.getNode(a):this._getRow(a),b=this.getColumn(b),a&&b){var c=a[this._rowIdField]+"$"+b._id;return this._cellMapErrors[c]}},validateEditors:function(){for(var a=this.data,b=0,c=a.length;c>b;b++)for(var d=a[b],e=this.getBottomColumns(),b=0,c=e.length;c>b;b++){var f=e[b],g=this.getCellEditor(f,d);g&&g.validate()}},isEditorsValid:function(){for(var a=this.data,b=0,c=a.length;c>b;b++)for(var d=a[b],e=this.getBottomColumns(),b=0,c=e.length;c>b;b++){var f=e[b],g=this.getCellEditor(f,d);if(g&&!g.isValid())return!1}return!0},isValid:function(){return 0==this.getCellErrors().length},validate:function(){for(var a=this.data,b=0,c=a.length;c>b;b++){var d=a[b];this.validateRow(d)}},validateRow:function(a){for(var b=this.getBottomColumns(),c=0,d=b.length;d>c;c++){var e=b[c];this.validateCell(a,e)}},validateCell:function(a,b){if(a=this.getNode?this.getNode(a):this._getRow(a),b=this.getColumn(b),a&&b){var c={record:a,row:a,node:a,column:b,field:b.field,value:a[b.field],isValid:!0,errorText:""};if(b.vtype&&mini._ValidateVType(b.vtype,c.value,c,b),1==c.isValid&&b.unique&&b.field)for(var d={},e=this.data,f=b.field,g=0,h=e.length;h>g;g++){var i=e[g],j=i[f];if(mini.isNull(j)||""===j);else{var k=d[j];if(k&&i==a){c.isValid=!1,c.errorText=mini._getErrorText(b,"uniqueErrorText"),this.setCellIsValid(k,b,c.isValid,c.errorText);break}d[j]=i}}this.fire("cellvalidation",c),this.setCellIsValid(a,b,c.isValid,c.errorText)}},setIsValid:function(a){if(a)for(var b=this._cellErrors.clone(),c=0,d=b.length;d>c;c++){var e=b[c];this.setCellIsValid(e.record,e.column,!0)}},_removeRowError:function(a){for(var b=this.getColumns(),c=0,d=b.length;d>c;c++){var e=b[c],f=a[this._rowIdField]+"$"+e._id,g=this._cellMapErrors[f];g&&(delete this._cellMapErrors[f],this._cellErrors.remove(g))}},setCellIsValid:function(a,b,c,d){if(a=this.getNode?this.getNode(a):this._getRow(a),b=this.getColumn(b),a&&b){var e=a[this._rowIdField]+"$"+b._id,f=this._getCellEl(a,b),g=this._cellMapErrors[e];delete this._cellMapErrors[e],this._cellErrors.remove(g),c===!0?f&&g&&mini.removeClass(f,"mini-grid-cell-error"):(g={record:a,column:b,isValid:c,errorText:d},this._cellMapErrors[e]=g,this._cellErrors.add(g),f&&mini.addClass(f,"mini-grid-cell-error"))}}},mini.copyTo(mini.DataGrid.prototype,mini_CellValidator_Prototype),mini.DataGrid_Print=function(a,b){this.grid=a,this.config=mini.copyTo({printColumn:null,columnWidth:null},b)},mini.DataGrid_Print.prototype={getHtml:function(){var a='<table class="datagrid-print-table">'+this._createHead()+this._createBody()+"</table>";return a},getBodyHtml:function(){return this._createBody()},getHeadHtml:function(){return this._createHead()},setColumn:function(a){this.config.printColumn=a},setColumnWidth:function(a){this.config.columnWidth=a},_createHead:function(){var a="#mini-grid-table-head"+this.grid.getId();this.$printHeadTable=$(a).children(":first").clone(),this._removeHeanUnUseable();var b=this.$printHeadTable.html();return"<thead>"+b+"</thead>"},_createBody:function(){if(this.grid.isVirtualScroll())return this._createBodyVirtual();var a="#mini-grid-table-body"+this.grid.getId();this.$printBodyTable=$(a).clone(),this._removeBodyUnUseable();var b=this.$printBodyTable.html();return b},_createBodyVirtual:function(){var a=[];a[a.length]="<tbody>";for(var b=this.grid.getData(),c=0,d=b.length;d>c;c++){var e=b[c];this.grid._createRow(e,a,c)}return a[a.length]="</tbody>",a.join("")},_removeBodyUnUseable:function(){this.$printBodyTable.find("tr:first").remove(),this.$printBodyTable.find("td").each(function(){$(this).removeAttr("id"),$(this).removeAttr("class")}),this.$printBodyTable.find("tr").each(function(){$(this).removeAttr("id"),$(this).removeAttr("class")})},_removeHeanUnUseable:function(){this.$printHeadTable.find("tr:first").remove(),this.$printHeadTable.find("td").each(function(){$(this).removeAttr("id"),$(this).removeAttr("class");var a=$(this).children(".mini-grid-cellInner:first"),b=a.html();a.remove(),$(this).append(b),$(this).children(".mini-grid-sortIcon").detach()}),this.$printHeadTable.find("tr").each(function(){$(this).removeAttr("id"),$(this).removeAttr("class")})}},mini.RadioButtonList=function(){mini.RadioButtonList.superclass.constructor.call(this)},mini.extend(mini.RadioButtonList,mini.CheckBoxList,{multiSelect:!1,_itemCls:"mini-radiobuttonlist-item",_itemHoverCls:"mini-radiobuttonlist-item-hover",_itemSelectedCls:"mini-radiobuttonlist-item-selected",
_tableCls:"mini-radiobuttonlist-table",_tdCls:"mini-radiobuttonlist-td",_checkType:"radio",uiCls:"mini-radiobuttonlist"}),mini.regClass(mini.RadioButtonList,"radiobuttonlist"),mini.Spinner=function(){mini.Spinner.superclass.constructor.call(this),this.setValue(this.minValue,!1)},mini.extend(mini.Spinner,mini.ButtonEdit,{value:0,minValue:0,maxValue:100,increment:1,decimalPlaces:0,changeOnMousewheel:!0,allowLimitValue:!0,set:function(a){if("string"==typeof a)return this;var b=a.value;return delete a.value,mini.Spinner.superclass.set.call(this,a),mini.isNull(b)||this.setValue(b,this.defaultValueTriggerChange),this},uiCls:"mini-spinner",_getButtonHtml:function(){var a="onmouseover=\"mini.addClass(this, '"+this._buttonHoverCls+"');\" onmouseout=\"mini.removeClass(this, '"+this._buttonHoverCls+"');\"";return'<span class="mini-buttonedit-button" '+a+'><span class="mini-buttonedit-up"><span></span></span><span class="mini-buttonedit-down"><span></span></span></span>'},_initEvents:function(){mini.Spinner.superclass._initEvents.call(this),mini._BindEvents(function(){this.on("buttonmousedown",this.__OnButtonMouseDown,this),mini.on(this.el,"mousewheel",this.__OnMousewheel,this)},this)},_ValueLimit:function(){0!=this.allowLimitValue&&(this.minValue>this.maxValue&&(this.maxValue=this.minValue+100),this.value<this.minValue&&this.setValue(this.minValue,!1),this.value>this.maxValue&&this.setValue(this.maxValue,!1))},getFormValue:function(){var a=this.value;a=parseFloat(a),isNaN(a)&&(a=0);var b=String(a).split("."),c=b[0],d=b[1];if(d||(d=""),this.decimalPlaces>0){for(var e=d.length,f=this.decimalPlaces;f>e;e++)d+="0";d="."+d}return c+d},setValue:function(a,b){a=parseFloat(a),isNaN(a)&&(a=this.defaultValue),a=parseFloat(a),isNaN(a)&&(a=this.minValue),a=parseFloat(a.toFixed(this.decimalPlaces)),mini.isEquals(this.value,a)?this.text=this._textEl.value=this.getFormValue():(this.value=a,this._ValueLimit(),this._valueEl.value=this.value,this.text=this._textEl.value=this.getFormValue(),void 0===b&&(b=!0),b&&this._OnValueChanged())},setMaxValue:function(a){a=parseFloat(a),isNaN(a)||(a=parseFloat(a.toFixed(this.decimalPlaces)),this.maxValue!=a&&(this.maxValue=a,this._ValueLimit()))},getMaxValue:function(a){return this.maxValue},setMinValue:function(a){a=parseFloat(a),isNaN(a)||(a=parseFloat(a.toFixed(this.decimalPlaces)),this.minValue!=a&&(this.minValue=a,this._ValueLimit()))},getMinValue:function(a){return this.minValue},setIncrement:function(a){a=parseFloat(a),isNaN(a)||this.increment!=a&&(this.increment=a)},getIncrement:function(a){return this.increment},setDecimalPlaces:function(a){a=parseInt(a),isNaN(a)||0>a||(this.decimalPlaces=a)},getDecimalPlaces:function(a){return this.decimalPlaces},setChangeOnMousewheel:function(a){this.changeOnMousewheel=a},getChangeOnMousewheel:function(a){return this.changeOnMousewheel},setAllowLimitValue:function(a){this.allowLimitValue=a},getAllowLimitValue:function(a){return this.allowLimitValue},_SpinTimer:null,_StartSpin:function(a,b,c){this._StopSpin(),this.setValue(this.value+a,!1);var d=this,e=c,f=new Date;this._SpinTimer=setInterval(function(){d.setValue(d.value+a,!1),c--,0==c&&b>50&&d._StartSpin(a,b-100,e+3);var g=new Date;g-f>500&&d._StopSpin(),f=g},b),mini.on(document,"mouseup",this._OnDocumentMouseUp,this)},_StopSpin:function(){clearInterval(this._SpinTimer),this._SpinTimer=null},__OnButtonMouseDown:function(a){this._DownValue=this.getValue(),this.__OnInputTextChanged(),"up"==a.spinType?this._StartSpin(this.increment,230,2):this._StartSpin(-this.increment,230,2)},__OnInputKeyDown:function(a){mini.Spinner.superclass.__OnInputKeyDown.call(this,a);var b=mini.Keyboard;switch(a.keyCode){case b.Top:this.setValue(this.value+this.increment);break;case b.Bottom:this.setValue(this.value-this.increment)}},__OnMousewheel:function(a){if(!this.isReadOnly()&&0!=this.changeOnMousewheel){var b=a.wheelDelta||a.originalEvent.wheelDelta;mini.isNull(b)&&(b=24*-a.detail);var c=this.increment;return 0>b&&(c=-c),this.setValue(this.value+c),!1}},_OnDocumentMouseUp:function(a){this._StopSpin(),mini.un(document,"mouseup",this._OnDocumentMouseUp,this),this._DownValue!=this.getValue()&&this._OnValueChanged()},__OnInputTextChanged:function(a){var b=(this.getValue(),parseFloat(this._textEl.value));this.setValue(b)},getAttrs:function(a){var b=mini.Spinner.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["minValue","maxValue","increment","decimalPlaces","changeOnMousewheel"]),mini._ParseBool(a,b,["allowLimitValue"]),b}}),mini.regClass(mini.Spinner,"spinner"),mini.SplitButton=function(){mini.SplitButton.superclass.constructor.call(this)},mini.extend(mini.SplitButton,mini.MenuButton,{uiCls:"mini-splitbutton",allowCls:"mini-button-split"}),mini.regClass(mini.SplitButton,"splitbutton"),mini.Splitter=function(){this._initPanes(),mini.Splitter.superclass.constructor.call(this)},mini.extend(mini.Splitter,mini.Control,{width:300,height:180,vertical:!1,allowResize:!0,pane1:null,pane2:null,showHandleButton:!0,handlerStyle:"",handlerCls:"",handlerSize:5,uiCls:"mini-splitter",_create:function(){this.el=document.createElement("div"),this.el.className="mini-splitter",this.el.innerHTML='<div class="mini-splitter-border"><div id="1" class="mini-splitter-pane mini-splitter-pane1"></div><div id="2" class="mini-splitter-pane mini-splitter-pane2"></div><div class="mini-splitter-handler"></div></div>',this._borderEl=this.el.firstChild,this._pane1El=this._borderEl.firstChild,this._pane2El=this._borderEl.childNodes[1],this._handlerEl=this._borderEl.lastChild},_initEvents:function(){mini._BindEvents(function(){mini.on(this.el,"click",this.__OnClick,this),mini.on(this.el,"mousedown",this.__OnMouseDown,this)},this)},_initPanes:function(){this.pane1={id:"",index:1,minSize:30,maxSize:3e3,size:"",showCollapseButton:!1,cls:"",style:"",visible:!0,expanded:!0},this.pane2=mini.copyTo({},this.pane1),this.pane2.index=2},doUpdate:function(){this.doLayout()},doLayout:function(){if(this.canLayout()){this._handlerEl.style.cursor=this.allowResize?"":"default",mini.removeClass(this.el,"mini-splitter-vertical"),this.vertical&&mini.addClass(this.el,"mini-splitter-vertical"),mini.removeClass(this._pane1El,"mini-splitter-pane1-vertical"),mini.removeClass(this._pane2El,"mini-splitter-pane2-vertical"),this.vertical&&(mini.addClass(this._pane1El,"mini-splitter-pane1-vertical"),mini.addClass(this._pane2El,"mini-splitter-pane2-vertical")),mini.removeClass(this._handlerEl,"mini-splitter-handler-vertical"),this.vertical&&mini.addClass(this._handlerEl,"mini-splitter-handler-vertical");var a=this.getHeight(!0),b=this.getWidth(!0);if(!jQuery.boxModel){var c=mini.getBorders(this._borderEl);a=a+c.top+c.bottom,b=b+c.left+c.right}this._borderEl.style.width=b+"px",this._borderEl.style.height=a+"px";var d=this._pane1El,e=this._pane2El;jQuery(d),jQuery(e);d.style.display=e.style.display=this._handlerEl.style.display="";var f=this.handlerSize;this.pane1.size=String(this.pane1.size),this.pane2.size=String(this.pane2.size);var g=parseFloat(this.pane1.size),h=parseFloat(this.pane2.size),i=isNaN(g),j=isNaN(h),k=!isNaN(g)&&-1!=this.pane1.size.indexOf("%"),l=!isNaN(h)&&-1!=this.pane2.size.indexOf("%"),m=!i&&!k,n=!j&&!l,o=this.vertical?a-this.handlerSize:b-this.handlerSize,p=p2Size=0;if(i||j)i&&j?(p=parseInt(o/2),p2Size=o-p):m?(p=g,p2Size=o-p):k?(p=parseInt(o*g/100),p2Size=o-p):n?(p2Size=h,p=o-p2Size):l&&(p2Size=parseInt(o*h/100),p=o-p2Size);else if(k&&n)p2Size=h,p=o-p2Size;else if(m&&l)p=g,p2Size=o-p;else{var q=g+h;p=parseInt(o*g/q),p2Size=o-p}p>this.pane1.maxSize&&(p=this.pane1.maxSize,p2Size=o-p),p2Size>this.pane2.maxSize&&(p2Size=this.pane2.maxSize,p=o-p2Size),p<this.pane1.minSize&&(p=this.pane1.minSize,p2Size=o-p),p2Size<this.pane2.minSize&&(p2Size=this.pane2.minSize,p=o-p2Size),0==this.pane1.expanded?(p2Size=o,p=0,d.style.display="none"):0==this.pane2.expanded&&(p=o,p2Size=0,e.style.display="none"),0==this.pane1.visible?(p2Size=o+f,p=f=0,d.style.display="none",this._handlerEl.style.display="none"):0==this.pane2.visible&&(p=o+f,p2Size=f=0,e.style.display="none",this._handlerEl.style.display="none"),this.vertical?(mini.setWidth(d,b),mini.setWidth(e,b),mini.setHeight(d,p),mini.setHeight(e,p2Size),e.style.top=p+f+"px",this._handlerEl.style.left="0px",this._handlerEl.style.top=p+"px",mini.setWidth(this._handlerEl,b),mini.setHeight(this._handlerEl,this.handlerSize),d.style.left="0px",e.style.left="0px"):(mini.setWidth(d,p),mini.setWidth(e,p2Size),mini.setHeight(d,a),mini.setHeight(e,a),e.style.left=p+f+"px",this._handlerEl.style.top="0px",this._handlerEl.style.left=p+"px",mini.setWidth(this._handlerEl,this.handlerSize),mini.setHeight(this._handlerEl,a),d.style.top="0px",e.style.top="0px");var r='<div class="mini-splitter-handler-buttons">';this.pane1.expanded&&this.pane2.expanded?(this.pane1.showCollapseButton&&(r+='<a id="1" class="mini-splitter-pane1-button"></a>'),this.allowResize&&(this.pane1.showCollapseButton||this.pane2.showCollapseButton||(r+='<span class="mini-splitter-resize-button"></span>')),this.pane2.showCollapseButton&&(r+='<a id="2" class="mini-splitter-pane2-button"></a>')):this.pane1.expanded?this.pane2.showCollapseButton&&(r+='<a id="2" class="mini-splitter-pane1-button"></a>'):this.pane1.showCollapseButton&&(r+='<a id="1" class="mini-splitter-pane2-button"></a>'),r+="</div>",this._handlerEl.innerHTML=r;var s=this._handlerEl.firstChild;s.style.display=this.showHandleButton?"":"none";var t=mini.getBox(s);this.vertical?s.style.marginLeft=-t.width/2+"px":s.style.marginTop=-t.height/2+"px",this.pane1.visible&&this.pane2.visible&&this.pane1.expanded&&this.pane2.expanded?mini.removeClass(this._handlerEl,"mini-splitter-nodrag"):mini.addClass(this._handlerEl,"mini-splitter-nodrag"),mini.layout(this._borderEl),this.fire("layout")}},getPaneBox:function(a){var b=this.getPaneEl(a);return b?mini.getBox(b):null},getPane:function(a){return 1==a?this.pane1:2==a?this.pane2:a},setPanes:function(a){if(mini.isArray(a))for(var b=0;2>b;b++){var c=a[b];this.updatePane(b+1,c)}},setPaneControls:function(a,b){var c=this.getPane(a);if(c){var d=this.getPaneEl(a);__mini_setControls(b,d,this)}},getPaneEl:function(a){return 1==a?this._pane1El:this._pane2El},updatePane:function(a,b){var c=this.getPane(a);if(c){mini.copyTo(c,b);var d=this.getPaneEl(a),e=c.body;if(delete c.body,e){mini.isArray(e)||(e=[e]);for(var f=0,g=e.length;g>f;f++)mini.append(d,e[f])}if(c.bodyParent)for(var h=c.bodyParent;h.firstChild;)d.appendChild(h.firstChild);if(delete c.bodyParent,d.id=c.id,mini.setStyle(d,c.style),mini.addClass(d,c["class"]),c.controls){var a=c==this.pane1?1:2;this.setPaneControls(a,c.controls),delete c.controls}this.doUpdate()}},setShowHandleButton:function(a){this.showHandleButton=a,this.doUpdate()},getShowHandleButton:function(a){return this.showHandleButton},setVertical:function(a){this.vertical=a,this.doUpdate()},getVertical:function(){return this.vertical},expandPane:function(a){var b=this.getPane(a);if(b){b.expanded=!0,this.doUpdate();var c={pane:b,paneIndex:this.pane1==b?1:2};this.fire("expand",c)}},collapsePane:function(a){var b=this.getPane(a);if(b){b.expanded=!1;var c=b==this.pane1?this.pane2:this.pane1;0==c.expanded&&(c.expanded=!0,c.visible=!0),this.doUpdate();var d={pane:b,paneIndex:this.pane1==b?1:2};this.fire("collapse",d)}},togglePane:function(a){var b=this.getPane(a);b&&(b.expanded?this.collapsePane(b):this.expandPane(b))},showPane:function(a){var b=this.getPane(a);b&&(b.visible=!0,this.doUpdate())},hidePane:function(a){var b=this.getPane(a);if(b){b.visible=!1;var c=b==this.pane1?this.pane2:this.pane1;0==c.visible&&(c.expanded=!0,c.visible=!0),this.doUpdate()}},setAllowResize:function(a){this.allowResize!=a&&(this.allowResize=a,this.doLayout())},getAllowResize:function(){return this.allowResize},setHandlerSize:function(a){this.handlerSize!=a&&(this.handlerSize=a,this.doLayout())},getHandlerSize:function(){return this.handlerSize},__OnClick:function(a){var b=a.target;if(mini.isAncestor(this._handlerEl,b)){var c=parseInt(b.id),d=this.getPane(c),a={pane:d,paneIndex:c,cancel:!1};d.expanded?this.fire("beforecollapse",a):this.fire("beforeexpand",a),1!=a.cancel&&("mini-splitter-pane1-button"==b.className?this.togglePane(c):"mini-splitter-pane2-button"==b.className&&this.togglePane(c))}},_OnButtonClick:function(a,b){this.fire("buttonclick",{pane:a,index:this.pane1==a?1:2,htmlEvent:b})},onButtonClick:function(a,b){this.on("buttonclick",a,b)},__OnMouseDown:function(a){var b=a.target;if(this.allowResize&&this.pane1.visible&&this.pane2.visible&&this.pane1.expanded&&this.pane2.expanded&&mini.isAncestor(this._handlerEl,b))if("mini-splitter-pane1-button"==b.className||"mini-splitter-pane2-button"==b.className);else{var c=this._getDrag();c.start(a)}},_getDrag:function(){return this.drag||(this.drag=new mini.Drag({capture:!0,onStart:mini.createDelegate(this._OnDragStart,this),onMove:mini.createDelegate(this._OnDragMove,this),onStop:mini.createDelegate(this._OnDragStop,this)})),this.drag},_OnDragStart:function(a){this._maskProxy=mini.append(document.body,'<div class="mini-resizer-mask"></div>'),this._dragProxy=mini.append(document.body,'<div class="mini-proxy"></div>'),this._dragProxy.style.cursor=this.vertical?"n-resize":"w-resize",this.handlerBox=mini.getBox(this._handlerEl),this.elBox=mini.getBox(this._borderEl,!0),mini.setBox(this._dragProxy,this.handlerBox)},_OnDragMove:function(a){if(this.handlerBox){this.elBox||(this.elBox=mini.getBox(this._borderEl,!0));var b=this.elBox.width,c=this.elBox.height,d=(this.handlerSize,this.vertical?c-this.handlerSize:b-this.handlerSize,this.pane1.minSize),e=this.pane1.maxSize,f=this.pane2.minSize,g=this.pane2.maxSize;if(1==this.vertical){var h=a.now[1]-a.init[1],i=this.handlerBox.y+h;i-this.elBox.y>e&&(i=this.elBox.y+e),i+this.handlerBox.height<this.elBox.bottom-g&&(i=this.elBox.bottom-g-this.handlerBox.height),i-this.elBox.y<d&&(i=this.elBox.y+d),i+this.handlerBox.height>this.elBox.bottom-f&&(i=this.elBox.bottom-f-this.handlerBox.height),mini.setY(this._dragProxy,i)}else{var j=a.now[0]-a.init[0],k=this.handlerBox.x+j;k-this.elBox.x>e&&(k=this.elBox.x+e),k+this.handlerBox.width<this.elBox.right-g&&(k=this.elBox.right-g-this.handlerBox.width),k-this.elBox.x<d&&(k=this.elBox.x+d),k+this.handlerBox.width>this.elBox.right-f&&(k=this.elBox.right-f-this.handlerBox.width),mini.setX(this._dragProxy,k)}}},_OnDragStop:function(a){var b=this.elBox.width,c=this.elBox.height,d=(this.handlerSize,parseFloat(this.pane1.size)),e=parseFloat(this.pane2.size),f=isNaN(d),g=isNaN(e),h=!isNaN(d)&&-1!=this.pane1.size.indexOf("%"),i=!isNaN(e)&&-1!=this.pane2.size.indexOf("%"),j=!f&&!h,k=!g&&!i,l=this.vertical?c-this.handlerSize:b-this.handlerSize,m=mini.getBox(this._dragProxy),n=m.x-this.elBox.x,o=l-n;this.vertical&&(n=m.y-this.elBox.y,o=l-n),f||g?f&&g?(d=parseFloat(n/l*100).toFixed(1),this.pane1.size=d+"%"):j?(d=n,this.pane1.size=d):h?(d=parseFloat(n/l*100).toFixed(1),this.pane1.size=d+"%"):k?(e=o,this.pane2.size=e):i&&(e=parseFloat(o/l*100).toFixed(1),this.pane2.size=e+"%"):h&&k?this.pane2.size=o:j&&i?this.pane1.size=n:(this.pane1.size=parseFloat(n/l*100).toFixed(1),this.pane2.size=100-this.pane1.size),jQuery(this._dragProxy).remove(),jQuery(this._maskProxy).remove(),this._maskProxy=null,this._dragProxy=null,this.elBox=this.handlerBox=null,this.doLayout(),this.fire("resize")},getAttrs:function(a){var b=mini.Splitter.superclass.getAttrs.call(this,a);mini._ParseBool(a,b,["allowResize","vertical","showHandleButton","onresize"]),mini._ParseInt(a,b,["handlerSize"]);for(var c=[],d=mini.getChildNodes(a),e=0,f=2;f>e;e++){var g=d[e],h=(jQuery(g),{});c.push(h),g&&(h.style=g.style.cssText,mini._ParseString(g,h,["cls","size","id","class"]),mini._ParseBool(g,h,["visible","expanded","showCollapseButton"]),mini._ParseInt(g,h,["minSize","maxSize","handlerSize"]),h.bodyParent=g)}return b.panes=c,b}}),mini.regClass(mini.Splitter,"splitter"),mini.Tabs=function(){this._initTabs(),mini.Tabs.superclass.constructor.call(this)},mini.extend(mini.Tabs,mini.Control,{activeIndex:-1,tabAlign:"left",tabPosition:"top",showBody:!0,showHeader:!0,nameField:"name",titleField:"title",urlField:"url",url:"",maskOnLoad:!0,plain:!0,bodyStyle:"",_tabHoverCls:"mini-tab-hover",_tabActiveCls:"mini-tab-active",set:function(a){if("string"==typeof a)return this;var b=this._allowLayout;this._allowLayout=!1;var c=a.activeIndex;delete a.activeIndex;var d=a.url;return delete a.url,mini.Tabs.superclass.set.call(this,a),d&&this.setUrl(d),mini.isNumber(c)&&this.setActiveIndex(c),this._allowLayout=b,this.doLayout(),this},uiCls:"mini-tabs",_create:function(){this.el=document.createElement("div"),this.el.className="mini-tabs";var a='<table class="mini-tabs-table" cellspacing="0" cellpadding="0"><tr style="width:100%;"><td></td><td style="text-align:left;vertical-align:top;width:100%;"><div class="mini-tabs-bodys"></div></td><td></td></tr></table>';this.el.innerHTML=a,this._tableEl=this.el.firstChild;var b=this.el.getElementsByTagName("td");this._td1El=b[0],this._td2El=b[1],this._td3El=b[2],this._bodyEl=this._td2El.firstChild,this._borderEl=this._bodyEl,this.doUpdate()},destroy:function(a){this._tableEl=this._td1El=this._td2El=this._td3El=null,this._bodyEl=this._borderEl=this.headerEl=null,this.tabs=[],mini.Tabs.superclass.destroy.call(this,a)},_doClearElement:function(){mini.removeClass(this._td1El,"mini-tabs-header"),mini.removeClass(this._td3El,"mini-tabs-header"),this._td1El.innerHTML="",this._td3El.innerHTML="",mini.removeChilds(this._td2El,this._bodyEl)},_initEvents:function(){mini._BindEvents(function(){mini.on(this.el,"mousedown",this.__OnMouseDown,this),mini.on(this.el,"click",this.__OnClick,this),mini.on(this.el,"mouseover",this.__OnMouseOver,this),mini.on(this.el,"mouseout",this.__OnMouseOut,this)},this)},_initTabs:function(){this.tabs=[]},_TabID:1,createTab:function(a){var b=mini.copyTo({_id:this._TabID++,name:"",title:"",newLine:!1,iconCls:"",iconStyle:"",headerCls:"",headerStyle:"",bodyCls:"",bodyStyle:"",visible:!0,enabled:!0,showCloseButton:!1,active:!1,url:"",loaded:!1,refreshOnClick:!1},a);return a&&(a=mini.copyTo(a,b),b=a),b},_doLoad:function(){var a=mini.getData(this.url);this.dataField&&(a=mini._getMap(this.dataField,a)),a||(a=[]),this.setTabs(a),this.fire("load")},load:function(a){"string"==typeof a?this.setUrl(a):this.setTabs(a)},setUrl:function(a){this.url=a,this._doLoad()},getUrl:function(){return this.url},setNameField:function(a){this.nameField=a},getNameField:function(){return this.nameField},setTitleField:function(a){this.titleField=a},getTitleField:function(){return this.titleField},setUrlField:function(a){this.urlField=a},getUrlField:function(){return this.urlField},setButtons:function(a){if(this._buttons=mini.byId(a),this._buttons){var b=mini.byClass("mini-tabs-buttons",this.el);b&&(b.appendChild(this._buttons),mini.parse(b),this.doLayout())}},setTabControls:function(a,b){var a=this.getTab(a);if(a){var c=this.getTabBodyEl(a);__mini_setControls(b,c,this)}},setTabs:function(a){if(mini.isArray(a)){this.beginUpdate(),this.removeAll();for(var b=0,c=a.length;c>b;b++){var d=a[b];d.title=mini._getMap(this.titleField,d),d.url=mini._getMap(this.urlField,d),d.name=mini._getMap(this.nameField,d)}for(var b=0,c=a.length;c>b;b++)this.addTab(a[b]);this.setActiveIndex(0),this.endUpdate()}},getTabs:function(){return this.tabs},removeAll:function(a){var b=this.getActiveTab();mini.isNull(a)&&(a=[]),mini.isArray(a)||(a=[a]);for(var c=a.length-1;c>=0;c--){var d=this.getTab(a[c]);d?a[c]=d:a.removeAt(c)}for(var e=this.tabs,c=e.length-1;c>=0;c--){var f=e[c];-1==a.indexOf(f)&&this.removeTab(f)}var g=a[0];b!=this.getActiveTab()&&g&&this.activeTab(g)},addTab:function(a,b){"string"==typeof a&&(a={title:a}),a=this.createTab(a),a.name||(a.name=""),"number"!=typeof b&&(b=this.tabs.length),this.tabs.insert(b,a);var c=this._createTabBodyId(a),d='<div id="'+c+'" class="mini-tabs-body '+a.bodyCls+'" style="'+a.bodyStyle+';display:none;"></div>';mini.append(this._bodyEl,d);var e=this.getTabBodyEl(a),f=a.body;if(delete a.body,f){mini.isArray(f)||(f=[f]);for(var g=0,h=f.length;h>g;g++)mini.append(e,f[g])}if(a.bodyParent)for(var i=a.bodyParent;i.firstChild;)8==i.firstChild.nodeType?i.removeChild(i.firstChild):e.appendChild(i.firstChild);return delete a.bodyParent,a.controls&&(this.setTabControls(a,a.controls),delete a.controls),this.doUpdate(),a},removeTab:function(a){if(a=this.getTab(a),a&&-1!=this.tabs.indexOf(a)){var b=this.getActiveTab(),c=a==b,d=this._OnTabDestroy(a);this.tabs.remove(a),this._doRemoveIFrame(a);var e=this.getTabBodyEl(a);if(e&&this._bodyEl.removeChild(e),d&&c){for(var f=this.activeIndex;f>=0;f--){var a=this.getTab(f);if(a&&a.enabled&&a.visible){this.activeIndex=f;break}}this.doUpdate(),this.setActiveIndex(this.activeIndex),this.fire("activechanged")}else this.activeIndex=this.tabs.indexOf(b),this.doUpdate();return a}},moveTab:function(a,b){if(a=this.getTab(a)){var c=this.tabs[b];if(c!=a){this.tabs.remove(a);var b=this.tabs.indexOf(c);-1==b?this.tabs.add(a):this.tabs.insert(b,a),this.doUpdate()}}},updateTab:function(a,b){a=this.getTab(a),a&&(mini.copyTo(a,b),this.doUpdate())},_getMaskWrapEl:function(){return this._bodyEl},_doRemoveIFrame:function(a,b){if(a._iframeEl&&a._iframeEl.parentNode){a._iframeEl.onload=function(){},jQuery(a._iframeEl).unbind("load"),a._iframeEl.src="";try{iframe.contentWindow.document.write(""),iframe.contentWindow.document.close()}catch(c){}a._iframeEl._ondestroy&&a._iframeEl._ondestroy();try{a._iframeEl.parentNode.removeChild(a._iframeEl),a._iframeEl.removeNode(!0)}catch(c){}}if(a._iframeEl=null,a.loadedUrl=null,b===!0){var d=this.getTabBodyEl(a);if(d)for(var e=mini.getChildNodes(d,!0),f=0,g=e.length;g>f;f++){var h=e[f];h&&h.parentNode&&h.parentNode.removeChild(h)}}},_deferLoadingTime:180,_cancelLoadTabs:function(a){for(var b=this.tabs,c=0,d=b.length;d>c;c++){var e=b[c];e!=a&&e._loading&&e._iframeEl&&(e._loading=!1,this._doRemoveIFrame(e,!0))}a&&a==this.getActiveTab()&&a._loading||(this._loading=!1,this.unmask())},_doLoadTab:function(a){if(a&&a==this.getActiveTab()){var b=this.getTabBodyEl(a);if(b){this._cancelLoadTabs(),this._doRemoveIFrame(a,!0),this._loading=!0,a._loading=!0,this.unmask(),this.maskOnLoad&&this.loading();var c=new Date,d=this;d.isLoading=!0;var e=mini.createIFrame(a.url,function(b,e){try{a._iframeEl.contentWindow.Owner=window,a._iframeEl.contentWindow.CloseOwnerWindow=function(b){a.removeAction=b;var c=!0;return a.ondestroy&&("string"==typeof a.ondestroy&&(a.ondestroy=window[a.ondestroy]),a.ondestroy&&(c=a.ondestroy.call(this,f))),c===!1?!1:void setTimeout(function(){d.removeTab(a)},10)}}catch(f){}if(1==a._loading){var g=c-new Date+d._deferLoadingTime;if(a._loading=!1,a.loadedUrl=a.url,0>g&&(g=0),setTimeout(function(){d.unmask(),d.doLayout(),d.isLoading=!1},g),e){var f={sender:d,tab:a,index:d.tabs.indexOf(a),name:a.name,iframe:a._iframeEl};a.onload&&("string"==typeof a.onload&&(a.onload=window[a.onload]),a.onload&&a.onload.call(d,f))}d.getActiveTab()==a&&d.fire("tabload",f)}});setTimeout(function(){a._iframeEl==e&&b.appendChild(e)},1),a._iframeEl=e}}},_OnTabDestroy:function(a){var b={sender:this,tab:a,index:this.tabs.indexOf(a),name:a.name,iframe:a._iframeEl,autoActive:!0};return this.fire("tabdestroy",b),b.autoActive},loadTab:function(a,b,c,d){if(a&&(b=this.getTab(b),b||(b=this.getActiveTab()),b)){var e=this.getTabBodyEl(b);e&&mini.addClass(e,"mini-tabs-hideOverflow"),b.url=a,delete b.loadedUrl,c&&(b.onload=c),d&&(b.ondestroy=d);var f=this;clearTimeout(this._loadTabTimer),this._loadTabTimer=null,this._loadTabTimer=setTimeout(function(){f._doLoadTab(b)},1)}},reloadTab:function(a){a=this.getTab(a),a||(a=this.getActiveTab()),a&&this.loadTab(a.url,a)},getTabRows:function(){for(var a=[],b=[],c=0,d=this.tabs.length;d>c;c++){var e=this.tabs[c];0!=c&&e.newLine&&(a.push(b),b=[]),b.push(e)}return a.push(b),a},doUpdate:function(){if(this._allowUpdate!==!1){if(this._buttons&&this._buttons.parentNode&&this._buttons.parentNode.removeChild(this._buttons),mini.removeClass(this.el,"mini-tabs-position-left"),mini.removeClass(this.el,"mini-tabs-position-top"),mini.removeClass(this.el,"mini-tabs-position-right"),mini.removeClass(this.el,"mini-tabs-position-bottom"),"bottom"==this.tabPosition?(mini.addClass(this.el,"mini-tabs-position-bottom"),this._doUpdateBottom()):"right"==this.tabPosition?(mini.addClass(this.el,"mini-tabs-position-right"),this._doUpdateRight()):"left"==this.tabPosition?(mini.addClass(this.el,"mini-tabs-position-left"),this._doUpdateLeft()):(mini.addClass(this.el,"mini-tabs-position-top"),this._doUpdateTop()),this._buttons){var a=mini.byClass("mini-tabs-buttons",this.el);a&&(a.appendChild(this._buttons),mini.parse(a))}this.doLayout(),this.setActiveIndex(this.activeIndex,!1)}},_handleIFrameOverflow:function(){var a=this.getTabBodyEl(this.activeIndex);if(a){mini.removeClass(a,"mini-tabs-hideOverflow");var b=mini.getChildNodes(a)[0];b&&b.tagName&&"IFRAME"==b.tagName.toUpperCase()&&mini.addClass(a,"mini-tabs-hideOverflow")}},doLayout:function(){if(this.canLayout()){this._headerEl.style.display=this.showHeader?"":"none",this._handleIFrameOverflow();var a=this.isAutoHeight();u=this.getHeight(!0),D=this.getWidth();var b=u,c=D;if(this.showBody?this._bodyEl.style.display="":this._bodyEl.style.display="none",this.plain?mini.addClass(this.el,"mini-tabs-plain"):mini.removeClass(this.el,"mini-tabs-plain"),!a&&this.showBody){var d=jQuery(this._headerEl).outerHeight(),e=jQuery(this._headerEl).outerWidth();if("top"==this.tabPosition&&(d=jQuery(this._headerEl.parentNode).outerHeight()),"left"==this.tabPosition||"right"==this.tabPosition?D-=e:u-=d,jQuery.boxModel){var f=mini.getPaddings(this._bodyEl),g=mini.getBorders(this._bodyEl);u=u-f.top-f.bottom-g.top-g.bottom,D=D-f.left-f.right-g.left-g.right}if(margin=mini.getMargins(this._bodyEl),u=u-margin.top-margin.bottom,D=D-margin.left-margin.right,0>u&&(u=0),0>D&&(D=0),this._bodyEl.style.width=D+"px",this._bodyEl.style.height=u+"px","left"==this.tabPosition||"right"==this.tabPosition){for(var h=this._headerEl.getElementsByTagName("tr")[0],i=h.childNodes,j=i[0].getElementsByTagName("tr"),k=last=all=0,l=0,m=j.length;m>l;l++){var h=j[l],n=jQuery(h).outerHeight();all+=n,0==l&&(k=n),l==m-1&&(last=n)}switch(this.tabAlign){case"center":for(var o=parseInt((b-(all-k-last))/2),l=0,m=i.length;m>l;l++){i[l].firstChild.style.height=b+"px";var p=i[l].firstChild,j=p.getElementsByTagName("tr"),q=j[0],r=j[j.length-1];q.style.height=o+"px",r.style.height=o+"px"}break;case"right":for(var l=0,m=i.length;m>l;l++){var p=i[l].firstChild,j=p.getElementsByTagName("tr"),h=j[0],s=b-(all-k);s>=0&&(h.style.height=s+"px")}break;case"fit":for(var l=0,m=i.length;m>l;l++)i[l].firstChild.style.height=b+"px";break;default:for(var l=0,m=i.length;m>l;l++){var p=i[l].firstChild,j=p.getElementsByTagName("tr"),h=j[j.length-1],s=b-(all-last);s>=0&&(h.style.height=s+"px")}}}}else this._bodyEl.style.width="auto",this._bodyEl.style.height="auto";var t=this.getTabBodyEl(this.activeIndex);if(t)if(!a&&this.showBody){var u=mini.getHeight(this._bodyEl,!0);if(jQuery.boxModel){var f=mini.getPaddings(t),g=mini.getBorders(t);u=u-f.top-f.bottom-g.top-g.bottom}t.style.height=u+"px"}else t.style.height="auto";switch(this.tabPosition){case"bottom":for(var v=this._headerEl.childNodes,l=0,m=v.length;m>l;l++){var p=v[l];mini.removeClass(p,"mini-tabs-header2"),m>1&&0!=l&&mini.addClass(p,"mini-tabs-header2")}break;case"left":for(var i=this._headerEl.firstChild.rows[0].cells,l=0,m=i.length;m>l;l++){var w=i[l];mini.removeClass(w,"mini-tabs-header2"),m>1&&0==l&&mini.addClass(w,"mini-tabs-header2")}break;case"right":for(var i=this._headerEl.firstChild.rows[0].cells,l=0,m=i.length;m>l;l++){var w=i[l];mini.removeClass(w,"mini-tabs-header2"),m>1&&0!=l&&mini.addClass(w,"mini-tabs-header2")}break;default:for(var v=this._headerEl.childNodes,l=0,m=v.length;m>l;l++){var p=v[l];mini.removeClass(p,"mini-tabs-header2"),m>1&&0==l&&mini.addClass(p,"mini-tabs-header2")}}mini.removeClass(this.el,"mini-tabs-scroll");var w=mini.byClass("mini-tabs-lastSpace",this.el),x=mini.byClass("mini-tabs-buttons",this.el),y=this._headerEl.parentNode;if(y.style.paddingRight="0px",this._navEl&&(this._navEl.style.display="none"),x&&(x.style.display="none"),mini.setWidth(y,c),"top"==this.tabPosition&&"left"==this.tabAlign){this._headerEl.style.width="auto",x.style.display="block";var z=c,A=this._headerEl.firstChild.offsetWidth-w.offsetWidth,B=x.firstChild?x.offsetWidth:0;if(A+B>z){this._navEl.style.display="block",this._navEl.style.right=B+"px";var C=this._navEl.offsetWidth,D=z-B-C;mini.setWidth(this._headerEl,D)}}this._scrollToTab(this.activeIndex),this._doScrollButton(),mini.layout(this._bodyEl);var E=this.getActiveTab();if(E&&E.repaint&&t){var D=t.style.width;t.style.width="0px",setTimeout(function(){t.style.width=D},1)}this.fire("layout")}},setTabAlign:function(a){this.tabAlign=a,this.doUpdate()},setTabPosition:function(a){this.tabPosition=a,this.doUpdate()},getTab:function(a){if("object"==typeof a)return a;if("number"==typeof a)return this.tabs[a];for(var b=0,c=this.tabs.length;c>b;b++){var d=this.tabs[b];if(d.name==a)return d}},getHeaderEl:function(){return this._headerEl},getBodyEl:function(){return this._bodyEl},getTabEl:function(a){var b=this.getTab(a);if(!b)return null;for(var c=this._createTabId(b),d=this.el.getElementsByTagName("*"),e=0,f=d.length;f>e;e++){var g=d[e];if(g.id==c)return g}return null},getTabBodyEl:function(a){var b=this.getTab(a);if(!b)return null;for(var c=this._createTabBodyId(b),d=this._bodyEl.childNodes,e=0,f=d.length;f>e;e++){var g=d[e];if(g.id==c)return g}return null},getTabIFrameEl:function(a){var b=this.getTab(a);return b?b._iframeEl:null},_createTabId:function(a){return this.uid+"$"+a._id},_createTabBodyId:function(a){return this.uid+"$body$"+a._id},_doScrollButton:function(){if("top"==this.tabPosition){mini.removeClass(this._leftButtonEl,"mini-disabled"),mini.removeClass(this._rightButtonEl,"mini-disabled"),0==this._headerEl.scrollLeft&&mini.addClass(this._leftButtonEl,"mini-disabled");var a=this.getTabEl(this.tabs.length-1);if(a){var b=mini.getBox(a),c=mini.getBox(this._headerEl);b.right<=c.right&&mini.addClass(this._rightButtonEl,"mini-disabled")}}},setActiveIndex:function(a,b){var c=this.getTab(a),d=this.getTab(this.activeIndex),e=c!=d,f=this.getTabBodyEl(this.activeIndex);f&&(f.style.display="none"),c?this.activeIndex=this.tabs.indexOf(c):this.activeIndex=-1;var f=this.getTabBodyEl(this.activeIndex);f&&(f.style.display="");var f=this.getTabEl(d);f&&mini.removeClass(f,this._tabActiveCls);var f=this.getTabEl(c);if(f&&mini.addClass(f,this._tabActiveCls),f&&e){if("bottom"==this.tabPosition){var g=mini.findParent(f,"mini-tabs-header");g&&jQuery(this._headerEl).prepend(g)}else if("left"==this.tabPosition){var h=mini.findParent(f,"mini-tabs-header").parentNode;h&&h.parentNode.appendChild(h)}else if("right"==this.tabPosition){var h=mini.findParent(f,"mini-tabs-header").parentNode;h&&jQuery(h.parentNode).prepend(h)}else{var g=mini.findParent(f,"mini-tabs-header");g&&this._headerEl.appendChild(g)}this._headerEl.scrollLeft;this.doLayout();var i=this.getTabRows();i.length>1||(this._scrollToTab(this.activeIndex),this._doScrollButton());for(var j=0,k=this.tabs.length;k>j;j++){var l=this.getTabEl(this.tabs[j]);l&&mini.removeClass(l,this._tabHoverCls)}}var m=this;if(e){var n={tab:c,index:this.tabs.indexOf(c),name:c?c.name:""};setTimeout(function(){m.fire("ActiveChanged",n)},1)}if(this._cancelLoadTabs(c),b!==!1&&c&&c.url&&!c.loadedUrl){var m=this;m.loadTab(c.url,c)}if(m.canLayout())try{mini.layoutIFrames(m.el)}catch(n){}},_scrollToTab:function(a){var b=this._headerEl.scrollLeft;if("top"==this.tabPosition){this._headerEl.scrollLeft=b;var c=this.getTabEl(a);if(c){var d=this,e=mini.getBox(c),f=mini.getBox(d._headerEl);e.x<f.x?d._headerEl.scrollLeft-=f.x-e.x:e.right>f.right&&(d._headerEl.scrollLeft+=e.right-f.right)}}},getActiveIndex:function(){return this.activeIndex},activeTab:function(a){this.setActiveIndex(a)},getActiveTab:function(){return this.getTab(this.activeIndex)},getActiveIndex:function(){return this.activeIndex;
},_tryActiveTab:function(a){if(a=this.getTab(a)){var b=this.tabs.indexOf(a);if(this.activeIndex!=b){var c={tab:a,index:b,name:a.name,cancel:!1};this.fire("BeforeActiveChanged",c),0==c.cancel&&this.activeTab(a)}}},setShowHeader:function(a){this.showHeader!=a&&(this.showHeader=a,this.doLayout())},getShowHeader:function(){return this.showHeader},setShowBody:function(a){this.showBody!=a&&(this.showBody=a,this.doLayout())},getShowBody:function(){return this.showBody},setBodyStyle:function(a){this.bodyStyle=a,mini.setStyle(this._bodyEl,a),this.doLayout()},getBodyStyle:function(){return this.bodyStyle},setMaskOnLoad:function(a){this.maskOnLoad=a},getMaskOnLoad:function(){return this.maskOnLoad},setPlain:function(a){this.plain=a,this.doLayout()},getPlain:function(){return this.plain},getTabByEvent:function(a){return this._getTabByEvent(a)},_getTabByEvent:function(a){var b=mini.findParent(a.target,"mini-tab");if(!b)return null;var c=b.id.split("$");if(c[0]!=this.uid)return null;var d=parseInt(jQuery(b).attr("index"));return this.getTab(d)},__OnClick:function(a){var b=this._getTabByEvent(a);if(b&&b.enabled){var c=this;setTimeout(function(){if(mini.findParent(a.target,"mini-tab-close"))c._OnCloseButtonClick(b,a);else{var d=b.loadedUrl;c._tryActiveTab(b),b.refreshOnClick&&b.url==d&&c.reloadTab(b)}},10)}},hoverTab:null,__OnMouseOver:function(a){var b=this._getTabByEvent(a);if(b&&b.enabled){var c=this.getTabEl(b);mini.addClass(c,this._tabHoverCls),this.hoverTab=b}},__OnMouseOut:function(a){if(this.hoverTab){var b=this.getTabEl(this.hoverTab);mini.removeClass(b,this._tabHoverCls)}this.hoverTab=null},__OnMouseDown:function(a){if(clearInterval(this._scrollTimer),"top"==this.tabPosition){var b=this,c=0,d=10;a.target==this._leftButtonEl?this._scrollTimer=setInterval(function(){b._headerEl.scrollLeft-=d,c++,c>5&&(d=18),c>10&&(d=25),b._doScrollButton()},25):a.target==this._rightButtonEl&&(this._scrollTimer=setInterval(function(){b._headerEl.scrollLeft+=d,c++,c>5&&(d=18),c>10&&(d=25),b._doScrollButton()},25)),mini.on(document,"mouseup",this.__OnDocMouseUp,this)}},__OnDocMouseUp:function(a){clearInterval(this._scrollTimer),this._scrollTimer=null,mini.un(document,"mouseup",this.__OnDocMouseUp,this)},_doUpdateTop:function(){var a="top"==this.tabPosition,b="";a&&(b+='<div class="mini-tabs-scrollCt">',b+='<div class="mini-tabs-nav"><a class="mini-tabs-leftButton" href="javascript:void(0)" hideFocus onclick="return false"></a><a class="mini-tabs-rightButton" href="javascript:void(0)" hideFocus onclick="return false"></a></div>',b+='<div class="mini-tabs-buttons"></div>'),b+='<div class="mini-tabs-headers">';for(var c=this.getTabRows(),d=0,e=c.length;e>d;d++){var f=c[d],g="";b+='<table class="mini-tabs-header" cellspacing="0" cellpadding="0"><tr><td class="mini-tabs-space mini-tabs-firstSpace"><div></div></td>';for(var h=0,i=f.length;i>h;h++){var j=f[h],k=this._createTabId(j);if(j.visible){var l=this.tabs.indexOf(j),g=j.headerCls||"";if(0==j.enabled&&(g+=" mini-disabled"),b+='<td id="'+k+'" index="'+l+'"  class="mini-tab '+g+'" style="'+j.headerStyle+'">',(j.iconCls||j.iconStyle)&&(b+='<span class="mini-tab-icon '+j.iconCls+'" style="'+j.iconStyle+'"></span>'),b+='<span class="mini-tab-text">'+j.title+"</span>",j.showCloseButton){var m="";j.enabled&&(m="onmouseover=\"mini.addClass(this, 'mini-tab-close-hover')\" onmouseout=\"mini.removeClass(this, 'mini-tab-close-hover')\""),b+='<span class="mini-tab-close" '+m+"></span>"}b+="</td>",h!=i-1&&(b+='<td class="mini-tabs-space2"><div></div></td>')}}b+='<td class="mini-tabs-space mini-tabs-lastSpace" ><div></div></td></tr></table>'}a&&(b+="</div>"),b+="</div>",this._doClearElement(),mini.prepend(this._td2El,b);var n=this._td2El;switch(this._headerEl=n.firstChild.lastChild,a&&(this._navEl=this._headerEl.parentNode.firstChild,this._leftButtonEl=this._navEl.firstChild,this._rightButtonEl=this._navEl.childNodes[1]),this.tabAlign){case"center":for(var o=this._headerEl.childNodes,h=0,i=o.length;i>h;h++){var p=o[h],q=p.getElementsByTagName("td");q[0].style.width="50%",q[q.length-1].style.width="50%"}break;case"right":for(var o=this._headerEl.childNodes,h=0,i=o.length;i>h;h++){var p=o[h],q=p.getElementsByTagName("td");q[0].style.width="100%"}break;case"fit":break;default:for(var o=this._headerEl.childNodes,h=0,i=o.length;i>h;h++){var p=o[h],q=p.getElementsByTagName("td");q[q.length-1].style.width="100%"}}},_doUpdateBottom:function(){this._doUpdateTop();var a=this._td2El;mini.append(a,a.firstChild),this._headerEl=a.lastChild},_doUpdateLeft:function(){for(var a='<table cellspacing="0" cellpadding="0"><tr>',b=this.getTabRows(),c=0,d=b.length;d>c;c++){var e=b[c],f="";d>1&&c!=d-1&&(f="mini-tabs-header2"),a+='<td class="'+f+'"><table class="mini-tabs-header" cellspacing="0" cellpadding="0">',a+='<tr ><td class="mini-tabs-space mini-tabs-firstSpace" ><div></div></td></tr>';for(var g=0,h=e.length;h>g;g++){var i=e[g],j=this._createTabId(i);if(i.visible){var k=this.tabs.indexOf(i),f=i.headerCls||"";if(0==i.enabled&&(f+=" mini-disabled"),a+='<tr><td id="'+j+'" index="'+k+'"  class="mini-tab '+f+'" style="'+i.headerStyle+'">',(i.iconCls||i.iconStyle)&&(a+='<span class="mini-tab-icon '+i.iconCls+'" style="'+i.iconStyle+'"></span>'),a+='<span class="mini-tab-text">'+i.title+"</span>",i.showCloseButton){var l="";i.enabled&&(l="onmouseover=\"mini.addClass(this, 'mini-tab-close-hover')\" onmouseout=\"mini.removeClass(this, 'mini-tab-close-hover')\""),a+='<span class="mini-tab-close" '+l+"></span>"}a+="</td></tr>",g!=h-1&&(a+='<tr><td class="mini-tabs-space2"><div></div></td></tr>')}}a+='<tr ><td class="mini-tabs-space mini-tabs-lastSpace" ><div></div></td></tr>',a+="</table></td>"}a+="</tr ></table>",this._doClearElement(),mini.addClass(this._td1El,"mini-tabs-header"),mini.append(this._td1El,a),this._headerEl=this._td1El},_doUpdateRight:function(){this._doUpdateLeft(),mini.removeClass(this._td1El,"mini-tabs-header"),mini.removeClass(this._td3El,"mini-tabs-header"),mini.append(this._td3El,this._td1El.firstChild),this._headerEl=this._td3El},_OnCloseButtonClick:function(a,b){var c={tab:a,index:this.tabs.indexOf(a),name:a.name.toLowerCase(),htmlEvent:b,cancel:!1};if(this.fire("beforecloseclick",c),1!=c.cancel){try{if(a._iframeEl&&a._iframeEl.contentWindow){var d=!0;a._iframeEl.contentWindow.CloseWindow?d=a._iframeEl.contentWindow.CloseWindow("close"):a._iframeEl.contentWindow.CloseOwnerWindow&&(d=a._iframeEl.contentWindow.CloseOwnerWindow("close")),d===!1&&(c.cancel=!0)}}catch(e){}1!=c.cancel&&(a.removeAction="close",this.removeTab(a),this.fire("closeclick",c))}},onBeforeCloseClick:function(a,b){this.on("beforecloseclick",a,b)},onCloseClick:function(a,b){this.on("closeclick",a,b)},onActiveChanged:function(a,b){this.on("activechanged",a,b)},getAttrs:function(el){var attrs=mini.Tabs.superclass.getAttrs.call(this,el);mini._ParseString(el,attrs,["tabAlign","tabPosition","bodyStyle","onactivechanged","onbeforeactivechanged","url","ontabload","ontabdestroy","onbeforecloseclick","oncloseclick","titleField","urlField","nameField","loadingMsg","buttons"]),mini._ParseBool(el,attrs,["allowAnim","showBody","showHeader","maskOnLoad","plain"]),mini._ParseInt(el,attrs,["activeIndex"]);for(var tabs=[],nodes=mini.getChildNodes(el),i=0,l=nodes.length;l>i;i++){var node=nodes[i],o={};tabs.push(o),o.style=node.style.cssText,mini._ParseString(node,o,["name","title","url","cls","iconCls","iconStyle","headerCls","headerStyle","bodyCls","bodyStyle","onload","ondestroy","data-options"]),mini._ParseBool(node,o,["newLine","visible","enabled","showCloseButton","refreshOnClick"]),o.bodyParent=node;var options=o["data-options"];options&&(options=eval("("+options+")"),options&&mini.copyTo(o,options))}return attrs.tabs=tabs,attrs}}),mini.regClass(mini.Tabs,"tabs"),mini=mini||{},mini.TextArea=function(){mini.TextArea.superclass.constructor.call(this)},mini.extend(mini.TextArea,mini.TextBox,{maxLength:1e7,width:180,height:50,minHeight:50,_InputType:"textarea",uiCls:"mini-textarea",doLayout:function(){if(this.canLayout()){mini.TextArea.superclass.doLayout.call(this);var a=mini.getHeight(this.el);mini.setHeight(this._borderEl,a),a-=2,0>a&&(a=0),this._textEl.style.height=a+"px"}}}),mini.regClass(mini.TextArea,"textarea"),mini=mini||{},mini.TextBoxList=function(){mini.TextBoxList.superclass.constructor.call(this),this.data=[],this.doUpdate()},mini.extend(mini.TextBoxList,mini.ValidatorBase,{formField:!0,value:"",text:"",valueField:"id",textField:"text",url:"",delay:150,allowInput:!0,editIndex:0,_focusCls:"mini-textboxlist-focus",_itemHoverClass:"mini-textboxlist-item-hover",_itemSelectedClass:"mini-textboxlist-item-selected",_closeHoverClass:"mini-textboxlist-close-hover",textName:"",setTextName:function(a){this.textName=a},getTextName:function(){return this.textName},uiCls:"mini-textboxlist",_create:function(){var a='<table class="mini-textboxlist" cellpadding="0" cellspacing="0"><tr ><td class="mini-textboxlist-border"><ul></ul><a href="#"></a><input type="hidden"/></td></tr></table>',b=document.createElement("div");b.innerHTML=a,this.el=b.firstChild;var c=this.el.getElementsByTagName("td")[0];this.ulEl=c.firstChild,this._valueEl=c.lastChild,this.focusEl=c.childNodes[1]},destroy:function(a){this.isShowPopup&&this.hidePopup(),mini.un(document,"mousedown",this.__OnDocMouseDown,this),mini.TextBoxList.superclass.destroy.call(this,a)},_initEvents:function(){mini.TextBoxList.superclass._initEvents.call(this),mini.on(this.el,"mousemove",this.__OnMouseMove,this),mini.on(this.el,"mouseout",this.__OnMouseOut,this),mini.on(this.el,"mousedown",this.__OnMouseDown,this),mini.on(this.el,"click",this.__OnClick,this),mini.on(this.el,"keydown",this.__OnKeyDown,this),mini.on(document,"mousedown",this.__OnDocMouseDown,this)},__OnDocMouseDown:function(a){this.isReadOnly()||(this.isShowPopup&&(mini.isAncestor(this.popup.el,a.target)||this.hidePopup()),this._focused&&0==this.within(a)&&(this.select(null,!1),this.showInput(!1),this.removeCls(this._focusCls),this._focused=!1))},errorIconEl:null,getErrorIconEl:function(){if(!this._errorIconEl){var a=this.el.rows[0],b=a.insertCell(1);b.style.cssText="width:18px;vertical-align:top;",b.innerHTML='<div class="mini-errorIcon"></div>',this._errorIconEl=b.firstChild}return this._errorIconEl},_RemoveErrorIcon:function(){this._errorIconEl&&jQuery(this._errorIconEl.parentNode).remove(),this._errorIconEl=null},doLayout:function(){0!=this.canLayout()&&(mini.TextBoxList.superclass.doLayout.call(this),this.isReadOnly()||0==this.allowInput?this._inputEl.readOnly=!0:this._inputEl.readOnly=!1)},doUpdate:function(){this._ValueChangeTimer&&clearInterval(this._ValueChangeTimer),this._inputEl&&mini.un(this._inputEl,"keydown",this.__OnInputKeyDown,this);for(var a=[],b=this.uid,c=0,d=this.data.length;d>c;c++){var e=this.data[c],f=b+"$text$"+c,g=mini._getMap(this.textField,e);mini.isNull(g)&&(g=""),a[a.length]='<li id="'+f+'" class="mini-textboxlist-item">',a[a.length]=g,a[a.length]='<span class="mini-textboxlist-close"></span></li>'}var h=b+"$input";a[a.length]='<li id="'+h+'" class="mini-textboxlist-inputLi"><input class="mini-textboxlist-input" type="text" autocomplete="off"></li>',this.ulEl.innerHTML=a.join(""),this.editIndex=this.data.length,this.editIndex<0&&(this.editIndex=0),this.inputLi=this.ulEl.lastChild,this._inputEl=this.inputLi.firstChild,mini.on(this._inputEl,"keydown",this.__OnInputKeyDown,this);var i=this;this._inputEl.onkeyup=function(){i._syncInputSize()},i._ValueChangeTimer=null,i._LastInputText=i._inputEl.value,this._inputEl.onfocus=function(){i._ValueChangeTimer=setInterval(function(){i._LastInputText!=i._inputEl.value&&(i._startQuery(),i._LastInputText=i._inputEl.value)},10),i.addCls(i._focusCls),i._focused=!0,i.fire("focus")},this._inputEl.onblur=function(){clearInterval(i._ValueChangeTimer),i.fire("blur")}},getItemByEvent:function(a){var b=mini.findParent(a.target,"mini-textboxlist-item");if(b){var c=b.id.split("$"),d=c[c.length-1];return this.data[d]}},getItem:function(a){return"number"==typeof a?this.data[a]:"object"==typeof a?a:void 0},getItemEl:function(a){var b=this.data.indexOf(a),c=this.uid+"$text$"+b;return document.getElementById(c)},hoverItem:function(a,b){if(!this.isReadOnly()&&0!=this.enabled){this.blurItem();var c=this.getItemEl(a);mini.addClass(c,this._itemHoverClass),b&&mini.hasClass(b.target,"mini-textboxlist-close")&&mini.addClass(b.target,this._closeHoverClass)}},blurItem:function(){for(var a=this.data.length,b=0,c=a;c>b;b++){var d=this.data[b],e=this.getItemEl(d);e&&(mini.removeClass(e,this._itemHoverClass),mini.removeClass(e.lastChild,this._closeHoverClass))}},showInput:function(a){this.select(null),mini.isNumber(a)?this.editIndex=a:this.editIndex=this.data.length,this.editIndex<0&&(this.editIndex=0),this.editIndex>this.data.length&&(this.editIndex=this.data.length);var b=this.inputLi;if(b.style.display="block",mini.isNumber(a)&&a<this.data.length){var c=this.data[a],d=this.getItemEl(c);jQuery(d).before(b)}else this.ulEl.appendChild(b);return a!==!1?setTimeout(function(){try{b.firstChild.focus(),mini.selectRange(b.firstChild,100)}catch(a){}},10):(this.lastInputText="",this._inputEl.value=""),b},select:function(a){if(a=this.getItem(a),this._selected){var b=this.getItemEl(this._selected);mini.removeClass(b,this._itemSelectedClass)}if(this._selected=a,this._selected){var b=this.getItemEl(this._selected);mini.addClass(b,this._itemSelectedClass)}var c=this;if(this._selected){this.focusEl.focus();var d=this;setTimeout(function(){try{d.focusEl.focus()}catch(a){}},50)}this._selected&&(c.addCls(c._focusCls),c._focused=!0)},_doInsertSelectValue:function(){var a=this._listbox.getSelected(),b=this.editIndex;a&&(a=mini.clone(a),this.insertItem(b,a))},insertItem:function(a,b){this.data.insert(a,b);var c=this.getText(),d=this.getValue();this.setValue(d,!1),this.setText(c,!1),this._createData(),this.doUpdate(),this.showInput(a+1),this._OnValueChanged()},removeItem:function(a){if(a){var b=this.getItemEl(a);mini.removeNode(b),this.data.remove(a);var c=this.getText(),d=this.getValue();this.setValue(d,!1),this.setText(c,!1),this._OnValueChanged()}},_createData:function(){var a=(this.text?this.text:"").split(","),b=(this.value?this.value:"").split(",");""==b[0]&&(b=[]);var c=b.length;this.data.length=c;for(var d=0,e=c;e>d;d++){var f=this.data[d];f||(f={},this.data[d]=f);var g=mini.isNull(a[d])?"":a[d],h=mini.isNull(b[d])?"":b[d];mini._setMap(this.textField,g,f),mini._setMap(this.valueField,h,f)}this.value=this.getValue(),this.text=this.getText()},getInputText:function(){return this._inputEl?this._inputEl.value:""},getText:function(){for(var a=[],b=0,c=this.data.length;c>b;b++){var d=this.data[b],e=mini._getMap(this.textField,d);mini.isNull(e)&&(e=""),e=e.replace(",","\uff0c"),a.push(e)}return a.join(",")},getValue:function(){for(var a=[],b=0,c=this.data.length;c>b;b++){var d=this.data[b],e=mini._getMap(this.valueField,d);a.push(e)}return a.join(",")},setName:function(a){this.name!=a&&(this.name=a,this._valueEl.name=a)},setValue:function(a){mini.isNull(a)&&(a=""),this.value!=a&&(this.value=a,this._valueEl.value=a,this._createData(),this.doUpdate())},setText:function(a){mini.isNull(a)&&(a=""),this.text!==a&&(this.text=a,this._createData(),this.doUpdate())},setValueField:function(a){this.valueField=a,this._createData()},getValueField:function(){return this.valueField},setTextField:function(a){this.textField=a,this._createData()},getTextField:function(){return this.textField},setAllowInput:function(a){this.allowInput=a,this.doLayout()},getAllowInput:function(){return this.allowInput},setUrl:function(a){this.url=this.parseUrl(a)},getUrl:function(){return this.url},setPopupHeight:function(a){this.popupHeight=a},getPopupHeight:function(){return this.popupHeight},setPopupMinHeight:function(a){this.popupMinHeight=a},getPopupMinHeight:function(){return this.popupMinHeight},setPopupMaxHeight:function(a){this.popupMaxHeight=a},getPopupMaxHeight:function(){return this.popupMaxHeight},doQuery:function(){this._startQuery(!0)},_syncInputSize:function(){if(0!=this.isDisplay()){var a=this.getInputText(),b=mini.measureText(this._inputEl,a),c=b.width>20?b.width+4:20,d=mini.getWidth(this.el,!0);c>d-15&&(c=d-15),this._inputEl.style.width=c+"px"}},_startQuery:function(a){var b=this;setTimeout(function(){b._syncInputSize()},1),this.showPopup("loading"),this._stopQuery(),this._loading=!0,this.delayTimer=setTimeout(function(){b._inputEl.value;b._doQuery()},this.delay)},_doQuery:function(){if(0!=this.isDisplay()){var a=this.getInputText(),b=this,c=(this._listbox.getData(),{value:this.getValue(),text:this.getText()});c[this.searchField]=a;var d=this.url,e="function"==typeof d?d:window[d];if("function"==typeof e&&(d=e(this)),d){var f="post";d&&(-1!=d.indexOf(".txt")||-1!=d.indexOf(".json"))&&(f="get");var g={url:d,async:!0,params:c,data:c,type:f,cache:!1,cancel:!1};this.fire("beforeload",g),g.data!=g.params&&g.params!=c&&(g.data=g.params),g.cancel||(mini.copyTo(g,{success:function(a){var c=mini.decode(a);b.dataField&&(c=mini._getMap(b.dataField,c)),c||(c=[]),b._listbox.setData(c),b.showPopup(),b._listbox._focusItem(0,!0),b.fire("load"),b._loading=!1,b._selectOnLoad&&(b.__doSelectValue(),b._selectOnLoad=null)},error:function(a,c,d){b.showPopup("error")}}),b._ajaxer=mini.ajax(g))}}},_stopQuery:function(){this.delayTimer&&(clearTimeout(this.delayTimer),this.delayTimer=null),this._ajaxer&&this._ajaxer.abort(),this._loading=!1},within:function(a){return mini.isAncestor(this.el,a.target)?!0:this.showPopup&&this.popup&&this.popup.within(a)?!0:!1},popupLoadingText:"<span class='mini-textboxlist-popup-loading'>Loading...</span>",popupErrorText:"<span class='mini-textboxlist-popup-error'>Error</span>",popupEmptyText:"<span class='mini-textboxlist-popup-noresult'>No Result</span>",isShowPopup:!1,popupHeight:"",popupMinHeight:30,popupMaxHeight:150,_createPopup:function(){return this.popup||(this.popup=new mini.ListBox,this.popup.addCls("mini-textboxlist-popup"),this.popup.setStyle("position:absolute;left:0;top:0;"),this.popup.showEmpty=!0,this.popup.setValueField(this.valueField),this.popup.setTextField(this.textField),this.popup.render(document.body),this.popup.on("itemclick",function(a){this.hidePopup(),this._doInsertSelectValue()},this)),this._listbox=this.popup,this.popup},showPopup:function(a){if(0!=this.isDisplay()){this.isShowPopup=!0;var b=this._createPopup();b.el.style.zIndex=mini.getMaxZIndex();var c=this._listbox;c.emptyText=this.popupEmptyText,"loading"==a?(c.emptyText=this.popupLoadingText,this._listbox.setData([])):"error"==a&&(c.emptyText=this.popupLoadingText,this._listbox.setData([])),this._listbox.doUpdate();var d=this.getBox(),e=d.x,f=d.y+d.height;this.popup.el.style.display="block",mini.setXY(b.el,-1e3,-1e3),this.popup.setWidth(d.width),this.popup.setHeight(this.popupHeight),this.popup.getHeight()<this.popupMinHeight&&this.popup.setHeight(this.popupMinHeight),this.popup.getHeight()>this.popupMaxHeight&&this.popup.setHeight(this.popupMaxHeight),mini.setXY(b.el,e,f)}},hidePopup:function(){this.isShowPopup=!1,this.popup&&(this.popup.el.style.display="none")},__OnMouseMove:function(a){if(0!=this.enabled){var b=this.getItemByEvent(a);return b?void this.hoverItem(b,a):void this.blurItem()}},__OnMouseOut:function(a){this.blurItem()},__OnClick:function(a){if(!this.isReadOnly()&&0!=this.enabled&&0!=this.enabled){var b=this.getItemByEvent(a);if(!b)return void(mini.findParent(a.target,"mini-textboxlist-input")||this.showInput());this.focusEl.focus(),this.select(b),a&&mini.hasClass(a.target,"mini-textboxlist-close")&&this.removeItem(b)}},__OnKeyDown:function(a){function b(){var a=d.data[c];d.removeItem(a),a=d.data[c],a||(a=d.data[c-1]),d.select(a),a||d.showInput()}if(this.isReadOnly()||0==this.allowInput)return!1;var c=this.data.indexOf(this._selected),d=this;switch(a.keyCode){case 8:a.preventDefault(),b();break;case 37:case 38:this.select(null),this.showInput(c);break;case 39:case 40:c+=1,this.select(null),this.showInput(c);break;case 46:b()}},__doSelectValue:function(){var a=this._listbox.getFocusedItem();a&&this._listbox.setSelected(a),this.lastInputText=this.text,this.hidePopup(),this._doInsertSelectValue()},__OnInputKeyDown:function(a){if(this._selectOnLoad=null,this.isReadOnly()||0==this.allowInput)return!1;if(a.stopPropagation(),!this.isReadOnly()&&0!=this.allowInput){var b=mini.getSelectRange(this._inputEl),c=b[0],d=b[1],e=this._inputEl.value.length,f=c==d&&0==c,g=c==d&&d==e;if((this.isReadOnly()||0==this.allowInput)&&a.preventDefault(),9==a.keyCode)return void this.hidePopup();if(16!=a.keyCode&&17!=a.keyCode&&18!=a.keyCode)switch(a.keyCode){case 13:if(this.isShowPopup){if(a.preventDefault(),this._loading)return void(this._selectOnLoad=!0);this.__doSelectValue()}break;case 27:a.preventDefault(),this.hidePopup();break;case 8:f&&a.preventDefault();case 37:if(f)if(this.isShowPopup)this.hidePopup();else if(this.editIndex>0){var h=this.editIndex-1;0>h&&(h=0),h>=this.data.length&&(h=this.data.length-1),this.showInput(!1),this.select(h)}break;case 39:if(g)if(this.isShowPopup)this.hidePopup();else if(this.editIndex<=this.data.length-1){var h=this.editIndex;this.showInput(!1),this.select(h)}break;case 38:if(a.preventDefault(),this.isShowPopup){var h=-1,i=this._listbox.getFocusedItem();i&&(h=this._listbox.indexOf(i)),h--,0>h&&(h=0),this._listbox._focusItem(h,!0)}break;case 40:if(a.preventDefault(),this.isShowPopup){var h=-1,i=this._listbox.getFocusedItem();i&&(h=this._listbox.indexOf(i)),h++,0>h&&(h=0),h>=this._listbox.getCount()&&(h=this._listbox.getCount()-1),this._listbox._focusItem(h,!0)}else this._startQuery(!0)}}},focus:function(){try{this._inputEl.focus()}catch(a){}},blur:function(){try{this._inputEl.blur()}catch(a){}},searchField:"key",setSearchField:function(a){this.searchField=a},getSearchField:function(){return this.searchField},getAttrs:function(a){var b=mini.TextBox.superclass.getAttrs.call(this,a);jQuery(a);return mini._ParseString(a,b,["value","text","valueField","textField","url","popupHeight","textName","onfocus","onbeforeload","onload","searchField"]),mini._ParseBool(a,b,["allowInput"]),mini._ParseInt(a,b,["popupMinHeight","popupMaxHeight"]),b}}),mini.regClass(mini.TextBoxList,"textboxlist"),mini.TimeSpinner=function(){mini.TimeSpinner.superclass.constructor.call(this),this.setValue("00:00:00")},mini.extend(mini.TimeSpinner,mini.ButtonEdit,{value:null,format:"H:mm:ss",uiCls:"mini-timespinner",_getButtonHtml:function(){var a="onmouseover=\"mini.addClass(this, '"+this._buttonHoverCls+"');\" onmouseout=\"mini.removeClass(this, '"+this._buttonHoverCls+"');\"";return'<span class="mini-buttonedit-button" '+a+'><span class="mini-buttonedit-up"><span></span></span><span class="mini-buttonedit-down"><span></span></span></span>'},_initEvents:function(){mini.TimeSpinner.superclass._initEvents.call(this),mini._BindEvents(function(){this.on("buttonmousedown",this.__OnButtonMouseDown,this),mini.on(this.el,"mousewheel",this.__OnMousewheel,this),mini.on(this._textEl,"keydown",this.__OnKeyDown,this)},this)},setFormat:function(a){if("string"==typeof a){this.format!=a&&(this.format=a,this.text=this._textEl.value=this.getFormattedValue())}},getFormat:function(){return this.format},setValue:function(a,b){a=mini.parseTime(a,this.format),a||(a=mini.parseTime("00:00:00",this.format)),mini.isDate(a)&&(a=new Date(a.getTime())),mini.formatDate(this.value,"H:mm:ss")!=mini.formatDate(a,"H:mm:ss")&&(this.value=a,this.text=this._textEl.value=this.getFormattedValue(),this._valueEl.value=this.getFormValue(),void 0===b&&(b=!0),b&&this._OnValueChanged())},getValue:function(){return null==this.value?null:new Date(this.value.getTime())},getFormValue:function(){return this.value?mini.formatDate(this.value,"H:mm:ss"):""},getFormattedValue:function(){return this.value?mini.formatDate(this.value,this.format):""},_ChangeValue:function(a,b){var c=this.getValue();if(c)switch(b){case"hours":var d=c.getHours()+a;d>23&&(d=23),0>d&&(d=0),c.setHours(d);break;case"minutes":var e=c.getMinutes()+a;e>59&&(e=59),0>e&&(e=0),c.setMinutes(e);break;case"seconds":var f=c.getSeconds()+a;f>59&&(f=59),0>f&&(f=0),c.setSeconds(f)}else c="00:00:00";this.setValue(c)},_SpinTimer:null,_StartSpin:function(a,b,c){this._StopSpin(),this._ChangeValue(a,this._timeType);var d=this,e=c,f=new Date;this._SpinTimer=setInterval(function(){d._ChangeValue(a,d._timeType),c--,0==c&&b>50&&d._StartSpin(a,b-100,e+3);var g=new Date;g-f>500&&d._StopSpin(),f=g},b),mini.on(document,"mouseup",this._OnDocumentMouseUp,this)},_StopSpin:function(){clearInterval(this._SpinTimer),this._SpinTimer=null},__OnButtonMouseDown:function(a){this._DownValue=this.getFormValue(),this._timeType="hours","up"==a.spinType?this._StartSpin(1,230,2):this._StartSpin(-1,230,2)},_OnDocumentMouseUp:function(a){this._StopSpin(),mini.un(document,"mouseup",this._OnDocumentMouseUp,this)},__OnInputTextChanged:function(a){this.getFormValue();this.setValue(this._textEl.value)},getAttrs:function(a){var b=mini.TimeSpinner.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["format"]),b}}),mini.regClass(mini.TimeSpinner,"timespinner"),mini.ToolBar=function(){mini.ToolBar.superclass.constructor.call(this)},mini.extend(mini.ToolBar,mini.Container,{_clearBorder:!1,style:"",uiCls:"mini-toolbar",_create:function(){this.el=document.createElement("div"),this.el.className="mini-toolbar"},_initEvents:function(){},doLayout:function(){if(this.canLayout())for(var a=mini.getChildNodes(this.el,!0),b=0,c=a.length;c>b;b++)mini.layout(a[b])},set_bodyParent:function(a){a&&(this.el=a,this.doLayout())},getAttrs:function(a){var b={};return mini._ParseString(a,b,["id","borderStyle"]),this.el=a,this.el.uid=this.uid,this.addCls(this.uiCls),b}}),mini.regClass(mini.ToolBar,"toolbar"),mini.Tree=function(a){this.root={_id:-1,_pid:"",_level:-1},this.data=this.root[this.nodesField]=[],this._idNodes={},this.idNodes={},this._viewNodes=null,mini.Tree.superclass.constructor.call(this,a),this.on("beforeexpand",function(a){var b=a.node,c=this.isLeaf(b),d=b[this.nodesField];c||d&&0!=d.length||this.loadOnExpand&&b.asyncLoad!==!1&&(a.cancel=!0,this.loadNode(b))},this),this.doUpdate()},mini.Tree.NodeUID=1;var lastNodeLevel=[];mini.extend(mini.Tree,mini.Control,{_ajaxOption:{async:!0,type:"get"},isTree:!0,_displayStyle:"block",autoLoad:!0,autoEscape:!0,loadOnExpand:!0,removeOnCollapse:!0,expandOnDblClick:!0,expandOnNodeClick:!1,value:"",_selectedNode:null,allowSelect:!0,showCheckBox:!1,showFolderCheckBox:!0,showExpandButtons:!0,enableHotTrack:!0,showArrow:!1,expandOnLoad:!1,delimiter:",",url:"",root:null,resultAsTree:!0,parentField:"pid",idField:"id",textField:"text",iconField:"iconCls",nodesField:"children",showTreeIcon:!1,showTreeLines:!0,checkRecursive:!1,checkOpposite:!1,allowAnim:!0,_checkBoxCls:"mini-tree-checkbox",_selectedNodeCls:"mini-tree-selectedNode",_nodeHoverCls:"mini-tree-node-hover",leafIcon:"mini-tree-leaf",folderIcon:"mini-tree-folder",_borderCls:"mini-tree-border",_headerCls:"mini-tree-header",_bodyCls:"mini-tree-body",_nodeCls:"mini-tree-node",_nodesCls:"mini-tree-nodes",_expandNodeCls:"mini-tree-expand",_collapseNodeCls:"mini-tree-collapse",_eciconCls:"mini-tree-node-ecicon",_inNodeCls:"mini-tree-nodeshow",set:function(a){if("string"==typeof a)return this;var b=a.value;delete a.value;var c=a.url;delete a.url;var d=a.data;return delete a.data,mini.Tree.superclass.set.call(this,a),mini.isNull(d)||this.setData(d),mini.isNull(c)||this.setUrl(c),mini.isNull(b)||this.setValue(b),this},uiCls:"mini-tree",destroy:function(a){delete this._idNodes,delete this.idNodes,delete this._viewNodes,delete this._selectedNode,delete this._focusedNode,this._headerEl&&(mini.clearEvent(this._headerEl),this._borderEl.removeChild(this._headerEl),this._headerEl=null),this._bodyEl&&(mini.clearEvent(this._bodyEl),this._borderEl.removeChild(this._bodyEl),this._bodyEl=null),this._borderEl&&(mini.clearEvent(this._borderEl),this.el.removeChild(this._borderEl),this._borderEl=null),this._DragDrop&&(mini.clearEvent(this._DragDrop),this._DragDrop.destroy(a),this._DragDrop=null),delete this._cellErrors,delete this._cellMapErrors,delete this.data,delete this._list,delete this.root,delete this._indexs,mini.Tree.superclass.destroy.call(this,a)},_create:function(){this.el=document.createElement("div"),this.el.className="mini-tree",1==this.showTreeLines&&mini.addClass(this.el,"mini-tree-treeLine"),this.el.style.display="block",this._borderEl=mini.append(this.el,'<div class="'+this._borderCls+'"><div class="'+this._headerCls+'"></div><div class="'+this._bodyCls+'"></div></div>'),this._headerEl=this._borderEl.childNodes[0],this._bodyEl=this._borderEl.childNodes[1],this._DragDrop=new mini._TreeDragDrop(this)},_initEvents:function(){mini._BindEvents(function(){mini.on(this.el,"click",this.__OnClick,this),mini.on(this.el,"dblclick",this.__OnDblClick,this),mini.on(this.el,"mousedown",this.__OnMouseDown,this),mini.on(this.el,"mousemove",this.__OnMouseMove,this),mini.on(this.el,"mouseout",this.__OnMouseOut,this),mini.on(this.el,"mouseover",this.__OnMouseOver,this)},this)},load:function(a,b){"undefined"==typeof a?this._doLoad({},this.root):"string"==typeof a?(this.url=a,this._doLoad(b,this.root)):this.setData(a)},setData:function(data){"string"==typeof data&&(data=eval("("+data+")")),this.loadData(data),this.data=data,this._cellErrors=[],this._cellMapErrors={}},getData:function(){return this.data},toArray:function(){return this.getList()},getList:function(){if(!this._list){this._list=mini.treeToArray(this.root[this.nodesField],this.nodesField,this.idField,this.parentField,"-1"),this._indexs={};for(var a=0,b=this._list.length;b>a;a++){var c=this._list[a];this._indexs[c[this.idField]]=a}}return this._list},_clearTree:function(){this._list=null,this._indexs=null},loadList:function(a,b,c){b=b||this.idField,c=c||this.parentField;var d=mini.arrayToTree(a,this.nodesField,b,c);this.setData(d)},loadData:function(a){mini.isArray(a)||(a=[]),this.root[this.nodesField]=a,this.data=a,this.idNodes={},this._idNodes={},this._updateParentAndLevel(this.root,null),this.cascadeChild(this.root,function(a){if(mini.isNull(a.expanded)){var b=this.getLevel(a);this.expandOnLoad===!0||mini.isNumber(this.expandOnLoad)&&b<=this.expandOnLoad?a.expanded=!0:a.expanded=!1}if(a.isLeaf===!1){var c=a[this.nodesField];c&&c.length>0&&delete a.isLeaf}},this),this._viewNodes=null,this._selectedNode=null,this.doUpdate()},clearData:function(){this.loadData([])},setUrl:function(a){this.url=this.parseUrl(a),this.autoLoad&&this.load(this.url)},getUrl:function(){return this.url},loadNode:function(a,b){if(a=this.getNode(a),a&&!this.isLeaf(a)){var c={};c[this.idField]=this.getItemValue(a);var d=this;d.addNodeCls(a,"mini-tree-loading");var e=new Date;this._doLoad(c,a,function(c){var f=new Date-e;60>f&&(f=60-f),setTimeout(function(){d.removeNodeCls(a,"mini-tree-loading"),d.removeNodes(a[d.nodesField]),c&&c.length>0?(d.addNodes(c,a),b!==!1?d.expandNode(a,!0):d.collapseNode(a,!0),d.fire("loadnode",{node:a})):(delete a.isLeaf,d._doUpdateNodeTitle(a))},f)},function(b){d.removeNodeCls(a,"mini-tree-loading")}),this.ajaxAsync=!1}},setAjaxOption:function(a){mini.copyTo(this._ajaxOption,a)},getAjaxOption:function(a){return this._ajaxOption},_doLoad:function(params,node,success,fail){try{var url=eval(this.url);void 0!=url&&(this.url=url)}catch(e){}var isRoot=node==this.root,e={url:this.url,async:this._ajaxOption.async,type:this._ajaxOption.type,params:params,data:params,cache:!1,cancel:!1,node:node,isRoot:isRoot};if(this.fire("beforeload",e),e.data!=e.params&&e.params!=params&&(e.data=e.params),1!=e.cancel){node!=this.root;var sf=this,container=node;isRoot?(mini.addClass(this._bodyEl,"mini-tree-loading"),this._bodyEl.innerHTML="<div class='mini-treegrid-ec-icon'>&nbsp;</div>"):sf.addNodeCls(container,"mini-tree-loading"),mini.copyTo(e,{success:function(a,b,c){isRoot?(mini.removeClass(sf._bodyEl,"mini-tree-loading"),sf._bodyEl.innerHTML=""):sf.removeNodeCls(container,"mini-tree-loading");var d=null;try{d=mini.decode(a)}catch(e){d=[],1==mini_debugger&&alert("tree json is error.");
}sf.dataField&&(d=mini._getMap(sf.dataField,d)),d||(d=[]);var e={result:d,data:d,cancel:!1,node:node};0==sf.resultAsTree&&(e.data=mini.arrayToTree(e.data,sf.nodesField,sf.idField,sf.parentField)),sf.fire("preload",e),1!=e.cancel&&(isRoot&&sf.setData(e.data),success&&success(e.data),sf._doCheckLoadNodes(),sf.fire("load",e))},error:function(a,b,c){isRoot?(mini.removeClass(sf._bodyEl,"mini-tree-loading"),sf._bodyEl.innerHTML=""):sf.removeNodeCls(container,"mini-tree-loading");var d={xmlHttp:a,errorCode:b};fail&&fail(d),1==mini_debugger&&alert("network error"),sf.fire("loaderror",d)}}),this._ajaxer=mini.ajax(e)}},getItemValue:function(a){if(!a)return"";var b=mini._getMap(this.idField,a);return mini.isNull(b)?"":String(b)},getItemText:function(a){if(!a)return"";var b=mini._getMap(this.textField,a);return mini.isNull(b)?"":String(b)},_OnDrawNode:function(a){var b=this.showCheckBox;b&&this.hasChildren(a)&&(b=this.showFolderCheckBox);var c=this.getItemText(a),d={isLeaf:this.isLeaf(a),node:a,nodeHtml:c,nodeCls:"",nodeStyle:"",showCheckBox:b,iconCls:this.getNodeIcon(a),showTreeIcon:this.showTreeIcon};return 1==this.autoEscape&&(d.nodeHtml=mini.htmlEncode(d.nodeHtml)),this.fire("drawnode",d),(null===d.nodeHtml||void 0===d.nodeHtml||""===d.nodeHtml)&&(d.nodeHtml="&nbsp;"),d},_createNodeTitle:function(a,b,c){var d=!c;c||(c=[]);var e=a[this.textField];(null===e||void 0===e)&&(e="");var f=this.isLeaf(a),g=this.getLevel(a),h=this._OnDrawNode(a),i=h.nodeCls;f||(this._viewNodes?this._getViewChildNodes(a).length>0&&(i=this.isExpandedNode(a)?this._expandNodeCls:this._collapseNodeCls):i=this.isExpandedNode(a)?this._expandNodeCls:this._collapseNodeCls),this._selectedNode==a&&(i+=" "+this._selectedNodeCls),f||(i+=" mini-tree-parentNode"),c[c.length]='<div class="mini-tree-nodetitle '+i+'" style="'+h.nodeStyle+'">';for(var j=this.getParentNode(a),k=0,l=k;g>=l;l++)if(l!=g&&!(f&&0==this.showExpandButtons&&l>=g-1)){var m="";this._isInViewLastNode(a,l)&&(m="background:none"),c[c.length]='<span class="mini-tree-indent " style="'+m+'"></span>'}var n="";if(this._isViewFirstNode(a)&&this._isViewLastNode(a)?(n="mini-tree-node-ecicon-last",j==this.root&&(n="mini-tree-node-ecicon-firstLast")):this._isViewFirstNode(a)&&j&&j!=this.root?n="":this._isViewFirstNode(a)?n="mini-tree-node-ecicon-first":this._isViewLastNode(a)&&(n="mini-tree-node-ecicon-last"),f?c[c.length]='<span class="'+this._eciconCls+" "+n+'" ></span>':c[c.length]='<a class="'+this._eciconCls+" "+n+'" style="'+(this.showExpandButtons?"":"display:none")+'" href="javascript:void(0);" onclick="return false;" hidefocus></a>',c[c.length]='<span class="mini-tree-nodeshow">',h.showTreeIcon&&(c[c.length]='<span class="'+h.iconCls+' mini-tree-icon"></span>'),h.showCheckBox){var o=this._createCheckNodeId(a),p=this.isCheckedNode(a);c[c.length]='<input type="checkbox" id="'+o+'" class="'+this._checkBoxCls+'" hidefocus '+(p?"checked":"")+" "+(a.enabled===!1?"disabled":"")+"/>"}if(c[c.length]='<span class="mini-tree-nodetext">',b){var q=this.uid+"$edit$"+a._id,e=a[this.textField];(null===e||void 0===e)&&(e=""),c[c.length]='<input id="'+q+'" type="text" class="mini-tree-editinput" value="'+e+'"/>'}else this.autoEscape?c[c.length]=mini.htmlEncode(h.nodeHtml):c[c.length]=h.nodeHtml;return c[c.length]="</span>",c[c.length]="</span>",c[c.length]="</div>",d?c.join(""):void 0},_createNode:function(a,b){var c=!b;if(b||(b=[]),!a)return"";var d=this._createNodeId(a),e=this.isVisibleNode(a)?"":"display:none";b[b.length]='<div id="',b[b.length]=d,b[b.length]='" class="',b[b.length]=this._nodeCls,a.enabled===!1&&(b[b.length]=" mini-disabled"),b[b.length]='" style="',b[b.length]=e,b[b.length]='">',this._createNodeTitle(a,!1,b);var f=this._getViewChildNodes(a);return f&&f.length>0&&this.removeOnCollapse&&this.isExpandedNode(a)&&this._createNodes(f,a,b),b[b.length]="</div>",c?b.join(""):void 0},_createNodes:function(a,b,c){var d=!c;if(c||(c=[]),!a)return"";var e=this._createNodesId(b),f=this.isExpandedNode(b)?"":"display:none";c[c.length]='<div id="',c[c.length]=e,c[c.length]='" class="',c[c.length]=this._nodesCls,c[c.length]='" style="',c[c.length]=f,c[c.length]='">';for(var g=0,h=a.length;h>g;g++){var i=a[g];this._createNode(i,c)}return c[c.length]="</div>",d?c.join(""):void 0},doUpdate:function(){if(this._allowUpdate){var a=this._getViewChildNodes(this.root),b=[];this._createNodes(a,this.root,b);var c=b.join("");this._bodyEl.innerHTML=c,this._deferLayout()}},_doLayoutHeader:function(){},_deferLayout:function(){var a=this;this._layoutTimer||(this._layoutTimer=setTimeout(function(){a.doLayout(),a._layoutTimer=null},1))},doLayout:function(){if(this.showCheckBox?mini.addClass(this.el,"mini-tree-showCheckBox"):mini.removeClass(this.el,"mini-tree-showCheckBox"),this.enableHotTrack?mini.addClass(this.el,"mini-tree-hottrack"):mini.removeClass(this.el,"mini-tree-hottrack"),this.el){var a=this.el.firstChild;a&&mini.addClass(a,"mini-tree-rootnodes")}},filter:function(a,b){function c(f){var g=f[e];if(!g)return!1;for(var h=f._id,i=[],j=0,k=g.length;k>j;j++){var l=g[j],m=c(l),n=a.call(b,l,j,this);(n===!0||m)&&(i.push(l),d[l._id]=null)}return i.length>0&&(d[h]=i),i.length>0}b=b||this;var d=this._viewNodes={},e=this.nodesField;return c(this.root),this.doUpdate(),this._viewNodes},clearFilter:function(){this._viewNodes&&(this._viewNodes=null,this.doUpdate())},setShowCheckBox:function(a){this.showCheckBox!=a&&(this.showCheckBox=a,this.doUpdate())},getShowCheckBox:function(){return this.showCheckBox},setShowFolderCheckBox:function(a){this.showFolderCheckBox!=a&&(this.showFolderCheckBox=a,this.doUpdate())},getShowFolderCheckBox:function(){return this.showFolderCheckBox},setAllowSelect:function(a){this.allowSelect!=a&&(this.allowSelect=a,this.doUpdate())},getAllowSelect:function(){return this.allowSelect},setShowTreeIcon:function(a){this.showTreeIcon!=a&&(this.showTreeIcon=a,this.doUpdate())},getShowTreeIcon:function(){return this.showTreeIcon},setShowExpandButtons:function(a){this.showExpandButtons!=a&&(this.showExpandButtons=a,this.doUpdate())},getShowExpandButtons:function(){return this.showExpandButtons},setEnableHotTrack:function(a){this.enableHotTrack!=a&&(this.enableHotTrack=a,this.doLayout())},getEnableHotTrack:function(){return this.enableHotTrack},setExpandOnLoad:function(a){this.expandOnLoad=a},getExpandOnLoad:function(){return this.expandOnLoad},setCheckRecursive:function(a){this.checkRecursive!=a&&(this.checkRecursive=a)},getCheckRecursive:function(){return this.checkRecursive},setCheckOpposite:function(a){this.checkOpposite=a},getNodeIcon:function(a){var b=mini._getMap(this.iconField,a);return b||(b=this.isLeaf(a)?this.leafIcon:this.folderIcon),b},isAncestor:function(a,b){if(a==b)return!0;if(!a||!b)return!1;for(var c=this.getAncestors(b),d=0,e=c.length;e>d;d++)if(c[d]==a)return!0;return!1},getAncestors:function(a){for(var b=[];;){var c=this.getParentNode(a);if(!c||c==this.root)break;b[b.length]=c,a=c}return b.reverse(),b},getRootNode:function(){return this.root},getParentNode:function(a){return a?a._pid==this.root._id?this.root:this._idNodes[a._pid]:null},isRoot:function(a){return a?a==this.root:!1},_isViewFirstNode:function(a){if(this._viewNodes){var b=this.getParentNode(a),c=this._getViewChildNodes(b);return c[0]===a}return this.isFirstNode(a)},_isViewLastNode:function(a){if(this._viewNodes){var b=this.getParentNode(a),c=this._getViewChildNodes(b);return c[c.length-1]===a}return this.isLastNode(a)},_isInViewLastNode:function(a,b){if(this._viewNodes){for(var c=null,d=this.getAncestors(a),e=0,f=d.length;f>e;e++){var g=d[e];this.getLevel(g)==b&&(c=g)}return c&&c!=this.root?this._isViewLastNode(c):!1}return this.isInLastNode(a,b)},_getViewChildNodes:function(a){var b=this.getChildNodes(a);if(!b)return[];if(this._viewNodes){for(var c=[],d=0;d<b.length;d++)this._viewNodes.hasOwnProperty(b[d]._id)&&c.push(b[d]);return c}return b},getChildNodes:function(a){return a=this.getNode(a),a?a[this.nodesField]:null},getAllChildNodes:function(a){if(a=this.getNode(a),!a)return[];var b=[];return this.cascadeChild(a,function(a){b.push(a)},this),b},indexOf:function(a){if(a=this.getNode(a),!a)return-1;this.getList();var b=this._indexs[a[this.idField]];return mini.isNull(b)?-1:b},getAt:function(a){var b=this.getList();return b[a]},indexOfChildren:function(a){var b=this.getParentNode(a);if(!b)return-1;var c=b[this.nodesField];return c.indexOf(a)},hasChildren:function(a){var b=this.getChildNodes(a);return!!(b&&b.length>0)},isLeaf:function(a){if(!a||a.isLeaf===!1)return!1;var b=this.getChildNodes(a);return b&&b.length>0?!1:!0},getLevel:function(a){return a._level},isExpandedNode:function(a){return a=this.getNode(a),a?1==a.expanded||mini.isNull(a.expanded):!1},isCheckedNode:function(a){return a=this.getNode(a),a?1==a.checked:!1},isVisibleNode:function(a){if(0==a.visible)return!1;var b=this.getParentNode(a);return b&&b!=this.root?b.expanded===!1?!1:this.isVisibleNode(b):!0},isEnabledNode:function(a){return a.enabled!==!1||this.enabled},isFirstNode:function(a){var b=this.getParentNode(a),c=this.getChildNodes(b);return c[0]===a},isLastNode:function(a){var b=this.getParentNode(a),c=this.getChildNodes(b);return c[c.length-1]===a},isInLastNode:function(a,b){for(var c=null,d=this.getAncestors(a),e=0,f=d.length;f>e;e++){var g=d[e];this.getLevel(g)==b&&(c=g)}return c&&c!=this.root?this.isLastNode(c):!1},bubbleParent:function(a,b,c){c=c||this,a&&b.call(this,a);var d=this.getParentNode(a);d&&d!=this.root&&this.bubbleParent(d,b,c)},cascadeChild:function(a,b,c){if(b){a||(a=this.root);var d=a[this.nodesField];if(d){d=d.clone();for(var e=0,f=d.length;f>e;e++){var g=d[e];if(b.call(c||this,g,e,a)===!1)return;this.cascadeChild(g,b,c)}}}},eachChild:function(a,b,c){if(b&&a){var d=a[this.nodesField];if(d)for(var e=d.clone(),f=0,g=e.length;g>f;f++){var h=e[f];if(b.call(c||this,h,f,a)===!1)break}}},_updateParentAndLevel:function(a,b){a._id||(a._id=mini.Tree.NodeUID++),this._idNodes[a._id]=a,this.idNodes[a[this.idField]]=a,a._pid=b?b._id:"",a._level=b?b._level+1:-1,this.cascadeChild(a,function(a,b,c){a._id||(a._id=mini.Tree.NodeUID++),this._idNodes[a._id]=a,this.idNodes[a[this.idField]]=a,a._pid=c._id,a._level=c._level+1},this),this._clearTree()},_updateNodeElLevel:function(a){function b(a){c._doUpdateNodeTitle(a)}var c=this;a!=this.root&&b(a),this.cascadeChild(a,function(a){b(a)},this)},removeNodes:function(a){if(mini.isArray(a)){a=a.clone();for(var b=0,c=a.length;c>b;b++){var d=a[b];this.removeNode(d)}}},_doUpdateNodeTitle:function(a){var b=this._createNodeTitle(a),c=this._getNodeEl(a);c&&jQuery(c.firstChild).replaceWith(b)},setNodeText:function(a,b){a=this.getNode(a),a&&(a[this.textField]=b,this._doUpdateNodeTitle(a))},setNodeIconCls:function(a,b){a=this.getNode(a),a&&(a[this.iconField]=b,this._doUpdateNodeTitle(a))},updateNode:function(a,b){if(a=this.getNode(a),a&&b){var c=a[this.nodesField];mini.copyTo(a,b),a[this.nodesField]=c,this._doUpdateNodeTitle(a)}},removeNode:function(a){if(a=this.getNode(a)){this._selectedNode==a&&(this._selectedNode=null);var b=[a];this.cascadeChild(a,function(a){b.push(a)},this);var c=this.getParentNode(a);c[this.nodesField].remove(a),this._updateParentAndLevel(a,c);var d=this._getNodeEl(a);if(d&&(d.parentNode.removeChild(d),this.isLeaf(c))){var e=this._getNodesEl(c);e.parentNode.removeChild(e)}this._updateNodeElLevel(c);for(var f=0,g=b.length;g>f;f++){var a=b[f];delete a._id,delete a._pid,delete this._idNodes[a._id],delete this.idNodes[a[this.idField]]}}},_getDropedParentNode:function(a,b,c){switch(c||(b="add"),b){case"before":if(!c)return null;var d=this.getParentNode(c);return d;case"after":return c?d=this.getParentNode(c):null;case"add":return c;default:return null}},addNodes:function(a,b,c){if(mini.isArray(a))for(var d=0,e=a.length;e>d;d++){var f=a[d];this.addNode(f,c,b)}},addNode:function(a,b,c){if(a=this.getNode(a)){c||(b="add");var d=c;switch(b){case"before":if(!d)return;c=this.getParentNode(d);var e=c[this.nodesField];b=e.indexOf(d);break;case"after":if(!d)return;c=this.getParentNode(d);var e=c[this.nodesField];b=e.indexOf(d)+1;break;case"add":}c=this.getNode(c),c||(c=this.root);var f=c[this.nodesField];f||(f=c[this.nodesField]=[]),b=parseInt(b),isNaN(b)&&(b=f.length);var d=f[b];d||(b=f.length),f.insert(b,a),this._updateParentAndLevel(a,c);var g=this._getNodesEl(c);if(g){var h=this._createNode(a),b=f.indexOf(a)+1,d=f[b];if(d){var i=this._getNodeEl(d);jQuery(i).before(h)}else mini.append(g,h)}else{var h=this._createNode(c),j=this._getNodeEl(c);jQuery(j).replaceWith(h)}c=this.getParentNode(a),this._updateNodeElLevel(c)}},moveNodes:function(a,b,c){if(a&&0!=a.length&&b&&c){this.beginUpdate();for(var d=0,e=a.length;e>d;d++){var f=a[d];this.moveNode(f,b,c),0!=d&&(b=f,c="after")}this.endUpdate()}},moveNode:function(a,b,c){if(a=this.getNode(a),b=this.getNode(b),!a||!b||!c)return!1;if(this.isAncestor(a,b))return!1;var d=-1,e=null;switch(c){case"before":e=this.getParentNode(b),d=this.indexOfChildren(b);break;case"after":e=this.getParentNode(b),d=this.indexOfChildren(b)+1;break;default:e=b;var f=this.getChildNodes(e);f||(f=e[this.nodesField]=[]),d=f.length}var g={},f=this.getChildNodes(e);f.insert(d,g);var h=this.getParentNode(a),i=this.getChildNodes(h);return i.remove(a),d=f.indexOf(g),f[d]=a,this._updateParentAndLevel(a,e),this.doUpdate(),!0},isEditingNode:function(a){return this._editingNode==a},beginEdit:function(a){if(a=this.getNode(a)){var b=this._getNodeEl(a),c=this._createNodeTitle(a,!0),b=this._getNodeEl(a);b&&jQuery(b.firstChild).replaceWith(c),this._editingNode=a;var d=this.uid+"$edit$"+a._id;this._editInput=document.getElementById(d),this._editInput.focus(),mini.selectRange(this._editInput,1e3,1e3),mini.on(this._editInput,"keydown",this.__OnEditInputKeyDown,this),mini.on(this._editInput,"blur",this.__OnEditInputBlur,this)}},cancelEdit:function(){this._editingNode&&(this._doUpdateNodeTitle(this._editingNode),mini.un(this._editInput,"keydown",this.__OnEditInputKeyDown,this),mini.un(this._editInput,"blur",this.__OnEditInputBlur,this)),this._editingNode=null,this._editInput=null},__OnEditInputKeyDown:function(a){if(13==a.keyCode){var b=this._editInput.value;this.setNodeText(this._editingNode,b),this.fire("endedit",{node:this._editingNode,text:b}),this.cancelEdit()}else 27==a.keyCode&&this.cancelEdit()},__OnEditInputBlur:function(a){var b=this._editInput.value;this.setNodeText(this._editingNode,b),this.fire("endedit",{node:this._editingNode,text:b}),this.cancelEdit()},_getNodeByEvent:function(a){if(mini.hasClass(a.target,this._nodesCls))return null;var b=mini.findParent(a.target,this._nodeCls);if(b){var c=b.id.split("$"),d=c[c.length-1],e=this._idNodes[d];return e}return null},_createNodeId:function(a){return this.uid+"$"+a._id},_createNodesId:function(a){return this.uid+"$nodes$"+a._id},_createCheckNodeId:function(a){return this.uid+"$check$"+a._id},addNodeCls:function(a,b){var c=this._getNodeEl(a);c&&mini.addClass(c,b)},removeNodeCls:function(a,b){var c=this._getNodeEl(a);c&&mini.removeClass(c,b)},getNodeBox:function(a){var b=this._getNodeEl(a);return b?mini.getBox(b.firstChild):void 0},_getNodeEl:function(a){if(!a)return null;var b=this._createNodeId(a);return document.getElementById(b)},_getNodeHoverEl:function(a){if(!a)return null;var b=this._getNodeTitleEl(a);return b?b=mini.byClass(this._inNodeCls,b):null},_getNodeTitleEl:function(a){var b=this._getNodeEl(a);return b?b.firstChild:void 0},_getNodesEl:function(a){if(!a)return null;if(0==this.isVisibleNode(a))return null;var b=this._createNodesId(a);return mini.byId(b,this.el)},_getCheckBoxEl:function(a){if(!a)return null;if(0==this.isVisibleNode(a))return null;var b=this._createCheckNodeId(a);return mini.byId(b,this.el)},findNodes:function(a,b){var c=[];return b=b||this,this.cascadeChild(this.root,function(d){a&&a.call(b,d)===!0&&c.push(d)},this),c},getNode:function(a){return"object"==typeof a?a:this.idNodes[a]||null},hideNode:function(a){if(a=this.getNode(a)){a.visible=!1;var b=this._getNodeEl(a);b.style.display="none"}},showNode:function(a){if(a=this.getNode(a)){a.visible=!1;var b=this._getNodeEl(a);b.style.display=""}},enableNode:function(a){if(a=this.getNode(a)){a.enabled=!0;var b=this._getNodeEl(a);mini.removeClass(b,"mini-disabled");var c=this._getCheckBoxEl(a);c&&(c.disabled=!1)}},disableNode:function(a){if(a=this.getNode(a)){a.enabled=!1;var b=this._getNodeEl(a);mini.addClass(b,"mini-disabled");var c=this._getCheckBoxEl(a);c&&(c.disabled=!0)}},_allowExpandLayout:!0,expandNode:function(a,b){function c(){var a=this.getAllChildNodes(d);a.push(d);for(var b=0,c=a.length;c>b;b++){var d=a[b];if(d&&d._indeterminate){var e=this._getCheckBoxEl(d);e&&d._indeterminate&&(e.indeterminate=d._indeterminate)}}}if(a=this.getNode(a)){var d=this.isExpandedNode(a);if(!d&&!this.isLeaf(a)){a.expanded=!0;var e=this._getNodeEl(a);if(this.removeOnCollapse&&e){var f=this._createNode(a);jQuery(e).before(f),jQuery(e).remove()}var g=this._getNodesEl(a);g&&(g.style.display="");var g=this._getNodeEl(a);if(g){var h=g.firstChild;mini.removeClass(h,this._collapseNodeCls),mini.addClass(h,this._expandNodeCls)}this.fire("expand",{node:a}),b=b&&!mini.isIE6;var i=this._getViewChildNodes(a);if(b&&i&&i.length>0){this._inAniming=!0;var g=this._getNodesEl(a);if(!g)return;var j=mini.getHeight(g);g.style.height="1px",this._doPositoin&&(g.style.position="relative");var k={height:j+"px"},l=this,m=jQuery(g);m.animate(k,180,function(){l._inAniming=!1,l._doLayoutHeader(),clearInterval(l._animateTimer),g.style.height="auto",l._doPositoin&&(g.style.position="static"),mini.repaint(e)}),clearInterval(this._animateTimer),this._animateTimer=setInterval(function(){l._doLayoutHeader()},60)}this._doLayoutHeader();var n=this;c.call(n)}}},collapseNode:function(a,b){if(a=this.getNode(a)){var c=this.isExpandedNode(a);if(c&&!this.isLeaf(a)){a.expanded=!1;var d=this._getNodeEl(a),e=this._getNodesEl(a);e&&(e.style.display="none");var e=this._getNodeEl(a);if(e){var f=e.firstChild;mini.removeClass(f,this._expandNodeCls),mini.addClass(f,this._collapseNodeCls)}this.fire("collapse",{node:a}),b=b&&!mini.isIE6;var g=this._getViewChildNodes(a);if(b&&g&&g.length>0){this._inAniming=!0;var e=this._getNodesEl(a);if(!e)return;e.style.display="",e.style.height="auto",this._doPositoin&&(e.style.position="relative");var h=(mini.getHeight(e),{height:"1px"}),i=this,j=jQuery(e);j.animate(h,180,function(){e.style.display="none",e.style.height="auto",i._doPositoin&&(e.style.position="static"),i._inAniming=!1,i._doLayoutHeader(),clearInterval(i._animateTimer);var b=i._getNodesEl(a);i.removeOnCollapse&&b&&jQuery(b).remove(),mini.repaint(d)}),clearInterval(this._animateTimer),this._animateTimer=setInterval(function(){i._doLayoutHeader()},60)}else{var k=this._getNodesEl(a);this.removeOnCollapse&&k&&jQuery(k).remove()}this._doLayoutHeader(),this._allowExpandLayout&&mini.repaint(this.el)}}},toggleNode:function(a,b){this.isExpandedNode(a)?this.collapseNode(a,b):this.expandNode(a,b)},expandLevel:function(a){this.cascadeChild(this.root,function(b){this.getLevel(b)==a&&null!=b[this.nodesField]&&this.expandNode(b)},this)},collapseLevel:function(a){this.cascadeChild(this.root,function(b){this.getLevel(b)==a&&null!=b[this.nodesField]&&this.collapseNode(b)},this)},expandAll:function(){this.cascadeChild(this.root,function(a){null!=a[this.nodesField]&&this.expandNode(a)},this)},collapseAll:function(){this.cascadeChild(this.root,function(a){null!=a[this.nodesField]&&this.collapseNode(a)},this)},expandPath:function(a){if(a=this.getNode(a))for(var b=this.getAncestors(a),c=0,d=b.length;d>c;c++)this.expandNode(b[c])},collapsePath:function(a){if(a=this.getNode(a))for(var b=this.getAncestors(a),c=0,d=b.length;d>c;c++)this.collapseNode(b[c])},selectNode:function(a){a=this.getNode(a);var b=this._getNodeEl(this._selectedNode);b&&mini.removeClass(b.firstChild,this._selectedNodeCls),this._selectedNode=a;var b=this._getNodeEl(this._selectedNode);b&&mini.addClass(b.firstChild,this._selectedNodeCls);var c={node:a,isLeaf:this.isLeaf(a)};this.fire("nodeselect",c)},getSelectedNode:function(){return this._selectedNode},getSelectedNodes:function(){var a=[];return this._selectedNode&&a.push(this._selectedNode),a},doUpdateCheckedState:function(){},autoCheckParent:!1,setAutoCheckParent:function(a){this.autoCheckParent=a},getAutoCheckParent:function(a){return this.autoCheckParent},hasCheckedChildNode:function(a){for(var b=!1,c=this.getAllChildNodes(a),d=0,e=c.length;e>d;d++){var f=c[d];if(this.isCheckedNode(f)){b=!0;break}}return b},_doCheckLoadNodes:function(){for(var a=this.getList(),b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.checked&&b.push(e)}for(var c=0,d=b.length;d>c;c++){var e=b[c];this._doCheckNode(e,!0,this.checkRecursive)}},_doCheckNode:function(a,b,c){var d=a,e=[];if(a.checked=b,a._indeterminate=!1,e.push(a),c){this.cascadeChild(a,function(a){a.checked=b,a._indeterminate=!1,e.push(a)},this);var f=this.getAncestors(a);f.reverse();for(var g=0,h=f.length;h>g;g++){for(var i=f[g],j=this.getChildNodes(i),k=!0,l=!1,m=0,n=j.length;n>m;m++){var o=j[m];this.isCheckedNode(o)?l=!0:k=!1}k?(i.checked=!0,i._indeterminate=!1):(i.checked=!1,i._indeterminate=l),e.push(i)}}if(this.autoCheckParent)for(var f=this.getAncestors(d),g=0,h=f.length;h>g;g++){var i=f[g],l=this.hasCheckedChildNode(i);l&&(i.checked=!0,i._indeterminate=!1,e.push(i))}if(this.checkOpposite){e=[],e.push(a),a.checked&&this.cascadeChild(a,function(a){a.checked=!1,a._indeterminate=!1,e.push(a)},this);var f=this.getAncestors(a);f.reverse();for(var g=0,h=f.length;h>g;g++){var i=f[g];a.checked&&(i.checked=!1,i._indeterminate=!1),e.push(i)}}for(var g=0,h=e.length;h>g;g++){var a=e[g],p=this._getCheckBoxEl(a);p&&(a.checked?(p.indeterminate=!1,p.checked=!0):(p.indeterminate=a._indeterminate,p.checked=!1))}},checkNode:function(a){a=this.getNode(a),a&&this._doCheckNode(a,!0,this.checkRecursive)},uncheckNode:function(a){a=this.getNode(a),a&&this._doCheckNode(a,!1,this.checkRecursive)},checkNodes:function(a){mini.isArray(a)||(a=[]);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.checkNode(d)}},uncheckNodes:function(a){mini.isArray(a)||(a=[]);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.uncheckNode(d)}},checkAllNodes:function(){this.cascadeChild(this.root,function(a){this._doCheckNode(a,!0,!1)},this)},uncheckAllNodes:function(a){this.cascadeChild(this.root,function(a){this._doCheckNode(a,!1,!1)},this)},getCheckedNodes:function(a,b){var c=[],d={},e=b?null:this._viewNodes?this._viewNodes:null;return this.cascadeChild(this.root,function(b){if((null===e&&1==b.checked||1==b.checked&&e.hasOwnProperty(b._id))&&(c.push(b),a))for(var f=this.getAncestors(b),g=0,h=f.length;h>g;g++){var i=f[g];d[i._id]||(d[i._id]=i,c.push(i))}},this),c},setValue:function(a,b){mini.isNull(a)&&(a=""),a=String(a);var c=this.getCheckedNodes(!1,b);if(this.uncheckNodes(c),this.value=a,this.showCheckBox)for(var d=String(a).split(this.delimiter),e=0,f=d.length;f>e;e++)this.checkNode(d[e]);else this.value=a,this.selectNode(a)},getNodesByValue:function(a){mini.isNull(a)&&(a=""),a=String(a);for(var b=[],c=String(a).split(this.delimiter),d=0,e=c.length;e>d;d++){var f=this.getNode(c[d]);f&&b.push(f)}return b},getValueAndText:function(a){mini.isNull(a)&&(a=[]),mini.isArray(a)||(a=this.getNodesByValue(a));for(var b=[],c=[],d=0,e=a.length;e>d;d++){var f=a[d];f&&(b.push(this.getItemValue(f)),c.push(this.getItemText(f)))}return[b.join(this.delimiter),c.join(this.delimiter)]},getValue:function(a,b){for(var c=this.getCheckedNodes(a,b),d=[],e=0,f=c.length;f>e;e++){var g=this.getItemValue(c[e]);g&&d.push(g)}return d.join(this.delimiter)},setResultAsTree:function(a){this.resultAsTree=a},getResultAsTree:function(){return this.resultAsTree},setParentField:function(a){this.parentField=a},getParentField:function(){return this.parentField},setIdField:function(a){this.idField=a},getIdField:function(){return this.idField},setTextField:function(a){this.textField=a},getTextField:function(){return this.textField},setShowTreeLines:function(a){this.showTreeLines=a,1==a?mini.addClass(this.el,"mini-tree-treeLine"):mini.removeClass(this.el,"mini-tree-treeLine")},getShowTreeLines:function(){return this.showTreeLines},setShowArrow:function(a){this.showArrow=a,1==a?mini.addClass(this.el,"mini-tree-showArrows"):mini.removeClass(this.el,"mini-tree-showArrows")},getShowArrow:function(){return this.showArrow},setIconField:function(a){this.iconField=a},getIconField:function(){return this.iconField},setNodesField:function(a){this.nodesField=a},getNodesField:function(){return this.nodesField},setTreeColumn:function(a){this.treeColumn=a},getTreeColumn:function(){return this.treeColumn},setLeafIcon:function(a){this.leafIcon=a},getLeafIcon:function(){return this.leafIcon},setFolderIcon:function(a){this.folderIcon=a},getFolderIcon:function(){return this.folderIcon},setExpandOnDblClick:function(a){this.expandOnDblClick=a},getExpandOnDblClick:function(){return this.expandOnDblClick},setExpandOnNodeClick:function(a){this.expandOnNodeClick=a,a?mini.addClass(this.el,"mini-tree-nodeclick"):mini.removeClass(this.el,"mini-tree-nodeclick")},getExpandOnNodeClick:function(){return this.expandOnNodeClick},setRemoveOnCollapse:function(a){this.removeOnCollapse=a},getRemoveOnCollapse:function(){return this.removeOnCollapse},setLoadOnExpand:function(a){this.loadOnExpand=a},getLoadOnExpand:function(){return this.loadOnExpand},setAutoEscape:function(a){this.autoEscape=a},getAutoEscape:function(){return this.autoEscape},imgPath:"",setImgPath:function(a){this.imgPath=a},getImgPath:function(){return this.imgPath},imgField:"img",setImgField:function(a){this.imgField=a},getImgField:function(){return this.imgField},__OnDblClick:function(a){if(this.enabled&&!mini.findParent(a.target,this._checkBoxCls)){var b=this._getNodeByEvent(a);if(b&&b.enabled!==!1&&mini.findParent(a.target,this._inNodeCls)){var c=this.isExpandedNode(b),d={node:b,expanded:c,cancel:!1};if(this.fire("nodedblclick",{htmlEvent:a,node:b,isLeaf:this.isLeaf(b)}),this.expandOnDblClick&&!this._inAniming){if(this._viewNodes){var e=this._getViewChildNodes(b);if(0==e.length)return}else if(!this.getChildNodes(b))return;if(c){if(this.fire("beforecollapse",d),1==d.cancel)return;this.collapseNode(b,this.allowAnim)}else{if(this.fire("beforeexpand",d),1==d.cancel)return;this.expandNode(b,this.allowAnim)}}}}},__OnClick:function(a){if(this.enabled){var b=this._getNodeByEvent(a);if(b&&b.enabled!==!1){if(mini.hasClass(a.target,"mini-tree-editinput"))return;var c=mini.findParent(a.target,this._inNodeCls)&&this.expandOnNodeClick;if(mini.findParent(a.target,this._checkBoxCls)&&(c=!1),(mini.findParent(a.target,this._eciconCls)||c)&&0==this.isLeaf(b)){if(this._inAniming)return;var d=this.isExpandedNode(b),e={node:b,expanded:d,cancel:!1};if(!this._inAniming){if(this._viewNodes){var f=this._getViewChildNodes(b);if(0==f.length)return}if(d){if(this.fire("beforecollapse",e),1==e.cancel)return;this.collapseNode(b,this.allowAnim)}else{if(this.fire("beforeexpand",e),1==e.cancel)return;this.expandNode(b,this.allowAnim)}}}else if(mini.findParent(a.target,this._checkBoxCls)){var g=this.isCheckedNode(b),e={isLeaf:this.isLeaf(b),node:b,checked:g,checkRecursive:this.checkRecursive,htmlEvent:a,cancel:!1};if(this.fire("beforenodecheck",e),1==e.cancel)return void a.preventDefault();g?this.uncheckNode(b):this.checkNode(b),e.checked=this.isCheckedNode(b),this.fire("nodecheck",e)}else this._OnNodeClick(b,a)}}},__OnMouseDown:function(a){if(this.enabled){this._editInput&&!mini.findParent(a.target,"mini-tree-editinput")&&this._editInput.blur();var b=this._getNodeByEvent(a);b&&(mini.findParent(a.target,this._eciconCls)||mini.findParent(a.target,this._checkBoxCls)||this._OnNodeMouseDown(b,a))}},_OnNodeMouseDown:function(a,b){var c=mini.findParent(b.target,this._inNodeCls);if(!c)return null;if(this.isEnabledNode(a)){var d={node:a,cancel:!1,isLeaf:this.isLeaf(a),htmlEvent:b};this.allowSelect&&a.allowSelect!==!1&&this._selectedNode!=a&&(this.fire("beforenodeselect",d),1!=d.cancel&&this.selectNode(a)),this.fire("nodeMouseDown",d)}},_OnNodeClick:function(a,b){var c=mini.findParent(b.target,this._inNodeCls);if(!c)return null;if("a"==b.target.tagName.toLowerCase()&&(b.target.hideFocus=!0),this.isEnabledNode(a)){var d={node:a,cancel:!1,isLeaf:this.isLeaf(a),htmlEvent:b};if(this._getColumnByEvent){var e=this._getColumnByEvent(b);e&&(d.column=e,d.field=e.field)}this.fire("nodeClick",d)}},__OnMouseOver:function(a){if(!this._dragging){(mini.hasClass(a.target,"mini-tree-parentNode")||mini.hasClass(a.target,"mini-tree-rootnodes"))&&(this.currentMouseOverNode=null);var b=this._getNodeByEvent(a);b&&this._OnNodeMouseOver(b,a)}},_OnNodeMouseOver:function(a,b){if(this.isEnabledNode(a)&&mini.findParent(b.target,this._inNodeCls)){var b={node:a,htmlEvent:b};this.currentMouseOverNode!=a&&this.fire("nodemouseover",b),this.currentMouseOverNode=a}},__OnMouseMove:function(a){var b=this._getNodeByEvent(a);b&&this._OnNodeMouseMove(b,a)},__OnMouseOut:function(a){var b=this._getNodeByEvent(a);b&&this._OnNodeMouseOut(b,a)},_OnNodeMouseOut:function(a,b){if(this.isEnabledNode(a)&&mini.findParent(b.target,this._inNodeCls)){this.blurNode();var b={node:a,htmlEvent:b};this.fire("nodemouseout",b)}},_OnNodeMouseMove:function(a,b){if(this.isEnabledNode(a)&&mini.findParent(b.target,this._inNodeCls)){1==this.enableHotTrack&&this.focusNode(a);var b={node:a,htmlEvent:b};this.fire("nodemousemove",b)}},focusNode:function(a,b){function c(){var c=this._getNodeHoverEl(a);b&&c&&this.scrollIntoView(a),this._focusedNode!=a&&(this.blurNode(),this._focusedNode=a,mini.addClass(c,this._nodeHoverCls))}if(a=this.getNode(a)){var d=this;c.call(d)}},blurNode:function(){if(this._focusedNode){var a=this._getNodeHoverEl(this._focusedNode);a&&mini.removeClass(a,this._nodeHoverCls),this._focusedNode=null}},scrollIntoView:function(a){if(a=this.getNode(a)){this.expandNode(a);var b=this._getNodeEl(a);mini.scrollIntoView(b,this.el,!1)}},__OnHtmlContextMenu:function(a){return mini.isAncestor(this._headerEl,a.target)?!0:mini.Tree.superclass.__OnHtmlContextMenu.call(this,a)},onNodeClick:function(a,b){this.on("nodeClick",a,b)},onBeforeNodeSelect:function(a,b){this.on("beforenodeselect",a,b)},onNodeSelect:function(a,b){this.on("nodeselect",a,b)},onBeforeNodeCheck:function(a,b){this.on("beforenodecheck",a,b)},onCheckNode:function(a,b){this.on("nodecheck",a,b)},onNodeMouseDown:function(a,b){this.on("nodemousedown",a,b)},onBeforeExpand:function(a,b){this.on("beforeexpand",a,b)},onExpand:function(a,b){this.on("expand",a,b)},onBeforeCollapse:function(a,b){this.on("beforecollapse",a,b)},onCollapse:function(a,b){this.on("collapse",a,b)},onBeforeLoad:function(a,b){this.on("beforeload",a,b)},onLoad:function(a,b){this.on("load",a,b)},onLoadError:function(a,b){this.on("loaderror",a,b)},onDataLoad:function(a,b){this.on("dataload",a,b)},_getDragData:function(){return this.getSelectedNodes().clone()},_getDragText:function(a){return 1==this.autoEscape?mini.htmlEncode(this.getItemText(a[0])):this.getItemText(a[0])},allowDrag:!1,allowDrop:!1,dragGroupName:"",dropGroupName:"",allowLeafDropIn:!1,setAllowLeafDropIn:function(a){this.allowLeafDropIn=a},getAllowLeafDropIn:function(){return this.allowLeafDropIn},setAllowDrag:function(a){this.allowDrag=a},getAllowDrag:function(){return this.allowDrag},setAllowDrop:function(a){this.allowDrop=a},getAllowDrop:function(){return this.allowDrop},setDragGroupName:function(a){this.dragGroupName=a},getDragGroupName:function(){return this.dragGroupName},setDropGroupName:function(a){this.dropGroupName=a},getDropGroupName:function(){return this.dropGroupName},isAllowDrag:function(a){return this.allowDrag?a.allowDrag===!1?!1:!0:!1},_OnDragStart:function(a){var b={node:a,nodes:this._getDragData(),dragText:this._getDragText(this._getDragData()),cancel:!1};return this.fire("DragStart",b),b},_OnDragDrop:function(a,b,c){a=a.clone();var d={dragNodes:a,targetNode:b,action:c,cancel:!1},e=this._getDropedParentNode(a,c,b);return d.dragNode=d.dragNodes[0],d.dropNode=d.targetNode,d.dragAction=d.action,d.dropParentNode=e,this.fire("beforedrop",d),this.fire("DragDrop",d),
d},_OnGiveFeedback:function(a,b,c){var d={};return d.effect=a,d.nodes=b,d.targetNode=c,d.node=d.nodes[0],d.dragNodes=b,d.dragNode=d.dragNodes[0],d.dropNode=d.targetNode,d.dragAction=d.action,this.fire("givefeedback",d),d},_allowDrag:function(a){return!0},getAttrs:function(a){function b(a){for(var c=[],d=0,i=a.length;i>d;d++){var j=a[d],k=mini.getChildNodes(j),l=k[0],m=k[1];l&&m||(l=j);var n=jQuery(l),o={};o[e]=l.getAttribute("value");o[g]=n.attr("iconCls"),o[f]=l.innerHTML,c.add(o);var p=n.attr("expanded");p&&(o.expanded="false"==p?!1:!0);var q=n.attr("allowSelect");if(q&&(o.allowSelect="false"==q?!1:!0),m){var r=mini.getChildNodes(m),s=b(r);s.length>0&&(o[h]=s)}}return c}var c=mini.Tree.superclass.getAttrs.call(this,a);if(mini._ParseString(a,c,["data","value","url","idField","textField","iconField","nodesField","parentField","valueField","leafIcon","folderIcon","ondrawnode","onbeforenodeselect","onnodeselect","onnodemousedown","onnodeclick","onnodedblclick","onbeforeload","onpreload","onload","onloaderror","ondataload","onnodemouseover","onnodemouseout","onbeforenodecheck","onnodecheck","onbeforeexpand","onexpand","onbeforecollapse","oncollapse","dragGroupName","dropGroupName","onendedit","imgPath","imgField","expandOnLoad","ajaxOption","ondragstart","onbeforedrop","ondrop","ongivefeedback"]),mini._ParseBool(a,c,["allowSelect","showCheckBox","showExpandButtons","showTreeIcon","showTreeLines","checkRecursive","enableHotTrack","showFolderCheckBox","resultAsTree","allowLeafDropIn","allowDrag","allowDrop","showArrow","expandOnDblClick","removeOnCollapse","autoCheckParent","loadOnExpand","expandOnNodeClick","autoEscape","autoLoad","checkOpposite"]),c.ajaxOption&&(c.ajaxOption=mini.decode(c.ajaxOption)),c.expandOnLoad){var d=parseInt(c.expandOnLoad);mini.isNumber(d)?c.expandOnLoad=d:c.expandOnLoad="true"==c.expandOnLoad?!0:!1}var e=c.idField||this.idField,f=c.textField||this.textField,g=c.iconField||this.iconField,h=c.nodesField||this.nodesField,i=b(mini.getChildNodes(a));return i.length>0&&(c.data=i),!c.idField&&c.valueField&&(c.idField=c.valueField),c}}),mini.regClass(mini.Tree,"tree"),mini._TreeDragDrop=function(a){this.owner=a,this.owner.on("NodeMouseDown",this.__OnTreeNodeMouseDown,this)},mini._TreeDragDrop.prototype={destroy:function(a){this.drag&&(mini.clearEvent(this.drag),this.drag.destroy(a),this.drag=null),this.owner=null,mini.clearEvent(this)},__OnTreeNodeMouseDown:function(a){var b=a.node;if(a.htmlEvent.button!=mini.MouseButton.Right){var c=this.owner;if(!c._dragging&&!c.isReadOnly()&&0!=c.isAllowDrag(a.node)&&!c.isEditingNode(b)&&c._allowDrag(a.htmlEvent)){this.dragData=c._getDragData(),-1==this.dragData.indexOf(b)&&this.dragData.push(b);var d=this._getDrag();d.start(a.htmlEvent,b)}}},_OnDragStart:function(a,b){var c=this.owner;c._dragging=!0;var d=c._OnDragStart(b);d.cancel||(this.dragText=d.dragText,this.feedbackEl=mini.append(document.body,'<div class="mini-feedback"></div>'),this.feedbackEl.innerHTML=this.dragText,this.lastFeedbackClass="",this.enableHotTrack=c.enableHotTrack,c.setEnableHotTrack(!1))},_getDropTree:function(a){var b=mini.findParent(a.target,"mini-tree",500);return b?mini.get(b):void 0},_OnDragMove:function(a){var b=this.owner,c=this._getDropTree(a.event),d=a.now[0],e=a.now[1];if(mini.setXY(this.feedbackEl,d+15,e+18),this.dragAction="no",c)if(b._allowDrag(a.event)){var f=c._getNodeByEvent(a.event);if(this.dropNode=f,f&&1==c.allowDrop){if(!c.isLeaf(f)){var g=f[c.nodesField];g&&g.length>0||b.loadOnExpand&&f.asyncLoad!==!1&&c.loadNode(f)}this.dragAction=this.getFeedback(f,e,3,c)}else this.dragAction="no";b&&c&&b!=c&&!f&&0==c.getChildNodes(c.root).length&&(f=c.getRootNode(),this.dragAction="add",this.dropNode=f)}else this.dragAction="no";this.lastFeedbackClass="mini-feedback-"+this.dragAction,this.feedbackEl.className="mini-feedback "+this.lastFeedbackClass,"no"==this.dragAction&&(f=null),this.setRowFeedback(f,this.dragAction,c)},_OnDragStop:function(a){var b=this.owner,c=this._getDropTree(a.event);b._dragging=!1,mini.removeNode(this.feedbackEl),this.feedbackEl=null,this.setRowFeedback(null);for(var d=[],e=0,f=this.dragData.length;f>e;e++){for(var g=this.dragData[e],h=!1,i=0,j=this.dragData.length;j>i;i++){var k=this.dragData[i];if(k!=g&&(h=b.isAncestor(k,g)))break}h||d.push(g)}if(this.dragData=d,this.dropNode&&c&&"no"!=this.dragAction){var l=b._OnDragDrop(this.dragData,this.dropNode,this.dragAction);if(l.cancel)return;var d=l.dragNodes,m=l.targetNode,n=l.action;if(b==c?b.moveNodes(d,m,n):(b.removeNodes(d),c.addNodes(d,m,n)),!this.dragData[0])return;var l={dragNode:this.dragData[0],dropNode:this.dropNode,dragAction:this.dragAction,dropParentNode:b.getParentNode(g)};b.fire("drop",l)}b.setEnableHotTrack(this.enableHotTrack),this.dropNode=null,this.dragData=null},setRowFeedback:function(a,b,c){if(this.lastAddDomNode&&mini.removeClass(this.lastAddDomNode,"mini-tree-feedback-add"),(null==a||"add"==this.dragAction)&&(mini.removeNode(this.feedbackLine),this.feedbackLine=null),this.lastRowFeedback=a,null!=a)if("before"==b||"after"==b){this.feedbackLine||(this.feedbackLine=mini.append(document.body,"<div class='mini-feedback-line'></div>")),this.feedbackLine.style.display="block";var d=c.getNodeBox(a),e=d.x,f=d.y-1;"after"==b&&(f+=d.height),mini.setXY(this.feedbackLine,e,f);var g=c.getBox(!0);mini.setWidth(this.feedbackLine,g.width)}else{var h=c._getNodeTitleEl(a);mini.addClass(h,"mini-tree-feedback-add"),this.lastAddDomNode=h}},getFeedback:function(a,b,c,d){var e=d.getNodeBox(a),f=e.height,g=b-e.y,h=null;if(-1!=this.dragData.indexOf(a))return"no";var i=!1;if(3==c){i=d.isLeaf(a);for(var j=0,k=this.dragData.length;k>j;j++){var l=this.dragData[j],m=d.isAncestor(l,a);if(m){h="no";break}}}null==h&&(h=i&&0==d.allowLeafDropIn?g>f/2?"after":"before":g>f/3*2?"after":g>=f/3&&f/3*2>=g?"add":"before");var n=d._OnGiveFeedback(h,this.dragData,a);return n.effect},_getDrag:function(){return this.drag||(this.drag=new mini.Drag({capture:!1,onStart:mini.createDelegate(this._OnDragStart,this),onMove:mini.createDelegate(this._OnDragMove,this),onStop:mini.createDelegate(this._OnDragStop,this)})),this.drag}},mini.TreeGrid=function(){this.columns=[],this._bottomColumns=[],this._idColumns={},this._nameColumns={},this._cellErrors=[],this._cellMapErrors={},mini.TreeGrid.superclass.constructor.call(this),this._resizeEl.style.display=this.allowResize?"":"none"},mini.extend(mini.TreeGrid,mini.Tree,{_rowIdField:"_id",width:300,height:180,minWidth:300,minHeight:150,maxWidth:5e3,maxHeight:3e3,allowResize:!1,treeColumn:"",columns:[],columnWidth:80,allowResizeColumn:!0,allowMoveColumn:!0,_doPositoin:!0,showPager:!1,pageIndex:0,pageSize:-1,totalCount:0,totalPage:0,sortMode:"server",allowSortColumn:!0,sortField:"",sortOrder:"",sortFieldField:"sortField",sortOrderField:"sortOrder",_headerCellCls:"mini-treegrid-headerCell",_cellCls:"mini-treegrid-cell",_borderCls:"mini-treegrid-border",_headerCls:"mini-treegrid-header",_bodyCls:"mini-treegrid-body",_nodeCls:"mini-treegrid-node",_nodesCls:"mini-treegrid-nodes",_selectedNodeCls:"mini-treegrid-selectedNode",_nodeHoverCls:"mini-treegrid-hoverNode",_expandNodeCls:"mini-treegrid-expand",_collapseNodeCls:"mini-treegrid-collapse",_eciconCls:"mini-treegrid-ec-icon",_inNodeCls:"mini-treegrid-nodeTitle",_getNodeHoverEl:function(a){if(!a)return null;var b=this._getNodeTitleEl(a),b=this._getNodeTitleEl(a);return b},uiCls:"mini-treegrid",_create:function(){mini.TreeGrid.superclass._create.call(this),this._footerEl=mini.append(this._borderEl,'<div class="mini-grid-footer"></div>'),this._resizeEl=mini.append(this._borderEl,'<div class="mini-resizer-trigger" style=""></div>'),mini.on(this._bodyEl,"scroll",this.__OnScroll,this),this._Resizer=new mini._Resizer(this),this._Sort=new mini._GridSort(this),this._ColumnMove=new mini._ColumnMove(this),this._Splitter=new mini._ColumnSplitter(this),this._CellTip=new mini._CellToolTip(this),this._createPager()},_initEvents:function(){mini.TreeGrid.superclass._initEvents.call(this),mini._BindEvents(function(){mini.on(this._headerEl,"click",this._OnHeaderCellClick,this)},this)},_createPager:function(){this.pager=new mini.Pager,this.pager.render(this._footerEl),this.bindPager(this.pager)},bindPager:function(a){a.on("beforepagechanged",this.__OnPageChanged,this),this.on("load",function(b){a.update(this.pageIndex,this.pageSize,b.total),this.totalPage=a.totalPage},this)},__OnPageChanged:function(a){return 0!=this.data.length||a.isreload?void this.gotoPage(a.pageIndex,a.pageSize):void this.setPageSize(a.pageSize)},_OnHeaderCellClick:function(a){a.sender=this;var b=this._getColumnByEvent(a);if(b){if(this.allowSortColumn&&(!b.columns||0==b.columns.length)&&b.field&&b.allowSort!==!1){var c="asc";this.sortField==b.field&&(c="asc"==this.sortOrder?"desc":"asc"),this.sortBy(b.field,c)}this.fire("headercellclick",a)}},_getColumnByEvent:function(a){var b=mini.findParent(a.target,this._headerCellCls);if(b){var c=b.id.split("$"),d=c[c.length-1];return this._getColumnById(d)}return null},gotoPage:function(a,b){var c={};mini.isNumber(a)&&(c.pageIndex=a),mini.isNumber(b)&&(c.pageSize=b),this.pageIndex=a,this.pageSize=b,this.load(this.url,c)},_getSortFnByField:function(a){function b(b,c){var d=mini._getMap(a,b),e=mini._getMap(a,c),f=i(d),g=i(e);return"string"==$.type(f)&&"string"==$.type(g)?f.localeCompare(g):f>g?1:f==g?0:-1}if(!a)return null;for(var c="string",d=null,e=this.getBottomColumns(),f=0,g=e.length;g>f;f++){var h=e[f];if(h.field==a){h.dataType&&(c=h.dataType.toLowerCase());break}}var i=mini.sortTypes[c];return i||(i=mini.sortTypes.string),d=b},sortBy:function(a,b){if(this.sortField=a,this.sortOrder="asc"==b?"asc":"desc","server"==this.sortMode&&this.url&&this.data.length>0){var c=this.loadParams||{};c.sortField=a,c.sortOrder=b,c.pageIndex=this.pageIndex;var d=this;this.load(this.url,c,function(){d.fire("sort")})}else{var e=this.data.clone(),f=this._getSortFnByField(a);if(!f)return;e=this._doClientSort(e,f,a),this.setData(e),this.fire("sort")}},_doClientSort:function(a,b,c){for(var d=this,e=[],f=a.length-1;f>=0;f--){var g=a[f],h=mini._getMap(c,g);(mini.isNull(h)||""===h)&&(e.insert(0,g),a.removeAt(f))}return mini.sort(a,b,this),a.insertRange(0,e),"desc"==this.sortOrder&&a.reverse(),$.each(a,function(){var a=this[d.nodesField];a&&a.length>0&&(this[d.nodesField]=d._doClientSort(a,b,c))}),a},load:function(a,b,c,d){b=b||{},mini.isNull(b.pageIndex)&&(b.pageIndex=0),mini.isNull(b.pageSize)&&(b.pageSize=this.pageSize),"server"!=this.sortMode?(b.sortField=this.sortField="",b.sortOrder=this.sortOrder=""):(b.sortField=this.sortField,b.sortOrder=this.sortOrder),this.url=a,this._doLoad(b,this.root,c,d)},_doLoad:function(params,node,success,fail){try{var url=eval(this.url);void 0!=url&&(this.url=url)}catch(e){}this.loadParams=params;var isRoot=node==this.root,e={url:this.url,async:this._ajaxOption.async,type:this._ajaxOption.type,params:params,data:params,cache:!1,cancel:!1,node:node,isRoot:isRoot};if(this.fire("beforeload",e),e.data!=e.params&&e.params!=params&&(e.data=e.params),1!=e.cancel){node!=this.root;var sf=this,container=node;isRoot?(mini.addClass(this._bodyEl,"mini-tree-loading"),this._bodyEl.innerHTML="<div class='mini-treegrid-ec-icon'>&nbsp;</div>"):sf.addNodeCls(container,"mini-tree-loading"),mini.copyTo(e,{success:function(a,b,c){isRoot?(mini.removeClass(sf._bodyEl,"mini-tree-loading"),sf._bodyEl.innerHTML=""):sf.removeNodeCls(container,"mini-tree-loading");var d=null;try{d=mini.decode(a)}catch(e){d=[],1==mini_debugger&&alert("tree json is error.")}sf.dataField&&(d=mini._getMap(sf.dataField,d)),d||(d=[]);var e;e=d instanceof Array?{result:d,data:d,cancel:!1,node:node}:{result:d,data:d.data,total:d.total,cancel:!1,node:node},0==sf.resultAsTree&&(e.data=mini.arrayToTree(e.data,sf.nodesField,sf.idField,sf.parentField)),sf.fire("preload",e),1!=e.cancel&&(isRoot&&sf.setData(e.data),success&&success(e.data),sf._doCheckLoadNodes(),sf.fire("load",e))},error:function(a,b,c){isRoot?(mini.removeClass(sf._bodyEl,"mini-tree-loading"),sf._bodyEl.innerHTML=""):sf.removeNodeCls(container,"mini-tree-loading");var d={xmlHttp:a,errorCode:b};fail&&fail(d),1==mini_debugger&&alert("network error"),sf.fire("loaderror",d)}}),this._ajaxer=mini.ajax(e)}},_createColumnId:function(a){return this.uid+"$column$"+a.id},_getHeaderScrollEl:function(){return this._headerEl.firstChild},_CreateTopTr:function(a){var b="",c=this.getBottomColumns();b+=isIE?isIE6||isIE7||isIE8&&!jQuery.boxModel||isIE9&&!jQuery.boxModel?'<tr style="display:none;">':"<tr >":"<tr>";for(var d=0,e=c.length;e>d;d++){var f=c[d],g=(f.width,this._createColumnId(f)+"$"+a);b+='<td id="'+g+'" style="padding:0;border:0;margin:0;height:0;',f.width&&(b+="width:"+f.width),0==f.visible&&(b+=";display:none;"),b+='" ></td>'}return b+="</tr>"},_doUpdateHeader:function(){var a=this.getColumnRows(),b=this.getBottomColumns(),c=(b.length,[]);c[c.length]='<div class="mini-treegrid-headerInner"><table style="display:table" class="mini-treegrid-table" cellspacing="0" cellpadding="0">',c[c.length]=this._CreateTopTr("header");for(var d=0,e=a.length;e>d;d++){var f=a[d];c[c.length]="<tr >";for(var g=0,h=f.length;h>g;g++){var i=f[g],j=i.header;"function"==typeof j&&(j=j.call(this,i)),(mini.isNull(j)||""===j)&&(j="&nbsp;");var k=this._createColumnId(i),l="";this.sortField==i.field&&(l="asc"==this.sortOrder?"mini-grid-asc":"mini-grid-desc"),c[c.length]='<td id="',c[c.length]=k,c[c.length]='" class="mini-treegrid-headerCell '+l+" "+(i.headerCls||"")+" ",g==h-1&&(c[c.length]=" mini-treegrid-last-column "),c[c.length]='" style="';b.indexOf(i);0==i.visible&&(c[c.length]=";display:none;"),i.columns&&i.columns.length>0&&0==i.colspan&&(c[c.length]=";display:none;"),i.headerStyle&&(c[c.length]=i.headerStyle+";"),i.headerAlign&&(c[c.length]="text-align:"+i.headerAlign+";"),c[c.length]='" ',i.rowspan&&(c[c.length]='rowspan="'+i.rowspan+'" '),i.colspan&&(c[c.length]='colspan="'+i.colspan+'" '),c[c.length]=">",c[c.length]=j,l&&(c[c.length]='<span class="mini-grid-sortIcon"></span>'),c[c.length]="</td>"}c[c.length]="</tr>"}c[c.length]='</table><div class="mini-treegrid-topRightCell"></div></div>';var m=c.join("");this._headerEl.innerHTML=m,this._headerInnerEl=this._headerEl.firstChild,this._topRightCellEl=this._headerInnerEl.lastChild},_createNodeTitle:function(a,b,c){var d=!c;c||(c=[]);var e=a[this.textField];(null===e||void 0===e)&&(e="");var f=this.isLeaf(a),g=(this.getLevel(a),"");f||(this._viewNodes?this._getViewChildNodes(a).length>0&&(g=this.isExpandedNode(a)?this._expandNodeCls:this._collapseNodeCls):g=this.isExpandedNode(a)?this._expandNodeCls:this._collapseNodeCls),this._selectedNode==a&&(g+=" "+this._selectedNodeCls);var h=this.getBottomColumns();c[c.length]='<table class="mini-treegrid-nodeTitle ',c[c.length]=g,c[c.length]='" cellspacing="0" cellpadding="0">',c[c.length]=this._CreateTopTr(),c[c.length]="<tr>";for(var i=0,j=h.length;j>i;i++){var k=h[i],l=this._createCellId(a,k),m=this._OnDrawCell(a,k),n=k.width;"number"==typeof n&&(n+="px"),c[c.length]='<td id="',c[c.length]=l,c[c.length]='" class="mini-treegrid-cell ',m.cellCls&&(c[c.length]=m.cellCls),i==j-1&&(c[c.length]=" mini-treegrid-last-column "),c[c.length]='" style="',m.cellStyle&&(c[c.length]=m.cellStyle,c[c.length]=";"),k.align&&(c[c.length]="text-align:",c[c.length]=k.align,c[c.length]=";"),0==k.visible&&(c[c.length]="display:none;"),c[c.length]='">',c[c.length]=m.cellHtml,c[c.length]="</td>",m.rowCls&&(rowCls=m.rowCls),m.rowStyle&&(rowStyle=m.rowStyle)}return c[c.length]="</table>",d?c.join(""):void 0},doUpdate:function(){if(this._allowUpdate){this._doUpdateHeader();var a=(new Date,this._getViewChildNodes(this.root)),b=[];this._createNodes(a,this.root,b);var c=b.join("");this._bodyEl.innerHTML=c,this._deferLayout()}},getScrollLeft:function(){return this._bodyEl.scrollLeft},setShowPager:function(a){this.showPager=a,a&&-1==this.pageSize&&this.setPageSize(10)},getFooterHeight:function(){return this.showPager?mini.getHeight(this._footerEl):0},doLayout:function(){if(this.canLayout()){var a=this.isAutoHeight(),b=(this.isAutoWidth(),this.getWidth(!0)),c=this.getHeight(!0),d=this.getHeaderHeight();if(this._bodyEl.style.width=b+"px",a)this._bodyEl.style.height="auto";else{var e=c-d-this.getFooterHeight();this._bodyEl.style.height=e+"px"}this._doLayoutHeader(),this._doLayoutTopRightCell(),this.fire("layout")}},_doLayoutTopRightCell:function(){var a=this._headerInnerEl.firstChild,b=(a.offsetWidth+1,a.offsetHeight-1);0>b&&(b=0),this._topRightCellEl.style.height=b+"px"},_doLayoutHeader:function(){var a=this._bodyEl.scrollHeight,b=this._bodyEl.clientHeight,c=(this.getWidth(!0),this._headerEl.firstChild.firstChild),d=this._bodyEl.firstChild;if(b>=a)d&&(d.style.width="100%"),c&&(c.style.width="100%");else{if(d){var e=parseInt(d.parentNode.offsetWidth-17)+"px";d.style.width=e}c&&(c.style.width=e)}try{var e=this._headerEl.firstChild.firstChild.firstChild.offsetWidth;this._bodyEl.firstChild.style.width=e+"px"}catch(f){}this.__OnScroll()},getHeaderHeight:function(){return mini.getHeight(this._headerEl)},_getDragText:function(a){for(var b,c=0;c<this.columns.length;c++)if(this.columns[c].name&&this.columns[c].name==this.treeColumn){b=this.columns[c].field;break}if(b){var d=mini._getMap(b,a[0]);return 1==this.autoEscape?mini.htmlEncode(d):d}return""},_OnDrawCell:function(a,b){var c=this.showCheckBox;c&&this.hasChildren(a)&&(c=this.showFolderCheckBox);var d=mini._getMap(b.field,a),e={isLeaf:this.isLeaf(a),rowIndex:this.indexOf(a),showCheckBox:c,iconCls:this.getNodeIcon(a),showTreeIcon:this.showTreeIcon,sender:this,record:a,row:a,node:a,column:b,field:b?b.field:null,value:d,cellHtml:d,rowCls:null,cellCls:b?b.cellCls||"":"",rowStyle:null,cellStyle:b?b.cellStyle||"":""};b.dateFormat&&(mini.isDate(e.value)?e.cellHtml=mini.formatDate(d,b.dateFormat):e.cellHtml=d);var f=b.renderer;return f&&(fn="function"==typeof f?f:window[f],fn&&(e.cellHtml=fn.call(b,e))),this.fire("drawcell",e),(null===e.cellHtml||void 0===e.cellHtml||""===e.cellHtml)&&(e.cellHtml="&nbsp;"),this.treeColumn&&this.treeColumn===b.name?(this._doTreeColumn(e),e):e},_doTreeColumn:function(a){var b=a.node;mini.isNull(a.showTreeIcon)&&(a.showTreeIcon=this.showTreeIcon);var c=a.cellHtml;this.autoEscape&&(c=mini.htmlEncode(c));var d=this.isLeaf(b),e=this.getLevel(b),f=18*e,g="";a.cellCls?a.cellCls+=" mini-treegrid-treecolumn ":a.cellCls=" mini-treegrid-treecolumn ";for(var h='<div class="mini-treegrid-treecolumn-inner '+g+'">',i=this.getParentNode(b),j=0,k=j;e>=k;k++)if(k!=e&&!(d&&0==this.showExpandButtons&&k>=e-1)){var l="";this._isInViewLastNode(b,k)&&(l="background:none;"),h+='<span class="mini-treegrid-indent " style="'+l+"left:"+18*k+'px;"></span>'}var m="";if(this._isViewFirstNode(b)&&this._isViewLastNode(b)?(m=this._eciconCls+"-last",i==this.root&&(m=this._eciconCls+"-firstLast")):this._isViewFirstNode(b)&&i&&i!=this.root?m="":this._isViewFirstNode(b)?m=this._eciconCls+"-first":this._isViewLastNode(b)&&(m=this._eciconCls+"-last"),h+=d?'<span class="'+this._eciconCls+" "+m+'" style="left:'+f+'px;" ></span>':'<a href="#" onclick="return false;"  hidefocus class="'+this._eciconCls+" "+m+'" style="left:'+f+'px;"></a>',f+=18,a.showTreeIcon){var n=this.getNodeIcon(b);h+='<div class="'+n+' mini-treegrid-nodeicon" style="left:'+f+'px;"></div>',f+=18}if(c='<span class="mini-tree-nodetext">'+c+"</span>",a.showCheckBox){var o=this._createCheckNodeId(b),p=this.isCheckedNode(b);c='<input type="checkbox" id="'+o+'" class="'+this._checkBoxCls+'" hidefocus '+(p?"checked":"")+"/>"+c}h+='<div class="mini-treegrid-nodeshow" style="margin-left:'+(f+2)+'px;">'+c+"</div>",h+="</div>",c=h,a.cellHtml=c},setTreeColumn:function(a){this.treeColumn!=a&&(this.treeColumn=a,this.doUpdate())},getTreeColumn:function(a){return this.treeColumn},setSortMode:function(a){this.sortMode=a},getSortMode:function(){return this.sortMode},setAllowSortColumn:function(a){this.allowSortColumn=a},getAllowSortColumn:function(){return this.allowSortColumn},setAllowResizeColumn:function(a){this.allowResizeColumn=a},getAllowResizeColumn:function(a){return this.allowResizeColumn},setAllowMoveColumn:function(a){this.allowMoveColumn=a},getAllowMoveColumn:function(a){return this.allowMoveColumn},setAllowResize:function(a){this.allowResize=a,this._resizeEl.style.display=this.allowResize?"":"none"},getAllowResize:function(){return this.allowResize},_createCellId:function(a,b){return this.uid+"$"+a._id+"$"+b._id},setColumnWidth:function(a,b){a=this.getColumn(a),a&&(mini.isNumber(b)&&(b+="px"),a.width=b,this.doUpdate())},getSortField:function(){return this.sortField},getSortOrder:function(){return this.sortOrder},setSortFieldField:function(a){this.sortFieldField=a},getSortFieldField:function(){return this.sortFieldField},setSortOrderField:function(a){this.sortOrderField=a},getSortOrderField:function(){return this.sortOrderField},setPageSize:function(a){a=parseInt(a),isNaN(a)||(this.pageSize=a)},getColumnWidth:function(a){var b=this.getColumnBox(a);return b?b.width:0},__OnScroll:function(a){var b=this._bodyEl.scrollLeft;this._headerEl.firstChild.scrollLeft=b},_allowDrag:function(a){var b=mini.findParent(a.target,"mini-treegrid-treecolumn");return b?!0:!1},getAttrs:function(a){var b=mini.TreeGrid.superclass.getAttrs.call(this,a);mini._ParseString(a,b,["treeColumn","sortMode","sortFieldField","sortOrderField","ondrawcell","onsort"]),mini._ParseBool(a,b,["allowResizeColumn","allowMoveColumn","allowSortColumn","allowResize","showPager"]),mini._ParseInt(a,b,["pageSize","ajaxTimeout"]);for(var c=mini.getChildNodes(a),d=0,e=c.length;e>d;d++){var f=c[d],g=jQuery(f).attr("property");g&&(g=g.toLowerCase(),"columns"==g&&(b.columns=mini._ParseColumns(f)))}return delete b.data,b}}),mini.copyTo(mini.TreeGrid.prototype,mini_Column_Prototype),mini.copyTo(mini.TreeGrid.prototype,mini_CellValidator_Prototype),mini.regClass(mini.TreeGrid,"treegrid"),mini.TreeSelect=function(){this.data=[],mini.TreeSelect.superclass.constructor.call(this)},mini.extend(mini.TreeSelect,mini.PopupEdit,{_ajaxOption:{async:!0,type:"get"},valueFromSelect:!1,text:"",value:"",autoCheckParent:!1,checkOpposite:!1,expandOnLoad:!1,valueField:"id",textField:"text",nodesField:"children",delimiter:",",showClose:!0,multiSelect:!1,data:[],url:"",allowInput:!1,showTreeIcon:!1,showTreeLines:!0,resultAsTree:!1,parentField:"pid",checkRecursive:!1,showFolderCheckBox:!0,popupHeight:200,popupWidth:200,popupMaxHeight:250,popupMinWidth:100,queryValue:null,set:function(a){if("string"==typeof a)return this;var b=a.value;delete a.value;var c=a.text;delete a.text;var d=a.url;delete a.url;var e=a.data;return delete a.data,a.onvaluechanged||(this.defaultValueTriggerChange=!1),mini.TreeSelect.superclass.set.call(this,a),mini.isNull(e)||this.setData(e),mini.isNull(d)||this.setUrl(d),mini.isNull(b)||this.setValue(b,this.defaultValueTriggerChange),mini.isNull(c)||this.setText(c),this},uiCls:"mini-treeselect",destroy:function(a){this.tree&&(mini.clearEvent(this.tree),this.tree.destroy(a),this.tree=null),this._destroyQueryToolBar(),delete this.data,mini.TreeSelect.superclass.destroy.call(this,a)},uiCls:"mini-treeselect",_createPopup:function(){mini.TreeSelect.superclass._createPopup.call(this),this._createQueryToolBar(),this.tree=new mini.Tree,this.tree.set({delimiter:this.delimiter}),this.tree.setShowTreeIcon(!0),this.tree.setStyle("border:0;width:100%;height:100%;"),this.showQueryToolBar&&this.popup.setStyle("overflow:hidden;"),this.tree.setResultAsTree(this.resultAsTree),this.tree.render(this.popup._contentEl),this.tree.setCheckRecursive(this.checkRecursive),this.tree.setShowFolderCheckBox(this.showFolderCheckBox),this.tree.setCheckOpposite(this.checkOpposite),this.tree.on("nodeclick",this.__OnNodeClick,this),this.tree.on("nodecheck",this.__OnCheckedChanged,this),this.tree.on("expand",this.__OnTreeExpand,this),this.tree.on("collapse",this.__OnTreeCollapse,this),this.tree.on("beforenodecheck",this.__OnTreeBeforeNodeCheck,this),this.tree.on("beforenodeselect",this.__OnTreeBeforeNodeSelect,this),this.tree.allowAnim=!1;var a=this;this.tree.on("beforeload",function(b){a.fire("beforeload",b)},this),this.tree.on("load",this.__OnTreeLoad,this),this.tree.on("loaderror",function(b){a.fire("loaderror",b)},this),this.tree.on("drawnode",function(b){a.fire("drawnode",b)},this)},__OnTreeLoad:function(a){this.isAsync()&&this._value&&this.setValue(this._value,this.defaultValueTriggerChange),delete this._value,this.fire("load",a)},__OnTreeBeforeNodeCheck:function(a){a.tree=a.sender,this.fire("beforenodecheck",a)},__OnTreeBeforeNodeSelect:function(a){a.tree=a.sender,this.fire("beforenodeselect",a)},__OnTreeExpand:function(a){},__OnTreeCollapse:function(a){},__OnPopupKeyDown:function(a){(27==a.keyCode||13==a.keyCode)&&(jQuery(a.target).hasClass("mini-textbox-input")||(this.hidePopup(),this.focus()))},getSelectedNode:function(){return this.tree.getSelectedNode()},getCheckedNodes:function(a){return this.tree.getCheckedNodes(a)},getSelectedNodes:function(){return this.tree.getSelectedNodes()},getParentNode:function(a){return this.tree.getParentNode(a)},getChildNodes:function(a){return this.tree.getChildNodes(a)},showPopup:function(){mini.TreeSelect.superclass.showPopup.call(this)!==!1&&(this.showQueryToolBar&&this.tree.setHeight(this.popup.getHeight()-35),this.tree.setValue(this.value),this.queryInput&&this.queryInput.setValue(""))},__OnPopupHide:function(a){this.__doFocusCls(),this.tree&&this.tree.clearFilter(),this.fire("hidepopup")},getItem:function(a){return"object"==typeof a?a:this.data[a]},indexOf:function(a){return this.data.indexOf(a)},getAt:function(a){return this.data[a]},loadList:function(a,b,c){this.tree.loadList(a,b,c),this.data=this.tree.getData()},getList:function(){return this.tree.getList()},load:function(a){this.isAsync()&&void 0==this._value&&(this._value=this.value),this.tree.load(a)},setData:function(a){"string"==typeof a&&(a=this._eval(a)),mini.isArray(a)||(a=[]),a=mini.clone(a),this.tree.setData(a),this.data=this.tree.getData()},_eval:function(_){return eval("("+_+")")},getData:function(){return this.data},setUrl:function(a){this.getPopup(),this.tree.setUrl(this.parseUrl(a)),this.url=this.tree.url,this.isAsync()&&void 0==this._value&&(this._value=this.value)},getUrl:function(){return this.url},setTextField:function(a){this.tree&&this.tree.setTextField(a),this.textField=a},getTextField:function(){return this.textField},setNodesField:function(a){this.tree&&this.tree.setNodesField(a),this.nodesField=a},getNodesField:function(){return this.nodesField},isAsync:function(){return 1==this._ajaxOption.async},setValue:function(a,b){this.isAsync()&&(this._value=a);var c=this.getValue(),d=this.tree.getValueAndText(a);""!=d[1]||this.valueFromSelect||(d[0]=a,d[1]=a),this.value=d[0],this._valueEl.value=d[0],this.text=this._textEl.value=d[1],this._doEmpty(),this.tree.setValue(this.value),mini.isEquals(this.value,c)||(void 0===b&&(b=!0),b&&this._OnValueChanged())},setMultiSelect:function(a){this.multiSelect!=a&&(this.multiSelect=a,this.tree.setShowCheckBox(a),this.tree.setAllowSelect(!a),this.tree.setEnableHotTrack(!a))},getMultiSelect:function(){return this.multiSelect},__OnInputTextChanged:function(){var a=this._textEl.value,b=(this.getValue(),this.tree.getSelectedNode());b||this.setValue(a)},__OnNodeClick:function(a){if(!this.multiSelect){var b=this.tree.getSelectedNode(),c=this.tree.getItemValue(b);this.getValue();b&&c!=this.getValue()&&(this.setValue(c),this.hidePopup(),this.focus(),this.fire("nodeclick",{node:a.node}))}},__OnCheckedChanged:function(a){if(this.multiSelect){var b=this.tree.getValue(!1,!0);this.getValue();this.setValue(b),this.fire("nodecheck",a)}},__OnInputKeyDown:function(a){if(this.fire("keydown",{htmlEvent:a}),8==a.keyCode&&(this.isReadOnly()||0==this.allowInput))return!1;if(9==a.keyCode)return void this.hidePopup();if(!this.isReadOnly())switch(a.keyCode){case 27:this.isShowPopup()&&a.stopPropagation(),this.hidePopup();break;case 13:var b=this;this.hidePopup(),setTimeout(function(){b.fire("enter",a)},10);break;case 37:break;case 38:a.preventDefault();break;case 39:break;case 40:a.preventDefault(),this.showPopup();break;default:if(this.isReadOnly()||0==this.allowInput)break;this.allowInput&&(this.tree._selectedNode=null,this.value="");var b=this;setTimeout(function(){b._doQuery()},10)}},_doQuery:function(){var a=this.textField,b=this._textEl.value.toLowerCase();this.tree.filter(function(c){var d=String(c[a]?c[a]:"").toLowerCase();return-1!=d.indexOf(b)?!0:!1}),this.tree.expandAll(),this.showPopup()},setCheckRecursive:function(a){this.checkRecursive=a,this.tree&&this.tree.setCheckRecursive(a)},getCheckRecursive:function(){return this.checkRecursive},setResultAsTree:function(a){this.resultAsTree=a,this.tree&&this.tree.setResultAsTree(a)},getResultAsTree:function(){return this.resultAsTree},setParentField:function(a){this.parentField=a,this.tree&&this.tree.setParentField(a)},getParentField:function(){return this.parentField},setValueField:function(a){this.tree&&this.tree.setIdField(a),this.valueField=a},getValueField:function(){return this.valueField},setShowTreeIcon:function(a){this.showTreeIcon=a,this.tree&&this.tree.setShowTreeIcon(a)},getShowTreeIcon:function(){return this.showTreeIcon},setShowTreeLines:function(a){this.showTreeLines=a,this.tree&&this.tree.setShowTreeLines(a)},getShowTreeLines:function(){return this.showTreeLines},setShowFolderCheckBox:function(a){this.showFolderCheckBox=a,this.tree&&this.tree.setShowFolderCheckBox(a)},getShowFolderCheckBox:function(){return this.showFolderCheckBox},setAutoCheckParent:function(a){this.autoCheckParent=a,this.tree&&this.tree.setAutoCheckParent(a)},getAutoCheckParent:function(){return this.autoCheckParent},setCheckOpposite:function(a){this.checkOpposite=a,this.tree&&this.tree.setCheckOpposite(a)},setExpandOnLoad:function(a){this.expandOnLoad=a,this.tree&&this.tree.setExpandOnLoad(a)},getExpandOnLoad:function(){return this.expandOnLoad},setValueFromSelect:function(a){this.valueFromSelect=a},getValueFromSelect:function(){return this.valueFromSelect},setDataField:function(a){this.tree&&this.tree.setDataField(a),this.dataField=a},setQueryField:function(a){this.tree.queryfield=a},getAttrs:function(a){var b=mini.TreeSelect.superclass.getAttrs.call(this,a);if(mini._ParseString(a,b,["url","data","textField","valueField","nodesField","parentField","onnodecheck","onbeforenodecheck","onbeforenodeselect","expandOnLoad","onnodeclick","onbeforeload","onload","onloaderror","ondrawnode","queryField"]),mini._ParseBool(a,b,["multiSelect","resultAsTree","checkRecursive","showTreeIcon","showTreeLines","showFolderCheckBox","autoCheckParent","showQueryToolBar","ignoreValueFilter","valueFromSelect","checkOpposite"]),b.expandOnLoad){var c=parseInt(b.expandOnLoad);mini.isNumber(c)?b.expandOnLoad=c:b.expandOnLoad="true"==b.expandOnLoad?!0:!1}return b}}),mini.regClass(mini.TreeSelect,"TreeSelect"),mini.Window=function(){mini.Window.superclass.constructor.call(this),this.addCls("mini-window"),this.setVisible(!1),this.setAllowDrag(this.allowDrag),this.setAllowResize(this.allowResize)},mini.extend(mini.Window,mini.Panel,{x:0,y:0,state:"restore",_dragCls:"mini-window-drag",_resizeCls:"mini-window-resize",allowDrag:!0,showCloseButton:!0,showMaxButton:!1,showMinButton:!1,showCollapseButton:!1,effect:"none",showModal:!0,minWidth:150,minHeight:80,maxWidth:2e3,maxHeight:2e3,uiCls:"mini-window",_create:function(){mini.Window.superclass._create.call(this)},_initButtons:function(){this.buttons=[];var a=this.createButton({name:"close",cls:"mini-tools-close",visible:this.showCloseButton});this.buttons.push(a);var b=this.createButton({name:"max",cls:"mini-tools-max",visible:this.showMaxButton});this.buttons.push(b);var c=this.createButton({name:"min",cls:"mini-tools-min",visible:this.showMinButton});this.buttons.push(c);var d=this.createButton({name:"collapse",cls:"mini-tools-collapse",visible:this.showCollapseButton});this.buttons.push(d)},_initEvents:function(){mini.Window.superclass._initEvents.call(this),mini._BindEvents(function(){mini.on(this.el,"mouseover",this.__OnMouseOver,this),
mini.on(window,"resize",this.__OnWindowResize,this),mini.on(this.el,"mousedown",this.__OnWindowMouseDown,this)},this),this.on("resize",this._onResize,this),this.on("move.resizer",this._onResizerMove,this)},_onResize:function(){this._doShim()},_onResizerMove:function(a){mini_useShims&&this._shimEl&&mini.setSize(this._shimEl,a.w,a.h)},_doShim:function(){function a(){this._shimEl.style.display="";var a=mini.getBox(this.el),b=this._shimEl.style;b.width=a.width+"px",b.height=a.height+"px",b.left=a.x+"px",b.top=a.y+"px";var c=mini.getStyle(this.el,"zIndex");isNaN(c)||(this._shimEl.style.zIndex=c-3)}if(mini_useShims){if(!this._shimEl){var b="<iframe frameborder='0' style='position: absolute; z-index: -1; width: 0; height: 0; top: 0;left:0;scrolling:no;'></iframe>";this._shimEl=mini.append(document.body,b)}this._shimEl.style.display="none",this._doShimTimer&&(clearTimeout(this._doShimTimer),this._doShimTimer=null);var c=this;this._doShimTimer=setTimeout(function(){c._doShimTimer=null,a.call(c)},20)}},doLayout:function(){if(this.canLayout()){if("max"==this.state){var a=this.getParentBox();this.el.style.left="0px",this.el.style.top="0px",mini.setSize(this.el,a.width,a.height)}mini.Window.superclass.doLayout.call(this),this.allowDrag&&mini.addClass(this.el,this._dragCls),"max"==this.state&&(this._resizeGridEl.style.display="none",mini.removeClass(this.el,this._dragCls)),this._doModal()}},_doModal:function(){var a=this.showModal&&this.isDisplay()&&this.visible;if(this._modalEl||0!=this.showModal)if(this._modalEl||(this._modalEl=mini.append(document.body,'<div class="mini-modal mini-fixed" style="display:none"></div>')),a){var b=this;b._modalEl&&(b._modalEl.style.display="block",b._modalEl.style.zIndex=mini.getStyle(b.el,"zIndex")-1)}else this._modalEl.style.display="none"},getParentBox:function(){var a=mini.getViewportBox(),b=this._containerEl||document.body;return b!=document.body&&(a=mini.getBox(b)),a},setShowModal:function(a){this.showModal=a},getShowModal:function(){return this.showModal},setMinWidth:function(a){isNaN(a)||(this.minWidth=a)},getMinWidth:function(){return this.minWidth},setMinHeight:function(a){isNaN(a)||(this.minHeight=a)},getMinHeight:function(){return this.minHeight},setMaxWidth:function(a){isNaN(a)||(this.maxWidth=a)},getMaxWidth:function(){return this.maxWidth},setMaxHeight:function(a){isNaN(a)||(this.maxHeight=a)},getMaxHeight:function(){return this.maxHeight},setAllowDrag:function(a){this.allowDrag=a,mini.removeClass(this.el,this._dragCls),a&&mini.addClass(this.el,this._dragCls)},getAllowDrag:function(){return this.allowDrag},setShowMaxButton:function(a){this.showMaxButton=a;var b=this.getButton("max");b.visible=a,this._doTools()},getShowMaxButton:function(){return this.showMaxButton},setShowMinButton:function(a){this.showMinButton=a;var b=this.getButton("min");b.visible=a,this._doTools()},getShowMinButton:function(){return this.showMinButton},max:function(){this.state="max",this.show();var a=this.getButton("max");a&&(a.cls="mini-tools-restore",this._doTools())},restore:function(){this.state="restore",this.show(this.x,this.y);var a=this.getButton("max");a&&(a.cls="mini-tools-max",this._doTools())},containerEl:null,showAtPos:function(a,b,c){this.show(a,b,c)},show:function(a,b,c){this._allowLayout=!1;var d=this._containerEl||document.body;if(this.isRender()&&this.el.parentNode==d||this.render(d),this.el.style.zIndex=mini.getMaxZIndex(),this._doShow(a,b),this._allowLayout=!0,"none"==this.effect||"fast"!=this.effect&&"slow"!=this.effect)this.setVisible(!0);else{this.visible=!0;var e=this;e.doLayout(),this.el.style.display="none",$(this.el).fadeTo(this.effect,1,function(){isIE&&this.style.removeAttribute("filter")})}try{this.el.focus()}catch(f){}},hide:function(){this.fire("beforehide"),this.state="restore",delete this._width,delete this._height;var a=this;"none"==this.effect||"fast"!=this.effect&&"slow"!=this.effect?this.setVisible(!1):$(this.el).fadeTo(this.effect,0,function(){isIE&&this.style.removeAttribute("filter"),a.setVisible(!1)}),this._doModal()},getWidth:function(){this._headerEl.style.width="50px";var a=mini.getWidth(this.el);return this._headerEl.style.width="auto",a},getBox:function(){this._headerEl.style.width="50px",this.el.style.display="";var a=mini.getWidth(this.el);this._headerEl.style.width="auto";var b=mini.getBox(this.el);return b.width=a,b.right=b.x+a,b},_measureSize:function(){var a=this.getBox();a.width>this.maxWidth&&(mini.setWidth(this.el,this.maxWidth),a=this.getBox()),a.height>this.maxHeight&&(mini.setHeight(this.el,this.maxHeight),a=this.getBox()),a.width<this.minWidth&&(mini.setWidth(this.el,this.minWidth),a=this.getBox()),a.height<this.minHeight&&(mini.setHeight(this.el,this.minHeight),a=this.getBox())},setWidth:function(a){this.state="restore",delete this._width,mini.Window.superclass.setWidth.call(this,a)},setHeight:function(a){this.state="restore",delete this._height,mini.Window.superclass.setHeight.call(this,a)},_doShow:function(a,b){var c=this.getParentBox();if("max"==this.state){if(!this._width){var d=this.getBox();this._width=d.width,this._height=d.height,this.x=d.x,this.y=d.y}}else{mini.isNull(a)&&(a="center"),mini.isNull(b)&&(b="middle"),this.el.style.position="absolute",this.el.style.left="-2000px",this.el.style.top="-2000px",this.el.style.display="",this._width?(this.setWidth(this._width),this.setHeight(this._height)):(this.setWidth(this.width),this.setHeight(this.height)),this._measureSize();var d=this.getBox();"left"==a&&(a=0),"center"==a&&(a=c.width/2-d.width/2),"right"==a&&(a=c.width-d.width),"top"==b&&(b=0),"middle"==b&&(b=c.y+c.height/2-d.height/2),"bottom"==b&&(b=c.height-d.height),a+d.width>c.right&&(a=c.right-d.width),b+d.height>c.bottom&&(b=c.bottom-d.height),0>a&&(a=0),0>b&&(b=0),this.el.style.display="",mini.setX(this.el,a),mini.setY(this.el,b),this.el.style.left=a+"px",this.el.style.top=b+"px",this.x=d.x,this.y=d.y}this.doLayout(),this._doShim()},_OnButtonClick:function(a,b){var c=mini.Window.superclass._OnButtonClick.call(this,a,b);return 1==c.cancel?c:("max"==c.name&&("max"==this.state?this.restore():this.max()),c)},__OnWindowResize:function(a){"max"==this.state&&this.doLayout()},__OnWindowMouseDown:function(a){var b=this;if("max"!=this.state&&this.allowDrag&&mini.isAncestor(this._headerEl,a.target)&&!mini.findParent(a.target,"mini-tools")){var b=this;this.el&&(this.el.style.zIndex=mini.getMaxZIndex());var c=this.getBox(),d=new mini.Drag({capture:!0,onStart:function(){b._maskProxy=mini.append(document.body,'<div class="mini-resizer-mask"></div>'),b._dragProxy=mini.append(document.body,'<div class="mini-drag-proxy"></div>'),b.el.style.display="none"},onMove:function(a){var d=a.now[0]-a.init[0],e=a.now[1]-a.init[1];d=c.x+d,e=c.y+e;var f=b.getParentBox(),g=d+c.width,h=e+c.height;g>f.width&&(d=f.width-c.width),h>f.height&&(e=f.height-c.height),0>d&&(d=0),0>e&&(e=0),b.x=d,b.y=e;var i={x:d,y:e,width:c.width,height:c.height};if(mini.setBox(b._dragProxy,i),this.moved=!0,b._shimEl){mini.setXY(b._shimEl,i.x,i.y);var j=mini.getStyle(b.el,"zIndex");isNaN(j)||(b._dragProxy.style.zIndex=j)}},onStop:function(){if(b.el.style.display="block",this.moved){var a=mini.getBox(b._dragProxy);mini.setXY(b.el,a.x,a.y)}jQuery(b._maskProxy).remove(),b._maskProxy=null,jQuery(b._dragProxy).remove(),b._dragProxy=null,b._doShim()}});d.start(a)}},destroy:function(a){this._shimEl&&(jQuery(this._shimEl).remove(),this._shimEl=null),this._doShimTimer&&(clearTimeout(this._doShimTimer),this._doShimTimer=null),this.un("resize",this._onResize,this),this.un("move.resizer",this._onResizerMove,this),mini.un(window,"resize",this.__OnWindowResize,this),delete this.buttons,this._modalEl&&(jQuery(this._modalEl).remove(),this._modalEl=null),this.shadowEl&&(jQuery(this.shadowEl).remove(),this.shadowEl=null),mini.Window.superclass.destroy.call(this,a)},getAttrs:function(a){var b=mini.Window.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["modalStyle","effect","onbeforehide"]),mini._ParseBool(a,b,["showModal","showShadow","allowDrag","allowResize","showMaxButton","showMinButton"]),mini._ParseInt(a,b,["minWidth","minHeight","maxWidth","maxHeight"]),b},showAtEl:function(a,b){if(a=mini.byId(a)){this.isRender()&&this.el.parentNode==document.body||this.render(document.body);var c={xAlign:this.xAlign,yAlign:this.yAlign,xOffset:0,yOffset:0,popupCls:this.popupCls};mini.copyTo(c,b),this._popupEl=a,this.el.style.position="absolute",this.el.style.left="-2000px",this.el.style.top="-2000px",this.el.style.display="",this.doLayout(),this._measureSize();var d=mini.getViewportBox(),e=this.getBox(),f=mini.getBox(a),g=c.xy,h=(c.xAlign,c.yAlign,d.width/2-e.width/2),i=0;switch(g&&(h=g[0],i=g[1]),c.xAlign){case"outleft":h=f.x-e.width;break;case"left":h=f.x;break;case"center":h=f.x+f.width/2-e.width/2;break;case"right":h=f.right-e.width;break;case"outright":h=f.right}switch(c.yAlign){case"above":i=f.y-e.height;break;case"top":i=f.y;break;case"middle":i=f.y+f.height/2-e.height/2;break;case"bottom":i=f.bottom-e.height;break;case"below":i=f.bottom}if(h=parseInt(h),i=parseInt(i),c.outYAlign||c.outXAlign){if("above"==c.outYAlign&&i+e.height>d.bottom){var j=f.y-d.y,k=d.bottom-f.bottom;j>k&&(i=f.y-e.height)}if("outleft"==c.outXAlign&&h+e.width>d.right){var l=f.x-d.x,m=d.right-f.right;l>m&&(h=f.x-e.width)}"right"==c.outXAlign&&h+e.width>d.right&&(h=f.right-e.width),this._Show(h,i)}else this.showAtPos(h+c.xOffset,i+c.yOffset)}}}),mini.regClass(mini.Window,"window"),mini.OutlookTree=function(){mini.OutlookTree.superclass.constructor.call(this),this.data=[]},mini.extend(mini.OutlookTree,mini.OutlookBar,{url:"",textField:"text",iconField:"iconCls",urlField:"url",resultAsTree:!1,nodesField:"children",idField:"id",parentField:"pid",style:"width:100%;height:100%;",set:function(a){if("string"==typeof a)return this;var b=a.url;delete a.url;var c=a.activeIndex;return delete a.activeIndex,mini.OutlookTree.superclass.set.call(this,a),b&&this.setUrl(b),mini.isNumber(c)&&this.setActiveIndex(c),this},uiCls:"mini-outlooktree",destroy:function(a){if(this._trees){for(var b=this._trees.clone(),c=0,d=b.length;d>c;c++){var e=b[c];e.destroy()}this._trees.length=0}mini.OutlookTree.superclass.destroy.call(this,a)},_doParseFields:function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];d.text=d[this.textField],d.url=d[this.urlField],d.iconCls=d[this.iconField]}},_doLoad:function(){var a=[];try{a=mini.getData(this.url)}catch(b){1==mini_debugger&&alert("outlooktree json is error.")}this.dataField&&(a=mini._getMap(this.dataField,a)),a||(a=[]),0==this.resultAsTree&&(a=mini.arrayToTree(a,this.nodesField,this.idField,this.parentField));var c=mini.treeToArray(a,this.nodesField,this.idField,this.parentField);this._doParseFields(c),this.createNavBarTree(a),this.fire("load")},loadList:function(a,b,c){b=b||this.idField,c=c||this.parentField,this._doParseFields(a);var d=mini.arrayToTree(a,this.nodesField,b,c);this.load(d)},load:function(a){if("undefined"==typeof a)this.setUrl(this.url);else if("string"==typeof a)this.setUrl(a);else{var b;0==this.resultAsTree&&(b=mini.arrayToTree(a,this.nodesField,this.idField,this.parentField));var c=mini.treeToArray(b,this.nodesField,this.idField,this.parentField);this._doParseFields(c),this.createNavBarTree(b)}},setData:function(a){this.load(a)},setUrl:function(a){this.url=this.parseUrl(a),this._doLoad()},getUrl:function(){return this.url},setTextField:function(a){this.textField=a},getTextField:function(){return this.textField},setIconField:function(a){this.iconField=a},getIconField:function(){return this.iconField},setUrlField:function(a){this.urlField=a},getUrlField:function(){return this.urlField},setResultAsTree:function(a){this.resultAsTree=a},getResultAsTree:function(){return this.resultAsTree},setNodesField:function(a){this.nodesField=a},getNodesField:function(){return this.nodesField},setIdField:function(a){this.idField=a},getIdField:function(){return this.idField},setParentField:function(a){this.parentField=a},getParentField:function(){return this.parentField},_selected:null,getSelected:function(){return this._selected},selectNode:function(a){if(a=this.getNode(a)){var b=this._getOwnerTree(a);b.selectNode(a)}},expandPath:function(a){if(a=this.getNode(a)){var b=this._getOwnerTree(a);b.expandPath(a),this.expandGroup(b._ownerGroup)}},findNodes:function(a,b){var c=[];b=b||this;for(var d=0,e=this._trees.length;e>d;d++){var f=this._trees[d],g=f.findNodes(a,b);c.addRange(g)}return c},getNode:function(a){for(var b=0,c=this._trees.length;c>b;b++){var d=this._trees[b],e=d.getNode(a);if(e)return e}return null},getList:function(){for(var a=[],b=0,c=this._trees.length;c>b;b++){var d=this._trees[b],e=d.getList();a.addRange(e)}return a},_getOwnerTree:function(a){if(a)for(var b=0,c=this._trees.length;c>b;b++){var d=this._trees[b];if(d._idNodes[a._id])return d}},expandOnLoad:!1,setExpandOnLoad:function(a){this.expandOnLoad=a},getExpandOnLoad:function(){return this.expandOnLoad},getAttrs:function(a){var b=mini.OutlookTree.superclass.getAttrs.call(this,a);if(b.text=a.innerHTML,mini._ParseString(a,b,["url","textField","urlField","idField","parentField","nodesField","iconField","onnodeclick","onnodeselect","onnodemousedown","expandOnLoad"]),mini._ParseBool(a,b,["resultAsTree"]),b.expandOnLoad){var c=parseInt(b.expandOnLoad);mini.isNumber(c)?b.expandOnLoad=c:b.expandOnLoad="true"==b.expandOnLoad?!0:!1}return b},autoCollapse:!0,activeIndex:0,createNavBarTree:function(a){mini.isArray(a)||(a=[]),this.data=a;for(var b=[],c=0,d=this.data.length;d>c;c++){var e=this.data[c],f={};f.title=e.text,f.iconCls=e.iconCls,b.push(f),f._children=e[this.nodesField]}this.setGroups(b),this.getExpandOnLoad()&&this.setActiveIndex(this.activeIndex),this._trees=[];for(var c=0,d=this.groups.length;d>c;c++){var f=this.groups[c],g=this.getGroupBodyEl(f),a=new mini.Tree;a.set({expandOnLoad:this.expandOnLoad,showTreeIcon:!0,style:"width:100%;height:100%;border:0;background:none",data:f._children}),a.render(g),a.on("nodeclick",this.__OnNodeClick,this),a.on("nodeselect",this.__OnNodeSelect,this),a.on("nodemousedown",this.__OnNodeMouseDown,this),this._trees.push(a),delete f._children,a._ownerGroup=f}this.doLayout()},__OnNodeMouseDown:function(a){var b={node:a.node,isLeaf:a.sender.isLeaf(a.node),htmlEvent:a.htmlEvent};this.fire("nodemousedown",b)},__OnNodeClick:function(a){var b={node:a.node,isLeaf:a.sender.isLeaf(a.node),htmlEvent:a.htmlEvent};this.fire("nodeclick",b)},__OnNodeSelect:function(a){if(a.node){for(var b=0,c=this._trees.length;c>b;b++){var d=this._trees[b];d!=a.sender&&d.selectNode(null)}var e={node:a.node,isLeaf:a.sender.isLeaf(a.node),htmlEvent:a.htmlEvent};this._selected=a.node,this.fire("nodeselect",e)}}}),mini.regClass(mini.OutlookTree,"outlooktree"),mini.NavBarTree=function(){mini.NavBarTree.superclass.constructor.call(this)},mini.extend(mini.NavBarTree,mini.OutlookTree,{uiCls:"mini-navbartree"}),mini.regClass(mini.NavBarTree,"navbartree"),mini.Separator=function(){mini.Separator.superclass.constructor.call(this)},mini.extend(mini.Separator,mini.Control,{_clearBorder:!1,uiCls:"mini-separator",_create:function(){this.el=document.createElement("span"),this.el.className="mini-separator"}}),mini.regClass(mini.Separator,"separator"),mini.ToolTip=function(){mini.ToolTip.superclass.constructor.call(this)},mini.extend(mini.ToolTip,mini.Control,{selector:"[title]",placement:"bottom",trigger:"hover focus",uiCls:"mini-tooltip",_create:function(){this.el=jQuery('<div class="mini-tooltip"><div class="mini-tooltip-arrow"></div><div class="mini-tooltip-inner"></div></div>')[0],this.$element=jQuery(this.el),this.$element.appendTo(document.body)},_initEvents:function(){},_bindTooltip:function(){this.el.style.padding="";for(var a=jQuery(document),b=this.selector,c="tooltip",d=this.trigger.split(" "),e=d.length;e--;){var f=d[e];if("click"==f)a.delegate(b,"click."+c,$.proxy(this._toggle,this));else if("manual"!=f){var g="hover"==f?"mouseenter":"focus",h="hover"==f?"mouseleave":"blur";a.delegate(b,g+"."+c,$.proxy(this._enter,this)),a.delegate(b,h+"."+c,$.proxy(this._leave,this))}}},setSelector:function(a){this.selector=a,this._bindTooltip()},getSelector:function(){return this.selector},setPlacement:function(a){this.placement=a},getPlacement:function(){return this.placement},_enter:function(a){this.open(a.target)},_leave:function(a){this.close()},_toggle:function(a){"none"==this._getTip().css("display")?this.enter(a):this.leave(a)},open:function(a){var a=$(a)[0]||this.target,b=($(a),this.getContent(a)),c={element:a,content:b,cancel:!b};this.fire("beforeopen",c),c.cancel||(this.$element.show(),this._target=a,this.setContent(c.content),this.fire("open",{element:a}))},close:function(){this._target=null,this.$element.hide()},showLoading:function(){this.setContent('<div class="mini-tooltip-loading"></div>')},setContent:function(a){this.$element.children(".mini-tooltip-inner").html(a||"&nbsp;"),this.applyPlacement()},getContent:function(a){var b=a.title;return b&&$(a).attr("data-tooltip",b).attr("title",""),b||(b=$(a).attr("data-tooltip")),b},applyPlacement:function(){function a(a){f.removeClass("mini-tooltip-left mini-tooltip-top mini-tooltip-right mini-tooltip-bottom mini-tooltip-bottomleft mini-tooltip-topleft mini-tooltip-bottomright mini-tooltip-topright").addClass("mini-tooltip-"+a)}function b(a){f.offset(a)}if(this._target&&"none"!=this.$element.css("display")){var c=this._target,d=jQuery(c),e=d.attr("data-placement")||this.placement,f=this.$element;f.show().css({left:"-2000px",top:"-2000px"});var g=mini.getBox(c),h=mini.getViewportBox(),i=g.top-h.top,j=h.bottom-g.bottom;a(e);var k=mini.getBox(f[0]),l=mini.getCalculatedOffset(e,g,k.width,k.height);"left"==e||"right"==e||"top"==e||"bottom"==e||"bottomleft"==e&&i>j&&l.top+k.height>h.bottom&&(e="topleft"),a(e),l=mini.getCalculatedOffset(e,g,k.width,k.height),b(l)}},getAttrs:function(a){var b=mini.ToolTip.superclass.getAttrs.call(this,a);return mini._ParseString(a,b,["selector","placement","onbeforeopen","onopen","onclose"]),b}}),mini.regClass(mini.ToolTip,"tooltip"),mini._allComponents={},function(){var a,b,c,d;for(b in mini)a=mini[b],"function"==typeof a&&a.prototype.isControl&&(mini._allComponents[b]=[a]);for(b in mini._allComponents)if(a=mini._allComponents[b],a[0].superclass){c=a[0].superclass.constructor;for(d in mini._allComponents)mini._allComponents[d][0]==c&&mini._allComponents[d].push(b)}}(),mini.plugin=function(a,b){if(a&&b){var c;for(c in b)mini._plugin(a,c,b[c])}},mini._plugin=function(a,b,c){var d,e,f;if("string"==typeof a)d=mini._allComponents[a];else for(e in mini._allComponents)mini._allComponents[e][0]===a&&(d=mini._allComponents[e]);a=d[0];for(var g=1,h=d.length;h>g;g++)f=mini[d[g]],f&&f.prototype&&a.prototype[b]===f.prototype[b]&&mini._plugin(d[g],b,c);a.prototype[b]=c},mini.plugin(mini.TreeSelect,{showQueryToolBar:!1,_createQueryToolBar:function(){this.showQueryToolBar&&!this.queryToolbar&&(this.queryToolbar=new mini.ToolBar,this.queryToolbar.render(this.popup._contentEl,"prepend"),this.queryInput=new mini.TextBox,this.queryInput.setEmptyText("\u8bf7\u5f55\u5165\u67e5\u8be2\u6761\u4ef6"),this.queryInput.setWidth(50),this.queryInput.render(this.queryToolbar.el),this.queryInput.on("enter",this._queryEvent,this),this.queryButton=new mini.Button,this.queryButton.setText("\u67e5\u8be2"),this.queryButton.setPlain(!0),this.queryButton.setStyle("margin-left:2px;"),this.queryButton.render(this.queryToolbar.el),this.queryButton.onClick(this._queryEvent,this),this.on("showpopup",function(){var a=this.queryToolbar.getWidth();this.queryInput.setWidth(a-58)}))},_destroyQueryToolBar:function(a){this.queryInput&&(mini.clearEvent(this.queryInput),this.queryInput.destroy(a),this.queryInput=null),this.queryButton&&(mini.clearEvent(this.queryButton),this.queryButton.destroy(a),this.queryButton=null),this.queryToolbar&&(mini.clearEvent(this.queryToolbar),this.queryToolbar.destroy(a),this.queryToolbar=null)},_queryEvent:function(a){var b=this.queryInput.getValue();this.queryValue=b;if(b){b=b.trim();var c=null,d=this.ignoreValueFilter;this.tree.filter(function(a){var e=mini._getMap(this.queryfield,a);return(null==e||void 0==e)&&(e=""),e=String(e).toLowerCase(),-1!=a[this.textField].toLowerCase().indexOf(b.toLowerCase())||!d&&-1!=a[this.idField].toLowerCase().indexOf(b.toLowerCase())||-1!=e.indexOf(b.toLowerCase())?(c&&a[this.parentField]!=c[this.idField]||(c=a),!0):void 0}),c&&this.tree.expandPath(c)}else this.tree.clearFilter()},setShowQueryToolBar:function(a){this.showQueryToolBar=a,this.queryToolbar&&(a?this.queryToolbar.el.style.display="":this.queryToolbar.el.style.display="none")},getShowQueryToolBar:function(){return this.showQueryToolBar},doUpdate:function(){mini.TreeSelect.superclass.doUpdate.call(this),this._createQueryToolBar()}}),mini.locale="en-US",mini.dateInfo={monthsLong:["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"],monthsShort:["1\u6708","2\u6708","3\u6708","4\u6708","5\u6708","6\u6708","7\u6708","8\u6708","9\u6708","10\u6708","11\u6708","12\u6708"],daysLong:["\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"],daysShort:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],quarterLong:["\u4e00\u5b63\u5ea6","\u4e8c\u5b63\u5ea6","\u4e09\u5b63\u5ea6","\u56db\u5b63\u5ea6"],quarterShort:["Q1","Q2","Q2","Q4"],halfYearLong:["\u4e0a\u534a\u5e74","\u4e0b\u534a\u5e74"],patterns:{d:"yyyy-M-d",D:"yyyy\u5e74M\u6708d\u65e5",f:"yyyy\u5e74M\u6708d\u65e5 H:mm",F:"yyyy\u5e74M\u6708d\u65e5 H:mm:ss",g:"yyyy-M-d H:mm",G:"yyyy-M-d H:mm:ss",m:"MMMd\u65e5",o:"yyyy-MM-ddTHH:mm:ss.fff",s:"yyyy-MM-ddTHH:mm:ss",t:"H:mm",T:"H:mm:ss",U:"yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",y:"yyyy\u5e74MM\u6708"},tt:{AM:"\u4e0a\u5348",PM:"\u4e0b\u5348"},ten:{Early:"\u4e0a\u65ec",Mid:"\u4e2d\u65ec",Late:"\u4e0b\u65ec"},today:"\u4eca\u5929",clockType:24},mini.Calendar&&mini.copyTo(mini.Calendar.prototype,{firstDayOfWeek:0,todayText:"\u4eca\u5929",clearText:"\u6e05\u9664",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",daysShort:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],format:"yyyy\u5e74MM\u6708",timeFormat:"H:mm"});for(var id in mini){var clazz=mini[id];clazz&&clazz.prototype&&clazz.prototype.isControl&&(clazz.prototype.requiredErrorText="\u4e0d\u80fd\u4e3a\u7a7a")}if(mini.TextBox){var vtypeErrorTexts={emailErrorText:"\u8bf7\u8f93\u5165\u90ae\u4ef6\u683c\u5f0f",urlErrorText:"\u8bf7\u8f93\u5165URL\u683c\u5f0f",floatErrorText:"\u8bf7\u8f93\u5165\u6570\u5b57",intErrorText:"\u8bf7\u8f93\u5165\u6574\u6570",dateErrorText:"\u8bf7\u8f93\u5165\u65e5\u671f\u683c\u5f0f {0}",maxLengthErrorText:"\u4e0d\u80fd\u8d85\u8fc7 {0} \u4e2a\u5b57\u7b26",minLengthErrorText:"\u4e0d\u80fd\u5c11\u4e8e {0} \u4e2a\u5b57\u7b26",maxErrorText:"\u6570\u5b57\u4e0d\u80fd\u5927\u4e8e {0} ",minErrorText:"\u6570\u5b57\u4e0d\u80fd\u5c0f\u4e8e {0} ",rangeLengthErrorText:"\u5b57\u7b26\u957f\u5ea6\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",rangeCharErrorText:"\u5b57\u7b26\u6570\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",rangeErrorText:"\u6570\u5b57\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",rangeDecimalsErrorText:"\u8bf7\u4fdd\u7559\u5c0f\u6570\u70b9\u540e {0} \u4f4d\u5c0f\u6570."};mini.copyTo(mini.TextBox.prototype,vtypeErrorTexts),mini.copyTo(mini.Password.prototype,vtypeErrorTexts),mini.copyTo(mini.TextArea.prototype,vtypeErrorTexts)}mini.Pager&&mini.copyTo(mini.Pager.prototype,{firstText:"\u9996\u9875",prevText:"\u4e0a\u4e00\u9875",nextText:"\u4e0b\u4e00\u9875",lastText:"\u5c3e\u9875",pageInfoText:"\u6bcf\u9875 {0} \u6761, \u5171 {1} \u6761"}),mini.DataGrid&&mini.copyTo(mini.DataGrid.prototype,{emptyText:"\u6ca1\u6709\u8fd4\u56de\u7684\u6570\u636e"}),window.mini.Gantt&&(mini.GanttView.ShortWeeks=["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],mini.GanttView.LongWeeks=["\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94","\u661f\u671f\u516d"],mini.Gantt.PredecessorLinkType=[{ID:0,Name:"\u5b8c\u6210-\u5b8c\u6210(FF)",Short:"FF"},{ID:1,Name:"\u5b8c\u6210-\u5f00\u59cb(FS)",Short:"FS"},{ID:2,Name:"\u5f00\u59cb-\u5b8c\u6210(SF)",Short:"SF"},{ID:3,Name:"\u5f00\u59cb-\u5f00\u59cb(SS)",Short:"SS"}],mini.Gantt.ConstraintType=[{ID:0,Name:"\u8d8a\u65e9\u8d8a\u597d"},{ID:1,Name:"\u8d8a\u665a\u8d8a\u597d"},{ID:2,Name:"\u5fc5\u987b\u5f00\u59cb\u4e8e"},{ID:3,Name:"\u5fc5\u987b\u5b8c\u6210\u4e8e"},{ID:4,Name:"\u4e0d\u5f97\u65e9\u4e8e...\u5f00\u59cb"},{ID:5,Name:"\u4e0d\u5f97\u665a\u4e8e...\u5f00\u59cb"},{ID:6,Name:"\u4e0d\u5f97\u65e9\u4e8e...\u5b8c\u6210"},{ID:7,Name:"\u4e0d\u5f97\u665a\u4e8e...\u5b8c\u6210"}],mini.copyTo(mini.Gantt,{ID_Text:"\u6807\u8bc6\u53f7",Name_Text:"\u4efb\u52a1\u540d\u79f0",PercentComplete_Text:"\u8fdb\u5ea6",Duration_Text:"\u5de5\u671f",Start_Text:"\u5f00\u59cb\u65e5\u671f",Finish_Text:"\u5b8c\u6210\u65e5\u671f",Critical_Text:"\u5173\u952e\u4efb\u52a1",PredecessorLink_Text:"\u524d\u7f6e\u4efb\u52a1",Work_Text:"\u5de5\u65f6",Priority_Text:"\u91cd\u8981\u7ea7\u522b",Weight_Text:"\u6743\u91cd",OutlineNumber_Text:"\u5927\u7eb2\u5b57\u6bb5",OutlineLevel_Text:"\u4efb\u52a1\u5c42\u7ea7",ActualStart_Text:"\u5b9e\u9645\u5f00\u59cb\u65e5\u671f",ActualFinish_Text:"\u5b9e\u9645\u5b8c\u6210\u65e5\u671f",WBS_Text:"WBS",ConstraintType_Text:"\u9650\u5236\u7c7b\u578b",ConstraintDate_Text:"\u9650\u5236\u65e5\u671f",Department_Text:"\u90e8\u95e8",Principal_Text:"\u8d1f\u8d23\u4eba",Assignments_Text:"\u8d44\u6e90\u540d\u79f0",Summary_Text:"\u6458\u8981\u4efb\u52a1",Task_Text:"\u4efb\u52a1",Baseline_Text:"\u6bd4\u8f83\u57fa\u51c6",LinkType_Text:"\u94fe\u63a5\u7c7b\u578b",LinkLag_Text:"\u5ef6\u9694\u65f6\u95f4",From_Text:"\u4ece",To_Text:"\u5230",Goto_Text:"\u8f6c\u5230\u4efb\u52a1",UpGrade_Text:"\u5347\u7ea7",DownGrade_Text:"\u964d\u7ea7",Add_Text:"\u65b0\u589e",Edit_Text:"\u7f16\u8f91",Remove_Text:"\u5220\u9664",Move_Text:"\u79fb\u52a8",ZoomIn_Text:"\u653e\u5927",ZoomOut_Text:"\u7f29\u5c0f",Deselect_Text:"\u53d6\u6d88\u9009\u62e9",Split_Text:"\u62c6\u5206\u4efb\u52a1"})),"function"==typeof define&&define.amd&&define("miniui",["jquery"],function(){return mini});
/*
    json2.js
    2015-05-03

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse. This file is provides the ES5 JSON capability to ES3 systems.
    If a project might run on IE8 or earlier, then this file should be included.
    This file does nothing on ES5 systems.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10
                            ? '0' + n
                            : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date
                    ? 'Date(' + this[key] + ')'
                    : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? '0' + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate()) + 'T' +
                        f(this.getUTCHours()) + ':' +
                        f(this.getUTCMinutes()) + ':' +
                        f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? '"' + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"'
            : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                        ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                        : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ': '
                                    : ':'
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ': '
                                    : ':'
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                    ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                    : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, '@')
                        .replace(rx_three, ']')
                        .replace(rx_four, '')
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/21
 * Time：15:00
 *
 */

/**
 * modified by lizm 2016-11-30 11:08
 *
 * 从store方法名上区分了sessionStorage 和 localStorage，各自有各自的方法
 *
 * 增加了 has，getAll，each，serialize，deserialize 方法，
 *
 * 基于jquery.cookie 增加了操作cookie的方法 get，set，getAll，remove
 *
 **/

"use strict"
// Module export pattern from
// https://github.com/umdjs/umd/blob/master/returnExports.js
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.store = factory();
    }
}(this, function () {

    // Store.js
    var store = {},
        win = (typeof window != 'undefined' ? window : global),
        doc = win.document,
        localStorageName = 'localStorage',
        sessionStorageName = 'sessionStorage',
        scriptTag = 'script',
        storage,_storage;

    store.disabled = false;

    store.setLocal = function(key, value) {};
    store.getLocal = function(key, defaultVal) {};
    store.hasLocal = function(key) { return store.getLocal(key) !== undefined };
    store.removeLocal = function(key) {};
    store.clearLocal = function() {};

    store.getAllLocal = function() {};
    store.eachLocal = function() {};

    store.setSession = function(key, value) {};
    store.getSession = function(key, defaultVal) {};
    store.hasSession = function(key) { return store.getSession(key) !== undefined };
    store.removeSession = function(key) {};
    store.clearSession = function() {};

    store.getAllSession = function() {};
    store.eachSession = function() {};

    store.serialize = function(value) {
        return JSON.stringify(value)
    };
    store.deserialize = function(value) {
        if (typeof value != 'string') { return undefined }
        try { return JSON.parse(value) }
        catch(e) { return value || undefined }
    };

    // 获取cookie
    store.getCookie=function (name) {
        $.cookie.json = true;
        return $.cookie(name);
    };

    // 是否存在cookie
    store.hasCookie=function (name) {
        $.cookie.json = true;

        if ($.cookie(name)){
            return true
        }else{
            return false
        }
    };

    // 设置cookie
    store.setCookie = function (name, value, days, path) {
        $.cookie.json = true;

        if(days !==undefined && path!==undefined){
            $.cookie(name, value,{expires:days,path:path});

        }else if(days !==undefined && path===undefined){
            $.cookie(name, value,{expires:days});

        }else if(days ===undefined && path===undefined){
            $.cookie(name, value);
        }

    };

    // 获取所有cookie键值对
    store.getAllCookie = function () {
        return $.cookie();
    };

    // 删除cookie 必须传入与设置cookie时相同的参数,如 path, domain , secure
    store.removeCookie =function (name,path) {
        var result;
        if(path){
            result = $.removeCookie(name, { path: path });
        }else {
            result = $.removeCookie(name);
        }
        if(!result){console.log('删除cookie'+name+'失败')}
    };

    // Functions to encapsulate questionable FireFox 3.6.13 behavior
    // when about.config::dom.storage.enabled === false
    // See https://github.com/marcuswestin/store.js/issues#issue/13
    function isLocalStorageNameSupported() {
        try { return (localStorageName in win && win[localStorageName]) }
        catch(err) { return false }
    }

    function isSessionStorageNameSupported() {
        try { return (sessionStorageName in win && win[sessionStorageName]) }
        catch(err) { return false }
    }
    // sessionStorage API
    if(isSessionStorageNameSupported()){
        _storage = win[sessionStorageName];
        store.setSession = function(key, val) {
            if (val === undefined) { return store.removeSession(key) }
            _storage.setItem(key, store.serialize(val));
            return val
        };
        store.getSession = function(key, defaultVal) {
            var val = store.deserialize(_storage.getItem(key));
            return (val === undefined ? defaultVal : val)
        };
        store.removeSession = function(key) { _storage.removeItem(key) };
        store.clearSession = function() { _storage.clear() };
        store.getAllSession = function() {
            var ret = {};
            store.eachSession(function(key, val) {
                ret[key] = val
            });
            return ret
        };
        store.eachSession = function(callback) {
            for (var i=0; i<_storage.length; i++) {
                var key = _storage.key(i);
                callback(key, store.getSession(key))
            }
        }
    }
    // localStorage API
    if (isLocalStorageNameSupported()) {
        storage = win[localStorageName];
        store.setLocal = function(key, val) {
            if (val === undefined) { return store.removeLocal(key) }
            storage.setItem(key, store.serialize(val));
            return val
        };
        store.getLocal = function(key, defaultVal) {
            var val = store.deserialize(storage.getItem(key));
            return (val === undefined ? defaultVal : val)
        };
        store.removeLocal = function(key) { storage.removeItem(key) };
        store.clearLocal = function() { storage.clear() };
        store.getAllLocal = function() {
            var ret = {};
            store.eachLocal(function(key, val) {
                ret[key] = val
            });
            return ret
        };
        store.eachLocal = function(callback) {
            for (var i=0; i<storage.length; i++) {
                var key = storage.key(i);
                callback(key, store.getLocal(key))
            }
        }
    } else if (doc && doc.documentElement.addBehavior) {
        var storageOwner,
            storageContainer;
        // Since #userData storage applies only to specific paths, we need to
        // somehow link our data to a specific path.  We choose /favicon.ico
        // as a pretty safe option, since all browsers already make a request to
        // this URL anyway and being a 404 will not hurt us here.  We wrap an
        // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
        // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
        // since the iframe access rules appear to allow direct access and
        // manipulation of the document element, even for a 404 page.  This
        // document can be used instead of the current document (which would
        // have been limited to the current path) to perform #userData storage.
        try {
            storageContainer = new ActiveXObject('htmlfile');
            storageContainer.open();
            storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>');
            storageContainer.close();
            storageOwner = storageContainer.w.frames[0].document;
            storage = storageOwner.createElement('div')
        } catch(e) {
            // somehow ActiveXObject instantiation failed (perhaps some special
            // security settings or otherwse), fall back to per-path storage
            storage = doc.createElement('div');
            storageOwner = doc.body
        }
        var withIEStorage = function(storeFunction) {
            return function() {
                var args = Array.prototype.slice.call(arguments, 0);
                args.unshift(storage);
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storageOwner.appendChild(storage);
                storage.addBehavior('#default#userData');
                storage.load(localStorageName);
                var result = storeFunction.apply(store, args);
                storageOwner.removeChild(storage);
                return result
            }
        };

        // In IE7, keys cannot start with a digit or contain certain chars.
        // See https://github.com/marcuswestin/store.js/issues/40
        // See https://github.com/marcuswestin/store.js/issues/83
        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
        var ieKeyFix = function(key) {
            return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
        };
        store.setLocal = withIEStorage(function(storage, key, val) {
            key = ieKeyFix(key);
            if (val === undefined) { return store.remove(key) }
            storage.setAttribute(key, store.serialize(val));
            storage.save(localStorageName);
            return val
        });
        store.getLocal = withIEStorage(function(storage, key, defaultVal) {
            key = ieKeyFix(key);
            var val = store.deserialize(storage.getAttribute(key));
            return (val === undefined ? defaultVal : val)
        });
        store.removeLocal = withIEStorage(function(storage, key) {
            key = ieKeyFix(key);
            storage.removeAttribute(key);
            storage.save(localStorageName)
        });
        store.clearLocal = withIEStorage(function(storage) {
            var attributes = storage.XMLDocument.documentElement.attributes;
            storage.load(localStorageName);
            for (var i=attributes.length-1; i>=0; i--) {
                storage.removeAttribute(attributes[i].name)
            }
            storage.save(localStorageName)
        });
        store.getAllLocal = function(storage) {
            var ret = {};
            store.eachLocal(function(key, val) {
                ret[key] = val
            });
            return ret
        };
        store.eachLocal = withIEStorage(function(storage, callback) {
            var attributes = storage.XMLDocument.documentElement.attributes;
            for (var i=0, attr; attr=attributes[i]; ++i) {
                callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
            }
        })
    }

    try {
        var testKey = '__storejs__';
        store.set(testKey, testKey);
        if (store.get(testKey) != testKey) { store.disabled = true }
        store.remove(testKey)
    } catch(e) {
        store.disabled = true
    }
    store.enabled = !store.disabled;

    return store
}));
/*!
 * [description]
 * Function:Tools.js工具类
 * author:zhouqiyuan
 * Released under the MIT license
 *
 * Date: 2016-11-25
 */
(function (win) {
    var _extend, _isObject;

    _isObject = function (o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }

    _extend = function self(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {
                // 若destination[property]和sourc[property]都是对象，则递归
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                }
                ;
                // 若sourc[property]已存在，则跳过
                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    }

    // creact Tools Object
    function Tools() {
    }

    Tools.prototype = {
        constructor: Tools,
        /**
         * @description  简单的浏览器检查结果。
         *
         * * `webkit`  webkit版本号，如果浏览器为非webkit内核，此属性为`undefined`。
         * * `chrome`  chrome浏览器版本号，如果浏览器为chrome，此属性为`undefined`。
         * * `ie`  ie浏览器版本号，如果浏览器为非ie，此属性为`undefined`。**暂不支持ie10+**
         * * `firefox`  firefox浏览器版本号，如果浏览器为非firefox，此属性为`undefined`。
         * * `safari`  safari浏览器版本号，如果浏览器为非safari，此属性为`undefined`。
         * * `opera`  opera浏览器版本号，如果浏览器为非opera，此属性为`undefined`。
         *
         * @property {Object} [browser]
         */
        browser: (function (ua) {
            var ret = {},
                webkit = ua.match(/WebKit\/([\d.]+)/),
                chrome = ua.match(/Chrome\/([\d.]+)/) ||
                    ua.match(/CriOS\/([\d.]+)/),

                ie = ua.match(/MSIE\s([\d\.]+)/) ||
                    ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
                firefox = ua.match(/Firefox\/([\d.]+)/),
                safari = ua.match(/Safari\/([\d.]+)/),
                opera = ua.match(/OPR\/([\d.]+)/);

            webkit && (ret.webkit = parseFloat(webkit[1]));
            chrome && (ret.chrome = parseFloat(chrome[1]));
            ie && (ret.ie = parseFloat(ie[1]));
            firefox && (ret.firefox = parseFloat(firefox[1]));
            safari && (ret.safari = parseFloat(safari[1]));
            opera && (ret.opera = parseFloat(opera[1]));

            return ret;
        })(navigator.userAgent),

        /**
         * @description  操作系统检查结果。
         *
         * * `android`  如果在android浏览器环境下，此值为对应的android版本号，否则为`undefined`。
         * * `ios` 如果在ios浏览器环境下，此值为对应的ios版本号，否则为`undefined`。
         * @property {Object} [os]
         */
        os: (function (ua) {
            var ret = {},

                // osx = !!ua.match( /\(Macintosh\; Intel / ),
                android = ua.match(/(?:Android);?[\s\/]+([\d.]+)?/),
                ios = ua.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);

            // osx && (ret.osx = true);
            android && (ret.android = parseFloat(android[1]));
            ios && (ret.ios = parseFloat(ios[1].replace(/_/g, '.')));

            return ret;
        })(navigator.userAgent),

        /**
         * [isSupportTransition description]
         * 是否支持css3 transition动画属性
         * @return {Boolean} [description]
         */
        isSupportTransition: function () {
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
            s = null;
            return r;
        },

        isIE: function () {
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                return true
            } else {
                return false;
            }
        },

        // 检测是否已经安装flash，检测flash的版本
        flashVersion: function () {
            var version;
            try {
                version = navigator.plugins['Shockwave Flash'];
                version = version.description;
            } catch (ex) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                        .GetVariable('$version');
                } catch (ex2) {
                    version = '0.0';
                }
            }
            version = version.match(/\d+/g);
            return parseFloat(version[0] + '.' + version[1], 10);
        },

        /**
         * [isSupportBase64 description]
         * @return {Boolean} 判断浏览器是否支持图片base64
         */
        isSupportBase64: function () {
            var data = new Image();
            var support = true;
            data.onload = data.onerror = function () {
                if (this.width != 1 || this.height != 1) {
                    support = false;
                }
            }
            data.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            return support;
        },
        /**
         * [trim description]去除前后空格
         * @param  {[type]} str
         * @return {[string]}
         */
        trim: function (str) {
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        /**
         * [extend description]扩张对象方法
         * @return {[Object]} [description]
         */
        extend: function () {
            var arr = arguments,
                result = {},
                i;
            if (!arr.length) return {};
            for (i = arr.length - 1; i >= 0; i--) {
                if (_isObject(arr[i])) {
                    _extend(arr[i], result);
                }
            }
            arr[0] = result;
            return result;
        },
        /**
         * url通过名字获取参数
         * @param attrName
         * @returns {*}
         */
        getUrlParamByName: function (attrName) {
            var locs = location.href.split("?");
            if (locs.length == 1) {
                return null;
            }
            var params = locs[1].split("&");
            var value = null;
            for(var i=0;i<params.length;i++){
                var param = params[i].split("=");
                if (param[0] == attrName) {
                    value = param[1];
                    break;
                }
            }

            return value;
        }
    };

    // Expose Tools identifiers, even in AMD
    // and CommonJS for browser emulators
    if (typeof define === "function") {
        define("Tools", [], function () {
            return new Tools();
        });
    } else {
        window.Tools = new Tools();
        return Tools;
    }
})(window);

/**
 *@Name：Validator
 *@description:js校验通用类
 *@author：zhouqy
 *@create：2017-01-12
 */
! function(win) {
  var defaults = {
    messages: {
      required: '%s 不能为空'
    },
    callback: function(errors) {

    }
  };
  /*
   * Define the regular expressions
   */
  var numericReg = /^[0-9]+$/, //正整数
    integerReg = /^\-?[0-9]+$/, //整型（负整数和正整数）
    decimalReg = /^\-?[0-9]*\.?[0-9]+$/, //浮点型(整数和小数)
    userNameReg = /^[a-zA-Z0-9]{8,16}$/, //8到16位 数字、字母或字母数字组合
    nsrsbhReg = /^[a-zA-Z0-9\-]{15,20}$/, //15位到20位数字或字母（纳税人识别号）
    yzbm = /^[0-9]{6}$/, //邮政编码
    zjhm = /^([0-9A-Za-z]|[-]){0,20}$/,
    organizationCodeReg = /^[A-Z0-9]{9}$/, //组织机构代码（必须为9位数字字母，字母为半角大写）
    moneyReg = /^(([-]?[0-9]{1,14}[.]{1}[0-9]{1,2})$|([-]?[0-9]{1,14})$)/, //最大14位整数，最多两位小数金额
    emailReg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, //邮箱
    alphaReg = /^[a-z]+$/i, //字母
    alphaNumericReg = /^[a-z0-9]+$/i, //字母、数字或者数字字母组合
    alphaDashReg = /^[a-z0-9_\-]+$/i, //可以含有下划线的字母、数字或者数字字母组合
    naturalReg = /^[0-9]+$/i, //自然数
    chineseReg = /^[\u4e00-\u9fa5]+$/, //中文字符
    //phoneNumReg = /^1[34578]\d{9}$/, //手机号码
    phoneNumReg = /^1[3456789]\d{9}$/,
    telNumReg = /^(0\d{2,3}-){0,1}\d{7,8}$/, //固定电话
    sfzhmReg =
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, //身份证号码
    noSpecialChar = /^[\u4e00-\u9fa5a-zA-Z0-9_\(\)$#@!\-]+$/, //不允许特殊字符
    alphaAndNumReg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]/, //数字和字母组合
    urlReg =
    /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, //url
    pwdReg =
    /(?:\d.*_)|(?:_.*\d)|(?:[A-Za-z].*_)|(?:_.*[A-Za-z])|(?:[A-Za-z].*\d)|(?:\d.*[A-Za-z])/;
  var _extend, _isObject;
  //校验位的检测
  var checkParity = function(card) {
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4,
        2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3',
        '2');
      var cardTemp = 0,
        i, valnum;
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      valnum = arrCh[cardTemp % 11];
      if (valnum == card.substr(17, 1)) {
        return true;
      }
      return false;
    }
    return false;
  };

  // 15位转18位身份证号
  var changeFivteenToEighteen = function(card) {
    if (card.length == '15') {
      var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8,
        4, 2);
      var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3',
        '2');
      var cardTemp = 0,
        i;
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      card += arrCh[cardTemp % 11];
      return card;
    }
    return card;
  };

  // 检查号码是否符合规范，包括长度，类型
  var isCardNo = function(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
      return false;
    }
    return true;
  };

  _isObject = function(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
  };

  _extend = function(destination, source) {
    var property;
    for (property in destination) {
      if (destination.hasOwnProperty(property)) {
        // 若destination[property]和sourc[property]都是对象，则递归调用
        if (_isObject(destination[property]) && _isObject(source[property])) {
          arguments.callee(destination[property], source[property]);
        }
        // 若sourc[property]已存在，则跳过
        if (source.hasOwnProperty(property)) {
          continue;
        } else {
          source[property] = destination[property];
        }
      }
    }
  };
  //Validator 校验类
  function Validator() {}
  Validator.prototype = {
    //正整数
    isNumeric: function(val) {
      if (numericReg.test(val)) return true;
      return false;
    },
    //整型（负整数和正整数）
    isInteger: function(val) {
      if (integerReg.test(val)) return true;
      return false;
    },
    //邮政编码
    isYzbm: function(val) {
      if (yzbm.test(val)) return true;
      return false;
    },
    //证件号码(证件号码不同于身份证号码)
    isZjhm: function(val) {
      if (zjhm.test(val)) return true;
      return false;
    },
    //浮点型(整数和小数)
    isDecimal: function(val) {
      if (decimalReg.test(val)) return true;
      return false;
    },
    //最大14位整数，最多两位小数金额
    isMoney: function(val) {
      if (moneyReg.test(val)) return true;
      return false;
    },
    //邮箱
    isEmail: function(val) {
      if (emailReg.test(val)) return true;
      return false;
    },
    //字母
    isAlpha: function(val) {
      if (alphaReg.test(val)) return true;
      return false;
    },
    //字母、数字或者数字字母组合
    isAlphaNumeric: function(val) {
      if (alphaNumericReg.test(val)) return true;
      return false;
    },
    //可以含有下划线的字母、数字或者数字字母组合
    isAlphaDash: function(val) {
      if (alphaDashReg.test(val)) return true;
      return false;
    },
    //自然数
    isNatural: function(val) {
      if (naturalReg.test(val)) return true;
      return false;
    },
    //中文
    isChinese: function(val) {
      if (chineseReg.test(val)) return true;
      return false;
    },
    //手机号码
    isPhoneNum: function(val) {
      if (phoneNumReg.test(val)) return true;
      return false;
    },
    //固定电话
    isTelNum: function(val) {
      if (telNumReg.test(val)) return true;
      return false;
    },
    //身份证号码
    isSfzhm: function(val) {
      //检验位的检测
      if (!checkParity(val)) {
        return false;
      }
      //校验长度，类型
      if (!isCardNo(val)) {
        return false;
      }
      return true;
    },
    //特殊字符
    isNoSpecialChar: function(val) {
      if (noSpecialChar.test(val)) return true;
      return false;
    },
    //url
    isUrl: function(val) {
      if (urlReg.test(val)) return true;
      return false;
    },
    //组织机构代码，必须为9位数字字母，字母为半角大写
    isOrganizationCode: function(val) {
      if (organizationCodeReg.test(val)) return true;
      return false;
    },
    //8到16位 数字、字母或字母数字组合
    isUserName: function(val) {
      if (userNameReg.test(val)) return true;
      return false;
    },
    //密码需要8位以上，数字和英文组合，可以含有下划线
    isPwd: function(val) {
      if (pwdReg.test(val) && val.length > 7 && val.length<=16) return true;
      return false;
    },
    //数字和字母组合
    isAlphaAndNum: function(val) {
      if (alphaAndNumReg.test(val)) return true;
      return false;
    },
    //纳税人识别号(15位到20位 数字或字母)
    isNsrsbh: function(val) {
      if (nsrsbhReg.test(val)) return true;
      return false;
    }

  };
  typeof define === 'function' && define.amd ? define(function() { //requirejs加载
    return Validator;
  }) : function() { //普通script标签加载
    window.Validator = Validator;
  }();
}(window);

/**
 *@Name：原生js 支持define模块化
 *@description:VerificationCode.js e.g.短信、图形验证码组件，ajax依赖jquery
 *@author：zhouqiyuan
 *@create：2016-11-23
 */
! function(win) {
  var _extend, _isObject, insertAfter;

  _isObject = function(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
  };

  _extend = function(destination, source) {
    var property;
    for (property in destination) {
      if (destination.hasOwnProperty(property)) {
        // 若destination[property]和sourc[property]都是对象，则递归调用
        if (_isObject(destination[property]) && _isObject(source[property])) {
          arguments.callee(destination[property], source[property]);
        }
        // 若sourc[property]已存在，则跳过
        if (source.hasOwnProperty(property)) {
          continue;
        } else {
          source[property] = destination[property];
        }
      }
    }
  };

  insertAfter = function(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
      // 如果最后的节点是目标元素，则直接添加。因为默认是最后
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
      //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
  };
  //创建验证码类
  function VerificationCode(el, options) {
    this.opt = this.extend({}, this.defaultCfg, options);
    this.$element = document.getElementById(el);
    this.el = el;
    //组件初始化
    this.init();
    //绑定事件
    this.bind();
  }

  VerificationCode.prototype = {
    constructor: VerificationCode,
    //配置默认参数
    defaultCfg: {
      len: 4, //需要产生的验证码长度,可传参数到后端生成多少位验证码
      chars: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ], //指定产生验证码的字典，若不给或数组长度为0则试用默认字典
      messageBtnValue: "短信验证码",
      api: "/JPEGServlet", //api
      el: "verificationCode-image", //target对象
      telNum: "", //手机号
      telErrInfo: "请输入正确的手机号",
      sendMessageApi: "api/", //发送短信api
      sendMsgData: {}, //请求参数
      countTime: 60,
      inputArea: "", //输入验证码的input对象绑定【  HTMLInputElement 】
      click2refresh: true, //是否点击验证码刷新验证码
      validateEven: "" //触发验证的方法名，如click，blur等
    },
    /**
     * [extend description]扩展对象方法
     * @return {[Object]} [description]
     */
    extend: function() {
      var arr = arguments,
        result = {},
        i;
      if (!arr.length) return {};
      for (i = arr.length - 1; i >= 0; i--) {
        if (_isObject(arr[i])) {
          _extend(arr[i], result);
        }
      }
      arr[0] = result;
      return result;
    },
    /**
     * [trim description]去除前后空格
     * @param  {[type]} str
     * @return {[string]}
     */
    trim: function(str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //往对象添加节点
    append: function(el, newEl) {
      el.innerHTML += newEl;
      return el;
    },
    /**
     * [children 获取子节点]
     * @param  {[Object]} curEle  [当前父节点]
     * @param  {[string]} tagName [要查找的目标的节点]
     * @return {[Object]}         [description]
     */
    children: function(curEle, tagName) {
      var nodeList = curEle.childNodes;
      var ary = [];
      if (/MSIE(6|7|8)/.test(navigator.userAgent)) {
        for (var i = 0; i < nodeList.length; i++) {
          var curNode = nodeList[i];
          if (curNode.nodeType === 1) {
            ary[ary.length] = curNode;
          }
        }
      } else {
        ary = Array.prototype.slice.call(curEle.children);
      }
      // 获取指定子元素
      if (typeof tagName === "string") {
        for (var k = 0; k < ary.length; k++) {
          curTag = ary[k];
          if (curTag.nodeName.toLowerCase() !== tagName.toLowerCase()) {
            ary.splice(k, 1);
            k--;
          }
        }
      }
      return ary;
    },

    // 初始化生成验证码
    init: function() {
      if (this.el === this.defaultCfg.el) { //图形验证码
        this.append(this.$element,
          '<input type="text"/><img src="' +
          this.opt.api +
          '" alt="图形验证码"/>');
      } else {
        this.append(this.$element,
          '<input type="text"/><button type="button">' + this.opt.messageBtnValue +
          '</button>'
        );
      }
    },
    bind: function() {
      var self = this;
      var target;
      self.el === self.defaultCfg.el ? target = "img" : target = "button";
      //刷新或发送验证码
      if (self.opt.click2refresh) {
        self.bindHandler(self.children(self.$element, target)[0],
          'click',
          function() {
            if (self.el === self.defaultCfg.el) {
              self.refresh();
            } else {
              self.sendMessageCode();
            }
          });
      }
      /**
       * 绑定验证回调函数
       */
      // self.bindHandler(self.opt.validateObj || self.opt.inputArea, self.opt.validateEven, function() {
      //     self.opt.validateFn.call(self, self.validate(), self.myCode);
      //     if (self.opt.false2refresh && !self.validate()) {
      //         self.refresh();
      //         self.opt.inputArea.focus();
      //         self.opt.inputArea.select();
      //     }
      // });
    },
    /**
     * 绑定事件方法
     * @param elem
     * @param type
     * @param handler
     */
    bindHandler: function(elem, type, handler) {
      if (window.addEventListener) { // 支持html5标准浏览器
        elem.addEventListener(type, handler, false);
      } else if (window.attachEvent) { // IE浏览器
        elem.attachEvent("on" + type, handler);
      }
    },
    refresh: function() {
      this.children(this.$element, "img")[0].setAttribute("src", this.opt
        .api + '?' + Math.random());
    },
    sendMessageCode: function() {
      var tel = this.children(this.$element, "input")[0];
      var reg = /^1[34578]\d{9}$/;
      if (!reg.test(tel.value)) {
        if (tel.nextSibling.nodeName != "SPAN") {
          var node = document.createElement("span");
          var textnode = document.createTextNode(this.opt.telErrInfo);
          node.appendChild(textnode);
          node.style.color = "red";
          insertAfter(node, tel);
          tel.style.borderColor = "red";
        }
      } else {
        if (tel.nextSibling.nodeName != "BUTTON") {
          tel.nextSibling.remove();
        }
        tel.style.borderColor = "";
        this.timeCountDown(this.children(this.$element, "button")[0],
          this.opt.countTime);
        this.sendMsg();
      }
    },
    sendMsg: function() {
      reqwest({
        url: this.opt.api,
        type: 'json',
        method: 'post',
        contentType: 'application/json',
        // headers: {
        //   'X-My-Custom-Header': 'SomethingImportant'
        // },
        success: function(res) {

        },
        error: function(err) {}
      });
    },
    timeCountDown: function(obj, count) {
      var clear = null;
      var o = {
        timer: function() {
          clear = setTimeout(arguments.callee, 1000);
          if (count === 0) {
            clearTimeout(clear);
            obj.removeAttribute('disabled');
            obj.innerHTML = "重新发送";
          } else {
            obj.setAttribute('disabled', true);
            obj.innerHTML = "已发送(" + count + "s" + ")";
            count--;
          }
        }
      };
      o.timer();
    }
  };
  typeof define === 'function' ? define(function() { //requirejs加载
    return {
      get: function() {
        new VerificationCode(arguments[0], arguments[1]);
      }
    };
  }) : function() { //普通script标签加载
    var verificationObj = {
      get: function() {
        new VerificationCode(arguments[0], arguments[1]);
      }
    };
    window.VerificationCode = verificationObj;
  }();
}(window);

/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/29
 * Time：10:18
 *
 */

/**
 * window.console 兼容IE8
 */
(function() {
    // Union of Chrome, Firefox, IE, Opera, and Safari console methods
    var methods = ["assert", "cd", "clear", "count", "countReset",
        "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed",
        "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd",
        "select", "table", "time", "timeEnd", "timeStamp", "timeline",
        "timelineEnd", "trace", "warn"];
    var length = methods.length;
    var console = (window.console = window.console || {});
    var method;
    var noop = function() {};
    while (length--) {
        method = methods[length];
        // define undefined methods as noops to prevent errors
        if (!console[method])
            console[method] = noop;
    }
})();



/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：17:05
 *
 */
var regx = /(onload|onclick|onchange|onmousedown|onmouseover|onmouseenter|onmouseouter|onmouseup|javascript:|onmouseout|onkeyup|onkeydown|onkeypress|<script|<\/script)/gi;

(function($) {
    var $_ajax = $.ajax;
    var ajaxCache = {};
    $.extend({
        _ajax : $_ajax,
        /**
         * 重写ajax方法：增加遮罩配置及异常处理
         *
         * @param options
         *            请参见jquery.ajax参数
         * @param options.url
         *            请求url
         * @param options.type
         *            请求方式:[GET\POST]
         * @param options.data
         *            发送到服务器的数据
         * @param options.dataType
         *            预期服务器返回的数据类型，默认为json
         * @param options.success
         *            请求成功时的回调函数（error=0的情况）
         * @param options.failure
         *            请求失败时的回调函数
         * @param options.timeout
         *            请求超时时间（毫秒）
         * @param options.showMask
         *            是否显示遮罩，默认为false，手动调用时需将其设置为true
         * @param options.maskMassage
         *            显示遮罩时显示的信息，默认为"数据加载中，请稍后..."
         * @param el
         *            遮罩对象（DOM id），可选，默认为document.body
         */

        dataFilter: function(data){
            if(typeof data == "string"){
                data = data.replace(regx, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }else if(typeof data == "object" && typeof data != "undefined" && data != null){
                for(var i in data){
                    if(data[i] instanceof Array){
                        var arry = [];
                        for(var j=0;j<data[i].length;j++){
                            arry.push(this.dataFilter(data[i][j]));
                        }
                        data[i] = arry;
                    }else{
                        data[i] = this.dataFilter(data[i]);
                    }
                }
            }
            return data;
        },
        addTimeStamp:function (url) {
            var fileType = url.split('.').pop();
            var typeArr = ['html','css','js','json','xml','txt'];
            var newUrl='';
            if($.inArray(fileType,typeArr)>-1){
                newUrl = url + '?_t=' + new Date().getTime();
            }else{
                newUrl = url;
            }
            return newUrl;
        },
        ajax : function(options, el) {
            options = $.extend({
                url : "",
                type : "POST",
                data : {},
                dataType : "json",
                success : $.noop,
                failure : $.noop,
                timeout : 1000000,
                async : false, // 默认改成同步
                showMask : false,
                headers: {},
                contentType : "application/json; charset=UTF-8", // 默认为 application/x-www-form-urlencoded
                maskMassage : "数据加载中，请稍后..." // 等待提示信息
            }, options);

            /*if(options.dataType === 'text'){
                options.contentType = 'text/plain;charset=utf-8';
            }*/
            //options.url = this.addTimeStamp(options.url); // 'html','css','js','json','xml','txt' 添加时间戳

            if (!options.error) {
                options.error = $.noop;
            }
            if (options.showMask) {
                mini.mask({
                    el : el,
                    html : options.maskMassage
                });
            }

            //防止XSS攻击，对提交数据进行过滤
            //options.url = options.url.replace(regx, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            //options.data = this.dataFilter(options.data);
            if(options.isMini === 'Y' && ajaxCache[options.url] !== undefined){
                options.success(ajaxCache[options.url]);
                return this;
            }
            return $_ajax({
                url : options.url,
                type : options.type,
                dataType : options.dataType,
                contentType: options.contentType,
                data : options.data,
                timeout : options.timeout,
                cache : false,
                async : options.async,
                headers : options.headers,
                complete : function(req, st) {
                    if(options.complete){
                        options.complete.call(this, req, st);
                    }
                    if (options.showMask) {
                        mini.unmask(el);
                    }
                    if (st == "success" && req.status == "200") {
                        if (req.responseJSON) {// jsonp\json
                            if (req.responseJSON.success == false) {
                                if (req.responseJSON.messageCode == "SESSION_TIME_OUT") {//session超时
                                    //top.location.replace("/BsfwtWeb/apps/views/login/login.html");
                                } else {
                                    options.success.call(this, req.responseJSON);
                                    if(options.isMini === 'Y'){
                                        ajaxCache[options.url] = req.responseJSON;
                                    }
//                                     alert(req.responseJSON.message, function() {
//                                         options.failure.call(this, req.responseJSON);
//                                     });
                                }
                            } else {//成功
                                options.success.call(this, req.responseJSON);
                                if(options.isMini === 'Y'){
                                    ajaxCache[options.url] = req.responseJSON;
                                }
                            }
                        } else if(req.responseXML){
                            options.success.call(this, req.responseXML);
                            if(options.isMini === 'Y'){
                                ajaxCache[options.url] = req.responseXML;
                            }
                        } else {//其他
                            var regx = /"success"[ ]?:[ ]?false/g;
                            if (regx.test(req.responseText)) {
                                var obj;
                                try {
                                    if (mini) {
                                        obj = mini.decode(req.responseText);
                                    } else {
                                        obj = jQuery.parseJSON(req.responseText);
                                    }
                                } catch (e) {
                                    obj = req.responseText;
                                }
                                if(obj.messageCode == "SESSION_TIME_OUT"){//session超时
                                    //top.location.replace("/BsfwtWeb/apps/views/login/login.html");
                                }else{
                                    options.error.call(this, req, st);
//                                     alert(obj.message, function() {
//                                         options.failure.call(this, req.responseText);
//                                     });
                                }
                                delete obj;
                            } else {
                                if(options.dataType == "json") {//兼容低版本jquery
                                    obj = jQuery.parseJSON(req.responseText);
                                    options.success.call(this, obj);
                                }else if(options.dataType == "xml"){
                                    obj = jQuery.parseXML(req.responseText);
                                    options.success.call(this, obj);
                                }else{
                                    obj = req.responseText;
                                    options.success.call(this, req.responseText);
                                }
                                if(options.isMini === 'Y'){
                                    ajaxCache[options.url] = obj;
                                }
                            }
                        }
                    }else if(st == "error"){
                        options.error.call(this, req, st);
                    }
                }
            });
        }

    });
})(jQuery)

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.ajax = factory();
    }
}(this, function () {
    var ajax={};
    var errorMap = {
        '404': '系统出现异常(404)，请联系运维人员或稍后重试！',
        '500': '系统出现异常(502)，请联系运维人员或稍后重试！',
        '502': '系统出现异常(502)，请联系运维人员或稍后重试！',
        '503': '系统出现异常(503)，请联系运维人员或稍后重试！',
        '504': '系统出现异常(504)，请联系运维人员或稍后重试！',
        '900': '系统出现异常(900)，请联系运维人员或稍后重试！',
        'timeout': '错误：timeout，连接超时',
        'parsererror': '错误：parsererror，发送数据异常'
    };
    function executeAjax(async,method, url, params, successCallback, errCallback) {

        if(!errCallback){
            // 默认的ajax error 回调函数
            errCallback=function (req, st) {
                var msg = getLocalMessage(req, st);
                mini.alert(msg);
                return false;
            }
        }

        $.ajax({
            type: method,
            url: url,
            data: params,
            async:async,
            success: function(res) {

                if(res.message==='ajaxSessionTimeOut'){
                    mini.alert('由于您长时间未操作，登录信息已失效，请重新登录！');
                    window.console && console.log (this.url +'接口超时');
                    mini.unmask();
                    return;
                }
                ajax.response = res;
                successCallback(res);

            },
            error: function(req,st) {
                if(!req.message){
                    req.message = getLocalMessage(req,st) || '系统出现异常，请联系运维人员或稍后重试！';
                }
                errCallback(req,st);
            }
        });
    }
    function getLocalMessage(req, st) {
        var localMsg = "";
        if(st === 'error'){
            localMsg = errorMap[req.status];
        }else if( ['timeout','parsererror'].indexOf(st) !== -1 ){
            localMsg = errorMap[st];
        }
        return localMsg;
    }
    // 同步请求
    ajax.get=function (url, params, successCallback, errCallback) {
        params = '';
        executeAjax(false,'get',url, params, successCallback, errCallback);
    };

    ajax.post=function (url, params, successCallback, errCallback) {

        executeAjax(false,'post',url, params, successCallback, errCallback);
    };

     // 异步请求
    ajax.asyncGet=function (url, params, successCallback, errCallback) {

        executeAjax(true,'get',url, params, successCallback, errCallback);
    };

    ajax.asyncPost=function (url, params, successCallback, errCallback) {

        executeAjax(true,'post',url, params, successCallback, errCallback);
    };

    return ajax;

}));


/**
 * Created by chenjunj on 2016/11/23.
 */
/**
 * 重写Date 解决yyyy-MM-dd形式定义日期不支持的情况
 * 强制所有'yyyy-MM-dd'定义日期都统一转为yyyy/MM/dd
 * */
var nativeDate = Date;
Date = function(o){
    if (arguments.length === 1 && typeof o === 'string') {
        if(/^\d{4}-\d{2}-\d{2}$/.test(o)){
            o = o.replace(/-/g,'/');
        }
        return new nativeDate(o);
    }
    if (arguments.length > 1) {
        var t = [];
        for (var j = 0; j < arguments.length; j++) {
            t.push(arguments[j]);
        }
        o = t.join(',');
    }
    return eval('new nativeDate(' + (o || '') + ')');
};
Date.prototype = nativeDate.prototype;
/*
 * 日期格式化
 * @param [formatStr]
 * @returns String
 * */
Date.prototype.format = function (formatStr) {
    var o = {
        "M+" : this.getMonth()+1, //month 月
        "d+" : this.getDate(), //day 日
        "h+" : this.getHours(), //hour 时
        "m+" : this.getMinutes(), //minute 分
        "s+" : this.getSeconds(), //second 秒
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter季度
        "S" : this.getMilliseconds() //millisecond毫秒
    };

    if(/(y+)/.test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return formatStr;
};
/*
 * 获取当月第一天
 * @param [formatStr]
 * reutrn Date/String
 * */
Date.prototype.getFirstDateOfMonth = function (formatStr) {
    var year = this.getFullYear();
    var month = this.getMonth();
    if(formatStr){
        return new Date(year,month,1).format(formatStr);
    }
    return new Date(year,month,1);
};
/*
 * 获取当月最后一天
 * @param [formatStr]
 * reutrn Date/String
 * */
Date.prototype.getLastDateOfMonth = function (formatStr) {
    var year = this.getFullYear();
    var month = this.getMonth()+1;
    if(formatStr){
        return new Date(year,month,0).format(formatStr);
    }
    return new Date(year,month,0);
};
/*
 * 获取下个月的第一天
 * @param [formatStr]
 * reutrn Date/String
 * */
Date.prototype.getFirstDateOfNextMonth = function (formatStr) {
    if(formatStr){
        return new Date(this.getLastDateOfMonth().getTime()+24*60*60*1000).format(formatStr);
    }
    return new Date(this.getLastDateOfMonth().getTime()+24*60*60*1000);
};
/*
 * 获取下个月的最后一天
 * @param [formatStr]
 * reutrn Date/String
 * */
Date.prototype.getLastDateOfNextMonth = function(formatStr){
    if(formatStr){
        return this.getFirstDateOfNextMonth().getLastDateOfMonth(formatStr);
    }
    return this.getFirstDateOfNextMonth().getLastDateOfMonth();
};
/*
 * 获取上个月的第一天
 * @param [formatStr]
 * reutrn Date/String
 * */
Date.prototype.getFirstDateOfPrevMonth = function (formatStr) {
    if(formatStr){
        return new Date(this.getFirstDateOfMonth().getTime()-24*60*60*1000).getFirstDateOfMonth(formatStr);
    }
    return new Date(this.getLastDateOfMonth().getTime()-24*60*60*1000);
};
/*
 * 获取上个月的最后一天
 * @param [formatStr]
 * reutrn Date/String
 * */
Date.prototype.getLastDateOfPrevMonth = function(formatStr){
    if(formatStr){
        return new Date(this.getFirstDateOfMonth().getTime()-24*60*60*1000).format(formatStr);
    }
    return new Date(this.getFirstDateOfMonth().getTime()-24*60*60*1000);
};
/*
 * 获取本年第一季度的起止日期
 * @param [formatStr]
 * reutrn Array
 * */
Date.prototype.getDatesOfFirstSeason = function (formatStr) {
    var year = this.getFullYear();
    var beginDate = new Date(year,0,1);
    var endDate = new Date(year,2,31);
    if(formatStr){
        return [beginDate.format(formatStr),endDate.format(formatStr)];
    }
    return [beginDate,endDate];
};
/*
 * 获取本年第二季度的起止日期
 * @param [formatStr]
 * reutrn Array
 * */
Date.prototype.getDatesOfSecondSeason = function (formatStr) {
    var year = this.getFullYear();
    var beginDate = new Date(year,3,1);
    var endDate = new Date(year,5,30);
    if(formatStr){
        return [beginDate.format(formatStr),endDate.format(formatStr)];
    }
    return [beginDate,endDate];
};
/*
 * 获取本年第三季度的起止日期
 * @param [formatStr]
 * reutrn Array
 * */
Date.prototype.getDatesOfThirdSeason = function (formatStr) {
    var year = this.getFullYear();
    var beginDate = new Date(year,6,1);
    var endDate = new Date(year,8,30);
    if(formatStr){
        return [beginDate.format(formatStr),endDate.format(formatStr)];
    }
    return [beginDate,endDate];
};
/*
 * 获取本年第四季度的起止日期
 * @param [formatStr]
 * reutrn Array
 * */
Date.prototype.getDatesOfForthSeason = function (formatStr) {
    var year = this.getFullYear();
    var beginDate = new Date(year,9,1);
    var endDate = new Date(year,11,31);
    if(formatStr){
        return [beginDate.format(formatStr),endDate.format(formatStr)];
    }
    return [beginDate,endDate];
};
/*
 * 日期比较-早于
 * */
Date.prototype.earlierThan = function (date) {
    var thisTime = this.getTime();
    var dateTime;
    if(typeof date === 'number'){
        dateTime = new Date(parseInt(date)).getTime();
    }else if(typeof date === 'string'){
        dateTime = new Date(date).getTime();
    }else if(typeof date === 'object' && date instanceof Date){
        dateTime = date.getTime();
    }
    return thisTime<dateTime;
};
/*
 * 日期比较-晚于
 * @param Int/String/Date date
 * @return boolean
 * */
Date.prototype.laterThan = function (date) {
    var thisTime = this.getTime();
    var dateTime;
    if(typeof date === 'number'){
        dateTime = new Date(parseInt(date)).getTime();
    }else if(typeof date === 'string'){
        dateTime = new Date(date).getTime();
    }else if(typeof date === 'object' && date instanceof Date){
        dateTime = date.getTime();
    }
    return thisTime>dateTime;
};
/*
 * 获取本地时间
 * @return Date
 * */
Date.localDate = null;
Date.getLocalDate = function(formatStr){
    if(formatStr){
        Date.localDate = new Date().format(formatStr);
    }else{
        Date.localDate = new Date();
    }
    return  Date.localDate;
};
/*
 * 获取服务器时间-----------------------------------------------------接口待定
 * @return Date
 * */
Date.serverDate = null;
Date.getServerDate = function(formatStr,url){
    var _url='/sb/sbcommon_checkCwbbSbqkFromGt3.do';
    if(!!url){
        _url = url;
    }
    if(!Date.serverDate){
        $.ajax({
            url : _url,
            async : false,
            type : "GET",
            data : {}
        }).success(function (result) {
            Date.serverDate = result;
        }).error(function () {
            console.log('获取服务器时间失败！');
        });
    }
    if(!!formatStr){
        Date.serverDate =  Date.serverDate.format(formatStr);
    }
    return Date.serverDate;
};
/**
 * 前台页面提示信息工具类
 *
 * @author zhaomd
 */
var MessageUtil = {};

/**
 * 前台页面提示信息 注：各功能模块请各自添加，规则："模块名称.提示信息场景":"提示信息"
 * "提示信息"内容如果需要参数，使用{index}来表示，如"{0}唯一"
 * 提示信息场景规则：以_CONFIRM结束表示确认信息，以_WARNING结束表示警告信息，以_ERROR结束表示错误信息，其他为提示信息
 *
 * @author zhaomd
 */
MessageUtil.MESSAGE = {
	/** -----------------公共提示----------------------- */
	"80483901":"请选中一条记录"	,
	"80483902":"必须选择一个缴税账号！"	,
	"80483903":"信息未作修改，不能点击下一步"	,
	"80483904":"输入数据不完整，{0}",
	"80483905":"数据格式输入不正确，请检查数据，重新填写。"	,
	"80483906":"请求提交失败，请稍后再试。"	,
	"80483907":"您未更新上传过附报资料，不能予以提交！"	,
	"80483908":"您的申请信息提交失败，请稍后提交"	,
	"80483909":"请求提交失败，错误原因：{0}"	,
	"80483910":"数据未填写完整，请检查填写的数据是否有遗漏，补充填写必录项。"	,
	"80483911":"备案已过期，请重新备案"	,
	"80483912":"已经备案，不能重复备案"	,
	"80483913":"请输入不小于本月的日期！"	,
	"80483914":"请输入正确四位数年度！"	,
	"80483915":"您还有必填项未填，不能进入下一步！"	,
	"80483916":"数据不正确，请重新输入。"	,
	"80483917":"有效期起不能大于等于有效期止！请重新修改有效期起止。"	,
	"80483918":"有效期起不能大于等于有效期止！请重新修改有效期起止。"	,
	"80483919":"请先填写有效期起！"	,
	"80483920":"请至少录入一条数据！"	,

	/** -----------------文书提示----------------------- */
	"80483921":"账户性质为\"基本存款账户\",\"预算单位专用存款账户\",\"QFII专用存款账户\"或\"临时存款账户\"时\t银行开户登记证号和发证日期不能为空！"	,
	"80483922":"查询存款账户账号信息失败，请核实是否存在存款账户账号信息。",
	"80483923":"查询停业信息失败，请确认是否存在停业登记信息，是否已自动复业。",
	"80483924":"复业日期有误，请重新审核并输入",
	"80483925":"查询非正常户信息失败",
	"80483926":"获取税收减免性质信息失败！",
	"80483927":"查询税费种认定信息失败，请稍后再试！",
	"80483928":"获取税收优惠事项失败！",
	"80483929":"请填写减征额度！",
	"80483930":"请填写减征幅度！",
	"80483931":"请填写减征税率！",
	"80483932":"有效期起必须大于2015-07-01日",
	"80483933":"获取扣缴登记信息失败！",
	"80483934":"此纳税人存在扣缴税款资格，不予受理！",
	"80483935":"您有正在办理的任务，请等待工作人员处理完后再操作",
	"80483936":"请填写扣缴税款登记_代扣代缴、代收代缴税款信息。",
	"80483937":"请选择扣缴义务人发生日期",
	"80483938":"输入数据不完整，请输入申请重新发放的的详细信息。",
	"80483939":"遗失，损毁税务证件表输入不正确，请检查！",
	"80483940":"申请重新发放表输入不正确，请检查！",
	"80483941":"查询  税务证件遗失补办 失败",
	"80483942":"停业月份止必须大于等于停业月份起，请重新选择停业月份止。",
	"80483943":"停业期限起需大于当前月",
	"80483944":"数据未填写完整，请检查填写的数据是否有遗漏，补充填写必录项。",
	"80483945":"确定删除选中记录？",
	"80483946":"查询跨区域涉税事项报告信息失败！",
	"80483947":"查询跨区域涉税事项报告申报失败，请稍后再试。",
	"80483948":"金额仅支持数字格式并保留两位小数",
	"80483949":"发生异常信息：{0}",
	"80483950":"该《跨区域涉税事项报告》逾期核销，请到税务机关接受处罚",
	"80483951":"跨区域涉税事项报验登记缴销数据或格式输入不正确，请检查！",
	"80483952":"货物信息发票起始号码不得大于货物信息发票终止号码！",
	"80483953":"劳务信息发票起始号码不得大于劳务信息发票终止号码！",
	"80483954":"货物信息发票终止号码与货物信息发票起始号码之差不等于发票份数，请检查重新填写。",
	"80483955":"货物信息发票终止号码与货物信息发票起始号码之差不等于发票份数，请检查重新填写。",
	"80483956":"当前用户税纳税人状态异常，请联系主管税务机关核实原因。",
	"80483957":"跨区域涉税事项报告数据或格式输入不正确，请检查！",
	"80483958":"数据未填写完整，请检查填写的数据是否有遗漏，补充填写必录项。",
	"80483959":"跨区域涉税事项报告的货物（劳务）信息输入不正确！",
	"80483960":"证明有效期止不得超过证明有效期起180日。请重新选择证明有效期起止时间。",
	"80483961":"货物信息有效期起不得大于货物有效期止！",
	"80483962":"劳务信息有效期起不得大于货物有效期止！",
	"80483963":"货物劳务累计销售额查询失败，请稍后再试。",
	"80483964":"查询应税服务累计销售额失败",
	"80483965":"货物劳务累计销售额的计算时间不得超过12个月，请修改货物劳务累计销售额的计算时间。",
	"80483966":"应税服务累计销售额的计算时间不得超过12个月，请修改应税服务累计销售额的计算时间。",
	"80483967":"选择“C.动漫企业为开发动漫产品提供的应税服务”的有效期止不得晚于2017年12月，请修改有效期止!",
	"80483968":"选择“J.通过卫星提供的语音通话服务、电子数据和信息的传输服务” 的有效期止不得晚于2015年12月,请修改有效期止!",
	"80483969":"有效期止不能小于有效期起！",
	"80483970":"有效期止必须大于等于有效期起+35个月！请修改有效期起止时间。",
	"80483971":"选择的简易征收方式，在页面上已存在，请重新录入！",
	"80483972":"手机验证码错误",
	"80483973":"未选择纳税人类别",
	"80483974":"未选择主营业务类别！",
	"80483975":"未选择一般纳税人资格生效之日",
	"80483976":"纳税人类别未选择！",
	"80483977":"该纳税人税务登记类型不是单位纳税人登记或临时税务登记，不能作为总机构或分支机构，请重新输入！",
	"80483978":"查询总机构纳税人是否为单位或临时纳税人失败或不存在此纳税人！",
	"80483979":"根据《增值税一般纳税人资格认定管理办法》第十二条规定，纳税人一经认定为一般纳税人后，不得转为小规模纳税人。请慎重操作！",
	"80483980":"您已登记为增值税一般纳税人，可按照要求在【发票领用】页面申请办理增值税专用发票手续",
	"80483981":"选择增值税普通发票、机动车销售统一发票、二手车销售统一发票时【单张发票最高开票限额】不能为空",

	/** -----------------公共错误提示----------------------- */





	"MSG.NOT_FIND" : "【配置错误】：消息代码[{0}]不存在。",

	/** -----------------公共----------------------- */
	"COMMON.404_ERROR" : "错误 404 - 文件或目录未找到。",
	"COMMON.TIMEOUT_FAILED" : "连接超时，请刷新后重试。",
	"COMMON.CONNECT_ERROR" : "连接失败，请检查网络后重试。",
	"COMMON.500_ERROR" : "服务出错，请联系管理员。",

	// 保存
	"COMMON.SAVE_SUCCESS" : "保存成功。",
	"COMMON.SAVE_FAILED" : "保存失败。原因可能是：{0}。",

	// 新增
	"COMMON.ADD_SUCCESS" : "新增成功。",
	"COMMON.ADD_FAILED" : "新增失败。原因可能是：{0}。",

	// 删除
	"COMMON.DEL_SUCCESS" : "删除成功。",
	"COMMON.DEL_CONFIRM" : "是否确定删除选中记录？",

	// 导出
	"COMMON.NODATA_IMPORT" : "没有要导出的数据。",
	// 导入
	"COMMON.IMPORT_NOFILE" : "请选择导入文件。",

	// 其他操作
	"COMMON.OPT_SUCCESS" : "{0}成功。",
	"COMMON.OPT_FAILED" : "{0}条记录操作成功。其中{1}条记录操作失败。<a href='javascript:MessageUtil.toggleDetail()'>点击展开不成功的对象</a><div id='messageDetail' style='display:none;'>{2}</div>",
	"COMMON.OPT_CONFIRM" : "是否确定{0}选中记录？",
	"COMMON.OPT_ADD_CONFIRM" : "记录新增成功,是否要继续新建？",

	// 选择操作
	"COMMON.SELECT_OP_ROW" : "请选择要{0}的数据。",
	"COMMON.SELECT_1" : "请选择一条记录。",
	"COMMON.SELECT_N" : "请至少选择1条记录。",

	// 校验
	"COMMON.UNIQUE_FAIL" : "{0}不能重复。",
	"COMMON.UNIQUE_CHECK_EXIST" : "{0}已经存在。",
	"COMMON.VALIDATE_FAILED" : "输入数据有误。",

	"COMMON.DB_CONNECT_ERROR" : "数据库连接异常，请联系管理员。",
	"COMMON.DB_ERROR"         : "数据库异常，请联系管理员。",
	"COMMON.CLASS_NEWINSTANCE_ERROR" : "类[{0}]创建错误。",
	"COMMON.CLASS_COVERT_ERROR" : "类{0}转换错误，可能是抽象类、数组、基本类型或void。",
	"MODEL.LINE_CHECK_EXISTS" : "节点间已经存在连接线。",
	"MODEL.LINE_CHECK_CIRCLE" : "连接后将会形成回路。",
	"MODEL.NODE_TO_ITSELF_VAIL"   : "节点不能指向自己。",
	"COMMON.GET_ENTRY_FAIL" : "获取JSON实体出错了。",
	"COMMON.FORMULA_VALID_FAIL" : "公式返回的结果值类型可能不符合预期，是否继续？",
	"COMMON.FORMULA_REQ_VALID_FAIL" : "公式不能为空。",
	"COMMON.FORMULA_INPUT_FAIL" : "公式格式输入错误:{0}",
	"COMMON.FILE_UPLOAD_FAIL"   : "文件上传出错。",
	"COMMON.477_ERROR":"账号信息不一致，请重新打开。",

	/**----------------------数据权限------------------------**/
	"SJQX.UPDATE_SUCC" : "数据权限修改成功。"

};

/**
 * 获取提示信息
 *
 * @author zhaomd
 * @param keyCode
 *            提示信息代码
 * @param params
 *            提示信息的参数
 */
MessageUtil._getMessage = function(keyCode, params) {
	params = params || [];
	var message = MessageUtil.MESSAGE[keyCode];

	if (!message) {
		if(/^[A-Z._]+$/.test(keyCode)){
			message = MessageUtil.MESSAGE["MSG.NOT_FIND"];
			params = [keyCode];
		}else{
			message = keyCode+"";
			params = [];
		}
	}

	for (var i = 0; i < params.length; i++) {
		message = message.replace(["{", i, "}"].join(""), function() {
			return params[i];
		});
	}

	// 支持message中引用提示信息代码
	var msgs = message.split("{");
	if (msgs.length > 1) {
		for (var i = 1; i < msgs.length; i++) {
			var code = msgs[i].split("}");
			if (code.length > 1) {
				if (code[0].indexOf(":") > 0) {
					code[0] = "{" + code[0] + "}";
				}
				message = message.replace(["{", code[0], "}"].join(""),
						function() {
							return MessageUtil.getMessage(code[0]);
						});
			}
		}
	}
	return message;
};

MessageUtil.getMessage = function(msg) {
	var type = $.type(msg);
	var message = "";

	if (type == 'object') {
		for (var k in msg) {
			message += MessageUtil._getMessage(k, msg[k]) + "<br/>";
		}
		if (message.length > 0) {
			message = message.substring(0, message.length - 5);
		}
	} else if (type == 'array') {
		$.each($.makeArray(msg), function(index) {
			for (var k in this) {
				message += MessageUtil._getMessage(k, this[k])
						+ "<br/>";
			}
			if (index == msg.length - 1 && message.length > 0) {
				message = message.substring(0, message.length - 5);
			}
		});
	} else {
		try {
			var _msg = $.parseJSON(msg);
			if (!_msg || _msg == null) {
				message = MessageUtil._getMessage(msg);
			} else {
				message = MessageUtil.getMessage(_msg);
			}
		} catch (e) {
			message = MessageUtil._getMessage(msg);
		}
	}
	return message;
}

/**
 * 提示信息
 *
 * @param String/Object/Array
 *            msg
 * @param Function
 *            callback 参数为按钮类型（ok、cancel）
 * @param String
 *            title 提示信息弹出窗口标题
 */
MessageUtil._msg = function(msg, callback, msgType, title) {
	var message = MessageUtil.getMessage(msg);

	if (msgType == "confirm") {// 确认信息（按钮：确定，取消）
		mini.MessageBox.show({
			minWidth : 250,
			maxWidth : 550,
            minHeight: 200,
			title : title || "确认",
			buttons : ["ok", "cancel"],
			message : message,
			iconCls : "mini-messagebox-question",
			callback : callback
		});
	} else if (msgType == "confirmCancel") {// 确认信息(按钮：是，否，取消)
		mini.MessageBox.show({
			minWidth : 250,
			maxWidth : 550,
            minHeight: 200,
			title : title || "确认",
			buttons : ["yes", "no", "cancel"],
			message : message,
			iconCls : "mini-messagebox-question",
			callback : callback
		});
	} else if (msgType == "warn") {// 警告信息
		mini.alert(message, title || "警告", callback);
	} else if (msgType == "error") {// 错误信息
		mini.showMessageBox({
			minWidth : 250,
			maxWidth : 550,
            minHeight: 200,
			title : title || "错误",
			buttons : ["ok"],
			message : message,
			iconCls : "mini-messagebox-error",
			callback : callback
		});
	} else {// 提示信息
		mini.showMessageBox({
			minWidth : 250,
			maxWidth : 550,
            minHeight: 200,
			title : title || "提示",
			buttons : ["ok"],
			message : message,
			iconCls : "mini-messagebox-info",
			callback : callback
		});
	}
}
MessageUtil.toggleDetail = function() {
	$("#messageDetail").toggle();
}

// 原生alert、confirm
window._nativeAlert = window.alert;
window.nativeAlert = function(msg) {
	var message = MessageUtil.getMessage(msg);
	if (message == MessageUtil.MESSAGE["MSG.NOT_FIND"].replace("{0}", msg)) {
		message = msg;
	}
	window._nativeAlert(message);
}
window._nativeConfirm = window.confirm;
window.nativeConfirm = function(msg, callback) {
	var message = MessageUtil.getMessage(msg);
	if (window._nativeConfirm(message)) {
		callback('ok');
	} else {
		callback('cancel');
	}
}

/**
 * 重写window.alert
 *
 * @example
 * alert("COMMON.SAVE_SUCCESS");
 * @example
 * alert({"SAVE_FAILED":["数据库无法连接"]});
 * @example
 * alert({"SAVE_FAILED":["数据库无法连接"], "COMMON.ADD_FAILED":["名称不能重复"]});
 * @example
 * alert([{"SAVE_FAILED":["数据库无法连接"]},{"SAVE_FAILED":["数据库无法连接"]}]);
 * @example
 * 参数支持使用消息代码，使用方式：{消息代码}
 * alert([{"SAVE_FAILED":["数据库无法连接"]},{"SAVE_FAILED":["{COMMON.TIMEOUT_FAILED}"]}]);
 *
 * @param {String/Object/Array}
 *            msg
 * @param {Function}
 *            callback 回调函数
 * @param {String}
 *            title 标题
 */
window.alert = function(msg, callback, title) {
	//屏蔽掉代码形式的异常信息  2014-01-24 linchen
	if(msg&&msg.constructor==String){
		if(msg.indexOf("Exception") > 0 || msg === "null"){
			msg = "服务器暂时无法连接，请稍后再试！";
		}
	}
	MessageUtil._msg(msg, callback, 'alert', title);
}
$(function(){
	mini.alert = function(msg, title, callback){
		alert(msg, callback, title);
		// document.body.scrollTop = 0;
	};
    mini.confirm = function(msg, title, callback){
        MessageUtil._msg(msg, callback, 'confirm', title);
    }
})

window.warning = function(msg, callback, title) {
	MessageUtil._msg(msg, callback, 'warn', title);
}
window.error = function(msg, callback, title) {
	MessageUtil._msg(msg, callback, 'error', title);
}
window.confirm = function(msg, callback, title) {
	MessageUtil._msg(msg, callback, 'confirm', title);
}
window.confirmCancel = function(msg, callback, title) {
	MessageUtil._msg(msg, callback, 'confirmCancel', title);
}
/*重写window.close()事件*/
win_close = window.close;
var window_close = function () {
    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
        window.location.href="about:blank";
        win_close();
    } else {
        window.opener = null;
        window.open("", "_self");
        win_close();
    }
};
window.close = function () {
    window_close();
};


/**
 * Created by chenjunj on 2016/11/16.
 * Last modefied by:zhouqy
 */
/**
 * dataGrid校验
 * @param grid grid对象
 * @returns {Boolean}校验结果
 */
function validateGrid(grid) {
	grid.validate();
	if (grid.isValid() == false) {
		var error = grid.getCellErrors()[0];
		mini.alert(error.errorText, "提示信息", function() {
			grid.beginEditCell(error.record, error.column);
		});
		return false;
	}
	return true;
}
var validator = new Validator();
/*------------------------------------------------自定义vtype----begin-----------------------------------*/
/*自定义vtype:固定电话*/
mini.VTypes["telephoneErrorText"] = "3/4位区号-7/8位电话号码，如0123-12345678";
mini.VTypes["telephone"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isTelNum(v);
};

/*自定义vtype:14位整数，两位小数金额*/
mini.VTypes["int_14_digit_2ErrorText"] = "请输入最大14位整数2位小数";
mini.VTypes["int_14_digit_2"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isMoney(v);
};

/*自定义vtype:10位整数*/
mini.VTypes["int_10ErrorText"] = "请输入不大于9,999,999,999的数！";
mini.VTypes["int_10"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	if (parseFloat(v) <= 0) {
		return false;
	}
	var re = new RegExp("^([0-9]{1,10}$)");
	if (re.test(v)) return true;
	return false;
};

/*自定义vtype:非特殊字符,如果为null 不再校验，如果想检验不能为空，请加上 required="true" */
mini.VTypes["specialCharErrorText"] = "不能输入特殊字符";
mini.VTypes["specialChar"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isNoSpecialChar(v);
};

/*自定义vtype:如果不为空再开始校验是否为float*/
mini.VTypes["numericErrorText"] = "请输入数字";
mini.VTypes["numeric"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isNumeric(v);
};

/*自定义vtype:16位整数，两位小数金额*/
// mini.VTypes["double16ErrorText"] = "请输入最大16位整数2位小数";
// mini.VTypes["double16"] = function(v) {
// 	return validator.isNumeric(v);
// };

/*自定义vtype:12位整数，4位小数金额*/
mini.VTypes["double12ErrorText"] = "请输入最大12位整数4位小数";
mini.VTypes["double12"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	var re = new RegExp(
		"^(([-]?[0-9]{1,12}[.]{1}[0-9]{1,4})$|([-]?[0-9]{1,12})$)");
	if (!v || re.test(v)) return true;
	return false;
};

/*自定义vtype:邮政编码*/
mini.VTypes["yzbmErrorText"] = "请输入0～9数字，长度为6位";
mini.VTypes["yzbm"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isYzbm(v);
};

/*自定义vtype:证件号码(证件号码不同于身份证号码)*/
mini.VTypes["zjhmErrorText"] = "请输入数字、字母或-，长度不超过20位";
mini.VTypes["zjhm"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isZjhm(v);
};

/*自定义vtype:身份证件号码*/
mini.VTypes["sfzjhmErrorText"] = "请输入正确的身份证号码。";
mini.VTypes["sfzjhm"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isSfzhm(v);
};

/*自定义vtype:组织机构代码*/
mini.VTypes["zzjgdmErrorText"] = "组织机构代码必须为9位数字字母，字母为半角大写。";
mini.VTypes["zzjgdm"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isOrganizationCode(v);
};

/*自定义vtype: 用户名*/
mini.VTypes["usernameErrorText"] = "请输入8-16位字符(字母、数字组合)";
mini.VTypes["username"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isUserName(v);
};

/*自定义vtype: 8-32位英文和数字*/
mini.VTypes["englishAndNum32ErrorText"] = "请输入8-32位字符(字母、数字组合)区分大小写";
mini.VTypes["englishAndNum32"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	var re = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,32}$/;
	if (!v || re.test(v)) return true;
	return false;
};

/*自定义vtype:密码格式*/
// 密码需要8位以上，数字和英文组合，可以含有下划线
mini.VTypes["passwordErrorText"] = "密码格式不正确";
mini.VTypes["password"] = function(v) {
    return validator.isPwd(v);
};

/*自定义vtype:两次密码输入*/
mini.VTypes["rePasswordErrorText"] = "两次密码输入不一致";
mini.VTypes["rePassword"] = function(v) {
	var pwd = mini.get("password");
	if (v === pwd.value) return true;
	return false;
};

/*自定义vtype:手机号码(1+[3-8]+任意9位数)*/
mini.VTypes["mobilePhoneErrorText"] = "请输入正确的手机号码";
mini.VTypes["mobilePhone"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isPhoneNum(v);
};

/*自定义vtype:纳税人识别号*/
mini.VTypes["nsrsbhErrorText"] = "请输入正确的纳税人识别号";
mini.VTypes["nsrsbh"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isNsrsbh(v);
};

/* 自定义vtype：42位以内的字符且必须都是汉字 */
mini.VTypes["isChinese42ErrorText"] = "请输入少于42个汉字";
mini.VTypes["isChinese42"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	var re = new RegExp("^[\u4e00-\u9fa5]+$");
	if (re.test(v)) {
		if (v.length > 42) {
			return false;
		}
	}
	return true;
};

/*自定义vtype: 字母、数字或者数字字母组合*/
mini.VTypes["alphaNumericErrorText"] = "字母、数字或者数字字母组合";
mini.VTypes["alphaNumeric"] = function(v) {
	//不对空值进行校验
	if (!v || v === "") return true;
	return validator.isAlphaNumeric(v);
};

/*------------------------------------------------自定义vtype----end-----------------------------------*/

/*-----------------------------------------mini组件定制化----start---------------------------*/
/*---------mini Form 增加getDataAndText方法---------------*/
mini.copyTo(mini.Form.prototype, {
	getDataAndText: function(formatted) {
		var formData = this.getData(formatted);
		var fields = this.getFields();
		for (var i = 0; i < fields.length; i++) {
			if (fields[i].type == "combobox" || fields[i].type == "treeselect") {
				formData[fields[i].getId() + "Text"] = fields[i].getText();
			}
		}
		return formData;
	}
});
/**
 * 重写alert的宽度和高度-----------------------------------暂时屏蔽
 * @param message
 * @param title
 * @param callback
 * @returns {*}
 */
/*mini.alert = function (message, title, callback) {
return mini.MessageBox.show({
maxWidth: 550,
minWidth: 430,
minHeight: 250,
title: title || mini.MessageBox.alertTitle,
buttons: ["ok"],
message: message,
iconCls: "mini-messagebox-warning",
callback: callback
});
};*/

/** ------------------ Layout---------------------------- */
if (mini.Layout) {
	mini.Layout.prototype.mini_createRegion = mini.Layout.prototype._createRegion;
	mini.copyTo(mini.Layout.prototype, {
		_createRegion: function(options) {
			options = options || {};
			if (!options.showSplit) {
				options.showSplit = false;
			}
			if (!options.showHeader) {
				options.showHeader = false;
			}
			return this.mini_createRegion(options);
		}
	});
}
/** ------------------ DataGrid---------------------------- */
if (mini.DataGrid) {
	mini.DataGrid.prototype.mini_OnDrawCell = mini.DataGrid.prototype._OnDrawCell;
	mini.DataGrid.prototype.mini_OnCellCommitEdit = mini.DataGrid.prototype._OnCellCommitEdit;
	mini.DataGrid.prototype.mini_getData = mini.DataGrid.prototype.getData;
	mini.copyTo(mini.DataGrid.prototype, {
		width: "100%",
		height: "auto",
		showFooter: false,
		allowResize: false,
		showModified: false,
		allowUnselect: true,
		enableHotTrack: false,
		loadErrorAlert: false, //ajax请求异常时不提示url等信息
		beginEdit: function() {
			if (!this.allowCellEdit) { // 行编辑模式
				var scope = this;
				this._allowLayout = false;
				this.findRows(function(row) {
					scope.beginEditRow(row);
				});
				this._allowLayout = true;
				this.doLayout();
			}
		},
		getData: function() {
			var data = mini.DataGrid.prototype.mini_getData.apply(this, arguments);

			return mini.decode(mini.encode(data, 'yyyy-MM-dd'));
		},
		_tryFocus: function() {
			//解决点击单元格页面跳动问题
			return;
		},
		/**
		 * 扩展:单元格编辑时高亮显示可编辑单元格
		 */
		_OnDrawCell: function() {
			var e = this.mini_OnDrawCell.apply(this, arguments);
			//扩展单元格编辑时高亮显示可编辑单元格
			if (this.allowCellEdit && arguments[1].editor) {
				e.cellCls = e.cellCls + " mini-grid-editCell-hotTrack";
			}
			return e;
		},
		_OnCellCommitEdit: function(record, column, value, editor) {
			var e = this.mini_OnCellCommitEdit.apply(this, arguments);
			if (e.editor.textName) {
				mini._setMap(e.editor.textName, e.text, record);
			}
			return e;
		}
	});
}
/** ------------------ ComboBox---------------------------- */
if (mini.ComboBox) {
	mini.ComboBox.prototype.mini_set = mini.ComboBox.prototype.set;
	mini.ComboBox.prototype.mini__createPopup = mini.ComboBox.prototype._createPopup;
	mini.ComboBox.prototype.miniSetValue = mini.ComboBox.prototype.setValue;
	mini.ComboBox.prototype.mini_setEnabled = mini.ComboBox.prototype.setEnabled;
	mini.ComboBox.prototype.mini_setText = mini.ComboBox.prototype.setText;
	mini.ComboBox.prototype.mini__doEmpty = mini.ComboBox.prototype._doEmpty;
	mini.copyTo(mini.ComboBox.prototype, {
		width: "100%",
		height: 32,
		textField: "MC",
		valueField: "ID",
		showClose: true,
		allowInput: true,
		valueFromSelect: true,
		errorMode: "border",
		emptyText: "-请选择-",
		set: function(kv) {
			this._value = kv.value;
			if (!kv.textField) {
				kv.textField = "MC";
			}

			if (!kv.valueField) {
				kv.valueField = "ID";
			}

			if (!kv.nullItemText) {
				kv.nullItemText = "-请选择-";
			}

			var _enabled = kv.enabled;
			delete kv.enabled;

			this.mini_set(kv);

			//解决disable时不显示emptyText
			if (_enabled === false) {
				this.setEnabled(false);
			}

		},
		setText: function(text) {
			mini.ComboBox.prototype.mini_setText.apply(this, arguments);

			//解决disable时不显示emptyText
			if (mini.isEquals(this._emptyText, text)) {
				mini.ComboBox.superclass.setText.call(this, "");
			}
		},
		_doEmpty: function() {
			mini.ComboBox.prototype.mini__doEmpty.apply(this, arguments);

			//解决emptyText无法修改为空的问题
			if (this.emptyText == "") {
				mini._placeholder(this._textEl);
			}

		},
		setEnabled: function(value) {
			//disable时不显示emptyText
			if (!value) {
				if (typeof(this._emptyText) == "undefined") {
					this._emptyText = this.emptyText;
					this.setEmptyText("");
				}
			} else if (this._emptyText) {
				this.setEmptyText(this._emptyText);
				delete this._emptyText;
			}

			mini.ComboBox.prototype.mini_setEnabled.apply(this, arguments);
			if (value) {
				$(this.el).parent().addClass("enable").removeClass("disable");
			} else {
				$(this.el).parent().addClass("disable").removeClass("enable");
			}
		},
		__OnItemLoad: function() {
			this.data = this._listbox.data;

			if (typeof this._value != "undefined") {
				this.setValue(this._value, this.defaultValueTriggerChange);
			} else {
				this.setValue(this.value);
			}
		},
		/**
		 * 修改为同步请求
		 */
		__OnItemBeforeLoad: function(e) {
			e.async = false;
		},
		_createPopup: function() {
			this.mini__createPopup();

			this._listbox.on("load", this.__OnItemLoad, this);
			this._listbox.on("beforeload", this.__OnItemBeforeLoad, this);
		},
		setValue: function(value, valid) {
			this._value = value;
			this.miniSetValue(value, valid);
		}
	});
}
if (mini.TreeSelect) {
	mini.TreeSelect.prototype.mini_setEnabled = mini.TreeSelect.prototype.setEnabled;
	mini.copyTo(mini.TreeSelect.prototype, {
		width: "100%",
		popupWidth: "100%",
		popupMinWidth: 250,
		popupMaxHeight: 300,
		height: 32,
		showClose: true,
		errorMode: "border",
		emptyText: "-请选择-",
		setEnabled: function(value) {
			mini.TreeSelect.prototype.mini_setEnabled.apply(this, arguments);
			if (value) {
				$(this.el).parent().addClass("enable").removeClass("disable");
			} else {
				$(this.el).parent().addClass("disable").removeClass("enable");
			}
		}
	});
}
/** ------------------ mini-Password---------------------------- */
if (mini.Password) {
	mini.Password.prototype.mini_setEnabled = mini.Password.prototype.setEnabled;
	mini.Password.prototype.mini__OnBlur = mini.Password.prototype.__OnBlur;
	mini.copyTo(mini.Password.prototype, {
		width: "100%",
		height: 32,
		errorMode: "border",
		setEnabled: function(value) {
			mini.Password.prototype.mini_setEnabled.apply(this, arguments);
			if (value) {
				$(this.el).parent().addClass("enable").removeClass("disable");
			} else {
				$(this.el).parent().addClass("disable").removeClass("enable");
			}
		},
		__OnBlur: function(e) {
			if (this._textEl.value != this._valueEl.value) {
				this.setValue(this._textEl.value);
			}
			mini.Password.prototype.mini__OnBlur.apply(this, arguments);
		}
	});
}
/** ------------------ TextBox---------------------------- */
if (mini.TextBox) {
	mini.TextBox.prototype.mini_setEnabled = mini.TextBox.prototype.setEnabled;
	mini.TextBox.prototype.mini__OnBlur = mini.TextBox.prototype.__OnBlur;
	mini.copyTo(mini.TextBox.prototype, {
		width: "100%",
		height: 32,
		errorMode: "border",
		setEnabled: function(value) {
			mini.TextBox.prototype.mini_setEnabled.apply(this, arguments);
			if (value) {
				$(this.el).parent().addClass("enable").removeClass("disable");
			} else {
				$(this.el).parent().addClass("disable").removeClass("enable");
			}
		},
		__OnBlur: function(e) {
			if (this._textEl.value != this._valueEl.value) {
				this.setValue(this._textEl.value);
			}
			mini.TextBox.prototype.mini__OnBlur.apply(this, arguments);
		}
	});
}
/** ------------------ Splitter---------------------------- */
if (mini.Splitter) {
	mini.copyTo(mini.Splitter.prototype, {
		width: "100%",
		height: "100%"
	});
}
/** ------------------ PopupEdit---------------------------- */
if (mini.PopupEdit) {
	mini.copyTo(mini.PopupEdit.prototype, {
		width: "100%",
		height: 32,
		errorMode: "border"
	});
}
/** ------------------ DatePicker---------------------------- */
if (mini.DatePicker) {
	mini.DatePicker.prototype.mini_setEnabled = mini.DatePicker.prototype.setEnabled;
	mini.copyTo(mini.DatePicker.prototype, {
		width: "100%",
		height: 32,
		showClose: false,
		errorMode: "border",
		/*popupHeight: 206,
		popupMinHeight: 206,*/
		setEnabled: function(value) {
			mini.DatePicker.prototype.mini_setEnabled.apply(this, arguments);
			if (value) {
				$(this.el).parent().addClass("enable").removeClass("disable");
			} else {
				$(this.el).parent().addClass("disable").removeClass("enable");
			}
		}
	});
}

/** ------------------ MoneyBox---------------------------- */
if (mini.MoneyBox) {
	mini.MoneyBox.prototype.mini_setEnabled = mini.MoneyBox.prototype.setEnabled;
	mini.copyTo(mini.MoneyBox.prototype, {
		width: "100%",
		height: 32,
		selectOnFocus: true,
		errorMode: "border",
		setEnabled: function(value) {
			mini.MoneyBox.prototype.mini_setEnabled.apply(this, arguments);
			if (value) {
				$(this.el).parent().addClass("enable").removeClass("disable");
			} else {
				$(this.el).parent().addClass("disable").removeClass("enable");
			}
		}
	});
}

/** ------------------ mask---------------------------- */
if (mini.mask) {
	mini__mask = mini.mask;
	mini.mask = function(options) {
		options = options || {};
    if(options.html === 'Loading...'){
      options.html = '加载中...';
    }
		var el = mini.byId(options);
		if (mini.isElement(el)) options = {
			el: el
		};
		else if (typeof options == "string") options = {
			html: options
		};
		options.cls = "mini-mask-loading";
		mini__mask(options);
		$('.mini-mask-msg').show();//added by chenjunj, mini-mask遮罩实时显示，不再是所有代码执行完毕之后才显示
	}
}
if (mini.ToolTip) {
    mini.copyTo(mini.ToolTip.prototype,{
        open: function (target) {
            if ($(target)[0]){
                target = $(target).attr('data-tooltip') ? $(target)[0] : $(target).parents('[data-tooltip]')[0];
            } else {
                target = this.target;
            }
            var jq = $(target),
                content = this.getContent(target);

            var e = { element: target, content: content, cancel: !content };
            this.fire("beforeopen", e);
            if (e.cancel) return;

            this.$element.show();

            this._target = target;
            this.setContent(e.content);

            this.fire("open", { element: target });

        }
    })
}

/*重写mini.prompt*/
mini.prompt = function(message, title, callback, multi) {
	var id = "prompt$" + new Date().getTime();
	var s = message || mini.MessageBox.promptMessage;
	// 改为miniui的textbox,来保证页面风格的统一性 潘正锋 2014-06-16
	// 增加尺寸数据,解决ie6下面无法自适应的问题 pzf 2014-11
	var $html = jQuery('<div></div>');
	var obj;
	var height;

	if (multi) {
		obj = new mini.TextArea();
		obj.setWidth("230");
		obj.setHeight("70");
		height = "190";

	} else {
		obj = new mini.TextBox();
		obj.setWidth("230");
		height = "200";
		s = '<span style="line-height: 28px;">' + s + '：</span><br/>';

	}

	var uid = mini.MessageBox.show({
		title: title || mini.MessageBox.promptTitle,
		buttons: ["ok", "cancel"],
		width: 280,
		height: height,
		html: '<div id="pzf" style="overflow:auto;padding:5px;padding-left:10px;">' +
			s + '</div>',
		callback: function(action) {
			if (callback) callback(action, obj.getValue());
		}
	});
	obj.render(jQuery('#pzf')[0]);
	obj.focus();
	return uid;
};
/*-----------------------------------------mini组件定制化----end---------------------------*/

/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/9
 * Time：19:31
 *
 */

// 重写miniVtype校验，校验通过的单元格添加背景色

mini_CellValidator_Prototype.setCellIsValid = function(row, column, isValid,
	errorText) {

	row = this.getNode ? this.getNode(row) : this._getRow(row);
	column = this.getColumn(column);
	if (!row || !column) return;
	var id = row[this._rowIdField] + "$" + column._id;
	var cellEl = this._getCellEl(row, column);
	var error = this._cellMapErrors[id];
	delete this._cellMapErrors[id];
	this._cellErrors.remove(error);

	if (isValid === true) {
		// lizm 2017-01-09 vtype校验通过时添加背景色
		if (!!column.editor && !mini.hasClass(cellEl, 'mini-grid-cell-validated')) {
			mini.addClass(cellEl, 'mini-grid-cell-validated');
		}
		if (!this.getAllowCellEdit()) {
			mini.removeClass(cellEl, 'mini-grid-cell-validated');
		}
		// end

		if (cellEl && error) {
			mini.removeClass(cellEl, 'mini-grid-cell-error');

		}
	} else {
		error = {
			record: row,
			column: column,
			isValid: isValid,
			errorText: errorText
		};
		this._cellMapErrors[id] = error;
		this._cellErrors.add(error);
		if (cellEl) {
			mini.addClass(cellEl, 'mini-grid-cell-error');
		}
	}
};
/**
 * 更新行
 * @param Object/Number row 行对象或行rowIndex
 * @param String/Object rowData 行对象，当rowData为String类型时表示更新列的field
 * @param String/Number/Boolean value 当rowData为String类型时，更新列对应的value
 */
mini_CellValidator_Prototype._updateRowEl = function(row) {
	var me = this;

	var s = jQuery(me._createRow(row));
	var rowEl = me._getRowEl(row);
	jQuery(rowEl).before(s);
	// lizm 2017-01-11 重新绘制表格时，同时复制样式
	jQuery(rowEl).find('td').each(function() {
		var classValue = jQuery(this).attr('class');
		var tdId = jQuery(this).index();
		jQuery(this).parent().prev().find('td').eq(tdId).attr('class', classValue);
	});
	// end
	rowEl.parentNode.removeChild(rowEl);

};
if (mini.DataGrid) {
	mini.copyTo(mini.DataGrid.prototype, mini_CellValidator_Prototype);
}
if (mini.showTips) {
	// 添加mini.showTips
	mini.copyTo(mini, {
		showAt: function(options) {
			var $ = jQuery;

			options = jQuery.extend({
				el: null,

				x: 'center',
				y: 'center',
				offset: [0, 0],
				fixed: false,
				zindex: mini.getMaxZIndex(),
				timeout: 0,
				timeoutHandler: null,
				animation: false
			}, options);
			var el = jQuery(options.el)[0],
				x = options.x,
				y = options.y,
				offsetx = options.offset[0],
				offsety = options.offset[1],
				zindex = options.zindex,
				fixed = options.fixed,
				animation = options.animation;
			if (!el) return;

			if (options.timeout) {
				setTimeout(function() {
					if (options.timeoutHandler) options.timeoutHandler();

				}, options.timeout);
			}



			var s =
				';position:absolute;display:block;left:auto;top:auto;right:auto;bottom:auto;margin:0;z-index:' +
				zindex + ';';
			mini.setStyle(el, s);
			var s = "";

			if (options && mini.isNumber(options.x) && mini.isNumber(options.y)) {
				if (options.fixed && !mini.isIE6) {
					s += ";position:fixed;";
				}
				mini.setStyle(el, s);
				mini.setXY(options.el, options.x, options.y);
				return;
			}



			if (x == 'left') {
				s += 'left:' + offsetx + 'px;';
			} else if (x == 'right') {
				s += 'right:' + offsetx + 'px;';
			} else {
				var size = mini.getSize(el);
				s += 'left:50%;margin-left:' + (-size.width * 0.5) + 'px;';
			}

			if (y == 'top') {
				s += 'top:' + offsety + 'px;';
			} else if (y == 'bottom') {
				s += 'bottom:' + offsety + 'px;';
			} else {
				var size = mini.getSize(el);
				s += 'top:50%;margin-top:' + (-size.height * 0.5) + 'px;';
			}

			if (fixed && !mini.isIE6) {
				s += 'position:fixed';
			}
			mini.setStyle(el, s);

		}
	});
}
/* 1. mini-datepicker 渲染时，为每一个日期数字添加样式 mini-calendar-item */
/* 2. 渲染时，不创建 mini-timespinner ，将display：inline-block 改成了display：none*/
if (mini.DatePicker) {
	mini.copyTo(mini.Calendar.prototype, {
        _create: function () {
            var s = '<tr style="width:100%;"><td style="width:100%;"></td></tr>';
            s += '<tr ><td><div class="mini-calendar-footer">'
                + '<span style="display:none;"><input name="time" class="mini-timespinner" style="width:80px" format="' + this.timeFormat + '"/>'
                + '<span class="mini-calendar-footerSpace"></span></span>'
                + '<span class="mini-calendar-tadayButton">' + this.todayText + '</span>'

                + '<span class="mini-calendar-footerSpace"></span>'
                + '<span class="mini-calendar-clearButton">' + this.clearText + '</span>'
                + '<span class="mini-calendar-okButton">' + this.okText + '</span>'
                + '<a href="#" class="mini-calendar-focus" style="position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none" hideFocus></a>'
                + '</div></td></tr>';

            var html = '<table class="mini-calendar" cellpadding="0" cellspacing="0">' + s + '</table>';

            var d = document.createElement("div");
            d.innerHTML = html;
            this.el = d.firstChild;

            var trs = this.el.getElementsByTagName("tr");
            var tds = this.el.getElementsByTagName("td");

            this._innerEl = tds[0];
            this._footerEl = mini.byClass("mini-calendar-footer", this.el);

            this.timeWrapEl = this._footerEl.childNodes[0];
            this.todayButtonEl = this._footerEl.childNodes[1];
            this.footerSpaceEl = this._footerEl.childNodes[2];
            this.closeButtonEl = this._footerEl.childNodes[3];
            this.okButtonEl = this._footerEl.childNodes[4];

            this._focusEl = this._footerEl.lastChild;




            this.yesterdayButtonEl = mini.after(this.todayButtonEl, '<span class="mini-calendar-tadayButton yesterday">' + this.yesterdayText + '</span>');


            mini.parse(this._footerEl);
            this.timeSpinner = mini.getbyName('time', this.el);
            this.doUpdate();
        },
		_CreateView: function(viewDate, row, column) {
			var month = viewDate.getMonth();
			var date = this.getFirstDateOfMonth(viewDate);
			var firstDateOfWeek = new Date(date.getTime());
			var todayTime = mini.clearTime(new Date()).getTime();
			var selectedTime = this.value ? mini.clearTime(this.value).getTime() : -1;

			var multiView = this.rows > 1 || this.columns > 1;

			var s = '';
			s +=
				'<table class="mini-calendar-view" border="0" cellpadding="0" cellspacing="0">';

			if (this.showHeader) {
				s +=
					'<tr ><td colSpan="10" class="mini-calendar-header"><div class="mini-calendar-headerInner">';
				if (row == 0 && column == 0) {
					s += '<div class="mini-calendar-prev">';
					if (this.showYearButtons) s +=
						'<span class="mini-calendar-yearPrev"></span>';
					if (this.showMonthButtons) s +=
						'<span class="mini-calendar-monthPrev"></span>';
					s += '</div>';
				}
				if (row == 0 && column == this.columns - 1) {
					s += '<div class="mini-calendar-next">';
					if (this.showMonthButtons) s +=
						'<span class="mini-calendar-monthNext"></span>';
					if (this.showYearButtons) s +=
						'<span class="mini-calendar-yearNext"></span>';
					s += '</div>';
				}
				s += '<span class="mini-calendar-title">' + mini.formatDate(viewDate,
					this.format); + '</span>';
				s += '</div></td></tr>';
			}


			if (this.showDaysHeader) {
				s +=
					'<tr class="mini-calendar-daysheader"><td class="mini-calendar-space"></td>';
				if (this.showWeekNumber) {
					s += '<td sclass="mini-calendar-weeknumber"></td>';
				}

				for (var j = this.firstDayOfWeek, k = j + 7; j < k; j++) {
					var name = this.getShortWeek(j);
					s += '<td yAlign="middle">';
					s += name;
					s += '</td>';
					date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
				}
				s += '<td class="mini-calendar-space"></td></tr>';
			}


			date = firstDateOfWeek;
			for (var i = 0; i <= 5; i++) {
				s +=
					'<tr class="mini-calendar-days"><td class="mini-calendar-space"></td>';
				if (this.showWeekNumber) {
					var num = mini.getWeek(date.getFullYear(), date.getMonth() + 1, date.getDate());
					if (String(num).length == 1) num = "0" + num;
					s += '<td class="mini-calendar-weeknumber" yAlign="middle">' + num +
						'</td>';
				}
				for (var j = this.firstDayOfWeek, k = j + 7; j < k; j++) {
					var weekend = this.isWeekend(date);
					var clearTime = mini.clearTime(date).getTime();
					var isToday = clearTime == todayTime;
					var isSelected = this.isSelectedDate(date);

					if (month != date.getMonth() && multiView) {
						clearTime = -1;
					}

					var e = this._OnDrawDate(date);

					s += '<td yAlign="middle" id="';
					s += this.uid + "$" + clearTime;
					s += '" class="mini-calendar-date ';
					if (weekend) {
						s += ' mini-calendar-weekend '
					}
					if (e.allowSelect == false) {
						s += ' mini-calendar-disabled '
					}

					if (month != date.getMonth() && multiView) {} else {
						if (isSelected) {
							s += ' ' + this._selectedDateCls + ' ';
						}
						if (isToday) {
							s += ' mini-calendar-today '
						}
					}
					if (month != date.getMonth()) {
						s += ' mini-calendar-othermonth ';
					}

					if (e.dateCls) s += ' ' + e.dateCls;

					s += '" style="';
					if (e.dateStyle) s += e.dateStyle;
					s += '"><span class="mini-calendar-item">';

					if (month != date.getMonth() && multiView) {} else {

						s += e.dateHtml;
					}
					s += '</span></td>';

					date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
				}
				s += '<td class="mini-calendar-space"></td></tr>';
			}
			s += '<tr class="mini-calendar-bottom" colSpan="10"><td ></td></tr>';

			s += '</table>';
			return s;
		}
	});
}

// mini-tab 切换时，调整steps插件内容显示区的高度
if (mini.Tabs) {
	mini.copyTo(mini.Tabs.prototype, {
		// 调整steps插件内容的高度 李志明 2017-02-09
		resetWizard: function() {
			var height = this.getTabBodyEl(this.activeIndex).clientHeight + 100;
			if (jQuery('#wizard').length == 1) {
				jQuery('#wizard').find('.content').height(height);
			}
		},
		// end
		activeTab: function(tab) {
			this.setActiveIndex(tab);
			this.resetWizard();
		}
	})
}
/*修改 miniForm 的validate 方法*/
if (mini.Form) {
	mini.Form.prototype.mini_validate = mini.Form.prototype.validate;
	mini.copyTo(mini.Form.prototype, {
		validate: function(all, hide) {
			var validResult = mini.Form.prototype.mini_validate.apply(this, arguments);
			if (!validResult) {
				var errorTexts = this.getErrorTexts();
				if (errorTexts.length > 0) {
					var text = '';
					for (var i = 0; i < errorTexts.length; i++) {
						text += errorTexts[i] + '<br/>';
					}
					mini.alert(text);
				}
				return false;
			} else {
				return validResult;
			}

		}


	})
}
/*mini vtype rangeChar 中的中文字符算 3 个长度*/
if (mini.VTypes) {
    mini.VTypes.rangeChar = function (v, args) {
        if (mini.isNull(v) || v === "") return true;

        var min = parseFloat(args[0]), max = parseFloat(args[1]);
        if (isNaN(min) || isNaN(max)) return true;

        //将中文标点符号也纳入到校验范围中 潘正锋 2013-10-12
        function isChinese(v) {
            var reg = /[^\x00-\xff]/ig;
            if (v.match(reg) != null) return true;
            return false;
        }

        var len = 0;
        var ss = String(v).split("");
        for (var i = 0, l = ss.length; i < l; i++) {
            if (isChinese(ss[i])) {
                len += 3; // 原来是2，改成3
            } else {
                len += 1;
            }
        }

        if (min <= len && len <= max) return true;
        return false;
    }
}

/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/22
 * Time：11:12
 *
 */

var moneyUtil = function () {
    // 阿拉伯数字金额转成中文大写金额
    var _arabicToChinese = function (arabicNum) {
        var arabicNum = new String(Math.round(arabicNum * 100)); // 数字金额
        var chineseValue = ""; // 转换后的汉字金额
        var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
        var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
        var len = arabicNum.length; // arabicNum 的字符串长度
        var Ch1; // 数字的汉语读法
        var Ch2; // 数字位的汉字读法
        var nZero = 0; // 用来计算连续的零值的个数
        var String3; // 指定位置的数值
        if (len > 15) {
            alert("超出计算范围");
            return "";
        }
        if (arabicNum == 0) {
            chineseValue = "零元整";
            return chineseValue;
        }
        String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
        for (var i = 0; i < len; i++) {
            String3 = parseInt(arabicNum.substr(i, 1), 10); // 取出需转换的某一位的值
            if (i != (len - 3) && i != (len - 7) && i != (len - 11)
                && i != (len - 15)) {
                if (String3 == 0) {
                    Ch1 = "";
                    Ch2 = "";
                    nZero = nZero + 1;
                } else if (String3 != 0 && nZero != 0) {
                    Ch1 = "零" + String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                } else {
                    Ch1 = String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                }
            } else { // 该位是万亿，亿，万，元位等关键位
                if (String3 != 0 && nZero != 0) {
                    Ch1 = "零" + String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                } else if (String3 != 0 && nZero == 0) {
                    Ch1 = String1.substr(String3, 1);
                    Ch2 = String2.substr(i, 1);
                    nZero = 0;
                } else if (String3 == 0 && nZero >= 3) {
                    Ch1 = "";
                    Ch2 = "";
                    nZero = nZero + 1;
                } else {
                    Ch1 = "";
                    Ch2 = String2.substr(i, 1);
                    nZero = nZero + 1;
                }
                if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
                    Ch2 = String2.substr(i, 1);
                }
            }
            chineseValue = chineseValue + Ch1 + Ch2;
        }
        if (String3 == 0) { // 最后一位（分）为0时，加上“整”
            chineseValue = chineseValue + "整";
        }
        return chineseValue;
    };
    //toFixed js默认Number类型的toFixed方法是 四舍六入，现在改为四舍五入
    var _nativeToFixed = function (origin,s) {
        var e, changeNum, index, i, j;
        // 如果值小于0，先转成正数
        if (origin < 0) {
            e = -origin;
        }
        else {
            e = origin;
        }
        var pointIndex = origin.toString().indexOf('.');
        var addVal = '0.5';
        if(pointIndex>0){//尽量减少0.0...01类似的误差，但不能完全排除
            var len = origin.toString().split('.')[1].length-s-3;
            for(var i=0;i<len;i++){
                addVal += '0';
            }
        }
        if (origin.toString().split('.')[0].length + s > 14){
            addVal += '1';
            changeNum = (parseInt(e * Math.pow(10, s) + Number(addVal)) / Math.pow(10, s)).toString()
        } else {
            changeNum = (parseInt(parseFloat((e * Math.pow(10, s)).toPrecision(14)) + Number(addVal)) / Math.pow(10, s)).toString();
        }
        //如果为科学计数法，先转换为普通数字字符串
        var mtc = changeNum.match(/(\d)(?:\.(\d*))?e([+-]\d+)/);
        if (mtc){
            var num = mtc[1]+(mtc[2] || '');
            if (Number(mtc[3]) > 0){
                for (var mm = 0; mm < Number(mtc[3]) - mtc[2].length; mm++){
                    num += '0';
                }
            } else {
                var num1 = '0.';
                for (var mm = 0; mm < -Number(mtc[3])-1; mm++){
                    num1 += '0';
                }
                num = num1+num;
            }
            changeNum = num;
        }
        index = changeNum.indexOf(".");
        if (index < 0 && s > 0) {
            changeNum = changeNum + ".";
            for (i = 0; i < s; i++) {
                changeNum = changeNum + "0";
            }
        } else {
            index = changeNum.length - index;
            for (j = 0; j < (s - index) + 1; j++) {
                changeNum = changeNum + "0";
            }
        }
        if (origin < 0) {
            if (Number(s) > 0) {
                return '-' + changeNum;
            }
            else {
                return -changeNum;
            }
        }
        else {
            return changeNum;
        }
    };
    return {
        arabicToChinese: function () {
            return _arabicToChinese.apply(this, arguments);
        },
        toFixed: function (origin,s) {
            return _nativeToFixed(origin,s);
        }
    }
}();
Number.prototype.toFixed = function (s) {
    var temp = moneyUtil.toFixed(this,s);
    return temp;
    // return moneyUtil.toFixed(Number(temp),s);
};
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/23
 * Time：13:41
 *
 */

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.nsrxxUtil = factory();
    }
}(this, function () {

    var nsrxxUtil={};
    // 有参数true，就重新请求
    nsrxxUtil.getUserInfo = function (refresh) {
        refresh = refresh === undefined?false:refresh;
        var userInfo = null;
        if(Tools.getUrlParamByName('client') !== 'Y'){
            userInfo = mini.decode(store.getSession('getUserInfo'));
        }
        if (refresh===true || !userInfo) {
            ajax.post('/sbzx-web/api/base/userInfo/get', {}, function (response) {
                if (response.success && !!response.value) {
                    userInfo = response.value;
                    if(Tools.getUrlParamByName('client') !== 'Y'){
                        store.setSession('getUserInfo',userInfo);
                    }
                }else{
                    mini.alert(response.message);
                    return false;
                }
            });
        }
        return userInfo;
    };
    nsrxxUtil.getNsrInfo = function () {
        var data = nsrxxUtil.getUserInfo();
        if(!!data && !! data.NsrInfo){
            return data.NsrInfo;
        }else{
            return null;
        }
    };
    nsrxxUtil.getAccountInfo = function () {
        var data = nsrxxUtil.getUserInfo();
        if(!!data && !! data.AccountInfo){
            return data.AccountInfo;
        }else{
            return null;
        }
    };
    nsrxxUtil.getNsrxxVO = function (url) {

        var userInfo = nsrxxUtil.getUserInfo(); // 办税桌面缓存
        var nsrxxData = null;
        if(userInfo && userInfo.userType === '02'){//自然人
          ajax.get('/sbzx-web/api/sb/zrr/zrrxxDj', '', function (response) {
            if(response.success){
              var zrrData = response.value;
              nsrxxData = {
                djxh: zrrData.djxh,
                nsrmc: zrrData.xm,
                xm: zrrData.xm,
                nsrsbh: zrrData.nsrsbh,
                sfzjlxDm: zrrData.sfzjlxDm,
                sfzjhm: zrrData.sfzjhm,
                slswjgDm: zrrData.slswjgDm,
                lrrq: zrrData.lrrq,
                cjxm: zrrData.cjxm,
                lrrDm: zrrData.lrrDm,
                yxbz: zrrData.yxbz,
                lxdh: zrrData.lxdh
              };
            }else{
              mini.alert(response.message);
            }
          }, function () {
            mini.alert('获取自然人信息失败！');
          });
          return nsrxxData;
        }
        if(Tools.getUrlParamByName('client') !== 'Y'){
            nsrxxData = mini.decode(store.getSession("gsNsrjbxxVO")); // 纳税人信息缓存
        }
        // 获取纳税人信息请求
        var _getNsrxx = function () {
            var nsrxx=null;
            var defaultUrl = !!url ? url : "/sbzx-web/api/base/nsrxx/get";
            ajax.post(defaultUrl, {}, function (response) {

                if (response.success && !!response.value) {
                    nsrxx = response.value;
                    if(Tools.getUrlParamByName('client') !== 'Y'){
                        store.setSession("gsNsrjbxxVO", mini.encode(nsrxx));
                    }
                }else{
                    // 个人模式没有纳税人信息，不弹框提示
                    if(userInfo.NsrInfo){
                        mini.alert('获取纳税人信息失败，请稍后再试');
                    }

                    return false;
                }
            });
            return nsrxx;
        };
        // 新疆小助手跳转而来的页面，rul带有 DZSWJ_TGC ，需要重新获取纳税人信息
        if(Tools.getUrlParamByName('DZSWJ_TGC')){
            nsrxxData =  _getNsrxx();
            return nsrxxData;
        }
        if(!!userInfo){
            if (!!nsrxxData) {
                if(!userInfo.NsrInfo){
                    nsrxxData = null;
                    return false;
                }
                // 判断是否和办税桌面缓存的信息一致
                if(nsrxxData.djxh != userInfo.NsrInfo.djxh){
                    nsrxxData =  _getNsrxx();
                }
            } else {  // 缓存没有 则发请求
                nsrxxData =  _getNsrxx();
            }
            return nsrxxData;

        }else{  // 缓存不存在，未登录或者session过期
            //store.clearSession();
            //store.clearLocal();
            //mini.alert('登录已过期，请重新登录');
            return false;
        }
    };

    return nsrxxUtil;

}));


