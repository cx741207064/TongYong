/**
 * Created by liuws on 2017/6/26.
 */
var ybnr081 = {
    initSelet: function (hd) {
        var jmxx = hd['jmxx'];
        var jsxx = '<option value=""></option>';
        var msxx = '<option value=""></option>';

        $.each(jmxx, function (i, cur) {
            if (cur.jmzlxDm === "01") {
                jsxx += '<option value="' + cur.ssjmxzhzDm + '" swsxdm="' + cur.jmsspsxDm + '" jmsl="'+cur.zzsJmsl+'">' + cur.jmxzMc + '</option>';
            } else {
                msxx += '<option value="' + cur.ssjmxzhzDm + '" swsxdm="' + cur.jmsspsxDm + '" jmsl="'+cur.zzsJmsl+'">' + cur.jmxzMc + '</option>';
            }
        });
        $("#table_081").find("select[lb='jsxzdm']").empty().append(jsxx);
        $("#table_081").find("select[lb='msxzdm']").empty().append(msxx);
        if (hd["sbzlmc"] === "小规模纳税人") {
            $("#table_081 tbody tr").eq(13).find("td:eq(4) input").attr("disabled", "disabled");
            for (var i = 15; i < 22; i++) {
                $("#table_081 tbody tr").eq(i).find("td:eq(7)").removeClass("enable");
                $("#table_081 tbody tr").eq(i).find("td:eq(7) input").attr("disabled", "disabled");
            }
        }
    },
    check081Js: function () {
        var trs = $("#table_081 tbody tr");
        for (var i = 4; i < 9; i++) {
            var jsmc = trs.eq(i).find("select option:selected").val();
            if (jsmc) {
                var bqsjdjse = Number(servyouReport.getInputValue(trs.eq(i).find("td:eq(7) input")));
                var bqydjse = Number(servyouReport.getInputValue(trs.eq(i).find("td:eq(6) input")));
                if (bqsjdjse > bqydjse) {
                    alert("第" + (i - 2) + "行本期实际抵减税额应小于等于本期应抵减税额。");
                    trs.eq(i).find("td:eq(7)").addClass("report_error");
                    return false;
                }
            }
        }
        for (i = 15; i < 22; i++) {
            var msmc = trs.eq(i).find("select option:selected").val();
            if (msmc) {
                var msxsedydjxse = Number(servyouReport.getInputValue(trs.eq(i).find("td:eq(7) input")));
                var kchmsxse = Number(servyouReport.getInputValue(trs.eq(i).find("td:eq(6) input")));
                if (msxsedydjxse > kchmsxse) {
                    alert("第" + (i - 5) + "行免税销售额对应的进项税额应小于等于扣除后免税销售额。");
                    trs.eq(i).find("td:eq(7)").addClass("report_error");
                    return false;
                }
            }
        }
        return true;
    },
    check081Ms: function () {
        var trs = $("#table_081 tbody tr");
        for (var i = 12; i < 22; i++) {
            var msmc = trs.eq(i).find("select option:selected").val();
            if (msmc) {
                var mzzsxmxse = Number(servyouReport.getInputValue(trs.eq(i).find("td:eq(4) input")));
                var mse = Number(servyouReport.getInputValue(trs.eq(i).find("td:eq(8) input")));
                if (mzzsxmxse === 0 && mse < 0) {
                    alert("第" + (i - 5) + "栏:第1列免征增值税项目销售额大于0时，第5列免税额应大于0");
                    return false;
                }
                if (mzzsxmxse === 0 && mse > 0) {
                    alert("第" + (i - 5) + "栏:第1列免征增值税项目销售额等于0时，第5列免税额应等于0");
                    return false
                }
                if (mse > Number((mzzsxmxse * 0.16).toFixed(2))) {
                    alert("第" + (i - 5) + "栏:第5列免税额不能大于第1列免征增值税项目销售额*16%");
                    return false;
                }
            }
        }
        return true;
    },
    select_chg: function () {
        $("#table_081").on("change", "select", function (e) {
            var select_list = [];
            var trs = $("#table_081 tbody tr");
            for (var i = 4; i < 9; i++) {
                var jsmc = trs.eq(i).find("select option:selected").val();
                if (jsmc) {
                    select_list.push(jsmc);
                }
            }
            for (i = 15; i < 22; i++) {
                var msmc = trs.eq(i).find("select option:selected").val();
                if (msmc) {
                    select_list.push(msmc);
                }
            }
            if (this.value === '') {
                $(this).parent().nextAll().find("input").not("[neveredit='Y']").attr("disabled", "disabled").val("0.00").blur();
            } else {
                if (select_list.indexOf(this.value, select_list.indexOf(this.value) + 1) < 0) {
                    $(this).parent().nextAll().find("input").not("[neveredit='Y']").removeAttr("disabled").blur();
                } else {
                    mini.alert("减免税性质代码名称不允许重复，请检查！");
                    this.value = "";
                    $(this).parent().nextAll().find("input").not("[neveredit='Y']").attr("disabled", "disabled").val("0.00").blur();
                    return;
                }
                if (this.value === '0001011814' && servyouReport.wsxxMap['QYTYSBBZ'] === 'N'){
                    mini.alert('您还没有采集企业退役士兵信息，不能享受这个减免性质，有疑问请联系主管税务！');
                    $(this).val('').change();
                } else if ((this.value === '0001013612' || this.value === '0001013613') && servyouReport.wsxxMap['QYZDQTBZ'] === 'N'){
                    mini.alert('您还没有采集企业重点群体人员信息，不能享受这个减免性质，有疑问请联系主管税务！');
                    $(this).val('').change();
                }

            }
        });
    }
};
/*自定义初始化*/
servyouReport.customInitLocalData = function () {
    ybnr081.initSelet(this.hd);
};
servyouReport.customEvent = function () {
    ybnr081.select_chg();
};
servyouReport.checkTable_081 = function () {
    return ybnr081.check081Js() && ybnr081.check081Ms();
};
servyouReport.autoAddAllId = true;
servyouReport.afterInit = function () {
    var data087 = parent.yearReport.sb_data['087'];
    if (parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
        var checkData_081 = data087['checkData']['081'];
        ybnsrService.setDataFromDataMap(checkData_081);
        $.each(checkData_081['jsData'], function (i) {
            $('#081_' + (i + 7) + '_0').val(this.jmdm).change();
            $('#081_' + (i + 7) + '_5').val(this.bqfse).change().blur();
            $('#081_' + (i + 7) + '_7').val(this.bqsjdjse).change().blur();
        });
        $.each(checkData_081['msData'], function (i) {
            $('#081_' + (i + 18) + '_0').val(this.jmdm).change();
            $('#081_' + (i + 18) + '_4').val(this.mzzzsxmxse).change().blur();
            $('#081_' + (i + 18) + '_5').val(this.bqsjkcse).change().blur();
            $('#081_' + (i + 18) + '_6').val(this.kchmsxse).change().blur();
            $('#081_' + (i + 18) + '_7').val(this.jxse).change().blur();
            $('#081_' + (i + 18) + '_8').val(this.mse).change().blur();
        });
    }
};
servyouReport.setDataIntoCheckData = function () {
    var $trs = $("#table_081 tbody tr");
    var bqydjse_num = 0;
    var bqsjdjse_num = 0;
    var kchmsxse_521_num = 0;
    var kchmsxse_522_num = 0;
    for (var i = 0; i < 5; i++) {
        var selectVal = $trs.eq(4 + i).find("td:eq(0) select option:selected").val();
        if (selectVal === '0001129914') {
            bqydjse_num += Number($trs.eq(4 + i).find("td:eq(6) input").val());
            bqsjdjse_num += Number($trs.eq(4 + i).find("td:eq(7) input").val());
        }
    }
    for (var i = 15; i < 22; i++) {
        selectVal = $trs.eq(i).find("td:eq(0) select option:selected").val();
        if (selectVal === '0001081521') {
            kchmsxse_521_num += Number($trs.eq(i).find("td:eq(6) input").val());
        }
        if (selectVal === '0001081522') {
            kchmsxse_522_num += Number($trs.eq(i).find("td:eq(6) input").val());
        }
    }
    $("#081_0_1").val(bqydjse_num).attr("value", bqydjse_num);
    $("#081_0_2").val(bqsjdjse_num).attr("value", bqsjdjse_num);
    $("#081_0_3").val(kchmsxse_521_num).attr("value", kchmsxse_521_num);
    $("#081_0_4").val(kchmsxse_522_num).attr("value", kchmsxse_522_num);
    var XEJMDM = '';
    if(servyouReport.hd.sbbs.sbb.indexOf('300') !== -1){//附加税作为附表
      XEJMDM = servyouReport.wsxxMap['XEJMDM'];
    }else if(parent.yearReport.nextReportHd){//附加税不是作为附表,存在附加税期初核定
      XEJMDM = hdxxUtil.getWsxxValueByCode('XEJMDM',parent.yearReport.nextReportHd) || '';
    }
    var xejm = 0;//限额减免
    $.each([7,8,9,10,11], function (i, index) {
      var jmxzDm = $('#081_'+(index)+'_0').val();
      var $curTr = $('#081_'+(index)+'_0').parent().parent();
      if(XEJMDM && jmxzDm && XEJMDM.indexOf(jmxzDm) !== -1){
        xejm += Number($curTr.find('td:eq(7) input').val());
      }
    });
    var obj = {
        '0_1': bqydjse_num,                      // 减免性质代码0001129914的“本期应抵减税额 合计
        '0_2': bqsjdjse_num,                     //减免性质代码0001129914的“本期实际抵减税额 合计
        '0_3': kchmsxse_521_num,                 //减免性质代码为0001081521的“扣除后免税销售额”的合计
        '0_4': kchmsxse_522_num,                 //减免性质代码为0001081522的“扣除后免税销售额”的合计
        '15_4': $('#081_15_4').val(),           //增值税减免税申报明细表免税项目免征增值税项目销售额合计
        '6_7': $('#081_6_7').val(),              //增值税减免税申报明细表减税项目本期实际抵减税额合计
        'xejm': xejm.toFixed(2)
    };
    return obj;
};
/*081表转报文*/
servyouReport.changeXml_081 = function () {
    var $trs = $("#table_081 tbody tr");
    var $xml = this.getJ3Xml('081');
    var grid1 = $xml.find("zzsjmssbmxbjsxmGrid").eq(0);
    var clone1 = grid1.find("zzsjmssbmxbjsxmGridlbVO").clone();
    grid1.empty();
    var count1 = 1;
    var newclone1 = clone1.clone();
    //减税项目
    $(newclone1).find("ewbhxh").text(count1);
    $(newclone1).find("hmc").text("合计");
    $(newclone1).find("qcye").text(this.getInputValue($trs.eq(3).find("td:eq(4) input")));
    $(newclone1).find("bqfse").text(this.getInputValue($trs.eq(3).find("td:eq(5) input")));
    $(newclone1).find("bqydjse").text(this.getInputValue($trs.eq(3).find("td:eq(6) input")));
    $(newclone1).find("bqsjdjse").text(this.getInputValue($trs.eq(3).find("td:eq(7) input")));
    $(newclone1).find("qmye").text(this.getInputValue($trs.eq(3).find("td:eq(8) input")));
    grid1.append(newclone1);
    for (var i = 0; i < 5; i++) {
        var selectVal = $trs.eq(4 + i).find("td:eq(0) select option:selected").val();
        if (selectVal !== '') {
            count1 += 1;
            newclone1 = clone1.clone();
            $(newclone1).find("ewbhxh").text(count1);
            $(newclone1).find("hmc").text($trs.eq(4 + i).find("td:eq(0) select option:selected").val());
            $(newclone1).find("swsxdm").text($trs.eq(4 + i).find("td:eq(0) select option:selected").attr("swsxdm"));
            $(newclone1).find("qcye").text(this.getInputValue($trs.eq(4 + i).find("td:eq(4) input")));
            $(newclone1).find("bqfse").text(this.getInputValue($trs.eq(4 + i).find("td:eq(5) input")));
            $(newclone1).find("bqydjse").text(this.getInputValue($trs.eq(4 + i).find("td:eq(6) input")));
            $(newclone1).find("bqsjdjse").text(this.getInputValue($trs.eq(4 + i).find("td:eq(7) input")));
            $(newclone1).find("qmye").text(this.getInputValue($trs.eq(4 + i).find("td:eq(8) input")));
            grid1.append(newclone1);
        }
    }
    /*免税项目*/
    var grid2 = $xml.find("zzsjmssbmxbmsxmGrid");
    var vo1 = grid2.find("zzsjmssbmxbmsxmGridlbVO").eq(0);
    var clone2 = vo1.clone();
    $(vo1).find("ewbhxh").text(1);
    $(vo1).find("hmc").text("合计");
    $(vo1).find("mzzzsxmxse").text(this.getInputValue($trs.eq(12).find("td:eq(4) input")));
    $(vo1).find("bqsjkcje").text(this.getInputValue($trs.eq(12).find("td:eq(5) input")));
    $(vo1).find("kchmsxse").text(this.getInputValue($trs.eq(12).find("td:eq(6) input")));
    $(vo1).find("msxsedyjxse").text(this.getInputValue($trs.eq(12).find("td:eq(7) input")));
    $(vo1).find("mse").text(this.getInputValue($trs.eq(12).find("td:eq(8) input")));
    var vo2 = grid2.find("zzsjmssbmxbmsxmGridlbVO").eq(1);
    $(vo2).find("ewbhxh").text(2);
    $(vo2).find("hmc").text("出口免税");
    $(vo2).find("mzzzsxmxse").text(this.getInputValue($trs.eq(13).find("td:eq(4) input")));
    var vo3 = grid2.find("zzsjmssbmxbmsxmGridlbVO").eq(2);
    $(vo3).find("ewbhxh").text(3);
    $(vo3).find("hmc").text("其中：跨境服务");
    $(vo3).find("mzzzsxmxse").text(this.getInputValue($trs.eq(14).find("td:eq(4) input")));
    var count2 = 3;
    for (var i = 0; i < 7; i++) {
        var selectVal2 = $trs.eq(15 + i).find("td:eq(0) select").val();
        if (selectVal2 !== '') {
            count2 += 1;
            var newclone2 = clone2.clone();
            $(newclone2).find("ewbhxh").text(count2);
            $(newclone2).find("hmc").text($trs.eq(15 + i).find("td:eq(0) select option:selected").val());
            $(newclone2).find("swsxdm").text($trs.eq(15 + i).find("td:eq(0) select option:selected").attr("swsxdm"));
            $(newclone2).find("mzzzsxmxse").text(this.getInputValue($trs.eq(15 + i).find("td:eq(4) input")));
            $(newclone2).find("bqsjkcje").text(this.getInputValue($trs.eq(15 + i).find("td:eq(5) input")));
            $(newclone2).find("kchmsxse").text(this.getInputValue($trs.eq(15 + i).find("td:eq(6) input")));
            $(newclone2).find("msxsedyjxse").text(this.getInputValue($trs.eq(15 + i).find("td:eq(7) input")));
            $(newclone2).find("mse").text(this.getInputValue($trs.eq(15 + i).find("td:eq(8) input")));
            grid2.append(newclone2);
        }
    }
    return $xml;
};
servyouReport.customResumeFromXml_081 = function () {
    var _this = this;
    var $trs = $('#table_081 tbody tr');
    $(this.j3CorrectXml).find('zzsjmssbmxb zzsjmssbmxbjsxmGrid zzsjmssbmxbjsxmGridlbVO').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        var trIndex = ewbhxh + 2;
        if (ewbhxh > 1) {
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(0)').children(), $(this).find('hmc').text());
        }
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('qcye').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('bqfse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('bqydjse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(7)').children(), $(this).find('bqsjdjse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(8)').children(), $(this).find('qmye').text());
    });
    $(this.j3CorrectXml).find('zzsjmssbmxb zzsjmssbmxbmsxmGrid zzsjmssbmxbmsxmGridlbVO').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        var trIndex = ewbhxh + 11;
        if (ewbhxh > 2) {
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(0)').children(), $(this).find('hmc').text());
        }
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('mzzzsxmxse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('bqsjkcje').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('kchmsxse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(7)').children(), $(this).find('msxsedyjxse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(8)').children(), $(this).find('mse').text());
    })
};
$(function () {
    servyouReport.init();
});

