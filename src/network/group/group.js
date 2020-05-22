import jsonp from '../common/jsonp'

export function group_detail(data) {
    return jsonp({
        url: '/v4/group_detail',
        data: {
            'good_id': data.good_id
        }
    })
}