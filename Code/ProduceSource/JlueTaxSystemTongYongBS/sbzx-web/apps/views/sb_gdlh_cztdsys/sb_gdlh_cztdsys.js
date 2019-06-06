/*
*  Created by lcn on 2018/5/16
*/

var cztdsys = {
    isFirstCheckSfz: false,
    customInitFromHd: function (_this) {
        _this.tables['001'] && this.customInitFromHd_001(_this);
        //  _this.tables['002'] && this.customInitFromHd_002(_this);
        //_this.tables['003'] && this.customInitFromHd_003(_this);
    },
    customInitFromHd_001: function (_this) {
        //纳税人类型
        var $trs = $("#table_001 tbody tr");
        // var nsrlx = servyouReport.wsxxMap['nsrlx'];
        // if (nsrlx === '1'){
        //     mini.get('dwgr').setValue(nsrlx);
        // }
        //登记注册类型
        $trs.eq(1).find("td:eq(4) input").val(Api.getMcByDm('djzclx', servyouReport.nsrData.djzclxDm)).blur();
        //所属行业
        $trs.eq(1).find("td:eq(9) input").val(Api.getMcByDm('hy', servyouReport.nsrData.hyDm)).blur();
        //身份证件类型sfzjlxdm

        var sfzjlx = servyouReport.nsrData.fddbrsfzjlxDm;
        if (sfzjlx !== "201") {
            if (sfzjlx === "227" || sfzjlx === "208") {
                mini.get('sfzjlx').setValue('2');
            } else {
                mini.get('sfzjlx').setValue('3');
            }
        } else {
            mini.get('sfzjlx').setValue('1');
        }
        //身份证件号码
        $trs.eq(2).find("td:eq(9) input").val(servyouReport.nsrData.fddbrsfzjhm || servyouReport.nsrData.nsrxxKzVO.bsrsfzjhm);
        //联系人
        $trs.eq(3).find("td:eq(4) input").val(servyouReport.nsrData.fddbrxm).blur();
        //联系方式
        $trs.eq(3).find("td:eq(9) input").val(servyouReport.nsrData.nsrxxKzVO.fddbryddh).blur();
    },
    //校验身份证
    /*sfzjhmChange: function () {
        $('#001_5_9').parent().removeClass('report_error');
        var validator = new Validator();
        $("#table_001").on("blur","#001_5_9",function (e) {
            var that = this;
            if ($('input[name="sfzjlx"]:checked').val() === "1") {
                if (!validator.isSfzhm($(that).val())) {
                    $(that).parent().addClass('report_error');
                    mini.alert('您填写的身份证件号码格式不正确，请重填！', '提示', function () {
                    });
                }
            }
        });
    },*/

    // 身份类型切换
    /*sflxChagne:function(){
        $("#table_001").on("change",'input[name="sfzjlx"]',function () {
            $('#001_5_9').parent().removeClass('report_error');
            if(cztdsys.isFirstCheckSfz) {
                $('#001_5_9').val("").focus();
            }
        });
    },*/


    customInit: function (_this) {
        this.initNssbxx_001(_this);//初始化001
        this.init_002(_this);
    },
    //纳税申报信息，生成html
    initNssbxx_001: function (_this) {
        try {
            var html = "";
            var cztdsysData = _this.hd.dqyjskxxGrid.cztdsysZbxxGridlb || [];
            cztdsysData.sort(function (td1, td2) {
                if (td1.tdsybh !== td2.tdsybh) {
                    return 0;
                } else {
                    var result = td2.skssqq.replace(/\-/g, '') - td1.skssqq.replace(/\-/g, '');
                    return result;
                }
            });
            $.each(cztdsysData, function (i, v) {
                var tdsybh = v.tdsybh ? v.tdsybh : "";//为null的时候显示为“”
                var dh1 = v.dh1 ? v.dh1 : "";
                html += "<tr>" +
                    "<td class='hidden'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + tdsybh + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + dh1 + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.tddjmc + "' tddjdm='" + v.tddjdm + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.sl1 + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.jsyj + "'></td>" +
                    "<td class='txt-r txt-nowrap'><input type='text' disabled='disabled' value='" + v.skssqq + "' servyou_type='date'></td>" +
                    "<td class='txt-r txt-nowrap'><input type='text' disabled='disabled' value='" + v.skssqz + "' servyou_type='date'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.ynse + "' ></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.jmse + "' ></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.yjse + "' ></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.ybtse + "'></td>" +
                    "</tr>"
            });
            $("#nssbxx").attr("rowspan", 2 + _this.hd.dqyjskxxGrid.cztdsysZbxxGridlb.length);
            servyouReport.addRows("001", $("#table_001 tbody tr").length + 2, _this.hd.dqyjskxxGrid.cztdsysZbxxGridlb.length, html);
        } catch (e) {

        }

    },
    init_002: function (_this) {
        try {
            html = "";
            var jmxxList = _this.hd.dqyjskxxGrid.cztdsysJmxxGridlb || [];
            jmxxList.sort(function (td1, td2) {
                if (td1.tdsybh !== td2.tdsybh) {
                    return 0;
                } else {
                    var result = td2.skssqq.replace(/\-/g, '') - td1.skssqq.replace(/\-/g, '');
                    return result;
                }
            });
            $.each(jmxxList, function (i, v) {
                html += "<tr class='jmxx_002'>" +
                    "<td>" + (i + 1) + "</td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.tdsybh + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.skssqq + "' servyou_type='date'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.skssqz + "' servyou_type='date'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.ssjmxzDm + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.ssjmxzMc + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.jmmj + "' ></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.tddjmc + "' tddjdm='" + v.tddjdm + "' servyou_type='string'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.dwse + "'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='" + v.jmse + "'></td>" +
                    "</tr>"
            });
            servyouReport.addRows("002", $("#table_002 tbody tr").length + 2, _this.hd.dqyjskxxGrid.cztdsysJmxxGridlb.length, html)
        } catch (e) {

        }
    }
};
servyouReport.autoAddAllId = true;
servyouReport.showSideBar = false;
servyouReport.excelImportMessage = '尊敬的纳税人，由于该表所有数据都可以自动获取，不需要数据导入功能！';
servyouReport.customInitFromHd = function () {
    cztdsys.customInitFromHd(this);
};
servyouReport.customInit = function () {
    cztdsys.customInit(this)
};
servyouReport.customEvent = function () {
    // cztdsys.sfzjhmChange();
    // cztdsys.sflxChagne();
};
servyouReport.afterInit = function () {
    //插入完数据，格式化
    this.formatAllData();
    this.tables["001"] && this.calculateAll("001");
    this.tables["002"] && this.calculateAll("002");
    cztdsys.isFirstCheckSfz = true;
};
servyouReport.checkTable_001 = function () {
    /*if($("#001_6_9").val()){
        return true;
    }else{
        mini.alert("请填写联系方式！");
        $("#001_6_9").parent().addClass("report_error");
        return false;
    }*/
    return true;
};
servyouReport.changeXml_001 = function () {
    var $xml = this.getJ3Xml('001');
    $xml.find('wqsbxxGrid').empty();
    $xml.find('zgswskfjDm').text(this.nsrData.zgswskfjDm);
    $xml.find('jdxzDm').text(this.nsrData.jdxzDm);
    $xml.find('djxh').text(this.djxh);
    $xml.find('sfzjlxDm').text(this.wsxxMap['sfzjlxdm']);
    // $xml.find('djxh').text(this.djxh);
    $xml.find('nsrlx').text(this.wsxxMap['nsrlx']);
    $xml.find('lsgx').text(this.nsrData.dwlsgxDm);
    $xml.find('sblx').text(this.sblxDm);
    $xml.find('lrrDm').text(this.nsrData.lrrDm);
    $xml.find('xzqhszDm').text(this.nsrData.scjydzxzqhszDm);
    $xml.find('djzclxDm').text(this.wsxxMap['djzclxdm']);
    $xml.find('sjgsdq').text(this.nsrData.sjgsdq);
    $xml.find('lxr').text($('.lxr').val() || "");
    $xml.find('lxfs').text($('.lxfs').val() || "");
    $xml.find('sshyDm').text(this.nsrData.hyDm);
    $xml.find('sblx').text(this.sblxDm);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('tbrq').text(this.tbrq);
    $xml.find('sbrq').text(this.tbrq);
    var $dqsbxxGrid = $xml.find("dqsbxxGrid");
    var $dqsbxxGridlb = $dqsbxxGrid.find("dqsbxxGridlb").eq(0).clone();
    $dqsbxxGrid.empty();
    //todo   土地面积节点
    var code_list = ["tdsybh", "dh1", "tddjDm", "dwse", "", "skssqq", "skssqz", "ynse", "jmse", "yjse", "ybtse"];
    $.each($("#table_001 tbody tr").eq(4).nextUntil(".hj001"), function (i, v) {
        var temp = $dqsbxxGridlb.clone();
        $.each($(this).find("td"), function (j, w) {
            if (j === 0) {
                //跳过隐藏列
                return true;
            }
            if (code_list[j - 1] == "tddjDm") {
                temp.find(code_list[j - 1]).text($(this).find("input").attr("tddjdm"));
            } else {
                temp.find(code_list[j - 1]).text(servyouReport.getInputValue($(this).find("input")));
            }


        });
        $dqsbxxGrid.append(temp);
    });
    return $xml;
};

