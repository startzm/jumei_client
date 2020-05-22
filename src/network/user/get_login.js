import jsonp from "../common/jsonp"


export default function get_login() {
    return jsonp({
        url: '/v5/get_login',
        data: {}
    })
}