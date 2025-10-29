# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY api-gateway ./api-gateway

RUN mvn -f api-gateway/pom.xml clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/api-gateway/target/*.jar api-gateway.jar

ENTRYPOINT ["java","-jar","api-gateway.jar"]
# Desplegar la aplicación