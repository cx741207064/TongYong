/*
*  Created by lcn on 2018/1/2
*/
var jsxxcx = {};
jsxxcx.gsWjsData = [];
jsxxcx.dsWjsData = [];
jsxxcx.gsYjsData = [];
jsxxcx.dsYjsData = [];
var nsrData = nsrxxUtil.getUserInfo();
//按钮
jsxxcx.Btn = {
	wjsxx: [{
		id: "btn_sfxy",
		title: "三方协议缴款",
		event: "jsxxcx.dzjk('sfxy')"
	}, {
		id: "btn_yljk",
		title: "银联缴款",
		event: "jsxxcx.dzjk('yl')"
	}]
// {
// 	id: "btn_ewmjk",
// 		title: "二维码缴款",
// 	event: "jsxxcx.dzjk('ewm')"
// }]
};
jsxxcx.url = {
    cxwjsxx: "/sbzx-web/api/kk/kkqk/queryWjkxx",  //查询未交税信息
	cxwjsxxfjs: "/sbzx-web/api/hb/ds/jk/queryDsWjkxx",//地税查询未缴税信息
    sfxyjk: "/sbzx-web/api/kk/sfxykk",        //三方协议缴款
    yljk: "/sbzx-web/api/kk/hlwkk",           //银联缴款
    // ewmjk: "/sbzx-web/api/kk/qrcodeKk",       // 二维码缴款
    cxyjkxx: "/sbzx-web/api/kk/kkqk/queryYjkxxBySksssq",  //查询已缴款信息
	cxyjkxxfjs: "/sbzx-web/api/hb/ds/jk/queryDsYjkxxBySksssq",//地税查询已缴款信息
    dsSfxyJk:"/sbzx-web/api/hb/ds/jk/dsszjk",//地税三方协议缴款
	fjskk: "/sbzx-web/api/kk/fjs/fjskk"
};
//税款属性
jsxxcx.sksx = [{'id': '', 'text': '--全部--'}, {'id': '0208', 'text': '辅导期一般纳税人预缴税款'}, {'id': '0101', 'text': '一般申报'},
    {'id': '0102', 'text': '零散税收'}, {'id': '0103', 'text': '呆账税金'}, {'id': '0105', 'text': '委托代征税款'},
    {'id': '0106', 'text': '代收代缴税款'}, {'id': '0107', 'text': '代扣代缴税款'}, {'id': '0108', 'text': '代售印花税票'},
    {'id': '0109', 'text': '出口退税退运补税'}, {'id': '0201', 'text': '分期预缴税款'}, {'id': '0202', 'text': '延期申报预收税款'},
    {'id': '0203', 'text': '出口货物预收税款'}, {'id': '0204', 'text': '代开发票预收税款'}, {'id': '0205', 'text': '查补预收税款'},
    {'id': '0206', 'text': '特别纳税调整预收税款'}, {'id': '0207', 'text': '预缴费款'}, {'id': '0299', 'text': '其他预收税款'},
    {'id': '0301', 'text': '纳税评定税款'}, {'id': '0401', 'text': '查补税(费)款'}, {'id': '0402', 'text': '查退税款'},
    {'id': '0406', 'text': '出口退税追缴税款'}, {'id': '0501', 'text': '行为罚款'}, {'id': '0502', 'text': '没收违法所得'},
    {'id': '0503', 'text': '涉税罚款'}, {'id': '0601', 'text': '海关代征'}, {'id': '0701', 'text': '征前减免'},
    {'id': '0801', 'text': '提退税款'}, {'id': '9999', 'text': '其他'}, {'id': '0407', 'text': '政策性补缴'}];
//征收项目
jsxxcx.zsxm = [{'id': '', 'text': '--全部--'}, {'id': '10101', 'text': '增值税'}, {'id': '10102', 'text': '消费税'},
    {'id': '10104', 'text': '企业所得税'}, {'id': '10106', 'text': '储蓄利息所得税'}, {'id': '30126', 'text': '文化事业建设费'},
    {'id': '30175', 'text': '废弃电器电子产品处理基金'}];

