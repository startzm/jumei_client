import jsonp from "../common/jsonp"


export default function get_sub_category(data) {
    return jsonp({
        url: '/v2/get_sub',
        data: data
    })
}