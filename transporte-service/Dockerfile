# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY common-service ./common-service
COPY transporte-service ./transporte-service

RUN mvn -f common-service/pom.xml clean install -DskipTests
RUN mvn -f transporte-service/pom.xml clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/transporte-service/target/*.jar transporte-service.jar

ENTRYPOINT ["java","-jar","transporte-service.jar"]
# Desplegar la aplicación