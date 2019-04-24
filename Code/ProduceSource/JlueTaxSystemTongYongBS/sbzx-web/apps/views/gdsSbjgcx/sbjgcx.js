var sbjgcx = {
  linkUrl: '../../data/url/urlMap.json',//申报页面链接的url路径
  searchUrl: '/sbzx-web/api/sb/jgcx/sbqkcx',//查询的API接口
  searchDSxxUrl: '/sbzx-web/api/hb/ds/sb/sbqkcx',//查询地税申报结果的API接口
  zfUrl: '/sbzx-web/api/sbzf/submit/sbzf',//作废的API接口
  zfUrlDs: '/sbzx-web/api//hb/ds/submit/dsSbzf',//地税作废的接口
    sbfUrl:'/sbzx-web/api/sb/shbx/submit/sbzf', //社保费作废接口
  urlMap: {},
  nsrData: nsrxxUtil.getNsrxxVO(),
  // nsrData: {"djxh":"10111305000111111003","nsrsbh":"650111222333003","shxydm":null,"yxbz":"Y","ynsrsbh":null,"gdslxDm":"1","ssdabh":"10111303000056113546","nsrmc":"税友软件集团股份有限公司","djzclxDm":"159","scjydz":"秦皇岛市海港区河北大街141号（项好电子城三楼369号）","scjydzxzqhszDm":"130300","nsrztDm":"09","hyDm":"7010","zcdz":"秦皇岛市海港区河北大街141号（项好电子城三楼369号）","zcdzxzqhszDm":"130300","jdxzDm":"130302001","dwlsgxDm":null,"gdghlxDm":"3","zgswjDm":"16500000000","zgswskfjDm":"16500000000","ssglyDm":"16500000000","lrrDm":"11303000034","lrrq":"2009-10-09T10:45:10","xgrDm":"11303000178","xgrq":"2014-03-14T10:14:32","zzjgDm":"196210230","sjgsdq":"16500000000","djrq":"2016-10-09T00:00:00","djjgDm":"11311211000","nsrZy":null,"kzztdjlxDm":"1110","fddbrxm":"frxm","fddbrsfzjlxDm":"201","fddbrsfzjhm":"231026198105085834","kqccsztdjbz":"N","fjmqybz":"N","swdjblbz":"Y","sjtbSj":null,"nsrxxKzVO":{"djxh":"10111305000111111003","zcdlxdh":"5548253","zcdyzbm":"064004","scjydlxdh":"13933362897","scjydyzbm":"064004","hsfsDm":null,"cyrs":null,"wjcyrs":null,"hhrs":null,"ggrs":"0","gdgrs":null,"zzjglxDm":null,"wz":null,"hyf1Dm":null,"hyf2Dm":null,"hyf3Dm":null,"swdlrlxdh":null,"swdlrdzxx":null,"zczb":null,"tzze":null,"zrrtzbl":null,"wztzbl":null,"gytzbl":null,"lrrDm":"11302001388","lrrq":"2008-03-05T14:53:30","xgrDm":"11302001385","xgrq":"2013-06-25T11:23:15","gykglxDm":null,"sjgsdq":"11302086300","sjgsrq":null,"zfjglxDm":"0","bzfsDm":"1","cwfzrxm":"cwfzrxm","cwfzrsfzjzlDm":null,"cwfzrsfzjhm":null,"cwfzrgddh":null,"cwfzryddh":"15267155246","cwfzrdzxx":null,"bsrxm":"bsrxm","bsrsfzjzlDm":null,"bsrsfzjhm":null,"bsrgddh":null,"bsryddh":"15267155245","bsrdzxx":null,"swdlrnsrsbh":null,"swdlrmc":null,"kjywrzgswjgDm":null,"kjywrzgswskfjDm":null,"kjywrssglyDm":null,"stfzgswjgDm":null,"stfzgswskfjDm":null,"stfssglyDm":null,"fddbrhfzrhyzgddh":null,"fddbrhfzrhyzyddh":null,"fddbrhfzrhyzdzxx":null,"lsswdjyxqq":"2008-03-05T00:00:00","lsswdjyxqz":"9999-12-31T00:00:00","kjzdzzDm":"101","hjszd":null,"jyfw":"木器家具零售","fddbrgddh":"0571-8586163","fddbryddh":"15267155247","fddbrdzxx":null,"whsyjsfjfxxdjbz":"N","zzsjylb":null,"yhsjnfsDm":null,"zsxmcxbzDm":null,"zzsqylxDm":"2","gjhdqszDm":"156","ygznsrlxDm":"11","sjtbSj":"2015-01-31T19:59:58"}},
  yearReportSbzlDmArr: ['10101', '10110', '10440', '10437', "10438", "10448"],
  defaultTimerTemp: 10,//两次查询的时间间隔，单位秒
  timerTemp: 10,//两次查询的时间间隔，单位秒
  szlbData: [
    {ID: "10101", MC: "增值税"},
    {ID: "10102", MC: "消费税"},
    {ID: "10104", MC: "企业所得税"},
    {ID: "29800", MC: "财务报表"},
    {ID: "30217", MC: "文化事业建设费"},
    {ID: "10106", MC: "储蓄存款"},
    {ID: "30175", MC: "废旧电子"},
    //地税税种
    // {ID: "10106", MC: "个人所得税"},
    {ID: "10107", MC: "资源税"},
    {ID: "10109", MC: "城市维护建设税"},
    {ID: "10110", MC: "房产税"},
    {ID: "10111", MC: "印花税"},
    {ID: "10112", MC: "城镇土地使用税"},
    {ID: "10113", MC: "土地增值税"},
    {ID: "10114", MC: "车船税"},
    {ID: "10120", MC: "烟叶税"},
    {ID: "10121", MC: "环境保护税"},
    {ID: "10201", MC: "企业职工基本养老保险基金收入"},
    {ID: "10202", MC: "失业保险基金收入"},
    {ID: "30142", MC: "残疾人就业保障金"},
    {ID: "30203", MC: "教育费附加"},
    {ID: "30216", MC: "地方教育附加"},
    {ID: "30218", MC: "残疾人就业保障金"},
    {ID: "10701", MC: "非税收入"},
    {ID: "39900", MC: "其他收入"}
    //{ID: "10110", MC: "房产税"},
    //{ID: "10112", MC: "城镇土地使用税"}
  ],
  sbztData: [
    {MC: '申报成功', ID: '0000'},
    {MC: '申报失败', ID: '1000'},
    {MC: '申报作废', ID: '3000'}
  ],
  initSearchInfo: function () {	//初始化搜索条件
    var firstDay = new Date().getFirstDateOfMonth('yyyy-MM-dd');
    var today = new Date().format('yyyy-MM-dd');
    $.get("/getGDTXDate").then(function(obj){
      firstDay=obj.sbrqq;
      today=obj.sbrqz;
    });
    mini.get('sbrqq').setValue(firstDay);
    mini.get('sbrqz').setValue(today);
  },
  dateChanged: function (e) {		//日期大小校验
    var sbrqq = mini.get('sbrqq').getValue(),
      sbrqz = mini.get('sbrqz').getValue();
    if (!!sbrqq && !!sbrqz && sbrqz < sbrqq) {
      mini.alert("申报日期起不能大于申报日期止！");
      mini.get('sbrqz').setValue("")
    }
  },
  bindCxEvent: function () {		//绑定查询事件
    $(document).on('click', '#search-btn', function (e) {
      var form1 = new mini.Form('#sbjg');
      form1.validate();
      if (!form1.isValid()) {
        return;
      }
      if (!sbjgcx.checkSearchTime()) {
        return;
      }
      sbjgcx.sbjgAjax(true);
    })
  },
  getUrl: function () {
    ajax.get(this.linkUrl, '', function (data) {
      if (data) {
        sbjgcx.urlMap = data;
      }
    })
  },

  sblxRender: function (e) {
    if (e.value === '03') {
      return '更正申报';
    } else if (e.value === '11') {
      return '正常申报';
    } else if (e.value === '01'){
        return '逾期申报';
    }
  },
  sbztRenderer: function (e) {
    var value = e.value.substring(0, 2);
    if (value === '00') {
      return e.record.sbztms;
      // return '申报成功';
    } else if (value === '10') {
      return '申报失败';
    } else if (value === '20') {
      return '处理中';
    } else if (value === '30') {
      return '申报作废';
    } else if (value === '40') {
      return '已申报未处理';
    }
  },
  clickErrorReason: function (_uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    mini.alert(record.sbztms.replace(/\s+/g, ''));
  },
  clickHref: function (url, _uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    var sbxh = record.sbxh;
    var qqwjm = record.qqwjm;
    var zsZsxmDm = record.zsZsxmDm;
    var zsSbzlDm = record.zsSbzlDm;
    var sblxDm = record.sblxDm;
    if (sblxDm === '03') {
      mini.alert('重新更正请点击跳转到<a class="txt-blue" href="../gzsbcx/gzsbcx.html?v=' + new Date().getTime() + '_2.0.0">更正申报查询</a>页面！');
      return;
    }
    if (zsZsxmDm) {
      sessionStorage.setItem('zsSbzlDm', zsSbzlDm);
      sessionStorage.setItem('zsZsxmDm', zsZsxmDm);
      sessionStorage.setItem('sbxh', sbxh);
      sessionStorage.setItem('qqwjm', qqwjm);
    } else {
      sessionStorage.removeItem('zsSbzlDm');
      sessionStorage.removeItem('zsZsxmDm');
      sessionStorage.removeItem('sbxh');
      sessionStorage.removeItem('qqwjm');
    }
    window.open(url + '&v=' + new Date().getTime() + '_2.0.0');
  },
  clickZf: function (_uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    var sbxh = record.sbxh;
    var sbzlDm = record.sbzlDm;
    var zfInfo = {
      sbxh: sbxh
    };
    var msg = '是否确认作废本次申报？';
    if (this.sbzlDmReportWithFjs.indexOf(sbzlDm) !== -1) {
      msg = '根据税务机关的要求，如果您存在附加税，该功能将与附加税一起作废，您确认需要作废吗？';
    }
    mini.confirm(msg, "确认", function (res) {
      if (res === "ok") {
        mini.mask('作废中，请稍后...');
        //为作废加一个延时，避免遮罩无法弹出
        setTimeout(function () {
          ajax.post(sbjgcx.zfUrl, mini.encode(zfInfo), function (data) {
            mini.unmask();
            if (data.success) {
              mini.alert('作废成功！');
              sbjgcx.sbjgAjax()
            } else {
              mini.alert(data.message);
            }
          }, function (res) {
            mini.unmask();
            mini.alert(res.message, '提示');
          })
        }, 100);
      }
    });
  },
  clickYykk: function (_uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    var sbxh = record.sbxh;
    var initInfo = {
      sbxh: sbxh
    };
    ajax.get('/sbzx-web/api/kk/get/wjkxx', initInfo, function (data) {
      if (data.success && data.value) {
        if (data.value.sfyxyy === 'Y') {
          store.setSession('sbxh', sbxh);
          store.setSession('yysj', data.value.yysj || "");
          window.open('../yykk/yykk.html');
        } else {
          mini.alert("系统已经开始自动扣款，不允许预约扣款");
        }
      } else {
        data.value ? mini.alert(data.message) : mini.alert("返回数据为空！");
      }
    })

  },
  viewSbxml: function (_uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    var sbxh = record.sbxh;
    var qqwjm = record.qqwjm;
    var sbzlDm = record.sbzlDm;
    var sssqq = record.skssqq;
    var sssqz = record.skssqz;
    var sblxDm = record.sblxDm;
    var sbrq = record.sbrq;
    if (sbjgcx.yearReportSbzlDmArr.indexOf(sbzlDm) !== -1) {
      var url = sbjgcx.urlMap[sbzlDm]['url'];
      sessionStorage.setItem('year_record', mini.encode(record));
      Api.setWdFormValue('year_record', mini.encode(record));
      if (sblxDm === '03') {
        url += '&correct=Y&';
      } else if (sblxDm === '01'){
          url +=('&yqsb=Y&sbny='+sssqz.split('-')[0]+sssqz.split('-')[1]);
      }
      window.open(url + '&preview=Y');
      return;
    }
    mini.mask('查询中...');
    var cxInfo = {
      qqwjm: qqwjm,
      sbxh: sbxh
    };
    ajax.post('/sbzx-web/api/sb/jgcx/getsbbw', mini.encode(cxInfo), function (result) {
      var viewData = '';
      if (result.success && !!result.value) {
        viewData = mini.decode(result.value);
      } else {
        mini.alert(result.message);
        return;
      }
      var viewUrl;
      if(Number(sssqz.substr(0,4))>= 2019 && !!sbjgcx.urlMap[sbzlDm]['url_2019']){
        viewUrl = sbjgcx.urlMap[sbzlDm]['url_2019']+'&preview=Y';
      }else{
        viewUrl = sbjgcx.urlMap[sbzlDm]['url'] + '&preview=Y';
      }
      if (viewData.hasOwnProperty('xgmsb_zb')) {
        viewUrl = '/sbzx-web/apps/views/xgmsb-yds/xgmsb-view.html';
      } else if (sbzlDm === '10102' || sbzlDm === '10103') {
        viewUrl = '/sbzx-web/apps/views/xgmsb-tbs/xgmsb-tbs.html?sbzlDm=10102&preview=Y';
      }
      if(sbzlDm === '21150' && record.wbtbsbbz === 'Y'){
        viewUrl = viewUrl.replace('/sb_gdlh_ccs_dkdj/','/sb_gdlh_ccs_dkdj_wbxtjr/');
      }
      if (sblxDm === '01'){
          viewUrl +=('&yqsb=Y&sbny='+sssqz.split('-')[0]+sssqz.split('-')[1]);
      }
      mini.open({
        cls: "fixedWindowTop0",
        url: viewUrl,
        showMaxButton: false,
        allowResize: false,
        allowDrag: true,
        title: "申报表查看",
        width: 1220,
        height: 600,
        onload: function () {
          var iframe = this.getIFrameEl();
          if (viewData.hasOwnProperty('xgmsb_zb')) {
            viewData['sbrq'] = sbrq;
            iframe.contentWindow.xgmsbView.setViewData(viewData, qqwjm, sbrq, sssqq, sssqz);
          } else {
            iframe.contentWindow.servyouReport.preview(viewData, record);
          }
        }
      });
    });
    mini.unmask();
  },
  init: function () {
    this.initSearchInfo();
    this.getUrl();
    this.bindCxEvent();
    this.autoSearch();
  },
  autoSearch: function () {
    if (Tools.getUrlParamByName('autoSearch') === 'Y') {
      var filter = {
        zsxmDm: Tools.getUrlParamByName('zsxmDm'),
        sbrqq: Tools.getUrlParamByName('sbrqq'),
        sbrqz: Tools.getUrlParamByName('sbrqz'),
        sbztDm: Tools.getUrlParamByName('sbztDm'),
        skssqq: Tools.getUrlParamByName('skssqq'),
        skssqz: Tools.getUrlParamByName('skssqz')
      };
      $.each(filter, function (key, value) {
        if (!value) {
          return true;
        }
        mini.get(key).setValue(value);
      });
      this.sbjgAjax(false);
    }
  },
  /**
   * 校验当次查询与上次查询的时间间隔，用到cookie是为了在重开页面的情况下同样要做到校验
   * */
  checkSearchTime: function () {
    var lastSearchTime = $.cookie('lastSearchTime_sbjgcx_' + this.nsrData.djxh);
    if (!lastSearchTime) {
      return true;
    }
    var curSearchTime = new Date().getTime();
    var restTime = Math.floor(this.defaultTimerTemp - (curSearchTime - lastSearchTime) / 1000);//剩余时间
    if (restTime >= 0) {
      mini.alert((restTime + 1) + '秒后可再次查询');
      return false;
    }
    return true;
  },
  /**
   * 计时器
   * */
  runTimer: function () {
    this.timerTemp = this.defaultTimerTemp - 1;
    var txt = '秒后再查';
    $('#search-btn').text(this.timerTemp + 1 + txt);
    var _this = this;
    sbjgcx.timer = setInterval(function () {
      _this.timerTemp--;
      if (_this.timerTemp <= -1) {
        window.clearInterval(_this.timer);
        $('#search-btn').text('查询');
        $.removeCookie('lastSearchTime_sbjgcx_' + _this.nsrData.djxh);//删除cookie
        return;
      }
      $('#search-btn').text(_this.timerTemp + 1 + txt);
    }, 1000)
  },
  downloadPdf: function (_uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    var sbxh = record.sbxh;
    window.open('/sbzx-web/api/pdf/downloadPdf/' + sbxh);
  }
};
sbjgcx.gsData = [];
sbjgcx.dsData = [];
var griddata = [];
$(function () {
  $('body').show();
  header.init();
  sbjgcx.init();
});
//查询事件
sbjgcx.sbjgAjax = function (nsrClick) {
  var cxInfo = {
    zsxmDm: mini.get('zsxmDm').getValue(),
    sssqQ: mini.get('skssqq').getText(),
    sssqZ: mini.get('skssqz').getText(),
    sbrqQ: mini.get('sbrqq').getText(),
    sbrqZ: mini.get('sbrqz').getText(),
    sbztDm: mini.get('sbztDm').getValue()
  };
  //国税税种编号
  var gsSz = ["10101", "10102", "10104", "29800", "30217", "10106", "30175"];
  sbjgcx.gscx(cxInfo, nsrClick);
  //没选税种
  /*if(!cxInfo.zsxmDm){
    sbjgcx.gscx(cxInfo,nsrClick);
    sbjgcx.dscx(cxInfo,nsrClick);
  }
  else if($.inArray(cxInfo.zsxmDm ,gsSz) == -1){ //地税
    sbjgcx.dscx(cxInfo,nsrClick);
  }else{//国税
    sbjgcx.gscx(cxInfo,nsrClick);
  }

  griddata=sbjgcx.dsData.concat(sbjgcx.gsData);*/
  griddata = sbjgcx.gsData;
  if (griddata.length != 0) {
    mini.get('sbjgcx_grid').setData(griddata);
  } else {
    mini.get('sbjgcx_grid').clearRows();
    mini.alert('没有返回的数据！');
  }
};
//国税查询
sbjgcx.gscx = function (cxInfo, nsrClick) {
  ajax.post(this.searchUrl, mini.encode(cxInfo), function (data) {
    if (data.success) {
      sbjgcx.gsData = data.value;
      //mini.get('sbjgcx_grid').setData(data.value);
      if (nsrClick) {
        $.cookie('lastSearchTime_sbjgcx_' + sbjgcx.nsrData.djxh, new Date().getTime());
        sbjgcx.runTimer();
      }
    } else {
      mini.alert(data.message);
    }
  })
}
//地税查询
sbjgcx.dscx = function (cxInfo, nsrClick) {
  ajax.post(this.searchDSxxUrl, mini.encode(cxInfo), function (data) {
    if (data.success) {
      sbjgcx.dsData = data.value;
      if (nsrClick) {
        $.cookie('lastSearchTime_sbjgcx_' + sbjgcx.nsrData.djxh, new Date().getTime());
        sbjgcx.runTimer();
      }
    } else {
      mini.alert(data.message);
    }
  })
}

