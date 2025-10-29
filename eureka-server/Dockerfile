# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY eureka-server ./eureka-server

RUN mvn -f eureka-server/pom.xml clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/eureka-server/target/*.jar eureka-server.jar

ENTRYPOINT ["java","-jar","eureka-server.jar"]
# Desplegar la aplicación