let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
}
import moment from 'moment';

export default {
    filters: {
        formatDate(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    methods: {
        getQueryStringByName: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            var context = "";
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        },

        // 图片对象转base64
        getBase64Image(img) {
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
            let dataURL = canvas.toDataURL("image/" + ext);
            return dataURL;
        },
        //**blob to dataURL**
        blobToDataURL(fileblob, callback) {
            let filereader = new FileReader();
            filereader.onload = function (e) {
                callback(e.target.result);
            };
            filereader.readAsDataURL(fileblob);
            return filereader;
        },
        //时间格式化  
        dateFormat: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
    }
}