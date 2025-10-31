cd C:\Users\ronca\OneDrive\Escritorio\Dev\DAW2
docker build -t restaurant/user-service:1.0 -f user-service/Dockerfile .
docker run -d --name user-service --network restaurant-net -p 8686:8686 restaurant/user-service:1.0
