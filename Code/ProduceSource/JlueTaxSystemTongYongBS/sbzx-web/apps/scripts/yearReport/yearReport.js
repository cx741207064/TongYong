/**
 * Created by chenjunj on 2017/6/8 9:39.
 * 本框架为年报框架（以列表形式展现所有报表名称，而后单表依次填写）
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
        root.yearReport = factory();
    }
}(this, function () {
    /**
     * 侧边栏（填表说明）各地区都需要
     * */
    var sideBar = {
        url:'',
        showReportTip: true,
        init: function (url,showReportTip) {
            this.url = url;
            this.showReportTip = showReportTip;
            this.showSideBar();
            this.bindEvent();
        },
        showSideBar: function () {
            var html = '<div class="sideBar" id="sideBar">';
            if(this.showReportTip){
                html += '<div class="sideBar-tip" id="sideBar-tip"></div>';
            }
            html += '</div>';
            $('body').append(html);
        },
        bindEvent: function () {
            var _this = this;
            $('body').on('click','#sideBar-tip', function () {
                mini.open({
                    cls:'fixedWindowTop0',
                    url: _this.url,        //页面地址
                    title: '填表说明',      //标题
                    width: yearReport.popWindowWidth,      //宽度
                    height: 600,     //高度
                    allowResize: false,       //允许尺寸调节
                    allowDrag: false,         //允许拖拽位置
                    showCloseButton: true,   //显示关闭按钮
                    showMaxButton: true,     //显示最大化按钮
                    showModal: true,         //显示遮罩
                    effect:'fast'              //打开和关闭时的特果:'none','slow','fast',默认'none'
                });
            });
        }
    };
    /**
     * 年报对象
     * */
    var yearReport = {
        nsrData: null,//纳税人基本信息
        gsNsrData: null,//国税纳税人基本信息
        djxh: '',
        nsrsbh: '',
        nsrmc: '',
        hd: null,//核定
        wsxxMap: {},//文书信息{key,value}映射表
        lsxxMap: {},//历史信息{key,value}映射表
        sb_data : {},//存放所有报表的缓存数据
        tableListResponse: null,//后台返回的列表数据
        sbzlDm: '',//申报种类代码
        sssqq:'',//税款所属时期起
        sssqz:'',//税款所属时期止
        tbrq:'',//填表日期
        dependOnHd: false,//报表是否由核定决定
        successUrl: '../public/sb_success.html',
        timerTemp: 120,//两次发送的时间间隔，单位：秒
        timerBoxId: '',//计时器mini弹窗的id
        escapeCheckTables: [],
      /**
         * 业务类型
         * report（正常申报），默认
         * preview（查看申报表）
         * correct（更正申报）
         * past（往期申报）
         * overdue（逾期申报）
         * */
        businessType:'',
        sblxDm: '11',//申报类型代码，默认11正常申报，03为更正申报
        reportWithNext: null,//关联后续的申报
        // reportWithPrev: null,//关联前置的申报
        prevSBtjData: null,//上一关联申报的申报数据
        prevSbzlDm: '',//上一关联申报的申报种类代码
        nextReportHd: null,//下一申报的核定
        yqSbqx: '',//逾期申报期限
        yqCqts: '',//逾期超出申报期限的天数
        needYcsbd: false,//是否需要一窗式比对----甘肃，河北，青海
        needSign: false,//是否需要pdf预览，手机签名----甘肃
        urlMap: null,//前端配置的URL映射表
        cfg : null,	//表间校验cfg
        saveCheckDatas : null,//保存校验
        doShowMessages : null,//提示性校验
        errorMSG : [],
        sbxh : '',//申报序号，用于申报成功/失败后在申报结果页面查询
        qqwjm : '',//请求文件名，用于申报成功/失败后在申报结果页面查询
        mock: false,//是否采用假数据
        apiMock:{
            tableList: 'config/tableList.json',
            nsrData: 'config/nsrData.json',
            hd:'config/hd.json'
        },//apiMock配置,默认为以上路径
        baseFileName: '',//配置主文件名 如：suodeshuiA_year
        reportName: '',//申报名称
        tableNeededChanged:false,//必填关系是否改变
        resumeXmlBbids:[],//断点续办初始化所需金三报文的id，如：'001,002,003'
        tjXmlBbids: [],//提交时特殊处理的金三报文id,如：'001,002,003'
        pzxh: '',//更正申报用到的凭证序号
        j3CorrectXml: null,//更正申报后台返回的金三报文
        changeList: [],//改变的数据
        needRefresh: false,//是否因为改变必填关系而需要刷新列表
        pcMap: {},//报表父子层级关系{key:'parentId',value:'childId'}
        chooseReportFjs: false,//允许选择是否附加税和主税种一起申报
        reportBtns: [
            {
                id: 'sb_save',
                cls: 'btn btn-blue',
                text: '申报',
                callback: function () {
                    yearReport.save();
                },
                whenToShow: ['report','correct','past','overdue']
            },
            {
              id: 'excelImport',
              cls: 'btn btn-blue',
              text: '导入',
              callback: function () {
                if(!yearReport.allowExcelImport){
                    mini.alert(yearReport.excelImportMessage);
                }else{
                  yearReport.openExcelImportPage()
                }
              },
              whenToShow: 'report,correct,past,overdue'
            },
            {
                id: 'sb_close',
                cls: 'btn btn-white',
                text: '取消',
                callback: function () {
                    yearReport.closeWindow();
                },
                whenToShow: ['report','correct','past','overdue','preview']
            }
        ],
        showSideBar: true,
        showReportTip: true,
        reportTipUrl: '',
        specialOrder:null,//特定的列表展示顺序
        preTableIds:[],//前置条件表的id
        popWindowWidth: 1220,
        excelImported: true,//是否导入了excel数据
        allowExcelImport: false,//默认显示但不允许使用excel导入
        excelImportMessage: '尊敬的纳税人，该功能正在优化中，敬请期待！',//不允许使用excel导入时的提示信息
        showZyclqqd:{
            showBz:false,//显示各省局逾期申报违法行为处理的自由裁 量权清单。
            btnName:""//各省局逾期申报违法行为处理的自由裁 量权清单超链接名称
        },
        /**
         * 获取本地json数据
         * */
        getLocalJson: function (url) {
            var json = null;
            ajax.get(url,'',function (response) {
                json = response;
            },function () {
                mini.alert('获取本地数据失败！');
            });
            return json;
        },
        getUrlMap: function () {
            if(this.urlMap)
                var result = this.getLocalJson('../../data/url/urlMap.json');
            if(result){
                this.urlMap = result;
            }
            return urlMap
        },
        /**
         * 初始化
         * */
        init: function(mock){

            if (!$('.header-area')[0]){
                header.init();//加载头部
            }
            this.mock = mock || false;
            this.run();
        },
        /**
         * 自定义初始化
         * */
        customInit: function () {

        },
        /**
         * 自定义申报按钮的配置
         * */
        customReportBtns: function () {

        },
        /**
         * 运行框架
         * */
        run : function () {
            this.determineBusiness();
            if(this.businessType === 'preview'){
                this.preview();
                this.customEvent();
                return ;
            }
            this.reportTipUrl = this.reportTipUrl || 'reportTip.html';
            this.showSideBar && sideBar.init(this.reportTipUrl,this.showReportTip);//加载侧边栏
            //执行后续流程
            this.setParam();
            this.customEvent();
            this.customInit();
        },
        /**
         * 查看申报表（预览），移除图例和按钮
         * */
        preview: function(){
            $("#hint-box").hide();
            // $('#sb_save').hide();
            // $('#sb_cancel').hide();
            // $('#sb_szjk').hide();
            this.nsrData = nsrxxUtil.getNsrxxVO();
            this.gsNsrData = mini.clone(this.nsrData);
            this.djxh = this.nsrData.djxh;
            this.nsrmc = this.nsrData.nsrmc;
            this.nsrsbh = this.nsrData.nsrsbh;
            var record = mini.decode(sessionStorage.getItem('year_record') || Api.getWdFormValue('year_record'));
            this.sbxh = record.sbxh;
            this.qqwjm = record.qqwjm;
            this.sbzlDm = record.sbzlDm;
            this.sssqq = record.skssqq;
            this.sssqz = record.skssqz;
            this.tbrq = record.sbrq;
            this.sblxDm = record.sblxDm;
            var request = {
                sbxh: this.sbxh,
                qqwjm: this.qqwjm
            };
            this.tableListResponse = sbcommon.getPreviewListData(request);
            if(!this.tableListResponse){
                return ;
            }
            this.renderTableList();
        },
        /**
         * 确定业务类型，这里不能区分是断点续办和正常申报，这两个的区分要在拿到列表数据之后才能
         * */
        determineBusiness: function () {
            var pageUrl = window.location.href;
            if(pageUrl.indexOf('preview=Y') !== -1){
                this.businessType = 'preview';
                if(Tools.getUrlParamByName('correct') === 'Y'){
                    this.sblxDm = '03';
                }
            }else if(pageUrl.indexOf('correct=Y') !== -1){
                this.businessType = 'correct';
            }else if(pageUrl.indexOf('past=Y') !== -1){
                this.businessType = 'past';
            }else if(pageUrl.indexOf('overdue=Y') !== -1){
                this.businessType = 'overdue';
            }else if (pageUrl.indexOf('yqsb=Y') !== -1){
                this.businessType = 'report';
                this.sblxDm = '01';
            }else{
                this.businessType = 'report';//统一设置为report
            }
        },
        /**
         * 设置数据（纳税人信息，核定，申报种类）
         * */
        setParam : function () {
            //匹配金三报文节点上的属性以及最前面的xml节点
            var xmlReg = /((<\?xml[^<]*)|(([a-zA-Z0-9:]+)(="[^"]*")+)|(\s{2,}))/g;
            if(this.mock){
                if(this.businessType === 'correct'){//更正申报
                    var correctData = this.getLocalJson('config/correct.json');
                    this.pzxh = correctData.pzxh;
                    this.j3CorrectXml = xmlUtil.turnStrToXml(correctData.sbxx.replace(xmlReg,''));
                    this.hd = hdxxUtil.getSbzlNode(correctData.hdxx);
                    this.sblxDm = '03';
                }else{//正常申报
                    this.hd = this.getLocalJson(this.apiMock['hd']);
                    this.sblxDm = '11';
                    if (window.location.href.indexOf('yqsb=Y') !== -1){
                        this.sblxDm = '01';
                    }
                }
            }else{
                if(this.businessType === 'correct'){//更正申报
                    var gzxx = mini.decode(store.getSession('gzxx') || Api.getWdFormValue('gzxx'));
                    if(!gzxx){
                        mini.alert('请从<a href="../gzsbcx/gzsbcx.html">更正申报查询</a>页面进行您的更正操作！','提示', function () {
                            window.location.href = '../gzsbcx/gzsbcx.html'+'?v='+(new Date().getTime()+'_2.0.0');
                        });
                        return ;
                    }
                    this.pzxh = gzxx.pzxh;
                    mini.mask('更正数据查询中...');
                    var correctData = sbcommon.getCorrectData(gzxx);
                    mini.unmask();
                    if(!correctData || !correctData.sbxx || !correctData.hdxx){
                        // mini.alert('查询更正数据出错，请联系运维人员！');
                        return ;
                    }
                    this.j3CorrectXml = xmlUtil.turnStrToXml(correctData.sbxx.replace(xmlReg,''));
                    this.hd = hdxxUtil.getSbzlNode(correctData.hdxx);
                    this.sblxDm = '03';
                }else{//正常申报
                    this.hd = hdxxUtil.getSbzlNode();
                    this.sblxDm = '11';
                    if (window.location.href.indexOf('yqsb=Y') !== -1){
                        this.sblxDm = '01';
                    }
                }
            }
            if(!this.checkHd()){
                return ;
            }
            if(this.mock){
                this.nsrData = this.getLocalJson(this.apiMock['nsrData']);
                this.gsNsrData = mini.clone(this.nsrData);
            }else if(this.hd && this.hd.gdsBz === '2'){
                this.nsrData = Api.getDsNsrxxVo();
                this.gsNsrData = mini.clone(nsrxxUtil.getNsrxxVO());
            }else{
                this.nsrData = nsrxxUtil.getNsrxxVO();
                this.gsNsrData = mini.clone(this.nsrData);
            }
			this._setWsxxAndLsxxMap();
            this.djxh = this.nsrData.djxh;
            this.nsrsbh = this.nsrData.nsrsbh;
            this.nsrmc = this.nsrData.nsrmc;
            this.sbzlDm = this.hd.sbzlxlcode || this.hd.sbzlcode;
            this.sssqq = this.hd.sksssqQ;
            this.sssqz = this.hd.sksssqZ;
            this.reportName = this.hd.sbzlmc;
            this.tbrq = new Date().format('yyyy-MM-dd');
            /*以下用于关联申报--begin*/
            var reportWithSbzlDms = Tools.getUrlParamByName('reportWithSbzlDm');
            if(reportWithSbzlDms){
                reportWithSbzlDms = reportWithSbzlDms.split('_');
                this.prevSbzlDm = reportWithSbzlDms[reportWithSbzlDms.length-1];
                this.prevSBtjData = mini.decode(sessionStorage.getItem('sbtjData_'+this.prevSbzlDm));

            }
            this.nextReportHd = this.sblxDm === '11' && this.reportWithNext && this.reportWithNext.getHdByDM ? (window.location.href.indexOf('qssb=Y') !== -1?sbcommon.getHdBySbzlDm(this.reportWithNext.getHdByDM,Tools.getUrlParamByName('sbny')):sbcommon.getHdBySbzlDm(this.reportWithNext.getHdByDM)): null;
            /*和主税种一起申报附加税时，需要对附加税核定判断是否有对应主税种的附加税征收品目
            （即申报增值税附加税时是否有增值税教育附加、增值税地方教育附加、增值税城市建设附加，申报消费税同理）。
            如果不存在附加税征收品目，则不需要展示关联申报中的附加税报表（也不需要提交附加税申报报文）。*/
            if (!!this.nextReportHd){
                var showFjs = false;
                if (this.nextReportHd.zspms && this.nextReportHd.zspms.zspmList){
                    $.each(this.nextReportHd.zspms.zspmList,function (z,zspm) {
                        if ((zspm['pmbm'].substr(0,5) === '10109' && zspm['pmbm'].substr(8,1) === '1') || (zspm['pmbm'].substr(0,5) !== '10109' && zspm['pmbm'].substr(6,1) === '1')){
                            showFjs = true;
                            return false;
                        }
                    });
                }
                if (!showFjs){
                    this.nextReportHd = null;
                }
            }
            /*以上用于关联申报--end*/
            /*以下用于逾期申报*/
            if (window.location.href.indexOf('yqsb=Y') !== -1){
                this.yqSbqx = sessionStorage.getItem('yqsbSbqx');
                this.yqCqts = sessionStorage.getItem('yqsbCqts');
                if (!!this.yqSbqx && !!this.yqCqts){
                    if(yearReport.showZyclqqd.showBz){
                        yearReport.bindShowZyclq=function () {
                            mini.open({
                                cls:'fixedWindowTop0',
                                url: '/sbzx-web/apps/views/public/zyclqqd.html',
                                width: 1000,
                                height: 500,
                                showModal: true,
                                currentWindow:true,
                                allowResize: false,
                                showMaxButton:true
                            });
                            return false;
                        }
                    }

                    // mini.alert('您的申报所属期为'+yearReport.sssqq+'至'+yearReport.sssqz+'，申报期限为【'+mini.decode(this.yqSbqx)+'】,已逾期的天数为【'+mini.decode(this.yqCqts)+'】');
                    mini.showMessageBox({
                        width: 550,
                        title : '温馨提示',
                        buttons: ['确定'],
                        html:'您的申报所属期为'+yearReport.sssqq+'至'+yearReport.sssqz+'，申报期限为【'+mini.decode(yearReport.yqSbqx)+'】,已逾期的天数为【'+mini.decode(yearReport.yqCqts)+'】。'+(yearReport.showZyclqqd.showBz?'<a style="text-decoration:underline;color:#0994dc" id="showZyclq" onclick="yearReport.bindShowZyclq();" target="_blank">'+yearReport.showZyclqqd.btnName+'</a>':"")
                    });
                }
            }
            /*以上用于逾期申报*/
            this.tableListResponse = this.getListData();
            if(!this.tableListResponse){
                return ;
            }
            this.setConfig();
            //执行后续流程
            this.beforeRenderList();
            this.renderReportBtns();
            this.renderTableList();
        },
        /**
         *  在渲染列表之前的自定义
         * */
        beforeRenderList: function () {

        },
        /**
         * 自定义事件
         * */
        customEvent: function () {

        },
        /**
         * 将所有wsxx和lsxx节点，整理成map形式{key: value}
         * */
        _setWsxxAndLsxxMap: function () {
            var that = this;
            if(this.hd.wsxxs && this.hd.wsxxs.wsxx){
                $.each(this.hd.wsxxs.wsxx, function () {
                    that.wsxxMap[this.code] = this.value;
                });
            }
            if(this.hd.lsxxs && this.hd.lsxxs.lsxx){
                $.each(this.hd.lsxxs.lsxx, function () {
                    that.lsxxMap[this.code] = this.value;
                });
            }
        },
        /*除是否有核定，期初成功标志是否为Y的其他判断是否能申报的前提条件*/
        preCondition:function(){
            return true;
        },
        /*校验核定期初信息判断是否允许申报*/
        checkHd: function () {
            //判断是否有核定
            if (!this.hd) {
                return false;
            }
            return true;
        },
        //报表初始化,获取表间校验的cfg
        setConfig: function () {
            this.cfg = xmlUtil.loadFileByPath('config/cfg.xml');
            this.saveCheckDatas = $(this.cfg).find('SaveCheckData Records,SendCheckData Records');
            this.doShowMessages = $(this.cfg).find('DoShowMessage Records');
        },
        /**
         * 获取列表数据
         * */
        getListData: function () {
            if(this.mock){
                return mini.decode(localStorage.getItem('tableList-'+this.baseFileName)) || this.getLocalJson(this.apiMock['tableList']);//用于本地测试
            }else{
                var request = {
                    djxh: this.gsNsrData.djxh,
                    sbzlDm: this.sbzlDm,
                    sssqQ: this.sssqq,
                    sssqZ: this.sssqz,
                    sblxDm: this.sblxDm
                };
                return sbcommon.getListData(request);
            }
        },
        /**
         * 渲染列表
         * */
        renderTableList : function () {
            this.sb_data = this.transformSbData(this.tableListResponse.sbData);
            //若由核定下发报表，则需要根据核定更新列表
            if(this.dependOnHd && this.businessType !== 'preview'){
                var changeList = this.getSbbsChangeList();
                var updateChangeList = this.transformChangeList(changeList);
                var request = {
                    djxh: this.gsNsrData.djxh,
                    sbzlDm: this.sbzlDm,
                    sssqQ: this.sssqq,
                    sssqZ: this.sssqz,
                    sbData: updateChangeList,
                    sblxDm: this.sblxDm
                };
                if(changeList.length>0 && sbcommon.updateListData(request)){
                    this.updateLocalSbData(changeList);
                }
            }
            this.setPcMap();//设置父子层级映射表
            this.refreshTableList();//刷新列表
            this.bindTableBtnEvent();//绑定事件
            if(this.businessType === 'preview'){
                $(".content .content-table").addClass('preview-table');
                return ;
            }
            //执行后续流程
            this.afterInit();
        },
        transformSbData: function (data) {
            $.each(data, function (i,obj) {
                obj.checkData = mini.decode(obj.checkData);
            });
            return data;
        },
        transformChangeList: function (changeList) {
            var updateChangeList = [];
            $.each(changeList, function (i, obj) {
                if(obj.checkData){
                    obj.checkData = '{}';
                }
                updateChangeList.push(obj);
            });

            return this.mergeRepeatInList(updateChangeList);
        },
        mergeRepeatInList: function (list) {
            var mergedList = [];
            var mergedMap = {};
            $.each(list, function (i,obj) {
                var bbid = obj.bbid;
                if(mergedMap[bbid]){
                    $.extend(mergedMap[bbid],obj);
                }else{
                    mergedMap[bbid] = obj;
                }
            });
            $.each(mergedMap, function (bbid, obj) {
                mergedList.push(obj);
            });
            return mergedList;
        },
        /**
         * 校验核定下发的sbbs节点是否与后台返回的初始化列表的必填一致
         * */
        getSbbsChangeList: function () {
            var sbbArr = this.hd.sbbs.sbb;
            var changeList = [];
            $.each(this.sb_data, function (i,obj) {
                var isExistInHd = sbbArr.indexOf(obj.bbid) !== -1;
                var newObj = null;
                if(obj.needed === '1' && !isExistInHd){
                    newObj = {
                        bbid: obj.bbid,
                        needed: '2',
                        status: '0',
                        checkData: {}
                    };

                }
                if(obj.needed !== '1' && isExistInHd){
                    newObj = {
                        bbid: obj.bbid,
                        needed: '1'
                    }
                }
                newObj && changeList.push(newObj);
            });
            return changeList;
        },
        /**
         * 根据id来修改按钮属性
         * */
        setReportBtnById: function (id,options) {
            if(options.hasOwnProperty('id')){
                mini.alert('请不要改变按钮的id，会导致框架中对按钮id的引用失效！');
                return false;
            }
            $.each(this.reportBtns, function (i,obj) {
                if(obj.id === id){
                    $.extend(obj,options);
                    return false;
                }
            })
        },
        /**
         * 添加按钮配置
         * */
        addReportBtn: function (options) {
            this.reportBtns.push(options);
        },
        /**
         * 删除按钮配置
         * */
        removeReportBtnById: function (id) {
            for(var i=0,l=this.reportBtns.length;i<l;i++){
                var curOption = this.reportBtns[i];
                if(curOption.id === id){
                    this.reportBtns.splice(i,1);
                    break;
                }
            }
        },
        /**
         * 关联申报时，返回到前一个申报页面
         * */
        getPrevPageUrl: function () {
            return this.prevSBtjData['url'];
        },
        /**
         * 渲染底部按钮
         * */
        renderReportBtns: function () {
            this.customReportBtns();
            var that =  this;
            if(window.location.href.indexOf('reportWithSbzlDm=') !== -1){//关联申报时，增加返回修改按钮
                this.reportBtns.unshift({
                    id: 'sb_back',
                    cls: 'btn btn-gray',
                    text: '返回修改',
                    callback: function () {
                        var prevUrl = that.prevSBtjData['url'];
                        if(prevUrl){
                            window.location.href = prevUrl;
                        }
                    },
                    whenToShow: 'report,past,overdue'
                });
            }
            var req = {
                sblx: this.sblxDm,
                sbzlDm: this.sbzlDm
            };
            var hasRedisCache = sbcommon.hasCache(req);
            if (hasRedisCache){
                this.reportBtns.push({
                    id: 'sb_refresh',
                    cls: 'btn btn-blue',
                    text: '同步核定',
                    callback: function () {
                        mini.confirm('为了及时获取最新的初始化数据，可以使用“同步核定”按钮进行获取，请别频繁点击此功能，这样可能会影响页面响应的速度！如您确定要重新获取初始化数据，请点击“确定”。','提示',function (action) {
                            if (action === 'ok'){
                                var request = {
                                    sssqQ: that.sssqq,
                                    sssqZ: that.sssqz,
                                    sbzlDm: that.sbzlDm
                                };
                                if (Tools.getUrlParamByName('sbny')){
                                    request.sbny = Tools.getUrlParamByName('sbny');
                                }
                                if(sbcommon.redisRefresh(request)){
                                    window.location.href = window.location.href;
                                }
                            }
                        });
                    },
                    whenToShow: 'report,past,overdue'
                });
            }
            if(this.reportBtns && this.reportBtns instanceof Array){
                $.each(this.reportBtns, function () {
                    if($('#'+this.id).length !== 0){
                        $('#'+this.id).remove();
                    }
                    if(this.whenToShow.indexOf(that.businessType) !== -1){
                        var a = document.createElement('a');
                        this.id?a.id=this.id:'';
                        this.cls?a.className=this.cls:'';
                        this.text?a.innerText=this.text:'';
                        $('#btn-group').append(a);
                    }
                });
            }
            this.bindReportBtnsEvent();
        },
        /**
         * 绑定底部按钮事件
         * */
        bindReportBtnsEvent: function(){
            var that = this;
            $('#btn-group').on('click','a',function(){
                var id = this.id;
                if(id) {
                    var config = that.getBtnConfig(id);
                    if (config['callback'] && typeof config['callback'] === 'function') {
                        config['callback']();
                    }
                }
            });
        },
        /**
         * 根据id获取对应按钮的配置信息
         * */
        getBtnConfig: function (id) {
            var config = null;
            $.each(this.reportBtns, function () {
                if(this.id === id){
                    config = this;
                    return false;
                }
            });
            return config;
        },
        /**
         * 设置报表子父级关系（其实就是取数关系）{key:'parentId',value:'childId'}
         * */
        setPcMap: function () {
            var that = this;
            $.each(this.sb_data, function (bbid,obj) {
                if(obj.parentBbid){
                    var pidArr = obj.parentBbid.split(',');
                    $.each(pidArr, function (i,pid) {
                        if(that.pcMap[pid]){
                            that.pcMap[pid].push(bbid);
                        }else{
                            that.pcMap[pid] = [];
                            that.pcMap[pid].push(bbid);
                        }
                    });
                }
            })
        },
        /**
         * 生成特殊处理后的所有金三报文数据
         * */
        getJ3XmlData: function () {
            var that = this;
            var j3XmlData = [];
            this.setResumeJ3Xmls();
            $.each(this.tjXmlBbids, function (i,bbid) {
                if(typeof that['changeXml_'+bbid] === 'function'){
                    var obj = {};
                    var $xml = that['changeXml_'+bbid].apply(that,[]);
                    var bbxml = '';
                    if($xml.children().length !== 0){
                        bbxml = xmlUtil.turnXmlToStr($xml[0]).replace(/[\n\t]/g,'').replace(/>\s+</g,'><');//(去除换行及节点间的空格)
                    }
                    obj['bbwjm'] = that.sbzlDm+'_'+bbid+'.xml';
                    obj['bbxml'] = bbxml;
                    j3XmlData.push(obj);
                }
            });
            return j3XmlData;
        },
        /**
         * 断点续办向后台请求需要特殊处理，且sb_data中没有的金三报文,并写入到sb_data中
         * */
        setResumeJ3Xmls: function () {
            var that = this;
            var resumeXmlBbids = [];
            $.each(this.resumeXmlBbids, function (i,bbid) {
                if(!that.sb_data[bbid].j3xml){
                    resumeXmlBbids.push(bbid);
                }
            });
            if(resumeXmlBbids.length>0){
                var request = {
                    djxh: this.gsNsrData.djxh,
                    sbzlDm: this.sbzlDm,
                    sssqQ: this.sssqq,
                    sssqZ: this.sssqz,
                    bbids: resumeXmlBbids,
                    sblxDm: this.sblxDm
                };
                var j3Xmls = sbcommon.getResumeJ3Xmls(request);
                $.each(j3Xmls, function (i,obj) {
                    that.sb_data[obj.bbid].j3xml = xmlUtil.turnStrToXml(obj.j3xml);
                })
            }
        },
        /**
         * 获取对应bbid的金三报文,若sb_data中存在，则取sb_data中的，
         * 否则直接从本地文件取,且本地取过一次后会放到sb_data中
         * @param {string} bbid
         * @return {document}
         * */
        getJ3Xml: function (bbid) {
            if(this.sb_data[bbid].j3xml){
                return $(this.sb_data[bbid].j3xml.cloneNode(true));
            }else{
                var xml = xmlUtil.loadFileByPath(bbid+'/config/'+bbid+'_j3.xml').cloneNode(true);
                this.sb_data[bbid].j3xml = $(xml);
                return $(xml);
            }
        },
        /**
         * 保存
         * */
        save: function () {
            //校验是否存在必填表未填写或者子表已填而父表未填的情况
            if(!(this.checkMustEdited() && this.checkParentTableEdited())){
                return false;
            }
            //纯js校验
            if(!this.checkData()){
                return ;
            }
            //更正申报时的特殊校验
            if(this.businessType === 'correct' && !this.checkYbtseForCorrect()){
                return;
            }
            //校验saveCheckData,sendCheckData
            var saveCheckErrMsg = this.checkSaveCheckData();
            if(saveCheckErrMsg.length>0){
                var newErrorMsgArr = [];
                $.each(saveCheckErrMsg, function (i,msg) {
                    newErrorMsgArr.push('（'+(i+1)+'）'+msg);
                });
                mini.alert(newErrorMsgArr.join('<br>'),'您目前存在以下错误，请确认！');
                return ;
            }
            //校验doShowMessage
            var doShowMessageErrMsg = this.checkDoShowMessage();
            /**
             * 更正申报--判断更正税额是否大于申报税额，如果大于则提示，但可以继续申报
             */
            if(this.businessType === 'correct'){
                var currentYbtse = this.getYbtse();
                if(Number(currentYbtse) > Number(this.wsxxMap['YBTSE'])){
                    doShowMessageErrMsg.push('由于您更正了申报，请点“确定”后继续缴款，不修改请点“取消”！');
                }
            }
            if(doShowMessageErrMsg.length >0){
                var newErrorMsgArr = [];
                $.each(doShowMessageErrMsg, function (i,msg) {
                    newErrorMsgArr.push('（'+(i+1)+'）'+msg);
                });
                var newErrorMsgs = newErrorMsgArr.join('<br>');
                var that = this;
                mini.confirm(newErrorMsgs,'点击确定保存，点击取消返回修改！',function (action) {
                    if(action === 'ok'){
                        that.customConfirmBeforeSend();
                    }
                });
            }else{
                this.customConfirmBeforeSend();
            }
        },
        /**
         * 更正申报时的特殊校验---如应补退税额必须大于等于上次申报时的应补退税额
         * */
        checkYbtseForCorrect: function () {
            var currentYbtse = this.getYbtse();
            if(Number(currentYbtse) < Number(this.wsxxMap['YBTSE'])){
                mini.alert('本系统不支持更正金额小于已缴款金额，请去大厅办理！');
                return false;
            }
            return true;
        },
        /**
         * 获取应补退税额
         * */
        getYbtse: function () {

        },
        /**
         * 自定义的确认发送提示
         * */
        customConfirmBeforeSend: function () {
            //next step
            this.confirmBeforeSend();
        },
        /**
         * 全部校验通过，发送前提示
         * */
        confirmBeforeSend: function () {
            var that = this;
            mini.confirm('确认提交您所申报的数据?','提示', function (action) {
                if(action === 'ok'){
                    that.doSend();
                }
            });
        },
        /**
         * 最后一步，发送
         * */
        doSend: function () {
            var j3XmlData = this.getJ3XmlData();
            var request={
                djxh: this.gsNsrData.djxh,
                sssqq: this.sssqq,
                sssqz: this.sssqz,
                formulaData: '',
                sbformdata: '',
                sbzlDm: this.sbzlDm,
                sbwjs: mini.encode(j3XmlData),
                sblxDm: this.sblxDm,
                pzxh: this.pzxh
            };
            if(this.needYcsbd){//需要一窗式比对
                mini.mask('发票数据比对中，请稍后...');
                var that = this;
                setTimeout(function () {
                    that.ycsCheck(request);
                },100);
                return ;
            }
            if(this.needSign){//需要pdf签名
                this.sign(request);
                return ;
            }
            var nextReportSbzlDm = this.nextReportHd?(this.nextReportHd.sbzlxlcode || this.nextReportHd.sbzlcode):'';
            if (this.chooseReportFjs && this.sblxDm === '11' && this.nextReportHd && nextReportSbzlDm){
                mini.showMessageBox({
                    width: '400px',
                    title: '提示',
                    message: '是否同时申报附加税？',
                    buttons: ['是', '否'],
                    callback: function (a) {
                        if (a !== '是') {
                            that.nextReportHd = null;
                        }
                        that.realSend(request);
                    }
                });
            } else {
                this.realSend(request);
            }
        },
        /**
         * 真实的，最终的申报提交
         * */
        realSend: function (request) {
            var _this=this;
            if(!this.checkIsReportWithOthers(request) && this.checkSubmitTime() && sbcommon.sbtj_year(request)){//正常申报提交
                $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh,new Date().getTime());

                if(this.isYbtseOverZero()) {
                    mini.alert("您的报表已发送，请及时缴纳已申报的税款，超过法律、行政法规规定或者税务机关依照法律、行政法规的规定确定的缴纳期限缴款的，将从税款滞纳次日按日加收滞纳税款万分之五的滞纳金。", "温馨提示", function () {
                        window.location.href = _this.successUrl+'?v='+(new Date().getTime()+'_2.0.0');
                    });
                }else{
                    window.location.href = this.successUrl+'?v='+(new Date().getTime()+'_2.0.0');
                }


            }
        },
        /**
         * 一窗式比对后，强制申报（继续申报）
         * */
        sendAfterYcsbd: function (request) {
            var that = this;
            if(this.needSign){
                this.sign(request);
                return ;
            }
            var nextReportSbzlDm = this.nextReportHd?(this.nextReportHd.sbzlxlcode || this.nextReportHd.sbzlcode):'';
            if (this.chooseReportFjs && this.sblxDm === '11' && this.nextReportHd && nextReportSbzlDm){
                mini.showMessageBox({
                    width: '400px',
                    title: '提示',
                    message: '是否同时申报附加税？',
                    buttons: ['是', '否'],
                    callback: function (a) {
                        if (a !== '是') {
                            that.nextReportHd = null;
                        }
                        that.realSend(request);
                    }
                });
            } else {
                this.realSend(request);
            }
        },
        /**
         * 一窗式比对
         * @param {Object} request
         * 返回数据为true---->走正常申报流程
         * 返回数据为false--->终止原申报流程，后续申报流程由本方法体内来决定
         * */
        ycsCheck: function (request) {
            var ycsResult = sbcommon.ycsCheck(request);
            mini.unmask();
            if(!ycsResult){
                return;
            }
            var returnBz = ycsResult.sbzzsSaveReturnVO.returnBz;
            var bdjgbz = ycsResult.sbzzsSaveReturnVO.bdjgbz;
            var sfcbs = ycsResult.sbzzsSaveReturnVO.sbsbbdBdjgVO.sfcbs;
            if(sfcbs === 'N'){
              mini.alert('您本月还未抄报，请抄报完成之后再申报');
              return ;
            }
            var bdjgList = [];
            try{
                bdjgList = ycsResult.sbzzsSaveReturnVO.sbsbbdBdjgVO.bdjgmxGrid.bdjgmxGridlb;
            }catch(e){}
            if(returnBz === 'Y'){//一窗式比对结果为成功----走正常申报流程
                this.sendAfterYcsbd(request);
                return ;
            }
            //一窗式比对结果失败,终止原申报流程，后续申报流程由本方法体内来决定
            if(returnBz === 'N' && bdjgbz === 'N'){
                this.showYcsbdResult(bdjgList, request);
                return ;
            }
            this.sendAfterYcsbd(request);
        },
        showYcsbdResult: function (bdjgList, request) {
            var count_bdlx_1_jkjb_2_bdjg_N = 0;
            var count_bdlx_2_jkjb_2_bdjg_N = 0;
            var count_jkjb_1_bdjg_N = 0;
            var bdjgMap = {};
            var trs = '';
            $.each(bdjgList, function (i,obj) {
                if(this.bdlx === '1' && this.jkjb === '2' && this.bdjg === 'N'){
                    count_bdlx_1_jkjb_2_bdjg_N += 1;
                }
                if(this.bdlx === '2' && this.jkjb === '2' && this.bdjg === 'N'){
                    count_bdlx_2_jkjb_2_bdjg_N += 1;
                }
                if(this.jkjb === '1' && this.bdjg === 'N'){
                    count_jkjb_1_bdjg_N += 1;
                }
                bdjgMap[this.bdgzDm] = obj;
                // trs += '<tr bdgzDm="'+this.bdgzDm+'"><td>'+this.bdmc+'</td><td>'+this.bdjg==='Y'?'通过':'<span class="txt-red">不通过</span>'+'</td></tr>'
                trs += '<tr bdgzDm="'+this.bdgzDm+'"><td>'+this.bdmc+'</td><td>'+(this.bdjg==='N'?'<span class="txt-red">不通过</span>':'通过')+'</td></tr>'
            });
            var html = '<div class="ycsResult">' +
                '<div class="ycsbdjgHead">' +
                '<table><tr><td width="80%">规则</td><td width="20%">通过情况</td></tr></table>' +
                '</div>' +
                '<div class="ycsbdjgList">' +
                '<table><colgroup><col width="80%"><col width="20%"></colgroup>' + trs +'</table>' +
                '</div>' +
                '<div class="ycsbdDetail">' +
                '<p>详细规则：</p>' +
                '<p>比对规则代码：<span id="bdgzDm"></span></p>' +
                '<p>比对规则名称：<span id="bdmc"></span></p>' +
                '<p>比对规则内容：<span id="bdnr"></span></p>' +
                '<p>比对结果：<span id="bdjg"></span></p>' +
                '<p><span id="bdbfjgbcnr"></span></p>' +
                '</div>' +
                '</div>';
            var _this = this;
            var buttons = ['返回修改'];
            if(count_bdlx_1_jkjb_2_bdjg_N === 0){
                buttons.unshift('继续发送');
            }
            var ycsdbMessageId = mini.showMessageBox({
                title: '一窗式比对结果',
                width: 900,
                height:550,
                maxHeight: 550,
                buttons: buttons,
                showCloseButton: false,
                html: html,
                callback: function(action){
                    if(action === '继续发送'){
                        if(count_bdlx_2_jkjb_2_bdjg_N > 0){
                            request.sfyczb = 'Y';
                        }else if(count_jkjb_1_bdjg_N > 0){
                            request.sfyczb = 'S';
                        }
                        _this.sendAfterYcsbd(request);
                    }
                }
            });
            $('#'+ycsdbMessageId).addClass('fixedWindowTop0');
            this.bindYcsbdEvent(bdjgMap);
        },
        bindYcsbdEvent: function (bdjgMap) {
            $('.ycsbdjgList').on('click', 'tr', function () {
                var curTrBdjgDm = $(this).attr('bdgzDm');
                if($('#bdgzDm').html() === curTrBdjgDm){
                    return;
                }
                $('#bdgzDm').html(curTrBdjgDm);
                $('#bdmc').html(bdjgMap[curTrBdjgDm].bdmc);
                $('#bdnr').html(bdjgMap[curTrBdjgDm].bdnr);
                $('#bdjg').html(bdjgMap[curTrBdjgDm].bdjg === 'N'?'不通过':'通过');
                $('#bdbfjgbcnr').html(bdjgMap[curTrBdjgDm].bdbfjgbcnr);
            })
        },
        /**
         * pdf签名
         * */
        sign: function (request) {
            var _this = this;
            var pdfRequest = {
                sblxDm: request.sblxDm,
                sssqq: request.sssqq,
                sssqz: request.sssqz,
                sbzlDm: request.sbzlDm,
                sbwjs: request.sbwjs,
                dbbc: true
            };
            mini.mask('pdf预览生成中，请稍后...');
            setTimeout(function () {
                _this.openSignPage(request, pdfRequest);
            },1);
        },
        /**
         * 打开签名页面
         * */
        openSignPage: function (sbtjRequest, pdfRequest) {
            var pdfFileKey = Api.getData('/sbzx-web/api/pdf/generatePdf', pdfRequest);
            if(!pdfFileKey){
                mini.unmask();
                return ;
            }
            //显示未签名的
            mini.open({
                cls:'fixedWindowTop0',
                url: '../sb_sign/sb_sign.html?v='+new Date().getTime()+'_2.0.0',        //页面地址
                title: '手机签名',      //标题
                width: yearReport.popWindowWidth,      //宽度
                height: 600,     //高度
                allowResize: false,       //允许尺寸调节
                allowDrag: false,         //允许拖拽位置
                showCloseButton: true,   //显示关闭按钮
                showMaxButton: true,     //显示最大化按钮
                showModal: true,         //显示遮罩
                effect:'fast',              //打开和关闭时的特果:'none','slow','fast',默认'none'
                onload: function () {
                    mini.unmask();
                    var iframe = this.getIFrameEl();
                    var signWindow = iframe.contentWindow;
                    //调用弹出页面方法进行初始化
                    var data = {
                        sbtjRequest: sbtjRequest,
                        fileKey: pdfFileKey
                    };
                    signWindow.sign.init(data);
                }
            });
        },
        /**
         * 获取当前税种的应纳税额
         * */
        getYnse: function () {

        },
        /**
         * 判断是否与其他申报关联申报
         * */
        isYbtseOverZero:function () {
            return false;
        },
        checkIsReportWithOthers: function (request) {
            if(this.sblxDm !== '11'){//非正常申报  不使用关联申报
                return false;
            }
            if(this.reportWithNext){//关联申报，且后续表未申报时
                // var nextReportHd = sbcommon.getHdBySbzlDm(this.reportWithNext.getHdByDM);
                var nextReportSbzlDm = this.nextReportHd?(this.nextReportHd.sbzlxlcode || this.nextReportHd.sbzlcode):'';
                if(this.nextReportHd && nextReportSbzlDm){//能取到核定，即判定为后续表还没有申报
                    var sbtjData = {
                        ynse: this.getYnse(),
                        zsxmbm: this.hd.zsxmbm,
                        url: location.href,//链接地址，在下个页面返回到当前页面时用到
                        request: request,  //申报提交的请求数据
                        hasYbtse:yearReport.isYbtseOverZero()
                    };
                    sessionStorage.setItem('sbtjData_'+this.sbzlDm, mini.encode(sbtjData));//将申报提交的数据保存到session中
                    var curReportWithSbzlDm = Tools.getUrlParamByName('reportWithSbzlDm') || '';
                    var postfix = '&reportWithSbzlDm='+(curReportWithSbzlDm?curReportWithSbzlDm+'_'+this.sbzlDm:this.sbzlDm);
                    window.location.href = this.reportWithNext.url+postfix+'&v='+(new Date().getTime()+'_2.0.0')+(window.location.href.indexOf('qssb=Y') !== -1?('&sbny='+Tools.getUrlParamByName('sbny')):"");//跳转到下一申报界面
                    return true;
                }
            }
            if(!this.reportWithNext && Tools.getUrlParamByName('reportWithSbzlDm')){//关联申报，无后续申报，且前置申报已申报完成时
                var prevSbtjDatas = this.getPrevSbtjDatas();
                var _this=this;
                //前置申报的申报数据必须大于0，否则将走正常申报提交的接口
                if(prevSbtjDatas.length>0){
                    prevSbtjDatas.push(request);
                    if(this.checkSubmitTime() && sbcommon.sbtj_batch(prevSbtjDatas)){
                        $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh,new Date().getTime());

                        if(this.hasYbtse||this.hasYbtse==='true'){
                            mini.alert("您的报表已发送，请及时缴纳已申报的税款，超过法律、行政法规规定或者税务机关依照法律、行政法规的规定确定的缴纳期限缴款的，将从税款滞纳次日按日加收滞纳税款万分之五的滞纳金。","温馨提示",function () {
                                window.location.href = _this.successUrl + '?sbzlDm=' + _this.sbzlDm + '&v=' + (new Date().getTime() + '_2.0.0');
                            });
                        }else{
                            window.location.href = _this.successUrl+'?sbzlDm='+_this.sbzlDm+'&v='+(new Date().getTime()+'_2.0.0');
                        }
                    }
                    return true;
                }
            }
            return false;
        },
        /**
         * 获取所有前置界面的申报种类代码
         * */
        getPrevSbtjDatas: function () {
            var prevSbzlDms = Tools.getUrlParamByName('reportWithSbzlDm').split('_');
            var sbtjDatas = [];
            $.each(prevSbzlDms, function (i, prevSbzlDm) {
                var curSbtjData = sessionStorage.getItem('sbtjData_'+prevSbzlDm);
                if(curSbtjData){
                    sbtjDatas.push(mini.decode(curSbtjData).request);
                    yearReport.hasYbtse=mini.decode(curSbtjData).hasYbtse;
                }
            });
            return sbtjDatas;
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
        /**
         * 绑定列表按钮事件
         * */
        bindTableBtnEvent: function () {
            var that = this;
            //表格按钮
            $('#content-table').on('click','.btn[data-type]',function () {
                var $item = $(this).parent().parent();	//当前行
                var type = $(this).attr('data-type');//操作类型
                var bbid = $item.attr('data-bbid');//申报id
                var url = '';//页面路径
                if(type === 'edit' || type === 'reedit'){//填写/重填
                    if(that.preTableIds.indexOf(bbid) === -1 && !that.checkAllPreTableEdited()){
                        return ;
                    }
                    url = bbid+'/'+that.baseFileName+'_'+bbid+'.html?edit=Y';
                }else if(type === 'modify'){//修改
                    url = bbid+'/'+that.baseFileName+'_'+bbid+'.html?modify=Y';
                }else if(type === 'view'){//查看
                    url = bbid+'/'+that.baseFileName+'_'+bbid+'.html?preview=Y';
                }else if(type === 'delete'){//删除
                    if(that.checkAllowDelete(bbid)){
                        that.deleteSingleTableData(bbid);
                    }
                    return ;
                }
                mini.open({
                    cls:'fixedWindowTop0',
                    url: url+'&v='+new Date().getTime()+'_2.0.0',        //页面地址
                    title: '',      //标题
                    width: yearReport.popWindowWidth,      //宽度
                    height: 600,     //高度
                    allowResize: false,       //允许尺寸调节
                    allowDrag: false,         //允许拖拽位置
                    showCloseButton: true,   //显示关闭按钮
                    showMaxButton: true,     //显示最大化按钮
                    showModal: true,         //显示遮罩
                    effect:'fast',              //打开和关闭时的特果:'none','slow','fast',默认'none'
                    ondestroy: function (action) {  //弹出页面关闭前
                        if(action === 'ok'){
                            that.afterMiniWindowClosed(bbid, type, $item );
                        }
                        //该判断针对由用户自己关闭窗口，但在窗口页面中的操作已经影响到了其他表的填写状态
                        if(action === 'close' && that.changeList.length > 0){
                            that.afterMiniWindowClosed(bbid, type, $item );
                        }
                    }
                });
            });
        },
        checkAllPreTableEdited: function () {
            var result = true;
            var tableNames = [];
            $.each(this.preTableIds, function (i,bbid) {
                var curTable =  yearReport.sb_data[bbid];
                if(curTable.status !== '1' && curTable.needed === '1'){
                    tableNames.push('《'+curTable.bbmc+'》');
                    result = false;
                }
            });
            if(!result){
                mini.alert('请先填写以下表：<br>'+tableNames.join('<br>'));
            }
            return result;
        },
        /**
         * 校验是否允许删除单表数据,子表已填时，不能直接删除父表
         * */
        checkAllowDelete: function (bbid) {
            var that = this;
            var ifPass = true;
            if(this.pcMap[bbid] && this.pcMap[bbid].length>0){
                $.each(this.pcMap[bbid], function (i,childId) {
                    if(that.sb_data[childId].status === '1'){
                        ifPass = false;
                        mini.alert('子表《'+$('.item[data-bbid="'+childId+'"] .table-name').html()+'》已填写，不能直接删除主表《' +
                            $('.item[data-bbid="'+bbid+'"] .table-name').html()+'》');
                        return false;
                    }
                })
            }
            return ifPass;
        },
        /**
         * 删除单表数据
         * */
        deleteSingleTableData: function (bbid) {
            var that = this;
            mini.confirm('确认删除该表数据？','提示',function (action) {
                var request = {
                    djxh: that.gsNsrData.djxh,
                    sbzlDm: that.sbzlDm,
                    bbid: bbid,
                    sssqQ: that.sssqq,
                    sssqZ: that.sssqz,
                    sblxDm: that.sblxDm
                };
                if(action === 'ok' && sbcommon.deleteSingleTableData(request)){
                    that.afterSingleDelete(bbid)
                }
            });
        },
        /**
         * 删除单表处理其他表的必填关系
         */
        tableNeededHandle: function (bbid) {
            return [];
        },
        /**
         * 数据库删除成功后的操作
         * */
        afterSingleDelete: function (bbid) {
            //改变当前表的数据
            this.sb_data[bbid].status = '0';
            this.sb_data[bbid].checkData = {};
            $('.item[data-bbid="'+bbid+'"]').attr('class','item');
            var changeList = this._getNeedToChangeParents(bbid);
            changeList = changeList.concat(this.tableNeededHandle(bbid));
            var updateChangeList = this.transformChangeList(changeList);
            var request = {
                djxh: this.gsNsrData.djxh,
                sbzlDm: this.sbzlDm,
                sssqQ: this.sssqq,
                sssqZ: this.sssqz,
                sbData: updateChangeList,
                sblxDm: this.sblxDm
            };
            if(changeList.length > 0 && sbcommon.updateListData(request)){
                this.afterUpdateList(changeList);
            }
            mini.alert('删除成功！');
            /*var listData = {//用于本地测试删除并更新本地数据
                sbData: this.sb_data
            };
            localStorage.setItem('tableList-'+this.baseFileName, mini.encode(listData));//用于本地测试删除并更新本地数据*/
        },
        /**
         * 数据库更新列表成功后的操作
         * */
        afterUpdateList: function (changeList) {
            this.updateLocalSbData(changeList);
            this.refreshTableList();
        },
        /**
         * 因子表修改，改变表间取值，父表必须重填
         * */
        _getNeedToChangeParents: function (bbid) {
            var that = this;
            var changedList = [];
            var parentBbid = this.sb_data[bbid].parentBbid;
            var parentBbidArr = parentBbid.split(',');
            $.each(parentBbidArr, function (i,pid) {
                if(pid && that.sb_data[pid] && that.sb_data[pid].status === '1'){
                    changedList.push({
                        bbid: pid,
                        status: '2',
                        checkData: {}
                    });
                    // changedList = changedList.concat(this._getNeedToChangeParents(pid));//寻找并拼接需要改变的祖辈数组
                }
            });
            return changedList;
        },
        /**
         * 初始化完之后的操作
         * */
        afterInit: function () {

        },
        /**
         * 单表弹窗关闭后的操作
         * */
        afterMiniWindowClosed: function (bbid, type) {
            if(type === 'edit' || type === 'reedit' || type === 'modify'){
                var changeList = this._getNeedToChangeParents(bbid);//是否改变父表填写状态
                changeList = changeList.concat(this.changeList);//拼接是否改变其他表必填关系或者填写状态
                var updateChangeList = this.transformChangeList(changeList);
                var request = {
                    djxh: this.gsNsrData.djxh,
                    sbzlDm: this.sbzlDm,
                    sssqQ: this.sssqq,
                    sssqZ: this.sssqz,
                    sbData: updateChangeList,
                    sblxDm: this.sblxDm
                };
                if(changeList.length>0 && sbcommon.updateListData(request)){
                    this.afterUpdateList(changeList);
                }
            }
            this.changeList = [];//强制将changeList置空，避免影响下一次的弹窗关闭
            /*var listData = {//用于本地测试
                sbData: this.sb_data
            };
            localStorage.setItem('tableList-'+this.baseFileName, mini.encode(listData));//用于本地测试*/
        },
        /**
         * 更新本地sb_data
         * */
        updateLocalSbData: function (changeList) {
            if($.isArray(changeList) && changeList.length > 0){
                var that = this;
                $.each(changeList, function (i,obj) {
                    $.extend(that.sb_data[obj.bbid],obj);
                });
            }
            /*var listData = {//用于本地测试
                sbData: this.sb_data
            };
            localStorage.setItem('tableList-'+this.baseFileName, mini.encode(listData));//用于本地测试*/
        },
        /**
         * 刷新列表
         * */
        refreshTableList: function () {
            var sortedTableList = _sortTableList(this.sb_data,this.specialOrder);
            var obj = {
                data:sortedTableList,
                isPreview: this.businessType === 'preview'?'Y':'N'//是否是申报结果查看标记--当前甘肃一般纳税人用到
            };
            var html = template('list-template',obj);
            $("#content-table tbody").html(html);
            this.needRefresh = false;
        },
        /**
         * 校验必填表是否都必填
         * */
        checkMustEdited: function () {
            var $notEditedTables = $('.item[data-needed="1"]').not('.edited');//必填而未填的表
            if($notEditedTables.length>0){
                mini.alert('必填表《'+$notEditedTables.eq(0).find('.table-name').html()+'》尚未填写！');
                return false;
            }
            return true;
        },
        /**
         * 子表填写情况下，校验父表选填或必填且未填写
         * */
        checkParentTableEdited: function () {
            var that = this;
            var ifPass = true;
            $('.item.edited').each(function () {
                var bbid = $(this).attr('data-bbid');
                var obj = that.sb_data[bbid];
                if(obj.status === '1' && obj.parentBbid){
                    var pids = obj.parentBbid.split(',');
                    $.each(pids, function (i,pid) {
                        if(that.sb_data[pid].status !== '1' && that.sb_data[pid].needed !== '2'){
                            mini.alert('请填写《'+that.sb_data[pid].bbmc+'》');
                            ifPass = false;
                            return false;
                        }
                    });
                    if(!ifPass){
                        return false;
                    }
                }
            });
            return ifPass;
        },
        /**
         * 发送前的js校验
         * */
        checkData: function () {
            return true;
        },
        /**
         * 报表校验
         * */
        checkSaveCheckData : function () {
            var Records = this.saveCheckDatas;
            if(Records.length === 0){
                return true;
            }
            var errorMsgs = [];
            var json_record;
            $.each(Records,function(i,record){
                json_record = _turnToJson(record);
                json_record = _toUpCase(json_record);
                if(!_checkAllTableExist(json_record) || _allowEscapedCheck(json_record)){
                    return true;
                }
                var msg = _checkSaveRecord(json_record);
                if(msg){
                    errorMsgs.push(msg);
                }
            });
            return errorMsgs;
        },
        checkDoShowMessage: function () {
            var Records = this.doShowMessages;
            if(Records.length === 0){
                return [];
            }
            var errorMsgs = [];
            var json_record;
            $.each(Records,function(i,record){
                json_record = _turnToJson(record);
                json_record = _toUpCase(json_record);
                if(!_checkAllTableExist(json_record) || _allowEscapedCheck(json_record)){
                    return true;
                }
                var msg = _checkMessageRecord(json_record);
                if(msg){
                    errorMsgs.push(msg);
                }
            });
            return errorMsgs;
        },
        /**
         * 根据报表id和key从主列表页面的缓存数据中取数
         * */
        getValueFromCheckData: function (bbid, key) {
            var value = '0.00';//默认返回'0.00'
            try{
                var checkData = this.sb_data[bbid].checkData;
                if(checkData && checkData[key] !== undefined){
                    value = checkData[key];
                }else{
                    // console.log('没有找到'+bbid+'表所对应key为'+key+'的值');
                }
            }catch (e){
                // console.log('没有找到'+bbid+'表所对应key为'+key+'的值');
            }finally{
                return value;
            }
        },
        /**
         * 校验当次提交与上次提交的时间间隔，用到cookie是为了在重开页面的情况下同样要做到校验
         * */
        checkSubmitTime: function () {
            var lastSubmitTime = $.cookie('lastSubmitTime_'+this.sbzlDm+'_'+this.djxh);
            var _this = this;
            if(!lastSubmitTime){
                return true;
            }
            var curSubmitTime = new Date().getTime();
            var restTime = Math.floor(this.timerTemp-(curSubmitTime-lastSubmitTime)/1000);//剩余时间
            if(restTime >= 0 ){
                var tip = '秒后可再次'+this.getBtnConfig('sb_save').text;
                this.timerBoxId = mini.showMessageBox({
                    title: '提示',
                    buttons: ["ok"],
                    html: '<span id="timer" class="txt-red" style="font-size: 14px;"><span id="timer-seconds">'+restTime+'</span>'+tip+'</span>',
                    callback: function(){
                        window.clearInterval(_this.timer);
                    }
                });
                this.runTimer(restTime);
                return false;
            }
            return true;
        },
        /**
         * 计时器
         * */
        runTimer: function (restTime) {
            var _this = this;
            this.timer = setInterval(function () {
                restTime--;
                $('#timer-seconds').text(restTime);
                if(restTime === -1){
                    window.clearInterval(_this.timer);
                    $.removeCookie('lastSubmitTime_'+_this.sbzlDm+'_'+_this.djxh);//删除cookie
                    mini.hideMessageBox(_this.timerBoxId);
                }
            },1000)
        },
        getBiidList: function(){
          var bbidList = [];
          $('#content-table tr.item').each(function () {
            bbidList.push($(this).attr('data-bbid'));
          });
          return bbidList;
        },
        openExcelImportPage: function () {
          mini.open({
            url: '../dataImport/dataImport.html',
            width: 910,
            height: 400,
            showModal: true,
            currentWindow:true,
            allowResize: false,
            onload: function () {
              var iframe = this.getIFrameEl();
              var dataImport = iframe.contentWindow.dataImport;
              /*--------这里可以对dataImport进行覆写相关配置-----------begin*/
              dataImport.introduce = '<span class="txt-red">温馨提示：请选择以.xlsx为后缀名的文件！<a class="txt-blue" onclick="parent.yearReport.downloadExcelTemplate()">下载导入模板</a></span>';
              dataImport.option.server = '/sbzx-web/api/excel/import';//后端接口
              dataImport.option.accept = {//文件过滤
                extensions:'xlsx',
                mimeTypes:'.xlsx'
              };
              dataImport.bindBeforeFileQueued = function () {
                var _this = this;
                this.uploader.on('beforeFileQueued', function (file) {
                  _this.uploader.reset();
                  $('#fileName').val('');
                  if(!/\.xlsx$/.test(file.name) && !/\.xls$/.test(file.name)){
                    mini.alert('请选择以.xlsx为后缀名的文件！');
                    return false;
                  }
                });
                this.uploader.on('startUpload', function () {
                  mini.mask('数据导入中，请稍后...');
                });
                this.uploader.on('uploadFinished', function () {
                  mini.unmask();
                });
              };
              dataImport.bindUploadSuccess = function () {
                this.uploader.on('uploadSuccess', function (file,response) {
                  if(response['success'] && response.value){
                    yearReport.reInit(mini.clone(response.value));
                    mini.alert('导入成功！', '提示',function () {
                      if (iframe.contentWindow.CloseOwnerWindow){
                        return iframe.contentWindow.CloseOwnerWindow();
                      }else{
                        iframe.contentWindow.window_close();
                      }
                    });
                  }else if(response.success === undefined &&response.message === undefined){
                    mini.alert('会话超时，请重新登录','提示', function () {
                      top.location.reload();
                    });
                  }else{
                    dataImport.isRetry = true;
                    mini.alert(response['message'] || '导入失败！');
                  }
                });
              };
              dataImport.option.formData = {//请求参数
                sbbs: yearReport.getBiidList(),
                sbzlDm: yearReport.sbzlDm,
                sssqQ: yearReport.sssqq,
                sssqZ: yearReport.sssqz,
                sblxDm: yearReport.sblxDm
              };
              dataImport.customEvent = function () {
                var _this = this;
                $('iframe')[0].contentWindow.$('#upload').click(function () {
                  mini.confirm('数据导入成功后，将清除目前填写的所有数据，请确定是否导入？','提示',function (action) {
                    if(action === 'ok'){
                      _this.isRetry?_this.uploader.retry(_this.uploader.getFiles()[0]):_this.uploader.upload();
                    }
                  });
                });
              };
              /*--------这里可以对dataImport进行覆写相关配置-----------end*/
              dataImport.init();
            },
            ondestroy: function (action) {

            }
          });
        },
        downloadExcelTemplate: function(){
          var preUrl = window.location.href.replace(/[^\/]+.html.*/,'')
          var templateUrl = preUrl + 'config/' + window.location.href.match(/[^\/]+(?=.html)/)[0] + '_template.xlsx';
          window.open(templateUrl);
        },
        reInit: function (res) {
          var changeList = []
          $.each(this.getBiidList(), function (i, bbid) {
            changeList.push({
              bbid: bbid,
              checkData: {},
              status: '2'
            })
          })
          this.updateLocalSbData(changeList)
          this.refreshTableList()
          this.excelImported = true
          var xmlReg = /((<\?xml[^<]*)|(([a-zA-Z0-9:]+)(="[^"]*")+)|(\s{2,}))/g;
          this.j3CorrectXml = xmlUtil.turnStrToXml(res.sbxx.replace(xmlReg,''));
        }
    };
    /**
     * 去重
     * */
    var _unique = function(arr){
        if(!arr){
            return [];
        }
        var newArr=arr.concat(),
            result =[];
        for(var i=0;i<newArr.length;i++){
            var tar = arr.shift();
            if($.inArray(tar,arr)<0){
                result.push(tar);
            }
        }
        return result;
    };
    /**
     * 校验record中所有相关表是否都存在
     * */
    var _checkAllTableExist = function (json) {
        var isAllExist = true;
        var jsonStr = mini.encode(json);
        var tableIdReg = /\d+(?=[|])/g;//匹配tableid
        var tableIdArr = jsonStr.match(tableIdReg);
        $.each(tableIdArr, function (i,id) {
            if(!yearReport.sb_data[id] || yearReport.sb_data[id].needed === '2'){
                isAllExist = false;
                return false;
            }
        });
        return isAllExist;
    };
    /**
     * 校验是否存在未填写的报表，且未填写的报表id在允许不校验的配置中
     * */
    var _allowEscapedCheck = function (json) {
      var escaped = false;
      var jsonStr = mini.encode(json);
      var tableIdReg = /\d+(?=[|])/g;//匹配tableid
      var tableIdArr = jsonStr.match(tableIdReg);
      $.each(tableIdArr, function (i,id) {
        if(yearReport.sb_data[id] && yearReport.sb_data[id].needed !== '2' && yearReport.sb_data[id].status !== '1' && yearReport.escapeCheckTables.indexOf(id) !== -1){
          escaped = true;
          return false;
        }
      });
      return escaped;
    };
    /**
     * 排序报表
     * */
    var _sortTableList = function (data,specialOrder) {
        var tableList = [];
        if(specialOrder && $.isArray(specialOrder) && specialOrder.length>0){//存在特定顺序
            $.each(specialOrder, function (i,bbid) {
                if(data[bbid]){
                    tableList.push(data[bbid]);
                }
            });
            return tableList;
        }else{//不存在特定顺序
            $.each(data, function () {
                tableList.push(this);
            });
            return tableList.sort(_sortById);
        }
    };
    /**
     * 通过id排序(前者小于后者，返回为负，即为升序)
     * */
    var _sortById  =  function (table1,table2) {
        return Number(table1.bbid) - Number(table2.bbid);
    };
    /***
     * xml--->json
     * **/
    var _turnToJson = function(record){
        if(typeof record != 'object') return {};
        var _recordAttr = record.attributes;
        var jsonResult = {};
        //xml --> json
        $.each(_recordAttr,function(i,v){
            var name =v.nodeName;
            var value = v.nodeValue;
            jsonResult[name] = value;
        });
        return jsonResult;
    };
    var _toUpCase = function(d){
        var tmpChar,postString,_pop;
        if(d.formula|| d.conditions){
            for(var pop in d){
                tmpChar = pop.substring(0,1).toUpperCase();
                postString = pop.substring(1,pop.length);
                _pop = tmpChar + postString;
                d[_pop] = d[pop];
            }
        }
        return d;
    };
    /*
     * 获取record中对应字段的值
     * */
    var _getValueForRecord = function(str) {
        var value;
        if(str.indexOf('WSXXS') !== -1) {//A1="WSXXS.[HDZSFS]"
            var key = str.replace(/(WSXXS.\[)|(\])/g,'');
            value = yearReport.wsxxMap[key];
        }else if(str.indexOf('LSXXS') !== -1) {//A1="LSXXS.[HDZSFS]"
            var key = str.replace(/(LSXXS.\[)|(\])/g,'');
            value = yearReport.lsxxMap[key];
        }else if(str.indexOf('FUNC') !== -1){
          var key = str.replace(/(FUNC.\[)|(\])/g,'');
          value = eval(key);
        }else{//A1="001|2,9"
            var paramArr = str.split('|');
            var bbid = paramArr[0];
            var key = paramArr[1].split(',').reverse().join('_');//由于cfg中的配置是id|col,row,所以这里要处理一下
            value = yearReport.getValueFromCheckData(bbid, key);  //处理   F2	3,5
        }
        return value;
    };
    /**
     * 校验saveCheckData中的record
     * */
    var _checkSaveRecord = function(record){
        if(record['Formula']){
            var formula = _getExpressForRecord(record,record['Formula']);
            var _express = formula.replace(/=/g,'==').replace(/<==/g,'<=').replace(/>==/g,'>=').replace(/<>/g,'!=');
            var ifRight = _reportEval(_express);//计算结果
            var checkresult = record['Range']=='false' ? false : true;//提示出现条件
            if(ifRight === checkresult){//计算结果与提示出现条件一致时，将错误信息设置到
                var new_msg = _getExpressForMsg(record,record['Emsg']);
                return new_msg;
                yearReport.errorMSG.push(new_msg);
            }
            return '';
        }
    };
    /**
     * 校验doShowMessage中的record
     * */
    var _checkMessageRecord = function (record) {
        var errorMsg = '';
        if(record['Conditions']){
            var formula = _getExpressForRecord(record,record['Conditions']);
            var _express = formula.replace(/=/g,'==').replace(/<==/g,'<=').replace(/>==/g,'>=').replace(/<>/g,'!=');
            var ifError = _reportEval(_express);
            if(ifError){
                errorMsg = _getExpressForMsg(record,record['ErrMsg']);
            }
        }
        return errorMsg;
    };
    /**
     * 获取cfg中公式代入数据后的表达式
     * @param {object} record
     * @param {string} formula
     * **/
    var _getExpressForRecord = function(record,formula){
        var regexp = /[A-Z]\d+/g;
        var formulaCells = formula.match(regexp);  //['A1','A2']   obj[A1]
        if(!$.isArray(formulaCells)){
            return formula;
        }
        for(var i=0,l=formulaCells.length; i<l; i++){
            var cell = formulaCells[formulaCells.length-1-i];       //A1
            var value = '';
            if(record[cell]){
                value = _getValueForRecord(record[cell]);
            }
            formula = formula.replace(new RegExp(cell+'(?!\\d)',"g"),value);
        }
        formula = formula.replace(/\bor\b/g,'||').replace(/AND/g,'&&').replace(new RegExp('IF',"g"),'getIF').replace(new RegExp('if',"g"),'getIF').replace(/round/g,'Round').replace(/ROUND/g,'Round');
        return formula;
    };
    /**
     * 获取提示信息中代入数据后的表达式
     * @param {object} record
     * @param {string} formula
     * **/
    var _getExpressForMsg = function (record,msg) {
        var cellWithBracketReg = /\[[A-Za-z0-9\+\-\*\/%\s]+\]|【[A-Za-z0-9\+\-\*\/%\s]+】/g;
        var cellReg = /[A-Za-z]\d+/g;
        var cellWithBrackets = msg.match(cellWithBracketReg);
        if(!!cellWithBrackets){
            $.each(cellWithBrackets, function (i, cellWithBracket) {
                var cells = cellWithBracket.match(cellReg);
                if(!!cells){
                    var newCellWithBracket = cellWithBracket;
                    $.each(cells, function (j, cell) {
                        var val;
                        if(record[cell]){
                            val = _getValueForRecord(record[cell]);
                            newCellWithBracket = newCellWithBracket.replace(new RegExp(cell+'(?!\\d)','g'), val);
                        }
                    });
                    cellWithBracket = cellWithBracket.replace(/[\+\-\*\/\[\]]/g,function($item){
                        return '\\'+$item;
                    });
                    msg = msg.replace(new RegExp(cellWithBracket, 'g'), newCellWithBracket);
                }
            });
        }

        return msg;
    };
    /**
     * eval
     * */
    var _reportEval = function(str){
        var result = 0;
        /**
         * 工具类
         * **/
        var value = function(n){
            var v = Number(n||0).toFixed(2);
            return Number(v);
        };
        var TRIMLEFT = function(_obj){
            if(_obj==="''" || _obj === null){
                return "";
            }
            return _obj.toString();
        };
        var strlen = function(c){
            return c.toString().length;
        };
        var round = function(_str1,str2){
            var str1 = eval(_str1);
            var numVal = parseFloat(str1),
                dig = parseInt(str2);
            var lastvalue = (!isNaN(str1))&&(!isNaN(str2)) ? numVal.toFixed(dig) : 0.00;
            return parseFloat(lastvalue);
        };
        var getIF = function(iftrue,str1,str2){
            return iftrue ? str1 : str2;
        };
        var abs = function(express){
            var num = eval(express);
            return Math.abs(num);
        };
        var sum = function(){
            return arguments[0];
        };
        var max = function () {
            var argumentsStr = Array.prototype.slice.apply(arguments).toString();
            return eval('Math.max('+argumentsStr+')');
        };
        var min = function () {
            var argumentsStr = Array.prototype.slice.apply(arguments).toString();
            return eval('Math.min('+argumentsStr+')');
        };
        var newstr = str.replace(/--/g,'+').replace(/STRLEN/g,'strlen').replace(/SUM/g,'sum').replace(/\bor\b/g,'||').replace(/AND/g,'&&').replace(/and/g,'&&').replace(/<>/g,'!=').replace(/ROUND/g,'round').replace(/Round/g,'round').replace(/trimleft/g,'TRIMLEFT').replace(/not/g,'!').replace(/\bOR\b/g,'||').replace(/ABS/g,'abs').replace(/MAX/g,'max');
        try{
            result = eval(newstr);
        }
        catch(e){
            console.log(e);
        }
        finally{
            return result;
        }
    };
    return yearReport;
}));

