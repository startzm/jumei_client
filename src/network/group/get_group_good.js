import jsonp from "../common/jsonp"


export default function get_group_good(data) {
    return jsonp({
        url: '/v4/getGroupGood',
        data: data
    })
}
