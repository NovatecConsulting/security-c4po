FROM openjdk:11-jre

# CREATE FOLDERS
RUN mkdir /usr/src/c3po
WORKDIR /usr/src/c3po

# COPY PACKAGE INTO IMAGE
COPY ./target/security-testing-guide-api-0.0.1-SNAPSHOT.jar .

# RUN JAVA
CMD [ "java", "-jar", "security-testing-guide-api-0.0.1-SNAPSHOT.jar" ]
