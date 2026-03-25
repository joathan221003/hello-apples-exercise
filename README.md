# Hello Apples Exercise

## Overview

This project provisions a simple containerized web application using:

* NodeJS (Express)
* MongoDB
* Docker & Docker Compose

The application displays a "Hello World" page and returns the number of apples stored in the database.

---

## Architecture

The system is composed of two services:

* **app** – NodeJS web application
* **mongo** – MongoDB database

Each component runs in its own container.

### Flow

User Browser → NodeJS App → MongoDB

---

## Database Seed Data

MongoDB is automatically initialized with the following data:

```json
[
  { "_id": 1, "name": "apples", "qty": 5, "rating": 3 },
  { "_id": 2, "name": "bananas", "qty": 7, "rating": 1, "microsieverts": 0.1 },
  { "_id": 3, "name": "oranges", "qty": 6, "rating": 2 },
  { "_id": 4, "name": "avocados", "qty": 3, "rating": 5 }
]
```

---

## Project Structure

```text
hello-apples-exercise/
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── mongo/
│   └── init.js
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Prerequisites

* Docker
* Docker Compose

---

## How to Run

### Provision from scratch

```bash
docker compose up --build -d
```

---

## Access the Application

Open your browser:

http://localhost:3000

---

## Expected Result

You should see:

* Hello World 🍎
* Number of apples in DB: 5

---

## Verification Commands

### Check running containers

```bash
docker compose ps
```

### View logs

```bash
docker compose logs -f
```

### List Docker networks

```bash
docker network ls
```

### Inspect application network

```bash
docker network inspect hello-apples-exercise_app-network
```

---

## Design Decisions

* Each component runs in its own container (separation of concerns)
* Docker Compose is used for orchestration and easy provisioning
* MongoDB is initialized automatically using an init script
* The NodeJS app connects to MongoDB via an internal Docker network
* Environment variables are used for configuration
* Healthcheck was added for MongoDB to ensure proper startup order

---

## Visual Architecture

```text
[ Browser ]
     |
     v
[ NodeJS Container ]
     |
     v
[ MongoDB Container ]

(All connected via Docker bridge network)
```

---

## Future Improvements (Bonus)

* Add CI/CD pipeline with GitHub Actions
* Add Nginx as a reverse proxy / load balancer
* Add health endpoint for the application
* Add automated tests
* Deploy to cloud (AWS / Kubernetes)

---

## Author

Yehonatan Ohana
