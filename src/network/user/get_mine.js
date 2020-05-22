import jsonp from "../common/jsonp"
import store from '@/store/store'

export default function get_mine() {
    let phone = ''
    if (store.state.isLogin) {
        phone = store.state.user.phoneNum
    }

    
    return jsonp({
        url: '/v5/get_mine',
        data: {
            phoneNum: phone? phone: ''
        }
    })
}