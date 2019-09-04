/**
 * 格式化时间
 * @param {*} format  格式
 * @param {*} date  Date实体
 * formatTime("yyyy年MM月dd日",new Date());
 * formatTime("MM/dd/yyyy",new Date());
 * formatTime("yyyyMMdd",new Date());
 * formatTime("yyyy-MM-dd hh:mm:ss",new Date());
 */
export default function (format, date){
     if (undefined === date){
            date = new Date();
        }
        var that = date;
        var o = {
            "M+": that.getMonth() + 1, //month
            "d+": that.getDate(), //day
            "h+": that.getHours(), //hour
            "m+": that.getMinutes(), //minute
            "s+": that.getSeconds(), //second
            "q+": Math.floor((that.getMonth() + 3) / 3), //quarter
            "S": that.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
            for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
}