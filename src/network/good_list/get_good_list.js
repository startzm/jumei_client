import jsonp from "../common/jsonp"


export default function get_good_list(data) {
    return jsonp({
        url: '/v1/good_category',
        data: data
    })
}