cd C:\Users\ronca\OneDrive\Escritorio\Dev\DAW2
docker build -t restaurant/reserva-service:1.0 -f reserva-service/Dockerfile .
docker run -d --name reserva-service --network restaurant-net -p 8585:8585 restaurant/reserva-service:1.0
