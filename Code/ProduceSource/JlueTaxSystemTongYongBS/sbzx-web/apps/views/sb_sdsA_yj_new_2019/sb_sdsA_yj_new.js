/**
 * Created by chenjunj on 2017/9/26 10:00.
 */
/**
 * 企税A业务对象（命名空间）
 * */
var qysdsyjbA = {
    fzjgRowCount: 0,
    SBQYLX: "",//申报企业类型
    YJFS: "",//预缴方式1：据实预缴；2：按上期实际预缴税额预缴；3：按照税务机关核定预缴
    TSNSR: '',//特殊纳税人0/1
    fzjgsdsfpb: null,//分支机构所得税分配表
    fb3Rows1: [2,7,8,14,16,21,22,23,26], // 附表三根据主表第9行控制是否允许录入数据的行次
    fb3Rows2: [3,4,5,6,9,10,11,12,13,15,17,18,19,20,24,25,27], // 附表三根据主表第11行控制是否允许录入数据的行次
    customInitLocalData: function (_this) {
        this.SBQYLX = _this.wsxxMap["SBQYLX"];
        this.YJFS = _this.wsxxMap["YJFS"];
        this.TSNSR = _this.wsxxMap['TSNSR'];
        this.fzjgsdsfpb = _this.hd.fzjgsdsfpb;
    },
    /**
     * 自定义初始化
     * */
    customInit: function (_this) {
        _this.tables['001'] && this.customInit_001(_this);
        _this.tables['002'] && this.customInit_002(_this);
        _this.tables['007'] && this.customInit_007(_this);
    },
    customInit_001: function (_this) {
        var extraCal001 = [];	//001表公式
        var $trs = $('#table_001 tbody tr');
        mini.get('yjfs').setValue(this.YJFS);
        mini.get('qylx').setValue(this.SBQYLX);
        $('#005_31_2').attr('setToTable_Tr_Td','001_0_3');
        //YJFS为1时
        if (this.SBQYLX !== '2' && this.YJFS === '1'){
            for (var i=4; i<9; i++){
                $trs.eq(i).find('td:eq(5)').addClass('enable').find('input').removeAttr('disabled');
            }
            //第6,7行
            $('#004_42_2').attr('setToTable_Tr_Td','001_13_5');
            $('#003_8_6').attr('setToTable_Tr_Td','001_14_5');
            //第8行
            extraCal001.push('F16 = round(if(F11+F12-F13-F14-F15<=0,0,if(F11+F12-F13-F14-F15<{wsxxs.wsxx[code=MBNDKS].value},F11+F12-F13-F14-F15,{wsxxs.wsxx[code=MBNDKS].value})),2)')
            //第9行
            extraCal001.push('F17 = round(F11+F12-F13-F14-F15-F16,2)');
            //14行
          /**
           * 2018-12-27 modified by chenjunj
           *  1）当核定WDJAQYYJZE+核定SQTDYWYJZSDSELJ>0时
               第14行“减：特定业务预缴（征）所得税额  ”取核定WDJAQYYJZE+核定SQTDYWYJZSDSELJ，只读。
               2）当核定WDJAQYYJZE+核定SQTDYWYJZSDSELJ=0时
               第14行“减：特定业务预缴（征）所得税额  ”取0，只读。
           * */
            // $('#001_21_5').removeAttr('disabled').parent().addClass('enable');
            var WDJAQYYJZE = Number(_this.wsxxMap['WDJAQYYJZE']);
            var SQTDYWYJZSDSELJ = Number(_this.wsxxMap['SQTDYWYJZSDSELJ']);
            $('#001_21_5').val(WDJAQYYJZE + SQTDYWYJZSDSELJ>0?WDJAQYYJZE + SQTDYWYJZSDSELJ: 0).change().blur();
        } else if (this.SBQYLX !== '2' && this.YJFS === '2'){
            $('#001_16_5').attr('servyou_type','nonnegative').removeAttr('disabled').val(_this.wsxxMap['SNDYNSSDE']).blur().parent().addClass('enable');
        } else if (this.SBQYLX !== '2' && this.YJFS === '3'){
            $('#001_22_5').removeAttr('disabled').val(_this.wsxxMap['BJYJSDSE']).blur().parent().addClass('enable');
        }
        if (this.SBQYLX !== '2' && (this.YJFS === '1' || this.YJFS === '2')){
            //11行，12行
            if (this.TSNSR === '3'){
                extraCal001.push('F19 = round(F17*F18*0.5,2)');
                extraCal001.push('F20 = round(D1*0.5,2)');
            } else {
                extraCal001.push('F19 = round(F17*F18,2)');
                extraCal001.push('F20 = round(D1,2)');
            }
            //15行
            if (this.TSNSR !== '2'){
                extraCal001.push('F23 = IF(F19-F20-F21-F22>0,F19-F20-F21-F22,0)');
            } else {
                // extraCal001.push('F23 = round((F19-F20)*{wsxxs.wsxx[code=HJBLJD].value}-F21-F22,2)');
                extraCal001.push('F23 = if((F19-F20)*{wsxxs.wsxx[code=HJBLJD].value}-F21-F22>0,(F19-F20)*{wsxxs.wsxx[code=HJBLJD].value}-F21-F22,0)');
            }
        }
        if (this.SBQYLX === '1'){
            //17,18,19行
            $('.zjgyjbl').val((Number(_this.wsxxMap['ZJGYJBL']) || 0)*100).blur();
            $('.czyjbl').val((Number(_this.wsxxMap['ZYCZYJBL']) || 0)*100).blur();
            $('.fzjgyjbl').val((Number(_this.wsxxMap['FZJGYJBL']) || 0)*100).blur();
            $('.ztbmyjbl').val((Number(_this.wsxxMap['SCJYBMBL']) || 0)*100).blur();
            extraCal001.push('F26 = round(F23*(C26/100),2)');
            extraCal001.push('F27 = round(F23*(C27/100),2)');
            if (_this.wsxxMap['KDSANDKXQFLAG'] !== '2'){
                $('.zjgyjbl').removeAttr('disabled').parent().addClass('enable');
                $('.czyjbl').removeAttr('disabled').parent().addClass('enable');
                $('.fzjgyjbl').removeAttr('disabled').parent().addClass('enable');
            }
            $('#001_27_5').removeAttr('disabled').parent().addClass('enable');
        } else if (this.SBQYLX === '2'){
            //20,21行
            var hasDjxh = false;
            var fzjgs = (_this.hd.fzjgsdsfpb && _this.hd.fzjgsdsfpb.fzjgqks && _this.hd.fzjgsdsfpb.fzjgqks.fzjgqk && _this.hd.fzjgsdsfpb.fzjgqks.fzjgqk.length > 0) ?_this.hd.fzjgsdsfpb.fzjgqks.fzjgqk : [];
            $.each(fzjgs,function (i,fzjg) {
                if (fzjg.fzjgdjxh === _this.djxh){
                    $('#001_28_5').val(fzjg.fpbl).blur();
                    $('#001_29_5').val(fzjg.fpsdse).blur();
                    hasDjxh = true;
                    return;
                }
            });
            if (!hasDjxh){
                $('#001_28_5').removeAttr('disabled').parent().addClass('enable');
                $('#001_29_5').removeAttr('disabled').parent().addClass('enable');
            }
            mini.get('kjxqy').disable();
            mini.get('kjxqy').setRequired(false);
            $(mini.get('kjxqy').el).parent().removeClass('enable');
            mini.get('gxjs').disable();
            mini.get('gxjs').setRequired(false);
            $(mini.get('gxjs').el).parent().removeClass('enable');
            mini.get('jsdy').disable();
            mini.get('jsdy').setRequired(false);
            $(mini.get('jsdy').el).parent().removeClass('enable');
            // $('#001_33_2').attr('disabled','disabled').val('0').blur().parent().removeClass('enable');
        }
        _this.addFormulas('001', extraCal001);
        /*-----------------------001主表添加历史信息相关公式--结束--------------------------*/
        /*2019新需求*/
        var sqzMonth = Number(_this.sssqz.substr(5,2));
        $('#001_0_4').val(Number(_this.sssqq.substr(5,2))).blur();
        $('#001_0_5').val(sqzMonth).blur();
        if(this.SBQYLX !== '2' && [3,6,9,12].indexOf(sqzMonth) !== -1){
          $('#001_34_2').removeAttr('disabled').val(_this.wsxxMap['QCCYRS']).blur();
          $('#001_34_4').removeAttr('disabled');
          $('#001_35_2').removeAttr('disabled').val(_this.wsxxMap['QCZCZE']).blur();
          $('#001_35_4').removeAttr('disabled');
          mini.get('gjxzhjzhy').enable();
          $('#gjxzhjzhy').parent().addClass('enable');
        }
        qysdsyjbA.hasInitJc=true;
    },
    customInit_002: function (_this) {
        this.initFZJGData_002(_this);
        this.addFormulas_002(_this);
    },
    /**
     * 初始化分支机构数据
     */
    initFZJGData_002: function (_this) {
        var fzjgData = this.getFZJGData(_this);
        $('#hj002').before(fzjgData.html);
        $('#fzjgqkTd').attr('rowspan', fzjgData.count + 3);
        this.fzjgRowCount = fzjgData.count;
    },
    getFZJGData: function (_this) {
        var fzjgData = {
            isFromHd: 'Y',
            data: [],
            curNsrsbh: _this.nsrsbh,
            curNsrmc: _this.nsrmc,
            curDjxh: _this.djxh,
            SBQYLX: this.SBQYLX
        };
        fzjgData.isFromHd = 'Y';
        fzjgData.data = [];
        if (this.fzjgsdsfpb && this.fzjgsdsfpb.fzjgqks && this.fzjgsdsfpb.fzjgqks.fzjgqk && this.fzjgsdsfpb.fzjgqks.fzjgqk.length > 0) {
            fzjgData.data = this.fzjgsdsfpb.fzjgqks.fzjgqk;
        } else {
            fzjgData.data.push({
                "fzjgdjxh": _this.djxh,
                "fzjgnsrsbh": _this.nsrsbh,
                "fzjgmc": _this.nsrmc,
                "yysr": "",
                "zgxc": "",
                "zcze": "",
                "fpbl": "",
                "fpsdse": null
            });
        }
        return {
            html: template('fpb-tmpl', fzjgData),
            count: fzjgData.data.length
        };
    },
    addFormulas_002: function (_this) {
        var extraCal002 = [];
        if (this.fzjgRowCount > 0) {
            for (var i = 10; i < this.fzjgRowCount + 10; i++) {
                if (this.fzjgRowCount > 1 && i === this.fzjgRowCount+9){
                    extraCal002.push("G" + i + " = Round(1-SUM(G10:G" + (i-1) + "),10)");
                } else {
                    extraCal002.push("G"+i+"=Round(if(D"+(this.fzjgRowCount+10)+"=0,0,D"+i+"/D"+(this.fzjgRowCount+10)+"*0.35)+if(E"+(this.fzjgRowCount+10)+"=0,0,E"+i+"/E"+(this.fzjgRowCount+10)+"*0.35)+if(F"+(this.fzjgRowCount+10)+"=0,0,F"+i+"/F"+(this.fzjgRowCount+10)+"*0.3),10)");
                }
                extraCal002.push("H" + i + " = round(G7*G" + i + ",2)");
            }
            extraCal002.push("D" + (this.fzjgRowCount + 10) + " = Round(SUM(D10:D" + (this.fzjgRowCount + 9) + "),2)");
            extraCal002.push("E" + (this.fzjgRowCount + 10) + " = Round(SUM(E10:E" + (this.fzjgRowCount + 9) + "),2)");
            extraCal002.push("F" + (this.fzjgRowCount + 10) + " = Round(SUM(F10:F" + (this.fzjgRowCount + 9) + "),2)");
            extraCal002.push("G" + (this.fzjgRowCount + 10) + " = Round(SUM(G10:G" + (this.fzjgRowCount + 9) + "),10)");
            extraCal002.push("H" + (this.fzjgRowCount + 10) + " = Round(SUM(H10:H" + (this.fzjgRowCount + 9) + "),2)");
            _this.addFormulas('002', extraCal002);
        }
    },
    customInit_007: function (_this) {
        $('#ssnd').text(_this.sssqq.substring(0, 4));
    },
    customInitFromHd: function (_this) {
        _this.tables['001'] && this.customInitFromHd_001(_this);
    },
    customInitFromHd_001: function (_this) {
        this.setValueFromHd_001(_this);
        this.setDefaultXwqy_001(_this);
    },
    // xwqyTipShowed: false,//放弃小微的提示是否已提示
    setValueFromHd_001: function (_this) {
        /*-----------------------001主表从核定中初始化值到页面中--开始-----------------------*/
        if(this.SBQYLX !== '2'){
            $('#001_20_5').val(_this.wsxxMap["BQYJ"]).blur();//本期预缴
        }
        /*-----------------------001主表从核定中初始化值到页面中--结束-----------------------*/
    },
    setDefaultXwqy_001: function () {
      if([3,6,9,12].indexOf(Number(servyouReport.sssqz.substr(5,2))) === -1) {
        mini.get('xwqy').setValue('');
        return ;
      }
      var gjxzhjzhy = mini.get('gjxzhjzhy').getValue();//国家限制或者禁止行业
      var CYRSPJSLJS = Number(servyouReport.wsxxMap['CYRSPJSLJS'] || '0');
      var YSBJDS = Number(servyouReport.wsxxMap['YSBJDS'] || '0');
      var avg_cyrs = (CYRSPJSLJS + (Number($('#001_34_2').val()) + Number($('#001_34_4').val()))/2)/(YSBJDS+1);//平均从业人数
      var avg_zcze = (Number(servyouReport.wsxxMap['ZCZEPJSLJS'] || '0') + (Number($('#001_35_2').val()) + Number($('#001_35_4').val()))/2)/(YSBJDS+1);//平均资产总额(万元)
      if(gjxzhjzhy === 'N' && avg_cyrs <= 300 && avg_zcze <= 5000
        && (((this.YJFS === '1' || this.YJFS === '2') && Number($('#001_16_5').val()) <= Number(servyouReport.wsxxMap['XWJM_MAX_2019'])) ||
          (this.YJFS === '3' && Number($('#001_22_5').val()) + Number(servyouReport.wsxxMap['YJJE']) <= 250000))){
        mini.get('xwqy').setValue('Y');
      }else{
        mini.get('xwqy').setValue('N');
      }
    },
    /**
     * 小微企业切换事件
     * */
    xwqyChanged: function () {
        if (servyouReport.businessType === 'preview') {
            return false;
        }
        qysdsyjbA.afterXwqyChanged(this.value);
    },
    gjxzhjzhyChanged: function(){
      var _this = this;
      if(this.value === 'Y'){
        servyouReport.isInitDone && mini.confirm('选‘是’是指您企业从事国家限制或禁止行业，请确认。', '请确认', function (action) {
          if(action !== 'ok'){
            _this.setValue('N');
          }else{
            qysdsyjbA.setDefaultXwqy_001();
          }
        })
      }else{
        qysdsyjbA.setDefaultXwqy_001();
      }
    },
    afterXwqyChanged: function (xwqyBz) {
        this.doControlYhmx();
        this.control005row1();
    },
    /**
     * 小微企业自动切换
     * */
    bindControlInput001: function (_this) {
        var that = this;
        $('#table_001').on('change.afterCalculate', '#001_16_5', function () {
            that.setDefaultXwqy_001(_this);
            var ynse = Number($(this).val());
            $.each(that.fb3Rows1,function (i,index) {
                if (ynse > 0){
                    $('#005_'+(index+1)+'_2').removeAttr('disabled').parent().addClass('enable');
                } else {
                    $('#005_'+(index+1)+'_2').attr('disabled','disabled').val(0).blur().parent().removeClass('enable');
                }
            });
            that.doControlYhmx();
            that.control005row1();
        });
        $('#table_001').on('change.afterCalculate', '#001_18_5', function () {
            var ynse = Number($(this).val());
            $.each(that.fb3Rows2,function (i,index) {
                if (ynse > 0){
                    $('#005_'+(index+1)+'_2').removeAttr('disabled').parent().addClass('enable');
                } else {
                    $('#005_'+(index+1)+'_2').attr('disabled','disabled').val(0).blur().parent().removeClass('enable');
                }
            });
            that.control005row29();
        });


        $('#table_001').on('blur', '#001_35_2,#001_35_4', function () {
            if(!qysdsyjbA.hasInitJc){
                return;
            }
            mini.alert("请注意,填报单位为“万元”！","若填报正确请忽略该提示");
        });
    },
    bindControlXwqy: function(){
      //季初从业人数,	季末从业人数,季初资产总额（万元）,季末资产总额（万元）改变
      $('#table_001').on('change', '#001_34_2,#001_34_4,#001_35_2,#001_35_4', function () {
        qysdsyjbA.setDefaultXwqy_001();
      });
      //	本期应补（退）所得税额（11-12-13-14）\税务机关确定的本期应纳所得税额  改变
      $('#table_001').on('change.afterCalculate', '#001_22_5', function () {
        qysdsyjbA.setDefaultXwqy_001();
      });
    },
    bindCgblChange: function (_this) {
        $('#table_006').on('change', '#006_9_6', function () {
            var val;
            var curValue = $(this).val();
            var numberReg = /^\d+(\.\d+)?%?$/;
            var errorMsg = $(this).attr('formatErrorMsg');
            if (!curValue) {
                return;
            }
            /*把报告人持股比例 servyou_type='percent' 修改为 seryou_type='string'应为percent总会显示0.00%导致判断失误，*/
            if (numberReg.test(curValue)) {//百分数或者实数
                curValue.indexOf('%') !== -1
                val = curValue.indexOf('%') !== -1 ? Number(curValue.replace('%', '')) / 100 : Number(curValue);
                if (val < 0 || val > 1) {
                    _this.isInitDone && mini.alert(errorMsg);
                    $(this).val('');
                } else {
                    $(this).val((val * 100).toFixed(2) + '%');
                }
            } else {
                //非数字
                _this.isInitDone && mini.alert(errorMsg);
                $(this).val('');
            }
        });
    },
    bindControlInput002: function (_this) {
        $("#table_002").on('blur change.afterCalculate', 'input[name="zbScjybmbl"]', function () {
            var scjybmbl = Number(_this.getInputValue($(this)))*100;
            $('.ztbmyjbl').val(scjybmbl).blur();
        });
    },
    bindControlInput004: function () {
        $('#table_004').on('change','#004_4_2',function () {
            if (Number($(this).val()) > 0){
                $('#004_5_2').removeAttr('disabled').parent().addClass('enable');
                $('#004_6_2').removeAttr('disabled').parent().addClass('enable');
            } else {
                $('#004_5_2').attr('disabled','disabled').val(0).blur().parent().removeClass('enable');
                $('#004_6_2').attr('disabled','disabled').val(0).blur().parent().removeClass('enable');
            }
        })
    },
    bindControlInput005: function () {
        var that = this;
        //第2-28行合计值改变时
        $('#table_005').on('change.afterCalculate','#005_0_2',function () {
            that.doControlYhmx();
            that.control005row1();
            that.control005row29()
        })
    },
    doControlYhmx: function () {
        var hj = Number($('#005_0_2').val());
        var tipsFlag = $('#005_0_3').val();
        var ynse = Number($('#001_16_5').val());
        var xwqy = mini.get('xwqy').getValue();
        //其他优惠行次
        if (xwqy === 'Y' && hj > 0 && tipsFlag === 'N'){
            mini.confirm('您符合小型微利企业所得税优惠政策条件，是否选择享受其他税收优惠政策？','提示',function (action) {
                if (action === 'ok'){
                    $('#005_2_2').val(0).blur();
                }else{
                  $('#table_005 tr:lt(24):gt(2)').find('input').val(0).blur();
                  $('#table_005 tr:lt(30):gt(24)').find('input').val(0).blur();
                }
            });
            $('#005_0_3').val('Y');
        } else if (hj <=0 ){
            $('#005_0_3').val('N');
        }
    },
    bindJzOrMz: function () {
        var that = this;
        $('#table_005').on('change','input[name="jzOrMz"]',function () {
            var checkedVal = $('input[name="jzOrMz"]:checked').val();
            if(checkedVal && checkedVal !== $(this).val()){
                return ;
            }
            if (checkedVal === '1'){
                $('#005_30_1_2').removeAttr('disabled');
                if($('#005_30_1_2').val() === '0.00'){
                    mini.alert('当勾选“□减征”时，须在“减征幅度____%”中录入1至100的数值。');
                }
            } else {
                $('#005_30_1_2').attr('disabled','disabled').val(0).blur();
            }
            that.control005row29()
        });
        $('#table_005').on('blur','#005_30_1_2',function () {
            that.control005row29()
        });
    },
    bindControlInput_007: function () {
        var that = this;
        $('#table_007').on('change', '[name="jscgmc"]', function (e) {
            var $curTr = $(this).parent().parent();
            if (!$(this).val().trim()) {
                that.disableRow_007($curTr);
            } else {
                that.enableRow_007($curTr);
            }
        });
    },
    bindNsrsbhChange_007: function (_this) {
        $('#table_007').on('change', '[name="nsrsbh"]', function (e) {
            if (!_this.validValue($(this))) {
                return;
            }
            if (!_this.isInitDone) {
                return;
            }
            var curNsrsbh = $(this).val().trim();
            $(this).parent().removeClass('report_error');
            var $curTr = $(this).parent().parent();
            if (!curNsrsbh) {
                $curTr.find('td:lt(11):gt(8) input').val('').blur();
            } else {
                var request = {
                    nsrsbh: curNsrsbh
                };
                var data = null;
                ajax.post('/sbzx-web/api/sb/qysds/queryQysdsSbNsrsbh', mini.encode(request), function (response) {
                    if (response.success) {
                        data = response.value;
                    }
                });
                // var data = Api.getData('/sbzx-web/api/sb/qysds/queryQysdsSbNsrsbh', request);
                if (!data) {
                    mini.alert('没有查询到纳税人识别号为[' + curNsrsbh + ']的纳税人信息，请手动填写“企业名称”和“主管税务机关”！', '提示', function (action) {
                        $curTr.find('td:lt(11):gt(8) input').val('').blur();
                    });
                } else {
                    $curTr.find('td:eq(9) input').val(data.nsrmc).blur();
                    $curTr.find('td:eq(10) input').val(data.zgswjgmc).blur();
                }
            }
        });
    },
    control005row1: function () {
        var ynse = Number($('#001_16_5').val());
        mini.get('xwqy').setValue('Y');
        var xwqy = mini.get('xwqy').getValue();
        var hj2to28 = Number($('#005_0_2').val());//剔除23栏
        var XWJM_2019 = Number(servyouReport.wsxxMap['XWJM_2019']);
        var XWJM_MAX_2019 = Number(servyouReport.wsxxMap['XWJM_MAX_2019']);
        if(xwqy === 'Y'){
          if(ynse > 0 && ynse <= XWJM_2019 && hj2to28 <= 0){
            $('#005_2_2').val(ynse*0.2).blur();
          }else if(ynse > XWJM_2019 && ynse <= XWJM_MAX_2019 && hj2to28 <= 0){
            $('#005_2_2').val(ynse*0.15+50000).blur();
          }else{
            $('#005_2_2').val(0).blur();
          }
        }else{
          $('#005_2_2').val(0).blur();
        }
    },
    control005row29 : function () {
        var ynse = Number($('#001_18_5').val());
        var hj1to28 = Number((Number($('#005_0_1').val()) + Number($('#005_2_2').val())).toFixed(2));
        var jzOrMz = $('input[name="jzOrMz"]:checked').val();
        var jzfd = Number($('#005_30_1_2').val())/100;
        if (ynse > hj1to28){
            $('#005_30_2').removeAttr('disabled').parent().addClass('enable');
            if (jzOrMz === '1'){
                $('#005_30_2').val((ynse - hj1to28) * 0.4 * jzfd).blur();
            } else if (jzOrMz === '2'){
                $('#005_30_2').val((ynse - hj1to28) * 0.4).blur();
            } else {
                $('#005_30_2').val(0).blur();
            }
        } else {
            $('#005_30_2').attr('disabled','disabled').val(0).blur().parent().removeClass('enable');
        }
    },
    disableRow_007: function ($row) {
        $row.find('td>input:gt(0),td>select').val('').blur().not('[neverEdit="Y"]').attr('disabled', 'disabled');
        var mini_qdgqsj = mini.get('qdgqsj_' + ($row.index() - 3));
        mini_qdgqsj.disable();
        mini_qdgqsj.setValue('');
    },
    enableRow_007: function ($row) {
        $row.find('td>input:gt(0),td>select').not('[neverEdit="Y"]').removeAttr('disabled');
        var mini_qdgqsj = mini.get('qdgqsj_' + ($row.index() - 3));
        mini_qdgqsj.enable();
    },
    afterInit: function (_this) {
        _this.tables['002'] && this.afterInit_002(_this);
        // _this.tables['003'] && this.afterInit_003(_this);
        _this.tables['004'] && this.afterInit_004(_this);
        _this.tables['005'] && this.afterInit_005(_this);
        _this.tables['001'] && this.afterInit_001(_this);
    },
    afterInit_001: function (_this) {
        _this.calculateAll('001');
        this.setDefaultXwqy_001();
    },
    afterInit_002: function (_this) {
        _this.setIdForAllInputAndSelect('002');
        _this.formatAllData('002');
        _this.calculateAll('002');
    },
    afterInit_004: function (_this) {
        _this.calculateAll('004');
    },
    afterInit_005: function (_this) {
        _this.calculateAll('005');
    },
    checkTable001: function (_this) {
        var form = new mini.Form("sds001");
        //校验表中必填的mini组件
        form.validate('all','hide');
        if (!form.isValid('hide')) {
            var id = form.getErrors()[0].id;
            $('#' + id).parents('td:eq(0)').addClass('report_error');
            mini.get('tabs').activeTab('001');
            return false;
        }
        // if(Number($('#001_15_5').val()) > 0 && Number(_this.sssqz.replace(/-/g,'')) <= 20180531){
        //     mini.alert('您上年度的年度申报未完成的，第8行“减：弥补以前年度亏损”应为0！');
        //     mini.get('tabs').activeTab('001');
        //     $('#001_15_5').parent().addClass('report_error');
        //     return false;
        // }
        // if (this.YJFS === '1' && Number(_this.sssqz.replace(/-/g,'')) > 20180531) {
        if (this.YJFS === '1'){
            /*预缴方式[YJFS=1]为按照实际利润额预缴且所属时期止大于“05-30”，弥补以前年度亏损（第8行，累计金额列）不能大于核定值MBNDKS和“第3行+第4行-第5行-第6行-第7行”的最小值*/
            //第3行+第4行-第5行-第6行-第7行
            var val = Number((Number($('#001_10_5').val()) + Number($('#001_11_5').val()) - Number($('#001_12_5').val()) - Number($('#001_13_5').val()) - Number($('#001_14_5').val())).toFixed(2));
            var MBNDKS = Number(_this.wsxxMap["MBNDKS"]);
            var table001_row_8_lj = Number($('#001_15_5').val());
            if ((val >= 0 && table001_row_8_lj > Math.min(MBNDKS,val)) || (val < 0 && table001_row_8_lj !== 0)) {
                mini.alert('主表第8行弥补以前年度亏损必须小于等于可弥补亏损的核定值【' + MBNDKS + '】和“第3行+第4行-第5行-第6行-第7行”的最小值，请核实主表第8行的值！', '提示');
                mini.get('tabs').activeTab('001');
                $('#001_15_5').parent().addClass('report_error');
                return false;
            }
        }
        if (this.SBQYLX === '1'){
            var v = (Number($('#001_22_5').val())*(Number($('.fzjgyjbl').val())/100)*(Number($('.ztbmyjbl').val())/100)).toFixed(2);
            var diff = Number($('#001_27_5').val())-Number(v);
            if (Math.abs(Number(diff.toFixed(2))) > 0.01){
                mini.alert('主表第19行本年累计金额应等于本表第15行×全部分支机构分摊比例×总机构具有主体生产经营职能部门分摊比例的值【'+v+'】');
                mini.get('tabs').activeTab('001');
                $('#001_27_5').parent().addClass('report_error');
                return false;
            }
        }
        //更正申报时，应补退税额必须大于等于上次申报的值
        if(this.SBQYLX ==='1'){
            var ybtse = Number($('#001_22_5').val());
            if(_this.businessType === 'correct' && ybtse < Number(_this.wsxxMap['YBTSE'])){
                $('#001_22_5').parent().addClass('report_error');
                mini.alert('当前系统不支持更正的税额小于正常申报的税额!');
                return false;
            }
        }else if(this.SBQYLX ==='2'){
            var ybtse = Number($('#001_29_5').val());
            if(_this.businessType === 'correct' && ybtse < Number(_this.wsxxMap['YBTSE'])){
                $('#001_29_5').parent().addClass('report_error');
                mini.alert('当前系统不支持更正的税额小于正常申报的税额!');
                return false;
            }
        }
        return true;
    },
    checkTable002_fpbl_fpse: function (_this) {
        var blhj = Number(_this.getInputValue($('#hj002 td:eq(6) input')));
        if (blhj !== 1) {
            mini.alert('分支机构的分配比率之和要求为100%！', '提示');
            mini.get('tabs').activeTab('002');
            $('#hj002 td:eq(6)').addClass('report_error');
            return false;
        }
        if (this.SBQYLX === '1') {
            var curNsrsbhInputs = $('#table_002 tr:gt(7) input[value="' + _this.nsrsbh + '"]');
            var result = true;
            $.each(curNsrsbhInputs, function () {
                var $curTr = $(this).parent().parent();
                var $curFpbl = $curTr.find('td:eq(6) input');
                var $curFpsdse = $curTr.find('td:eq(7) input');
                var fpbl = Number(_this.getInputValue($curFpbl));//分配表-分配比例
                var fpsdse = Number($curFpsdse.val());//分配表-分配所得税额
                var table001_fpbl = Number(((Number($('.ztbmyjbl').val()) || 0)/100).toFixed(10));//主表-分配比例
                var table001_fpsdse = Number(_this.getInputValue($('#001_27_5')));//主表-分配所得税额
                if (fpbl !== table001_fpbl) {
                    mini.alert('主表第19行“总机构具有主体生产经营职能部门分摊比例”应等于表A202000“分支机构情况”中对应总机构独立生产经营部门行次的“分配比例”列次填报的比例。', '提示');
                    mini.get('tabs').activeTab('002');
                    $curFpbl.parent().addClass('report_error');
                    result = false;
                    return false;
                }
                if (fpsdse !== table001_fpsdse) {
                    mini.alert('主表第19行本年累计金额应等于表A202000“分支机构情况”中对应总机构独立生产经营部门行次的“分配所得税额”列次填报的金额。', '提示');
                    mini.get('tabs').activeTab('002');
                    $curFpsdse.parent().addClass('report_error');
                    result = false;
                    return false;
                }
            });
            if (!result) {
                return false;
            }
        }
        return true;
    },
   /* /!*控制003 表全部大于0*!/
    checkTable003_data: function (_this) {
        var v_3_1 = Number($('#003_6_2').val());
        if (v_3_1 > 0 && v_3_1 < 1000000){
            mini.alert('表A201020第3行1列用于填报100万元以上研发设备，请检查自查原值是否正确。');
            $('#003_6_2').parent().addClass('report_error');

            mini.get('tabs').activeTab('003');
            return false;
        }
        return true;
    },*/
    checkTable005_jmse: function () {
        var flag = true;
        if (Number($('#001_16_5').val())>0){
            var val10 = (Number($('#001_16_5').val()) * 0.1).toFixed(2);
            var val15 = (Number($('#001_16_5').val()) * 0.15).toFixed(2);
            var zbRow9Pc10 = [2,7,8,21,22,23,26];
            var zbRow9Pc15 = [14,16];
            $.each(zbRow9Pc10,function (i,index) {
                var $input = $('#005_'+(index+1)+'_2');
                if (Number($input.val()) > Number(val10)){
                    mini.alert('您的表A201030第'+index+'行累计金额不能大于A200000表第9行×0.1的金额'+val10+',请修改。');
                    $input.parent().addClass('report_error');
                    mini.get('tabs').activeTab('005');
                    flag = false;
                    return false
                }
            });
            $.each(zbRow9Pc15,function (i,index) {
                var $input = $('#005_'+(index+1)+'_2');
                if (Number($input.val()) > Number(val15)){
                    mini.alert('您的表A201030第'+index+'行累计金额不能大于A200000表第9行×0.15的金额'+val15+',请修改。');
                    $input.parent().addClass('report_error');
                    mini.get('tabs').activeTab('005');
                    flag = false;
                    return false
                }
            });
        }
        if (!flag){
            return false;
        }
        var ynse = Number($('#001_18_5').val());
        var hj1to28 = Number((Number($('#005_0_1').val()) + Number($('#005_2_2').val())).toFixed(2));
        var jzOrMz = $('input[name="jzOrMz"]:checked').val();
        var jzfd = Number((Number($('#005_30_1_2').val())/100).toFixed(4));
        if (Number($('#005_30_2').val()) > 0 && !jzOrMz){
            mini.alert('A201030第29行“本年累计金额”录入大于0的金额时，必须勾选减征或免征！');
            $('#005_30_2').parent().addClass('report_error');
            mini.get('tabs').activeTab('005');
            return false;
        }
        if (ynse > hj1to28){
            if (jzOrMz === '2' && Number($('#005_30_2').val()) > Number(((ynse - hj1to28)*0.4).toFixed(2))){
                mini.alert('A201030第29行选择部分免征时，本年累计金额应小于等于（A200000第11行-本表第1+2+…+28行）×40%的值，且大于等于0。');
                $('#005_30_2').parent().addClass('report_error');
                mini.get('tabs').activeTab('005');
                return false;
            } else if (jzOrMz === '1' && Number($('#005_30_2').val()) > Number(((ynse - hj1to28)*0.4*jzfd).toFixed(2))){
                mini.alert('A201030第29行选择部分减征时，本年累计金额应小于等于（A200000第11行-本表第1+2+…+28行）×40%×减征幅度的值，且大于等于0。');
                $('#005_30_2').parent().addClass('report_error');
                mini.get('tabs').activeTab('005');
                return false;
            }
        }
        return true;
    },
    checkTable006_required: function () {
        //二、被投资外国企业信息 必填关系
        var $requiredInput = $("#table_006 tbody input[requiredSameTime='Y']");
        var emptyInputArray = [];
        for (var i = 0, len = $requiredInput.length; i < len; i++) {
            var obj = $requiredInput[i];
            var value = $(obj).val().trim();
            if (value === '') {
                emptyInputArray.push(obj);
            }
        }
        if (emptyInputArray.length > 0 && emptyInputArray.length !== 5) {
            for (var i = 0, len = emptyInputArray.length; i < len; i++) {
                $(emptyInputArray[i]).parent().addClass('report_error');
            }
            mini.get('tabs').activeTab('006');
            mini.alert('《居民企业参股外国企业信息报告表》必填项不能为空！', '提示');
            return false;
        }
        return true;
    },

    checkTable007_dysd: function () {
        var $inputs = $('#table_007 tbody tr').find('td:eq(7) input');
        var errorObjArray = [];
        for (var i = 0, len = $inputs.length; i < len; i++) {
            var obj = $($inputs[i]);
            if (parseFloat(obj.val()) < 0) {
                errorObjArray.push(obj);
            }
        }
        for (var i = 0, len = errorObjArray.length; i < len; i++) {
            var obj = $(errorObjArray[i]);
            obj.parent().addClass('report_error');
        }
        if (errorObjArray.length > 0) {
            mini.alert('递延所得(公允价值-计税基础)不能小于0！', '提示');
            mini.get('tabs').activeTab('007');
            return false;
        }
        return true;
    },
    //校验某一行中已经填写的列不能为空
    checkTable007_required: function () {
        var jscgmc = $('#table_007 tbody tr').find('td:eq(1) input'),
            result = true;
        for (var i = 0, len = jscgmc.length; i < len; i++) {
            var count = i + 3;
            var $jscgtrgqysdsRow = $('#table_007 tbody tr').eq(count);
            var obj = $(jscgmc[i]);
            if (obj.val() != '') {
                var checkArr = [
                    {
                        value: $jscgtrgqysdsRow.find('td:eq(2) select').val(),
                        tdIndex: 2
                    },
                    {
                        value: $jscgtrgqysdsRow.find('td:eq(3) input').val(),
                        tdIndex: 3
                    },
                    {
                        value: mini.get('qdgqsj_' + i).getText(),
                        tdIndex: 6
                    },
                    {
                        value: $jscgtrgqysdsRow.find('td:eq(8) input').val(),
                        tdIndex: 8
                    },
                    {
                        value: $jscgtrgqysdsRow.find('td:eq(9) input').val(),
                        tdIndex: 9
                    },
                    {
                        value: $jscgtrgqysdsRow.find('td:eq(10) input').val(),
                        tdIndex: 10
                    },
                    {
                        value: $jscgtrgqysdsRow.find('td:eq(11) select').val(),
                        tdIndex: 11
                    }
                ];
                $.each(checkArr, function () {
                    if (!this.value) {
                        result = false;
                        $jscgtrgqysdsRow.find('td:eq(' + this.tdIndex + ')').addClass('report_error');
                    }
                });
                if (!result) {
                    mini.alert('第' + (i + 1) + '行中的所有列必须填写完整！', '提示');
                    mini.get('tabs').activeTab('007');
                    break;
                }
            }
        }
        return result;
    },
    confirmXw: function(_this){
      if(_this.sssqz.substr(0,4) === '2019' && _this.sbzlDm === '10441' && _this.wsxxMap['ZFJGLB'] !== '4'){
        if(['04', '07', '10'].indexOf(_this.sssqz.substr(5,2)) !== -1 && _this.wsxxMap['SQXWBZAYSB'] === 'Y'){
          mini.alert('按照您上期申报的信息，您已经符合小型微利企业享受条件，请调整为按季度申报企业所得税，详情向您主管税务机关了解。','请确认', function (action) {
            mini.alert('请及时联系主管税务机关变更申报期限。');
          });
        }else if(_this.wsxxMap['SQYSBBZAYSB'] === 'N' || (['01', '04', '07', '10'].indexOf(_this.sssqz.substr(5,2)) !== -1 && _this.wsxxMap['SQZSFSDM'] === '402')
        || (['01', '04', '07', '10'].indexOf(_this.sssqz.substr(5,2)) !== -1 && _this.wsxxMap['SQSBQYLX'] === '2' && _this.wsxxMap['SBQYLX'] === '1')){
          if(_this.wsxxMap['YJFS'] === '3'){
            if(Number((Number(_this.wsxxMap['YJJE'])+Number($('#001_22_5').val())).toFixed(2)) <= 250000){
              mini.showMessageBox({
                width: 500,
                heigh: 400,
                title: '请选择',
                message: '根据相关规定，自2019年1月1日至2021年12月31日，从事国家非限制和禁止行业，且年度应纳税所得额不超过300万元，从业人数不超过300人、资产总额不超过5000万元的企业，年应纳税所得额不超过100万元、100万元到300万元的部分，分别减按25%、50%计入应纳税所得额，按20%的税率征收企业所得税。根据您填报的信息，初步判断您很可能符合小型微利企业条件，为减轻您的办税负担，建议您联系主管税务机关调整纳税期限为按季度预缴申报，感谢您的配合！',
                buttons: ['终止申报', '继续申报'],
                callback: function (action) {
                  if(action === '继续申报'){
                    mini.showMessageBox({
                      width: 500,
                      heigh: 400,
                      title: '请选择',
                      message: '根据您填报的信息，很可能符合小型微利企业条件。如您认为本年度内有可能符合小型微利企业条件，建议您终止本次申报，尽快调整为按季度预缴申报，符合条件时可充分享受小型微利企业所得税优惠政策。如您确认不符合小型微利企业条件，不享受小型微利企业所得税优惠政策，请继续完成申报。',
                      buttons: ['终止申报', '继续申报'],
                      callback: function (action) {
                        if(action === '继续申报'){
                          qysdsyjbA.confirmNeedNotPay(_this)
                        }
                      }
                    });
                  }
                }
              });
            }else{
              mini.showMessageBox({
                width: 500,
                heigh: 400,
                title: '请选择',
                message: '感谢您的配合，请您关注小型微利企业所得税普惠性优惠政策，如您认为本年度内有可能符合小型微利企业条件，建议您终止本次申报，尽快调整为按季度预缴申报，条件符合时可充分享受小型微利企业所得税优惠政策。如您确认不符合小型微利企业条件，不享受小型微利企业所得税优惠政策，请继续完成申报。',
                buttons: ['终止申报', '继续申报'],
                callback: function (action) {
                  if(action === '继续申报'){
                    qysdsyjbA.confirmNeedNotPay(_this)
                  }
                }
              });
            }
          }else if(['1', '2'].indexOf(_this.wsxxMap['YJFS']) !== -1){
            if(Number($('#001_16_5').val()) <= 500000){
              mini.showMessageBox({
                width: 500,
                heigh: 400,
                title: '请选择',
                message: '根据相关规定，自2019年1月1日至2021年12月31日，从事国家非限制和禁止行业，且年度应纳税所得额不超过300万元，从业人数不超过300人、资产总额不超过5000万元的企业，年应纳税所得额不超过100万元、100万元到300万元的部分，分别减按25%、50%计入应纳税所得额，按20%的税率征收企业所得税。根据您填报的信息，初步判断您很可能符合小型微利企业条件，为减轻您的办税负担，建议您联系主管税务机关调整纳税期限为按季度预缴申报，感谢您的配合！',
                buttons: ['终止申报', '继续申报'],
                callback: function (action) {
                  if(action === '继续申报'){
                    mini.showMessageBox({
                      width: 500,
                      heigh: 400,
                      title: '请选择',
                      message: '根据您填报的信息，很可能符合小型微利企业条件。如您认为本年度内有可能符合小型微利企业条件，建议您终止本次申报，尽快调整为按季度预缴申报，符合条件时可充分享受小型微利企业所得税优惠政策。如您确认不符合小型微利企业条件，不享受小型微利企业所得税优惠政策，请继续完成申报。',
                      buttons: ['终止申报', '继续申报'],
                      callback: function (action) {
                        if(action === '继续申报'){
                          qysdsyjbA.confirmNeedNotPay(_this)
                        }
                      }
                    });
                  }
                }
              });
            }else{
              mini.showMessageBox({
                width: 500,
                heigh: 400,
                title: '请选择',
                message: '感谢您的配合，请您关注小型微利企业所得税普惠性优惠政策，如您认为本年度内有可能符合小型微利企业条件，建议您终止本次申报，尽快调整为按季度预缴申报，条件符合时可充分享受小型微利企业所得税优惠政策。如您确认不符合小型微利企业条件，不享受小型微利企业所得税优惠政策，请继续完成申报。',
                buttons: ['终止申报', '继续申报'],
                callback: function (action) {
                  if(action === '继续申报'){
                    qysdsyjbA.confirmNeedNotPay(_this)
                  }
                }
              });
            }
          }
        }else{
          qysdsyjbA.confirmNeedNotPay(_this);
        }
      }else {
        qysdsyjbA.confirmNeedNotPay(_this);
      }
    },
    confirmNeedNotPay: function (_this) {
        if (this.TSNSR === '1') {
            mini.alert('当前纳税人为只申报不缴纳企业，无需缴税！', '提示', function (action) {
                if (action === 'ok') {
                    _this.confirmBeforeSend();
                }
            });
        } else {
            _this.confirmBeforeSend();
        }
    },
    /*confirmGiveUpXwqy: function (_this) {
      this.confirmNeedNotPay(_this);
    },*/
    customEvent: function (_this) {
        _this.tables['001'] && (this.bindControlInput001(_this) || this.bindControlXwqy());//001
        _this.tables['002'] && this.bindControlInput002(_this);
        _this.tables['004'] && this.bindControlInput004();//004
        _this.tables['005'] && (this.bindControlInput005() || this.bindJzOrMz());
        _this.tables['006'] && this.bindCgblChange(_this);
        _this.tables['007'] && (this.bindControlInput_007()
            || this.bindNsrsbhChange_007(_this));
    }
};
servyouReport.showSideBar = false;
servyouReport.autoAddAllId = true;
/**
 * 初始化本地通用数据
 * */
