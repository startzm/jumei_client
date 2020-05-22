import jsonp from "../common/jsonp"


export default function getStore (data) {
    return jsonp({
        url: '/v3/get_store',
        data: {
            'store_id': data['store_id']
        }
    })
}