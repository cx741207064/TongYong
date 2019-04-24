/**
 * Created by hqh on 2017/9/8.
 */

function xgmSubmit(){
	
	
	var zbData = {  // 主表数据
		 
		col1_yzzzsbhsxse: viewFormData.a1 || 0,
		col1_swjgdkdzzszyfpbhsxse: viewFormData.a2 || 0,
		col1_skqjkjdptfpbhsxse: viewFormData.a3 || 0,
		col1_xsczbdcbhsxse: 0,
		col1_swjgdkdzzszyfpbhsxse1: 0,
		col1_skqjkjdptfpbhsxse2: 0,
		col1_xssygdysgdzcbhsxse: viewFormData.a7 || 0,
		col1_skqjkjdptfpbhsxse1: viewFormData.a8 || 0,
		col1_msxse: viewFormData.a9 || 0,
		col1_xwqymsxse: viewFormData.a10 || 0,
		col1_wdqzdxse: viewFormData.a11 || 0,
		col1_qtmsxse: viewFormData.a12 || 0,
		col1_ckmsxse: viewFormData.a13 || 0,
		col1_skqjkjdptfpxse1: viewFormData.a14 || 0,
		col1_hdxse: xgmsb['YSHWHDXSE'] || 0, // YSHWHDXSE
		YSHWHDXSE: xgmsb['YSHWHDXSE'] || 0, // YSHWHDXSE
	
		col1_bqynse: viewFormData.a15 || 0,
		col1_hdynse: xgmsb['YSHWHDYNSE'] || 0,
		YSHWHDYNSE: xgmsb['YSHWHDYNSE'] || 0,
		
		col1_bqynsejze: viewFormData.a16 || 0,
		col1_bqmse: viewFormData.a17 || 0,
		col1_xwqymse: viewFormData.a18 || 0,
		col1_wdqzdmse: viewFormData.a19 || 0,
		col1_ynsehj: viewFormData.a20 || 0,
		col1_bqyjse1: viewFormData.a21 || 0,
		col1_bqybtse: viewFormData.a22 || 0,
	  // 货物
	 
		col2_yzzzsbhsxse: viewFormData.b1 || 0,
		col2_swjgdkdzzszyfpbhsxse: viewFormData.b2 || 0,
		col2_skqjkjdptfpbhsxse: viewFormData.b3 || 0,
		col2_xsczbdcbhsxse: viewFormData.b4 || 0,
		col2_swjgdkdzzszyfpbhsxse1: viewFormData.b5 || 0,
		col2_skqjkjdptfpbhsxse2: viewFormData.b6 || 0,
		col2_xssygdysgdzcbhsxse: 0,
		col2_skqjkjdptfpbhsxse1: 0,
		col2_msxse: viewFormData.b9 || 0,
		col2_xwqymsxse: viewFormData.b10 || 0,
		col2_wdqzdxse: viewFormData.b11 || 0,
		col2_qtmsxse: viewFormData.b12 || 0,
		col2_ckmsxse: viewFormData.b13 || 0,
		col2_skqjkjdptfpxse1: viewFormData.b14 || 0,
		col2_hdxse: xgmsb['YSFWHDXSE'] || 0, //YSFWHDXSE
		YSFWHDXSE: xgmsb['YSFWHDXSE'] || 0, //YSFWHDXSE
		col2_bqynse: viewFormData.b15 || 0,
	
		col2_hdynse: xgmsb['YSFWHDYNSE'] || 0,
		YSFWHDYNSE: xgmsb['YSFWHDYNSE'] || 0,
		col2_bqynsejze: viewFormData.b16 || 0,
		col2_bqmse: viewFormData.b17 || 0,
		col2_xwqymse: viewFormData.b18 || 0,
		col2_wdqzdmse: viewFormData.b19 || 0,
		col2_ynsehj: viewFormData.b20 || 0,
		col2_bqyjse1: viewFormData.b21 || 0,
		col2_bqybtse: viewFormData.b22 || 0,
	   // 服务
	  // 合计服务
		col3_yzzzsbhsxse: Number(viewFormData.hj_a1 || 0),
		col3_swjgdkdzzszyfpbhsxse: Number(viewFormData.hj_a2 || 0),
		col3_skqjkjdptfpbhsxse: Number(viewFormData.hj_a3 || 0),
		col3_xsczbdcbhsxse: Number(viewFormData.hj_a4),
		col3_swjgdkdzzszyfpbhsxse1: Number(viewFormData.hj_a5 || 0),
		col3_skqjkjdptfpbhsxse2: Number(viewFormData.hj_a6 || 0),
		col3_xssygdysgdzcbhsxse: Number(viewFormData.hj_a7 || 0),
		col3_skqjkjdptfpbhsxse1: Number(viewFormData.hj_a8 || 0),
		col3_msxse: Number(viewFormData.hj_a9 || 0),
		col3_xwqymsxse: Number(viewFormData.hj_a10 || 0),
		col3_wdqzdxse: Number(viewFormData.hj_a11 || 0),
		col3_qtmsxse: Number(viewFormData.hj_a12 || 0),
		col3_ckmsxse: Number(viewFormData.hj_a13 || 0),
		col3_skqjkjdptfpxse1: Number(viewFormData.hj_a14 || 0),
		col3_hdxse: viewFormData['YSHWHDXSE_BNLJ'] || 0,
		YSHWHDXSE_BNLJ: viewFormData['YSHWHDXSE_BNLJ'] || 0,
		col3_bqynse: Number(viewFormData.hj_a15 || 0),
		col3_hdynse: viewFormData['YSHWHDYNSE_BNLJ'], //xgmsb['YSHWHDYNSE'] || 0,
		YSHWHDYNSE_BNLJ: viewFormData['YSHWHDYNSE_BNLJ'] || 0,
		
		col3_bqynsejze: Number(viewFormData.hj_a16 || 0),
		col3_bqmse: Number(viewFormData.hj_a17 || 0),
		col3_xwqymse: Number(viewFormData.hj_a18 || 0),
		col3_wdqzdmse: Number(viewFormData.hj_a19 || 0),
		col3_ynsehj: Number(viewFormData.hj_a20 || 0),
		col3_bqyjse1: Number(viewFormData.hj_a21 || 0),
		col3_bqybtse: Number(viewFormData.hj_a22 || 0),
	 
	   // 合计 服务
		col4_yzzzsbhsxse: Number(viewFormData.hj_b1 || 0),
		col4_swjgdkdzzszyfpbhsxse: Number(viewFormData.hj_b2 || 0),
		col4_skqjkjdptfpbhsxse: Number(viewFormData.hj_b3 || 0),
		col4_xsczbdcbhsxse: Number(viewFormData.hj_b4 || 0),
		col4_swjgdkdzzszyfpbhsxse1: Number(viewFormData.hj_b5 || 0),
		col4_skqjkjdptfpbhsxse2: Number(viewFormData.hj_b6 || 0),
		col4_xssygdysgdzcbhsxse: Number(viewFormData['hj_b7']),
		col4_skqjkjdptfpbhsxse1: Number(viewFormData['hj_b8']),
		col4_msxse: Number(viewFormData.hj_b9 || 0),
		col4_xwqymsxse: Number(viewFormData.hj_b10 || 0),
		col4_wdqzdxse: Number(viewFormData.hj_b11 || 0),
		col4_qtmsxse: Number(viewFormData.hj_b12 || 0),
		col4_ckmsxse: Number(viewFormData.hj_b13 || 0),
		col4_skqjkjdptfpxse1: Number(viewFormData.hj_b14 || 0),
		col4_hdxse: viewFormData['YSFWHDXSE_BNLJ'] || 0,
		YSFWHDXSE_BNLJ: viewFormData['YSFWHDXSE_BNLJ']  || 0,
		col4_bqynse: Number(viewFormData.hj_b15 || 0),
		col4_hdynse: viewFormData['YSFWHDYNSE_BNLJ'], //xgmsb['YSFWHDYNSE'] || 0,
		YSFWHDYNSE_BNLJ: viewFormData['YSFWHDYNSE_BNLJ'] || 0,
		col4_bqynsejze: Number(viewFormData.hj_b16 || 0),
		col4_bqmse: Number(viewFormData.hj_b17 || 0),
		col4_xwqymse: Number(viewFormData.hj_b18 || 0),
		col4_wdqzdmse: Number(viewFormData.hj_b19 || 0),
		col4_ynsehj: Number(viewFormData.hj_b20 || 0),
		col4_bqyjse1: Number(viewFormData.hj_b21 || 0),
		col4_bqybtse: Number(viewFormData.hj_b22 || 0)
		
	}
	
	var fb1Data = {  //附表数据
		qcye: configData.fbData.XGMFB1QCYE,//,  // 3%期初余额
		bqfse: configData.fbData['FB4JZEBQFSE'],  //3# 本期发生额
		bqkce: '0.00',
		qmye: configData.fbData['qmye3'], //3期末余额
		ysfwxsqbhssr: '0.00',
		ysfwxshsxse: '0.00',
		ysfwxsbhsxse: '0.00',
		qcye5: configData.fbData['XGMFB1QCYE5'],  //5%期初余额
		bqfse5: configData.fbData['FZJGCDDYJNSEHZ'],  //5本期发生额
		bqkce5: '0.00',
		qmye5: configData.fbData['qmye5'],  //5期末余额
		ysfwxsqbhssr5: '0.00',
		ysfwxshsxse5: '0.00',
		ysfwxsbhsxse5: '0.00',
		c6: '0.00',
		c14: "0.00"
	}; //xml06
	
	var jmbData = {  //减免表数据
        "js1_qcye": "", 
        "js1_bqfse": "", 
        "js1_bqydjse": "", 
        "js1_bqsjdjse": "", 
        "js1_qmye": "", 
        "js2_jmxzMc": "", 
        "js2_hmc": "", 
        "js2_qcye": "", 
        "js2_bqfse": "", 
        "js2_bqydjse": "", 
        "js2_bqsjdjse": "", 
        "js2_qmye": "", 
        "js3_jmxzMc": "", 
        "js3_hmc": "", 
        "js3_qcye": "", 
        "js3_bqfse": "", 
        "js3_bqydjse": "", 
        "js3_bqsjdjse": "", 
        "js3_qmye": "", 
        "js4_jmxzMc": "", 
        "js4_hmc": "", 
        "js4_qcye": "", 
        "js4_bqfse": "", 
        "js4_bqydjse": "", 
        "js4_bqsjdjse": "", 
        "js4_qmye": "", 
        "js5_jmxzMc": "", 
        "js5_hmc": "", 
        "js5_qcye": "", 
        "js5_bqfse": "", 
        "js5_bqydjse": "", 
        "js5_bqsjdjse": "", 
        "js5_qmye": "", 
        "js6_jmxzMc": "", 
        "js6_hmc": "", 
        "js6_qcye": "", 
        "js6_bqfse": "", 
        "js6_bqydjse": "", 
        "js6_bqsjdjse": "", 
        "js6_qmye": "", 
        "ms1_mzzzsxmxse": "", 
        "ms1_bqsjkcje": "", 
        "ms1_kchmsxse": "", 
        "ms1_msxsedyjxse": "", 
        "ms1_mse": "", 
        "ms2_mzzzsxmxse": "", 
        "ms2_bqsjkcje": 0, 
        "ms2_kchmsxse": 0, 
        "ms2_msxsedyjxse": 0, 
        "ms2_mse": 0, 
        "ms3_mzzzsxmxse": "", 
        "ms3_bqsjkcje": 0, 
        "ms3_kchmsxse": 0, 
        "ms3_msxsedyjxse": 0, 
        "ms3_mse": 0, 
        "ms4_jmxzMc": "", 
        "ms4_hmc": "", 
        "ms4_mzzzsxmxse": "", 
        "ms4_bqsjkcje": "", 
        "ms4_kchmsxse": "", 
        "ms4_msxsedyjxse": "", 
        "ms4_mse": "", 
        "ms5_jmxzMc": "", 
        "ms5_hmc": "", 
        "ms5_mzzzsxmxse": "", 
        "ms5_bqsjkcje": "", 
        "ms5_kchmsxse": "", 
        "ms5_msxsedyjxse": "", 
        "ms5_mse": "", 
        "ms6_jmxzMc": "", 
        "ms6_hmc": "", 
        "ms6_mzzzsxmxse": "", 
        "ms6_bqsjkcje": "", 
        "ms6_kchmsxse": "", 
        "ms6_msxsedyjxse": "", 
        "ms6_mse": "", 
        "ms7_jmxzMc": "", 
        "ms7_hmc": "", 
        "ms7_mzzzsxmxse": "", 
        "ms7_bqsjkcje": "", 
        "ms7_kchmsxse": "", 
        "ms7_msxsedyjxse": "", 
        "ms7_mse": ""
	};
	/*hjData: {
			qcye: '0.00',
			bqfse: '0.00',
			bqydjse: '0.00',
			bqsjdjse: '0.00',
			qmye: '0.00'
		},
		node: [{
			jsmc: '0.00',
			qcye: '0.00',
			bqfse: '0.00',
			bqydjse: '0.00',
			bqsjdjse: '0.00',
			qmye: '0.00'
		}]*/
	
	var sbformdata = {  //
		xgmsb_zb : zbData,
		xgmsb_fb1 : fb1Data,
		xgmsb_jmb : jmbData
	};
	
	xgmsb.SBZLlDm = xgmsb.SBZLlDm || hdxxData.sbzlcode;
	
	var submitData = [  // xml
		{ bbwjm : xgmsb.SBZLlDm + '_001.xml', bbxml : getXml.xml1() },
		{ bbwjm : xgmsb.SBZLlDm + '_006.xml', bbxml : getXml.xml6() },
		{ bbwjm : xgmsb.SBZLlDm + '_008.xml', bbxml : getXml.xml8() }
	];
					
	var params = {
		sbformdata: JSON.stringify( sbformdata ),
        formulaData: '{}',
		sssqq: hdxxData.sksssqQ,
		sssqz: hdxxData.sksssqZ,
		sbzlDm: xgmsb.SBZLlDm,
		sblxDm:"11",
		sbwjs: JSON.stringify( submitData )
	};
	
	mini.mask({
		el: document.body,
		cls: 'mini-mask-loading',
		html: '加载中...'
	});
	return ycsCheck(params, submitData);
    /*if(!ycsCheck(params, submitData)){
        return false;
    }*/
    // return realSend(params, submitData);

    //    caService.update(nsrxxUtil.getNsrxxVO().nsrsbh);


}
var realSend = function (params, submitData) {
    /*if (caService.sfAzCa) {
        var s = caService.checkCA(nsrxxUtil.getNsrxxVO().nsrsbh);
        if(s == '11'){
            return;
        }
        if (s != 0 && s.indexOf("##") == -1) {
            var CaRecordVo = {};
            var camw = caService.encryptData(nsrxxUtil.getNsrxxVO().nsrsbh, mini.encode(submitData));//ca加密后密文
            if (camw && camw.indexOf("##") == -1 && camw.indexOf("&&") != -1) {
                CaRecordVo.sfnsrqm = "Y";//是否经过纳税人CA签名
                CaRecordVo.catype = caService.descCALx(caService.checkCA(nsrxxUtil.getNsrxxVO().nsrsbh));
                CaRecordVo.unencryptedbw = mini.encode(submitData);
                CaRecordVo.encryptedbw = caService.getCaMw(camw);
                CaRecordVo.yqzs = caService.getCaZs(camw);
                params.caData = mini.encode(CaRecordVo);
            }
        }
    }*/
    if(methods.checkIsReportWithOthers(params)){
        return false;
    }

    return sbtj(params);
};
var sbtj = function (request) {
    var result = false;
    ajax.post('../../../api/sb/common/submit/sbcl', mini.encode(request), function( response ){
        mini.unmask(document.body);
        if (response.success) {
            result = true;
        }else{
            mini.alert(response.message);
            result = false;
        }
    },function (req) {
        mini.unmask(document.body);
        mini.alert(req.message);
        result = false;
    });
    return result;
};


