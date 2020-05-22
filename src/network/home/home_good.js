import jsonp from "../common/jsonp"
import {get_timestamp} from '../common/utils'


export default function getHomeGood(data) {
    let timestamp = get_timestamp()
    return jsonp({
        url: '/home/good',
        data: {
            'page': data['page'],
        }
    })
}