import get from "../common/get"


export default function send_message(data) {
    return get({
        url: '/v5/send_message',
        data: {
            'phoneNum': data.phoneNum
        }
    })
}