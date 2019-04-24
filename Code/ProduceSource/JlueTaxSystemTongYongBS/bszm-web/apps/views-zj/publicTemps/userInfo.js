/**
 * Created with JetBrains WebStorm 2018.2.1
 * Author: lizm
 * Date: 2018/10/9
 * Time:15:59
 * Description:loadHeader
 */
function bszmLogout() {
    mini.confirm('确定退出登录吗？', '提示', function (action) {
        if (action === 'ok') {
            mini.mask({cls: 'mini-mask-loading', message: '正在退出登录...'});
            location.href = '/login-web/logout?service=%2Fbszm-web%2Fapps%2Fviews-zj%2Findex%2Findex.html';
            /*var frame = document.getElementById('grsds-logout');
            frame.src = 'https://its.he-n-tax.gov.cn:15800/web/zh/oauth2/logout';
            frame.onload = function () {
                top.location.href = '/login-web/logout?service=%2Fbszm-web%2Fapps%2Fviews-zj%2Findex%2Findex.html';
                return false;
            };
            frame.onerror = function () {
                top.location.href = '/login-web/logout?service=%2Fbszm-web%2Fapps%2Fviews-zj%2Findex%2Findex.html';
                return false;
            };*/
        }
    });
}

function changeRole() {
    mini.open({
        url: "/bszm-web/apps/views-zj/publicPages/changeRole.html",        //页面地址
        title: "选择办税身份",      //标题
        width: 650,      //宽度
        height: 400,     //高度
        allowResize: false,       //允许尺寸调节
        allowDrag: false,         //允许拖拽位置
        showMaxButton: false,     //显示最大化按钮
        currentWindow: false,      //是否在本地弹出页面,默认false
        onload: function () {       //弹出页面加载完成
        },
        ondestroy: function (action) {  //弹出页面关闭前
        }

    });
}

function toggleDetailsPanel() {
    $('.drop-down').toggle();
}

$('.home-user').on('mouseleave','.drop-down',function () {
    $(this).hide();
});
/*
$(document).on('click',function (e) {
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble && e.cancelBubble();
    if($('.drop-down').is(':visible')){
        $('.drop-down').hide();
    }
});*/
