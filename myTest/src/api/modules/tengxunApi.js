import axios from '../axiosWrapper';
let prefix = process.env.API_ROOT;

//腾讯优图 通用印刷体文字识别api
export const generalocr = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    let url = `${prefix}/api/tengxun/generalocr`;
    return axios.post(url, params, config);
};

//腾讯优图 通用手写体文字识别api
export const handwritingocr = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    let url = `${prefix}/api/tengxun/handwritingocr`;
    return axios.post(url, params, config);
};

//腾讯优图 通用英文识别api
export const ehocr = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    let url = `${prefix}/api/tengxun/ehocr`;
    return axios.post(url, params, config);
};

//腾讯优图 高精度文字识别
export const hpgeneralocr = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    let url = `${prefix}/api/tengxun/hpgeneralocr`;
    return axios.post(url, params, config);
};

//腾讯优图 印章识别
export const seal_ocr = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    let url = `${prefix}/api/tengxun/seal_ocr`;
    return axios.post(url, params, config);
};

//腾讯优图 快速文本检测
export const worddetect = (params) => {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    let url = `${prefix}/api/tengxun/worddetect`;
    return axios.post(url, params, config);
};




