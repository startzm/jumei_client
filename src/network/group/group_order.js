import post from "../common/post"


export function start_group(data) {
    return post({
        url: '/v5/start_group',
        data: {
            'item_id': data['item_id'],
            'count': 1,
            'unit_price': data['group_price'],
            'total_price': data['group_price'],
            'group_id': data['group']?data['group']: ''
        }
    })
}