/**
 * Created by liun on 2018/5/9.
 */
servyouReport.preCondition = function () {
    if (parent.yearReport.sb_data['081'].status === '0'){
        mini.confirm('根据《税收减免管理办法》规定，您在首次填报本申报表的减免项目前，需向税务机关提交相应的报备资料、履行备案手续。如您已完成备案，请继续填报。','点击确定，继续填报',function (action) {
            if (action !== 'ok'){
                servyouReport.closeWindow('ok');
            }
        });
    }
    return true;
};
ybnr081.check081Ms = function () {
    var trs = $("#table_081 tbody tr");
    for (var i = 12; i < 22; i++) {
        var $curTr = trs.eq(i);
        var $select = $curTr.find("select");
        var msmc = $select.val();
        if (msmc) {
            var mzzsxmxse = Number(servyouReport.getInputValue($curTr.find("td:eq(4) input")));
            var mse = Number(servyouReport.getInputValue($curTr.find("td:eq(8) input")));
            if (mzzsxmxse === 0 && mse < 0) {
                alert("第" + (i - 5) + "栏:第1列免征增值税项目销售额大于0时，第5列免税额应大于0");
                return false;
            }
            if (mzzsxmxse === 0 && mse > 0) {
                alert("第" + (i - 5) + "栏:第1列免征增值税项目销售额等于0时，第5列免税额应等于0");
                return false
            }
            if (mse > Number((mzzsxmxse * 0.16).toFixed(2))) {
                alert("第" + (i - 5) + "栏:第5列免税额不能大于第1列免征增值税项目销售额*16%");
                return false;
            }
            /*
            * #303390
            * 增加增值税减免税明细表的校验 （网厅、客户端同时实现）
            * added by chenjunj on 2018/08/21
            * */
            var attr_jmsl = $select.find('option:selected').attr('jmsl');
            if(!attr_jmsl){
                 continue ;
            }
            var jmsls = $select.find('option:selected').attr('jmsl').split('-');
            var slMin = Number(jmsls[0]);
            var slMax = Number(jmsls[1] || jmsls[0]);
            var col3_v = Number($curTr.find("td:eq(6) input").val());
            var col4_v = Number($curTr.find("td:eq(7) input").val());
            var mseMin = ((col3_v*slMin-col4_v)*0.98).toFixed(2);
            var mseMax = ((col3_v*slMax-col4_v)*1.02).toFixed(2);
            if(Number(mseMin) > Number(mseMax)){
                var temp = mseMin;
                mseMin = mseMax;
                mseMax = temp;
            }
            if(mse < Number(mseMin) || mse > Number(mseMax)){
                mini.alert('根据《增值税减免税申报明细表》填写规则，按照您填报的数据，第'+(i - 5)+'栏第5列免税销售额应在【'+mseMin+'至'+mseMax+'】范围内（5.免税额”=“3.扣除后免税销售额”*本免税项目适用税率或征收率-“4免税销售额对应的进项税额，并允许2%的误差），请根据公式正确填报”。');
                return false;
            }
        }
    }
    return true;
};