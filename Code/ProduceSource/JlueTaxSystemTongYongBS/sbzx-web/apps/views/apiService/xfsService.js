/**
 * Created by chenjunj on 2017/4/9 9:56.
 */
var xfs = (function () {
    //007减免表选择数据
    var _jmxmmcSelectData = '<option value=""></option>' +
    '<option value="0002129999">其他</option>' +
    '<option value="0002125204">生产成品油过程中消耗的自产成品油部分免税|《财政部 国家税务总局关于对成品油生产企业生产自用油免征消费税的通知》 财税〔2010〕98号第一条</option>' +
    '<option value="0002064001">废动植物油生产纯生物柴油免税|《财政部 国家税务总局关于对利用废弃的动植物油生产纯生物柴油免征消费税的通知》 财税〔2010〕118号</option>' +
    '<option value="0002125207">用已税汽油生产的乙醇汽油免税|《财政部 国家税务总局关于提高成品油消费税税率后相关成品油消费税政策的通知》 财税〔2008〕168号第四条</option>' +
    '<option value="0002064003">用废矿物油生产的工业油料免税|《财政部 国家税务总局关于对废矿物油再生油品免征消费税的通知》 财税〔2013〕105号</option>' +
    '<option value="0002061003">节能环保电池免税|《财政部　国家税务总局关于对电池 涂料征收消费税的通知》 财税〔2015〕16号第二条第一款</option>' +
    '<option value="0002061004">节能环保涂料免税|《财政部　国家税务总局关于对电池 涂料征收消费税的通知》 财税〔2015〕16号第二条第三款</option>' +
    '<option value="0002039901">横琴、平潭区内企业销售货物免征消费税|《 财政部 海关总署 国家税务总局关于横琴 平潭开发有关增值税和消费税政策的通知》 财税〔2014〕51号第二条</option>'+
    '<option value="0002125205">自产石脑油、燃料油生产乙烯、芳烃产品免税|《财政部 国家税务总局关于延续执行部分石脑油燃料油消费税政策的通知》 财税〔2011〕87号第二条、第三条、第四条、第五条、第七条、第八条</option>';
    //对应007下拉选择保存的swsxDm
    var _swsxDm = {
        "0002039901":"SXA031900231",
        "0002061001":"SXA031900588",
        "0002061003":"SXA031900249",
        "0002061004":"SXA031900250",
        "0002064001":"SXA031900129",
        "0002064003":"SXA031900526",
        "0002129999":"SXA031999999",
        "0002125204":"SXA031900389",
        "0002125205":"SXA031900589",
        "0002125207":"SXA031900527",
        "0002064004":"SXA031900514"
    };
    //007重新选择后，重置行数据
    var _resetRow = function(domObj){
        if(!domObj){
            return;
        }
        var tr = domObj.parent().parent();
        tr.find("td:eq(1)").find("input").val("").attr('value','');
        tr.find("td:eq(2)").find("select").val("");
        tr.find("td:eq(3)").find("input").val("").attr('value','').blur();
        tr.find("td:eq(4)").find("input").val("").attr('value','');
        tr.find("td:eq(5)").find("input").val("").attr('value','');
        tr.find("td:eq(6)").find("input").val("").attr('value','');
        tr.find("td:eq(7)").find("input").val("0.00").attr('value','0.00');
    };
    //卷烟消费税的卷烟类型
    var jylx = '<option value=""></option>' +
                '<option value="1">国产卷烟</option>'+
                '<option value="2">进口卷烟</option>'+
                '<option value="3">罚没卷烟</option>'+
                '<option value="9">其他</option>';
    //卷烟消费税的卷烟类别
    var jylb = '<option value=""></option>' +
                '<option value="1">一类卷烟</option>' +
                '<option value="2">二类卷烟</option>' +
                '<option value="3">三类卷烟</option>' +
                '<option value="4">四类卷烟</option>' +
                '<option value="5">五类卷烟</option>';
    //其他类消费税里的下拉品目数据
    var qtlPms = '<option sl="" value=""></option>'+
                '<option sl="15" value="101021800">高档化妆品</option>'+
                '<option sl="5" value="101020401">金银首饰（铂金首饰、钻石及钻石饰品）</option>'+
                '<option sl="10" value="101020499">其他金银首饰及珠宝玉石</option>'+
                '<option sl="15" value="101020500">鞭炮、焰火</option>'+
                '<option sl="10" value="101020802">250毫升（不含）以上摩托车</option>'+
                '<option sl="3" value="101020803">250毫升摩托车</option>'+
                '<option sl="10" value="101021100">高尔夫球及球具</option>'+
                '<option sl="20" value="101021200">高档手表</option>'+
                '<option sl="10" value="101021300">游艇</option>'+
                '<option sl="5" value="101021400">木制一次性筷子</option>'+
                '<option sl="5" value="101021500">实木地板</option>'+
                '<option sl="10" value="101021901">超豪华乘用车</option>'+
                '<option sl="10" value="101021902">超豪华中轻型商用客车</option>';
        //其他类消费税明细表凭证类别
    var qtlPzlbs = '<option value=""></option>'+
                '<option value="1">增值税专用发票</option>'+
                '<option value="3">海关进口消费税专用缴款书</option>'+
                '<option value="2">代扣代收税款凭证</option>'+
                '<option value="9">其他</option>';
    return {
        getJmxmmcSelectData: function(sbzlDm){
            var options = '<option value="" data-swsxdm=""></option>';
            $.each(Api.getData('/sbzx-web/api/baseCode/get/jmxx/'+sbzlDm, '', 'get') || [], function () {
              options += '<option value="'+this.JMXZDM+'" data-swsxdm="'+this.SWSXDM+'">'+this.JMXMMC+' | '+this.JMXZMC+'</option>'
            });
            return options;
        },
        getSwsxDm: function (key) {
            return _swsxDm[key];
        },
        resetRow: function (domObj) {
            _resetRow(domObj);
        }
        /*这里只返回以上3个方法，其他变量都专用于各页面，不需要写在这里，后续将去除*/
    }
})();
