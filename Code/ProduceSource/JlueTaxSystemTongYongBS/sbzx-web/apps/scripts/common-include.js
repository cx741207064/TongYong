/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/**
 * Created by chenjunj on 2017/6/2 14:56.
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
    root.header = factory();
  }
}(this, function () {
  var header = {
    breadContext: '/bszm-web/',
    homeUrl_01: '#',//企业首页
    homeUrl_02: '#',//个人首页
    secondUrl: '#',//二级菜单  默认税费申报及缴纳的链接
    secondName: '税费申报及缴纳',
    init: function (url) {
      this.loadHeader(url);
    },
    /**
     * 初始化页面头部和页脚,私有静态方法
     */
    loadHeader: function (url) {
      /**
       * 若客户端嵌入，则将头部隐藏
       * */
      if (Tools.getUrlParamByName('client') === 'Y') {
        localStorage.setItem('client', 'Y');
          if (Tools.getUrlParamByName('clientType') === 'zzzd') {
              localStorage.setItem('clientType', 'zzzd');
          }
        return;
      }
      if (localStorage.getItem('client') === 'Y') {
        return;
      }
      // 如果有参数指定初始化头或尾，则按参数来初始化
      var nsrxx = nsrxxUtil.getNsrxxVO('/sbzx-web/api/base/nsrxx/get') || {};
      // nsrxx.zgswjMc = this.getSwjgMc(nsrxx.zgswjDm);
      nsrxx.title = $('title').get(0).innerText;
      if (store.getSession('getUserInfo') && store.getSession('getUserInfo').AccountInfo) {
        nsrxx.fullName = store.getSession('getUserInfo').AccountInfo.fullName;
      } else {
        $.ajax({
          url: '/bszm-web/api/desktop/userInfo/get',
          type: 'GET',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          async: false,
          success: function (data) {
            if (data.success) {
              nsrxx.fullName = data.value.AccountInfo.fullName;
              store.setSession('getUserInfo', data.data);
            }
          }
        })
      }
      var reg = /sbzx-[^\/]+/g;
      var baseName = location.pathname.split('/apps/')[0];
      var tplUrl = baseName + '/apps/views/public/head/HeadView.html';
      if (url) {
        tplUrl = url;
      }
      var html = this.loadTemplate(tplUrl, nsrxx);
      $('body').prepend(html);
      //增加尾部
      var bmUrl = baseName + '/apps/views/public/foot/FootView.html';
      var foot = this.loadTemplate(bmUrl, null);
      $('body').append(foot);
      setTimeout(function () {
        header.renderCrumbs();
        header.bindCrumbsEvent();
        /*ajax.get(header.breadContext+'api/desktop/navigation/' + id + '/get', '', function (response) {
          // if()
        }, function (response) {
          console.log('');
        });
        $('')*/
      }, 1);
    },
    /**
     *  加载模版
     * @param url
     * @param Data
     * @returns {string}
     */
    loadTemplate: function (url, Data) {
      var html = '';
      $.ajax({
        url: url,
        type: 'GET',
        async: false,
        dataType: 'html',
        success: function (data) {
          if (!!Data) {
            try {
              var reg = /(?:\{\{)(\w+(\.\w)*)(?:\}\})/g; // 匹配 {{ data.param }}
              data = data.replace(reg, function (_, item) {
                return eval("Data." + item);
              });
            } catch (e) {
              // TODO
            }
          }
          html = data;
        },
        error: function () {
          console.log('加载html出错');
        }
      });
      return html;
    },
    getSwjgMc: function (dm) {
      var result = null;
      ajax.get('/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG?dm=' + dm, {}, function (response) {
        result = response;
      }, function (response) {
        mini.alert(response.message);
      });
      if (result && result.MC) {
        return result.MC;
      }
      return '';
    },
    renderCrumbs: function () {
      var breakHtml = '<span class="breadcrumb-break">&gt;</span>';
      var html = '<a data-type="home">首页</a>'
        + breakHtml + '<a data-type="second">'+this.secondName+'</a>'
        + breakHtml + '<span>'+$('title').html()+'</span>'
        +'<a data-type="second" class="back-btn"><img src="/sbzx-web/apps/images/public/bread-back.png">返回</a>';
      $('#breadcrumb-Nav').html(html);

    },
    bindCrumbsEvent: function () {
      var _this = this;
      var userInfo = mini.decode(sessionStorage.getItem('getUserInfo'));
      var userType = userInfo.userType;//01企业、02个人
      // var userType = '02';//01企业、02个人 -----用于本地测试
      $('body').on('click', '#breadcrumb-Nav a', function () {
        var type = $(this).attr('data-type');
        if(type === 'home'){
          window.location.href = _this['homeUrl_'+userType];
        }else if(type === 'second'){
          var url = _this.secondUrl.replace(/\{userType\}/g,userType);
          window.location.href = url;
        }
      })
    }
  };
  return header;
}));


