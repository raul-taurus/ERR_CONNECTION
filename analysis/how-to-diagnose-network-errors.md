# How to Diagnose Network Errors

## The `ERR_CONNECTION_RESET`

Error from browser:

![image](https://user-images.githubusercontent.com/11864008/171993854-7747353e-244f-4744-881f-eba747801d81.png)

Error from `curl`:

```sh
$ curl -v https://medium.com/
*   Trying 162.159.152.4:443...
*   Trying 2606:4700:7::a29f:9804:443...
* Immediate connect fail for 2606:4700:7::a29f:9804: Network is unreachable
*   Trying 2606:4700:7::a29f:9904:443...
* Immediate connect fail for 2606:4700:7::a29f:9904: Network is unreachable
* Connected to medium.com (162.159.152.4) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* OpenSSL SSL_connect: Connection reset by peer in connection to medium.com:443
* Closing connection 0
curl: (35) OpenSSL SSL_connect: Connection reset by peer in connection to medium.com:443
```

## Diagnostics

### Install tools

```sh
apt-get update
apt-get install curl whois dnsutils netbase
```

### Run DNS query

```sh
root@d2da0ac73918:/# dig +short medium.com
162.159.153.4
162.159.152.4
root@d2da0ac73918:/# dig @8.8.8.8 +short medium.com
162.159.153.4
162.159.152.4
root@d2da0ac73918:/# dig @8.8.8.8 +short medium.com
162.159.153.4
162.159.152.4
root@d2da0ac73918:/# dig @8.8.8.8 +short medium.com
162.159.153.4
162.159.152.4
root@d2da0ac73918:/# dig @8.8.8.8 +short medium.com
162.159.153.4
162.159.152.4
root@d2da0ac73918:/# dig @8.8.8.8 +short medium.com
162.159.153.4
162.159.152.4
root@d2da0ac73918:/#
```

### Query the IP ranges

```sh
root@d2da0ac73918:/# whois 162.159.153.4

#
# ARIN WHOIS data and services are subject to the Terms of Use
# available at: https://www.arin.net/resources/registry/whois/tou/
#
# If you see inaccuracies in the results, please report at
# https://www.arin.net/resources/registry/whois/inaccuracy_reporting/
#
# Copyright 1997-2022, American Registry for Internet Numbers, Ltd.
#


NetRange:       162.158.0.0 - 162.159.255.255
CIDR:           162.158.0.0/15
NetName:        CLOUDFLARENET
NetHandle:      NET-162-158-0-0-1
Parent:         NET162 (NET-162-0-0-0-0)
NetType:        Direct Allocation
OriginAS:       AS13335
Organization:   Cloudflare, Inc. (CLOUD14)
RegDate:        2013-05-23
Updated:        2021-05-26
Comment:        All Cloudflare abuse reporting can be done via https://www.cloudflare.com/abuse
Ref:            https://rdap.arin.net/registry/ip/162.158.0.0



OrgName:        Cloudflare, Inc.
OrgId:          CLOUD14
Address:        101 Townsend Street
City:           San Francisco
StateProv:      CA
PostalCode:     94107
Country:        US
RegDate:        2010-07-09
Updated:        2021-07-01
Ref:            https://rdap.arin.net/registry/entity/CLOUD14


OrgAbuseHandle: ABUSE2916-ARIN
OrgAbuseName:   Abuse
OrgAbusePhone:  +1-650-319-8930
OrgAbuseEmail:  abuse@cloudflare.com
OrgAbuseRef:    https://rdap.arin.net/registry/entity/ABUSE2916-ARIN

OrgRoutingHandle: CLOUD146-ARIN
OrgRoutingName:   Cloudflare-NOC
OrgRoutingPhone:  +1-650-319-8930
OrgRoutingEmail:  noc@cloudflare.com
OrgRoutingRef:    https://rdap.arin.net/registry/entity/CLOUD146-ARIN

OrgTechHandle: ADMIN2521-ARIN
OrgTechName:   Admin
OrgTechPhone:  +1-650-319-8930
OrgTechEmail:  rir@cloudflare.com
OrgTechRef:    https://rdap.arin.net/registry/entity/ADMIN2521-ARIN

OrgNOCHandle: CLOUD146-ARIN
OrgNOCName:   Cloudflare-NOC
OrgNOCPhone:  +1-650-319-8930
OrgNOCEmail:  noc@cloudflare.com
OrgNOCRef:    https://rdap.arin.net/registry/entity/CLOUD146-ARIN

RNOCHandle: NOC11962-ARIN
RNOCName:   NOC
RNOCPhone:  +1-650-319-8930
RNOCEmail:  noc@cloudflare.com
RNOCRef:    https://rdap.arin.net/registry/entity/NOC11962-ARIN

RTechHandle: ADMIN2521-ARIN
RTechName:   Admin
RTechPhone:  +1-650-319-8930
RTechEmail:  rir@cloudflare.com
RTechRef:    https://rdap.arin.net/registry/entity/ADMIN2521-ARIN

RAbuseHandle: ABUSE2916-ARIN
RAbuseName:   Abuse
RAbusePhone:  +1-650-319-8930
RAbuseEmail:  abuse@cloudflare.com
RAbuseRef:    https://rdap.arin.net/registry/entity/ABUSE2916-ARIN


#
# ARIN WHOIS data and services are subject to the Terms of Use
# available at: https://www.arin.net/resources/registry/whois/tou/
#
# If you see inaccuracies in the results, please report at
# https://www.arin.net/resources/registry/whois/inaccuracy_reporting/
#
# Copyright 1997-2022, American Registry for Internet Numbers, Ltd.
#

root@d2da0ac73918:/#
```

#### Using Windows

If you are using Windows,

- `nslookup` is the alternative to `dig`
  - `nslookup medium.com 8.8.8.8`
- <https://ipinfo.io/> is a alternative to `whois`
  - <https://ipinfo.io/162.159.153.4>

### Conclusion

See that the IP range `162.158.0.0/15` from `Cloudflare` is blocked and causes `medium.com` can not be reached.

### Solution

Traffic the blocked IP range via a secure tunnel.

```sh
route add -net 162.158.0.0/15 secure tunnel
```