sbjgcx.sbzlDmReportWithFjs = [
  '10102', '10103',
  '10101', '10110',
  '10302',
  '10303',
  '10304',
  '10305',
  '10306',
  '10307',
  '10310',
  '10311',
  '10312',
  '10313',
  '10314',
  '10315',
  '10316',
  '10317',
  '10318',
  '10319'
];

sbjgcx.clickZf = function (_uid) {
  var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
  var sbxh = record.sbxh;
  var sbzlDm = record.sbzlDm;
  var zfInfo = {
    sbxh: sbxh
    ,sbzlDm: sbzlDm
  };
  var msg = '是否确认作废本次申报？';
  mini.confirm(msg, "确认", function (res) {
    if (res === "ok") {
      mini.mask('作废中，请稍后...');
      //为作废加一个延时，避免遮罩无法弹出
      setTimeout(function () {
        ajax.post(sbjgcx.zfUrl, mini.encode(zfInfo), function (data) {
          mini.unmask();
          if (data.success) {
            mini.alert('作废成功！');
            sbjgcx.sbjgAjax()
          } else {
            mini.alert(data.message);
          }
        }, function (res) {
          mini.unmask();
          mini.alert(res.message, '提示');
        })
      }, 100);
    }
  });
};
sbjgcx.glzf = function (zszUid) {
  var zszRecord = mini.get('sbjgcx_grid').getRowByUID(zszUid);
  var zszSbxh = zszRecord.sbxh;
  var zszSbzlMc = zszRecord.sbzlMc;
  var glzfRecords = sbjgcx.getGlzfList(zszSbxh);
  if (glzfRecords.length === 1) {
    mini.confirm('您作废' + zszSbzlMc + '时，将会同时将该税种的附加税一并作废，您确定要执行操作吗？', '请确认', function (action) {
      if (action === 'ok') {
        var request = {
          sbxh: glzfRecords[0].sbxh
        };
        mini.mask('作废中，请稍后...');
        ajax.post(sbjgcx.zfUrl, mini.encode(request), function (data) {
          mini.unmask();
          if (data.success) {
            mini.alert('作废成功！', "提示信息", function () {
              sbjgcx.sbjgAjax();
            });
          } else {
            mini.alert(data.message);
          }
        }, function (res) {
          mini.unmask();
          mini.alert(res.message, '提示');
        });
      }
    });
  }
};
sbjgcx.getGlzfList = function (sbxh) {
  var request = {
    sbxh: sbxh
  };
  var resultList = Api.getData('/sbzx-web/api/sbzf/get/glzfList', request);
  return resultList || [];
};
sbjgcx.gridBtn = function (e) {
  var record = e.record,
    sbzlDm = record.sbzlDm,
    value = e.value,
    str = '';
  var url = sbjgcx.urlMap[sbzlDm] && sbjgcx.urlMap[sbzlDm]['url'] ? sbjgcx.urlMap[sbzlDm]['url'] : '';
  var len = value ? value.length : 0;
  //2018_02_01切换申报中心的税种--财务报表
  var sbzlDms_2018_02_01 = ['29835', '29836', '29807', '29827', '29804', '29825', '29802', '29823', '29838', '29839', '29803',
      '29824', '29841', '29842', '29806', '29826', '29880'];
  //2018_05_01切换申报中心的税种--企税A月季报，企税B月季年报，储蓄利息5%，20%，废弃电子，文化事业，成品油，电池，涂料
  var sbzlDms_2018_04_30 = ['10416', '10418', '10417', '10419', '10421', '10601', '10602', '17701', '26501', '26502', '10304',
    '10314', '10310', '10318', '10311', '10319'];
  //2018_06_01 切换申报中心的税种--一般纳税人，消费税其他类，增值税预缴,'10117','10118'
  var sbzlDms_2018_06_01 = ['10101', '10110', '10306', '10316'];
  var bxfsbzlDm=['33001','33002','33003','33004','33009','33010','33011','33012','33013']

  for (var i = 0; i < len; i++) {
    if (value[i] === '01') {
      var oldPreviewUrl = sbjgcx.urlMap[sbzlDm] && sbjgcx.urlMap[sbzlDm]['url_old_preview'] ? sbjgcx.urlMap[sbzlDm]['url_old_preview'] : '';
      var sbrqTime = new Date(record.sbrq).getTime();
      //此处判断条件过长，分开写
      // if ((oldPreviewUrl && sbzlDms_2018_02_01.indexOf(sbzlDm) !== -1 && sbrqTime < new Date(2018, 1, 1, 0, 0, 0).getTime())
      //   || (oldPreviewUrl && sbzlDms_2018_04_30.indexOf(sbzlDm) !== -1 && sbrqTime < new Date(2018, 3, 30, 0, 0, 0).getTime())
      //   || (oldPreviewUrl && sbzlDms_2018_06_01.indexOf(sbzlDm) !== -1 && sbrqTime < new Date(2018, 5, 1, 0, 0, 0).getTime())) {
      //   str += '<span class="ml10"><a onclick="sbjgcx.viewSbxml_old(\'' + record._uid + '\')" class="txt-blue">查看申报表</a></span>';
      // } else {
      //   //其余走申报中心
      //   str += '<span class="ml10"><a onclick="sbjgcx.viewSbxml(\'' + record._uid + '\')" class="txt-blue">查看申报表</a></span>';
      // }

        if (sbjgcx.urlMap[sbzlDm]['url_yhs']) {//房产税只有从价的走一户式查询，从租使用自己的查看申报表
            //所有走一户式的
            str += '<span class="ml10"><a onclick="sbjgcx.viewSbxml_yhs(\'' + record._uid + '\')" class="txt-blue">查看申报表</a></span>';
        } else if ((oldPreviewUrl && sbzlDms_2018_02_01.indexOf(sbzlDm) !== -1 && sbrqTime < new Date(2018, 1, 1, 0, 0, 0).getTime())
          || (oldPreviewUrl && sbzlDms_2018_04_30.indexOf(sbzlDm) !== -1 && sbrqTime < new Date(2018, 3, 30, 0, 0, 0).getTime())
          || (oldPreviewUrl && sbzlDms_2018_06_01.indexOf(sbzlDm) !== -1 && sbrqTime < new Date(2018, 5, 1, 0, 0, 0).getTime())) {
          str += '<span class="ml10"><a onclick="sbjgcx.viewSbxml_old(\'' + record._uid + '\')" class="txt-blue">查看申报表</a></span>';
        } else {
          //其余走申报中心
          str += '<span class="ml10"><a onclick="sbjgcx.viewSbxml(\'' + record._uid + '\')" class="txt-blue">查看申报表</a></span>';
        }

    } else if (value[i] === '02') {
      str += '<span class="ml10"><a onclick="sbjgcx.clickErrorReason(\'' + record._uid + '\')" class="txt-blue">查看错误原因</a></span>';
    } else if (value[i] === '03' && url && sbjgcx.urlMap[sbzlDm]['yxbz'] === 'Y') {
      if(sbzlDm === '21150' && record.wbtbsbbz === 'Y'){
        url = url.replace('/sb_gdlh_ccs_dkdj/', '/sb_gdlh_ccs_dkdj_wbxtjr/');
      }
      if (sbjgcx.urlMap[sbzlDm] && sbjgcx.urlMap[sbzlDm]['url_2019']){
        url  = sbjgcx.urlMap[sbzlDm]['url_2019'];
      }
      str += '<span class="ml10"><a onclick="sbjgcx.clickHref(\'' + url + '\',\'' + record._uid + '\')" class="txt-blue">重新申报</a></span>';
    } else if (value[i] === '04') {
      if (record.gdsBz == 'ds') {
        str += '<span class="ml10"><a onclick="sbjgcx.clickZfDs(\'' + record._uid + '\')" class="txt-blue">申报作废</a></span>';
      }
      else if(bxfsbzlDm.indexOf(record.sbzlDm) !== -1){
        str += '<span class="ml10"><a onclick="sbjgcx.clickZfSbf(\'' + record._uid + '\')" class="txt-blue">申报作废</a></span>';
      }
      else {
        str += '<span class="ml10"><a onclick="sbjgcx.clickZf(\'' + record._uid + '\')" class="txt-blue">申报作废</a></span>';
      }
    } else if (value[i] === '05') {
      str += '<span class="ml10"><a href="../gdsJk/jk_jsxxcx.html" target="_blank" class="txt-blue">缴款</a></span>';
    } else if (value[i] === '06') {
      str += '<span class="ml10"><a onclick="sbjgcx.clickErrorReason(\'' + record._uid + '\')" class="txt-blue">查看更正结果</a></span>';
    } else if (value[i] === '11') {
      str += '<span class="ml10"><a onclick="sbjgcx.clickYykk(\'' + record._uid + '\')" class="txt-blue">预约扣款</a></span>';
    }
  }
  /*if(record.gdsBz == 'ds') {
    if(record.sbse != 0 && record.sbztDm == '0000') {
      return '<span class="ml10"><a onclick="sbjgcx.clickZfDs(\'' + record._uid + '\')" class="txt-blue">作废</a></span>' +
        '&nbsp;&nbsp;<span class="ml10"><a href="../gdsJk/jk_jsxxcx.html" class="txt-blue">缴款</a></span>';
    }
    else if(record.sbztDm == '0000'){
      return '<span class="ml10"><a onclick="sbjgcx.clickZfDs(\''+record._uid+'\')" class="txt-blue">作废</a></span>';
    }
  }
  else */
  if (!(value && value.length !== 0) && record.sbztDm.substring(0, 2) === '00') {//这句应该是比较准确的判断
    // if(!value && !record.sbxh){
    if (Tools.getUrlParamByName('client') === 'Y' || localStorage.getItem('client') === 'Y') {
      return '';
    } else {
      return '<span class="txt-red">您已通过其他途径申报！</span>';
    }
  }
  return str;
};
//社保费作废
sbjgcx.clickZfSbf= function (_uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    var sbxh = record.sbxh;
    var sbzlDm = record.sbzlDm;
    var zfInfo = {
        sbxh: sbxh
    };
    var msg = '是否确认作废本次申报？';
    if (this.sbzlDmReportWithFjs.indexOf(sbzlDm) !== -1) {
        msg = '根据税务机关的要求，如果您存在附加税，该功能将与附加税一起作废，您确认需要作废吗？';
    }
    mini.confirm(msg, "确认", function (res) {
        if (res === "ok") {
            mini.mask('作废中，请稍后...');
            //为作废加一个延时，避免遮罩无法弹出
            setTimeout(function () {
                ajax.post(sbjgcx.sbfUrl, mini.encode(zfInfo), function (data) {
                    mini.unmask();
                    if (data.success) {
                        mini.alert('作废成功！');
                        sbjgcx.sbjgAjax()
                    } else {
                        mini.alert(data.message);
                    }
                }, function (res) {
                    mini.unmask();
                    mini.alert(res.message, '提示');
                })
            }, 100);
        }
    });
};



