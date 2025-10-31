cd C:\Users\ronca\OneDrive\Escritorio\Dev\DAW2
docker build -t restaurant/transporte-service:1.0 -f transporte-service/Dockerfile .
docker run -d --name transporte-service --network restaurant-net -p 8282:8282 restaurant/transporte-service:1.0