//初始化  按钮
jsxxcx.initBtn = function () {
    var html = "";
    $.each(jsxxcx.Btn.wjsxx, function (i, e) {
        html += '  <a class="btn btn-blue" id="' + e.id + '" onclick="' + e.event + '">' + e.title + '</a>';
    });
    $(".btn-wjscx").html(html);
};

$(function () {
    $('body').show();
	header.init();
	jsxxcx.initSbNsrxx();
	jsxxcx.init();
});

jsxxcx.initSbNsrxx = function(){
	if(nsrData.userType === '03'){
		var nsrInfo = nsrxxUtil.getNsrInfo ()||{};
		if(!!nsrInfo.dsNsrmc && !!nsrInfo.nsrsbhDs){
			$('.company-info').html('<span>纳税人识别号：'+nsrInfo.nsrsbhDs+'</span>&nbsp;&nbsp;<span>纳税人名称：'+ nsrInfo.dsNsrmc +'</span>');
		}else{
			$('.company-info').hide();
		}
	}
};

jsxxcx.init = function () {
	jsxxcx.initBtn();
	jsxxcx.wjsxx_init();//查询未缴税信息
	jsxxcx.yjsxx_init();//查询已缴税信息
};
//初始化 未缴税信息datagrid
jsxxcx.wjsxx_init = function () {
	var grid = mini.get("wjscx");
	//var messageid = mini.loading("数据查询中, 请稍等 ...", "加载中");
	mini.mask('数据查询中, 请稍等...');
	if(nsrData.userType !== '03'){
		jsxxcx.gscxWjs();
	}
	jsxxcx.dscxWjs();
	var arr = jsxxcx.gsWjsData.concat(jsxxcx.dsWjsData);
    mini.unmask();
    mini.get("wjscx").setData(arr);
};
//国税未缴税信息
jsxxcx.gscxWjs = function() {
	ajax.post(jsxxcx.url.cxwjsxx, {}, function (data) {
		if (data.success) {
			jsxxcx.gsWjsData = data.value || [];
		}else{
			mini.unmask();
			mini.alert(data.message);
		}
	}, function () {
		// mini.alert("出现网络错误，请稍后再试...");
	});
}
//查询地税、附加税的 未缴税信息
jsxxcx.dscxWjs = function () {
		var grid = mini.get("wjscx");
		ajax.post(jsxxcx.url.cxwjsxxfjs, {}, function (data) {
			if (data.success) {
				jsxxcx.dsWjsData = data.value || [];
			}else {
				mini.unmask();
				mini.alert(data.message);
			}
		}, function () {
			// mini.alert('出现网络错误，请稍后再试...');
		});
	};
//初始化已缴款信息datagrid
jsxxcx.cxyjsxx = function () {
		var jkrqq = mini.get("sssqq").getText();
		var jkrqz = mini.get("sssqz").getText();
		var message = "";
		if (!jkrqq || !jkrqz) {
			mini.alert('缴款日期不能为空！');
			return false;
		}
		var send_data = {
			jkrqq: jkrqq,
			jkrqz: jkrqz
		};
		var grid = mini.get("yjscx");
		mini.mask('数据查询中, 请稍等...');
		if(nsrData.userType !== '03'){
			jsxxcx.gscxYjs(send_data);
		}
		jsxxcx.dscxYjs(send_data);
	var arr = jsxxcx.gsYjsData.concat(jsxxcx.dsYjsData);
	if(arr.length!=0){
		mini.unmask();
		grid.setData(arr);
	}else{
		mini.unmask();
		grid.clearRows();
		mini.alert('没有返回的数据！');
	}
	};
//查询国税已缴款信息
jsxxcx.gscxYjs = function(data){
	ajax.post(jsxxcx.url.cxyjkxx, mini.encode(data), function (res) {
		if (res.success) {
			jsxxcx.gsYjsData = res.value ||[];
		} else {
			mini.unmask();
			mini.alert(res.message);
		}
	}, function () {

	});
}
//查询地税已缴款信息
jsxxcx.dscxYjs = function(data){
	ajax.post(jsxxcx.url.cxyjkxxfjs, mini.encode(data), function (res) {
		if (res.success) {
			jsxxcx.dsYjsData = res.value ||[];
		} else {
			mini.unmask();
			mini.alert(res.message);
		}
	}, function () {

	});
}

