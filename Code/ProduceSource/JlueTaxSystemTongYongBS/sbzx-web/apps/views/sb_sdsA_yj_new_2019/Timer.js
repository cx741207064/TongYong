/**
 * Created by chenjunj on 2018/1/4 21:09.
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
        root.Timer = factory();
    }
}(this, function () {
    var timer = {
        unit: {//时间单位
            day: '天',
            hour: '小时',
            minute: '分钟',
            second: '秒'
        },
        defaultCount: 10,//倒计时的总时间
        stopCountValue: 0,//倒计时停止时间点
        lastTime: '',//上次记录的时间，单位毫秒
        restTime: 0,//剩余时间，单位秒
        defaultText: '',//默认文字
        textAfterTime: '',//倒计时过程中紧跟时间后面的文字
        /**
         * 运行倒计时
         * */
        run: function (count) {
            this.restTime = count === undefined ? this.defaultCount : count;
            var _this = this;
            this.markTime();
            this.solveDuringCounting();
            clearInterval(this.timerCountDown);
            _this.timerCountDown = setInterval(function () {
                _this.restTime--;
                if (_this.restTime === _this.stopCountValue) {
                    _this.solveAfterCountOver();
                    clearInterval(_this.timerCountDown);
                    return;
                }
                _this.solveDuringCounting();
            }, 1000);
        },
        /**
         * 处理倒计时过程中的任务
         * */
        solveDuringCounting: function () {

        },
        /**
         * 处理倒计时结束后的任务
         * */
        solveAfterCountOver: function () {

        },
        /**
         * 处理checkTime不通过时的任务
         * */
        solveNotAllowed: function () {

        },
        /**
         * 根据剩余时间获取对应的文字
         * */
        getTextByRestTime: function () {
            var restDays = parseInt(this.restTime / 24 / 60 / 60);
            var restHours = parseInt(this.restTime / 60 / 60);
            var restMinutes = parseInt(this.restTime / 60);
            var restSeconds = this.restTime % 60;
            var str = restDays > 0 ? restDays + this.unit.day : '';
            str += restHours > 0 ? restHours + this.unit.hour : '';
            str += restMinutes > 0 ? restMinutes + this.unit.minute : '';
            str += restSeconds > 0 ? restSeconds + this.unit.second : '';
            if (!str) {
                return this.defaultText;
            }
            str += this.textAfterTime;
            return str;
        },
        /**
         * 校验时间
         * */
        checkTime: function () {
            var lastTime = this.getLastTime();
            if (!lastTime) {
                return true;
            }
            var curTime = new Date().getTime();
            var restTime = Math.ceil(this.defaultCount - (curTime - lastTime) / 1000);//剩余时间
            if (restTime > 0) {
                if(this.restTime !== restTime){
                    this.restTime = restTime;
                }
                this.solveNotAllowed();
                return false;
            }
            return true;
        },
        /**
         * 成功执行默认任务后标记时间
         * */
        markTime: function () {
            this.lastTime = new Date().getTime();
        },
        /**
         * 获取上次时间
         * */
        getLastTime: function () {
            return this.lastTime;
        }
    };
    return function (options) {
        return $.extend({},timer,options);
    }
}));