#!/bin/bash
cd ..
echo $(pwd)
mvn clean
mvn package
docker stop $(docker ps -q --filter="ancestor=security-testing-guide-api")
docker build --no-cache -t security-testing-guide-api:latest .
#docker run -d -p 8443:8443 security-testing-guide-api:latest
