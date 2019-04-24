/**
 * Created by ywy on 2017/6/20.
 */
var xqy = {
    SBZLCODE: "",
    sssqq: "",
    sssqz: "",
    initHd: function(_this){
        xqy.SBZLCODE = _this.sbzlDm;
        xqy.sssqq = _this.sssqq;
        xqy.sssqz = _this.sssqz;
        var lsxxMap = _this.lsxxMap;
        this.initLsxx_001(lsxxMap);
    },
    initLsxx_001: function (lsxxMap) {
        var $trs_001 = $('#table_001 tbody tr:gt(1)');
        for (var i=1; i<54; i++){
            if (i < 16){
                $trs_001.eq(i-1).find('td:eq(5) input').val(lsxxMap[i]);
            } else if (i > 15 && i < 31){
                $trs_001.eq(i).find('td:eq(5) input').val(lsxxMap[i]);
            } else if (i > 30 && i < 42){
                $trs_001.eq(i-31).find('td:eq(13) input').val(lsxxMap[i]);
            } else if (i > 41 && i < 48){
                $trs_001.eq(i-30).find('td:eq(13) input').val(lsxxMap[i]);
            } else if (i > 47){
                $trs_001.eq(i-23).find('td:eq(13) input').val(lsxxMap[i]);
            }
        }
    },
    /*init003tr21: function (_this) {
        _this.tables['003'] && _this.deleteFormulas('003',['E28 = round(F28+{lsxxs.lsxx[code=220].value},2)']);
        $('#table_003 tbody tr:eq(24) td:eq(5) input').val(_this.lsxxMap[222]).attr('value',_this.lsxxMap[222]).blur();
        $('#table_003 tbody tr:eq(24) td:eq(4) input').val(_this.lsxxMap[300]).attr('value',_this.lsxxMap[300]).blur();
    },*/
    bindScrollEvent: function(){
        var tempHeight;
        servyouReport.businessType==='preview'?tempHeight = 230:tempHeight = 339;
        window.onscroll = function () {
            var scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if(scrollHeight>=tempHeight){
                $('#topHeader_006').css({
                    'top':scrollHeight-tempHeight+138+'px',
                    'display': 'block'
                });
            } else{
                $('#topHeader_006').hide();
            }
        };
    },
    bindTable002: function () {
        var $trs = $('#table_002 tbody tr:gt(0)');
        $trs.find('td:eq(9) input').bind('blur',function (e) {
            var _this = e.target;
            var sqje = $(_this).val();
            $(_this).parents().find('td:eq(6) input').val(sqje).attr('value',sqje).blur();
        });
    },
    bindTable003: function () {
        var $trs = $('#table_003 tbody tr:gt(0)');
        $trs.find('td:eq(5) input').bind('blur',function (e) {
            var _this = e.target;
            var sqje = $(_this).val();
            $(_this).parents().find('td:eq(4) input').val(sqje).attr('value',sqje).blur();
        });
    },
    checkTable006: function(){
        var flag = true;
        if(xqy.SBZLCODE === "29837"){
            var index = parseInt($("#table_006 tr").length) - 13;
            for(var i=1;i<=index;i++){
                var xmmc = $('#xmmc' + (i)).val();
                var xmbh = $('#xmbh' + (i)).val();
                var yfxs = $('#yfxs'+(i)).val();
                var zbhfyhzcxx = $('#zbhfyhzcxx'+(i)).val();
                var xmssztxx = $('#xmssztxx'+(i)).val();
                var sfwtjwxx = $('#sfwtjwxx'+(i)).val();
                var yfcg = $('#yfcg' + (i)).val();
                var yfcgzsh = $('#yfcgzsh' + (i)).val();
                var wtfystfsfczglgxxx = $('#wtfystfsfczglgxxx'+(i)).val();
                if(xmmc!=""){
                    if(xmbh === ""){
                        mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请填写项目编号");
                        flag = false;
                        return;
                    }
                    if(yfxs === ""){
                        mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请选择研发形式");
                        flag = false;
                        return;
                    }
                    if(zbhfyhzcxx === ""){
                        mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请选择资本化、费用化支出选项");
                        flag = false;
                        return;
                    }
                    if(xmssztxx === ""){
                        mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请选择项目实施状态选项");
                        flag = false;
                        return;
                    }

                    if(yfxs === "2"){
                        if(wtfystfsfczglgxxx ===""){
                            mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请选择：委托方与受托方是否存在关联关系选项");
                            flag = false;
                            return;
                        }
                        if(sfwtjwxx ===""){
                            mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请选择：是否委托境外选项");
                            flag = false;
                            return;
                        }
                    }
                    if(xmssztxx==="02"){
                        if(yfcg===""){
                            mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请填写：研发成果");
                            flag = false;
                            return;
                        }
                        if(yfcgzsh===""){
                            mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,请填写：研发成果证书号");
                            flag = false;
                            return;
                        }
                    }

                    for(var j = 1;j<=40;j++){
                        var str = $('#fzhzb_'+ (i+6) +'_'+j).val();
                        if(str === null || str ===""){
                            mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,需填写完整,数值不能为空");
                            flag = false;
                            return;
                        }
                    }
                    if($('#fzhzb_'+ (i+6) +'_42').val()===null||$('#fzhzb_'+ (i+6) +'_42').val()===""){
                        mini.alert("研发支出辅助账汇总表下项目明细（填写项目贷方发生额）的第"+i+"行,需填写完整,数值不能为空");
                        flag = false;
                        return;
                    }
                }
            }
        }
        return flag;
    },
    /*onvaluechange*/
    bind_yfxs: function(){
        $("#table_006").on('change','[name="yfxs"]',function(e){
            var id          = e.target.id;
            var yfxs        = e.target.value;
            var $curRow     = $('#'+id).parent().parent();
            var index       = $curRow.index();
            var changeIndex = index-9;
            var fzhzb       = $('#fzhzb_'+ (changeIndex+6) +'_1');
            if(yfxs === '2'){
                $('#wtfystfsfczglgxxx'+ changeIndex).removeAttr("disabled");
                $('#sfwtjwxx'+ changeIndex).removeAttr("disabled");
                $("#td_wtfystfsfczglgxxx"+ changeIndex).addClass("enable");
                $("#td_sfwtjwxx"+ changeIndex).addClass("enable");
            }else{
                $('#wtfystfsfczglgxxx'+ changeIndex).val("").attr("disabled","disabled");
                $('#sfwtjwxx'+ changeIndex).val("").attr("disabled","disabled");
            }
            fzhzb.blur().attr('value',fzhzb.val());
        })
    },
    bind_zbhfyhzcxx: function(){
        $("#table_006").on('change','[name="zbhfyhzcxx"]',function(e){
            var id          = e.target.id;
            var $curRow     = $('#'+id).parent().parent();
            var index       = $curRow.index();
            var changeIndex = index-9;
            var fzhzb       = $('#fzhzb_'+ (changeIndex+6) +'_1');
            fzhzb.blur().attr('value',fzhzb.val());
        })
    },
    bind_xmssztxx: function(){
        $("#table_006").on('change','[name="xmssztxx"]',function(e){
            var id          = e.target.id;
            var xmssztxx    = e.target.value;
            var $curRow     = $('#'+id).parent().parent();
            var index       = $curRow.index();
            var changeIndex = index-9;
            var fzhzb       = $('#fzhzb_'+ (changeIndex+6) +'_1');
            if(xmssztxx === '02'){
                $('#yfcg'+ changeIndex).removeAttr('disabled');
                $('#yfcgzsh'+ changeIndex).removeAttr('disabled');
            }else{
                $('#yfcg'+ changeIndex).attr('disabled','disabled').attr('value','').val('');
                $('#yfcgzsh'+ changeIndex).attr('disabled','disabled').attr('value','').val('');
            }
            fzhzb.blur().attr('value',fzhzb.val());
        })
    },
    bind_wtfystfsfczglgxxx: function(){
        $("#table_006").on('change','[name="wtfystfsfczglgxxx"]',function(e){
            var id          = e.target.id;
            var $curRow     = $('#'+id).parent().parent();
            var index       = $curRow.index();
            var changeIndex = index-9;
            var fzhzb       = $('#fzhzb_'+ (changeIndex+6) +'_1');
            fzhzb.blur().attr('value',fzhzb.val());
        })
    },
    bind_sfwtjwxx: function(){
        $("#table_006").on('change','[name="sfwtjwxx"]',function(e){
            var id          = e.target.id;
            var $curRow     = $('#'+id).parent().parent();
            var index       = $curRow.index();
            var changeIndex = index-9;
            var fzhzb       = $('#fzhzb_'+ (changeIndex+6) +'_1');
            fzhzb.blur().attr('value',fzhzb.val());
        })
    },

    binding: function(){
        /*xqy.allbinding(1);
        for(var i = 1;i<=6;i++){
            for(var j = 1;j<=20;j++){
                $('#fzhzb_'+ (i) +'_'+ (j) +'').bind('blur',function(e){
                    var sum8        = 0.00;
                    var id          = e.target.id;
                    var $curRow     = $('#'+id).parent().parent();
                    var index       = $curRow.index();
                    var changeIndex = index-3;
                    for(var k = 1;k<=20;k++){
                        var str = $('#fzhzb_'+ changeIndex +'_'+ (k) +'').val();
                        if(str != ""){
                            sum8 = parseFloat(sum8) + parseFloat(str);
                        }
                    }
                    $('#fzhzb_'+ (changeIndex) +'_44').attr('value',xqy.toDecimal2(sum8));
                    $('#fzhzb_'+ (changeIndex) +'_45').attr('value',xqy.toDecimal2(sum8*0.1/0.9));
                });
            }
            for(var j = 21;j<=40;j++){
                $('#fzhzb_'+ (i) +'_'+ (j) +'').bind('blur',function(e){
                    var sum         = 0.00;
                    var id          = e.target.id;
                    var $curRow     = $('#'+id).parent().parent();
                    var index       = $curRow.index();
                    var changeIndex = index-3;
                    for(var k = 21;k<=40;k++){
                        var str = $('#fzhzb_'+ changeIndex +'_'+ (k) +'').val();
                        sum = parseFloat(sum) + parseFloat(str);
                    }
                    $('#fzhzb_'+ (changeIndex) +'_41').attr('value',xqy.toDecimal2(sum));
                });
            }
        }*/
        $('#table_006').on('change','input[name="fzhzb"]',function () {
            var row = Number($(this).attr('id').split('_')[1]);
            var col = Number($(this).attr('id').split('_')[2]);
            if (col <= 20){
                var sum8 = 0.00;
                for (var k = 1; k <= 20; k++) {
                    var str = $('#fzhzb_' + row + '_' + k + '').val();
                    if (str !== "") {
                        sum8 = parseFloat(sum8) + parseFloat(str);
                    }
                }
                $('#fzhzb_' + (row) + '_44').attr('value', xqy.toDecimal2(sum8)).val(xqy.toDecimal2(sum8));
                $('#fzhzb_' + (row) + '_45').attr('value', xqy.toDecimal2(sum8 * 0.1 / 0.9)).val(xqy.toDecimal2(sum8 * 0.1 / 0.9));
            } else if (col > 20 && col <=40){
                var sum = 0.00;
                for (var k = 21; k <= 40; k++) {
                    var str = $('#fzhzb_' + row + '_' + (k) + '').val();
                    sum = parseFloat(sum) + parseFloat(str);
                }
                $('#fzhzb_' + (row) + '_41').attr('value', xqy.toDecimal2(sum)).val(xqy.toDecimal2(sum));
            }
            if (row > 6 && (col <= 40 || col === 42)){
                var yfxs = $('#yfxs' + (row - 6)).val();
                var zbhfyhzcxx = $('#zbhfyhzcxx' + (row - 6)).val();
                var sfwtjwxx = $('#sfwtjwxx' + (row - 6)).val();
                var wtfystfsfczglgxxx = $('#wtfystfsfczglgxxx' + (row - 6)).val();
                var xmssztxx = $('#xmssztxx' + (row - 6)).val();
                xqy.xh9Andxh9_1(row, yfxs, zbhfyhzcxx, sfwtjwxx, wtfystfsfczglgxxx, xmssztxx);
            }
        });
        $('#table_006').on('change','input[name="xmmc"]',function () {
            var $curRow = $(this).parent().parent();
            var index = $curRow.index();
            var changeIndex = index - 3;
            if ($(this).val() === "") {
                $('#yfxs' + (changeIndex - 6)).val("").attr('value', "").attr('disabled', 'disabled').change();
                $('#zbhfyhzcxx' + (changeIndex - 6)).val("").attr('value', "").attr('disabled', 'disabled').change();
                $('#xmssztxx' + (changeIndex - 6)).val("").attr('value', "").attr('disabled', 'disabled').change();
                for (var i = 1; i <= 20; i++) {
                    $('#fzhzb_' + (changeIndex) + '_' + i + '').val('').attr('value', "").attr('disabled', "disabled");
                }
                $('#fzhzb_' + (changeIndex) + '_42').val('').attr('value', "").attr('disabled', "disabled");
                for (var i = 21; i <= 41; i++) {
                    $('#fzhzb_' + (changeIndex) + '_' + i + '').val('0.00').attr('value', "0.00").attr('disabled', "disabled");
                }
                for (var i = 43; i <= 47; i++) {
                    $('#fzhzb_' + (changeIndex) + '_' + i + '').val('0.00').attr('value', "0.00").attr('disabled', "disabled");
                }
                $('#xmbh' + (changeIndex - 6)).val("").attr('value', "").attr('disabled', "disabled");
            } else {
                $('#yfxs' + (changeIndex - 6)).removeAttr('disabled');
                $('#zbhfyhzcxx' + (changeIndex - 6)).removeAttr('disabled');
                $('#xmssztxx' + (changeIndex - 6)).removeAttr('disabled');
                $("#td_yfxs" + (changeIndex - 6)).addClass("enable");
                $("#td_zbhfyhzcxx" + (changeIndex - 6)).addClass("enable");
                $("#td_xmssztxx" + (changeIndex - 6)).addClass("enable");

                $('#xmbh' + (changeIndex - 6)).removeAttr('disabled');
                for (var i = 1; i <= 20; i++) {
                    $('#fzhzb_' + (changeIndex) + '_' + i + '').removeAttr('disabled');
                }
                $('#fzhzb_' + (changeIndex) + '_42').removeAttr('disabled');
                for (var i = 21; i <= 40; i++) {
                    $('#fzhzb_' + (changeIndex) + '_' + i + '').removeAttr('disabled');
                }
            }
        });
    },
    allbinding: function(addid){

        for(var j = 21;j<=40;j++){
            $('#fzhzb_'+ (addid+6) +'_'+ (j) +'').bind('blur',function(e){
                var sum = 0.00;
                var id = $('#'+e.target.id);
                var $curRow = id.parent().parent();
                var index = $curRow.index();
                var changeIndex = index-3;
                for(var k = 21;k<=40;k++){
                    var str = $('#fzhzb_'+ changeIndex +'_'+ (k) +'').val();
                    sum = parseFloat(sum) + parseFloat(str);
                }
                $('#fzhzb_'+ (changeIndex) +'_41').attr('value',xqy.toDecimal2(sum));
            });
        }

        $('#xmmc'+ addid).bind('blur',function(e){
            var id = $('#'+e.target.id);
            var $curRow = id.parent().parent();
            var index = $curRow.index();
            var changeIndex = index-3;
            if(id.val()===""){
                $('#yfxs'+ (changeIndex-6)).val("").attr('disabled','disabled');
                $('#zbhfyhzcxx'+ (changeIndex-6)).val("").attr('disabled','disabled');
                $('#xmssztxx'+ (changeIndex-6)).val("").attr('disabled','disabled');
                for(var i = 1;i<=20;i++){
                    $('#fzhzb_'+ (changeIndex) +'_'+i+'').attr('value',"").attr('disabled',"disabled");
                }
                $('#fzhzb_'+ (changeIndex) +'_42').attr('value',"").attr('disabled',"disabled");
                for(var i = 21;i<=41;i++){
                    $('#fzhzb_'+ (changeIndex) +'_'+i+'').attr('value',"0.00").attr('disabled',"disabled");
                }
                for(var i = 43;i<=47;i++){
                    $('#fzhzb_'+ (changeIndex) +'_'+i+'').attr('value',"0.00").attr('disabled',"disabled");
                }
                $('#xmbh'+ (changeIndex-6)).attr('value',"").attr('disabled',"disabled");
            }else{
                $('#yfxs'+ (changeIndex-6)).val("").removeAttr('disabled');
                $('#zbhfyhzcxx'+ (changeIndex-6)).val("").removeAttr('disabled');
                $('#xmssztxx'+ (changeIndex-6)).val("").removeAttr('disabled');
                $("#td_yfxs"+ (changeIndex-6)).addClass("enable");
                $("#td_zbhfyhzcxx"+ (changeIndex-6)).addClass("enable");
                $("#td_xmssztxx"+ (changeIndex-6)).addClass("enable");

                $('#xmbh'+ (changeIndex-6)).removeAttr('disabled');
                for(var i = 1;i<=20;i++){
                    $('#fzhzb_'+ (changeIndex) +'_'+i+'').removeAttr('disabled');
                }
                $('#fzhzb_'+ (changeIndex) +'_42').removeAttr('disabled');
                for(var i = 21;i<=40;i++){
                    $('#fzhzb_'+ (changeIndex) +'_'+i+'').removeAttr('disabled').css("color","#3366cc");
                }

            }
        });

        $('#fzhzb_'+ (addid+6) +'_42').bind('blur',function(e){
            var id          = e.target.id;
            var $curRow     = $('#'+id).parent().parent();
            var index       = $curRow.index();
            var changeIndex = index-3;

            var yfxs              = $('#yfxs'+(changeIndex-6)).val();
            var zbhfyhzcxx        = $('#zbhfyhzcxx'+(changeIndex-6)).val();
            var sfwtjwxx          = $('#sfwtjwxx'+(changeIndex-6)).val();
            var wtfystfsfczglgxxx = $('#wtfystfsfczglgxxx'+(changeIndex-6)).val();
            var xmssztxx          = $('#xmssztxx'+(changeIndex-6)).val();


            xqy.xh9Andxh9_1(changeIndex,yfxs,zbhfyhzcxx,sfwtjwxx,wtfystfsfczglgxxx,xmssztxx);
        });

        for(var j = 1;j<=40;j++){
            $('#fzhzb_'+ (addid+6) +'_'+ (j) +'').bind('blur',function(e){
                var sum         = 0.00;
                var sum8        = 0.00;
                var id          = e.target.id;
                var $curRow     = $('#'+id).parent().parent();
                var index       = $curRow.index();
                var changeIndex = index-3;

                var yfxs              = $('#yfxs'+(changeIndex-6)).val();
                var zbhfyhzcxx        = $('#zbhfyhzcxx'+(changeIndex-6)).val();
                var sfwtjwxx          = $('#sfwtjwxx'+(changeIndex-6)).val();
                var wtfystfsfczglgxxx = $('#wtfystfsfczglgxxx'+(changeIndex-6)).val();
                var xmssztxx          = $('#xmssztxx'+(changeIndex-6)).val();

                for(var k = 1;k<=20;k++){
                    var str = $('#fzhzb_'+ changeIndex +'_'+ (k) +'').val();
                    if(str != ""){
                        sum8 = parseFloat(sum8) + parseFloat(str);
                    }
                }
                $('#fzhzb_'+ (changeIndex) +'_44').attr('value',xqy.toDecimal2(sum8));
                $('#fzhzb_'+ (changeIndex) +'_45').attr('value',xqy.toDecimal2(sum8*0.1/0.9));
                for(var k = 1;k<=20;k++){
                    var str = $('#fzhzb_'+ changeIndex +'_'+ (k) +'').val();
                    if(str != ""){
                        sum = parseFloat(sum) + parseFloat(str);
                    }
                }
                xqy.xh9Andxh9_1(changeIndex,yfxs,zbhfyhzcxx,sfwtjwxx,wtfystfsfczglgxxx,xmssztxx);
            });
        }
    },
    //制保留2位小数，如：2，会在2后面补上00.即2.00
    toDecimal2: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },
    //xh9和xh9.1的触发绑定
    xh9Andxh9_1: function(changeIndex,yfxs,zbhfyhzcxx,sfwtjwxx,wtfystfsfczglgxxx,xmssztxx){
        var sum = 0.00;
        //“委托方与受托方是否存在关联关系选项”为存在,是否委托境外选项为委托境外
        if(wtfystfsfczglgxxx==="01"&&sfwtjwxx==="02"){
            for(var k = 1;k<=40;k++){
                var str = $('#fzhzb_'+ changeIndex +'_'+ (k) +'').val();
                if(str!=""){
                    sum = parseFloat(sum) + parseFloat(str);
                }
            }
            $('#fzhzb_'+ (changeIndex) +'_43').attr('value',xqy.toDecimal2(sum)).val(xqy.toDecimal2(sum));
            //“委托方与受托方是否存在关联关系选项”为不存在,是否委托境外选项为委托境外
        }else if(wtfystfsfczglgxxx==="02"&&sfwtjwxx==="02"){
            var str = $('#fzhzb_'+ (changeIndex) +'_42').val();
            if(str===""){
                $('#fzhzb_'+ (changeIndex) +'_43').attr('value',"0.00").val('0.00');
            }else{
                $('#fzhzb_'+ (changeIndex) +'_43').attr('value',xqy.toDecimal2(str)).val(xqy.toDecimal2(str));
            }
        }else if(sfwtjwxx==="01"||sfwtjwxx===""||wtfystfsfczglgxxx===""){
            $('#fzhzb_'+ (changeIndex) +'_43').attr('value',"0.00").val('0.00');
        }
        var xh8 = $('#fzhzb_'+ (changeIndex) +'_44').val();

        var xh6_21;
        var sum6 = 0.00;
        for(var k = 21;k<=40;k++){
            var str = $('#fzhzb_'+ changeIndex +'_'+ (k) +'').val();
            sum6 = parseFloat(sum6) + parseFloat(str);
            xh6_21 = sum6;
        }
        var xh8_1 = $('#fzhzb_'+ (changeIndex) +'_45').val();
        var xh7_1 = $('#fzhzb_'+ (changeIndex) +'_43').val();
        var xh7 = $('#fzhzb_'+ (changeIndex) +'_42').val();
        //1-6的合计
        var xh1To6 = 0.00;
        for(var i = 1;i<=40;i++){
            var str = $('#fzhzb_'+ (changeIndex) +'_' + i).val();
            if(str!=""){
                xh1To6 = parseFloat(xh1To6) +  parseFloat(str);
            }
        }
        //“资本化、费用化支出选项”为费用化且“研发形式”为委托研发、“委托方与受托方是否存在关联关系选项”为存在
        if(zbhfyhzcxx === "02"&&yfxs === "2"&& wtfystfsfczglgxxx ==="01"){
            var xh_min;
            if(parseFloat(xh6_21)<parseFloat(xh8_1)){
                xh_min = xh6_21;
            }else{
                xh_min = xh8_1;
            }
            $('#fzhzb_'+ (changeIndex) +'_46').attr('value',xqy.toDecimal2((parseFloat(xh8)+parseFloat(xh_min)-parseFloat(xh7_1))*0.8)).val(xqy.toDecimal2((parseFloat(xh8)+parseFloat(xh_min)-parseFloat(xh7_1))*0.8));
            //“资本化、费用化支出选项”为费用化且“研发形式”为委托研发、“委托方与受托方是否存在关联关系选项”为不存在
        }else if (zbhfyhzcxx === "02"&&yfxs === "2"&& wtfystfsfczglgxxx ==="02"){
            if(xh7 === ""){
                xh7 = 0.00;
            }
            $('#fzhzb_'+ (changeIndex) +'_46').attr('value',xqy.toDecimal2((parseFloat(xh7)-(parseFloat(xh7_1)))*0.8)).val(xqy.toDecimal2((parseFloat(xh7)-(parseFloat(xh7_1)))*0.8));
            // “资本化、费用化支出选项”为费用化且“研发形式”为自主研发、合作研发和集中研发时
        }else if (zbhfyhzcxx === "02"&&(yfxs === "1"||yfxs === "3"||yfxs === "4")){
            var xh_min;
            if(parseFloat(xh6_21)<parseFloat(xh8_1)){
                xh_min = xh6_21;
            }else{
                xh_min = xh8_1;
            }
            $('#fzhzb_'+ (changeIndex) +'_46').attr('value',xqy.toDecimal2((parseFloat(xh8)+parseFloat(xh_min)))).val(xqy.toDecimal2((parseFloat(xh8)+parseFloat(xh_min))));
        }else{
            $('#fzhzb_'+ (changeIndex) +'_46').attr('value',"0.00").val('0.00');
        }
        //当项目明细中“资本化、费用化支出选项”为资本化且“项目实施状态选项”为已完成、“研发形式”为委托研发、“委托方与受托方是否存在关联关系选项”为存在
        if(zbhfyhzcxx === "01"&&yfxs === "2"&&xmssztxx === "02"&& wtfystfsfczglgxxx ==="01"){
            var xh_min;
            if(parseFloat(xh6_21)<parseFloat(xh8_1)){
                xh_min = xh6_21;
            }else{
                xh_min = xh8_1;
            }
            if(xh1To6 === 0){
                $('#fzhzb_'+ (changeIndex) +'_47').attr('value','0.00').val('0.00');
            }else{
                $('#fzhzb_'+ (changeIndex) +'_47').attr('value',xqy.toDecimal2(((parseFloat(xh8)+parseFloat(xh_min))-parseFloat(xh7_1))*0.8/xh1To6));
            }
            //当项目明细中“资本化、费用化支出选项”为资本化且“项目实施状态选项”为已完成、“研发形式”为委托研发、“委托方与受托方是否存在关联关系选项”为不存在
        }else if (zbhfyhzcxx === "01"&&yfxs === "2"&&xmssztxx === "02"&& wtfystfsfczglgxxx ==="02"){
            if(xh7 === ""){
                xh7 = 0.00;
            }
            if(xh7 === 0){
                $('#fzhzb_'+ (changeIndex) +'_47').attr('value','0.00').val('0.00');
            }else{
                $('#fzhzb_'+ (changeIndex) +'_47').attr('value',xqy.toDecimal2((parseFloat(xh7)-(parseFloat(xh7_1)))*0.8/xh7)).val(xqy.toDecimal2((parseFloat(xh7)-(parseFloat(xh7_1)))*0.8/xh7));
            }
            //“资本化、费用化支出选项”为资本化且“项目实施状态选项”为已完成、“研发形式”为自主研发、合作研发和集中研发时
        }else if (zbhfyhzcxx === "01"&&xmssztxx === "02"&&(yfxs === "1"||yfxs === "3"||yfxs === "4")){
            var xh_min;
            if(parseFloat(xh6_21)<parseFloat(xh8_1)){
                xh_min = xh6_21;
            }else{
                xh_min = xh8_1;
            }
            if(xh1To6 === 0){
                $('#fzhzb_'+ (changeIndex) +'_47').attr('value','0.00').val('0.00');
            }else{
                $('#fzhzb_'+ (changeIndex) +'_47').attr('value',xqy.toDecimal2((parseFloat(xh8)+parseFloat(xh_min))/xh1To6)).val(xqy.toDecimal2((parseFloat(xh8)+parseFloat(xh_min))/xh1To6));
            }
        }else{
            $('#fzhzb_'+ (changeIndex) +'_47').attr('value',"0.00").val('0.00');
        }
    },

    addRow: function(){
        var nub = parseInt($("#table_006 tr").length)-12;
        var html = $(	"		<tr>																								" +
            "		<td class='hidden'></td>                                                                            " +
            "        <td>"+ nub +"</td>                                                             " +
            "        <td class='txt-r enable'><input type='text' onfocus='this.select();'  onmouseup='this.select();' name='xmmc' id='xmmc"+ nub +"' servyou_type='string'></td>                       " +
            "		<td class='txt-r'><input type='text' id='xmbh"+ nub +"' onfocus='this.select();'  onmouseup='this.select();' servyou_type='string'></td>   " +
            "		<td id='td_yfxs"+ nub +"' class='txt-r'>                                                               " +
            "		<select id='yfxs"+nub+"' disabled='disabled' name='yfxs'>                                          " +
            "                   <option value=''></option>                                                                       " +
            "                   <option value='1'>自主研发</option>                                                      " +
            "                   <option value='2'>委托研发</option>                                                      " +
            "                   <option value='3'>合作研发</option>                                                      " +
            "                   <option value='4'>集中研发</option>                                                      " +
            "      </select>                                                                                            " +
            "		</td>                                                                                               " +
            "		<td id='td_zbhfyhzcxx"+ nub +"' class='txt-r'>                                                         " +
            "		<select id='zbhfyhzcxx"+ nub +"' disabled='disabled' name='zbhfyhzcxx'>                                                          " +
            "                   <option value=''></option>                                                                       " +
            "                   <option value='01'>资本化</option>                                                       " +
            "                   <option value='02'>费用化</option>                                                       " +
            "      </select>                                                                                             " +
            "        </td>                                                                                               " +
            "		<td id='td_xmssztxx"+ nub +"' class='txt-r'>                                                           " +
            "		<select id='xmssztxx"+ nub +"' disabled='disabled' name='xmssztxx'>                       " +
            "                   <option value=''></option>                                                                        " +
            "                   <option value='01'>未完成</option>                                                       " +
            "                   <option value='02'>已完成</option>                                                       " +
            "      </select>                                                                                             " +
            "		</td>                                                                                               " +
            "		<td id='td_wtfystfsfczglgxxx"+ nub +"' class='txt-r'>                                                  " +
            "		<select id='wtfystfsfczglgxxx"+ nub +"' disabled='disabled' name='wtfystfsfczglgxxx'>      " +
            "                   <option value=''></option>                                                                         " +
            "                   <option value='01'>存在</option>                                                         " +
            "                   <option value='02'>不存在</option>                                                         " +
            "      </select>                                                                                              " +
            "		</td>                                                                                               " +
            "        <td id='td_sfwtjwxx"+ nub +"' class='txt-r'>                                                           " +
            "        <select id='sfwtjwxx"+ nub +"' disabled='disabled' name='sfwtjwxx'>                      " +
            "                   <option value=''></option>                                                                        " +
            "                   <option value='01'>委托境内</option>                                                      " +
            "                   <option value='02'>委托境外</option>                                                      " +
            "        </select>                                                                                           " +
            "        </td>                                                                                               " +
            "		<td class='txt-r'><input onfocus='this.select();' onmouseup='this.select();' type='text' id='yfcg"+ nub +"' servyou_type='string'></td>   " +
            "		<td class='txt-r'><input onfocus='this.select();' onmouseup='this.select();' type='text' id='yfcgzsh"+ nub +"' servyou_type='string'></td>" +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_1'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_2'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_3'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_4'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_5'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_6'></td>         " +
            "       <td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_7'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_8'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_9'></td>         " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_10'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_11'></td>        " +
            "       <td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_12'></td>        " +
            "       <td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_13'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_14'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_15'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_16'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_17'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_18'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_19'></td>        " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_20'></td>        " +
            "        <td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_21'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_22'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_23'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_24'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_25'></td>    " +
            "        <td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_26'></td>    " +
            "        <td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_27'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_28'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_29'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_30'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_31'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_32'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_33'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_34'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_35'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_36'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_37'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_38'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_39'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_40'></td>    " +
            "		<td class='txt-r'><input type='text' disabled='disabled' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_41'></td>    " +
            "		<td class='txt-r'><input type='text' onfocus='this.select();' onmouseup='this.select();' value='' name='fzhzb' id='fzhzb_"+ (nub+6) +"_42'></td>        " +
            "		<td class='txt-r'><input type='text'  disabled='disabled' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_43'></td>   " +
            "		<td class='txt-r'><input type='text'  disabled='disabled' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_44'></td>   " +
            "		<td class='txt-r'><input type='text'  disabled='disabled' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_45'></td>   " +
            "		<td class='txt-r'><input type='text'  disabled='disabled' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_46'></td>   " +
            "		<td class='txt-r'><input type='text'  disabled='disabled' value='0.00' name='fzhzb' id='fzhzb_"+ (nub+6) +"_47'></td>   " +
            "       </tr>");
        $("#table_006").append(html);
        $("#td_bt").attr("rowspan",nub);
        $("#yfcg"+ nub +"").attr("disabled","disabled");
        $("#yfcgzsh"+ nub +"").attr("disabled","disabled");
        $("#xmbh"+ nub +"").attr("disabled","disabled");
        for(var i = 1;i<=47;i++){
            $("#fzhzb_"+ (nub+6) +"_"+i).attr("disabled","disabled").bind('blur',function(e){
                var id = e.target.id;
                var str = $('#'+id).val();
                if(str === ""){
                    $('#'+id).attr("value","0.00").val('0.00');
                }else{
                    $('#'+id).attr("value",xqy.toDecimal2(str)).val(xqy.toDecimal2(str));
                }
            });

        }
        // xqy.allbinding(nub);
    },
    checkTable_001:function () {
        /*若填写的资产负债表的资产合计期末数或所有者权益合计期末数为零，保存时弹出提示框“资产负债表的资产总额及所有者利润不能为零，请重新填写”。*/
        var SFJKYBNSRZCFZB = servyouReport.wsxxMap['SFJKYBNSRZCFZB'];
        if(SFJKYBNSRZCFZB === "Y"){
            var lasttrs = $("#table_001 tbody tr").last();//最后一行
            if(Number(lasttrs.find("td").eq(4).find("input").val()) === 0 ||Number(lasttrs.prev().find("td").eq(12).find("input").val()) === 0 ){
                mini.alert("《资产负债表》的资产总计期末余额和所有者权益（或股东权益）合计期末余额均不能为零，请重新填写！");
                return false;
            }
        }
        return true;
    }
};
servyouReport.setSBBS = function () {
    var hd_sbbs = this.hd.sbbs.sbb||[];
    for(var i=0,len=hd_sbbs.length;i<len;i++){
        if(this.sbzlDm === '29837' && hd_sbbs[i] === '002'){
            hd_sbbs[i] = '004';
        }
        else if(this.sbzlDm === '29837' && hd_sbbs[i] === '003'){
            hd_sbbs[i] = '005';
        }
        /*else if(hd_sbbs[i] === '004'){
            hd_sbbs[i] = '006';
        }*/
    }
    hd_sbbs = hd_sbbs.concat(this.sbIdNotFromHd);
    hd_sbbs = hd_sbbs.sort(function(x,y){
        return Number(x) - Number(y);//返回小于0，则为升序
    });
    this.initMiniTab(hd_sbbs);
    //next step
    if(this.preCondition()){
        this.chooseToGo();
    }
};
servyouReport.showSideBar = false;
/*自定义初始化*/
servyouReport.customInitLocalData = function () {
    xqy.initHd(this);
};
/*自定义事件*/
servyouReport.customEvent = function () {
    xqy.bindScrollEvent();
    xqy.bind_sfwtjwxx();
    xqy.bind_wtfystfsfczglgxxx();
    xqy.bind_xmssztxx();
    xqy.bind_yfxs();
    xqy.bind_zbhfyhzcxx();
};
servyouReport.afterInit = function () {
    // xqy.bindTable002();
    // xqy.bindTable003();
    xqy.binding();
    this.calculateAll('001');
    this.tables['002'] && this.calculateAll('002');
    // xqy.init003tr21(this);
    this.tables['003'] && this.calculateAll('003');
    this.formatAllData();
};
//预览后初始化
servyouReport.customInitAfterPreview = function () {
    $('#add-row').css('display','none');
};
servyouReport.checkTable_001 = function () {
    return xqy.checkTable_001();
};
servyouReport.checkTable_006 = function () {
    return xqy.checkTable006();
};
servyouReport.changeXml_001 = function(){
    var $trs = $('#table_001 tbody tr');
    var len = $trs.length;
    var $xml = this.getJ3Xml('001');
    var tbsj = new Date();
    $xml.find('nsrsbh').text(this.nsrData.shxydm || this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('bsrq').text(tbsj.format("yyyy-MM-dd hh:mm:ss"));
    $xml.find('skssqq').text(this.sssqq);
    $xml.find('skssqz').text(this.sssqz);
    $xml.find('bbssq').text(new Date(this.sssqz).format("yyyyMM"));
    var count = 0;
    var $sbsjxxGrid7 = $xml.find('syxqyzcfzbGrid');
    var lbClone = $sbsjxxGrid7.find('xqyzcfzbGridlb:eq(0)').clone();
    var lbClone_11 = $sbsjxxGrid7.find('xqyzcfzbGridlb:eq(11)').clone();
    var lbClone_15 = $sbsjxxGrid7.find('xqyzcfzbGridlb:eq(15)').clone();
    $sbsjxxGrid7.empty();
    for(var i=2;i<len;i++){
        var $curTr = $trs.eq(i);
        count += 1;
        if(count === 12 || (count > 18 && count < 26)){
            var newLbClone = lbClone_11.clone();
            $(newLbClone).find('ewbhxh').text(count);
            $(newLbClone).find('zcxmmc').text($curTr.find('td:eq(0)').text());
            $(newLbClone).find('qmyeZc').text(this.getInputValue($curTr.find('td:eq(4) input')));
            $(newLbClone).find('ncyeZc').text(this.getInputValue($curTr.find('td:eq(5) input')));
        }else if(count === 16){
            var newLbClone = lbClone_15.clone();
            $(newLbClone).find('ewbhxh').text(count);
            $(newLbClone).find('qyxmmc').text($curTr.find('td:eq(7)').text());
            $(newLbClone).find('qmyeQy').text(this.getInputValue($curTr.find('td:eq(12) input')));
            $(newLbClone).find('ncyeQy').text(this.getInputValue($curTr.find('td:eq(13) input')));
        }else{
            var newLbClone = lbClone.clone();
            $(newLbClone).find('ewbhxh').text(count);
            $(newLbClone).find('zcxmmc').text($curTr.find('td:eq(0)').text());
            $(newLbClone).find('qmyeZc').text(this.getInputValue($curTr.find('td:eq(4) input')));
            $(newLbClone).find('ncyeZc').text(this.getInputValue($curTr.find('td:eq(5) input')));
            $(newLbClone).find('qyxmmc').text($curTr.find('td:eq(7)').text());
            $(newLbClone).find('qmyeQy').text(this.getInputValue($curTr.find('td:eq(12) input')));
            $(newLbClone).find('ncyeQy').text(this.getInputValue($curTr.find('td:eq(13) input')));
        }
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.changeXml_002 = function(){
    var $trs = $('#table_002 tbody tr');
    var len = $trs.length;
    var tbsj = new Date();
    var $xml = this.getJ3Xml('002');
    $xml.find('nsrsbh').text(this.nsrData.shxydm || this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('bsrq').text(tbsj.format("yyyy-MM-dd hh:mm:ss"));
    $xml.find('bbssq').text(new Date(this.sssqz).format("yyyyMM"));
    var count = 0;
    var $sbsjxxGrid7 = $xml.find('syxqylrbGrid');
    var lbClone = $sbsjxxGrid7.find('syxqylrbGridlb:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for(var i=1;i<len;i++){
        var $curTr = $trs.eq(i);
        count += 1;
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewbhxh').text(count);
        $(newLbClone).find('hmc').text($curTr.find('td:eq(0)').text());
        $(newLbClone).find('bnljje').text(this.getInputValue($curTr.find('td:eq(6) input')));
        $(newLbClone).find('byje').text(this.getInputValue($curTr.find('td:eq(9) input')));
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.changeXml_003 = function(){
    var $trs = $('#table_003 tbody tr');
    var len = $trs.length;
    var tbsj = new Date();
    var $xml = this.getJ3Xml('003');
    $xml.find('nsrsbh').text(this.nsrData.shxydm || this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('bsrq').text(tbsj.format("yyyy-MM-dd"));
    $xml.find('skssqq').text(this.sssqq + " " +tbsj.format("hh:mm:ss"));
    $xml.find('skssqz').text(this.sssqz + " " +tbsj.format("hh:mm:ss"));
    var $sbsjxxGrid7 = $xml.find('xqyxjllbGrid');
    var lbClone = $sbsjxxGrid7.find('xqyxjllbGridlb:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for(var count = 1; count < 23; count++){
        var $curTr_1 = $trs.eq(count+1);
        var $curTr_2 = $trs.eq(count+2);
        var $curTr_3 = $trs.eq(count+3);
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewbhxh').text(count);
        if(count < 8 ){
            $(newLbClone).find('hmc').text($curTr_1.find('td:eq(0)').text());
            $(newLbClone).find('bnljje').text(this.getInputValue($curTr_1.find('td:eq(4) input')));
            $(newLbClone).find('byje').text(this.getInputValue($curTr_1.find('td:eq(5) input')));
        }else if(count > 7 && count < 14){
            $(newLbClone).find('hmc').text($curTr_2.find('td:eq(0)').text());
            $(newLbClone).find('bnljje').text(this.getInputValue($curTr_2.find('td:eq(4) input')));
            $(newLbClone).find('byje').text(this.getInputValue($curTr_2.find('td:eq(5) input')));
        }else{
            $(newLbClone).find('hmc').text($curTr_3.find('td:eq(0)').text());
            $(newLbClone).find('bnljje').text(this.getInputValue($curTr_3.find('td:eq(4) input')));
            $(newLbClone).find('byje').text(this.getInputValue($curTr_3.find('td:eq(5) input')));
        }
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.changeXml_004 = function(){
    var $trs = $('#table_004 tbody tr');
    var len = $trs.length;
    var tbsj = new Date();
    var $xml = this.getJ3Xml('004');
    $xml.find('nsrsbh').text(this.nsrData.shxydm || this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('bsrq').text(tbsj.format("yyyy-MM-dd hh:mm:ss"));
    $xml.find('bbssq').text(new Date(this.sssqz).format('yyyyMM'));
    var count = 0;
    var $sbsjxxGrid7 = $xml.find('syxqylrbnbGrid');
    var lbClone = $sbsjxxGrid7.find('xqylrbnbGridlb:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for(var i=1;i<len;i++){
        var $curTr = $trs.eq(i);
        count += 1;
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewbhxh').text(count);
        $(newLbClone).find('hmc').text($curTr.find('td:eq(0)').text());
        $(newLbClone).find('bnljje').text(this.getInputValue($curTr.find('td:eq(6) input')));
        $(newLbClone).find('snje').text(this.getInputValue($curTr.find('td:eq(9) input')));
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.changeXml_005 = function(){
    var $trs = $('#table_005 tbody tr');
    var len = $trs.length;
    var tbsj = new Date();
    var $xml = this.getJ3Xml('005');
    $xml.find('nsrsbh').text(this.nsrData.shxydm || this.nsrsbh);
    $xml.find('nsrmc').text(this.nsrmc);
    $xml.find('bsrq').text(tbsj.format("yyyy-MM-dd hh:mm:ss"));
    $xml.find('skssqq').text(this.sssqq + " " +tbsj.format("hh:mm:ss"));
    $xml.find('skssqz').text(this.sssqz + " " +tbsj.format("hh:mm:ss"));
    var $sbsjxxGrid7 = $xml.find('xqyxjllbnGrid');
    var lbClone = $sbsjxxGrid7.find('xqyxjllbnGridlb:eq(0)').clone();
    $sbsjxxGrid7.empty();
    for(var count = 1; count < 23; count++){
        var $curTr_1 = $trs.eq(count+1);
        var $curTr_2 = $trs.eq(count+2);
        var $curTr_3 = $trs.eq(count+3);
        var newLbClone = lbClone.clone();
        $(newLbClone).find('ewbhxh').text(count);
        if(count < 8 ){
            $(newLbClone).find('hmc').text($curTr_1.find('td:eq(0)').text());
            $(newLbClone).find('bnljje').text(this.getInputValue($curTr_1.find('td:eq(4) input')));
            $(newLbClone).find('snje').text(this.getInputValue($curTr_1.find('td:eq(5) input')));
        }else if(count > 7 && count < 14){
            $(newLbClone).find('hmc').text($curTr_2.find('td:eq(0)').text());
            $(newLbClone).find('bnljje').text(this.getInputValue($curTr_2.find('td:eq(4) input')));
            $(newLbClone).find('snje').text(this.getInputValue($curTr_2.find('td:eq(5) input')));
        }else{
            $(newLbClone).find('hmc').text($curTr_3.find('td:eq(0)').text());
            $(newLbClone).find('bnljje').text(this.getInputValue($curTr_3.find('td:eq(4) input')));
            $(newLbClone).find('snje').text(this.getInputValue($curTr_3.find('td:eq(5) input')));
        }
        $sbsjxxGrid7.append(newLbClone);
    }
    return $xml;
};
servyouReport.changeXml_006 = function(){
    var $trs = $('#table_006 tbody tr');
    var len = $trs.length;
    var $xml = this.getJ3Xml('006');
    var count = 0;
    var $sbsjxxGrid7 = $xml.find('yfzcfzzhzbGrid');
    var lbClone = $sbsjxxGrid7.find('yfzcfzzhzbGridlb:eq(0)').clone();
    var lbClone_add = $sbsjxxGrid7.find('yfzcfzzhzbGridlb:eq(6)').clone();
    $sbsjxxGrid7.empty();
    for(var i=4;i<len;i++){
        var $curTr = $trs.eq(i);
        count += 1;
        if(count < 7){
            var newLbClone = lbClone.clone();
            $(newLbClone).find('ewbhxh').text(count);
            for(var j = 1; j < 10; j++){
                $(newLbClone).find('f00'+j).text($curTr.find('td').eq(j+10).children("input").val());
            }
            for(var k = 10; k < 46; k++){
                $(newLbClone).find('f0'+k).text($curTr.find('td').eq(k+10).children("input").val());
            }
            $(newLbClone).find('f046').text('0.00');
            $(newLbClone).find('f047').text('0.00');
            $sbsjxxGrid7.append(newLbClone);
        }else if(!!this.getInputValue($curTr.find('td:eq(2) input'))) {
            var newLbClone_add = lbClone_add.clone();
            var num = count-6;
            for(var j = 1; j < 10; j++){
                $(newLbClone_add).find('f00'+j).text($curTr.find('td').eq(j+10).children("input").val());
            }
            for(var k = 10; k < 48; k++){
                $(newLbClone_add).find('f0'+k).text($curTr.find('td').eq(k+10).children("input").val());
            }
            $(newLbClone_add).find('xmmc').text(this.getInputValue($curTr.find('td:eq(2) input')));
            $(newLbClone_add).find('xmbh').text(this.getInputValue($curTr.find('td:eq(3) input')));
            $(newLbClone_add).find('yfxs').text($("#yfxs"+num).val());
            $(newLbClone_add).find('zbhfyhzcxx').text($("#zbhfyhzcxx"+num).val());
            $(newLbClone_add).find('xmssztxx').text($("#xmssztxx"+num).val());
            $(newLbClone_add).find('wtfystfsfczglgxxx').text($("#wtfystfsfczglgxxx"+num).val());
            $(newLbClone_add).find('sfwtjwxx').text($("#sfwtjwxx"+num).val());
            $(newLbClone_add).find('yfcg').text(this.getInputValue($curTr.find('td:eq(9) input')));
            $(newLbClone_add).find('yfcgzsh').text(this.getInputValue($curTr.find('td:eq(10) input')));
            $sbsjxxGrid7.append(newLbClone_add);
        }
    }
    return $xml;
};
servyouReport.customResumeFromXml_001 = function (){
    var $trs = $('#table_001 tbody tr');
    $(this.j3CorrectXml).find('syxqyzcfzb syxqyzcfzbGrid xqyzcfzbGridlb').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        !!$(this).find('qmyeZc').length && servyouReport.setTargetVal($trs.eq(ewbhxh+1).find('td:eq(4) input'),$(this).find('qmyeZc').text());
        !!$(this).find('ncyeZc').length && servyouReport.setTargetVal($trs.eq(ewbhxh+1).find('td:eq(5) input'),$(this).find('ncyeZc').text());
        !!$(this).find('qmyeQy').length && servyouReport.setTargetVal($trs.eq(ewbhxh+1).find('td:eq(12) input'),$(this).find('qmyeQy').text());
        !!$(this).find('ncyeQy').length && servyouReport.setTargetVal($trs.eq(ewbhxh+1).find('td:eq(13) input'),$(this).find('ncyeQy').text());
    });
};
servyouReport.customResumeFromXml_002 = function (){
    var $trs = $('#table_002 tbody tr');
    $(this.j3CorrectXml).find('syxqylrb syxqylrbGrid syxqylrbGridlb').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        servyouReport.setTargetVal($trs.eq(ewbhxh).find('td:eq(6) input'),$(this).find('bnljje').text());
        servyouReport.setTargetVal($trs.eq(ewbhxh).find('td:eq(9) input'),$(this).find('byje').text());
    });
};
servyouReport.customResumeFromXml_003 = function (){
    var $trs = $('#table_003 tbody tr');
    var $curTr;
    $(this.j3CorrectXml).find('syxqyxjllb xqyxjllbGrid xqyxjllbGridlb').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        if(ewbhxh < 8 ){
            $curTr = $trs.eq(ewbhxh + 1);
        }else if(ewbhxh > 7 && ewbhxh < 14){
            $curTr = $trs.eq(ewbhxh + 2);
        }else{
            $curTr = $trs.eq(ewbhxh + 3);
        }
        servyouReport.setTargetVal($curTr.find('td:eq(4) input'),$(this).find('bnljje').text());
        servyouReport.setTargetVal($curTr.find('td:eq(5) input'),$(this).find('byje').text());
    });
};
servyouReport.customResumeFromXml_004 = function (){
    var $trs = $('#table_004 tbody tr');
    $(this.j3CorrectXml).find('xqylrbnb syxqylrbnbGrid xqylrbnbGridlb').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        servyouReport.setTargetVal($trs.eq(ewbhxh).find('td:eq(6) input'),$(this).find('bnljje').text());
        servyouReport.setTargetVal($trs.eq(ewbhxh).find('td:eq(9) input'),$(this).find('snje').text());
    });
};
servyouReport.customResumeFromXml_005 = function (){
    var $trs = $('#table_005 tbody tr');
    var $curTr;
    $(this.j3CorrectXml).find('syxqyxjllbnb xqyxjllbnGrid xqyxjllbnGridlb').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        if(ewbhxh < 8 ){
            $curTr = $trs.eq(ewbhxh + 1);
        }else if(ewbhxh > 7 && ewbhxh < 14){
            $curTr = $trs.eq(ewbhxh + 2);
        }else{
            $curTr = $trs.eq(ewbhxh + 3);
        }
        servyouReport.setTargetVal($curTr.find('td:eq(4) input'),$(this).find('bnljje').text());
        servyouReport.setTargetVal($curTr.find('td:eq(5) input'),$(this).find('snje').text());
    });
};
servyouReport.customResumeFromXml_006 = function (){
    var $trs = $('#table_006 tbody tr');
    $('tr.border-top-10').find('input[name="xmmc"]').val('').attr('value','').change();
    $("#td_bt").attr("rowspan", 1);
    var row1Index = $('tr.border-top-10').index();
    for (var i = row1Index+1; i < $trs.length; i++){
        $trs.eq(i).remove()
    }
    var xmmxCount = 0;
    var $curTr;
    $(this.j3CorrectXml).find('yfzcfzzhzbVO yfzcfzzhzbGrid yfzcfzzhzbGridlb').each(function () {
        var ewbhxh = Number($(this).find('ewbhxh').text());
        if (ewbhxh && ewbhxh <= 6){
            $curTr = $trs.eq(ewbhxh + 3);
            for (var j = 1; j < 10; j++) {
                servyouReport.setTargetVal($curTr.find('td:eq('+(j+10)+') input'),$(this).find('f00'+j).text());
            }
            for (var k = 10; k < 48; k++) {
                servyouReport.setTargetVal($curTr.find('td:eq('+(k+10)+') input'),$(this).find('f0'+k).text());
            }
        } else if (!ewbhxh){
            xmmxCount += 1;
            if (xmmxCount > 1){
                xqy.addRow();
            }
            $curTr = $('#table_006 tbody tr').eq(xmmxCount + 9);
            for (var j = 1; j < 10; j++) {
                servyouReport.setTargetVal($curTr.find('td:eq('+(j+10)+') input'),$(this).find('f00'+j).text());
            }
            for (var k = 10; k < 48; k++) {
                servyouReport.setTargetVal($curTr.find('td:eq('+(k+10)+') input'),$(this).find('f0'+k).text());
            }
            servyouReport.setTargetVal($curTr.find('td:eq(2) input'),$(this).find('xmmc').text());
            servyouReport.setTargetVal($curTr.find('td:eq(3) input'),$(this).find('xmbh').text());
            servyouReport.setTargetVal($curTr.find('td:eq(4) select'),$(this).find('yfxs').text());
            servyouReport.setTargetVal($curTr.find('td:eq(5) select'),$(this).find('zbhfyhzcxx').text());
            servyouReport.setTargetVal($curTr.find('td:eq(6) select'),$(this).find('xmssztxx').text());
            servyouReport.setTargetVal($curTr.find('td:eq(7) select'),$(this).find('wtfystfsfczglgxxx').text());
            servyouReport.setTargetVal($curTr.find('td:eq(8) select'),$(this).find('sfwtjwxx').text());
            servyouReport.setTargetVal($curTr.find('td:eq(9) input'),$(this).find('yfcg').text());
            servyouReport.setTargetVal($curTr.find('td:eq(10) input'),$(this).find('yfcgzsh').text());
        }
    });
};
servyouReport.removeReportBtnById('excelImport');
servyouReport.customReportBtns = function () {
    var _this = this;
    this.reportBtns.unshift({
        id: 'sb_data_import',
        cls: 'btn btn-blue',
        text: '转换导入',
        callback: function () {
            _this.openDataImportPage();
        },
        whenToShow: 'report,correct,past,overdue'
    });
};

servyouReport.openDataImportPage=function () {
    var _this=this;
    if(Tools.isIE()){
        mini.open({
            url: '/sbzx-web/apps/views/cwbbCallOcx/ocx-download.html',
            width: 1000,
            height: 500,
            showModal: true,
            currentWindow:true,
            allowResize: false,
            showMaxButton:true
        });
        $(".mini-window").addClass("fixedWindowTop0");
    }else{
        mini.open({
            url: servyouReport.cwbbToolsUrl+'?djxh='+_this.djxh+'&nsrsbh='+_this.nsrsbh+'&declareType='+_this.hd.sbzlcode+'&startTime='+_this.sssqq+'&endTime='+_this.sssqz+'&companyName='+_this.nsrmc,
            width: 1000,
            height: 500,
            showModal: true,
            currentWindow:true,
            allowResize: false,
            showMaxButton:true
        });
        $(".mini-window").addClass("fixedWindowTop0");
    }
};


servyouReport.preCondition=function () {
    if(this.wsxxMap['CWBBYSBBZ']=='1'&&Tools.getUrlParamByName('CEF')!=='Y'){
        mini.showMessageBox({
            width: 550,
            title : '选择【是】将继续申报；选择【否】将退出申报。',
            buttons: ['是','否'],
            message:"您已经进行了该属期的资料表单报送，是否作废该属期的财务报表？",
            callback: function(action){
                if(action == '是'){
                    servyouReport.chooseToGo();
                }
                if(action == '否'){
                    window_close();
                }
            }
        });
    }else{
        return true;
    }
};

servyouReport.checkHd=function (messageid) {
    //判断是否有核定
    if (!this.hd) {
        return false;
    }
    if(messageid) mini.hideMessageBox(messageid);
    this._setWsxxAndLsxxMap(this.hd);
    if(this.wsxxMap['SFCWBBBA']=='0'&&Tools.getUrlParamByName('CEF')!=='Y'){
        mini.showMessageBox({
            width: 550,
            title : '选择【是】将进行备案，【否】将继续申报。',
            buttons: ['是','否'],
            message:"尊敬的纳税人，您未进行财务会计制度备案，请先到财务会计制度备案功能模块中备案后，再进行此申报表报送操作。是否立即备案？",
            callback: function(action){
                if(action == '是'){
                    window.location.href=servyouReport.cwbaUrl||"/wszx-web/apps/views/cwkjzdba/cwkjzdba.html";
                }
                if(action == '否'){
                    servyouReport.setCommonData();
                    servyouReport.setSBBS();
                }
            }
        });
    }else{
        return true;
    }
    return false;
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
            }
            if(that.sbzlDm === '29837' && sb_id === '004'){
                sb_id = '002';
            }
            if(that.sbzlDm === '29837' && sb_id === '005'){
                sb_id = '003';
            }
            /*if(sb_id === '006'){
                sb_id = '004';
            }*/
            obj['bbwjm'] = that.sbzlDm+'_'+sb_id+'.xml';
            obj['bbxml'] = bbxml;
            j3Xmls.push(obj);
        }
    });
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
    if(this.checkSubmitTime() && sbcommon.sbtj_normal(request)){
        $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh,new Date().getTime());
        parent.window.location.href = this.successUrl;
    }
};


