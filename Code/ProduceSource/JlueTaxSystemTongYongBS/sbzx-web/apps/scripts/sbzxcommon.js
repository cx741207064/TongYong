/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：17:45
 *
 */

var Api = {
    /**
     * 代码转名称的api接口映射
     * */
    dmToMcMap: {
        'hy': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_HY?dm=',//取 行业 名称
        'djzclx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_DJ_DJZCLX?dm=',//取 登记注册类型 名称
        'zzsqylx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_ZZSQYLX?dm=',//取 增值税企业类型 名称
        'swjg': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG_GT3?dm=',//取 税务机关 名称
        'ds_swjg': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SWJG_DS?dm=',//取 税务机关 名称
        'yhhb': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_YHHB?dm=',//取 银行行别 名称
        'qgxzqh': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_QGXZQH?dm=',//取 全国行政区划 名称
        'sfzjlx': '/sbzx-web/api/baseCode/get/getBaseCodeValueByName/DM_GY_SFZJLX?dm='//取 身份证件类型 名称
    },
    getUrl: function (obj, name) {
        for (var url in obj) {
            if (url == name) {
                return obj[name];
                break;
            }
        }
        return this;
    },
    replaceUrl: function (url,name, data) {
        var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
        url = url.replace(reg, function(_, item) {
            if(typeof data=='object'){
                return eval('data.' + item);
            }else if(typeof data=='string'){
                return item
            }else if(typeof data=='array'){
                return eval('data[' + item + ']');
            }

        });
        return url;
    },
    /**
     * 获取数据接口（适用于只取返回数据的接口）
     * @param {string} url 接口地址
     * @param {object} request 请求数据对象
     * @param {string} type http请求类型post/get
     * @param {boolean} errorToClose 报错是否关闭页面
     * @return {object}
     * */
    getData: function (url,request,type,errorToClose) {
        var result = null;
        if(!url){
            return result;
        }
        request = request?request:{};
        type = type?type.toLowerCase():'post';
        errorToClose = !!errorToClose;
        var _this = this;
        if(type === 'post'){
            ajax.post(url, mini.encode(request), function (response) {
                if(response.success){
                    result = response.value;
                }else{
                    mini.alert(response.message,'提示',function () {
                        errorToClose && _this.closeWindow();
                    });
                }
            }, function (response) {
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            });
        }else{
            ajax.get(url,mini.encode(request), function (response) {
                result = response;
            }, function (response) {
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            })
        }

        return result;
    },
    /**
     * 获取接口返回成功与否（适用于只取返回数据中success字段的接口）
     * @param {string} url 接口地址
     * @param {object} request 请求数据对象
     * @param {boolean} errorToClose 报错是否关闭页面
     * @return {boolean}
     * */
    getIfSuccess: function (url, request,errorToClose) {
        var result = false;
        if(!url){
            return result;
        }
        errorToClose = !!errorToClose;
        var _this = this;
        ajax.post(url, mini.encode(request), function (response) {
            if(response.success){
                result = true;
            }else{
                mini.alert(response.message,'提示',function () {
                    errorToClose && _this.closeWindow();
                });
            }
        }, function (response) {
            mini.alert(response.message,'提示',function () {
                errorToClose && _this.closeWindow();
            });
        });
        return result;
    },
    /**
     * 获取纳税人存款账户信息
     * */
    getNsrckzhxx: function () {
        var url = '/sbzx-web/api/base/nsrckzhxx/get';
        var obj = this.getData(url,null,'get');
        if(!obj || !obj.value){
            return null;
        }
        return obj.value;
    },
    /**
     * 通过代码获取名称
     * */
    getMcByDm: function (type, dm) {
        var url = this.dmToMcMap[type]+dm;
        if(!url){
            return '';
        }
        var obj = this.getData(url,null,'get');
        if(!obj){
            return '';
        }
        return obj.MC;
    },
    /**
     * 关闭页面
     * */
    closeWindow: function () {
        if (window.CloseOwnerWindow)
            return window.CloseOwnerWindow();
        else
            window_close();
    },
    setWdFormValue: function (key, value) {
        try{
            Form.Set(key, value);
        }catch (e){

        }
    },
    getWdFormValue: function (key) {
        var result = null;
        try{
            result = Form.Get(key);
        }catch (e){

        }
        return result;
    },
    getDsNsrxxVo: function () {
        return this.getData('/sbzx-web/api/base/dsnsrxx/get', {});
    }
};

if(mini){
    //ajax重写
    mini.ajax = function (options) {
        if (!options.dataType) {
            options.dataType = "text";
        }
        if(!(options.sender && $(options.sender.el).hasClass('mini-datagrid'))){
            options.isMini = 'Y';
        }
        options.async = false;
        return window.jQuery.ajax(options);
    };
}
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

/**
 * Created by chenjunj on 2017/10/23 9:50.
 */
var ybnsrService = {
    /**
     * 设置数据到表中，这里的数据都是{'001_1_1':'123.00'}形式
     * */
    setDataFromDataMap: function (dataMap) {
        $.each(dataMap, function (id, val) {
            var idReg = /\d+_\d+_\d+/;
            if(idReg.test(id)){
                $('#'+id).length > 0 && $('#'+id).val(val).change().blur();
            }
        });
    }
};
/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/1/25
 * Time：18:03
 *
 */

// 文书申请工具类