servyouReport.customInitLocalData = function () {
    qysdsyjbA.customInitLocalData(this);
};
servyouReport.customInit = function () {
    qysdsyjbA.customInit(this);
};
servyouReport.customInitFromHd = function () {
    qysdsyjbA.customInitFromHd(this);
};
servyouReport.customEvent = function () {
    qysdsyjbA.customEvent(this);
};
servyouReport.afterInit = function () {
    qysdsyjbA.afterInit(this);
};
servyouReport.checkTable_001 = function () {
    return qysdsyjbA.checkTable001(this);
};

servyouReport.checkTable_002 = function () {
    return qysdsyjbA.checkTable002_fpbl_fpse(this);
};
/*servyouReport.checkTable_003 = function () {
    return qysdsyjbA.checkTable003_data(this);
};*/
servyouReport.checkTable_005 = function () {
    return qysdsyjbA.checkTable005_jmse();
};
servyouReport.checkTable_006 = function () {
    return qysdsyjbA.checkTable006_required();
};
servyouReport.checkTable_007 = function () {
    return qysdsyjbA.checkTable007_dysd() && qysdsyjbA.checkTable007_required();
};
servyouReport.customConfirmBeforeSend = function () {
    qysdsyjbA.confirmXw(this);
    // qysdsyjbA.confirmNeedNotPay(this);
};
servyouReport.changeXml_001 = function () {
    var $trs = $('#table_001 tbody tr');
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('sbrq1,tbrq1').text(this.tbrq);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbsxDm1').text('11');
    $xml.find('yjfs').text(mini.get('yjfs').getValue());
    $xml.find('sbqylx').text(mini.get('qylx').getValue());
    var $sbbxxForm = $xml.find('sbbxxForm');
    for (var i = 0; i<15; i++){
        $sbbxxForm.children().eq(i).text(this.getInputValue($trs.eq(i+4).find('td:eq(5) input')));
    }
    $sbbxxForm.find('zjgybtsdseBq').text(this.getInputValue($('#001_24_5')));
    $sbbxxForm.find('zjgftbl').text((Number($('.zjgyjbl').val())/100).toFixed(4));
    $sbbxxForm.find('zjgyftsdseBq').text(this.getInputValue($('#001_25_5')));
    $sbbxxForm.find('zjgczjzftbl').text((Number($('.czyjbl').val())/100).toFixed(4));
    $sbbxxForm.find('czjzfpsdseBq').text(this.getInputValue($('#001_26_5')));
    $sbbxxForm.find('fzjgftbl').text((Number($('.fzjgyjbl').val())/100).toFixed(4));
    $sbbxxForm.find('dlscjybmftbl').text((Number($('.ztbmyjbl').val())/100).toFixed(10));
    $sbbxxForm.find('zjgdlscjybmyftsdseBq').text(this.getInputValue($('#001_27_5')));
    $sbbxxForm.find('fpbl').text(this.getInputValue($('#001_28_5')));
    $sbbxxForm.find('fzjgfpsdseBq').text(this.getInputValue($('#001_29_5')));
    $sbbxxForm.find('sfsyxxwlqy').text(mini.get("xwqy").getValue());
    $sbbxxForm.find('sfkjxzxqy').text(mini.get("kjxqy").getValue());
    $sbbxxForm.find('sfgxjsqy').text(mini.get("gxjs").getValue());
    $sbbxxForm.find('sffsjsrgdynssx').text(mini.get("jsdy").getValue());
    $sbbxxForm.find('qccyrs').text($('#001_34_2').val());
    $sbbxxForm.find('qmcyrs').text($('#001_34_4').val());
    $sbbxxForm.find('qczcze').text($('#001_35_2').val());
    $sbbxxForm.find('qmzcze').text($('#001_35_4').val());
    $sbbxxForm.find('gjxzhjzhy').text(mini.get('gjxzhjzhy').getValue());
    $xml.find('fddbr').text(this.nsrData.fddbrxm);
    $xml.find('zgswjg').text(this.nsrData.zgswjDm);
    return $xml;
};
servyouReport.changeXml_002 = function () {
    var $xml = this.getJ3Xml('002');
    $xml.find('zjgmc').text(this.nsrmc);
    $xml.find('zjgnsrsbh').text(this.nsrsbh);
    $xml.find('ynsdse').text(this.getInputValue($('#002_6_0')));
    $xml.find('zjgftsdse').text(this.getInputValue($('#002_6_2')));
    $xml.find('zjgczjzfpsdse').text(this.getInputValue($('#002_6_4')));
    $xml.find('fzjgftdsdse').text(this.getInputValue($('#002_6_6')));
    var hjIndex = $('#hj002').index();
    var $fzjgTrs = $('#table_002 tbody tr:lt(' + hjIndex + '):gt(3)');
    var $fzjgGrid = $xml.find('fzjgxxGrid');
    var $lbClone = $fzjgGrid.find('fzjgxxGridlb:eq(0)').clone();
    $fzjgGrid.empty();
    var _this = this;
    $.each($fzjgTrs, function () {
        var $curFzjgnsrsbhInput = $(this).find('td:eq(1) input');
        var curFzjgnsrsbh = $curFzjgnsrsbhInput.val();
        var curfzjgmc = $(this).find('td:eq(2) input').val();
        if (curFzjgnsrsbh && curfzjgmc) {
            var $newLbClone = $lbClone.clone();
            $newLbClone.find('fzjgdjxh').text($curFzjgnsrsbhInput.attr('FZJGDJXH'));
            $newLbClone.find('fzjglxlb').text($curFzjgnsrsbhInput.attr('FZJGLXLB'));
            $newLbClone.find('fzjgnsrsbh').text(curFzjgnsrsbh);
            $newLbClone.find('fzjgmc').text(curfzjgmc);
            $newLbClone.find('fzjgsrze').text(_this.getInputValue($(this).find('td:eq(3) input')));
            $newLbClone.find('fzjggzze').text(_this.getInputValue($(this).find('td:eq(4) input')));
            $newLbClone.find('fzjgzcze').text(_this.getInputValue($(this).find('td:eq(5) input')));
            $newLbClone.find('fpbl').text(_this.getInputValue($(this).find('td:eq(6) input')));
            $newLbClone.find('fpse').text(_this.getInputValue($(this).find('td:eq(7) input')));
            $fzjgGrid.append($newLbClone);
        }
    });
    // TODO   新表样上新增的几个节点不知道怎么组织
    return $xml;
};
servyouReport.changeXml_003 = function () {
    var $trs = $('#table_003 tbody tr:gt(2)');
    var $xml = this.getJ3Xml('003');
    var $gdzcjszjkcMxbGrid = $xml.find('gdzcjszjkcMxbGrid');
    var $gdzcjszjkcmxbGridlb = $gdzcjszjkcMxbGrid.find('gdzcjszjkcmxbGridlb');
    for (var i = 0; i < 5; i++) {
        $gdzcjszjkcmxbGridlb.eq(i).find('zcyz').text(this.getInputValue($trs.eq(i).find('td:eq(2) input')));
        $gdzcjszjkcmxbGridlb.eq(i).find('zzzjjeLj').text(this.getInputValue($trs.eq(i).find('td:eq(3) input')));
        $gdzcjszjkcmxbGridlb.eq(i).find('azssybgdjsdzjjeLj').text(this.getInputValue($trs.eq(i).find('td:eq(4) input')));
        $gdzcjszjkcmxbGridlb.eq(i).find('xsjszjyhjsdzjjeLj').text(this.getInputValue($trs.eq(i).find('td:eq(5) input')));
        $gdzcjszjkcmxbGridlb.eq(i).find('nstjjeLj').text(this.getInputValue($trs.eq(i).find('td:eq(6) input')));
        $gdzcjszjkcmxbGridlb.eq(i).find('xsjszjyhjeLj').text(this.getInputValue($trs.eq(i).find('td:eq(7) input')));
    }
    return $xml;
};
servyouReport.changeXml_004 = function () {
    var $trs = $('#table_004 tbody tr:gt(0)');
    var $xml = this.getJ3Xml('004');
    var $children = $xml.find('msjjsrjjkcjmyhmxbForm').children();
    var that = this;
    $.each($trs, function (i,curTr) {
        $children.eq(i).text(that.getInputValue($(curTr).find('td:eq(2) input')));
    });
    return $xml;
};
servyouReport.changeXml_005 = function () {
    var $trs = $('#table_005 tbody tr:gt(0)');
    var $xml = this.getJ3Xml('005');
    var $children = $xml.find('jmsdsyhMxbForm').children();
    for (var i = 0; i < 28; i++){
        $children.eq(i).text(this.getInputValue($trs.eq(i).find('td:eq(2) input')));
    }
    $xml.find('jzmzlx').text($('input[name="jzOrMz"]:checked').val());
    $xml.find('jzfd').text((Number($("#005_30_1_2").val())/100).toFixed(4));
    $xml.find('mzzzdfqydffxbfLj').text(this.getInputValue($('#005_30_2')));
    $xml.find('hjLj').text(this.getInputValue($('#005_31_2')));
    return $xml;
};
servyouReport.changeXml_006 = function () {
    var $trs = $('#table_006 tbody tr'),
        $xml = this.getJ3Xml('006'),
        $cgwgqyxxbgbVO = $xml.find("cgwgqyxxbgbVO"),
        $curTr5 = $trs.eq(5),
        $curTr6 = $trs.eq(6),
        $curTr7 = $trs.eq(7);
    var $wgqyxxForm = $cgwgqyxxbgbVO.find('wgqyxxForm').clone();
    var $gdxxGrid = $cgwgqyxxbgbVO.find('gdxxGrid').clone();
    var $dsxxGrid = $cgwgqyxxbgbVO.find('dsxxGrid').clone();
    var $sggfxxGrid = $cgwgqyxxbgbVO.find('sggfxxGrid').clone();
    var $czgfxxGrid = $cgwgqyxxbgbVO.find('czgfxxGrid').clone();
    $cgwgqyxxbgbVO.empty();
    $wgqyxxForm.find('wgqyzwmc').text(this.getInputValue($curTr5.find('td:eq(1) input')));
    $wgqyxxForm.find('wgqyzwcld').text(this.getInputValue($curTr5.find('td:eq(6) input')));
    $wgqyxxForm.find('wgqywwmc').text(this.getInputValue($curTr6.find('td:eq(1) input')));
    $wgqyxxForm.find('wgqywwcld').text(this.getInputValue($curTr6.find('td:eq(6) input')));
    $wgqyxxForm.find('szgnssbh').text(this.getInputValue($curTr7.find('td:eq(1) input')));
    $wgqyxxForm.find('zyywlx').text(this.getInputValue($curTr7.find('td:eq(4) input')));

    $wgqyxxForm.find('bgrcgbl').text((this.getInputValue($curTr7.find('td:eq(6) input')).replace('%', '') / 100).toFixed(4));
    if ($($wgqyxxForm).text().trim() !== "0.0000") {
        $cgwgqyxxbgbVO.append($wgqyxxForm);
    }
    var lbClone1 = $gdxxGrid.find('gdxxGridlb:eq(0)').clone();
    $gdxxGrid.empty();
    for (var i = 0; i < 4; i++) {
        var $curTr_10 = $trs.eq(i + 10),
            newLbClone1 = lbClone1.clone(),
            count1 = i + 1;
        $(newLbClone1).find('cggdzwmc').text(this.getInputValue($curTr_10.find('td:eq(0) input')));
        $(newLbClone1).find('cggdwwmc').text(this.getInputValue($curTr_10.find('td:eq(1) input')));
        $(newLbClone1).find('jzdhcldzw').text(this.getInputValue($curTr_10.find('td:eq(2) input')));
        $(newLbClone1).find('jzdhcldww').text(this.getInputValue($curTr_10.find('td:eq(3) input')));
        $(newLbClone1).find('cglx').text(mini.get("gdqk_cglx_" + count1).getValue());
        var cgbl = this.getInputValue($curTr_10.find('td:eq(5) input'));
        $(newLbClone1).find('cgbl').text(cgbl);
        $(newLbClone1).find('qyfeqsrq').text(mini.get("qsrq_" + count1).getText());
        if ($(newLbClone1).children().text() === '0.0000') {
            continue;
        }
        $(newLbClone1).find('mxxh').text(i + 1);
        $gdxxGrid.append(newLbClone1);
    }
    $cgwgqyxxbgbVO.append($gdxxGrid);
    var lbClone2 = $dsxxGrid.find('dsxxGridlb:eq(0)').clone();
    $dsxxGrid.empty();
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
        if ($(newLbClone2).children().text() === '') {
            continue;
        }
        $(newLbClone2).find('mxxh').text(i + 1);
        $dsxxGrid.append(newLbClone2);
    }
    $cgwgqyxxbgbVO.append($dsxxGrid);
    var lbClone3 = $sggfxxGrid.find('sggfxxGridlb:eq(0)').clone();
    $sggfxxGrid.empty();
    for (var i = 0; i < 3; i++) {
        var $curTr_22 = $trs.eq(i + 22),
            newLbClone3 = lbClone3.clone(),
            count3 = i + 1;
        $(newLbClone3).find('bsggflx').text(mini.get("sggfqk_cglx_" + count3).getValue());
        $(newLbClone3).find('jyrq').text(mini.get("jyrq_" + count3).getText());
        $(newLbClone3).find('sgfs').text(this.getInputValue($curTr_22.find('td:eq(4) input')));
        var sgqbgrzwgqycgfe = this.getInputValue($curTr_22.find('td:eq(5) input'));
        $(newLbClone3).find('sgqbgrzwgqycgfe').text(sgqbgrzwgqycgfe);
        var sghbgrzwgqycgfe = this.getInputValue($curTr_22.find('td:eq(6) input'));
        $(newLbClone3).find('sghbgrzwgqycgfe').text(sghbgrzwgqycgfe);
        if ($(newLbClone3).children().text() === '0.000.00') {
            continue;
        }
        $(newLbClone3).find('mxxh').text(i + 1);
        $sggfxxGrid.append(newLbClone3);
    }
    $cgwgqyxxbgbVO.append($sggfxxGrid);
    var lbClone4 = $czgfxxGrid.find('czgfxxGridlb:eq(0)').clone();
    $czgfxxGrid.empty();
    for (var i = 0; i < 3; i++) {
        var $curTr_27 = $trs.eq(i + 27),
            newLbClone4 = lbClone4.clone(),
            count4 = i + 1;
        $(newLbClone4).find('bczgflx').text(mini.get("czgfqk_cglx_" + count4).getValue());
        $(newLbClone4).find('czrq').text(mini.get("czrq_" + count4).getText());
        $(newLbClone4).find('czfs').text(this.getInputValue($curTr_27.find('td:eq(4) input')));
        var czqbgrzwgqycgfe = this.getInputValue($curTr_27.find('td:eq(5) input'));
        $(newLbClone4).find('czqbgrzwgqycgfe').text(czqbgrzwgqycgfe);
        var czhbgrzwgqycgfe = this.getInputValue($curTr_27.find('td:eq(6) input'));
        $(newLbClone4).find('czhbgrzwgqycgfe').text(czhbgrzwgqycgfe);
        if ($(newLbClone4).children().text() === '0.000.00') {
            continue;
        }
        $(newLbClone4).find('mxxh').text(i + 1);
        $czgfxxGrid.append(newLbClone4);
    }
    $cgwgqyxxbgbVO.append($czgfxxGrid);
    return $xml;
};
servyouReport.changeXml_007 = function () {
    var $trs = $('#table_007 tbody tr');
    var $xml = this.getJ3Xml('007');
    var $dynsbabGrid = $xml.find('dynsbabGrid');
    var lbClone = $dynsbabGrid.find('dynsbabGridlb:eq(0)').clone();
    $dynsbabGrid.empty();
    for (var i = 0; i < 6; i++) {
        var $curTr = $trs.eq(i + 3);
        var newLbClone = lbClone.clone();
        var jscgmc = this.getInputValue($curTr.find('td:eq(1) input'));
        var jscglx = $curTr.find('td:eq(2) select').val();
        var jscgbh = this.getInputValue($curTr.find('td:eq(3) input'));
        var gyjz = this.getInputValue($curTr.find('td:eq(4) input'));
        var jsjc = this.getInputValue($curTr.find('td:eq(5) input'));
        var dysd = this.getInputValue($curTr.find('td:eq(7) input'));
        var btzqymc = this.getInputValue($curTr.find('td:eq(9) input'));
        var btznsrsbh = this.getInputValue($curTr.find('td:eq(8) input'));
        var swjgmc = this.getInputValue($curTr.find('td:eq(10) input'));
        var sfwglqy = $curTr.find('td:eq(11) select').val();
        var gqqdsj = mini.get("qdgqsj_" + i).getText();
        if (!jscgmc || !jscglx || !gqqdsj || !btznsrsbh || !btzqymc || !swjgmc || !sfwglqy) {
            continue
        }
        $(newLbClone).find('jscgmc').text(jscgmc);
        $(newLbClone).find('jscglx').text(jscglx);
        $(newLbClone).find('jscgbh').text(jscgbh);
        $(newLbClone).find('gyjz').text(gyjz);
        $(newLbClone).find('jsjc').text(jsjc);
        $(newLbClone).find('gqqdsj').text(gqqdsj);
        $(newLbClone).find('dysd').text(dysd);
        $(newLbClone).find('btzqymc').text(btzqymc);
        $(newLbClone).find('btznsrsbh').text(btznsrsbh);
        $(newLbClone).find('swjgmc').text(swjgmc);
        $(newLbClone).find('sfwglqy').text(sfwglqy);
        $dynsbabGrid.append(newLbClone);
    }
    return $xml;
};
servyouReport.customResumeFromXml_001 = function () {
    var $form = $(this.j3CorrectXml).find('A200000Ywbd sbbxxForm');
    this.setTargetVal($('#001_8_5'), $form.find('yysrLj').text());
    this.setTargetVal($('#001_9_5'), $form.find('yycbLj').text());
    this.setTargetVal($('#001_10_5'), $form.find('lrzeLj').text());
    this.setTargetVal($('#001_11_5'), $form.find('tdywjsdynssdeLj').text());
    this.setTargetVal($('#001_12_5'), $form.find('bzssrLj').text());
    this.setTargetVal($('#001_13_5'), $form.find('mssrLj').text());
    this.setTargetVal($('#001_14_5'), $form.find('gdzcjszjkctjeLj').text());
    this.setTargetVal($('#001_15_5'), $form.find('mbyqndksLj').text());
    this.setTargetVal($('#001_16_5'), $form.find('sjlreLj').text());
    this.setTargetVal($('#001_17_5'), $form.find('slLj').text());
    this.setTargetVal($('#001_18_5'), $form.find('ynsdseLj').text());
    this.setTargetVal($('#001_19_5'), $form.find('jmsdseLj').text());
    this.setTargetVal($('#001_20_5'), $form.find('sjyyjsdseLj').text());
    this.setTargetVal($('#001_21_5'), $form.find('tdywyjzsdseLj').text());
    this.setTargetVal($('.zjgyjbl'), $form.find('zjgftbl').text());
    this.setTargetVal($('.czyjbl'), $form.find('zjgczjzftbl').text());
    this.setTargetVal($('.fzjgyjbl'), $form.find('fzjgftbl').text());
    this.setTargetVal($('.ztbmyjbl'), $form.find('dlscjybmftbl').text());
    this.setTargetVal($('#001_27_5'), $form.find('zjgdlscjybmyftsdseBq').text());
    this.setTargetVal($('#001_28_5'), $form.find('fpbl').text());
    this.setTargetVal($('#001_29_5'), $form.find('fzjgfpsdseBq').text());
    this.setTargetVal($('#xwqy'), $form.find('sfsyxxwlqy').text());
    this.setTargetVal($('#kjxqy'), $form.find('sfkjxzxqy').text());
    this.setTargetVal($('#gxjs'), $form.find('sfgxjsqy').text());
    this.setTargetVal($('#jsdy'), $form.find('sffsjsrgdynssx').text());
    $('#001_34_2').val($form.find('qccyrs').text()).attr('value', $form.find('qccyrs').text());
    $('#001_34_4').val($form.find('qmcyrs').text()).attr('value', $form.find('qmcyrs').text());
    $('#001_35_2').val($form.find('qczcze').text()).attr('value', $form.find('qczcze').text());
    $('#001_35_4').val($form.find('qmzcze').text()).attr('value', $form.find('qmzcze').text());
    this.setTargetVal($('#gjxzhjzhy'), $form.find('gjxzhjzhy').text());
};
servyouReport.customResumeFromXml_002 = function () {
    var $zjgFrom = $(this.j3CorrectXml).find('A202000Ywbd  zjgxxForm');
    this.setTargetVal($('#002_6_0'), $zjgFrom.find('ynsdse').text());
    this.setTargetVal($('#002_6_2'), $zjgFrom.find('zjgftsdse').text());
    this.setTargetVal($('#002_6_4'), $zjgFrom.find('zjgczjzfpsdse').text());
    this.setTargetVal($('#002_6_6'), $zjgFrom.find('fzjgftdsdse').text());
};
servyouReport.resumeXmlAfterInit_002 = function () {
    var $fzjgs = $(this.j3CorrectXml).find('A202000Ywbd fzjgxxGrid fzjgxxGridlb');
    var _this = this;
    var pageRowCount = $('#hj002').index() - 4;
    $fzjgs.each(function (i) {
        if (i + 1 > pageRowCount) {
            return false;
        }
        var trIndex = i + 9;
        $('#002_' + trIndex + '_1').attr('FZJGDJXH', $(this).find('fzjgdjxh').text())
            .attr('FZJGLXLB', $fzjgs.find('fzjglxlb').text());
        _this.setTargetVal($('#002_' + trIndex + '_1'), $(this).find('fzjgnsrsbh').text());
        _this.setTargetVal($('#002_' + trIndex + '_2'), $(this).find('fzjgmc').text());
        _this.setTargetVal($('#002_' + trIndex + '_3'), $(this).find('fzjgsrze').text());
        _this.setTargetVal($('#002_' + trIndex + '_4'), $(this).find('fzjggzze').text());
        _this.setTargetVal($('#002_' + trIndex + '_5'), $(this).find('fzjgzcze').text());
        _this.setTargetVal($('#002_' + trIndex + '_6'), $(this).find('fpbl').text());
        _this.setTargetVal($('#002_' + trIndex + '_7'), $(this).find('fpsdse').text());
    });
};
servyouReport.customResumeFromXml_003 = function () {
    var _this = this;
    var mxs = $(this.j3CorrectXml).find('A201020Ywbd gdzcjszjkcMxbGrid gdzcjszjkcmxbGridlb');
    $.each(mxs, function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        var trIndex = ewbhxh + 3;
        _this.setTargetVal($('#003_' + trIndex + '_2'), $(this).find('zcyz').text());
        _this.setTargetVal($('#003_' + trIndex + '_3'), $(this).find('zzzjjeLj').text());
        _this.setTargetVal($('#003_' + trIndex + '_4'), $(this).find('azssybgdjsdzjjeLj').text());
        _this.setTargetVal($('#003_' + trIndex + '_5'), $(this).find('xsjszjyhjsdzjjeLj').text());
        _this.setTargetVal($('#003_' + trIndex + '_6'), $(this).find('nstjjeLj').text());
        _this.setTargetVal($('#003_' + trIndex + '_7'), $(this).find('xsjszjyhjeLj').text());
    });
};
servyouReport.customResumeFromXml_004 = function () {
    var $qysdsyjdyjnssbFbOne = $(this.j3CorrectXml).find('A201010Ywbd msjjsrjjkcjmyhmxbForm');
    this.setTargetVal($('#004_2_2'), $qysdsyjdyjnssbFbOne.find('mssrLj').text());
    this.setTargetVal($('#004_3_2'), $qysdsyjdyjnssbFbOne.find('gzlxsrLj').text());
    this.setTargetVal($('#004_4_2'), $qysdsyjdyjnssbFbOne.find('fhtjdjmqyzjdgxhldqyxsyLj').text());
    this.setTargetVal($('#004_5_2'), $qysdsyjdyjnssbFbOne.find('hgttzgxhlLj').text());
    this.setTargetVal($('#004_6_2'), $qysdsyjdyjnssbFbOne.find('sgttzgxhlLj').text());
    this.setTargetVal($('#004_7_2'), $qysdsyjdyjnssbFbOne.find('fhtjdfylzzdsrLj').text());
    this.setTargetVal($('#004_8_2'), $qysdsyjdyjnssbFbOne.find('fhtjdfylzzkjqyfhqLj').text());
    this.setTargetVal($('#004_9_2'), $qysdsyjdyjnssbFbOne.find('fhtjdfylzzgjdxkjyqLj').text());
    this.setTargetVal($('#004_10_2'), $qysdsyjdyjnssbFbOne.find('zgqjfzjzjjqddsrLj').text());
    this.setTargetVal($('#004_11_2'), $qysdsyjdyjnssbFbOne.find('zqtzjjtzzqddmssrLj').text());
    this.setTargetVal($('#004_12_2'), $qysdsyjdyjnssbFbOne.find('dfzfzqlxsrLj').text());
    this.setTargetVal($('#004_13_2'), $qysdsyjdyjnssbFbOne.find('zgbxbzjjyxzrgsqdbxbzjjsrLj').text());
    this.setTargetVal($('#004_14_2'), $qysdsyjdyjnssbFbOne.find('zgawhqdbjdazwsfsrLj').text());
    this.setTargetVal($('#004_15_2'), $qysdsyjdyjnssbFbOne.find('zgcawhqdbjdazwfqzfsrLj').text());
    this.setTargetVal($('#004_16_2'), $qysdsyjdyjnssbFbOne.find('qtmssrLj').text());
    this.setTargetVal($('#004_17_2'), $qysdsyjdyjnssbFbOne.find('jjsrLj').text());
    this.setTargetVal($('#004_18_2'), $qysdsyjdyjnssbFbOne.find('zhlyzysccpqddsrLj').text());
    this.setTargetVal($('#004_19_2'), $qysdsyjdyjnssbFbOne.find('jrbxdjgqddsllxbfsrLj').text());
    this.setTargetVal($('#004_20_2'), $qysdsyjdyjnssbFbOne.find('jrjgqdsndklxsrLj').text());
    this.setTargetVal($('#004_21_2'), $qysdsyjdyjnssbFbOne.find('bxjgqdsnbfsrLj').text());
    this.setTargetVal($('#004_22_2'), $qysdsyjdyjnssbFbOne.find('xedkgsqdnhxedklxsrLj').text());
    this.setTargetVal($('#004_23_2'), $qysdsyjdyjnssbFbOne.find('qddzgtljszqlxsrLj').text());
    this.setTargetVal($('#004_24_2'), $qysdsyjdyjnssbFbOne.find('qtjjsrLj').text());
    this.setTargetVal($('#004_30_2'), $qysdsyjdyjnssbFbOne.find('sdjmLj').text());
    this.setTargetVal($('#004_31_2'), $qysdsyjdyjnssbFbOne.find('nlmyxmLj').text());
    this.setTargetVal($('#004_32_2'), $qysdsyjdyjnssbFbOne.find('msxmLj').text());
    this.setTargetVal($('#004_33_2'), $qysdsyjdyjnssbFbOne.find('jbzsxmLj').text());
    this.setTargetVal($('#004_34_2'), $qysdsyjdyjnssbFbOne.find('gjzdfcdggjcssxmLj').text());
    this.setTargetVal($('#004_35_2'), $qysdsyjdyjnssbFbOne.find('fhtjdhjbhjnjsxmLj').text());
    this.setTargetVal($('#004_36_2'), $qysdsyjdyjnssbFbOne.find('fhtjdjszrxmLj').text());
    this.setTargetVal($('#004_37_2'), $qysdsyjdyjnssbFbOne.find('ssqjfzjzxmLj').text());
    this.setTargetVal($('#004_38_2'), $qysdsyjdyjnssbFbOne.find('jnfwgssshtnyglxmLj').text());
    this.setTargetVal($('#004_39_2'), $qysdsyjdyjnssbFbOne.find('xkxyybsnmjcdlscxmLj').text());
    this.setTargetVal($('#004_40_2'), $qysdsyjdyjnssbFbOne.find('xkxylswnmhtzecgybwyyxmLj').text());
    this.setTargetVal($('#004_41_2'), $qysdsyjdyjnssbFbOne.find('qtsdjmLj').text());
    this.setTargetVal($('#004_42_2'), $qysdsyjdyjnssbFbOne.find('hjLj').text());
};
servyouReport.customResumeFromXml_005 = function () {
    var $jmsdsemxbFbThree = $(this.j3CorrectXml).find('A201030Ywbd jmsdsyhMxbForm');
    this.setTargetVal($('#005_2_2'), $jmsdsemxbFbThree.find('fhtjdxxwlqyjmqysdsLj').text());
    this.setTargetVal($('#005_3_2'), $jmsdsemxbFbThree.find('zdfcgxjsqyjmLj').text());
    this.setTargetVal($('#005_4_2'), $jmsdsemxbFbThree.find('jjtqpdxqxslgxjsqyjmLj').text());
    this.setTargetVal($('#005_5_2'), $jmsdsemxbFbThree.find('szdqncxysLj').text());
    this.setTargetVal($('#005_6_2'), $jmsdsemxbFbThree.find('dmqyzzkfLj').text());
    this.setTargetVal($('#005_7_2'), $jmsdsemxbFbThree.find('bwmjcdlLj').text());
    this.setTargetVal($('#005_8_2'), $jmsdsemxbFbThree.find('ewwmjcdljaswslLj').text());
    this.setTargetVal($('#005_9_2'), $jmsdsemxbFbThree.find('bsyyjcdljaswslLj').text());
    this.setTargetVal($('#005_10_2'), $jmsdsemxbFbThree.find('ewwmjcdlLj').text());
    this.setTargetVal($('#005_11_2'), $jmsdsemxbFbThree.find('bsyyjcdlLj').text());
    this.setTargetVal($('#005_12_2'), $jmsdsemxbFbThree.find('xkxyybsnmdjcdlscqyjmLj').text());
    this.setTargetVal($('#005_13_2'), $jmsdsemxbFbThree.find('xkxylwnmhtzecgywlyLj').text());
    this.setTargetVal($('#005_14_2'), $jmsdsemxbFbThree.find('xbjcdlsjqyLj').text());
    this.setTargetVal($('#005_15_2'), $jmsdsemxbFbThree.find('gjghbjjcdljasslLj').text());
    this.setTargetVal($('#005_16_2'), $jmsdsemxbFbThree.find('fhtjrjqyLj').text());
    this.setTargetVal($('#005_17_2'), $jmsdsemxbFbThree.find('gjghbjnzdrjqyjasslLj').text());
    this.setTargetVal($('#005_18_2'), $jmsdsemxbFbThree.find('fhtjjcdlfzcsqyLj').text());
    this.setTargetVal($('#005_19_2'), $jmsdsemxbFbThree.find('fhtjjcdlzyclscqyLj').text());
    this.setTargetVal($('#005_20_2'), $jmsdsemxbFbThree.find('jyxwhsydwLj').text());
    this.setTargetVal($('#005_21_2'), $jmsdsemxbFbThree.find('fhtjsczpscryypLj').text());
    this.setTargetVal($('#005_22_2'), $jmsdsemxbFbThree.find('jsxjxfwqyjaswslLj').text());
    this.setTargetVal($('#005_23_2'), $jmsdsemxbFbThree.find('fwmycxfzsdjsxjxfwqyLj').text());
    this.setTargetVal($('#005_24_2'), $jmsdsemxbFbThree.find('xbdqgllqyjaswLj').text());
    this.setTargetVal($('#005_25_2'), $jmsdsemxbFbThree.find('xjkndqxbqyLj').text());
    this.setTargetVal($('#005_26_2'), $jmsdsemxbFbThree.find('xjkstsjjkfqxbqyLj').text());
    this.setTargetVal($('#005_27_2'), $jmsdsemxbFbThree.find('hqptqhgllqyLj').text());
    this.setTargetVal($('#005_28_2'), $jmsdsemxbFbThree.find('bjdazwsszwhLj').text());
    this.setTargetVal($('#005_29_2'), $jmsdsemxbFbThree.find('qt').text());
    this.setTargetVal($('#005_30_2'), $jmsdsemxbFbThree.find('mzzzdfqydffxbfLj').text());
    this.setTargetVal($('#005_31_2'), $jmsdsemxbFbThree.find('hjLj').text());
    this.setTargetVal($('#005_30_1_2'), Number($jmsdsemxbFbThree.find('jzfd').text())*100);
    this.setTargetVal($('#jzOrMz_2'), $jmsdsemxbFbThree.find('jzmzlx').text() === '2' ? 'checked' : '');
    this.setTargetVal($('#jzOrMz_1'), $jmsdsemxbFbThree.find('jzmzlx').text() === '1' ? 'checked' : '');
    this.setTargetVal($('#005_30_1_2'), Number($jmsdsemxbFbThree.find('jzfd').text())*100);
};
servyouReport.customResumeFromXml_006 = function () {
    var _this = this;
    var $cgwgqyxxbgbVO = $(this.j3CorrectXml).find('cgwgqyxxbgbYwbd cgwgqyxxbgbVO');
    var $wgqyxxForm = $cgwgqyxxbgbVO.find('wgqyxxForm');
    var $gdxxGrid = $cgwgqyxxbgbVO.find('gdxxGrid');
    var $dsxxGrid = $cgwgqyxxbgbVO.find('dsxxGrid');
    var $sggfxxGrid = $cgwgqyxxbgbVO.find('sggfxxGrid');
    var $czgfxxGrid = $cgwgqyxxbgbVO.find('czgfxxGrid');
    //二、被投资外国企业信息
    this.setTargetVal($('#006_7_1'), $wgqyxxForm.find('wgqyzwmc').text());
    this.setTargetVal($('#006_7_6'), $wgqyxxForm.find('wgqyzwcld').text());
    this.setTargetVal($('#006_8_1'), $wgqyxxForm.find('wgqywwmc').text());
    this.setTargetVal($('#006_8_6'), $wgqyxxForm.find('wgqywwcld').text());
    this.setTargetVal($('#006_9_1'), $wgqyxxForm.find('szgnssbh').text());
    this.setTargetVal($('#006_9_4'), $wgqyxxForm.find('zyywlx').text());
    this.setTargetVal($('#006_9_6'), $wgqyxxForm.find('bgrcgbl').text());
    //有外国企业10%以上股份或有表决权股份的其他股东情况
    $gdxxGrid.find('gdxxGridlb').each(function (i) {
        if (i > 3) {
            return false;
        }
        var trIndex = i + 12;
        _this.setTargetVal($('#006_' + trIndex + '_0'), $(this).find('cggdzwmc').text());
        _this.setTargetVal($('#006_' + trIndex + '_1'), $(this).find('cggdwwmc').text());
        _this.setTargetVal($('#006_' + trIndex + '_2'), $(this).find('jzdhcldzw').text());
        _this.setTargetVal($('#006_' + trIndex + '_3'), $(this).find('jzdhcldww').text());
        mini.get('gdqk_cglx_' + (i + 1)).setValue($(this).find('cglx').text());
        _this.setTargetVal($('#006_' + trIndex + '_5'), $(this).find('cgbl').text());
        mini.get('qsrq_' + (i + 1)).setValue($(this).find('qyfeqsrq').text());
    });
    //中国居民个人担任外国企业高管或董事情况
    $dsxxGrid.find('dsxxGridlb').each(function (i) {
        if (i > 2) {
            return false;
        }
        var trIndex = i + 18;
        _this.setTargetVal($('#006_' + trIndex + '_0'), $(this).find('zgmjgrxm').text());
        _this.setTargetVal($('#006_' + trIndex + '_1'), $(this).find('zgjnczd').text());
        mini.get('sfzjlx_' + (i + 1)).setValue($(this).find('sfzjlx').text());
        _this.setTargetVal($('#006_' + trIndex + '_3'), $(this).find('sfzjhm').text());
        _this.setTargetVal($('#006_' + trIndex + '_4'), $(this).find('zw').text());
        mini.get('rzrqq_' + (i + 1)).setValue($(this).find('rzrqq').text());
        mini.get('rzrqz_' + (i + 1)).setValue($(this).find('rzrqz').text());
    });
    //三、外国企业股份变动信息-报告人收购外国企业股份情况
    $sggfxxGrid.find('sggfxxGridlb').each(function (i) {
        if (i > 2) {
            return false;
        }
        var trIndex = i + 24;
        mini.get('sggfqk_cglx_' + (i + 1)).setValue($(this).find('bsggflx').text());
        mini.get('jyrq_' + (i + 1)).setValue($(this).find('jyrq').text());
        _this.setTargetVal($('#006_' + trIndex + '_4'), $(this).find('sgfs').text());
        _this.setTargetVal($('#006_' + trIndex + '_5'), $(this).find('sgqbgrzwgqycgfe').text());
        _this.setTargetVal($('#006_' + trIndex + '_6'), $(this).find('sghbgrzwgqycgfe').text());
    });
    //三、外国企业股份变动信息-报告人处置外国企业股份情况
    $czgfxxGrid.find('czgfxxGridlb').each(function (i) {
        if (i > 2) {
            return false;
        }
        var trIndex = i + 29;
        mini.get('czgfqk_cglx_' + (i + 1)).setValue($(this).find('bczgflx').text());
        mini.get('czrq_' + (i + 1)).setValue($(this).find('czrq').text());
        _this.setTargetVal($('#006_' + trIndex + '_4'), $(this).find('czfs').text());
        _this.setTargetVal($('#006_' + trIndex + '_5'), $(this).find('czqbgrzwgqycgfe').text());
        _this.setTargetVal($('#006_' + trIndex + '_6'), $(this).find('czhbgrzwgqycgfe').text());
    });
};
servyouReport.customResumeFromXml_007 = function () {
    var _this = this;
    $(this.j3CorrectXml).find('dynsbabYwbd dynsbabGrid dynsbabGridlb').each(function (i) {
        if (i > 5) {
            return false;
        }
        var trIndex = i + 5;
        _this.setTargetVal($('#007_' + trIndex + '_1'), $(this).find('jscgmc').text());
        _this.setTargetVal($('#007_' + trIndex + '_2'), $(this).find('jscglx').text());
        _this.setTargetVal($('#007_' + trIndex + '_3'), $(this).find('jscgbh').text());
        _this.setTargetVal($('#007_' + trIndex + '_4'), $(this).find('gyjz').text());
        _this.setTargetVal($('#007_' + trIndex + '_5'), $(this).find('jsjc').text());
        mini.get('qdgqsj_' + i).setValue($(this).find('gqqdsj').text());
        _this.setTargetVal($('#007_' + trIndex + '_7'), $(this).find('dysd').text());
        _this.setTargetVal($('#007_' + trIndex + '_8'), $(this).find('btznsrsbh').text());
        _this.setTargetVal($('#007_' + trIndex + '_9'), $(this).find('btzqymc').text());
        _this.setTargetVal($('#007_' + trIndex + '_10'), $(this).find('swjgmc').text());
        _this.setTargetVal($('#007_' + trIndex + '_11'), $(this).find('sfwglqy').text());
    });
};
servyouReport.specialOrder = ['001', '002', '004', '003', '005', '006', '007'];//特定的报表展现顺序
servyouReport.print = function(){
    var tabs = mini.get('tabs');
    var activeIndex = tabs.activeIndex;
    var $table = $(tabs.getTabBodyEl(activeIndex)).find('table[sb_id]');
    if ($table.attr('sb_id') === '001'){
        $table.find('tr:eq(20) td:eq(5)').html('0.00');
    }
    /*计算所有select显示宽度*/
    $table.find('input,select').each( function () {
        if ($(this).parent('td').length > 0) {
            var servyou_type = $(this).attr('servyou_type');
            if($(this).is('select') || ($(this).is('input') && servyou_type && servyou_type==='string')){
                var width = this.clientWidth;
                $(this).attr('data-width', width + 'px');
            }
        }
    });
    var printHtmlClone = $table.clone();
    /*取出input中的值，替换当前input节点*/
    $(printHtmlClone).find('td>input[type="text"]').each(function(){
        var value = $(this).val();
        var type = $(this).attr('servyou_type');
        var width = $(this).attr('data-width');
        var htmlStr = '';
        if(type && type === 'string'){
            htmlStr += '<span class="span-wrap" style="width:'+width+';">'+value+'</span>';
        }else{
            htmlStr += '<span class="span-nowrap">'+value+'</span>'
        }
        $(this).replaceWith(htmlStr);
    });
    /*取出所有select中的值，替换当前select节点*/
    $(printHtmlClone).find("td>select").each(function () {
        var text = $(this).find('option:selected').html();
        text = text ? text:"";
        var width = $(this).attr('data-width');
        var htmlStr = '<span class="span-wrap" style="width: '+width+';">'+text+'</span>';
        $(this).parent().html(htmlStr);
    });
    var printHtml = $(printHtmlClone)[0].outerHTML;
    LODOP=getLodop();
    // var strStyleCSS='<link rel="stylesheet" type="text/css" href="../../scripts/reportSB3.0/servyouReport_print.css"/>';
    var strStyleCSS='<style>'+this.getPrintCss()+'</style>';
    var strFormHtml ="<head>"+strStyleCSS+"</head>";
    LODOP.PRINT_INIT("报表打印");
    var id = $(printHtml).attr('id');
    var $curTable = $('#'+id);
    var tableWidth = $curTable[0].clientWidth;
    var tableBoxWidth = $curTable.parent()[0].clientWidth;
    if(tableWidth > tableBoxWidth){
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4"); //大表格  横向打印
    }else{
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //A4纸张正向打印 第一个参数 1正向，2横向
    }
    strFormHtml += "<body>"+printHtml+"</body>";
    LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);// 1正向显示，0横向显示
    LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width"); // Auto-Width 整宽不变形
    LODOP.SET_PREVIEW_WINDOW(2,0,0,0,0,"报表打印.开始打印"); // 第一个参数 0适高，1正常，2适宽，其他不要改
    LODOP.ADD_PRINT_HTM("1mm", "1mm", "RightMargin:1mm", "BottomMargin:1mm", strFormHtml); // 边距设置
    LODOP.PREVIEW(); // 打开打印预览窗口
};

