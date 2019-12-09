#!/bin/bash

FQDN=`hostname`
rm server.key server.crt
openssl genrsa -out server.key 2048
openssl req -nodes -newkey rsa:2048 -keyout server.key -out server.csr -subj "/C=GB/ST=Street/L=City/O=Organisation/OU=Authority/CN=${FQDN}"
openssl x509 -req -days 1024 -in server.csr -signkey server.key -out server.crt
rm server.csr
