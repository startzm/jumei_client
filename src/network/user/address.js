import post from '../common/post'
import get from '../common/get'

export function add_address(data) {
    return post({
        url: '/v5/add_address',
        data: {
            'name': data['name'],
            'phoneNum': data['phoneNum'],
            'city': data['city'],
            'detailAdd': data['detailAdd'],
            'isDefault': data['isDefault']
        }
    })
}


export function get_address () {
    return get({
        url: '/v5/get_address',
        data: {
        }
    })
}



export function get_default_address () {
    return get({
        url: '/v5/get_default_address',
        data: {
        }
    })
}


export function remove_address (data) {
    return post({
        url: '/v5/remove_address',
        data: {
            'id': data['id']
        }
    })
}



export function change_address (data) {
    return post({
        url: '/v5/change_address',
        data: {
            'name': data['name'],
            'phoneNum': data['phoneNum'],
            'city': data['city'],
            'detailAdd': data['detailAdd'],
            'id': data['id'],
            'isDefault': data['isDefault']
        }
    })
}

