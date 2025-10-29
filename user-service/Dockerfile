# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY common-service ./common-service
COPY user-service ./user-service

RUN mvn -f common-service/pom.xml clean install -DskipTests
RUN mvn -f user-service/pom.xml clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/user-service/target/*.jar user-service.jar

ENTRYPOINT ["java","-jar","user-service.jar"]
# Desplegar la aplicación