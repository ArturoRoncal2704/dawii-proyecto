cd C:\Users\User\Documents\Ciclo 2025\Desarrollo de Aplicaciones Web II\PROYECTO\dawii-proyecto
docker build -t restaurant/reserva-service:1.0 -f reserva-service/Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Mesa
docker run -d --name reserva-service --network restaurant-net -p 8585:8585 restaurant/reserva-service:1.0
