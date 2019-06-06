/**
 * Created by chenjunj on 2017/5/27 17:10.
 */
var table_001 = {
    /**
     * 自定义初始化001核定相关部分
     * */
    customInitFromHd_001: function (_this) {
        this.initInputFromHd(_this);
        this.allowEditByYQWRDBZ(_this);
    },
    /**
     * 从核定设值
     * */
    initInputFromHd: function (_this) {
        $('#001_23_6').val(_this.wsxxMap['YBHWFWQCLD']).blur();
        $('#001_23_9').val(_this.wsxxMap['JZJTQCLD']).blur();
        $('#001_25_6').val(_this.wsxxMap['MDTYTSEBYS']).blur();
        $('#001_35_6').val(_this.wsxxMap['YBJSQCWJSEBYS']).blur();
        $('#001_35_9').val(_this.wsxxMap['JZJTQCWJSEBYS']).blur();
        var CKKJZYJKSYJSE = _this.wsxxMap['CKKJZYJKSYJSE'];
        $('#001_39_6').val(CKKJZYJKSYJSE)
            .attr({
                'maxValue':CKKJZYJKSYJSE,
                'formatErrorMsg':'输入的出口开具专用缴款书预缴税额必须大于零且不大于税务端的出口开具专用缴款书预缴税额，如有问题，请与主管税务机关联系！',
                'servyou_type': 'nonnegative'
            }).blur();
        $('#001_46_6').val(_this.wsxxMap['QCWJCBSEBYS']).blur();
    },
    /**
     * 如果为逾期未认定的纳税人主表中12、13、14、15、20栏不能填写。
     * 20=17-18计算出20栏不等于0时，系统也按20栏等于0处理
     * */
    allowEditByYQWRDBZ: function (_this) {
        var $trs = $('#table_001 tr');
        if(_this.wsxxMap['YQWRDBZ'] === "1"){
            $trs.filter(':lt(26):gt(21)').find('input').attr('disabled','disabled');
            $trs.eq(':30').find('input').attr('disabled','disabled')
        }
    },
    /**
     * 自定义初始化001表
     * */
    customInit_001: function (_this) {
        this.addFormulas(_this);
        this.initTableData(_this);
    },
    /**
     * 初始化页面数据
     * */
    initTableData: function (_this) {
        var hymc = Api.getMcByDm('hy', _this.nsrData.hyDm);
        $('#001_5_8').val(hymc).blur();
        $('#fddbrxm').text(_this.nsrData.fddbrxm);
        $('#zcdz').text(_this.nsrData.zcdz);
        $('#scjydz').text(_this.nsrData.scjydz);
        var yhxx = Api.getNsrckzhxx();
        $('#yhzh').text(yhxx && yhxx.yhzh?yhxx.yhzh:'');
        var djzclxmc = Api.getMcByDm('djzclx', _this.nsrData.djzclxDm);
        $('#001_8_6').val(djzclxmc).blur();
        $('#001_8_11').val(_this.nsrData.nsrxxKzVO.scjydlxdh).blur();
    },
    /**
     * 添加001表公式
     * */
    addFormulas: function (_this) {
        var extraFormulas = [];
        //本月累计数相关
        var noLsxxArr = [13,17,18,20,25,28,29,32,33,34,35,36,38,45,46,47,48,51,53,54,55,58,60,63,64,66,67,70,71,72];
        /*YQWRDBZ为1则为逾期未认定的时候 纳税人主表中12、13、14、15、20栏不能填写。
        20=17-18计算出20栏不等于0时，系统也按20栏等于0处理----》直接不添加相关行公式
        */
        if(_this.wsxxMap['YQWRDBZ'] === "0"){
            extraFormulas.push("G31 = G28-G29");
            extraFormulas.push("J31 = J28-J29");
        }
        for(var i=1;i<74;i++){
            var byLetter;
            var byljLetter;
            var index;
            if(i<39){
                byLetter = 'G';
                byljLetter = 'H';
                index = i+11;
            }else{
                byLetter = 'J';
                byljLetter = 'L';
                index = i-27;
            }
            if(noLsxxArr.indexOf(i) === -1){
                extraFormulas.push(byljLetter+index+' = ROUND('+byLetter+index+'+{lsxxs.lsxx[code='+i+'].value},2)');
            }
        }
        extraFormulas.push('H36 = ROUND({lsxxs.lsxx[code=25].value},2)');
        extraFormulas.push('L36 = ROUND({lsxxs.lsxx[code=63].value},2)');
        extraFormulas.push('H47 = ROUND({lsxxs.lsxx[code=36].value},2)');
        // extraFormulas.push('H47 = ROUND({lsxxs.lsxx[code=36].value},2)');
        _this.addFormulas('001',extraFormulas);
    },
    /**
     * 设置来自表间的数据配置
     * */
    setFromCheckDataConfig_001: function (_this) {
        //1栏一般项目本月数=《附列资料表一》第9列合计销售额“1+2+3+4+5-6-7”行；
        var v002_0_1 = Number(_this.getValueFromCheckData('002','0_1'));//B1第9列合计销售额“1+2+3+4+5”行
        var v002_0_2 = Number(_this.getValueFromCheckData('002','0_2'));//C1第9列合计销售额“6+7”行
        $('#001_11_6').val(v002_0_1-v002_0_2).blur();
        //1栏即征即退本月数=《附列资料表一》第9列合计销售额“6+7”行
        $('#001_11_9').val(v002_0_2).blur();
        //4栏《附列资料表一》纳税检查调整销售额，即第7列第1至5行之和；
        var v002_0_3 = Number(_this.getValueFromCheckData('002','0_3'));//D1第7列第1至5行之和
        $('#001_14_6').val(v002_0_3).blur();
        //5栏一般项目本月数=《附列资料表一》第9列第8至13b行之和-第9列第14、15行之和
        var v002_0_4 = Number(_this.getValueFromCheckData('002','0_4'));//E1第9列第8至13b行之和
        var v002_0_5 = Number(_this.getValueFromCheckData('002','0_5'));//F1第9列第14、15行之和
        $('#001_15_6').val(v002_0_4-v002_0_5).blur();
        //5栏即征即退本月数=《附列资料表一》第9列第14、15行之和
        $('#001_15_9').val(v002_0_5).blur();
        //7栏一般项目等于《附列资料表一》第9列第16、17行之和
        var v002_0_6 = Number(_this.getValueFromCheckData('002','0_6'));//G1第9列第16、17行之和
        $('#001_17_6').val(v002_0_6).blur();
        //8栏一般项目等于《附列资料表一》第9列第18、19行之和
        var v002_0_7 = Number(_this.getValueFromCheckData('002','0_7'));//H1第9列第18、19行之和
        $('#001_18_6').val(v002_0_7).blur();
        //11栏一般项目等于《附列资料表一》（第10列第1、3行之和-10列第6行）+（第14列第2、4、5行之和-14列第7行）
        var v002_0_8 = Number(_this.getValueFromCheckData('002','0_8'));//I1（第10列第1、3行之和）+（第14列第2、4、5行之和）
        var v002_0_9 = Number(_this.getValueFromCheckData('002','0_9'));//J1（10列第6行）+（14列第7行）
        $('#001_21_6').val(v002_0_8-v002_0_9).blur();
        //11栏即征即退项目等于《附列资料表一》第10列第6行+第14列第7行
        $('#001_21_9').val(v002_0_9).blur();


        /*如果为逾期未认定的纳税人主表中12、13、14、15、20栏不能填写。20=17-18计算出20栏不等于0时，系统也按20栏等于0处理*/
        var YQWRDBZ = _this.wsxxMap['YQWRDBZ'];
        if(YQWRDBZ === "0"){
            //12栏一般项目附表2第12栏税额
            var v003_18_5 = Number(_this.getValueFromCheckData('003','18_5'));
            $('#001_22_6').val(v003_18_5).blur();
        }
        //16栏一般项目等于《附列资料表一》第8列第1至5行之和+《附列资料（二）》第19栏D28
        var v002_0_10 = Number(_this.getValueFromCheckData('002','0_10'));//K1第8列第1至5行之和
        var v003_27_3 = Number(_this.getValueFromCheckData('003','27_3'));//《附列资料（二）》第19栏D28
        $('#001_26_6').val(v002_0_10+v003_27_3).blur();
        //21栏一般项目等于《附列资料（一）》（第10列第8至11行之和-第10列第14行）+（第14列第12行至13b行之和-第14列第15行）
        var v002_0_11 = Number(_this.getValueFromCheckData('002','0_11'));//L1（第10列第8至11行之和）+（第14列第12行至13b行之和）
        var v002_0_12 = Number(_this.getValueFromCheckData('002','0_12'));//M1（第10列第14行）+（第14列第15行）
        $('#001_31_6').val(v002_0_11-v002_0_12).blur();
        //21栏即征即退项目等于《附列资料（一）》第10列第14行+第14列第15行
        $('#001_31_9').val(v002_0_12).blur();
        //14栏一般项目等于《附列资料（二）》第13栏税额
        var v003_21_3 = Number(_this.getValueFromCheckData('003','21_3'));//《附列资料（二）》第13栏 一般项目进项税额转出
        $('#001_24_6').val(v003_21_3).blur();
        /*
         * 【河北】：
         * 28栏分次预缴税额=核定BQFCYJSE（本期分次预缴）数值 +附表4 的分支机构预征缴纳税款本期实际抵减税额，可手工修。
         * （征即退栏次优先，即如果是即征即退纳税人JZJTBZ标志为Y，数值放在28栏第3列，否则放在28栏第1列，可手工修改调整数值）
         * */
        var fcyjse = Number(_this.wsxxMap['BQFCYJSE'])+Number(_this.getValueFromCheckData('031','9_8'))
            +Number(_this.getValueFromCheckData('031','10_8'))+Number(_this.getValueFromCheckData('031','11_8'))
            +Number(_this.getValueFromCheckData('031','12_8'));
        if(_this.wsxxMap['JZJTBZ'] === 'Y'){
            $('#001_38_9').val(fcyjse).blur();
        }else{
            $('#001_38_6').val(fcyjse).blur();
        }
    },

    /*将一表集成过来的数据设置到页面中*/
    setYbjcZzsnssbbData : function(ybjc){
    /*如果是一表集成过来的*/
        var  ybjcData = ybjc;
        if(!ybjcData){
            return;
        }
        var data = ybjcData.zzsnssbb;
        var $tr = $('table.zzsnssbb').find('tbody tr');
        for(var row_col in data){
            var arr = row_col.split('_'),
                row = arr[0],
                col = arr[1],
                val = data[row_col];
            $tr.eq(row).find('td input').eq(col).val(val).blur();
        }
  },
  bindAutoSetYbxm_19: function () {
    $('#table_001').on('change.afterCalculate', '#001_21_6,#001_28_6', function () {
      var ybxm_11 = Number($('#001_21_6').val());
      var ybxm_18 = Number($('#001_28_6').val());
      var fb4_6 = Number(servyouReport.getValueFromCheckData('031', '16_9'));
      if(servyouReport.wsxxMap['JJDJBZ'] === 'Y'){
        $('#001_29_6').val(ybxm_11-ybxm_18-fb4_6).blur();
      }else{
        $('#001_29_6').val(ybxm_11-ybxm_18).blur();
      }
    })
  },
  bindAutoSetJzjtxm_19: function () {
    $('#table_001').on('change.afterCalculate', '#001_21_9,#001_28_9', function () {
      var jzjtxm_11 = Number($('#001_21_9').val());
      var jzjtxm_18 = Number($('#001_28_9').val());
      var fb4_6 = Number(servyouReport.getValueFromCheckData('031', '17_9'));
      if(servyouReport.wsxxMap['JJDJBZ'] === 'Y'){
        $('#001_29_9').val(jzjtxm_11-jzjtxm_18-fb4_6).blur();
      }else{
        $('#001_29_9').val(jzjtxm_11-jzjtxm_18).blur();
      }
    })
  }

};
/*为所有input和select加上id*/
servyouReport.autoAddAllId = true;
/*从核定初始化*/
servyouReport.customInitFromHd = function () {
    table_001.customInitFromHd_001(this);
};
/*自定义初始化（内部不能与期数数据相关，不能有事件绑定）*/
servyouReport.customInit = function () {
    table_001.customInit_001(this);
};
servyouReport.customEvent = function () {
  table_001.bindAutoSetYbxm_19();
  table_001.bindAutoSetJzjtxm_19();
};
/*表间取值配置*/
servyouReport.setFromCheckDataConfig = function () {
    table_001.setFromCheckDataConfig_001(this);
};
/*初始化之后的操作*/
servyouReport.afterInit = function () {
    if(this.wsxxMap['YQWRDBZ'] === '1'){
        mini.alert('您为逾期未认定一般纳税人，不能填写主表第12、13、14、15、20栏（若20栏=17栏-18栏' +
                    '计算结果不等于0，也按20栏等于0处理），如有问题请与税务局联系！');
    }
    var data086 = parent.yearReport.sb_data['086'];
    var data087 = parent.yearReport.sb_data['087'];
    if(parent.ybnsr.needOuterYbjc){
        table_001.setYbjcZzsnssbbData(parent.ybnsr.outerYbjcData);
    }else if(parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
        ybnsrService.setDataFromDataMap(data087['checkData']['001']);
    }else if(parent.ybnsr.needInnerYbjc && data086 && !$.isEmptyObject(mini.decode(data086.checkData))) {
        table_001.setYbjcZzsnssbbData(data086['checkData']['ybjcData']);
    }
    this.calculateAll('001');
    $('#001_21_6,#001_21_9').change();//强制计算19栏本期
};
servyouReport.checkTable_001 = function () {
    /**
     * 更正申报时，应补退税额必须大于等于上次申报的值
     * */
    /*var ybtse = Number($('#001_44_6').val())+Number($('#001_44_9').val());
    if(parent.yearReport.businessType === 'correct' && ybtse < Number(this.wsxxMap['YBTSE'])){
        mini.alert('本系统不支持更正金额小于已缴款金额，请去大厅办理！');
        return false;
    }*/
    return true;
};
servyouReport.getYbtse = function () {
    var ybtse = Number((Number($('#001_44_6').val())+Number($('#001_44_9').val())).toFixed(2));
    return ybtse;
};
//将以下数据设置到对象中，用以在表间取数和表间校验，
servyouReport.setDataIntoCheckData = function () {
     var obj = {
         '11_6':$('#001_11_6').val(),
         '11_9':$('#001_11_9').val(),
         '14_6':$('#001_14_6').val(),
         '14_9':$('#001_14_9').val(),
         '15_6':$('#001_15_6').val(),
         '15_9':$('#001_15_9').val(),
         '17_6':$('#001_17_6').val(),
         '18_6':$('#001_18_6').val(),
         '19_6':$('#001_19_6').val(),
         '21_6':$('#001_21_6').val(),
         '21_9':$('#001_21_9').val(),//主表第11栏“销项税额”“即征即退货物及劳务和应税服务”列“本月数”
         '22_6':$('#001_22_6').val(),
         '22_9':$('#001_22_9').val(),
         '23_6':$('#001_23_6').val(),
         '23_9':$('#001_23_9').val(),
         '24_6':$('#001_24_6').val(),
         '24_9':$('#001_24_9').val(),
         '25_6':$('#001_25_6').val(),//主表第15行本月数  //甘肃特色
         '26_6':$('#001_26_6').val(),
         '28_6':$('#001_28_6').val(),
         '28_7':$('#001_28_7').val(),
         '28_9':$('#001_28_9').val(),
         '29_6':$('#001_29_6').val(),//001主表第19栏第1列本月数
         '29_9':$('#001_29_9').val(),//001主表第19栏第3列本月数
         '31_6':$('#001_31_6').val(),
         '31_9':$('#001_31_9').val(),//第21栏“简易征收办法计算的应纳税额”“即征即退货物及劳务和应税服务”列“本月数”
         '33_6':$('#001_33_6').val(),//001主表第23栏第1列本月数
         '33_9':$('#001_33_9').val(),//001主表第23栏第3列本月数
         '34_6':$('#001_34_6').val(),//001主表第24栏第1列本月数
         '34_9':$('#001_34_9').val(),//001主表第24栏第3列本月数
         '38_6':$('#001_38_6').val(),//001主表第28栏第1列本月数
         '38_9':$('#001_38_9').val(),//001主表第28栏第3列本月数
         '39_6':$('#001_39_6').val(),//001主表第29栏第1列本月数
         '39_9':'0.00',//001主表第29栏第3列本月数
         '44_6':$('#001_44_6').val(),  //一般项目 本期应补（退）税额
         '44_9':$('#001_44_9').val()   //即征即退项目
     };
     return obj;
 };
