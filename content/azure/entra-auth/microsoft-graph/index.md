---
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

```text
https://graph.microsoft.com/v1.0
```

Microsoft also provides a preview endpoint for features that are still under development:

```text
https://graph.microsoft.com/beta
```

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

```text
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
```

This architecture ensures that every request is authenticated and authorized before any Microsoft cloud resource is accessed.

---

# HTTP Methods

Microsoft Graph follows REST principles and uses standard HTTP methods.

## GET

Retrieves data.

Example:

```http
GET /users
```

Typical uses include:

- Read users
- Read groups
- Read devices
- Retrieve reports

---

## POST

Creates new resources.

Example:

```http
POST /users
```

Used for:

- Creating users
- Creating groups
- Registering applications

---

## PATCH

Updates existing resources.

Example:

```http
PATCH /users/{id}
```

Used to modify:

- User properties
- Group settings
- Device information

---

## DELETE

Removes resources.

Example:

```http
DELETE /groups/{id}
```

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

```http
GET https://graph.microsoft.com/v1.0/users
Authorization: Bearer <access_token>
Accept: application/json
```

A typical response:

```json
{
  "value": [
    {
      "id": "12345678-1234-1234-1234-123456789abc",
      "displayName": "John Doe",
      "userPrincipalName": "john.doe@contoso.com"
    }
  ]
}
```

All Microsoft Graph APIs follow this consistent JSON-based format.

---

# Sample API Request

The following example retrieves a list of users while selecting only the properties required by the application.

```http
GET https://graph.microsoft.com/v1.0/users?$top=10&$select=id,displayName,userPrincipalName

Authorization: Bearer <access_token>
Accept: application/json
ConsistencyLevel: eventual
```

Example response:

```json
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
```

Notice the `@odata.nextLink` property, which is used when additional pages of results are available.

---

# Common Microsoft Graph Resources

Microsoft Graph exposes hundreds of resource types. Some of the most commonly used are listed below.

## Users

Endpoint:

```http
GET /users
```

Common operations:

- List users
- Retrieve user profiles
- Update user properties
- Manage licenses
- Reset passwords (with appropriate permissions)

---

## Groups

Endpoint:

```http
GET /groups
```

Applications can:

- Create Microsoft 365 groups
- Manage security groups
- Add or remove members
- Retrieve group owners

---

## Applications

Endpoint:

```http
GET /applications
```

Common scenarios include:

- List App Registrations
- Manage application properties
- Configure redirect URIs
- Review permissions

---

## Devices

Endpoint:

```http
GET /devices
```

Examples:

- Retrieve registered devices
- View device ownership
- Monitor device compliance
- Manage lifecycle operations

---

## Directory Objects

Endpoint:

```http
GET /directoryObjects
```

Used to retrieve and manage general directory resources, including users, groups, contacts, and administrative units.

---

## Audit Logs

Endpoint:

```http
GET /auditLogs
```

Organizations commonly retrieve:

- Audit logs
- Sign-in logs
- Provisioning logs
- Directory audit events

These APIs are frequently used for compliance reporting and security investigations.

---

## Reports

Endpoint:

```http
GET /reports
```

Examples include:

- Microsoft 365 usage reports
- License reports
- Authentication reports
- User activity reports

---

## Identity Risk Detections

Endpoint:

```http
GET /identityProtection
```

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

```text
User

↓

Microsoft Entra

↓

Access Token

↓

Microsoft Graph

↓

User's Permissions Applied
```

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

```text
Application

↓

Client Credentials Flow

↓

Access Token

↓

Microsoft Graph
```

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

```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

Microsoft Graph validates:

- Token signature
- Issuer (`iss`)
- Audience (`aud`)
- Expiration (`exp`)
- Scopes (`scp`)
- Roles (for application permissions)

Only after successful validation does Microsoft Graph process the request.

---

# Common Query Parameters

Microsoft Graph supports OData query parameters that allow applications to retrieve only the data they need.

## `$select`

Returns only specified properties.

Example:

```http
GET /users?$select=id,displayName,mail
```

This reduces payload size and improves performance.

---

## `$filter`

Filters resources based on specific criteria.

Example:

```http
GET /users?$filter=accountEnabled eq true
```

Useful for retrieving only matching resources.

---

## `$orderby`

Sorts results.

Example:

```http
GET /users?$orderby=displayName
```

Results can be sorted in ascending or descending order.

---

## `$top`

Limits the number of returned items.

Example:

```http
GET /users?$top=25
```

This is commonly used to control page size.

---

## `$skip`

Skips a specified number of records.

Example:

```http
GET /users?$skip=50
```

Useful when implementing custom pagination.

---

## `$expand`

Retrieves related resources in a single request.

Example:

```http
GET /groups?$expand=members
```

This reduces the need for additional API calls.

---

## `$count`

Returns the total number of matching resources.

Example:

```http
GET /users?$count=true
```

Often used when displaying totals in dashboards or reports.

---

## `$search`

Performs a search across supported resources.

Example:

```http
GET /users?$search="displayName:John"
```

Search capabilities vary depending on the resource type.

---

---

# Pagination

Microsoft Graph may return thousands of resources for a single request. To improve performance and reduce response sizes, results are divided into pages.

When additional pages are available, Microsoft Graph includes an `@odata.nextLink` property in the response.

Example:

```json
{
  "value": [
    {
      "id": "12345",
      "displayName": "John Doe"
    }
  ],
  "@odata.nextLink": "https://graph.microsoft.com/v1.0/users?$skiptoken=..."
}
```

Applications should continue requesting the URL in `@odata.nextLink` until no further pages are returned.

### Best Practices

- Always check for `@odata.nextLink`.
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

```http
HTTP 429 Too Many Requests
```

The response includes a **Retry-After** header indicating how long the application should wait before retrying.

Example:

```http
HTTP/1.1 429 Too Many Requests

Retry-After: 15
```

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

```csharp
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
```

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

```text
User.Read
```

Avoid requesting broad permissions such as:

```text
Directory.ReadWrite.All
```

unless they are absolutely necessary.

---

## Use `$select`

Retrieve only the properties you need.

Smaller responses improve application performance and reduce network traffic.

---

## Handle Pagination

Always process the `@odata.nextLink` property to retrieve complete result sets.

---

## Respect Throttling

Implement retry logic using the `Retry-After` header and exponential backoff.

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
| **429 Too Many Requests**     | Request throttled        | Respect the `Retry-After` header and retry later. |
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
