import jsonp from "../common/jsonp"


export default function get_group_nav() {
    return jsonp({
        url: '/v4/getGroupNav',
        data: {}
    })
}