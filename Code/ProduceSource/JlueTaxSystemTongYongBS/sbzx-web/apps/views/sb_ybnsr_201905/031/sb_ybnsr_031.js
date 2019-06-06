/**
 * Created by ywy on 2017/6/29.
 */
var ybnsr031 = {
  initHd: function () {
    if (servyouReport.wsxxMap['ZGLXDM'] === "543" && servyouReport.wsxxMap['YBNSRZFJGBZ'] === "1") {
      var $tr = $("#table_031 tr:eq(8)");
      $tr.find("td:eq(4) input").removeAttr("disabled");
      $tr.find("td:eq(8) input").removeAttr("disabled");
      $tr.find("td:eq(3) input").val(servyouReport.wsxxMap['FB4FZJGYJQCYE']).blur();
    }
    $('#031_8_3').val(servyouReport.wsxxMap['FB4JZEQCYE']).blur();
    $('#031_10_3').val(servyouReport.wsxxMap['FB4JZFWYJQCYE']).blur();
    $('#031_11_3').val(servyouReport.wsxxMap['FB4XSBDCYJQCYE']).blur();
    $('#031_12_3').val(servyouReport.wsxxMap['FB4CZBDCYJQCYE']).blur();
    $('#031_8_4').val(servyouReport.wsxxMap['FB4JZEBQFSE']).blur();
    /*2019-05 新增行取数*/
    $('#031_16_3').val(servyouReport.wsxxMap['FB4JJDKXMYBXMQCYE']).blur();
    $('#031_17_3').val(servyouReport.wsxxMap['FB4JJDKXMJZJTQCYE']).blur();
    if (servyouReport.wsxxMap['JJDJSFZZ'] === 'Y' || servyouReport.wsxxMap['YQWRDYBNSRBZ'] === 'Y') {
      $('#031_16_4,#031_17_4,#031_16_6,#031_17_6').attr('disabled', 'disabled');
    }
  },
  bindZcTip: function () {
    $('#table_031').on('change', '#031_16_4,#031_17_4', function () {
      var _this = this;
      if(servyouReport.wsxxMap['JJDJBZ'] === 'N' && $(this).attr('disabled') !== 'disabled'){
        servyouReport.isInitDone && mini.showMessageBox({
          width: 500,
          height: 200,
          message: '如果符合加计抵减政策条件，请先提交《适用加计抵减政策的声明》。',
          buttons: ['填写申明', '关闭'],
          callback: function (action) {
            if(action === '填写申明'){
              window.open('/hgzx-web/index.html?id=30010218&code=30010218#/zhxxbg/zgxxbg/syjjdjzcdsm');
            }
            $(_this).val('0').blur();
          }
        })
        /*var msgId = mini.showMessageBox({
          width: 800,
          height: 300,
          // showCloseButton: false,
          message: '<div>' +
            '<div class="txt-indent-2">按照政策规定，自2019年4月1日至2021年12月31日，对生产、生活性服务业纳税人，可以适用加计抵减政策。生产、生活性服务业纳税人，是指提供邮政服务、电信服务、现代服务、生活服务（以下称四项服务）取得的销售额占全部销售额的比重超过50%的纳税人。四项服务的具体范围按照《销售服务、无形资产、不动产注释》（财税〔2016〕36号印发）执行。如果您符合上述政策规定，可以通过填写《适用加计抵减政策的声明》，来确认适用加计抵减政策。</div>' +
            '<div class="btn-group">' +
            '<a class="btn btn-blue" href="/hgzx-web/a.html" target="_blank">填写声明</a>' +
            '<a class="btn btn-blue" id="closeZcTip" class="ml20">关闭</a>' +
            // '<label for="dontShowAgain">不再提示</label><input type="checkbox" id="dontShowAgain">' +
            '</div>' +
            '</div>',
          callback: function () {
            $(_this).val('0').blur();
          }
        });
        $('#closeZcTip').click(function () {
          /!*if($('#dontShowAgain').is(':checked')){
            Api.getIfSuccess('/sbzx-web/api/sb/setYbnsrZcbztxbz', {})
          }*!/
          $(_this).val('0').blur();
          mini.hideMessageBox(msgId);
        });*/
      }
    })
  },
  controlBqsjdje: function () {
    $('#table_031').on('change.afterCalculate', '#031_16_8,#031_17_8', function () {
      var $bqsjdje = $(this).parent().next().find('input');
      var colIndex = $(this).attr('id') === '031_16_8' ? '6' : '9';
      var zb_11 = Number(parent.yearReport.sb_data['001'].checkData['21_'+colIndex] || 0);
      var zb_18 = Number(parent.yearReport.sb_data['001'].checkData['28_'+colIndex] || 0);
      var curVal = Number($(this).val());
      var result = '0.00';
      if(curVal < 0){
        result = '0.00';
      }else if(curVal >= 0 && Number((curVal - zb_11 + zb_18).toFixed(2)) >= 0){
        result = (zb_11 - zb_18).toFixed(2);
      }else if(curVal >= 0 && Number((curVal - zb_11 + zb_18).toFixed(2)) < 0){
        result = curVal;
      }
      if(curVal < 0 ){
        $bqsjdje.attr('disabled', 'disabled');
      }else{
        $bqsjdje.removeAttr('disabled');
      }
      $bqsjdje.val(result).blur();
    });
  }
};
servyouReport.autoAddAllId = true;
servyouReport.customInitFromHd = function () {
  ybnsr031.initHd(this.hd);
};
servyouReport.customEvent = function () {
  ybnsr031.bindZcTip();
  ybnsr031.controlBqsjdje();
};
servyouReport.afterInit = function () {
  var data087 = parent.yearReport.sb_data['087'];
  if (parent.ybnsr.needInnerSbhy && data087 && !$.isEmptyObject(mini.decode(data087.checkData))) {
    ybnsrService.setDataFromDataMap(data087['checkData']['031']);
  }
  $('#031_16_8,#031_17_8').change();
};
servyouReport.setDataIntoCheckData = function () {
  var obj = {
    '8_6': $('#031_8_6').val(),
    '8_8': $('#031_8_8').val(),
    '9_8': $('#031_9_8').val(),
    '10_8': $('#031_10_8').val(),
    '11_8': $('#031_11_8').val(),
    '12_8': $('#031_12_8').val(),
    '16_8': $('#031_16_8').val(),
    '17_8': $('#031_17_8').val(),
    '16_9': $('#031_16_9').val(),
    '17_9': $('#031_17_9').val()
  };
  return obj;
};
servyouReport.changeXml_031 = function () {
  var $trs = $('#table_031 tr');
  var $xml = this.getJ3Xml('031');
  $xml.find('nsrsbh').text(this.nsrsbh);
  $xml.find('nsrmc').text(this.nsrmc);
  $xml.find('skssqq').text(this.sssqq);
  $xml.find('skssqz').text(this.sssqz);
  $xml.find('bqjxsemxbGrid bqjxsemxbGridlbVO').each(function (i) {
    var $curTr = $trs.eq(i<5?i+8:i+11);
    $(this).find('qcye').text($curTr.find('td:eq(3) input').val());
    $(this).find('bqfse').text($curTr.find('td:eq(4) input').val());
    $(this).find('qmye').text($curTr.find('td:eq(10) input').val());
    if(i<5){
      $(this).find('bqydjse').text($curTr.find('td:eq(6) input').val());
      $(this).find('bqsjdjse').text($curTr.find('td:eq(8) input').val());
    }else{
      $(this).find('bqzce').text($curTr.find('td:eq(6) input').val());
      $(this).find('bqkjjdkjxse').text($curTr.find('td:eq(8) input').val());
      $(this).find('bqsjjjdkjxse').text($curTr.find('td:eq(9) input').val());
    }
  });
  return $xml;
};
servyouReport.customResumeFromXml_031 = function () {
  var _this = this;
  var $trs = $('#table_031 tr');
  $(this.j3CorrectXml).find('zzssyyybnsr04_bqjxsemxb bqjxsemxbGrid bqjxsemxbGridlbVO').each(function () {
    var ewbhxh = Number($(this).find('ewbhxh').text());
    var trIndex;
    if(ewbhxh < 6){
      trIndex = ewbhxh + 7;
      _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('bqydjse').text());
      _this.setTargetVal($trs.eq(trIndex).find('td:eq(8)').children(), $(this).find('bqsjdjse').text());
    }else{
      trIndex = ewbhxh + 10;
      _this.setTargetVal($trs.eq(trIndex).find('td:eq(6)').children(), $(this).find('bqzce').text());
      _this.setTargetVal($trs.eq(trIndex).find('td:eq(9)').children(), $(this).find('bqsjjjdkjxse').text());
    }
    _this.setTargetVal($trs.eq(trIndex).find('td:eq(3)').children(), $(this).find('qcye').text());
    _this.setTargetVal($trs.eq(trIndex).find('td:eq(4)').children(), $(this).find('bqfse').text());
    _this.setTargetVal($trs.eq(trIndex).find('td:eq(10)').children(), $(this).find('qmye').text());
  })
};
$(function () {
  servyouReport.init();
});

/**
 * Created by chenjunj on 2018/8/30 14:14.
 */
ybnsr031.bindConfirm = function(){
    $('#table_031').on('blur', '#031_8_8', function () {
        var curVal = $(this).val();
        if(Number(curVal)>480){
            mini.alert('根据“国家发展和改革委员会关于降低增值税税控系统产品及维护服务价格等有关问题的通知”您填写的“本期实际抵减税额”【'+curVal+'】，已超过上限【480.00】，请再次核实！');
        }
    });
};
servyouReport.customEvent = function () {
    ybnsr031.bindZcTip();
    ybnsr031.controlBqsjdje();
    ybnsr031.bindConfirm();
};
