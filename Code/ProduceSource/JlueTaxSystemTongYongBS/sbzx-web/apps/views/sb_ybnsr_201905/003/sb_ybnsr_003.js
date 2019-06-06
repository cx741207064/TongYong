/**
 * Created by chenjunj on 2017/6/24 9:53.
 */
var ybnsr003 = {
    j3hmcArr: ['认证相符的防伪税控增值税专用发票','本期认证相符且本期申报抵扣','前期认证相符且本期申报抵扣','其他扣税凭证','海关进口增值税专用缴款书',
        '农产品收购发票或者销售发票','代扣代缴税收通用缴款书','其他','本期用于购建不动产的扣税凭证','本期不动产允许抵扣进项税额','外贸企业进项税额抵扣证明',
        '当期申报抵扣进项税额合计','本期进项税转出额','其中：免税货物用','集体福利、个人消费','非正常损失','按简易征收办法征税货物用','免抵退税办法出口货物不得抵扣进项税额',
        '纳税检查调减进项税额','红字专用发票信息表注明的进项税额','上期留抵税额抵减欠税','上期留抵税额退税','其他应作进项税额转出的情形','认证相符的防伪税控增值税专用发票',
        '期初已认证相符但未申报抵扣','本期认证相符且本期未申报抵扣','期末已认证相符但未申报抵扣','其中：按照税法规定不允许抵扣','非防伪税控增值税专用发票及其他扣税凭证',
        '其中：海关进口增值税专用缴款书','农产品收购发票或者销售发票','代扣代缴税收通用缴款书','其他','6%征收率','本期认证相符的全部防伪税控增值税专用发票',
        '期初已征税款挂帐额','加计扣除农产品进项税额'],
    init: function () {
        var sqldsedjqe = Number(servyouReport.wsxxMap['YBHWFWQCLDDQSE']) * 1 + Number(servyouReport.wsxxMap['JZJTQCLDDQSE']) * 1;
        $("#table_003 tbody tr").eq(25).find("td:eq(3) input").val(sqldsedjqe).blur();  //第21栏上期留抵税额抵减欠税
        $("#table_003 tbody tr").eq(26).find("td:eq(3) input").val(servyouReport.wsxxMap['SQLDSETS']).blur();   //第22栏上期留抵税额退税
    },
    isWho: function () {
        var $trs = $("#table_003 tbody tr");
        var FDQQY = servyouReport.wsxxMap['FDQQY'];
        var FDQZZBZ = servyouReport.wsxxMap['FDQZZBZ'];
        if (FDQQY == 'Y' || FDQZZBZ == 'Y') {
            $trs.eq(4).find('input').removeAttr('disabled');
            $trs.eq(31).find('input').removeAttr('disabled');
            $trs.eq(34).find('input').removeAttr('disabled');
        }else {
            $trs.eq(4).find('input').val('').blur();
            $trs.eq(31).find('input').val('').blur();
            $trs.eq(34).find('input').val('').blur();
        }
    },
    isYQWRDBZ:function () {
        //  系统控制逾期未认定一般纳税人，不能填写一下附表：《增值税纳税申报表附列资料二（本期进项税额明细）》 前端控制这几个表不能编辑，全都为0 2017-08-10
        if (servyouReport.wsxxMap['YQWRDBZ'] === "1") {
            $("#table_003 tbody").find("input").val("0.00").blur().attr("disabled", "disabled");
            mini.alert('您为逾期未认定一般纳税人，不能填写《增值税纳税申报表附列资料二（本期进项税额明细）》，如有问题请与税务局联系');
        }
    },
    checkTable003: function () {
        var FDQQY = servyouReport.wsxxMap['FDQQY'];
        if (FDQQY !== 'Y') {
            if (Number($('#003_7_3').val()).toFixed(2) !== Number(($('#003_47_3').val() * 1 - $('#003_36_3').val() * 1)).toFixed(2)) {
                mini.alert("您不是辅导期一般纳税人，附表二的第2行的份数应该等于本表的第35行份数-第26行的份数，请核实再申报！");
                return false;
            }
            if (Number($('#003_7_4').val()).toFixed(2) !== Number(($('#003_47_4').val() * 1 - $('#003_36_4').val() * 1)).toFixed(2)) {
                mini.alert("您不是辅导期一般纳税人，附表二的第2行的金额应该等于本表的第35行金额-第26行的金额，请核实再申报！");
                return false;
            }
            if (Number($('#003_7_5').val()).toFixed(2) !== Number(($('#003_47_5').val() * 1 - $('#003_36_5').val() * 1)).toFixed(2)) {
                mini.alert("您不是辅导期一般纳税人，附表二的第2行的税额应该等于本表的第35行税额-第26行的税额，请核实再申报！");
                return false;
            }
        }
        return true;
    },
    setYbjcBqjxsemxData : function(ybjc){
        var ybjcData = ybjc;
        if(!ybjcData){
            return;
        }
        var data = ybjcData.bqjxsemx;
        var $tr = $('table.bqjxsemx').find('tbody tr');
        for(var row_col in data){
            var arr = row_col.split('_'),
                row = arr[0],
                col = arr[1],
                val = data[row_col];
            $tr.eq(row).find('td input').eq(col).val(val).blur();
        }
        /*tr.eq(1).find('input').blur();
         tr.eq(4).find('input').blur();*/
    },
    allowEditByCKQYBZ: function (_this) {
        if(!(_this.wsxxMap['CKQYBZ'] === '1' || _this.wsxxMap['FDQQY'] === 'Y')){
            $('#table_003 tr:lt(44):gt(34) input').val(0).blur().attr('disabled','disabled');
        }
    }
};
servyouReport.autoAddAllId = true;
servyouReport.setDataIntoCheckData = function () {
    var obj = {
        '6_5': $('#003_6_5').val(),    //认证相符的税控增值税专用发票
        '7_5': $('#003_7_5').val(),
        '10_5': $('#003_10_5').val(),
        '11_5': $('#003_11_5').val(),   //农产品收购发票或者销售发票
        '15_5': $('#003_15_5').val(),   //本期用于购建不动产的扣税凭证
        '16_5': $('#003_16_5').val(),   //本期不动产允许抵扣进项税额
        '17_5': $('#003_17_5').val(),   //外贸企业进项税额抵扣证明
        '18_5': $('#003_18_5').val(),   //当期申报抵扣进项税额合计
        '21_3': $('#003_21_3').val(),   //本期进项税转出额
        '27_3': $('#003_27_3').val(),   //纳税检查调减进项税额
        '30_3': $('#003_30_3').val(),    //上期留抵税额退税
        '31_3': $('#003_31_3').val()    //其他应作进项税额转出的情形
    };
    return obj;
};

