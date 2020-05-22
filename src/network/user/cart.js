import post from '../common/post'
import get from '../common/get'

export function add_cart(data) {
    return post({
        url: '/v5/add_cart',
        data: {
            'item_id': data['item_id']
        }
    })
}


export function remove_cart (data) {
    return post({
        url: '/v5/remove_cart',
        data: {
            'item_id': data['item_id'],
            'remove_all': data['remove_all']?data['remove_all']:0
        }
    })
}


export function get_cart() {
    return get({
        url: 'v5/get_cart',
        data: {}
    })
}



export function get_cart_count() {
    return get({
        url: 'v5/get_cart_count',
        data: {}
    })
}

