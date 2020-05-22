import get from "../common/get"


export function good_wish(data) {
    return get({
        url: '/v5/good_wish',
        data: {
            'good_id': data['id'],
            'price': data['price']
        }
    })
}


export function get_wish(data) {
    return get({
        url: '/v5/get_wish',
        data: {
            'page': data['page'],
            'count': data['count']
        }
    })
}


export function remove_wish(data) {
    return get({
        url: '/v5/remove_wish',
        data: {
            'good_id': data['id']
        }
    })
}