servyouReport.changeXml_002 = function () {
    var $xml = this.getJ3Xml('002');
    var $trs = $(".jmxx_002");
    var jmxxGrid = $xml.find("jmxxGrid");
    var jmxxGridlb = jmxxGrid.find("jmxxGridlb").eq(0);
    jmxxGrid.empty();
    $.each($trs, function (i, v) {
        var temp = jmxxGridlb.clone();
        var tds = $(v).find("input,select");
        temp.find("tdsybh").text(servyouReport.getInputValue($(tds[0])));
        temp.find("skssqq").text(servyouReport.getInputValue($(tds[1])));
        temp.find("skssqz").text(servyouReport.getInputValue($(tds[2])));
        temp.find("ssjmxzDm").text(servyouReport.getInputValue($(tds[3])));
        temp.find("jmmj").text(servyouReport.getInputValue($(tds[5])));
        temp.find("tddjDm").text($(tds[6]).attr("tddjdm"));
        temp.find("dwse").text(servyouReport.getInputValue($(tds[7])));
        temp.find("jmse").text(servyouReport.getInputValue($(tds[8])));
        jmxxGrid.append(temp);
    });
    return $xml;

};

servyouReport.changeXml_003 = function () {
    var $xml = this.getJ3Xml('003');
    return $xml;
};

servyouReport.isYbtseOverZero = function () {
    return Number($(".ybtse").val()) > 0;
};

$(function () {
    servyouReport.init();
});