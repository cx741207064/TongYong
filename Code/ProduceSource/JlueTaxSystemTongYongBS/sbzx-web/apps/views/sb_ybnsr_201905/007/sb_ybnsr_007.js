/**
 * Created by tianchang on 2017/6/29.
 */
var cpy = {
    //从核定导入假数据
    init: function () {
    },
    ypxhchange: function (e) {
        var yp = e.value;
        if (yp != "") {
            var a = this.id.split("-")[1];
            $('#table_007 tbody tr').eq(Number(a) + 3).find('td:gt(0) input').removeAttr("disabled").blur();
        } else {
            var a = this.id.split("-")[1];
            $('#table_007 tbody tr').eq(Number(a) + 3).find('td:gt(0) input').val("").attr("value", "").attr("disabled", "disabled");
        }
    }
};
servyouReport.customInit = function () {

};
servyouReport.customEvent = function () {
    cpy.init();
};

//更正申报
servyouReport.customResumeFromXml_007 = function () {
    var $xml = $(servyouReport.j3CorrectXml).find("zzssyyybnsr_cpygxcqkmxb cpygxcqkmxbGrid").children();
    var $trs = $('#table_007 tbody tr');
    //报表详细信息
    $.each($xml, function (i, e) {
        var $curTr = $trs.eq(i + 4);
        mini.get("ypxh-" + (i + 1)).setValue($(e).find('ypxh').text()).blur();
        $curTr.find('td:eq(1) input').val($(e).find('qckcZgsl').text()).blur();
        $curTr.find('td:eq(2) input').val($(e).find('qckcDcsl').text()).blur();
        $curTr.find('td:eq(3) input').val($(e).find('qckcZgje').text()).blur();

        $curTr.find('td:eq(5) input').val($(e).find('bqrkZgsl').text()).blur();
        $curTr.find('td:eq(6) input').val($(e).find('bqrkDcsl').text()).blur();
        $curTr.find('td:eq(7) input').val($(e).find('bqrkZgje').text()).blur();

        $curTr.find('td:eq(9)  input').val($(e).find('bqckYsbfsl').text()).blur();
        $curTr.find('td:eq(10) input').val($(e).find('bqckYsbfje').text()).blur();
        $curTr.find('td:eq(11) input').val($(e).find('bqckFysbfZysl').text()).blur();
        $curTr.find('td:eq(12) input').val($(e).find('bqckFysbfDcsl').text()).blur();
        $curTr.find('td:eq(13) input').val($(e).find('bqckFysbfZyje').text()).blur();

        $curTr.find('td:eq(15) input').val($(e).find('qmkcZgsl').text()).blur();
        $curTr.find('td:eq(16) input').val($(e).find('qmkcDcsl').text()).blur();
        $curTr.find('td:eq(17) input').val($(e).find('qmkcZgje').text()).blur();
    });
};
//提交金三报文
servyouReport.changeXml_007 = function () {
    //提交报表头信息
    var $xml = this.getJ3Xml('007');
    var $trs = $('#table_007 tbody tr');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    //提交报表详细信息
    var $grid = $xml.find('cpygxcqkmxbGrid');
    var lbclone = $grid.find('cpygxcqkmxbGridlbVO:eq(0)').clone();
    $grid.empty();
    for (var i = 0; i < 20; i++) {
        var $curTr = $trs.eq(i + 4);
        var str = "ypxh-" + (i + 1);
        if (mini.get(str).value !== '') {
            var newLbClone = lbclone.clone();
            $(newLbClone).find('ypxh').text(mini.get(str).value);
            $(newLbClone).find('qckcZgsl').text(this.getInputValue($curTr.find('td:eq(1) input')));
            $(newLbClone).find('qckcDcsl').text(this.getInputValue($curTr.find('td:eq(2) input')));
            $(newLbClone).find('qckcZgje').text(this.getInputValue($curTr.find('td:eq(3) input')));
            $(newLbClone).find('qckcDcje').text(0);
            $(newLbClone).find('bqrkZgsl').text(this.getInputValue($curTr.find('td:eq(5) input')));
            $(newLbClone).find('bqrkDcsl').text(this.getInputValue($curTr.find('td:eq(6) input')));
            $(newLbClone).find('bqrkZgje').text(this.getInputValue($curTr.find('td:eq(7) input')));
            $(newLbClone).find('bqrkDcje').text(0);
            $(newLbClone).find('bqckYsbfsl').text(this.getInputValue($curTr.find('td:eq(9) input')));
            $(newLbClone).find('bqckYsbfje').text(this.getInputValue($curTr.find('td:eq(10) input')));
            $(newLbClone).find('bqckFysbfZysl').text(this.getInputValue($curTr.find('td:eq(11) input')));
            $(newLbClone).find('bqckFysbfDcsl').text(this.getInputValue($curTr.find('td:eq(12) input')));
            $(newLbClone).find('bqckFysbfZyje').text(this.getInputValue($curTr.find('td:eq(13) input')));
            $(newLbClone).find('bqckFysbfDcje').text(0);
            $(newLbClone).find('qmkcZgsl').text(this.getInputValue($curTr.find('td:eq(15) input')));
            $(newLbClone).find('qmkcDcsl').text(this.getInputValue($curTr.find('td:eq(16) input')));
            $(newLbClone).find('qmkcZgje').text(this.getInputValue($curTr.find('td:eq(17) input')));
            $(newLbClone).find('qmkcDcje').text(0);
            $(newLbClone).find('ewbhxh').text(i + 1);
            $grid.append(newLbClone);
        }
    }
    return $xml;
};
//框架初始化
$(function () {
    servyouReport.init();
});