$(function () {
    servyouReport.init();
});

// servyouReport.realSend=function (request) {
//     if(!this.checkIsReportWithOthers(request) && this.checkSubmitTime() && sbcommon.sbtj_normal(request)){//正常申报提交
//         $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh,new Date().getTime());
//         var _this=this;
//         if(Number($("#001_22_5").val())+Number($("#001_29_5").val())>0){
//             mini.alert("您的报表已发送，请及时缴纳已申报的税款，缴税不得晚于规定的纳税期限！","温馨提示",function () {
//                 window.location.href = _this.successUrl+'?sbzlDm='+_this.sbzlDm+'&v='+(new Date().getTime()+'_2.0.0');
//             });
//         }else{
//             window.location.href = this.successUrl+'?sbzlDm='+this.sbzlDm+'&v='+(new Date().getTime()+'_2.0.0');
//         }
//     }
// };

servyouReport.isYbtseOverZero=function () {
    return Number($("#001_22_5").val())+Number($("#001_29_5").val())>0;
};


servyouReport.confirmBeforeSend=function () {
    //next step
    var jc=Number($("#001_35_2").val());
    var jm=Number($("#001_35_4").val());
    if(jc>0||jm>0){
        mini.confirm("您的“季初资产总额（万元）”为【"+jc.toFixed(2)+"】、“季末资产总额（万元）”【"+jm.toFixed(2)+"】，请注意填报单位为“万元”！","点击“确定”继续提交，点击“取消”则返回",function (action) {
            if(action==='ok'){
                servyouReport.send();
            }
        });
    }else{
        servyouReport.send();
    }
};
/**
 * Created by liun on 2018/6/15.
 */

