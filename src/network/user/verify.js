import get from '../common/get'

export default function verify_user() {
    return get({
        url: 'v5/verify_user',
        data: {}
    })
}
