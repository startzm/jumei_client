export default function toCode (str) {
    var key = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var l = key.length;
    var a = key.split("");
    var s = "",b, b1, b2, b3;
    for (var i = 0; i <str.length; i ++) {
        b = str.charCodeAt(i);
        b1 = b %  l;
        b = (b - b1) / l;
        b2 = b % l;
        b = (b - b2) / l;
        b3 = b % l;
        s += a[b3] + a[b2] + a[b1];
    }
    return s;
} 
