REM Creamos la imagen del servidor eureka
docker build -t restaurant/eureka-server:1.0 -f Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Eureka
docker run -d --name eureka-server --network restaurant-net -p 8761:8761 restaurant/eureka-server:1.0