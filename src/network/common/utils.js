export function handleParam(data) {
    let url = ''
    for (let key in data) {
        let value = data[key] !== undefined ? data[key] : ''
        url += '&' + key + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}

export function get_timestamp() {
    let timestamp = new Date().getTime()
    let timestamp_str = parseInt(timestamp/1000).toString()
    return timestamp_str
}


export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt
}



function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}


export function show_img (path) {
  const baseURL = 'http://47.97.204.150:5003/'
  // const baseURL = 'http://192.168.0.9:5003/'
  return baseURL + 'v5/show/' + path

}


export function timestampFormat( timestamp ) {

  function zeroize( num ) {
    return (String(num).length == 1 ? '0' : '') + num;
  }

  var curTimestamp = parseInt(new Date().getTime() / 1000);
  var timestampDiff = curTimestamp - timestamp;

  var curDate = new Date( curTimestamp * 1000 );
  var tmDate = new Date( timestamp * 1000 );

  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

  if ( timestampDiff < 60 ) {
    return "刚刚";
  } else if( timestampDiff < 3600 ) {
    return Math.floor( timestampDiff / 60 ) + "分钟前";
  } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
    return zeroize(H) + ':' + zeroize(i);
  } else {
    var newDate = new Date( (curTimestamp - 86400) * 1000 );
    if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
        return '昨天'
    } else if ( curDate.getFullYear() == Y ) {
        return  zeroize(m) + '月' + zeroize(d) + '日 '
    } else {
        return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 '
    }
  }
}