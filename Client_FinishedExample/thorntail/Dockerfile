FROM openjdk

COPY chatter-thorntail.jar /home

EXPOSE 8080

ENV JAVA_TOOL_OPTIONS="-Djava.net.preferIPv4Stack=true -Djava.net.preferIPv4Addresses=true"

CMD ["java", "-jar", "/home/chatter-thorntail.jar"]
