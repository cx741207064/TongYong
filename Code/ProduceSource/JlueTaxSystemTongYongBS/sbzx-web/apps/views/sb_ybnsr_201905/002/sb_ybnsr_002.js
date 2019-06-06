/**
 * Created by chenjunj on 2017/5/27 17:10.
 */
var table_002 = {
    //根据税种类别代码区分哪些行列是可编辑的
    disableTrIndexsBySZLBDM: {
        hw_disable_tr_indexs: [8, 11, 12, 14, 17, 20, 25, 27, 29],
        fw_disable_tr_indexs: [7, 9, 10, 13, 15, 16, 19, 24, 26, 28]
    },
    customInitFromHd_002: function (_this) {
        this.allowEditByYZLBZ(_this);
        this.allowEditByJYZSBZ(_this);
        this.allowEditBySZLBDM(_this);
    },
    /**
     * 河北：
     * 一、核定节点YZLBZ(注：预征率标志，范围：0\1\2\3)
     * 1、3的时候13a\13b\13c都是只读。
     * 2、2的时候13c放开填，13a\13b只读。
     * 3、1的时候13a\13b放开填。
     * 4、0的时候13a放开填。
     * 二、对于放开填写的情况，13a/b/c栏次取 YBNSRFZJGYZL（一般纳税人分支机构预征率）显示在13a/b/c栏次名称列。
     * */
    allowEditByYZLBZ: function (_this) {
        var YZLBZ = _this.wsxxMap['YZLBZ'];
        var $yzlTrs = $('#table_002 tr:lt(24):gt(20)');

        var YBNSRFZJGYZL = (Number(_this.wsxxMap['YBNSRFZJGYZL']) * 100).toFixed(4);
        if (YZLBZ === '0') {
            //0的时候13a放开填。
            $yzlTrs.eq(0).find('span.YBNSRFZJGYZL').html(YBNSRFZJGYZL);
            $(".left_13a_YBNSRFZJGYZL").html(YBNSRFZJGYZL);
            $yzlTrs.eq(1).find('input:not([disabled="disabled"])').attr('disabled', 'disabled');
            $yzlTrs.eq(2).find('input:not([disabled="disabled"])').attr('disabled', 'disabled');
        } else if (YZLBZ === '1') {
            //1的时候13a\13b放开填。
            $yzlTrs.eq(0).find('span.YBNSRFZJGYZL').html(YBNSRFZJGYZL);
            $yzlTrs.eq(1).find('span.YBNSRFZJGYZL').html(YBNSRFZJGYZL);
            $(".left_13a_YBNSRFZJGYZL").html(YBNSRFZJGYZL);
            $(".left_13b_YBNSRFZJGYZL").html(YBNSRFZJGYZL);
            $yzlTrs.eq(2).find('input:not([disabled="disabled"])').attr('disabled', 'disabled');
        } else if (YZLBZ === '2') {
            //2的时候13c放开填，13a\13b只读。
            $yzlTrs.eq(0).find('input:not([disabled="disabled"])').attr('disabled', 'disabled');
            $yzlTrs.eq(1).find('input:not([disabled="disabled"])').attr('disabled', 'disabled');
            $yzlTrs.eq(2).find('span.YBNSRFZJGYZL').html(YBNSRFZJGYZL);
            $(".left_13c_YBNSRFZJGYZL").html(YBNSRFZJGYZL);
        } else if (YZLBZ === '3') {
            //3的时候13a\13b\13c都是只读。
            $yzlTrs.find('input:not([disabled="disabled"])').attr('disabled', 'disabled');
        }
    },
    /**
     * JYZSBZ为0时，8到12行，14,15行整行不能填写
     * */
    allowEditByJYZSBZ: function (_this) {
        if (_this.wsxxMap['JYZSBZ'] === '0') {
            $('#table_002 tr:lt(21):gt(14)').find('input').val('0.00').attr('disabled', 'disabled').blur();
            $('#table_002 tr:lt(26):gt(23)').find('input').val('0.00').attr('disabled', 'disabled').blur();
        }
    },
    /**
     * 根据税种类别代码决定不能编辑的行
     * 若是货物，则不控制服务的行不能填
     * 若是服务，则不能填写货物的行
     * 若是混营，则货物和服务的行都放开填写
     * */
    allowEditBySZLBDM: function (_this) {
        var $trs = $('#table_002 tr');
        if (_this.wsxxMap['SZLBDM'] === '02') {
            $.each(this.disableTrIndexsBySZLBDM['fw_disable_tr_indexs'], function (i, index) {
                $trs.eq(index).find('input').attr('disabled', 'disabled');
            })
        }
    },
    setYbjcBqxsmxData: function (ybjc) {
        var ybjcData = ybjc;
        if (!ybjcData) {
            return;
        }
        var data = ybjcData.bqxsmx;
        var $tr = $('table.bqxsmx').find('tbody tr');
        for (var row_col in data) {
            var arr = row_col.split('_'),
                row = arr[0],
                col = arr[1],
                val = data[row_col];
            $tr.eq(row).find('td input').eq(col).val(val).blur();
        }
        /* $('table.bqxsmx tbody tr').each(function (i,v) {
         $(v).find('input:eq(0)').blur();
         });*/
    },
    //固定左侧表头
    bindEventforFix: function () {
        window.onscroll = function () {
            var headToTopHeight = $('#table_002 tbody tr:eq(0)').offset().top;//固定表头到页面顶部的距离
            var fixedHeadToTableTop = $('#table_002 tbody tr:eq(0)').offset().top - $('#table_002').offset().top;//固定表头自身高度
            var scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//页面滚动高度
            if (scrollHeight >= headToTopHeight) {
                $('#topHeader').css({
                    'top': scrollHeight - headToTopHeight + fixedHeadToTableTop + 'px',
                    'display': 'block'
                });
                $('#pHeader').css({
                    'top': scrollHeight - headToTopHeight + fixedHeadToTableTop + 'px',
                    'display': 'block'
                });
            } else {
                $('#topHeader').hide();
                $('#pHeader').css({
                    'top': '128px',
                    'display': 'none'
                });
            }
        };
        //横向滚动
        var $leftHeader = $("#leftHeader");
        $leftHeader.css({'top': 128 + "px"});
        $('#pHeader').css({'top': 128 + "px"});
        document.getElementById('table-box-002').onscroll = function () {
            var scrollWidth = $('#table-box-002').scrollLeft();
            if (scrollWidth > 0) {
                $leftHeader.css({
                    'left': scrollWidth + 'px',
                    'display': 'block'
                });
                $('#pHeader').css({
                    'left': scrollWidth + 'px',
                    'display': 'block'
                });
            } else {
                $leftHeader.hide();
                $('#pHeader').css({
                    'left': '0',
                    'display': 'none'
                });
            }
        };
    }
};
servyouReport.customEvent = function () {
    table_002.bindEventforFix();
};
servyouReport.autoAddAllId = true;
servyouReport.customInitFromHd = function () {
    table_002.customInitFromHd_002(this);
};
servyouReport.afterInit = function () {
    /*if(parent.ybnsr.isFromYbjc){
        table_002.setYbjcBqxsmxData(parent.ybnsr.ybjcData);
    }else if(parent.ybnsr.isFromSbhy){
        var data086 = parent.yearReport.sb_data['086'].checkData;
        var data087 = parent.yearReport.sb_data['087'].checkData;
        if(data087 && !$.isEmptyObject(data087)){
            ybnsrService.setDataFromSbhy(data087['002']);
        }else if(data086 && !$.isEmptyObject(data086)){
            var ybjc = data086.ybjcData;
            table_002.setYbjcBqxsmxData(ybjc);
        }
    }*/
    var data086 = parent.yearReport.sb_data['086'];
    var data087 = parent.yearReport.sb_data['087'];
    if (parent.ybnsr.needOuterYbjc) {
        table_002.setYbjcBqxsmxData(parent.ybnsr.outerYbjcData);
        table_002.allowEditByJYZSBZ(servyouReport);
    } else if (parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
        ybnsrService.setDataFromDataMap(data087['checkData']['002']);
        table_002.allowEditByJYZSBZ(servyouReport);
    } else if (parent.ybnsr.needInnerYbjc && data086 && !$.isEmptyObject(mini.decode(data086.checkData))) {
        table_002.setYbjcBqxsmxData(data086['checkData']['ybjcData']);
        table_002.allowEditByJYZSBZ(servyouReport);
    }
};