/**
 * Created by chenjunj on 2018/6/25 13:27.
 */
yearReport.showZyclqqd={
    showBz:true,//显示各省局逾期申报违法行为处理的自由裁 量权清单。
    btnName:"河北省税务行政处罚裁量基准"//各省局逾期申报违法行为处理的自由裁 量权清单超链接名称
};

if(window.location.href.indexOf('clientType=zzzd') > -1){
    yearReport.successUrl = '../public/sb_success_zzzd.html';
    !localStorage.getItem('clientType') && localStorage.setItem('clientType','zzzd');
}
yearReport.bindTableBtnEvent = function () {
    var that = this;
    //表格按钮
    $('#content-table').on('click','.btn[data-type]',function () {
        var $item = $(this).parent().parent();	//当前行
        var type = $(this).attr('data-type');//操作类型
        var bbid = $item.attr('data-bbid');//申报id
        var url = '';//页面路径
        if(type === 'edit' || type === 'reedit'){//填写/重填
            if(that.preTableIds.indexOf(bbid) === -1 && !that.checkAllPreTableEdited()){
                return ;
            }
            url = bbid+'/'+that.baseFileName+'_'+bbid+'.html?edit=Y';
            if(type === 'reedit'){
                mini.confirm('您填写的数据将被清除，需要重新填写?', '温馨提示', function (action) {
                    if(action === 'ok'){
                        that.openWindow(url, bbid, type, $item);
                    }
                });
                return ;
            }
        }else if(type === 'modify'){//修改
            url = bbid+'/'+that.baseFileName+'_'+bbid+'.html?modify=Y';
        }else if(type === 'view'){//查看
            url = bbid+'/'+that.baseFileName+'_'+bbid+'.html?preview=Y';
        }else if(type === 'delete'){//删除
            if(that.checkAllowDelete(bbid)){
                that.deleteSingleTableData(bbid);
            }
            return ;
        }
        that.openWindow(url, bbid, type, $item);
    });
};
yearReport.openWindow = function (url, bbid, type, $item) {
    var that = this;
    var winId = mini.open({
        cls:'fixedWindowTop0',
        url: url+'&v='+new Date().getTime()+'_2.0.0',        //页面地址
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
            if(action === 'ok'){
                that.afterMiniWindowClosed(bbid, type, $item );
            }
            //该判断针对由用户自己关闭窗口，但在窗口页面中的操作已经影响到了其他表的填写状态
            if(action === 'close' && that.changeList.length > 0){
                that.afterMiniWindowClosed(bbid, type, $item );
            }
        }
    });
    mini.get(winId).max();
};
yearReport.homeUrl = '/bszm-web/apps/views-zj/home/home.html';//首页
yearReport.backUrl = '/bszm-web/apps/views-zj/publicPages/allFunctions.html?tab=panel-{code}#menu-{code}1010';
yearReport.closeWindow = function () {
    if (window.CloseOwnerWindow)
        return window.CloseOwnerWindow();
    else{
        if(Tools.getUrlParamByName('client') === 'Y' || localStorage.getItem('client') === 'Y'){
            if(window.location.href.indexOf('clientType=zzzd') > -1 || localStorage.getItem('clientType') === 'zzzd'){
                top.postMessage('goTopHome', '*');
            } else {
                win_close();
            }
            return;
        }
        var userInfo = mini.decode(sessionStorage.getItem('getUserInfo')) || {};
        var userType = userInfo.userType;//01企业、02个人
        var code = '';
        if(userInfo.NsrInfo && userInfo.NsrInfo.byhBz === '2'){//报验户
            code = '42020';
        }else if(userType === '03' || (userInfo.NsrInfo && userInfo.NsrInfo.byhBz === '3')){//社保户 和 跨区域税源户
            window.location.href = yearReport.homeUrl;
            return;
        }else if(userType === '01'){//企业
            code = '22005';
        }else if(userType === '02'){//个人
            code = '12020';
        }
        window.location.href = this.backUrl.replace(/\{code\}/g, code);
    }
};
window_close = function () {
    if (window.CloseOwnerWindow)
        return window.CloseOwnerWindow();
    else{
        if(Tools.getUrlParamByName('client') === 'Y' || localStorage.getItem('client') === 'Y'){
            if(window.location.href.indexOf('clientType=zzzd') > -1 || localStorage.getItem('clientType') === 'zzzd'){
                top.postMessage('goTopHome', '*');
            } else {
                win_close();
            }
            return;
        }
        var userInfo = mini.decode(sessionStorage.getItem('getUserInfo')) || {};
        var userType = userInfo.userType;//01企业、02个人
        var code = '';
        if(userInfo.NsrInfo && userInfo.NsrInfo.byhBz === '2'){//报验户
            code = '42020';
        }else if(userType === '03' || (userInfo.NsrInfo && userInfo.NsrInfo.byhBz === '3')){//社保户 和 跨区域税源户
            window.location.href = yearReport.homeUrl;
            return;
        }else if(userType === '01'){//企业
            code = '22005';
        }else if(userType === '02'){//个人
            code = '12020';
        }
        window.location.href = yearReport.backUrl.replace(/\{code\}/g, code);
    }
};