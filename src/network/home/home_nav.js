import jsonp from "../common/jsonp"
import {get_timestamp} from '../common/utils'


export default function getHomeNav() {
    let timestamp = get_timestamp()
    return jsonp({
        url: '/home/nav',
        data: {

        }
    })
}