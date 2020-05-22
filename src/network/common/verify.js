import md5 from 'js-md5'

export default function get_verify (verify_key, timestamp) {
    let sign_str = verify_key;
    sign_str += timestamp.toString()[3] + timestamp.toString()[7] 
    return md5(sign_str)
}