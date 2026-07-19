# Complete Enterprise Authentication, Authorization, Deployment & Runtime Architecture

Modern enterprise applications are much more than a frontend and a backend. Every user request travels through multiple systems responsible for authentication, authorization, deployment, networking, security, and runtime management. Understanding how these components work together is essential for developers building secure and scalable cloud-native applications.

This article provides a high-level overview of a modern enterprise architecture using **Microsoft Entra ID**, **React**, **Node.js**, **Apigee**, **Google Kubernetes Engine (GKE)**, **GitHub Actions**, **Argo CD**, and **HashiCorp Vault**. Instead of focusing on implementation details, we'll follow the journey of an application—from development and deployment to user authentication and secure API communication.

---

# Enterprise Architecture Diagram

The following diagram illustrates the complete architecture discussed throughout this article.

![Complete Enterprise Architecture](Microsoft%20Entra.png)

---

# Why Do We Need This Architecture?

Imagine building a healthcare application where doctors log in to view patient information. The application must verify the doctor's identity, ensure they have permission to access patient records, securely communicate with multiple backend services, and run reliably even when thousands of users are online.

To achieve this, enterprise applications rely on several specialized components instead of placing all responsibilities inside a single application.

---

# Development & Deployment Pipeline

The software development lifecycle begins when developers write code using technologies such as React for the frontend and Node.js for backend APIs. Once the code is committed to GitHub, an automated CI/CD pipeline takes over.

GitHub Actions builds the application, executes automated tests, creates Docker images, and publishes those images to a container registry. Whenever a new image version is available, Kubernetes deployment manifests are updated in Git, allowing Argo CD to detect the changes automatically.

Using the GitOps approach, Argo CD continuously compares the desired state stored in Git with the current state running inside Google Kubernetes Engine (GKE). If differences exist, Argo CD synchronizes the cluster by deploying the latest application version without manual intervention.

This automation ensures deployments remain consistent, repeatable, and easy to audit.

---

# User Authentication with Microsoft Entra ID

When a user opens the React application, they are not authenticated directly by the application itself. Instead, the application redirects the user to Microsoft Entra ID through the Microsoft Authentication Library (MSAL).

Microsoft Entra verifies the user's identity by checking their credentials and organizational policies. After successful authentication, Entra returns an ID Token and an Access Token to the application.

The ID Token contains information about the signed-in user, such as their name and email address, allowing the frontend to personalize the user experience. The Access Token is then used whenever the application communicates with backend APIs.

This separation keeps user authentication centralized and significantly improves security.

---

# Secure API Communication

Whenever the frontend needs patient information, it sends the Access Token in the HTTP Authorization header.

Before the request reaches the backend service, it passes through Apigee, which acts as the organization's API Gateway.

Apigee performs several important responsibilities:

- Validates incoming tokens
- Applies security policies
- Routes requests
- Logs API traffic
- Enforces rate limits

Only valid requests continue to the backend services, helping protect internal APIs from unauthorized access.

---

# JWT Validation and Authorization

Receiving an Access Token is only the first step. Every backend API must independently verify that the token is genuine before trusting the request.

Middleware inside the Patient API validates the JWT signature, issuer, audience, expiration time, and overall token integrity. If any validation fails, the API immediately returns a **401 Unauthorized** response.

Once the token has been successfully authenticated, the application checks whether the user has the required permissions. These permissions are represented by OAuth scopes such as **Patient.Read** or **Patient.Write**.

If the user lacks the required scope, the API returns **403 Forbidden**, indicating that the user's identity is valid but they are not authorized to perform the requested action.

---

# Communication Between APIs

Enterprise systems rarely consist of a single backend service. Instead, one API often depends on another.

In this architecture, the Patient API may need additional information from the Insurance API. However, the original Access Token cannot simply be forwarded because it was issued specifically for the Patient API.

To solve this problem, the Patient API uses the **On-Behalf-Of (OBO)** flow.

Microsoft Entra exchanges the original token for a new Access Token whose audience is the Insurance API while still representing the same authenticated user. This allows backend services to communicate securely without exposing user credentials.

---

# Service-to-Service Authentication

Not every request originates from a user.

Background jobs, scheduled tasks, and automated services also need secure access to APIs.

These workloads authenticate using the **Client Credentials Flow**, where the application identifies itself using one of the following methods:

- Client Secret
- X.509 Certificate
- Federated Credential

Instead of user permissions (Scopes), these tokens contain **Application Roles**, allowing backend services to communicate securely without user interaction.

---

# Federated Credentials

Traditionally, applications stored client secrets that required regular rotation and secure storage.

Modern cloud platforms instead support **Federated Credentials**, allowing Microsoft Entra to trust external identity providers such as GitHub Actions or Google Cloud.

When GitHub Actions or Google Cloud presents a trusted identity token, Microsoft Entra validates predefined trust rules, including the repository, branch, workflow, issuer, and subject claims. If everything matches, Entra issues a Microsoft Access Token without requiring stored secrets.

This approach greatly improves security while reducing operational overhead.

---

# Running on Kubernetes

Once deployed, the application runs inside Google Kubernetes Engine (GKE).

Kubernetes automatically manages application availability by creating multiple replicas of each service. If a container crashes, Kubernetes replaces it automatically. During deployments, Kubernetes performs rolling updates, allowing new versions to be released without downtime.

This provides scalability, resilience, and high availability for enterprise applications.

---

# End-to-End Request Flow

From the user's perspective, the process is straightforward.

A user signs in using Microsoft Entra, receives an Access Token, calls backend APIs through Apigee, and receives data in response.

Behind the scenes, multiple components collaborate to authenticate the user, validate tokens, authorize requests, exchange tokens between APIs, and securely retrieve information from databases—all without exposing credentials or compromising security.

---

# Conclusion

Although enterprise architectures may initially appear complex, each component has a clearly defined responsibility.

- Microsoft Entra authenticates users.
- MSAL acquires and manages tokens.
- Apigee protects and routes APIs.
- Backend services validate JWTs and enforce authorization.
- GitHub Actions automates builds.
- Argo CD continuously deploys applications using GitOps.
- Kubernetes provides a resilient runtime environment.
- Federated Credentials eliminate the need for stored secrets.

When viewed together, these technologies form a secure, scalable, and maintainable architecture suitable for modern cloud-native enterprise applications.

---