window.wssqUtil=function () {

    var wssq={};
    wssq.isValid=true;
    wssq.isSaved=true;
    // 当前功能的税务事项代码
    wssq.currentSwsxDm = null;

    // 纳税人基本信息
    wssq.nsrjbxx = null;

    // 登记序号

    wssq.djxh = null;

    /**
     * 抛出错误
     * @param message
     */
    function throwError(message) {
        if (arguments.length > 1) {
            message = message.format(Array.prototype.slice.call(arguments, 1));
        }
        throw new Error(message);
    }
    /**
     *  加载 js
     * @param htmlUrl
     */
    wssq.loadScript=function (url) {
        var script = document.createElement("script"),
            body = document.getElementsByTagName('body')[0];
        url = url + '?_=' + new Date().getTime();
        script.src = url.indexOf('.html')!==-1 ? url.replace('.html', '.js') : url;
        body.appendChild(script);
    };
    /**
     * 加载 css
     */
    wssq.loadCss =function (url) {
        var link = document.createElement("link"),
            head = document.getElementsByTagName('head')[0];

        link.href = url + '?_=' + new Date().getTime();
        link.rel = "stylesheet";
        head.appendChild(link);
    };
    /**
     *  加载模版
     * @param url
     * @param Data
     * @returns {string}
     */
    wssq.loadTemplate=function(url,Data) {
        var html='';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data, textStatus) {
                if(!!Data){
                    try{
                        var reg = /(?:\{\{)(\w[\.\w]*)(?:\}\})/g; // 匹配 {{ data.param }}
                        data = data.replace(reg, function(_, item) {
                            return eval("Data." + item);
                        });
                    } catch (e){
                        // TODO
                    }
                }
                html = data;
                //wssq.loadScript(url);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('加载html出错');
            }
        });
        return html;
    };
    /**
     * 插入模板片段
     * @param templateUrl
     * @param targetDom
     * @param templateData
     */
    wssq.appendTemplate=function(templateUrl,targetDom,templateData) {
        targetDom.append(this.loadTemplate(templateUrl,templateData));
    };
    /**
     * 替换html模板片段
     * @param templateUrl
     * @param targetDom
     * @param templateData
     */
    wssq.htmlTemplate=function(templateUrl,targetDom,templateData) {
        targetDom.html(this.loadTemplate(templateUrl,templateData));
    };
    /**
     * 在某个元素之前插入 模板片段
     * @param templateUrl
     * @param targetDom
     * @param templateData
     */
    wssq.beforeTemplate=function(templateUrl,targetDom,templateData) {
        targetDom.before(this.loadTemplate(templateUrl,templateData));
    };
    /**
     * 在某个元素之后插入模板片段
     * @param templateUrl
     * @param targetDom
     * @param templateData
     */
    wssq.afterTemplate=function(templateUrl,targetDom,templateData) {
        targetDom.after(this.loadTemplate(templateUrl,templateData));
    };


    /**
     * mini show tips
     * @param title
     * @param content
     * @param type
     * @param time
     */
    wssq.showTips = function (title, content, type, time) {
        var _time = 3000;
        if (!!time) {
            _time = time;
        }
        mini.showTips({
            content: "<b>" + title + "</b><br/>" + content,
            state: type,
            x: 'center',
            y: 'top',
            offset: [0, 58],
            timeout: _time
        })
    };

    /**
     * mini-datagrid 编辑按钮，激活改datagrid
     * @param grid_id
     * @private
     */
    function _editGrid(grid_id) {
        var grid = mini.get(grid_id);
        var gridToolBar = $('#'+grid_id).prev();
        grid.setAllowCellEdit(true);
        // 校验表格，以激活颜色
        grid.validate();
        gridToolBar.find('.grid-edit').hide();
        gridToolBar.find('.grid-save').css('display','inline-block');
        wssq.isSaved = false;

    }

    /**
     * mini-datagrid 保存修改
     * @param grid_id
     * @returns {boolean}
     * @private
     */
    function _saveGrid(grid_id) {
        var grid = mini.get(grid_id);
        // 校验表格
        grid.validate();
        if(!grid.isValid()){
            var errors = grid.getCellErrors(),errorObj={},errorText='';
            for (var i = 0; i < errors.length; i++) {
                errorObj = errors[i];
                errorText += errorObj.column.header + errorObj.errorText +'<br/>';
            }
            wssq.showTips('保存失败',errorText,'danger');
            wssq.isValid=false;
            return false;
        }else{
            var gridToolBar = $('#'+grid_id).prev();
            grid.setAllowCellEdit(false);
            grid.validate();
            gridToolBar.find('.grid-edit').show();
            gridToolBar.find('.grid-save').hide();
            wssq.showTips('保存成功','表格数据保存成功','success',2000);

            wssq.isValid=true;
            wssq.isSaved=true;

            var stepSection = gridToolBar.parent();
            if(!stepSection.is('section')){
                return true;
            }else{
                var currentIndex = Number(stepSection.attr('id').replace('wizard-p-',''));
                var newIndex = Number(stepSection.next().attr('id').replace('wizard-h-',''));
                stepNav.onStepDataSaved(this,currentIndex,newIndex);
            }
        }
    }

    /**
     * mini-datagrid 删除行
     * @param grid_id
     * @private
     */
    function _removeRow (grid_id) {
        var grid = mini.get(grid_id);
        var rows = grid.getSelecteds();
        if (rows.length > 0) {
            mini.confirm('确定删除选中的记录吗？','提示',function (action) {
                if(action==='ok'){
                    grid.removeRows(rows, false); // false 不会自动选中下一条记录
                    wssq.showTips('删除成功','表格数据删除成功','success',2000);
                }
            });
        } else {
            mini.alert("请选中一条记录");
        }
    }

    /**
     * mini-datagrid 增加行 ，
     * @param grid_id
     * @param url
     */
    wssq.addRow = function (grid_id,url) {

        var grid = mini.get(grid_id);
        // 如果是参数含有html，则使用 mini.open
        if(url.indexOf('.html')>-1){
            mini.open({
                url: url,        //页面地址
                title: '增加',      //标题
                iconCls: '',    //标题图标
                width: 760,      //宽度
                height: 600,     //高度
                allowResize: false,       //允许尺寸调节
                allowDrag: true,         //允许拖拽位置
                showCloseButton: true,   //显示关闭按钮
                showMaxButton: false,     //显示最大化按钮
                showModal: true,         //显示遮罩
                currentWindow:false,      //是否在本地弹出页面,默认false
                effect:'fast',              //打开和关闭时的特果:'none','slow','fast',默认'none'
                onload: function () {       //弹出页面加载完成
                    var iframe = this.getIFrameEl();
                    var data = {};
                    //调用弹出页面方法进行初始化
                    //iframe.contentWindow.SetData(data);

                },
                ondestroy: function (action) {  //弹出页面关闭前
                    if (action == "ok") {       //如果点击“确定”
                        var iframe = this.getIFrameEl();
                        //获取选中、编辑的结果
                        //var data = iframe.contentWindow.GetData();
                        var data = mini.clone(data);    //必须。克隆数据。
                    }
                }

            });
        }else{ // show指定的 mini-window id
            try{
                var form = new mini.Form('#'+url);
                form.clear()
            }catch (e){
                // TODO
            }
            mini.get(url).show();
        }
    };

    /**
     * 设置datagrid tool bar
     * @returns {string}
     */
    wssq.initGridToolBar = function () {

        $('.grid-toolbar').each(function () {

            // 绑定纳税人信息面板展开方法
            $(this).delegate('a.nsrxx-pannel','click',function () {
                $(this).find('ul').slideToggle();
            });

            // 每一个 grid-toolbar 必须通过自定义属性 data-bind-grid 绑定一个 mini-datagrid
            var bindedGrid = $(this).attr('data-bind-grid'),
                optionCollection = $(this).children('a.mini-button');

            for(var i=0;i<optionCollection.length;i++){

                var btn = $(optionCollection[i]),
                    classCollection = btn.attr('class');
                /*if (classCollection.indexOf('grid-add') !== -1) {
                 btn.on('click', function () {
                 wssq.addRow(bindedGrid);
                 });
                 }*/
                if (classCollection.indexOf('grid-edit') !== -1) {
                    btn.on('click', function () {
                        _editGrid(bindedGrid)
                    });
                }
                if (classCollection.indexOf('grid-save') !== -1) {
                    btn.on('click', function () {
                        _saveGrid(bindedGrid)
                    });
                }
                if (classCollection.indexOf('grid-remove') !== -1) {
                    btn.on('click', function () {
                        _removeRow(bindedGrid)
                    });
                }
            }
            var targetGrid = ''; // 绑定的grid
            if(!!bindedGrid){
                targetGrid = mini.get(bindedGrid);
                targetGrid.setShowModified(false); // 不显示 修改后的小三角
                targetGrid.setAllowCellValid(true); //　编辑后自动校验
                /*targetGrid.on('cellendedit',function (e) {
                 e.sender.validate();
                 });*/
                targetGrid.on('cellvalidation',function (e) {
                    if(!!e.errorText){
                        //e.focus()
                        wssq.showTips('修改失败',e.errorText,'danger');
                        wssq.isValid = false;
                        return false;
                    }else if(!e.errorText){
                        wssq.isValid = true;
                    }
                })
            }else{
                var nextDom = $(this).next();
                if (nextDom.is('div') && nextDom.hasClass('mini-datagrid')) {

                }
            }
        });
        return 'GridToolBarInitialized';
    };

    /**
     * 初始化前置条件
     * @param reason
     * @param pre
     * @param url
     */
    wssq.showPrePage=function (reason,pre,url) {

        // 加载模版
        var data = {reason:reason,pre:pre,url:url,preTime:10,goText:'立刻跳转到'+ pre },
            html = wssq.loadTemplate('../../../apps/views/public/prepare/PrepareView.html',data);
        $(stepNav.wizard).before(html);

        // 设置跳转倒计时
        var preTime=9,
            preInterval = setInterval(function () {
                if (preTime < 10) {
                    preTime = '0' + preTime;
                }
                $('#pre-time').text(preTime);
                preTime--;
                if(preTime==-1){
                    clearInterval(preInterval);
                    window.location.href=url;
                }
            },1000);
    };

    /**
     * steps 最后一步结束后 ，显示结果页面
     * @param reason
     * @param pre
     * @param url
     */
    wssq.showResult=function (reason,pre,url) {

        //加载模版
        var data = {reason:reason,pre:pre,url:url},
            html = wssq.loadTemplate('../../../apps/views/public//result/ResultView.html',data);
        stepNav.wizard.children().last().hide().prev().html(html);

        // 倒计时 15 秒 跳转
        var preTime=14,
            preInterval = setInterval(function () {
                if (preTime < 10) {
                    preTime = '0' + preTime;
                }
                $('#pre-time').text(preTime);
                preTime--;
                if(preTime==-1){
                    clearInterval(preInterval);
                    window.location.href=url;
                }
            },1000);
    };

    /**
     * 初始化页面头部和页脚,私有静态方法
     */
    wssq.initPageHdFt=function (type) {
        var HdFt= type,tplUrl='';
        // 如果有参数指定初始化头或尾，则按参数来初始化
        if(!!HdFt){
            if(HdFt=='head'){
                stepNav = window.stepNav||{};
                var nsrxxvo = nsrxxUtil.getNsrxxVO()||{};
                var nsrxx = stepNav.isLoggedIn ? nsrxxvo : {};
                nsrxx.title = document.title;
                if (store.getSession('getUserInfo') && store.getSession('getUserInfo').AccountInfo){
                    nsrxx.fullName = store.getSession('getUserInfo').AccountInfo.fullName;
                } else {
                    $.ajax({
                        url: '/bszm-web/api/desktop/userInfo/get',
                        type: 'GET',
                        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                        async: false,
                        success: function (data) {
                            if (data.success){
                                nsrxx.fullName = data.data.AccountInfo.fullName;
                                store.setSession('getUserInfo',data.data);
                            }
                        }
                    })
                }
                tplUrl = '../../../apps/views/public/head/HeadView.html';
                var html= wssq.loadTemplate(tplUrl,nsrxx);
                $('body').prepend(html);

                // 有纳税人识别号和纳税人名称时才显示
                if(!nsrxx.hasOwnProperty('nsrsbh') || !nsrxx.hasOwnProperty('nsrmc')){
                    $('.company-info').remove();
                }

                return 'Page Header Initialized';
            }else if(HdFt=='foot'){
                tplUrl = '../../../apps/views/public/foot/FootView.html';
                var html= wssq.loadTemplate(tplUrl,null);
                $('body').append(html);
                return 'Page Footer Initialized';
            }

        }else{ // 若没有参数，则页头页脚都初始化

            return 'Page Header And Footer Initialized';
        }

    };
    wssq.yltjIndex=null;
    wssq.setBtnDisabled=function(btn,seconds) {
        wssq.yltjIndex = wssq.yltjIndex || stepNav.yltjStep;
        var curentNav = 0;
        $(btn).attr({disabled:'disabled',href:'href'}).css('cursor','not-allowed').text(seconds+'秒后重试');
        var timer = setInterval(function () {
            seconds = Number(seconds)-1;
            if(seconds<10){
                seconds = '0' + seconds;
            }
            $(btn).text(seconds+'秒后重试');
            if(Number(seconds)==0){
                $('li[role="tab"]').each(function (i,v) {
                    if($(v).hasClass('current')){
                        curentNav = i;
                    }
                });
                var btnText = curentNav<wssq.yltjIndex?'下一步':'提交';
                clearInterval(timer);
                $(btn).text(btnText).removeAttr('disabled').attr('href','#next').css('cursor','pointer');
            }
        },1000);
    };
    wssq.tjsq = function (url,content,success,err,extraParams) {

        // 校验缓存的登记序号是否和当前记录的登记序号一致
        if(stepNav.isLoggedIn && !_validateDjxh()){
            mini.unmask();
            return false;
        }
        // ca 验签
        /*if(!_makeCaEcp()){
            return false;
        }*/

        var _lqfsDm ='',
            _yjddxx='',
            fbzl = '[]';
        // 组织领取方式代码
        if(!!window.lqfs){
            _lqfsDm = lqfs.selected;
        }
        // 邮寄订单信息
        if(typeof emailInfo !='undefined'){
            _yjddxx = mini.encode(emailInfo.getData());
        }
        // 组织附报资料数据
        if(!!window.fbzldata){
            filterExcessData();
            fbzl = mini.encode(fbzldata);
        }
        var data={
            data:content,
            djxh:wssq.nsrjbxx.djxh,
            nsrmc:wssq.nsrjbxx.nsrmc,
            nsrsbh:wssq.nsrjbxx.nsrsbh,
            lqfsDm: _lqfsDm,
            yjDdxxDto: _yjddxx,
            fbzlList:fbzl,
            stepConfig:mini.encode(stepNav.config),
            viewData:mini.encode(_getViewData())
        };
        // err 回调 可以不写，直接写 object 参数
        if (typeof err === 'object') {
            extraParams = mini.clone(err);
            err = undefined;
        }
        //
        if(typeof extraParams === 'object'){
            $.extend(data,extraParams);
        }

        ajax.post(url,mini.encode(data),function (response) {

            if(response.success && response.value){
                wssq.tjsqResponse = response.value;
                wssq.sqxh = response.value.sqxh;

                //初始化办理状态
                blzt.initBlzt();
            }else{
                stepNav.confirmSubmit = false;

                mini.alert(response.message,'提示',function () {
                    wssq.setBtnDisabled($('a[href="#next"]'),60);
                });

            }
            // 执行各自业务的回调
            success(response);

        },err);
        mini.unmask();
    };

    wssq.tjsqGr = function (url,content,extraParams,success,err) {

        // 校验缓存的登记序号是否和当前记录的登记序号一致
        if(stepNav.isLoggedIn && !_validateDjxh()){
            mini.unmask();
            return false;
        }
        // ca 验签
        /*if(!_makeCaEcp()){
            return false;
        }*/

        var _lqfsDm ='',
            _yjddxx='',
            fbzl = '[]';
        // 组织领取方式代码
        if(!!window.lqfs){
            _lqfsDm = lqfs.selected;
        }
        // 邮寄订单信息
        if(typeof emailInfo !='undefined'){
            _yjddxx = mini.encode(emailInfo.getData());
        }
        // 组织附报资料数据
        if(!!window.fbzldata){
            filterExcessData();
            fbzl = mini.encode(fbzldata);
        }
        var data={
            data:content,
            lqfsDm: _lqfsDm,
            yjDdxxDto: _yjddxx,
            fbzlList:fbzl,
            stepConfig:mini.encode(stepNav.config),
            viewData:mini.encode(_getViewData())
        };
        $.extend(data,extraParams);
        ajax.post(url,mini.encode(data),function (response) {

            if(response.success && response.value){
                wssq.tjsqResponse = response.value;
                wssq.sqxh = response.value.sqxh;

                //初始化办理状态
                blzt.initBlzt();
            }else{
                stepNav.confirmSubmit = false;

                mini.alert(response.message,'提示',function () {
                    wssq.setBtnDisabled($('a[href="#next"]'),60);
                });

            }
            // 执行各自业务的回调
            success(response);

        },err);
        mini.unmask();
    };

    // 检查登记序号是否一致
    function _validateDjxh() {
        var curNsrxx = nsrxxUtil.getUserInfo(true) || {};
        curNsrxx.NsrInfo = curNsrxx.NsrInfo ||{};// 税务登记信息补录没有NsrInfo
        var curDjxh = curNsrxx.NsrInfo.djxh || store.getSession('grDjxh') ||'';
        if(curDjxh !== wssqUtil.djxh){
            mini.alert('会话已经过期，请重新打开页面','提示',function () {
                window.close();
            });
            return false;
        }
        return true;
    }

    // ca 验签
    function _makeCaEcp() {
        var result = null;
        ajax.post('/wszx-web/api/casz/query/nsrcaszxx',{},function (result) {
            if(result.success && !!result.value){
                wssq.caType = result.value.catype;
            }else{
                mini.alert(result.message);
                return false;
            }
        });
        if(!!wssq.caType){
            if(wssq.caType==='HBCA'){ // 联通CA
                result = CAES.signWithHBCA();
            }else if(wssq.caType==='HBDSCA'){ // 河北CA
                result = CAES.signWithHBDSCA();
            }else if(wssq.caType==='BJCA'){ // 北京CA
                result = CAES.signWithBJCA();
            }
        }
        return result;
    }

    // 获取查看我的附报资料的数据
    function _getViewData() {
        var elements = document.querySelectorAll("[data-view-type]"),
            targetId = null,
            targetType = null,
            data = {};
        for(var i=0,len =elements.length;i<len;i++ ){
            targetId = elements[i].getAttribute("id");
            targetType = elements[i].getAttribute("data-view-type");
            if(!!targetType){
                targetType = targetType.toLowerCase();
                if(targetType==="form"){
                    var form = new mini.Form("#"+targetId);
                    data[targetId] = form.getDataAndText(true); // form 获取下拉框和树数据的text

                } else if(targetType==="datagrid"){
                    targetId =  elements[i].children[0].getAttribute("id")||$(elements[i]).children(0)._id();
                    if(!targetId){
                        throwError("data-view-type=datagrid 第一个子节点的id未获取到，请检查第一个子节点！");
                        return false;
                    }
                    var grid = mini.get(targetId);
                    data[targetId] = grid.getData();
                }
            }else{
                // 报错
                throwError("预览提交模版页面上某个标签的属性[data-view-type]没有被赋值，请检查！")
            }
        }
        return data;
    }

    // 查询是否有正在办理的业务
    wssq.checkZzbl = function (swsxDm) {
        var url='../../../api/base/zzblrw/query/'+swsxDm;
        var hasZzblyw = true;
        ajax.post(url,{},function (result) {
            // 没有正在办理
            if(result.success){
                hasZzblyw = true;
            }else{ // 有正在办理
                hasZzblyw = false;
                mini.alert(result.message,'提示',function () {
                    window.close();
                })
            }
        });

        return hasZzblyw;

    };
    // 关闭 mini open 的window
    wssq.closeWin = function (action) {
        if (window.CloseOwnerWindow) {
            return window.CloseOwnerWindow(action);
        }
        else {
            if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
                window.location.href="about:blank";
                win_close();
            } else {
                window.opener = null;
                window.open("", "_self");
                win_close();
            }
        }
    };

    wssq.payLoad = function (e) {
        e.contentType='application/json;charset=utf-8';
        e.data=mini.encode(e.data);
    };

    /**
     * mini-datagrid 去除 tabindex 属性，否则会在focus事件触发是位置发生改变 ,私有静态方法
     */
    /* wssq.removeTabIndex=function () {
     $('div.mini-grid.mini-datagrid').removeAttr('tabindex');
     return 'GridTabIndexRemoved';
     }();*/

    // 事项监控
    wssq.prepareValidateApi = '../../../api/validate/beforehand/';
    wssq.prepareValidate = function () {
        var resultData = {};
        var code = Tools.getUrlParamByName('code'),
            id = Tools.getUrlParamByName('id');
        var url = this.prepareValidateApi + code + '/' + id;
        mini.mask('系统正在进行事前监控校验，请稍候...');
        ajax.asyncGet(url,{},function (result) {
            mini.unmask();
            if(!result.success){
                mini.alert(result.message,'提示',function () {
                    wssq.closeWin();
                });
                return;
            }
            if(!result.value || result.value.ruleResults.length===0){
                return;
            }
            //由于智数中心返回errorcount不正确，暂时自己计算 begin
            var errorCount = 0;
            var resultCount = 0;
            var errorResult = [];
            var isNull = true; //是否都为空标识
            var needCloseWin = false; // 是否需要关闭整个功能页面
            var data = result.value.ruleResults;
            for(var i=0;i<data.length;i++){
                if(!data[i].resultValue && data[i].ruleDegree=='01'){
                    errorResult[resultCount]=data[i];
                    resultCount++;
                    errorCount++;
                    needCloseWin = true;
                }
                if(!data[i].resultValue && data[i].ruleDegree=='02'){
                    errorResult[resultCount]=data[i];
                    resultCount++;
                    errorCount++;
                }
            }
            for(var j =0;j<errorResult.length;j++){
                if(!!errorResult[j].resultUrl){
                    isNull = false;
                }
            }
            result.value.ruleErrorCount = errorCount;   //由于智数中心返回errorcount不正确，暂时自己计算
            result.value.ruleResults = errorResult; // 只保留校验不通过的数据
            resultData = result.value;
            var url = '../itemValidate/validationWin.html';
            if(top.location.href.indexOf('/views/sszyfwxxcj/')>-1){ // 涉税信息采集多一层目录
                url = '../' + url;
            }
            // 校验不通过的项目大于0条就弹窗提示
            if(errorCount>0){
                mini.open({
                    url: url,        //页面地址
                    title: "事项监控",      //标题
                    width: 1200,      //宽度
                    height: 600,     //高度
                    allowResize: false,       //允许尺寸调节
                    allowDrag: true,         //允许拖拽位置
                    showCloseButton: false,   //显示关闭按钮
                    showMaxButton: false,     //显示最大化按钮
                    showModal: true,         //显示遮罩
                    currentWindow: false,      //是否在本地弹出页面,默认false
                    onload: function () {       //弹出页面加载完成
                        var iframe = this.getIFrameEl();
                        //调用弹出页面方法进行初始化
                        var data = mini.clone(resultData);
                        iframe.contentWindow.initValidateGrid(data,isNull,needCloseWin);
                    }
                })
            }

        },function (err) {
            mini.unmask();
            mini.alert('事前监控服务调用发生异常，请您稍后重试！','提示',function () {
                wssq.closeWin();
            })
        });
    };

    return wssq;
}();



