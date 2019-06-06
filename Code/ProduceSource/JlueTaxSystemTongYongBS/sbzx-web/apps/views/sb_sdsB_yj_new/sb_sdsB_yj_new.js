/**
 * Created by chenjunj on 2018/6/14 17:32.
 */
var report = {
    customInitFromHd_001: function (_this) {
        this.initFormulas_001(_this);
        this.controlEdit_001(_this);
        this.initFormHdValue_001(_this);
    },
    initFormulas_001: function (_this) {
        var formulas = [];
        if(_this.wsxxMap['HDZSFS'] === '2'){
            formulas.push('F16 = ROUND(F7-F8-F9,2)');
            formulas.push('F18 = ROUND(F16*F17,2)');
            formulas.push('F23 = ROUND(F20-F21-F22,2)');
        }else if(_this.wsxxMap['HDZSFS'] === '3'){
            formulas.push('F18 = ROUND(F16/(1-F17)*F17,2)');
            formulas.push('F23 = ROUND(F20-F21-F22,2)');
        }
        _this.addFormulas('001', formulas);
    },
    controlEdit_001: function (_this) {
        var allowEditIndexs = [];
        if(_this.wsxxMap['HDZSFS'] === '1'){
            allowEditIndexs = [];
        }else if(_this.wsxxMap['HDZSFS'] === '2'){
            allowEditIndexs = [6,7,9,10,11,12,13,14];
        }else if(_this.wsxxMap['HDZSFS'] === '3'){
            allowEditIndexs = [15];
        }
        $.each(allowEditIndexs, function (i, index) {
            $('#001_'+index+'_5').removeAttr('disabled');
        });
    },
    initFormHdValue_001: function (_this) {
        var mini_hdzsfs = mini.get('hdzsfs');
        if(_this.wsxxMap['HDZSFS'] === '1'){
            mini_hdzsfs.setValue('402');
            $('#001_22_5').val(_this.wsxxMap['HDYNSE']).blur();
            $('#001_21_5').val(0).attr('disabled','disabled').blur().parent().removeClass('enable');
        }else {
            $('#001_21_5').val(_this.wsxxMap['BQYJ']).removeAttr('disabled').blur().parent().addClass('enable');
            if(_this.wsxxMap['HDZSFS'] === '2'){
                mini_hdzsfs.setValue('403');
                $('#001_16_5').val(_this.wsxxMap['YSSDL']).blur();
            }else if(_this.wsxxMap['HDZSFS'] === '3'){
                mini_hdzsfs.setValue('404');
                $('#001_16_5').val(_this.wsxxMap['YSSDL']).blur();
            }
        }
        $('#001_0_1').val(Number(_this.wsxxMap['XWJMMAXVALUE'])/40).blur();
    },
    xwqyChange: function () {
        if(servyouReport.businessType === 'preview'){
            return ;
        }
        var row_12_v = Number($('#001_17_5').val());// A7="WSXXS.[XWJMMAXVALUE]"
        if(this.value === 'Y' && row_12_v <= Number(servyouReport.wsxxMap['XWJMMAXVALUE'])){
            $('#001_20_5').val(Number(row_12_v*0.15).toFixed(2)).blur();
        }else{
            $('#001_20_5').val('0.00').blur();
        }
    },
    ynssdeChange: function () {
        var self = this;
        $('#table_001').on('change.afterCalculate', '#001_17_5', function () {
            self.setXwqy(servyouReport);
            var row_12_v = Number($(this).val());
            if(mini.get('xwqy').getValue() === 'Y' && row_12_v <= Number(servyouReport.wsxxMap['XWJMMAXVALUE'])){
                $('#001_20_5').val(row_12_v*0.15).blur();
            }else{
                $('#001_20_5').val('0.00').blur();
            }
        });
    },
    setXwqy: function (_this) {
        var row_12_v = Number($('#001_17_5').val());
        var xwqy = mini.get('xwqy');
        if(_this.wsxxMap['HDZSFS'] === '2' || _this.wsxxMap['HDZSFS'] === '3'){//核定应税所得率征收的纳税人：
            if(_this.wsxxMap['XXWLBZ'] === '1'){
                if(row_12_v <= Number(_this.wsxxMap['XWJMMAXVALUE'])){
                    //纳税人上一纳税年度汇算清缴符合小型微利企业条件的（XXWLBZ=1），本表第12行≤100万的纳税人，
                    // 系统自动选择“是”，纳税人不允许更改；
                    xwqy.setValue('Y');
                }else{
                    //纳税人上一纳税年度汇算清缴符合小型微利企业条件的（XXWLBZ=1），本年预缴时，本表第12行大于100万的纳税人，
                    // 系统自动选择“否”，纳税人不允许更改。
                    xwqy.setValue('N');
                }
                xwqy.setReadOnly(true);
                $(xwqy.el).parent().removeClass('enable');
            }else if(_this.wsxxMap['XXWLBZ'] === '0' || _this.wsxxMap['XXWLBZ'] === '2'){
                if(row_12_v > Number(_this.wsxxMap['XWJMMAXVALUE'])){
                    //纳税人上一纳税年度汇算清缴不符合小型微利企业条件的（XXWLBZ=0）、或者本年度新办企业（XXWLBZ=2），
                    // 且本表12行大于100万的，系统自动选择“否”，纳税人不允许更改。
                    xwqy.setValue('N');
                    xwqy.setReadOnly(true);
                    $(xwqy.el).parent().removeClass('enable');
                }else{
                    //纳税人上一纳税年度汇算清缴不符合小型微利企业条件的（XXWLBZ=0）、或者本年度新办企业的（XXWLBZ=2），
                    // 且本表第12行≤100万的，“是”或者“否”由纳税人自行选择，系统不默认，若纳税人不选择，不允许保存
                    xwqy.setReadOnly(false);
                    $(xwqy.el).parent().addClass('enable');
                }
            }
        }else{//核定应纳税额的纳税人
            //识别规则：年核定税额≤10万（折算后，季度（核定HDYNSE节点）≤25000元），视同年应纳税所得额≤100万元。可以选“是”，其余选“否”。
            if(_this.wsxxMap['HDYNSE'] > Number(_this.wsxxMap['XWJMMAXVALUE'])/40){
                //核定定额征收纳税人，换算应纳税所得额大于100万的，系统自动选择填“否”，纳税人不允许更改
                xwqy.setValue('N');
                xwqy.setReadOnly(true);
                $(xwqy.el).parent().removeClass('enable');
            }else{
                //核定定额征收纳税人，换算应纳税所得额小于等于100万的，纳税人可以选择填“是”或者“否”。
                xwqy.setReadOnly(false);
                $(xwqy.el).parent().addClass('enable');
            }
        }
    },
    checkXwqyRequired: function () {
        var xwqy = mini.get('xwqy');
        if(!xwqy.getValue()){
            mini.alert('“小型微利企业”不能为空！');
            $(xwqy.el).parent().addClass('report_error');
            return false;
        }
        return true;
    },
    //更正申报时，应补退税额必须大于等于上次申报的值
    checkYbtse: function (_this) {
        /*var ybtse = Number($('001_22_5').val());*/
        var ybtse = Number($('#table_001 tr:eq(22) td:eq(5) input').val());
        if(_this.businessType === 'correct' && ybtse < Number(_this.wsxxMap['YBTSE'])){
            $('#table_001 tr:eq(22) td:eq(5) input').parent().addClass('report_error');
            mini.alert('当前系统不支持更正的税额小于正常申报的税额!');
            return false;
        }
        return true;
    },
    ondrawDate: function(e) {
        if (e.sender.id.indexOf("rzrqq") !== -1) {
            var jzrqId = e.sender.id.replace("rzrqq", 'rzrqz');
            if (mini.get(jzrqId).getValue() === '') {
                return;
            }
            if (e.date.getTime() > mini.get(jzrqId).getValue().getTime()) {
                e.allowSelect = false;
            }
        } else {
            var qsrqId = e.sender.id.replace("rzrqz", 'rzrqq');
            if (mini.get(qsrqId).getValue() === '') {
                return;
            }
            if (e.date.getTime() < mini.get(qsrqId).getValue().getTime()) {
                e.allowSelect = false;
            }
        }
    },
    checkTable002: function () {
        //二、被投资外国企业信息 必填关系
        var $requiredInput = $("#table_002 tbody input[requiredSameTime='Y']");
        var emptyInputArray = [];
        for (var i = 0, len = $requiredInput.length; i < len; i++) {
            var obj = $requiredInput[i];
            var value = $(obj).val().trim();
            if (value === '') {
                emptyInputArray.push(obj);
            }
        }
        $requiredInput.parent().removeClass('report_error');
        if (emptyInputArray.length > 0 && emptyInputArray.length !== 5) {
            for (var i = 0, len = emptyInputArray.length; i < len; i++) {
                $(emptyInputArray[i]).parent().addClass('report_error');
            }
            mini.get('tabs').activeTab('002');
            mini.alert('《居民企业参股外国企业信息报告表》必填项不能为空！', '提示');
            return false;
        }
        /*校验比例*/
        /*var $blInput = $("#table_002 tbody input[servyou_type='percent']");
        var errorInputArray = [];
        for (var i = 0, len = $blInput.length; i < len; i++) {
            var obj = $blInput[i];
            var value = parseFloat($(obj).val().trim().replace('%', '')) / 100;
            if (value > 1 || value < 0) {
                errorInputArray.push(obj);
            }
        }
        $blInput.parent().removeClass('report_error');
        if (errorInputArray.length > 0) {
            for (var i = 0, len = errorInputArray.length; i < len; i++) {
                $(errorInputArray[i]).parent().addClass('report_error');
            }
            mini.get('tabs').activeTab('002');
            mini.alert('《居民企业参股外国企业信息报告表》持股比例值应该介于1到100之间！', '提示');
            return false;
        }*/
        //居民担任外国企业高管或董事，情况任职时间起止限制
        return true;
    },
    checkTable002Time: function () {
        for (var i = 1; i < 4; i++) {
            var rzrqq = mini.get("rzrqq_" + i).getValue();
            var rzrqz = mini.get("rzrqz_" + i).getValue();
            if (rzrqq - rzrqz > 0) {
                mini.alert("《居民企业参股外国企业信息报告表》中国居民个人担任外国企业高管或董事情况中第" + i + "行的任职日期起不得晚于任职日起止！");
                return false;
            }
        }
        return true;
    },
    bindRequiredSameTime: function () {
        var table002 = $("#table_002");
        if (table002.length > 0) {
            /*-----------------002报告表 二、被投资外国企业信息 控制其输入样式--开始-------------*/
            table002.on("change", '[requiredSameTime="Y"]', function (event) {
                var curValue;
                /*把报告人持股比例 servyou_type='percent' 修改为 seryou_type='string'应为percent总会显示0.00%导致判断失误，*/
                if (event.currentTarget.outerHTML.indexOf('tp="percent"') !== -1) {
                    var temp = $(this).val().trim().split("%");
                    curValue = Number(temp[0] ? temp[0] : 0).toFixed(4);
                    if (!isNaN(curValue) && (curValue > 1 || curValue < 0)) {
                        $(this).parent().removeClass('report_error');
                        mini.alert('《居民企业参股外国企业信息报告表》持股比例值输入范围为[0,1]！', '提示');
                        $(this).val("").attr("value", "");
                    } else {
                        if (isNaN(curValue) || Number(curValue) === 0) {
                            $(this).val("").attr("value", "");
                            $(this).parent().removeClass('report_error');
                        } else {
                            $(this).val((curValue * 100).toFixed(2) + "%").attr("value", (curValue * 100).toFixed(2) + "%");
                            $(this).parent().removeClass('report_error');
                        }
                    }
                } else {
                    curValue = $(this).val().trim();
                    if (curValue !== '' && $(this).parent().attr('class') && $(this).parent().attr('class').indexOf('report_error') !== -1)
                        $(this).parent().removeClass('report_error')
                }
            });
            /*-----------------002报告表 二、被投资外国企业信息 控制其输入样式--结束-------------*/
        }
    }
};
servyouReport.autoAddAllId = true;
servyouReport.showSideBar = false;
servyouReport.customInitFromHd = function () {
    this.tables['001'] && report.customInitFromHd_001(this);
};
servyouReport.customEvent = function () {
    this.tables['001'] && report.ynssdeChange();
    this.tables['002'] && report.bindRequiredSameTime();
};
servyouReport.afterInit = function () {
    report.setXwqy(this);
};
servyouReport.checkTable_001 = function () {
    var result = report.checkXwqyRequired() && report.checkYbtse(this);
    if(!result){
        mini.get('tabs').activeTab('001');
    }
    return result;
};
servyouReport.checkTable_002 = function () {
    var result = report.checkTable002() && report.checkTable002Time();
    if(!result){
        mini.get('tabs').activeTab('002');
    }
    return result;
};
servyouReport.changeXml_001 = function () {
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbsxDm1').text('11');
    $xml.find('zsfsDm').text(mini.get('hdzsfs').getValue());
    $xml.find('sbrq1').text("2018-10-22");
    $xml.find('qysdsyddhndnssbbblFrom qycyrsQnpjrs').text($('#001_25_3').val());//从业人数
    $xml.find('qysdsyddhndnssbbblFrom sfsyxxwlqy').text(mini.get('xwqy').getValue());//小微标志
    $xml.find('qysdsyddhndnssbbblFrom srzeLj').text($('#001_6_5').val());//1
    $xml.find('qysdsyddhndnssbbblFrom gzlxsrLj').text($('#001_9_5').val());//4
    $xml.find('qysdsyddhndnssbbblFrom yssrehcbfyzeLj').text($('#001_15_5').val());//10
    $xml.find('qysdsyddhndnssbbblFrom yyjsdseLj').text($('#001_21_5').val());//16
    $xml.find('qysdsyddhndnssbbblFrom fhtjxxwlqyjmsdseLj').text($('#001_20_5').val());//15
    $xml.find('qysdsyddhndnssbbblFrom qmcyrs').text($('#001_23_5').val());//期末从业人数
    $xml.find('qysdsyddhndnssbbblFrom dfzfzqlxsrLj').text($('#001_14_5').val());//9
    $xml.find('qysdsyddhndnssbbblFrom zczeQnpjs').text($('#001_25_5').val());//资产总额
    $xml.find('qysdsyddhndnssbbblFrom mssrLj').text($('#001_8_5').val());//3
    $xml.find('qysdsyddhndnssbbblFrom swjghdyssdl').text(servyouReport.getInputValue($('#001_16_5')));//11
    $xml.find('qysdsyddhndnssbbblFrom bzssrLj').text($('#001_7_5').val());//2
    $xml.find('qysdsyddhndnssbbblFrom ynsdseLj').text($('#001_19_5').val());//14
    $xml.find('qysdsyddhndnssbbblFrom ybtsdseLj').text($('#001_22_5').val());//17
    $xml.find('qysdsyddhndnssbbblFrom jmqyzjgxhlqysyLj').text($('#001_10_5').val());//5
    $xml.find('qysdsyddhndnssbbblFrom hyDm').text($('#001_24_3').val());//行业代码
    $xml.find('qysdsyddhndnssbbblFrom gjxzhjzhy').text(mini.get('gjxzhy').getValue());//国家限制或禁止行业
    $xml.find('qysdsyddhndnssbbblFrom ynssdeLj').text($('#001_17_5').val());//12
    $xml.find('qysdsyddhndnssbbblFrom sl1').text(this.getInputValue($('#001_18_5')));//13
    $xml.find('qysdsyddhndnssbbblFrom sgttzgxhlsdmzqysdsLj').text($('#001_12_5').val());//7
    $xml.find('qysdsyddhndnssbbblFrom zqjjzqddsymzqysdsLj').text($('#001_13_5').val());//8
    $xml.find('qysdsyddhndnssbbblFrom hgttzgxhlsdmzqysdsLj').text($('#001_11_5').val());//6
    return $xml;
};
servyouReport.changeXml_002 = function () {
    var $trs = $('#table_002 tbody tr'),
        $xml = this.getJ3Xml('002'),
        $jmqycgwgqyxxbgbGridlb = $xml.find("jmqycgwgqyxxbgbGridlb"),
        $curTr5 = $trs.eq(5),
        $curTr6 = $trs.eq(6),
        $curTr7 = $trs.eq(7);
    var $bgrxxForm = $jmqycgwgqyxxbgbGridlb.find('bgrxxForm').clone();
    var $btzwgqyxxForm = $jmqycgwgqyxxbgbGridlb.find('btzwgqyxxForm').clone();
    var $ybjqgfdqtgdGrid = $jmqycgwgqyxxbgbGridlb.find('ybjqgfdqtgdGrid').clone();
    var $zgjmgrdrwgqygghdsqkGrid = $jmqycgwgqyxxbgbGridlb.find('zgjmgrdrwgqygghdsqkGrid').clone();
    var $bgrsgwgqygfqkGrid = $jmqycgwgqyxxbgbGridlb.find('bgrsgwgqygfqkGrid').clone();
    var $bgrczwgqygfqkGrid = $jmqycgwgqyxxbgbGridlb.find('bgrczwgqygfqkGrid').clone();
    $jmqycgwgqyxxbgbGridlb.empty();
    $bgrxxForm.find('qymc').text(this.nsrmc);

    $bgrxxForm.find('nssbh').text(this.nsrsbh);

    $jmqycgwgqyxxbgbGridlb.append($bgrxxForm);
    $btzwgqyxxForm.find('wgqyzwmc').text(this.getInputValue($curTr5.find('td:eq(1) input')));
    $btzwgqyxxForm.find('wgqyzwcld').text(this.getInputValue($curTr5.find('td:eq(6) input')));
    $btzwgqyxxForm.find('wgqywwmc').text(this.getInputValue($curTr6.find('td:eq(1) input')));
    $btzwgqyxxForm.find('wgqywwcld').text(this.getInputValue($curTr6.find('td:eq(6) input')));
    $btzwgqyxxForm.find('szgnssbh').text(this.getInputValue($curTr7.find('td:eq(1) input')));
    $btzwgqyxxForm.find('zyywlx').text(this.getInputValue($curTr7.find('td:eq(4) input')));
    var bgrcgbl = this.getInputValue($curTr7.find('td:eq(6) input'));
    if (bgrcgbl) {
        $btzwgqyxxForm.find('bgrcgbl').text((bgrcgbl.split("%").join("") * 1 / 100).toFixed(4));
    }
    if ($btzwgqyxxForm.children().text().trim() !== "") {
        $jmqycgwgqyxxbgbGridlb.append($btzwgqyxxForm);
    }
    var lbClone1 = $ybjqgfdqtgdGrid.find('ybjqgfdqtgdGridlb:eq(0)').clone();
    $ybjqgfdqtgdGrid.empty();
    for (var i = 0; i < 4; i++) {
        var $curTr_10 = $trs.eq(i + 10),
            newLbClone1 = lbClone1.clone(),
            count1 = i + 1;
        $(newLbClone1).find('cggdzwmc').text(this.getInputValue($curTr_10.find('td:eq(0) input')));
        $(newLbClone1).find('cggdwwmc').text(this.getInputValue($curTr_10.find('td:eq(1) input')));
        $(newLbClone1).find('jzdhcldzw').text(this.getInputValue($curTr_10.find('td:eq(2) input')));
        $(newLbClone1).find('jzdhcldww').text(this.getInputValue($curTr_10.find('td:eq(3) input')));
        $(newLbClone1).find('cglx').text(mini.get("gdqk_cglx_" + count1).getValue());
        $(newLbClone1).find('cgbl').text(this.getInputValue($curTr_10.find('td:eq(5) input')));
        $(newLbClone1).find('qyfeqsrq').text(mini.get("qsrq_" + count1).getText());
        if ($(newLbClone1).children().text() === '0.0000') {
            continue;
        }
        $ybjqgfdqtgdGrid.append(newLbClone1);
    }
    $jmqycgwgqyxxbgbGridlb.append($ybjqgfdqtgdGrid);

    var lbClone2 = $zgjmgrdrwgqygghdsqkGrid.find('zgjmgrdrwgqygghdsqkGridlb:eq(0)').clone();
    $zgjmgrdrwgqygghdsqkGrid.empty();
    for (var i = 0; i < 3; i++) {
        var $curTr_16 = $trs.eq(i + 16),
            newLbClone2 = lbClone2.clone(),
            count2 = i + 1;
        $(newLbClone2).find('zgmjgrxm').text(this.getInputValue($curTr_16.find('td:eq(0) input')));
        $(newLbClone2).find('zgjnczd').text(this.getInputValue($curTr_16.find('td:eq(1) input')));
        $(newLbClone2).find('sfzjlx').text(mini.get("sfzjlx_" + count2).getValue());
        $(newLbClone2).find('sfzjhm').text(this.getInputValue($curTr_16.find('td:eq(3) input')));
        $(newLbClone2).find('zw').text(this.getInputValue($curTr_16.find('td:eq(4) input')));
        $(newLbClone2).find('rzrqq').text(mini.get("rzrqq_" + count2).getText());
        $(newLbClone2).find('rzrqz').text(mini.get("rzrqz_" + count2).getText());
        if ($(newLbClone2).children().text() === '') continue;
        $zgjmgrdrwgqygghdsqkGrid.append(newLbClone2);
    }
    $jmqycgwgqyxxbgbGridlb.append($zgjmgrdrwgqygghdsqkGrid);

    var lbClone3 = $bgrsgwgqygfqkGrid.find('bgrsgwgqygfqkGridlb:eq(0)').clone();
    $bgrsgwgqygfqkGrid.empty();
    for (var i = 0; i < 3; i++) {
        var $curTr_22 = $trs.eq(i + 22),
            newLbClone3 = lbClone3.clone(),
            count3 = i + 1;
        $(newLbClone3).find('bsggflx').text(mini.get("sggfqk_cglx_" + count3).getValue());
        $(newLbClone3).find('jyrq').text(mini.get("jyrq_" + count3).getText());
        $(newLbClone3).find('sgfs').text(this.getInputValue($curTr_22.find('td:eq(4) input')));
        $(newLbClone3).find('sgqbgrzwgqycgfe').text(this.getInputValue($curTr_22.find('td:eq(5) input')));
        $(newLbClone3).find('sghbgrzwgqycgfe').text(this.getInputValue($curTr_22.find('td:eq(6) input')));
        if ($(newLbClone3).children().text() === '0.000.00') continue;
        $bgrsgwgqygfqkGrid.append(newLbClone3);
    }
    $jmqycgwgqyxxbgbGridlb.append($bgrsgwgqygfqkGrid);

    var lbClone4 = $bgrczwgqygfqkGrid.find('bgrczwgqygfqkGridlb:eq(0)').clone();
    $bgrczwgqygfqkGrid.empty();
    for (var i = 0; i < 3; i++) {
        var $curTr_27 = $trs.eq(i + 27),
            newLbClone4 = lbClone4.clone(),
            count4 = i + 1;
        $(newLbClone4).find('bczgflx').text(mini.get("czgfqk_cglx_" + count4).getValue());
        $(newLbClone4).find('czrq').text(mini.get("czrq_" + count4).getText());
        $(newLbClone4).find('czfs').text(this.getInputValue($curTr_27.find('td:eq(4) input')));
        $(newLbClone4).find('czqbgrzwgqycgfe').text(this.getInputValue($curTr_27.find('td:eq(5) input')));
        $(newLbClone4).find('czhbgrzwgqycgfe').text(this.getInputValue($curTr_27.find('td:eq(6) input')));
        if ($(newLbClone4).children().text() === '0.000.00') continue;
        $(newLbClone4).find('mxxh').text(i + 1);
        $bgrczwgqygfqkGrid.append(newLbClone4);
    }
    $jmqycgwgqyxxbgbGridlb.append($bgrczwgqygfqkGrid);
    return $xml;
};
//001更正申报
servyouReport.customResumeFromXml_001 = function () {
    var $trs = $('#table_001 tr');
    var _this = this;
    $(this.j3CorrectXml).find('qysdshdzsyjdndsb qysdsyddhndnssbbblFrom').each(function () {
        _this.setTargetVal($trs.eq(6).find('td:eq(5) input'), $(this).find('srzeLj').text());
        _this.setTargetVal($trs.eq(7).find('td:eq(5) input'), $(this).find('bzssrLj').text());
        _this.setTargetVal($trs.eq(9).find('td:eq(5) input'), $(this).find('gzlxsrLj').text());
        _this.setTargetVal($trs.eq(10).find('td:eq(5) input'), $(this).find('jmqyzjgxhlqysyLj').text());
        _this.setTargetVal($trs.eq(11).find('td:eq(5) input'), $(this).find('hgttzgxhlsdmzqysdsLj').text());
        _this.setTargetVal($trs.eq(12).find('td:eq(5) input'), $(this).find('sgttzgxhlsdmzqysdsLj').text());
        _this.setTargetVal($trs.eq(13).find('td:eq(5) input'), $(this).find('zqjjzqddsymzqysdsLj').text());
        _this.setTargetVal($trs.eq(14).find('td:eq(5) input'), $(this).find('dfzfzqlxsrLj').text());
        _this.setTargetVal($trs.eq(21).find('td:eq(5) input'), $(this).find('yyjsdseLj').text());
        _this.setTargetVal($trs.eq(23).find('td:eq(5) input'), $(this).find('qmcyrs').text());
    });
};
//更正申报 最后恢复小微标志
servyouReport.triggerEventForCorrect = function () {
    if ($(servyouReport.j3CorrectXml).find("sfsyxxwlqy").text() === "Y") {
        mini.get('xwqy').setValue('Y');
        /*$("input[id='mini-7$ck$0'][value='Y']").prop("checked", "true").attr("checked", "true");
        $("input[id='mini-7$ck$0'][value='N']").removeAttr("checked");
        $("#001_23_5").val("0.00").blur();
        $("#001_24_5").val("0.00").blur();*/
    }
    if ($(servyouReport.j3CorrectXml).find("sfsyxxwlqy").text() === "N") {
        mini.get('xwqy').setValue('N');
       /* $("input[id='mini-7$ck$1'][value='N']").prop("checked", "true").attr("checked", "true");
        $("input[id='mini-7$ck$1'][value='Y']").removeAttr("checked");*/
    }
};

