/*
*  Created by lcn on 2018/5/23
*/

/*/sbzx-web/api/baseCode/get/dsJmxxZsxm/21108
*/
var test = window.location.pathname + window.location.search;
hdxxUtil.hdxxUrl = "../../../api/sb/tyqc/hdxx.ashx?url="+test;
var tysbb = {
    isInit: true,
    msJmxz: ['0005129999','0005011709','0005099901','0005129908','0005011802','0005011801'],
    // // 验证是否为日期
    // isDate:function (text) {
    //     var newDate = new Date(text).format('yyyy-MM-dd');
    //     if(newDate !== text){
    //         return false;
    //     }else{
    //         return true;
    //     }
    // },
    getYjse:function(zspmdm){
        var yjse="0";
        var zspmList=servyouReport.hd.zspms.zspmList;
        $.each(zspmList,function (i,v) {
            if(v.zspmdm===zspmdm){
                yjse=v.yjse;
                return false;
            }
        });
        return yjse;
    },
    html: {
        zsxm: "<option value=''>--请选择--</option>"
    },
    htmlOnlyN: {
        zsxm: "<option value=''>--请选择--</option>"
    },
    //存储已经请求过的，减少请求
    jmxxSelect: {},
    jmxxDm: [],
    customInit: function () {
        this.initTable();
    },
    getSelectHtml: function () {
        var that = this;
        var zsxmArr = [];
        /*去重需要优先保留税费种认定的 by liun*/
        if(servyouReport.hd.sbxxGrid && servyouReport.hd.sbxxGrid.sbxxGridlb){
            $.each(servyouReport.hd.sbxxGrid.sbxxGridlb, function (i, v) {
                if ($.inArray(v.zsxmDm,zsxmArr) === -1){
                    that.html.zsxm += "<option value='" + v.zsxmDm + "' skssqq='" + v.skssqq + "' skssqz='" + v.skssqz + "' yssdl='" + v.yssdl + "' sl='" + v.sl + "' yjse1='" + (v.yjse||0) + "' qzd='"+ v.qzd +"'>" + v.zsxmMc + "</option>";
                    zsxmArr.push(v.zsxmDm);
                }
            });
        }
        // $.each(servyouReport.hd.sbxxGrid.sbxxGridlb, function (i, v) {
        //     if(v.sfsfzrd==="Y"){
        //         if ($.inArray(v.zsxmDm+'-'+v.skssqq+'-'+v.skssqz,zsxmArr) === -1){
        //             that.html.zsxm += "<option value='" + v.zsxmDm + "' skssqq='" + v.skssqq + "' skssqz='" + v.skssqz + "' yssdl='" + v.yssdl + "' sl='" + v.sl + "' yjse1='" + (v.yjse||0) + "' qzd='"+ v.qzd +"'>" + v.zsxmMc + "</option>";
        //             zsxmArr.push(v.zsxmDm+'-'+v.skssqq+'-'+v.skssqz);
        //         }
        //     }
        // });
    },
    getjmxx: function (zsxm) {
        var data = [];
        if (this.jmxxSelect[zsxm]) {
            return this.jmxxSelect[zsxm];
        }

        // $.get("/sbzx-web/api/baseCode/get/dsJmxxZsxm/" + zsxm, function (e) {
        //     data = e;
        // });

        var html = "<option value=''>--请选择--</option>";
        $.each(servyouReport.hd.jmxx, function (i, v) {
            if (v.zsxmDm === zsxm){
                html += "<option value='" + v.ssjmxzhzDm + "' title='"+ v.ssjmxzhzDm + "|" + v.swsxMc +"|" + v.jmxzMc + "'>"+ v.ssjmxzhzDm + "|" + v.swsxMc +"|" + v.jmxzMc + "</option>"
            }
        });
        this.jmxxSelect[zsxm] = html;
        return html;
    },
    bindEvent: function () {
        //增加行
        $("#table_001").on("click", ".addrow", function (e) {
            tysbb.addrow();
        });
        //删除行
        $('#table_001').on('click','.del-btn',function () {
            var $row = $($(this).parents('tr')[0]).next();
           $($(this).parents('tr')[0]).remove();
            var $trs = $('#table_001').find('tr');
            var rowIndex = $trs.index($row);
            servyouReport.deleteRow('001',rowIndex);
            servyouReport.calculateAll('001');
        });
        $("#table_001").on("change.afterCalculate", ".bqynsfe7", function (e) {
            // 本期应纳税（费）额（7=4*5-6）  不等于0 的时候，才可以填写，减免性质
            var $input = $(this).find("input");
            var $select = $input.parent().nextAll().eq(1).find("select");   //减免性质下拉框
            var zspmDm = $input.parent().parent().find('td:eq(1) select').val() || $input.parent().parent().find('td:eq(1) input').attr('zspm_dm');
            if (Number($input.val()) !== 0) {
                $select.removeAttr("disabled").change().blur();
                if (zspmDm === '101110501'){
                    $select.find('option[value="0009129907"]').addClass('hidden');
                    $select.find('option[value="0009129906"]').removeClass('hidden');
                    $select.val('0009129906').change().blur();
                    $select.parent().prev().find('input').val(Number($input.val()) * 0.5).blur();
                }
            } else {
                $select.val("").attr("disabled", "disabled").change().blur();
            }
        });
        //减免性质修改
        $("#table_001").on("change", "[name='jmxz']", function (e) {
            var that = this;
            if (this.value) {
                // if (tysbb.jmxxDm.indexOf(this.value) > -1) {
                $(this).parent().prev().find("input").removeAttr("disabled");
                if (tysbb.msJmxz.indexOf(this.value) > -1){
                    $(this).parent().prev().find("input").val($(this).parent().prev().prev().find('input').val()).blur();
                    return;
                }
                if (!(servyouReport.businessType === 'correct' && tysbb.isInit)){
                    $(this).parent().prev().find("input").val(0).blur();
                }
                // } else {
                //     mini.confirm('所选择的税收减免性质没有进行税收减免备案。','提示(点击“确定”继续选择所选项，点击“取消”按钮取消所选项)',function (action) {
                //         if (action === 'cancel'){
                //             $(that).val('').change().blur();
                //         }
                //     });
                // }
            } else {
                $(this).parent().prev().find("input").attr("disabled", "disabled").val(0).blur();
            }
        });
        //是否分摊切换
        $("#table_001").on("change", "[name='sfft']", function (e) {
            //选择否
            var date1 = mini.get("date1");
            var date2 = mini.get("date2");
            if ($("[name='sfft']:checked").val() === "1") {
                date1.setValue("");
                date2.setValue("");
                date1.enable();
                $(date1.el).parent().addClass('enable');

                date2.enable();
                $(date2.el).parent().addClass('enable');

            } else {
                var time = mini.formatDate(new Date(), "yyyy-MM-dd");
                date1.setValue(time);
                date2.setValue(time);
                date1.disable();
                $(date1.el).parent().removeClass('enable');
                date2.disable();
                $(date2.el).parent().removeClass('enable');

            }
        });
        //征收项目修改
        $("#table_001").on("change", "[name='zsxm']", function (e) {
            tysbb.zsxmChange(this,e);
        });
        //征收品目修改
        //选择增值税项目 3. 新增行次时，不能选择增值税项目，如果选择了增值税项目那么提示“非自然人不允许申报'不动产融资租赁（11%、5%）','不动产经营租赁（11%、5%）！”
        $("#table_001").on("change", "[name='zspm']", function (e) {
            tysbb.zspmChange(this);
        });
        //征收子目修改
        $("#table_001").on("change", "[name='zszm']", function (e) {
            tysbb.zszmChange(this);
        });
        //应税项修改
        $('#table_001').on('blur','input[name="ysx"]',function () {
            var $curTr = $(this).parent().parent();
            var zspmDm = $curTr.find('select[name="zspm"]').val() || $curTr.find('td:eq(1) input').attr('zspm_dm');
            var qzd = $curTr.find('select[name="zspm"] option:selected').attr('qzd') || $curTr.find('td:eq(1) input').attr('qzd');
            var bqynse = Number($curTr.find('td:eq(10) input').val());
            var ysx = Number($curTr.find('td:eq(5) input').val());
            if (!!zspmDm && (zspmDm.substr(0,7) === '1010602' || zspmDm.substr(0,7) === '1010603')){
                if (ysx <= qzd && bqynse > 0){
                    $curTr.find('td:eq(12) input').val(bqynse).blur();
                    $curTr.find('td:eq(13) select').val('0004129999').change().blur();
                }
            }
        });
        //计费依据修改
        $('#table_001').on('change.afterCalculate','input[name="jfyj"]',function () {
            var $curTr = $(this).parent().parent();
            var zspmDm = $curTr.find('select[name="zspm"]').val() || $curTr.find('td:eq(1) input').attr('zspm_dm');
            var jsbz = $curTr.find('select[name="zspm"] option:selected').attr('jsbz') || $curTr.find('td:eq(1) input').attr('jsbz');
            var jfyj = $(this).val();
            if (!!zspmDm && (zspmDm.substr(0,7) === '1010602' || zspmDm.substr(0,7) === '1010603') && jsbz === '2'){
                var req = {
                    skssqq: $curTr.find('td:eq(3) input').val(),
                    skssqz: $curTr.find('td:eq(4) input').val(),
                    djxh: servyouReport.djxh,
                    zspmdm: zspmDm.substr(0,7),
                    jsyj: jfyj
                };
                var result = Api.getData('/sbzx-web/api/sb/tyqc/cxsskcs',req,'post',false);
                if (!!result){
                    $curTr.find('td:eq(9) input').val(result.sl).blur();
                    $curTr.find('td:eq(10) input').val(result.sskcs).blur();
                }
            }
        });

        //租赁期验证
        mini.get("date1").on("valuechanged",function () {
            var d1=new Date(mini.get("date1").text.replace(/\-/g, "\/"));
            var d2=new Date(mini.get("date2").text.replace(/\-/g, "\/"));
            if(!!d2&&d2<d1){
                mini.alert("其他个人出租不动产租赁期止必须大于等于其他个人出租不动产租赁期起！");
                mini.get("date1").setValue("");
            }
        });

        mini.get("date2").on("valuechanged",function () {
            var d1=new Date(mini.get("date1").text.replace(/\-/g, "\/"));
            var d2=new Date(mini.get("date2").text.replace(/\-/g, "\/"));
            if(!!d1&&d2<d1){
                mini.alert("其他个人出租不动产租赁期止必须大于等于其他个人出租不动产租赁期起！");
                mini.get("date2").setValue("");
            }
        });

    },



    zsxmChange: function (_this,e) {
        var nextAll = $(_this).parent().nextAll();
        if (_this.value) {
            //修改减免性质列表
            if($(_this).find("option:selected").text()==="增值税"){
                $(_this).val("").change();
                mini.alert("非自然人不允许申报'不动产融资租赁（11%、5%）','不动产经营租赁（11%、5%）！");
            }else{
                nextAll.eq("12").find("select").html(tysbb.getjmxx(_this.value));
                //  检查是否有征收品目 有的话修改征收品目下拉框 没有则直接放开后面的输入 同时清空征收品目和子目
                var zspmHtml = tysbb.getzspmHtml(_this.value);
                if (zspmHtml) {
                    nextAll.eq(0).find("select").html(zspmHtml).removeAttr("disabled").blur().change();
                } else {
                    nextAll.eq(0).find("select").html("<option value=''>--</option>").change().attr("disabled", "disabled").blur();
                    nextAll.eq(1).find("select").html("<option value=''>--</option>").change().attr("disabled", "disabled").blur();
                    //应为没有所以下两级 ，所以直接放开后面要填写的  ,相当于触发了征收子目
                    tysbb.zszmChange(_this);
                    //修改税款所属期
                    var data = $(_this).find("option:checked");
                    nextAll.eq(2).find("input").val(data.attr("skssqq")).blur();
                    nextAll.eq(3).find("input").val(data.attr("skssqz")).blur();
                    nextAll.eq(6).find("input").val(data.attr("yssdl")).blur();   //应税所得率
                }
                // nextAll.eq(8).find("input").val(data.attr("sl")=="null"?"":data.attr("sl"));     //税（费）率或单位税额（5）
            }

        } else {
            if (nextAll.eq(0).find("option").length === 1) {
                tysbb.zszmChange(_this);
            } else {
                nextAll.eq(0).find("select").val("").html("<option value=''>--请选择--</option>").change().attr("disabled", "disabled").blur();
            }
            //清空设置的值
            nextAll.eq(2).find("input").val("").blur();
            nextAll.eq(3).find("input").val("").blur();
            nextAll.eq(6).find("input").val("").blur();    //应税所得率
            nextAll.eq(8).find("input").val("").blur();    //税（费）率或单位税额（5）
        }
    },
    //征收品目改变
    zspmChange: function (_this) {
        var nextAll = $(_this).parent().nextAll();
        if (_this.value) {
            var zspmNo = ["101016606", "101016604"];
            var zspmDt = ["101110400","101110599"];
            if (zspmNo.indexOf(_this.value) > -1) {
                mini.alert("非自然人不允许申报'不动产融资租赁（11%、5%）','不动产经营租赁（11%、5%）！");
                $(_this).val("").change();
            } else {
                var data = $(_this).find("option:checked");
                nextAll.eq(7).find("input").val(data.attr("sl")=="null"?"":data.attr("sl")).blur();
                nextAll.eq(8).find("input").val(data.attr("sskcs")=="null"?"":data.attr("sskcs")).blur();
                var zsxm = $(_this).parent().prev().find("select").val();
                var zspmHtml = tysbb.getzszmHtml(zsxm, _this.value);
                if (zspmHtml) {
                    nextAll.eq(0).find("select").html(zspmHtml).removeAttr("disabled").change();
                } else {
                    //禁用征收子目
                    nextAll.eq(0).find("select").html("<option value=''>--</option>").change().attr("disabled", "disabled").blur();
                    tysbb.zszmChange(_this);
                }
                //修改税款所属期
                nextAll.eq(1).find("input").val(data.attr("skssqq")).blur();
                nextAll.eq(2).find("input").val(data.attr("skssqz")).blur();
                nextAll.eq(5).find("input").val(data.attr("yssdl")).blur();   //应税所得率
            }
        } else {
            nextAll.eq(7).find("input").val('').blur();  //征收品目置空时，第5列税（费）率或单位税额置空
            nextAll.eq(8).find("input").val('').blur();  //征收品目置空时，第6列速算扣除数置空
            if (nextAll.eq(0).find("option").length === 1) {
                tysbb.zszmChange(_this);
            } else {
                nextAll.eq(0).find("select").val("").html("<option value=''>--请选择--</option>").change().attr("disabled", "disabled").blur();
            }
        }
    },
    //征收子目改变
    zszmChange: function (_this) {
        var $curTr = $(_this).parent().parent();
        var $inputs = $(_this).parent().nextAll().find("input").not("[neverEdit=true]");
        if (_this.value) {
            $inputs.removeAttr("disabled");
            $curTr.find('td:eq(9) input').val($curTr.find('td:eq(2) select').find('option:selected').attr('sl')).blur();
        } else {
            $inputs.val("").attr("disabled", "disabled").blur();
            $curTr.find('td:eq(9) input').val($curTr.find('td:eq(1) select').find('option:selected').attr('sl') || 0).blur();
        }
    },
    getzspmHtml: function (zsxm) {
        var zspmdmArr = [];
        var zspm = "<option value=''>--请选择--</option>";
        $.each(this.getData(zsxm, ""), function (i, v) {
            // if (!(zsxm === '10106' && v.zspmDm.substr(0,7) !== '1010602' && v.zspmDm.substr(0,7) !== '1010603')){
            if (!!v.zspmDm && $.inArray(v.zspmDm,zspmdmArr) < 0){
                zspmdmArr.push(v.zspmDm);
                zspm += "<option value='" + v.zspmDm + "' skssqq='"+v.skssqq+"' skssqz='"+v.skssqz+"' yssdl='"+v.yssdl+"' qzd='"+v.qzd+"' sl='"+(v.sl || 0)+"' sskcs='"+ v.sskcs +"' jsbz='"+v.jsbz+"'>" + v.zspmMc + "</option>"
            }
            // }
        });
        if (zspm.length < 40) {
            return false;
        }
        return zspm;
    },
    getzszmHtml: function (zsxm, zspm) {
        var zszmdmArr = [];
        var zszm = "<option value=''>--请选择--</option>";
        $.each(this.getData(zsxm, zspm), function (i, v) {
            if (!!v.zszmDm && $.inArray(v.zszmDm,zszmdmArr) < 0){
                zszmdmArr.push(v.zszmDm);
                zszm += "<option value='" + v.zszmDm + "' sl='"+(!!v.sl1 ? v.sl1 : 0)+"'>" + v.zszmMc + "</option>"
            }
        });
        if (zszm.length < 40) {
            return false;
        }
        return zszm;
    },
    //根据征收项目征收品目获取,征收品目，征收子目
    getData: function (zsxm, zspm) {
        var data = [];
        if (!!servyouReport.hd.sbxxGrid && !!servyouReport.hd.sbxxGrid.sbxxGridlb){
            $.each(servyouReport.hd.sbxxGrid.sbxxGridlb, function (i, v) {
                // if (v.sfsfzrd === "Y") {
                //     return true;
                // }
                if (v.zsxmDm === zsxm) {
                    if (!zspm && v.zspmGrid && v.zspmGrid.zspmGridlb){
                        $.each(v.zspmGrid.zspmGridlb,function () {
                            this.skssqq = v.skssqq;
                            this.skssqz = v.skssqz;
                            this.qzd = v.qzd;
                            data.push(this);
                        });
                    }
                    if (zspm) {
                        data = [];
                        $.each(v.zspmGrid.zspmGridlb, function (j, w) {
                            if (w.zspmDm === zspm) {
                                if (!!w.zszmGrid && w.zszmGrid.zszmGridlb){
                                    $.each(w.zszmGrid.zszmGridlb,function () {
                                        this.skssqq = v.skssqq;
                                        this.skssqz = v.skssqz;
                                        this.qzd = v.qzd;
                                        data.push(this);
                                    })
                                }
                            }
                        });
                    }
                }
            });
        }
        /*防止数据为空，节点不存在等情况*/
        if (Object.prototype.toString.call(data) !== '[object Array]') {
            data = [];
        }
        return data;
    },
    initTable: function () {
        var html = "";
        if (!!servyouReport.hd.sbxxGrid && !!servyouReport.hd.sbxxGrid.sbxxGridlb){
            var length=servyouReport.hd.sbxxGrid.sbxxGridlb.length;
            $.each(servyouReport.hd.sbxxGrid.sbxxGridlb, function (i, v) {
                if (v.sfsfzrd === "N"|| v.zsxmDm==="10103") {
                    length--;
                    return true;
                }
                html += "<tr>" +
                    "<td class='txt-l allow-del'><input type='text' servyou_type='string' value='" + v.zsxmMc + "' zsxm_dm='" + v.zsxmDm + "' yjse1='" + v.yjse1 + "' disabled='disabled'></td>" +
                    "<td class='txt-l'><input type='text' servyou_type='string' "+(v.zspmGrid.zspmGridlb.length > 0 ? ("value='" + v.zspmGrid.zspmGridlb[0].zspmMc + "' zspm_dm='" + v.zspmGrid.zspmGridlb[0].zspmDm + "' jsbz='"+ v.zspmGrid.zspmGridlb[0].jsbz +"' qzd='" +v.zspmGrid.zspmGridlb[0].qzd+ "'") : "")+"disabled='disabled'></td>" +
                    "<td class='txt-l'><input type='text' servyou_type='string' "+(v.zspmGrid.zspmGridlb.length > 0 ? ((v.zspmGrid.zspmGridlb[0].zszmGrid.zszmGridlb.length > 0 && !!v.zspmGrid.zspmGridlb[0].zszmGrid.zszmGridlb[0].zszmDm) ?
                        ("value='" + v.zspmGrid.zspmGridlb[0].zszmGrid.zszmGridlb[0].zszmMc + "' zszm_dm='" + v.zspmGrid.zspmGridlb[0].zszmGrid.zszmGridlb[0].zszmDm + "' ") : "") : "")+"disabled='disabled'></td>" +
                    "<td class='txt-r'><input type='text' servyou_type='date' disabled='disabled' value='" + v.skssqq + "'></td>" +
                    "<td class='txt-r'><input type='text' servyou_type='date' disabled='disabled' value='" + v.skssqz + "'></td>" +
                    "<td class='txt-r enable'><input type='text' name='ysx' value='0.00' digit='4' servyou_type='nonnegative'></td>" +
                    "<td class='txt-r enable'><input type='text' value='0.00' servyou_type='nonnegative'></td>" +
                    "<td class='txt-r'><input type='text' servyou_type='percent' disabled='disabled' value='" + (v.zspmGrid.zspmGridlb.length > 0 ? v.zspmGrid.zspmGridlb[0].yssdl : v.yssdl) + "'></td>" +
                    "<td class='txt-r'><input type='text' name='jfyj' servyou_type='nonnegative' value='0.00' disabled='disabled'></td>" +
                    "<td class='txt-r'><input type='text' servyou_type='percent' disabled='disabled' value='" + (v.zspmGrid.zspmGridlb.length > 0 ? ((v.zspmGrid.zspmGridlb[0].zszmGrid.zszmGridlb.length > 0 && !!v.zspmGrid.zspmGridlb[0].zszmGrid.zszmGridlb[0].zszmDm) ?
                        v.zspmGrid.zspmGridlb[0].zszmGrid.zszmGridlb[0].sl1 : v.zspmGrid.zspmGridlb[0].sl) : v.sl) + "'></td>" +
                    "<td class='txt-r'><input type='text' disabled='disabled' value='"+  (v.zspmGrid.zspmGridlb.length > 0 ? v.zspmGrid.zspmGridlb[0].sskcs : "") +"'></td>" +
                    "<td class='txt-r bqynsfe7'><input type='text' servyou_type='nonnegative' value='0.00' disabled='disabled'></td>" +
                    "<td class='txt-r'><input type='text' value='0.00' disabled='disabled'></td>" +
                    "<td class='txt-l'><select name='jmxz' disabled='disabled'>" + tysbb.getjmxx(v.zsxmDm) + "</select></td>" +
                    "<td class='txt-r enable'><input type='text' value='0.00' servyou_type='nonnegative'></td>" +
                    "<td class='txt-r'><input type='text' servyou_type='nonnegative' value='0.00' disabled='disabled'></td>" +
                    // "<td class='txt-r'><input type='text' value='' servyou_type='string' disabled='disabled'></td>" +
                    // "<td class='txt-r'><input type='text' value='' servyou_type='string' disabled='disabled'></td>" +
                    // "<td class='txt-r'><input type='text' value='' servyou_type='string' disabled='disabled'></td>" +
                    "</tr>";
            });
            servyouReport.addRows("001", $(".hj001").index() + 3, length, html);
        }
    },
    addrow: function () {
        var html = "";
        html += "<tr>" +
            "<td class='txt-r enable allow-del'><select name='zsxm'>" + tysbb.html.zsxm + "</select></td>" +
            "<td class='txt-r'><select name='zspm' disabled='disabled' neverEdit='true'><option value=''>--请选择--</option></select></td>" +
            "<td class='txt-r'><select name='zszm' disabled='disabled' neverEdit='true'><option value=''>--请选择--</option></select></td>" +
            "<td class='txt-r'><input type='text' servyou_type='date' neverEdit='true' disabled='disabled' value=''></td>" +
            "<td class='txt-r'><input type='text' servyou_type='date' neverEdit='true' disabled='disabled' value=''></td>" +
            "<td class='txt-r'><input name='ysx' disabled='disabled' digit='4' type='text' value='0.00' servyou_type='nonnegative'></td>" +
            "<td class='txt-r'><input disabled='disabled' type='text' value='0.00' servyou_type='nonnegative'></td>" +
            "<td class='txt-r'><input type='text' servyou_type='percent' neverEdit='true' disabled='disabled' value=''></td>" +
            "<td class='txt-r'><input type='text' name='jfyj' servyou_type='nonnegative' value='0.00' neverEdit='true' disabled='disabled'></td>" +
            "<td class='txt-r'><input type='text' servyou_type='percent' neverEdit='true' value='0.00' disabled='disabled'></td>" +
            "<td class='txt-r'><input type='text' disabled='disabled' neverEdit='true' value='0.00'></td>" +
            "<td class='txt-r bqynsfe7'><input type='text' servyou_type='nonnegative' value='0.00' neverEdit='true' disabled='disabled'></td>" +
            "<td class='txt-r'><input type='text' value='0.00' neverEdit='true' disabled='disabled'></td>" +
            "<td class='txt-l'><select name='jmxz' disabled='disabled'></select></td>" +
            "<td class='txt-r'><input type='text' disabled='disabled' value='0.00' servyou_type='nonnegative'></td>" +
            "<td class='txt-r'><input type='text' servyou_type='nonnegative' value='0.00' neverEdit='true' disabled='disabled'></td>" +
            // "<td class='txt-r'><input type='text' value='' neverEdit='true' servyou_type='string' disabled='disabled'></td>" +
            // "<td class='txt-r'><input type='text' value='' neverEdit='true' servyou_type='string' disabled='disabled'></td>" +
            // "<td class='txt-r'><input type='text' value='' neverEdit='true' servyou_type='string' disabled='disabled'></td>" +
            "</tr>";
        servyouReport.addRows("001", $(".hj001").index() + 3, 1, html);
        servyouReport.formatAllData("001");
    },
    checkTable: function () {
        return this.checkTable_001() && this.checkTableZlqqz();
    },
    /*  001表789列之间的校验
       不能存在税源编号、征收项目、征收品目、征收子目、税款所属期起、税款所属期止重复记录，请核实！
       两个校验都需要 循环所有的 数据行，所以合并
       */
    checkTable_001: function () {
        var flag = true;
        var data = [];
        var trs=$("#table_001 tbody tr:eq(0)").nextUntil(".hj001");
        var blankTrs=0;
        $.each(trs,function (i,v) {
            if(!$(v).find("td").eq(0).find("input,select").val()){
                blankTrs++;
            } else {
                if (!!$(v).find('td:eq(13) select').val() && Number($(v).find('td:eq(12) input').val()) <= 0){
                    $(v).find('td:eq(12)').addClass('report_error');
                    mini.alert('第'+(i+1)+'行当减免性质不为空时，本期减免税（费）额应大于0！');
                }
            }
        });

        if(trs.length<1||(trs.length>=1&&blankTrs===trs.length)){
            mini.alert("至少有一条数据才可以进行申报！");
            return false;
        }
        $.each($("#table_001 tbody tr:eq(0)").nextUntil(".hj001"), function (i, v) {
            var tds = $(v).find("td");
            //如果该行征收项目为空，视为无效行
            if (!(tds.eq(0).find("input").val() || tds.eq(0).find("select").val())||!(tds.eq(1).find("input").val() || tds.eq(1).find("select").val())) {
                // return true;
                flag=false;
                tds.eq(0).addClass("report_error");
                tds.eq(0).parent().addClass("report_error");
                mini.alert("征收项目或征收品目不得为空！若无意填写此行数据，请删除此行。");
                return false;
            }

            if (!tysbb.check789(tds, i)) {
                flag = false;
                return false;
            }
            //不能存在征收项目、征收品目、征收子目、税款所属期起、税款所属期止重复记录，请核实！
            //将相关的数据拼接成字符串 存到数组中进行对比
            var str = (tds.eq(0).find("input").attr("zsxm_dm") || tds.eq(0).find("select").val() || "") + "|-|" +
                (tds.eq(1).find("input").attr("zspm_dm") || tds.eq(1).find("select").val() || "") + "|-|" +
                (tds.eq(2).find("input").attr("zszm_dm") || tds.eq(2).find("select").val() || "") + "|-|" +
                tds.eq(3).find("input,select").val() + "|-|" +
                tds.eq(4).find("input,select").val();
            var index = data.indexOf(str);
            if (index > -1) {
                var strArray=str.split("|-|");
                mini.showMessageBox({
                    title: "提示:存在重复申报！",
                    buttons: ["确定"],
                    message: "",
                    html: "征收项目："+(tds.eq(0).find("input").val() || tds.eq(0).find("select").attr('title'))+"<br/>" +
                    "征收品目："+(tds.eq(1).find("input").val() || tds.eq(1).find("select").attr('title'))+"<br/>" +
                    (!!strArray[2] ? "征收子目："+(tds.eq(1).find("input").val() || tds.eq(1).find("select").attr('title'))+"<br/>" : "") +
                    "税款所属期起："+strArray[3]+"<br/>"+
                    "税款所属期止："+strArray[4]+"<br/>"+
                    "<span class='txt-red'>存在重复申报，请核实</span>",
                    width: 600,
                    maxHeight: 400
                });
                $("#table_001 tbody tr").eq(index + 1).addClass("report_error");
                $("#table_001 tbody tr").eq(index + 1).find("td:eq(0)").addClass("report_error");
                $("#table_001 tbody tr").eq(i + 1).addClass("report_error");
                $("#table_001 tbody tr").eq(i + 1).find("td:eq(0)").addClass("report_error");
                // mini.alert("第" + (index + 1) + "行和第" + (i + 1) + "行数据重复，不能存在税源编号、征收项目、征收品目、征收子目、税款所属期起、税款所属期止全部相同的重复记录，请核实！");
                flag = false;
                return false;
            } else {
                data.push(str);
            }
        });
        return flag;
    },
    /*001表789列之间的校验*/
    check789: function (tds, i) {
        var bqynse = Number(tds.eq(11).find("input").val());//本期应纳税额
        var bqjmse = Number(tds.eq(12).find("input").val());//本期减免税额
        var bqyjse = Number(tds.eq(14).find("input").val());//本期已缴税费税额
        if (bqjmse > bqynse) {
            mini.alert("第" + (i + 1) + "行的本期减免税(费)额(8)【" + bqjmse.toFixed(2) + "】不能大于本期应纳税(费)额(7=4*5-6)【" + bqynse.toFixed(2) + "】！");
            tds.eq(12).addClass("report_error");
            flag = false;
            return false;
        }
        var yjse = Number(tysbb.getYjse(tds.eq(1).find("input").attr("zspm_dm")) || tysbb.getYjse(tds.eq(1).find("select").val()));
        if (bqyjse > yjse) {
            mini.alert("第" + (i + 1) + "行该品目总共已使用的已缴额(9)【" + bqyjse.toFixed(2) + "】不能大于该品目可使用的已缴总额【" + yjse.toFixed(2) + "】！");
            // tds.eq(14).addClass("report_error");
            tds.eq(14).find("input").val(yjse).blur();
            flag = false;
            return false;
        }
        return true;
    },
    //租赁期起止的校验
    checkTableZlqqz: function () {
        if (mini.get("date1").text.slice(0, 4) !== mini.get("date2").text.slice(0, 4)) {
            mini.alert("“其他个人出租不动产租赁期起”与“其他个人出租不动产租赁期止”必须为同一年!");
            return false;
        }

        if (!mini.get("date1").text||!mini.get("date2").text) {
            mini.alert("“其他个人出租不动产租赁期起”与“其他个人出租不动产租赁期止”必须选择日期!");
            return false;
        }

        return true;
    }
};

