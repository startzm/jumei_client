import jsonp from "../common/jsonp"


export default function store_category(data) {
    return jsonp({
        url: '/v1/store_category',
        data: {
            page: data.page,
            count: data.count,
            q: data.q?data.q: ''
        }
    })
}