//002更正申报
servyouReport.customResumeFromXml_002 = function () {
    var _this = this;
    var $cgwgqyxxbgbVO = $(this.j3CorrectXml).find('jmqycgwgqyxxbgbGrid jmqycgwgqyxxbgbGridlb');
    var $wgqyxxForm = $cgwgqyxxbgbVO.find('btzwgqyxxForm');
    var $gdxxGrid = $cgwgqyxxbgbVO.find('ybjqgfdqtgdGrid');
    var $dsxxGrid = $cgwgqyxxbgbVO.find('zgjmgrdrwgqygghdsqkGrid');
    var $sggfxxGrid = $cgwgqyxxbgbVO.find('bgrsgwgqygfqkGrid');
    var $czgfxxGrid = $cgwgqyxxbgbVO.find('bgrczwgqygfqkGrid');
    //二、被投资外国企业信息
    this.setTargetVal($('#002_7_1'), $wgqyxxForm.find('wgqyzwmc').text());
    this.setTargetVal($('#002_7_6'), $wgqyxxForm.find('wgqyzwcld').text());
    this.setTargetVal($('#002_8_1'), $wgqyxxForm.find('wgqywwmc').text());
    this.setTargetVal($('#002_8_6'), $wgqyxxForm.find('wgqywwcld').text());
    this.setTargetVal($('#002_9_1'), $wgqyxxForm.find('szgnssbh').text());
    this.setTargetVal($('#002_9_4'), $wgqyxxForm.find('zyywlx').text());
    this.setTargetVal($('#002_9_6'), $wgqyxxForm.find('bgrcgbl').text());
    //有外国企业10%以上股份或有表决权股份的其他股东情况
    $gdxxGrid.find('ybjqgfdqtgdGridlb').each(function (i) {
        if (i > 3) {
            return false;
        }
        var trIndex = i + 12;
        _this.setTargetVal($('#002_' + trIndex + '_0'), $(this).find('cggdzwmc').text());
        _this.setTargetVal($('#002_' + trIndex + '_1'), $(this).find('cggdwwmc').text());
        _this.setTargetVal($('#002_' + trIndex + '_2'), $(this).find('jzdhcldzw').text());
        _this.setTargetVal($('#002_' + trIndex + '_3'), $(this).find('jzdhcldww').text());
        mini.get('gdqk_cglx_' + (i + 1)).setValue($(this).find('cglx').text());
        _this.setTargetVal($('#002_' + trIndex + '_5'), $(this).find('cgbl').text());
        mini.get('qsrq_' + (i + 1)).setValue($(this).find('qyfeqsrq').text());
    });
    //中国居民个人担任外国企业高管或董事情况
    $dsxxGrid.find('zgjmgrdrwgqygghdsqkGridlb').each(function (i) {
        if (i > 2) {
            return false;
        }
        var trIndex = i + 18;
        _this.setTargetVal($('#002_' + trIndex + '_0'), $(this).find('zgmjgrxm').text());
        _this.setTargetVal($('#002_' + trIndex + '_1'), $(this).find('zgjnczd').text());
        mini.get('sfzjlx_' + (i + 1)).setValue($(this).find('sfzjlx').text());
        _this.setTargetVal($('#002_' + trIndex + '_3'), $(this).find('sfzjhm').text());
        _this.setTargetVal($('#002_' + trIndex + '_4'), $(this).find('zw').text());
        mini.get('rzrqq_' + (i + 1)).setValue($(this).find('rzrqq').text());
        mini.get('rzrqz_' + (i + 1)).setValue($(this).find('rzrqz').text());
    });
    //三、外国企业股份变动信息-报告人收购外国企业股份情况
    $sggfxxGrid.find('bgrsgwgqygfqkGridlb').each(function (i) {
        if (i > 2) {
            return false;
        }
        var trIndex = i + 24;
        mini.get('sggfqk_cglx_' + (i + 1)).setValue($(this).find('bsggflx').text());
        mini.get('jyrq_' + (i + 1)).setValue($(this).find('jyrq').text());
        _this.setTargetVal($('#002_' + trIndex + '_4'), $(this).find('sgfs').text());
        _this.setTargetVal($('#002_' + trIndex + '_5'), $(this).find('sgqbgrzwgqycgfe').text());
        _this.setTargetVal($('#002_' + trIndex + '_6'), $(this).find('sghbgrzwgqycgfe').text());
    });
    //三、外国企业股份变动信息-报告人处置外国企业股份情况
    $czgfxxGrid.find('bgrczwgqygfqkGridlb').each(function (i) {
        if (i > 2) {
            return false;
        }
        var trIndex = i + 29;
        mini.get('czgfqk_cglx_' + (i + 1)).setValue($(this).find('bczgflx').text());
        mini.get('czrq_' + (i + 1)).setValue($(this).find('czrq').text());
        _this.setTargetVal($('#002_' + trIndex + '_4'), $(this).find('czfs').text());
        _this.setTargetVal($('#002_' + trIndex + '_5'), $(this).find('czqbgrzwgqycgfe').text());
        _this.setTargetVal($('#002_' + trIndex + '_6'), $(this).find('czhbgrzwgqycgfe').text());
    });
};
/*servyouReport.customResumeFromXml_002 = function () {
    var $trs = $('#table_002 tbody tr'),
        $xml = $(servyouReport.j3CorrectXml).find("jmqycgwgqyxxbgbGrid jmqycgwgqyxxbgbGridlb");
    var $btzwgqyxxForm = $xml.find("btzwgqyxxForm");

    //被投资外国企业信息
    $trs.eq(5).find('td:eq(1) input').val($btzwgqyxxForm.find('wgqyzwmc').text());
    $trs.eq(5).find('td:eq(6) input').val($btzwgqyxxForm.find('wgqyzwcld').text());
    $trs.eq(6).find('td:eq(1) input').val($btzwgqyxxForm.find('wgqywwmc').text());
    $trs.eq(6).find('td:eq(6) input').val($btzwgqyxxForm.find('wgqywwcld').text());
    $trs.eq(7).find('td:eq(1) input').val($btzwgqyxxForm.find('szgnssbh').text());
    $trs.eq(7).find('td:eq(4) input').val($btzwgqyxxForm.find('zyywlx').text());
    $trs.eq(7).find('td:eq(6) input').val($btzwgqyxxForm.find('bgrcgbl').text());
    //持有外国企业10%以上股份或有表决权股份的其他股东情况
    var $ybjqgfdqtgdGrid = $xml.find("ybjqgfdqtgdGrid").children();
    $.each($ybjqgfdqtgdGrid, function (i, e) {
        if (i > 3) {
            return false;
        }
        var $curTr_10 = $trs.eq(i + 10);
        $curTr_10.find('td:eq(0) input').val($(e).find('cggdzwmc').text());
        $curTr_10.find('td:eq(1) input').val($(e).find('cggdwwmc').text());
        $curTr_10.find('td:eq(2) input').val($(e).find('jzdhcldzw').text());
        $curTr_10.find('td:eq(3) input').val($(e).find('jzdhcldww').text());
        mini.get("gdqk_cglx_" + (i + 1)).setValue($(e).find('cglx').text());
        $curTr_10.find('td:eq(5) input').val($(e).find('cgbl').text());
        mini.get("qsrq_" + (i + 1)).setValue($(e).find('qyfeqsrq').text());

    });
    //中国居民个人担任外国企业高管或董事情况
    var $zgjmgrdrwgqygghdsqkGrid = $xml.find('zgjmgrdrwgqygghdsqkGrid').children();
    $.each($zgjmgrdrwgqygghdsqkGrid, function (i, e) {
        if (i > 2) {
            return false;
        }
        var $curTr_16 = $trs.eq(i + 16),
            count2 = i + 1;
        $curTr_16.find('td:eq(0) input').val($(e).find('zgmjgrxm').text());
        $curTr_16.find('td:eq(1) input').val($(e).find('zgjnczd').text());
        mini.get("sfzjlx_" + count2).setValue($(e).find('sfzjlx').text());
        $curTr_16.find('td:eq(3) input').val($(e).find('sfzjhm').text());
        $curTr_16.find('td:eq(4) input').val($(e).find('zw').text());
        mini.get("rzrqq_" + count2).setValue($(e).find('rzrqq').text());
        mini.get("rzrqz_" + count2).setValue($(e).find('rzrqz').text())
    });
    //报告人收购外国企业股份情况
    var $bgrsgwgqygfqkGrid = $xml.find('bgrsgwgqygfqkGrid').children();
    $.each($bgrsgwgqygfqkGrid, function (i, e) {
        if (i > 2) {
            return false;
        }
        var $curTr_22 = $trs.eq(i + 22),
            count3 = i + 1;
        mini.get("sggfqk_cglx_" + count3).setValue($(e).find('bsggflx').text());
        mini.get("jyrq_" + count3).setValue($(e).find('jyrq').text());
        $curTr_22.find('td:eq(4) input').val($(e).find('sgfs').text());
        $curTr_22.find('td:eq(5) input').val($(e).find('sgqbgrzwgqycgfe').text());
        $curTr_22.find('td:eq(6) input').val($(e).find('sghbgrzwgqycgfe').text());
    });
    //报告人处置外国企业股份情况
    var $bgrczwgqygfqkGrid = $xml.find('bgrczwgqygfqkGrid').children();
    $.each($bgrczwgqygfqkGrid, function (i, e) {
        if (i > 2) {
            return false;
        }
        var $curTr_27 = $trs.eq(i + 27),
            count4 = i + 1;
        mini.get("czgfqk_cglx_" + count4).setValue($(e).find('bczgflx').text());
        mini.get("czrq_" + count4).setValue($(e).find('czrq').text());
        $curTr_27.find('td:eq(4) input').val($(e).find('czfs').text());
        $curTr_27.find('td:eq(5) input').val($(e).find('czqbgrzwgqycgfe').text());
        $curTr_27.find('td:eq(6) input').val($(e).find('czhbgrzwgqycgfe').text());
    });

};*/

