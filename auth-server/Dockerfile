# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY auth-server ./auth-server

RUN mvn -f auth-server/pom.xml clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/auth-server/target/*.jar auth-server.jar

ENTRYPOINT ["java","-jar","auth-server.jar"]
# Desplegar la aplicación