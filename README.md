# 🚀 DevOps Monitoring Dashboard

A professional **Full Stack DevOps Monitoring Platform** built with React, Spring Boot, PostgreSQL, JWT, Docker, and Nginx. Monitor your servers, track resource usage, and manage alerts from a modern web interface.

> **Zero configuration required** — just `docker compose up --build` and you're ready.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/register with role-based access (ADMIN / USER)
- 📊 **Real-time Dashboard** — Summary cards with CPU, memory, disk, and alert statistics
- 🖥️ **Server Management** — Full CRUD with search, filter, pagination
- 📈 **Metrics & Charts** — Historical CPU, memory, disk, and network charts (Recharts)
- 🔔 **Alert Management** — Severity-based alerts (INFO / WARNING / CRITICAL) with resolve action
- 🌗 **Dark Mode** — Toggle between light and dark themes, saved in localStorage
- 🐳 **Docker-first** — Runs entirely in Docker, no local tooling needed
- 📚 **Swagger UI** — Interactive API documentation at `/swagger-ui.html`
- ⚙️ **Actuator** — Spring Boot health endpoint for monitoring
- 🤖 **CI/CD** — GitHub Actions for backend and frontend

---

## 🏗️ Architecture

```
                  ┌───────────────┐
                  │    Browser    │
                  └───────┬───────┘
                          │ :3000
                          ▼
                  ┌───────────────┐
                  │ React + Nginx │   (port 3000)
                  │  Proxies /api │
                  └───────┬───────┘
                          │ :8080
                          ▼
                  ┌───────────────┐
                  │  Spring Boot  │   (port 8080)
                  │  JWT + REST   │
                  └───────┬───────┘
                          │ :5432
                          ▼
                  ┌───────────────┐
                  │  PostgreSQL   │   (port 5432)
                  └───────────────┘
```

---

## 🛠️ Technology Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Recharts        |
| Backend    | Java 21, Spring Boot 3.3, Spring Security     |
| Auth       | JWT (jjwt 0.12), BCrypt                       |
| Database   | PostgreSQL 16                                 |
| ORM        | Spring Data JPA, Hibernate                   |
| API Docs   | SpringDoc OpenAPI 2 (Swagger UI)              |
| Container  | Docker, Docker Compose                        |
| Web Server | Nginx 1.27                                    |
| CI/CD      | GitHub Actions                                |
| Testing    | JUnit 5, Mockito, MockMvc, Spring Boot Test  |

---

## 📂 Project Structure