/*001转报文*/
servyouReport.changeXml_001 = function () {
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbrq1').text(this.tbrq);
    var $zbGridlbVOs = $xml.find('zbGridlbVO');
    $('#table_001 tr:lt(49):gt(10)').each(function (i,curTr) {
        var ybxmBys = $(curTr).find('td:eq(6) input').val() || '0.00';
        var ybxmBylj = $(curTr).find('td:eq(7) input').val() || '0.00';
        var jzjtxmBys = $(curTr).find('td:eq(9) input').val() || '0.00';
        var jzjtxmBylj = $(curTr).find('td:eq(11) input').val() || '0.00';
        $($zbGridlbVOs[0]).children().eq(i+2).text(ybxmBys);
        $($zbGridlbVOs[1]).children().eq(i+2).text(ybxmBylj);
        $($zbGridlbVOs[2]).children().eq(i+2).text(jzjtxmBys);
        $($zbGridlbVOs[3]).children().eq(i+2).text(jzjtxmBylj);
    });
    return $xml;
};

servyouReport.afterSaved = function () {
    window.parent.yearReport.ybtse1 = $(".ybtse1").val() || "";//带出应补退税额到外部
    window.parent.yearReport.ybtse2 = $(".ybtse2").val() || "";//带出应补退税额到外部
};

