import axios from 'axios'
import store from '@/store/store'
import { Loading } from 'element-ui';

import {handleParam, get_timestamp} from './utils'
import get_verify from './verify'
import toCode from './to_code'

const verify_key = 'jumei'

export default function get(config, success, failure) {
    const instance = axios.create({
        // baseURL: 'http://47.97.204.150:5003',
        baseURL: 'v5',
        timeout: 5000,
        withCredentials: true,
        headers: {token: localStorage.getItem('token')}
    })

   
    
    const data = config.data;
    data['method'] = 'get';
    data['timestamp'] = get_timestamp();
    data['sign'] = get_verify(verify_key, data['timestamp']);
    let query = handleParam(data);
    let args = toCode(query);
    config.url = config.url + '?a=' + args
   
    return instance(config)
}