import get from '../common/get'

export default function good_history(data) {
    
    return get({
        url: 'v5/good_history',
        data: {
            'good_id': data.good_id
        }
    })
}
