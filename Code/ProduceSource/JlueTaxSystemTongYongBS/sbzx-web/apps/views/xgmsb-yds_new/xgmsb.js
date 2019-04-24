var configData = {
        zbData: {},
        hwData: {
            A2: '0.00',
            A3: '0.00',
            D1: '0.00',
            A7: '0.00',
            A8: '0.00',
            A12: '0.00',
            A13: '0.00',
            A14: '0.00',
            Q1: '0.00',
            A16: '0.00',
            A21: '0.00'

        }, // 货物劳务data
        fwData: {
            B2: '0.00',
            B3: '0.00',
            D2: '0.00',
            B5: '0.00',
            E1: '0.00',
            B6: '0.00',
            E2: '0.00',
            D3: '0.00',
            B12: '0.00',
            B13: '0.00',
            B14: '0.00',
            Q2: '0.00',
            B21: '0.00',
            B16: '0.00'

        },  // 服务data
        skjs_data: {
            B21: '0.00',
            A16: '0.00',
            A21: '0.00'
        }, //税款合计data
        sbInfo: {}, //申报信息
        fbData: {},
        ifOverHwQzd: false,  //大于货劳起征点 默认false
        ifOverFwQzd: false   //大于服务起征点 默认false
    },
    hdxxData = {}, // 核定信息 数据
    xgmsb = {},
    viewFormData = {},
    hwForm,  // 货物 form 对象
    fwForm,  // 劳务 form 对象
    xsxx_form, // 销售信息对象
    skjs_form, // 税款合计对象
    viewGrid = {},  // 预览grid对象
    glfjsBz = false;  //关联附加税标志
