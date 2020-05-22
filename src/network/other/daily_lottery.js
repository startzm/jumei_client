import post from '../common/post'
import get from '../common/get'

export function get_lottery() {
    return get({
        url: '/v5/get_lottery',
        data: {}
    })
}


export function join_lottery(data) {
    return post({
        url: '/v5/join_lottery',
        data: {
            'id': data.id
        }
    })
}