```
devops-monitoring-dashboard/
│
├── backend/                    # Spring Boot application
│   ├── src/
│   │   ├── main/java/com/devops/monitoring/
│   │   │   ├── config/         # CORS, OpenAPI configuration
│   │   │   ├── controller/     # REST controllers
│   │   │   ├── dto/            # Request/Response DTOs
│   │   │   ├── entity/         # JPA entities
│   │   │   ├── exception/      # Global exception handling
│   │   │   ├── repository/     # Spring Data repositories
│   │   │   ├── security/       # JWT, SecurityConfig
│   │   │   └── service/        # Business logic
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-docker.yml
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # AuthContext, ThemeContext, NotificationContext
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # ProtectedRoute
│   │   ├── pages/              # Application pages
│   │   ├── services/           # Axios API services
│   │   └── utils/              # Helper utilities
│   ├── nginx.conf
│   └── Dockerfile
│
├── .github/
│   └── workflows/
│       ├── backend.yml         # Java CI
│       └── frontend.yml        # Node CI
│
├── docker-compose.yml
├── .env                        # Dev defaults (ready to use)
├── .env.example                # Template for production
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) + [Docker Compose](https://docs.docker.com/compose/install/)
- That's it! ✅

### Launch

```bash
git clone https://github.com/YOUR_USERNAME/devops-monitoring-dashboard.git
cd devops-monitoring-dashboard
docker compose up --build
```

Wait for the startup sequence to complete (~60-90 seconds):

```
postgres    → healthy
backend     → tables created, admin created, demo data inserted
frontend    → Nginx serving on :3000
```

Open your browser: **http://localhost:3000**

---

## 🔑 Default Credentials

> ⚠️ These credentials are for **development only**. Change them in production.

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| Admin | admin@devops.local  | Admin123! |

---

## 🌐 URLs

| Service      | URL                                        |
|--------------|--------------------------------------------|
| Frontend     | http://localhost:3000                      |
| Backend API  | http://localhost:8080/api                  |
| Swagger UI   | http://localhost:8080/swagger-ui.html      |
| API Docs     | http://localhost:8080/api-docs             |
| Actuator     | http://localhost:8080/actuator/health      |

---

## 📡 API Reference

### Authentication

| Method | Endpoint              | Description       | Auth Required |
|--------|-----------------------|-------------------|---------------|
| POST   | /api/auth/register    | Register user     | No            |
| POST   | /api/auth/login       | Login, get JWT    | No            |

### Servers

| Method | Endpoint              | Description            | Auth Required |
|--------|-----------------------|------------------------|---------------|
| GET    | /api/servers          | List servers (paged)   | Yes           |
| GET    | /api/servers/{id}     | Get server by ID       | Yes           |
| POST   | /api/servers          | Create server          | Yes           |
| PUT    | /api/servers/{id}     | Update server          | Yes           |
| PATCH  | /api/servers/{id}     | Partial update server  | Yes           |
| DELETE | /api/servers/{id}     | Delete server          | Yes           |

**Query Parameters** for `GET /api/servers`:
- `page` (default: 0), `size` (default: 10)
- `search` — filter by name/hostname/IP
- `environment` — DEVELOPMENT, TEST, STAGING, PRODUCTION
- `status` — ONLINE, OFFLINE, WARNING

### Metrics

| Method | Endpoint                         | Description           |
|--------|----------------------------------|-----------------------|
| GET    | /api/servers/{id}/metrics        | Metric history        |
| GET    | /api/servers/{id}/metrics/latest | Latest metric         |

### Alerts

| Method | Endpoint                    | Description      |
|--------|-----------------------------|------------------|
| GET    | /api/alerts                 | List alerts      |
| GET    | /api/alerts/{id}            | Get alert        |
| PATCH  | /api/alerts/{id}/resolve    | Resolve alert    |
| DELETE | /api/alerts/{id}            | Delete alert     |

### Dashboard

| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| GET    | /api/dashboard/summary    | Dashboard statistics |

**Response Example:**
```json
{
  "totalServers": 4,
  "onlineServers": 2,
  "offlineServers": 1,
  "warningServers": 1,
  "criticalAlerts": 2,
  "unresolvedAlerts": 4,
  "averageCpu": 52.3,
  "averageMemory": 67.8,
  "averageDisk": 58.1
}
```

---

## ⚙️ Environment Variables

| Variable            | Default                          | Description                   |
|---------------------|----------------------------------|-------------------------------|
| `POSTGRES_DB`       | `devops_monitoring`              | PostgreSQL database name      |
| `POSTGRES_USER`     | `devops_user`                    | PostgreSQL username           |
| `POSTGRES_PASSWORD` | `devops_password`                | PostgreSQL password           |
| `POSTGRES_PORT`     | `5432`                           | PostgreSQL exposed port       |
| `BACKEND_PORT`      | `8080`                           | Backend exposed port          |
| `FRONTEND_PORT`     | `3000`                           | Frontend exposed port         |
| `JWT_SECRET`        | `dev-development-secret-...`     | JWT signing key               |
| `CORS_ORIGINS`      | `http://localhost:3000,http://localhost:5173` | Allowed CORS origins |

To customize, edit the `.env` file in the project root.

### Production Setup

```bash
# Generate a strong JWT secret
openssl rand -base64 64

# Copy and customize
cp .env.example .env.production
# Edit .env.production with strong values

# Run with production env
docker compose --env-file .env.production up -d
```

---

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
cd backend
mvn test

# Run specific test class
mvn test -Dtest=AuthControllerTest

# Run with coverage report
mvn verify
```

---

## 🤖 CI/CD

GitHub Actions automatically runs on push to `main` or `develop`:

**Backend Pipeline** (`.github/workflows/backend.yml`):
1. Checkout code
2. Set up Java 21 (Temurin)
3. Run Maven tests
4. Build JAR
5. Build Docker image

**Frontend Pipeline** (`.github/workflows/frontend.yml`):
1. Checkout code
2. Set up Node 20
3. Install dependencies (`npm ci`)
4. Run ESLint
5. Build production bundle
6. Build Docker image

---

## 🌿 Git Workflow

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add server filtering by environment
fix: resolve JWT token expiration issue
refactor: extract MetricService from ServerService
docs: update API documentation
test: add ServerController integration tests
chore: update dependencies
ci: add Docker build step to backend workflow
```

### Initialize Git & Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial DevOps monitoring dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/devops-monitoring-dashboard.git
git push -u origin main
```

---

## 🗺️ Roadmap

- [ ] Real-time metrics via WebSocket
- [ ] Email/Slack alert notifications
- [ ] Custom alert thresholds configuration
- [ ] Kubernetes deployment manifests
- [ ] Prometheus/Grafana integration

---

## 📄 License

MIT License — feel free to use this as a starting point for your own projects.
