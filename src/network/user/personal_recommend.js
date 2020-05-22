import get from '../common/get'

export default function personal_recommend() {
    
    return get({
        url: 'v5/personal_recommend',
        data: {
        }
    })
}
