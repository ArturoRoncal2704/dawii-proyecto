# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY common-service ./common-service
COPY mesa-service ./mesa-service

RUN mvn -f common-service/pom.xml clean install -DskipTests
RUN mvn -f mesa-service/pom.xml clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/mesa-service/target/*.jar mesa-service.jar

ENTRYPOINT ["java","-jar","mesa-service.jar"]
# Desplegar la aplicación