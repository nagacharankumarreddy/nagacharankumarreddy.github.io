import{j as l,C as p}from"./index-C3U2kV6m.js";const D=({title:n,subtitle:e,beforeTitle:t,children:i})=>l.jsx("section",{className:"learning-hub",id:"learning-hub",children:l.jsxs(p,{children:[t,l.jsx("h1",{children:n}),e&&l.jsx("p",{className:"learning-hub-subtitle",children:e}),i]})}),g=`# Complete Enterprise Authentication, Authorization, Deployment & Runtime Architecture

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
`,m=`# Pods

A Pod is the smallest deployable unit in Kubernetes — a group of one or more containers that share storage and network resources.

## Key Points

- Containers in the same Pod share the same IP address and port space.
- Pods are ephemeral; they're created and destroyed by higher-level controllers like Deployments.
- Each Pod gets its own IP address within the cluster network.

## Example

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
    - name: app
      image: nginx:latest
      ports:
        - containerPort: 80
\`\`\`

> Pods are rarely created directly in production — use a Deployment or StatefulSet instead so Kubernetes can reschedule and heal them automatically.
`,f="/assets/Microsoft%20Entra-Ht2LSfbq.png",y=/content\/([^/]+)\/(.+)\/index\.md$/,b=/content\/([^/]+)\/(.+)\/images\/([^/]+)$/,h=n=>n.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),v=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/,A=n=>{const e=n.match(v);if(!e)return{body:n};const t=n.slice(e[0].length),i=a=>a.trim().replace(/^["']|["']$/g,""),s={};for(const a of e[1].split(/\r?\n/)){const r=a.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);r&&(s[r[1].trim()]=r[2])}const c=s.tags?s.tags.replace(/^\[|\]$/g,"").split(",").map(i).filter(Boolean):void 0;return{title:s.title?i(s.title):void 0,description:s.description?i(s.description):void 0,tags:c,body:t}},w=(n,e)=>{const t=n.match(/^#\s+(.+)$/m);return t?t[1].trim():h(e)},k=n=>{const t=n.replace(/^#\s+.+$/m,"").trim().split(/\n\s*\n/).map(s=>s.trim()).find(s=>s.length>0&&!s.startsWith("#")&&!s.startsWith("!["));if(!t)return"";const i=t.replace(/[*_`]/g,"").replace(/\s+/g," ").trim();return i.length>140?`${i.slice(0,137)}...`:i},P=Object.assign({"../../../../content/azure/entra-auth/index.md":g,"../../../../content/kubernetes/pods/index.md":m}),I=Object.assign({"../../../../content/azure/entra-auth/images/Microsoft Entra.png":f}),T=(n,e)=>{const t={};for(const[i,s]of Object.entries(I)){const c=i.match(b);if(!c)continue;const[,a,r,u]=c;a===n&&r===e&&(t[u]=s)}return t},o=Object.entries(P).map(([n,e])=>{const t=n.match(y);if(!t)return null;const[,i,s]=t,c=s.split("/").pop()??s,{title:a,description:r,tags:u,body:d}=A(e);return{slug:s,categorySlug:i,title:a??w(d,c),description:r??k(d),tags:u??[],url:`/learning/${i}/${s}`,content:d,images:T(i,s)}}).filter(n=>n!==null).sort((n,e)=>n.title.localeCompare(e.title)),E=(()=>{const n=new Map;for(const e of o){const t=n.get(e.categorySlug);if(t){t.articleCount+=1;continue}const i=h(e.categorySlug);n.set(e.categorySlug,{slug:e.categorySlug,title:i,description:`${i} notes and articles.`,articleCount:1})}return Array.from(n.values()).sort((e,t)=>e.title.localeCompare(t.title))})(),_=()=>o,C=()=>E,S=(n,e)=>o.find(t=>t.categorySlug===n&&t.slug===e),G=(n,e)=>{const t=o.findIndex(i=>i.categorySlug===n&&i.slug===e);return t===-1?{previous:null,next:null}:{previous:t>0?o[t-1]:null,next:t<o.length-1?o[t+1]:null}},z=C();export{D as L,C as a,G as b,z as c,S as f,_ as g};
