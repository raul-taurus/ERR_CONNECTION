"use strict";
exports.__esModule = true;
exports.Cidr = void 0;
var Cidr = /** @class */ (function () {
    function Cidr() {
    }
    Cidr.ipv4_to_b32 = function (ipv4) {
        return ipv4.split('.').map(function (s) { return parseInt(s).toString(2).padStart(8, '0'); }).join('');
    };
    Cidr.b32_to_ipv4 = function (b32) {
        var ss = b32.split(/(\d{8})/);
        return [ss[1], ss[3], ss[5], ss[7]].map(function (s) { return parseInt(s, 2); }).join('.');
    };
    Cidr.mask_to_b32 = function (mask) {
        return ''.padStart(32 - mask, '0').padStart(32, '1');
    };
    Cidr.printRange = function (ipv4, mask) {
        var net = Cidr.ipv4_to_b32(ipv4).substr(0, mask);
        var first = net.padEnd(32, '0');
        var last = net.padEnd(32, '1');
        console.log({ first: Cidr.b32_to_ipv4(first), last: Cidr.b32_to_ipv4(last) });
    };
    return Cidr;
}());
exports.Cidr = Cidr;
Cidr.printRange('172.30.45.3', 20);
