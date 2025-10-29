# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY config-server ./config-server

RUN mvn -f config-server/pom.xml clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/config-server/target/*.jar config-server.jar

ENTRYPOINT ["java","-jar","config-server.jar"]
# Desplegar la aplicación