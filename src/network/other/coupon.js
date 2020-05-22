import get from "../common/get"
import jsonp from '../common/jsonp'

export function get_coupon() {
    return get({
        url: '/v5/get_coupon',
        data: {}
    })
}


export function get_coupon_rule() {
    return jsonp({
        url: '/v5/get_coupon',
        data: {}
    })
}


export function get_order_coupon(data) {
    return get({
        url: '/v5/get_order_coupon',
        data: {
            'price': data['price']
        }
    })
}