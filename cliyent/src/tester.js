function h2d(s) {

    function add(x, y) {
        var c = 0, r = [];
        var x = x.split('').map(Number);
        var y = y.split('').map(Number);
        while(x.length || y.length) {
            var s = (x.pop() || 0) + (y.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10);
            c = s < 10 ? 0 : 1;
        }
        if(c) r.unshift(c);
        return r.join('');
    }

    var dec = '0';
    s.split('').forEach(function(chr) {
        var n = parseInt(chr, 16);
        for(var t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if(n & t) dec = add(dec, '1');
        }
    });
    return dec;
}
module.exports = h2d;

// const hexd = '00b7858d164d897bdeb162f0b418aa4d292ae0f9d72fc149b0cce1e912bb3623'
// console.log(hexd)
// const test = "123abc"
// console.log(parseInt(test,16))
// console.log(h2d(hexd))
// const number = h2d(hexd)
// console.log(number**315)
