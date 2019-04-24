/**
 * Created by chenjunj on 2017/2/24 16:25.
 */
var result = {
    cxUrl: '../sbjgcx/sbjgcx.html',
    count: 10,
    init: function () {
        header.init();
        this.doCountDown();
        if (sessionStorage.getItem('sbtj_success_extra_msg')) {
            var html =sessionStorage.getItem('sbtj_success_extra_msg');
            $('.sessionMsg').append(html);
            sessionStorage.removeItem("sbtj_success_extra_msg");
        }
    },
    doCountDown: function () {
        var seconds = this.count+1;
        var _this = this;
        window.timeCount = function () {
            seconds--;
            $('.seconds').html(seconds<this.count?'0'+seconds:seconds);
            if (seconds === 0) {
                $('#changeText').html('请点击');
                $("#cxjg").addClass("enabled");
                window.location.href = _this.cxUrl;  //自动跳转
                return;
            }
            setTimeout(timeCount, 1000);
        };
        timeCount();
    }
};

$(function (){
    if(Tools.getUrlParamByName('CEF')==='Y'){
        mini.alert("您的财务报表已发送,即将关闭本窗口。请回到浏览器中点击【导入成功】进行申报结果查询。","温馨提示",function () {
           window.close();
        });
    }else{
        result.init();
    }
    if (Tools.getUrlParamByName('fromTc') === 'Y'){
        result.cxUrl = '../sbjgcx/sbjgcx.html?fromTc=Y';
        $('#cxjg').attr('href','../sbjgcx/sbjgcx.html?fromTc=Y');
    }

});




/**
 * Created by chenjunj on 2017/2/24 16:25.
 */
result.cxUrl = '../gdsSbjgcx/sbjgcx.html';

//大征期即将来临，为了保障在金三异常时不会引起过多不必要的咨询，
// 所以需要在纳税人申报扣款操作时，指引用户两个小时之后再获取反馈。拉大用户预期
result.doCountDown=function () {
    console.log('请两个小时之后再获取反馈。');
};