servyouReport.customResumeFromXml_001 = function () {
    var _this = this;
    var $trs = $('#table_001 tbody tr');
    $(this.j3CorrectXml).find('zzssyyybnsr_zb zbGrid zbGridlbVO').each(function () {
        var ewblxh = Number($(this).find('ewblxh').text());
        var tdIndex = ewblxh;
        if(ewblxh < 3){
            tdIndex = ewblxh + 5;
        }else if(ewblxh === 3){
            tdIndex = 9;
        }else if(ewblxh === 4){
            tdIndex = 11;
        }
        _this.setTargetVal($trs.eq(6).find('td:eq('+tdIndex+')').children(), $(this).find('asysljsxse').text());
        _this.setTargetVal($trs.eq(7).find('td:eq('+tdIndex+')').children(), $(this).find('yshwxse').text());
        _this.setTargetVal($trs.eq(8).find('td:eq('+tdIndex+')').children(), $(this).find('yslwxse').text());
        _this.setTargetVal($trs.eq(9).find('td:eq('+tdIndex+')').children(), $(this).find('syslNsjctzxse').text());
        _this.setTargetVal($trs.eq(10).find('td:eq('+tdIndex+')').children(), $(this).find('ajybfjsxse').text());
        _this.setTargetVal($trs.eq(11).find('td:eq('+tdIndex+')').children(), $(this).find('jybfNsjctzxse').text());
        _this.setTargetVal($trs.eq(12).find('td:eq('+tdIndex+')').children(), $(this).find('mdtbfckxse').text());
        _this.setTargetVal($trs.eq(13).find('td:eq('+tdIndex+')').children(), $(this).find('msxse').text());
        _this.setTargetVal($trs.eq(14).find('td:eq('+tdIndex+')').children(), $(this).find('mshwxse').text());
        _this.setTargetVal($trs.eq(15).find('td:eq('+tdIndex+')').children(), $(this).find('mslwxse').text());
        _this.setTargetVal($trs.eq(16).find('td:eq('+tdIndex+')').children(), $(this).find('xxse').text());
        _this.setTargetVal($trs.eq(17).find('td:eq('+tdIndex+')').children(), $(this).find('jxse').text());
        _this.setTargetVal($trs.eq(18).find('td:eq('+tdIndex+')').children(), $(this).find('sqldse').text());
        _this.setTargetVal($trs.eq(19).find('td:eq('+tdIndex+')').children(), $(this).find('jxsezc').text());
        _this.setTargetVal($trs.eq(20).find('td:eq('+tdIndex+')').children(), $(this).find('mdtytse').text());
        _this.setTargetVal($trs.eq(21).find('td:eq('+tdIndex+')').children(), $(this).find('syslNsjcybjse').text());
        _this.setTargetVal($trs.eq(22).find('td:eq('+tdIndex+')').children(), $(this).find('ydksehj').text());
        _this.setTargetVal($trs.eq(23).find('td:eq('+tdIndex+')').children(), $(this).find('sjdkse').text());
        _this.setTargetVal($trs.eq(24).find('td:eq('+tdIndex+')').children(), $(this).find('ynse').text());
        _this.setTargetVal($trs.eq(25).find('td:eq('+tdIndex+')').children(), $(this).find('qmldse').text());
        _this.setTargetVal($trs.eq(26).find('td:eq('+tdIndex+')').children(), $(this).find('jybfYnse').text());
        _this.setTargetVal($trs.eq(27).find('td:eq('+tdIndex+')').children(), $(this).find('jybfNsjcybjse').text());
        _this.setTargetVal($trs.eq(28).find('td:eq('+tdIndex+')').children(), $(this).find('ynsejze').text());
        _this.setTargetVal($trs.eq(29).find('td:eq('+tdIndex+')').children(), $(this).find('ynsehj').text());
        _this.setTargetVal($trs.eq(30).find('td:eq('+tdIndex+')').children(), $(this).find('qcwjse').text());
        _this.setTargetVal($trs.eq(31).find('td:eq('+tdIndex+')').children(), $(this).find('ssckkjzyjkstse').text());
        _this.setTargetVal($trs.eq(32).find('td:eq('+tdIndex+')').children(), $(this).find('bqyjse').text());
        _this.setTargetVal($trs.eq(33).find('td:eq('+tdIndex+')').children(), $(this).find('fcyjse').text());
        _this.setTargetVal($trs.eq(34).find('td:eq('+tdIndex+')').children(), $(this).find('ckkjzyjksyjse').text());
        _this.setTargetVal($trs.eq(35).find('td:eq('+tdIndex+')').children(), $(this).find('bqjnsqynse').text());
        _this.setTargetVal($trs.eq(36).find('td:eq('+tdIndex+')').children(), $(this).find('bqjnqjse').text());
        _this.setTargetVal($trs.eq(37).find('td:eq('+tdIndex+')').children(), $(this).find('qmwjse').text());
        _this.setTargetVal($trs.eq(38).find('td:eq('+tdIndex+')').children(), $(this).find('qmwjseQjse').text());
        _this.setTargetVal($trs.eq(39).find('td:eq('+tdIndex+')').children(), $(this).find('bqybtse').text());
        _this.setTargetVal($trs.eq(40).find('td:eq('+tdIndex+')').children(), $(this).find('jzjtsjtse').text());
        _this.setTargetVal($trs.eq(41).find('td:eq('+tdIndex+')').children(), $(this).find('qcwjcbse').text());
        _this.setTargetVal($trs.eq(42).find('td:eq('+tdIndex+')').children(), $(this).find('bqrkcbse').text());
        _this.setTargetVal($trs.eq(43).find('td:eq('+tdIndex+')').children(), $(this).find('qmwjcbse').text());
    })
};
$(function () {
    servyouReport.init();
});

