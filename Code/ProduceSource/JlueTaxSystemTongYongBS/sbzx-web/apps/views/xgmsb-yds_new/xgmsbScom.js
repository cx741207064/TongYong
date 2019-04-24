
/*小规模申报引导式不需要事前监控*/

wssqUtil.prepareValidate=function () {
    $.noop();
};

var sbcommon = {};

// 申报提交
sbcommon.sbtj = function (j3xmls,formData) {
    var result = false;
    var params={
        sbformdata:mini.encode(formData),
        sssqq:sbcommon.skssqq,
        sssqz:sbcommon.skssqz,
        sbzlDm:sbcommon.sbzlDm,
        sblxDm:"11",
        sbwjs:mini.encode(j3xmls)
    };
            //'/sbzx-web/api/sb/common/submit/sbcl
            //'../../../api/sb/common/submit/sbcl'
    //    caService.update(nsrxxUtil.getNsrxxVO().nsrsbh);
    if (caService.sfAzCa) {
        var s = caService.checkCA(nsrxxUtil.getNsrxxVO().nsrsbh);
        if(s == '11'){
            return;
        }
        if (s != 0 && s.indexOf("##") == -1) {
            var CaRecordVo = {};
            var camw = caService.encryptData(nsrxxUtil.getNsrxxVO().nsrsbh, mini.encode(j3xmls));//ca加密后密文
            if (camw && camw.indexOf("##") == -1 && camw.indexOf("&&") != -1) {
                CaRecordVo.sfnsrqm = "Y";//是否经过纳税人CA签名
                CaRecordVo.catype = caService.descCALx(caService.checkCA(nsrxxUtil.getNsrxxVO().nsrsbh));
                CaRecordVo.unencryptedbw = mini.encode(j3xmls);
                CaRecordVo.encryptedbw = caService.getCaMw(camw);
                CaRecordVo.yqzs = caService.getCaZs(camw);
                params.caData = mini.encode(CaRecordVo);
            }
        }
    }
    
    ajax.post('../../../api/sb/common/submit/sbcl.ashx',mini.encode(params),function (response) {
        if (response.success) {
            result = true;
            return true;
        }else{
            mini.alert(response.message);
            result = false;
            return false;
        }
    },function (req) {
        mini.alert(req.message);
        result = false;
        return false;
    });
    mini.unmask();

    return result;

};
sbcommon.initHdxx = function () {
    this.hdxx = hdxxUtil.getHdxx();
    if(!this.hdxx){
        return false;
    }
    this.sbzlNode = hdxxUtil.getSbzlNode();
    this.sbzlDm = this.sbzlNode.sbzlxlcode || this.sbzlNode.sbzlcode; //申报种类代码
    // 设置相关的日期
    var today = new Date();
    this.tbrq ="2019-01-15"; // 填表日期

    this.sbny = today.getLastDateOfPrevMonth('yyyyMM'); //申报年月

    this.djxh = nsrxxUtil.getNsrxxVO().djxh;  // 登记序号

    this.nsqxDm = this.sbzlNode.nsqxdm; //纳税期限代码

    this.skssqq = this.sbzlNode.sksssqQ; // 税款所属期起

    this.skssqz = this.sbzlNode.sksssqZ; // 税款所属期止
};


