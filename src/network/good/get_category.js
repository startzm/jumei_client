import jsonp from "../common/jsonp"


export default function get_category(data) {
    return jsonp({
        url: '/v2/get_category',
        data: {
        }
    })
}