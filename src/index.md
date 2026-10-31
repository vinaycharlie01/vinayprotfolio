---
layout: home
title: Vinaykumar V A
titleTemplate: false
hero:
  name: Vinaykumar V A
  text: Backend Engineer · Go & Kubernetes
  tagline: 4.5+ years building scalable backend services and cloud-native apps in Golang.
  actions:
    - theme: brand
      text: View Work
      link: /#work
    - theme: alt
      text: Read the Blog
      link: /blog/
    - theme: alt
      text: GitHub
      link: https://github.com/vinaycharlie01
---

## About

Backend Engineer with 4.5+ years of experience developing scalable backend
services and cloud-native applications using Golang. Experienced in
microservices, distributed systems, REST APIs, concurrency, event-driven
architecture, and Kubernetes automation. Hands-on expertise in PostgreSQL,
Kafka, Redis, Docker, Helm, CI/CD, and OpenTelemetry-based observability across
AWS, GCP, and IBM Cloud.

## Skills

- **Languages & Frameworks:** Golang (primary), Gin, concurrency patterns, gRPC, ProtoBuf, RESTful APIs
- **Containers & Orchestration:** Docker, Kubernetes, K3s, Helm, Operators
- **Messaging & Databases:** PostgreSQL, MySQL, MongoDB, Cassandra, ClickHouse, Redis, Kafka
- **Cloud & DevOps:** AWS, GCP, IBM Cloud, Helm, Kubernetes Operators, CI/CD
- **Observability & Debugging:** Instana, OpenTelemetry, Prometheus, Grafana, Elasticsearch/Kibana, Delve
- **CI/CD & Version Control:** Concourse, Git, GitHub, Jenkins
- **Tools & OS:** Linux, macOS, VS Code, Zed, Tilt, Telepresence, JIRA

## Work

### Software Engineer — PineLabs

**May 2026 – Present · Bengaluru, India**

**Stack:** Golang, Microservices, REST API, Kubernetes, Helm, Docker, GCP, Concourse CI/CD, Linux

- Built the QR-code scanning workflow in Golang using clean architecture:
  business logic, database operations, request validation, and error handling.
- Drove the full migration of .NET modules to Golang, including architecture
  design, code improvements, scalability, and Kubernetes deployment.
- Built a queue-based notification framework integrating email, SMS, and
  WhatsApp delivery services for decoupled, scalable processing.
- Designed a reusable caching framework to reduce redundant database queries and
  improve backend performance and scalability.
- Implemented OTP login workflows — send, resend, and verify — through service
  integrations.
- Delivered business and admin REST APIs with validation, business rules,
  database consistency checks, and standardized error handling.
- Integrated OpenTelemetry metrics, traces, and logs for service visibility,
  performance analysis, and production troubleshooting.
- Used Postman and MCP tooling to validate API workflows; built read-only
  PostgreSQL and Microsoft SQL Server MCP tools for AI-assisted schema
  exploration, query analysis, and database troubleshooting.
- Collaborated with DevOps and monitoring teams on Kubernetes deployments,
  observability configuration, and environment troubleshooting.

### Software Developer — IBM | Instana

**Nov 2024 – May 2026 · Kochi, India**

**Stack:** Golang, Kubernetes, Operators, Helm, Docker, GCP, Concourse CI/CD, Linux

- Developed and maintained `stanctl`, a self-hosted CLI in Golang to automate
  Instana deployment.
- Designed, developed, and maintained a Kubernetes Operator in Golang to automate
  the deployment and lifecycle management of Instana components.
- Added CLI automation for creating VPCs on IBM Cloud, provisioning Kubernetes
  clusters, and deploying Instana agents end-to-end.
- Handled major agent upgrades smoothly and added flags to control Helm chart
  values dynamically.
- Enhanced Kubernetes component support, including CoreDNS and Metrics Server
  automation on K3s using Go and YAML templates.
- Designed k8s-diagnostics using Go and client-go for cluster health analysis.

### Software Engineer — MSYS Technology (Client: HPE)

**April 2022 – Nov 2024 · Bangalore, India**

**Stack:** Go, MongoDB, PostgreSQL, Microservices, Kafka, REST API, Elasticsearch, Docker, Jenkins, Consul, Redis

- Built a wellness application for HPE clients that processed storage-array input
  events under an event-driven architecture.
