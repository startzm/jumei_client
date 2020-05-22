import post from '../common/post'
import get from '../common/get'

export function create_order (data) {
    return post({
        url: '/v5/create_order',
        data: {
            'item_id': data['item_id'],
            'count': data['count'],
            'unit_price': data['unit_price'],
            'total_price': data['total_price'],
            'coupon': data['coupon'],
            'coupon_discount': data['coupon_discount'],
            'integral': data['integral'],
            'integral_discount': data['integral_discount']
        }
    })
}


export function get_order_info (data) {
    return post({
        url: '/v5/get_order_info',
        data: {
            'good_list': data['good_list']
        }
    })
}



export function get_order (data) {
    return get({
        url: '/v5/get_order',
        data: {
            'type': data?data.type: '-1',
            'page': data['page'],
            'count': data['count']
        }
    })
}

export function order_detail (data) {
    return get({
        url: '/v5/order_detail',
        data: {
            'id': data['id']
        }
    })
}


export function remove_address (data) {
    return post({
        url: '/v5/remove_address',
        data: {
            'id': data['id']
        }
    })
}



export function change_address (data) {
    return post({
        url: '/v5/change_address',
        data: {
            'name': data['name'],
            'phoneNum': data['phoneNum'],
            'city': data['city'],
            'detailAdd': data['detailAdd'],
            'id': data['id'],
            'isDefault': data['isDefault']
        }
    })
}


export function order_received (data) {
    return get({
        url: '/v5/order_received',
        data: {
            'id': data['id']
        }
    })
}



