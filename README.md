# 🗳️ PollWave – Real-Time Polling App (DevOps Powered)

PollWave is a full-stack web application that allows users to create, vote, and view live polls with instant graphical results. It’s built with modern web technologies and integrated DevOps tools to simulate real-world deployment pipelines and infrastructure.

---

## 🚀 Features

- 🔐 User Authentication (Firebase)
- 👥 Role-Based Access (Admin/User)
- 📝 Create and Vote on Polls
- 📊 Live Voting Results with Charts
- 🧼 Admin Panel to Search/Delete Polls
- 🐳 Fully Dockerized (frontend + backend + MongoDB)
- 📦 MongoDB for poll data persistence
- 🌐 Deployed on AWS EC2 with Terraform provisioning
- 📈 Monitoring using Prometheus + Grafana

---

## 🛠️ Tech Stack

| Layer        | Tech Used                        |
|--------------|----------------------------------|
| Frontend     | React.js                         |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB                          |
| Auth         | Firebase Authentication          |
| Charts       | Recharts                         |
| DevOps       | Docker, Terraform, Prometheus, Grafana |
| Cloud        | AWS EC2                          |
| CI/CD        | (Optional: Jenkins, GitHub)      |

---

## 🧰 DevOps Modules Implemented

### ✅ Module 1: AWS, DevOps & Shell Scripting
- EC2 instance provisioning
- Shell commands and access configurations

### ✅ Module 2: Git & GitHub
- Version control using Git
- Remote repo with branches, commits, .gitignore

### ✅ Module 3: Infrastructure as Code (Terraform)
- EC2 instance creation using `main.tf`
- Security group & key pair configuration

### ✅ Module 4: Docker & Docker Compose
- Dockerfile for frontend and backend
- `docker-compose.yml` to orchestrate MongoDB, backend, frontend

### ✅ Module 5: Monitoring (Prometheus + Grafana)
- Prometheus node exporter setup
- Grafana dashboards for server metrics

---


### 🔧 Prerequisites
- Node.js and npm
- MongoDB or MongoDB Atlas
- Docker and Docker Compose
- Terraform CLI
- AWS EC2 + Key Pair
- Firebase project (for auth)