/**
 * Created by chenjunj on 2018/3/2 13:41.
 */
/**
 * 添加001表公式
 * */
table_001.addFormulas = function (_this) {
    var extraFormulas = [];
    //本月累计数相关
    var noLsxxArr = [13,17,18,20,25,28,29,32,33,34,35,36,38,45,46,47,48,51,53,54,55,58,60,63,64,66,67,70,71,72];
    /*YQWRDBZ为1则为逾期未认定的时候 纳税人主表中12、13、14、15、20栏不能填写。
    20=17-18计算出20栏不等于0时，系统也按20栏等于0处理----》直接不添加相关行公式
    */
    if(_this.wsxxMap['YQWRDBZ'] === "0"){
        extraFormulas.push("G31 = G28-G29");
        extraFormulas.push("J31 = J28-J29");
        extraFormulas.push("G23 = B1-J23");
    }
    for(var i=1;i<74;i++){
        var byLetter;
        var byljLetter;
        var index;
        if(i<39){
            byLetter = 'G';
            byljLetter = 'H';
            index = i+11;
        }else{
            byLetter = 'J';
            byljLetter = 'L';
            index = i-27;
        }
        if(noLsxxArr.indexOf(i) === -1){
            extraFormulas.push(byljLetter+index+' = ROUND('+byLetter+index+'+{lsxxs.lsxx[code='+i+'].value},2)');
        }
    }
    extraFormulas.push('H36 = ROUND({lsxxs.lsxx[code=25].value},2)');
    extraFormulas.push('L36 = ROUND({lsxxs.lsxx[code=63].value},2)');
    extraFormulas.push('H47 = ROUND({lsxxs.lsxx[code=36].value},2)');
    _this.addFormulas('001',extraFormulas);
};
/**
 * 设置来自表间的数据配置
 * */