- Wrote Go microservices with pointers, goroutines, channels, concurrency
  patterns, and unit tests; generated Salesforce tickets for HPE support
  engineers to resolve storage-array issues.
- Developed plugins via shared object files and used Kafka for real-time data
  processing and message streaming.
- Containerized services with Docker, automated delivery with Jenkins CI/CD, and
  used Elasticsearch for visualization, queries, and log management.

## Projects

Open-source cloud-native tools I build and maintain under
[Nirantara](https://nirantarasi.github.io/) — full docs at
[nirantarasi.github.io](https://nirantarasi.github.io/).

### k3sctl

Install, upgrade, back up, and reset K3s clusters from one declarative YAML
file, entirely over SSH.

**Docs:** [nirantarasi.github.io/docs/k3sctl](https://nirantarasi.github.io/docs/k3sctl/) · **Stack:** Go, Kubernetes, K3s, SSH

### mssql-mcp-go

A read-only Model Context Protocol server that gives AI assistants structured
access to Microsoft SQL Server.

**Docs:** [nirantarasi.github.io/docs/mssql-mcp-go](https://nirantarasi.github.io/docs/mssql-mcp-go/) · **Stack:** Go, SQL Server, MCP

### postgres-mcp-go

The same read-only MCP toolset for PostgreSQL — schema, profiling, performance,
security, and migration analysis.

**Docs:** [nirantarasi.github.io/docs/postgres-mcp-go](https://nirantarasi.github.io/docs/postgres-mcp-go/) · **Stack:** Go, PostgreSQL, MCP

### omniroute-operator

A Kubebuilder operator that reconciles Deployments, Services, PVCs, and
Ingresses for OmniRoute from a single custom resource.

**Docs:** [nirantarasi.github.io/docs/omniroute-operator](https://nirantarasi.github.io/docs/omniroute-operator/) · **Stack:** Go, Kubernetes, Kubebuilder

### K0s Cluster Shared Framework (k0s-cluster-shared)

**Golang | Kubernetes | Hexagonal Architecture | k0s | k0sctl**

- Designed and implemented a hexagonal (ports & adapters) cluster automation
  library in Go.
- Abstracted Kubernetes cluster lifecycle operations — Apply, Reset, GetStatus,
  and GetKubeconfig — behind clean port interfaces.
- Built a pluggable adapter over the k0sctl action layer to manage control-plane
  and worker nodes programmatically.
- Implemented structured logging with `slog` and followed SOLID principles and
  dependency inversion to decouple business logic from orchestration tools.

### Golang Code Generator

Generate Go structs from JSON.

**Stack:** Go, JSON, Mux

### Image Message Queuing System

API → database → download/compress product images.

**Stack:** Golang, MongoDB, Kafka

### In-Memory Data Aggregation API

High-throughput ad-network aggregation for billions of requests/day with
thread-safe DAU aggregation, Kafka + a dead letter queue, Prometheus/Grafana,
and graceful shutdown.

**Stack:** Go, MongoDB, Docker, Kafka, Prometheus, Grafana

## Achievements

- **Google Cloud Agentic AI Day 2025** — shortlisted among 700+ teams out of
  50,000+ submissions; built an AI solution focused on automation and
  cloud-native deployment.
- **Cardano Blockchain Hackathon** — developed and deployed an AI Agent on the
  Musami Network using Go, integrating backend services with blockchain smart
  contracts.

## Education

**AMC Engineering College** — B.E., Electrical & Electronics Engineering,
2021, Bangalore, India.

## Find Me

- **GitHub:** [github.com/vinaycharlie01](https://www.github.com/vinaycharlie01)
- **LinkedIn:** [linkedin.com/in/vinaycharlie01](https://www.linkedin.com/in/vinaycharlie01)
- **X (Twitter):** [x.com/VinayKshatriy12](https://x.com/VinayKshatriy12)
- **Medium:** [vinaycharlie07.medium.com](https://vinaycharlie07.medium.com/)
- **Email:** [vinikshatriyas@gmail.com](mailto:vinikshatriyas@gmail.com)
- **Phone:** [(+91) 9380862951](tel:+919380862951)
- **Portfolio:** [vinaycharlie01.github.io](https://vinaycharlie01.github.io)
- **Location:** Bengaluru, India