/**
 * Created by chenjunj on 2017/6/2 14:56.
 *///
header.homeUrl = '/bszm-web/apps/views-zj/home/home.aspx';//首页
header.secondUrl = '/bszm-web/apps/views-zj/publicPages/allFunctions.html?tab=panel-{code}#menu-{code}1010';//二级菜单
header.renderCrumbs = function () {
    var userInfo = mini.decode(sessionStorage.getItem('getUserInfo')) || {};
    var userType = userInfo.userType;//01企业、02个人
    var breakHtml = '<span class="breadcrumb-break">&gt;</span>';
    if(userType === '03' || (userInfo.NsrInfo && userInfo.NsrInfo.byhBz === '3')){//社保户  和  跨区域税源户
        var html = '<a data-type="home">首页</a>'
            + breakHtml + '<span>'+$('title').html()+'</span>'
            +'<a data-type="second" class="back-btn"><img src="/sbzx-web/apps/images/public/bread-back.png">返回</a>';
    } else {
        var html = '<a data-type="home">首页</a>'
            + breakHtml + '<a data-type="second">'+this.secondName+'</a>'
            + breakHtml + '<span>'+$('title').html()+'</span>'
            +'<a data-type="second" class="back-btn"><img src="/sbzx-web/apps/images/public/bread-back.png">返回</a>';
    }
    $('#breadcrumb-Nav').html(html);

};
header.bindCrumbsEvent = function () {
  var _this = this;
  var userInfo = mini.decode(sessionStorage.getItem('getUserInfo')) || {};
  var userType = userInfo.userType;//01企业、02个人
  // var userType = '01';//01企业、02个人 -----用于本地测试
  $('body').on('click', '#breadcrumb-Nav a', function () {
    var type = $(this).attr('data-type');
    if(type === 'home'){
      window.location.href = _this.homeUrl;
    }else if(type === 'second'){
      var code = '';
      if(userInfo.NsrInfo && userInfo.NsrInfo.byhBz === '2'){//报验户
        code = '42020';
      }else if(userType === '03' || (userInfo.NsrInfo && userInfo.NsrInfo.byhBz === '3')){//社保户 和 跨区域税源户
          window.location.href = header.homeUrl;
          return;
      }else if(userType === '01'){//企业
        code = '22005';
      }else if(userType === '02'){//个人
        code = '12020';
      }

      // if($(this).hasClass('back-btn')){
        window.location.href = header.secondUrl.replace(/\{code\}/g, code);
      // }
    }
  })
};

/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/21
 * Time：16:00
 *
 */

