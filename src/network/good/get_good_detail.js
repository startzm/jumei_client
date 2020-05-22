import jsonp from "../common/jsonp"
import good_history from '../user/good_history'

export function get_good_static_detail (data) {
    good_history({'good_id': data['id']})
    return jsonp({
        url: '/v1/goodStaticDetail',
        data: {
            'id': data['id'],
        }
    })
    
}


export function get_good_dynamic_detail (data) {
    return jsonp({
        url: '/v1/goodDynamicDetail',
        data: {
            'id': data['id']
        }
    })
}


export function get_good_comment (data) {
    return jsonp({
        url: '/v1/good_comment',
        data: {
            'product_id': data['product_id']
        }
    })
}


export function get_good_recommend (data) {
    return jsonp({
        url: '/v1/good_recommend',
        data: {
            'item_id': data['item_id'],
            'page': data['page'],
            'count': data['count']
        }
    })
}