var getXml = {
	
	'xml8': function(){
		var xml08Str =
			'<zzsjmssbmxb>\
				<zzsjmssbmxbjsxmGrid>\
					<zzsjmssbmxbjsxmGridlbVO>\
						<ewbhxh>1</ewbhxh>\
						<hmc>合计</hmc>\
						<qcye>0</qcye>\
							<bqfse>0</bqfse>\
							<bqydjse>0</bqydjse>\
							<bqsjdjse>0</bqsjdjse>\
							<qmye>0</qmye>\
						</zzsjmssbmxbjsxmGridlbVO>\
						<zzsjmssbmxbjsxmGridlbVO>\
							<ewbhxh>2</ewbhxh>\
							<hmc></hmc>\
							<qcye>0</qcye>\
							<bqfse>0</bqfse>\
							<bqydjse>0</bqydjse>\
							<bqsjdjse>0</bqsjdjse>\
							<qmye>0</qmye>\
						</zzsjmssbmxbjsxmGridlbVO>\
					</zzsjmssbmxbjsxmGrid>\
					<zzsjmssbmxbmsxmGrid>\
						<zzsjmssbmxbmsxmGridlbVO>\
							<ewbhxh>1</ewbhxh>\
							<hmc>合计</hmc>\
							<mzzzsxmxse>0</mzzzsxmxse>\
							<bqsjkcje>0</bqsjkcje>\
							<kchmsxse>0</kchmsxse>\
							<msxsedyjxse>0</msxsedyjxse>\
							<mse>0</mse>\
						</zzsjmssbmxbmsxmGridlbVO>\
						<zzsjmssbmxbmsxmGridlbVO>\
							<ewbhxh>2</ewbhxh>\
							<hmc>出口免税</hmc>\
							<mzzzsxmxse>0</mzzzsxmxse>\
						</zzsjmssbmxbmsxmGridlbVO>\
						<zzsjmssbmxbmsxmGridlbVO>\
							<ewbhxh>3</ewbhxh>\
							<hmc>其中：跨境服务</hmc>\
							<mzzzsxmxse>0</mzzzsxmxse>\
						</zzsjmssbmxbmsxmGridlbVO>\
				</zzsjmssbmxbmsxmGrid>\
			</zzsjmssbmxb>';
		//console.log( xml08Str );
		return xml08Str;
	},
	
	'xml6': function(){
		var xml06Str =
			'<zzsxgmflzl>\
				<flzlForm>\
					<qcye>' + toFixed( configData.fbData['XGMFB1QCYE'] || 0 ) + '</qcye>\
					<bqfse>' + toFixed( configData.fbData['FB4JZEBQFSE'] || 0 ) + '</bqfse>\
					<bqkce>0.00</bqkce>\
					<qmye>' + toFixed( configData.fbData['qmye']  || 0 ) + '</qmye>\
					<ysfwxsqbhssr>0.00</ysfwxsqbhssr>\
					<ysfwxshsxse>0.00</ysfwxshsxse>\
					<ysfwxsbhsxse>0.00</ysfwxsbhsxse>\
					<qcye5>' + toFixed( configData.fbData['XGMFB1QCYE5'] || 0 ) + '</qcye5>\
					<bqfse5>' + toFixed( configData.fbData['FZJGCDDYJNSEHZ'] || 0 ) + '</bqfse5>\
					<bqkce5>0.00</bqkce5>\
					<qmye5>' + toFixed( configData.fbData['qmye5'] || 0 ) + '</qmye5>\
					<ysfwxsqbhssr5>0.00</ysfwxsqbhssr5>\
					<ysfwxshsxse5>0.00</ysfwxshsxse5>\
					<ysfwxsbhsxse5>0.00</ysfwxsbhsxse5>\
				</flzlForm>\
			</zzsxgmflzl>';
		//console.log( xml06Str );
		return xml06Str;
	},
	
	'xml1': function(){
		var xml01Str =
			'<zzssyyxgmnsr>\
				<sbbhead>\
					<nsrsbh>' + xgmsb.nsrsbh + '</nsrsbh>\
						<nsrmc>' + xgmsb.nsrmc + '</nsrmc>\
						<skssqq>' + hdxxData.sksssqQ + '</skssqq>\
						<skssqz>' + hdxxData.sksssqZ + '</skssqz>\
						<sbsxDm1>11</sbsxDm1>\
						<sbrq1>' + getPrevDate + '</sbrq1>\
					</sbbhead>\
					<zzsxgmGrid>\
						<zzsxgmGridlb>\
							<ewblxh>1</ewblxh>\
							<lmc>货物及劳务</lmc>\
							<yzzzsbhsxse>' + toFixed( viewFormData.a1 || 0) + '</yzzzsbhsxse>\
							<swjgdkdzzszyfpbhsxse>' + toFixed( viewFormData.a2 || 0) + '</swjgdkdzzszyfpbhsxse>\
							<skqjkjdptfpbhsxse>' + toFixed( viewFormData.a3 || 0) + '</skqjkjdptfpbhsxse>\
							<xsczbdcbhsxse>' + toFixed( viewFormData.a4 || 0) + '</xsczbdcbhsxse>\
							<swjgdkdzzszyfpbhsxse1>' + toFixed( viewFormData.a6 || 0) + '</swjgdkdzzszyfpbhsxse1>\
							<skqjkjdptfpbhsxse2>' + toFixed( viewFormData.a4 || 0) + '</skqjkjdptfpbhsxse2>\
							<xssygdysgdzcbhsxse>' + toFixed( viewFormData.a7 || 0) + '</xssygdysgdzcbhsxse>\
							<skqjkjdptfpbhsxse1>' + toFixed( viewFormData.a8 || 0) + '</skqjkjdptfpbhsxse1>\
							<msxse>' + toFixed( viewFormData.a9 || 0) + '</msxse>\
							<xwqymsxse>' + toFixed( viewFormData.a10 || 0) + '</xwqymsxse>\
							<wdqzdxse>' + toFixed( viewFormData.a11 || 0) + '</wdqzdxse>\
							<qtmsxse>' + toFixed( viewFormData.a12 || 0) + '</qtmsxse>\
							<ckmsxse>' + toFixed( viewFormData.a13 || 0) + '</ckmsxse>\
							<skqjkjdptfpxse1>' + toFixed( viewFormData.a14 || 0) + '</skqjkjdptfpxse1>\
							<hdxse>' + ( viewFormData.YSHWHDXSE||0) + '</hdxse>\
							<bqynse>' + toFixed( viewFormData.a15 || 0) + '</bqynse>\
							<hdynse>' + ( viewFormData.YSHWHDYNSE||0) + '</hdynse>\
							<bqynsejze>' + toFixed( viewFormData.a16 || 0) + '</bqynsejze>\
							<bqmse>' + toFixed( viewFormData.a17 || 0) + '</bqmse>\
							<xwqymse>' + toFixed( viewFormData.a18 || 0) + '</xwqymse>\
							<wdqzdmse>' + toFixed( viewFormData.a19 || 0) + '</wdqzdmse>\
							<ynsehj>' + toFixed( viewFormData.a20 || 0) + '</ynsehj>\
							<bqyjse1>' + toFixed( viewFormData.a21 || 0) + '</bqyjse1>\
							<bqybtse>' + toFixed( viewFormData.a22 || 0) + '</bqybtse>\
						</zzsxgmGridlb>\
						<zzsxgmGridlb>\
							<ewblxh>2</ewblxh>\
							<lmc>服务、不动产和无形资产</lmc>\
							<yzzzsbhsxse>' + toFixed( viewFormData.b1 || 0) + '</yzzzsbhsxse>\
							<swjgdkdzzszyfpbhsxse>' + toFixed( viewFormData.b2 || 0) + '</swjgdkdzzszyfpbhsxse>\
							<skqjkjdptfpbhsxse>' + toFixed( viewFormData.b3 || 0) + '</skqjkjdptfpbhsxse>\
							<xsczbdcbhsxse>' + toFixed( viewFormData.b4 || 0) + '</xsczbdcbhsxse>\
							<swjgdkdzzszyfpbhsxse1>' + toFixed( viewFormData.b5 || 0) + '</swjgdkdzzszyfpbhsxse1>\
							<skqjkjdptfpbhsxse2>' + toFixed( viewFormData.b6 || 0) + '</skqjkjdptfpbhsxse2>\
							<xssygdysgdzcbhsxse>' + toFixed( viewFormData.b7 || 0) + '</xssygdysgdzcbhsxse>\
							<skqjkjdptfpbhsxse1>' + toFixed( viewFormData.b8 || 0) + '</skqjkjdptfpbhsxse1>\
							<msxse>' + toFixed( viewFormData.b9 || 0) + '</msxse>\
							<xwqymsxse>' + toFixed( viewFormData.b10 || 0) + '</xwqymsxse>\
							<wdqzdxse>' + toFixed( viewFormData.b11 || 0) + '</wdqzdxse>\
							<qtmsxse>' + toFixed( viewFormData.b12 || 0) + '</qtmsxse>\
							<ckmsxse>' + toFixed( viewFormData.b13 || 0) + '</ckmsxse>\
							<skqjkjdptfpxse1>' + toFixed( viewFormData.b14 || 0) + '</skqjkjdptfpxse1>\
							<hdxse>' + ( viewFormData.YSFWHDXSE || 0) + '</hdxse>\
							<bqynse>' + toFixed( viewFormData.b15 || 0) + '</bqynse>\
							<hdynse>'+ ( viewFormData.YSFWHDYNSE || 0) +'</hdynse>\
							<bqynsejze>' + toFixed( viewFormData.b16 || 0) + '</bqynsejze>\
							<bqmse>' + toFixed( viewFormData.b17 || 0) + '</bqmse>\
							<xwqymse>' + toFixed( viewFormData.b18 || 0) + '</xwqymse>\
							<wdqzdmse>' + toFixed( viewFormData.b19 || 0) + '</wdqzdmse>\
							<ynsehj>' + toFixed( viewFormData.b20 || 0) + '</ynsehj>\
							<bqyjse1>' + toFixed( viewFormData.b21 || 0) + '</bqyjse1>\
							<bqybtse>' + toFixed( viewFormData.b22 || 0) + '</bqybtse>\
						</zzsxgmGridlb>\
						<zzsxgmGridlb>\
							<ewblxh>3</ewblxh>\
							<lmc>货物及劳务</lmc>\
							<yzzzsbhsxse>' + toFixed(parseFloat( viewFormData.hj_a1||0) ) + '</yzzzsbhsxse>\
							<swjgdkdzzszyfpbhsxse>' + toFixed(parseFloat( viewFormData.hj_a2||0)) + '</swjgdkdzzszyfpbhsxse>\
							<skqjkjdptfpbhsxse>' + toFixed(parseFloat( viewFormData.hj_a3||0)) + '</skqjkjdptfpbhsxse>\
							<xsczbdcbhsxse>' + toFixed(parseFloat( viewFormData.hj_a4||0)) + '</xsczbdcbhsxse>\
							<swjgdkdzzszyfpbhsxse1>' + toFixed(parseFloat( viewFormData.hj_a5||0)) + '</swjgdkdzzszyfpbhsxse1>\
							<skqjkjdptfpbhsxse2>' + toFixed(parseFloat( viewFormData.hj_a6||0)) + '</skqjkjdptfpbhsxse2>\
							<xssygdysgdzcbhsxse>' + toFixed(parseFloat( viewFormData.hj_a7||0)) + '</xssygdysgdzcbhsxse>\
							<skqjkjdptfpbhsxse1>' + toFixed(parseFloat( viewFormData.hj_a8||0)) + '</skqjkjdptfpbhsxse1>\
							<msxse>' + toFixed(parseFloat( viewFormData.hj_a9||0) ) + '</msxse>\
							<xwqymsxse>' + toFixed(parseFloat( viewFormData.hj_a10||0)) + '</xwqymsxse>\
							<wdqzdxse>' + toFixed(parseFloat( viewFormData.hj_a11||0)) + '</wdqzdxse>\
							<qtmsxse>' + toFixed(parseFloat( viewFormData.hj_a12||0)) + '</qtmsxse>\
							<ckmsxse>' + toFixed(parseFloat( viewFormData.hj_a13||0)) + '</ckmsxse>\
							<skqjkjdptfpxse1>' + toFixed(parseFloat( viewFormData.hj_a14||0)) + '</skqjkjdptfpxse1>\
							<hdxse>'+ toFixed( parseFloat( viewFormData.YSHWHDXSE||0) + parseFloat( viewFormData.LShdxse3||0)) +'</hdxse>\
							<bqynse>' + toFixed(parseFloat( viewFormData.hj_a15||0)) + '</bqynse>\
							<hdynse>'+ toFixed( parseFloat( viewFormData.LShdynse3||0) + parseFloat( viewFormData.YSHWHDYNSE||0) ) +'</hdynse>\
							<bqynsejze>' + toFixed(parseFloat( viewFormData.hj_a16||0)) + '</bqynsejze>\
							<bqmse>' + toFixed(parseFloat( viewFormData.hj_a17||0)) + '</bqmse>\
							<xwqymse>' + toFixed(parseFloat( viewFormData.hj_a18||0)) + '</xwqymse>\
							<wdqzdmse>' + toFixed(parseFloat( viewFormData.hj_a19||0)) + '</wdqzdmse>\
							<ynsehj>' + toFixed(parseFloat( viewFormData.hj_a20||0)) + '</ynsehj>\
							<bqyjse1>' + toFixed(parseFloat( viewFormData.hj_a21||0)) + '</bqyjse1>\
							<bqybtse>' + toFixed( parseFloat(viewFormData.hj_a22||0)) + '</bqybtse>\
						</zzsxgmGridlb>\
						<zzsxgmGridlb>\
							<ewblxh>4</ewblxh>\
							<lmc>服务、不动产和无形资产</lmc>\
							<yzzzsbhsxse>' + toFixed( parseFloat(viewFormData.hj_b1 || 0)) + '</yzzzsbhsxse>\
							<swjgdkdzzszyfpbhsxse>' + toFixed( parseFloat(viewFormData.hj_b2 || 0)) + '</swjgdkdzzszyfpbhsxse>\
							<skqjkjdptfpbhsxse>' + toFixed(parseFloat( viewFormData.hj_b3 || 0)) + '</skqjkjdptfpbhsxse>\
							<xsczbdcbhsxse>' + toFixed( parseFloat(viewFormData.hj_b4 || 0) ) + '</xsczbdcbhsxse>\
							<swjgdkdzzszyfpbhsxse1>' + toFixed( parseFloat(viewFormData.hj_b5 || 0)) + '</swjgdkdzzszyfpbhsxse1>\
							<skqjkjdptfpbhsxse2>' + toFixed( parseFloat(viewFormData.hj_b6 || 0) ) + '</skqjkjdptfpbhsxse2>\
							<xssygdysgdzcbhsxse>' + toFixed( parseFloat(viewFormData.hj_b7 || 0) ) + '</xssygdysgdzcbhsxse>\
							<skqjkjdptfpbhsxse1>' + toFixed( parseFloat(viewFormData.hj_b8 || 0) ) + '</skqjkjdptfpbhsxse1>\
							<msxse>' + toFixed(parseFloat( viewFormData.hj_b9||0)) + '</msxse>\
							<xwqymsxse>' + toFixed( parseFloat( viewFormData.hj_b10||0) ) + '</xwqymsxse>\
							<wdqzdxse>' + toFixed( parseFloat( viewFormData.hj_b11||0) ) + '</wdqzdxse>\
							<qtmsxse>' + toFixed( parseFloat( viewFormData.hj_b12||0)) + '</qtmsxse>\
							<ckmsxse>' + toFixed( parseFloat( viewFormData.hj_b13||0)) + '</ckmsxse>\
							<skqjkjdptfpxse1>' + toFixed(parseFloat( viewFormData.hj_b14||0)) + '</skqjkjdptfpxse1>\
							<hdxse>' + toFixed( parseFloat( viewFormData.LShdxse4||0) + parseFloat( viewFormData.YSFWHDXSE || 0) ) + '</hdxse>\
							<bqynse>' + toFixed( parseFloat( viewFormData.hj_b15||0)) + '</bqynse>\
							<hdynse>' + toFixed( parseFloat( viewFormData.LShdynse4||0) + parseFloat( viewFormData.YSFWHDYNSE || 0) ) + '</hdynse>\
							<bqynsejze>' + toFixed( parseFloat(viewFormData.hj_b16||0) ) + '</bqynsejze>\
							<bqmse>' + toFixed( parseFloat( viewFormData.hj_b17||0)) + '</bqmse>\
							<xwqymse>' + toFixed( parseFloat( viewFormData.hj_b18||0)) + '</xwqymse>\
							<wdqzdmse>' + toFixed( parseFloat( viewFormData.hj_b19||0)) + '</wdqzdmse>\
							<ynsehj>' + toFixed(parseFloat( viewFormData.hj_b20||0)) + '</ynsehj>\
							<bqyjse1>' + toFixed( parseFloat( viewFormData.hj_b21||0)) + '</bqyjse1>\
							<bqybtse>' + toFixed( parseFloat( viewFormData.hj_b22||0)) + '</bqybtse>\
						</zzsxgmGridlb>\
					</zzsxgmGrid>\
					<slxxForm>\
						<sfzxsb></sfzxsb>\
						<bsrxm></bsrxm>\
						<cwfzrxm></cwfzrxm>\
						<fddbrxm></fddbrxm>\
						<bsrlxdh></bsrlxdh>\
						<dlrmc></dlrmc>\
						<jbrxm></jbrxm>\
						<slswjgDm></slswjgDm>\
						<slswjgMc></slswjgMc>\
						<jbrlxdh></jbrlxdh>\
						<slrDm></slrDm>\
						<slrxm></slrxm>\
						<slrq></slrq>\
					</slxxForm>\
				</zzssyyxgmnsr>';
		//$scope.xml01Str = xml01Str;
		//console.log( xml01Str );
		return xml01Str;
	}
};

