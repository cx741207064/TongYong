/**
 * Created by liun on 2017/12/5.
 */
var fjs = {
    isInit: true,
    zzsSbzLDms: ['10101','10110','10102','10103'],//增值税申报种类代码
    jmxzArr: [],
    initHdJmxz: function (_this) {
        $.each(_this.hd.jmxx,function () {
            fjs.jmxzArr.push(this.ssjmxzhzDm+'-'+this.jmsspsxDm);
        })
    },
    initXgmjzzc: function (_this) {
        mini.get('sfXgmjz').setValue(_this.wsxxMap['SFSYXGMZC'] || 'N');
    },
    initHdJzbl: function (_this) {
        // $('#table_001 tbody tr:eq(3) td:eq(3) input').val(_this.wsxxMap['JZBLCJS']).blur();
        // $('#table_001 tbody tr:eq(4) td:eq(1) input').val(_this.wsxxMap['JZBLJYFJ']).blur();
        // $('#table_001 tbody tr:eq(5) td:eq(1) input').val(_this.wsxxMap['JZBLDFFJ']).blur();
    },
    customInit001:function (_this) {
        var that = this;
        var $trs = $('#table_001 tbody tr:gt(9):lt(20)');
        var zspms = _this.hd.zspms.zspmList;
        $('#djzclx').html(Api.getMcByDm('djzclx',_this.nsrData.djzclxDm)); //登记注册类型
        $('#sshy').html(Api.getMcByDm('hy',_this.nsrData.hyDm)); // 行业名称
        $('.sfzjhm').val(_this.nsrData.fddbrsfzjhm).attr('value',_this.nsrData.fddbrsfzjhm).blur();//身份证件号码
        $('.lxfs').val(_this.nsrData.nsrxxKzVO.scjydlxdh).attr('value',_this.nsrData.nsrxxKzVO.scjydlxdh).blur();//联系电话
        var count = -1;
        $.each(zspms,function (i,zspm) {
            var zsxmdm = zspm['zsxmdm'];
            var curPmType = '';
            if ((zspm['pmbm'].substr(0,5) === '10109' && zspm['pmbm'].substr(8,1) === '1') || (zspm['pmbm'].substr(0,5) !== '10109' && zspm['pmbm'].substr(6,1) === '1')){
                curPmType = 'zzs';
            } else {
                curPmType = 'xfs';
            }
            if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
                if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) !== -1 && curPmType === 'xfs'){//主税种为增值税
                    return true;
                }else if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) === -1 && curPmType === 'zzs'){//主税种为消费税
                    return true;
                }
            }
            count++;
            if (zspm['pmbm'].split(',').length > 1){
                var pmbmList = zspm['pmbm'].split(',');
                var pmmcList = zspm['pmmc'].split(',');
                var slList = zspm['sl'].split(',');
                var zspmOptions = '<option value="">请选择</option>';
                $.each(pmbmList,function (i,pmbm) {
                    zspmOptions += '<option value="'+pmbm+'" data-sl="'+slList[i]+'">'+pmmcList[i]+'</option>';
                });
                $trs.eq(count).find('td:first').addClass('enable').html('<select name="zspm" data-zsxmdm="'+zspm['zsxmdm']+'" data-uuid="'+zspm['rdpzuuid']+'">'+zspmOptions+'</select>');
            } else {
                var firstInput = $trs.eq(count).find('input:first');
                firstInput.val(zspm['pmmc']).attr("data-zspmbm",zspm['pmbm']).attr("data-zsxmdm",zspm['zsxmdm'])
                    .attr("data-uuid",zspm['rdpzuuid']).attr("title",zspm['pmmc']).blur();
                $trs.eq(count).find('td:eq(7) input').val(zspm['sl']).blur();
            }
            $trs.eq(count).find('td:eq(1) input').val(zspm['zsxmdm']).blur();
            if(curPmType === 'zzs'){
                $trs.eq(count).find('td:eq(2)').addClass('enable').find('input').attr('jsyjbz','zzs-ybzzs').removeAttr('disabled','disabled');
                $trs.eq(count).find('td:eq(3)').addClass('enable').find('input').attr('jsyjbz','zzs-mdse').removeAttr('disabled','disabled');
            } else {
                $trs.eq(count).find('td:eq(4)').addClass('enable').find('input').attr('jsyjbz','xfs-xfs').removeAttr('disabled','disabled');
            }
            $trs.eq(count).find('td:gt(1):lt(3) input').blur();
            $trs.eq(count).find('td:eq(12)').addClass('enable').find('input').removeAttr('disabled','disabled').blur();
            // if (_this.wsxxMap['SFSYXGMZC'] !== 'Y'){
            //     $trs.eq(count).find('td:eq(11)').removeClass('enable').find('input').attr('disabled','disabled');
            // }
            $trs.eq(count).find('td:eq(10) input').val('0.00').attr('value','0.00');
            var $jmxz = $trs.eq(count).find('select[data-type="jmxz"]');
            $jmxz.removeAttr('disabled');
            var jmxzOptions = '<option value="">--请选择--</option>';
            var jmxz = Api.getData('/sbzx-web/api/baseCode/get/dsJmxxZsxm/'+zsxmdm, null, 'get', false);
            if (!!jmxz && jmxz.length > 0){
                $.each(jmxz,function () {
                    if ($.inArray(this.JMXZDM+'-'+this.SWSXDM,fjs.jmxzArr) !== -1){
                        jmxzOptions += '<option value="'+this.JMXZDM+'" title="'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'" '+((this.JMXZDM.substr(4,6) === '049901' && servyouReport.wsxxMap['SFSYXGMZC'] === 'Y') ? 'disabled="disabled"' : '')+'>'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'</option>'
                    }
                })
            }
            $jmxz.append(jmxzOptions);
            if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
                var ynseTdIndex = curPmType === 'zzs'?'2':'4';
                $trs.eq(count).find('td:eq('+ynseTdIndex+') input').val(_this.prevSBtjData.ynse).blur();//主税种列带出数据
                $trs.eq(count).find('td:lt(5):gt(1) input').attr('disabled','disabled');//非主税种列只读
                if(zsxmdm === '10109'){
                    $jmxz.attr('disabled','disabled');
                }
            }
        });
        for (var i = count+1; i<$trs.length; i++){
            var trIndex = $('#table_001').find('tr').index($trs.eq(i));
            servyouReport.deleteRow('001',trIndex);
        }
    },
    zspmChange: function () {
        $('#table_001').on('change','select[name="zspm"]', function () {
            var $curTr = $(this).parent().parent();
            if (!$(this).val()){
                $curTr.find('td:eq(7) input').val('').blur();
            } else {
                $curTr.find('td:eq(7) input').val($(this).find('option:selected').attr('data-sl')).blur();
            }
        });
    },
    xgmjzzcChanged: function (e) {
        if(servyouReport.businessType === 'preview'){
            return;
        }
        $('input[data-type="bqynse"]').blur();
        if (e.value === 'Y'){
            $('#table_001 tbody tr:eq(3) td:eq(3) input').val(servyouReport.wsxxMap['JZBLCJS']).blur();
            $('#table_001 tbody tr:eq(4) td:eq(1) input').val(servyouReport.wsxxMap['JZBLJYFJ']).blur();
            $('#table_001 tbody tr:eq(5) td:eq(1) input').val(servyouReport.wsxxMap['JZBLDFFJ']).blur();
            if((servyouReport.hd.nsqxdm!=='11' && servyouReport.hd.nsqxdm!=='06')){
                mini.alert('您如果存在一般人和小规模两种纳税人状态，系统会全额计算减征额，请自行折算并修改减征额！','提示',function () {
                    if (servyouReport.wsxxMap['SFSYXGMZC'] !== 'Y'){
                        mini.alert('本属期该纳税人是增值税一般纳税人，不应享受该减免。');
                    }
                });
            } else if (servyouReport.wsxxMap['SFSYXGMZC'] !== 'Y'){
                mini.alert('本属期该纳税人是增值税一般纳税人，不应享受该减免。');
            }
        } else {
            $('#table_001 tbody tr:eq(3) td:eq(3) input').val(0).blur();
            $('#table_001 tbody tr:eq(4) td:eq(1) input').val(0).blur();
            $('#table_001 tbody tr:eq(5) td:eq(1) input').val(0).blur();
        }
    },
    jmxzChange: function (e) {
        $('#table_001').on('change','select[data-type="jmxz"]', function () {
            var that = this;
            if(!$(this).val()){
                $(this).parent().next().removeClass('enable').find('input').val('0.00').attr('value','0.00').attr('disabled','disabled').blur();
            }else {
                $(this).parent().next().addClass('enable').find('input').removeAttr('disabled').blur();
                if (!(servyouReport.businessType === 'correct' && fjs.isInit)){
                    $(this).parent().next().addClass('enable').find('input').val('').blur()
                }
            }
        });
    },
    /*sfzjhmChange: function () {
        $('#table_001 thead tr td').removeClass('report_error');
        var validator = new Validator();
        $('#table_001').on('blur','input.sfzjhm',function () {
            var that = this;
            if($(that).val() && !validator.isSfzhm($(that).val())){
                $(that).parent().addClass('report_error');
                mini.alert('您填写的身份证件号码格式不正确，请重填！','提示',function () {
                    $(that).val('').blur();
                });
            }
        })
    },
    lxfsChange: function () {
        $('#table_001 thead tr td').removeClass('report_error');
        var validator = new Validator();
        $('#table_001').on('blur','input.lxfs',function () {
            var that = this;
            if($(that).val() && !validator.isPhoneNum($(that).val()) && !validator.isTelNum($(that).val())){
                $(that).parent().addClass('report_error');
                mini.alert('您填写的联系方式格式不正确，请重填！','提示',function () {
                    $(that).val('').blur();
                });
            }
        })
    },*/
    jsyjChange: function () {
        $('#table_001').on('change','input[jsyjbz="zzs-ybzzs"]',function () {
            $('input[jsyjbz="zzs-ybzzs"]').not($(this)).val($(this).val()).blur();
        }).on('change','input[jsyjbz="zzs-mdse"]',function () {
            $('input[jsyjbz="zzs-mdse"]').not($(this)).val($(this).val()).blur();
        }).on('change','input[jsyjbz="xfs-xfs"]',function () {
            $('input[jsyjbz="xfs-xfs"]').not($(this)).val($(this).val()).blur();
        })
    },
    jzseChange: function (_this) {
        $('#table_001').on('change','.jzse',function () {
            var $curTr = $(this).parent().parent();
            var zsxmDm = $curTr.find('td:eq(1) input').val();
            var jzbl = Number(zsxmDm === '10109' ? _this.wsxxMap['JZBLCJS'] : (zsxmDm === '30203' ? _this.wsxxMap['JZBLJYFJ'] : _this.wsxxMap['JZBLDFFJ']));
            var ynse = Number($curTr.find('td:eq(8) input').val());
            var jmse = Number($curTr.find('td:eq(10) input').val());
            if (mini.get('sfXgmjz').getValue() === 'Y' && Number((ynse-jmse).toFixed(2)) > 0){
                var jzse_max = Number(((ynse - jmse)*jzbl).toFixed(2));
                if (Number($(this).val()) > jzse_max){
                    mini.alert('本栏修改范围为【0-'+jzse_max.toFixed(2)+'】，请核实！');
                    $(this).val(jzse_max).blur();
                }
            } else {
                if (Number($(this).val()) !== 0){
                    mini.alert('本栏只能为0');
                    $(this).val(0).blur();
                }
            }
        });
    },
    checkTable_001: function () {
        var $trs = $('#table_001 tbody tr:gt(9):lt(20)');
        var $sfzjhm = $('input.sfzjhm');
        $trs.find('td').removeClass('report_error');
        $sfzjhm.parent().removeClass('report_error');
        var flag = true;
        if($("input[type='radio']:checked").val() === '2' && !$sfzjhm.val()){
            $sfzjhm.parent().addClass('report_error');
            mini.alert('身份证件号码填写不完整，请检查！');
            return false;
        }
        $.each($trs,function(i){
            var bqynsfe = Number($(this).find('td:eq(8) input').val());
            var jme = Number($(this).find('td:eq(10) input').val());
            var bqyj = Number($(this).find('td:eq(12) input').val());
            if($(this).find('td:eq(0) input').length > 0 && !$(this).find('td:eq(0) input').val()){
                return false;
            }
            if ($(this).find('td:eq(0) select').length > 0 && !$(this).find('td:eq(0) select').val()){
                mini.alert('第'+(i+1)+'行请选择税（费）种');
                $(this).find('td:eq(0)').addClass('report_error');
                flag = false;
                return false;
            }
            if(jme>bqynsfe){
                mini.alert('第9列减免额必须小于等于第7列本期应纳税（费）额');
                $(this).find('td:eq(8)').addClass('report_error');
                $(this).find('td:eq(10)').addClass('report_error');
                flag = false;
                return false;
            }
            if (bqyj > bqynsfe){
                mini.alert('第11列本期已缴税（费）额必须小于等于第7列本期应纳税（费）额');
                $(this).find('td:eq(8)').addClass('report_error');
                $(this).find('td:eq(12)').addClass('report_error');
                flag = false;
                return false;
            }
            if($(this).find('td:eq(9) select').val() && jme<=0){
                mini.alert('“减免性质代码”不为空时，第9列“减免额”必须大于0.00');
                $(this).find('td:eq(9)').addClass('report_error');
                $(this).find('td:eq(10)').addClass('report_error');
                flag = false;
                return false;
            }
        });
        return flag;
    }
};
servyouReport.showReportTip = false;
servyouReport.customInitLocalData = function () {
    fjs.initHdJmxz(this);
    fjs.initXgmjzzc(this);
};
//自定义事件
servyouReport.customInit = function () {
    var _this=this;
    if(servyouReport.businessType==='correct'){
        $('#djzclx').html(Api.getMcByDm('djzclx',_this.nsrData.djzclxDm)); //登记注册类型
        $('#sshy').html(Api.getMcByDm('hy',_this.nsrData.hyDm)); // 行业名称
        $('.sfzjhm').val(_this.nsrData.fddbrsfzjhm).attr('value',_this.nsrData.fddbrsfzjhm).blur();//身份证件号码
        $('.lxfs').val(_this.nsrData.nsrxxKzVO.scjydlxdh).attr('value',_this.nsrData.nsrxxKzVO.scjydlxdh).blur();//联系电话
        return;
    }
    fjs.customInit001(this);
};
servyouReport.customEvent = function () {
    fjs.jmxzChange();
    fjs.jsyjChange();
    fjs.jzseChange(this);
    fjs.zspmChange();
};
servyouReport.customInitFromHd = function () {
    fjs.initHdJzbl(this);
};
servyouReport.afterInit = function () {
    mini.alert('请据实填写报表“一般增值税、免抵税额、消费税、本期减免税（费）额、本期已缴税（费）额”等内容。');
    fjs.isInit = false;
};
//js校验001表
servyouReport.checkTable_001 = function () {
    return fjs.checkTable_001();
};
servyouReport.changeXml_001 = function () {
    var $trs = $('#table_001 tbody tr:gt(9):lt(20)');
    var $xml = this.getJ3Xml('001');
    $xml.find('nsrsbh').text(this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('sbrq1').text(this.tbrq);
    $xml.find('sbsxDm1').text('11');    //申报属性代码，11是正常申报
    $xml.find('djlx').text('1');    //默认djlx为单位
    $xml.find('djzclxDm').text(this.nsrData.djzclxDm);
    $xml.find('hyDm').text(this.nsrData.hyDm);
    $xml.find('zjhm').text($('.sfzjhm').val());
    $xml.find('lxfs').text($('.lxfs').val());
    $xml.find('slrq').text(this.tbrq);
    $xml.find('bqsfsyxgmyhzc').text(mini.get('sfXgmjz').getValue());//本期是否适用增值税小规模纳税人减征政策
    // $xml.find('slswjg').text(Api.getMcByDm('swjg',this.nsrData.zgswjDm));
    $xml.find('zgswskfjDm').text(this.nsrData.zgswskfjDm);
    var $sbxxGrid = $xml.find('sbxxGrid');
    var $lbClone= $sbxxGrid.find('sbxxGridlbVO:eq(0)').clone();
    $sbxxGrid.empty();
    for(var i=0; i<20; i++){
        var $curTr = $trs.eq(i);
        if(!$curTr.find('td:eq(0) input').val() && !$curTr.find('td:eq(0) select').val()){
            break;
        }
        var $newlbClone = $lbClone.clone();
        var zsxmDm = $curTr.find('td:eq(0) input').attr('data-zsxmdm') || $curTr.find('td:eq(0) select').attr('data-zsxmdm');
        $newlbClone.find('ewbhxh').text(i+1);
        $newlbClone.find('zsxmDm').text(zsxmDm);
        $newlbClone.find('zspmDm').text($curTr.find('td:eq(0) input').attr('data-zspmbm') || $curTr.find('td:eq(0) select').val());
        $newlbClone.find('ybzzs').text($curTr.find('td:eq(2) input').val() || '0.00');
        $newlbClone.find('zzsmdse').text($curTr.find('td:eq(3) input').val() || '0.00');
        $newlbClone.find('xfs').text($curTr.find('td:eq(4) input').val() || '0.00');
        $newlbClone.find('yys').text($curTr.find('td:eq(5) input').val() || '0.00');
        $newlbClone.find('hj').text($curTr.find('td:eq(6) input').val() || '0.00');
        $newlbClone.find('sl1').text(this.getInputValue($curTr.find('td:eq(7) input')));
        $newlbClone.find('bqynsfe').text($curTr.find('td:eq(8) input').val());
        $newlbClone.find('jmxzDm').text($curTr.find('select[data-type="jmxz"]').val());
        $newlbClone.find('ssjmxzDm').text($curTr.find('select[data-type="jmxz"]').val());
        $newlbClone.find('jme').text($curTr.find('td:eq(10) input').val());
        $newlbClone.find('bqyjse').text($curTr.find('td:eq(12) input').val());
        $newlbClone.find('bqybtse').text($curTr.find('td:eq(13) input').val());
        $newlbClone.find('rdpzuuid').text($curTr.find('td:eq(0) input').attr('data-uuid'));
        $newlbClone.find('lsbbz').text();// todo
        $newlbClone.find('ysbse').text();// todo
        $newlbClone.find('phjmxzDm').text(mini.get('sfXgmjz').getValue() === 'Y' ? (zsxmDm === '10109' ? this.wsxxMap['PHJMXZDMCJS'] : (zsxmDm === '30203' ? this.wsxxMap['PHJMXZDMJYFJ'] : this.wsxxMap['PHJMXZDMDFFJ'])) : '');
        $newlbClone.find('phjzbl').text(mini.get('sfXgmjz').getValue() === 'Y' ? ((Number(zsxmDm === '10109' ? this.wsxxMap['JZBLCJS'] : (zsxmDm === '30203' ? this.wsxxMap['JZBLJYFJ'] : this.wsxxMap['JZBLDFFJ']))*100).toFixed(4)) : '');
        $newlbClone.find('phjmse').text($curTr.find('td:eq(11) input').val());
        $newlbClone.find('phjmswsxDm').text(mini.get('sfXgmjz').getValue() === 'Y' ? (zsxmDm === '10109' ? this.wsxxMap['PHJMSWSXDMCJS'] : (zsxmDm === '30203' ? this.wsxxMap['PHJMSWSXDMJYFJ'] : this.wsxxMap['PHJMSWSXDMDFFJ'])) : '');
        $newlbClone.find('bqsfsyxgmyhzc').text(mini.get('sfXgmjz').getValue());//本期是否适用增值税小规模纳税人减征政策
        $sbxxGrid.append($newlbClone);
    }
    return $xml;
};
sbcommon.getResumeData_fjs = function () {
    var url = '/sbzx-web/api/sb/fjs/getSbmx';
    var request = {
        sbxh: sessionStorage.getItem('sbxh'),
        qqwjm: sessionStorage.getItem('qqwjm')
    };
    return Api.getData(url, request);
};
servyouReport.chooseToGo = function () {
    var request = {
        djxh: this.djxh,
        sbzlDm: this.sbzlDm,
        sssqQ: this.sssqq,
        sssqZ: this.sssqz,
        sblxDm: this.sblxDm
    };
    if(sessionStorage.getItem('zsZsxmDm')){
        request = {
            sbxh: sessionStorage.getItem('sbxh'),
            qqwjm: sessionStorage.getItem('qqwjm')
        };
        var resumeData = sbcommon.getResumeData_fjs(request);
    }else{
        var resumeData = sbcommon.getResumeData_normal(request);
    }
    this.nextReportHd = this.reportWithNext && this.reportWithNext.getHdByDM ? sbcommon.getHdBySbzlDm(this.reportWithNext.getHdByDM): null;
    if(resumeData && resumeData.jsonData && resumeData.jsonData.htmlData){
        this.resumeData = resumeData;
        var that = this;
        if(this.sblxDm === '11' && this.reportWithNext && this.nextReportHd && sessionStorage.getItem(this.sbzlDm+'isBackFromNext') === 'Y'){//关联申报,有下级申报，且有下级申报核定，且存在暂存数据时,且从下级申报返回过来，直接使用暂存数据
            this.useResumeData = true;
            // this.businessType = 'resume';
            this.run();
            return;
        }
        if(this.sblxDm === '11' && location.href.indexOf('reportWithSbzlDm') !== -1){//关联申报,无下级申报，永不使用暂存数据
            this.run();
            return ;
        }
        if(this.sblxDm === '11' && sessionStorage.getItem('zsZsxmDm')){//关联申报在重新申报时，直接使用暂存数据
            this.useResumeData = true;
            // this.businessType = 'resume';
            this.run();
            return;
        }
        mini.confirm('系统检测到您上次填写了申报表，点击确定还原上次填写的数据，点击取消重新填写申报表！', '提示', function (action) {
            if(action === 'ok'){
                that.useResumeData = true;
            }else{
                that.useResumeData = false;
            }
            that.run();
        });
    }else{
        this.run();
    }
};
servyouReport.send = function () {
    var that = this;
    var j3Xmls = [];
    $('table[type="sb"]').each(function () {
        var sb_id = $(this).attr('sb_id');
        if(typeof that['changeXml_'+sb_id] === 'function'){
            var obj = {};
            var $xml = that['changeXml_'+sb_id].apply(that,[]);
            var bbxml = '';
            if($xml.children().length !== 0){
                bbxml = xmlUtil.turnXmlToStr($xml[0]).replace(/[\n\t]/g,'').replace(/>\s+</g,'><');
                //(去除换行及节点间的空格)
            }
            obj['bbwjm'] = that.sbzlDm+'_'+sb_id+'.xml';
            obj['bbxml'] = bbxml;
            j3Xmls.push(obj);
        }
    });
    if(this.prevSbzlDm || sessionStorage.getItem('zsSbzlDm')){
        var zszZsxmDm = '';
        var zszSbzlDm = '';
        if(this.prevSbzlDm){
            zszZsxmDm = this.prevSBtjData.zsxmbm;
            zszSbzlDm = this.prevSbzlDm;
        }else if(sessionStorage.getItem('zsSbzlDm')){
            zszZsxmDm = sessionStorage.getItem('zsZsxmDm');
            zszSbzlDm = sessionStorage.getItem('zsSbzlDm');
        }
        var  xmlObj = {
            "bbwjm": this.sbzlDm +"_002.xml",
            "bbxml": "<taxML><sbxx><zsxmDm>"+zszZsxmDm+"</zsxmDm><sbzldm>"+zszSbzlDm+"</sbzldm></sbxx></taxML>"
        };
        j3Xmls.push(xmlObj);
    }
    var htmlData = this.getPreviewData();
    var formulaData = this.getFormulas();
    var request={
        djxh: this.gsNsrData.djxh,
        sblxDm: this.sblxDm,
        pzxh: this.pzxh,
        sssqq: this.sssqq,
        sssqz: this.sssqz,
        formulaData: mini.encode(formulaData),
        sbformdata: mini.encode(htmlData),
        sbzlDm: this.sbzlDm,
        sbwjs: mini.encode(j3Xmls)
    };
    if(!this.checkIsReportWithOthers(request) && this.checkSubmitTime() && sbcommon.sbtj_normal(request)){//正常申报提交
        $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh,new Date().getTime());
        window.location.href = this.successUrl+'?sbzlDm='+this.sbzlDm;
    }
};

