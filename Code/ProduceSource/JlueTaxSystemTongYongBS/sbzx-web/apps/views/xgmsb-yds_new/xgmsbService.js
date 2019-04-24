/**
 * Created with JetBrains WebStorm
 * Author：lizm
 * Date：2017/2/12
 * Time：13:07
 *
 */

var xgmsbService = {
	
	getHdxx: function( params, success, error ){  // 获取核定信息
	    //ajax.post('data.json', params, success, error);
	    ajax.post('/sbzx-web/api/sb/common/get/hdxx', params, success, error);
	},
	
	getSbzl: function( params, success, error ){  // 期初
		ajax.post("/sbzx-web/api/ysbqc/queryysb", params, success, error);
	},
	
    // 逾期未认定
    queryYqwrd:function () {
        var url ='../../../api/sb/xgmsb/validateYqwrd';
        var sbzlDm = Tools.getUrlParamByName('sbzlDm')||Tools.getUrlParamByName('code')||'';
        var data = {
            sbny: hdxxUtil.getSbny(),
            sbzlDm: sbzlDm
        };
        var result = false;
        ajax.post(url, mini.encode(data), function (data) {
            result = data.value;
            if (result=='1') {
                var msg = '逾期仍未办理一般纳税人进行增值税申报，应使用一般纳税人申报表，不能使用小规模申报表。<br/>'+
                    '<a class="goToPay" href="/sbzx-web/apps/views/sb_ybnsr/sb_ybnsr.html?sbzlDm='+(sbzlDm==='10103'?'10110':'10101')+'">去一般纳税人增值税申报>></a>';
                mini.alert(msg,'提示',function () {
                    window_close();
                });
                return false;
            }
        });
        return result;
    },

    // 批扣户
    queryPkzg: function () {
        var url ='../../../api/sb/xgmsb/validatePkZg';
        var data = {
            sssqQ: sbcommon.skssqq,
            sssqZ: sbcommon.skssqz
        };
        var result = false;
        ajax.post(url, mini.encode(data), function (data) {
            result = data.value;
            if (result) {
                mini.alert('您是批扣用户，不能在网上税务局进行申报','提示',function () {
                    window_close()
                });
                return false;
            }
        });
        return result;
    },
    // 双定户
    querySdh:function () {
        var url ='../../../api/sb/xgmsb/validateSdh';
        var result = false;
        ajax.post(url, {}, function (data) {
            if(data.success && data.value){
                if(data.value =='Y'){ // 双定户，无差额扣除
                    result = true;
                }
            }else{
                mini.alert(data.message,'提示',function () {
                    window_close();
                })
            }
        },function (data) {
            mini.alert(data.message,'提示',function () {
                window_close();
            })
        });
        return result;
    }

};
