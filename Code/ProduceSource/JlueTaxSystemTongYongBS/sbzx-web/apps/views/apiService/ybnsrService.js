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