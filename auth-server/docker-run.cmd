cd C:\Users\User\Documents\Ciclo 2025\Desarrollo de Aplicaciones Web II\PROYECTO\dawii-proyecto
docker build -t restaurant/auth-server:1.0 -f auth-server/Dockerfile .

REM Iniciamos una instancia de la imagen config server
docker run -d --name auth-server --network restaurant-net -p 8484:8484 restaurant/auth-server:1.0