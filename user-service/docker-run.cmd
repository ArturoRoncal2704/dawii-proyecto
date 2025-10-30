cd C:\Users\User\Documents\Ciclo 2025\Desarrollo de Aplicaciones Web II\PROYECTO\dawii-proyecto
docker build -t restaurant/user-service:1.0 -f user-service/Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Mesa
docker run -d --name user-service --network restaurant-net -p 8686:8686 restaurant/user-service:1.0
