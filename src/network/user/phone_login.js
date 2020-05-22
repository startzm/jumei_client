import post from '../common/post'
import axios from 'axios'

export default function phone_login(data) {
    let verify_data = {}
    
    return post({
        url: 'v5/phone_login',
        data: {
            'phoneNum': data.phone,
            'password': data.verify
        }
    })
}
