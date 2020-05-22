import get from '../common/get'

export default function people_bought() {
    
    return get({
        url: 'v5/people_bought',
        data: {
        }
    })
}
