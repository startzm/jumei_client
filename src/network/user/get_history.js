import get from '../common/get'

export default function good_history() {
    
    return get({
        url: 'v5/get_history',
        data: {}
    })
}