var confirmBz = false;
var ycsChecked = false;
stepNav.head = false;
stepNav.foot = false;
stepNav.run = function () {
    header.init();
    stepNav.initSteps([
        {id: 0, title: '填写销售信息', url: 'xsxx.html'},
        {id: 1, title: '税款计算', url: 'skjs.html'},
        {id: 2, title: '预览申报表', url: 'qrsbbView.html', yltj: true},
        {id: 3, title: '完成', url: 'sbtjView.html'}
    ]);

    mini.parse();
    hwForm = new mini.Form('#hwForm');
    fwForm = new mini.Form('#fwForm');
    xsxx_form = new mini.Form('#xsxx_form');
    skjs_form = new mini.Form('#skjs_form');

    viewGrid.zb = new mini.Form('#xgmsb_zb');  // 主表
    viewGrid.fb = new mini.Form('#xgmsb_fb1'); // 附表
    viewGrid.jmb = new mini.Form('#xgmsb_jmb');  // 减免表


    xgmsbService.getSbzl({
        sbny: getPrevMonth
    }, function (data) {
        if (data.success) {
            var isSBH = false; //是否是申报户   区别与 一般纳税人
            $.each(data.value, function (index, obj) {
                if (obj.sbzlDm == '10102' || obj.sbzlDm == '10103') { //申报类型， 月报 季报
                    xgmsb.SBZLlDm = obj.sbzlDm; // 季报 月报
                    //getQcData(SBZLlDm);
                    isSBH = true;
                }
            });
            if (!isSBH) {
                mini.alert('您本月不存在【小规模申报】的应申报信息，无须进行申报', '提示', function (action) {
                    if (action == "ok" || action == "close")
                        window_close();
                });
            }
        } else {
            mini.alert(data.message || '网络错误，请稍后再发送', '提示', function (action) {
                window_close();
            });
        }
    });
    if (xgmsb.SBZLlDm) {
        // 核定 期初 数据
        xgmsbService.getHdxx(mini.encode({
            // sbny: getPrevMonth,
            sbzlDm: xgmsb.SBZLlDm
        }), function (data) {
            if (!data.success || !data.value) {
                mini.alert(data.message, '提示', function (action) {
                    if (action == "ok" || action == "close")
                        window_close();
                });
                return;
            }
            if(!methods.initData(data)){
              return ;
            }
            if (methods.getFjsBz()){
                methods.compareGds();
            }
        });
    }

    //切换步骤
    stepNav.onStepChanging = function (event, currentIndex, newIndex) {
        if (currentIndex == 0) {  //第一步
            ycsChecked = false;
            if (!xsxx_form.validate()) {
                return false;
            }
            methods.getXsssView();

            var hwData = hwForm.getData();
            var fwData = fwForm.getData();
            $.extend(configData.hwData, hwData);
            $.extend(configData.fwData, fwData);

            methods.hwHjXse();
            methods.fwHjXse();
            methods.jsHwViewData();
            methods.jsFwViewData();
            methods.setBqynseTips();

            if (configData.ifOverHwQzd) { // 货物大于起征点，要跟核定值比较，取大者 计算
                viewFormData['a15'] = configData.hwData.A15 = ((parseFloat(viewFormData['a1']) + parseFloat(viewFormData['a7'])) * 0.03).toFixed(2);
            } else {
                viewFormData['a15'] = configData.hwData.A15 = ((parseFloat(viewFormData['a1']) + parseFloat(viewFormData['a7'])) * 0.03).toFixed(2);
            }
            if (configData.ifOverFwQzd) { // 服务大于起征点，要跟核定值比较，取大者 计算
                viewFormData['b15'] = configData.fwData.B15 = (parseFloat(viewFormData['b1']) * 0.03 + parseFloat(viewFormData['b4']) * 0.05).toFixed(2);
            } else {
                viewFormData['b15'] = configData.fwData.B15 = (parseFloat(viewFormData['b1']) * 0.03 + parseFloat(viewFormData['b4']) * 0.05).toFixed(2);
            }

            if (xgmsb['GTHBZ'] === '1') {
                configData.hwData.A19 = viewFormData['a19'] = configData.hwData.A19 = ( viewFormData['a11'] * 0.03 ).toFixed(2);
            } else {
                configData.hwData.A19 = viewFormData['a19'] = configData.hwData['A19'] = '0.00';
            }

            if (xgmsb['GTHBZ'] === '0') {
                configData.hwData.A18 = viewFormData['a18'] = (viewFormData['a10'] * 0.03).toFixed(2);
            } else {
                configData.hwData.A18 = viewFormData['a18'] = '0.00';
            }

            if (configData.ifOverFwQzd) {
                configData.fwData.B18 = viewFormData['b18'] = '0.00';
            } else {
                configData.fwData.B18 = viewFormData['b18'] = (parseFloat(viewFormData['b30'] * 0.03) + parseFloat(viewFormData['b31'] * 0.05)).toFixed(2);
            }

            if (configData.ifOverFwQzd) {
                configData.fwData.B19 = viewFormData['b19'] = '0.00';
            } else {
                configData.fwData.B19 = viewFormData['b19'] = (parseFloat(viewFormData['b34'] * 0.03) + parseFloat(viewFormData['b35'] * 0.05)).toFixed(2);
            }
            if(hdxxUtil.getWsxxValueByCode('HWYQSB') === '1'){
                configData.hwData['a20'] = configData.hwData['A20'] = (Math.max(parseFloat(configData.hwData.A15) - parseFloat(configData.hwData.A16), parseFloat(xgmsb.YSHWHDYNSE) - parseFloat(configData.hwData.A16))).toFixed(2);
            }else{
                configData.hwData['a20'] = configData.hwData['A20'] = (parseFloat(configData.hwData.A15) - parseFloat(configData.hwData.A16)).toFixed(2);
            }
            if(hdxxUtil.getWsxxValueByCode('FWYQSB') === '1'){
                configData.fwData['b20'] = configData.fwData['B20'] = (Math.max(parseFloat(configData.fwData.B15) - parseFloat(configData.fwData.B16), parseFloat(xgmsb.YSFWHDYNSE) - parseFloat(configData.fwData.B16))).toFixed(2);
            }else{
                configData.fwData['b20'] = configData.fwData['B20'] = (parseFloat(configData.fwData.B15) - parseFloat(configData.fwData.B16)).toFixed(2);
            }
            //
            viewFormData['a21'] = configData.hwData.A21;
            viewFormData['b21'] = configData.fwData.B21;
            methods.initSkjsData();

            viewFormData['YSHWHDXSE'] = xgmsb['YSHWHDXSE'];
            viewFormData['YSFWHDXSE'] = xgmsb['YSFWHDXSE'];

            viewFormData['YSHWHDXSE_BNLJ'] = Number(xgmsb['YSHWHDXSE']) + Number(xgmsb.lsxxData[44].value || 0); //  应税货物劳务核定销售额
            viewFormData['YSFWHDXSE_BNLJ'] = Number(xgmsb['YSFWHDXSE']) + Number(xgmsb.lsxxData[46].value || 0); // 应税服务核定销售额额 合计
            viewFormData['YSHWHDYNSE_BNLJ'] = Number(xgmsb['YSHWHDYNSE']) + Number(xgmsb.lsxxData[45].value || 0); // 应税货物劳务核定应纳税额 --
            viewFormData['YSFWHDYNSE_BNLJ'] = Number(xgmsb['YSFWHDYNSE']) + Number(xgmsb.lsxxData[47].value || 0); // 应税服务核定应纳税额 --


            //viewFormData['YSHWHDXSE_BNLJ'] = xgmsb['YSHWHDXSE'];
            //viewFormData['YSFWHDXSE_BNLJ'] = xgmsb['YSFWHDXSE'];
            //viewFormData['YSHWHDYNSE_BNLJ'] = xgmsb['YSHWHDYNSE'];
            //viewFormData['YSFWHDYNSE_BNLJ'] = xgmsb['YSFWHDYNSE'];


        }

        if (currentIndex == 1) { //第二步骤
            ycsChecked = false;
            if (!(skjs_form.validate() && methods.validateYjse())) {
                return false;
            }

            methods.setViewData(); // 设置主表显示数据

            methods.setViewHjData();  // 设置合计数据

            methods.setViewData(); // 设置主表显示数据


            viewGrid.zb.setData(configData.zbData); //viewFormData
            viewGrid.fb.setData(configData.fbData);
            viewGrid.jmb.setData(viewFormData);

            viewGrid.zb.setEnabled();  // 设置只读
            viewGrid.fb.setEnabled();  // 设置只读
            viewGrid.jmb.setEnabled(); // 设置只读
        }

        if (currentIndex == 2) { //提交
            if(ycsChecked){
                return true;
            }
            if(!confirmBz){
                mini.unmask();
                mini.confirm('请确认您所提交的申报数据真实有效，若存在问题税务机关将触发异常比对流程，期间网上不再支持申报更正和申报作废，解除异常后重新提供网上更正申报！','提示', function (action) {
                    if(action === 'ok'){
                        mini.mask('正在提交，请稍候...');
                        var result = xgmSubmit();
                        if (result) {
                            //methods.counter(1);
                            confirmBz = true;
                            stepNav.wizard.steps('next');
                        }
                        mini.unmask();
                    }
                });
                return false;
            }
        }

        return true;
    }

}