servyouReport.isYbtseOverZero=function () {
    return Number($(".ybtse").val())>0;
};

$(function () {
    servyouReport.init();
});

fjs.handleCorrectRow=function($curTr,v){
    // 甘肃版
    var zspms = servyouReport.hd.zspms.zspmList;
    var zsxmdm=$(v).find('zsxmDm').text();
    var zspmdm=$(v).find('zspmDm').text();
    var rdpzuuid=$(v).find('rdpzuuid').text();
    var curPmType = '';
    if ((zspmdm.substr(0,5) === '10109' && zspmdm.substr(8,1) === '1') || (zspmdm.substr(0,5) !== '10109' && zspmdm.substr(6,1) === '1')){
        curPmType = 'zzs';
    } else {
        curPmType = 'xfs';
    }
    $.each(zspms,function () {
        if (this.pmbm.split(',').length > 1){
            var pmbmList = this.pmbm.split(',');
            if (pmbmList.indexOf(zspmdm) > -1){
                var pmmcList = this.pmmc.split(',');
                var slList = this.sl.split(',');
                var zspmOptions = '<option value="">请选择</option>';
                $.each(pmbmList,function (i,pmbm) {
                    zspmOptions += '<option value="'+pmbm+'" data-sl="'+slList[i]+'" '+(pmbm === zspmdm ? 'selected="selected"' : '')+'>'+pmmcList[i]+'</option>';
                });
                $curTr.find('td:eq(0)').html('<select name="zspm" data-zsxmdm="'+zsxmdm+'" data-uuid="'+rdpzuuid+'">'+zspmOptions+'</select>')
            }
        } else {
            if(this.pmbm===zspmdm){
                $curTr.find('td:eq(0) input').val(this.pmmc).blur();
                return false;
            }
        }
    });

    if(curPmType === 'zzs'){
        $curTr.find('td:eq(2)').addClass('enable').find('input').attr('jsyjbz','zzs-ybzzs').removeAttr('disabled','disabled');
        $curTr.find('td:eq(3)').addClass('enable').find('input').attr('jsyjbz','zzs-mdse').removeAttr('disabled','disabled');
    } else {
        $curTr.find('td:eq(4)').addClass('enable').find('input').attr('jsyjbz','xfs-xfs').removeAttr('disabled','disabled');
    }
    $curTr.find('td:eq(12)').addClass('enable').find('input').removeAttr('disabled','disabled').blur();


    var $jmxz = $curTr.find('select[data-type="jmxz"]');
    $jmxz.removeAttr('disabled');
    var jmxzOptions = '<option value="">--请选择--</option>';
    var jmxz = Api.getData('/sbzx-web/api/baseCode/get/dsJmxxZsxm/'+zsxmdm, null, 'get', false);
    if (!!jmxz && jmxz.length > 0){
        $.each(jmxz,function () {
            if ($.inArray(this.JMXZDM+'-'+this.SWSXDM,fjs.jmxzArr) !== -1){
                jmxzOptions += '<option value="'+this.JMXZDM+'" title="'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'" '+((this.JMXZDM.substr(4,6) === '049901' && servyouReport.wsxxMap['SFSYXGMZC'] === 'Y') ? 'disabled' : '')+'>'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'</option>'
            }
        })
    }
    $jmxz.append(jmxzOptions);
};

