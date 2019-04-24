/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/16
 * Time：15:57
 *
 */
// 小规模申报信息核对

var xxhd = {};

xxhd.goToSb = function () {
    if(!xxhd.hdxx){
        mini.alert('核定信息下载失败，请联系运维人员。');
        return false;
    }
    var lastSubmitTime = store.getLocal(wssqUtil.nsrjbxx.nsrsbh+'_xgmsbSubmitTime');
    var nowTime = (new Date()).getTime();
    if(!!lastSubmitTime){
        if(nowTime > Number(lastSubmitTime) + 10 * 60 * 1000){
            store.removeLocal(wssqUtil.nsrjbxx.nsrsbh+'_xgmsbSubmitTime');
        }else{
            var msg = '系统检测到您已经成功提交了小规模申报，请耐心等待申报结果，当前申报人数较多，建议您等待10分钟左右，给您带来不便，敬请谅解。'
            +'<br/><a class="goToPay" href="../sbjgcx/sbjgcx.html?zsxmDm=10101">去查询>></a>';
            mini.alert(msg);
            return false;
        }
    }
    if(!xxhd.sbfs){
        mini.alert('请选择申报方式');
        return false;
    } else if (xxhd.sbfs === 'ydssb') { //引导式申报
        location.href= 'xgmsb.html?sbzlDm='+ sbcommon.sbzlDm;
    }else if(xxhd.sbfs==='zjsb'){ // 直接申报
        location.href= '../xgmsb-tbs/xgmsb-tbs.html?sbzlDm='+ sbcommon.sbzlDm;
    } else if (xxhd.sbfs === 'yjlsb') {
        mini.alert("业务暂未开放!");
		//location.href = '../xgmsb-tbs/xgmsb-tbs.html?sbzlDm='+ sbcommon.sbzlDm+'&is0sb=Y';  // 一键零申报
	}
};

$(function () {

    // 设置纳税人基本信息
    xxhd.sbfsContent = $('.xxhd-sbfs-content');
    xxhd.xxhdContent = $('.xgmsb-xxhd');
    xxhd.toReport = $('#toReport');
    xxhd.sbfs = xxhd.sbfsContent.find('.active').val();

    // 选择申报方式 buttons
    xxhd.sbfsContent.delegate('button','click',function () {
        $(this).siblings('.active').removeClass('active');
        !$(this).hasClass('active') && $(this).addClass('active');
        xxhd.sbfs = $(this).val();
    });
    // 逾期未认定
    if(xgmsbService.queryYqwrd()=='1'){
        return false;
    }
    sbcommon.initHdxx(); // 初始化核定数据
    // 核定信息
    if(!sbcommon.hdxx){
        return false;
    }else{
        xxhd.hdxx = sbcommon.hdxx;
    }

    // 批扣户资格校验
    if(xgmsbService.queryPkzg()){
        return false;
    }
    var zsfs = '核定征收';
    var zse = 0;
    var nse = 0;
    var NSRTYPE = hdxxUtil.getWsxxValueByCode('SZLBDM');
    var YQWRDBZ  = hdxxUtil.getWsxxValueByCode("YQWRDBZ"); // 逾期未认定xgmsb.YQWRDBZ  = hdxxUtil.getWsxxValueByCode("YQWRDBZ"); // 逾期未认定
    var YSHWHDXSE = hdxxUtil.getWsxxValueByCode("YSHWHDXSE"); // 应税货物 核定销售额
    var YSFWHDXSE = hdxxUtil.getWsxxValueByCode("YSFWHDXSE"); //  应税服务 核定销售额
    var YSHWHDYNSE = hdxxUtil.getWsxxValueByCode("YSHWHDYNSE");//  应税货物 核定应纳税额
    var YSFWHDYNSE = hdxxUtil.getWsxxValueByCode("YSFWHDYNSE");//  应税服务 核定应纳税额

    /*if(YQWRDBZ == '1'){
        var msg = '逾期仍未办理一般纳税人进行增值税申报，应使用一般纳税人申报表，不能使用小规模申报表。<br/>'+
            '<a class="goToPay" href="${hb.wsbsfwt.url}/BsfwtWeb/pages/sb/ybnsrsb/sb_ybnsrzzssbqkcx.html">去一般纳税人增值税申报>></a>';
        mini.alert(msg,'提示',function () {
            window_close();
        });
        return false;
    }*/
    if(NSRTYPE=='01'){
        if(Number(YSHWHDXSE)==0){
            zsfs = '查账征收';
            $("#hdzs").hide();
        }else{
            zse = Number(YSHWHDXSE).toFixed(2) + ' 元';
            nse = Number(YSHWHDYNSE).toFixed(2) + ' 元';
        }
    }else if(NSRTYPE=='02'){
        if(Number(YSFWHDXSE)==0){
            zsfs = '查账征收';
            $("#hdzs").hide();
        }else{
            zse = Number(YSFWHDXSE).toFixed(2) + ' 元';
            nse = Number(YSFWHDYNSE).toFixed(2) + ' 元';
        }
    }else if(NSRTYPE=='03'){
        if(Number(YSHWHDXSE)==0 && Number(YSFWHDXSE)==0){
            zsfs = '查账征收';
            $("#hdzs").hide();
        }else{
            zse = (Number(YSHWHDXSE)+Number(YSFWHDXSE)).toFixed(2) + ' 元';
            zse +='（其中货物及劳务：'+ Number(YSHWHDXSE).toFixed(2) +' 元，';
            zse += '服务、不动产和无形资产：'+Number(YSFWHDXSE).toFixed(2) +' 元）';
            nse = (Number(YSHWHDYNSE)+Number(YSFWHDYNSE)).toFixed(2) + ' 元';
            nse +='（其中货物及劳务：'+ Number(YSHWHDYNSE).toFixed(2) +' 元，';
            nse += '服务、不动产和无形资产：'+Number(YSFWHDYNSE).toFixed(2) +' 元）'
        }
    }
    // $('.jyfw').text(wssqUtil.nsrjbxx.nsrxxKzVO.jyfw).attr('title',wssqUtil.nsrjbxx.nsrxxKzVO.jyfw);
    // $('.djrq').text(mini.formatDate(wssqUtil.nsrjbxx.djrq, 'yyyy-MM-dd'));
    $('.skssq').text(sbcommon.skssqq + ' 至 ' + sbcommon.skssqz );
    // $('.nsrsbh').text(wssqUtil.nsrjbxx.nsrsbh);
    $('.nsrmc').text(wssqUtil.nsrjbxx.nsrmc);
    // $('.zsfs').text(zsfs);
    $('.zse').text(zse);
    $('.nse').text(nse);

    $(".help-ico").hover(function () {
        $('.tip-span').toggleClass("hide");
    });
    $('body').on('click', 'a.ydssb', function(){
		xxhd.sbfs = 'ydssb';
        xxhd.goToSb();
		//location.href = 'xgmsb.html?sbzlDm='+ sbcommon.sbzlDm;
    });
    
	$('body').on('click', 'a.zjsb', function(){
		xxhd.sbfs = 'zjsb';
        xxhd.goToSb();
		//location.href = 'xgmsb.html?sbzlDm='+ sbcommon.sbzlDm;
    });
	
	$('body').on('click', 'a.yjlsb', function(){  // 一键零申报
		xxhd.sbfs = 'yjlsb';
        xxhd.goToSb();
    });

});
