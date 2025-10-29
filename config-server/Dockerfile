# Crear el jar
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /workspace

COPY src ./src
COPY pom.xml ./pom.xml

# Compilamos el proyecto (generará el .jar)
RUN mvn clean install -DskipTests

# Desplegar la aplicación
FROM eclipse-temurin:21-jre

WORKDIR /app

ENV SPRING_PROFILES_ACTIVE=docker

# Copiamos el JAR compilado desde la imagen builder
COPY --from=builder /workspace/target/*.jar config-server.jar

EXPOSE 8888

ENTRYPOINT ["java","-jar","config-server.jar"]
# Desplegar la aplicación