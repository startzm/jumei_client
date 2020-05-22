import post from '../common/post'

export default function userRegister(data) {
    let verify_data = {}

    return post({
        url: '/v5/regist',
        data: {
            'phoneNum': data.phone,
            'password': data.verify
        }
    })
}