servyouReport.customInitLocalData = function () {
    //ybnsr003.ajaxFpqs();
    //ybnsr003.initFpqs();
    ybnsr003.init();
};
servyouReport.customInit = function () {
    ybnsr003.isWho();
    if (!parent.ybnsr.needOuterYbjc && !parent.ybnsr.needInnerYbjc){
        //取进项发票数据
        if (parent.yearReport.sb_data['jxfpxx'].fdqBz === 'N'){
            $('#003_7_3').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-fs']).blur();
            $('#003_7_4').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-je']).blur();
            $('#003_7_5').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-se']).blur();
            $('#003_10_3').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-fs']).blur();
            $('#003_10_4').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-je']).blur();
            $('#003_10_5').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-se']).blur();
        } else if (parent.yearReport.sb_data['jxfpxx'].fdqBz === 'Y'){
            $('#003_36_3').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-fs']).blur();
            $('#003_36_4').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-je']).blur();
            $('#003_36_5').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-se']).blur();
            $('#003_40_3').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-fs']).blur();
            $('#003_40_4').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-je']).blur();
            $('#003_40_5').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-se']).blur();
        }
    }
};
servyouReport.customInitFromHd = function () {
    if (this.wsxxMap['NCPQYBZ'] === '1'){
        $('#003_11_3').val(0).attr('disabled','disabled').blur();
        $('#003_11_4').val(0).attr('disabled','disabled').blur();
    }
};
servyouReport.afterInit = function(){
    ybnsr003.isYQWRDBZ();

    if(servyouReport.wsxxMap['YQWRDBZ'] !== "0"){
        return ;
    }
    /*if(parent.ybnsr.isFromYbjc){
        ybnsr003.setYbjcBqjxsemxData(parent.ybnsr.ybjcData);

    }else if(parent.ybnsr.isFromSbhy){
        var data086 = parent.yearReport.sb_data['086'].checkData;
        var data087 = parent.yearReport.sb_data['087'].checkData;
        if(data087 && !$.isEmptyObject(data087)){
            ybnsrService.setDataFromSbhy(data087['003']);
        }else if(data086 && !$.isEmptyObject(data086)){
            var ybjc = data086.ybjcData;
            ybnsr003.setYbjcBqjxsemxData(ybjc);
        }
    }*/
    var data086 = parent.yearReport.sb_data['086'];
    var data087 = parent.yearReport.sb_data['087'];
    if(parent.ybnsr.needOuterYbjc){
        ybnsr003.setYbjcBqjxsemxData(parent.ybnsr.outerYbjcData);
    }else if(parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
        ybnsrService.setDataFromDataMap(data087['checkData']['003']);
    }else if(parent.ybnsr.needInnerYbjc && data086 && !$.isEmptyObject(mini.decode(data086.checkData))) {
        ybnsr003.setYbjcBqjxsemxData(data086['checkData']['ybjcData']);
    }
    ybnsr003.allowEditByCKQYBZ(this);
};


