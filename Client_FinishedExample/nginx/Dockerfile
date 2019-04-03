FROM nginx

RUN rm -f /etc/nginx/conf.d/default.conf
COPY server.conf /etc/nginx/conf.d/
COPY server.crt /etc/nginx/ssl/
COPY server.key /etc/nginx/ssl/

VOLUME /usr/share/nginx/html
EXPOSE 443
