import jsonp from "../common/jsonp"


export function good_ajax_search(data) {    
    return jsonp({
        url: '/v1/good_ajax_search',
        data: {
            'q': data['q']
        }
    })
}


export function good_search(data) {
    return jsonp({
        url: '/v1/good_search',
        data: {
            'q': data['q'],
            'page': data['page'],
            'count': data['count']
        }
    })
}