import post from '../common/post'
import get from '../common/get'

export function get_paymethod (data) {
    return get({
        url: '/v5/get_paymethod',
        data: {
            'oid': data.oid
        }
    })
}


export function payment (data) {
    return post({
        url: '/v5/payment',
        data: {
            'oid': data.oid,
            'price': data.price,
            'paymethod': data.paymethod
        }
    })
}