qysdsyjbA.setValueFromHd_001=function (_this) {
    /*-----------------------001主表从核定中初始化值到页面中--开始-----------------------*/
    if(this.SBQYLX !== '2'){
        $('#001_20_5').val(_this.wsxxMap["YJJE"]).blur();//本期预缴
    }
    /*-----------------------001主表从核定中初始化值到页面中--结束-----------------------*/
};

qysdsyjbA.timer = new Timer();
qysdsyjbA.doRiskScan = function () {
  if (!qysdsyjbA.timer.checkTime()){
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
          qysdsyjbA.sendRiskScan();
        }
      });
    }else{
      qysdsyjbA.sendRiskScan();
    }
  }
};
qysdsyjbA.sendRiskScan = function () {
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
    qysdsyjbA.timer.run();
    var szjkcxUrl = '/sbzx-web/apps/views/szjkcx/szjkcx.html?sbzlDm='+that.sbzlDm+'&sssqq='+that.sssqq+'&sssqz='+that.sssqz;
    mini.showMessageBox({
      title: "提示",
      iconCls: "mini-messagebox-question",
      message: '已发送扫描申请，请点击“<a href="' + szjkcxUrl + '" target="_blank">政策风险查询</a>“获取反馈结果</br>',
      buttons: ["ok"]
    });
  }
};
qysdsyjbA.timer.defaultText = '政策风险提示服务';
qysdsyjbA.timer.textAfterTime = '后可再次扫描';
qysdsyjbA.timer.solveNotAllowed = function () {
  mini.alert(this.getTextByRestTime());
};