//电子缴款
jsxxcx.dzjk = function (e) {
    var grid = mini.get("wjscx");
    var selected = grid.getSelecteds();
    if (selected.length > 0) {
	    //三方协议
        if (e === 'sfxy') {
            //地税，地税接口会返回国地税标志gdsBz
	        if(!!selected[0].gdsBz && selected[0].gdsBz=='ds'){
		        jsxxcx.dsDzjk();
            }
            //国税还用原来的方法，不变
            else{
		        jsxxcx.open_win(selected[0], "sfxy");
            }
        }
        //银联支付
        else if (e === 'yl') {
	        //非国税目前不支持银联支付
            if(!!selected[0].gdsBz && selected[0].gdsBz=='ds'){
                mini.alert('尊敬的纳税人您好，该项税费暂不支持银联支付，请选择三方协议缴款！');
            }else{
		        mini.alert("尊敬的纳税人您好，银联支付不支持全部银行且存在支付限额，超过限额将无法成功缴款。您可通过以下网址查看支持的银行、默认限额及限额修改方法：<a href='https://static.95516.com/static/help/detail_38.html' target='_blank'>https://static.95516.com/static/help/detail_38.html</a>点击链接能打开对应页面，点击确定，继续下面步骤。", "提示", function () {
			        jsxxcx.open_win(selected[0], "yljk");
		        });
	        }
        }
        //二维码缴款
        // else {
        //     jsxxcx.ewmjk(select[0]);
        // }
    } else {
        mini.alert("请选择缴税项目！");
    }
};

jsxxcx.open_win = function (zsxm, win_id) {
    var Numsk = Number(zsxm.ybtse).toFixed(2);
    mini.open({
        // showHeader: false,
        // showMaxButton: true,
        title: "税款支付",
        url: "jk_skzf.html",
        showModal: true,
        allowResize: false,
        width: 400,
        height: 250,
        onload: function () {       //弹出页面加载完成
            try {
                var iframe = this.getIFrameEl();
                iframe.contentWindow.skzf.setData(Numsk, win_id);
            } catch (error) {
                console.error(error);
            }
        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action === "close") {
                return;
            }
            var iframe = this.getIFrameEl();
            //获取选中、编辑的结果
            // var data = iframe.contentWindow.getData();
            var data = iframe.contentWindow.skzf.check_get_data();
            if (!data.flag) {
                mini.alert(data.message);
                return false;
            } else {
                if (!data.btn) {
                    mini.alert("请选择支付方式！");
                    return false;
                }
            }
            var send_data = jsxxcx.formDataforZf(zsxm, Numsk);
            if (data.btn === "sf") {//三方协议
                //不存在三方协议号 或者存在电子税票号 的时候不允许进行三方协议缴款
                if (!zsxm.sfxyh) {
                    if (zsxm.dzsphm) {
                        mini.alert("存在互联网缴费记录，不允许再次进行三方协议缴款！");
                    } else {
                        mini.alert("您的三方协议号为空，请先进行三方协议签订！");
                    }
                    return false;
                } else {
                    jsxxcx.sfxyzf(send_data);
                }
            } else if (data.btn === "wl") {//银联支付
                if (!zsxm.dzsphm && zsxm.sfxyh) {
                    mini.confirm("您已选择银联在线支付，系统将自动生成税票。生成税票后将无法使用三方协议扣款", "确定", function (action) {
                        if (action === "ok") {
                            jsxxcx.ylzf(send_data);
                        }
                    });
                } else {
                    jsxxcx.ylzf(send_data);
                }
            }
        }
    });
};
//支付的时候  格式化数据
jsxxcx.formDataforZf = function (zsxm, se) {
    return {
        sfxyh: zsxm.sfxyh,
        kkxxList: [{
            zsxh: zsxm.zsuuid,
            yzpzxh: zsxm.yzpzxh,
            je: se,
            dzsphm: zsxm.dzsphm,
            sssqQ: zsxm.skssqq,
            sssqZ: zsxm.skssqz,
            yzpzmxxh: zsxm.yzpzmxxh,
            zsxmdm: zsxm.zsxmDm,
            jkqx: zsxm.jkqx,
            zsswjgDm: zsxm.skssSwjgDm
        }]
    };
};
//银联支付
jsxxcx.ylzf = function (send_data) {
    ajax.post(jsxxcx.url.yljk, mini.encode(send_data), function (data) {
        if (!data.success) {
            mini.alert(data.message || '扣款信息获取失败', '处理失败');
        } else {
            mini.open({
                cls: 'fixedWindowTop0',
                url: "./ylzf.html",        //页面地址
                title: "银联支付结果",      //标题
                iconCls: "",    //标题图标
                width: "1000",      //宽度
                height: "600",     //高度
                allowResize: false,       //允许尺寸调节
                allowDrag: false,         //允许拖拽位置
                showCloseButton: true,   //显示关闭按钮
                showMaxButton: true,     //显示最大化按钮
                showModal: true,         //显示遮罩
                effect: 'fast',              //打开和关闭时的特果:'none','slow','fast',默认'none'
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl();
                    var html = data.value || "银联支付信息获取失败！";
                    //调用弹出页面方法进行初始化
                    iframe.contentWindow.setHtml(html);
                },
                ondestroy: function (action) {  //弹出页面关闭前
                    location.reload();  //页面关闭刷新当前页面
                }
            })
        }
    }, function () {
        mini.alert("出现网络错误，请稍后再试。。。。。", "提示信息", function () {
        });
    });
};

