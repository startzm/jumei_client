import originJsonp from 'jsonp'

import {handleParam, get_timestamp} from './utils'
import get_verify from './verify'
import toCode from './to_code'

// 签名加密密钥，需和后端同步修改
var verify_key = 'jumei'

export default function jsonp(config) {
    var option = {
        baseUrl: 'http://47.97.204.150:5003',
        // baseUrl: 'http://192.168.0.9:5003',
        timeout: 5000
    }
    var data = config.data;
    data['method'] = 'get';
    data['timestamp'] = get_timestamp();
    data['sign'] = get_verify(verify_key, data['timestamp']);


    var query = handleParam(data);
    var args = toCode(query);
    const url = option.baseUrl + config.url + '?' + 'a=' + args;
    
    return new Promise((resolve, reject) => {
        originJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}