/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2016/11/21
 * Time：16:00
 *
 */

var xmlUtil = function () {
    // IE浏览器下 xmlDocument的不同版本
    var xmlDomVersions = ['MSXML2.DOMDocument.6.0', 'MSXML2.DOMDocument.3.0', "MSXML2.DOMDocument", 'Microsoft.XMLDOM'];
    // 将xml字符串载成xmlDocument
    var _turnStrToXml = function (xmlString) {
        var xmlDoc = null;
        //支持IE浏览器
        if (Tools.isIE && !window.DOMParser) {
            for (var i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                } catch (e) {
                    console.log('IE下解析XML字符串出错');
                }
            }
        }
        //非ie浏览器 , window.DOMParser 判断是否是非ie浏览器
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                xmlDoc = (new DOMParser()).parseFromString(xmlString, 'text/xml');
            } catch (e) {
                console.log('非IE下解析XML字符串出错');
            }
        }
        else {
            return null;
        }

        return xmlDoc;
    };

    //解析XML文件
    var _loadXmlFile = function (xmlFile) {
        var xmlDoc = null;
        if (Tools.isIE && !window.DOMParser) {
            if (typeof arguments.callee.activeXString != 'string') {
                for (var i = 0; i < xmlDomVersions.length; i++) {
                    try {
                        new ActiveXObject(xmlDomVersions[i]);
                        arguments.callee.activeXString = xmlDomVersions[i];
                        break;
                    } catch (ex) {
                        //TODO
                    }
                }
            }
            xmlDoc = new ActiveXObject(arguments.callee.activeXString);
        }
        else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                /* document.implementation.createDocument('','',null); 方法的三个参数说明
                 * 第一个参数是包含文档所使用的命名空间URI的字符串；
                 * 第二个参数是包含文档根元素名称的字符串；
                 * 第三个参数是要创建的文档类型（也称为doctype）
                 */
                xmlDoc = document.implementation.createDocument('', '', null);
            } catch (e) {
                //TODO
            }
        }
        else {
            xmlDoc = null;
        }

        if (xmlDoc != null) {
            try {
                xmlDoc.async = false;
                xmlDoc.load(xmlFile);
            } catch (e) {
                //TODO
            }

        } else {
            console.log('加载的xml文件为空')
        }
        return xmlDoc;
    };

    //加载本地xml文件
    var _loadFileByPath = function (path, type) {
        var result = {};
        var _type = arguments.length == 2 ? arguments[1] : 'xml';
        $.ajax({
            url: path,
            type: 'GET',
            cache: false,
            dataType: _type,
            async: false,
            success: function (data) {
                result = data;
                if (Tools.isIE) {
                    try{
                        result.childNodes[0].xml = _loadXmlFile(path).xml;
                    }
                    catch (e){
                        //TODO
                    }
                }
            },
            error: function () {
                console.log('ajax请求本地xml文件失败');
            }
        });
        return result;
    };
    // xmldocument转成xml字符串
    var _turnXmlToStr = function (XMLDOM) {
        var xml;
        if ('XMLSerializer' in window) {
            if (Tools.isIE && Tools.browser.ie ==9) {
                xml = $(XMLDOM).children()[0].xml || new XMLSerializer().serializeToString($(XMLDOM).children()[0]);
            } else {
                xml = new XMLSerializer().serializeToString($(XMLDOM).children()[0]);
            }
        } else if (Tools.isIE) {
            xml = $(XMLDOM).children()[0].xml;
        }
        else {
            xml = $(XMLDOM).children()[0].outerHTML;
        }
        !xml && alert('XMLDocument转成String出错，请使用谷歌浏览器重试，或者请联系运维人员！');
        return xml;
    };


    /**
     *xml对象转json对象
     *xmlDom:xmlDocument 对象，必选参数
     *nodeName:节点路径('ROOT/ITEM') ，可选参数
     *isArray:true,强制返回数组对象，可选参数
     **/
    var _turnXmlToJson = function (xmlDom, nodeName, isArray) {
        var obj = [], // nodeName 'ROOT/ITEM'，在xml中找到对应的 xml 节点
            targetObj = {}, // xml 最终生成的目标 json
            nodeNames = ''; // 是否传入nodeName 'ROOT/ITEM'

        //递归解析xml 转换成json对象
        var getAllAttr = function (node) {
            var nodeObj = {}, // 存储 xml节点对应的 object
                nodeChild = [], // 存储 非文本节点
                nodeAttr = node.attributes, //节点的属性
                childLength,        // 子节点的长度
                attrLength = nodeAttr.length;  // 节点属性的长度

            for (var i = 0; i < node.childNodes.length; i++) {
                // 过滤掉文本节点
                if (node.childNodes[i].nodeName != '#text') {
                    nodeChild.push(node.childNodes[i]);
                }
            }
            // 新的节点数组的长度
            childLength = nodeChild.length;

            if (childLength > 0 || attrLength > 0) {
                // 如果节点有属性设置
                if (nodeAttr && nodeAttr != undefined) {
                    for (var j = 0; j < attrLength; j++) {//解析xml节点属性

                        nodeObj[nodeAttr[j].nodeName] = nodeAttr[j].nodeValue;
                    }
                }
                for (var k = 0; k < childLength; k++) {//解析xml子节点

                    var _nodeName = nodeChild[k].nodeName;


                    if (nodeObj[_nodeName] && nodeObj[_nodeName] != undefined) {//如果有重复的节点需要转为数组格式
                        if (!(nodeObj[_nodeName] instanceof Array)) {

                            nodeObj[_nodeName] = [nodeObj[_nodeName]];//如果该节点出现大于一个的情况 把第一个的值存放到数组中
                        }
                    }
                    var _nodeValue = getAllAttr(nodeChild[k]);
                    try {
                        nodeObj[_nodeName].push(_nodeValue);
                    } catch (e) {
                        nodeObj[_nodeName] = _nodeValue;
                        nodeObj["length"] = 1;
                    }
                }
            } else {
                nodeObj = (node.textContent == undefined) ? node.text : node.textContent;
            }
            return nodeObj;
        };
        // 如果有参数指定了节点名字
        if (nodeName) {
            if (nodeName.indexOf("/") != -1) {
                nodeNames = nodeName.split("/");
            } else {
                nodeNames = nodeName;
            }
        } else {
            obj = xmlDom;
        }
        // 将节点名压入数组
        for (var i = 0; i < nodeNames.length; i++) {
            obj.push($(xmlDom).find(nodeNames[i]));
        }
        // 节点数组循环转换成json
        $(obj).each(function (key, item) {

            // 如果目标json中已经存在该节点，将该节点转成 array，继续压入相同的节点
            if (targetObj[item.nodeName] && targetObj[item.nodeName] != undefined) {

                if (!(targetObj[item.nodeName] instanceof Array)) {

                    targetObj[item.nodeName] = [targetObj[item.nodeName]];
                }

                targetObj[item.nodeName].push(getAllAttr(item));

            } else { // 如果目标json中不存在该节点，则压入

                if (nodeNames.length > 0) {

                    targetObj[item.nodeName] = getAllAttr(item);
                } else {

                    targetObj[item.firstChild.nodeName] = getAllAttr(item.firstChild);
                }
            }
        });

        if (nodeNames.length > 1) {

            targetObj = targetObj[nodeNames[nodeNames.length - 1]];
        }
        // 根据参数isArray ，是否将 对象转成数组
        if (isArray && !(targetObj instanceof Array) && targetObj) {

            targetObj = [targetObj];
        }
        return targetObj;

    };
    return {
        //加载本地xml文件得到xmlDocument 对象:  path, type
        loadFileByPath: function () {
            return _loadFileByPath.apply(this, arguments);
        },
        // xmlDocument 对象 转成 xmlStr 字符串
        turnXmlToStr: function () {
            return _turnXmlToStr.apply(this, arguments);
        },
        // xmlStr字符串 加载成 XMLDocument 对象
        turnStrToXml: function () {
            return _turnStrToXml.apply(this, arguments);
        },
        // xmlDocument 对象转json （xml,nodeName,isArray）
        turnXmlToJson: function () {
            return _turnXmlToJson.apply(this, arguments);
        }
    }
}();
/**
 * Created by chenjunj on 2017/11/30 16:49.
 */