var xmlUtil = function () {
    // IE浏览器下 xmlDocument的不同版本
    var xmlDomVersions = ['MSXML2.DOMDocument.6.0', 'MSXML2.DOMDocument.3.0', "MSXML2.DOMDocument", 'Microsoft.XMLDOM'];
    // 将xml字符串载成xmlDocument
    var _turnStrToXml = function (xmlString) {
        var xmlDoc = null;
        //支持IE浏览器
        if (Tools.isIE && !window.DOMParser) {
            for (var i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                } catch (e) {
                    console.log('IE下解析XML字符串出错');
                }
            }
        }
        //非ie浏览器 , window.DOMParser 判断是否是非ie浏览器
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                xmlDoc = (new DOMParser()).parseFromString(xmlString, 'text/xml');
            } catch (e) {
                console.log('非IE下解析XML字符串出错');
            }
        }
        else {
            return null;
        }

        return xmlDoc;
    };

    //解析XML文件
    var _loadXmlFile = function (xmlFile) {
        var xmlDoc = null;
        if (Tools.isIE && !window.DOMParser) {
            if (typeof arguments.callee.activeXString != 'string') {
                for (var i = 0; i < xmlDomVersions.length; i++) {
                    try {
                        new ActiveXObject(xmlDomVersions[i]);
                        arguments.callee.activeXString = xmlDomVersions[i];
                        break;
                    } catch (ex) {
                        //TODO
                    }
                }
            }
            xmlDoc = new ActiveXObject(arguments.callee.activeXString);
        }
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* document.implementation.createDocument('','',null); 方法的三个参数说明
                 * 第一个参数是包含文档所使用的命名空间URI的字符串；
                 * 第二个参数是包含文档根元素名称的字符串；
                 * 第三个参数是要创建的文档类型（也称为doctype）
                 */
                xmlDoc = document.implementation.createDocument('', '', null);
            } catch (e) {
                //TODO
            }
        }
        else {
            xmlDoc = null;
        }

        if (xmlDoc != null) {
            try {
                xmlDoc.async = false;
                xmlDoc.load(xmlFile);
            } catch (e) {
                //TODO
            }

        } else {
            console.log('加载的xml文件为空')
        }
        return xmlDoc;
    };

    //加载本地xml文件
    var _loadFileByPath = function (path, type) {
        var result = {};
        var _type = arguments.length == 2 ? arguments[1] : 'xml';
        $.ajax({
            url: path,
            type: 'GET',
            cache: false,
            dataType: _type,
            async: false,
            success: function (data) {
                result = data;
                if (Tools.isIE) {
                    try{
                        result.childNodes[0].xml = _loadXmlFile(path).xml;
                    }
                    catch (e){
                        //TODO
                    }
                }
            },
            error: function () {
                console.log('ajax请求本地xml文件失败');
            }
        });
        return result;
    };
    // xmldocument转成xml字符串
    var _turnXmlToStr = function (XMLDOM) {
        var xml;
        if ('XMLSerializer' in window) {
            if (Tools.isIE && Tools.browser.ie ==9) {
                xml = $(XMLDOM).children()[0].xml || new XMLSerializer().serializeToString($(XMLDOM).children()[0]);
            } else {
                xml = new XMLSerializer().serializeToString($(XMLDOM).children()[0]);
            }
        } else if (Tools.isIE) {
            xml = $(XMLDOM).children()[0].xml;
        }
        else {
            xml = $(XMLDOM).children()[0].outerHTML;
        }
        !xml && alert('XMLDocument转成String出错，请使用谷歌浏览器重试，或者请联系运维人员！');
        return xml;
    };


    /**
     *xml对象转json对象
     *xmlDom:xmlDocument 对象，必选参数
     *nodeName:节点路径('ROOT/ITEM') ，可选参数
     *isArray:true,强制返回数组对象，可选参数
     **/
    var _turnXmlToJson = function (xmlDom, nodeName, isArray) {
        var obj = [], // nodeName 'ROOT/ITEM'，在xml中找到对应的 xml 节点
            targetObj = {}, // xml 最终生成的目标 json
            nodeNames = ''; // 是否传入nodeName 'ROOT/ITEM'

        //递归解析xml 转换成json对象
        var getAllAttr = function (node) {
            var nodeObj = {}, // 存储 xml节点对应的 object
                nodeChild = [], // 存储 非文本节点
                nodeAttr = node.attributes, //节点的属性
                childLength,        // 子节点的长度
                attrLength = nodeAttr.length;  // 节点属性的长度

            for (var i = 0; i < node.childNodes.length; i++) {
                // 过滤掉文本节点
                if (node.childNodes[i].nodeName != '#text') {
                    nodeChild.push(node.childNodes[i]);
                }
            }
            // 新的节点数组的长度
            childLength = nodeChild.length;

            if (childLength > 0 || attrLength > 0) {
                // 如果节点有属性设置
                if (nodeAttr && nodeAttr != undefined) {
                    for (var j = 0; j < attrLength; j++) {//解析xml节点属性

                        nodeObj[nodeAttr[j].nodeName] = nodeAttr[j].nodeValue;
                    }
                }
                for (var k = 0; k < childLength; k++) {//解析xml子节点

                    var _nodeName = nodeChild[k].nodeName;


                    if (nodeObj[_nodeName] && nodeObj[_nodeName] != undefined) {//如果有重复的节点需要转为数组格式
                        if (!(nodeObj[_nodeName] instanceof Array)) {

                            nodeObj[_nodeName] = [nodeObj[_nodeName]];//如果该节点出现大于一个的情况 把第一个的值存放到数组中
                        }
                    }
                    var _nodeValue = getAllAttr(nodeChild[k]);
                    try {
                        nodeObj[_nodeName].push(_nodeValue);
                    } catch (e) {
                        nodeObj[_nodeName] = _nodeValue;
                        nodeObj["length"] = 1;
                    }
                }
            } else {
                nodeObj = (node.textContent == undefined) ? node.text : node.textContent;
            }
            return nodeObj;
        };
        // 如果有参数指定了节点名字
        if (nodeName) {
            if (nodeName.indexOf("/") != -1) {
                nodeNames = nodeName.split("/");
            } else {
                nodeNames = nodeName;
            }
        } else {
            obj = xmlDom;
        }
        // 将节点名压入数组
        for (var i = 0; i < nodeNames.length; i++) {
            obj.push($(xmlDom).find(nodeNames[i]));
        }
        // 节点数组循环转换成json
        $(obj).each(function (key, item) {

            // 如果目标json中已经存在该节点，将该节点转成 array，继续压入相同的节点
            if (targetObj[item.nodeName] && targetObj[item.nodeName] != undefined) {

                if (!(targetObj[item.nodeName] instanceof Array)) {

                    targetObj[item.nodeName] = [targetObj[item.nodeName]];
                }

                targetObj[item.nodeName].push(getAllAttr(item));

            } else { // 如果目标json中不存在该节点，则压入

                if (nodeNames.length > 0) {

                    targetObj[item.nodeName] = getAllAttr(item);
                } else {

                    targetObj[item.firstChild.nodeName] = getAllAttr(item.firstChild);
                }
            }
        });

        if (nodeNames.length > 1) {

            targetObj = targetObj[nodeNames[nodeNames.length - 1]];
        }
        // 根据参数isArray ，是否将 对象转成数组
        if (isArray && !(targetObj instanceof Array) && targetObj) {

            targetObj = [targetObj];
        }
        return targetObj;

    };
    return {
        //加载本地xml文件得到xmlDocument 对象:  path, type
        loadFileByPath: function () {
            return _loadFileByPath.apply(this, arguments);
        },
        // xmlDocument 对象 转成 xmlStr 字符串
        turnXmlToStr: function () {
            return _turnXmlToStr.apply(this, arguments);
        },
        // xmlStr字符串 加载成 XMLDocument 对象
        turnStrToXml: function () {
            return _turnStrToXml.apply(this, arguments);
        },
        // xmlDocument 对象转json （xml,nodeName,isArray）
        turnXmlToJson: function () {
            return _turnXmlToJson.apply(this, arguments);
        }
    }
}();
/**
 * Created by chenjunj on 2017/11/30 16:49.
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
        root.hdxxUtil = factory();
    }
}(this, function () {
    var hdxxUtil = {
        hdxxStore: null,//缓存核定--刷新页面要重新取
        hdxxUrl: '../../../api/sb/common/get/hdxx',//取核定的接口
        jkUrl: '',//缴款链接
        sbjgcxUrl:'../sbjgcx/sbjgcx.html',//申报结果查询链接
        showJkLink: true,//重复申报时是否显示缴款链接
        showSbjgcxLink: true,//重复申报时是否显示申报结果查询链接
        getHdxx:function () {
            var hdxxData = null;
            if(this.hdxxStore){
                return this.hdxxStore;
            }
            if(hdxxData === null){
                var url = this.hdxxUrl;
                var params = {};
                var sbzlDm = Tools.getUrlParamByName('sbzlDm') || Tools.getUrlParamByName('code') || '';
                var sbny = Tools.getUrlParamByName('sbny') || '';
                var isYqsb = Tools.getUrlParamByName('yqsb') || '';
                var isQssb = Tools.getUrlParamByName('qssb') || '';
                if (sbzlDm) {
                    params.sbzlDm = sbzlDm;
                    params.sbny = sbny;
                }
                if (isYqsb){
                    params.sblx = '01';
                }
                if (isQssb){
                    params.sblx = '41';
                }
                mini.mask('期初数据获取中...');
                var _this = this;
                ajax.post(url, mini.encode(params), function (data) {
                    // 返回成功，且有数据
                    if(data.success && data.value){
                        if(data.value.sbzl[0].qccgbz === 'N'){
                            var msg = data.value.sbzl[0].qccgbzms;
                            mini.alert(msg,'提示',function () {
                                window_close();
                            });
                        }else {
                            hdxxData = data.value;
                            _this.hdxxStore = data.value;
                        }
                    }else{
                        var msg = data.message;
                        if(msg.indexOf('重复申报') !== -1){
                            if(_this.showJkLink && _this.jkUrl){
                                msg = msg + '<br/><a class="goToPay" href="'+_this.jkUrl+'">去缴款>></a>';
                            }
                            if(_this.showSbjgcxLink && _this.sbjgcxUrl){
                                msg = msg + '<br/><a class="goToPay" href="'+_this.sbjgcxUrl+'">申报结果查询>></a>';
                            }
                        }
                        mini.alert(msg,'提示',function () {
                            window_close();
                        });
                        return false;
                    }
                },function (data) {
                    mini.alert(data.message,'提示',function () {
                        window_close();
                    });
                    return false;
                });
                mini.unmask();
            }
            return hdxxData;
        },
        getSbzlNode:function () {
            return _getSbzlNode.apply(this,arguments)
        },
        getWsxxValueByCode:function (code,sbzlnode) {
            return _getValueByCode(code,sbzlnode,'wsxx');
        },
        getLsxxValueByCode:function (code,sbzlnode) {
            return _getValueByCode(code,sbzlnode,'lsxx');
        },
        getSbny:function () {
            return _getSbny.apply(this,arguments);
        }
    };
    var _getSbny = function() {
        var d = new Date();
        return d.getLastDateOfPrevMonth().format('yyyyMM');
    };
    // 核定信息中的申报种类节点
    var _getSbzlNode = function (hdxxData) {
        var hdxx = null;
        if(!!hdxxData){
            hdxx = hdxxData;
        }else{
            hdxx = hdxxUtil.getHdxx();
        }
        if(!!hdxx && !!hdxx.sbzl && hdxx.sbzl.length==1){

            return hdxx.sbzl[0];

        }else{
            return null;
        }
    };
    // 获取wsxx,lsxx节点下的某个值
    var _getValueByCode=function (code,sbzlnode,type) {

        var sbzl=null;
        if(!!sbzlnode){
            sbzl = sbzlnode;
        }else{
            sbzl = _getSbzlNode();
        }
        // 根据参数type判断是wsxx还是lsxx
        if(!!sbzl && !!sbzl[type+'s'] && !!sbzl[type+'s'][type]){
            var list = sbzl[type+'s'][type];
            var value=null;
            for (var i = 0; i < list.length; i++) {
                if(list[i].code == code){
                    value = list[i].value;
                    break;
                }
            }
            return value;
        }
    };
    return hdxxUtil;
}));
/**
 * Created by chenjunj on 2017/11/30 16:49.
 */
