import jsonp from "../common/jsonp"


export function getAct (data) {
    return jsonp({
        url: '/v3/get_act',
        data: data
    })
}


export function getActPage (data) {
    return jsonp({
        url: '/v3/get_act_page',
        data: data
    })
}