# ===============================
# STAGE 1: Build del JAR
# ===============================
FROM maven:3.9.9-eclipse-temurin-21 AS builder

# Carpeta de trabajo
WORKDIR /workspace

# Copiamos las fuentes de las aplicaciones
COPY src ./src
COPY pom.xml ./pom.xml

# Compilamos el proyecto (generará el .jar)
RUN mvn clean install -DskipTests

# ===============================
# STAGE 2: Imagen final
# ===============================
FROM eclipse-temurin:21-jre

# Carpeta de trabajo
WORKDIR /app

ENV SPRING_PROFILES_ACTIVE=docker

COPY --from=builder /workspace/target/*.jar eureka-server.jar

EXPOSE 8761

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "eureka-server.jar"]