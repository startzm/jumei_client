import jsonp from '../common/jsonp'
import get from '../common/get'

export function get_chat_page() {
    return jsonp({
        url: '/v5/get_information_page',
        data: {
        }
    })
}


export function get_chat_count() {
    return get({
        url: '/v5/get_chat_count',
        data: {
        }
    })
}


export function get_information(data) {
    return get({
        url: '/v5/get_information',
        data: {
            page: data.page,
            count: data.count
        }
    })
}

