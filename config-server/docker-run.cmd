REM Creamos la imagen del config server
docker build -t restaurant/config-server:1.0 -f Dockerfile .

REM Iniciamos una instancia de la imagen config server
docker run -d --name config-server --network restaurant-net -p 8888:8888 restaurant/config-server:1.0