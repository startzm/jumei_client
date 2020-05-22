import post from '../common/post'
import md5 from 'js-md5'

export default function userRegister(data) {

    return post({
        url: '/v5/login',
        data: {
            'username': data.username,
            'password': md5(data['password'])
        }
    })
}