servyouReport.setDataIntoCheckData = function () {
    var obj = {
        '0_1': $('#002_0_1').val(),//B1第9列合计销售额“1+2+3+4+5”行
        '0_2': $('#002_0_2').val(),//C1第9列合计销售额“6+7”行
        '0_3': $('#002_0_3').val(),//D1第7列第1至5行之和
        '0_4': $('#002_0_4').val(),//E1第9列第8至13b行之和
        '0_5': $('#002_0_5').val(),//F1第9列第14、15行之和
        '0_6': $('#002_0_6').val(),//G1第9列第16、17行之和
        '0_7': $('#002_0_7').val(),//H1第9列第18、19行之和
        '0_8': $('#002_0_8').val(),//I1（第10列第1、3行之和）+（第14列第2、4、5行之和）
        '0_9': $('#002_0_9').val(),//J1（10列第6行）+（14列第7行）
        '0_10': $('#002_0_10').val(),//K1第8列第1至5行之和
        '0_11': $('#002_0_11').val(),//L1（第10列第8至11行之和）+（第14列第12行至13b行之和）
        '0_12': $('#002_0_12').val(),//M1（第10列第14行）+（第14列第15行）
        '0_13': $('#002_0_13').val(),//N1附表一:货物：简易征收货劳税额： B1=附表1第10列（8+9+10+11-14）
        '0_14': $('#002_0_14').val(),//O1附表一：服务：简易征收服务税额：B2=附表1第14列（9b+12+13a+13b-15）
        '0_15': $('#002_0_15').val(),//P1----a1：附表1，一般计税的货劳在一般计税的占比=【10列（1+3-6栏）】/【10列（1+3-6栏）+14列（2+4+5-7）栏】
        '0_16': $('#002_0_16').val(),//Q1-----x1：附表1，即征即退货劳在即征即退的占比=【10列6栏）】/【10列6栏+14列7栏】
        '1_1': $('#002_1_1').val(),//Q1-----B2：《附表一》第1、3、4a行第10列之和-《附表一》第6行第10列
        '1_2': $('#002_1_2').val(),//Q1-----C2：《附表一》第10列第6行+第14行）
        '7_6': $('#002_7_6').val(),
        '7_7': $('#002_7_7').val(),
        '7_15': $('#002_7_15').val(),
        '8_6': $('#002_8_6').val(),
        '8_7': $('#002_8_7').val(),
        '8_14': $('#002_8_14').val(),
        '8_15': $('#002_8_15').val(),
        '8_16': $('#002_8_16').val(),
        '8_17': $('#002_8_17').val(),
        '9_6': $('#002_9_6').val(),
        '9_7': $('#002_9_7').val(),
        '10_6': $('#002_10_6').val(),
        '10_7': $('#002_10_7').val(),
        '10_14': $('#002_10_14').val(),
        '10_15': $('#002_10_15').val(),
        '10_16': $('#002_10_16').val(),
        '10_17': $('#002_10_17').val(),
        '11_6': $('#002_11_6').val(),
        '11_7': $('#002_11_7').val(),
        '11_14': $('#002_11_14').val(),
        '11_15': $('#002_11_15').val(),
        '11_16': $('#002_11_16').val(),
        '11_17': $('#002_11_17').val(),
        '12_6': $('#002_12_6').val(),
        '12_7': $('#002_12_7').val(),
        '12_14': $('#002_12_14').val(),
        '12_15': $('#002_12_15').val(),
        '12_16': $('#002_12_16').val(),
        '12_17': $('#002_12_17').val(),
        '13_15': $('#002_13_15').val(),
        '14_16': $('#002_14_16').val(),
        '15_6': $('#002_15_6').val(),
        '15_7': $('#002_15_7').val(),
        '15_15': $('#002_15_15').val(),
        '16_6': $('#002_16_6').val(),
        '16_7': $('#002_16_7').val(),
        '16_14': $('#002_16_14').val(),
        '16_15': $('#002_16_15').val(),
        '16_16': $('#002_16_16').val(),
        '16_17': $('#002_16_17').val(),
        '17_6': $('#002_17_6').val(),
        '17_7': $('#002_17_7').val(),
        '17_14': $('#002_17_14').val(),
        '17_15': $('#002_17_15').val(),
        '17_16': $('#002_17_16').val(),
        '17_17': $('#002_17_17').val(),
        '18_6': $('#002_18_6').val(),
        '18_7': $('#002_18_7').val(),
        '18_15': $('#002_18_15').val(),
        '19_7': $('#002_19_7').val(),
        '19_6': $('#002_19_6').val(),
        '19_14': $('#002_19_14').val(),
        '19_15': $('#002_19_15').val(),
        '19_16': $('#002_19_16').val(),
        '19_17': $('#002_19_17').val(),
        '20_6': $('#002_20_6').val(),
        '20_7': $('#002_20_7').val(),
        '20_14': $('#002_20_14').val(),
        '20_15': $('#002_20_15').val(),
        '20_16': $('#002_20_16').val(),
        '20_17': $('#002_20_17').val(),
        '21_14': $('#002_21_14').val(),
        '21_15': $('#002_21_15').val(),
        '21_16': $('#002_21_16').val(),
        '21_17': $('#002_21_17').val(),
        '22_14': $('#002_22_14').val(),
        '22_15': $('#002_22_15').val(),
        '22_16': $('#002_22_16').val(),
        '22_17': $('#002_22_17').val(),
        '23_14': $('#002_23_14').val(),  //预征率的合计销售额
        '23_16': $('#002_23_16').val(),
        '24_15': $('#002_24_15').val(),//附表1第10列第14行
        '25_19': $('#002_25_19').val(),//附表1第14列第15行
        '25_16': $('#002_25_16').val(),
        '26_17': $('#002_26_17').val(),
        '27_16': $('#002_27_16').val(),
        '27_17': $('#002_27_17').val(),
        '28_17': $('#002_28_17').val(),
        '29_16': $('#002_29_16').val(),
        '29_17': $('#002_29_17').val()
    };
    return obj;
};
servyouReport.customInit = function () {
    table_002.customInitFromHd_002(this);
    if(!parent.ybnsr.needOuterYbjc && !parent.ybnsr.needInnerYbjc){
        !$('#002_7_6').attr('disabled') && $('#002_7_6').val(parent.yearReport.sb_data['xxfpxx']['ybjs-13-zyfp-je']).blur();
        !$('#002_7_7').attr('disabled') && $('#002_7_7').val(parent.yearReport.sb_data['xxfpxx']['ybjs-13-zyfp-se']).blur();
        !$('#002_7_8').attr('disabled') && $('#002_7_8').val(parent.yearReport.sb_data['xxfpxx']['ybjs-13-qtfp-je']).blur();
        !$('#002_7_9').attr('disabled') && $('#002_7_9').val(parent.yearReport.sb_data['xxfpxx']['ybjs-13-qtfp-se']).blur();
        !$('#002_8_6').attr('disabled') && $('#002_8_6').val(parent.yearReport.sb_data['xxfpxx']['ysfw-13-zyfp-je']).blur();
        !$('#002_8_7').attr('disabled') && $('#002_8_7').val(parent.yearReport.sb_data['xxfpxx']['ysfw-13-zyfp-se']).blur();
        !$('#002_8_8').attr('disabled') && $('#002_8_8').val(parent.yearReport.sb_data['xxfpxx']['ysfw-13-qtfp-je']).blur();
        !$('#002_8_9').attr('disabled') && $('#002_8_9').val(parent.yearReport.sb_data['xxfpxx']['ysfw-13-qtfp-se']).blur();
        !$('#002_10_6').attr('disabled') && $('#002_10_6').val(parent.yearReport.sb_data['xxfpxx']['ybjs-9-zyfp-je']).blur();
        !$('#002_10_7').attr('disabled') && $('#002_10_7').val(parent.yearReport.sb_data['xxfpxx']['ybjs-9-zyfp-se']).blur();
        !$('#002_10_8').attr('disabled') && $('#002_10_8').val(parent.yearReport.sb_data['xxfpxx']['ybjs-9-qtfp-je']).blur();
        !$('#002_10_9').attr('disabled') && $('#002_10_9').val(parent.yearReport.sb_data['xxfpxx']['ybjs-9-qtfp-se']).blur();
        !$('#002_11_6').attr('disabled') && $('#002_11_6').val(parent.yearReport.sb_data['xxfpxx']['ysfw-9-zyfp-je']).blur();
        !$('#002_11_7').attr('disabled') && $('#002_11_7').val(parent.yearReport.sb_data['xxfpxx']['ysfw-9-zyfp-se']).blur();
        !$('#002_11_8').attr('disabled') && $('#002_11_8').val(parent.yearReport.sb_data['xxfpxx']['ysfw-9-qtfp-je']).blur();
        !$('#002_11_9').attr('disabled') && $('#002_11_9').val(parent.yearReport.sb_data['xxfpxx']['ysfw-9-qtfp-se']).blur();
        !$('#002_12_6').attr('disabled') && $('#002_12_6').val(parent.yearReport.sb_data['xxfpxx']['ybjs-6-zyfp-je']).blur();
        !$('#002_12_7').attr('disabled') && $('#002_12_7').val(parent.yearReport.sb_data['xxfpxx']['ybjs-6-zyfp-se']).blur();
        !$('#002_12_8').attr('disabled') && $('#002_12_8').val(parent.yearReport.sb_data['xxfpxx']['ybjs-6-qtfp-je']).blur();
        !$('#002_12_9').attr('disabled') && $('#002_12_9').val(parent.yearReport.sb_data['xxfpxx']['ybjs-6-qtfp-se']).blur();
        if (this.wsxxMap['JYZSBZ'] !== '0') {
            !$('#002_15_6').attr('disabled') && $('#002_15_6').val(parent.yearReport.sb_data['xxfpxx']['jyjs-6-zyfp-je']).blur();
            !$('#002_15_7').attr('disabled') && $('#002_15_7').val(parent.yearReport.sb_data['xxfpxx']['jyjs-6-zyfp-se']).blur();
            !$('#002_15_8').attr('disabled') && $('#002_15_8').val(parent.yearReport.sb_data['xxfpxx']['jyjs-6-qtfp-je']).blur();
            !$('#002_15_9').attr('disabled') && $('#002_15_9').val(parent.yearReport.sb_data['xxfpxx']['jyjs-6-qtfp-se']).blur();
            !$('#002_16_6').attr('disabled') && $('#002_16_6').val(parent.yearReport.sb_data['xxfpxx']['jyjs-5-zyfp-je']).blur();
            !$('#002_16_7').attr('disabled') && $('#002_16_7').val(parent.yearReport.sb_data['xxfpxx']['jyjs-5-zyfp-se']).blur();
            !$('#002_16_8').attr('disabled') && $('#002_16_8').val(parent.yearReport.sb_data['xxfpxx']['jyjs-5-qtfp-je']).blur();
            !$('#002_16_9').attr('disabled') && $('#002_16_9').val(parent.yearReport.sb_data['xxfpxx']['jyjs-5-qtfp-se']).blur();
            !$('#002_17_6').attr('disabled') && $('#002_17_6').val(parent.yearReport.sb_data['xxfpxx']['ysfw-5-zyfp-je']).blur();
            !$('#002_17_7').attr('disabled') && $('#002_17_7').val(parent.yearReport.sb_data['xxfpxx']['ysfw-5-zyfp-se']).blur();
            !$('#002_17_8').attr('disabled') && $('#002_17_8').val(parent.yearReport.sb_data['xxfpxx']['ysfw-5-qtfp-je']).blur();
            !$('#002_17_9').attr('disabled') && $('#002_17_9').val(parent.yearReport.sb_data['xxfpxx']['ysfw-5-qtfp-se']).blur();
            !$('#002_18_6').attr('disabled') && $('#002_18_6').val(parent.yearReport.sb_data['xxfpxx']['jyjs-4-zyfp-je']).blur();
            !$('#002_18_7').attr('disabled') && $('#002_18_7').val(parent.yearReport.sb_data['xxfpxx']['jyjs-4-zyfp-se']).blur();
            !$('#002_18_8').attr('disabled') && $('#002_18_8').val(parent.yearReport.sb_data['xxfpxx']['jyjs-4-qtfp-je']).blur();
            !$('#002_18_9').attr('disabled') && $('#002_18_9').val(parent.yearReport.sb_data['xxfpxx']['jyjs-4-qtfp-se']).blur();
            !$('#002_19_6').attr('disabled') && $('#002_19_6').val(parent.yearReport.sb_data['xxfpxx']['jyjs-3-zyfp-je']).blur();
            !$('#002_19_7').attr('disabled') && $('#002_19_7').val(parent.yearReport.sb_data['xxfpxx']['jyjs-3-zyfp-se']).blur();
            !$('#002_19_8').attr('disabled') && $('#002_19_8').val(parent.yearReport.sb_data['xxfpxx']['jyjs-3-qtfp-je']).blur();
            !$('#002_19_9').attr('disabled') && $('#002_19_9').val(parent.yearReport.sb_data['xxfpxx']['jyjs-3-qtfp-se']).blur();
            !$('#002_20_6').attr('disabled') && $('#002_20_6').val(parent.yearReport.sb_data['xxfpxx']['ysfw-3-zyfp-je']).blur();
            !$('#002_20_7').attr('disabled') && $('#002_20_7').val(parent.yearReport.sb_data['xxfpxx']['ysfw-3-zyfp-se']).blur();
            !$('#002_20_8').attr('disabled') && $('#002_20_8').val(parent.yearReport.sb_data['xxfpxx']['ysfw-3-qtfp-je']).blur();
            !$('#002_20_9').attr('disabled') && $('#002_20_9').val(parent.yearReport.sb_data['xxfpxx']['ysfw-3-qtfp-se']).blur();
        }
        !$('#002_28_6').attr('disabled') && $('#002_28_6').val(parent.yearReport.sb_data['xxfpxx']['ms-0-zyfp-je']).blur();
        !$('#002_28_7').attr('disabled') && $('#002_28_7').val(parent.yearReport.sb_data['xxfpxx']['ms-0-zyfp-se']).blur();
        !$('#002_28_8').attr('disabled') && $('#002_28_8').val(parent.yearReport.sb_data['xxfpxx']['ms-0-qtfp-je']).blur();
        !$('#002_29_8').attr('disabled') && $('#002_29_8').val(parent.yearReport.sb_data['xxfpxx']['ysfw-0-qtfp-je']).blur();
    }
};
/*002转报文*/
servyouReport.changeXml_002 = function () {
    var $xml = this.getJ3Xml('002');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    var bqxsqkmxbGridlbVOs = $xml.find('bqxsqkmxbGridlbVO');
    $('#table_002 tr:lt(30):gt(6)').each(function (i, curTr) {
        var VOChildren = $(bqxsqkmxbGridlbVOs[i]).children();
        $(curTr).find('td:gt(5)').each(function (j, curTd) {
            if (i === 2 && j < 10){
                VOChildren.eq(j + 2).text($(curTd).find('input').val() || '0.00');
            } else {
                VOChildren.eq(j + 2).text($(curTd).find('input').val() || '');
            }
        });
    });
    // parent.yearReport.sb_data['002'].j3xml = $xml[0];
    return $xml;
};
servyouReport.customResumeFromXml_002 = function () {
    var _this = this;
    var $trs = $('#table_002 tbody tr');
    $(this.j3CorrectXml).find('zzssyyybnsr01_bqxsqkmxb bqxsqkmxbGrid bqxsqkmxbGridlbVO').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        var trIndex;
        if (ewbhxh < 4) {
            trIndex = ewbhxh + 2;
        } else if (ewbhxh > 3 && ewbhxh < 10) {
            trIndex = ewbhxh + 3;
        } else if (ewbhxh > 9 && ewbhxh < 14) {
            trIndex = ewbhxh + 4;
        } else if (ewbhxh > 13 && ewbhxh < 20) {
            trIndex = ewbhxh + 6;
        } else if (ewbhxh > 19 && ewbhxh < 22) {
            trIndex = ewbhxh - 2;
        } else if (ewbhxh === 22) {
            trIndex = 13;
        } else if (ewbhxh === 23) {
            trIndex = 6;
        }
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('kjskzzszyfpXse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(7)').children(), $(this).find('kjskzzszyfpXxynse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(8)').children(), $(this).find('kjqtfpXse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(9)').children(), $(this).find('kjqtfpXxynse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(10)').children(), $(this).find('wkjfpXse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(11)').children(), $(this).find('wkjfpXxynse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(12)').children(), $(this).find('nsjctzdxse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(13)').children(), $(this).find('nsjctzXxynse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(14)').children(), $(this).find('xse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(15)').children(), $(this).find('hjXxynse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(16)').children(), $(this).find('jshj').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(17)').children(), $(this).find('ysfwkcxmbqsjkcje').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(18)').children(), $(this).find('kchHsmsxse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(19)').children(), $(this).find('kchXxynse').text());
    })
};

