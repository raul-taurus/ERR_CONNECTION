# -*- coding: utf8 -*-
import json
import socket
import sys

whoisServer = (sys.argv[2] if 2 < len(sys.argv) else None) or 'whois.iana.org'
query = sys.argv[1]

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the socket to the port where the server is listening
server_address = (whoisServer, 43)
print('connecting to {} port {}...'.format(*server_address))
sock.connect(server_address)

try:

    # Send data
    message = f'{query}\r\n'
    print(f'> sending \'{query}\'')
    sock.sendall(message.encode())

    resp = ''

    while True:
        data = sock.recv(1024)
        amount_received = len(data)
        resp = resp + data.decode()
        if(amount_received == 0):
            break

    print('<')
    print(resp)

finally:
    print('..')
    sock.close()