$(function(){
    //servyouReport.run()
    servyouReport.init();
    if(Tools.getUrlParamByName('CEF')==='Y'){
        if(Tools.getUrlParamByName('SBNY').length<4){
            servyouReport.openDataImportPage();//如果是不用选择属期的，直接打开导入工具
        }
        external.SyncCallFun('core.loadResult', 1);
    }
});
servyouReport.SBNY='';//用来微端里自动选择属期

servyouReport.showSideBar=true;
servyouReport.reportTipUrl='../cwbbCallOcx/reportTip.html';

/**
 * Created by chenjunj on 2018/5/14 11:30.
 */
servyouReport.customInitLocalData = function () {
    xqy.initHd(this);
    if(this.hd.ysbbbz === 'Y'){
        mini.confirm('您本期的财务报表申报已完成，是否需要重新申报？', '提示', function (action) {
            if(action !== 'ok'){
                servyouReport.closeWindow();
            }
        });
    }
};
/**
 * 覆写取核定部分--用以支持往期申报
 * */
servyouReport.setHd = function () {
    var _this = this;
    //匹配金三报文节点上的属性以及最前面的xml节点
    var xmlReg = /((<\?xml[^<]*)|(([a-zA-Z0-9:]+)(="[^"]*")+)|(\s{2,}))/g;
    if (this.mock) {
        if(this.businessType === 'correct'){
            var correctData = this.getLocalJson('config/correct.json');//模拟更正申报
            this.pzxh = correctData.pzxh;
            this.j3CorrectXml = xmlUtil.turnStrToXml(correctData.sbxx.replace(xmlReg,''));
            this.hd = hdxxUtil.getSbzlNode(correctData.hdxx);
        }else{
            this.hd = this.getLocalJson(this.mockApi['hd']);
        }
    } else if (this.businessType === 'correct') {
        var gzxx = mini.decode(store.getSession('gzxx') || Api.getWdFormValue('gzxx'));
        if(!gzxx){
            mini.alert('请从<a href="../gzsbcx/gzsbcx.html">更正申报查询</a>页面进行您的更正操作！','提示', function () {
                window.location.href = '../gzsbcx/gzsbcx.html';
            });
            return ;
        }
        this.pzxh = gzxx.pzxh;
        mini.mask('更正数据查询中...');
        var correctData = sbcommon.getCorrectData(gzxx);
        mini.unmask();
        if(!correctData || !correctData.sbxx || !correctData.hdxx){
            // mini.alert('查询更正数据出错，请联系运维人员！');
            return ;
        }
        this.j3CorrectXml = xmlUtil.turnStrToXml(correctData.sbxx.replace(xmlReg,''));
        this.hd = hdxxUtil.getSbzlNode(correctData.hdxx);
    } else {
        var sbzlDm = Tools.getUrlParamByName('sbzlDm');
        if (sbzlDm !== '29837'){
            var sbzlDm_year = ['29837','29840','29843','29876','29880','29810','29808','29809','29811','29812','29883'];
            var isYear = sbzlDm_year.indexOf(sbzlDm) !== -1;
            var pickMsg = isYear?'所属年份':'申报所属期';
            var pickDom = '<input id="sbny" '+(isYear?'class="mini-yearpicker" format="yyyy" ':'class="mini-monthpicker" format="yyyyMM" ')+' >';
            var messageid = mini.showMessageBox({
                width: 300,
                height: 210,
                title: '请选择',
                message: '<div>请选择'+pickMsg+'：'+pickDom+'</div>' +
                    '<div class="btn-group"><a class="btn btn-blue" id="sbny-ok">确定</a></div> ',
                callback: function (action) {
                    _this.closeWindow();
                }
            });
            $('#sbny-ok').click(function () {
                var today = new Date();
                var sbny = mini.get('sbny').getText();
                if(!sbny){
                    mini.alert('请选'+pickMsg+'！');
                    return ;
                }
                if(isYear && Number(sbny) >= today.getFullYear()){
                    mini.alert('所属年份不能大于等于当前年份！');
                    return;
                }
                // if(!isYear && new Date(Number(sbny.substring(0,4)),Number(sbny.substring(4,6))-1,1).getTime() >= today.getFirstDateOfMonth().getTime()){
                //     mini.alert('申报年月不能大于等于当前年月！');
                //     return;
                // }

                servyouReport.SBNY=sbny;//用来微端里自动选择属期
                if(isYear){
                    sbny += '01';
                }
                _this.hd = sbcommon.getHdBySbzlDm(sbzlDm, sbny, true);
                //next step
                if(_this.checkHd(messageid)){
                    mini.hideMessageBox(messageid);
                    _this.setCommonData();
                    _this.setSBBS();
                    if(Tools.getUrlParamByName('CEF')==='Y'){
                        /*微端里自动打开账务报表导入*/
                        servyouReport.openDataImportPage();
                    }
                }
            });
            mini.parse(messageid);
            if(Tools.getUrlParamByName('CEF')==='Y'&&Tools.getUrlParamByName('SBNY').length>4){
                /*微端里自动选择属期*/
                mini.get("sbny").setValue(Tools.getUrlParamByName('SBNY'));
                $('#sbny-ok').click();
            }


            return ;
        } else {
            this.hd = hdxxUtil.getSbzlNode();
        }
    }
    //next step
    if(this.checkHd()){
        this.setCommonData();
        this.setSBBS();
    }
};