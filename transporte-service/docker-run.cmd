cd C:\Users\User\Documents\Ciclo 2025\Desarrollo de Aplicaciones Web II\PROYECTO\dawii-proyecto
docker build -t restaurant/transporte-service:1.0 -f transporte-service/Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Mesa
docker run -d --name transporte-service --network restaurant-net -p 8282:8282 restaurant/transporte-service:1.0
