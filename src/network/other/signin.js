import get from "../common/get"


export function signin() {
    return get({
        url: '/v5/signin',
        data: {}
    })
}


export function get_turntable() {
    return get({
        url: '/v5/get_turntable',
        data: {}
    })
}