var methods = {
    reportWithNext: {
        getHdByDM: '10115',
        sbzlDmArr: ['10115','10116'],
        sbzlMc: '附加税',
        url:'../sb_fjs/sb_fjs.html?sbzlDm=10115'
    },
    counter: function (time) {
        var sec = time;
        var timer = setInterval(function () {
            sec--;
            $('#xgmsb-timer').text(sec < 10 ? '0' + sec : sec);
            if (sec == 0) {
                clearInterval(timer);
                window.location.href = '../gdsSbjgcx/sbjgcx.html?zsxmDm=10101';
            }
        }, 1000);
    },
    setQ1Q2: function () {
        methods.getXsssView();
        var hwData = hwForm.getData();
        var fwData = fwForm.getData();
        $.extend(configData.hwData, hwData);
        $.extend(configData.fwData, fwData);
        methods.hwHjXse();
        methods.fwHjXse();
    },
    setBqynseTips: function () {
        var bqynseTips = '',
            a1 = parseFloat(viewFormData['a1']),
            a7 = parseFloat(viewFormData['a7']),
            b1 = parseFloat(viewFormData['b1']),
            b4 = parseFloat(viewFormData['b4']),
            hwBqynse = ((a1 + a7) * 3 / 100).toFixed(2),
            fwBqynse = (b1 * 3 / 100 + b4 * 5 / 100).toFixed(2);
        if (xgmsb.SZLBDM == '01') {
            bqynseTips = '本期总销售额为' + (a1 + a7).toFixed(2) +
                '元，税率为3%，您本期应纳税额为' + hwBqynse + '元。';
        } else if (xgmsb.SZLBDM == '02') {
            bqynseTips = '本期应征增值税不含税销售额为' + b1.toFixed(2) +
                '元，税率为3%，本期销售、出租不动产不含税销售额为' + b4.toFixed(2) +
                '元，税率为5%，您本期应纳税额为' + fwBqynse + '元';
        } else if (xgmsb.SZLBDM == '03') {
            bqynseTips = '货物及劳务：本期总销售额为' + (a1 + a7).toFixed(2) +
                '元，税率为3%，您本期应纳税额为' + hwBqynse + '元；<br/><br/>' +
                '服务、不动产和无形资产：本期应征增值税不含税销售额为' + b1.toFixed(2) +
                '元，税率为3%，本期销售、出租不动产不含税销售额为' + b4.toFixed(2) +
                '元，税率为5%，您本期应纳税额为' + fwBqynse + '元。';
        }
        $('#skjs-bqynse').html(bqynseTips);
    },
    setViewData: function () {

        viewFormData['a16'] = configData.hwData.A16;
        viewFormData['b16'] = configData.fwData.B16;

        viewFormData['a17'] = configData.hwData.A17 = (viewFormData['a9'] * 0.03).toFixed(2);
        viewFormData['b17'] = configData.fwData.B17 = (parseFloat(viewFormData['b18']) + parseFloat(viewFormData['b19'])).toFixed(2);

        viewFormData['a20'] = configData.hwData.A20;
        viewFormData['b20'] = configData.fwData.B20;

        viewFormData['a22'] = configData.hwData.A22;
        viewFormData['b22'] = configData.fwData.B22;

        // 兼容老数据
        configData.zbData = {
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
            col3_xsczbdcbhsxse: 0,
            col3_swjgdkdzzszyfpbhsxse1: 0,
            col3_skqjkjdptfpbhsxse2: 0,
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
            //col3_hdynse: xgmsb['YSHWHDYNSE'] || 0,
            YSHWHDYNSE_BNLJ: viewFormData['YSHWHDYNSE_BNLJ'], //xgmsb['YSHWHDYNSE'] || 0, 加上历史
            col3_hdynse: viewFormData['YSHWHDYNSE_BNLJ'], //xgmsb['YSHWHDYNSE'] || 0, 加上历史

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
            col4_xssygdysgdzcbhsxse: 0,
            col4_skqjkjdptfpbhsxse1: 0,
            col4_msxse: Number(viewFormData.hj_b9 || 0),
            col4_xwqymsxse: Number(viewFormData.hj_b10 || 0),
            col4_wdqzdxse: Number(viewFormData.hj_b11 || 0),
            col4_qtmsxse: Number(viewFormData.hj_b12 || 0),
            col4_ckmsxse: Number(viewFormData.hj_b13 || 0),
            col4_skqjkjdptfpxse1: Number(viewFormData.hj_b14 || 0),
            col4_hdxse: viewFormData['YSFWHDXSE_BNLJ'] || 0,
            YSFWHDXSE_BNLJ: Number(xgmsb['YSFWHDXSE']) + Number(xgmsb.lsxxData[46].value || 0) || 0,
            col4_bqynse: Number(viewFormData.hj_b15 || 0),
            //col4_hdynse: xgmsb['YSFWHDYNSE'] || 0,
            YSFWHDYNSE_BNLJ: viewFormData['YSFWHDYNSE_BNLJ'], // xgmsb['YSFWHDYNSE'] || 0, 加上历史数据
            col4_hdynse: viewFormData['YSFWHDYNSE_BNLJ'], // xgmsb['YSFWHDYNSE'] || 0,


            col4_bqynsejze: Number(viewFormData.hj_b16 || 0),
            col4_bqmse: Number(viewFormData.hj_b17 || 0),
            col4_xwqymse: Number(viewFormData.hj_b18 || 0),
            col4_wdqzdmse: Number(viewFormData.hj_b19 || 0),
            col4_ynsehj: Number(viewFormData.hj_b20 || 0),
            col4_bqyjse1: Number(viewFormData.hj_b21 || 0),
            col4_bqybtse: Number(viewFormData.hj_b22 || 0)
        }

        //兼容老数据end

    },

    setViewHjData: function () {  //设置主表 合计数据  合并历史数据
        var index = 0, hjKey = '', key = '';
        $.each(xgmsb.lsxxData, function (i, obj) {
            if (Number(obj.code) > 22) {
                index = Number(obj.code) - 22;
                hjKey = 'hj_b' + index;
                key = 'b' + index;
            } else {
                index = obj.code;
                hjKey = 'hj_a' + index;
                key = 'a' + index
            }
            viewFormData[hjKey] = Number(viewFormData[key] || 0) + Number(obj.value);
        });
    },

    initSkjsData: function () {  // 初始化 税款计算 合计数据
        configData.hwData.A22 = (parseFloat(configData.hwData['a20']) - parseFloat(configData.hwData.A21)).toFixed(2);
        configData.fwData.B22 = (parseFloat(configData.fwData['b20']) - parseFloat(configData.fwData.B21)).toFixed(2);

        $.extend(configData.skjs_data, configData.hwData, configData.fwData);

        //只有混营 才显示合计  计算合计
        if (xgmsb.SZLBDM == '03') {
            $('.skjshj').show();
            configData.skjs_data.hj_15 = (parseFloat(configData.skjs_data.A15) + parseFloat(configData.skjs_data.B15)).toFixed(2);
            configData.skjs_data.hj_19 = (parseFloat(configData.skjs_data.A19) + parseFloat(configData.skjs_data.B19)).toFixed(2);
            configData.skjs_data.hj_18 = (parseFloat(configData.skjs_data.A18) + parseFloat(configData.skjs_data.B18)).toFixed(2);
        }

        configData.skjs_data.hj_21 = (parseFloat(configData.hwData.A21) + parseFloat(configData.fwData.B21)).toFixed(2);
        configData.skjs_data.hj_22 = (parseFloat(configData.hwData.A22) + parseFloat(configData.fwData.B22)).toFixed(2);
        skjs_form.setData(configData.skjs_data); //税款合计数据
    },

    getXsssView: function () {  //组装 销售信息 到 viedata
        var xsssData = xsxx_form.getData();
        $.extend(viewFormData, {
            'a2': xsssData.A2,
            'a3': xsssData.A3,
            'd1': xsssData.D1,
            'b2': xsssData.B2,
            'b3': xsssData.B3,
            'd2': xsssData.D2
        });
    },

    jsA22: function (e) {  // 计算 a22
        configData.hwData.A21 = e.sender.value;
        viewFormData['a21'] = configData.hwData.A21;
        configData.hwData.A22 = viewFormData['a22'] = (parseFloat(configData.hwData['a20']) - parseFloat(configData.hwData.A21)).toFixed(2);
        if (xgmsb.SZLBDM == '03') {
            configData.skjs_data.hj_21 = (parseFloat(configData.hwData.A21) + parseFloat(configData.fwData.B21)).toFixed(2);
            configData.skjs_data.hj_22 = (parseFloat(configData.hwData.A22) + parseFloat(configData.fwData.B22)).toFixed(2);
            mini.get('hj_21').setValue(configData.skjs_data.hj_21);
            mini.get('hj_22').setValue(configData.skjs_data.hj_22);
        }
        mini.get('skjs_a22').setValue(viewFormData['a22']);
    },

    jsB22: function (e) { // 计算 a22
        configData.fwData.B21 = e.sender.value;
        viewFormData['b21'] = configData.fwData.B21;
        configData.fwData.B22 = viewFormData['b22'] = (parseFloat(configData.fwData['b20']) - parseFloat(configData.fwData.B21)).toFixed(2);
        if (xgmsb.SZLBDM == '03') {
            configData.skjs_data.hj_21 = (parseFloat(configData.hwData.A21) + parseFloat(configData.fwData.B21)).toFixed(2);
            configData.skjs_data.hj_22 = (parseFloat(configData.hwData.A22) + parseFloat(configData.fwData.B22)).toFixed(2);
            mini.get('hj_21').setValue(configData.skjs_data.hj_21);
            mini.get('hj_22').setValue(configData.skjs_data.hj_22);
        }
        mini.get('skjs_b22').setValue(viewFormData['b22']);
    },

    hwHjXse: function () {  //货物合计销售额
        var result = (parseFloat(configData.hwData.A2) + parseFloat(configData.hwData.A3) + parseFloat(configData.hwData.D1) + parseFloat(configData.hwData.A7) + parseFloat(configData.hwData.A12) + parseFloat(configData.hwData.A13)).toFixed(2);
        configData.hwData.Q1 = result;
        mini.get('Q1').setValue(result);
        return result;
    },

    fwHjXse: function () {  //服务 合计计算
        var result = (parseFloat(configData.fwData.B2) + parseFloat(configData.fwData.B3) + parseFloat(configData.fwData.D2) + parseFloat(configData.fwData.B5) + parseFloat(configData.fwData.B6) + parseFloat(configData.fwData.D3) + parseFloat(configData.fwData.B12) + parseFloat(configData.fwData.B13) - parseFloat(configData.fwData.E1) - parseFloat(configData.fwData.E2)).toFixed(2);
        configData.fwData.Q2 = result;
        mini.get('Q2').setValue(result);
        return result;
    },

    jsHwViewData: function () { // 计算劳务 显示表数据
        viewFormData['a2'] = configData.hwData.A2;
        viewFormData['a12'] = configData.hwData.A12;
        viewFormData['a13'] = configData.hwData.A13;
        viewFormData['a14'] = configData.hwData.A14;
        if (Math.max(configData.hwData.Q1, xgmsb['YSHWHDXSE']) > xgmsb['hwqzd']) { //大于起征点
            configData.ifOverHwQzd = true;  //大于起征点
            viewFormData['a1'] = (parseFloat(configData.hwData.A2) + parseFloat(configData.hwData.A3) + parseFloat(configData.hwData.D1)).toFixed(2);
            viewFormData['a3'] = configData.hwData.A3 || 0;
            viewFormData['a7'] = configData.hwData.A7 || 0;
            viewFormData['a8'] = configData.hwData.A8 || 0;
            viewFormData['a10'] = '0.00';
            viewFormData['a11'] = '0.00';
        } else {
            configData.ifOverHwQzd = false;
            viewFormData['a1'] = configData.hwData.A2;
            viewFormData['a3'] = '0.00';
            viewFormData['a7'] = '0.00';
            viewFormData['a8'] = '0.00';
            if (xgmsb['GTHBZ'] === '1') { //个体户
                viewFormData['a10'] = '0.00';
                viewFormData['a11'] = (parseFloat(configData.hwData.A3) + parseFloat(configData.hwData.D1) + parseFloat(configData.hwData.A7)).toFixed(2);
            } else {
                viewFormData['a11'] = '0.00';
                viewFormData['a10'] = (parseFloat(configData.hwData.A3) + parseFloat(configData.hwData.D1) + parseFloat(configData.hwData.A7)).toFixed(2);
            }
        }
        viewFormData['a9'] = (parseFloat(viewFormData['a10']) + parseFloat(viewFormData['a11']) + parseFloat(viewFormData['a12'])).toFixed(2);
    },


    jsFwViewData: function () {  // 服务 主表 组装

        viewFormData['b2'] = configData.fwData.B2;
        viewFormData['b5'] = configData.fwData.B5;
        viewFormData['b12'] = configData.fwData.B12;
        viewFormData['b13'] = configData.fwData.B13;
        viewFormData['b14'] = configData.fwData.B14;
        if (Math.max(configData.fwData.Q2, xgmsb['YSFWHDXSE']) > xgmsb['fwqzd']) { //超过起征点
            configData.ifOverFwQzd = true;  //大于起征点
            viewFormData['b1'] = (parseFloat(configData.fwData.B2) + parseFloat(configData.fwData.B3) + parseFloat(configData.fwData.D2)).toFixed(2);
            viewFormData['b3'] = configData.fwData.B3;
            viewFormData['b4'] = (parseFloat(configData.fwData.B5) + parseFloat(configData.fwData.B6) + parseFloat(configData.fwData.D3)).toFixed(2);
            viewFormData['b6'] = configData.fwData.B6;
            viewFormData['b10'] = '0.00';
            viewFormData['b11'] = '0.00';
        } else {
            configData.ifOverFwQzd = false;
            viewFormData['b1'] = configData.fwData.B2;
            viewFormData['b3'] = '0.00';
            viewFormData['b6'] = configData.fwData.E2;
            viewFormData['b4'] = (parseFloat(viewFormData['b5']) + parseFloat(viewFormData['b6'])).toFixed(2);
            if (xgmsb['GTHBZ'] === '1') { //个体户
                viewFormData['b10'] = '0.00';
                viewFormData['b11'] = (parseFloat(configData.fwData.B3) + parseFloat(configData.fwData.D2) + parseFloat(configData.fwData.B6) - parseFloat(configData.fwData.E2) + parseFloat(configData.fwData.D3)).toFixed(2);
                viewFormData['b30'] = '0.00';
                viewFormData['b31'] = '0.00';
                viewFormData['b34'] = (parseFloat(configData.fwData.B3) + parseFloat(configData.fwData.D2)).toFixed(2);
                viewFormData['b35'] = (parseFloat(configData.fwData.B6) + parseFloat(configData.fwData.D3) - parseFloat(configData.fwData.E2)).toFixed(2);
            } else {
                viewFormData['b11'] = '0.00';
                viewFormData['b10'] = (parseFloat(configData.fwData.B3) + parseFloat(configData.fwData.D2) + parseFloat(configData.fwData.B6) - parseFloat(configData.fwData.E2) + parseFloat(configData.fwData.D3)).toFixed(2);
                viewFormData['b34'] = '0.00';
                viewFormData['b35'] = '0.00';
                viewFormData['b30'] = (parseFloat(configData.fwData.B3) + parseFloat(configData.fwData.D2)).toFixed(2);
                viewFormData['b31'] = (parseFloat(configData.fwData.B6) + parseFloat(configData.fwData.D3) - parseFloat(configData.fwData.E2)).toFixed(2);
            }
        }
        viewFormData['b9'] = (parseFloat(viewFormData['b10']) + parseFloat(viewFormData['b11']) + parseFloat(viewFormData['b12'])).toFixed(2);

    },

    getWsxx: function (code, wsxx) {  //通过 key 取值
        var len = wsxx.length;
        for (var i = 0; i < len; i++) {
            var val = wsxx[i];
            if (val.code && val.code == code) {
                return val.value;
            }
        }
    },

    initData: function (data) {  //初始化数据

        $.each(data.value.sbzl, function (index, obj) {
            if (obj.sbzlcode == '10102' || obj.sbzlcode == '10103') {
                hdxxData = obj;
                return;
            }
        });

        //判断期初信息获取是否成功
        if (hdxxData.qccgbz != 'Y') {
            var msg = data.qccgbzms;
            mini.alert(msg, '提示', function (action) {
                if (action == "ok" || action == "close")
                    window_close();
            });
            return false;
        }

        //判断纳税人是否逾期
        if (hdxxData.YQWRDBZ == "1") {
            mini.alert('您逾期未认定为增值税一般纳税人，请至大厅前台进行申报！', '提示', function (action) {
                if (action == "ok" || action == "close")
                    window_close();
            });
            return;
        }

        //sbcommon.initHdxx(); // 初始化核定数据  待放开
        xgmsb.hwqzd = methods.getWsxx('QZD', hdxxData.wsxxs.wsxx); //10;  //货物起征点 待修改
        xgmsb.fwqzd = methods.getWsxx('YSFWQZD', hdxxData.wsxxs.wsxx); //服务起征点
        xgmsb.SZLBDM = methods.getWsxx('SZLBDM', hdxxData.wsxxs.wsxx); //'01'; // hdxxUtil.getWsxxValueByCode('SZLBDM');   01 货物，02 服务，03 混营
        xgmsb.YSHWHDXSE = methods.getWsxx('YSHWHDXSE', hdxxData.wsxxs.wsxx); // hdxxUtil.getWsxxValueByCode("YSHWHDXSE"); // 应税货物 核定销售额
        xgmsb.YSFWHDXSE = methods.getWsxx('YSFWHDXSE', hdxxData.wsxxs.wsxx); // hdxxUtil.getWsxxValueByCode("YSFWHDXSE"); //  应税服务 核定销售额
        xgmsb.YSFWHDYNSE = methods.getWsxx('YSFWHDYNSE', hdxxData.wsxxs.wsxx); //hdxxUtil.getWsxxValueByCode("YSFWHDYNSE");  //  应税服务 核定应纳税额
        xgmsb.GTHBZ = methods.getWsxx('GTHBZ', hdxxData.wsxxs.wsxx); // '1';   // hdxxUtil.getWsxxValueByCode("GTHBZ");	 //个体户标志		GTHBZ为0（非个体户） 、GTHBZ为1（个体户）
        xgmsb.YSHWYNZSL = methods.getWsxx('YSHWYNZSL', hdxxData.wsxxs.wsxx); //应税货物 征收率
        xgmsb.YSFWYNZSL = methods.getWsxx('YSFWYNZSL', hdxxData.wsxxs.wsxx); //应税服务 征收率
        xgmsb.YSHWHDYNSE = methods.getWsxx('YSHWHDYNSE', hdxxData.wsxxs.wsxx)  //应税货物核定应纳税额
        xgmsb.YSFWHDYNSE = methods.getWsxx('YSFWHDYNSE', hdxxData.wsxxs.wsxx)  //应税货物核定应纳税额

        xgmsb.DKZZSZYFP = methods.getWsxx("SY_DKZZSZYFP", hdxxData.wsxxs.wsxx);  // 代开增值税<i class="zy-txt">专用</i>发票金额
        xgmsb.DKZZSPTFP = methods.getWsxx("SY_DKZZSPTFP", hdxxData.wsxxs.wsxx);  // 代开增值税<i class="pt-txt">普通</i>发票金额
        xgmsb.ZKZZSPP = methods.getWsxx("SY_ZKZZSPP", hdxxData.wsxxs.wsxx);  // 自开增值税普票金额

        xgmsb.BQYSHWYJ = methods.getWsxx("BQYSHWYJ", hdxxData.wsxxs.wsxx);  // 本期应税货物预缴
        xgmsb.BQYSFWYJ = methods.getWsxx("BQYSFWYJ", hdxxData.wsxxs.wsxx);  // 本期应税服务预缴
/*----------------------*/
      var ZY_HW_3_JE = Number(methods.getWsxx('ZY_HW_3_JE', hdxxData.wsxxs.wsxx));
      var HWDKZPXSE = Number(methods.getWsxx('HWDKZPXSE', hdxxData.wsxxs.wsxx));
      var PT_HW_3_JE = Number(methods.getWsxx('PT_HW_3_JE', hdxxData.wsxxs.wsxx));
      var ZY_FW_3_JE = Number(methods.getWsxx('ZY_FW_3_JE', hdxxData.wsxxs.wsxx));
      var ZY_FW_5_JE = Number(methods.getWsxx('ZY_FW_5_JE', hdxxData.wsxxs.wsxx));
      var FWDKZPXSE = Number(methods.getWsxx('FWDKZPXSE', hdxxData.wsxxs.wsxx));
      var XSCZBDCDKZPXSE = Number(methods.getWsxx('XSCZBDCDKZPXSE', hdxxData.wsxxs.wsxx));
      var PT_FW_3_JE = Number(methods.getWsxx('PT_FW_3_JE', hdxxData.wsxxs.wsxx));
      var PT_FW_5_JE = Number(methods.getWsxx('PT_FW_5_JE', hdxxData.wsxxs.wsxx));
      var ZY_FW_3_SE = Number(methods.getWsxx('ZY_FW_3_SE', hdxxData.wsxxs.wsxx));
      var PT_FW_3_SE = Number(methods.getWsxx('PT_FW_3_SE', hdxxData.wsxxs.wsxx));
      var ZY_FW_5_SE = Number(methods.getWsxx('ZY_FW_5_SE', hdxxData.wsxxs.wsxx));
      var PT_FW_5_SE = Number(methods.getWsxx('PT_FW_5_SE', hdxxData.wsxxs.wsxx));

      var QZD = Number(methods.getWsxx('QZD', hdxxData.wsxxs.wsxx));
      var YSFWQZD = Number(methods.getWsxx('YSFWQZD', hdxxData.wsxxs.wsxx));
      if (ZY_HW_3_JE > 0 || HWDKZPXSE > 0 || PT_HW_3_JE > 0){
        if (methods.getWsxx('SZLBDM', hdxxData.wsxxs.wsxx) === '02'){
          mini.alert('您开具了货物类发票，没有查询到对应的税费种认定，请前往大厅补充。','提示',function () {
            window_close();
          });
          return false;
        }
      }
      if (ZY_FW_3_JE > 0 || ZY_FW_5_JE > 0 || FWDKZPXSE > 0 || XSCZBDCDKZPXSE > 0 || PT_FW_3_JE > 0 || PT_FW_5_JE > 0){
        if (methods.getWsxx('SZLBDM', hdxxData.wsxxs.wsxx) === '01'){
          mini.alert('您开具了服务类发票，没有查询到对应的税费种认定，请前往大厅补充。','提示',function () {
            window_close();
          });
          return false;
        }
      }
/*--------------------*/
        xgmsb.lsxxData = hdxxData.lsxxs.lsxx; // 历史数据
        xgmsb.nsrsbh = wssqUtil.nsrjbxx.nsrsbh;
        xgmsb.nsrmc = wssqUtil.nsrjbxx.nsrmc;


        //return;
        configData.fbData['XGMFB1QCYE'] = methods.getWsxx('XGMFB1QCYE', hdxxData.wsxxs.wsxx) || 0;     // 3%征收率） 期初余额  1
        configData.fbData['XGMFB1QCYE5'] = methods.getWsxx('XGMFB1QCYE5', hdxxData.wsxxs.wsxx) || 0;  // 5%征收率）  期初余额  9
        configData.fbData['FB4JZEBQFSE'] = methods.getWsxx('FB4JZEBQFSE', hdxxData.wsxxs.wsxx) || 0;  // 3% 本期发生额         2
        configData.fbData['FZJGCDDYJNSEHZ'] = methods.getWsxx('FZJGCDDYJNSEHZ', hdxxData.wsxxs.wsxx) || 0;  // 5% 本期发生额  10

        configData.fbData['qcye'] = Number(configData.fbData['XGMFB1QCYE']);
        configData.fbData['qcye5'] = Number(configData.fbData['XGMFB1QCYE5']);
        configData.fbData['qmye'] = configData.fbData['qcye'];
        configData.fbData['qmye5'] = configData.fbData['qcye5'];

        //主表
        viewFormData['YSHWHDYNSE'] = methods.getWsxx('YSHWHDYNSE', hdxxData.wsxxs.wsxx) || 0;    // 货物核定应纳税额
        viewFormData['YSFWHDYNSE'] = methods.getWsxx('YSFWHDYNSE', hdxxData.wsxxs.wsxx) || 0;    // 服务核定应纳税额

        viewFormData.LShdxse3 = xgmsb.lsxxData[44].value;//货物  核定销售额
        viewFormData.LShdynse3 = xgmsb.lsxxData[45].value;//货物  核定应纳税额

        viewFormData.LShdxse4 = xgmsb.lsxxData[46].value;//货物  核定销售额
        viewFormData.LShdynse4 = xgmsb.lsxxData[47].value;//货物  核定应纳税额

        methods.initTheadData();

        // 根据纳税人类型做相关设置
        var bqyjTips = ''; // 本期应纳税额和本期预缴税额 提示信息

        if (xgmsb.SZLBDM != '03') {
            // 第一步销售信息 页面 提示税源代开专票金额等
            $('body').on('focus', '.input-box input', function () {
                $(this).closest('.input-box').find('.tip-box').show();
            });
            $('body').on('blur', '.input-box input', function () {
                $(this).closest('.input-box').find('.tip-box').hide();
            });

            $('#wizard>.content').height(300);

            if (xgmsb.SZLBDM == '01') {
                // 货物纳税人隐藏服务部分
                $('#fwForm').hide();
                $('.fw_tr').hide();
                // 设置提示信息的金额
                $('#hwdk-zpxse').text(parseFloat(xgmsb.DKZZSZYFP).toFixed(2));
                $('#hwdk-ppxse').text(parseFloat(xgmsb.ZKZZSPP).toFixed(2));

                bqyjTips = parseFloat(xgmsb.BQYSHWYJ).toFixed(2) + '元'

            } else if (xgmsb.SZLBDM == '02') {
                // 服务纳税人隐藏货物部分
                $('#hwForm').hide();
                $('.lw_tr').hide();
                // 设置提示信息的金额
                $('#fwdk-zpxse').text(parseFloat(xgmsb.DKZZSZYFP).toFixed(2));
                $('#fwdk-ppxse').text(parseFloat(xgmsb.ZKZZSPP).toFixed(2));

                bqyjTips = parseFloat(xgmsb.BQYSFWYJ).toFixed(2) + '元'
            }
        } else {
            bqyjTips = (parseFloat(xgmsb.BQYSHWYJ) + parseFloat(xgmsb.BQYSFWYJ)).toFixed(2) + '元（其中货物及劳务：' +
                parseFloat(xgmsb.BQYSHWYJ).toFixed(2) + '元，服务、不动产和无形资产：' +
                parseFloat(xgmsb.BQYSFWYJ).toFixed(2) + '元）';
        }
        $('#skjs-bqyjse').text(bqyjTips);

        // 自开增值税专票
        var ZKZZSZP = Number(methods.getWsxx('SY_ZKZZSZP', hdxxData.wsxxs.wsxx));
        if (ZKZZSZP && ZKZZSZP > 0) {  // 存在自开增值税专票
            var html = '，自开的增值税专用发票不含税销售额为 ' + parseFloat(ZKZZSZP).toFixed(2) + ' 元';
            $('.a2_tip').append(html);
            $('.b2_tip').append(html);
        }
    },

    //初始化表头公共信息
    initTheadData: function () {
        $('.nsrsbh').html(xgmsb.nsrsbh);
        $('.nsrmc').html(xgmsb.nsrmc);
        $('.sssqq').html(hdxxData.sksssqQ);
        $('.sssqz').html(hdxxData.sksssqZ);
        //$('.tbrq').html(new Date().format('yyyy-MM-dd'));
        $('.tbrq').html(hdxxData.tbrq);
    },
    //税款计算页校验预缴税额
    validateYjse: function () {
        //if (xgmsb.SZLBDM === '01' || xgmsb.SZLBDM === '03'){
        //    if (viewFormData.a21 && xgmsb.BQYSHWYJ && Number(viewFormData.a21) > Number(xgmsb.BQYSHWYJ)){
        //        mini.alert('您填报的货物及劳务本期预缴税额【'+parseFloat(viewFormData.a21).toFixed(2)+'】应小于等于您本期预缴的增值税税额中货物及劳务部分【'+parseFloat(xgmsb.BQYSHWYJ).toFixed(2)+'】元。');
        //        return false;
        //    }
        //}
        if (xgmsb.SZLBDM === '02' || xgmsb.SZLBDM === '03'){
            if (viewFormData.b21 && xgmsb.BQYSFWYJ && Number(viewFormData.b21) > Number(xgmsb.BQYSFWYJ)){
                mini.alert('您填报的服务、不动产和无形资产本期预缴税额【'+parseFloat(viewFormData.b21).toFixed(2)+'】应小于等于您本期预缴的增值税税额中服务、不动产和无形资产部分【'+parseFloat(xgmsb.BQYSFWYJ).toFixed(2)+'】元。');
                return false;
            }
        }
        return true;
    },
    getFjsBz: function () {
        xgmsb.fjsHd = sbcommon.getHdBySbzlDm('10115');
        if(!xgmsb.fjsHd){
            return false;
        }
        return true;
    },
    compareGds: function () {
        var gdsData = mini.decode(Api.getData('/sbzx-web/api/hb/sb/fjs/compareGdsNsrxx',{sbzldm: xgmsb.SBZLlDm},'post',false));
        if (!!gdsData){
            var message = '';
            var gsData = gdsData.gs;
            var dsData = gdsData.ds;
            for (var g in gsData) {
                $('#gs-' + g).html(gsData[g]);
            }
            for (var d in dsData) {
                $('#ds-' + d).html(dsData[d]);
            }
            var compareList = [];
            if ((!!gdsData.gs.nsrsbh || !!gdsData.ds.nsrsbh) && gdsData.gs.nsrsbh !== gdsData.ds.nsrsbh){
                compareList.push('纳税人识别号');
            }
            if ((!!gdsData.gs.nsrmc || !!gdsData.ds.nsrmc) && gdsData.gs.nsrmc !== gdsData.ds.nsrmc){
                compareList.push('纳税人名称');
            }
            if ((!!gdsData.gs.shxydm || !!gdsData.ds.shxydm) && gdsData.gs.shxydm !== gdsData.ds.shxydm){
                compareList.push('社会信用代码');
            }
            if ((!!gdsData.gs.fddbrsfzjlxDm || !!gdsData.ds.fddbrsfzjlxDm) && gdsData.gs.fddbrsfzjlxDm !== gdsData.ds.fddbrsfzjlxDm){
                compareList.push('法人证件类型');
            }
            if ((!!gdsData.gs.fddbrsfzjhm || !!gdsData.ds.fddbrsfzjhm) && gdsData.gs.fddbrsfzjhm !== gdsData.ds.fddbrsfzjhm){
                compareList.push('法人证件号码');
            }
            if ((!!gdsData.gs.fddbrxm || !!gdsData.ds.fddbrxm) && gdsData.gs.fddbrxm !== gdsData.ds.fddbrxm){
                compareList.push('法人姓名');
            }
            if ((!!gdsData.gs.ssdabh || !!gdsData.ds.ssdabh) && gdsData.gs.ssdabh !== gdsData.ds.ssdabh){
                compareList.push('税收档案编号');
            }
            if (compareList.length > 0){
                message +='<div>您在原地税机关登记的<span style="color:red">' + compareList.join("，") + '</span>信息与您在原国税机关登记的不一致，请确认该户纳税人与您在原国税机关登记的是否' +
                    '为同一纳税人。如确认为同一纳税人，请点击“一体化申报”，将为您同时征收增值税和附加税（费）；' +
                    '如不为同一纳税人，请点击“主税种申报”,将为您正常征收增值税，附加税（费）请去办税服务大厅缴纳。</div>';
            } else {
                message +='您在原地税机关登记的基本信息与您在原国税机关登记的一致，请再次确认该户纳税人与您在原国税机关登记的是否为同一纳税人。如确认为同一纳税人，请点击“一体化申报”，将为您同时征收增值税和附加税（费）；' +
                    '如不为同一纳税人，请点击“主税种申报”,将为您正常征收增值税，附加税（费）请去办税服务大厅缴纳。</div>';
            }
            $(".gds-message").html(message);
            mini.get('gds-win').show();
        }
    },
    changeFjsbz: function (hasFjs) {
        if (hasFjs){
            glfjsBz = true;
        } else {
            glfjsBz = false;
        }
        mini.get('gds-win').hide();
    },
    getYbtse: function () {
        return (Number(viewFormData['a22']) + Number(viewFormData['b22'])).toFixed(2);
    },
    getBhsxse: function () {
        return (Number(configData.hwData.Q1) + Number(configData.fwData.Q2)).toFixed(2);
    },
    getYnse: function () {
        return (Number(viewFormData['a22']) + Number(viewFormData['b22'])).toFixed(2);
    },
    checkIsReportWithOthers: function (request) {
        if(this.reportWithNext && glfjsBz){//关联申报，且后续表未申报时
            // var nextReportHd = this.getHdBySbzlDm(this.reportWithNext.getHdByDM);
            // var nextReportSbzlDm = nextReportHd.sbzlDm;
            // if(nextReportHd && nextReportSbzlDm){//能取到核定，即判定为后续表还没有申报
                var sbtjData = {
                    // ybtse: this.getYbtse(),
                    // bhsxse: this.getBhsxse(),
                    ynse: this.getYnse(),
                    zsxmbm: hdxxData.zsxmbm,
                    url: location.href,//链接地址，在下个页面返回到当前页面时用到
                    request: request//申报提交的请求数据
                };
            sessionStorage.setItem('sbtjData_'+xgmsb.SBZLlDm, mini.encode(sbtjData));//将申报提交的数据保存到session中
            var curReportWithSbzlDm = Tools.getUrlParamByName('reportWithSbzlDm') || '';
            var postfix = '&reportWithSbzlDm='+(curReportWithSbzlDm?curReportWithSbzlDm+'_'+xgmsb.SBZLlDm:xgmsb.SBZLlDm);
            mini.open({
                cls:'fixedWindowTop0',
                url: this.reportWithNext.url+postfix+'&inMiniWindow=Y',        //页面地址
                title: '',      //标题
                width: 1220,      //宽度
                height: 600,     //高度
                allowResize: false,       //允许尺寸调节
                allowDrag: false,         //允许拖拽位置
                showCloseButton: true,   //显示关闭按钮
                showMaxButton: true,     //显示最大化按钮
                showModal: true,         //显示遮罩
                effect:'fast',              //打开和关闭时的特果:'none','slow','fast',默认'none'
                ondestroy: function (action) {  //弹出页面关闭前

                }
            });
            mini.unmask();
            return true;
            // }
        }
        return false;
    }
};


