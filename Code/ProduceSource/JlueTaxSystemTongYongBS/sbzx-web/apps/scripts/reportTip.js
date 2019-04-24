/**
 * Created by chenjunj on 2017/8/18 14:28.
 */
var reportTip = {
    navigatorSelector: '#navigator',
    titleSelector: '.section-title',
    init: function () {
        this.renderNavigator();
    },
    renderNavigator: function () {
        var $navigator = $(this.navigatorSelector);
        var allTitles = $(this.titleSelector);
        $.each(allTitles, function (i,title) {
            var id = 'section-'+(i+1);
            $(this).attr('id',id);
            var titleName = $(this).html();
            var str = '<a class="ellipsis" href="#'+id+'" title="'+titleName+'">'+titleName+'</a>';
            $navigator.append(str);
        })
    }
};
$(function () {
    reportTip.init();
});