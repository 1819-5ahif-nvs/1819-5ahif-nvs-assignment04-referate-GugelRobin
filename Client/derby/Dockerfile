FROM openjdk
COPY derby_binary /opt/derby/

EXPOSE 1527
VOLUME /home
WORKDIR /home

CMD ["/opt/derby/bin/startNetworkServer", "-noSecurityManager", "-h", "0.0.0.0"]
