import post from '../common/post'
import get from '../common/get'
import jsonp from '../common/jsonp'

export function get_integral() {
    return get({
        url: '/v5/get_integral',
        data: {}
    })
}


export function get_integral_rule() {
    return jsonp({
        url: '/v5/get_integral_rule',
        data: {}
    })
}


export function get_order_integral(data) {
    return get({
        url: '/v5/get_order_integral',
        data: {
            'price': data['price']
        }
    })
}