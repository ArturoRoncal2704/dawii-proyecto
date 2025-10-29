REM Creamos la imagen del servidor eureka
docker build -t restaurant/config-server:1.0 -f Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Eureka
docker run -d --name config-server --network restaurant-net -p 8888:8888 restaurant/config-server:1.0