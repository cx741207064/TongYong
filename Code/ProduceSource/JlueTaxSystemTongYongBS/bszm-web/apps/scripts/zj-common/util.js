/**
 * Created with JetBrains WebStorm 2018.2.1
 * Author: lizm
 * Date: 2018/10/10
 * Time:9:08
 * Description:util
 */

var bszmUtil = {
    /**
     * 加载html片段
     * @param url
     * @returns {string}
     */
    loadHtmlTemp: function (url) {
        var html = '';
        $.ajax({
            url: url,
            type: 'GET',
            async: false,
            dataType: 'html',
            success: function (data) {
                html = data;
            },
            error: function () {
                throw Error(url + ': file not found');
            }
        });
        return html;
    },
    /**
     * 异步加载css
     * @param url
     */
    loadCss: function (url) {
        var link = document.createElement('link'),
            head = document.getElementsByTagName('head')[0];

        link.href = url + '?_=' + new Date().getTime();
        link.rel = 'stylesheet';
        head.appendChild(link);
    },
    /**
     * 异步加载js
     * @param url
     */
    loadScript: function (url) {
        var script = document.createElement('script'),
            body = document.getElementsByTagName('body')[0];
        url = url + '?_=' + new Date().getTime();
        script.src = url;
        body.appendChild(script);
    },
    /**
     * 根据 url 参数 client = Y 来
     * 检测是否是客户端，如果是，则隐藏头部和面包屑
     * @returns {boolean}
     */
    checkIsClient: function () {
        var $header = $('.home-header'),
            $breadCrumb = $('.breadcrumb');
        if (top.location.href.indexOf('client=Y') > -1 || top.sessionStorage.getItem('client') === 'Y') {
            $header.is(':visible') && $header.hide();
            $breadCrumb.is(':visible') && $breadCrumb.hide();
            return true;
        } else {
            return false;
        }
    },
    /**
     * 添加 client=Y 参数
     * @param url
     * @returns {any}
     */
    resetUrl: function (url) {
        var link = url.indexOf('?') > -1 ?
            (url.indexOf('#') > -1 ? url.replace('#', '&client=Y#') : url + '&client=Y') :
            (url.indexOf('#') > -1 ? url.replace('#', '?client=Y#') : url + '?client=Y');
        return link;
    },
    /**
     * 根据用户类型，返回菜单ID 以及是否需要查询地税待办
     * @returns {{menuId: string, needQueryDsTodo: boolean}}
     */
    getUserType: function () {
        var userInfo = store.getSession('getUserInfo');
        var userType = store.getSession('userType');
        var type = {
            menuId: '10',
            needQueryDsTodo: false,
            needQueryTodo: true
        };
        if (userInfo) {
            userType = userInfo.userType || userType; //01 企业；02个人；03社保户
            var isByh = userInfo.NsrInfo ? (userInfo.NsrInfo.byhBz === '2') : false; // 报验户
            var isKqsyh = userInfo.NsrInfo ? (userInfo.NsrInfo.byhBz === '3') : false; //跨区税源户
            // 20 企业，40 报验户 50 //跨区税源户
            // 10 个人 30 社保户 不查询地税
            if (isByh) {
                type.menuId = '40'; // 报验户，需要查询地税待办
                type.needQueryDsTodo = false;
            } else if (isKqsyh) {
                type.menuId = '50';  // 跨区税源户也是企业，需要查询地税待办
                type.needQueryDsTodo = false;
            } else {
                switch (userType) {
                    case '01':  // 企业需要查询地税待办
                        type.menuId = '20';
                        type.needQueryDsTodo = false;
                        break;
                    case '02': // 个人不查地税待办
                        type.menuId = '10';
                        type.needQueryTodo = false;
                        break;
                    case '03': // 社保户不查地税待办
                        type.menuId = '30';
                        type.needQueryTodo = false;
                        break;
                    default:
                        break;
                }
            }
        }
        return type;
    },
    /**
     * 初始化头部的纳税人信息下拉面板
     * @param dom
     * @param cb
     */
    initUserInfo: function (dom, cb) {
        var _this = this;
        var userInfo = store.getSession('getUserInfo');
        if (userInfo || !cb) {
            $(dom).html(_this.loadHtmlTemp('/bszm-web/apps/views-zj/publicTemps/userInfo.html'));
            $(dom).html(template('header-user-temp', userInfo));
            cb && cb();
        } else {
            /**
             * 没有缓存就发请求
             */
            getUserInfo().then(function (data) {
                data = mini.decode(data);
                if (data.success) {
                    store.setSession('getUserInfo', data.data);
                    store.setSession('userType', data.data.userType);
                    userInfo = data.data;
                    $(dom).html(_this.loadHtmlTemp('/bszm-web/apps/views-zj/publicTemps/userInfo.html'));
                    $(dom).html(template('header-user-temp', userInfo));
                    cb && cb();
                } else {
                    if (data.message === 'ajaxSessionTimeOut') {
                        window.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                }
            });
        }
        _this.checkIsClient();
    },
    /**
     * 初始化搜索框
     * @param dom
     */
    initSearch: function (dom) {
        var _this = this;
        $(dom).html(this.loadHtmlTemp('/bszm-web/apps/views-zj/publicTemps/search.html'));
        var $input = $('.search-input');
        var $btn = $('.search-btn');
        /**
         * 搜索框的placeholder 在ie9以下，需要修复
         */
        if (!('placeholder' in document.createElement('input'))) {
            $.getScript('/bszm-web/lib/jquery/jquery.placeholder.js', function () {
                $input.placeholder();
            });
        }

        function search(e) {
            var value = $($input[1]).val() || $($input[0]).val();
            if (!value) {
                return false;
            }
            if (e.keyCode === 13 || (e.type === 'click' && e.target.className === 'search-btn')) {
                $input.val(value);
                //_this.searchByKeyWord(value);
                /**
                 * 使用本地菜单数据进行搜索，只能强匹配
                 * @type {any | Array}
                 */
                var allFnData = store.getSession('searchFnData') || [];
                var result = [];
                for (var i = 0, l = allFnData.length; i < l; i++) {
                    var fn = allFnData[i];
                    if (fn.name.indexOf(value) > -1) {
                        result.push(fn);
                    }
                }
                /**
                 * 允许 art-template 使用 html，将关键字标红，但是存在脚本攻击的危险~~
                 * @type {boolean}
                 */
                template.defaults.escape = false;

                $('#search-ul').html(template('search-ul-li', {functions: result, keyWord: value}));
                /**
                 * 加载完成html片段，需要初始化成 miniui 控件
                 */
                mini.parse('#search-result-win');

                var searchWin = mini.get('search-result-win');

                /**
                 * 绑定窗口关闭事件，关闭时清空上一次搜索内容
                 */
                searchWin.on('beforehide', function () {
                    $input.val('');
                });
                searchWin.show();
            }

        }

        /**
         * 回车事件
         */

        $input.on('keydown', function (e) {
            if (e.keyCode === 13) {
                search(e);
            }
        });
        /**
         * 点击事件
         */
        $btn.on('click', search);
    },
    /**
     * 搜索事件
     * @param keyword
     */
    searchByKeyWord: function (keyword) {
        var $input = $('.search-input');
        searchFn(keyword).then(function (res) {
            if (res.success) {
                var result = res.data;
                result = result.sort(function (it1, it2) {
                    return it2.sim - it1.sim;
                });
                $('#search-ul').html(template('search-ul-li', {functions: result, keyWord: keyword}));
                mini.parse('#search-result-win');
                var searchWin = mini.get('search-result-win');
                searchWin.on('beforehide', function () {
                    $input.val('');
                });
                searchWin.show();
            } else {

            }
        });
    },
    /**
     * 获取url里面的参数
     * @param name
     * @param url
     * @returns {any}
     */
    getUrlParam: function (name, url) {
        var reg = new RegExp('(^|\\?|&)' + name + '=([^&|#|/]*)(\\s|&|#|/|$)', 'i');
        return reg.test(url || window.location.href) ? window.decodeURIComponent(RegExp.$2.replace(/\+/g, '')) : undefined;
    },
    /**
     * 阻止冒泡
     * @param e
     */
    stopBubble: function (e) {
        //一般用在鼠标或键盘事件上
        if (e && e.stopPropagation) {
            //W3C取消冒泡事件
            e.stopPropagation();
        } else {
            //IE取消冒泡事件
            window.event.cancelBubble = true;
        }
    },
    /**
     * 格式化日期
     * @param time
     * @returns {string}
     */
    formatDateTime: function (time) {
        var date = new Date(time),
            y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    },
    /**
     * 更新未读消息状态
     * @param idArr
     */
    updateMsgStatus: function (idArr) {
        updateReceiveStatus([idArr]).then(function (res) {
            if (!res.success) {
                res.message && mini.alert(res.message);
            }
        });
    },
    /**
     * 获取操作系统
     * @returns {string}
     */
    getOs: function () {
        var os = navigator.platform;
        var ua = navigator.userAgent;
        if (os.indexOf('Win') > -1) {
            if (ua.indexOf('Windows NT 5.0') > -1) {
                return 'Win2000';
            } else if (ua.indexOf('Windows NT 5.1') > -1) {
                return 'WinXP';
            } else if (ua.indexOf('Windows NT 5.2') > -1) {
                return 'Win2003';
            } else if (ua.indexOf('Windows NT 6.0') > -1) {
                return 'WindowsVista';
            } else if (ua.indexOf('Windows NT 6.1') > -1 || ua.indexOf('Windows 7') > -1) {
                return 'Win7';
            } else if (ua.indexOf('Windows 8') > -1) {
                return 'Win8';
            } else if (ua.indexOf('Windows NT 10') > -1) {
                return 'Win10';
            } else {
                return 'Other';
            }
        } else if (os.indexOf('Mac') > -1) {
            return 'Mac';
        } else if (os.indexOf('X11') > -1) {
            return 'Unix';
        } else if (os.indexOf('Linux') > -1) {
            return 'Linux';
        } else {
            return 'Other';
        }
    },
    /**
     * 获取浏览器类型
     * @returns {string}
     */
    getBrower: function () {
        var ua = navigator.userAgent.toLowerCase(),
            webkit = ua.match(/webkit\/([\d.]+)/),
            chrome = ua.match(/chrome\/([\d.]+)/) ||
                ua.match(/crios\/([\d.]+)/),

            ie = ua.match(/msie\s([\d\.]+)/) ||
                ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
            firefox = ua.match(/firefox\/([\d.]+)/),
            safari = ua.match(/safari\/([\d.]+)/),
            opera = ua.match(/opr\/([\d.]+)/);
        if (!!ie) {
            return 'IE ' + (ie[1] || '');
        } else if (!!chrome) {
            return 'Chrome' + (chrome[1] ? '/' + chrome[1] : '');
        } else if (!!firefox) {
            return 'FireFox' + (firefox[1] ? '/' + firefox[1] : '');
        } else if (!!opera) {
            return 'Opera' + (opera[1] ? '/' + opera[1] : '');
        } else if (!!safari) {
            return 'Safari' + (safari[1] ? '/' + safari[1] : '');
        }
    },
    /**
     * 检测是否联网
     * @returns {boolean}
     */
    isOnline: function () {
        return navigator.onLine;
    },
    /**
     * 检测是否安装flash
     * @returns {{f: number, v: number}}
     */
    checkFlash: function () {
        var hasFlash = 0;　　　　 //是否安装了flash
        var flashVersion = 0;　　 //flash版本
        var swf = 0;　　 //flash版本
        if (document.all) {
            try {
                swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            } catch (e) {
                swf = false;
            }

            if (swf) {
                hasFlash = 1;
                flashVersion = parseInt(swf.GetVariable('$version').split(' ')[1].split(',')[0]);
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                swf = navigator.plugins['Shockwave Flash'];
                if (swf) {
                    hasFlash = 1;
                    var words = swf.description.split(' ');
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) {
                            continue;
                        }
                        flashVersion = parseInt(words[i]);
                    }
                }
            }
        }
        return {
            f: hasFlash,
            v: flashVersion
        };
    },
    /**
     * 渲染页脚
     * @param selector
     * @returns {boolean}
     */
    renderFooter: function (selector) {
        if (this.checkIsClient()) {
            return false;
        }
        var html = this.loadHtmlTemp('../publicTemps/foot.html');
        $(selector).html(html);
    },
    /**
     * 给所有 a 标签绑定事件，办税指引
     */
    initBszy: function () {
        var _this = this;
        $(document).on('click', 'a', function (e) {
            var url = $(this).attr('href');
            var isBlank = $(this).attr('target');
            var name = $(this).text();
            var id = _this.getUrlParam('id', url);
            var code = _this.getUrlParam('code', url);
            var classes = $(this).attr('class') || '';
            if (!!url && classes.indexOf('mini') === -1 && url.indexOf('javascript') === -1) {
                if (url.indexOf('wszx-web') > -1 || url.indexOf('fpzx-web') > -1) {
                    _this.queryBszyData(code, id, url, name, isBlank);
                    return false;
                }
                if (_this.checkIsClient()) {
                    url = _this.resetUrl(url);
                }
                if (isBlank) {
                    window.open(url);
                    //top.location.href = url;
                    return false;
                } else {
                    top.location.href = url;
                    return false;
                }
            }
        });
    },
    /**
     * 处理不需要办税指引的税务事项
     * @param code
     * @param id
     * @param url
     */
    handleNoBszySwsx: function (code, id, url, isBlank) {
        if (this.checkIsClient()) {
            url = this.resetUrl(url);
        }
        if (['110002', '110101', '110121'].indexOf(code) > -1) { // 新办纳税人套餐 110002,税务登记信息补录 110101。110121
            mini.open({
                url: '/bszm-web/apps/views-zj/publicPages/addCompany.html', //页面地址
                title: '选择办理企业', //标题
                width: 600, //宽度
                height: 400, //高度
                allowResize: false, //允许尺寸调节
                allowDrag: false, //允许拖拽位置
                showMaxButton: false, //显示最大化按钮
                currentWindow: false, //是否在本地弹出页面,默认false
                onload: function () { //弹出页面加载完成
                    var iframe = this.getIFrameEl();
                    iframe.contentWindow.addComp.setCode(code, id, url);
                }
            });
        } else {
            if (isBlank) {
                window.open(url);
                return false;
            } else {
                top.location.href = url;
                return false;
            }
        }
    },
    /**
     * 查询办税指引数据
     * @param code
     * @param id
     * @param url
     * @param name
     */
    queryBszyData: function (code, id, url, name, isBlank) {
        var _this = this;
        queryBszyData(id).then(function (data) {
            if (!data.success || !data.value) {
                if (data.message === 'ajaxSessionTimeOut') {
                    top.location.reload();
                } else {
                    data.message && mini.alert(data.message);
                }
                return;
            }
            var bszyData = data.value;
            if (bszyData.opend === 'N') { // 设置了不再显示的税务事项
                bszmUtil.handleNoBszySwsx(code, id, url, isBlank);
            } else {
                // 打开办税指引弹窗
                var win = mini.open({
                    url: '/bszm-web/apps/views-zj/publicPages/bszy.html', //页面地址
                    title: '《' + name + '》办税指引', //标题
                    width: 900, //宽度
                    height: 550,
                    allowResize: false, //允许尺寸调节
                    allowDrag: false, //允许拖拽位置
                    showMaxButton: false, //显示最大化按钮
                    currentWindow: false, //是否在本地弹出页面,默认false
                    onload: function () { //弹出页面加载完成
                        var iframe = this.getIFrameEl();
                        iframe.contentWindow.bszy.setBszyData(bszyData); // 设置办税指引数据
                    },
                    ondestroy: function (action) { //弹出页面关闭前
                        if (action === 'continue') { // 继续办理
                            _this.handleNoBszySwsx(code, id, url, isBlank);
                        } else if (action === 'noHint') { // 我知道了，不再提示
                            _this.bszyNoHint(code, id, url, isBlank);
                        }
                    }
                });
                $('#' + win.id).find('.mini-panel-header-inner').css({
                    'text-align': 'center'
                }).find('.mini-panel-title').css({
                    'width': '100%',
                    'font-size': '15px'
                });
            }
        });
    },
    /**
     * 办税指引，不再提示
     * @param code
     * @param id
     * @param url
     */
    bszyNoHint: function (code, id, url, isBlank) {
        var _this = this;
        setNoBszy(id).then(function (data) {
            if (!data.success || !data.value) {
                if (data.message === 'ajaxSessionTimeOut') {
                    top.location.reload();
                } else {
                    data.message && mini.alert(data.message);
                }
                return false;
            }
            _this.handleNoBszySwsx(code, id, url, isBlank);
        });
    },
    /**
     * 关闭miniui弹窗
     * @param action
     * @returns {*}
     */
    closeWin: function (action) {
        if (!action) {
            action = 'close';
        }
        if (window.CloseOwnerWindow) {
            return window.CloseOwnerWindow(action);
        } else {
            window.close();
        }
    },
    /**
     * 查询是否需要展示问卷调查
     */
    initSurvey: function () {
        var nsrxx = store.getSession('getUserInfo');
        var noThisTime = store.getSession('noThisTime');
        var _this = this;
        if (nsrxx && nsrxx.NsrInfo && !noThisTime) {
            var nsrsbh = nsrxx.NsrInfo.nsrsbhGs;
            isNeedShowSurveys(nsrsbh).then(function (data) {
                if (data.success) {
                    getSurveys(data.value).then(function (result) {
                        if (result.success) {
                            _this.showSurvey(result.value, nsrsbh);
                        }
                    });
                }
            });
        }
    },
    /**
     * 弹出问卷调查弹窗
     */
    showSurvey: function (data, nsrsbh) {
        mini.open({
            url: '/bszm-web/apps/views/publicPage/surveys.html',        //页面地址
            title: '问卷调查',      //标题
            width: 1200,      //宽度
            height: 600,     //高度
            allowResize: false,       //允许尺寸调节
            allowDrag: true,         //允许拖拽位置
            showCloseButton: true,   //显示关闭按钮
            showMaxButton: false,     //显示最大化按钮
            showModal: true,         //显示遮罩
            currentWindow: false,      //是否在本地弹出页面,默认false
            onload: function () {       //弹出页面加载完成
                var iframe = this.getIFrameEl();
                //调用弹出页面方法进行初始化
                var value = mini.clone(data);
                iframe.contentWindow.initSurveyPage(value, nsrsbh);
            },
            ondestroy: function (action) {  //弹出页面关闭前
                if (action === 'success') {       //如果点击“确定”
                    mini.alert('提交成功，感谢您的参与，祝您办税愉快！', '温馨提示');
                } else if (action === 'failure') {
                    mini.alert('提交失败，期待您的下次参与，祝您办税愉快！', '温馨提示');
                    store.setSession('noThisTime', true);
                } else {
                    store.setSession('noThisTime', true);
                }
            }
        });
    },
    /**
     * 初始化登录窗口
     * @param dom
     */
    initLoginWin: function (dom) {
        if (window.sessionStorage.getItem('getUserInfo')) {
            return false;
        }
        dom = dom || '.login-anchor';
        // 先加载样式文件
        this.loadCss('/bszm-web/apps/views-zj/publicTemps/loginWin.css');
        // 插入html
        var html = this.loadHtmlTemp('/bszm-web/apps/views-zj/publicTemps/loginWin.html');
        $('body').append(html);
        // 初始化miniui 的弹窗控件
        mini.parse('#login-win');
        // jquery 获取登录框元素，在body加载HTML之后执行
        var $loginBox = $('#login-box');
        // 显示加载中..遮罩
        // mini.mask({cls: 'mini-mask-loading', message: '加载中，请稍候...'});
        // 开始加载登录页
        // 加载完成后关闭遮罩
        // 缓存miniui window 对象
        this.loginWin = mini.get('login-win');
        var _this = this;


        $(dom).on('click', function () {
            var loginBoxInnerHtml = $('#login-box').html();
            if (!!loginBoxInnerHtml) {
                _this.loginWin.show();
            } else {
                $loginBox.html('').load('/login-web/login', function () {
                    // mini.unmask();
                    // 绑定点击弹出登录框的事件
                    _this.loginWin.show();
                });
            }
        });

    },
    /**
     * 关闭登录框
     */
    hideLoginWin: function () {
        this.loginWin.hide();
    }
};
/**
 * art-template 配套的分页方法
 * @returns {{init: init, setBtnStatus: setBtnStatus}}
 * @constructor
 */
