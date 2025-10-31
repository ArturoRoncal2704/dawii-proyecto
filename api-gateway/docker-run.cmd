REM Creamos la imagen del servidor eureka
docker build -t restaurant/api-gateway:1.0 -f Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Eureka
docker run -d --name api-gateway --network restaurant-net -p 8080:8080 restaurant/api-gateway:1.0
