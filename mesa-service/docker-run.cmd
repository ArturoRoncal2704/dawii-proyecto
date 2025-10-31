cd C:\Users\ronca\OneDrive\Escritorio\Dev\DAW2

docker build -t restaurant/mesa-service:1.0 -f mesa-service/Dockerfile .
docker run -d --name mesa-service --network restaurant-net -p 8065:8065 restaurant/mesa-service:1.0
