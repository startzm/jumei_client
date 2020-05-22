import post from '../common/post'

export function submit_comment (data) {
    return post({
        url: '/v5/submit_comment',
        data: {
            oid: data['oid'],
            content: data['content'],
            img_list: data['img_list'],
            rate1: data['rate1'],
            rate2: data['rate2'],
            rate3: data['rate3']
        }
    })
}
