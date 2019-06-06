/**
 * Created by chenjunj on 2017/3/17 13:27.
 * 本框架为年报框架中单表页面专用
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
        root.servyouReport = factory();
    }
}(this, function () {
    /**
     * 表Table
     * */
    var Table = function () {
        var table = {
            _hd: null,
            _sb_id: '',
            _saveXml: '',
            _cfgXml: '',
            _formulas: null,
            _$curTable: null,
            _formulaMap: {},//key为联动元素,value为公式数组
            _ifNeedSort: false,//公式是否需要排序
            _isFirstCalAll: true,//是否第一次触发所有计算
            _cache: {},
            _toolTips: null,
            /**
             * 初始化
             * @param {string} sb_id
             * */
            _init: function (sb_id, hd, localFormulas) {
                this._sb_id = sb_id;
                this._hd = hd;
                this._$curTable = $('table[sb_id="'+this._sb_id+'"]');
                var sb_url = this._$curTable.attr('sb_url')+'/';
                if(servyouReport.outerTableConfig && servyouReport.outerTableConfig[sb_id] && servyouReport.outerTableConfig[sb_id].configUrl){
                  sb_url = servyouReport.outerTableConfig[sb_id].configUrl + '/';
                }
                this._cfgXml = xmlUtil.loadFileByPath(sb_url + this._sb_id + '_cfg.xml','xml');
                this._analyseCfg();
                if(localFormulas){
                    this._formulas = localFormulas;
                    this._setFormulaMap();
                }
                this._bindFormulaEvent();
                this._bindDeleteBtn();
            },
            /**
             * 设置公式
             * */
            _setFormulas: function(formulas){
                this._formulas = formulas;
                this._setFormulaMap();
            },
            /**
             * 添加公式
             * @param {Array} formulaList
             * */
            _addFormulas: function (formulaList) {
                this._formulas = this._formulas.concat(formulaList);
                this._formulas = _unique(this._formulas);//去重
                this._setFormulaMap();
            },
            /**
             * 删除公式
             * @param {Array} formulaList
             * */
            _deleteFormulas: function (formulaList) {
                var that = this;
                $.each(formulaList, function (i, formula) {
                    var index = that._formulas.indexOf(formula);
                    if(index !== -1){
                        that._formulas.splice(index,1);
                    }
                });
                this._setFormulaMap();
            },
            /**
             * 获取关联公式
             * */
            _getExpData: function(key){
                var that = this;
                var expArr = this._formulaMap[key];
                if(!expArr){
                    return [];
                }
                var expData = expArr.concat();
                $.each(expArr, function(){
                    var tag = this.split('=')[0];
                    tag = $.trim(tag).replace("\"", "");
                    if(tag != key){
                        expData = expData.concat(that._getExpData(tag));
                    }
                });
                return expData;
            },
            /**
             * 整理formulaMap，找到直接使用某个单元格（如：A1）的公式
             * */
            _setFormulaMap: function(){
                this._formulaMap = {};
                var that = this;
                $.each(this._formulas, function(i,formula){
                    var temp = formula.split('=');
                    temp.shift();
                    temp = temp.join('==');
                    temp = temp.toLocaleUpperCase();
                    temp = temp.replace(/SUM3D/g,'SUM');
                    var records = _getExpArr(temp);
                    $.each(records, function(j,record){
                        if(!that._formulaMap[record]){
                            that._formulaMap[record] = [];
                        }
                        that._formulaMap[record].push(formula);
                    });
                });
                this._ifNeedSort = true;
            },
            /**
             * 绑定公式触发事件
             * */
            _bindFormulaEvent: function () {
                var $curTable = this._$curTable;
                var that = this;
                /**
                 * 绑定focus和blur事件委托
                 * */
                $curTable.on('focus','input:not([class*=mini],[type="checkbox"],[type="radio"]),select',function(){
                    if($(this).is('input')){
                        if($(this).val() !== ''){
                            var curVal = _getValueByType($(this));
                            if($(this).is('input')){
                                $(this).val(curVal);
                            }
                        }
                        var _this = this;
                        clearTimeout(window._inputSelect);
                        window._inputSelect = setTimeout(function () {
                            $(_this).select();
                        },1);
                        // $(this).select();//所有单元格focus都选中文本
                    }
                }).on('blur', 'input:not([class*=mini],[type="checkbox"],[type="radio"]),select', function () {
                    //校验当前单元格数据
                    if(!_validValue($(this))){
                        return ;
                    }
                    _setValueByType($(this));//格式化数据
                    var $trs = $curTable.find("tr:not([class='del-tr'])");
                    var _row = $trs.index($(this).parents("tr:first"));
                    var _col = $(this).parents("td:first").index();
                    var curExp = numberToLetters(_col) + (_row + 1);
                    var expData = that._getExpData(curExp);//获取与本单元格相关公式
                    expData = _unique(expData);//去重
                    expData = _sortFormula(expData);
                    _runExp(expData, $trs);//执行计算
                }).on('dragstart', function () {//屏蔽input文字选中拖动的效果
                    return false;
                }).on('blur', 'textarea', function () {
                  var $target = $(this);
                  $(this).parent().removeClass('report_error');
                  var text = $(this).val();
                  var attrMinLen = $(this).attr('minLen');
                  var attrMaxLen = $(this).attr('maxLen');
                  if(text && !_checkByteBelowMinLength(text, Number(attrMinLen))){
                    $(this).parent().addClass('report_error');
                    mini.alert('至少输入'+attrMinLen+'字节（1个字母或者数字等于1个字节，1个汉字等于3个字节）！', '提示', function () {
                      $target.val('').change().blur();
                    });
                    return ;
                  }
                  if(text && attrMaxLen ){
                    var checkResult = _checkByteOverMaxLength(text, Number(attrMaxLen));
                    if(checkResult.isOverLength){
                      $(this).parent().addClass('report_error');
                      mini.alert('最多可输入'+attrMaxLen+'字节（1个字母或者数字等于1个字节，1个汉字等于3个字节）！', '提示', function () {
                        $target.val(text.substr(0,checkResult.breakPoint)).change().blur();
                      });
                      return ;
                    }
                  }
                });
            },
            /**
             * 绑定删除行事件
             */
            _bindDeleteBtn: function () {
                var $curTable = this._$curTable;
                var that = this;
                /**
                 * 绑定鼠标移入移出可删除行的事件
                 */
                $curTable.on('mouseover','td',function () {
                    if ($(this).hasClass('allow-del')){
                        if (!($(this).parent().prev().find('.del-btn-bg').length > 0)){
                            // $(this).css('position','relative');
                            $(this).parent().before('<tr class="del-tr" style="position: absolute"><td class="nbr nbb nbl nbt"><div class="del-btn-bg"><a class="btn btn-white del-btn">删除行</a></div></td></tr>');
                            var marginLeft = $(this).innerWidth();
                            $.each($(this).prevAll(),function (i,prevTd) {
                                marginLeft += $(prevTd).innerWidth() + 2;
                            });
                            $('.del-btn-bg').css('margin-left',marginLeft - 8);
                            $(this).parent().siblings().each(function (i,nextTr) {
                                if ($(nextTr).prev().find('.del-btn-bg').length > 0){
                                    $(nextTr).prev().remove();
                                }
                            })
                        }
                    } else {
                        if ($(this).find('.del-btn-bg').length <= 0){
                            $('.del-btn-bg').parent().parent().remove();
                        }
                    }
                }).on('mouseleave',function () {
                    $('.del-btn-bg').parent().parent().remove();
                });
            },
            /**
             * 添加行
             * */
            _addRows: function (index,rowCount,html) {
                var formulaClone = [];//克隆行的公式，其实是（index-1行的公式）
                var that = this;
                var cellReg = /[A-Z]+\d+/g;//匹配单元格
                var cellIndexReg = /\d+/g;//匹配单元格下标
                if(typeof rowCount === 'number' && typeof index === 'number' && rowCount > 0 && index > 0){
                    for(var i=0,l=this._formulas.length;i<l;i++){
                        var cells = this._formulas[i].match(cellReg);
                        var leftCellIndex = parseInt(cells[0].match(cellIndexReg)[0]);
                        //找到所有下标大于index的单元格，下标都加rowCount
                        $.each(cells, function (j, cell) {
                            var cellLetter = cell.match(/[A-Z]+/g)[0];
                            var cellIndex = parseInt(cell.match(/\d+/g)[0]);
                            if(cellIndex>index){
                                cellIndex += rowCount;
                                var newCell = cellLetter + cellIndex;
                                that._formulas[i] = that._formulas[i].replace(new RegExp(cell+'(?!\\d)','g'),newCell);
                            }
                        });
                        //找到求和公式如SUM(B11:B24)中“:”后的下标等于index的单元格如B24
                        var strArr = this._formulas[i].match(/:[\s]*[A-Z]+\d+/g);
                        if(strArr && strArr.length>0){
                            $.each(strArr, function (j,str) {
                                var cellIndex = parseInt(str.match(cellIndexReg)[0]);
                                if(cellIndex ===  index){
                                    cellIndex += rowCount;
                                    var newStr = str.replace(cellIndexReg,cellIndex.toString());
                                    that._formulas[i] = that._formulas[i].replace(new RegExp(str,'g'),newStr);
                                }
                            })
                        }
                        //克隆行的公式
                        if(leftCellIndex === index){
                            formulaClone.push(this._formulas[i]);
                        }
                    }
                    //添加新增行的公式
                    $.each(formulaClone, function (i,formula) {
                        var cells = formula.match(/[A-Z]+\d+/g);
                        var leftCellIndex = parseInt(cells[0].match(/\d+/g)[0]);
                        if(leftCellIndex === index){
                            for(var j=1;j<=rowCount;j++){
                                var newFormula = formula;
                                $.each(cells, function (k, cell) {
                                    var cellLetter = cell.match(/[A-Z]+/g)[0];
                                    var cellIndex = parseInt(cell.match(/\d+/g)[0]);
                                    if(cellIndex === index){
                                        cellIndex += j;
                                        var newCell = cellLetter + cellIndex;
                                        newFormula = newFormula.replace(new RegExp(cell+'(?!\\d)','g'),newCell);
                                    }
                                });
                                that._formulas.push(newFormula);
                            }
                        }
                    });
                    //添加行到页面
                    var $targetTr = $('table[sb_id="'+this._sb_id+'"] tr:eq('+index+')');
                    /**
                     * 若存在目标行，则增加到目标行的位置，否则默认增加到对应报表的最后一个tbody上
                     * */
                    if($targetTr.length > 0){
                      $targetTr.before(html);
                    }else{
                      $('table[sb_id="'+this._sb_id+'"] tbody:last').append(html);
                    }
                    mini.parse();
                    //重新设置map表
                    this._setFormulaMap();
                }
            },
            /**
             * 删除一行
             * */
            _deleteRow: function (index) {
                var formulaDeleteRow = [];//删除该行后的公式列表
                var that = this;
                if(typeof index === 'number' && index >= 0) {
                    //删除该行公式
                    for (var i = 0, l = this._formulas.length; i < l; i++) {
                        var cells = this._formulas[i].match(/[A-Z]+\d+/g);
                        var leftCellIndex = parseInt(cells[0].match(/\d+/g)[0]);
                        if (leftCellIndex !== index+1){
                            formulaDeleteRow.push(this._formulas[i]);
                        }
                    }
                    this._formulas = formulaDeleteRow;
                    for (var i = 0, l = this._formulas.length; i < l; i++) {
                        //找到所有下标大于index+1的单元格，下标都-1
                        var cells = this._formulas[i].match(/[A-Z]+\d+/g);
                        var leftCell = cells[0];
                        cells.shift();
                        var rightCells = cells;
                        //找到求和公式如SUM(B11:B24)中“:”后的下标等于index的单元格如B24
                        var strArr = this._formulas[i].match(/:[\s]*[A-Z]+\d+/g);
                        if(strArr && strArr.length>0){
                            $.each(strArr, function (j,str) {
                                var cellIndex = parseInt(str.match(/\d+/g)[0]);
                                if(cellIndex ===  index+1){
                                    cellIndex -= 1;
                                    var newStr = str.replace(/\d+/g,cellIndex.toString());
                                    that._formulas[i] = that._formulas[i].replace(new RegExp(str,'g'),newStr);
                                }
                            })
                        }
                        //公式右边
                        $.each(rightCells, function (j, cell) {
                            var cellLetter = cell.match(/[A-Z]+/g)[0];
                            var cellIndex = parseInt(cell.match(/\d+/g)[0]);
                            if (cellIndex > index+1) {
                                cellIndex -= 1;
                                var newCell = cellLetter + cellIndex;
                                that._formulas[i] = that._formulas[i].replace(new RegExp(cell+'(?!\\d)', 'g'), newCell);
                            }
                        });
                        //公式左边
                        var cellLetter = leftCell.match(/[A-Z]+/g)[0];
                        var cellIndex = parseInt(leftCell.match(/\d+/g)[0]);
                        if (cellIndex > index+1) {
                            cellIndex -= 1;
                            var newCell = cellLetter + cellIndex;
                            that._formulas[i] = that._formulas[i].replace(new RegExp(leftCell+'(?!\\d)', 'g'), newCell);
                        }
                    }
                    //再移除行
                    this._$curTable.find('tr:eq(' + index + ')').remove();
                    //重新设置map表
                    this._setFormulaMap();
                }
            },
            /**
             * 解析cfg
             * */
            _analyseCfg: function () {
                this._cache['Body'] = $(this._cfgXml).find('Body Records');
                this._cache['SaveCheckData'] = $(this._cfgXml).find('SaveCheckData Records,SendCheckData Records');
                this._cache['DoShowMessages'] = $(this._cfgXml).find('DoShowMessage Records');
                this._cache['MustFill'] = $(this._cfgXml).find('MustFill Records');
            },
            /**
             * 校验cfg
             * */
            _checkCfg: function () {
                return this._checkSaveCheckData() && this._checkMustFill();
            },
            /**
             * 校验 SaveCheckData，SendCheckData
             * */
            _checkSaveCheckData: function(){
                var Records = this._cache['SaveCheckData'];
                if(Records.length === 0){
                    return true;
                }
                var ifRight = true;
                var json_record;
                $.each(Records,function(i,record){
                    json_record = _turnToJson(record);
                    json_record = _toUpCase(json_record);
                    ifRight = _checkSaveRecord(json_record);
                    if(!ifRight){
                        return false;
                    }
                });
                return ifRight;
            },
            /**
             * 校验必填
             * */
            _checkMustFill: function () {
                var Records = this._cache['MustFill'];
                if(Records.length === 0){
                    return true;
                }
                var ifRight = true;
                var json_record;
                $.each(Records,function(i,record){
                    json_record = _turnToJson(record);
                    json_record = _toUpCase(json_record);
                    ifRight = _checkMustFillRecord(json_record);
                    if(!ifRight) return false;
                });
                return ifRight;
            },
            _checkDoShowMessage: function () {
                var Records = this._cache['DoShowMessages'];
                if(Records.length === 0){
                    return [];
                }
                var errorMsgs = [];
                var json_record;
                $.each(Records,function(i,record){
                    json_record = _turnToJson(record);
                    json_record = _toUpCase(json_record);
                    var msg = _checkMessageRecord(json_record);
                    if(msg){
                        errorMsgs.push(msg);
                    }
                });
                return errorMsgs;
            },
            /**
             * 计算全部
             * */
            _calculateAll: function () {
                this._formulas = _sortFormula(this._formulas);
                table._ifNeedSort = false;
                var $trs = this._$curTable.find('tr:not([class="del-tr"])');
                _runExp(this._formulas, $trs);
            },
            /**
             * 格式化所有input,select的数据
             * */
            _formatAllData: function () {
                this._$curTable.find('td>input,td>select').each(function () {
                    _setValueByType($(this));
                });
            },
            /**
             * 渲染toolTip
             * @param toolTips
             * @private
             */
            _renderToolTips: function (toolTips) {
                for (var tr_td in toolTips){
                    if (!toolTips[tr_td]['value']){
                        return;
                    }
                    var indexArr = tr_td.split('_');
                    var trIndex = indexArr[0];
                    var tdIndex = indexArr[1];
                    var toolTip = toolTips[tr_td]['value'];
                    var placement = toolTips[tr_td]['placement'];
                    this._$curTable.find('tr:eq('+trIndex+')').find('td:eq('+tdIndex+')').attr({'custom-tooltip':'Y','data-tooltip':toolTip, 'data-placement':(placement || 'left')});
                }
            },
            /**
             * 设置toolTip
             * @param toolTips
             * @private
             */
            _setToolTips: function (toolTips) {
                this._toolTips = toolTips;
                this._$curTable.find('[custom-tooltip]').removeAttr('data-tooltip').removeAttr('data-placement');
                !!toolTips && this._renderToolTips(toolTips);
                var tip = new mini.ToolTip();
                tip.set({
                    target: document,
                    selector: '[data-tooltip]'
                });
            },
            /**
             * 添加toolTip
             * @param toolTips
             * @private
             */
            _addToolTips: function (toolTips) {
                this._toolTips = $.extend({},this._toolTips, toolTips);
                !!toolTips && this._renderToolTips(toolTips);
            },
            /**
             * 删除toolTip
             * @param tdList
             * @private
             */
            _deleteToolTips: function (tdList) {
                for (var i=0; i<tdList.length; i++){
                    var indexArr = tdList[i].split('-');
                    var trIndex = indexArr[0];
                    var tdIndex = indexArr[1];
                    this._$curTable.find('tr:eq('+trIndex+')').find('td:eq('+tdIndex+')').removeAttr('data-tooltip').removeAttr('data-placement').removeAttr('custom-tooltip');
                    delete this._toolTips[tdList[i]];
                }
            }

        };
        /**
         * 校验输入数据
         * */
        var _validValue = function ($target) {
          if(!$target.is('input')){
            return true;
          }
          $target.parent().removeClass('report_error');
          var result = true;
          var text = $target.val().trim();
          var val = Number(text);
          var attrMinValue = $target.attr('minValue');
          var attrMaxValue = $target.attr('maxValue');
          var attrMaxLen = $target.attr('maxLen');
          var attrMinLen = $target.attr('minLen');
          var notOnlyNum = $target.attr('notOnlyNum');//非纯数字
          var onlyEnglishAndNumber = $target.attr('onlyEnglishAndNumber');//数字或字母
          var validFunc = $target.attr('validFunc');///自定义的校验方法
          var validFuncResult = true;//自定义校验结果
          var validReg = $target.attr('validReg');//自定义的正则校验
          var validRegErrorText = $target.attr('validRegErrorText');//自定义的正则校验报错提示语
          var type = $target.attr('servyou_type');
          var errorMsg = '';
          var formatErrorMsg = $target.attr('formatErrorMsg');

          if(type && type === 'nonnegative'){
            if(!isNaN(val) && val < 0){
              $target.val(0).blur();
              errorMsg = '请输入不小于0的数！';
              result = false;
            }
          }
          if(type && type === 'nonnegativeInt'){
            if(!isNaN(val) && val < 0){
              $target.val(0).blur();
              errorMsg = '请输入不小于0的整数！';
              result =  false;
            }
          }
          if(type && type === 'nonpositive'){
            if(!isNaN(val) && val > 0){
              $target.val(0).blur();
              errorMsg = '请输入不大于0的数！';
              result =  false;
            }
          }
          if(type && type === 'nonpositiveInt'){
            if(!isNaN(val) && val > 0){
              $target.val(0).blur();
              errorMsg = '请输入不大于0的整数！';
              result =  false;
            }
          }
          //校验数据14位
          var validTypes = ['int','nonnegativeInt','nonpositiveInt','nonnegative','nonpositive','percent','milli']
          if(!type || validTypes.indexOf(type) !== -1){
            if($target.attr("disabled") !== "disabled"){
              if(text.split('.')[0].length>14){
                $target.val(0).blur();
                errorMsg = '请输入整数部分不超过14位的数！';
                result =  false;
              }
            }
          }
          /*检验百分数，千分数，及其最大最小值*/
          if(text!="" && (type === 'percent' || type === 'milli')){
            var attrDigit = $target.attr('digit');
            var digit = attrDigit && !isNaN(attrDigit)?parseInt(attrDigit):0;
            var isFormatReg = type === 'percent'?/^\d+(\.\d+)?%$/:/^\d+(\.\d+)?‰$/;//是否格式化
            var replaceSymbol = type === 'percent'?'%':'‰';//替换的符号
            var multiple = type === 'percent'?100:1000;
            var minValue = 0;//最小值
            var maxValue = null;//最大值
            var isFormat = isFormatReg.test(text);//输入数据是否格式化
            if(attrMaxValue){
              attrMaxValue = attrMaxValue.replace(replaceSymbol,'');
              if(!isNaN(attrMaxValue)){
                maxValue = Number(attrMaxValue)/multiple;
              }
            }
            if(attrMinValue){
              attrMinValue = attrMinValue.replace(replaceSymbol,'');
              if(!isNaN(attrMinValue)){
                minValue = Number(attrMinValue)/multiple;
              }
            }
            if(!isFormat){//输入数据不带%或2个%及以上
              if(isNaN(val)){
                errorMsg = '数据输入有误，请重新输入。';
                $target.val(minValue).blur();
                result =  false;
              }
              if(typeof maxValue !== 'number' && val<minValue){
                errorMsg = '请输入不小于'+minValue+'的数！';
                $target.val(minValue).blur();
                result =  false;
              }else if(typeof maxValue === 'number' && (val<minValue || val>maxValue)){
                errorMsg = '当前单元格的输入范围为['+minValue+'-'+maxValue+']！';
                $target.val(val<minValue?minValue:maxValue).blur();
                result =  false;
              }
            }
          }
          /*校验非百分数、千分数的最大最小值*/
          var notValidTypes = ['percent','milli','string','date'];
          if(text!="" && notValidTypes.indexOf(type) === -1){
            var minValue = null;
            var maxValue = null;
            if(attrMaxValue && !isNaN(attrMaxValue)){
              maxValue = Number(attrMaxValue);
            }
            if(attrMinValue && !isNaN(attrMinValue)){
              minValue = Number(attrMinValue);
            }
            if(typeof minValue === 'number' && maxValue === null && val<minValue){
              errorMsg = '请输入不小于'+minValue+'的数！';
              $target.val(minValue).blur();
              result =  false;
            }else if(typeof maxValue === 'number' && minValue === null && val>maxValue){
              errorMsg = '请输入不大于'+maxValue+'的数！';
              $target.val(maxValue).blur();
              result =  false;
            }else if(typeof minValue === 'number' && typeof maxValue=== 'number' && (val<minValue || val>maxValue)){
              errorMsg = '当前单元格的输入范围为['+minValue+'-'+maxValue+']！';
              $target.val(val<minValue?minValue:maxValue).blur();
              result =  false;
            }
          }
          if(text !== '' && type && type === 'date'){
            var newDate = new Date(text).format('yyyy-MM-dd');
            if(newDate !== text){
              errorMsg = '请输入正确的日期（格式如：2008-08-08）！';
              result =  false;
            }
          }
          if(result && attrMinLen && text && !_checkByteBelowMinLength(text, Number(attrMinLen))){
            errorMsg = '至少输入'+attrMinLen+'字节（1个字母或者数字等于1个字节，1个汉字等于3个字节）！';
            result = false;
          }
          if(result && attrMaxLen){
            var checkResult = _checkByteOverMaxLength(text, Number(attrMaxLen));
            if(checkResult.isOverLength){
              errorMsg = '最多可输入'+attrMaxLen+'字节（1个字母或者数字等于1个字节，1个汉字等于3个字节）！';
              $target.val(text.substr(0,checkResult.breakPoint)).blur();
              result = false;
            }
          }
          if (result && notOnlyNum === 'Y' && text && /^([\-\+])?\d+(\.\d+)?([%‰])?$/.test(text.replace(/\s/g,''))){
            errorMsg = '不能输入纯数字！';
            $target.val('').blur();
            result = false;
          }
          if(result && onlyEnglishAndNumber === 'Y' && text && !/^[0-9A-Za-z]+$/.test(text)){
            errorMsg = '请输入数字或字母！';
            $target.val('').blur();
            result = false;
          }
          if(result && validReg && eval(validReg) instanceof RegExp && text && !eval(validReg).test(text)){
            errorMsg = validRegErrorText;
            result = false;
          }
          if(result && validFunc){
            try{
              result = eval(validFunc)(text, $target);
              validFuncResult = result;
            }catch (e) {

            }
          }
          if(!result && servyouReport.isInitDone){
            $target.parent().addClass('report_error');
            validFuncResult && (formatErrorMsg || errorMsg) && mini.alert(formatErrorMsg || errorMsg, '提示', function () {
              $target.focus();
            })
          }
          return result;
        };
        /**
         * 校验字符串是否小于最小长度
         * @param {string} curValue
         * @param {number} minLength
         * @return {boolean}
         * */
        var _checkByteBelowMinLength = function (curValue, minLength) {
            var chineseReg = /[\u4e00-\u9fa5]/g;
            var matchChinese = curValue.match(chineseReg);
            var chineseLength = matchChinese?matchChinese:0;
            var realLength = chineseLength * 3 + curValue.length - chineseLength;
            if(realLength < minLength){
                return false;
            }
            return true;
        };
        /**
         * 校验字符串是否超过最大长度
         * @param {string} curValue
         * @param {number} maxLength
         * @return {object}
         * */
        var _checkByteOverMaxLength = function(curValue, maxLength) {
            var realLength = 0;
            for (var i = 0,len = curValue.length; i < len; i++) {
                var char = curValue[i];
                if (/[\u4e00-\u9fa5]/.test(char)) {
                    realLength += 3;
                }else {
                    realLength++;
                }
                if (realLength > maxLength) {
                    return {
                        isOverLength: true,
                        breakPoint: i
                    };
                }
            }
            return {
                isOverLength: false,
                breakPoint: -1
            }
        };
        /**
         * 排序公式
         * @param {Array} arr
         * @return {Array}
         * */
        var _sortFormula = function (arr) {
            var cellReg = /[A-Za-z]+\d+/g;//匹配节点
            var sumReg = /sum\([\d\w\s:]+\)/ig;//匹配求和公式如sum(A1:A12)
            var indexReg = /\d+/g;//匹配下标
            for(var i=0;i<arr.length-1;i++){
                for(var j=i+1;j<arr.length;j++){
                    var temp;
                    var curFormulaCells = arr[j].match(cellReg);//当前公式的所有节点
                    var tarFormulaCells = arr[i].match(cellReg);//目标公式的所有节点
                    //若当前公式中不存在节点或目标公式中不存在节点或目标节点只有等号左边有节点，则直接跳过当前循环，则直接跳过当前循环
                    if(!curFormulaCells || !tarFormulaCells || tarFormulaCells.length <= 1){
                        continue;
                    }
                    tarFormulaCells.shift();//剔除目标公式等号左侧节点
                    var node = curFormulaCells[0];//当前节点
                    var nodeLetter = node.match(/\w/i);//当前节点字母
                    var nodeIndex = parseInt(node.match(/\d+/));////当前节点下标
                    var nodeLetterReg = new RegExp(nodeLetter,'ig');
                    if(tarFormulaCells.length > 0){
                        if(tarFormulaCells.indexOf(node) !== -1){
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                            i--;
                            break;
                        }else{	//求和公式sum的情况
                            var sumArr = arr[i].match(sumReg);
                            if(!!sumArr){
                                var ifExchanged = false;
                                $.each(sumArr, function (k,sum) {
                                    var sumCells = sum.match(nodeLetterReg);
                                    if(!!sumCells && sumCells.length === 2){//求和公式是当前节点字母，即当前列
                                        var indexArr  = sum.match(indexReg);
                                        var startIndex = parseInt(indexArr[0]);
                                        var endIndex = parseInt(indexArr[1]);
                                        if(nodeIndex >= startIndex && nodeIndex <= endIndex){
                                            temp = arr[i];
                                            arr[i] = arr[j];
                                            arr[j] = temp;
                                            ifExchanged = true;
                                            return false;//已互换，直接跳出each遍历
                                        }
                                    }
                                });
                                if(ifExchanged){
                                    i--;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return arr;
        };
        /**
         * 执行运算
         * */
        var _runExp = function (expData, $trs) {
            var hdNodeReg = /{[A-Za-z0-9_]+(\.[A-Za-z0-9_.\[\]=]+)*}/g;
            $.each(expData, function (i, v) {
                var exp = v;
                var expArr = exp.replace('=','#').split('#');//第一个等号改为#并分割
                var $td = _getTdByFormulaCell($trs, expArr[0]);
                var temp = expArr[1];
                temp = temp.replace(hdNodeReg, function (hdNode) {
                    return _getValueFromHd(hdNode.replace(/[{}]/g,''));
                });
                temp = temp.replace(/=/g,'==');//后续的单等号改为双等号
                temp = temp.toLocaleUpperCase().replace(/SUM3D/g, 'SUM');
                var record = _getexpress($trs, temp);
                var value = _reportEval(record);
                var $curDom = $td.find('input,select').eq(0);
                var oldValue = Number($curDom.val());
                $curDom.val(value);//设值
                _setValueByType($td.find('input,select').eq(0));//格式化
                // $curDom.blur();//若有change事件，则触发对应的change事件
                if(oldValue !== value){
                    $curDom.trigger('change.afterCalculate');
                }
            });
        };
        /**
         * 获取数据
         * */
        var _getValueByType=function($target){
            if(typeof $target!='object'){
                return 0;
            }
            var id = $target.attr('id');
            /*mini-datepicker取值*/
            if($target.hasClass('mini-datepicker')){
                return mini.get(id).getText();//获取文本值
            }
            /*mini-combobox取值*/
            else if($target.hasClass('mini-combobox')){
                return mini.get(id).getValue();//获取数据值
            }
            /*mini-treeselect取值*/
            else if($target.hasClass('mini-treeselect')){
                return mini.get(id).getText();//获取文本值
            }
            /*mini-checkboxlist取值*/
            else if($target.hasClass('mini-checkboxlist')){
                var id = $target.attr('id');
                return mini.get(id).getValue();//获取数据值
            }
            else if($target.is('input')){
                var type = $target.attr('servyou_type');
                var digit = $target.attr("digit");
                if(!digit || isNaN(digit)){
                    digit = 2;
                }else{
                    digit = parseInt(digit);
                }
                if($target.is('input[type=radio]')||$target.is('input[type=checkbox]')){
                    type='checkbox';
                }
                var result = 0;
                var curVal = $target.val() === '' ? '0.00':$target.val();//当前input的值{string}
                if(type !== 'percent' && type !== 'milli'){
                    var fixedCurVal = Number(curVal).toFixed(digit);
                }
                var fixedZero = Number(0).toFixed(digit);
                if( !type || type === 'float'){//浮点数
                    result = isNaN(curVal) ? fixedZero : fixedCurVal;
                }else if(type === "int"){//整数
                    result = isNaN(curVal) ? '0' : Number(curVal).toFixed(0)
                }else if(type === "nonnegativeInt") {//非负整数 >=0
                    result = isNaN(curVal) || parseInt(curVal)<0 ? '0' : Number(curVal).toFixed(0)
                }else if(type === "nonpositiveInt"){//非正整数 <=0
                    result = isNaN(curVal) || parseInt(curVal)>0 ? '0' : Number(curVal).toFixed(0)
                }else if(type==="nonnegative"){//非负数 >=0
                    result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : Number(curVal).toFixed(digit);
                }else if(type==="nonpositive"){//非正数 <=0
                    result = isNaN(curVal) || Number(curVal)>0 ? fixedZero : Number(curVal).toFixed(digit);
                }else if(type === "percent"){//百分数
                    if(curVal.indexOf('%') === -1){//数据不带百分号
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : Number(curVal).toFixed(digit+2);
                    }else{//数据带有百分号
                        curVal = curVal.replace(/%$/,'');
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : (Number(curVal)/100).toFixed(digit+2);
                    }
                }else if(type==="milli"){
                    if(curVal.indexOf('‰') === -1){//数据不带千分号
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : Number(curVal).toFixed(digit+3);
                    }else{//数据带有千分号
                        curVal = curVal.replace(/‰$/,'');
                        result = isNaN(curVal) || Number(curVal)<0 ? fixedZero : (Number(curVal)/1000).toFixed(digit+3);
                    }
                }else if(type==="string" || type === 'date'){
                    result = $target.val();
                    $target.attr('title',result);
                }else if(type==="checkbox"){
                    result = $target.is(':checked')?'1':'0';//此处返回主要用于表间计算
                }else{
                    result = isNaN(curVal) ? '0.00':Number(curVal).toFixed(digit);
                }
                return result;
            }else if($target.is('select')){
                result = $target.find('option:selected').attr('value');
                if(!result){
                    result = '';
                }
                return result;
            }else{
                return $target.html();
            }
        };
        /**
         * 设置数据
         * */
        var _setValueByType = function($target){
            if(typeof $target !='object'){
                return;
            }
            if($target.is('input')){
                var type = $target.attr('servyou_type');
                var digit = $target.attr("digit");
                if(!digit || isNaN(digit)){
                    digit = 2;
                }else{
                    digit = parseInt(digit);
                }
                var value = 0;
                var curVal = $target.val() === '' ? '0.00':$target.val();//当前input的值{string}
                var fixedZero = Number(0).toFixed(digit);
                if(type === "percent"){//百分数
                    if(curVal.indexOf('%') === -1){//数据不带百分号
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'%':(Number(curVal)*100).toFixed(digit)+'%';
                    }else{//数据带百分号
                        curVal = curVal.replace(/%$/g,'');
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'%':Number(curVal).toFixed(digit)+'%';
                    }
                }else if(type==="milli"){
                    if(curVal.indexOf('‰') === -1){//数据不带百分号
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'‰':(Number(curVal)*1000).toFixed(digit)+'‰';
                    }else{//数据带百分号
                        curVal = curVal.replace(/‰$/g,'');
                        value = isNaN(curVal) || Number(curVal)<0 ? fixedZero+'‰':Number(curVal).toFixed(digit)+'‰';
                    }
                }else if(!$target.is('input[type=radio]') && !$target.is('input[type=checkbox]')){
                    value = _getValueByType($target);
                }else{
                    return ;
                }
                $target.val(value).attr({'value':value, 'title':value});

                /*表间单元格无公式赋值*/
                var setToTable_Tr_Td = $target.attr('setToTable_Tr_Td');
                if(setToTable_Tr_Td){
                    var cellArr = setToTable_Tr_Td.split(',');
                    $.each(cellArr, function (i,v) {
                        var arr = v.split('_');
                        var sb_id = arr[0];
                        var trIndex = arr[1];
                        var tdIndex = arr[2];
                        var objVal = $target.val();
                        var servyou_type = $target.attr('servyou_type');
                        if(servyou_type && servyou_type === 'percent'){
                            objVal = Number(objVal.replace('%',''))/100;
                        }
                        if(servyou_type && servyou_type === 'milli'){
                            objVal = Number(objVal.replace('‰',''))/1000;
                        }
                        $(".sb_table[sb_id="+sb_id+"] tr:eq("+trIndex+") td:eq("+tdIndex+") input").val(objVal).attr('value',objVal).blur();//赋值并重新计算对应表
                    });
                }
            }else if($target.is('select')){
                var text = $target[0].selectedIndex>=0 ? $target[0].options[$target[0].selectedIndex].innerText : '';
                var selected = $target[0].selectedIndex>=0 ? $target[0].options[$target[0].selectedIndex] : null;
                for (var i=0; i<$target[0].getElementsByTagName('option').length; i++){
                    var selectNode = $target[0].getElementsByTagName('option')[i].getAttributeNode('selected');
                    !!selectNode && $target[0].getElementsByTagName('option')[i].removeAttributeNode(selectNode);
                }
                !!selected && selected.setAttribute('selected', 'selected');
                $target.attr('title',text);
            }
        };
        /**
         * 从表格中获取到对应td(在公式计算中用到)
         * */
        var _getTdByFormulaCell = function($trs,str){
            var _col,_row;
            var fnum = str;
            var _char = fnum.match(/[A-Z]+/g).join('');
            _row = fnum.replace(_char,'')-1;
            _col = lettersToNumber(_char);
            return $trs.eq(_row).find('td').eq(_col);
        };
        /**
         * 字母转数字 A->0,Z->25,AA->52
         * */
        var lettersToNumber = function (letters) {
            letters = letters.toUpperCase();
            var sum = 0;
            for(var i=0,l=letters.length;i<l;i++){
                var curLetter = letters.charAt(i);
                sum += (curLetter.charCodeAt()-64)*Math.pow(26,l-i-1);
            }
            return sum-1;
        };
        /**
         * 数字转字母 0->A,25->Z,52->AA
         * */
        var numberToLetters = function(num){
            num += 1;
            var result = [];
            while(num){
                var t = num % 26;
                if(!t){
                    t = 26;
                    -- num;
                }
                result.push(String.fromCharCode(t + 64));
                num = ~~(num / 26);
            }
            return result.reverse().join('');
        };
        var _makeArrstr = function(){
            var fnum = arguments[0];
            var _char = fnum.match(/[A-Z]+/g).join('');
            var _start = fnum.replace(_char,'');
            var _end = arguments[1].replace(_char,'');
            var arr = _makeArr(_start,_end);
            $.each(arr,function(i,v){
                arr[i] = _char+v;
            });
            return arr.join('+');
        };
        /**
         * 数字转换数组 例如 传入2,6. 则返回[2,3,4,5,6]
         * @param 起始数字，结尾数字
         * **/
        var _makeArr = function(s,e){
            if(isNaN(s) || isNaN(e)) return[];
            var start=  parseInt(s),
                end = parseInt(e);
            var result = [];
            for(var i=start;i<end+1;i++){
                result.push(i);
            }
            return result;
        };
        var _getExpArr = function(record){
            record = record.replace(/{[A-Za-z0-9_]+(\.[A-Za-z0-9_.\[\]=]+)*}/g,'');//去除从核定取值的字符串，如{wsxxs.wsxx[code=BQYSHWYJ1].value}
            var regexp = /[A-Z]+\d+/g;
            var regexp2 = /[A-Z]+\d+:[A-Z]+\d+/g;
            var _record = record;
            var regarr2 = _record.match(regexp2);
            if(regarr2){
                for(var i=0;i<regarr2.length;i++){
                    var _str = _makeArrstr(regarr2[i].split(':')[0],regarr2[i].split(':')[1]);  //处理   F2	3,5
                    _record = _record.replace(new RegExp(regarr2[i],"g"),_str);
                }
            }

            var regarr = _record.match(regexp); //['A1','A2']   obj[A1]
            if(!$.isArray(regarr)){
                return [_record];
            }
            return _unique(regarr);
        };
        var _unique = function(arr){
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
         * 校验record
         * */
        var _checkSaveRecord = function(record){
            if(record['Formula']){
                var formula = _getExpressForRecord(record,record['Formula']);
                var _express = formula.replace(/=/g,'==').replace(/<==/g,'<=').replace(/>==/g,'>=').replace(/<>/g,'!=');
                var ifError = _reportEval(_express);
                var checkresult = record['Range']=='false' ? false : true;
                if(ifError === checkresult){
                    //获取record中所有涉及的dom元素 进行报错显示
                    var doms = _getAllDOM(record,record['Formula']);
                    _addErrors(doms);
                    var new_msg = _getExpressForMsg(record,record['Emsg']);
                    mini.alert(new_msg);
                    mini.get('tabs') && mini.get('tabs').activeTab(table._sb_id);//切换到对应tab
                }
                return !(ifError === checkresult);
            }
        };
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
        var _checkMustFillRecord = function (record) {
            var val = _getValueForRecord(record['Col']+','+record['Row']).trim();
            if(!val){
                var $td = _getTdForRecord(record['Col']+','+record['Row']);
                $td.addClass('report_error');
                mini.alert(record['Describe']+'不能为空！');
                return false;
            }
            return true;
        };
        /**
         * 获取data.json中公式代入数据后的表达式
         * */
        var _getexpress = function($trs,formula){
            var regexp = /[A-Z]+\d+/g;
            var regexp2 = /[A-Z]+\d+:[A-Z]+\d+/g;

            var _formula = formula;

            var regarr2 = _formula.match(regexp2);
            if(regarr2){//sum(A1:A13)
                for(var i=0;i<regarr2.length;i++){
                    var _str = _makeArrstr(regarr2[i].split(':')[0],regarr2[i].split(':')[1]);  //处理   F2	3,5
                    _formula = _formula.replace(new RegExp(regarr2[i],"g"),_str);
                }
            }

            var _formulaCells = _formula.match(regexp);  //['A1','A2']   obj[A1]
            var str = _formula;
            if(!$.isArray(_formulaCells)){
                return _formula;
            }
            for(var i=0, l=_formulaCells.length; i<l; i++){
                var formulaCell = _formulaCells[_formulaCells.length-1-i];       //A1
                var $td = _getTdByFormulaCell($trs,formulaCell);  //处理   F2	3,5
                var value = '0';
                if($td.find('select').length>0){
                    value = _getValueByType($td.find('select'));
                    if(!value && $td.find('select').attr('selectValueType') !== 'string'){
                        value = '0.00';
                    }
                }else if ($td.find('[class*=mini]').length > 0){
                    value = _getValueByType($td.children());
                }else if($td.find('input').length>0){
                    value = _getValueByType($td.find('input'));
                }
                str = str.replace(new RegExp(formulaCell+'(?!\\d)',"g"),value);
            }
          str = str.replace(/\bor\b/ig,'||').replace(/--/g,'+').replace(/\band\b/ig,'&&').replace(/\bIF\b/ig,'getIF').replace(/\bround\b/ig,'Round').replace(/<==/g,'<=').replace(/>==/g,'>=');
            return str;
        };
        /**
         * 获取核定某节点的数据
         * */
        var _getValueFromHd = function (str) {//wsxxs.wsxx[code=BQYSHWYJ].value
            var key;
            var bracketReg = /\[[A-Za-z0-9_]+(=[A-Za-z0-9_]+)?\]/g;//匹配[code=BQYSHWYJ]
            var replaceReg = /(\[code=)|(\])/g;
            //文书信息和历史信息可以直接从servyouReport中获取
            if(str.indexOf('wsxxs.wsxx[code=') !== -1){
                key = str.match(bracketReg)[0].replace(replaceReg,'');
                return servyouReport.wsxxMap[key];
            }else if(str.indexOf('lsxxs.lsxx[code=') !== -1){
                key = str.match(bracketReg)[0].replace(replaceReg,'');
                return servyouReport.lsxxMap[key];
            }
            //其余核定节点逐层获取
            var value = undefined;
            var nodeArr = str.split('.');
            $.each(nodeArr, function (i, node) {
                value = _getHdNodeValue(node,value);
            });
            if(!value){
                value = '0.00';
            }
            return value;
        };
        /**
         * 获取核定节点值
         * */
        var _getHdNodeValue = function(nodeName,parentValue) {
            var value;
            var bracketReg = /\[[A-Za-z0-9_]+(=[A-Za-z0-9_]+)?\]/g;
            parentValue = parentValue !== undefined ? parentValue:servyouReport.hd;
            var bracketArr = nodeName.match(bracketReg);
            if(bracketArr && bracketArr.length === 1){//存在wsxx[code=YQSB]
                var fatherNode = nodeName.replace(bracketArr[0],'');
                var childNode = bracketArr[0].replace(/[\[\]]/g,'');
                value = _getHdNodeValue(childNode,_getHdNodeValue(fatherNode,parentValue));
            }else if(parentValue instanceof Array){//父节点为数组
                var nodeArr = nodeName.split('=');
                var key = nodeArr[0];
                var val = nodeArr[1];
                if(isNaN(nodeName)){//索引节点为属性
                    $.each(parentValue, function (i,obj) {
                        if(obj[key] === val){
                            value = obj;
                            return false;
                        }
                    });
                }else{//索引节点为数字
                    value = parentValue[parseInt(nodeName)];
                }
            }else if(parentValue instanceof  Object){//父节点为对象
                value = parentValue[nodeName];
            }
            return value;
        };
        /**
         * xml单节点转json
         * parmas {document} record
         * result {object} json
         * */
        var _turnToJson = function(record){
            if(typeof record != 'object') return {};
            var _recordAttr = record.attributes;
            var json = {};
            $.each(_recordAttr,function(i,attr){
                var name =attr.nodeName;
                var value = attr.nodeValue;
                json[name] = value;
            });
            return json;
        };
        /**
         * json属性首字母大写
         * */
        var _toUpCase = function(d){
            var tmpChar,postString,_pop;
            if(d.formula|| d.conditions){
                for(var pop in d){
                    tmpChar = pop.match(/[A-Z]+/g)[0].toUpperCase();
                    postString = pop.match(/\d+/g)[0];
                    _pop = tmpChar + postString;
                    d[_pop] = d[pop];
                }
            }
            return d;
        };
        var _getExpressForMsg = function (record,msg) {
            var cellWithBracketReg = /\[[A-Za-z0-9\+\-\*\/%\s]+\]|【[A-Za-z0-9\+\-\*\/%\s]+】/g;
            var cellReg = /[A-Za-z]+\d+/g;
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
         * 获取cfg中公式代入数据后的表达式
         * @param {object} record
         * @param {string} formula
         * **/
        var _getExpressForRecord = function(record,formula){
            var regexp = /[A-Z]+\d+/g;
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
            formula = formula.replace(/\bor\b/ig,'||').replace(/\bAND\b/ig,'&&').replace(/\bIF\b/ig,'getIF').replace(/\bround\b/ig,'Round');
            return formula;
        };
        /*
         * 获取record中对应字段的值
         * */
        var _getValueForRecord = function(str) {

            var value;
            if(str.indexOf('WSXXS') !== -1) {//A1="WSXXS.[HDZSFS]"
                var key = str.replace(/(WSXXS.\[)|(\])/g,'');
                value = servyouReport.wsxxMap[key];
            }else if(str.indexOf('LSXXS') !== -1) {//A1="LSXXS.[HDZSFS]"
                var key = str.replace(/(LSXXS.\[)|(\])/g,'');
                value = servyouReport.lsxxMap[key];
            }else if(str.indexOf('FUNC') !== -1){
              var key = str.replace(/(FUNC.\[)|(\])/g,'');
              value = eval(key);
            }else{//A1="2,9"或A1="001|2,9"
                value = _getValByTable(str);  //处理   F2	3,5
            }
            return value;
        };
        /**
         * 通过WSXX来获取数据
         * params  {string} str
         * ***/
        /*var _getValByWSXX = function(str){
            var result = 0;
            if(str.indexOf('WSXXS') !== -1){
                var startIndex = str.indexOf('[')+1;
                var endIndex = str.indexOf(']');
                var code = str.substring(startIndex,endIndex);
                result = hdxxUtil.getWsxxValueByCode(code,servyouReport.hd);
            }
            return result;
        };*/
        /**
         * 通过表格获取数据
         * */
        var _getValByTable = function(str){
            var $td =_getTdForRecord(str);
            if($td.length === 0){
                return '0.00';
            }
            var $dom = $td.children().eq(0);
            if($dom.length === 1){
                var val = _getValueByType($dom);
                if($dom.is('select') && !val && $dom.attr('selectValueType') === 'number'){//数据类型默认为string，特殊设置为number时，才处理
                    val = '0.00';
                }
                return val;
            }else{
                return '0.00';
            }
        };
        /**
         * 获取record中对应单元格的td，如A1="001|2,9"
         * */
        var _getTdForRecord = function (str) {
            str = str.replace('(string)','');
            var sb_id = table._sb_id;
            if(str.indexOf('|') !== -1 && str.split('|')[0].trim() !== ''){//A1="001|2,9"
                sb_id = str.split('|')[0];
                str = str.split('|')[1];
            }
            var td_tr_index = str.split(',');
            var tdIndex = parseInt(td_tr_index[0]);
            var trIndex = parseInt(td_tr_index[1]);
            var $td = $('table[sb_id="'+sb_id+'"] tr:eq('+trIndex+') td:eq('+tdIndex+')');
            return $td;
        };
        /**
         * 获取record中所有相关单元格的dom节点
         * */
        var _getAllDOM = function (record, formula) {
            var cellReg = /[A-Za-z]+\d+/g;
            var formulaCells = formula.match(cellReg);
            var $tds = [];
            if(!!formulaCells){
                $.each(formulaCells, function (i, cell) {
                    $tds.push(_getTdForRecord(record[cell]));
                });
            }
            return $tds;
        };
        /**
         * 添加报错样式
         * */
        var _addErrors = function (tdArr) {
            $.each(tdArr, function () {
                !$(this).hasClass('report_error') && $(this).addClass('report_error');
            });
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
            var newstr = str.replace(/--/g,'+').replace(/\bSTRLEN\b/ig,'strlen').replace(/\bSUM\b/ig,'sum')
              .replace(/\bor\b/ig,'||').replace(/\bAND\b/ig,'&&').replace(/<>/g,'!=')
              .replace(/\bROUND\b/ig,'round').replace(/\btrimleft\b/ig,'TRIMLEFT')
              .replace(/\bnot\b/ig,'!').replace(/\bABS\b/ig,'abs').replace(/\bMAX\b/ig,'max')
              .replace(/\bMIN\b/ig,'min');
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

        return {
            /**
             * 初始化table
             * */
            init: function (sb_id, hd, localFormula) {
                table._init(sb_id, hd, localFormula);
            },
            /**
             * 添加行
             * */
            addRows: function (index, rowCount, html) {
                table._addRows(index, rowCount, html);
            },
            /**
             * 删除一行
             * */
            deleteRow: function (index) {
                table._deleteRow(index);
            },
            /**
             * 获取公式
             * */
            getFormulas: function () {
                return table._formulas;
            },
            /**
             * 设置公式
             * */
            setFormulas: function (formulas) {
                table._setFormulas(formulas);
            },
            /**
             * 添加公式
             * */
            addFormulas: function (formulaList) {
                table._addFormulas(formulaList);
            },
            /**
             * 删除公式
             * */
            deleteFormulas: function (formulaList) {
                table._deleteFormulas(formulaList);
            },
            /**
             * 计算全部
             * */
            calculateAll: function () {
                table._calculateAll();
                if(table._isFirstCalAll){
                    table._isFirstCalAll = false;
                }
            },
            /**
             * 计算全部---更正专用
             * */
            calculateAllForCorrect: function () {
                if(table._isFirstCalAll){
                    table._calculateAll();
                    table._isFirstCalAll = false;
                }
            },
            /**
             * 校验cfg
             * */
            checkCfg: function () {
                return table._checkCfg();
            },
            /**
             * 校验DoShowMessage
             * */
            checkDoShowMessage: function () {
                return table._checkDoShowMessage();
            },
            /**
             * 格式化所有input中的数据
             * */
            formatAllData: function () {
                table._formatAllData();
            },
            getValueByType:function ($target) {
                return _getValueByType($target);
            },
            setValueByType:function ($target) {
                return _setValueByType($target);
            },
            getCacheByType: function (type) {
                return table._cache[type];
            },
            /**
             * 添加cfg校验
             * */
            addRecordsByType: function (type,records) {
                if(!records instanceof Array){
                    return ;
                }
                $.each(records, function (i,record) {
                    table._cache[type].push($(record)[0]);
                })
            },
            /**
             * 校验数据
             * */
            validValue: function ($target) {
                return _validValue($target);
            },
            /**
             * 执行公式
             * @param record
             */
            reportEval :function(record){
                return _reportEval(record);
            },
            /**
             * 设置toolTip
             */
            setToolTips: function (toolTips) {
                table._setToolTips(toolTips);
            },
            /**
             * 添加toolTip
             */
            addToolTips: function (toolTips) {
                table._addToolTips(toolTips);
            },
            /**
             * 删除toolTip
             */
            deleteToolTips: function (tdList) {
                table._deleteToolTips(tdList);
            }
        };
    };


    /**
     * 申报框架
     * */
    var servyouReport = (function () {
        var report = {
            /**
             * Attributes
             * */
            nsrsbh: '',//纳税人识别号
            nsrmc: '',//纳税人名称
            nsrData: null,//纳税人基本信息
            gsNsrData:null,//国税纳税人基本信息
            sbzlDm: '',//申报种类代码
            sb_id: '',//报表id
            /**
             * 报表默认的sb_id
             * （正常流程下，框架直接去单表页面中第一张表上所配置的sb_id属性值，因为页面只有一张表；
             * 但如果单表页面有多张表，且sb_id并非页面上第一张表上所配置的sb_id属性值时，就通过配置
             * defalutSbId来进行设置）
             * */
            defalutSbId: '',
            tbrq: '',//填表日期
            sssqq: '',//所属时期起
            sssqz: '',//所属时期止
            hd: '',//核定Object
            wsxxMap: {},//文书信息{key,value}
            lsxxMap: {},//历史信息{key,value}
            useResumeData: false,//是否使用后台返回的html和公式
            notNeedJ3Xml: false,//是否不需要组织金三报文----一表集成时，则不需要组织所有金三报文
            htmlYsbz: 'N',// 保存，暂存对于html是否进行base64压缩
            resumeHtmlYsbz: 'N',//还原的html是否进行了base64的压缩
            saveSuccessMsg:'保存成功！',
            tempSaveSuccessMsg: '暂存成功！',
            isNotReport: false,//非申报表，但又使用了申报框架的，将该字段置为true，则不会执行具体的初始化
            /**
             * 业务类型
             * report（正常申报），默认
             * preview（查看申报表）
             * resume（暂存还原）
             * correct（更正申报）
             * past（往期申报）
             * overdue（逾期申报）
             * */
            businessType: 'report',
            sblxDm: parent.yearReport?parent.yearReport.sblxDm: '11',//申报类型代码，默认11正常申报，03为更正申报
            tables: {},//所有表对象
            j3Xmls: {},//金三报文
            j3CorrectXml: parent.yearReport?parent.yearReport.j3CorrectXml: null,//金三更正申报返回的报文
            isResumeFromXml: false,//是否根据报文回写数据
            isClick: [],//已点击表list
            sbIdNotFromHd:[],
            outerTableConfig: null,//Object外部报表---用于复用完全一致或者稍有不同的报表
            resumeData: null,//后台获取到的暂存数据
            autoAddAllId: false,//自动为页面中的input和select添加id
            fromCheckDataMap: {},//来自缓存数据的配置 key:10_2,value:027_11_3  如：{'10_2':'027_11_3'}
            changedJ3Xml:{},// 保存自动转好的报文
            mock:false,//是否使用假数据
            isInitDone: false,//是否初始化完成
            replaceSelector: 'span[fromMiniId]',//用于数据还原或者查看时，mini组件span的选择器
            reportBtns: [
                {
                    id: 'sb_save',
                    cls: 'btn btn-blue',
                    text: '保存',
                    callback: function () {
                        servyouReport.save();
                    },
                    whenToShow: 'report,resume,correct,past,overdue'
                },
                {
                    id: 'sb_tempSave',
                    cls: 'btn btn-blue',
                    text: '暂存',
                    callback: function () {
                        servyouReport.tempSave();
                    },
                    whenToShow: 'report,resume,correct,past,overdue'
                },
                {
                    id: 'sb_close',
                    cls: 'btn btn-white',
                    text: '取消',
                    callback: function () {
                        servyouReport.closeWindow('close');
                    },
                    whenToShow: 'report,resume,correct,past,overdue'
                },
                {
                    id: 'sb_print',
                    cls: 'btn btn-blue',
                    text: '打印',
                    callback: function () {
                        servyouReport.print();
                    },
                    whenToShow: 'preview'
                }
            ],
            showToolTips: false,//是否使用toolTip
            /**
             * 初始化入口
             * */
            init: function (mock) {
                this.mock = mock || false;
                if(this.mock){
                    this.mockInit();
                    return ;
                }
                var href = window.location.href;
                if(href.indexOf('preview=Y') !== -1){
                    /*if(parent.Tools.getUrlParamByName('correct') === 'Y'){//如果是更正申报的查看，则sblxDm为03
                        this.sblxDm = '03';
                    }*/
                    if(parent.Tools.getUrlParamByName('preview') !== 'Y'){//如果是申报过程中的查看，则移除打印按钮
                        this.removeReportBtnById('sb_print');
                    }
                    this.businessType = 'preview';
                    this.replaceSelector = 'span[fromMiniId][data-isCheckboxList="Y"]';
                    this.renderReportBtns();
                    this.sb_id = this.defalutSbId || $('table[type="sb"]').attr('sb_id');//报表id
                    var request = {
                        djxh: parent.yearReport.gsNsrData.djxh,
                        sbzlDm: parent.yearReport.sbzlDm,
                        bbid: this.sb_id,
                        sssqQ: parent.yearReport.sssqq,
                        sssqZ: parent.yearReport.sssqz,
                        sblxDm: this.sblxDm
                    };
                    this.resumeData = sbcommon.getResumeData_year(request);
                    if(!this.resumeData){
                        //更正申报时，第一次进来，没有html数据，需要提示
                        parent.Tools.getUrlParamByName('correct') === 'Y' && mini.alert('您尚未在本系统保存过当前报表，请先填写（或修改）并保存此表！','提示',function () {
                            servyouReport.closeWindow('close');
                        });
                        return ;
                    }
                    var htmlData = mini.decode(this.resumeData['jsonData']['htmlData']);
                    this.preview(htmlData);
                    return ;
                }else if(href.indexOf('edit=Y') !== -1){
                    this.businessType = 'report';
                }else if(href.indexOf('modify=Y') !== -1 && parent.yearReport.businessType == 'correct'){
                    this.businessType = 'correct';
                }else if(href.indexOf('modify=Y') !== -1){
                    this.businessType = 'resume';
                }
                if(this.isNotReport){
                    this.businessType = 'report';
                }
                //next step
                this.bindTabChangeEvent();//必须绑定在检测是否有暂存数据前，否则初始化时，allClick数组中没有第一张表的id
                this.setNsrData();
            },
            /**
             * 启用假数据时的初始化入口（业务类型判断比较麻烦，所以又单独写了一个）
             * */
            mockInit: function () {
                var href = window.location.href;
                if(href.indexOf('preview=Y') !== -1){
                    /*if(Tools.getUrlParamByName('correct') === 'Y'){
                        this.sblxDm = '03';
                    }*/
                    this.businessType = 'preview';
                    this.renderReportBtns();
                    this.sb_id = this.defalutSbId || $('table[type="sb"]').attr('sb_id');//报表id
                    var request = {
                        djxh: parent.yearReport.gsNsrData.djxh,
                        sbzlDm: parent.yearReport.sbzlDm,
                        bbid: this.sb_id,
                        sssqQ: parent.yearReport.sssqq,
                        sssqZ: parent.yearReport.sssqz,
                        sblxDm: this.sblxDm
                    };
                    this.resumeData = sbcommon.getResumeData_year(request);
                    var htmlData = this.resumeData['jsonData']['htmlData'];
                    this.preview(htmlData);
                    return ;
                }else if(href.indexOf('edit=Y') !== -1){
                    this.businessType = 'report';
                }else if(href.indexOf('modify=Y') !== -1){
                    this.businessType = 'resume';
                }else if(href.indexOf('correct=Y') !== -1){
                    this.businessType = 'correct';
                }
                if(this.isNotReport){
                    this.businessType = 'report';
                }
                //next step
                this.bindTabChangeEvent();//必须绑定在检测是否有暂存数据前，否则初始化时，allClick数组中没有第一张表的id
                this.setNsrData();
            },
            /**
             * tab change事件
             * */
            bindTabChangeEvent: function () {
                var that = this;
                mini.get('tabs').on('activechanged', function (tab) {
                    if(typeof that['activeTab_'+tab.name] === 'function'){
                        that['activeTab_'+tab.name].apply(that,[]);
                    }
                    var $tabBody = $(tab.sender.getTabBodyEl(tab.name));
                    if(that.isClick.indexOf(tab.name) === -1 && $tabBody.find('table[type="sb"]').length>0){
                        that.isClick.push(tab.name);
                    }
                });
            },
            /**
             * 设置纳税人数据
             * */
            setNsrData: function () {
                if(this.mock){
                    this.nsrData = this.getLocalJson(this.mockApi['nsrData']);
                    this.gsNsrData = mini.clone(this.nsrData);
                }else{
                    this.nsrData = parent.yearReport.nsrData;
                    this.gsNsrData = parent.yearReport.gsNsrData;
                }
                this.djxh = this.nsrData.djxh;
                this.nsrsbh = this.nsrData.nsrsbh;
                this.nsrmc = this.nsrData.nsrmc;
                //next step
                this.setHd();
            },
            /**
             * 设置核定数据
             * */
            setHd: function () {
                //匹配金三报文节点上的属性以及最前面的xml节点
                var xmlReg = /((<\?xml[^<]*)|(([a-zA-Z0-9:]+)(="[^"]*")+)|(\s{2,}))/g;
                if(this.mock){
                    if(this.businessType === 'correct'){
                        var correctData = this.getLocalJson('../config/correct.json');//模拟更正申报
                        this.pzxh = correctData.pzxh;
                        this.j3CorrectXml = xmlUtil.turnStrToXml(correctData.sbxx.replace(xmlReg,''));
                        this.hd = hdxxUtil.getSbzlNode(correctData.hdxx);
                        // this.sblxDm = '03';
                    }else{
                        this.hd = this.getLocalJson(this.mockApi['hd']);
                        // this.sblxDm = '11';
                    }
                }else{
                    if(this.businessType === 'correct'){
                        this.j3CorrectXml = parent.yearReport.j3CorrectXml;
                    }
                    // this.sblxDm = parent.yearReport.sblxDm;
                    this.hd = parent.yearReport.hd;
                }
              this.setCommonData();
              if(this.outerTableConfig && this.outerTableConfig[this.sb_id]){
                this.initMiniTab([this.sb_id]);
              }
              //next step
              if(this.preCondition()){
                  this.chooseToGo();
              }
            },
            initMiniTab: function (sbIds) {
              var miniTab = mini.get('tabs');
              var that = this;
              $.each(sbIds, function (i, id) {
                var url = 'table_' + id + '.html';
                if (that.outerTableConfig && that.outerTableConfig[id]) {
                  url = that.outerTableConfig[id].preUrl + url;
                  var jsUrl = that.outerTableConfig[id].jsUrl;
                  if (jsUrl) {
                    /*var script = document.createElement('script');
                    var body = document.getElementsByTagName('body')[0];
                    jsUrl += '?_=' + new Date().getTime();
                    script.type = 'text/jacascript';
                    script.src = jsUrl;
                    body.appendChild(script);*/
                    jsUrl += '?_=' + new Date().getTime();
                    $('body').append('<script src="' + jsUrl + '"></script>')
                  }
                }
                var html = that._loadTabTemplate(url);
                var title = $(html).find('table[type="sb"]').attr('sb_title');
                //add tab
                var tab = {title: title, name: id};
                tab = miniTab.addTab(tab);
                //tab body
                var el = miniTab.getTabBodyEl(tab);
                el.innerHTML = html;
              });
              if (miniTab.getTabs().length > 0) {
                var defaultIndex = miniTab.defaultIndex ? Number(miniTab.defaultIndex) : 0;
                if (defaultIndex && miniTab.getTabs().length > defaultIndex) {
                  miniTab.activeTab(defaultIndex);
                } else {
                  miniTab.activeTab(0);
                }
              }
              mini.parse();
            },
            /**
             * 加载html模板
             * */
            _loadTabTemplate: function (url) {
              var html='';
              $.ajax({
                url: url,
                type: 'GET',
                async: false,
                dataType: 'html',
                success: function (response) {
                  html = response;
                },
                error: function () {
                  console.log('加载html出错');
                }
              });
              return html;
            },
            /**
             * 设置公共数据（申报种类代码，所属时期，填表日期）
             * */
            setCommonData: function () {
                this.sbzlDm = this.hd['sbzlxlcode'] || this.hd['sbzlcode'];	//申报种类代码
                this.sb_id = this.defalutSbId || $('table[type="sb"]').attr('sb_id');//报表id
                this.sssqq = this.hd['sksssqQ'];	//所属时期起
                this.sssqz = this.hd['sksssqZ'];	//所属时期止
                this.tbrq = Date.getLocalDate().format('yyyy-MM-dd');//填表日期
                this._setWsxxAndLsxxMap(this.hd);//将所有wsxx和lsxx节点，整理成map形式{key: value}
            },
            preCondition: function () {
                return true;
            },
            chooseToGo: function () {
                if(this.businessType === 'resume' || this.businessType === 'correct'){
                    var request = {
                        djxh: this.gsNsrData.djxh,
                        sbzlDm: this.sbzlDm,
                        bbid: this.sb_id,
                        sssqQ: this.sssqq,
                        sssqZ: this.sssqz,
                        sblxDm: this.sblxDm
                    };
                    this.resumeData = mini.decode(sbcommon.getResumeData_year(request));
                    if(this.resumeData){
                      this.businessType = 'resume';//不论更正申报还是暂存还原，只要数据库中存在暂存数据，就走暂存还原的流程
                      this.useResumeData = true;
                    }
                }
                this.run();
            },
            /**
             * 运行框架
             * */
            run: function () {
                var that = this;
                var sb_url = $('table[type="sb"]:eq(0)').attr('sb_url')+'/';
                var localFormulas = null;
                var localToolTips = null;
                if(!this.useResumeData){
                  if(that.outerTableConfig && that.outerTableConfig[that.sb_id]){
                    $('table[outer-table="Y"]').each(function () {
                      var curSbUrl = $(this).attr('sb_url')+'/';
                      if(that.outerTableConfig[that.sb_id].configUrl){
                        curSbUrl = that.outerTableConfig[that.sb_id].configUrl + '/';
                      }
                      var curFormulas = xmlUtil.loadFileByPath(curSbUrl + 'formulas.json','json');
                      localFormulas = $.extend({}, localFormulas, curFormulas)
                    });
                  }else{
                    localFormulas = xmlUtil.loadFileByPath(sb_url + 'formulas.json','json');
                  }
                    if (this.showToolTips){
                        if(that.outerTableConfig && that.outerTableConfig[that.sb_id]){
                            $('table[outer-table="Y"]').each(function () {
                                var curSbUrl = $(this).attr('sb_url')+'/';
                                if(that.outerTableConfig[that.sb_id].configUrl){
                                    curSbUrl = that.outerTableConfig[that.sb_id].configUrl + '/';
                                }
                                var curToolTips = xmlUtil.loadFileByPath(curSbUrl + 'toolTips.json','json');
                                localToolTips = $.extend({}, localToolTips, curToolTips)
                            });
                        }else{
                            localToolTips = xmlUtil.loadFileByPath(sb_url + 'toolTips.json','json');
                        }
                    }
                }
                $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    if(!that.notNeedJ3Xml){
                      if($(this).attr('outer-table') === 'Y'){
                        var curSbUrl = $(this).attr('sb_url')+'/';
                        if(that.outerTableConfig && that.outerTableConfig[that.sb_id] && that.outerTableConfig[that.sb_id].configUrl){
                          curSbUrl = that.outerTableConfig[that.sb_id].configUrl + '/';
                        }
                        that.j3Xmls[sb_id]= xmlUtil.loadFileByPath(curSbUrl + sb_id + '_j3.xml','xml');
                      }else{
                        that.j3Xmls[sb_id]= xmlUtil.loadFileByPath(sb_url + sb_id + '_j3.xml','xml');
                      }
                    }
                    that.tables[sb_id] = Table();
                    if(!that.useResumeData){
                        that.tables[sb_id].init(sb_id, that.hd, localFormulas[sb_id]);
                        if (that.showToolTips){
                            that.tables[sb_id].setToolTips(localToolTips[sb_id] || null);
                        }
                    }else{
                        that.tables[sb_id].init(sb_id, that.hd, null);
                        if (that.showToolTips){
                            var tip = new mini.ToolTip();
                            tip.set({
                                target: document,
                                selector: '[data-tooltip]'
                            });
                        }
                    }
                });
                this.renderReportBtns();
                this.bindCommonEvent();
                //若配置了该属性为true,则为所有input和select都加上id
                if(this.autoAddAllId && !this.useResumeData){
                    this.setIdForAllInputAndSelect();//自动为所有input和select添加id
                }
                this.customInitLocalData();//本地变量或者对象属性的初始化可以放到这里,miniui下拉框或者下拉树的初始化数据【必须】在这里进行初始化
                this.customEvent();//自定义事件要放在自定义初始化前，自定义初始化中可能用到其中的事件
                if(!this.useResumeData){//未使用暂存数据
                    if(this.businessType === 'correct' || (parent.yearReport && parent.yearReport.excelImported && this.businessType === 'resume')){ // 类型是更正申报
                        this.resumeFromXml(); // 使用金三报文更正申报
                    }
                    this.customInit();//自定义初始化与期初核定无关的内容
                    this.customInitFromHd();//自定义初始化任何与期初核定相关的内容（与核定相关的初始化必须写在这里）
                }else if(this.useResumeData && this.businessType === 'correct'){//使用了暂存数据且是更正申报
                    this.resume();//暂存还原
                    this.customInitFromHd();//期初相关初始化仍须执行
                }else{//使用了暂存数据且不是更正申报
                    this.resume();//暂存还原
                }
                this.renderCommonData();
                this.setFromCheckDataConfig();
                this.setDataFromCheckData();
                this.afterInit();
                this.afterInitForCorrect();
                this.isInitDone = true;
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
             * 渲染底部按钮
             * */
            renderReportBtns: function () {
                this.customReportBtns();//自定义申报按钮的配置
                var that =  this;
                if(this.reportBtns && this.reportBtns instanceof Array){
                    $.each(this.reportBtns, function () {
                        if($('#'+this.id).length !== 0){
                            $('#'+this.id).remove();
                        }
                        if(this.whenToShow.indexOf(that.businessType) !== -1){
                            var a = document.createElement('a');
                            a.id=this.id||'';
                            a.className=this.cls||'';
                            a.innerText=this.text||'';
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
             * 自定义申报按钮的配置
             * */
            customReportBtns: function(){

            },
            /**
             * 配置来自缓存数据对象
             * */
            setFromCheckDataConfig: function () {

            },
            /**
             * 根据缓存配置对象将数据从缓存中设值到页面
             * */
            setDataFromCheckData: function () {
                var that = this;
                $.each(this.fromCheckDataMap, function (to, from) {
                    var toArr = to.split('_');
                    var fromArr = from.replace('_',',').split(',');
                    var toTrIndex = toArr[0];
                    var toTdIndex = toArr[1];
                    var fromTableSbId = fromArr[0];
                    var fromKey = fromArr[1];
                    var checkDataValue = that.getValueFromCheckData(fromTableSbId, fromKey);
                    $('table[type="sb"] tr:eq('+toTrIndex+') td:eq('+toTdIndex+') input').val(checkDataValue).attr('value',checkDataValue).blur();
                });
            },
            /**
             * 设置数据到缓存中
             * */
            setDataIntoCheckData: function () {
                var obj = {};
                return obj;
            },
            /**
             * 根据报表id和key从主列表页面的缓存数据中取数
             * */
            getValueFromCheckData: function (sb_id, key) {
                var value = '0.00';//默认返回'0.00'
                try{
                    var checkData = parent.yearReport.sb_data[sb_id].checkData;
                    if(checkData && checkData[key] !== undefined){
                        value = checkData[key];
                    }else{
                        console.log('没有找到'+sb_id+'表所对应key为'+key+'的值');
                    }
                }catch (e){
                    console.log('没有找到'+sb_id+'表所对应key为'+key+'的值');
                }finally{
                    return value;
                }
            },
            /**
             * 初始化完之后
             * */
            afterInit: function () {},
            /**
             * 格式化所有input，select数据，计算所有表公式，触发所有change事件--更正专用
             * */
            afterInitForCorrect: function () {
                if(this.isResumeFromXml){
                    this.resumeXmlAfterInit();
                    this.formatAllData();//格式化所有数据
                    $('table[type="sb"]').find('td>input,td>select').change();//触发所有change事件
                    $.each(this.tables, function () {
                        this.calculateAllForCorrect();//计算所有公式
                    });
                    this.triggerEventForCorrect();
                }
            },
            /**
             * 存在动态生成行时，需要在此回写xml数据
             * */
            resumeXmlAfterInit: function () {
                var _this = this;
                $.each(this.tables, function (sb_id, table) {
                    if(typeof _this['resumeXmlAfterInit_'+sb_id] === 'function'){
                        _this['resumeXmlAfterInit_'+sb_id].apply(_this,[]);
                    }
                })
            },
            /**
             * 更正最后触发特定组件的事件
             * */
            triggerEventForCorrect: function () {

            },
            /**
             * 绑定公共事件
             * */
            bindCommonEvent: function () {
                //radio点击，checkbox点击，同时checkbox支持实现单选功能
                $('body').on('click','input[type="checkbox"],input[type="radio"]', function () {
                    var type = $(this).attr('type');
                    var name = $(this).attr('name');
                    var multiSelect = $(this).attr('multiSelect');
                    if(this.checked){
                        $(this).attr('checked','checked');
                        if(type === 'radio' || (type === 'checkbox' && multiSelect === 'false')){
                            $('input[name="'+name+'"]').not(this).each(function () {
                                this.checked = false;
                                $(this).removeAttr('checked').change();
                            });
                        }
                    }else{
                        $(this).removeAttr('checked');
                    }
                });
                //textarea
                $('body').on('change', 'textarea', function () {
                  $(this).html($(this).val().replace(/</g, '&lt;').replace(/>/g, '&gt;'));
                });
            },
            /**
             * 渲染公共数据到页面
             * */
            renderCommonData: function () {
                $('.nsrsbh').html(this.nsrsbh).attr('title',this.nsrsbh);
                $('.nsrmc').html(this.nsrmc).attr('title',this.nsrmc);
                $('.sssqq').html(this.sssqq).attr('title',this.sssqq);
                $('.sssqz').html(this.sssqz).attr('title',this.sssqz);
                $('.tbrq').html(this.tbrq).attr('title',this.tbrq);
            },
            /**
             * 自定义初始化与期初相关的数据（由于更正申报，所以与期初相关的初始化必须与其他的初始化独立开来）
             * */
            customInitFromHd: function () {

            },
            /**
             * 初始化本地数据
             * （本地变量或者对象属性的初始化可以放到这里,miniui下拉框或者下拉树的初始化数据【必须】在这里进行初始化）
             * （原因：暂存还原或者更正申报，会不执行或者少执行初始化方法）
             * */
            customInitLocalData: function(){

            },
            /**
             * 自定义的初始化
             * */
            customInit: function () {},
            /**
             * 自定义事件
             * */
            customEvent: function () {},
            /**
             * 添加公式
             * */
            addFormulas: function (sb_id, formulaList) {
                this.tables[sb_id].addFormulas(formulaList);
            },
            /**
             * 删除公式
             * */
            deleteFormulas: function (sb_id, formulaList) {
                this.tables[sb_id].deleteFormulas(formulaList);
            },
            /**
             * 添加cfg校验
             * */
            addRecordsByType: function (sb_id, type, records) {
                this.tables[sb_id].addRecordsByType(type, records);
            },
            /**
             * table下第index个tr位置增加rowCount行
             * @param {string} sb_id
             * @param {number} index
             * @param {document} html
             * @param {number} rowCount
             * */
            addRows: function (sb_id, index, rowCount, html) {
                this.tables[sb_id].addRows(index, rowCount, html);
            },
            /**
             * 删除一行
             * */
            deleteRow: function (sb_id, index) {
                this.tables[sb_id].deleteRow(index);
            },
            /**
             * 校验是否所有tab标签都已点击
             * */
            checkAllClicked: function () {
                var $allTables = $('table[type="sb"]');
                var that = this;
                if(this.isClick.length < $allTables.length){
                    var errorMsgArr = ['您还有<span class="txt-red">'+($allTables.length-this.isClick.length)+'</span>张表尚未填写：'];
                    $allTables.each(function (i, tableDom) {
                        var sb_id = $(tableDom).attr('sb_id');
                        //选填表的tab切可以不点击
                        if(that.isClick.indexOf(sb_id) === -1 && that.sbIdNotFromHd.indexOf(sb_id) === -1){
                            errorMsgArr.push('<span class="txt-red">《'+$(tableDom).attr('sb_title')+'》</span>');
                        }
                    });
                    mini.alert(errorMsgArr.join('<br>'));
                    return false;
                }
                return true;
            },
            /**
             * 校验：纯js校验、SaveCheckData、SendCheckData、MustFill
             * */
            checkDatas: function () {
                _removeAllErrors();
                var result = true;
                var that = this;
                //纯js校验
                $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    if(typeof that['checkTable_'+sb_id] === 'function'){
                        result = that['checkTable_'+sb_id].apply(that,[]);
                        if(!result){
                            return false;
                        }
                    }
                });
                //cfg校验
                if(result){
                  $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    var table = that.tables[sb_id];
                    result = table.checkCfg();
                    if(!result){
                      return false;
                    }
                  });
                }
                return result;
            },
            /**
             * 校验DoshowMessage
             * */
            checkDoShowMessage: function () {
                var errorMsgs = [];
                $.each(this.tables, function (sb_id, table) {
                    var curMsgs = table.checkDoShowMessage();
                    if(curMsgs.length>0){
                        errorMsgs = errorMsgs.concat(curMsgs);
                    }
                });
                return errorMsgs;
            },
            /**
             * 计算全部公式
             * */
            calculateAll: function (sb_id) {
                this.tables[sb_id].calculateAll();
            },
            /**
             * 添加toolTip
             */
            addToolTips: function (sb_id, toolTips) {
                this.tables[sb_id] && this.tables[sb_id].addToolTips(toolTips);
            },
            /**
             * 删除toolTip
             */
            deleteToolTips: function (sb_id, tdList) {
                this.tables[sb_id] && this.tables[sb_id].deleteToolTips(tdList);
            },
            /**
             * 发送
             * */
            send: function () {
                var j3xmlData = [];
                if(typeof this['changeXml_'+this.sb_id] === 'function'){
                    var obj = {};
                    var $xml = this['changeXml_'+this.sb_id].apply(this,[]);
                    var bbxml = '';
                    if($xml.children().length !== 0){
                        bbxml = xmlUtil.turnXmlToStr($xml[0]).replace(/[\n\t]/g,'').replace(/>\s+</g,'><');//压缩报文(去除换行及节点间的空格)
                    }
                    obj['bbwjm'] = this.sbzlDm+'_'+this.sb_id+'.xml';
                    obj['bbxml'] = bbxml;
                    j3xmlData.push(obj);
                }
                var checkData = this.setDataIntoCheckData();
                var htmlData = this.getPreviewData();
                var formulaData = this.getFormulas();
                var jsonData = {
                    htmlData: mini.encode(htmlData),
                    j3xmlData: mini.encode(j3xmlData),
                    formulaData: mini.encode(formulaData)
                };
                var request = {
                    "djxh": this.gsNsrData.djxh,
                    "sbzlDm": this.sbzlDm,
                    "bbid": this.sb_id,
                    "sssqQ": this.sssqq,
                    "sssqZ": this.sssqz,
                    "jsonData": jsonData,
                    "checkData": mini.encode(checkData),
                    "sblxDm": this.sblxDm
                };
                var that = this;
                mini.mask('保存中，请稍后...');
                setTimeout(function () {
                  var result = sbcommon.singleSave_year(request);
                  mini.unmask();
                  if(result){
                    mini.alert(that.saveSuccessMsg, '提示',function () {
                      if(parent.yearReport){
                        that.updateParentSbData(checkData, '1');
                        that.afterSaved();
                        that.closeWindow('ok');
                      }
                    });
                  }
                },1);
            },
            updateParentSbData: function(checkData,status){
                parent.yearReport.sb_data[this.sb_id].checkData = checkData;
                parent.yearReport.sb_data[this.sb_id].status = status;
                var $parentItem = parent.$('.item[data-bbid="'+this.sb_id+'"]').attr('class','item edited');
                if(status === '1'){
                    $parentItem.attr('class','item edited');
                }else if(status === '2'){
                    $parentItem.attr('class','item resumed');
                }
            },
            /**
             * 单表保存成功后的操作
             * */
            afterSaved: function () {

            },
            /**
             * 获取对应sb_id的金三报文
             * @param {string} sb_id
             * @return {document}
             * */
            getJ3Xml: function (sb_id) {
                return $(xmlUtil.turnStrToXml(xmlUtil.turnXmlToStr(this.j3Xmls[sb_id])));
                // return $(this.j3Xmls[sb_id].cloneNode(true));//该方法在31版本chrome中会出问题
            },
            /**
             * 获取所有公式
             * */
            getFormulas: function () {
                var formula = {};
                var that = this;
                $('table[type="sb"]').each(function () {
                    var sb_id = $(this).attr('sb_id');
                    if(servyouReport.htmlYsbz === 'Y'){
                        formula[sb_id] = LZString.compressToBase64(mini.encode(that.tables[sb_id].getFormulas()));
                    }else{
                        formula[sb_id] = that.tables[sb_id].getFormulas();
                    }
                });
                return formula;
            },
            /**
             * 获取html代码（用于暂存与查看）
             * */
            getPreviewData:function(){
                this.solveBeforeGetPreviewData();
                //所有隐藏的tab切增加样式，脱离文档流，使mini组件的宽度计算保持正确
                $('.mini-tabs-body:not(:visible)').addClass('absolute');
                var htmlData = {};
                //所有select所选中的option加上selected属性
                $("select").each(function(){
                    var selectedIndex = $(this)[0].selectedIndex;
                    /*var selected = $(this)[0].selectedIndex>=0 ? $(this)[0].options[selectedIndex] : null;
                    for (var i=0; i<$(this)[0].getElementsByTagName('option').length; i++){
                        var selectNode = $(this)[0].getElementsByTagName('option')[i].getAttributeNode('selected');
                        !!selectNode && $(this)[0].getElementsByTagName('option')[i].removeAttributeNode(selectNode);
                    }
                    selectedIndex >= 0 && $(this)[0].options[selectedIndex].setAttribute('selected', 'selected');*/
                    var newOptions = '';
                    $.each($(this).find('option'),function (i) {
                        var option = $(this)[0].outerHTML;
                        if (i === selectedIndex){
                            if (option.indexOf('selected') < 0){
                                var options = option.toLowerCase().split('<option');
                                option = options[0]+'<option'+' selected="selected"'+options[1];
                            }
                        }
                        newOptions += option;
                    });
                    $(this).html(newOptions);
                });
                $('table[type="sb"]').each(function (i, table) {
                    var sb_id = $(table).attr('sb_id');
                    var $tableClone = $(table).clone();
                    /*所有select加上title,确保没有点击过的select有title*/
                    $tableClone.find("select").each(function(){
                        var curText = $(this).find('option:selected').html();
                        $(this).attr('title',curText);
                    });
                    /*取出mini-combobox中的值，替换当前mini-combobox节点*/
                    $tableClone.find('.mini-combobox').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var text = $control.getText();//获取文本值
                        var value = $control.getValue();//获取代码值
                        if(text === '' && $control.emptyText !== '' && $control.emptyText.indexOf('请选择') === -1){	//nullItemText也会表现到emptyText中
                            text = $control.emptyText;
                        }
                        var width = $control.getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+value+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    /*取出mini-datepicker中的值，替换当前mini-datepicker节点*/
                    $tableClone.find('.mini-datepicker').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var text = $control.getText();//获取文本值
                        // var width = mini.get(id).getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        // var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+text+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        var strHtml = '<span class="ellipsis spanForMini" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+text+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    /*取出mini-checkboxlist中的值，替换当前mini-checkboxlist节点*/
                    $tableClone.find('.mini-checkboxlist').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var value = $control.getValue();//获取数据值
                        var data = $control.getData();
                        var text = '';
                        if(data){
                            $.each(data, function () {
                                if(this[$control.valueField] === value){
                                    text = this[$control.textField];
                                    return false;
                                }
                            })
                        }
                        var width = $control.getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+value+'" data-text="'+text+'" data-isCheckboxList="Y" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    /*取出mini-treeselect中的值，替换当前mini-treeselect节点*/
                    $tableClone.find('.mini-treeselect').each(function () {
                        var id = this.id;
                        var $control = mini.get(id);
                        var text = $control.getText();//获取文本值
                        var value = $control.getValue();//获取数据值
                        if(text === '' && $control.emptyText !== '' && $control.emptyText.indexOf('请选择') === -1){//nullItemText也会表现到emptyText中
                            text = $control.emptyText;
                        }
                        var width = mini.get(id).getWidth();
                        var ifDisabled = $control.enabled?'Y':'N';
                        var strHtml = '<span class="ellipsis spanForMini" style="width: '+width+'px;" ifDisabled="'+ifDisabled+'" fromMiniId="'+id+'" data-value="'+value+'" data-text="'+text+'" title="'+text+'">'+text+'</span>';
                        $(this).replaceWith(strHtml);
                    });
                    htmlData[sb_id] = $tableClone[0].outerHTML;
                });
                $('.mini-tabs-body.absolute').removeClass('absolute');
                return this.compressHtml(htmlData);
            },
            /**
             * 压缩html
             * */
            compressHtml: function (htmlData) {
                if(this.htmlYsbz !== 'Y'){
                    return htmlData;
                }
                $.each(htmlData, function (key, html) {
                    htmlData[key] = LZString.compressToBase64(html);
                });
                return htmlData;
            },
            /**
             * 发送
             * */
            save: function () {
                if(this.checkAllClicked() && this.checkDatas()){
                // if(1){//用于本地测试
                    var errorMsgs = this.checkDoShowMessage();
                    if(errorMsgs.length >0){
                    // if(0){//用于本地测试
                        var newErrorMsgArr = [];
                        $.each(errorMsgs, function (i,msg) {
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
                }
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
                this.send();
            },
            /**
             * 暂存和保存前特殊处理前端html，应用于动态增加行这一块
             * */
            solveBeforeGetPreviewData: function(){

            },
            /**
             * 暂存
             * */
            tempSave: function () {
                var that = this;
                var htmlData = this.getPreviewData();
                var formulaData = this.getFormulas();
                var jsonData = {
                    htmlData:mini.encode(htmlData),
                    formulaData: mini.encode(formulaData)
                };
                var request = {
                    "sblxDm": this.sblxDm,
                    "djxh": this.gsNsrData.djxh,
                    "sbzlDm": this.sbzlDm,
                    "bbid": this.sb_id,
                    "sssqQ": this.sssqq,
                    "sssqZ": this.sssqz,
                    "jsonData": jsonData
                };
                mini.mask('暂存中，请稍后...');
                setTimeout(function () {
                  var result = sbcommon.tempSave_year(request);
                  mini.unmask();
                  if(result){
                    mini.alert(that.tempSaveSuccessMsg,'提示',function () {
                      if (parent.yearReport){
                        that.updateParentSbData({},'2');
                      }
                    });
                  }
                },1);

            },
            /**
             * 关闭页面
             * */
            closeWindow: function (action) {
                if (window.CloseOwnerWindow)
                    return window.CloseOwnerWindow(action);
                else
                    window_close();
            },
            /**
             * 暂存还原
             * */
            resume: function () {
                this.resumeHtml(mini.decode(this.resumeData['jsonData']['htmlData']));
                this.resumeFormula(mini.decode(this.resumeData['jsonData']['formulaData']));
            },
            resumeHtml: function (resumeTables) {
                var _this = this;
                $.each(resumeTables, function (sb_id,resumeTable) {
                    if(resumeTable.indexOf('sb_table') === -1){//压缩了html
                        resumeTable = LZString.decompressFromBase64(resumeTable);
                    }
                    var $pageTable = $('table[sb_id="'+sb_id+'"]');
                    if($pageTable.length === 0){//当还原的表在页面上找不到时，直接跳过
                        return true;
                    }
                    _this.resumeByTable($(resumeTable),$pageTable);
                })
            },
            resumeByTable: function ($resumeTable, $pageTable) {
                var _this = this;
                if($resumeTable.find(_this.replaceSelector).length === 0){//table中无mini组件
                    $pageTable.html($resumeTable.html());//直接覆盖html
                }else{//table中有mini组件
                    var $pageTbodys = $pageTable.find('>thead,>tbody,>tfoot');
                    var $resumeTbodys = $resumeTable.find('>thead,>tbody,>tfoot');
                    $.each($resumeTbodys, function (i) {
                        _this.resumeByTbody($(this),$pageTbodys.eq(i));
                    })
                }
            },
            resumeByTbody: function ($resumeTbody,$pageTbody) {
                var _this = this;
                if($resumeTbody.find(_this.replaceSelector).length === 0){//body中无mini组件
                    $pageTbody.replaceWith($resumeTbody[0].outerHTML);
                }else if($resumeTbody.attr('dynamic-row') === 'Y'){//存在动态行，且行中存在mini组件
                  if(servyouReport.businessType === 'preview'){//此处暂不支持动态行中存在checkboxlist的情况
                    $pageTbody.replaceWith($resumeTbody[0].outerHTML);
                    return ;
                  }
                  try{
                    var templateId = $resumeTbody.attr('template-id');
                    var templateData = mini.decode($resumeTbody.attr('template-data'));
                    var html = template(templateId, templateData);
                    $pageTbody.find('tr:lt('+templateData.removeNumber+')').remove();
                    $pageTbody.prepend(html);
                    mini.parse();
                    /*return ;
                    if(servyouReport.businessType === 'preview'){
                      setTimeout(function () {
                        $pageTbody.find('td>[class*="mini"]').each(function () {
                          var id = $(this).attr('id');
                          mini.get(id).setReadOnly(true);
                        });
                      },1)
                    }*/
                  }catch (e) {
                    console.log('动态行模板渲染错误，错误原因:'+e);
                  }
                }else{//body中有mini组件
                    var $pageTrs = $pageTbody.find('>tr');
                    var $resumeTrs = $resumeTbody.find('>tr');
                    $.each($resumeTrs, function (i) {
                        _this.resumeByTr($(this), $pageTrs.eq(i));
                    })
                }
            },
            resumeByTr: function ($resumeTr, $pageTr) {
                var _this = this;
                if($resumeTr.find(_this.replaceSelector).length === 0){//tr中无mini组件
                    $pageTr.replaceWith($resumeTr[0].outerHTML);
                }else{//tr中有mini组件
                    var $pageTds = $pageTr.find('>td');
                    var $resumeTds = $resumeTr.find('>td');
                    $.each($resumeTds, function (i) {
                        if(_this.businessType === 'preview'){
                            _this.resumeByTdForPreview($(this), $pageTds.eq(i));
                        }else{
                            _this.resumeByTd($(this), $pageTds.eq(i));
                        }
                    })
                }
            },
            resumeByTd: function ($resumeTd, $pageTd) {
                var _this = this;
                if($resumeTd.find('>'+_this.replaceSelector).length === 0){//td中无mini组件
                    $pageTd.replaceWith($resumeTd[0].outerHTML);
                }else{//td中有mini组件
                    $.each($resumeTd[0].attributes, function (i, attribute) {
                      $pageTd.attr(attribute.nodeName, attribute.nodeValue);
                    });
                    var $spans = $resumeTd.find('>'+_this.replaceSelector);
                    $.each($spans, function () {
                        var mini_id = $(this).attr('fromMiniId');
                        var mini_value = $(this).attr('data-value');
                        var control = mini.get(mini_id);
                        control.setValue(mini_value);
                        //禁用/启用控件
                        var ifDisabled = $(this).attr('ifDisabled');
                        if(ifDisabled === 'Y'){
                            control.enable();
                        }else if(ifDisabled === 'N'){
                            control.disable();
                        }
                        //targetIdYxbz回写
                        var targetIdYxbz = $(this).attr('targetIdYxbz');
                        if(targetIdYxbz === 'N'){
                            control.targetIdYxbz = targetIdYxbz;
                        }
                    });
                }
            },
            resumeByTdForPreview: function ($resumeTd, $pageTd) {
                var _this = this;
                if($resumeTd.find('>'+_this.replaceSelector).length === 0){//td中无mini组件
                    $pageTd.replaceWith($resumeTd[0].outerHTML);
                }else{//td中有mini组件
                    var $spans = $resumeTd.find('>'+_this.replaceSelector);
                    $.each($spans, function () {
                        var mini_id = $(this).attr('fromMiniId');
                        var mini_value = $(this).attr('data-value');
                        var control = mini.get(mini_id);
                        control.setValue(mini_value);
                        control.setReadOnly(true);
                    });
                }
            },
            /**
             * 暂存还原公式(由于动态增加行的存在，所以必须动态增加行后的公式必须入库还原)
             * */
            resumeFormula: function (formulaData) {
                var that = this;
                $.each(this.tables, function (sb_id) {
                    if(formulaData[sb_id] && !$.isArray(formulaData[sb_id])){//说明公式压缩过
                        formulaData[sb_id] = mini.decode(LZString.decompressFromBase64(formulaData[sb_id]));
                    }
                    that.tables[sb_id].setFormulas(formulaData[sb_id]);
                });
            },
            /**
             * 从金三报文中还原数据
             */
            resumeFromXml: function () {
                // resumeXmlUtil.resumeXml(this.j3CorrectXml);
                this.customResumeFromXml();
                this.isResumeFromXml = true;
            },
            /**
             * 无法通过cfg配置来完成的xml数据回写，就需要通过自定义的方法来回写
             * （如一个td中有两个及以上的input或者select或者mini组件）
             */
            customResumeFromXml: function () {
                var _this = this;
                $.each(this.tables, function (sb_id, table) {
                    if(typeof _this['customResumeFromXml_'+sb_id] === 'function'){
                        _this['customResumeFromXml_'+sb_id].apply(_this,[]);
                    }
                })
            },
            /**
             * 预览
             * */
            preview: function (resumeTables) {
                var htmlData = mini.decode(resumeTables);
                var sbIds = [];//返回数据中的sb_id
                for(var id in htmlData){
                    sbIds.push(id);
                }
                var _this = this;
                $.each(resumeTables, function (sb_id,resumeTable) {
                    if(resumeTable.indexOf('sb_table') === -1){//压缩了html
                        resumeTable = LZString.decompressFromBase64(resumeTable);
                    }
                    var $pageTable = $('table[sb_id="'+sb_id+'"]');
                    if($pageTable.length === 0){//当还原的表在页面上找不到时，直接跳过
                        return true;
                    }
                    _this.resumeByTable($(resumeTable),$pageTable);
                });
                $('body table[type=sb]').find('input,select,textarea').attr('disabled','disabled');
                $('td.enable').removeClass('enable');
                this.customInitAfterPreview();
            },
            /**
             * 自定义预览后初始化
             */
            customInitAfterPreview: function () {},
            /**
             * 打印
             * */
            print:function(){
                var tabs = mini.get('tabs');
                var activeIndex = tabs.activeIndex;
                var $table = $(tabs.getTabBodyEl(activeIndex)).find('table[sb_id]');
                /*计算所有select显示宽度*/
                $table.find('input,select').each( function () {
                    if ($(this).parent('td').length > 0) {
                        var servyou_type = $(this).attr('servyou_type');
                        if($(this).is('select') || ($(this).is('input') && servyou_type && servyou_type==='string')){
                            var width = this.clientWidth;
                            $(this).attr('data-width', width + 'px');
                        }
                    }
                });
                var printHtmlClone = $table.clone();
                /*取出input中的值，替换当前input节点*/
                $(printHtmlClone).find('td>input[type="text"]').each(function(){
                    var value = $(this).val();
                    var type = $(this).attr('servyou_type');
                    var width = $(this).attr('data-width');
                    var htmlStr = '';
                    if(type && type === 'string'){
                        htmlStr += '<span class="span-wrap" style="width:'+width+';">'+value+'</span>';
                    }else{
                        htmlStr += '<span class="span-nowrap">'+value+'</span>'
                    }
                    $(this).replaceWith(htmlStr);
                });
                /*取出所有select中的值，替换当前select节点*/
                $(printHtmlClone).find("td>select").each(function () {
                    var text = $(this).find('option:selected').html();
                    text = text ? text:"";
                    var width = $(this).attr('data-width');
                    var htmlStr = '<span class="span-wrap" style="width: '+width+';">'+text+'</span>';
                    $(this).parent().html(htmlStr);
                });
                var printHtml = $(printHtmlClone)[0].outerHTML;
                LODOP=getLodop();
                // var strStyleCSS='<link rel="stylesheet" type="text/css" href="../../../scripts/reportSB3.0/servyouReport_print.css"/>';
                var strStyleCSS='<style>'+this.getPrintCss()+'</style>';
                var strFormHtml ="<head>"+strStyleCSS+"</head>";
                LODOP.PRINT_INIT("报表打印");
                var id = $(printHtml).attr('id');
                var $curTable = $('#'+id);
                var tableWidth = $curTable[0].clientWidth;
                var tableBoxWidth = $curTable.parent()[0].clientWidth;
                if(tableWidth > tableBoxWidth){
                    LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4"); //大表格  横向打印
                }else{
                    LODOP.SET_PRINT_PAGESIZE(1, 0, 0, "A4"); //A4纸张正向打印 第一个参数 1正向，2横向
                }
                strFormHtml += "<body>"+printHtml+"</body>";
                LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);// 1正向显示，0横向显示
                LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width"); // Auto-Width 整宽不变形
                LODOP.SET_PREVIEW_WINDOW(2,0,0,0,0,"报表打印.开始打印"); // 第一个参数 0适高，1正常，2适宽，其他不要改
                LODOP.ADD_PRINT_HTM("1mm", "1mm", "RightMargin:1mm", "BottomMargin:1mm", strFormHtml); // 边距设置
                LODOP.PREVIEW(); // 打开打印预览窗口
            },
            getPrintCss: function () {
                var css = '';
                $.ajax({
                    url: '../../../scripts/reportSB3.0/servyouReport_print.css',
                    type: 'get',
                    dataType: 'text',
                    data: {},
                    success: function (response) {
                        css = response;
                    },
                    error: function () {
                        mini.alert('获取打印样式失败');
                    }
                });
                return css;
            },
            /**
             * 获取input数据，用于解决转报文时，数据型的input无数据val()出来为空的问题
             * */
            getInputValue: function ($target) {
                /*若$target不存在或者不是数组或者数组长度为0，都统一返回''，若有特殊的，则在各自js中处理*/
                if(!$target || !$target instanceof Array || $target.length === 0){
                    return '';
                }
                var curTableId = $target.parents('table[type="sb"]').attr('sb_id');
                return this.tables[curTableId].getValueByType($target);
            },
            /**
             * 设置目标数据
             * */
            setTargetVal: function($target,val) {
                if($target.length !== 1){//一个td只有一个组件时，才允许用cfg配置的形式回写xml数据
                    return ;
                }
                var cls = $target.attr('class');
                if(cls && cls.indexOf('mini-') !== -1){//若是mini组件
                    var id = $target.attr('id');
                    var control = mini.get(id);
                    control.setValue(val);
                }else{//select或者input
                    var scientificNotation = /^\d+(\.\d+)?[eE][+-]?\d+$/;//匹配科学计数法的数据
                    var type = $target.attr('servyou_type');
                    if(val && type !== 'string' && scientificNotation.test(val)){//处理科学计数法的数据
                        val = Number(val).toString();
                    }
                    if($target.is(':checkbox') || $target.is(':radio')){
                        if(val === 'checked'){
                            $target[0].checked = true;
                            $target.attr('checked','checked');
                        }else{
                            $target[0].checked = false;
                            $target.removeAttr('checked');
                        }
                    }else {
                        $target.val(val);
                        if ($target.is('input')) {
                            $target.attr('value', val);
                        }
                    }
                }
            },
            /**
             * 根据id数据导入
             * */
            loadData: function(json){
                if(typeof json === 'object' && typeof json !== 'array'){
                    $.each(json,function (sb_id, data) {
                        if($('#table_'+sb_id).length > 0){
                            $.each(data, function (id,val) {
                                var $dom = $('#'+id);
                                if($dom.attr('class') && $dom.attr('class').indexOf('mini-') !== -1){//miniui组件
                                    mini.get(id).setValue(val);
                                }else if($dom.is('input')){//input
                                    var type = $dom.attr('type');
                                    if(type === 'text'){
                                        $dom.val(val).attr('value',val).change().blur();
                                    }else if(type === 'checkbox' || type === 'radio'){
                                        var tempVals = [1,'1','y','Y',true,'true'];
                                        if(tempVals.indexOf(val) !== -1){
                                            $dom.click().change().blur();//事件必须按顺序触发
                                        }else{
                                            $dom.removeAttr('checked').change().blur();
                                        }
                                    }
                                }else if($dom.is('select')){//select
                                    $dom.val(val).change().blur();
                                }
                            });
                        }
                    });
                }else{
                    mini.alert('导入数据格式不正确！');
                }
            },
            mockApi: {
                nsrData: '../config/nsrData.json',
                hd: '../config/hd.json'
            },
            getLocalJson: function (url) {
                var json = null;
                ajax.get(url,'',function (response) {
                    json = response;
                    return true;
                },function () {
                    mini.alert('获取本地数据失败！');
                    return false;
                });
                return json;
            },
            /**
             * 格式化所有input中的数据,
             * 允许传参，只格式化对应sb_id那张表的数据
             * */
            formatAllData: function (sb_id) {
                $.each(this.tables, function (curSbid, table) {
                    if(sb_id && sb_id !== curSbid){
                        return ;
                    }
                    table.formatAllData();
                });
            },
            /**
             * 根据行列自动生成所有input和select的id
             * 若sb_id存在，则只为某一张表添加id
             * */
            setIdForAllInputAndSelect: function(sb_id){
                if(sb_id){
                    var $tables = $('table[sb_id="'+sb_id+'"]');
                }else{
                    var $tables = $('table[type="sb"]');
                }
                $tables.each(function () {
                    var $trs = $(this).find('tr');
                    var sb_id = $(this).attr('sb_id');
                    var $containDomTds = $(this).find('td>input,td>select').parent();
                    $.each($containDomTds, function(){
                        var trIndex = $trs.index($(this).parent());
                        var tdIndex = $(this).index();
                        var id = sb_id+'_'+trIndex+'_'+tdIndex;
                        var $innerDoms = $(this).find('>input,>select');
                        var inputCount = $innerDoms.length;
                        if(inputCount === 1 && $(this).find('>input,>select').attr('useCustomId') !== 'Y'){
                            $(this).find('>input,>select').attr('id',id);
                        }else if(inputCount > 1){
                            $.each($innerDoms, function (i,dom) {
                                if($(this).attr('useCustomId') !== 'Y'){
                                    $(this).attr('id',id+'_'+i);
                                }
                            })
                        }
                    });
                });
            },
            /**
             * 根据行列计算input和select的id
             * */
            getInputOrSelectId: function ($target) {
                var id = $target.attr('id')||'';
                if(id){
                    return id;
                }
                var $curTable = $('table[type="sb"]');
                var $trs = $curTable.find('tr');
                var sb_id = $curTable.attr('sb_id');
                var $curTd = $target.parent();
                var $curTr = $curTd.parent();
                var trIndex = $trs.index($curTr);
                var tdIndex = $curTd.index();
                id = sb_id+'_'+trIndex+'_'+tdIndex;
                var $tdInnerDoms = $curTd.find('>input,>select');
                if($tdInnerDoms.length > 1){
                    var targetIndex = $tdInnerDoms.index($target);
                    id += '_'+targetIndex;
                }
                return id;
            },
            /**
             * 获取所有页面数据
             * @param {String} sb_id 报表id
             * @param {String} trSelector 行选择器
             * @return {Object}
             * */
            getAllDataByTable: function (sb_id, trSelector) {
                var obj = {};
                var that = this;
                if(!sb_id){
                    return obj;
                }
                var curTableId = sb_id;
                var $targets = !trSelector?$('table[sb_id="'+sb_id+'"] td'):$('table[sb_id="'+sb_id+'"]').find(trSelector).find('td');
                $targets.find('>input,>select,>[class*=mini]').each(function () {
                    var key = '';
                    if($(this).attr('class') && $(this).attr('class').indexOf('mini-') !== -1){//mini组件
                        var id = $(this).attr('id');//mini组件必须手动写死id
                        key = id;
                        var value = mini.get(id).getValue();
                    }else{//input和select
                        var id = that.getInputOrSelectId($(this));
                        var idReg = new RegExp('^'+curTableId+'_\\d+_\\d+$');
                        key = idReg.test(id)?id.replace(curTableId+'_',''):id;
                        var type = $(this).attr('type');
                        if(type === 'checkbox' || type === 'radio'){
                            var value = $(this).is(':checked')?'checked':'';
                        }else{
                            var value = that.tables[curTableId].getValueByType($(this));
                        }
                    }
                    obj[key] = value;
                });
                return obj;
            },
            /**
             * 校验数据
             * */
            validValue: function ($target) {
                var curSbId = $target.parents('table[type="sb"]').attr('sb_id');
                return this.tables[curSbId].validValue($target);
            },
            /**
             * 将所有wsxx和lsxx节点，整理成map形式{key: value}
             * */
            _setWsxxAndLsxxMap: function (hd) {
                var that = this;
                if(hd.wsxxs && hd.wsxxs.wsxx){
                    $.each(hd.wsxxs.wsxx, function () {
                        that.wsxxMap[this.code] = this.value;
                    });
                }
                if(hd.lsxxs && hd.lsxxs.lsxx){
                    $.each(hd.lsxxs.lsxx, function () {
                        that.lsxxMap[this.code] = this.value;
                    });
                }
            }
        };
        /**
         * 移除所有报错样式
         * */
        var _removeAllErrors = function () {
            $('.report_error').removeClass('report_error');
        };
        return report;
    })();
    /**
     * 更正申报
     * */
    var resumeXmlUtil = (function () {
        function _resumeXml(j3Xml) {
            $.each(servyouReport.tables, function (sb_id, table) {
                var records = table.getCacheByType('Body');
                if(records && records.length > 0){
                    var $table = $('#table_'+sb_id);
                    if($table.length >0){
                        _doResumeXml($table, records, j3Xml);
                    }

                }
            });
        }
        function _doResumeXml($table, records, j3Xml) {
            $.each(records, function (i, record) {
                var recordJson = _turnToJson(record);
                var matchedJ3NodeMap = _matchJ3Nodes(recordJson, j3Xml);
                var matchedTdMap = _matchTds(recordJson, $table);

                $.each(matchedJ3NodeMap, function (j,nodeArr) {
                    $.each(nodeArr, function (k,node) {
                        var nodeVal = $(node).text();
                        var $td = $(matchedTdMap[j][k]);
                        var $target = $td.children();
                        if($target.length === 1){
                            servyouReport.setTargetVal($target,nodeVal);
                        }
                    });
                });
            });
        }
        function _matchJ3Nodes(recordJson,j3xml) {
            var selector = recordJson['HeadName'].replace(/\./g,' ').trim();
            var $tempPNodes = $(j3xml).find(selector).children();
            var xmlSRow = parseInt(recordJson['XmlSRow']);
            var xmlERow = parseInt(recordJson['XmlERow']);
            if(xmlERow < 0){
                xmlERow = $(j3xml).find(selector).children().length - 1;
            }
            var $matchedPNodes = $tempPNodes.slice(xmlSRow,xmlERow+1);
            var childrenNodeRange = recordJson['NodeRange'];
            var childrenNodeIndexArr = [];
            if(childrenNodeRange.indexOf('..') !== -1){
                var rangeArr = childrenNodeRange.split('..');
                childrenNodeIndexArr = _makeArr(rangeArr[0], rangeArr[1]);
            }else{
                childrenNodeIndexArr = _ArrGrep(childrenNodeRange.split(','));
            }
            var matchedNodeMap = {};
            $matchedPNodes.each(function (i,pNode) {
                matchedNodeMap[i] =  [];
                $.each(childrenNodeIndexArr, function (j,nodeIndex) {
                    matchedNodeMap[i].push($(pNode).children().eq(parseInt(nodeIndex)));
                })
            });
            return matchedNodeMap;
        }
        function _matchTds(recordJson, $table) {
            var trStartIndex = parseInt(recordJson['CellSRow']);
            var trEndIndex = parseInt(recordJson['CellERow']);
            var $matchedTrs = $table.find('tr:lt('+(trEndIndex+1)+'):gt('+(trStartIndex-1)+')');
            var tdIndexRange = recordJson['CellColRange'];
            var xmlAsCol = recordJson['XmlAsCol'];
            var tdIndexArr = [];
            if(tdIndexRange.indexOf('..') !== -1){
                var rangeArr = tdIndexRange.split('..');
                tdIndexArr = _makeArr(rangeArr[0], rangeArr[1]);
            }else{
                tdIndexArr = _ArrGrep(tdIndexRange.split(','));
            }
            var matchedTdMap = {};
            if(xmlAsCol === 'true'){
                $.each(tdIndexArr, function (i,curTdIndex) {
                    matchedTdMap[i] = ($matchedTrs.find('td:eq('+curTdIndex+')'));
                })
            }else{
                $matchedTrs.each(function (i,curTr) {
                    matchedTdMap[i] = [];
                    $.each(tdIndexArr, function (j,tdIndex) {
                        matchedTdMap[i].push($(curTr).find('td:eq('+tdIndex+')'));
                    });
                });
            }
            return matchedTdMap;
        }
        //去除数组中的空元素
        function _ArrGrep(arr) {
            if (!$.isArray(arr)) return [];
            var tempArr = [];
            $.each(arr, function (i, v) {
                !!v && tempArr.push(v);
            });
            return tempArr;
        }
        function _turnToJson(record){
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
        }
        /**
         * 数字转换数组 例如 传入2,6. 则返回[2,3,4,5,6]
         * @param 起始数字，结尾数字
         * **/
        function _makeArr(s,e){
            if(isNaN(s) || isNaN(e)) return[];
            var start=  parseInt(s),
                end = parseInt(e);
            var result = [];
            for(var i=start;i<end+1;i++){
                result.push(i);
            }
            return result;
        }
        return {
            resumeXml: function (j3Xml) {
                _resumeXml(j3Xml);
            }
        };
    })();
    return servyouReport;

}));


/**
 * 监听disabled属性变化
 * */
;(function ($) {
    var $_fn_removeAttr = $.fn.removeAttr;
    var $_fn_attr = $.fn.attr;
    $.fn.extend({
        removeAttr : function(attr){
            var returnVal = $_fn_removeAttr.call(this, attr);
            if(attr === "disabled"){
                this.trigger("disabledRemoved", attr);
            }
            return returnVal;
        },
        attr : function(){
            if(arguments.length === 2 && arguments[0] === "disabled"){
                this.trigger("disabledChanged", arguments);
            }
            var returnVal = $_fn_attr.apply(this, arguments);
            return returnVal;
        }
    })
})(jQuery);
$(function () {
    $("body").on('disabledRemoved', "input:not(.mini-textbox-input,.mini-buttonedit-input),select,textarea", function(e, attr) {
        if($(e.target).is('option')){
            return ;
        }
        if (attr === "disabled") {
            $(this).parent().addClass("enable");
        }
    }).on("disabledChanged", "input:not(.mini-textbox-input,.mini-buttonedit-input),select,textarea", function(e, attr, value) {
        if($(e.target).is('option')){
            return ;
        }
        if (value === "disabled") {
            $(this).parent().removeClass("enable");
        } else if (value === false) {
            $(this).parent().addClass("enable");
        }
    });
    $("body").on('readonlyRemoved', "input:not(.mini-textbox-input,.mini-buttonedit-input),select,textarea", function(e, attr) {
        if (attr === "readonly") {
            $(this).parent().addClass("enable");
        }
    }).on("readonlyChanged", "input:not(.mini-textbox-input,.mini-buttonedit-input),select,textarea", function(e, attr, value) {
        if (value === "readonly") {
            $(this).parent().removeClass("enable");
        }
    });
  //回车同tab
  $('.container').on("keydown", "input", function(e){
    var keyCode = e.keyCode || e.which || e.charCode;
    var shiftKey = e.shiftKey;
    var inputs = $('.container').find('.sb_table:visible').find('td>input:visible:not([readonly]):not([disabled])')
    var index = inputs.index(this);
    if(shiftKey && keyCode === 13){
      e.preventDefault();
      inputs.eq( index- 1 ).focus();
    }else if(keyCode === 13){
      e.preventDefault();
      inputs.eq( index+ 1 ).focus();
    }
  });
});

/**
 * Created by liun on 2018/12/30.
 */
servyouReport.homeUrl = '/bszm-web/apps/views-zj/home/home.html';//首页
servyouReport.backUrl = '/bszm-web/apps/views-zj/publicPages/allFunctions.html?tab=panel-{code}#menu-{code}1010';
servyouReport.closeWindow = function () {
    if (window.CloseOwnerWindow)
        return window.CloseOwnerWindow();
    else{
        if(Tools.getUrlParamByName('client') === 'Y' || localStorage.getItem('client') === 'Y'){
            if(parent.window.location.href.indexOf('clientType=zzzd') > -1 || localStorage.getItem('clientType') === 'zzzd'){
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
            window.location.href = servyouReport.homeUrl;
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
            if(parent.window.location.href.indexOf('clientType=zzzd') > -1 || localStorage.getItem('clientType') === 'zzzd'){
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
            window.location.href = servyouReport.homeUrl;
            return;
        }else if(userType === '01'){//企业
            code = '22005';
        }else if(userType === '02'){//个人
            code = '12020';
        }
        window.location.href = servyouReport.backUrl.replace(/\{code\}/g, code);
    }
};
