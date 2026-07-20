# CONTENT_GUIDE.md

# Portfolio Learning Hub Content Organization

This document defines the permanent content organization rules for the Learning Hub.

These rules should be followed whenever creating, moving, or organizing documentation.

---

# Goal

The Learning Hub is a technical knowledge base, not a blog.

It should scale cleanly to hundreds of articles.

Organize by technology domains instead of companies whenever possible.

---

# Top-Level Structure

content/
├── cloud/
├── containers/
├── devops/
├── api/
├── backend/
├── frontend/
├── architecture/
├── security/
└── interview/

---

# Cloud

Cloud contains cloud-provider-specific services.

content/cloud/

├── azure/
├── gcp/
└── aws/

Example:

content/cloud/azure/

├── entra/
├── key-vault/
├── storage-account/
├── app-service/
├── functions/
├── api-management/
├── virtual-network/
├── load-balancer/
├── application-gateway/
├── aks/
└── monitoring/

---

# Containers

content/containers/

├── docker/
└── kubernetes/

Example Kubernetes topics

- Architecture
- Pods
- ReplicaSets
- Deployments
- Services
- Ingress
- ConfigMaps
- Secrets
- Namespaces
- Persistent Volumes
- Helm

---

# DevOps

content/devops/

Examples

- Git
- GitHub Actions
- Azure DevOps
- Argo CD
- Terraform
- CI/CD
- Docker Registry
- Observability

---

# API

content/api/

Examples

- REST
- GraphQL
- OAuth2
- OpenID Connect
- JWT
- Apigee
- API Security
- Rate Limiting
- Versioning

---

# Backend

content/backend/

Examples

- FastAPI
- Node.js
- Databases
- Redis
- Caching

---

# Frontend

content/frontend/

Examples

- React
- TypeScript
- Vite
- HTML
- CSS
- JavaScript

---

# Architecture

Cross-platform concepts.

Examples

- Authentication
- Authorization
- Microservices
- Event Driven Architecture
- System Design
- Messaging
- Load Balancing
- Caching
- Design Patterns

---

# Security

Examples

- Authentication
- Authorization
- Certificates
- SSL/TLS
- Encryption
- Vulnerabilities

---

# Interview

Short revision notes.

Examples

- React
- Node.js
- Docker
- Kubernetes
- Azure
- DevOps
- System Design

---

# Article Structure

Every article must live inside its own folder.

Example

authentication/

├── index.md
└── images/

Another example

pods/

├── index.md
└── images/

Never place images outside the article folder.

---

# URL Structure

Always generate URLs from folder hierarchy.

Examples

content/cloud/azure/entra/app-registrations/

→

/learning/cloud/azure/entra/app-registrations

content/containers/kubernetes/pods/

→

/learning/containers/kubernetes/pods

---

# Markdown Rules

Each article should contain:

- Frontmatter
- Title
- Description
- Tags
- Difficulty
- Estimated reading time

Example

---

title:
description:
tags:
difficulty:
estimatedTime:
lastUpdated:

---

---

# Standard Sections

Whenever appropriate, articles should follow this order.

1. Overview
2. Why it exists
3. Real-world analogy
4. Architecture
5. Step-by-step flow
6. Example
7. Common mistakes
8. Best practices
9. Summary
10. Related articles

---

# Images

Images must be stored inside

images/

and referenced using relative paths.

Example

./images/architecture.png

Never use absolute paths.

---

# Principles

- Keep articles focused on one concept.
- Avoid very large articles.
- Prefer many small connected articles.
- Reuse concepts instead of duplicating content.
- Keep folder names lowercase and kebab-case.
- Keep URLs clean and predictable.
- Preserve backward compatibility whenever possible.

---

# Claude Instructions

Whenever creating or reorganizing content:

- Follow this document.
- Do not invent a different folder structure.
- Do not flatten nested folders.
- Preserve existing URLs whenever possible.
- Prefer extending the current hierarchy over introducing new top-level folders.
- Keep the Learning Hub scalable and consistent.
