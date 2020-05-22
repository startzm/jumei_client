import jsonp from "../common/jsonp"


export default function getStoreGood (data) {
    return jsonp({
        url: '/v3/get_store_good',
        data: data
    })
}