hdxxUtil.jkUrl = '/sbzx-web/apps/views/gdsJk/jk_jsxxcx.html';
hdxxUtil.sbjgcxUrl = '/sbzx-web/apps/views/gdsSbjgcx/sbjgcx.html';
if(window.location.href.indexOf('clientType=zzzd') > -1 || localStorage.getItem('clientType') === 'zzzd'){
    hdxxUtil.sbjgcxUrl = '/sbzx-web/apps/views/sbjgcx_zzzd/sbjgcx.html';
}
hdxxUtil.getHdxx = function () {
    var hdxxData = null;
    if(this.hdxxStore){
        return this.hdxxStore;
    }
    if(hdxxData === null){
        var url = this.hdxxUrl;
        var params = {};
        var sbzlDm = Tools.getUrlParamByName('sbzlDm') || Tools.getUrlParamByName('code') || '';
        var sbny = Tools.getUrlParamByName('sbny') || '';
        var isYqsb = Tools.getUrlParamByName('yqsb') || '';
        var isQssb = Tools.getUrlParamByName('qssb') || '';
        if (sbzlDm != '') {
            params.sbzlDm = sbzlDm;
            params.sbny = sbny;
        }
        if (isYqsb){
            params.sblx = '01';
        }
        if (isQssb){
            params.sblx = '41';
        }
        /*河北特色点---begin：附加税接口修改，同时增加参数ythsbbz*/
        if(sbzlDm === '10115' || sbzlDm === '10116'){
            url = '/sbzx-web/api/sb/fjs/hdxx';
            if(Tools.getUrlParamByName('reportWithSbzlDm')){
                params.ythsbbz = 'Y';
            }else{
                params.ythsbbz = 'N';
            }
        }
        /*河北特色点---end：附加税接口修改，同时增加参数ythsbbz*/
        mini.mask('期初数据获取中...');
        var _this = this;
        ajax.post(url, mini.encode(params), function (data) {
            // 返回成功，且有数据
            if(data.success && data.value){
                if(data.value.sbzl[0].qccgbz === 'N'){
                    var msg = data.value.sbzl[0].qccgbzms;
                    mini.alert(msg,'提示',function () {
                        window_close();
                    });
                }else {
                    hdxxData = data.value;
                    _this.hdxxStore = data.value;
                }
            }else{
                var msg = data.message;
                if(msg.indexOf('重复申报') !== -1 || msg.indexOf('[80492219]') !== -1){
                    if(_this.showJkLink && _this.jkUrl){
                        msg = msg + '<br/>如需缴款，请到<a class="goToPay" href="javascript:void(0);">查询缴款</a>';
                        msg = msg + '<br/>如需查看已申报信息，请到“<a class="goToPay" href="'+_this.sbjgcxUrl+'">申报结果查询/作废</a>”进行查看';
                    }
                }
                mini.alert(msg,'提示',function () {
                    window_close();
                });
                return false;
            }
        },function (data) {
            mini.alert(data.message,'提示',function () {
                window_close();
            });
            return false;
        });
        mini.unmask();
    }
    return hdxxData;
};
/**
 * copy from sbcommon.js by chenjunj for normal report
 * */