table_001.setFromCheckDataConfig_001 = function (_this) {
    //1栏一般项目本月数=《附列资料表一》第9列合计销售额“1+2+3+4+5-6-7”行；
    var v002_0_1 = Number(_this.getValueFromCheckData('002','0_1'));//B1第9列合计销售额“1+2+3+4+5”行
    var v002_0_2 = Number(_this.getValueFromCheckData('002','0_2'));//C1第9列合计销售额“6+7”行
    $('#001_11_6').val(v002_0_1-v002_0_2).blur();
    //1栏即征即退本月数=《附列资料表一》第9列合计销售额“6+7”行
    $('#001_11_9').val(v002_0_2).blur();
    //4栏《附列资料表一》纳税检查调整销售额，即第7列第1至5行之和；
    var v002_0_3 = Number(_this.getValueFromCheckData('002','0_3'));//D1第7列第1至5行之和
    $('#001_14_6').val(v002_0_3).blur();
    //5栏一般项目本月数=《附列资料表一》第9列第8至13b行之和-第9列第14、15行之和
    var v002_0_4 = Number(_this.getValueFromCheckData('002','0_4'));//E1第9列第8至13b行之和
    var v002_0_5 = Number(_this.getValueFromCheckData('002','0_5'));//F1第9列第14、15行之和
    $('#001_15_6').val(v002_0_4-v002_0_5).blur();
    //5栏即征即退本月数=《附列资料表一》第9列第14、15行之和
    $('#001_15_9').val(v002_0_5).blur();
    //7栏一般项目等于《附列资料表一》第9列第16、17行之和
    var v002_0_6 = Number(_this.getValueFromCheckData('002','0_6'));//G1第9列第16、17行之和
    $('#001_17_6').val(v002_0_6).blur();
    //8栏一般项目等于《附列资料表一》第9列第18、19行之和
    var v002_0_7 = Number(_this.getValueFromCheckData('002','0_7'));//H1第9列第18、19行之和
    $('#001_18_6').val(v002_0_7).blur();
    //11栏一般项目等于《附列资料表一》（第10列第1、3行之和-10列第6行）+（第14列第2、4、5行之和-14列第7行）
    var v002_0_8 = Number(_this.getValueFromCheckData('002','0_8'));//I1（第10列第1、3行之和）+（第14列第2、4、5行之和）
    var v002_0_9 = Number(_this.getValueFromCheckData('002','0_9'));//J1（10列第6行）+（14列第7行）
    $('#001_21_6').val(v002_0_8-v002_0_9).blur();
    //11栏即征即退项目等于《附列资料表一》第10列第6行+第14列第7行
    $('#001_21_9').val(v002_0_9).blur();


    /*如果为逾期未认定的纳税人主表中12、13、14、15、20栏不能填写。20=17-18计算出20栏不等于0时，系统也按20栏等于0处理*/
    var YQWRDBZ = _this.wsxxMap['YQWRDBZ'];
    if(YQWRDBZ === "0"){
        //12栏一般项目附表2第12栏税额
        var v003_18_5 = Number(_this.getValueFromCheckData('003','18_5'));
        $('#001_0_1').val(v003_18_5).blur();
    }
    //16栏一般项目等于《附列资料表一》第8列第1至5行之和+《附列资料（二）》第19栏D28
    var v002_0_10 = Number(_this.getValueFromCheckData('002','0_10'));//K1第8列第1至5行之和
    var v003_27_3 = Number(_this.getValueFromCheckData('003','27_3'));//《附列资料（二）》第19栏D28
    $('#001_26_6').val(v002_0_10+v003_27_3).blur();
    //21栏一般项目等于《附列资料（一）》（第10列第8至11行之和-第10列第14行）+（第14列第12行至13b行之和-第14列第15行）
    var v002_0_11 = Number(_this.getValueFromCheckData('002','0_11'));//L1（第10列第8至11行之和）+（第14列第12行至13b行之和）
    var v002_0_12 = Number(_this.getValueFromCheckData('002','0_12'));//M1（第10列第14行）+（第14列第15行）
    $('#001_31_6').val(v002_0_11-v002_0_12).blur();
    //21栏即征即退项目等于《附列资料（一）》第10列第14行+第14列第15行
    $('#001_31_9').val(v002_0_12).blur();
    //14栏一般项目等于《附列资料（二）》第13栏税额
    var v003_21_3 = Number(_this.getValueFromCheckData('003','21_3'));//《附列资料（二）》第13栏 一般项目进项税额转出
    $('#001_24_6').val(v003_21_3).blur();
    /*
     * 【河北】：
     * 28栏分次预缴税额=核定BQFCYJSE（本期分次预缴）数值 +附表4 的分支机构预征缴纳税款本期实际抵减税额，可手工修。
     * （征即退栏次优先，即如果是即征即退纳税人JZJTBZ标志为Y，数值放在28栏第3列，否则放在28栏第1列，可手工修改调整数值）
     * */
    var fcyjse = Number(_this.wsxxMap['BQFCYJSE'])+Number(_this.getValueFromCheckData('031','9_8'))
        +Number(_this.getValueFromCheckData('031','10_8'))+Number(_this.getValueFromCheckData('031','11_8'))
        +Number(_this.getValueFromCheckData('031','12_8'));
    if(_this.wsxxMap['JZJTBZ'] === 'Y'){
        $('#001_38_9').val(fcyjse).blur();
    }else{
        $('#001_38_6').val(fcyjse).blur();
    }
};
/*第4栏和第6栏纳税调整销售额本月数不能输入负数*/
table_001.checkNstzxse = function () {
    if (Number($('#001_14_6').val()) < 0){
        mini.alert('第4栏“纳税检查调整的销售额”一般项目本月数应该大于等于0，请调整！');
        $('#001_14_6').parent().addClass('report_error');
        return false;
    }
    if (Number($('#001_14_9').val()) < 0){
        mini.alert('第4栏“纳税检查调整的销售额”即征即退项目本月数应该大于等于0，请调整！');
        $('#001_14_9').parent().addClass('report_error');
        return false;
    }
    if (Number($('#001_16_6').val()) < 0){
        mini.alert('第6栏“其中：纳税检查调整的销售额”一般项目本月数应该大于等于0，请调整！');
        $('#001_16_6').parent().addClass('report_error');
        return false;
    }
    if (Number($('#001_16_9').val()) < 0){
        mini.alert('第6栏“其中：纳税检查调整的销售额”即征即退项目本月数应该大于等于0，请调整！');
        $('#001_16_9').parent().addClass('report_error');
        return false;
    }
    return true;
};
servyouReport.checkTable_001 = function () {
    if (!table_001.checkNstzxse()){
        return false;
    }
    /**
     * 更正申报时，应补退税额必须大于等于上次申报的值
     * */
    /*var ybtse = Number($('#001_44_6').val())+Number($('#001_44_9').val());
    if(parent.yearReport.businessType === 'correct' && ybtse < Number(this.wsxxMap['YBTSE'])){
        mini.alert('本系统不支持更正金额小于已缴款金额，请去大厅办理！');
        return false;
    }*/
    return true;
};
/*提示性校验*/
servyouReport.checkDoShowMessage = function () {
    var errorMsgs = [];
    $.each(this.tables, function (sb_id, table) {
        var curMsgs = table.checkDoShowMessage();
        if(curMsgs.length>0){
            errorMsgs = errorMsgs.concat(curMsgs);
        }
    });
    if (parent.yearReport.sb_data['073'].status === '1'){
        errorMsgs.push('您填报了《汇总纳税企业增值税分配表》，主表数据若有修改，请保存后打开《汇总纳税企业增值税分配表》确认数据正确。')
    }
    return errorMsgs;
};