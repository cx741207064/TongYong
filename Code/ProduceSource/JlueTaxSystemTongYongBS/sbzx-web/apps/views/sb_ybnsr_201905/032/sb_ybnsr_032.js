/**
 * Created by lcn on 2017/8/8.
 */
var ybnsr032 = {
    initHd: function (_this) {
        $(".zgswjgbm").text(_this.nsrData.zgswjDm);
        $(".zgswjwmc").text(Api.getMcByDm('swjg',_this.nsrData.zgswjDm));
        $("#table_032").on("change", "[id$='_0']",function () {
            if (this.value === '') {
                $(this).parent().nextAll().find("input").attr("disabled", "disabled");
                $(this).parent().nextAll().find("input").val("").attr("value","");
                $(this).parent().nextAll().find("input").eq(4).val("0.00").blur();
            } else {
                $(this).parent().nextAll().find("input").removeAttr("disabled");
                $(this).parent().nextAll().removeClass("report_error ");
            }
        });
    },
    check032: function () {
        var trs = $("#table_032 tbody tr:lt(26):gt(0)").find("td:eq(0) input");
        var flag = true;
        trs.each(function (i, cur) {
            if (cur.value === '') {
                return true;
            } else {
                flag = true;
                $(cur).parent().nextAll().find("input").each(function (j, c) {
                    if (j !== 4) {
                        if (c.value === '') {
                            flag = false;
                        }
                    }
                });
                if (flag === false) {
                    mini.alert("第" + (i + 1) + "行扣缴人名称、征收机关名称、代扣代缴项目及代扣代缴凭证编号都必须要填写，请检查！");
                    $(cur).parent().nextAll().addClass("report_error");
                    $(cur).parent().nextAll().eq(5).removeClass("report_error");
                    return flag;
                }
            }
        });
        return flag;
    }

};
servyouReport.autoAddAllId = true;
servyouReport.afterInit = function () {
    ybnsr032.initHd(this);
};
servyouReport.checkTable_032 = function () {
    return ybnsr032.check032();
};
servyouReport.changeXml_032 = function () {
    var $trs = $('#table_032 tbody tr:lt(26):gt(0)');
    var $xml = this.getJ3Xml('032');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    var dkdjsstyjksdkqdGrid = $xml.find("dkdjsstyjksdkqdGrid");
    var dkdjsstyjksdkqdGridlb = dkdjsstyjksdkqdGrid.find("dkdjsstyjksdkqdGridlb").eq(0);
    dkdjsstyjksdkqdGrid.empty();
    $trs.each(function (i, cur) {
        if ($(cur).find("input").eq(0).val() === '') {
            return true;
        }
        var dkdjsstyjksdkqdGridlb_clone = dkdjsstyjksdkqdGridlb.clone();
        $(cur).find("input").each(function (j, c) {
            $(dkdjsstyjksdkqdGridlb_clone).children().eq(5-j).text(c.value);
            dkdjsstyjksdkqdGrid.append(dkdjsstyjksdkqdGridlb_clone);
            return true;
        })
    });
    return $xml;
};
servyouReport.customResumeFromXml_032 = function () {
    var _this = this;
    var $trs = $('#table_032 tbody tr');
    var trIndex = 0;
    $(this.j3CorrectXml).find('zzsybnsrsb_dkdjsstyjksdkqd dkdjsstyjksdkqdGrid dkdjsstyjksdkqdGridlb').each(function () {
        trIndex += 1;
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(0)').children(), $(this).find('kjrnsrsbh').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(2)').children(), $(this).find('kjrmc').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('zsjgmc').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('dkdjxm').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('dkdjpzbh').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('se').text());
    })
};
$(function () {
    servyouReport.init();
});