$(function () {
    servyouReport.init();
});

/**
 * Created by liun on 2017/12/22.
 */
table_002.disableTrIndexsBySZLBDM.fw_disable_tr_indexs = [7,10,13,15,16,19,24,26,28];
table_002.allowEditBySZLBDM = function (_this) {
    var $trs = $('#table_002 tr');
    $trs.eq(9).find('input').attr('disabled','disabled');
    if(_this.wsxxMap['SZLBDM'] === '02'){
        $.each(this.disableTrIndexsBySZLBDM['fw_disable_tr_indexs'], function (i,index) {
            $trs.eq(index).find('input').attr('disabled','disabled');
        })
    }
};
table_002.checkWkjfp = function (_this) {
    var $trs = $('#table_002 tbody tr:gt(2)');
    var WKJFPXSEHJ = _this.wsxxMap['WKJFPXSEHJ'] || 0,
        WKJFPXXSEHJ = _this.wsxxMap['WKJFPXXSEHJ'] || 0;
    var wkjfpXse = 0,
        wkjfpXxse = 0;
    for(var i = 0; i < $trs.length; i++){
        wkjfpXse += (Number($trs.eq(i).find('td:eq(10) input').val()) || 0);
    }
    for(var i = 0; i < $trs.length; i++){
        wkjfpXxse += (Number($trs.eq(i).find('td:eq(11) input').val()) || 0);
    }
    if(wkjfpXse < 0){
        if((WKJFPXSEHJ > 0 && Math.abs(wkjfpXse) > WKJFPXSEHJ) || WKJFPXSEHJ <= 0){
            mini.alert('您填写的增值税纳税申报表附列资料（一）【本期销售情况明细表】中未开具发票销售额所有栏次之和小于0，请至办税大厅申报。');
            return false;
        }
    }
    if(wkjfpXxse < 0){
        if((WKJFPXXSEHJ > 0 && Math.abs(wkjfpXxse) > WKJFPXXSEHJ) || WKJFPXXSEHJ <= 0){
            mini.alert('您填写的增值税纳税申报表附列资料（一）【本期销售情况明细表】中未开具发票销项(应纳)税额所有栏次之和小于0，请至办税大厅申报。');
            return false;
        }
    }
    return true;
};
servyouReport.checkTable_002 = function () {
    if(this.wsxxMap['WKPJKBMD'] === 'N'){
        return table_002.checkWkjfp(this);
    }
    else return true;
};
servyouReport.customEvent = function () {
    table_002.bindEventforFix();
    table_002.bindConfirm();//河北特色
};
table_002.bindConfirm = function () {
    //河北特色：4%税率栏次填写有数，提示：现行政策已不存在4%征收率，请核实是否误填此栏次！提示后仍然允许填写
    $('#table_002').on('change', 'input[confirm="Y"]', function () {
        if(Number($(this).val()) > 0){
            mini.alert('现行政策已不存在4%征收率，请核实是否误填此栏次！');
        }
    });
};
table_002.customInitFromHd_002 = function (_this) {
    this.allowEditByYZLBZ(_this);
    this.allowEditByCEZSBZ(_this);//河北特色
    this.allowEditByJYZSBZ(_this);
    this.allowEditBySZLBDM(_this);
};
table_002.allowEditByCEZSBZ = function (_this) {
    //河北特色：只有有差额征税资格的企业才允许填写附表一的第12列和附表三，否则相应单元格只读。
    if(_this.wsxxMap['CEZSBZ'] === 'N'){
        $('#table_002 tr').find('td:eq(17) input').attr('disabled','disabled');
    }
};
