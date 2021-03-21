repo=https://raw.githubusercontent.com/felixonmars/dnsmasq-china-list/master
curl -s $repo/accelerated-domains.china.conf --output accelerated-domains.china.conf
# curl -s $repo/apple.china.conf --output apple.china.conf
curl -s $repo/bogus-nxdomain.china.conf --output bogus-nxdomain.china.conf
curl -s $repo/google.china.conf --output google.china.conf
