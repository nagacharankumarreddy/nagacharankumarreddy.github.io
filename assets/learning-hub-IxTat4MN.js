import{j as o,C as h}from"./index-Cjp9HJVR.js";const D=({title:t,subtitle:n,beforeTitle:e,children:a})=>o.jsx("section",{className:"learning-hub",id:"learning-hub",children:o.jsxs(h,{children:[e,o.jsx("h1",{children:t}),n&&o.jsx("p",{className:"learning-hub-subtitle",children:n}),a]})}),g=`# Azure Entra ID

Azure Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service.

## Key Concepts

- **Tenant** — a dedicated instance of Entra ID representing an organization.
- **App Registration** — how an application identifies itself to Entra ID.
- **Service Principal** — the local representation of an app registration within a tenant.

## Authentication Flow

![Entra ID authorization code flow](./images/flow.svg)

1. The client redirects the user to the Entra ID authorization endpoint.
2. The user signs in and consents to the requested permissions.
3. Entra ID issues an authorization code back to the client.
4. The client exchanges the code for an access token and (optionally) a refresh token.

Here's the same request using the client credentials grant:

\`\`\`bash
curl -X POST https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token \\
  -d "client_id={client_id}" \\
  -d "client_secret={client_secret}" \\
  -d "grant_type=client_credentials" \\
  -d "scope=https://graph.microsoft.com/.default"
\`\`\`

The response contains an \`access_token\` and an \`expires_in\` value, in seconds.

## Common Use Cases

| Scenario | Recommended Flow |
| --- | --- |
| Web app with a signed-in user | Authorization Code + PKCE |
| Daemon / background service | Client Credentials |
| Native / mobile app | Authorization Code + PKCE |

## Rollout Checklist

- [x] Register the application in Entra ID
- [x] Configure redirect URIs
- [ ] Rotate client secrets on a schedule
- [ ] Enable conditional access policies

Learn more in the [official Microsoft identity platform docs](https://learn.microsoft.com/entra/identity-platform/).

> Always scope tokens to the minimum permissions required (least privilege).

---

Related: see the [OAuth 2.0](/learning/authentication/oauth) notes for the underlying authorization framework.
`,p=`# OAuth 2.0

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to a user's account on another service.

## Roles

- **Resource Owner** — the user who owns the data.
- **Client** — the application requesting access.
- **Authorization Server** — issues access tokens after authenticating the resource owner.
- **Resource Server** — hosts the protected resources and accepts access tokens.

## Common Grant Types

- Authorization Code (with PKCE for public clients)
- Client Credentials
- Refresh Token

## Typical Flow

1. The client redirects the user to the authorization server.
2. The user authenticates and grants consent.
3. The authorization server redirects back with an authorization code.
4. The client exchanges the code for an access token.

> OAuth 2.0 is an authorization protocol, not an authentication protocol — OpenID Connect layers authentication on top of it.
`,m=`# Entra Authentication

Notes on authenticating applications and users against Azure Entra ID.

## App Registrations

Every application that needs to authenticate against Entra ID starts with an app registration, which defines its identity, redirect URIs, and requested permissions.

## Token Types

- **ID tokens** identify the signed-in user.
- **Access tokens** authorize calls to a specific API.
- **Refresh tokens** obtain new access tokens without re-prompting the user.
`,f=`# Key Vault

Azure Key Vault centralizes secrets, keys, and certificates so applications never hardcode sensitive values.

## Core Concepts

- **Secrets** — arbitrary key-value pairs (connection strings, API keys).
- **Keys** — cryptographic keys used for signing and encryption operations.
- **Certificates** — managed X.509 certificates with automatic renewal support.

## Access Control

Access is granted via Azure RBAC or legacy access policies — prefer RBAC for consistency with the rest of your Azure resources.
`,y=`# Storage Accounts

Azure Storage accounts provide durable, scalable cloud storage for blobs, files, queues, and tables.

## Blob Storage Tiers

- **Hot** — frequently accessed data, highest storage cost, lowest access cost.
- **Cool** — infrequently accessed data, kept for at least 30 days.
- **Archive** — rarely accessed data, lowest storage cost, highest retrieval latency.

## Redundancy Options

Choose between locally redundant (LRS), zone-redundant (ZRS), and geo-redundant (GRS) storage depending on your durability requirements.
`,A=`# Pods

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
`,I="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0ODAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgNDgwIDEyMCI+CiAgPHJlY3Qgd2lkdGg9IjQ4MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNTE1MTUiIHJ4PSIxMiIgLz4KICA8dGV4dCB4PSIyMCIgeT0iNjUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij4KICAgIENsaWVudCDihpIgRW50cmEgSUQg4oaSIEF1dGhvcml6YXRpb24gQ29kZSDihpIgQWNjZXNzIFRva2VuCiAgPC90ZXh0Pgo8L3N2Zz4K",v=/content\/([^/]+)\/([^/]+)\/index\.md$/,C=/content\/([^/]+)\/([^/]+)\/images\/([^/]+)$/,l=t=>t.split("-").filter(Boolean).map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" "),b=(t,n)=>{const e=t.match(/^#\s+(.+)$/m);return e?e[1].trim():l(n)},_=t=>{const e=t.replace(/^#\s+.+$/m,"").trim().split(/\n\s*\n/).map(s=>s.trim()).find(s=>s.length>0&&!s.startsWith("#")&&!s.startsWith("!["));if(!e)return"";const a=e.replace(/[*_`]/g,"").replace(/\s+/g," ").trim();return a.length>140?`${a.slice(0,137)}...`:a},w=Object.assign({"../../../../content/authentication/azure-entra/index.md":g,"../../../../content/authentication/oauth/index.md":p,"../../../../content/azure/entra-auth/index.md":m,"../../../../content/azure/key-vault/index.md":f,"../../../../content/azure/storage/index.md":y,"../../../../content/kubernetes/pods/index.md":A}),z=Object.assign({"../../../../content/authentication/azure-entra/images/flow.svg":I}),x=(t,n)=>{const e={};for(const[a,s]of Object.entries(z)){const r=a.match(C);if(!r)continue;const[,d,u,c]=r;d===t&&u===n&&(e[`./images/${c}`]=s,e[`images/${c}`]=s)}return e},i=Object.entries(w).map(([t,n])=>{const e=t.match(v);if(!e)return null;const[,a,s]=e;return{slug:s,categorySlug:a,title:b(n,s),description:_(n),content:n,images:x(a,s)}}).filter(t=>t!==null).sort((t,n)=>t.title.localeCompare(n.title)),P=(()=>{const t=new Map;for(const n of i){const e=t.get(n.categorySlug);if(e){e.articleCount+=1;continue}const a=l(n.categorySlug);t.set(n.categorySlug,{slug:n.categorySlug,title:a,description:`${a} notes and articles.`,articleCount:1})}return Array.from(t.values()).sort((n,e)=>n.title.localeCompare(e.title))})(),E=()=>i,S=()=>P,R=(t,n)=>i.find(e=>e.categorySlug===t&&e.slug===n),T=(t,n)=>{const e=i.findIndex(a=>a.categorySlug===t&&a.slug===n);return e===-1?{previous:null,next:null}:{previous:e>0?i[e-1]:null,next:e<i.length-1?i[e+1]:null}},j=S();export{D as L,S as a,T as b,j as c,R as f,E as g};
