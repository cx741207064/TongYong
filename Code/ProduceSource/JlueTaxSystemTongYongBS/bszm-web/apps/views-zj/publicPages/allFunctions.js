/**
 * Created with JetBrains WebStorm 2018.2.1
 * Author: lizm
 * Date: 2018/10/17
 * Time:16:33
 * Description:allFunctions
 */

var allFns = {
    menuId: '', // 菜单类型 10 个人，20企业，30 社保
    rightMenu: {},
    targetPanel: bszmUtil.getUrlParam('tab'), //tab=wdxx
    bindTabClickEvents: function () {
        var _this = this;
        // tab 点击切换事件
        $('#target-fn').text($('.level1-title').text());
        var level2MenuId = location.href.split('#')[1];
        var $level2Title = $('#' + level2MenuId);

        $('.open-level2,.level2-title').on('click',function () {
            $(this).toggleClass('active');
            var $thisMenuBox = $(this).parent();
            var $otherMenuBox = $thisMenuBox.siblings();
            $thisMenuBox.find('.level2-ul').slideToggle(function () {
                _this.resetFooterPosition();
            });
            $otherMenuBox.find('.level2-ul').slideUp(function () {
                _this.resetFooterPosition();
            });
            $otherMenuBox.find('.level2-title').removeClass('active');
        });
        $('.open-level3Tab').on('click',function () {
            var $level2Li = $(this).parent();
            $($level2Li).addClass('active').siblings().removeClass('active');
            var id = $(this).attr('id');
            var menuH = $('#menu-level-list').height() - 40;
            $('.level3-box[data-tab=' + id + ']').height(menuH).addClass('active').siblings().removeClass('active');
            var parentId = $(this).attr('data-parent-id');
            var $level2= $('#' + parentId);
            if (parentId && $level2.length && !$level2.hasClass('active')) {
                $level2.click();
            }
        });

        $('#level1-ul li[data-tag-panel=' + this.targetPanel + ']').click().siblings().hide();

        $level2Title.click();
        var level2Menu = $level2Title.next('.level2-ul');
        if(level2Menu.length){
            var lis = level2Menu.find('li');
            $.each(lis,function (i,v) {
                var a = $(v).find('a');
                if(!!a && !a.length){
                    level2Menu.find('.level3-title:eq('+ i +')').click();
                    return false;
                }
            });
        }
    },
    /**
     * 根据用户类型设置菜单类型
     */
    setUserType: function () {
        var type = bszmUtil.getUserType();
        this.menuId = type.menuId;
        this.needQueryDsTodo = type.needQueryDsTodo;
        this.needQueryTodo = type.needQueryTodo;
    },
    /**
     * 查询全部菜单功能
     */
    queryAllFunctions: function (cb) {
        var _this = this;
        if (store.hasSession('allFunctions')) {
            var allFunctionsData = store.getSession('allFunctions');
            _this.setMenuData(allFunctionsData);
            cb();
        } else {
            allFunctions().then(function (data) {
                if (data.success) {
                    data = mini.decode(data);
                    store.setSession('allFunctions', data.data);
                    _this.setMenuData(data.data);
                    cb();
                } else {
                    if (data.message === 'ajaxSessionTimeOut') {
                        window.location.reload();
                    } else {
                        mini.alert(data.message);
                    }
                }
            });
        }
    },
    /**
     * 展开所有功能菜单，存session，用于功能搜索
     * @param item
     * @param res
     */
    storeFnDataForSearch: function (item, res) {
        if (item.subMenus.length) {
            for (var j = 0, k = item.subMenus.length; j < k; j++) {
                this.storeFnDataForSearch(item.subMenus[j], res);
            }
        } else {
            for (var i = 0, l = item.functions.length; i < l; i++) {
                res.push(item.functions[i]);
            }
        }

        store.setSession('searchFnData', res);

    },
    setMenuData: function (data) {
        var menuData;
        for (var i = 0, l = data.length; i < l; i++) {
            if (data[i].menuId + '' === this.menuId) {
                menuData = data[i];
                break;
            }
        }
        if (menuData) {
            for (var j = 0, k = menuData.subMenus.length; j < k; j++) {
                var name = menuData.subMenus[j].menuName;
                if (name === 'CONTENT') {
                    this.rightMenu = menuData.subMenus[j]; // 右侧菜单
                    var subMenus = this.rightMenu.subMenus;
                    for (i = 0, l = subMenus.length; i < l; i++) {
                        // 我要办税 // 我要查询
                        var id = (subMenus[i].menuId + '').slice(1);
                        if ((id === '2020' && this.targetPanel === 'wybs') ||
                            (id === '2030' && this.targetPanel === 'wycx')) {
                            this.rightMenu.subMenus = [subMenus[i]];
                            break;
                        }
                    }
                    $('#menu-level-list').html(template('menu-level', this.rightMenu));
                }
            }
        }
    },
    resetVisibility: function () {
        var id = location.href.split('#')[1];

        if (!!id) {
            var $title = $('#' + id);
            var $menuBox = $title.parent();
            var $titles = $menuBox.find('.level3-title');
            /*if($titles.length === 1 ){
                $titles.hide();
            }*/
            //$menuBox.siblings('.menu-box').hide();
            //$('#target-fn').text($title.text());
            this.resetFooterPosition($menuBox);
        }
    },
    resetFooterPosition: function ($menuBox) {
        var documentH = document.documentElement.clientHeight; // 显示区高度
        var bodyH = $('body').height();
        var menuH = $('#menu-level-list').height() +170;
        var $foot = $('#foot-temp');
        if (menuH > documentH) {
            $('body').height(menuH);
            $foot.css({position: 'static'});
            //var autoH = documentH - $('.home-header').height() - $('.breadcrumb').height() - $('#foot-temp').height() - 25;
            //$menuBox.height(autoH);
        }else{
            $('body').height(documentH);
            $foot.css({
                position: 'absolute',
                width: '100%',
                bottom: '0'
            });
        }
        $('.level3-box.active').height(menuH - 210);


    }
};
/**
 * 允许 art-template 使用 html，将关键字标红，但是存在脚本攻击的危险~~
 * @type {boolean}
 */
