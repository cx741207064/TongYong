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
        return this.getData('/sbzx-web/api/sb/common/dsnsrxx/get', {});
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