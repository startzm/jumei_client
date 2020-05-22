import jsonp from "../common/jsonp"


export default function getHomeAct() {
    return jsonp({
        url: '/home/act',
        data: {}
    })
}