//国税三方协议支付
jsxxcx.sfxyzf = function (send_data) {
    ajax.post(jsxxcx.url.sfxyjk, mini.encode(send_data), function (data) {
        if (data.success) {
            mini.alert("三方协议扣款成功", "提示", function () {
                location.reload();
            });
        } else {
            mini.alert(data.message || '扣款信息获取失败', '处理失败');
        }
    }, function () {
        mini.alert("出现网络错误，请稍后再试。。。。。", "提示信息", function () {
        });
    });
};

//地税三方协议支付
jsxxcx.sfxyzfDs = function (send_data) {
	ajax.post(jsxxcx.url.sfxyjk, mini.encode(send_data), function (data) {
		if (data.success) {
			mini.alert("三方协议扣款成功", "提示", function () {
				location.reload();
			});
		} else {
			mini.alert(data.message || '扣款信息获取失败', '处理失败');
		}
	}, function () {
		mini.alert("出现网络错误，请稍后再试。。。。。", "提示信息", function () {
		});
	});
};

//已交税额转换
jsxxcx.changegse = function (e) {
    if (e.record.kkje) {
        return Number(e.record.kkje).toFixed(2);
    } else {
        return Number(e.record.ybtse).toFixed(2);
    }
};
//格式化滞纳金
jsxxcx.formatznj = function (e) {
    return Number(e.record.znj).toFixed(2);
};