;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.hdxxUtil = factory();
    }
}(this, function () {
    var hdxxUtil = {
        hdxxStore: null,//缓存核定--刷新页面要重新取
        hdxxUrl: '../../../api/sb/common/get/hdxx',//取核定的接口
        jkUrl: '',//缴款链接
        sbjgcxUrl:'../sbjgcx/sbjgcx.html',//申报结果查询链接
        showJkLink: true,//重复申报时是否显示缴款链接
        showSbjgcxLink: true,//重复申报时是否显示申报结果查询链接
        getHdxx:function () {
            var hdxxData = null;
            if(this.hdxxStore){
                return this.hdxxStore;
            }
            if(hdxxData === null){
                var url = this.hdxxUrl;
                var params = {};
                var sbzlDm = Tools.getUrlParamByName('sbzlDm') || Tools.getUrlParamByName('code') || '';
                var sbny = Tools.getUrlParamByName('sbny') || '';
                var isYqsb = Tools.getUrlParamByName('yqsb') || '';
                var isQssb = Tools.getUrlParamByName('qssb') || '';
                if (sbzlDm) {
                    params.sbzlDm = sbzlDm;
                    params.sbny = sbny;
                }
                if (isYqsb){
                    params.sblx = '01';
                }
                if (isQssb){
                    params.sblx = '41';
                }
                mini.mask('期初数据获取中...');
                var _this = this;
                ajax.post(url, mini.encode(params), function (data) {
                    // 返回成功，且有数据
                    if(data.success && data.value){
                        if(data.value.sbzl[0].qccgbz === 'N'){
                            var msg = data.value.sbzl[0].qccgbzms;
                            mini.alert(msg,'提示',function () {
                                window_close();
                            });
                        }else {
                            hdxxData = data.value;
                            _this.hdxxStore = data.value;
                        }
                    }else{
                        var msg = data.message;
                        if(msg.indexOf('重复申报') !== -1){
                            if(_this.showJkLink && _this.jkUrl){
                                msg = msg + '<br/><a class="goToPay" href="'+_this.jkUrl+'">去缴款>></a>';
                            }
                            if(_this.showSbjgcxLink && _this.sbjgcxUrl){
                                msg = msg + '<br/><a class="goToPay" href="'+_this.sbjgcxUrl+'">申报结果查询>></a>';
                            }
                        }
                        mini.alert(msg,'提示',function () {
                            window_close();
                        });
                        return false;
                    }
                },function (data) {
                    mini.alert(data.message,'提示',function () {
                        window_close();
                    });
                    return false;
                });
                mini.unmask();
            }
            return hdxxData;
        },
        getSbzlNode:function () {
            return _getSbzlNode.apply(this,arguments)
        },
        getWsxxValueByCode:function (code,sbzlnode) {
            return _getValueByCode(code,sbzlnode,'wsxx');
        },
        getLsxxValueByCode:function (code,sbzlnode) {
            return _getValueByCode(code,sbzlnode,'lsxx');
        },
        getSbny:function () {
            return _getSbny.apply(this,arguments);
        }
    };
    var _getSbny = function() {
        var d = new Date();
        return d.getLastDateOfPrevMonth().format('yyyyMM');
    };
    // 核定信息中的申报种类节点
    var _getSbzlNode = function (hdxxData) {
        var hdxx = null;
        if(!!hdxxData){
            hdxx = hdxxData;
        }else{
            hdxx = hdxxUtil.getHdxx();
        }
        if(!!hdxx && !!hdxx.sbzl && hdxx.sbzl.length==1){

            return hdxx.sbzl[0];

        }else{
            return null;
        }
    };
    // 获取wsxx,lsxx节点下的某个值
    var _getValueByCode=function (code,sbzlnode,type) {

        var sbzl=null;
        if(!!sbzlnode){
            sbzl = sbzlnode;
        }else{
            sbzl = _getSbzlNode();
        }
        // 根据参数type判断是wsxx还是lsxx
        if(!!sbzl && !!sbzl[type+'s'] && !!sbzl[type+'s'][type]){
            var list = sbzl[type+'s'][type];
            var value=null;
            for (var i = 0; i < list.length; i++) {
                if(list[i].code == code){
                    value = list[i].value;
                    break;
                }
            }
            return value;
        }
    };
    return hdxxUtil;
}));
/**
 * Created by chenjunj on 2017/11/30 16:49.
 */
