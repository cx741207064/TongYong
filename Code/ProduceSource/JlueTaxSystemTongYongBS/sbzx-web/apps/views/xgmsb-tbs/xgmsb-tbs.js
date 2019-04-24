/**
 * Created by chenjunj on 2017/6/16 15:47.
 */
var xgm = {
    allowEditIndexs_001: [
        [1, 2, 3, 7, 8, 12, 13, 14, 18, 23],//货劳主表本期允许填写的栏次
        [1, 2, 3, 4, 5, 6, 12, 13, 14, 18, 19, 23],//服务主表本期允许填写的栏次
        [],//货劳主表累计允许填写的栏次
        []//服务主表累计允许填写的栏次
    ],
    /**
     * 001初始化期初数据到页面中
     * */
    customInitFromHd_001: function (_this) {
        $('#001_21_4').val(_this.wsxxMap['YSHWHDXSE']).blur(); // ,#001_21_8
        $('#001_21_6').val(_this.wsxxMap['YSFWHDXSE']).blur(); // ,#001_21_10
        $('#001_23_4').val(_this.wsxxMap['YSHWHDYNSE']).blur(); // #001_23_8
        $('#001_23_6').val(_this.wsxxMap['YSFWHDYNSE']).blur(); // #001_23_10
        $('#001_29_4').val(_this.wsxxMap['BQYSHWYJ']).blur();
        $('#001_29_6').val(_this.wsxxMap['BQYSFWYJ']).blur();

        $('#001_21_8').val(Number(_this.wsxxMap['YSHWHDXSE']) + Number(_this.lsxxMap['45'] || 0)).blur(); // 货物核定销售额 合计
        $('#001_21_10').val(Number(_this.wsxxMap['YSFWHDXSE']) + Number(_this.lsxxMap['47'] || 0)).blur(); // 服务核定销售额 合计
        $('#001_23_8').val(Number(_this.wsxxMap['YSHWHDYNSE']) + Number(_this.lsxxMap['46'] || 0)).blur(); // 货物核定应纳税额
        $('#001_23_10').val(Number(_this.wsxxMap['YSFWHDYNSE']) + Number(_this.lsxxMap['48'] || 0)).blur(); // 服务核定应纳税额
    },
    /**
     * 006初始化期初数据到页面中
     * */
    customInitFromHd_006: function (_this) {
        $('#006_7_0').val(_this.wsxxMap['XGMFB1QCYE']).blur();
        $('#006_15_0').val(_this.wsxxMap['XGMFB1QCYE5']).blur();
    },
    /**
     * 001自定义初始化
     * */
    customInit_001: function (_this) {
        this.showTips(_this);       //提示界面
        this.addFormulas_001(_this);//添加历史信息等相关公式
        this.allowInputEditable_001(_this);//控制是否允许填写
    },
    showTips: function (_this) {
        var szlbmc = '';
        if (_this.wsxxMap['SZLBDM'] === '01') {
            szlbmc += '“货物及劳务”';
        }
        if (_this.wsxxMap['SZLBDM'] === '02') {
            szlbmc += '“服务、不动产和无形资产”';
        }
        if (_this.wsxxMap['SZLBDM'] === '03') {
            szlbmc += '兼有“货物及劳务”和“服务、不动产和无形资产”';
        }
        var tips = '（1）您在税务机关登记的是【' + szlbmc + '】增值税纳税人；<br>';
        tips += '（2）您的预缴税额【货物及劳务为' + _this.wsxxMap['BQYSHWYJ'] + '，服务、不动产和无形资产为' + _this.wsxxMap['BQYSFWYJ'] + '】；<br>';
        tips += '（3）您的核定销售额【货物及劳务为' + _this.wsxxMap['YSHWHDXSE'] + '，服务、不动产和无形资产为' + _this.wsxxMap['YSFWHDXSE'] + '】；<br>';
        tips += '（4）如与您的纳税人类型、期初数不一致，请与主管税务机关联系核查，谢谢！';
        mini.showMessageBox({
            width: 600,
            height: 300,
            title: '温馨提示',
            message: tips,
            buttons: ["ok"]
        });
    },
    /**
     * 自定义001表输入框可否编辑
     * */
    allowInputEditable_001: function (_this) {
        var $trs = $('#table_001 tr:lt(31):gt(6)');
        var szlbdm = _this.wsxxMap['SZLBDM'];
        $.each(this.allowEditIndexs_001, function (i, arr) {
            var tdIndex = (i + 1) * 2 + 2;
            if (szlbdm === '01' && [1, 3].indexOf(i) !== -1) {
                return true;
            }
            if (szlbdm === '02' && [0, 2].indexOf(i) !== -1) {
                return true;
            }
            $.each(arr, function (j, trIndex) {
                $trs.eq(trIndex - 1).find('td:eq(' + tdIndex + ') input').removeAttr('disabled');
            })
        });
    },
    /**
     * 001初始化完成后的操作
     * */
    afterInit_001: function (_this) {
        _this.calculateAll('001');
        //计算完成后，强制触发change事件（以免默认数据与计算数据相同而框架不触发事件）
        $('#001_0_2,#001_0_6').trigger('change.afterCalculate');
    },
    /**
     * 添加公式
     * */
    addFormulas_001: function (_this) {
        var formulas = [];
        var $trs = $('#table_001').find('tr:lt(29):gt(6)');
        $.each($trs, function (i, v) {
            var hwCode;
            var fwCode;
            if (i < 14) {
                hwCode = i + 1;
                fwCode = i + 23;
            } else if (i === 15) {
                hwCode = i;
                fwCode = i + 22;
            } else if (i > 16) {
                hwCode = i - 1;
                fwCode = i + 21;
            }
            if (hwCode) {
                formulas.push('I' + (i + 8) + ' = ROUND(E' + (i + 8) + '+{lsxxs.lsxx[code=' + hwCode + '].value},2)');
            }
            if (fwCode) {
                formulas.push('K' + (i + 8) + ' = ROUND(G' + (i + 8) + '+{lsxxs.lsxx[code=' + fwCode + '].value},2)');
            }
        });
        _this.addFormulas('001', formulas);
    },
    /**
     * 减免明细表的输入控制
     * */
    controlJM_008: function () {
        var curVal = this.value;
        var index = Number(this.id.substring(2));
        var $td = $('#' + this.id).parent();
        var $tr = $td.parent();
        var idArr = [];
        if (index < 7) {
            idArr = ['jm2', 'jm3', 'jm4', 'jm5', 'jm6'];
        } else {
            idArr = ['jm10', 'jm11', 'jm12', 'jm13', 'jm14', 'jm15', 'jm16'];
        }
        var that = this;
        var isRepeat = false;
        $.each(idArr, function (i, id) {
            if (id === that.id) {
                return true;
            }
            if (curVal && mini.get(id).getValue() === curVal) {
                mini.alert('您已经选择了代码为：' + curVal + '的' + (index < 7 ? '减' : '免') + '税性质代码及名称，不能重复选择！');
                that.setValue('');
                isRepeat = true;
                return false;
            }
        });
        if (isRepeat) {
            return;
        }
        if (curVal === '') {
            $td.nextAll().find('input').attr('disabled', 'disabled').val(0).blur();
        } else {
            var selector = 'td:eq(4),td:eq(5),td:eq(7)';
            selector = index > 6 ? 'td:eq(4),td:eq(5),td:eq(8)' : selector;
            $tr.find(selector).find('input').removeAttr('disabled');
        }
    },
    /**
     * 绑定“超过起征点”发生变化，001_0_2，001_0_6，分明为是否超过货劳起征点和是否超过服务起征点
     * */
    bindOverQzdChangeEvent: function (_this) {
        var that = this;
        var szlbdm = _this.wsxxMap['SZLBDM'];
        /**
         * 框架中有专用于触发该afterCalculate的change事件的调用，适用于某单元格由公式计算得到造成变化
         * */
        $('#table_001').on('change.afterCalculate', '#001_0_2,#001_0_6', function () {
            var curId = $(this).attr('id');
            if (curId === '001_0_2' && (szlbdm === '01' || szlbdm === '03')) {    //货劳是否达到起征点发生变化
                that.hwOverQzdChange(_this);
            }
            if (curId === '001_0_6' && (szlbdm === '02' || szlbdm === '03')) {  //服务是否达到起征点发生变化
                that.fwOverQzdChange(_this);
            }
        });
    },
    /**
     * 货劳是否达到起征点发生变化
     * */
    hwOverQzdChange: function (_this) {
        this.allowEdit_001_16_4(_this);
        this.allowEdit_001_17_4(_this);
        this.allowEdit_001_26_4(_this);
        this.allowEdit_001_27_4(_this);
    },
    /**
     * 确定001_16_4单元格是否允许输入
     * */
    allowEdit_001_16_4: function (_this) {
        var v = $('#001_0_2').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '0' && v === '0') {//10栏 非个体户且未达起征点才填写，否则只读
            $('#001_16_4').removeAttr('disabled');
        } else {
            $('#001_16_4').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * 确定001_17_4单元格是否允许输入
     * */
    allowEdit_001_17_4: function (_this) {
        var v = $('#001_0_2').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '1' && v === '0') { //11栏 个体户且未达起征点才填写，否则只读
            $('#001_17_4').removeAttr('disabled');
        } else {
            $('#001_17_4').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * 确定001_26_4单元格是否允许输入
     * */
    allowEdit_001_26_4: function (_this) {
        var v = $('#001_0_2').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '0' && v === '0') {//20栏 非个体户且未达起征点才填写
            $('#001_26_4').removeAttr('disabled');
        } else {
            $('#001_26_4').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * 确定001_27_4单元格是否允许输入
     * */
    allowEdit_001_27_4: function (_this) {
        var v = $('#001_0_2').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '1' && v === '0') {//21栏 个体户且未达起征点才填写
            $('#001_27_4').removeAttr('disabled');
        } else {
            $('#001_27_4').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * 服务是否达到起征点发生变化
     * */
    fwOverQzdChange: function (_this) {
        this.allowEdit_001_16_6(_this);
        this.allowEdit_001_17_6(_this);
        this.allowEdit_001_26_6(_this);
        this.allowEdit_001_27_6(_this);
    },
    /**
     * 确定001_16_6单元格是否允许输入
     * */
    allowEdit_001_16_6: function (_this) {
        var v = $('#001_0_6').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '0' && v === '0') {//10栏 非个体户且未达起征点才填写，否则只读
            $('#001_16_6').removeAttr('disabled');
        } else {
            $('#001_16_6').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * 确定001_17_6单元格是否允许输入
     * */
    allowEdit_001_17_6: function (_this) {
        var v = $('#001_0_6').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '1' && v === '0') { //11栏 个体户且未达起征点才填写，否则只读
            $('#001_17_6').removeAttr('disabled');
        } else {
            $('#001_17_6').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * 确定001_26_6单元格是否允许输入
     * */
    allowEdit_001_26_6: function (_this) {
        var v = $('#001_0_6').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '0' && v === '0') {//20栏 非个体户且未达起征点才填写
            $('#001_26_6').removeAttr('disabled');
        } else {
            $('#001_26_6').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * 确定001_27_6单元格是否允许输入
     * */
    allowEdit_001_27_6: function (_this) {
        var v = $('#001_0_6').val();//是否达到起征点
        if (_this.wsxxMap['GTHBZ'] === '1' && v === '0') {//21栏 个体户且未达起征点才填写
            $('#001_27_6').removeAttr('disabled');
        } else {
            $('#001_27_6').attr('disabled', 'disabled').val(0).blur();
        }
    },
    /**
     * js校验001表
     * */
    checkTable_001: function (_this) {
        return this.check008MustEdit() && this.checkYbtse(_this);
    },
    checkYbtse: function (_this) {
        /**
         * 更正申报时，应补退税额必须大于等于上次申报的值
         * */
        var ybtse = Number($('#001_30_4').val()) + Number($('#001_30_6').val());
        if (_this.businessType === 'correct' && ybtse < Number(_this.wsxxMap['YBTSE'])) {
            mini.alert('当前系统不支持更正的税额小于正常申报的税额!');
            return false;
        }
        return true;
    },
    /**
     * 根据001表校验008表是否必填
     * */
    check008MustEdit: function () {
        if (Number($('#001_0_1').val()) > 0 && $('#table_008').length === 0) {
            mini.alert('主表第12栏“其他免税销售额”“本期数”或第18栏“本期应纳税额减征额”“本期数”有数据时，必须要填写增值税减免税申报明细表！');
            return false;
        }
        return true;
    }
};
servyouReport.getYnse = function () {
    return (Number($('#001_30_4').val()) + Number($('#001_30_6').val())).toFixed(2);
};
//配置自动添加id的属性为true，框架自动为所有input和select加上id，但是miniui组件的还是需要自己加id的
servyouReport.autoAddAllId = true;
//自定义初始化核定相关的内容
servyouReport.customInitFromHd = function () {
    this.tables['001'] && xgm.customInitFromHd_001(this);
    this.tables['006'] && xgm.customInitFromHd_006(this);
};
//自定义初始化与核定无关项
servyouReport.customInit = function () {
    this.tables['001'] && xgm.customInit_001(this);
};
//自定义事件
servyouReport.customEvent = function () {
    this.tables['001'] && xgm.bindOverQzdChangeEvent(this);
};
//初始化完成后的操作
servyouReport.afterInit = function () {
    this.tables['001'] && xgm.afterInit_001(this);
};
servyouReport.checkTable_001 = function () {
    return xgm.checkTable_001(this);
};
//转001报文
servyouReport.changeXml_001 = function () {
    var $trs = $('#table_001').find('tr:lt(31):gt(6)');
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbrq1').text("2019-01-15");
    $xml.find('zzsxgmGridlb').each(function (i, lb) {
        var index = (i + 2) * 2;
        $trs.each(function (j, tr) {
            var inputValue = $(this).find('td:eq(' + index + ') input').val();
            inputValue = inputValue ? inputValue : '0.00';
            if (inputValue) {
                $(lb).children().eq(j + 2).text(inputValue);
            }
        });
    });

    return $xml;
};
//转006报文
servyouReport.changeXml_006 = function () {
    var $xml = this.getJ3Xml('006');
    var $flzlForm = $xml.find('flzlForm');
    $flzlForm.find('qcye').text($('#006_7_0').val());
    $flzlForm.find('bqfse').text($('#006_7_1').val());
    $flzlForm.find('bqkce').text($('#006_7_2').val());
    $flzlForm.find('qmye').text($('#006_7_4').val());
    $flzlForm.find('ysfwxsqbhssr').text($('#006_11_0').val());
    $flzlForm.find('ysfwxshsxse').text($('#006_11_2').val());
    $flzlForm.find('ysfwxsbhsxse').text($('#006_11_4').val());
    $flzlForm.find('qcye5').text($('#006_15_0').val());
    $flzlForm.find('bqfse5').text($('#006_15_1').val());
    $flzlForm.find('bqkce5').text($('#006_15_2').val());
    $flzlForm.find('qmye5').text($('#006_15_4').val());
    $flzlForm.find('ysfwxsqbhssr5').text($('#006_19_0').val());
    $flzlForm.find('ysfwxshsxse5').text($('#006_19_2').val());
    $flzlForm.find('ysfwxsbhsxse5').text($('#006_19_4').val());
    return $xml;
};
//转008报文
servyouReport.changeXml_008 = function () {
    var $xml = this.getJ3Xml('008');
    var $jsGrid = $xml.find('zzsjmssbmxbjsxmGrid');
    var $msGrid = $xml.find('zzsjmssbmxbmsxmGrid');
    var $jslb_1 = $jsGrid.find('zzsjmssbmxbjsxmGridlbVO').eq(1);
    var $mslb_3 = $msGrid.find('zzsjmssbmxbmsxmGridlbVO').eq(3);
    var jslbClone = $jslb_1.clone();
    var mslbClone = $mslb_3.clone();
    $jslb_1.remove();
    $mslb_3.remove();
    /*减税部分*/
    $jsGrid.find('zzsjmssbmxbjsxmGridlbVO:eq(0) qcye').text($('#008_6_4').val());
    $jsGrid.find('zzsjmssbmxbjsxmGridlbVO:eq(0) bqfse').text($('#008_6_5').val());
    $jsGrid.find('zzsjmssbmxbjsxmGridlbVO:eq(0) bqydjse').text($('#008_6_6').val());
    $jsGrid.find('zzsjmssbmxbjsxmGridlbVO:eq(0) bqsjdjse').text($('#008_6_7').val());
    $jsGrid.find('zzsjmssbmxbjsxmGridlbVO:eq(0) qmye').text($('#008_6_8').val());
    var jsCount = 1;
    var jsNum = 0;
    for (var i = 2; i < 7; i++) {
        var jsDm = mini.get('jm' + i).getValue();
        if (jsDm) {
            jsCount++;
            jsNum++;
            var newJslbClone = $(jslbClone).clone();
            $(newJslbClone).find('ewbhxh').text(jsCount);
            $(newJslbClone).find('hmc').text(jsDm);
            $(newJslbClone).find('qcye').text($('#008_' + (i + 5) + '_4').val());
            $(newJslbClone).find('bqfse').text($('#008_' + (i + 5) + '_5').val());
            $(newJslbClone).find('bqydjse').text($('#008_' + (i + 5) + '_6').val());
            $(newJslbClone).find('bqsjdjse').text($('#008_' + (i + 5) + '_7').val());
            $(newJslbClone).find('qmye').text($('#008_' + (i + 5) + '_8').val());
            $jsGrid.append(newJslbClone);
        }
    }
    /*免税部分*/
    for (var i = 15; i < 18; i++) {
        $msGrid.find('zzsjmssbmxbmsxmGridlbVO:eq(' + (i - 15) + ') mzzzsxmxse').text($('#008_' + i + '_4').val());
        if (i === 15) {
            $msGrid.find('zzsjmssbmxbmsxmGridlbVO:eq(' + (i - 15) + ') bqsjkcje').text($('#008_' + i + '_5').val());
            $msGrid.find('zzsjmssbmxbmsxmGridlbVO:eq(' + (i - 15) + ') kchmsxse').text($('#008_' + i + '_6').val());
            $msGrid.find('zzsjmssbmxbmsxmGridlbVO:eq(' + (i - 15) + ') msxsedyjxse').text($('#008_' + i + '_7').val());
            $msGrid.find('zzsjmssbmxbmsxmGridlbVO:eq(' + (i - 15) + ') mse').text($('#008_' + i + '_8').val());
        }
    }
    var msCount = 3;
    var msNum = 0;
    for (var i = 10; i < 17; i++) {
        var msDm = mini.get('jm' + i).getValue();
        if (msDm) {
            msCount++;
            msNum++;
            var newMslbClone = $(mslbClone).clone();
            $(newMslbClone).find('ewbhxh').text(msCount);
            $(newMslbClone).find('hmc').text(msDm);
            $(newMslbClone).find('mzzzsxmxse').text($('#008_' + (i + 8) + '_4').val());
            $(newMslbClone).find('bqsjkcje').text($('#008_' + (i + 8) + '_5').val());
            $(newMslbClone).find('kchmsxse').text($('#008_' + (i + 8) + '_6').val());
            $(newMslbClone).find('msxsedyjxse').text($('#008_' + (i + 8) + '_7').val());
            $(newMslbClone).find('mse').text($('#008_' + (i + 8) + '_8').val());
            $msGrid.append(newMslbClone);
        }
    }

    if (!jsNum && !msNum) {
        $xml.empty();
    }
    return $xml;
};
// 更正申报自动回写xml之后，自定义修正不符合要求的地方
/*servyouReport.customResumeFromXml_008 = function () {
    /!*减免表*!/
    for (var i = 2; i < 16; i++) {
        var id = 'jm' + i;
        if (6 < i && i < 10) {
            continue;
        }
        mini.get(id).fire('valuechanged');
    }
};*/
servyouReport.customResumeFromXml_001 = function () {
    var $trs = $('#table_001 tr');
    var _this = this;
    $(this.j3CorrectXml).find('zzssyyxgmnsr zzsxgmGrid zzsxgmGridlb:lt(4)').each(function (i) {
        var ewblxh = Number($(this).find('ewblxh').text());
        var tdIndex = 4 + (ewblxh - 1) * 2;
        _this.setTargetVal($trs.eq(7).find('td:eq(' + tdIndex + ')').children(), $(this).find('yzzzsbhsxse').text());
        _this.setTargetVal($trs.eq(8).find('td:eq(' + tdIndex + ')').children(), $(this).find('swjgdkdzzszyfpbhsxse').text());
        _this.setTargetVal($trs.eq(9).find('td:eq(' + tdIndex + ')').children(), $(this).find('skqjkjdptfpbhsxse').text());
        _this.setTargetVal($trs.eq(10).find('td:eq(' + tdIndex + ')').children(), $(this).find('xsczbdcbhsxse').text());
        _this.setTargetVal($trs.eq(11).find('td:eq(' + tdIndex + ')').children(), $(this).find('swjgdkdzzszyfpbhsxse1').text());
        _this.setTargetVal($trs.eq(12).find('td:eq(' + tdIndex + ')').children(), $(this).find('skqjkjdptfpbhsxse2').text());
        _this.setTargetVal($trs.eq(13).find('td:eq(' + tdIndex + ')').children(), $(this).find('xssygdysgdzcbhsxse').text());
        _this.setTargetVal($trs.eq(14).find('td:eq(' + tdIndex + ')').children(), $(this).find('skqjkjdptfpbhsxse1').text());
        _this.setTargetVal($trs.eq(15).find('td:eq(' + tdIndex + ')').children(), $(this).find('msxse').text());
        _this.setTargetVal($trs.eq(16).find('td:eq(' + tdIndex + ')').children(), $(this).find('xwqymsxse').text());
        _this.setTargetVal($trs.eq(17).find('td:eq(' + tdIndex + ')').children(), $(this).find('wdqzdxse').text());
        _this.setTargetVal($trs.eq(18).find('td:eq(' + tdIndex + ')').children(), $(this).find('qtmsxse').text());
        _this.setTargetVal($trs.eq(19).find('td:eq(' + tdIndex + ')').children(), $(this).find('ckmsxse').text());
        _this.setTargetVal($trs.eq(20).find('td:eq(' + tdIndex + ')').children(), $(this).find('skqjkjdptfpxse1').text());
        _this.setTargetVal($trs.eq(21).find('td:eq(' + tdIndex + ')').children(), $(this).find('hdxse').text());
        _this.setTargetVal($trs.eq(22).find('td:eq(' + tdIndex + ')').children(), $(this).find('bqynse').text());
        _this.setTargetVal($trs.eq(23).find('td:eq(' + tdIndex + ')').children(), $(this).find('hdynse').text());
        _this.setTargetVal($trs.eq(24).find('td:eq(' + tdIndex + ')').children(), $(this).find('bqynsejze').text());
        _this.setTargetVal($trs.eq(25).find('td:eq(' + tdIndex + ')').children(), $(this).find('bqmse').text());
        _this.setTargetVal($trs.eq(26).find('td:eq(' + tdIndex + ')').children(), $(this).find('xwqymse').text());
        _this.setTargetVal($trs.eq(27).find('td:eq(' + tdIndex + ')').children(), $(this).find('wdqzdmse').text());
        _this.setTargetVal($trs.eq(28).find('td:eq(' + tdIndex + ')').children(), $(this).find('ynsehj').text());
        _this.setTargetVal($trs.eq(29).find('td:eq(' + tdIndex + ')').children(), $(this).find('bqyjse1').text());
        _this.setTargetVal($trs.eq(30).find('td:eq(' + tdIndex + ')').children(), $(this).find('bqybtse').text());
    });
};
servyouReport.customResumeFromXml_006 = function () {
    var $trs = $('#table_006 tr');
    var $flzlForm = $(this.j3CorrectXml).find('zzsxgmflzl flzlForm');
    this.setTargetVal($trs.eq(7).find('td:eq(0)').children(), $flzlForm.find('qcye').text());
    this.setTargetVal($trs.eq(7).find('td:eq(1)').children(), $flzlForm.find('bqfse').text());
    this.setTargetVal($trs.eq(7).find('td:eq(2)').children(), $flzlForm.find('bqkce').text());
    this.setTargetVal($trs.eq(7).find('td:eq(4)').children(), $flzlForm.find('qmye').text());
    this.setTargetVal($trs.eq(11).find('td:eq(0)').children(), $flzlForm.find('ysfwxsqbhssr').text());
    this.setTargetVal($trs.eq(11).find('td:eq(2)').children(), $flzlForm.find('ysfwxshsxse').text());
    this.setTargetVal($trs.eq(11).find('td:eq(4)').children(), $flzlForm.find('ysfwxsbhsxse').text());
    this.setTargetVal($trs.eq(15).find('td:eq(0)').children(), $flzlForm.find('qcye5').text());
    this.setTargetVal($trs.eq(15).find('td:eq(1)').children(), $flzlForm.find('bqfse5').text());
    this.setTargetVal($trs.eq(15).find('td:eq(2)').children(), $flzlForm.find('bqkce5').text());
    this.setTargetVal($trs.eq(15).find('td:eq(4)').children(), $flzlForm.find('qmye5').text());
    this.setTargetVal($trs.eq(19).find('td:eq(0)').children(), $flzlForm.find('ysfwxsqbhssr5').text());
    this.setTargetVal($trs.eq(19).find('td:eq(2)').children(), $flzlForm.find('ysfwxshsxse5').text());
    this.setTargetVal($trs.eq(19).find('td:eq(4)').children(), $flzlForm.find('ysfwxsbhsxse5').text());
};
servyouReport.customResumeFromXml_008 = function () {
    var _this = this;
    //减税
    $(this.j3CorrectXml).find('zzsjmssbmxb zzsjmssbmxbjsxmGrid zzsjmssbmxbjsxmGridlbVO').each(function () {
        var hmc = $(this).find('hmc').text();
        var ewbhxh = Number($(this).find('ewbhxh').text());
        if (hmc && ewbhxh > 1) {
            var trIndex = ewbhxh + 5;
            mini.get('jm' + ewbhxh).setValue(hmc);
            _this.setTargetVal($('#008_' + trIndex + '_4'), $(this).find('qcye').text());
            _this.setTargetVal($('#008_' + trIndex + '_5'), $(this).find('bqfse').text());
            _this.setTargetVal($('#008_' + trIndex + '_6'), $(this).find('bqydjse').text());
            _this.setTargetVal($('#008_' + trIndex + '_7'), $(this).find('bqsjdjse').text());
            _this.setTargetVal($('#008_' + trIndex + '_8'), $(this).find('qmye').text());
        }
    });
    //免税
    $(this.j3CorrectXml).find('zzsjmssbmxb zzsjmssbmxbmsxmGrid zzsjmssbmxbmsxmGridlbVO').each(function () {
        var hmc = $(this).find('hmc').text();
        var ewbhxh = Number($(this).find('ewbhxh').text());
        if (hmc && ewbhxh > 3) {
            var trIndex = ewbhxh + 14;
            mini.get('jm' + (ewbhxh + 6)).setValue(hmc);
            _this.setTargetVal($('#008_' + trIndex + '_4'), $(this).find('mzzzsxmxse').text());
            _this.setTargetVal($('#008_' + trIndex + '_5'), $(this).find('bqsjkcje').text());
            _this.setTargetVal($('#008_' + trIndex + '_6'), $(this).find('kchmsxse').text());
            _this.setTargetVal($('#008_' + trIndex + '_7'), $(this).find('msxsedyjxse').text());
            _this.setTargetVal($('#008_' + trIndex + '_8'), $(this).find('mse').text());
        }
    });
};
$(function () {
    //初始化执行框架
    servyouReport.init();//true为启用本地数据，即config中的hd.json和nsrData.json
});
/**
 * Created by lizm on 2017/8/28 14:40.
 */
servyouReport.reportWithNext = {
    getHdByDM: '10115',
    sbzlDmArr: ['10115', '10116'],
    sbzlMc: '附加税',
    url: '../sb_fjs/sb_fjs.html?sbzlDm=10115'
};
xgm.customInitLocalData_008 = function (_this) {
    var jmxx = _this.hd.jmxx;
    var zzsjmxxbs = _this.hd.zzsjmxxbs; // 核定信息中的期初余额节点
    var jsArr = [], msArr = [];
    if (!!jmxx) {
        for (var i = 0; i < jmxx.length; i++) {
            var item = jmxx[i];
            var jsArray = {};
            var msArray = {};
            if (item.jmzlxDm === '01') {
                jsArray.MC = item.jmxzMc;
                jsArray.ID = item.ssjmxzhzDm;
                jsArray.jmsl = item.zzsJmsl;
                jsArr.push(jsArray);
            } else {
                msArray.MC = item.jmxzMc;
                msArray.ID = item.ssjmxzhzDm;
                msArray.jmsl = item.zzsJmsl;
                msArr.push(msArray);
            }
        }
    }
    var jmCombo = '';
    for (var i = 0; i < jsArr.length; i++) {
        jmCombo = mini.get('jm' + (i + 2));
        if (!jmCombo) {
            break;
        }
        jmCombo.setData(jsArr);
        jmCombo.enable();
    }
    for (var j = 0; j < msArr.length; j++) {
        if (!jmCombo) {
            break;
        }
        jmCombo = mini.get('jm' + (j + 10));
        jmCombo.setData(msArr);
        jmCombo.enable();
    }
    xgm.jmbQcye = {};
    if (!!zzsjmxxbs) {
        var zzsjmxxList = zzsjmxxbs.zzsjmxxList || [];
        for (var i = 0; i < zzsjmxxList.length; i++) {
            xgm.jmbQcye[zzsjmxxList[i].jmxxDm] = zzsjmxxList[i].qcye || '';
        }
    }

};
//
xgm.controlJM_008 = function () {
    var curVal = this.value;
    var index = Number(this.id.substring(2));
    var $td = $('#' + this.id).parent();
    var $tr = $td.parent();
    var idArr = [];
    if (index < 7) {
        idArr = ['jm2', 'jm3', 'jm4', 'jm5', 'jm6'];
    } else {
        idArr = ['jm10', 'jm11', 'jm12', 'jm13', 'jm14', 'jm15', 'jm16'];
    }
    var that = this;
    var isRepeat = false;

    var jmCombo = mini.get(this.id);
    var val = xgm.jmbQcye[curVal] || 0;
    jmCombo.setValue(curVal);
    var $qcye = $tr.find('td:eq(4)').find('input');
    $qcye.val(val).blur();
    if (Number(val) !== 0) {
        $qcye.attr('disabled', 'disabled');
    } else {
        $qcye.removeAttr('disabled');
    }

    $.each(idArr, function (i, id) {
        if (id === that.id) {
            return true;
        }
        if (curVal && mini.get(id).getValue() === curVal) {
            mini.alert('您已经选择了代码为：' + curVal + '的' + (index < 7 ? '减' : '免') + '税性质代码及名称，不能重复选择！');
            that.setValue('');
            isRepeat = true;
            return false;
        }
    });
    if (isRepeat) {
        return;
    }
    if (curVal === '') {
        $td.nextAll().find('input').attr('disabled', 'disabled').val(0).blur();
    } else {
        var selector = 'td:eq(5),td:eq(7)';
        selector = index > 6 ? 'td:eq(4),td:eq(5),td:eq(8)' : selector;
        $tr.find(selector).find('input').removeAttr('disabled');
    }

};
xgm.customInit_001 = function (_this) {
    this.addFormulas_001(_this);//添加历史信息等相关公式
    this.allowInputEditable_001(_this);//控制是否允许填写
};
//校验主表预缴税额
xgm.check001Yjse = function (_this) {
    var szlbdm = _this.wsxxMap['SZLBDM'];
    var BQYSHWYJ = _this.wsxxMap['BQYSHWYJ'];
    var BQYSFWYJ = _this.wsxxMap['BQYSFWYJ'];
    //if (szlbdm === '01' || szlbdm === '03') {
    //    if (Number($('#001_29_4').val()) > Number(BQYSHWYJ)) {
    //        mini.alert('您填报的货物及劳务本期预缴税额【' + $('#001_29_4').val() + '】应小于等于您本期预缴的增值税税额中货物及劳务部分【' + parseFloat(BQYSHWYJ).toFixed(2) + '】元。');
    //        $('#001_29_4').parent().addClass('report_error');
    //        return false;
    //    }
    //}
    if (szlbdm === '02' || szlbdm === '03') {
        if (Number($('#001_29_6').val()) > Number(BQYSFWYJ)) {
            mini.alert('您填报的服务、不动产和无形资产本期预缴税额【' + $('#001_29_6').val() + '】应小于等于您本期预缴的增值税税额中服务、不动产和无形资产部分【' + parseFloat(BQYSFWYJ).toFixed(2) + '】元。');
            $('#001_29_6').parent().addClass('report_error');
            return false;
        }
    }
    return true;
};
xgm.checkTable_001 = function (_this) {
    return this.check008MustEdit() && this.checkYbtse(_this) && this.check001Yjse(_this);
};
//关联附加税
xgm.glfjsBz = false;
/*xgm.getFjsBz = function (_this) {
    // 附加税启用标志
    var fjsSbQybz = Api.getData('/sbzx-web/api/hb/sb/fjs/getFjsSbQybz',{},'get',false);
    var request = {
        nsrsbh:_this.nsrsbh,
        djxh: _this.djxh,
        sssq: _this.sssqz.substr(0,4) + _this.sssqz.substr(5,2),
        sbzldm: _this.sbzlDm,
        gdslx:'ds'
    };
    var fjsSbxx = null;
    ajax.post('/sbzx-web/api/hb/sb/fjs/getFjsSbxx',mini.encode(request),function (data) {
        if (data.success){
            fjsSbxx = mini.decode(data.value);
        } else if (data.msgCode !== '0'){
            mini.alert(data.message);
        }
    },function (data) {
        mini.alert(data.message);
    });
    if (fjsSbQybz.value === 'Y' && !(!!fjsSbxx && !!fjsSbxx.sbxx && fjsSbxx.sbxx.sbxxmx.length>0 && fjsSbxx.sbxx.sbxxmx[0].sfysb === 'Y')){
        return true;
    } else {
        return false;
    }
};*/
xgm.compareGds = function (_this) {
    var gdsData = mini.decode(Api.getData('/sbzx-web/api/hb/sb/fjs/compareGdsNsrxx', { sbzldm: _this.sbzlDm }, 'post', false));
    if (!!gdsData) {
        var message = '';
        var gsData = gdsData.gs;
        var dsData = gdsData.ds;
        for (var g in gsData) {
            $('#gs-' + g).html(gsData[g]);
        }
        for (var d in dsData) {
            $('#ds-' + d).html(dsData[d]);
        }
        var compareList = [];
        if ((!!gdsData.gs.nsrsbh || !!gdsData.ds.nsrsbh) && gdsData.gs.nsrsbh !== gdsData.ds.nsrsbh) {
            compareList.push('纳税人识别号');
        }
        if ((!!gdsData.gs.nsrmc || !!gdsData.ds.nsrmc) && gdsData.gs.nsrmc !== gdsData.ds.nsrmc) {
            compareList.push('纳税人名称');
        }
        if ((!!gdsData.gs.shxydm || !!gdsData.ds.shxydm) && gdsData.gs.shxydm !== gdsData.ds.shxydm) {
            compareList.push('社会信用代码');
        }
        if ((!!gdsData.gs.fddbrsfzjlxDm || !!gdsData.ds.fddbrsfzjlxDm) && gdsData.gs.fddbrsfzjlxDm !== gdsData.ds.fddbrsfzjlxDm) {
            compareList.push('法人证件类型');
        }
        if ((!!gdsData.gs.fddbrsfzjhm || !!gdsData.ds.fddbrsfzjhm) && gdsData.gs.fddbrsfzjhm !== gdsData.ds.fddbrsfzjhm) {
            compareList.push('法人证件号码');
        }
        if ((!!gdsData.gs.fddbrxm || !!gdsData.ds.fddbrxm) && gdsData.gs.fddbrxm !== gdsData.ds.fddbrxm) {
            compareList.push('法人姓名');
        }
        if ((!!gdsData.gs.ssdabh || !!gdsData.ds.ssdabh) && gdsData.gs.ssdabh !== gdsData.ds.ssdabh) {
            compareList.push('税收档案编号');
        }
        if (compareList.length > 0) {
            message += '<div>您在原地税机关登记的<span style="color:red">' + compareList.join("，") + '</span>信息与您在原国税机关登记的不一致，请确认该户纳税人与您在原国税机关登记的是否' +
                '为同一纳税人。如确认为同一纳税人，请点击“一体化申报”，将为您同时征收增值税和附加税（费）；' +
                '如不为同一纳税人，请点击“主税种申报”,将为您正常征收增值税，附加税（费）请去办税服务大厅缴纳。</div>';
        } else {
            message += '您在原地税机关登记的基本信息与您在原国税机关登记的一致，请再次确认该户纳税人与您在原国税机关登记的是否为同一纳税人。如确认为同一纳税人，请点击“一体化申报”，将为您同时征收增值税和附加税（费）；' +
                '如不为同一纳税人，请点击“主税种申报”,将为您正常征收增值税，附加税（费）请去办税服务大厅缴纳。</div>';
        }
        $(".gds-message").html(message);
        mini.get('gds-win').show();
    }
};
/*xgm.getYbtse = function () {
    return (Number($('#001_30_4').val()) + Number($('#001_30_6').val())).toFixed(2);
};
xgm.getBhsxse = function () {
    var bhsxse = 0;
    bhsxse += $('#001_0_7').val() > $('#001_21_4').val() ? Number($('#001_0_7').val()) : Number($('#001_21_4').val());
    bhsxse += $('#001_0_8').val() > $('#001_21_6').val() ? Number($('#001_0_8').val()) : Number($('#001_21_6').val());
    return bhsxse.toFixed(2);
};*/
xgm.changeFjsbz = function (hasFjs) {
    if (!hasFjs) {
        servyouReport.reportWithNext = null;
        servyouReport.nextReportHd = null;
    }
    mini.get('gds-win').hide();
};
xgm.showTips = function (_this) {
    var szlbmc = '';
    if (_this.wsxxMap['SZLBDM'] === '01') {
        szlbmc += '“货物及劳务”';
    }
    if (_this.wsxxMap['SZLBDM'] === '02') {
        szlbmc += '“服务、不动产和无形资产”';
    }
    if (_this.wsxxMap['SZLBDM'] === '03') {
        szlbmc += '兼有“货物及劳务”和“服务、不动产和无形资产”';
    }
    var tips = '（1）您在税务机关登记的是【' + szlbmc + '】增值税纳税人；<br>';
    tips += '（2）您的预缴税额【货物及劳务为' + _this.wsxxMap['BQYSHWYJ'] + '，服务、不动产和无形资产为' + _this.wsxxMap['BQYSFWYJ'] + '】；<br>';
    tips += '（3）您的核定销售额【货物及劳务为' + _this.wsxxMap['YSHWHDXSE'] + '，服务、不动产和无形资产为' + _this.wsxxMap['YSFWHDXSE'] + '】；<br>';
    tips += '（4）如与您的纳税人类型、期初数不一致，请与主管税务机关联系核查，谢谢！';
    mini.showMessageBox({
        width: 600,
        height: 300,
        title: '温馨提示',
        message: tips,
        buttons: ["ok"],
        callback: function (action) {
            if (_this.businessType !== 'correct' && _this.nextReportHd) {
                xgm.compareGds(_this);
            }
        }
    });
};
//自定义初始化核定相关的内容
servyouReport.customInitFromHd = function () {
    xgm.customInitFromHd_001(this);
    xgm.customInitFromHd_006(this);
};
servyouReport.customInitLocalData = function () {
    xgm.customInitLocalData_008(this);
};

/**
 * 正常框架申报提交
 * @param {string} djxh 登记序号
 * @param {string} sbzlDm 申报种类代码
 * @param {string} sssqq 所属时期起
 * @param {string} sssqz 所属时期止
 * @param {object} formulaData 页面公式对象
 * @param {object} htmlData 页面html对象
 * @param {array} j3xmls 金三报文数组
 * @return {boolean}
 * */
/*sbcommon.sbtj_normal = function (request) {
    var url = '/sbzx-web/api/sb/common/submit/sbcl';
    // 小规模报文加密
    if (caService.sfAzCa) {
        var s = caService.checkCA(nsrxxUtil.getNsrxxVO().nsrsbh);
        if(s == '11'){
            return ;
        }
        if (s != 0 && s.indexOf("##") == -1) {
            var CaRecordVo = {};
            var camw = caService.encryptData(nsrxxUtil.getNsrxxVO().nsrsbh, mini.encode(j3xmls));//ca加密后密文
            if (camw && camw.indexOf("##") == -1 && camw.indexOf("&&") != -1) {
                CaRecordVo.sfnsrqm = "Y";//是否经过纳税人CA签名
                CaRecordVo.catype = caService.descCALx(caService.checkCA(nsrxxUtil.getNsrxxVO().nsrsbh));
                CaRecordVo.unencryptedbw = mini.encode(j3xmls);
                CaRecordVo.encryptedbw = caService.getCaMw(camw);
                CaRecordVo.yqzs = caService.getCaZs(camw);
                request.caData = mini.encode(CaRecordVo);
            }
        }
    }
    return Api.getIfSuccess(url, request);
};*/
//初始化完成后的操作
servyouReport.afterInit = function () {
    this.tables['001'] && xgm.afterInit_001(this);
    Tools.getUrlParamByName('is0sb') !== 'Y' && xgm.showTips(this);
    if (Tools.getUrlParamByName('is0sb') === 'Y') {
        $('table[type="sb"] td>input').attr('disabled', 'disabled');
        for (var i = 2; i < 17; i++) {
            if (i > 6 && i < 10) {
                continue;
            }
            mini.get('jm' + i).disable();
        }
        if (this.businessType !== 'correct' && this.nextReportHd) {
            xgm.compareGds(this);
        }
    }
};
servyouReport.chooseToGo = function () {
    if (Tools.getUrlParamByName('is0sb') === 'Y') {
        this.run();
        return;
    }
    var request = {
        djxh: this.gsNsrData.djxh,
        sbzlDm: this.sbzlDm,
        sssqQ: this.sssqq,
        sssqZ: this.sssqz,
        sblxDm: this.sblxDm
    };
    var resumeData = sbcommon.getResumeData_normal(request);
    this.nextReportHd = this.sblxDm === '11' && this.reportWithNext && this.reportWithNext.getHdByDM ? sbcommon.getHdBySbzlDm(this.reportWithNext.getHdByDM) : null;
    if (resumeData && resumeData.jsonData && resumeData.jsonData.htmlData) {
        this.resumeData = resumeData;
        var that = this;
        if (this.sblxDm === '11' && this.reportWithNext && this.nextReportHd && sessionStorage.getItem(this.sbzlDm + 'isBackFromNext') === 'Y') {//关联申报,有下级申报，且有下级申报核定，且存在暂存数据时,且从下级申报返回过来，直接使用暂存数据
            this.useResumeData = true;
            this.run();
            return;
        }
        if (this.sblxDm === '11' && location.href.indexOf('reportWithSbzlDm') !== -1) {//关联申报,无下级申报，永不使用暂存数据
            this.run();
            return;
        }
        mini.confirm('系统检测到您上次填写了申报表，点击确定还原上次填写的数据，点击取消重新填写申报表！', '提示', function (action) {
            if (action === 'ok') {
                that.useResumeData = true;
            } else {
                that.useResumeData = false;
            }
            that.run();
        });
    } else {
        this.run();
    }
};
servyouReport.checkIsReportWithOthers = function (request) {
    if (this.sblxDm !== '11') {//非正常申报  不使用关联申报
        return false;
    }
    if (this.reportWithNext && this.nextReportHd) {//关联申报，且后续表未申报时
        var nextReportSbzlDm = this.nextReportHd ? (this.nextReportHd.sbzlxlcode || this.nextReportHd.sbzlcode) : '';
        if (this.nextReportHd && nextReportSbzlDm && this.tempSaveForGlsb()) {//暂存用于从附加税点击上一步进行数据还原
            var sbtjData = {
                ynse: this.getYnse(),
                zsxmbm: this.hd.zsxmbm,
                url: location.href,//链接地址，在下个页面返回到当前页面时用到
                request: request//申报提交的请求数据
            };
            sessionStorage.setItem('sbtjData_' + this.sbzlDm, mini.encode(sbtjData));//将申报提交的数据保存到session中
            var curReportWithSbzlDm = Tools.getUrlParamByName('reportWithSbzlDm') || '';
            var postfix = '&reportWithSbzlDm=' + (curReportWithSbzlDm ? curReportWithSbzlDm + '_' + this.sbzlDm : this.sbzlDm);
            window.location.href = this.reportWithNext.url + postfix;//跳转到下一申报界面
            return true;
        }
    }
    if (!this.reportWithNext && Tools.getUrlParamByName('reportWithSbzlDm')) {//关联申报，无后续申报，且前置申报已申报完成时
        var prevSbtjDatas = this.getPrevSbtjDatas();
        //前置申报的申报数据必须大于0，否则将走正常申报提交的接口
        if (prevSbtjDatas.length > 0) {
            prevSbtjDatas.push(request);
            if (this.checkSubmitTime() && sbcommon.sbtj_batch(prevSbtjDatas)) {
                $.cookie('lastSubmitTime_' + this.sbzlDm + '_' + this.djxh, new Date().getTime());
                var successUrl = this.successUrl + '?sbzlDm=' + this.sbzlDm;
                if (this.inMiniWindow) {
                    window.parent.location.href = successUrl;
                } else {
                    window.location.href = successUrl;
                }
            }
            return true;
        }
    }
    return false;
};
servyouReport.confirmBeforeSend = function () {
    var that = this;
    mini.confirm('请确认您所提交的申报数据真实有效，若存在问题税务机关将触发异常比对流程，期间网上不再支持申报更正和申报作废，解除异常后重新提供网上更正申报！', '提示', function (action) {
        if (action === 'ok') {
            that.send();
        }
    });
};
servyouReport.needYcsbd = Api.getData('/sbzx-web/api/sb/sbbd/needBd', '', 'get').value || false;
servyouReport.checkTable_008 = function () {
    for (var i = 10; i < 17; i++) {
        var cpnt = mini.get('jm' + i);
        if (!cpnt.getValue()) {
            continue;
        }
        /*
       * #303390
       * 增加增值税减免税明细表的校验 （网厅、客户端同时实现）
       * added by chenjunj on 2018/08/21
       * */
        var jmsl = cpnt.getSelected().jmsl;
        if (!jmsl) {
            continue;
        }
        var jmsls = jmsl.split('-');
        var slMin = Number(jmsls[0]);
        var slMax = Number(jmsls[1] || jmsls[0]);
        var col3_v = Number($('#008_' + (i + 8) + '_6').val());
        var col4_v = Number($('#008_' + (i + 8) + '_7').val());
        var mse = Number($('#008_' + (i + 8) + '_8').val());
        var mseMin = ((col3_v * slMin - col4_v) * 0.98).toFixed(2);
        var mseMax = ((col3_v * slMax - col4_v) * 1.02).toFixed(2);
        if (Number(mseMin) > Number(mseMax)) {
            var temp = mseMin;
            mseMin = mseMax;
            mseMax = temp;
        }
        if (mse < Number(mseMin) || mse > Number(mseMax)) {
            mini.alert('根据《增值税减免税申报明细表》填写规则，按照您填报的数据，第' + i + '栏第5列免税销售额应在【' + mseMin + '至' + mseMax + '】范围内（5.免税额”=“3.扣除后免税销售额”*本免税项目适用税率或征收率-“4免税销售额对应的进项税额，并允许2%的误差），请根据公式正确填报”。');
            return false;
        }
    }
    return true;
};
