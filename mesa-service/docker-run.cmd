cd C:\Users\User\Documents\Ciclo 2025\Desarrollo de Aplicaciones Web II\PROYECTO\dawii-proyecto
docker build -t restaurant/mesa-service:1.0 -f mesa-service/Dockerfile .

REM Iniciamos una instancia de la imagen Servidor Mesa
docker run -d --name mesa-service --network restaurant-net -p 8065:8065 restaurant/mesa-service:1.0