servyouReport.customResumeFromXml_001=function () {
    var _this=this;
    var $trs = $('#table_001 tbody tr:gt(9):lt(20)');
    var $j3=$(this.j3CorrectXml).find("sbxxGrid sbxxGridlbVO");
    $.each($j3,function (i,v) {
        var $curTr = $trs.eq(i);
        fjs.handleCorrectRow($curTr,v);
        $curTr.find('td:eq(0) input').attr("data-zsxmdm",$(v).find('zsxmDm').text());
        $curTr.find('td:eq(0) input').attr("data-zspmbm",$(v).find('zspmDm').text());
        $curTr.find('td:eq(0) input').attr("data-uuid",$(v).find('rdpzuuid').text());
        _this.setTargetVal($curTr.find('td:eq(2) input'), $(v).find('ybzzs').text());
        _this.setTargetVal($curTr.find('td:eq(3) input'), $(v).find('zzsmdse').text());
        _this.setTargetVal($curTr.find('td:eq(4) input'), $(v).find('xfs').text());
        _this.setTargetVal($curTr.find('td:eq(5) input'), $(v).find('yys').text());
        _this.setTargetVal($curTr.find('td:eq(6) input'), $(v).find('hj').text());
        _this.setTargetVal($curTr.find('td:eq(7) input'), $(v).find('sl1').text());

        _this.setTargetVal($curTr.find('td:eq(8) input'), $(v).find('bqynsfe').text());
        _this.setTargetVal($curTr.find('td:eq(9) select'), $(v).find('ssjmxzDm').text()||$(v).find('jmxzDm').text());
        _this.setTargetVal($curTr.find('td:eq(10) input'), $(v).find('jme').text());
        _this.setTargetVal($curTr.find('td:eq(12) input'), $(v).find('bqyjse').text());
        _this.setTargetVal($curTr.find('td:eq(13) input'), $(v).find('bqybtse').text());
        _this.setTargetVal($curTr.find('td:eq(11) input'), $(v).find('phjmse').text());

    });
    for (var i = $j3.length; i<$trs.length; i++){
        var trIndex = $('#table_001').find('tr').index($trs.eq(i));
        servyouReport.deleteRow('001',trIndex);
    }
};