//地税作废
sbjgcx.clickZfDs = function (_uid) {
  var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
  var pzxh = record.pzxh;
  mini.confirm("是否确认作废本次申报？", "确认", function (res) {
    if (res === "ok") {
      mini.mask('作废中，请稍后...');
      $.ajax({
        type: "POST",
        url: '/sbzx-web/api/hb/ds/submit/dsSbzf/' + pzxh,
        async: false,
        success: function (data) {
          mini.unmask();
          if (data.success) {
            mini.alert('作废成功！', "提示信息", function () {
              setTimeout(function () {
                sbjgcx.sbjgAjax();
              }, 300);
            });
          } else {
            mini.alert(data.message);
          }
        },
        error: function (e) {
          mini.unmask();
          mini.alert('作废失败');
        }
      })
    }
  });
};

//一户式查询
sbjgcx.viewSbxml_yhs = function (_uid) {
    var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
    var sbzlDm = record.sbzlDm;
    var url = sbjgcx.urlMap[sbzlDm]['url_yhs'];
    var gdsBz = record.gdsBz;
    url += '?zsxmDm='+record.zsxmDm+'&sbzlDm='+sbzlDm+'&sbuuid='+record.sbuuid+'&sssqQ='+record.skssqq+'&sssqZ='+record.skssqz+'&gdsBz='+gdsBz;
    window.open(url);
};

//查看申报表方法
sbjgcx.viewSbxml_old = function (_uid) {
  // 数据转换
  var record = mini.get('sbjgcx_grid').getRowByUID(_uid);
  var sbzlDm = record.sbzlDm;
  var url = sbjgcx.urlMap[sbzlDm]['url_old_preview'];
  mini.mask('查询中...');
  $.post({
    url: '/sb/sbcommon_getSbxml.do',
    contentType: "application/x-www-form-urlencoded",
    data: {
      wjm: record.qqwjm
    },
    success: function (data) {
      mini.unmask();
      var result = mini.decode(data);
      var sbxml = result.data;
      if (!sbxml) {
        mini.alert("申报表查询数据为空，请确认该申报表是否由网上税务局申报成功！", '查询失败');
        return;
      }
      mini.open({
        cls: "fixedWindowTop0",
        url: url,
        showMaxButton: false,
        allowResize: false,
        allowDrag: true,
        title: "申报表查看",
        width: 1200,
        height: 600,
        onload: function () {
          var iframe = this.getIFrameEl();
          iframe.contentWindow.SetData(sbxml);
        },
        ondestroy: function (action) {
        }
      });
    },
    error: function (e) {
      mini.alert("查看申报表失败,请稍后重试");
    }
  });
};