servyouReport.checkTable_003 = function () {
    return ybnsr003.checkTable003();
};
servyouReport.changeXml_003 = function () {
    var $trs = $('#table_003 tbody tr');
    var $xml = this.getJ3Xml('003');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    var $sbsjxxGrid7 = $xml.find('bqjxsemxbGrid');
    var lbClone = $sbsjxxGrid7.find('bqjxsemxbGridlbVO:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for (var i = 1; i < 38; i++) {
        var $curTr_1 = $trs.eq(i + 1);
        var $curTr_2 = $trs.eq(i + 2);
        var $curTr_4 = $trs.eq(i + 4);
        var $curTr_6 = $trs.eq(i + 6);
        var $curTr_8 = $trs.eq(i + 8);
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewbhxh').text(i);
        $(newLbClone).find('lc').text(i);
        $(newLbClone).find('hmc').text(ybnsr003.j3hmcArr[i-1]);
        $(newLbClone).find('xmmc').text(ybnsr003.j3hmcArr[i-1]);
        if (i < 8) {
            $(newLbClone).find('fs').text(this.getInputValue($curTr_1.find('td:eq(3) input')));
            $(newLbClone).find('je').text(this.getInputValue($curTr_1.find('td:eq(4) input')));
            $(newLbClone).find('se').text(this.getInputValue($curTr_1.find('td:eq(5) input')));
        } else if (i > 7 && i < 13) {
            $(newLbClone).find('fs').text(this.getInputValue($curTr_2.find('td:eq(3) input')));
            $(newLbClone).find('je').text(this.getInputValue($curTr_2.find('td:eq(4) input')));
            $(newLbClone).find('se').text(this.getInputValue($curTr_2.find('td:eq(5) input')));
        } else if (i > 12 && i < 24) {
            $(newLbClone).find('fs').text("");
            $(newLbClone).find('je').text("");
            $(newLbClone).find('se').text(this.getInputValue($curTr_4.find('td:eq(3) input')));
        } else if (i > 23 && i < 34) {
            $(newLbClone).find('fs').text(this.getInputValue($curTr_6.find('td:eq(3) input')));
            $(newLbClone).find('je').text(this.getInputValue($curTr_6.find('td:eq(4) input')));
            $(newLbClone).find('se').text(this.getInputValue($curTr_6.find('td:eq(5) input')));
        } else if (i == 34) {
            $(newLbClone).find('fs').text(0);
            $(newLbClone).find('je').text(0);
            $(newLbClone).find('se').text(0);
        } else if (i > 34 && i < 37) {
            $(newLbClone).find('fs').text(this.getInputValue($curTr_8.find('td:eq(3) input')));
            $(newLbClone).find('je').text(this.getInputValue($curTr_8.find('td:eq(4) input')));
            $(newLbClone).find('se').text(this.getInputValue($curTr_8.find('td:eq(5) input')));
        } else if (i === 37) {
            $(newLbClone).find('fs').text(this.getInputValue($trs.eq(9).find('td:eq(3) input')));
            $(newLbClone).find('je').text(this.getInputValue($trs.eq(9).find('td:eq(4) input')));
            $(newLbClone).find('se').text(this.getInputValue($trs.eq(9).find('td:eq(5) input')));
        }
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.customResumeFromXml_003 = function () {
    var _this = this;
    var $trs = $('#table_003 tbody tr:gt(0)');
    $(this.j3CorrectXml).find('zzssyyybnsr02_bqjxsemxb bqjxsemxbGrid bqjxsemxbGridlbVO').each(function () {
        var ewbhwxh = Number($(this).find('ewbhxh').text());
        var trIndex;
        if(ewbhwxh < 8){
            trIndex = ewbhwxh;
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('fs').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('je').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('se').text());
        }else if(ewbhwxh > 7 && ewbhwxh < 13){
            trIndex = ewbhwxh + 1;
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('fs').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('je').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('se').text());
        }else if(ewbhwxh > 12 && ewbhwxh < 24){
            trIndex = ewbhwxh + 3;
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('se').text());
        }else if(ewbhwxh > 23 && ewbhwxh < 34){
            trIndex = ewbhwxh + 5;
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('fs').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('je').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('se').text());
        }else if(ewbhwxh > 34 && ewbhwxh < 37){
            trIndex = ewbhwxh + 7;
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('fs').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('je').text());
            _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('se').text());
        }else if(ewbhwxh === 37){
            _this.setTargetVal($trs.eq(8).find('td:eq(3)').children(), $(this).find('fs').text());
            _this.setTargetVal($trs.eq(8).find('td:eq(4)').children(), $(this).find('je').text());
            _this.setTargetVal($trs.eq(8).find('td:eq(5)').children(), $(this).find('se').text());
        }
    })
};
$(function () {
    servyouReport.init();
});
servyouReport.checkDoShowMessage = function () {
    var errorMsgs = [];
    $.each(this.tables, function (sb_id, table) {
        var curMsgs = table.checkDoShowMessage();
        if(curMsgs.length>0){
            errorMsgs = errorMsgs.concat(curMsgs);
        }
    });
    var val052_hj = servyouReport.getValueFromCheckData('052','11_4');
    if (!!val052_hj && Number(val052_hj) > 0 && this.wsxxMap['NCPQYBZ'] === '1'){
        errorMsgs = errorMsgs.concat('您是纳入购进农产品抵扣增值税进项税额试点范围的增值税一般纳税人，且销售产品适用13%税率的，在《增值税纳税申报表附表二（本期进项税额明细表）》8a 栏次“加计扣除农产品进项税额”进行税额加计扣除，请核实第8a栏次“加计扣除农产品进项税额”是否正确？');
    }
    return errorMsgs;
};

