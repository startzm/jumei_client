import jsonp from '../common/jsonp'
import post from '../common/post'
import get from '../common/get'
import md5 from 'js-md5'

export function get_rules() {
    return jsonp({
        url: '/v5/get_rules',
        data: {

        }
    })
}

export function set_password (data) {
    return post({
        url: '/v5/set_password',
        data: {
            code: data['code'],
            phoneNum: data['phoneNum'],
            password: md5(data['password'])
        }
    })
}


export function upload_header (data) {
    return post({
        url: '/v5/upload_header',
        data: {
            img: data['img_data']
        }
    })
}


export function get_user_info () {
    return get({
        url: '/v5/get_user_info',
        data: {
        }
    })
}


export function change_info (data) {
    return post({
        url: '/v5/change_info',
        data: {
            'username': data['username'],
            'gender': data['gender'],
            'birthday': data['birthday'],
            'discount': data['discount'],
            'slogon': data['slogon']
        }
    })
}


export function get_banding () {
    return jsonp({
        url: '/v5/get_banding',
        data: {}
    })
}


export function get_message_settings () {
    return get({
        url: '/v5/get_message_settings',
        data: {}
    })
}

export function set_message_settings (data) {
    return post({
        url: '/v5/set_message_settings',
        data: {
            id: data.id,
            status: data.status
        }
    })
}