//已缴款信息合计
jsxxcx.onDrawSummaryCell = function (e) {
    var rows = e.data;
    //服务端汇总计算
    if (e.field === "kkje") {
        var total = 0;
        for (var i = 0, l = rows.length; i < l; i++) {
            var rowObject = rows[i];
            var t = Number(rowObject.kkje);
            if (isNaN(t)) {
                continue;
            }
            total += t;
        }
        e.cellHtml = total.toFixed(2);
    }
    if(e.field === "jkrq"){
        e.cellHtml = "合计：";
        e.cellCls = "txt-r";
    }
};
//本次税款、其中正税金额、其中滞纳金金额   信息合计
jsxxcx.select = function (e) {
    var ybtse = Number(e.record.ybtse);
    var znj = Number(e.record.znj);
    $(".hzxx").html("本次税款：" + (ybtse + znj).toFixed(2) + "元&nbsp;&nbsp;&nbsp;&nbsp;其中正税金额：" + ybtse.toFixed(2) + "元 &nbsp;&nbsp;&nbsp;&nbsp;其中滞纳金金额: " + znj.toFixed(2) + "元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
};

/*根据是否有三方协议号  设置三方协议按钮*/
// jsxxcx.changeSfxyBtn = function (data) {
//     var btn = $("#btn_sfxy");
//     if (btn.length !== 0 && !data[0].sfxyh) {
//         btn.removeAttr("onclick").addClass("btn-gray").removeClass("btn-blue");
//     }
// };
/**
 * 刷新当前页面
 */
jsxxcx.refreshCurrentPage = function () {
    location.reload();
};

/*
*  Created by lcn on 2018/1/16
*/


jsxxcx.yjsxx_init = function () {
    //已缴税查询起止时间
    var myDate = new Date();
    var thisyear = myDate.getFullYear();
    var thisTime = thisyear + "-";
    var thismonth = myDate.getMonth() + 1;
    if (thismonth > 9) {
        thisTime += thismonth;
    } else {
        thisTime += "0" + thismonth;
    }

    //起始时间
    mini.get("sssqq").setText(thisTime + "-01");
    //结束时间
    if (myDate.getDate() > 9) {
        thisTime += "-" + myDate.getDate();
    } else {
        thisTime += "-0" + myDate.getDate();
    }
    mini.get("sssqz").setText(thisTime);
};


//附加税电子缴款 --- 组织数据
// jsxxcx.fjsdzjk = function () {
jsxxcx.dsDzjk = function () {
	var grid = mini.get("wjscx");
	var select = grid.getSelecteds();
		//合并选中项
		var temp = mini.clone(select[0]);
		var ybtse = 0;
		var znj = 0;
		for (var i = 0; i < select.length; i++) {
			ybtse += Number(select[i].ybtse);
			znj += Number(select[i].znj);
		}
		temp.ybtse = ybtse;
		temp.znj = znj;
		jsxxcx.open_win_ds(temp, "sfxy");
};


jsxxcx.open_win_ds = function (zsxm, win_id) {
    var Numsk = (Number(zsxm.ybtse) + Number(zsxm.znj)).toFixed(2);
    // var Numsk = Number(zsxm.ybtse).toFixed(2);
    mini.open({
        title: "税款支付",
        url: "jk_skzf.html",
        showModal: true,
        allowResize: false,
        width: 400,
        height: 250,
        onload: function () {       //弹出页面加载完成
            try {
                var iframe = this.getIFrameEl();
                iframe.contentWindow.skzf.setData(Numsk, win_id);
            } catch (error) {
                console.error(error);
            }
        },
        ondestroy: function (action) {  //弹出页面关闭前
            if (action === "close") {
                return;
            }
            var iframe = this.getIFrameEl();
            //获取选中、编辑的结果
            var data = iframe.contentWindow.skzf.check_get_data();
            if (!data.flag) {
                mini.alert(data.message);
                return false;
            } else {
                if (!data.btn) {
                    mini.alert("请选择支付方式！");
                    return false;
                }
            }
	        var grid = mini.get("wjscx");
	        var selected = grid.getSelecteds();
            if(selected[0].kkfs == '0'){//老附加税 kkfs:0老接口，1新接口
	            var send_data = jsxxcx.formDataforFjszjOld(Numsk);
	            if (data.btn === "sf") {
		            jsxxcx.fjssfxyjk(send_data);
	            }
            }else{//地税，新附加税
	            var send_data = jsxxcx.formDataforDs();
	            if (data.btn === "sf") {
		            jsxxcx.dsjk(send_data);
	            }
            }
        }
    });
};

//附加税缴款--组织数据
jsxxcx.formDataforDs = function () {
	var grid = mini.get("wjscx");
	var selected = grid.getSelecteds();
	var obj = {};
	var arr = [];
	for(var i=0;i<selected.length;i++){
	    obj.yzpzzlDm=selected[i].yzpzzlDm;
		obj.yzpzxh=selected[i].yzpzxh;
		arr.push(obj);
		obj={};
    }
    return {
	    yzxxList:arr
    }
};
//老附加税缴款--组织数据
jsxxcx.formDataforFjszjOld = function (numsk) {
	var grid = mini.get("wjscx");
	var selected = grid.getSelecteds();
	return {
		"pzxh": selected[0].yzpzxh,
		"ybtse": numsk,
		"ssdabh": nsrData.NsrInfo.ssdabh,
		"skssqq": selected[0].skssqq,
		"skssqz": selected[0].skssqz
	}
};

//附加税缴款
jsxxcx.dsjk = function (send_data) {
    ajax.post(jsxxcx.url.dsSfxyJk, mini.encode(send_data), function (data) {
        if (data.success) {
            mini.alert("缴款成功！", "提示", function () {
                location.reload();
            });
        }else {
            mini.alert(data.message || '扣款信息获取失败', '处理失败');
        }
    }, function () {
        mini.alert("出现网络错误，请稍后再试。。。。。", "提示信息", function () {
        });
    });
};

//老附加税缴款
jsxxcx.fjssfxyjk = function (send_data) {
	ajax.post(jsxxcx.url.fjskk, mini.encode(send_data), function (data) {
		if (data.success) {
			mini.alert("缴款成功！", "提示", function () {
				location.reload();
			});
		} else {
			mini.alert(data.message || '扣款信息获取失败', '处理失败');
		}
	}, function () {
		mini.alert("出现网络错误，请稍后再试。。。。。", "提示信息", function () {
		});
	});
};
//查询到的附加税 信息 放到grid中
// jsxxcx.wjsxxcx_set_fjs = function (sbxx) {
//     var datas = [];
//     //var grid = mini.get("wjscx_fjs");
//     var grid = mini.get("wjscx");
//     for (var i = 0; i < sbxx.sbmx.length; i++) {
//         var data = {};
//         data.zsxmMc = sbxx.sbmx[i].zsxmDm;
//         data.zspmMc = sbxx.sbmx[i].zspmDm;
//         data.yzpzzlMc = sbxx.yzpzzlDm;
//         data.skssqq = sbxx.skssqq;
//         data.skssqz = sbxx.skssqz;
//         data.ybtse = sbxx.sbmx[i].ybtse;
//         data.jkqx = sbxx.skssqz;
//         data.pzxh = sbxx.sbmx[i].pzxh;
//         data.ssdabh = sbxx.ssdabh;
//         datas.push(data);
//     }
//     grid.setData(datas);
// };

//相同凭证序号的同时选中
jsxxcx.selectSamePzxh = function (e) {
    var grid = mini.get("wjscx");
    var rows = grid.findRows(function (row) {
        if (row.yzpzxh == e.record.yzpzxh) {
            return true;
        }
    });
	//只有附加税允许多选
    if(!!rows[0].gdsBz && rows[0].gdsBz === 'ds'){
	    mini.get('wjscx').set({multiSelect:true});
	    grid.selects(rows, false);
	    mini.get('wjscx').set({
		    multiSelect:false
	    });
    }
};

//相同凭证序号的 同时取消
jsxxcx.deselectSamePzxh = function (e) {
    var grid = mini.get("wjscx");
    var rows = grid.findRows(function (row) {
        if (row.yzpzxh == e.record.yzpzxh) {
            return true;
        }
    });
    if(!!rows[0].gdsBz && rows[0].gdsBz === 'ds'){
	    mini.get('wjscx').set({multiSelect:true});
	    grid.deselects(rows, false);
	    mini.get('wjscx').set({
		    multiSelect:false
	    });
    }
};


// jsxxcx.yjsxxcx_set_fjs = function (jkmx) {
// 	var datas = [];
// 	// var grid = mini.get("yjscx_fjs");
// 	var grid = mini.get("yjscx");
// 	for (var i = 0; i < jkmx.length; i++) {
// 		if ('0' !== jkmx[i].skcllxDm && '5' !== jkmx[i].skcllxDm) {
// 			var data = {};
// 			data.skssqq = jkmx[i].skssqq;
// 			data.skssqz = jkmx[i].skssqz;
// 			data.zsxmMc = jkmx[i].zsxmDm;
// 			data.zspmMc = jkmx[i].zspmDm;
// 			data.yzfsrq = jkmx[i].yzfsrq;
// 			data.sksxDm = jkmx[i].sksxDm;
// 			data.jkqx = jkmx[i].jkqx;
// 			data.jkrq = jkmx[i].yzfsrq;
// 			data.kkje = jkmx[i].ynse;
// 			datas.push(data);
// 		}
// 	}
// 	grid.setData(datas);
// };