var sbcommon = {};
/**
 * 正常框架申报提交
 * @param {Object} request 请求参数
 * @return {boolean}
 * */
sbcommon.sbtj_normal = function (request) {
    /*request.jsonData = {//用于本地测试
        htmlData: request.sbformdata,
        formulaData: request.formulaData
    };
    localStorage.setItem('tempsaveData-'+request.sbzlDm,mini.encode(request));//用于本地测试
    return true;//用于本地测试*/
    var url = '/sbzx-web/api/sb/common/submit/sbcl';
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架申报提交
 * @param {Object} request 请求参数
 * @return {boolean}
 * */
sbcommon.sbtj_year = function (request) {
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/submit/sbcll/zlk';
    return Api.getIfSuccess(url, request);
};
/**
 * 正常框架申报暂存
 * @param {Object} request 请求参数
 * @return {boolean}
 * */
sbcommon.tempSave_normal = function (request) {
    // localStorage.setItem('tempsaveData-'+request.sbzlDm,mini.encode(request));//用于本地测试
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/fnb/sbzc';
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架申报暂存
 * @param {Object} request 请求参数
 * @return {boolean}
 * */
sbcommon.tempSave_year = function (request) {
    // sessionStorage.setItem('tempsaveData',mini.encode(request));//用于本地测试
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/nb/sbzc';
    return Api.getIfSuccess(url, request);
};

/**
 * 年报框架单表保存（单表暂存也用该方法）
 * @param {Object} request 请求参数
 * @return {boolean}
 * */
sbcommon.singleSave_year = function (request) {
    /*localStorage.setItem('tempsaveData-'+request.bbid,mini.encode(request));//用于本地测试
    return true;//用于本地测试*/
    var url = '/sbzx-web/api/sb/common/nb/sbbc';
    return Api.getIfSuccess(url, request);
};

/**
 * 正常框架获取暂存数据
 * @param {Object} request 请求参数
 * @return {object}
 * */
sbcommon.getResumeData_normal = function (request) {
    // return mini.decode(localStorage.getItem('tempsaveData-'+request.sbzlDm));//用于本地测试
    var url = '/sbzx-web/api/sb/common/fnb/getSbsj';
    return Api.getData(url, request);
};

/**
 * 年报框架获取暂存数据
 * @param {Object} request 请求参数
 * @return {object}
 * */
sbcommon.getResumeData_year = function (request) {
    // return localStorage.getItem('tempsaveData-'+request.bbid);//用于本地测试
    var url = '/sbzx-web/api/sb/common/nb/getSbsj';
    return Api.getData(url, request);
};

/**
 * 年报框架获取列表数据
 * @param {Object} request 请求参数
 * @return {object}
 * */
sbcommon.getListData = function (request) {
    var url = '/sbzx-web/api/sb/common/initrules';
    return Api.getData(url, request);
};
/**
 * 年报框架查看时获取列表数据
 * @param {Object} request 请求参数
 * @return {object}
 * */
sbcommon.getPreviewListData = function (request) {
    var url = '/sbzx-web/api/sb/jgcx/getYtxsblb';
    return Api.getData(url,request,'post',true);
};
/**
 * 年报框架更新列表数据
 * @param {Object} request 请求参数
 * @return {boolean}
 * */
sbcommon.updateListData = function (request) {
    // return true;//用于本地测试
    return false;
    var url = '/sbzx-web/api/sb/common/updaterules';
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架删除单表数据
 * @param {Object} request 请求参数
 * @return {boolean}
 * */
sbcommon.deleteSingleTableData = function (request) {
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/sbzc/detelesbb';
    return Api.getIfSuccess(url, request);
};
/**
 * 年报框架获取需要特殊处理且页面sb_data中没有的j3报文
 * @param {Object} request 请求参数
 * @return {Array}
 * */
sbcommon.getResumeJ3Xmls = function (request) {
    var url = '/sbzx-web/api/sb/common/getJ3xml/tscl';
    return Api.getData(url, request);
};
/**
 * 更正申报--获取更正申报的申报信息（包括核定、申报报文）
 * @param {Object} request 请求参数
 * */
sbcommon.getCorrectData = function (request) {
    var url = '/sbzx-web/api/sb/gzsb/get/gzsbHdxx';
    return Api.getData(url, request, 'post', true);
};
/**
 * 获取特定税种的核定
 * @param {String} sbzlDm 申报种类代码
 * @param {String} sbny 申报年月
 * @param {Boolean} showErrMsg 是否提示错误信息
 * @return {Object}
 * */
sbcommon.getHdBySbzlDm = function (sbzlDm,sbny,showErrorMsg) {
    sbny = sbny || '';
    showErrorMsg = !!showErrorMsg;
    // return {sbzlDm:'10115'};//用于本地测试
    var url = '/sbzx-web/api/sb/common/get/hdxx';
    var request = {
        sbzlDm: sbzlDm,
        sbny: sbny
    };
    var hd = null;
    ajax.post(url, mini.encode(request), function (response) {
        if(response.success){
            hd = response.value;
        }else if(showErrorMsg){
            mini.alert(response.message);
        }
    }, function (response) {
        if(showErrorMsg){
            mini.alert(response.message);
        }
    });
    if(hd && hd.sbzl && hd.sbzl instanceof Array && hd.sbzl.length === 1){
        return hd.sbzl[0];
    }
    return null;
};
/**
 * 批量申报提交
 * */
sbcommon.sbtj_batch = function (request) {
    // return true;//用于本地测试
    var url = '/sbzx-web/api/sb/common/batch/sbcl';
    return Api.getIfSuccess(url, request);
};
/**
 * 比对
 * */
sbcommon.ycsCheck = function (request) {
    var url = '/sbzx-web/api/sb/sbbd/zzsbd';
    return Api.getData(url, request);
};
/**
 * 判断redis中是否存在缓存
 * @param request
 * @returns {*|Object}
 */
sbcommon.hasCache = function (request) {
    var url = '/sbzx-web/api/sb/common/hdxx/canBeRemove';
    return Api.getData(url, request, 'post', false);
};
/**
 * 清除redis缓存
 * @param request
 * @returns {*|boolean}
 */
sbcommon.redisRefresh = function (request) {
    var url = '/sbzx-web/api/sb/common/remove/hdxx';
    return Api.getIfSuccess(url, request);
};
/**
 * Created by chenjunj on 2018/9/9 20:43.
 */
sbcommon.getHdBySbzlDm = function (sbzlDm,sbny,showErrorMsg) {
    sbny = sbny || '';
    showErrorMsg = !!showErrorMsg;
    // return {sbzlDm:'10115'};//用于本地测试
    var url = '/sbzx-web/api/sb/common/get/hdxx';
    var request = {
        sbzlDm: sbzlDm,
        sbny: sbny
    };
    /*河北特色点---begin：附加税接口修改，同时增加参数ythsbbz*/
    if(sbzlDm === '10115' || sbzlDm === '10116'){
        url = '/sbzx-web/api/sb/fjs/hdxx';
        if((window.servyouReport && sbzlDm === window.servyouReport.reportWithNext.getHdByDM)//消费税8大类加小规模填表式
            || (window.yearReport && sbzlDm === window.yearReport.reportWithNext.getHdByDM)//一般纳税人
            || (location.href.indexOf('xgmsb-yds_new/xgmsb.html') !== -1)){//小规模引导式
            request.ythsbbz = 'Y';
        }else{
            request.ythsbbz = 'N';
        }
    }
    /*河北特色点---end：附加税接口修改，同时增加参数ythsbbz*/
    var hd = null;
    ajax.post(url, mini.encode(request), function (response) {
        if(response.success){
            hd = response.value;
        }else if(showErrorMsg){
            mini.alert(response.message);
        }
    }, function (response) {
        if(showErrorMsg){
            mini.alert(response.message);
        }
    });
    if(hd && hd.sbzl && hd.sbzl instanceof Array && hd.sbzl.length === 1){
        return hd.sbzl[0];
    }
    return null;
};
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：17:45
 *
 */

var Api = {
    /**
     * 代码转名称的api接口映射
     * */
    dmToMcMap: {
        'hy': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_HY?dm=',//取 行业 名称
        'djzclx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_DJ_DJZCLX?dm=',//取 登记注册类型 名称
        'zzsqylx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_ZZSQYLX?dm=',//取 增值税企业类型 名称
        'swjg': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG_GT3?dm=',//取 税务机关 名称
        'ds_swjg': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG_DS?dm=',//取 税务机关 名称
        'yhhb': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_YHHB?dm=',//取 银行行别 名称
        'qgxzqh': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_QGXZQH?dm=',//取 全国行政区划 名称
        'sfzjlx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SFZJLX?dm='//取 身份证件类型 名称
    },
    getUrl: function (obj, name) {
        for (var url in obj) {
            if (url == name) {
                return obj[name];
                break;
            }
        }
        return this;
    },
    replaceUrl: function (url,name, data) {
        var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
        url = url.replace(reg, function(_, item) {
            if(typeof data=='object'){
                return eval('data.' + item);
            }else if(typeof data=='string'){
                return item
            }else if(typeof data=='array'){
                return eval('data[' + item + ']');
            }

        });
        return url;
    },
    /**
     * 获取数据接口（适用于只取返回数据的接口）
     * @param {string} url 接口地址
     * @param {object} request 请求数据对象
     * @param {string} type http请求类型post/get
     * @param {boolean} errorToClose 报错是否关闭页面
     * @return {object}
     * */
    getData: function (url,request,type,errorToClose) {
        var result = null;
        if(!url){
            return result;
        }
        request = request?request:{};
        type = type?type.toLowerCase():'post';
        errorToClose = !!errorToClose;
        var _this = this;
        if(type === 'post'){
            ajax.post(url, mini.encode(request), function (response) {
                if(response.success){
                    result = response.value;
                }else{
                    mini.alert(response.message,'提示',function () {
                        errorToClose && _this.closeWindow();
                    });
                }
            }, function (response) {
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            });
        }else{
            ajax.get(url,mini.encode(request), function (response) {
                result = response;
            }, function (response) {
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            })
        }

        return result;
    },
    /**
     * 获取接口返回成功与否（适用于只取返回数据中success字段的接口）
     * @param {string} url 接口地址
     * @param {object} request 请求数据对象
     * @param {boolean} errorToClose 报错是否关闭页面
     * @return {boolean}
     * */
    getIfSuccess: function (url, request,errorToClose) {
        var result = false;
        if(!url){
            return result;
        }
        errorToClose = !!errorToClose;
        var _this = this;
        ajax.post(url, mini.encode(request), function (response) {
            if(response.success){
                result = true;
            }else{
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            }
        }, function (response) {
            mini.alert(response.message,'提示',function () {
                errorToClose && _this.closeWindow();
            });
        });
        return result;
    },
    /**
     * 获取纳税人存款账户信息
     * */
    getNsrckzhxx: function () {
        var url = '/sbzx-web/api/base/nsrckzhxx/get';
        var obj = this.getData(url,null,'get');
        if(!obj || !obj.value){
            return null;
        }
        return obj.value;
    },
    /**
     * 通过代码获取名称
     * */
    getMcByDm: function (type, dm) {
        var url = this.dmToMcMap[type]+dm;
        if(!url){
            return '';
        }
        var obj = this.getData(url,null,'get');
        if(!obj){
            return '';
        }
        return obj.MC;
    },
    /**
     * 关闭页面
     * */
    closeWindow: function () {
        if (window.CloseOwnerWindow)
            return window.CloseOwnerWindow();
        else
            window_close();
    },
    setWdFormValue: function (key, value) {
        try{
            Form.Set(key, value);
        }catch (e){

        }
    },
    getWdFormValue: function (key) {
        var result = null;
        try{
            result = Form.Get(key);
        }catch (e){

        }
        return result;
    },
    getDsNsrxxVo: function () {
        return this.getData('/sbzx-web/api/sb/common/dsnsrxx/get', {});
    }
};

if(mini){
    //ajax重写
    mini.ajax = function (options) {
        if (!options.dataType) {
            options.dataType = "text";
        }
        if(!(options.sender && $(options.sender.el).hasClass('mini-datagrid'))){
            options.isMini = 'Y';
        }
        options.async = false;
        return window.jQuery.ajax(options);
    };
}
var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);
