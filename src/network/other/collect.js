import get from "../common/get"


export function good_collect(data) {
    return get({
        url: '/v5/good_collect',
        data: {
            'good_id': data['good_id']
        }
    })
}


export function store_collect(data) {
    return get({
        url: '/v5/store_collect',
        data: {
            'store_id': data['store_id']
        }
    })
}


export function remove_good_collect(data) {
    return get({
        url: '/v5/remove_good_collect',
        data: {
            'good_id': data['good_id']
        }
    })
}


export function remove_store_collect(data) {
    return get({
        url: '/v5/remove_store_collect',
        data: {
            'store_id': data['store_id']
        }
    })
}


export function get_good_status(data) {
    return get({
        url: '/v5/get_good_status',
        data: {
            'good_id': data['good_id']
        }
    })
}


export function get_store_status(data) {
    return get({
        url: '/v5/get_store_status',
        data: {
            'store_id': data['store_id']
        }
    })
}


export function get_collect(data) {
    return get({
        url: '/v5/get_collect',
        data: {
            'page': data['page'],
            'count': data['count'],
            'type': data['type']
        }
    })
}