function toFixed(val) {
    if (val == 0) {
        return '0.00';
    }
    if (val && parseFloat(val)) {
        return parseFloat(val).toFixed(2);
    } else {
        return val;
    }
}

var getPrevDate = (function () {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	month = month >= 10 ? month : '0' + month;
	var date = d.getDate()>= 10 ? d.getDate() : '0' + d.getDate();
	return '' + year + "-" + month + "-" + date;
})();
var getPrevMonth = (function () {
    var d = new Date();
    return d.getLastDateOfPrevMonth('yyyyMM');
})();

/**
 * 获取特定税种的核定
 * @param {String} sbzlDm 申报种类代码
 * @param {String} sbny 申报年月
 * @param {Boolean} showErrMsg 是否提示错误信息
 * @return {Object}
 * */
sbcommon.getHdBySbzlDm = function (sbzlDm,sbny,showErrorMsg) {
    sbny = sbny || '';
    showErrorMsg = !!showErrorMsg;
    // return {sbzlDm:'10115'};//用于本地测试
    var url = '/sbzx-web/api/sb/common/get/hdxx';
    var request = {
        sbzlDm: sbzlDm,
        sbny: sbny
    };
    /*河北特色点---begin：附加税接口修改，同时增加参数ythsbbz*/
    if(sbzlDm === '10115' || sbzlDm === '10116'){
        url = '/sbzx-web/api/sb/fjs/hdxx';
        if((window.servyouReport && sbzlDm === window.servyouReport.reportWithNext.getHdByDM)//消费税8大类加小规模填表式
            || (window.yearReport && sbzlDm === window.yearReport.reportWithNext.getHdByDM)//一般纳税人
            || (location.href.indexOf('xgmsb-yds_new/xgmsb.html') !== -1)){//小规模引导式
            request.ythsbbz = 'Y';
        }else{
            request.ythsbbz = 'N';
        }
    }
    /*河北特色点---end：附加税接口修改，同时增加参数ythsbbz*/
    var hd = null;
    ajax.post(url, mini.encode(request), function (response) {
        if(response.success){
            hd = response.value;
        }else if(showErrorMsg){
            mini.alert(response.message);
        }
    }, function (response) {
        if(showErrorMsg){
            mini.alert(response.message);
        }
    });
    if(hd && hd.sbzl && hd.sbzl instanceof Array && hd.sbzl.length === 1){
        return hd.sbzl[0];
    }
    return null;
};