/**
 * Created by liun on 2018/5/9.
 */
ybnsr003.initHd = function () {
    $("#table_003 tbody tr").eq(31).find("td:eq(3) input").val(servyouReport.wsxxMap['SQFB2FS']).blur();   //第25栏份数
    $("#table_003 tbody tr").eq(31).find("td:eq(4) input").val(servyouReport.wsxxMap['SQFB2JE']).blur();   //第22栏金额
    $("#table_003 tbody tr").eq(31).find("td:eq(5) input").val(servyouReport.wsxxMap['SQFB2SE']).blur();   //第22栏税额
};
ybnsr003.allowEditByCKQYBZ = function (_this) {
    ybnsr003.initHd();
    /*if(!(_this.wsxxMap['CKQYBZ'] === '1' || _this.wsxxMap['FDQQY'] === 'Y')){
        // $('#table_003 tr:lt(44):gt(34) input').val(0).blur().attr('disabled','disabled');
        $('#table_003 tr:eq(35) input').val('0.00').attr('disabled','disabled').blur();
        $('#table_003 tr:eq(36) input').attr('disabled','disabled').blur();
        $('#table_003 tr:eq(38) input').val('0.00').attr('disabled','disabled').blur();
        $('#table_003 tr:eq(40) input').val('0.00').attr('disabled','disabled').blur();
        $('#table_003 tr:eq(42) input').val('0.00').attr('disabled','disabled').blur();
        $('#table_003 tr:eq(43) input').val('0.00').attr('disabled','disabled').blur();

    }*/
};
servyouReport.customInit = function () {
    ybnsr003.isWho();
    ybnsr003.initHd();
    // return ;
  //河北特色  不取发票数据  2019-01-11
    if (!parent.ybnsr.needOuterYbjc){
        //取进项发票数据
        if (parent.yearReport.sb_data['jxfpxx'].fdqBz === 'N'){
            $('#003_7_3').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-fs']).blur();
            $('#003_7_4').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-je']).blur();
            $('#003_7_5').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-se']).blur();
            $('#003_10_3').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-fs']).blur();
            $('#003_10_4').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-je']).blur();
            $('#003_10_5').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-se']).blur();
        } else if (parent.yearReport.sb_data['jxfpxx'].fdqBz === 'Y'){
            $('#003_36_3').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-fs']).blur();
            $('#003_36_4').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-je']).blur();
            $('#003_36_5').val(parent.yearReport.sb_data['jxfpxx']['zyfpxx-se']).blur();
            $('#003_40_3').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-fs']).blur();
            $('#003_40_4').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-je']).blur();
            $('#003_40_5').val(parent.yearReport.sb_data['jxfpxx']['hgpxx-se']).blur();
        }
    }
};
servyouReport.setFromCheckDataConfig = function () {
    if(this.wsxxMap['NCPQYBZ'] !== '0'){
        $("#003_11_5").val(servyouReport.getValueFromCheckData('052','11_4')).blur();  //第6栏取值 《农产品汇总表》合计
    }
};
servyouReport.afterInit = function(){
    ybnsr003.isYQWRDBZ();
    if(servyouReport.wsxxMap['YQWRDBZ'] !== "0"){
        return ;
    }
    var data086 = parent.yearReport.sb_data['086'];
    var data087 = parent.yearReport.sb_data['087'];
    if(parent.ybnsr.needOuterYbjc){
        ybnsr003.setYbjcBqjxsemxData(parent.ybnsr.outerYbjcData);
    }else if(parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
        ybnsrService.setDataFromDataMap(data087['checkData']['003']);
    }else if(parent.ybnsr.needInnerYbjc && data086 && !$.isEmptyObject(mini.decode(data086.checkData))) {
        ybnsr003.setYbjcBqjxsemxData(data086['checkData']['ybjcData']);
    }
    ybnsr003.allowEditByCKQYBZ(this);
    ybnsr003.showTip();//河北特色
};
ybnsr003.showTip = function () {
    var msg = '<p class="txt-blue">异常抵扣风险提醒：</p>' +
        '<p style="color: #fb9f0b;">您取得的以下增值税扣税凭证属于异常抵扣凭证，请及时按规定进行处理：</p>' +
        '<p style="color: #fb9f0b;">1、增值税失控发票、作废增值税专用发票和作废机动车销售统一发票，暂不得作为增值税进项税额的抵扣凭证，需经检查后按有关规定进行处理。</p>' +
        '<p style="color: #fb9f0b;">2、红字增值税专用发票和红字机动车销售统一发票，所对应蓝字发票已抵扣税款，应进行进项税额转出。</p>' +
        '<p style="color: #fb9f0b;">3、异常增值税扣税凭证，尚未申报抵扣或申报出口退税的，暂不允许抵扣或办税退税；已经申报抵扣的，需要先作进项税额转出。</p>';
    mini.alert(msg);
};
ybnsr003.init = function () {
    var sqldsedjqe = Number(servyouReport.wsxxMap['YBHWFWQCLDDQSE']) * 1 + Number(servyouReport.wsxxMap['JZJTQCLDDQSE']) * 1;
    $("#table_003 tbody tr").eq(25).find("td:eq(3) input").val(sqldsedjqe).blur();  //第21栏上期留抵税额抵减欠税
    $("#table_003 tbody tr").eq(26).find("td:eq(3) input").val(servyouReport.wsxxMap['SQLDSETS']).blur();   //第22栏上期留抵税额退税
    //河北特色：2）增值税纳税申报表附列资料（二）第20栏“红字专用发票信息表注明的进项税额”进项税额转出额应等于防伪税控系统开具的红字增值税专用发票信息表税额，且控制不能修改。
    $('#003_28_3').val(servyouReport.wsxxMap['HZFPJXSE']).blur();  //第20栏红字专用发票信息表注明的进项税额
};