var ArtTempPager = function () {
    return {
        /**
         * 初始化并绑定 上下一页的点击事件
         * @param container
         * @param queryFn
         * @param pageSize
         */
        init: function (container, queryFn, pageSize) {
            if (!$(container).length) {
                throw new Error('没有找到分页容器，页面没有相应DOM元素');
            }
            this.$pagerContainer = $(container);

            this.$nextPageBtn = this.$pagerContainer.find('.next');
            this.$prevPageBtn = this.$pagerContainer.find('.prev');
            this.$current = this.$pagerContainer.find('.current');
            this.$total = this.$pagerContainer.find('.total');
            this.pageIndex = 1;
            this.pageSize = pageSize;
            var _this = this;
            this.$prevPageBtn.on('click', function () {
                if (_this.pageIndex === 1) {
                    _this.$prevPageBtn.attr('disabled', 'disabled');
                } else {
                    _this.$prevPageBtn.removeAttr('disabled');
                    _this.$nextPageBtn.removeAttr('disabled');
                    _this.pageIndex--;
                    queryFn('prev');
                }

            });
            this.$nextPageBtn.on('click', function () {
                _this.pageIndex++;
                _this.$prevPageBtn.removeAttr('disabled');
                queryFn('next');
            });
        },
        /**
         * 设置上下一页按钮的状态，第一页时，上一页不可点，最后一页时，下一页不可点
         * @param data
         * @param action
         */
        setBtnStatus: function (data, action) {
            if (this.pageIndex === 1) {
                this.$prevPageBtn.attr('disabled', 'disabled');
            }
            var total = data.resultMap.totalNum; // 总数
            if (action === 'next') {
                if (!(total - this.pageSize * this.pageIndex > 0)) {
                    this.$nextPageBtn.attr('disabled', 'disabled');
                } else {
                    this.$nextPageBtn.removeAttr('disabled');
                }
            } else if (!action) {
                if (total <= this.pageSize) {
                    this.$pagerContainer.hide();
                } else {
                    this.$pagerContainer.show();
                }
            }
            var c = this.pageIndex < 10 ? '0' + this.pageIndex : this.pageIndex;
            var t = Math.ceil(total / this.pageSize);
            t = t < 10 ? '0' + t : t;
            this.$current.text(c);
            this.$total.text(t);
            data.total = total;
            data.pageSize = this.pageSize;
            data.pageIndex = this.pageIndex - 1;
        }
    };

};