servyouReport.showSideBar = false;
servyouReport.customEvent = function () {
    tysbb.bindEvent();
};
servyouReport.customInit = function () {
    tysbb.customInit();
};
servyouReport.customInitLocalData=function () {
    tysbb.getSelectHtml();
};
servyouReport.checkTable_001 = function () {
    return tysbb.checkTable();
};

servyouReport.afterInit = function () {
    mini.parse();
    $(".mini-buttonedit-buttons").css({
        // "position":"absolote",
        "left":"100px"
    });
    servyouReport.formatAllData("001");
    $("[name='sfft']").change();
    tysbb.isInit = false;
};
servyouReport.changeXml_001 = function () {
    var $xml = this.getJ3Xml("001");
    $xml.find("jdxzDm").text(this.nsrData.jdxzDm);
    $xml.find("zgswskfjDm").text(this.nsrData.zgswskfjDm);
    $xml.find("nsrsbh").text(this.nsrsbh);
    $xml.find("nsrmc").text(this.nsrmc);
    $xml.find("skssqq").text(this.sssqq);
    $xml.find("skssqz").text(this.sssqz);
    $xml.find("sbsxDm1").text(this.sblxDm);
    $xml.find("sbrq1").text("2018-10-22");
    $xml.find("hyDm").text(this.nsrData.hyDm);
    var $sbxxGrid = $xml.find("sbxxGrid");
    var $sbxxGridlb = $sbxxGrid.find("sbxxGridlb").eq(0).clone();
    $sbxxGrid.empty();
    var code_list = ["zsxmDm", "zspmDm", "zszmDm", "sfkssqq", "sfkssqz", "ysx", "jcx", "yssdl", "jsfyj", "sflhdwse", "sskcs", "bqynsfe", "bqjmsfe", "ssjmxzDm", "bqyjsfe", "bqybtsfe", "sybzDm1", "sybh1"];
    $.each($("#table_001 tbody tr").eq(0).nextUntil(".hj001"), function (i, v) {
        var temp = $sbxxGridlb.clone();
        temp.find("xh").text(i);
        $.each($(this).find("td"), function (j, w) {
            if(j===0){
                temp.find("zsxmDm").text($(this).find("input,select").attr("zsxm_dm")||$(this).find("input,select").val());
            }else if(j===1){
                temp.find("zspmDm").text($(this).find("input,select").attr("zspm_dm")||$(this).find("input,select").val());
            }else if(j===2){
                temp.find("zszmDm").text($(this).find("input,select").attr("zszm_dm")||$(this).find("input,select").val());
            }else{
                temp.find(code_list[j]).text(servyouReport.getInputValue($(this).find("input,select")));
            }


        });

        $sbxxGrid.append(temp);
    });
    return $xml;
};
/*自定义的预览后初始化*/
servyouReport.customInitAfterPreview = function () {
    Tools.getUrlParamByName('preview') === 'Y' && $('.addrow').addClass('hidden') && $('.tips').parent().remove();
};
$(function () {
    servyouReport.init();
});
/**
 * Created by liun on 2018/9/6.
 */