template.defaults.escape = false;

template.helper('getLevel1Id',function () {
    return bszmUtil.getUrlParam('tab').replace('panel-','');
});

template.helper('setLevel2Html',function (level2) {
    /*
    * <div class="level2-title {{checkHasChildren(level2)}}" id="menu-{{level2.menuId}}"></div>
    * */

    if (level2.subMenus.length > 1) {
        return '<div class="level2-title open-level2 has-children" id=menu-' + level2.menuId + '>'+ level2.menuName +'</div>';
    }
    else if(level2.subMenus.length === 1){
        var level3 = level2.subMenus[0];
        if(level3.functions.length === 1){
            return '<div class="level2-title"><a href="'+ level3.functions[0].url +'">'+ level2.menuName +'</a></div>';
        }else if(level3.functions.length > 1){
            var html = template('level3-box', level3);
            $('#level3-box-list').append(html);
            return '<div class="level2-title open-level3Tab" id=menu-' + level3.menuId + '>'+ level2.menuName +'</div>';
        }

    }
});

template.helper('setLevel3Html',function (level3) {
    /*
    * <div class="level3-title" id="menu-{{level3.menuId}}"></div>
    * */
    if (level3.functions.length > 1) {
        var html = template('level3-box', level3);
        $('#level3-box-list').append(html);

        return '<div class="level3-title open-level3Tab" data-parent-id=menu-'+ level3.parentMenuId +' id=menu-'+
            level3.menuId +'>'+ level3.menuName +'</div>';

    } else if (level3.functions.length === 1) {

        return '<div class="level3-title" data-parent-id=menu-'+ level3.parentMenuId + '><a href="' +
            level3.functions[0].url + '">' + level3.menuName + '</a></div>';
    }

});


$(function () {
    // 初始化用户信息
    var _this = allFns;
    bszmUtil.initSearch('.home-search');
    bszmUtil.renderFooter('#foot-temp');
    bszmUtil.initUserInfo('.home-user', function () {
        _this.setUserType();
        _this.queryAllFunctions(function () {
            _this.storeFnDataForSearch(_this.rightMenu, []);
            _this.bindTabClickEvents();
            _this.resetVisibility();
        });
    });
    bszmUtil.initBszy();
});
