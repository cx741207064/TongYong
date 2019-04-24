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
