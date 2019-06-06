/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/3/4
 * Time：17:09
 *
 */

var xgmsbView = {};
xgmsbView.sbbViewActions = $(".sbb-view-actions");
xgmsbView.setViewData = function (data, qqwjm, sbrq, skssqq, skssqz) {
    xgmsbView.qqwjmPrint = qqwjm;
    var html = wssqUtil.loadTemplate('qrsbbView.html')
        .replace(/mini-moneybox/g, 'view-input')
        .replace(/mini-textbox/g, 'view-input')
        .replace(/input/g, 'input disabled');
    $('#xgmsb-view').html(html);
    mini.parse();
    var mtabs = mini.get("xgmsb-qrsbb-tabs");
    if (data['xgmsb_zb']) {
        for (var id in data['xgmsb_zb']) {
            $('#' + id).attr('value', Number(data['xgmsb_zb'][id]).toFixed(2));
        }
        $('#YSHWHDXSE').attr('value', Number(data['xgmsb_zb']['col1_hdxse']).toFixed(2));
        $('#YSFWHDXSE').attr('value', Number(data['xgmsb_zb']['col2_hdxse']).toFixed(2));
        $('#YSHWHDXSE_BNLJ').attr('value', Number(data['xgmsb_zb']['col3_hdxse']).toFixed(2));
        $('#YSFWHDXSE_BNLJ').attr('value', Number(data['xgmsb_zb']['col4_hdxse']).toFixed(2));
        $('#YSHWHDYNSE').attr('value', Number(data['xgmsb_zb']['col1_hdynse']).toFixed(2));
        $('#YSFWHDYNSE').attr('value', Number(data['xgmsb_zb']['col2_hdynse']).toFixed(2));
        $('#YSHWHDYNSE_BNLJ').attr('value', Number(data['xgmsb_zb']['col3_hdynse']).toFixed(2));
        $('#YSFWHDYNSE_BNLJ').attr('value', Number(data['xgmsb_zb']['col4_hdynse']).toFixed(2));
    }
    if (data['xgmsb_fb1']) {
        for (var id in data['xgmsb_fb1']) {
            $('#' + id).attr('value', Number(data['xgmsb_fb1'][id]).toFixed(2));
        }
    } else {
        //如果是货物，，隐藏附表一
        //不不需要选择了，，
      /*  var sele = mini.get("sbb-list");
        var dat = [{'MC': '增值税纳税申报表', 'ID': 'xgmsb_zb'}, {'MC': '增值税减免税申报明细表', 'ID': 'xgmsb_jmb'}];
        sele.setData(dat);*/
        mtabs.removeTab("zzsnssbbflzl");

    }
    if (data['xgmsb_jmb']) {
        for (var id in data['xgmsb_jmb']) {
            if (id.indexOf('jmxzMc') > -1) {
                $('#' + id).attr({'value': data['xgmsb_jmb'][id], "title": data['xgmsb_jmb'][id]});
            } else {
                $('#' + id).attr('value', Number(data['xgmsb_jmb'][id]).toFixed(2));
            }

        }
    }
    if (sbrq) {
        xgmsbView.sbrq = sbrq;
    }
    if (skssqq) {
        xgmsbView.skssqq = skssqq;
    }
    if (skssqz) {
        xgmsbView.skssqz = skssqz;
    }
    xgmsbView.sbbViewActions.show();
    xgmsbView.sbbList = mini.get('sbb-list');
    xgmsbView.sbbWin = mini.get('selectSbbWin');


};
xgmsbView.printSbb = function () {
    // xgmsbView.sbbWin.show();
    xgmsbView.printOk();
    // window.open('/sbzx-web/api/hb/sb/xgmsb/download/sbbPdf?qqwjm=' + xgmsbView.qqwjmPrint + '&sbrq=' + xgmsbView.sbrq + '&skssqq=' + xgmsbView.skssqq + '&skssqz=' + xgmsbView.skssqz);
};
xgmsbView.printOk = function () {
    var printContent = document.createElement('div');
    var params = {
        direct: 2,       // 打印方向： 1 正向 2 横向，默认 1
        display: 1,      // 显示方向：1 正向显示，0 横向显示
        view: 2,         // 预览方式：0 适高，1 正常，2 适宽

        zoom: 'Auto-Width',    // 缩放比例：Full-Width 按整宽，会变形；Full-Height 按整高，会变形；Full-Page 按整页，会变形
        // Auto-Width 整宽不变形；Full-Height 整高不变形
        // Width：200%、Height：200%、Width：200%;Height：200%、200%
        link: true,
        css: '.center{text-align:center}',         // 额外的css样式
        cssLink: '//' + location.host + '/sbzx-web/apps/styles/printStyle.css',     // 通过link引入的css样式文件
        style: true      // 页面的 <style></style> 标签
    };
    //改为只打印当前页面的表单  2017-11-27
    var id_map = {'zzsnssbb': 'xgmsb_zb', 'zzsnssbbflzl': 'xgmsb_fb1', 'zzsjmssbmxb': 'xgmsb_jmb'};

    var activeTab = mini.get("xgmsb-qrsbb-tabs").getActiveTab();
    var html = $('#' + id_map[activeTab.name])[0].outerHTML;
    ////减免表中减免项目很长，，，input中无法全部显示，，转成td
    if (id_map[activeTab.name] === "xgmsb_jmb") {
        var temp = $(html);
        $.each(temp.find("[id$=jmxzMc]"), function (i, e) {
            $(e.parentElement).html(e.value);
        });
        html = "<table class='sb_table' id='xgmsb_jmb'>" + temp.html() + "</table>";
    }
    $(printContent).append(html);

    /*
     var pageBreak = '<p style="page-break-after:always">&nbsp;</p>';
     var sbbArr = xgmsbView.sbbList.getValue().split(',');
     if (!xgmsbView.sbbList.getValue()) {
         return;
     }
     //减免表中减免项目很长，，，input中无法全部显示，，转成td
     for (var i = 0; i < sbbArr.length; i++) {
         if (i > 0) {
             $(printContent).append(pageBreak);
         }
         var html = "";
         if (sbbArr[i] === "xgmsb_jmb") {
             var temp = $($('#' + sbbArr[i])[0].outerHTML);
             $.each($(temp).find("[id$=jmxzMc]"), function (i, e) {
                 $(e.parentElement).html(e.value);
             });
             html = "<table class='sb_table' id='xgmsb_jmb'>" + temp.html() + "</table>";
         } else {
             html = $('#' + sbbArr[i])[0].outerHTML;
         }
         $(printContent).append(html);
     }
     xgmsbView.sbbWin.hide();*/
    $(printContent).lodopPrint(params);
};
xgmsbView.printCancel = function () {
    xgmsbView.sbbWin.hide();
};
