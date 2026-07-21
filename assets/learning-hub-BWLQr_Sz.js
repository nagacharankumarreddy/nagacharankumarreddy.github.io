import{j as p,C as A}from"./index-Cb_543cX.js";const cn=({title:t,subtitle:e,beforeTitle:n,sidebar:s,children:i})=>{const o=p.jsxs(p.Fragment,{children:[p.jsx("h1",{children:t}),e&&p.jsx("p",{className:"learning-hub-subtitle",children:e}),i]});return p.jsx("section",{className:"learning-hub",id:"learning-hub",children:p.jsxs(A,{children:[n,s?p.jsxs("div",{className:"learning-hub-with-sidebar",children:[s,p.jsx("div",{children:o})]}):o]})})},v=`---
id: app-registration
title: Microsoft Entra - App Registration & Service Principal
description: Learn how applications are registered in Microsoft Entra, how Service Principals are created, and how Enterprise Applications manage access within a tenant.
learningPath: entra-auth
category: azure
tags:
  - entra
  - app-registration
  - service-principal
---

# Microsoft Entra – App Registration & Service Principal

Microsoft Entra allows applications to securely authenticate users and access protected resources. Before an application can use Microsoft Entra, it must be registered. This process creates an **Application Object**, which acts as the global blueprint of the application.

When that application is used inside a tenant, Microsoft Entra automatically creates a **Service Principal**. The Service Principal is the application's identity within that tenant and is responsible for authentication, authorization, permissions, and access management.

Together, **App Registration**, **Service Principal**, and **Enterprise Application** form the foundation of application identity in Microsoft Entra.

---

# Architecture Diagram

The following diagram illustrates the complete journey from registering an application to granting secure access.

![Microsoft Entra App Registration & Service Principal](./images/app-registration-service-principal.png)

---

# Learning Objectives

After completing this article, you will understand:

- What App Registration is
- What an Application Object is
- What a Service Principal is
- What an Enterprise Application is
- The relationship between these objects
- Permissions and Consent
- Key identifiers
- Authentication flow
- Single-tenant and Multi-tenant behavior

---

# Why Do Applications Need Registration?

Applications cannot directly authenticate users with Microsoft Entra.

Instead, Microsoft Entra needs information about the application, such as:

- Application name
- Redirect URIs
- Supported account types
- API permissions
- Authentication settings
- Certificates or client secrets

This information is stored in an **Application Object**, which is created during App Registration.

---

# Step 1 – App Registration

The process begins when a developer registers an application in Microsoft Entra.

During registration, Microsoft Entra creates an **Application Object** inside the application's home tenant.

This object acts as the global blueprint of the application.

It stores:

- Application (Client) ID
- Redirect URIs
- Authentication settings
- API Permissions
- Certificates & Secrets
- Branding
- Exposed APIs
- Supported Account Types

The Application Object exists only in the application's home tenant.

---

# Step 2 – Application Object

The Application Object defines how an application behaves.

It contains the application's configuration but **does not authenticate users or access resources**.

Instead, it serves as the template used to create Service Principals.

One Application Object can create multiple Service Principals across different Microsoft Entra tenants.

---

# Step 3 – Service Principal

When an application is used inside a tenant—through user sign-in, admin consent, or assignment—Microsoft Entra automatically creates a **Service Principal**.

The Service Principal is the application's identity within that tenant.

Unlike the Application Object, the Service Principal is tenant-specific.

It is responsible for:

- Authentication
- Authorization
- Role Assignments
- Conditional Access
- API Permissions
- Consent
- Resource Access

Every tenant has its own Service Principal for the application.

---

# Step 4 – Enterprise Application

An **Enterprise Application** is the portal representation of the Service Principal.

It provides administrators with a management interface where they can:

- Assign users and groups
- Configure Single Sign-On (SSO)
- Manage permissions
- Grant admin consent
- Configure Conditional Access
- Review sign-in logs
- Manage provisioning

Although it appears as a separate object in the portal, it represents the underlying Service Principal.

---

# Step 5 – Grant Access & Consent

After the Service Principal is created, administrators grant permissions and configure access.

Common configurations include:

- Admin Consent
- User Assignment
- App Roles
- API Permissions
- Conditional Access Policies

These settings are applied to the **Service Principal**, not the App Registration.

---

# Object Relationship

The relationship between these objects is straightforward.

\`\`\`text
Developer
      │
      ▼
App Registration
(Application Object)
      │
      ▼
Service Principal
(Tenant Identity)
      │
      ▼
Enterprise Application
(Portal View)
      │
      ▼
Permissions & Consent
      │
      ▼
Access Protected Resources
\`\`\`

---

# App Registration vs Service Principal vs Enterprise Application

| Feature    | App Registration             | Service Principal          | Enterprise Application              |
| ---------- | ---------------------------- | -------------------------- | ----------------------------------- |
| Purpose    | Global application blueprint | Tenant-specific identity   | Management portal                   |
| Created By | Developer                    | Microsoft Entra            | Microsoft Entra                     |
| Exists In  | Home tenant only             | Every tenant using the app | Every tenant using the app          |
| Stores     | Application configuration    | Permissions & access       | Administration settings             |
| Key ID     | Application (Client) ID      | Object ID                  | Same Object ID as Service Principal |

---

# Key Identifiers

Microsoft Entra creates several unique identifiers.

## Application (Client) ID

Identifies the application globally.

The Client ID remains the same across every tenant.

---

## Object ID (Application)

Identifies the Application Object.

This ID exists only in the home tenant.

---

## Object ID (Service Principal)

Identifies the Service Principal within a tenant.

Every tenant receives its own unique Service Principal Object ID.

---

## Directory (Tenant) ID

Identifies the Microsoft Entra tenant where the application or Service Principal exists.

---

# Authentication Flow

The complete authentication process follows these steps:

1. A developer registers an application.
2. Microsoft Entra creates an Application Object.
3. A user or administrator uses the application.
4. Microsoft Entra creates a Service Principal in that tenant.
5. Administrators configure permissions and consent.
6. Microsoft Entra authenticates users.
7. Security tokens are issued.
8. The application accesses protected resources.

---

# Single-Tenant vs Multi-Tenant Applications

## Single-Tenant

- One App Registration
- One Service Principal
- Used only within one organization

## Multi-Tenant

- One App Registration
- Multiple Service Principals
- One Service Principal is created in every tenant where the application is used

This enables SaaS applications to securely serve multiple organizations while maintaining isolated permissions.

---

# Real-World Example

Imagine you build an HR Portal.

1. You register the application in Microsoft Entra.
2. Microsoft Entra creates the Application Object.
3. Employees sign in using Microsoft Entra.
4. Microsoft Entra creates a Service Principal for your organization.
5. Administrators assign permissions through the Enterprise Application.
6. Microsoft Entra issues JWT tokens.
7. The HR Portal securely accesses Microsoft Graph and other protected resources.

---

# Summary

App Registration, Service Principal, and Enterprise Application work together to provide secure application identity in Microsoft Entra.

The Application Object defines how an application behaves, the Service Principal represents the application within a tenant, and the Enterprise Application provides administrators with a portal to manage access and permissions.

Understanding these concepts is essential before learning OAuth 2.0, OpenID Connect, Microsoft Graph, and enterprise authentication flows.

---

# Key Takeaways

- App Registration creates the Application Object.
- The Application Object is the global blueprint of an application.
- Service Principals are tenant-specific identities.
- Enterprise Applications are the management view of Service Principals.
- One App Registration can create many Service Principals.
- Permissions and consent are assigned to the Service Principal.
- The Client ID remains the same across all tenants.
- Each tenant has its own unique Service Principal.
`,w=`---
id: authorization-code-flow
title: Microsoft Entra - Authorization Code Flow with PKCE
description: Learn how the Authorization Code Flow with PKCE works in Microsoft Entra, understand every step in the authentication process, and discover why it is the recommended OAuth 2.0 flow for modern applications.
learningPath: entra-auth
category: azure
tags:
  - entra
  - oauth
  - pkce
---

# Microsoft Entra – Authorization Code Flow with PKCE

The **Authorization Code Flow with PKCE (Proof Key for Code Exchange)** is Microsoft's recommended OAuth 2.0 authentication flow for modern public client applications such as **Single Page Applications (SPA)**, **Mobile Applications**, and **Desktop Applications**.

Unlike traditional OAuth flows, PKCE adds an additional security layer that protects authorization codes from interception attacks. Instead of relying on a client secret—which public applications cannot securely store—PKCE uses a **Code Verifier** and a **Code Challenge** to prove that the same application requesting authorization is also redeeming the authorization code.

Today, nearly every Microsoft Entra application built with **MSAL (Microsoft Authentication Library)** uses Authorization Code Flow with PKCE behind the scenes.

---

# Architecture Diagram

The following diagram illustrates the complete Authorization Code Flow with PKCE in Microsoft Entra.

![Microsoft Entra Authorization Code Flow with PKCE](./images/authorization-code-flow-pkce.png)

---

# Learning Objectives

After completing this article, you will understand:

- Why PKCE was introduced
- Authorization Code Flow overview
- PKCE architecture
- Code Verifier
- Code Challenge
- Every authentication step
- Token exchange
- Token validation
- Refresh Tokens
- Security benefits
- Best practices
- Common implementation scenarios

---

# Why Was PKCE Introduced?

Originally, the Authorization Code Flow was designed for **confidential client applications**, such as web applications running on secure servers.

These applications could safely store a **Client Secret**.

However, modern applications such as:

- React applications
- Angular applications
- Vue applications
- Mobile apps
- Desktop applications

cannot securely store secrets because anyone can inspect the application code.

Without additional protection, an attacker who intercepted an Authorization Code could exchange it for Access Tokens.

PKCE solves this problem.

Instead of trusting a Client Secret, PKCE proves that the application redeeming the authorization code is the same application that initiated the authentication request.

---

# Actors

Four primary actors participate in the Authorization Code Flow with PKCE.

## User (Resource Owner)

The person attempting to sign in and access protected resources.

Examples include:

- Employees
- Customers
- Administrators

The user authenticates with Microsoft Entra ID.

---

## Client Application

The application requesting authentication.

Examples:

- React SPA
- Angular SPA
- Mobile App
- Desktop Application

This application generates the PKCE values before authentication begins.

---

## Microsoft Entra ID

Microsoft Entra acts as the **Authorization Server**.

Its responsibilities include:

- Authenticating users
- Evaluating Conditional Access policies
- Validating PKCE
- Issuing tokens

---

## Resource Server (API)

The protected API that validates Access Tokens.

Examples include:

- Microsoft Graph
- Azure Resource Manager
- Custom Web APIs

---

# What is Authorization Code Flow with PKCE?

Authorization Code Flow with PKCE is an extension of the standard OAuth 2.0 Authorization Code Flow.

It introduces two additional values:

- Code Verifier
- Code Challenge

These values prevent authorization code interception attacks.

Only the application that generated the original Code Verifier can successfully exchange the Authorization Code for tokens.

---

# Complete Authentication Flow

The authentication process consists of ten major steps.

---

# Step 1 – Initial Authorization Request

The application begins by generating a random **Code Verifier**.

Example:

\`\`\`text
j4D9s8K2pLmQxYtRwE5nUvH3bZcF1aX7
\`\`\`

The application hashes the Code Verifier using SHA-256.

This produces the **Code Challenge**.

The browser is then redirected to Microsoft Entra's authorization endpoint.

The request includes:

- Client ID
- Redirect URI
- Response Type
- Scope
- Code Challenge
- Code Challenge Method (S256)

Example request:

\`\`\`text
GET https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize
\`\`\`

At this point, Microsoft Entra knows which application is requesting authentication.

---

# Step 2 – User Authentication

Microsoft Entra displays the sign-in page.

The user authenticates using one or more methods.

Examples include:

- Username and Password
- Microsoft Authenticator
- Passwordless Sign-in
- Windows Hello
- Security Keys

During authentication Microsoft Entra also evaluates security policies such as:

- Multi-Factor Authentication (MFA)
- Conditional Access
- Identity Protection

If required, user consent is also collected for requested permissions.

Once authentication succeeds, Microsoft Entra prepares an Authorization Code.

---

# Step 3 – Authorization Code Issued

Instead of immediately returning tokens, Microsoft Entra redirects the browser back to the application's registered Redirect URI.

The response contains:

- Authorization Code
- State value

Example:

\`\`\`text
https://localhost:3000/callback?
code=SplxlOBeZQQYbYS6WxSbIA
&state=12345
\`\`\`

The Authorization Code is intentionally short-lived.

It cannot be used to call APIs directly.

Its only purpose is to obtain tokens.

---

# Step 4 – Token Request

The application now sends a secure POST request to Microsoft's token endpoint.

Unlike the initial authorization request, this communication happens directly between the application and Microsoft Entra.

The request contains:

- Authorization Code
- Client ID
- Redirect URI
- Code Verifier
- Grant Type

Example Grant Type:

\`\`\`text
grant_type=authorization_code
\`\`\`

Unlike confidential clients, no Client Secret is required.

Instead, the Code Verifier proves the application's identity.

---

# Step 5 – PKCE Verification

Microsoft Entra now performs PKCE validation.

It hashes the received Code Verifier using SHA-256.

The generated hash is compared with the original Code Challenge submitted during Step 1.

If they match:

- The application is trusted.
- The Authorization Code is valid.
- Authentication succeeds.

If they do not match:

- Token issuance is denied.
- Authentication fails.
- The Authorization Code becomes unusable.

This additional verification prevents attackers from redeeming intercepted authorization codes.

---

# Step 6 – Tokens Issued

After Microsoft Entra successfully validates the PKCE information, it issues security tokens to the client application.

Depending on the requested scopes and OpenID Connect configuration, Microsoft Entra may return:

- ID Token (JWT)
- Access Token (JWT)
- Refresh Token (Optional)

Example response:

\`\`\`json
{
  "token_type": "Bearer",
  "expires_in": 3600,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "id_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "0.AAA..."
}
\`\`\`

Each token serves a different purpose.

| Token         | Purpose                                          |
| ------------- | ------------------------------------------------ |
| ID Token      | Identifies the authenticated user                |
| Access Token  | Access protected APIs                            |
| Refresh Token | Obtain new Access Tokens without another sign-in |

---

# Step 7 – Access Protected APIs

Once the Access Token is received, the client application includes it in every request to a protected API.

Example:

\`\`\`http
GET https://graph.microsoft.com/v1.0/me

Authorization: Bearer eyJhbGciOi...
\`\`\`

Examples of APIs include:

- Microsoft Graph
- Azure Resource Manager
- Custom APIs
- Third-party APIs

The Access Token proves that Microsoft Entra has authenticated the user and granted permission to access the requested resource.

---

# Step 8 – Token Validation

Before returning any data, the Resource Server validates the Access Token.

Typical validation includes:

- Digital Signature
- Issuer (\`iss\`)
- Audience (\`aud\`)
- Expiration (\`exp\`)
- Scopes (\`scp\`)
- Roles
- Tenant ID

If validation succeeds, the API processes the request and returns the requested data.

If validation fails, the request is rejected with an authorization error.

---

# Step 9 – Refresh Token

Access Tokens are intentionally short-lived.

Instead of requiring users to sign in repeatedly, Microsoft Entra issues a Refresh Token.

When the Access Token expires, the application sends the Refresh Token to Microsoft Entra.

Microsoft Entra validates it and returns a new Access Token.

Benefits include:

- Better user experience
- Silent authentication
- Reduced sign-in prompts

---

# Step 10 – Silent Token Renewal

The authentication process continues without interrupting the user.

The sequence becomes:

\`\`\`text
Access Token Expires

        ↓

Client sends Refresh Token

        ↓

Microsoft Entra validates Refresh Token

        ↓

New Access Token

        ↓

Continue calling APIs
\`\`\`

The user does not notice this process because it happens in the background.

---

# Understanding PKCE

PKCE stands for **Proof Key for Code Exchange**.

It protects the Authorization Code from interception attacks.

PKCE introduces two new values:

- Code Verifier
- Code Challenge

---

## Code Verifier

The Code Verifier is a long, random string generated by the client application before authentication begins.

Example:

\`\`\`text
9Jd82kskL20Jdks92KdkLwP092kdLskD9kLs0
\`\`\`

The Code Verifier never leaves the application until the Token Request.

---

## Code Challenge

The Code Challenge is derived from the Code Verifier.

The application performs:

\`\`\`text
SHA-256(Code Verifier)

↓

Base64 URL Encoding

↓

Code Challenge
\`\`\`

Only the Code Challenge is sent during the Authorization Request.

The original Code Verifier remains private.

---

# Why PKCE Works

During the Token Request, Microsoft Entra hashes the received Code Verifier.

It compares the result with the original Code Challenge.

\`\`\`text
Code Verifier

↓

SHA-256

↓

Generated Challenge

↓

Compare

↓

Original Challenge
\`\`\`

If they match:

✅ Tokens are issued.

Otherwise:

❌ Authentication fails.

This ensures only the legitimate application can redeem the Authorization Code.

---

# Sequence Diagram Explained

The complete authentication sequence follows this pattern.

\`\`\`text
User

↓

Client Application

↓

Authorization Request
(code_challenge)

↓

Microsoft Entra ID

↓

Authentication

↓

Authorization Code

↓

Token Request
(code_verifier)

↓

Microsoft Entra validates PKCE

↓

ID Token
Access Token
Refresh Token

↓

Client calls API

↓

Resource Server validates Access Token

↓

Protected Resource Returned
\`\`\`

---

# Important Request Parameters

Several parameters are required during authentication.

| Parameter             | Purpose                                    |
| --------------------- | ------------------------------------------ |
| response_type         | Indicates Authorization Code flow (\`code\`) |
| client_id             | Unique Application ID                      |
| redirect_uri          | Registered callback URL                    |
| scope                 | Requested permissions                      |
| code_challenge        | SHA-256 hash of Code Verifier              |
| code_challenge_method | PKCE method (S256)                         |
| code_verifier         | Original random string                     |
| grant_type            | \`authorization_code\`                       |

Each parameter plays a critical role in securing the authentication process.

---

# Token Types

Microsoft Entra returns different token types depending on the requested scopes.

## ID Token (JWT)

Purpose:

Identify the authenticated user.

Contains claims such as:

- User ID
- Email
- Name
- Roles
- Tenant ID

The application uses this token to establish the user's session.

---

## Access Token (JWT)

Purpose:

Access protected resources.

Contains:

- Scopes
- Permissions
- Audience
- Expiration

Every API request includes the Access Token.

---

## Refresh Token

Purpose:

Request new Access Tokens without requiring the user to authenticate again.

Refresh Tokens improve both usability and security by reducing unnecessary sign-in prompts.

---

# Security Benefits of PKCE

PKCE significantly improves the security of OAuth 2.0 Authorization Code Flow by ensuring that only the application that initiated the authentication request can redeem the Authorization Code.

Without PKCE, an attacker who intercepted the Authorization Code could exchange it for tokens.

With PKCE:

- Authorization Code interception attacks are prevented.
- Only the client that generated the Code Verifier can redeem the Authorization Code.
- Public clients no longer require Client Secrets.
- Microsoft Entra recommends PKCE for all public client applications.

The Code Verifier acts as a proof-of-possession mechanism, ensuring the integrity of the authentication process.

---

# Best Practices

When implementing Authorization Code Flow with PKCE in Microsoft Entra, follow these recommendations.

## Always Use PKCE

Authorization Code Flow with PKCE is the recommended OAuth 2.0 flow for:

- Single Page Applications (SPA)
- Mobile Applications
- Desktop Applications

---

## Always Use HTTPS

Authentication requests and token exchanges should always use HTTPS.

Never transmit tokens over unsecured connections.

---

## Validate the State Parameter

The \`state\` parameter protects applications from Cross-Site Request Forgery (CSRF) attacks.

Always validate the returned state value before processing the authentication response.

---

## Store Tokens Securely

Never expose tokens in browser storage unless absolutely necessary.

Recommended storage options include:

- Secure HTTP-only Cookies
- Secure platform storage (Mobile/Desktop)
- Encrypted application storage

Avoid storing sensitive tokens in localStorage when possible.

---

## Use Short-Lived Access Tokens

Access Tokens should remain short-lived.

Use Refresh Tokens to obtain new Access Tokens instead of extending Access Token lifetimes.

---

## Follow the Principle of Least Privilege

Request only the permissions your application requires.

For example:

Good:

\`\`\`text
User.Read
\`\`\`

Avoid requesting:

\`\`\`text
Directory.ReadWrite.All
\`\`\`

unless it is absolutely necessary.

---

# Common Scenarios

Authorization Code Flow with PKCE is the preferred choice for modern applications.

## Single Page Applications (SPA)

Examples:

- React
- Angular
- Vue
- Blazor WebAssembly

These applications run entirely in the browser and cannot securely store Client Secrets.

---

## Mobile Applications

Examples:

- Android
- iOS
- .NET MAUI
- Flutter
- React Native

PKCE protects authentication even if the application package is publicly available.

---

## Desktop Applications

Examples:

- Windows Desktop
- Electron
- .NET MAUI Desktop
- WPF
- WinUI

Desktop applications use PKCE because users can inspect application binaries.

---

## Progressive Web Apps (PWA)

Progressive Web Apps behave similarly to browser applications and benefit from PKCE's additional protection.

---

# Real-World Example

Imagine Contoso develops an Employee Portal using React.

### Step 1

An employee opens:

\`\`\`text
https://portal.contoso.com
\`\`\`

---

### Step 2

The application generates:

- Code Verifier
- Code Challenge

The user is redirected to Microsoft Entra.

---

### Step 3

The employee signs in using:

- Username
- Password
- Microsoft Authenticator (MFA)

Microsoft Entra validates the user's identity.

---

### Step 4

Microsoft Entra redirects the browser back to the application with an Authorization Code.

---

### Step 5

The React application sends:

- Authorization Code
- Code Verifier

to the Microsoft Entra Token Endpoint.

---

### Step 6

Microsoft Entra verifies the Code Verifier.

Since it matches the original Code Challenge, Microsoft Entra issues:

- ID Token
- Access Token
- Refresh Token

---

### Step 7

The application uses the Access Token to retrieve employee information from Microsoft Graph.

---

### Step 8

When the Access Token expires, the application silently uses the Refresh Token to obtain a new Access Token.

The employee continues working without signing in again.

---

# Why Microsoft Recommends PKCE

Microsoft recommends Authorization Code Flow with PKCE because it provides:

- Strong protection against Authorization Code interception
- Secure authentication for public clients
- Support for Single Sign-On (SSO)
- Integration with Multi-Factor Authentication
- Compatibility with Conditional Access
- Secure token issuance
- Modern OAuth 2.0 compliance

Today, Microsoft Authentication Library (MSAL) automatically implements PKCE for supported public client applications.

---

# Summary

Authorization Code Flow with PKCE is the recommended OAuth 2.0 authentication flow for modern public client applications.

It enhances the standard Authorization Code Flow by introducing the Code Verifier and Code Challenge, ensuring that intercepted Authorization Codes cannot be redeemed by attackers.

This flow enables secure user authentication, token issuance, and API access while integrating seamlessly with Microsoft Entra features such as Single Sign-On (SSO), Multi-Factor Authentication (MFA), and Conditional Access.

If you're building a browser-based, mobile, or desktop application, Authorization Code Flow with PKCE should be your default authentication choice.

---

# Key Takeaways

- Authorization Code Flow with PKCE is Microsoft's recommended OAuth 2.0 flow for public clients.
- PKCE eliminates the need for a Client Secret in public applications.
- Code Verifier and Code Challenge protect Authorization Codes from interception.
- Microsoft Entra validates PKCE before issuing tokens.
- Applications receive ID Tokens, Access Tokens, and optionally Refresh Tokens.
- Access Tokens authorize API access.
- Refresh Tokens enable silent authentication.
- Always use HTTPS, validate the \`state\` parameter, and follow the principle of least privilege.
`,b=`---
id: complete-enterprise-authentication-architecture
title: Microsoft Entra - Complete Enterprise Authentication Architecture
description: Learn how Microsoft Entra provides a complete enterprise authentication architecture by combining identity management, OAuth 2.0, OpenID Connect, Conditional Access, token issuance, Microsoft Graph, and Zero Trust security.
learningPath: entra-auth
category: azure
tags:
  - entra
  - architecture
  - zero-trust
---

# Microsoft Entra – Complete Enterprise Authentication Architecture

Throughout this documentation series, you've explored the individual building blocks of Microsoft Entra authentication—from identity fundamentals and OAuth 2.0 to Microsoft Graph, JWT validation, permissions, and Conditional Access.

This article brings all of those concepts together into a single end-to-end enterprise authentication architecture.

Modern enterprise authentication is much more than validating a username and password. Every sign-in request passes through multiple security layers that verify identity, evaluate risk, enforce policies, issue cryptographically signed tokens, authorize access to resources, and continuously monitor user activity.

Microsoft Entra provides these capabilities as an integrated identity platform, enabling organizations to securely authenticate users, devices, applications, and workloads across Microsoft cloud services, on-premises environments, and third-party SaaS applications.

---

# Architecture Diagram

![Microsoft Entra Complete Enterprise Authentication Architecture](./images/complete-enterprise-authentication-architecture.png)

---

# Learning Objectives

After completing this article, you will understand:

- The complete Microsoft Entra authentication lifecycle
- Core identity components
- Enterprise authentication architecture
- OAuth 2.0 and OpenID Connect in context
- Token issuance and validation
- Continuous Access Evaluation
- Identity Protection
- Conditional Access
- Enterprise application integration
- Monitoring and governance
- Zero Trust implementation

---

# Enterprise Authentication Lifecycle

The complete authentication lifecycle consists of ten major stages.

1. User or workload requests access.
2. Microsoft Entra authenticates the identity.
3. Identity and access signals are evaluated.
4. Authorization and consent are verified.
5. Secure tokens are issued.
6. Applications validate tokens.
7. Continuous access is evaluated.
8. Sign-ins and activity are monitored.
9. Threats are detected and mitigated.
10. Policies are reviewed and continuously improved.

Together, these stages create a secure, adaptive authentication platform that supports modern enterprise workloads.

---

# Step 1 – User or Workload Requests Access

Every authentication process begins when an identity attempts to access a protected resource.

An identity may be:

- Employee
- Customer
- Partner
- Guest user
- Mobile application
- Web application
- Background service
- Daemon application
- Managed identity

The request may target:

- Microsoft 365
- Microsoft Graph
- Azure resources
- Custom APIs
- Third-party SaaS applications
- On-premises applications

Before authentication begins, Microsoft Entra collects contextual information such as:

- Device information
- IP address
- Geographic location
- Client application
- Requested resource
- Risk signals

These signals are used later during Conditional Access evaluation.

---

# Step 2 – Authentication with Microsoft Entra

The application redirects the user to Microsoft Entra for authentication.

Depending on the configured authentication methods, users may authenticate using:

- Password
- Microsoft Authenticator
- Windows Hello for Business
- FIDO2 Security Keys
- Passkeys
- Certificate-based authentication

Microsoft Entra also evaluates:

- Multi-Factor Authentication (MFA)
- Passwordless authentication
- Device compliance
- Conditional Access prerequisites

Successful authentication establishes the user's identity but does not automatically grant access to the requested resource.

---

# Step 3 – Identity and Access Evaluation

After the user's identity is verified, Microsoft Entra evaluates whether access should be allowed.

Several security services participate in this decision.

## Conditional Access

Conditional Access evaluates policies based on signals such as:

- User
- Group membership
- Application
- Device state
- Device compliance
- Location
- Sign-in risk
- User risk

Policies can:

- Grant access
- Require MFA
- Require a compliant device
- Require hybrid Microsoft Entra joined devices
- Block access

---

## Identity Protection

Microsoft Entra Identity Protection continuously analyzes authentication activity for signs of compromise.

Examples include:

- Anonymous IP addresses
- Impossible travel
- Malware-linked IPs
- Password spray attacks
- Leaked credentials
- Suspicious sign-in behavior

Risk detections can automatically trigger Conditional Access policies.

---

# Step 4 – Authorization and Consent

Once authentication and policy evaluation succeed, Microsoft Entra verifies whether the application is authorized to access the requested resource.

Authorization includes:

- OAuth scopes
- Application roles
- Delegated permissions
- Application permissions
- User consent
- Administrator consent

If administrator approval is required and has not yet been granted, the request stops until the required consent is obtained.

Only after authorization succeeds can Microsoft Entra issue security tokens.

---

# Step 5 – Token Issuance

Microsoft Entra generates cryptographically signed JSON Web Tokens (JWTs).

Depending on the authentication flow, the application may receive:

- ID Token
- Access Token
- Refresh Token

Each token contains claims describing:

- User identity
- Tenant
- Application
- Roles
- Scopes
- Token lifetime
- Device information (where applicable)

Before issuance, Microsoft Entra signs the token using its private RSA key.

The resulting JWT can later be validated using Microsoft's published public keys available through the JWKS endpoint.

---

# Step 6 – Access to Applications and Resources

After Microsoft Entra issues an Access Token, the client application presents it to the target resource.

Protected resources may include:

- Microsoft Graph
- Microsoft 365
- Azure Resource Manager
- Power Platform
- Dynamics 365
- Custom Web APIs
- Third-party SaaS applications
- On-premises applications

Before processing the request, the resource validates the Access Token by checking:

- Digital signature
- Issuer (\`iss\`)
- Audience (\`aud\`)
- Expiration (\`exp\`)
- Scopes (\`scp\`)
- Roles (\`roles\`)
- Tenant ID (\`tid\`)

Only if all validation checks succeed does the application authorize access to the requested resource.

---

# Step 7 – Continuous Access Evaluation

Authentication is not a one-time event. After a token has been issued, Microsoft Entra continues evaluating whether access should remain valid.

This capability is known as **Continuous Access Evaluation (CAE)**.

Examples of events that can trigger reevaluation include:

- User account disabled
- Password reset
- Multi-Factor Authentication requirement changes
- User removed from a security group
- Risk level increases
- Administrator revokes sessions
- Conditional Access policy changes

If one of these events occurs, Microsoft Entra can invalidate existing sessions or require the user to authenticate again.

This reduces the window of opportunity for compromised credentials while minimizing unnecessary authentication prompts.

---

# Step 8 – Monitoring and Sign-in Logs

Every authentication event generates telemetry that administrators can use to monitor security and troubleshoot issues.

Microsoft Entra records information such as:

- Successful sign-ins
- Failed sign-ins
- Token issuance
- Conditional Access decisions
- Authentication methods
- Device information
- Client applications
- Geographic location

This information is available through:

- Sign-in Logs
- Audit Logs
- Microsoft Sentinel
- Azure Monitor
- Log Analytics

Monitoring provides visibility into authentication activity across the organization.

---

# Step 9 – Threat Detection and Response

Microsoft Entra integrates with Microsoft Defender and Microsoft Entra ID Protection to detect identity-based threats.

Examples include:

- Leaked credentials
- Password spray attacks
- Impossible travel
- Anonymous IP addresses
- Malware-linked infrastructure
- Suspicious sign-in patterns
- Privileged account abuse

When threats are detected, automated responses may include:

- Requiring MFA
- Blocking access
- Resetting passwords
- Revoking refresh tokens
- Triggering Conditional Access policies
- Generating security alerts

Organizations can also integrate Microsoft Sentinel to automate investigation and response workflows.

---

# Step 10 – Governance and Continuous Improvement

Identity security is an ongoing process.

Microsoft Entra provides governance capabilities that help organizations maintain secure access over time.

Common governance activities include:

- Reviewing Conditional Access policies
- Performing access reviews
- Managing entitlement assignments
- Removing stale accounts
- Auditing privileged roles
- Reviewing administrator consent
- Monitoring application permissions

Continuous improvement ensures that identity policies evolve alongside business requirements and emerging threats.

---

# Identities

Microsoft Entra supports multiple identity types across an enterprise environment.

## Users

Human identities, including:

- Employees
- Contractors
- Partners
- Customers

Users authenticate interactively to access protected resources.

---

## Devices

Devices represent endpoints used to access applications.

Examples include:

- Corporate laptops
- BYOD devices
- Mobile phones
- Tablets
- Virtual desktops

Device registration and compliance status can influence Conditional Access decisions.

---

## Workloads

Applications and services also require identities.

Examples include:

- Azure Functions
- Web APIs
- Background services
- Automation jobs
- Managed Identities

These workload identities authenticate without user interaction.

---

## External Identities

Microsoft Entra supports collaboration with external organizations through:

- Azure AD B2B
- Azure AD B2C
- Guest users
- External partners

External identities enable secure collaboration without requiring separate identity stores.

---

## Service Principals

Every application accessing Microsoft Entra resources is represented by a Service Principal within a tenant.

Service Principals enable:

- Authentication
- Authorization
- Role assignments
- Application permissions

They are the runtime identities used by applications and services.

---

# Microsoft Entra Core Identity Services

Microsoft Entra provides a comprehensive set of identity and access management services.

## User and Group Management

Manage:

- Users
- Groups
- Dynamic groups
- Administrative units

These objects form the foundation of authorization throughout the platform.

---

## Authentication

Microsoft Entra supports modern authentication methods including:

- Passwords
- Passwordless authentication
- Microsoft Authenticator
- FIDO2 security keys
- Windows Hello for Business
- Certificate-based authentication

These methods help organizations improve both security and user experience.

---

## Single Sign-On (SSO)

Single Sign-On allows users to authenticate once and access multiple applications without repeatedly entering credentials.

Supported protocols include:

- OpenID Connect (OIDC)
- OAuth 2.0
- SAML 2.0
- WS-Federation

SSO simplifies access while reducing password fatigue.

---

## Lifecycle Management

Lifecycle Management automates identity processes such as:

- User onboarding
- Role changes
- Department transfers
- Offboarding

Automation helps ensure that access remains aligned with organizational changes.

---

## Self-Service

Self-service capabilities reduce administrative overhead by allowing users to:

- Reset passwords
- Update profile information
- Manage security information
- Register authentication methods

These features improve productivity while maintaining security.

---

## Entitlement Management

Entitlement Management simplifies access governance by automating:

- Access packages
- Approval workflows
- Access expiration
- Periodic reviews

This helps organizations enforce least-privilege access.

---

# Applications and Resources

Microsoft Entra secures a wide variety of applications and workloads.

## Enterprise Applications

Common enterprise integrations include:

- Microsoft 365
- SAP
- Salesforce
- ServiceNow
- Workday
- Custom line-of-business applications

Microsoft Entra provides centralized authentication and authorization across these platforms.

---

## Application Access Patterns

Applications commonly authenticate using:

- OAuth 2.0
- OpenID Connect
- SAML 2.0
- WS-Federation

The protocol selected depends on the application's architecture and compatibility requirements.

---

## Access Methods

Microsoft Entra supports multiple client types, including:

- Web browsers
- Mobile applications
- Desktop applications
- APIs
- Background services

Regardless of the client type, authentication ultimately results in Microsoft Entra issuing secure tokens used to access protected resources.

---

# Cloud, SaaS, and On-Premises Resources

One of Microsoft Entra's greatest strengths is its ability to provide a single identity platform for applications regardless of where they are hosted.

## Microsoft Cloud Resources

Microsoft Entra secures access to Microsoft cloud services including:

- Microsoft 365
- Azure
- Microsoft Graph
- Power Platform
- Dynamics 365
- Microsoft Intune

These services trust Microsoft Entra-issued Access Tokens and support modern authentication standards.

---

## Third-Party SaaS Applications

Microsoft Entra integrates with thousands of Software-as-a-Service (SaaS) applications.

Examples include:

- Salesforce
- ServiceNow
- SAP
- Workday
- AWS
- Google Workspace
- Zoom
- Adobe
- Atlassian
- Box

Most integrations support:

- Single Sign-On (SSO)
- Conditional Access
- Multi-Factor Authentication (MFA)
- Automated user provisioning using SCIM
- Centralized lifecycle management

This enables organizations to manage authentication consistently across both Microsoft and non-Microsoft applications.

---

## On-Premises Resources

Many organizations continue to operate on-premises infrastructure.

Microsoft Entra extends secure access to resources such as:

- Active Directory
- File Servers
- SQL Server
- SharePoint Server
- Internal web applications
- Line-of-business applications

Using technologies such as Microsoft Entra Application Proxy, Hybrid Identity, and federation, organizations can modernize access to legacy applications without requiring them to be rewritten.

---

# Foundational Security and Platform Services

Enterprise authentication is built upon multiple security capabilities working together.

## Multi-Factor Authentication (MFA)

MFA requires users to provide multiple forms of verification before access is granted.

Supported methods include:

- Microsoft Authenticator
- Windows Hello for Business
- FIDO2 Security Keys
- Passkeys
- SMS and voice (where supported)

MFA significantly reduces the effectiveness of stolen credentials.

---

## Passwordless Authentication

Microsoft Entra supports passwordless authentication methods that improve both security and user experience.

Examples include:

- Passkeys
- Windows Hello for Business
- Microsoft Authenticator
- FIDO2 Security Keys

Passwordless authentication reduces phishing attacks and eliminates password fatigue.

---

## Conditional Access

Conditional Access continuously evaluates authentication requests using contextual signals such as:

- User identity
- Device compliance
- Location
- Risk
- Application
- Authentication strength

Policies dynamically determine whether access should be granted, challenged, or blocked.

---

## Zero Trust Security

Microsoft Entra implements Microsoft's Zero Trust security model.

Its core principles are:

- Verify explicitly.
- Use least-privilege access.
- Assume breach.

Rather than trusting users because they are inside the corporate network, every request is evaluated independently using real-time signals.

---

## Encryption

Security depends on protecting both credentials and data.

Microsoft Entra protects information using:

- TLS encryption for data in transit
- RSA cryptography for token signing
- SHA-256 hashing
- JWT digital signatures

These technologies ensure confidentiality, integrity, and authenticity throughout the authentication process.

---

## High Availability and Scalability

Microsoft Entra is designed as a globally distributed identity platform.

Key characteristics include:

- High availability
- Global redundancy
- Automatic failover
- Regional resiliency
- Elastic scalability

This enables organizations to authenticate millions of users across the world with minimal latency.

---

## Privacy and Compliance

Microsoft Entra helps organizations meet regulatory and compliance requirements by providing:

- Audit logging
- Access reviews
- Identity governance
- Data protection
- Compliance reporting

These capabilities support standards such as ISO 27001, SOC, GDPR, HIPAA, and many industry-specific regulations.

---

# Implementation Building Blocks

Successfully deploying Microsoft Entra involves more than enabling authentication. Organizations should follow a structured implementation approach.

## Plan

Begin by identifying:

- Business requirements
- Security objectives
- Protected resources
- User populations
- Compliance requirements

Planning establishes a strong foundation for the identity platform.

---

## Deploy

Configure the Microsoft Entra tenant by:

- Creating App Registrations
- Configuring Enterprise Applications
- Enabling authentication methods
- Defining Conditional Access policies

Deployment should follow a phased rollout strategy.

---

## Integrate

Connect applications and services using supported protocols such as:

- OAuth 2.0
- OpenID Connect
- SAML 2.0
- SCIM

Ensure applications are registered correctly and request only the permissions they require.

---

## Secure

Apply layered security controls including:

- Multi-Factor Authentication
- Conditional Access
- Identity Protection
- Least-Privilege Access
- Privileged Identity Management (PIM)

Security should be embedded throughout the authentication lifecycle.

---

## Monitor

Continuously monitor identity activity using:

- Sign-in Logs
- Audit Logs
- Microsoft Sentinel
- Log Analytics
- Workbooks

Monitoring enables rapid detection of suspicious activity.

---

## Optimize

Identity platforms evolve over time.

Regularly:

- Review Conditional Access policies
- Remove unused applications
- Update authentication methods
- Reduce unnecessary permissions
- Improve user experience

Optimization ensures the environment remains secure and efficient.

---

## Automate

Reduce manual administration by automating:

- User provisioning
- Access reviews
- Lifecycle workflows
- License assignments
- Governance processes

Automation improves consistency and operational efficiency.

---

## Evolve

Identity security is a continuous journey.

As new technologies and threats emerge:

- Adopt new authentication methods.
- Review Zero Trust maturity.
- Improve governance.
- Expand automation.
- Strengthen monitoring and response capabilities.

Continuous improvement is essential for long-term security.

---

# Zero Trust Principles

Microsoft Entra implements Zero Trust across every stage of authentication.

| Principle                | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| **Verify Explicitly**    | Validate identity, device, location, and risk for every request.         |
| **Use Least Privilege**  | Grant only the minimum access required.                                  |
| **Assume Breach**        | Continuously monitor, detect, and respond to threats.                    |
| **Monitor Continuously** | Reevaluate sessions using Continuous Access Evaluation and risk signals. |

These principles guide every authentication and authorization decision.

---

# Common Protocols and Standards

Microsoft Entra supports multiple industry-standard protocols.

| Protocol                  | Primary Purpose                            |
| ------------------------- | ------------------------------------------ |
| **OAuth 2.0**             | Authorization                              |
| **OpenID Connect (OIDC)** | Authentication                             |
| **SAML 2.0**              | Enterprise Single Sign-On                  |
| **WS-Federation**         | Legacy federation scenarios                |
| **SCIM**                  | User provisioning and lifecycle management |
| **JWT**                   | Secure token format                        |
| **FIDO2**                 | Passwordless authentication                |

These standards enable interoperability between Microsoft Entra, enterprise applications, and third-party identity providers.

---

# Best Practices

To build a secure and scalable Microsoft Entra environment:

- Implement Zero Trust principles from the beginning.
- Enable Multi-Factor Authentication for all users.
- Prefer passwordless authentication where possible.
- Protect privileged accounts with stronger authentication methods.
- Use Conditional Access to enforce adaptive access decisions.
- Grant only the minimum permissions required.
- Monitor sign-in activity and audit logs continuously.
- Regularly review access, consent, and application permissions.
- Automate identity lifecycle management wherever possible.
- Keep applications updated to use modern authentication protocols.

---

# Summary

Microsoft Entra provides a comprehensive enterprise identity platform that unifies authentication, authorization, governance, and security across cloud, on-premises, and SaaS environments.

Throughout the authentication lifecycle, Microsoft Entra verifies identities, evaluates contextual risk, enforces Conditional Access policies, issues cryptographically signed tokens, and continuously monitors user and application activity. Combined with Microsoft Graph, Identity Protection, governance capabilities, and Zero Trust principles, it enables organizations to deliver secure, scalable, and seamless access to applications and resources.

Understanding how these components work together allows architects, administrators, and developers to design identity solutions that balance strong security with an excellent user experience.

---

# Key Takeaways

- Microsoft Entra is a complete enterprise identity and access management platform.
- Authentication involves identity verification, policy evaluation, authorization, token issuance, and continuous monitoring.
- OAuth 2.0, OpenID Connect, JWT, Microsoft Graph, and Conditional Access work together to secure applications.
- Zero Trust principles are enforced throughout the authentication lifecycle.
- Continuous Access Evaluation, Identity Protection, and governance help maintain security after sign-in.
- Monitoring, automation, and regular policy reviews are essential for long-term operational success.
- Modern authentication standards enable secure integration with Microsoft, third-party SaaS, and on-premises applications.

---

# Congratulations

You have completed the **Microsoft Entra Authentication Architecture** learning path.

Over the course of this documentation series, you explored:

1. Identity Fundamentals
2. Microsoft Entra Core Architecture
3. App Registration & Service Principal
4. OAuth 2.0 & OpenID Connect
5. OAuth Flow Comparison
6. Authorization Code Flow with PKCE
7. JWT Token Architecture
8. Cryptography Deep Dive
9. Microsoft Graph
10. Permissions & Consent
11. Conditional Access
12. Complete Enterprise Authentication Architecture

Together, these articles provide a complete foundation for understanding how Microsoft Entra secures identities, applications, APIs, and enterprise resources using modern identity standards and Zero Trust principles.
`,T=`---
id: conditional-access
title: Microsoft Entra - Conditional Access
description: Learn how Microsoft Entra Conditional Access evaluates users, applications, devices, locations, and risk signals to enforce adaptive access policies using a Zero Trust security model.
learningPath: entra-auth
category: azure
tags:
  - entra
  - conditional-access
  - zero-trust
---

# Microsoft Entra – Conditional Access

Microsoft Entra Conditional Access is Microsoft's policy engine for enforcing adaptive access decisions. Rather than granting access based solely on a successful sign-in, Conditional Access evaluates multiple signals—such as user identity, device compliance, location, application, and risk—to determine whether access should be granted, blocked, or require additional controls.

Conditional Access is a core component of Microsoft's **Zero Trust** security strategy, ensuring that the right users receive the right level of access to the right resources under the right conditions.

---

# Architecture Diagram

![Microsoft Entra Conditional Access Lifecycle](./images/conditional-access.png)

---

# Learning Objectives

After completing this article, you will understand:

- What Conditional Access is
- How Conditional Access supports Zero Trust
- The Conditional Access lifecycle
- Policy building blocks
- Policy evaluation logic
- Access controls
- Session controls
- Enforcement points
- Policy modes
- Monitoring and reporting
- Best practices

---

# What is Conditional Access?

Conditional Access is a policy-based access control system that evaluates every authentication request before access is granted to protected resources.

Instead of relying on a single authentication event, Microsoft Entra continuously evaluates contextual signals such as:

- Who is signing in
- Which application is being accessed
- Device state
- User risk
- Sign-in risk
- Geographic location
- Client application
- Session context

Based on these signals, Microsoft Entra determines whether to:

- Allow access
- Require additional verification
- Apply session restrictions
- Block access completely

---

# Zero Trust and Conditional Access

Conditional Access is one of the primary enforcement mechanisms for Microsoft's Zero Trust security model.

Zero Trust is based on three guiding principles:

- Verify explicitly.
- Use least-privilege access.
- Assume breach.

Conditional Access implements these principles by ensuring that every access request is evaluated against organizational security policies before access is granted.

For example, an organization might require:

- Multi-Factor Authentication (MFA) when users sign in from outside the corporate network.
- A compliant device before accessing sensitive applications.
- Stronger authentication for administrative accounts.
- Access to be blocked from high-risk locations.

Rather than using static security rules, Conditional Access continuously adapts its decisions based on the current sign-in context.

---

# Conditional Access Lifecycle

Implementing Conditional Access is an ongoing process rather than a one-time configuration. The lifecycle consists of eight major phases.

## Step 1 – Identify and Plan

The first step is understanding business requirements and security objectives.

Typical planning activities include:

- Identifying critical applications
- Defining protected resources
- Assessing security risks
- Determining which users and groups require protection
- Establishing a security baseline

**Output:** An access strategy aligned with business and security goals.

---

## Step 2 – Design Policies

Once requirements are understood, administrators design Conditional Access policies.

This includes selecting:

- Users and groups
- Cloud applications
- Conditions
- Grant controls
- Session controls

At this stage, no policies are enforced; the focus is on designing appropriate access rules.

**Output:** Policy design.

---

## Step 3 – Build Policies

Administrators configure Conditional Access policies within Microsoft Entra.

Typical configuration tasks include:

- Creating new policies
- Selecting included and excluded users
- Defining conditions
- Configuring grant controls
- Configuring session controls
- Enabling Report-only mode for testing

Policies should initially be created without affecting production users.

**Output:** Configured policies.

---

## Step 4 – Test and Validate

Before enabling enforcement, policies should be thoroughly tested.

Microsoft Entra provides several validation capabilities:

- What If analysis
- Policy simulation
- Report-only mode
- Sign-in log review

Testing helps identify unintended access restrictions before policies are enforced.

**Output:** Validated policies ready for deployment.

---

## Step 5 – Deploy

Once validated, policies can be enabled for production.

Recommended rollout strategy:

- Start with a small pilot group.
- Monitor sign-in activity.
- Gradually expand coverage.
- Communicate changes to users.

Incremental deployment minimizes disruption while improving security.

**Output:** Active Conditional Access policies.

---

# Step 6 – Monitor and Analyze

After deployment, Conditional Access policies should be continuously monitored to ensure they are operating as expected.

Microsoft Entra provides several tools for monitoring policy effectiveness:

- Sign-in Logs
- Conditional Access Insights
- Audit Logs
- Workbooks
- Microsoft Sentinel integration

Administrators should review:

- Successful sign-ins
- Failed sign-ins
- MFA prompts
- Blocked access attempts
- Risk detections
- Policy evaluation results

Continuous monitoring helps identify misconfigured policies, unexpected user impact, and emerging security threats.

**Output:** Actionable insights and security alerts.

---

# Step 7 – Optimize

Conditional Access is not a "set it and forget it" feature.

As business requirements evolve, administrators should refine existing policies.

Optimization activities include:

- Tightening or relaxing policy conditions
- Reducing false positives
- Improving user experience
- Adopting new Conditional Access capabilities
- Simplifying overlapping policies

Examples include:

- Expanding passwordless authentication
- Replacing legacy authentication
- Adjusting trusted locations
- Updating authentication strength requirements

**Output:** Optimized policies that balance security and usability.

---

# Step 8 – Govern and Maintain

The final phase focuses on long-term governance.

Organizations should establish processes for:

- Periodic policy reviews
- Access recertification
- Policy documentation
- Security runbooks
- Compliance audits
- Change management

Conditional Access policies should evolve alongside organizational security requirements and regulatory obligations.

**Output:** Well-governed and continuously maintained access policies.

---

# Conditional Access Components

Every Conditional Access policy is built from five primary components.

## Users

The **Users** assignment determines **who** the policy applies to.

Common assignments include:

- All users
- Specific users
- Security groups
- Directory roles
- Guest users
- External users

Exclusions can also be configured for emergency ("break glass") accounts or service accounts.

---

## Cloud Apps or Actions

This component specifies **what resources** the policy protects.

Examples include:

- All cloud apps
- Microsoft 365
- Microsoft Graph
- Azure Management
- Exchange Online
- SharePoint Online
- Teams
- Custom enterprise applications

Policies can target a single application or an entire workload.

---

## Conditions

Conditions define **when** the policy should apply.

Microsoft Entra evaluates multiple signals before making an access decision.

Common conditions include:

### User Risk

Identity Protection assigns a risk level to the user based on indicators such as leaked credentials or suspicious activity.

Levels include:

- Low
- Medium
- High

Organizations commonly require password changes or stronger authentication for risky users.

---

### Sign-in Risk

Sign-in Risk evaluates the likelihood that a specific authentication attempt is malicious.

Signals include:

- Impossible travel
- Anonymous IP addresses
- Malware-linked IPs
- Unfamiliar sign-in properties

Policies can require MFA or block access when risk exceeds an acceptable threshold.

---

### Device State

Policies can evaluate whether the device is:

- Compliant
- Hybrid Microsoft Entra joined
- Registered
- Managed by Microsoft Intune

This ensures only trusted devices access sensitive resources.

---

### Location

Conditional Access can evaluate where users are connecting from.

Examples:

- Trusted corporate networks
- Specific countries or regions
- Named locations
- Unknown locations

Organizations often block access from regions where they have no business presence.

---

### Client Apps

Policies may distinguish between different client types.

Examples include:

- Browser
- Mobile applications
- Desktop applications
- Legacy authentication clients

Many organizations block legacy authentication because it does not support modern security controls such as MFA.

---

# Access Controls

After evaluating the conditions, Microsoft Entra determines what action to take.

Common grant controls include:

## Grant Access

Access is allowed immediately when all policy requirements are satisfied.

---

## Block Access

The request is denied.

Blocking is commonly used for:

- High-risk sign-ins
- Unsupported client applications
- Untrusted locations
- Unauthorized users

---

## Require Multi-Factor Authentication (MFA)

Users must complete an additional authentication factor before access is granted.

Supported methods include:

- Microsoft Authenticator
- FIDO2 security keys
- Windows Hello for Business
- Passkeys
- SMS or voice (where enabled)

---

## Require Compliant Device

The device must be marked as compliant by Microsoft Intune before access is granted.

Compliance policies may evaluate:

- Encryption
- Operating system version
- Antivirus status
- Device health

---

## Require Hybrid Microsoft Entra Joined Device

Access is granted only if the device is joined to the organization's on-premises Active Directory and registered with Microsoft Entra.

This is commonly used for corporate-managed Windows devices.

---

# Session Controls

Conditional Access can continue enforcing security requirements even after authentication.

Common session controls include:

## Sign-in Frequency

Specify how often users must reauthenticate.

Example:

- Every 8 hours
- Every 24 hours
- Every 7 days

---

## Persistent Browser Session

Administrators can control whether browser sessions remain signed in across restarts.

This is particularly useful for shared or kiosk devices.

---

## Application-Enforced Restrictions

Applications such as SharePoint Online can apply additional restrictions based on Conditional Access decisions.

Examples include:

- Read-only access
- Block downloads
- Restrict copy and paste

---

## Microsoft Defender for Cloud Apps Session Controls

Conditional Access integrates with Microsoft Defender for Cloud Apps to provide real-time session monitoring.

Capabilities include:

- Monitor active sessions
- Detect risky behavior
- Prevent sensitive downloads
- Block suspicious actions
- Apply adaptive session policies

---

# Enforcement Points

Conditional Access policies are enforced by Microsoft Entra before access to a protected resource is granted.

The high-level flow is:

\`\`\`text
User Signs In
        │
        ▼
Application Requests Access
        │
        ▼
Microsoft Entra Evaluates Policies
        │
        ▼
Access Decision
   │         │
Grant      Block
   │
Additional Controls (if required)
   │
Protected Resource
\`\`\`

Every authentication request is evaluated against all applicable Conditional Access policies before an Access Token is issued or accepted.

---

# Example Conditional Access Policy Flow

The following example illustrates how Microsoft Entra evaluates a sign-in request using Conditional Access.

### Scenario

An employee attempts to access Microsoft 365 from an unmanaged device while traveling outside the organization's trusted locations.

The organization has configured the following Conditional Access policy:

- Applies to all employees
- Targets Microsoft 365
- Evaluates sign-in risk and location
- Requires Multi-Factor Authentication (MFA)
- Requires a compliant device
- Blocks high-risk sign-ins

### Evaluation Flow

\`\`\`text
User Signs In
        │
        ▼
Microsoft Entra Authenticates User
        │
        ▼
Conditional Access Evaluates:
 • User
 • Application
 • Device
 • Location
 • Risk
        │
        ▼
Policy Matches
        │
        ▼
Grant Controls Applied
 • Require MFA
 • Require Compliant Device
        │
        ▼
User Completes MFA
        │
        ▼
Device Compliance Checked
        │
        ▼
Access Granted
\`\`\`

If the device is not compliant or the sign-in risk exceeds the configured threshold, Microsoft Entra blocks access before an Access Token is issued.

---

# Conditional Access Evaluation Logic

Every sign-in request follows the same evaluation process.

## Step 1 – Collect Signals

Microsoft Entra gathers contextual information, including:

- User identity
- Group membership
- Device compliance
- Device platform
- Client application
- Geographic location
- Sign-in risk
- User risk
- Target application

These signals provide the context needed to evaluate applicable policies.

---

## Step 2 – Evaluate Policies

Microsoft Entra determines which Conditional Access policies apply.

A policy is evaluated only if all configured assignments match.

Assignments include:

- Users and groups
- Cloud apps
- Conditions

Policies that do not match are skipped.

---

## Step 3 – Make an Access Decision

If one or more policies apply, Microsoft Entra combines the required controls and determines the final outcome.

Possible results include:

- Grant access
- Grant access with MFA
- Grant access with a compliant device
- Grant access with additional authentication strength
- Block access

When multiple policies apply, the most restrictive effective outcome is enforced.

---

## Step 4 – Enforce and Log

Once a decision has been made:

- The decision is enforced.
- The sign-in is completed or blocked.
- Details are recorded in Microsoft Entra logs.

Administrators can later review these logs for auditing, troubleshooting, and security investigations.

---

# Policy Modes

Conditional Access policies support different operating modes that help administrators safely deploy and validate new policies.

## Report-only Mode

Report-only mode evaluates policies without enforcing them.

Characteristics:

- No impact on users
- Policy results appear in Sign-in Logs
- Safe for testing
- Supports gradual rollout

This mode is recommended before enabling any new production policy.

---

## On (Enabled)

When enabled, Conditional Access policies are enforced in real time.

Users immediately experience the configured behavior, such as:

- MFA prompts
- Device compliance checks
- Session restrictions
- Access denied

Only move policies to **On** after validating them in Report-only mode.

---

# Reporting and Insights

Microsoft Entra provides several tools for monitoring Conditional Access effectiveness.

## Sign-in Logs

Sign-in Logs show:

- Authentication attempts
- Applied Conditional Access policies
- Grant controls
- Session controls
- Authentication methods
- Success and failure reasons

These logs are the primary tool for troubleshooting access issues.

---

## Audit Logs

Audit Logs record administrative activities such as:

- Policy creation
- Policy updates
- Policy deletion
- Assignment changes
- Grant control modifications

They help track configuration changes over time.

---

## Insights and Reporting

Conditional Access Insights help administrators understand:

- Frequently triggered policies
- Blocked sign-ins
- MFA usage
- Risk detections
- Authentication trends

These reports help refine policies and improve user experience.

---

## Workbooks

Microsoft Entra Workbooks provide customizable dashboards that visualize:

- Sign-in activity
- Conditional Access outcomes
- Risk events
- Device compliance
- Authentication methods
- User trends

Workbooks make it easier to identify patterns and optimize security policies.

---

# Best Practices

Follow these recommendations when implementing Conditional Access.

## Start in Report-only Mode

Validate policies before enforcing them.

Review the impact using Sign-in Logs and Conditional Access Insights.

---

## Use Groups for Assignments

Assign policies to Microsoft Entra groups instead of individual users whenever possible.

Benefits include:

- Easier administration
- Consistent policy application
- Simplified onboarding and offboarding

---

## Protect Emergency Access Accounts

Create dedicated emergency ("break glass") accounts and exclude them from Conditional Access policies.

These accounts should:

- Be monitored closely
- Use strong credentials
- Be reserved for emergencies

---

## Minimize Exclusions

Avoid unnecessary policy exclusions.

Every exclusion creates a potential security gap.

Review exclusions regularly to ensure they remain justified.

---

## Prefer Modern Authentication

Block legacy authentication protocols whenever possible.

Legacy authentication does not support:

- Multi-Factor Authentication
- Conditional Access
- Modern authentication methods

Disabling legacy protocols significantly reduces the attack surface.

---

## Review Policies Regularly

Security requirements change over time.

Periodically review:

- Policy assignments
- Conditions
- Grant controls
- Session controls
- Exclusions

Regular maintenance keeps policies aligned with organizational requirements.

---

# Common Troubleshooting Scenarios

| Issue                               | Possible Cause                 | Resolution                                                 |
| ----------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| User unexpectedly blocked           | Matching Block policy          | Review Sign-in Logs and applicable policies.               |
| MFA not requested                   | Policy conditions not matched  | Verify assignments, conditions, and exclusions.            |
| Access denied from compliant device | Device status not updated      | Check Microsoft Intune compliance and device registration. |
| Policy not applied                  | User or application excluded   | Verify policy assignments and evaluation results.          |
| Legacy client blocked               | Legacy authentication disabled | Upgrade the application to use modern authentication.      |

The **What If** tool and Sign-in Logs are the fastest ways to understand why a policy was or was not applied.

---

# Real-World Example

Contoso wants to protect Microsoft 365 while maintaining a smooth user experience.

The organization creates the following Conditional Access policies:

- Require MFA for all users accessing Microsoft 365.
- Block legacy authentication protocols.
- Require compliant devices for finance applications.
- Require phishing-resistant authentication for administrators.
- Block high-risk sign-ins detected by Microsoft Entra ID Protection.

An employee signs in from a managed corporate laptop using Microsoft Edge.

Microsoft Entra evaluates the sign-in:

- User belongs to the Employees group.
- Device is compliant.
- Sign-in risk is low.
- Location is trusted.
- Browser supports modern authentication.

The applicable policy requires MFA.

After the employee successfully completes Microsoft Authenticator, Microsoft Entra issues an Access Token and grants access to Microsoft 365.

Later, an attacker attempts to sign in using stolen credentials from an anonymous IP address.

Identity Protection marks the sign-in as high risk.

Conditional Access evaluates the request, matches the high-risk sign-in policy, and blocks access before the attacker can obtain an Access Token.

---

# Summary

Conditional Access is Microsoft Entra's adaptive access control engine that enforces Zero Trust principles by evaluating every sign-in against organizational policies.

By considering user identity, device health, location, application, and risk signals, Conditional Access can require additional authentication, enforce device compliance, apply session restrictions, or block access entirely.

Successful implementations follow a continuous lifecycle of planning, testing, deployment, monitoring, optimization, and governance, allowing organizations to improve security while minimizing disruption to legitimate users.

---

# Key Takeaways

- Conditional Access evaluates every sign-in before access is granted.
- Policies combine users, applications, conditions, grant controls, and session controls.
- Report-only mode enables safe policy testing before enforcement.
- Microsoft Entra evaluates contextual signals such as risk, location, device state, and client application.
- Grant controls can require MFA, compliant devices, hybrid joined devices, or block access.
- Sign-in Logs, Audit Logs, Insights, and Workbooks provide visibility into policy behavior.
- Regular monitoring and policy reviews are essential for maintaining an effective Zero Trust security posture.
`,k=`---
id: core-architecture
title: Microsoft Entra - Core Architecture
description: Understand the core architecture of Microsoft Entra ID, including identities, applications, authentication, authorization, policies, resources, and the overall access flow.
learningPath: entra-auth
category: azure
tags:
  - entra
  - architecture
---

# Microsoft Entra – Core Architecture

Microsoft Entra ID is Microsoft's cloud-based Identity and Access Management (IAM) platform. It provides a centralized identity service that authenticates users, authorizes access to resources, and enforces security policies across cloud and on-premises environments.

After learning the fundamentals of digital identity, the next step is understanding how Microsoft Entra is structured internally. This architecture explains how identities, applications, policies, and resources work together to provide secure access.

---

# Architecture Diagram

The following diagram illustrates the complete Microsoft Entra Core Architecture.

![Microsoft Entra Core Architecture](./images/core-architecture.png)

---

# Learning Objectives

After completing this article, you will understand:

- The building blocks of Microsoft Entra
- How identities access applications
- Authentication and authorization flow
- Security policies
- Microsoft Entra infrastructure
- Core directory components
- Trust model
- High-level sign-in flow

---

# What is Microsoft Entra?

Microsoft Entra is Microsoft's cloud Identity and Access Management (IAM) platform.

It provides:

- Secure authentication
- Authorization
- Identity management
- Access management
- Security policy enforcement

Organizations use Microsoft Entra to securely access:

- Microsoft 365
- Azure
- SaaS applications
- On-premises applications
- Custom APIs

---

# Microsoft Entra Core Architecture

The architecture can be divided into six major components.

## 1. Identities

Everything begins with an identity.

Microsoft Entra manages multiple identity types:

- Users
- Groups
- Devices
- Service Principals
- External Identities

An identity represents anyone or anything requesting access to a resource.

---

## 2. Applications

Once an identity exists, it accesses an application.

Applications include:

- App Registrations
- Enterprise Applications
- SaaS Applications
- On-premises Applications
- Custom Applications

Applications trust Microsoft Entra to authenticate users instead of maintaining their own identity databases.

---

## 3. Authentication

Authentication verifies the identity requesting access.

Microsoft Entra supports multiple authentication methods including:

- Username and Password
- Multi-Factor Authentication (MFA)
- Passwordless Authentication
- Risk-Based Authentication
- Federation (ADFS)

Successful authentication results in Microsoft Entra issuing a security token.

---

## 4. Authorization

After authentication, Microsoft Entra determines what the authenticated identity is allowed to access.

Authorization evaluates:

- Roles
- Permissions
- OAuth Scopes
- User Consent
- Access Reviews

Only authorized users receive access to protected resources.

---

## 5. Policies

Policies provide centralized security controls.

Examples include:

- Conditional Access
- Identity Protection
- Token Protection
- Access Packages
- Lifecycle Policies

Policies are evaluated before access is granted.

---

## 6. Resources

The final destination is the protected resource.

Resources may include:

- Microsoft 365
- Azure Resources
- SaaS Applications
- APIs
- On-premises Applications

Applications validate the security token before granting access.

---

# Microsoft Entra Infrastructure

Microsoft Entra is built on Microsoft's globally distributed cloud infrastructure.

It provides:

- Global Datacenters
- Built-in Security & Compliance
- Encryption in transit and at rest
- Monitoring & Telemetry
- Elastic Scalability
- High Availability (99.99% SLA)

This infrastructure allows Microsoft Entra to authenticate millions of users every day.

---

# Core Directory Components

Every Microsoft Entra tenant contains several core components.

## Users

Individual accounts that sign in to applications.

Examples:

- Employees
- Administrators
- Contractors
- Guests

---

## Groups

Collections of users used for permission management.

Instead of assigning permissions individually, administrators assign permissions to groups.

---

## Devices

Registered or joined devices.

Examples include:

- Windows laptops
- macOS devices
- Mobile devices
- Servers

Device identities enable Conditional Access and compliance policies.

---

## Service Principals

A Service Principal represents an application's identity inside a tenant.

Applications use Service Principals to securely access APIs and Azure resources without requiring a user to sign in.

---

## Directory (Tenant)

A Tenant is an isolated Microsoft Entra directory.

Each organization has its own tenant containing:

- Users
- Groups
- Applications
- Devices
- Policies
- Service Principals

---

# Trust & Access Model

Microsoft Entra acts as the trusted identity provider between identities and enterprise resources.

It securely connects:

External Identities

↓

Microsoft Entra Tenant

↓

Internal Identities

↓

Protected Resources

Resources include:

- Microsoft 365
- Azure
- SaaS Applications
- On-premises Systems

---

# High-Level Authentication Flow

Every sign-in follows the same process.

### Step 1 – User Signs In

The user requests access to an application.

↓

### Step 2 – Authentication

Microsoft Entra verifies the user's identity.

↓

### Step 3 – Policy Evaluation

Conditional Access and security policies are evaluated.

↓

### Step 4 – Authorization

Permissions, scopes, and roles are checked.

↓

### Step 5 – Token Issued

Microsoft Entra issues a signed security token containing user claims.

↓

### Step 6 – Resource Access

The application validates the token and grants access to the requested resource.

---

# Security Features

Microsoft Entra includes several built-in security capabilities.

## Single Sign-On (SSO)

Authenticate once and access multiple applications.

## Multi-Factor Authentication (MFA)

Require additional verification beyond passwords.

## Conditional Access

Control access using user, device, location, and risk signals.

## Identity Protection

Detect risky users and suspicious sign-ins.

## Governance & Compliance

Manage access reviews, auditing, and compliance reporting.

---

# Business Benefits

Microsoft Entra provides several enterprise advantages.

- Enhanced Security
- Improved User Productivity
- Reduced Operational Costs
- Centralized Identity Management
- Global Scalability
- High Availability
- Cloud-Native Architecture
- Hybrid Identity Support

---

# Real-World Analogy

Think of Microsoft Entra as a secure airport.

- **Identity** → Passenger
- **Application** → Airline Check-in Counter
- **Authentication** → Passport Verification
- **Authorization** → Boarding Pass Validation
- **Policies** → Security Screening
- **Token** → Boarding Pass
- **Resources** → Airplane

Only passengers with valid identities, approved security checks, and authorized boarding passes can enter the aircraft.

Microsoft Entra follows the same principle for accessing enterprise resources.

---

# Summary

Microsoft Entra is built around six core components:

- Identities
- Applications
- Authentication
- Authorization
- Policies
- Resources

Together, these components provide secure identity management, centralized authentication, policy enforcement, and controlled access to enterprise applications and cloud resources.

Understanding this architecture provides the foundation for learning App Registrations, Service Principals, OAuth 2.0, OpenID Connect, JWTs, Microsoft Graph, and advanced enterprise authentication patterns.

---

# Key Takeaways

- Microsoft Entra is a cloud Identity and Access Management platform.
- Identities authenticate to applications through Microsoft Entra.
- Authentication verifies identity.
- Authorization determines permissions.
- Policies enforce organizational security.
- Service Principals represent applications.
- Tenants provide isolated identity directories.
- Security tokens enable secure access to protected resources.
`,M=`---
id: cryptography
title: Microsoft Entra - Cryptography Deep Dive
description: Learn how Microsoft Entra uses SHA-256, asymmetric cryptography, digital signatures, JWKS, kid, and key rotation to securely sign and validate JWT tokens.
learningPath: entra-auth
category: azure
tags:
  - entra
  - cryptography
  - jwt
---

# Microsoft Entra – Cryptography Deep Dive

Cryptography is the foundation of modern identity and authentication systems. Every time a user signs in to Microsoft Entra ID, cryptographic algorithms ensure that identity tokens cannot be forged, modified, or impersonated.

Rather than relying on passwords after authentication, Microsoft Entra issues digitally signed JSON Web Tokens (JWTs). Applications trust these tokens because they can verify that Microsoft Entra created them and that their contents have not been altered.

Unlike traditional shared-secret authentication, Microsoft Entra uses **asymmetric cryptography**, where a private key signs tokens and a corresponding public key validates them. The public keys are published through a **JSON Web Key Set (JWKS)** endpoint, allowing applications and APIs to verify signatures without ever knowing Microsoft's private keys.

This article explains the cryptographic concepts that power Microsoft Entra authentication, including:

- SHA-256 hashing
- Public and private key cryptography
- Digital signatures
- JWT signing
- JWT verification
- JWKS
- Key IDs (\`kid\`)
- Key rotation
- End-to-end token validation

---

# Architecture Diagram

The following diagram illustrates the complete cryptographic lifecycle used by Microsoft Entra to create, sign, publish, and validate JWT access tokens.

![Microsoft Entra Cryptography Deep Dive](./images/cryptography-deep-dive.png)

The diagram highlights:

- Cryptographic building blocks
- Digital signature generation
- Public/private key relationships
- JWT signing using RS256
- JWKS publication
- Key identification (\`kid\`)
- Key rotation
- Complete verification workflow

---

# Learning Objectives

After completing this article, you will understand:

- Why cryptography is essential in identity systems
- How SHA-256 hashing works
- The difference between symmetric and asymmetric cryptography
- How Microsoft Entra signs JWTs
- How APIs validate JWT signatures
- Why Microsoft publishes JWKS
- How the \`kid\` header identifies signing keys
- How key rotation occurs without service interruption
- Security best practices for JWT validation

---

# Why Cryptography Matters

Modern cloud applications communicate across untrusted networks.

Without cryptography, attackers could:

- Modify JWT tokens
- Pretend to be Microsoft Entra
- Read confidential information
- Replay authentication requests
- Forge user identities

Cryptography prevents these attacks by ensuring three essential security properties.

| Security Property | Purpose                                                 |
| ----------------- | ------------------------------------------------------- |
| Confidentiality   | Prevents unauthorized reading of sensitive information. |
| Integrity         | Detects unauthorized modification of data.              |
| Authenticity      | Confirms the identity of the sender.                    |

Microsoft Entra primarily relies on **integrity** and **authenticity** when issuing JWT tokens.

---

# Cryptography Building Blocks

Microsoft Entra combines several cryptographic technologies to protect identity tokens.

| Building Block          | Purpose                                |
| ----------------------- | -------------------------------------- |
| SHA-256                 | Produces a fixed-length hash of data   |
| Public/Private Key Pair | Signs and verifies tokens              |
| Digital Signature       | Proves token authenticity              |
| JWT                     | Carries authentication claims          |
| JWKS                    | Publishes public keys for verification |
| Key Rotation            | Replaces signing keys securely         |

Each building block contributes to a secure authentication process.

---

# SHA-256 Hash Function

The first building block is the **hash function**.

A hash function transforms data of any size into a fixed-size output called a **hash** or **digest**.

Microsoft Entra uses the **SHA-256** algorithm.

Example:

Input

\`\`\`text
Hello Microsoft Entra
\`\`\`

SHA-256 Output

\`\`\`text
4a81a0d7e18b...
\`\`\`

Regardless of whether the input is:

- 10 bytes
- 1 MB
- 10 GB

SHA-256 always produces a **256-bit (32-byte)** hash.

---

# Characteristics of SHA-256

SHA-256 has several important security properties.

## Deterministic

The same input always produces the same output.

\`\`\`text
Input A
↓

SHA-256

↓

Hash A
\`\`\`

Running the algorithm again produces the exact same hash.

---

## One-Way Function

Hashes cannot be reversed.

\`\`\`text
Data
↓

SHA-256

↓

Hash
\`\`\`

Knowing the hash does not reveal the original data.

This property protects passwords and supports digital signatures.

---

## Avalanche Effect

A tiny change in the input produces a completely different hash.

Example

Original

\`\`\`text
Hello
\`\`\`

Modified

\`\`\`text
hello
\`\`\`

Although only one character changed, the resulting hashes are entirely different.

This makes tampering immediately detectable.

---

## Collision Resistance

A collision occurs when two different inputs produce the same hash.

A secure hash algorithm makes collisions computationally impractical.

SHA-256 is currently considered collision-resistant for practical applications.

---

# Why Microsoft Entra Uses SHA-256

SHA-256 is used because it provides:

- High security
- Excellent performance
- Wide industry adoption
- Strong resistance to collisions
- Compatibility with RSA digital signatures

In Microsoft Entra, SHA-256 is used as part of the **RS256** signing algorithm.

The hash itself is **never** used as the authentication token.

Instead, it becomes part of the digital signature process.

---

# Symmetric vs Asymmetric Cryptography

Cryptographic systems generally fall into two categories.

| Symmetric Cryptography           | Asymmetric Cryptography                |
| -------------------------------- | -------------------------------------- |
| One shared secret key            | Two mathematically related keys        |
| Same key encrypts and decrypts   | Private key signs, public key verifies |
| Faster                           | Slightly slower                        |
| Difficult to distribute securely | Easier for distributed systems         |
| Used for encryption              | Used for identity and signatures       |

Microsoft Entra uses **asymmetric cryptography** because millions of applications must verify Microsoft-issued tokens without accessing Microsoft's private keys.

---

# Public and Private Key Cryptography

Microsoft Entra generates a **key pair**.

\`\`\`
Private Key
      │
Mathematically Linked
      │
Public Key
\`\`\`

Although related mathematically, it is computationally infeasible to derive the private key from the public key.

---

## Private Key

The private key is Microsoft's secret signing key.

It is used to:

- Sign JWTs
- Generate digital signatures
- Prove token authenticity

The private key never leaves Microsoft Entra.

It is stored in highly secure infrastructure and is inaccessible to client applications.

---

## Public Key

The public key is distributed to applications and APIs.

Its purpose is to verify digital signatures.

Because the public key cannot generate signatures, publishing it does not compromise security.

Microsoft publishes these keys through its JWKS endpoint.

---

# Why Two Keys?

Suppose Microsoft used a single shared key.

Every API validating tokens would also possess the ability to create valid tokens.

That would completely break the trust model.

Using asymmetric cryptography solves this problem:

- Microsoft signs with the private key.
- Everyone else verifies using the public key.
- No application can impersonate Microsoft Entra.

This design enables secure authentication across millions of independent applications and services.

---

# Digital Signatures

A digital signature proves two things:

1. The token was created by Microsoft Entra.
2. The token has not been modified since it was signed.

Unlike handwritten signatures, digital signatures are generated using cryptographic algorithms and can be verified mathematically.

The signing process begins by hashing the JWT header and payload with SHA-256. The resulting hash is then signed using Microsoft's private key, producing the signature that becomes the third part of the JWT.

In the next section, we'll examine how Microsoft Entra creates JWT signatures using the **RS256** algorithm and how applications verify them.

# JWT Signature Creation (RS256)

After a user successfully authenticates, Microsoft Entra generates a JSON Web Token (JWT) containing information about the authenticated user, the application, and the granted permissions.

Before the token is issued, Microsoft Entra digitally signs it using the **RS256** algorithm. This signature allows applications and APIs to verify that the token is authentic and has not been modified.

RS256 is one of the most widely adopted signing algorithms for identity providers because it combines:

- RSA asymmetric cryptography
- SHA-256 hashing
- Public/private key authentication

Unlike symmetric algorithms such as HS256, RS256 allows Microsoft Entra to keep its private signing key secret while enabling anyone to validate tokens using the corresponding public key.

---

# JWT Structure

A JWT consists of three Base64URL-encoded sections separated by periods.

\`\`\`text
Header.Payload.Signature
\`\`\`

Example

\`\`\`text
eyJhbGciOiJSUzI1NiIsImtpZCI6IlhTVGUifQ.
eyJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20ifQ.
QbJ83eA...
\`\`\`

Each section has a distinct purpose.

| Section   | Purpose                                |
| --------- | -------------------------------------- |
| Header    | Metadata describing the token          |
| Payload   | User identity and claims               |
| Signature | Digital signature protecting the token |

---

# JWT Header

The header tells the receiving application how the token was signed.

Typical header:

\`\`\`json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "x5teAbc123"
}
\`\`\`

### Header Fields

| Field | Description                   |
| ----- | ----------------------------- |
| alg   | Signing algorithm (RS256)     |
| typ   | Token type (JWT)              |
| kid   | Identifier of the signing key |

The \`kid\` value becomes important during verification because it tells the API which Microsoft public key should be used.

---

# JWT Payload

The payload contains claims describing the authenticated user and the issued token.

Example

\`\`\`json
{
  "iss": "https://login.microsoftonline.com/{tenant}",
  "aud": "api://contoso-api",
  "sub": "11111111-2222-3333-4444-555555555555",
  "exp": 1716761234,
  "iat": 1716757634,
  "name": "Charan"
}
\`\`\`

Common claims include:

| Claim | Description               |
| ----- | ------------------------- |
| iss   | Token issuer              |
| aud   | Intended audience         |
| sub   | Subject identifier        |
| exp   | Expiration time           |
| iat   | Issued-at time            |
| tid   | Microsoft Entra tenant ID |
| oid   | Object ID of the user     |
| scp   | Delegated permissions     |
| roles | Application roles         |

The payload is **encoded**, not encrypted.

Anyone holding the token can decode the payload, so sensitive information should never be stored inside JWT claims.

---

# Signature Generation

The signature protects both the header and payload.

Microsoft Entra performs the following steps.

## Step 1 – Create the JWT Header

The JWT header is converted to Base64URL.

\`\`\`text
Header
↓

Base64URL
\`\`\`

---

## Step 2 – Create the JWT Payload

The payload is also Base64URL encoded.

\`\`\`text
Payload
↓

Base64URL
\`\`\`

---

## Step 3 – Combine Header and Payload

Microsoft Entra concatenates the encoded values.

\`\`\`text
Base64Url(Header)
      +
"."
      +
Base64Url(Payload)
\`\`\`

This string becomes the signing input.

---

## Step 4 – Generate SHA-256 Hash

Microsoft Entra calculates a SHA-256 hash of the signing input.

\`\`\`text
Header.Payload
      │
      ▼
SHA-256
      │
      ▼
256-bit Hash
\`\`\`

This hash uniquely represents the token contents.

If even one character changes, the hash changes completely.

---

## Step 5 – Sign Using Private Key

Microsoft Entra encrypts the SHA-256 hash using its RSA private key.

\`\`\`text
SHA-256 Hash
       │
RSA Private Key
       │
       ▼
Digital Signature
\`\`\`

Only Microsoft's private key can generate this signature.

---

## Step 6 – Construct the JWT

The final JWT becomes:

\`\`\`text
Header.Payload.Signature
\`\`\`

This compact serialization format is transmitted to the client application.

---

# Why Sign Instead of Encrypt?

JWT signatures provide integrity and authenticity.

They guarantee:

- The token originated from Microsoft Entra.
- The contents have not changed.
- The issuer is trusted.

Signing does **not** hide the contents.

Instead, it proves that the visible contents are trustworthy.

---

# JSON Web Key Set (JWKS)

Applications need Microsoft's public keys to verify JWT signatures.

Rather than distributing public keys manually, Microsoft publishes them through a **JSON Web Key Set (JWKS)** endpoint.

A JWKS is a JSON document containing one or more public keys.

Typical endpoint:

\`\`\`text
https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys
\`\`\`

Applications download these public keys automatically.

---

# Example JWKS

\`\`\`json
{
  "keys": [
    {
      "kid": "x5teAbc123",
      "kty": "RSA",
      "use": "sig",
      "n": "...",
      "e": "AQAB"
    }
  ]
}
\`\`\`

---

# Important JWKS Fields

| Field | Description                |
| ----- | -------------------------- |
| kty   | Key type (RSA)             |
| use   | Intended usage (signature) |
| kid   | Unique key identifier      |
| n     | RSA modulus                |
| e     | RSA public exponent        |

These values are sufficient for cryptographic libraries to reconstruct Microsoft's public key.

---

# Why Publish Public Keys?

Without public keys, every application would need Microsoft's private signing key to validate tokens.

That would be impossible from a security perspective.

Instead:

- Microsoft keeps the private key secret.
- Microsoft publishes only the public key.
- APIs validate signatures independently.

This enables secure authentication at Internet scale.

---

# The \`kid\` (Key ID)

A JWT header contains a field called \`kid\`.

\`\`\`json
{
  "alg": "RS256",
  "kid": "x5teAbc123"
}
\`\`\`

The Key ID uniquely identifies which Microsoft signing key created the token.

This becomes especially important because Microsoft maintains multiple active signing keys during key rotation.

---

# Why \`kid\` Is Necessary

Imagine Microsoft's JWKS contains five public keys.

Without a Key ID, an API would have to attempt verification with every key.

Instead, the API performs a simple lookup.

\`\`\`text
JWT Header
      │
      ▼
Read kid
      │
      ▼
Find Matching Key
      │
      ▼
Verify Signature
\`\`\`

This makes verification both efficient and reliable.

---

# How APIs Verify JWT Signatures

Once an API receives a JWT, it validates the signature before trusting any claims.

The verification process consists of four high-level steps.

## Step 1 – Receive the JWT

The API extracts:

- Header
- Payload
- Signature

---

## Step 2 – Read the \`kid\`

The API reads the Key ID from the JWT header.

Example:

\`\`\`json
{
  "kid": "x5teAbc123"
}
\`\`\`

This tells the API exactly which public key should be used.

---

## Step 3 – Retrieve the Public Key

The API downloads (or retrieves from cache) the JWKS document and locates the matching public key using the \`kid\`.

---

## Step 4 – Validate the Signature

The API recalculates the SHA-256 hash of the received header and payload.

Using the selected public key, it verifies that the received signature matches the expected value.

If the values match:

- The token was issued by Microsoft Entra.
- The token has not been modified.
- The signature is valid.

If verification fails, the token must be rejected.

---

# What Happens If the Token Is Modified?

Suppose an attacker changes the user's role from:

\`\`\`text
User
\`\`\`

to

\`\`\`text
Administrator
\`\`\`

Although the payload changes by only a few bytes, the SHA-256 hash changes completely.

The existing signature no longer matches the modified content.

During verification:

- The API computes a new hash.
- The signature check fails.
- Authentication is rejected.

This mechanism prevents token tampering without requiring encryption.

---

# End-to-End Signing and Verification Flow

The complete cryptographic process can be summarized as follows:

1. User signs in to Microsoft Entra.
2. Microsoft Entra creates a JWT.
3. The header and payload are hashed with SHA-256.
4. The hash is signed using Microsoft's private RSA key.
5. The signed JWT is returned to the client.
6. The client sends the JWT to an API.
7. The API reads the \`kid\` from the JWT header.
8. The API retrieves the corresponding public key from the JWKS endpoint.
9. The API verifies the signature.
10. If validation succeeds, the API trusts the token and processes the request.

This trust model allows millions of applications worldwide to validate Microsoft-issued tokens securely without ever accessing Microsoft's private keys.

# Key Rotation in Microsoft Entra

Cryptographic keys should never be used indefinitely. Over time, keys may become vulnerable due to age, advances in computing power, or potential compromise. To maintain a strong security posture, Microsoft Entra periodically rotates its signing keys.

Key rotation is the process of replacing an existing signing key with a new one while ensuring that existing applications continue to function without interruption.

The architecture shown in the diagram illustrates the lifecycle of a signing key.

---

## Step 1 – Generate a New Key Pair

Microsoft Entra generates a new RSA public/private key pair.

\`\`\`text
Private Key
        │
Mathematically Linked
        │
Public Key
\`\`\`

The new private key becomes the active signing key for newly issued tokens.

---

## Step 2 – Publish the New Public Key

The corresponding public key is published to the Microsoft Entra JWKS endpoint.

Applications that periodically download the JWKS document automatically receive the new key.

No manual configuration is required.

---

## Step 3 – Sign New Tokens

After the new key becomes active, Microsoft Entra begins signing all newly issued JWTs using the new private key.

New JWTs also contain a new **kid** value identifying the active signing key.

Example

\`\`\`json
{
  "alg": "RS256",
  "kid": "x5teNew987"
}
\`\`\`

---

## Step 4 – Retain Older Keys

Existing access tokens that were issued before rotation may still be valid.

Removing the previous public key immediately would cause those tokens to fail validation.

Instead, Microsoft Entra temporarily keeps the old public key in the JWKS document.

This allows APIs to validate both old and new tokens simultaneously.

---

## Step 5 – Retire Old Keys

Once all tokens signed with the previous key have expired, Microsoft removes the old public key from the JWKS endpoint.

The old private key is securely retired.

This completes the rotation cycle.

---

# Benefits of Key Rotation

Key rotation provides several important security and operational benefits.

| Benefit            | Description                                        |
| ------------------ | -------------------------------------------------- |
| Improved Security  | Limits exposure if a key is compromised            |
| Seamless Operation | Existing tokens continue working                   |
| Zero Downtime      | Applications require no manual changes             |
| Better Compliance  | Meets security and regulatory requirements         |
| Reduced Risk       | Limits the impact of long-lived cryptographic keys |

---

# Why APIs Should Never Hardcode Keys

One of the most common implementation mistakes is embedding Microsoft's public keys directly into an application.

For example:

\`\`\`text
❌ Store Microsoft's public key inside the application.
\`\`\`

This approach breaks as soon as Microsoft rotates its signing keys.

Instead, applications should always retrieve public keys dynamically from the JWKS endpoint.

\`\`\`text
✔ Read kid
✔ Download JWKS
✔ Select matching key
✔ Validate signature
\`\`\`

Using JWKS ensures that applications automatically trust new signing keys when Microsoft performs key rotation.

---

# SHA-256 in Microsoft Entra

Throughout the authentication process, SHA-256 is used as part of the RS256 signing algorithm.

Its responsibilities include:

- Creating a unique digest of the JWT header and payload
- Detecting unauthorized modifications
- Producing the input for RSA digital signatures

It is important to note that SHA-256 is **not** an encryption algorithm.

Instead, it is a cryptographic hash function used to verify integrity.

---

## Why SHA-256?

Microsoft Entra uses SHA-256 because it offers:

- Strong collision resistance
- High performance
- Wide industry support
- Compatibility with RSA
- Secure digital signature generation

These characteristics make SHA-256 the standard choice for signing JWTs in enterprise identity platforms.

---

# Complete Authentication Flow

The following sequence summarizes the complete authentication and verification process.

## Step 1 – User Signs In

The user authenticates with Microsoft Entra using credentials and any required security policies, such as Multi-Factor Authentication (MFA) or Conditional Access.

---

## Step 2 – Token Is Created

Microsoft Entra builds the JWT.

The token contains:

- Header
- Payload
- Claims

---

## Step 3 – Token Is Signed

Microsoft Entra:

1. Creates a SHA-256 hash of the header and payload.
2. Signs the hash using the private RSA key.
3. Produces the JWT signature.

The completed token becomes:

\`\`\`text
Header.Payload.Signature
\`\`\`

---

## Step 4 – Token Is Sent to the Client

The signed JWT is returned to the application.

The client stores the token securely and includes it in the Authorization header when calling APIs.

Example:

\`\`\`http
GET https://graph.microsoft.com/v1.0/me
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
\`\`\`

---

## Step 5 – API Receives the Token

The resource server extracts:

- Header
- Payload
- Signature

The API reads the **kid** from the header.

---

## Step 6 – API Retrieves the Public Key

The API downloads (or retrieves from cache) the Microsoft Entra JWKS document.

Using the **kid**, it selects the correct public key.

---

## Step 7 – Signature Validation

The API recalculates the SHA-256 hash of the header and payload.

Using the selected public key, it verifies the JWT signature.

If the signature is valid, the API continues with additional checks, including:

- Issuer (\`iss\`)
- Audience (\`aud\`)
- Expiration (\`exp\`)
- Not Before (\`nbf\`)
- Tenant ID (\`tid\`)
- Required scopes (\`scp\`)
- Application roles (\`roles\`)

---

## Step 8 – Access Is Granted

Once all validations succeed, the API processes the request and returns the requested resource.

At no point does the API require Microsoft's private signing key.

---

# Security Best Practices

When validating JWTs issued by Microsoft Entra, follow these recommendations:

- Always validate the JWT signature before reading claims.
- Always retrieve public keys from the official JWKS endpoint.
- Never hardcode Microsoft's signing keys.
- Validate the \`kid\` to select the correct public key.
- Verify the issuer (\`iss\`) matches the expected Microsoft Entra tenant.
- Verify the audience (\`aud\`) matches your application or API.
- Reject expired tokens by validating the \`exp\` claim.
- Validate \`nbf\` (Not Before) to ensure the token is active.
- Request only the minimum permissions required (Least Privilege).
- Enable Multi-Factor Authentication and Conditional Access for additional protection.
- Monitor sign-in logs and token validation failures.
- Keep authentication libraries up to date to support current cryptographic standards.

---

# Real-World Example

Consider an enterprise application used by Contoso.

1. An employee signs in using Microsoft Entra.
2. Microsoft Entra authenticates the user and evaluates Conditional Access policies.
3. A JWT access token is generated.
4. Microsoft Entra hashes the token data with SHA-256.
5. The hash is signed using Microsoft's private RSA key.
6. The signed token is returned to the web application.
7. The application calls Microsoft Graph using the access token.
8. Microsoft Graph reads the \`kid\` from the JWT header.
9. Microsoft Graph retrieves the matching public key from the JWKS endpoint.
10. The JWT signature is verified successfully.
11. Microsoft Graph validates the issuer, audience, and token lifetime.
12. The requested user profile is returned.

This workflow allows Microsoft Graph to trust the token without ever having access to Microsoft's private signing key.

---

# Summary

Cryptography is the trust foundation of Microsoft Entra authentication. By combining SHA-256 hashing, RSA public/private key cryptography, digital signatures, and JSON Web Tokens, Microsoft Entra enables applications to verify identity securely without sharing secret keys.

Public keys are published through the JWKS endpoint, allowing APIs to validate signatures independently. The \`kid\` claim ensures that the correct signing key is selected, while key rotation allows Microsoft to replace signing keys without interrupting running applications.

Together, these mechanisms provide integrity, authenticity, scalability, and operational resilience for millions of authentication requests every day.

---

# Key Takeaways

- SHA-256 produces a fixed-size cryptographic hash used during token signing.
- Microsoft Entra uses asymmetric cryptography based on RSA key pairs.
- Private keys sign JWTs and never leave Microsoft infrastructure.
- Public keys are published through the JWKS endpoint for signature verification.
- Digital signatures ensure that JWTs are authentic and have not been modified.
- The \`kid\` claim identifies which public key should be used for verification.
- Key rotation replaces signing keys securely without affecting existing applications.
- Applications should always validate JWT signatures before trusting token claims.
- Public keys should be obtained dynamically from the JWKS endpoint rather than hardcoded.
`,S=`---
id: identity-fundamentals
title: Microsoft Entra - Identity Fundamentals
description: Learn the foundational concepts of Microsoft Entra ID including digital identity, authentication, authorization, identity types, SSO, MFA, and the identity lifecycle.
learningPath: entra-auth
category: azure
tags:
  - entra
  - identity
  - fundamentals
---

# Microsoft Entra – Identity Fundamentals

Microsoft Entra ID is Microsoft's cloud-based Identity and Access Management (IAM) platform. It enables organizations to securely manage users, applications, devices, and access to enterprise resources.

Every modern enterprise application relies on digital identities. Whether a user signs in to Microsoft 365, a developer accesses Azure, or an application communicates with another service, Microsoft Entra is responsible for verifying identities and controlling access.

Before learning OAuth 2.0, OpenID Connect, JWTs, App Registrations, or Microsoft Graph, it is important to understand the identity fundamentals. These concepts serve as the building blocks for every authentication and authorization flow discussed later in this learning path.

---

# Architecture Overview

The following diagram provides a high-level overview of the identity concepts covered in this article.

![Microsoft Entra Identity Fundamentals](./images/identity-fundamentals.png.png)

---

# What You'll Learn

In this article, you'll learn:

- What digital identity means
- Authentication vs Authorization
- Single Sign-On (SSO)
- Multi-Factor Authentication (MFA)
- Identity types
- Identity sources
- Microsoft Entra identity ecosystem
- Identity lifecycle
- Common identity terminology

---

# What Is Digital Identity?

A digital identity represents a person, application, service, or device within Microsoft Entra.

Every identity contains unique information that allows Microsoft Entra to verify who or what is requesting access to resources. Instead of applications storing user accounts independently, organizations centralize identity management within Microsoft Entra.

Examples of digital identities include:

- Employees
- Administrators
- Guest users
- Applications
- Services
- Registered devices

---

# Authentication vs Authorization

Although these terms are often used together, they solve different problems.

## Authentication

Authentication answers one question:

> **Who are you?**

Microsoft Entra verifies an identity using credentials such as:

- Username and Password
- Multi-Factor Authentication (MFA)
- Biometrics
- Certificates
- Security Keys

Once verification succeeds, Microsoft Entra issues a security token.

---

## Authorization

Authorization answers another question:

> **What are you allowed to do?**

Applications inspect the security token and determine which resources the authenticated identity is permitted to access.

Authentication always happens before authorization.

---

# Single Sign-On (SSO)

Without Single Sign-On, users would need to authenticate separately for every application they use.

Microsoft Entra allows users to authenticate once and securely access multiple trusted applications without repeatedly entering credentials.

Benefits of SSO include:

- Improved user experience
- Fewer passwords
- Reduced help desk requests
- Better security

---

# Multi-Factor Authentication (MFA)

Passwords alone are no longer sufficient for protecting enterprise accounts.

Microsoft Entra supports Multi-Factor Authentication by requiring an additional verification factor, such as:

- Microsoft Authenticator
- SMS verification
- Phone call
- Hardware security key
- Biometric authentication

Even if a password is compromised, MFA significantly reduces the likelihood of unauthorized access.

---

# Identity Types

Microsoft Entra manages several categories of identities.

## User Identities

Represent employees, administrators, contractors, or guest users who interact with enterprise applications.

---

## Group Identities

Groups simplify permission management by allowing administrators to assign permissions to collections of users instead of individual accounts.

---

## Application Identities

Applications and background services often require secure access to APIs and cloud resources without acting as a human user.

Microsoft Entra provides application identities specifically for these workloads.

---

## Device Identities

Computers, laptops, mobile devices, and servers can be registered with Microsoft Entra.

Device identities enable security features such as Conditional Access and device compliance policies.

---

# Identity Sources

Organizations commonly manage identities from multiple sources.

## Microsoft Entra ID

Cloud-native identities managed entirely within Microsoft Entra.

---

## On-Premises Active Directory

Traditional Windows Active Directory running inside an organization's datacenter.

---

## Hybrid Identity

Many organizations synchronize identities between Active Directory and Microsoft Entra, allowing users to access both cloud and on-premises resources using the same account.

---

## External Identities

Microsoft Entra also supports external users, partners, vendors, and customers through Business-to-Business (B2B) and Business-to-Consumer (B2C) capabilities.

---

# Identity Lifecycle

Every successful sign-in follows a similar sequence.

\`\`\`text
Sign-in Request
        ↓
Authentication
        ↓
Security Token Issued
        ↓
Authorization
        ↓
Access Granted
\`\`\`

During this process:

1. A user or application requests access.
2. Microsoft Entra verifies the identity.
3. A security token is issued.
4. The application validates the token.
5. Permissions are evaluated.
6. Access is granted or denied.

---

# Microsoft Entra Identity Ecosystem

Microsoft Entra serves as the central identity platform connecting identities with enterprise resources.

It manages:

- Users
- Groups
- Applications
- Devices

It also provides:

- Authentication
- Authorization
- Identity Directory
- Security Policies
- Conditional Access
- Multi-Factor Authentication

These services enable secure access to:

- Cloud Applications
- APIs
- Microsoft 365
- Azure Resources
- On-Premises Applications
- Enterprise Services

---

# Key Concepts

## Claim

A claim is a piece of information stored inside a security token.

Examples include:

- User Name
- Email Address
- Object ID
- Tenant ID
- Roles

---

## Scope

A scope represents a delegated permission granted to an application on behalf of a signed-in user.

Example:

- User.Read
- Patient.Read
- Files.Read

---

## Role

Roles define what a user or application is allowed to do inside an organization or application.

---

## Tenant

A tenant is a dedicated Microsoft Entra directory that represents an organization.

Every organization has its own isolated tenant containing users, groups, applications, and security policies.

---

# Real-World Analogy

Imagine entering a secure office building.

- You are the **User**.
- The receptionist is **Microsoft Entra**.
- Your employee badge is the **Access Token**.
- Security guards verify your badge before allowing entry.
- Different office rooms represent applications and APIs.
- Your badge determines which rooms you can enter.

Microsoft Entra works in the same way. It first verifies your identity and then determines which resources you are authorized to access.

---

# Summary

Microsoft Entra provides the foundation for identity and access management in modern enterprise environments.

It centralizes identity management, verifies users and applications, issues security tokens, and controls access to enterprise resources.

Understanding these concepts makes it significantly easier to learn OAuth 2.0, OpenID Connect, JWTs, App Registrations, Microsoft Graph, and the complete enterprise authentication architecture covered later in this learning path.

---

# Key Takeaways

- Microsoft Entra is Microsoft's cloud identity platform.
- Authentication verifies identity.
- Authorization controls access.
- Digital identities include users, applications, groups, and devices.
- SSO improves user experience.
- MFA strengthens security.
- Tokens carry identity information between applications.
- Microsoft Entra centralizes enterprise identity management.
`,E=`---
id: jwt-token-architecture
title: Microsoft Entra - JWT Token Architecture
description: Learn what a JSON Web Token (JWT) is, how it is structured, and what claims Microsoft Entra includes in the tokens it issues.
learningPath: entra-auth
category: azure
tags:
  - entra
  - jwt
  - authentication
---

# Microsoft Entra – JWT Token Architecture

When a user or application successfully authenticates with Microsoft Entra, it receives a **JSON Web Token (JWT)** — a compact, self-contained token that carries information about the authenticated identity and what it is allowed to do.

Applications and APIs read this token to determine who is calling and what permissions they hold, without needing to contact Microsoft Entra on every single request.

---

# Architecture Diagram

![Microsoft Entra JWT Token Architecture](./images/jwt-token-architecture.png)

---

# Learning Objectives

After completing this article, you will understand:

- What a JWT is and why Microsoft Entra uses them
- The three-part structure of a JWT
- What information lives in the header
- What information lives in the payload
- Common claims issued by Microsoft Entra
- The difference between ID Tokens and Access Tokens
- Why the signature matters (covered in depth in the next article)

---

# What Is a JWT?

A JWT is a URL-safe string that encodes a set of claims about an authenticated identity. It is:

- **Compact** — small enough to pass in an HTTP header, URL, or cookie.
- **Self-contained** — carries all the claims an API needs, without a database lookup.
- **Verifiable** — cryptographically signed so a recipient can confirm it hasn't been tampered with.

Microsoft Entra issues JWTs for both **ID Tokens** (proving who the user is) and **Access Tokens** (proving what the caller is authorized to do).

---

# JWT Structure

Every JWT consists of three Base64URL-encoded sections separated by periods:

\`\`\`text
Header.Payload.Signature
\`\`\`

Example:

\`\`\`text
eyJhbGciOiJSUzI1NiIsImtpZCI6IlhTVGUifQ.
eyJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20ifQ.
QbJ83eA...
\`\`\`

| Section   | Purpose                                              |
| --------- | ---------------------------------------------------- |
| Header    | Metadata describing the token                        |
| Payload   | Identity and permission claims                       |
| Signature | Proves the token is authentic (see the next article) |

---

# JWT Header

The header describes how the token was signed.

\`\`\`json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "x5teabc123"
}
\`\`\`

| Field | Description                           |
| ----- | ------------------------------------- |
| alg   | Signing algorithm (\`RS256\`)           |
| typ   | Token type (\`JWT\`)                    |
| kid   | Identifies which signing key was used |

The \`kid\` value matters during verification — it tells the recipient exactly which Microsoft Entra public key to use, a detail explored fully in the next article.

---

# JWT Payload

The payload contains the actual claims — the information the token is carrying.

\`\`\`json
{
  "iss": "https://login.microsoftonline.com/{tenant}/v2.0",
  "sub": "11111111-2222-3333-4444-555555555555",
  "aud": "api://contoso-api",
  "tid": "{tenant-id}",
  "oid": "{object-id}",
  "exp": 1716761254,
  "iat": 1716757654,
  "scp": "User.Read",
  "name": "Charan"
}
\`\`\`

## Common Claims

| Claim   | Description                                                 |
| ------- | ----------------------------------------------------------- |
| \`iss\`   | Issuer — the Microsoft Entra tenant that issued the token   |
| \`sub\`   | Subject — a stable identifier for the authenticated user    |
| \`aud\`   | Audience — the application or API the token is intended for |
| \`tid\`   | Tenant ID                                                   |
| \`oid\`   | Object ID of the user in the directory                      |
| \`exp\`   | Expiration time                                             |
| \`iat\`   | Issued-at time                                              |
| \`scp\`   | Delegated permissions (scopes) granted to the caller        |
| \`roles\` | Application roles assigned to the caller                    |

The payload is **encoded, not encrypted** — anyone holding the token can decode and read it. Sensitive information should never be placed inside JWT claims.

---

# ID Tokens vs Access Tokens

Microsoft Entra issues two distinct kinds of JWTs during authentication:

| Token Type   | Purpose                                              | Consumed By            |
| ------------ | ---------------------------------------------------- | ---------------------- |
| ID Token     | Proves the user's identity to the client application | The client application |
| Access Token | Authorizes the caller to access a specific API       | The resource API       |

An ID Token answers "who signed in?" for the application itself. An Access Token answers "is this caller allowed to do this?" for whichever API receives it.

---

# Why the Signature Matters

Because the payload is only encoded, nothing so far stops an attacker from modifying a claim — unless the token is also **signed**.

Microsoft Entra digitally signs every JWT it issues, and every API that receives one must verify that signature before trusting any of its claims. That signing and verification process — SHA-256 hashing, RSA public/private keys, JWKS, and key rotation — is the subject of the next article, **Cryptography Deep Dive**.

---

# Summary

A JWT is a compact, self-contained token made of a header, payload, and signature. Microsoft Entra uses JWTs for both ID Tokens and Access Tokens, encoding claims such as issuer, subject, audience, expiration, and granted scopes directly into the token. The payload can be read by anyone who holds the token, which is why the signature — covered next — is what makes the token trustworthy.

---

# Key Takeaways

- A JWT has three parts: header, payload, and signature.
- The header identifies the signing algorithm and key (\`kid\`).
- The payload carries claims like \`iss\`, \`sub\`, \`aud\`, \`exp\`, and \`scp\`.
- JWT payloads are encoded, not encrypted — never store secrets in claims.
- ID Tokens identify the user; Access Tokens authorize API calls.
- Trusting a JWT's claims requires verifying its signature, covered in the next article.
`,C=`---
id: microsoft-graph
title: Microsoft Entra - Microsoft Graph
description: Learn how Microsoft Graph provides a unified REST API to access Microsoft Entra ID, Microsoft 365, and Azure resources using secure OAuth 2.0 authentication and Microsoft Entra access tokens.
learningPath: entra-auth
category: azure
tags:
  - entra
  - microsoft-graph
  - api
---

# Microsoft Entra – Microsoft Graph

Microsoft Graph is Microsoft's unified REST API that provides a single endpoint for accessing Microsoft Entra ID, Microsoft 365, and many Azure services.

Instead of learning multiple APIs for different Microsoft services, developers can use Microsoft Graph to interact with users, groups, devices, applications, mailboxes, calendars, files, Teams, reports, and many other Microsoft cloud resources.

Microsoft Graph works together with Microsoft Entra ID for authentication and authorization. Applications first obtain an OAuth 2.0 Access Token from Microsoft Entra and then use that token to securely call Microsoft Graph APIs.

---

# Architecture Diagram

![Microsoft Entra Microsoft Graph](./images/microsoft-graph.png)

---

# Learning Objectives

After completing this article, you will understand:

- What Microsoft Graph is
- Microsoft Graph architecture
- The Microsoft Graph endpoint
- Resource areas available through Graph
- Request flow
- HTTP methods
- Authentication options
- Query parameters
- Pagination
- Throttling
- Best practices
- Common use cases

---

# What is Microsoft Graph?

Microsoft Graph is Microsoft's unified REST API platform.

It exposes Microsoft cloud resources through a single endpoint, allowing developers to access and manage Microsoft Entra ID and Microsoft 365 services using standard HTTP requests.

Instead of using multiple service-specific APIs, Microsoft Graph provides a consistent programming model for interacting with Microsoft cloud resources.

The primary Microsoft Graph endpoint is:

\`\`\`text
https://graph.microsoft.com/v1.0
\`\`\`

Microsoft also provides a preview endpoint for features that are still under development:

\`\`\`text
https://graph.microsoft.com/beta
\`\`\`

Production applications should use the **v1.0** endpoint whenever possible.

---

# Why Microsoft Graph?

Without Microsoft Graph, developers would need to integrate with multiple independent APIs for:

- Azure Active Directory
- Exchange Online
- Microsoft Teams
- SharePoint Online
- OneDrive
- Intune
- Planner
- Security APIs

Microsoft Graph unifies these services into a single REST API with consistent authentication, request formats, and response structures.

---

# Key Capabilities

Microsoft Graph enables applications to:

- Read and write Microsoft Entra directory data
- Manage users, groups, and devices
- Manage applications and service principals
- Retrieve reports and audit logs
- Access Microsoft 365 resources
- Integrate with Azure services
- Build automation and governance solutions

Because all requests use the same authentication model, developers can build powerful applications without learning multiple APIs.

---

# Resource Areas

Microsoft Graph exposes resources from many Microsoft cloud services.

Major resource categories include:

## Identity & Access

Examples include:

- Users
- Groups
- Roles
- Permissions
- Administrative Units

---

## Devices & Management

Organizations can manage:

- Registered devices
- Managed devices
- Device compliance
- Device ownership

---

## Applications

Microsoft Graph provides APIs for managing:

- App Registrations
- Enterprise Applications
- Service Principals
- Application permissions

---

## Directory Objects

Developers can work with directory objects including:

- Users
- Contacts
- Groups
- Administrative Units
- Organizational relationships

---

## Security & Risk

Security-related APIs include:

- Identity Protection
- Risk detections
- Conditional Access reporting
- Security alerts

---

## Reports & Analytics

Organizations can retrieve:

- Sign-in logs
- Audit logs
- Usage reports
- Licensing reports

---

# How Microsoft Graph Works

Every Microsoft Graph request follows the same high-level workflow.

1. The client application requests an Access Token from Microsoft Entra ID.
2. Microsoft Entra authenticates the user or application.
3. Microsoft Entra issues an OAuth 2.0 Access Token.
4. The application calls Microsoft Graph using the Access Token.
5. Microsoft Graph validates the token.
6. If authorized, Microsoft Graph processes the request.
7. The requested data is returned as a JSON response.

This consistent workflow applies whether you're reading user profiles, creating groups, retrieving calendar events, or accessing Microsoft Teams resources.

---

# Request Flow

The request flow can be summarized as follows:

\`\`\`text
Client Application
        │
        ▼
Authenticate with Microsoft Entra
        │
        ▼
Receive Access Token
        │
        ▼
Call Microsoft Graph
        │
        ▼
Graph validates token
        │
        ▼
Process request
        │
        ▼
Return JSON response
\`\`\`

This architecture ensures that every request is authenticated and authorized before any Microsoft cloud resource is accessed.

---

# HTTP Methods

Microsoft Graph follows REST principles and uses standard HTTP methods.

## GET

Retrieves data.

Example:

\`\`\`http
GET /users
\`\`\`

Typical uses include:

- Read users
- Read groups
- Read devices
- Retrieve reports

---

## POST

Creates new resources.

Example:

\`\`\`http
POST /users
\`\`\`

Used for:

- Creating users
- Creating groups
- Registering applications

---

## PATCH

Updates existing resources.

Example:

\`\`\`http
PATCH /users/{id}
\`\`\`

Used to modify:

- User properties
- Group settings
- Device information

---

## DELETE

Removes resources.

Example:

\`\`\`http
DELETE /groups/{id}
\`\`\`

Use this operation carefully, as it permanently deletes the specified resource.

---

# Data Format

Microsoft Graph uses **JSON (JavaScript Object Notation)** for both requests and responses, making it easy to integrate with applications written in virtually any programming language.

A typical request includes:

- HTTPS endpoint
- HTTP method
- Authorization header
- JSON request body (when applicable)

Example request:

\`\`\`http
GET https://graph.microsoft.com/v1.0/users
Authorization: Bearer <access_token>
Accept: application/json
\`\`\`

A typical response:

\`\`\`json
{
  "value": [
    {
      "id": "12345678-1234-1234-1234-123456789abc",
      "displayName": "John Doe",
      "userPrincipalName": "john.doe@contoso.com"
    }
  ]
}
\`\`\`

All Microsoft Graph APIs follow this consistent JSON-based format.

---

# Sample API Request

The following example retrieves a list of users while selecting only the properties required by the application.

\`\`\`http
GET https://graph.microsoft.com/v1.0/users?$top=10&$select=id,displayName,userPrincipalName

Authorization: Bearer <access_token>
Accept: application/json
ConsistencyLevel: eventual
\`\`\`

Example response:

\`\`\`json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
  "value": [
    {
      "id": "1d0c80e9-1234-4d66-9c9a-1f2e3d4c5b6a",
      "displayName": "John Doe",
      "userPrincipalName": "john.doe@contoso.com"
    }
  ],
  "@odata.nextLink": "https://graph.microsoft.com/v1.0/users?$skiptoken=..."
}
\`\`\`

Notice the \`@odata.nextLink\` property, which is used when additional pages of results are available.

---

# Common Microsoft Graph Resources

Microsoft Graph exposes hundreds of resource types. Some of the most commonly used are listed below.

## Users

Endpoint:

\`\`\`http
GET /users
\`\`\`

Common operations:

- List users
- Retrieve user profiles
- Update user properties
- Manage licenses
- Reset passwords (with appropriate permissions)

---

## Groups

Endpoint:

\`\`\`http
GET /groups
\`\`\`

Applications can:

- Create Microsoft 365 groups
- Manage security groups
- Add or remove members
- Retrieve group owners

---

## Applications

Endpoint:

\`\`\`http
GET /applications
\`\`\`

Common scenarios include:

- List App Registrations
- Manage application properties
- Configure redirect URIs
- Review permissions

---

## Devices

Endpoint:

\`\`\`http
GET /devices
\`\`\`

Examples:

- Retrieve registered devices
- View device ownership
- Monitor device compliance
- Manage lifecycle operations

---

## Directory Objects

Endpoint:

\`\`\`http
GET /directoryObjects
\`\`\`

Used to retrieve and manage general directory resources, including users, groups, contacts, and administrative units.

---

## Audit Logs

Endpoint:

\`\`\`http
GET /auditLogs
\`\`\`

Organizations commonly retrieve:

- Audit logs
- Sign-in logs
- Provisioning logs
- Directory audit events

These APIs are frequently used for compliance reporting and security investigations.

---

## Reports

Endpoint:

\`\`\`http
GET /reports
\`\`\`

Examples include:

- Microsoft 365 usage reports
- License reports
- Authentication reports
- User activity reports

---

## Identity Risk Detections

Endpoint:

\`\`\`http
GET /identityProtection
\`\`\`

These APIs expose Identity Protection information such as:

- Risk detections
- Risky users
- Risk history
- Identity-related security events

---

# Authentication Options

Microsoft Graph relies on Microsoft Entra ID for authentication. The method used depends on the type of application and whether a user is involved.

## Delegated Permissions

Delegated permissions are used when an application acts **on behalf of a signed-in user**.

Flow:

\`\`\`text
User

↓

Microsoft Entra

↓

Access Token

↓

Microsoft Graph

↓

User's Permissions Applied
\`\`\`

Examples:

- Read the signed-in user's profile
- Read the user's calendar
- Access OneDrive files
- Read Teams messages

Authorization is limited by both:

- The permissions granted to the application.
- The permissions assigned to the signed-in user.

---

## Application Permissions

Application permissions allow an application to access Microsoft Graph **without a signed-in user**.

Flow:

\`\`\`text
Application

↓

Client Credentials Flow

↓

Access Token

↓

Microsoft Graph
\`\`\`

Common use cases include:

- Background services
- Scheduled jobs
- Automation
- Provisioning systems
- Synchronization services

Because these permissions often provide broad access, they require administrator consent.

---

## Managed Identity

Applications running in Azure can use a **Managed Identity** instead of storing credentials.

Supported services include:

- Azure Virtual Machines
- Azure App Service
- Azure Functions
- Azure Container Apps
- Azure Kubernetes Service (AKS)

Benefits include:

- No client secrets
- No certificate management
- Automatic credential rotation
- Improved security

---

## Access Tokens

Every Microsoft Graph request must include a valid OAuth 2.0 Access Token issued by Microsoft Entra.

Example:

\`\`\`http
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
\`\`\`

Microsoft Graph validates:

- Token signature
- Issuer (\`iss\`)
- Audience (\`aud\`)
- Expiration (\`exp\`)
- Scopes (\`scp\`)
- Roles (for application permissions)

Only after successful validation does Microsoft Graph process the request.

---

# Common Query Parameters

Microsoft Graph supports OData query parameters that allow applications to retrieve only the data they need.

## \`$select\`

Returns only specified properties.

Example:

\`\`\`http
GET /users?$select=id,displayName,mail
\`\`\`

This reduces payload size and improves performance.

---

## \`$filter\`

Filters resources based on specific criteria.

Example:

\`\`\`http
GET /users?$filter=accountEnabled eq true
\`\`\`

Useful for retrieving only matching resources.

---

## \`$orderby\`

Sorts results.

Example:

\`\`\`http
GET /users?$orderby=displayName
\`\`\`

Results can be sorted in ascending or descending order.

---

## \`$top\`

Limits the number of returned items.

Example:

\`\`\`http
GET /users?$top=25
\`\`\`

This is commonly used to control page size.

---

## \`$skip\`

Skips a specified number of records.

Example:

\`\`\`http
GET /users?$skip=50
\`\`\`

Useful when implementing custom pagination.

---

## \`$expand\`

Retrieves related resources in a single request.

Example:

\`\`\`http
GET /groups?$expand=members
\`\`\`

This reduces the need for additional API calls.

---

## \`$count\`

Returns the total number of matching resources.

Example:

\`\`\`http
GET /users?$count=true
\`\`\`

Often used when displaying totals in dashboards or reports.

---

## \`$search\`

Performs a search across supported resources.

Example:

\`\`\`http
GET /users?$search="displayName:John"
\`\`\`

Search capabilities vary depending on the resource type.

---

---

# Pagination

Microsoft Graph may return thousands of resources for a single request. To improve performance and reduce response sizes, results are divided into pages.

When additional pages are available, Microsoft Graph includes an \`@odata.nextLink\` property in the response.

Example:

\`\`\`json
{
  "value": [
    {
      "id": "12345",
      "displayName": "John Doe"
    }
  ],
  "@odata.nextLink": "https://graph.microsoft.com/v1.0/users?$skiptoken=..."
}
\`\`\`

Applications should continue requesting the URL in \`@odata.nextLink\` until no further pages are returned.

### Best Practices

- Always check for \`@odata.nextLink\`.
- Avoid assuming all data is returned in a single response.
- Use reasonable page sizes.
- Stream large datasets instead of loading everything into memory.

---

# Throttling and Service Limits

Microsoft Graph enforces throttling to ensure fair usage and maintain service reliability.

If an application sends too many requests within a short period, Microsoft Graph temporarily limits additional requests.

Typical causes include:

- Excessive polling
- Large batch operations
- High-volume automation
- Inefficient application design

When throttled, Microsoft Graph returns:

\`\`\`http
HTTP 429 Too Many Requests
\`\`\`

The response includes a **Retry-After** header indicating how long the application should wait before retrying.

Example:

\`\`\`http
HTTP/1.1 429 Too Many Requests

Retry-After: 15
\`\`\`

Applications should implement retry logic using exponential backoff to avoid repeated throttling.

---

# SDKs and Development Tools

Microsoft provides several SDKs and tools to simplify working with Microsoft Graph.

## Microsoft Graph SDKs

Official SDKs are available for:

- .NET
- Java
- JavaScript / TypeScript
- Go
- Python
- PHP

These SDKs handle:

- Authentication integration
- HTTP request creation
- Serialization
- Pagination
- Error handling
- Retry policies

Using an SDK reduces the amount of boilerplate code required when interacting with Microsoft Graph.

---

## Graph Explorer

Graph Explorer is an interactive web application for exploring and testing Microsoft Graph APIs.

Developers can:

- Sign in with a Microsoft account
- Browse available endpoints
- Test requests
- Inspect JSON responses
- Experiment with permissions

It is an excellent tool for learning the API before writing production code.

---

## Postman

Many developers use Postman to test Microsoft Graph APIs.

Common tasks include:

- Acquiring OAuth tokens
- Testing REST endpoints
- Reviewing HTTP headers
- Debugging API responses

---

## PowerShell SDK

Microsoft Graph PowerShell modules provide administrative automation capabilities.

Examples include:

- Creating users
- Managing groups
- Assigning licenses
- Reading audit logs
- Managing applications

PowerShell is commonly used by administrators and automation engineers.

---

# C# SDK Example

The Microsoft Graph .NET SDK simplifies API interactions.

\`\`\`csharp
GraphServiceClient graphClient = new GraphServiceClient(credential);

var users = await graphClient.Users
    .GetAsync(requestConfiguration =>
    {
        requestConfiguration.QueryParameters.Top = 10;
        requestConfiguration.QueryParameters.Select =
            new[] { "id", "displayName", "userPrincipalName" };
    });

foreach (var user in users.Value)
{
    Console.WriteLine($"{user.DisplayName} - {user.UserPrincipalName}");
}
\`\`\`

The SDK automatically handles request construction and deserializes the response into strongly typed objects.

---

# Common Use Cases

Microsoft Graph is used across a wide range of enterprise scenarios.

## User Provisioning

Organizations automate:

- User creation
- User updates
- License assignment
- User deprovisioning

---

## Group Management

Applications can:

- Create security groups
- Manage Microsoft 365 groups
- Add or remove members
- Assign owners

---

## Identity Governance

Microsoft Graph supports governance operations such as:

- Access Reviews
- Entitlement Management
- Lifecycle Workflows
- Administrative Units

---

## Reporting and Monitoring

Organizations use Graph to retrieve:

- Sign-in logs
- Audit logs
- Usage reports
- Identity Protection reports

These APIs enable dashboards, compliance reporting, and security monitoring.

---

## Microsoft 365 Integration

Applications can integrate with:

- Outlook Mail
- Calendar
- Teams
- OneDrive
- SharePoint
- Planner

This allows developers to build rich productivity solutions using a single API platform.

---

# Best Practices

Follow these recommendations when building applications with Microsoft Graph.

## Request Least-Privilege Permissions

Only request the permissions your application requires.

For example:

Good:

\`\`\`text
User.Read
\`\`\`

Avoid requesting broad permissions such as:

\`\`\`text
Directory.ReadWrite.All
\`\`\`

unless they are absolutely necessary.

---

## Use \`$select\`

Retrieve only the properties you need.

Smaller responses improve application performance and reduce network traffic.

---

## Handle Pagination

Always process the \`@odata.nextLink\` property to retrieve complete result sets.

---

## Respect Throttling

Implement retry logic using the \`Retry-After\` header and exponential backoff.

Avoid aggressive polling or unnecessary repeated requests.

---

## Secure Access Tokens

Treat Access Tokens as sensitive credentials.

- Never log tokens.
- Never expose tokens to client-side code unnecessarily.
- Always use HTTPS.
- Store tokens securely.

---

# Error Handling

Applications should gracefully handle common Microsoft Graph errors.

| Status Code                   | Meaning                  | Typical Resolution                                |
| ----------------------------- | ------------------------ | ------------------------------------------------- |
| **403 Forbidden**             | Insufficient permissions | Verify API permissions and consent.               |
| **404 Not Found**             | Resource not found       | Confirm the resource ID and endpoint.             |
| **429 Too Many Requests**     | Request throttled        | Respect the \`Retry-After\` header and retry later. |
| **500 Internal Server Error** | Temporary service issue  | Retry using exponential backoff.                  |

Proper error handling improves application reliability and user experience.

---

# Summary

Microsoft Graph provides a unified, secure, and scalable REST API for accessing Microsoft Entra ID, Microsoft 365, and other Microsoft cloud services.

Applications authenticate with Microsoft Entra, obtain OAuth 2.0 Access Tokens, and use those tokens to securely interact with Graph resources such as users, groups, devices, applications, audit logs, and reports.

By supporting consistent REST endpoints, OData query options, SDKs, and enterprise-grade security, Microsoft Graph enables developers to build powerful identity, productivity, and automation solutions while following modern authentication and authorization practices.

---

# Key Takeaways

- Microsoft Graph is Microsoft's unified REST API for Microsoft cloud services.
- Authentication is performed through Microsoft Entra using OAuth 2.0 Access Tokens.
- Graph exposes resources including users, groups, devices, applications, reports, and Microsoft 365 workloads.
- Standard HTTP methods (GET, POST, PATCH, DELETE) are used to interact with resources.
- OData query parameters help optimize requests and reduce response sizes.
- Applications should handle pagination and throttling correctly.
- Official SDKs simplify authentication, request construction, and response handling.
- Always request the minimum permissions required and securely manage Access Tokens.
`,P=`---
id: oauth-2.0
title: Microsoft Entra - OAuth 2.0 & OpenID Connect (OIDC)
description: Learn how OAuth 2.0 and OpenID Connect (OIDC) work together in Microsoft Entra to provide secure authorization, authentication, and token-based access to applications and APIs.
learningPath: entra-auth
category: azure
tags:
  - entra
  - oauth
  - oidc
---

# Microsoft Entra – OAuth 2.0 & OpenID Connect (OIDC)

Modern applications rarely store usernames and passwords themselves. Instead, they rely on an Identity Provider such as Microsoft Entra ID to authenticate users and securely grant access to protected resources.

Microsoft Entra implements **OAuth 2.0** for authorization and **OpenID Connect (OIDC)** for authentication. Although they are closely related and often used together, they solve different problems.

- **OAuth 2.0** answers **"What can this application access?"**
- **OpenID Connect (OIDC)** answers **"Who is the user?"**

Together they enable secure sign-in, Single Sign-On (SSO), and token-based access to APIs.

---

# Architecture Diagram

The following diagram illustrates how OAuth 2.0 and OpenID Connect work together in Microsoft Entra.

![Microsoft Entra OAuth 2.0 & OpenID Connect](./images/oauth-2.0-openid-connect.png)

---

# Learning Objectives

After completing this article, you will understand:

- What OAuth 2.0 is
- What OpenID Connect (OIDC) is
- Why OIDC is built on OAuth 2.0
- Authentication vs Authorization
- OAuth 2.0 roles
- OAuth tokens
- ID Token vs Access Token vs Refresh Token
- Complete authentication flow
- OAuth vs OIDC differences
- When to use each protocol

---

# Why Do We Need OAuth 2.0?

Before OAuth 2.0, applications often requested a user's username and password directly.

This approach had several drawbacks:

- Applications stored user passwords.
- Password reuse increased security risks.
- Users had no fine-grained control over application permissions.

OAuth 2.0 solves this problem by allowing applications to request **access tokens** instead of user credentials.

The application never sees or stores the user's password.

---

# What is OAuth 2.0?

OAuth 2.0 is an **authorization framework**.

It allows an application to access protected resources on behalf of a user without exposing the user's credentials.

Its primary purpose is:

- Delegated access to APIs
- Secure authorization
- Token-based access

OAuth itself does **not** identify the user.

Instead, it grants permission to access resources.

---

# What is OpenID Connect (OIDC)?

OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0.

It extends OAuth by adding user authentication.

OIDC introduces the **ID Token**, which contains information about the authenticated user.

Applications use this token to determine:

- Who signed in
- User name
- Email
- Roles
- Other identity claims

---

# How OAuth 2.0 and OIDC Work Together

OAuth and OIDC are commonly used together in modern applications.

The overall flow is:

1. A user opens an application.
2. The application redirects the user to Microsoft Entra ID.
3. Microsoft Entra authenticates the user.
4. Microsoft Entra issues tokens.
5. The application uses the Access Token to call APIs.
6. The application uses the ID Token to identify the signed-in user.

Together they provide both:

- Authentication
- Authorization

---

# Authentication Flow

The authentication process follows these steps.

## Step 1 – User

The user attempts to access an application.

---

## Step 2 – Application (Client)

The application redirects the user to Microsoft Entra's Authorization Endpoint.

---

## Step 3 – Microsoft Entra ID

Microsoft Entra authenticates the user.

Authentication may include:

- Password
- Multi-Factor Authentication (MFA)
- Conditional Access
- Passwordless Authentication

---

## Step 4 – Tokens Issued

After successful authentication, Microsoft Entra issues one or more tokens.

Depending on the flow, these include:

- ID Token
- Access Token
- Refresh Token

---

## Step 5 – Access Protected Resources

The application sends the Access Token to a protected API.

Examples include:

- Microsoft Graph
- Azure APIs
- Custom APIs

The API validates the Access Token before returning data.

---

## Step 6 – User Information

The application validates the ID Token to determine the user's identity.

If additional profile information is needed, the application can retrieve it from Microsoft Graph or the UserInfo endpoint.

---

# OAuth 2.0 Roles

OAuth defines several participants.

## User (Resource Owner)

The person who owns the protected resources.

---

## Client

The application requesting access.

Examples:

- Web applications
- Mobile applications
- Single Page Applications (SPAs)

---

## Authorization Server

Microsoft Entra ID acts as the Authorization Server.

Its responsibilities include:

- Authenticating users
- Issuing tokens
- Validating client applications

---

## Resource Server

The API that hosts protected resources.

Examples:

- Microsoft Graph
- Azure Resource Manager
- Custom Web APIs

---

# OAuth Tokens

Microsoft Entra issues different tokens depending on the scenario.

## ID Token

Purpose:

Identify the authenticated user.

Contains claims such as:

- User ID
- Name
- Email
- Tenant ID
- Roles

Applications use the ID Token for authentication.

---

## Access Token

Purpose:

Authorize access to protected APIs.

Contains:

- Permissions
- Scopes
- Audience
- Expiration

Applications send the Access Token with every API request.

---

## Refresh Token

Purpose:

Obtain new Access Tokens without requiring the user to sign in again.

Refresh Tokens improve user experience by enabling long-lived sessions.

---

# OAuth 2.0 vs OpenID Connect

| OAuth 2.0                  | OpenID Connect (OIDC)             |
| -------------------------- | --------------------------------- |
| Authorization              | Authentication                    |
| Access to APIs             | User Sign-in                      |
| Returns Access Token       | Returns ID Token (+ Access Token) |
| Does not identify the user | Identifies the authenticated user |
| RFC 6749                   | Built on OAuth 2.0                |

---

# When Should You Use OAuth 2.0?

Use OAuth 2.0 when your application needs to:

- Access Microsoft Graph
- Call Azure APIs
- Access custom APIs
- Perform delegated authorization
- Use application permissions

Examples:

- Background services
- Daemon applications
- API integrations
- Microservices

---

# When Should You Use OpenID Connect?

Use OpenID Connect when your application needs:

- User sign-in
- Single Sign-On (SSO)
- User identity
- Profile information

Examples:

- Web applications
- Single Page Applications
- Mobile applications
- Enterprise portals

---

# ID Token (JWT)

The ID Token is a JSON Web Token (JWT).

It contains identity claims such as:

- Issuer (\`iss\`)
- Subject (\`sub\`)
- Audience (\`aud\`)
- Expiration (\`exp\`)
- Email
- Name
- Roles
- Nonce

Applications validate the token before trusting the user's identity.

---

# Benefits of OAuth 2.0 & OIDC

Microsoft Entra provides several benefits through OAuth 2.0 and OpenID Connect.

- Secure authentication
- Secure authorization
- Single Sign-On (SSO)
- Token-based security
- Fine-grained permissions
- Cloud-native architecture
- Cross-platform compatibility
- Scalable identity management

---

# Real-World Example

Imagine an employee signs in to a company portal.

1. The employee opens the application.
2. The application redirects the employee to Microsoft Entra.
3. Microsoft Entra authenticates the employee using MFA.
4. Microsoft Entra issues:
   - ID Token
   - Access Token
   - Refresh Token
5. The application uses the ID Token to display the employee's profile.
6. The application uses the Access Token to retrieve user information from Microsoft Graph.
7. When the Access Token expires, the Refresh Token obtains a new one without requiring another sign-in.

---

# Summary

OAuth 2.0 and OpenID Connect work together to provide secure authentication and authorization in Microsoft Entra.

OAuth 2.0 grants applications permission to access protected resources, while OpenID Connect identifies the authenticated user through an ID Token.

Together they power secure sign-in, Single Sign-On, API access, and modern cloud-native applications.

---

# Key Takeaways

- OAuth 2.0 is an authorization framework.
- OpenID Connect is an authentication protocol built on OAuth 2.0.
- OAuth grants access to APIs.
- OIDC identifies authenticated users.
- Microsoft Entra acts as the Authorization Server.
- ID Tokens identify users.
- Access Tokens authorize API access.
- Refresh Tokens renew sessions without requiring users to sign in again.
`,I=`---
id: oauth-flow-comparison
title: Microsoft Entra - OAuth 2.0 Flow Comparison
description: Learn the different OAuth 2.0 authorization flows supported by Microsoft Entra, understand when to use each flow, and choose the right authentication pattern for your application.
learningPath: entra-auth
category: azure
tags:
  - entra
  - oauth
  - flows
---

# Microsoft Entra – OAuth 2.0 Flow Comparison

OAuth 2.0 provides multiple authorization flows because different application types have different security requirements. A web application running on a secure server does not authenticate the same way as a mobile app, a daemon service, or an IoT device.

Microsoft Entra supports several OAuth 2.0 flows, each designed for a specific scenario. Choosing the correct flow improves security, simplifies development, and provides the best user experience.

This article compares all major OAuth 2.0 flows and explains when each one should be used.

---

# Architecture Diagram

The following diagram compares the OAuth 2.0 authorization flows available in Microsoft Entra.

![Microsoft Entra OAuth 2.0 Flow Comparison](./images/oauth-flow-comparison.png)

---

# Learning Objectives

After completing this article, you will understand:

- Why OAuth 2.0 has multiple flows
- Authorization Code Flow
- Authorization Code with PKCE
- Client Credentials Flow
- On-Behalf-Of (OBO) Flow
- Device Code Flow
- Refresh Token Flow
- Implicit Flow (Legacy)
- Resource Owner Password Credentials (ROPC) Flow (Legacy)
- Which flow should be used for different application types

---

# Why Are There Multiple OAuth Flows?

Different applications operate in different environments.

For example:

- A web application can securely store secrets.
- A mobile application cannot.
- A background service runs without users.
- A smart TV has no browser.
- An API may need to call another API on behalf of a user.

Because of these differences, OAuth defines multiple authorization flows instead of a single authentication process.

---

# 1. Authorization Code Flow

The Authorization Code Flow is the standard OAuth flow for **confidential client applications** such as traditional web applications.

## How It Works

1. User signs in.
2. Browser redirects to Microsoft Entra.
3. Microsoft Entra authenticates the user.
4. An Authorization Code is returned.
5. The backend exchanges the code for an Access Token.
6. The application calls protected APIs.

## Best For

- ASP.NET applications
- Java applications
- Python web applications
- Server-rendered web applications

## Advantages

- Most secure server-side flow
- Supports Refresh Tokens
- Backend keeps secrets secure

---

# 2. Authorization Code Flow with PKCE

PKCE (Proof Key for Code Exchange) extends the Authorization Code Flow by protecting public clients that cannot safely store secrets.

A Code Verifier and Code Challenge prevent authorization code interception attacks.

## Best For

- Single Page Applications (SPA)
- Mobile Apps
- Desktop Applications

## Advantages

- No Client Secret required
- Recommended by Microsoft
- Protects public clients
- Supports Refresh Tokens

> **Recommendation:** Use Authorization Code + PKCE for all new public client applications.

---

# 3. Client Credentials Flow

The Client Credentials Flow is used when an application needs to authenticate **without a signed-in user**.

The application authenticates itself using:

- Client Secret
- Certificate
- Federated Credential

Microsoft Entra issues an Access Token directly.

## Best For

- Daemon Applications
- Scheduled Jobs
- Background Services
- Microservices
- Server-to-Server Communication

## Characteristics

- No user interaction
- No ID Token
- Uses Application Permissions

---

# 4. On-Behalf-Of (OBO) Flow

The On-Behalf-Of Flow allows one API to call another API while preserving the user's identity.

Instead of using its own permissions, the middle-tier API exchanges the user's Access Token for another Access Token.

## Flow

User

↓

Frontend Application

↓

Web API

↓

Microsoft Entra

↓

New Access Token

↓

Downstream API

## Best For

- Multi-tier applications
- API chaining
- Microsoft Graph from backend APIs

---

# 5. Device Code Flow

Some devices do not have a browser or keyboard.

Examples include:

- Smart TVs
- IoT Devices
- CLI Applications
- Embedded Devices

The Device Code Flow solves this problem.

## How It Works

1. Device displays a code.
2. User opens **https://microsoft.com/devicelogin**.
3. User enters the code.
4. Microsoft Entra authenticates the user.
5. Device receives an Access Token.

## Best For

- Azure CLI
- PowerShell
- Smart TVs
- IoT Devices

---

# 6. Refresh Token Flow

Access Tokens are intentionally short-lived.

Instead of asking users to sign in repeatedly, Microsoft Entra issues a Refresh Token.

The application exchanges the Refresh Token for a new Access Token whenever the old one expires.

## Benefits

- Silent authentication
- Better user experience
- Reduced sign-in prompts

---

# 7. Implicit Flow (Legacy)

The Implicit Flow was originally designed for browser applications.

Microsoft now recommends **not using it** for new applications.

Reasons include:

- Tokens exposed in browser URLs
- No Refresh Tokens
- Lower security than Authorization Code + PKCE

## Status

**Deprecated for new applications**

---

# 8. Resource Owner Password Credentials (ROPC) Flow (Legacy)

The ROPC Flow allows applications to collect usernames and passwords directly.

This approach is strongly discouraged.

Problems include:

- Application receives user passwords
- No MFA support
- Limited Conditional Access support
- Poor security

## Status

**Do not use for new applications.**

---

# Token Types Used Across OAuth Flows

OAuth uses several token types depending on the selected flow.

## Authorization Code

A temporary code exchanged for tokens.

---

## Access Token

Used to access protected APIs.

Contains:

- Scopes
- Permissions
- Audience
- Expiration

---

## ID Token

Returned when OpenID Connect is used.

Contains:

- User identity
- Claims
- Roles
- Tenant information

---

## Refresh Token

Used to obtain new Access Tokens without requiring another sign-in.

---

# Choosing the Right Flow

Choose your OAuth flow based on your application type.

| Scenario                    | Recommended Flow          |
| --------------------------- | ------------------------- |
| Web Application             | Authorization Code        |
| SPA                         | Authorization Code + PKCE |
| Mobile App                  | Authorization Code + PKCE |
| Desktop App                 | Authorization Code + PKCE |
| Background Service          | Client Credentials        |
| Web API calling another API | On-Behalf-Of              |
| CLI Tool                    | Device Code               |
| Smart TV                    | Device Code               |
| Token Renewal               | Refresh Token             |

Avoid:

- Implicit Flow
- ROPC Flow

These are considered legacy flows.

---

# Best Practices

When building new applications:

- Use Authorization Code + PKCE for all public clients.
- Use Client Credentials only for app-only scenarios.
- Use OBO when an API calls another API.
- Use Device Code for devices without browsers.
- Use Refresh Tokens for seamless user experiences.
- Avoid legacy flows unless absolutely necessary.

---

# Real-World Examples

| Application                         | OAuth Flow                |
| ----------------------------------- | ------------------------- |
| ASP.NET MVC Website                 | Authorization Code        |
| React SPA                           | Authorization Code + PKCE |
| Mobile Banking App                  | Authorization Code + PKCE |
| Azure Function                      | Client Credentials        |
| Microsoft Graph Background Sync     | Client Credentials        |
| Azure CLI                           | Device Code               |
| API Gateway calling Microsoft Graph | On-Behalf-Of              |
| Smart TV                            | Device Code               |

---

# Summary

OAuth 2.0 provides multiple authorization flows because different application types have different authentication requirements.

Modern applications should use secure, standards-based flows such as Authorization Code with PKCE, Client Credentials, and On-Behalf-Of. Legacy flows such as Implicit and ROPC should be avoided in new applications.

Choosing the correct flow ensures secure authentication, proper authorization, and a better user experience.

---

# Key Takeaways

- OAuth provides multiple flows for different application types.
- Authorization Code is the standard flow for server-side applications.
- Authorization Code + PKCE is recommended for SPAs, mobile, and desktop apps.
- Client Credentials is used for application-to-application authentication.
- OBO allows APIs to call downstream APIs on behalf of users.
- Device Code supports devices without browsers.
- Refresh Tokens provide silent token renewal.
- Avoid Implicit and ROPC for new applications.
`,R=`---
id: permissions-and-consent
title: Microsoft Entra - Permissions & Consent
description: Learn how Microsoft Entra permissions and consent work, including delegated permissions, application permissions, user consent, administrator consent, scopes, and best practices for securely accessing protected resources.
learningPath: entra-auth
category: azure
tags:
  - entra
  - permissions
  - consent
---

# Microsoft Entra – Permissions & Consent

Permissions determine **what an application is allowed to do**, while consent determines **who authorizes those permissions**.

Whenever an application requests access to Microsoft Graph, Microsoft Entra ID, or another protected API, Microsoft Entra evaluates the requested permissions and ensures that the appropriate user or administrator has approved them before issuing an Access Token.

Understanding permissions and consent is essential for building secure applications that follow the principle of least privilege and comply with organizational security requirements.

---

# Architecture Diagram

![Microsoft Entra Permissions & Consent](./images/permissions-consent.png)

---

# Learning Objectives

After completing this article, you will understand:

- What permissions are
- What consent is
- Delegated permissions
- Application permissions
- Scopes
- User consent
- Administrator consent
- Tenant-wide consent
- Resource-specific consent (RSC)
- Permission lifecycle
- Consent storage
- Reviewing and revoking consent
- Best practices

---

# Understanding Permissions

A **permission** defines the level of access an application requests to a protected resource.

Permissions determine **what actions** an application can perform after Microsoft Entra issues an Access Token.

For example, an application may request permission to:

- Read a user's profile
- Read mail
- Send email
- Manage groups
- Read directory data
- Manage devices

Microsoft Entra evaluates these permissions before granting access.

---

# What is Consent?

**Consent** is the approval that allows an application to use the requested permissions.

Depending on the permission type, consent may be granted by:

- The signed-in user
- A Global Administrator
- Another privileged administrator
- A resource owner (for specific resources)

Only after the required consent is granted can Microsoft Entra issue an Access Token containing the approved permissions.

---

# Key Concepts

Several concepts are central to the Microsoft Entra permission model.

## Permissions

Define what an application can access.

Examples include:

- User.Read
- Mail.Read
- Group.Read.All
- Directory.Read.All

---

## Consent

Approves the requested permissions.

Without consent, the requested permissions cannot be used.

---

## Scopes

Scopes define granular delegated permissions exposed by an API.

Examples include:

\`\`\`text
User.Read

Mail.Read

Calendars.Read

Files.Read
\`\`\`

Applications request scopes during authentication.

---

## Grant Types

Grant types determine how permissions are granted and who is responsible for approving them.

Examples include:

- User Consent
- Admin Consent
- Resource-Specific Consent (RSC)

---

## Admin Consent

Some permissions provide organization-wide access and therefore require administrator approval.

These permissions cannot be approved by standard users.

---

# Permissions & Consent Lifecycle

Every permission request follows a predictable lifecycle.

## Step 1 – Application Requests Permissions

The application requests one or more permissions.

Examples:

- Delegated permissions
- Application permissions

The request is typically included during the OAuth authentication flow.

---

## Step 2 – User or Administrator Reviews the Request

Microsoft Entra displays a consent screen describing:

- Application name
- Publisher
- Requested permissions
- Permission descriptions

The user or administrator reviews the requested access before making a decision.

---

## Step 3 – Consent Granted

If approved:

- Consent is recorded.
- Microsoft Entra stores the approval.
- The application is authorized to use the approved permissions.

If consent is denied, authentication continues without the requested permissions or fails, depending on the application's requirements.

---

## Step 4 – Access Token Issued

Microsoft Entra issues an Access Token containing the approved scopes or application roles.

Example delegated scope:

\`\`\`text
scp:
User.Read Mail.Read
\`\`\`

Example application role:

\`\`\`text
roles:
Directory.Read.All
\`\`\`

The token now represents the permissions that have been granted.

---

## Step 5 – Access Allowed

The application calls Microsoft Graph or another protected API using the Access Token.

The resource validates:

- Token signature
- Issuer
- Audience
- Expiration
- Approved scopes or roles

Only the approved permissions can be used.

---

## Step 6 – Review and Revoke

Permissions are not permanent.

Users and administrators can later:

- Review granted permissions
- Remove permissions
- Revoke consent
- Disable applications

Revoking consent immediately prevents future tokens from containing those permissions.

---

# Types of Permissions

Microsoft Entra supports two primary permission models.

## Delegated Permissions

Delegated permissions allow an application to act **on behalf of a signed-in user**.

The application's effective permissions are limited by:

- The permissions granted to the application.
- The permissions that the signed-in user already has.

Examples include:

- \`User.Read\`
- \`Mail.Read\`
- \`Calendars.Read\`
- \`Sites.Read.All\`

Delegated permissions are commonly used by:

- Web applications
- Single Page Applications (SPAs)
- Mobile applications
- Desktop applications

---

## Application Permissions

Application permissions allow an application to act **as itself**, without a signed-in user.

These permissions are typically used by:

- Background services
- Scheduled jobs
- Automation scripts
- Daemons
- Integration platforms

Because application permissions often provide broad access across an entire tenant, they usually require administrator consent.

Examples include:

- \`Directory.Read.All\`
- \`Mail.Send\`
- \`Sites.FullControl.All\`

---

# Consent Types

Microsoft Entra supports several consent models depending on the type of permission requested and the resources being accessed.

## User Consent

User Consent allows a signed-in user to approve **delegated permissions** for an application.

This is the most common consent experience for applications that access data on behalf of the current user.

Typical workflow:

\`\`\`text
User Signs In

↓

Application Requests Delegated Permissions

↓

Consent Screen Displayed

↓

User Approves

↓

Access Token Issued
\`\`\`

Examples of delegated permissions include:

- \`User.Read\`
- \`Mail.Read\`
- \`Calendars.Read\`
- \`Files.Read\`

A user can only consent to permissions that organizational policies allow.

---

## Administrator Consent

Some permissions grant access beyond an individual user's data and therefore require approval from an administrator.

Administrator consent is required for:

- High-privilege Microsoft Graph permissions
- Tenant-wide access
- Application permissions
- Sensitive delegated permissions

Only privileged Microsoft Entra roles can grant administrator consent.

Examples include:

- Global Administrator
- Cloud Application Administrator
- Privileged Role Administrator (depending on the permission)

Example permissions requiring admin consent:

- \`Directory.Read.All\`
- \`User.Read.All\`
- \`Group.ReadWrite.All\`

---

## Tenant-Wide Administrator Consent

Tenant-wide consent allows an administrator to approve permissions once for the entire Microsoft Entra tenant.

Benefits include:

- Users are not prompted individually.
- Consistent application behavior across the organization.
- Simplified application deployment.

Typical workflow:

\`\`\`text
Application Requests Permissions

↓

Administrator Reviews Request

↓

Tenant-Wide Consent Granted

↓

All Authorized Users Can Use the Application
\`\`\`

This model is commonly used for enterprise applications deployed organization-wide.

---

## Resource-Specific Consent (RSC)

Resource-Specific Consent (RSC) enables permissions to be granted for a specific resource rather than the entire tenant.

Examples include:

- A Microsoft Teams team
- A SharePoint site
- A specific mailbox

This approach limits the application's access to only the approved resource.

Benefits include:

- Reduced security risk
- Least-privilege access
- Better isolation between resources

---

# Consent Experience Flow

The consent experience differs depending on the permission type.

## User Consent Flow

For delegated permissions:

\`\`\`text
User Signs In

↓

Application Requests Scopes

↓

Consent Screen Displayed

↓

User Reviews Requested Permissions

↓

User Selects Accept

↓

Microsoft Entra Records Consent

↓

Access Token Issued
\`\`\`

The issued Access Token contains only the scopes that were approved.

---

## Administrator Consent Flow

For application permissions or high-privilege delegated permissions:

\`\`\`text
Application Requests Permissions

↓

Administrator Signs In

↓

Administrator Reviews Requested Permissions

↓

Administrator Grants Consent

↓

Tenant Consent Stored

↓

Access Token Issued
\`\`\`

After administrator consent has been granted, users typically are not prompted again for those permissions.

---

# How Consent Is Stored

Microsoft Entra stores consent decisions so that users and administrators are not repeatedly prompted.

## User Consent

User consent is stored for the individual user.

Characteristics:

- Applies only to that user.
- Can be reviewed by the user.
- Can be revoked later.
- Does not affect other users.

---

## Administrator Consent

Administrator consent is stored at the tenant level.

Characteristics:

- Applies across the organization.
- Available to authorized users.
- Managed by administrators.
- Can be revoked centrally.

---

## Audit Logs

Every consent-related action can be recorded in Microsoft Entra audit logs.

Examples include:

- Consent granted
- Consent revoked
- Permission changes
- Application updates

Audit logs support compliance, troubleshooting, and security investigations.

---

# Reviewing and Managing Consent

Administrators should periodically review application permissions to ensure they remain appropriate.

Microsoft Entra provides centralized management through the **Enterprise Applications** blade.

Administrators can:

- View granted permissions
- Review delegated permissions
- Review application permissions
- Verify administrator consent
- Identify unused applications

Regular reviews help maintain a secure environment.

---

## Enterprise Applications

The Enterprise Applications section provides visibility into applications that have been granted access within the tenant.

Administrators can:

- Review application details
- Inspect assigned permissions
- Manage user assignments
- Configure sign-in settings
- Monitor consent history

This is typically the first place administrators go when auditing application access.

---

## Viewing Permissions

For each enterprise application, Microsoft Entra displays:

- Microsoft Graph permissions
- Custom API permissions
- Delegated permissions
- Application permissions
- Grant type
- Consent status
- Date granted

This information helps administrators understand exactly what access an application has.

---

## Revoking Consent

If an application no longer requires access—or is no longer trusted—consent can be revoked.

Revoking consent:

- Prevents new Access Tokens from including the revoked permissions.
- Stops future API access based on those permissions.
- May require users or administrators to grant consent again if the application is reused.

Revocation is an important part of the application lifecycle and supports the principle of least privilege.

---

# Common Scenarios

Microsoft Entra permissions and consent support a variety of application architectures and enterprise scenarios.

## SaaS Application Integration

Software-as-a-Service (SaaS) applications often require access to Microsoft 365 and Microsoft Entra resources.

Typical examples include:

- Reading user profiles
- Synchronizing users and groups
- Accessing calendars
- Sending email
- Managing Teams resources

Most SaaS applications use delegated permissions initially, while administrative features may require administrator consent.

---

## Background Automation

Background services and daemon applications operate without user interaction.

These applications commonly use:

- Application permissions
- Client Credentials Flow

Typical scenarios include:

- Scheduled reporting
- User provisioning
- License management
- Directory synchronization
- Security monitoring

Because these applications can access organizational resources independently, administrator consent is required.

---

## Multi-Tenant Applications

Applications that support multiple organizations must request consent separately from each tenant.

Typical onboarding process:

\`\`\`text
Customer Signs In

↓

Application Requests Permissions

↓

Tenant Administrator Reviews Request

↓

Administrator Grants Consent

↓

Application Can Access Customer Tenant
\`\`\`

Each Microsoft Entra tenant independently controls whether the application is trusted and what permissions it receives.

---

## Granular Access with Resource-Specific Consent (RSC)

Some Microsoft 365 workloads support **Resource-Specific Consent (RSC)**, allowing administrators or resource owners to grant permissions for a specific resource instead of the entire tenant.

Examples include:

- A Microsoft Teams team
- A SharePoint site
- A Shared Mailbox

This approach limits the application's access to only the approved resource, reducing the potential impact of excessive permissions.

---

# Monitoring and Auditing

Monitoring consent activity is essential for maintaining a secure Microsoft Entra environment.

## Sign-in Logs

Microsoft Entra Sign-in Logs provide visibility into authentication events, including:

- User sign-ins
- Application sign-ins
- Token issuance
- Conditional Access results

These logs help verify that applications are accessing resources as expected.

---

## Audit Logs

Audit Logs record changes related to applications and permissions, such as:

- Consent granted
- Consent revoked
- Application registration updates
- Permission changes
- Administrator actions

These logs are invaluable for compliance, troubleshooting, and forensic investigations.

---

## Workbooks and Reporting

Microsoft Entra Workbooks and Azure Monitor can be used to visualize:

- Consent activity
- Application usage
- Sign-in trends
- Permission assignments
- Risk detections

Dashboards make it easier to identify unusual behavior or over-privileged applications.

---

# Microsoft Graph Permission References

When developing applications, always consult the Microsoft Graph permission documentation to understand:

- Available delegated permissions
- Available application permissions
- Which permissions require administrator consent
- Least-privilege alternatives
- Permission descriptions

Reviewing the documentation before implementation helps ensure your application requests only the permissions it truly needs.

---

# Best Practices

Following security best practices helps reduce risk while improving the user experience.

## Grant Least-Privilege Permissions

Request only the permissions required for your application's functionality.

For example, request:

\`\`\`text
User.Read
\`\`\`

instead of:

\`\`\`text
Directory.ReadWrite.All
\`\`\`

unless broader access is absolutely necessary.

---

## Review Permission Requests Carefully

Before granting consent:

- Verify the application's publisher.
- Understand why each permission is requested.
- Confirm the requested permissions align with business requirements.

Users and administrators should avoid approving unnecessary or unfamiliar permissions.

---

## Prefer Delegated Permissions

When possible, design applications to use delegated permissions rather than application permissions.

Delegated permissions:

- Operate within the signed-in user's privileges.
- Reduce organizational risk.
- Support the principle of least privilege.

---

## Use Resource-Specific Consent

Where supported, use Resource-Specific Consent (RSC) to limit application access to only the required Teams, SharePoint sites, or other supported resources.

---

## Regularly Review Consents

Applications evolve over time.

Administrators should periodically:

- Remove unused applications.
- Revoke obsolete permissions.
- Review administrator consent.
- Audit privileged applications.

Regular reviews reduce unnecessary access and improve security.

---

## Monitor Consent Activity

Monitor:

- Sign-in Logs
- Audit Logs
- Application usage
- Permission changes

Continuous monitoring helps detect suspicious activity and supports compliance requirements.

---

## Educate Users and Administrators

Users should understand:

- What they are consenting to.
- The difference between delegated and application permissions.
- When administrator approval is required.

Security awareness reduces the likelihood of excessive or inappropriate permission grants.

---

# Common Consent Errors and Troubleshooting

Applications may encounter errors related to permissions or consent.

| Error                       | Cause                                                                       | Resolution                                                           |
| --------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Consent Required**        | Required permissions have not been approved.                                | Request user or administrator consent.                               |
| **Admin Consent Required**  | The requested permission requires administrator approval.                   | Have a privileged administrator grant tenant-wide consent.           |
| **Insufficient Privileges** | The Access Token does not contain the required scopes or roles.             | Request the correct permissions and obtain new consent if necessary. |
| **Access Denied**           | The user or application is not authorized to access the requested resource. | Verify permissions, consent, and API configuration.                  |
| **Invalid Scope**           | The requested scope is incorrect or unsupported.                            | Confirm the permission name in the Microsoft Graph documentation.    |

When troubleshooting, verify:

- The requested permissions.
- Whether consent has been granted.
- Whether the correct Access Token is being used.
- That the token contains the expected scopes (\`scp\`) or application roles (\`roles\`).

---

# Real-World Example

Consider a Human Resources application that integrates with Microsoft Graph.

1. The application requests the delegated permission \`User.Read\`.
2. An employee signs in with Microsoft Entra.
3. Microsoft Entra displays a consent screen describing the requested access.
4. The employee approves the request.
5. Microsoft Entra records the user's consent.
6. An Access Token containing the \`User.Read\` scope is issued.
7. The application retrieves the employee's profile from Microsoft Graph.

Later, the organization adds a feature that synchronizes all employees overnight.

Because this requires reading directory data without user interaction, the application requests the \`User.Read.All\` **application permission**.

A Global Administrator reviews the request and grants tenant-wide administrator consent.

The background service can now securely synchronize directory information using the Client Credentials flow.

---

# Summary

Permissions define what an application can do, while consent determines who authorizes those permissions.

Microsoft Entra supports delegated permissions, application permissions, user consent, administrator consent, tenant-wide consent, and resource-specific consent, providing a flexible authorization model for applications ranging from personal productivity tools to large-scale enterprise services.

By requesting only the permissions an application needs, regularly reviewing granted access, and monitoring consent activity, organizations can maintain strong security while enabling users and applications to work effectively.

---

# Key Takeaways

- Permissions define the actions an application can perform.
- Consent authorizes an application to use those permissions.
- Delegated permissions act on behalf of a signed-in user.
- Application permissions allow background services to operate independently of users.
- User consent and administrator consent apply to different permission scenarios.
- Resource-Specific Consent (RSC) enables least-privilege access to supported resources.
- Organizations should regularly review, audit, and revoke unnecessary permissions.
- Following the principle of least privilege is essential for securing Microsoft Entra applications.
`,x=`# Pods

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
`,O="/assets/app-registration-service-principal-CnEiIKLe.png",D="/assets/authorization-code-flow-pkce-CIAq4_od.png",z="/assets/complete-enterprise-authentication-architecture-RMUF3Whu.png",W="/assets/conditional-access-Bp7ftwOY.png",q="/assets/core-architecture-Chr34MGd.png",U="/assets/cryptography-deep-dive-DY15AeDm.png",G="/assets/identity-fundamentals.png-C4FlPPsW.png",F="/assets/jwt-token-architecture-DqP0CDGp.png",K="/assets/microsoft-graph-8eVtnoew.png",J="/assets/oauth-2.0-openid-connect-BRyZamBt.png",B="/assets/oauth-flow-comparison-D4-Tq1tq.png",L="/assets/permissions-consent-BnlAROzq.png",_=`id: entra-auth
title: Microsoft Entra Authentication
description: End-to-end Microsoft Entra learning path.
articles:
  - identity-fundamentals
  - core-architecture
  - app-registration
  - oauth-2.0
  - oauth-flow-comparison
  - authorization-code-flow
  - jwt-token-architecture
  - cryptography
  - microsoft-graph
  - permissions-and-consent
  - conditional-access
  - complete-enterprise-authentication-architecture
`,m=t=>{const e={},n=t.split(/\r?\n/),s=o=>o.trim().replace(/^["']|["']$/g,"");let i=0;for(;i<n.length;){const a=n[i].match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);if(!a){i+=1;continue}const[,c,r]=a;if(r.trim()===""){const d=[];let h=i+1;for(;h<n.length;){const u=n[h].match(/^\s*-\s*(.+)$/);if(!u)break;d.push(s(u[1])),h+=1}if(d.length>0){e[c]=d,i=h;continue}i+=1;continue}if(/^\[.*\]$/.test(r.trim())){e[c]=r.trim().replace(/^\[|\]$/g,"").split(",").map(s).filter(Boolean),i+=1;continue}e[c]=s(r),i+=1}return e},H=200,j=t=>{const e=t.trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.round(e/H))},N=/content\/([^/]+)\/(.+)\/index\.md$/,V=/content\/([^/]+)\/(.+)\/images\/([^/]+)$/,f=t=>t.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),$=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/,Z=t=>{const e=t.match($);if(!e)return{body:t};const n=t.slice(e[0].length),s=m(e[1]),i=a=>Array.isArray(a)?void 0:a,o=a=>Array.isArray(a)?a:void 0;return{id:i(s.id),title:i(s.title),description:i(s.description),learningPath:i(s.learningPath),tags:o(s.tags),body:n}},Q=(t,e)=>{const n=t.match(/^#\s+(.+)$/m);return n?n[1].trim():f(e)},Y=t=>{const n=t.replace(/^#\s+.+$/m,"").trim().split(/\n\s*\n/).map(i=>i.trim()).find(i=>i.length>0&&!i.startsWith("#")&&!i.startsWith("!["));if(!n)return"";const s=n.replace(/[*_`]/g,"").replace(/\s+/g," ").trim();return s.length>140?`${s.slice(0,137)}...`:s},X=Object.assign({"../../../../content/azure/entra-auth/app-registration/index.md":v,"../../../../content/azure/entra-auth/authorization-code-flow/index.md":w,"../../../../content/azure/entra-auth/complete-enterprise-authentication-architecture/index.md":b,"../../../../content/azure/entra-auth/conditional-access/index.md":T,"../../../../content/azure/entra-auth/core-architecture/index.md":k,"../../../../content/azure/entra-auth/cryptography/index.md":M,"../../../../content/azure/entra-auth/identity-fundamentals/index.md":S,"../../../../content/azure/entra-auth/jwt-token-architecture/index.md":E,"../../../../content/azure/entra-auth/microsoft-graph/index.md":C,"../../../../content/azure/entra-auth/oauth-2.0/index.md":P,"../../../../content/azure/entra-auth/oauth-flow-comparison/index.md":I,"../../../../content/azure/entra-auth/permissions-and-consent/index.md":R,"../../../../content/kubernetes/pods/index.md":x}),nn=Object.assign({"../../../../content/azure/entra-auth/app-registration/images/app-registration-service-principal.png":O,"../../../../content/azure/entra-auth/authorization-code-flow/images/authorization-code-flow-pkce.png":D,"../../../../content/azure/entra-auth/complete-enterprise-authentication-architecture/images/complete-enterprise-authentication-architecture.png":z,"../../../../content/azure/entra-auth/conditional-access/images/conditional-access.png":W,"../../../../content/azure/entra-auth/core-architecture/images/core-architecture.png":q,"../../../../content/azure/entra-auth/cryptography/images/cryptography-deep-dive.png":U,"../../../../content/azure/entra-auth/identity-fundamentals/images/identity-fundamentals.png.png":G,"../../../../content/azure/entra-auth/jwt-token-architecture/images/jwt-token-architecture.png":F,"../../../../content/azure/entra-auth/microsoft-graph/images/microsoft-graph.png":K,"../../../../content/azure/entra-auth/oauth-2.0/images/oauth-2.0-openid-connect.png":J,"../../../../content/azure/entra-auth/oauth-flow-comparison/images/oauth-flow-comparison.png":B,"../../../../content/azure/entra-auth/permissions-and-consent/images/permissions-consent.png":L}),en=Object.assign({"../../../../learning-paths/entra-auth.yaml":_}),tn=(t,e)=>{const n={};for(const[s,i]of Object.entries(nn)){const o=s.match(V);if(!o)continue;const[,a,c,r]=o;a===t&&c===e&&(n[r]=i)}return n},l=Object.entries(X).map(([t,e])=>{const n=t.match(N);if(!n)return null;const[,s,i]=n,o=i.split("/").pop()??i,{id:a,title:c,description:r,learningPath:d,tags:h,body:u}=Z(e);return{slug:i,categorySlug:s,title:c??Q(u,o),description:r??Y(u),tags:h??[],url:`/learning/${s}/${i}`,id:a??i,learningPathId:d,readingTimeMinutes:j(u),content:u,images:tn(s,i)}}).filter(t=>t!==null).sort((t,e)=>t.title.localeCompare(e.title)),g=(()=>{const t=new Map;for(const e of Object.values(en)){const n=m(e),s=typeof n.id=="string"?n.id:void 0,i=typeof n.title=="string"?n.title:void 0,o=Array.isArray(n.articles)?n.articles:void 0;!s||!i||!o||t.set(s,{id:s,title:i,description:typeof n.description=="string"?n.description:"",articles:o})}return t})();for(const t of g.values())for(const e of t.articles)l.some(s=>s.id===e)||console.error(`Learning path "${t.id}" references unknown article id "${e}".`);const sn=(()=>{const t=new Map;for(const e of l){const n=t.get(e.categorySlug);if(n){n.articleCount+=1;continue}const s=f(e.categorySlug);t.set(e.categorySlug,{slug:e.categorySlug,title:s,description:`${s} notes and articles.`,articleCount:1})}return Array.from(t.values()).sort((e,n)=>e.title.localeCompare(n.title))})(),ln=()=>l,on=()=>sn,y=(t,e)=>l.find(n=>n.categorySlug===t&&n.slug===e),pn=t=>g.get(t),dn=(t,e)=>{const n=y(t,e),s=n!=null&&n.learningPathId?g.get(n.learningPathId):void 0;if(!n||!s)return null;const i=s.articles.indexOf(n.id);return i===-1?null:{path:s,position:i+1,total:s.articles.length}},un=(t,e)=>{const n=y(t,e),s=n!=null&&n.learningPathId?g.get(n.learningPathId):void 0;if(n&&s){const o=s.articles,a=o.indexOf(n.id),c=r=>r?l.find(d=>d.id===r)??null:null;if(a!==-1)return{previous:a>0?c(o[a-1]):null,next:a<o.length-1?c(o[a+1]):null}}const i=l.findIndex(o=>o.categorySlug===t&&o.slug===e);return i===-1?{previous:null,next:null}:{previous:i>0?l[i-1]:null,next:i<l.length-1?l[i+1]:null}},hn=on();export{cn as L,on as a,un as b,hn as c,dn as d,pn as e,y as f,ln as g};
