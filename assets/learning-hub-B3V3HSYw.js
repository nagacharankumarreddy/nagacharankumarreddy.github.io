import{j as s,C as h}from"./index-5hbiG6Ya.js";const z=({title:t,subtitle:n,beforeTitle:e,children:i})=>s.jsx("section",{className:"learning-hub",id:"learning-hub",children:s.jsxs(h,{children:[e,s.jsx("h1",{children:t}),n&&s.jsx("p",{className:"learning-hub-subtitle",children:n}),i]})}),g=`# Azure Entra ID

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
`,m=`# OAuth 2.0

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
`,p=`# Pods

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
`,f="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0ODAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgNDgwIDEyMCI+CiAgPHJlY3Qgd2lkdGg9IjQ4MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMxNTE1MTUiIHJ4PSIxMiIgLz4KICA8dGV4dCB4PSIyMCIgeT0iNjUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4Ij4KICAgIENsaWVudCDihpIgRW50cmEgSUQg4oaSIEF1dGhvcml6YXRpb24gQ29kZSDihpIgQWNjZXNzIFRva2VuCiAgPC90ZXh0Pgo8L3N2Zz4K",I=/content\/([^/]+)\/([^/]+)\/index\.md$/,C=/content\/([^/]+)\/([^/]+)\/images\/([^/]+)$/,l=t=>t.split("-").filter(Boolean).map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" "),y=(t,n)=>{const e=t.match(/^#\s+(.+)$/m);return e?e[1].trim():l(n)},A=t=>{const e=t.replace(/^#\s+.+$/m,"").trim().split(/\n\s*\n/).map(a=>a.trim()).find(a=>a.length>0&&!a.startsWith("#")&&!a.startsWith("!["));if(!e)return"";const i=e.replace(/[*_`]/g,"").replace(/\s+/g," ").trim();return i.length>140?`${i.slice(0,137)}...`:i},v=Object.assign({"../../../../content/authentication/azure-entra/index.md":g,"../../../../content/authentication/oauth/index.md":m,"../../../../content/kubernetes/pods/index.md":p}),b=Object.assign({"../../../../content/authentication/azure-entra/images/flow.svg":f}),x=(t,n)=>{const e={};for(const[i,a]of Object.entries(b)){const r=i.match(C);if(!r)continue;const[,d,u,c]=r;d===t&&u===n&&(e[`./images/${c}`]=a,e[`images/${c}`]=a)}return e},o=Object.entries(v).map(([t,n])=>{const e=t.match(I);if(!e)return null;const[,i,a]=e;return{slug:a,categorySlug:i,title:y(n,a),description:A(n),content:n,images:x(i,a)}}).filter(t=>t!==null).sort((t,n)=>t.title.localeCompare(n.title)),_=(()=>{const t=new Map;for(const n of o){const e=t.get(n.categorySlug);if(e){e.articleCount+=1;continue}const i=l(n.categorySlug);t.set(n.categorySlug,{slug:n.categorySlug,title:i,description:`${i} notes and articles.`,articleCount:1})}return Array.from(t.values()).sort((n,e)=>n.title.localeCompare(e.title))})(),D=()=>o,P=()=>_,S=(t,n)=>o.find(e=>e.categorySlug===t&&e.slug===n),T=(t,n)=>{const e=o.findIndex(i=>i.categorySlug===t&&i.slug===n);return e===-1?{previous:null,next:null}:{previous:e>0?o[e-1]:null,next:e<o.length-1?o[e+1]:null}},E=P();export{z as L,P as a,T as b,E as c,S as f,D as g};
