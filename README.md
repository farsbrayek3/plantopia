## README.md

# 🌿 Plantopia – Connected Plant Care Platform

**Plantopia** is a distributed microservice-based web application for smart plant monitoring and management using IoT sensors, with secure access and containerized deployment.

---

## 🧰 Features

- ✅ Real-time plant care management
- ✅ IoT integration for sensor data
- ✅ Service discovery with Eureka
- ✅ API Gateway with secure routing
- ✅ Role-based authentication with Keycloak
- ✅ Dockerized microservices

---

## 📊 Architecture

```bash
applicationweb/
├── discovery-server/         # Eureka Discovery
├── config-server/            # Central Configuration
├── gateway/                  # API Gateway with Keycloak integration
├── plant-care-service/       # Spring Boot microservice (H2 DB)
├── iot-sensor-service/       # NestJS microservice (MongoDB Atlas)
├── docker-compose.yml        # Compose definition
├── .env                      # Env variables (MONGODB_URI etc.)
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone & Build

```bash
git clone https://github.com/farsbrayek3/plantopia.git
cd plantopia

# Build containers
docker-compose build

# Run all services
docker-compose up
```

### 2. Key Ports

| Service      | Port |
| ------------ | ---- |
| Gateway      | 8080 |
| NestJS (IoT) | 8081 |
| Eureka       | 8761 |
| Keycloak     | 8180 |

---

## 🔐 Keycloak Config

- Realm: `plantopia`
- Client: `plant-gateway`
- Roles: `USER`, `ADMIN`
- JWKS URI:
  ```
  http://localhost:8180/realms/plantopia/protocol/openid-connect/certs
  ```

---

## 🚒 Technologies

| Area       | Stack                          |
| ---------- | ------------------------------ |
| Backend 1  | Spring Boot + H2               |
| Backend 2  | NestJS + MongoDB Atlas         |
| Auth       | Keycloak                       |
| Discovery  | Eureka                         |
| Gateway    | Spring Cloud Gateway           |
| Frontend   | Next.js (optional future step) |
| Deployment | Docker & Docker Compose        |

---

## 🔧 Endpoints

- `http://localhost:8080/plants/**` → Spring Microservice
- `http://localhost:8080/sensor/**` → NestJS IoT Microservice
- `http://localhost:8761` → Eureka
- `http://localhost:8180` → Keycloak

---

## 👨‍💼 Maintainer

- Moetaz Brayek ([LinkedIn](https://www.linkedin.com/in/moetaz-brayek))

## 🌐 License

This project is under MIT License.

---

## .gitignore

```
# Maven
target/
!.mvn/wrapper/maven-wrapper.jar
!.mvn/wrapper/maven-wrapper.properties

# Node.js / NestJS
node_modules/
dist/

# IDEs
.idea/
.vscode/
*.iml

# Logs and env
*.log
.env

# OS junk
.DS_Store
Thumbs.db

# Docker
**/.dockerignore
**/Dockerfile

# Git
.git/
.gitignore
```

---