qysdsyjbA.initAlert = function (_this) {
  var html = '<div id="isjsxjx" class="mini-window" title="河北国税提醒" style="width:500px;"' +
    'showToolbar="true" showFooter="true" showModal="true" allowDrag="false" allowResize="false">' +
    '<div class="content borderBottom" style="font-size: 14px"> ' +
    '<span>河北国税提醒您：</span><br/><br/> ' +
    '<span>&nbsp;&nbsp;&nbsp;&nbsp;尊敬的纳税人，您取得了技术先进型服务企业资格，可按规定在资格有效年度内的季（月）度企业所得税预缴申报时享受技术先进型服务企业所得税优惠政策。</span><br/><br/><br/> ' +
    '<a class="mini-button blue font14 mini-button-iconRight" onclick="qysdsyjbA.showBg()"' +
    'style="margin:0 auto; padding:6px 20px;">技术先进型服务企业优惠政策链接</a> ' +
    '<span style="margin:0 auto; padding:6px 20px;">&nbsp;&nbsp;&nbsp;&nbsp;</span> ' +
    '<a class="mini-button blue font14" type="button" id="sae" onclick="qysdsyjbA.closeMessageBox()"' +
    'style="margin:0 auto; padding:6px 20px;">我知道了</a> ' +
    '</div> ' +
    '</div>';
  $('body').append(html);
  mini.parse();
  // mini.get("isjsxjx").hide();
  // mini.get("jsxjxTz").hide();
  var ZSQDSJ = _this.wsxxMap['ZSQDSJ'];
  var JSXJXQYBZ = _this.wsxxMap['JSXJXQYBZ'];
  if (Number(ZSQDSJ) < 3){
    mini.alert('尊敬的纳税人，您现在处于高新技术企业资格期满当年内，在通过重新认定前，企业所得税可暂按15%的税率预缴。但如果您在年度汇算清缴前仍未取得高新技术企业资格的，应按规定补缴税款。','提示',function () {
      if (JSXJXQYBZ === 'Y'){
        mini.get("isjsxjx").show();
      }
    });
  } else if (Number(ZSQDSJ) === 3){
    mini.alert('尊敬的纳税人，您取得了高新技术企业资格证书，可按规定在高企资格有效年度内的季（月）度企业所得税预缴申报时享受高新技术企业所得税优惠政策。','提示',function () {
      if (JSXJXQYBZ === 'Y'){
        mini.get("isjsxjx").show();
      }
    });
  } else {
    if (JSXJXQYBZ === 'Y'){
      mini.get("isjsxjx").show();
    }
  }
};
qysdsyjbA.closeMessageBox = function () {
  mini.get("isjsxjx").hide();
};
qysdsyjbA.showArticle = function () {
  mini.get("jsxjxTz").show();
  mini.hideMessageBox(this.titleId);
};
qysdsyjbA.closeArticle = function () {
  mini.get("jsxjxTz").hide();
};
qysdsyjbA.showBg = function () {
  mini.get("isjsxjx").hide();
  this.titleId = mini.showMessageBox({
    title: "点击下方链接查看全文",
    message: "",
    buttons: [],
    iconCls: "mini-messagebox-question",
    html: "<a onclick='qysdsyjbA.showArticle()' style='cursor: pointer' class='txt-blue'>《财政部 国家税务总局 商务部 科学技术部 国家发展和改革委员会关于将技术先进型服务企业所得税政策推广至全国实施的通知》（财税[2017]79号)</a>",
  });
};
servyouReport.customInitLocalData = function () {
  qysdsyjbA.initAlert(this);
  qysdsyjbA.customInitLocalData(this);
};
servyouReport.customReportBtns = function () {
  servyouReport.reportBtns.unshift({
    id: 'sb_szjk',
    cls: 'btn btn-blue',
    text: '政策风险提示服务',
    callback: function () {
      qysdsyjbA.doRiskScan();
    },
    whenToShow: 'report,correct,past,overdue'
  });
};
