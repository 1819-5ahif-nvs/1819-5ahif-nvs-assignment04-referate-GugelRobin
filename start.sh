#bin/bash
cd Server
mvn package
cd ..
cp Server/target/chatter-thorntail.jar Client/thorntail/chatter-thorntail.jar
cd Client
docker-compose up --build
