/**
 * Created by ywy on 2017/6/29.
 */
var ybnsr006 = {
    initHd: function(){
        var inputs = $("#table_006 tbody tr").find("td:eq(3) input");
        for(var i = 1; i < 9; i++){
            inputs.eq(i-1).val(servyouReport.wsxxMap['YBNSRFB3QCYE'+i]).blur();
        }
    },
    setFromCheckDataConfig_006: function(_this){
        _this.fromCheckDataMap={
             '7_2' : '002_8_16',
             '8_2' : '002_11_16',
            '11_2' : '002_17_16',
            '12_2' : '002_20_16',
            '13_2' : '002_27_16',
            '14_2' : '002_29_16'
        }
    }
};
servyouReport.autoAddAllId = true;
servyouReport.customInitFromHd = function(){
    ybnsr006.initHd();
};
servyouReport.setFromCheckDataConfig = function () {
    ybnsr006.setFromCheckDataConfig_006(this);
};
servyouReport.afterInit = function () {
    /*if(parent.ybnsr.isFromSbhy){
        var data087 = parent.yearReport.sb_data['087'].checkData;
        if(data087 && !$.isEmptyObject(data087)){
            ybnsrService.setDataFromSbhy(data087['006']);
        }
    }*/
    var data087 = parent.yearReport.sb_data['087'];
    if(parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
        ybnsrService.setDataFromDataMap(data087['checkData']['006']);
    }
};
servyouReport.setDataIntoCheckData = function(){
    var obj = {
        '7_2' : $("#006_7_2").val(),
        '8_2' : $("#006_8_2").val(),
        '9_2' : $("#006_9_2").val(),
        '10_2': $("#006_10_2").val(),
        '11_2': $("#006_11_2").val(),
        '12_2': $("#006_12_2").val(),
        '13_2': $("#006_13_2").val(),
        '14_2': $("#006_14_2").val(),
        '7_5' : $("#006_7_5").val(),
        '8_5' : $("#006_8_5").val(),
        '11_5': $("#006_11_5").val(),
        '12_5': $("#006_12_5").val(),
        '13_5': $("#006_13_5").val(),
        '14_5': $("#006_14_5").val(),
        '7_6' : $("#006_7_6").val(),
        '8_6' : $("#006_8_6").val(),
        '9_6' : $("#006_9_6").val(),
        '10_6': $("#006_10_6").val(),
        '11_6': $("#006_11_6").val(),
        '12_6': $("#006_12_6").val(),
        '13_6': $("#006_13_6").val(),
        '14_6': $("#006_14_6").val()
    };
    return obj;
};
servyouReport.changeXml_006 = function(){
    var $trs = $('#table_006 tbody tr');
    var $xml = this.getJ3Xml('006');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    var $sbsjxxGrid7 = $xml.find('ysfwkcxmmxGrid');
    var lbClone = $sbsjxxGrid7.find('ysfwkcxmmxGridlbVO:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for(var i = 1; i < 9; i++){
        var $curTr_2 = $trs.eq(i+2);
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewbhxh').text(i);
        $(newLbClone).find('hmc').text($curTr_2.find('td:eq(0)').text());
        $(newLbClone).find('qcye').text(this.getInputValue($curTr_2.find('td:eq(3) input')));
        $(newLbClone).find('qmye').text(this.getInputValue($curTr_2.find('td:eq(7) input')));
        $(newLbClone).find('msxse').text(this.getInputValue($curTr_2.find('td:eq(2) input')));
        $(newLbClone).find('bqykcje').text(this.getInputValue($curTr_2.find('td:eq(5) input')));
        $(newLbClone).find('bqsjkcje').text(this.getInputValue($curTr_2.find('td:eq(6) input')));
        $(newLbClone).find('bqfse').text(this.getInputValue($curTr_2.find('td:eq(4) input')));
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.customResumeFromXml_006 =function () {
    var _this = this;
    var $trs = $('#table_006 tbody tr');
    $(this.j3CorrectXml).find('zzssyyybnsr03_ysfwkcxmmx ysfwkcxmmxGrid ysfwkcxmmxGridlbVO').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        var trIndex = ewbhxh + 2;
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('qcye').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(7)').children(), $(this).find('qmye').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(2)').children(), $(this).find('msxse').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(5)').children(), $(this).find('bqykcje').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('bqsjkcje').text());
        _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('bqfse').text());
    })
};
$(function(){
    servyouReport.init();
});

/**
 * Created by chenjunj on 2018/8/29 10:44.
 */
servyouReport.afterInit = function () {
    var data087 = parent.yearReport.sb_data['087'];
    if(parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
        ybnsrService.setDataFromDataMap(data087['checkData']['006']);
    }
    //河北特色：只有有差额征税资格的企业才允许填写附表一的第12列和附表三，否则相应单元格只读
    if(this.wsxxMap['CEZSBZ'] === 'N'){
        $('#table_006 input').val('0.00').attr('disabled','disabled').blur();
    }
};