hdxxUtil.jkUrl = '/sbzx-web/apps/views/gdsJk/jk_jsxxcx.html';
hdxxUtil.sbjgcxUrl = '/sbzx-web/apps/views/gdsSbjgcx/sbjgcx.html';
if(window.location.href.indexOf('clientType=zzzd') > -1 || localStorage.getItem('clientType') === 'zzzd'){
    hdxxUtil.sbjgcxUrl = '/sbzx-web/apps/views/sbjgcx_zzzd/sbjgcx.html';
}
hdxxUtil.getHdxx = function () {
    var hdxxData = null;
    if(this.hdxxStore){
        return this.hdxxStore;
    }
    if(hdxxData === null){
        var url = this.hdxxUrl;
        var params = {};
        var sbzlDm = Tools.getUrlParamByName('sbzlDm') || Tools.getUrlParamByName('code') || '';
        var sbny = Tools.getUrlParamByName('sbny') || '';
        var isYqsb = Tools.getUrlParamByName('yqsb') || '';
        var isQssb = Tools.getUrlParamByName('qssb') || '';
        if (sbzlDm != '') {
            params.sbzlDm = sbzlDm;
            params.sbny = sbny;
        }
        if (isYqsb){
            params.sblx = '01';
        }
        if (isQssb){
            params.sblx = '41';
        }
        /*河北特色点---begin：附加税接口修改，同时增加参数ythsbbz*/
        if(sbzlDm === '10115' || sbzlDm === '10116'){
            url = '/sbzx-web/api/sb/fjs/hdxx';
            if(Tools.getUrlParamByName('reportWithSbzlDm')){
                params.ythsbbz = 'Y';
            }else{
                params.ythsbbz = 'N';
            }
        }
        /*河北特色点---end：附加税接口修改，同时增加参数ythsbbz*/
        mini.mask('期初数据获取中...');
        var _this = this;
        ajax.post(url, mini.encode(params), function (data) {
            // 返回成功，且有数据
            if(data.success && data.value){
                if(data.value.sbzl[0].qccgbz === 'N'){
                    var msg = data.value.sbzl[0].qccgbzms;
                    mini.alert(msg,'提示',function () {
                        window_close();
                    });
                }else {
                    hdxxData = data.value;
                    _this.hdxxStore = data.value;
                }
            }else{
                var msg = data.message;
                if(msg.indexOf('重复申报') !== -1 || msg.indexOf('[80492219]') !== -1){
                    if(_this.showJkLink && _this.jkUrl){
                        msg = msg + '<br/>如需缴款，请到<a class="goToPay" href="javascript:void(0)">查询缴款</a>';
                        msg = msg + '<br/>如需查看已申报信息，请到“<a class="goToPay" href="'+_this.sbjgcxUrl+'">申报结果查询/作废</a>”进行查看';
                    }
                }
                mini.alert(msg,'提示',function () {
                    window_close();
                });
                return false;
            }
        },function (data) {
            mini.alert(data.message,'提示',function () {
                window_close();
            });
            return false;
        });
        mini.unmask();
    }
    return hdxxData;
};