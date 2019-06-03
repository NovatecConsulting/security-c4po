FROM openjdk:11-jdk-slim
RUN mkdir /usr/src/c3po
WORKDIR /usr/src/c3po
COPY ./target/security-testing-guide-api-0.0.1-SNAPSHOT.jar .
# EXPOSE 8443
CMD [ "java", "-jar", "security-testing-guide-api-0.0.1-SNAPSHOT.jar" ]
