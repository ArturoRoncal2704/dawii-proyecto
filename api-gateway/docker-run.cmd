REM Creamos la imagen del servidor eureka
docker build -t restaurant/api-gateway:1.0 -f Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Eureka
docker run -d --name api-gateway --network restaurant-net -p 8000:8000 restaurant/api-gateway:1.0