servyouReport.afterInitForCorrect=function () {
    if(this.isResumeFromXml){
        this.resumeXmlAfterInit();
        // this.formatAllData();//格式化所有数据
        $('table[type="sb"]').find('td>input').change();//触发所有change事件
        $.each(this.tables, function () {
            this.calculateAllForCorrect();//计算所有公式
        });
        this.triggerEventForCorrect();
    }
};

/**
 * Created by liun on 2018/5/15.
 */
fjs.xfsPmbms = ['302030300','101090103','302160300','101090203', '101090303'];// 消费税品目编码
fjs.zzsPmbms = ['302160100','302030100','101090101','101090201', '101090301'];//增值税品目编码
fjs.customInit001 = function (_this) {
    var that = this;
    var $trs = $('#table_001 tbody tr:gt(9):lt(20)');
    var zspms = _this.hd.zspms.zspmList;
    $('#djzclx').html(Api.getMcByDm('djzclx',_this.nsrData.djzclxDm)); //登记注册类型
    $('#sshy').html(Api.getMcByDm('hy',_this.nsrData.hyDm)); // 行业名称
    $('.sfzjhm').val(_this.nsrData.fddbrsfzjhm).attr('value',_this.nsrData.fddbrsfzjhm).blur();//身份证件号码
    $('.lxfs').val(_this.nsrData.nsrxxKzVO.scjydlxdh).attr('value',_this.nsrData.nsrxxKzVO.scjydlxdh).blur();//联系电话
    var count = -1;
    var temp;
    for (var i=0; i<zspms.length-1; i++){
        if (Number(zspms[i].zsxmdm) > Number(zspms[i+1].zsxmdm)){
            temp = zspms[i];
            zspms[i] = zspms[i+1];
            zspms[i+1] = temp;
        }
    }
    $.each(zspms,function (i,zspm) {
        var zsxmdm = zspm['zsxmdm'];
        var curPmType = '';
        if(that.zzsPmbms.indexOf(zspm['pmbm']) !== -1){
            curPmType = 'zzs';
        }else{
            curPmType = 'xfs';
        }
        if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
            if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) !== -1 && curPmType === 'xfs'){//主税种为增值税
                return true;
            }else if(that.zzsSbzLDms.indexOf(_this.prevSbzlDm) === -1 && curPmType === 'zzs'){//主税种为消费税
                return true;
            }
        }
        count++;
        if (zspm['pmbm'].split(',').length > 1){
            var pmbmList = zspm['pmbm'].split(',');
            var pmmcList = zspm['pmmc'].split(',');
            var slList = zspm['sl'].split(',');
            var zspmOptions = '<option value="">请选择</option>';
            $.each(pmbmList,function (i,pmbm) {
                zspmOptions += '<option value="'+pmbm+'" data-sl="'+slList[i]+'">'+pmmcList[i]+'</option>';
            });
            $trs.eq(count).find('td:first').addClass('enable').html('<select name="zspm" data-zsxmdm="'+zspm['zsxmdm']+'" data-uuid="'+zspm['rdpzuuid']+'">'+zspmOptions+'</select>');
        } else {
            var firstInput = $trs.eq(count).find('input:first');
            firstInput.val(zspm['pmmc']).attr("data-zspmbm",zspm['pmbm']).attr("data-zsxmdm",zspm['zsxmdm'])
                .attr("data-uuid",zspm['rdpzuuid']).attr("title",zspm['pmmc']).blur();
            $trs.eq(count).find('td:eq(7) input').val(zspm['sl']).blur();
        }
        $trs.eq(count).find('td:eq(1) input').val(zspm['zsxmdm']).blur();
        if(curPmType === 'zzs'){
            $trs.eq(count).find('td:eq(2)').addClass('enable').find('input').attr('jsyjbz','zzs-ybzzs').removeAttr('disabled','disabled').val(_this.wsxxMap['JSYJ_YBZZS']).blur();
            $trs.eq(count).find('td:eq(3)').addClass('enable').find('input').attr('jsyjbz','zzs-mdse').removeAttr('disabled','disabled');
        } else {
            $trs.eq(count).find('td:eq(4)').addClass('enable').find('input').attr('jsyjbz','xfs-xfs').removeAttr('disabled','disabled').val(_this.wsxxMap['JSYJ_XFS']).blur();
        }
        $trs.eq(count).find('td:eq(12)').addClass('enable').find('input').removeAttr('disabled','disabled').blur();
        $trs.eq(count).find('td:eq(10) input').val('0.00').attr('value','0.00');
        var $jmxz = $trs.eq(count).find('select[data-type="jmxz"]');
        $jmxz.removeAttr('disabled');
        var jmxzOptions = '<option value="">--请选择--</option>';
        var jmxz = Api.getData('/sbzx-web/api/baseCode/get/dsJmxxZsxm/'+zsxmdm, null, 'get', false);
        if (!!jmxz && jmxz.length > 0){
            $.each(jmxz,function () {
                if ($.inArray(this.JMXZDM+'-'+this.SWSXDM,fjs.jmxzArr) !== -1){
                    jmxzOptions += '<option value="'+this.JMXZDM+'" title="'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'" '+((this.JMXZDM.substr(4,6) === '049901' && servyouReport.wsxxMap['SFSYXGMZC'] === 'Y') ? 'disabled' : '')+'>'+this.JMXZDM+'|'+this.JMXMMC+'|'+this.JMXZMC+'</option>'
                }
            })
        }
        $jmxz.append(jmxzOptions);
        if(location.href.indexOf('reportWithSbzlDm') !== -1){//若是关联申报
            var ynseTdIndex = curPmType === 'zzs'?'2':'4';
            $trs.eq(count).find('td:eq('+ynseTdIndex+') input').val(_this.prevSBtjData.ynse).blur();//主税种列带出数据
            $trs.eq(count).find('td:lt(5):gt(1) input').attr('disabled','disabled');//非主税种列只读
            /*if(ynseTdIndex==='2'){
                $trs.eq(count).find('td:eq('+ynseTdIndex+') input').removeAttr("disabled");//增殖税可修改
            }*/
            if(zsxmdm === '10109'){
                $jmxz.attr('disabled','disabled');
            }
            /*$jmxz.attr('disabled','disabled');
            if (!!$jmxz.val()){
                $trs.eq(count).find('td:eq(10) input').val(zspm['jmse']).attr({'value':zspm['jmse'], 'disabled':'disabled'}).blur();
                $trs.eq(count).find('td:eq(10)').removeClass('enable');
                $trs.eq(count).find('td:eq(11)').removeClass('enable').find('input').attr('disabled','disabled');
            }*/
        }
    });
    for (var i = count+1; i<$trs.length; i++){
        var trIndex = $('#table_001').find('tr').index($trs.eq(i));
        servyouReport.deleteRow('001',trIndex);
    }
};



