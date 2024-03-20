# NestJS + React Full Stack Boilerplate

## Prerequisite

- Docker
- Docker-Compose
- mkcert

## Local Development

```bash
# Generate Local SSL certificate and install with system trust store. Requires mkcert. Only need to run once
./mkcert.sh

# Start the local development
docker-compose up --build -d
```

## Database migrations

Database migrations are handled automatically as part of the application start up.

## Applications

- Frontend: https://frontend.local.gd
- Backend: https://backend.local.gd
- Admin: https://admin.local.gd
- Traefik Dashboard: http://localhost:8080
