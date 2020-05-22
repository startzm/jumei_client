import get from '../common/get'

export function often_buy(data) {
    return get({
        url: '/v5/often_buy',
        data: {
            'page': data['page'],
            'count': data['count']
        }
    })
}
