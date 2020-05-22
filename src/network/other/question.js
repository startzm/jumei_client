import jsonp from '../common/jsonp'

export function get_question_page() {
    return jsonp({
        url: '/v5/get_question_page',
        data: {
        }
    })
}


export function get_question_list(data) {
    return jsonp({
        url: '/v5/get_question_list',
        data: {
            'id': data.id
        }
    })
}


export function get_question_answer(data) {
    return jsonp({
        url: '/v5/get_question_answer',
        data: {
            'id': data.id
        }
    })
}
