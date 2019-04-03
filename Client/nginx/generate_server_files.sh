#!/bin/bash
rm server.crt
rm server.key
rm server.conf

openssl req -x509 -nodes -days 7 -newkey rsa:2048 -keyout server.key -out server.crt -subj "/C=AT/ST=Upper Austria/L=Linz/O=HTL Leonding/OU=IT Department/CN=$(cat IP_ADDR.txt)"

echo "server {
    listen 443 ssl;
    server_name" > server.conf
cat IP_ADDR.txt >> server.conf
echo ";
    
    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;

    location /api/ {
        proxy_pass http://thorntail:8080/api/;
    }

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}" >> server.conf
