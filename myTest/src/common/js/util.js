let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    len = len - (s + '').length;
    for (let i = 0; i < len; i++) { s = '0' + s; }
    return s;
}

export default {
    getQueryStringByName: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        let context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },

    listToTree: function (data, options) {
        //data = [{id:1,parent:0,children:[],name:''}]
        options = options || {};
        let ID_KEY = options.idKey || 'id';
        let PARENT_KEY = options.parentKey || 'parent';
        let CHILDREN_KEY = options.childrenKey || 'children';

        let tree = [],
            childrenOf = {};
        let item, id, parentId;

        for (let i = 0, length = data.length; i < length; i++) {
            item = data[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] || 0;
            // every item may have children
            childrenOf[id] = childrenOf[id] || [];
            // init its children
            item[CHILDREN_KEY] = childrenOf[id];
            if (parentId != 0) {
                // init its parent's children
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        }

        return tree;
    },


    // 转换{key:"test",value:"test1"}类型数据为{test:"test1"}
    covertObjToMap: function (keyValues) {
        var mapResult = {};
        var len = keyValues.length;
        for (var i = 0; i < len; i++) {
            if (keyValues[i].value && keyValues[i].value != "" && keyValues[i].key && keyValues[i].key != "") {
                mapResult[keyValues[i].key] = keyValues[i].value;
            }
        }
        return mapResult;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }
    },

    //使用sotre2进行本地缓存
    storeLocal: {
        get: function (key) {
            var value = store.local.get(key);
            if (!value || value == 'undefined' || value == 'null') {
                return null;
            }
            return value;
        },
        set: function (key, value) {
            store.local.set(key, value);
        },
        remove: function (key) {
            store.local.remove(key);
        }
    },

    //使用sotre2进行本地缓存
    storeSession: {
        get: function (key) {
            var value = store.session.get(key);
            if (!value || value == 'undefined' || value == 'null') {
                return null;
            }
            return value;
        },
        set: function (key, value) {
            store.session.set(key, value);
        },
        remove: function (key) {
            store.session.remove(key);
        }
    }
};