var ycsCheck = function (request, submitData) {
    var needYcsbd = Api.getData('/sbzx-web/api/sb/sbbd/needBd', '', 'get').value || false;
    if(!needYcsbd){//不需要一窗式比对
        return realSend(request, submitData);
    }
    var ycsResult = ycsAjax(request);
    if(!ycsResult){
        return false;
    }
    var returnBz = ycsResult.sbzzsSaveReturnVO.returnBz;
    var bdjgbz = ycsResult.sbzzsSaveReturnVO.bdjgbz;
    var bdjgList = [];
    try{
        bdjgList = ycsResult.sbzzsSaveReturnVO.sbsbbdBdjgVO.bdjgmxGrid.bdjgmxGridlb;
    }catch(e){}
    if(returnBz === 'Y'){//一窗式比对结果为成功----走正常申报流程
        return realSend(request, submitData);
    }
    //一窗式比对结果失败,终止原申报流程，后续申报流程由本方法体内来决定
    if(returnBz === 'N' && bdjgbz === 'N'){
        this.showYcsbdResult(bdjgList, request, submitData);
        return false;
    }
    return realSend(request, submitData);
};
var showYcsbdResult = function (bdjgList, request, submitData) {
    var count_bdlx_1_jkjb_2_bdjg_N = 0;
    var count_bdlx_2_jkjb_2_bdjg_N = 0;
    var count_jkjb_1_bdjg_N = 0;
    var bdjgMap = {};
    var trs = '';
    $.each(bdjgList, function (i,obj) {
        if(this.bdlx === '1' && this.jkjb === '2' && this.bdjg === 'N'){
            count_bdlx_1_jkjb_2_bdjg_N += 1;
        }
        if(this.bdlx === '2' && this.jkjb === '2' && this.bdjg === 'N'){
            count_bdlx_2_jkjb_2_bdjg_N += 1;
        }
        if(this.jkjb === '1' && this.bdjg === 'N'){
            count_jkjb_1_bdjg_N += 1;
        }
        bdjgMap[this.bdgzDm] = obj;
        // trs += '<tr bdgzDm="'+this.bdgzDm+'"><td>'+this.bdmc+'</td><td>'+this.bdjg==='Y'?'通过':'<span class="txt-red">不通过</span>'+'</td></tr>'
        trs += '<tr bdgzDm="'+this.bdgzDm+'"><td>'+this.bdmc+'</td><td>'+(this.bdjg==='N'?'<span class="txt-red">不通过</span>':'通过')+'</td></tr>'
    });
    var html = '<div class="ycsResult">' +
        '<div class="ycsbdjgHead">' +
        '<table><tr><td width="80%">规则</td><td width="20%">通过情况</td></tr></table>' +
        '</div>' +
        '<div class="ycsbdjgList">' +
        '<table><colgroup><col width="80%"><col width="20%"></colgroup>' + trs +'</table>' +
        '</div>' +
        '<div class="ycsbdDetail">' +
        '<p>详细规则：</p>' +
        '<p>比对规则代码：<span id="bdgzDm"></span></p>' +
        '<p>比对规则名称：<span id="bdmc"></span></p>' +
        '<p>比对规则内容：<span id="bdnr"></span></p>' +
        '<p>比对结果：<span id="bdjg"></span></p>' +
        '<p><span id="bdbfjgbcnr"></span></p>' +
        '</div>' +
        '</div>';
    var buttons = ['返回修改'];
    if(count_bdlx_1_jkjb_2_bdjg_N === 0){
        buttons.unshift('继续发送');
    }
    var ycsdbMessageId = mini.showMessageBox({
        title: '一窗式比对结果',
        width: 900,
        height:550,
        maxHeight: 550,
        buttons: buttons,
        showCloseButton: false,
        html: html,
        callback: function(action){
            if(action === '继续发送'){
                if(count_bdlx_2_jkjb_2_bdjg_N > 0){
                    request.sfyczb = 'Y';
                }else if(count_jkjb_1_bdjg_N > 0){
                    request.sfyczb = 'S';
                }
                ycsChecked = true;
                realSend(request, submitData);
                stepNav.wizard.steps('next');
            }
        }
    });
    $('#'+ycsdbMessageId).addClass('fixedWindowTop0');
    this.bindYcsbdEvent(bdjgMap);
};
var bindYcsbdEvent = function (bdjgMap) {
    $('.ycsbdjgList').on('click', 'tr', function () {
        var curTrBdjgDm = $(this).attr('bdgzDm');
        if($('#bdgzDm').html() === curTrBdjgDm){
            return;
        }
        $('#bdgzDm').html(curTrBdjgDm);
        $('#bdmc').html(bdjgMap[curTrBdjgDm].bdmc);
        $('#bdnr').html(bdjgMap[curTrBdjgDm].bdnr);
        $('#bdjg').html(bdjgMap[curTrBdjgDm].bdjg === 'N'?'不通过':'通过');
        $('#bdbfjgbcnr').html(bdjgMap[curTrBdjgDm].bdbfjgbcnr);
    })
};
var ycsAjax = function (request) {
    var url = '/sbzx-web/api/sb/sbbd/zzsbd';
    return Api.getData(url, request);
};