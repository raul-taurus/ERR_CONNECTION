"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cidr = void 0;
class Cidr {
    static ipv4_to_b32(ipv4) {
        return ipv4.split('.').map(s => parseInt(s).toString(2).padStart(8, '0').substr(0, 8)).join('');
    }
    static b32_to_ipv4(b32) {
        const ss = b32.split(/(\d{8})/);
        return [ss[1], ss[3], ss[5], ss[7]].map(s => parseInt(s, 2)).join('.');
    }
    static mask_to_b32(mask) {
        return ''.padStart(32 - mask, '0').padStart(32, '1');
    }
    static printRange(ipv4, mask) {
        let net = Cidr.ipv4_to_b32(ipv4).substr(0, mask);
        let first = net.padEnd(32, '0');
        let last = net.padEnd(32, '1');
        console.log({ first: Cidr.b32_to_ipv4(first), last: Cidr.b32_to_ipv4(last) });
    }
}
exports.Cidr = Cidr;
Cidr.printRange('172.30.45.3', 20);