/*servyouReport.setHd = function () {
    if (this.mock){
        this.hd = this.getLocalJson(this.mockApi['hd']);
    } else {
        var sbzlDms = Tools.getUrlParamByName('reportWithSbzlDm').split('_');
        if (sbzlDms.length > 0){
            var sbtjData = mini.decode(sessionStorage.getItem('sbtjData_'+sbzlDms[sbzlDms.length-1]));
            if($.inArray(sbtjData.request.sbzlDm,['10101','10306','10102','10302','10303','10304','10305','10307','10310','10311']) !== -1){
                this.sbzlDm='10115';
            }else{
                this.sbzlDm='10116';
            }
            fjs.ybtse = sbtjData.ybtse;
            fjs.bhsxse = sbtjData.bhsxse;
            fjs.zszSbzlDm = sbtjData.request.sbzlDm;
            fjs.zsxmbm = sbtjData.zsxmbm;
            var params = {
                djxh:this.nsrData.djxh,     // 登记序号
                ssdabh:'',   // 档案编号
                skssqq:sbtjData.request.sssqq,   // 税款所属期起
                skssqz:sbtjData.request.sssqz,   // 税款所属期止
                zsxmDm:sbtjData.zsxmbm,   // 征收项目代码
                jylxDm:'101',   // 101计算税款，102正式申报
                fjsjsyj:sbtjData.ybtse,  // 应补退税额
                bhsxse:sbtjData.bhsxse    // 不含税销售额
            };
            var fjsHdXml = '';
            ajax.post('/sbzx-web/api/hb/sb/fjs/getFjsjsxx', mini.encode(params), function (response) {
                if(response.success){
                    fjsHdXml = mini.decode(response.value);
                }else{
                    mini.alert(response.message,'提示',function () {
                        window.history.go(-1);
                    });
                }
            }, function () {
                mini.alert('附加税计税依据信息获取失败','提示',function () {
                    window.history.go(-1);
                });
            });
            fjsHdXml = fjsHdXml.replace('<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>', '');
            if (!!fjsHdXml){
                this.hd = xmlUtil.turnXmlToJson(xmlUtil.turnStrToXml(fjsHdXml)).taxML.sbxx;
            }
        }
    }
    //next step
    if(this.checkHd()){
        this.setCommonData();
        this.initMiniTab(['001']);
        //next step
        if(this.preCondition()){
            this.chooseToGo();
        }
    }
};
servyouReport.setCommonData = function () {
    this.sssqq = this.hd['skssqq'];	//所属时期起
    this.sssqz = this.hd['skssqz'];	//所属时期止
    this.tbrq = Date.getLocalDate().format('yyyy-MM-dd');//填表日期
    /!*以下用于关联申报*!/
    var reportWithSbzlDms = Tools.getUrlParamByName('reportWithSbzlDm');
    if(reportWithSbzlDms){
        reportWithSbzlDms = reportWithSbzlDms.split('_');
        this.prevSbzlDm = reportWithSbzlDms[reportWithSbzlDms.length-1];
        this.prevSBtjData = mini.decode(sessionStorage.getItem('sbtjData_'+this.prevSbzlDm));
    }
};*/
/*servyouReport.changeXml_001 = function () {
    var $xml = this.getJ3Xml('001');
    $xml.find('djxh').text(this.hd.djxh);
    $xml.find('ssdabh').text(this.hd.ssdabh);
    // $xml.find('sbzldm').text(fjs.zszSbzlDm);
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('fjsjsyj').text(fjs.ybtse);
    $xml.find('bhsxse').text(fjs.bhsxse);
    $xml.find('zsxmDm').text(fjs.zsxmbm);
    return $xml;
};*/
servyouReport.afterInit = function () {
    mini.alert('请据实填写报表“一般增值税、免抵税额、消费税、本期减免税（费）额、本期已缴税（费）额”等内容。');
    /*if(this.prevSBtjData.url.indexOf('zzzd') !== -1){
        this.successUrl = '../public/sb_success_zzzd.html';
    }*/
};