$(function () {
    servyouReport.init();
});
/**
 * Created by lcn on 2017/8/11.
 */
report.timer = new Timer();
report.doRiskScan = function () {
    if (!report.timer.checkTime()){
        return;
    }
    var _this = servyouReport;
    if(_this.checkAllClicked() && _this.checkDatas()){
        var errorMsgs = _this.checkDoShowMessage();
        if(errorMsgs.length >0){
            var newErrorMsgArr = [];
            $.each(errorMsgs, function (i,msg) {
                newErrorMsgArr.push('（'+(i+1)+'）'+msg);
            });
            var newErrorMsgs = newErrorMsgArr.join('<br>');
            mini.confirm(newErrorMsgs,'点击确定，继续发送政策风险扫描申请！',function (action) {
                if(action === 'ok'){
                    report.sendRiskScan();
                }
            });
        }else{
            report.sendRiskScan();
        }
    }
};
report.sendRiskScan = function () {
    var that = servyouReport;
    var j3Xmls = [];
    $('table[type="sb"]').each(function () {
        var sb_id = $(this).attr('sb_id');
        if(typeof that['changeXml_'+sb_id] === 'function'){
            var obj = {};
            var $xml = that['changeXml_'+sb_id].apply(that,[]);
            var bbxml = '';
            if($xml.children().length !== 0){
                bbxml = xmlUtil.turnXmlToStr($xml[0]).replace(/[\n\t]/g,'').replace(/>\s+</g,'><');//(去除换行及节点间的空格)
            }
            obj['bbwjm'] = that.sbzlDm+'_'+sb_id+'.xml';
            obj['bbxml'] = bbxml;
            j3Xmls.push(obj);
        }
    });
    var request={
        djxh: that.djxh,
        sssqq: that.sssqq,
        sssqz: that.sssqz,
        sbzlDm: that.sbzlDm,
        sbwjs: mini.encode(j3Xmls),
        isDbbc: 'N'
    };
    if(Api.getIfSuccess('/sbzx-web/api/szjk/scan', request)){
        report.timer.run();
        var szjkcxUrl = '/sbzx-web/apps/views/szjkcx/szjkcx.html?sbzlDm='+that.sbzlDm+'&sssqq='+that.sssqq+'&sssqz='+that.sssqz;
        mini.showMessageBox({
            title: "提示",
            iconCls: "mini-messagebox-question",
            message: '已发送扫描申请，请点击“<a href="' + szjkcxUrl + '" target="_blank">政策风险查询</a>“获取反馈结果</br>',
            buttons: ["ok"]
        });
    }
};
report.timer.defaultText = '政策风险提示服务';
report.timer.textAfterTime = '后可再次扫描';
report.timer.solveNotAllowed = function () {
    mini.alert(this.getTextByRestTime());
};
servyouReport.customReportBtns = function () {
    servyouReport.reportBtns.unshift({
        id: 'sb_szjk',
        cls: 'btn btn-orange',
        text: '政策风险提示服务',
        callback: function () {
            report.doRiskScan();
        },
        whenToShow: 'report,correct,past,overdue'
    });
};
report.setXwqy = function (_this) {
    var row_12_v = Number($('#001_17_5').val());
    var xwqy = mini.get('xwqy');
    if(_this.wsxxMap['HDZSFS'] === '2' || _this.wsxxMap['HDZSFS'] === '3'){//核定应税所得率征收的纳税人：
        if(row_12_v <= Number(_this.wsxxMap['XWJMMAXVALUE'])){
            xwqy.setValue('Y');
        }else{
            xwqy.setValue('N');
        }
        xwqy.setReadOnly(true);
        $(xwqy.el).parent().removeClass('enable');
    }else{//核定应纳税额的纳税人
        //识别规则：年核定税额≤10万（折算后，季度（核定HDYNSE节点）≤25000元），视同年应纳税所得额≤100万元。可以选“是”，其余选“否”。
        if(_this.wsxxMap['HDYNSE'] > Number(_this.wsxxMap['XWJMMAXVALUE'])/40){
            //核定定额征收纳税人，换算应纳税所得额大于100万的，系统自动选择填“否”，纳税人不允许更改
            xwqy.setValue('N');
            xwqy.setReadOnly(true);
            $(xwqy.el).parent().removeClass('enable');
        }else{
            //核定定额征收纳税人，换算应纳税所得额小于等于100万的，纳税人可以选择填“是”或者“否”。
            xwqy.setReadOnly(false);
            $(xwqy.el).parent().addClass('enable');
        }
    }
};