tysbb.zspmChange = function (_this) {
    var nextAll = $(_this).parent().nextAll();
    if (_this.value) {
        var zspmNo = ["101016606", "101016604"];
        var zspmDt = ["101110400","101110599"];
        if (zspmNo.indexOf(_this.value) > -1) {
            mini.alert("非自然人不允许申报'不动产融资租赁（11%、5%）','不动产经营租赁（11%、5%）！");
            $(_this).val("").change();
        } else {
            var data = $(_this).find("option:checked");
            nextAll.eq(7).find("input").val(data.attr("sl")=="null"?"":data.attr("sl")).blur();
            nextAll.eq(8).find("input").val(data.attr("sskcs")=="null"?"":data.attr("sskcs")).blur();
            var zsxm = $(_this).parent().prev().find("select").val();
            var zspmHtml = tysbb.getzszmHtml(zsxm, _this.value);
            if (zspmHtml) {
                nextAll.eq(0).find("select").html(zspmHtml).removeAttr("disabled").change();
            } else {
                //禁用征收子目
                nextAll.eq(0).find("select").html("<option value=''>--</option>").change().attr("disabled", "disabled").blur();
            }
            tysbb.zszmChange(_this);
            //修改税款所属期
            nextAll.eq(1).find("input").val(data.attr("skssqq")).blur();
            nextAll.eq(2).find("input").val(data.attr("skssqz")).blur();
            nextAll.eq(5).find("input").val(data.attr("yssdl")).blur();   //应税所得率
        }
    } else {
        nextAll.eq(7).find("input").val('').blur();  //征收品目置空时，第5列税（费）率或单位税额置空
        nextAll.eq(8).find("input").val('').blur();  //征收品目置空时，第6列速算扣除数置空
        if (nextAll.eq(0).find("option").length === 1) {
            tysbb.zszmChange(_this);
        } else {
            nextAll.eq(0).find("select").val("").html("<option value=''>--请选择--</option>").change().attr("disabled", "disabled").blur();
        }
    }
};
//征收子目改变
tysbb.zszmChange = function (_this) {
    var $curTr = $(_this).parent().parent();
    var $inputs = $(_this).parent().nextAll().find("input").not("[neverEdit=true]");
    $inputs.removeAttr("disabled");
    if ($curTr.find('td:eq(2) select').val()) {
        $curTr.find('td:eq(9) input').val($curTr.find('td:eq(2) select').find('option:selected').attr('sl')).blur();
    } else {
        $curTr.find('td:eq(9) input').val($curTr.find('td:eq(1) select').find('option:selected').attr('sl') || 0).blur();
    }
};
tysbb.getData = function (zsxm, zspm) {
    var data = [];
    if (!!servyouReport.hd.sbxxGrid && !!servyouReport.hd.sbxxGrid.sbxxGridlb){
        $.each(servyouReport.hd.sbxxGrid.sbxxGridlb, function (i, v) {
            // if (v.sfsfzrd === "Y") {
            //     return true;
            // }
            if (v.zsxmDm === zsxm) {
                if (!zspm && v.zspmGrid && v.zspmGrid.zspmGridlb){
                    $.each(v.zspmGrid.zspmGridlb,function () {
                        this.skssqq = v.skssqq;
                        this.skssqz = v.skssqz;
                        this.qzd = v.qzd;
                        data.push(this);
                    });
                }
                if (zspm) {
                    $.each(v.zspmGrid.zspmGridlb, function (j, w) {
                        if (w.zspmDm === zspm) {
                            if (!!w.zszmGrid && w.zszmGrid.zszmGridlb){
                                $.each(w.zszmGrid.zszmGridlb,function () {
                                    this.skssqq = v.skssqq;
                                    this.skssqz = v.skssqz;
                                    this.qzd = v.qzd;
                                    data.push(this);
                                })
                            }
                        }
                    });
                }
            }
        });
    }
    /*防止数据为空，节点不存在等情况*/
    if (Object.prototype.toString.call(data) !== '[object Array]') {
        data = [];
    }
    return data;
};