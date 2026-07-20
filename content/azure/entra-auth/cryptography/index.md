---
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
- Key IDs (`kid`)
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
- Key identification (`kid`)
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
- How the `kid` header identifies signing keys
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

```text
Hello Microsoft Entra
```

SHA-256 Output

```text
4a81a0d7e18b...
```

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

```text
Input A
↓

SHA-256

↓

Hash A
```

Running the algorithm again produces the exact same hash.

---

## One-Way Function

Hashes cannot be reversed.

```text
Data
↓

SHA-256

↓

Hash
```

Knowing the hash does not reveal the original data.

This property protects passwords and supports digital signatures.

---

## Avalanche Effect

A tiny change in the input produces a completely different hash.

Example

Original

```text
Hello
```

Modified

```text
hello
```

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

```
Private Key
      │
Mathematically Linked
      │
Public Key
```

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

```text
Header.Payload.Signature
```

Example

```text
eyJhbGciOiJSUzI1NiIsImtpZCI6IlhTVGUifQ.
eyJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20ifQ.
QbJ83eA...
```

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

```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "x5teAbc123"
}
```

### Header Fields

| Field | Description                   |
| ----- | ----------------------------- |
| alg   | Signing algorithm (RS256)     |
| typ   | Token type (JWT)              |
| kid   | Identifier of the signing key |

The `kid` value becomes important during verification because it tells the API which Microsoft public key should be used.

---

# JWT Payload

The payload contains claims describing the authenticated user and the issued token.

Example

```json
{
  "iss": "https://login.microsoftonline.com/{tenant}",
  "aud": "api://contoso-api",
  "sub": "11111111-2222-3333-4444-555555555555",
  "exp": 1716761234,
  "iat": 1716757634,
  "name": "Charan"
}
```

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

```text
Header
↓

Base64URL
```

---

## Step 2 – Create the JWT Payload

The payload is also Base64URL encoded.

```text
Payload
↓

Base64URL
```

---

## Step 3 – Combine Header and Payload

Microsoft Entra concatenates the encoded values.

```text
Base64Url(Header)
      +
"."
      +
Base64Url(Payload)
```

This string becomes the signing input.

---

## Step 4 – Generate SHA-256 Hash

Microsoft Entra calculates a SHA-256 hash of the signing input.

```text
Header.Payload
      │
      ▼
SHA-256
      │
      ▼
256-bit Hash
```

This hash uniquely represents the token contents.

If even one character changes, the hash changes completely.

---

## Step 5 – Sign Using Private Key

Microsoft Entra encrypts the SHA-256 hash using its RSA private key.

```text
SHA-256 Hash
       │
RSA Private Key
       │
       ▼
Digital Signature
```

Only Microsoft's private key can generate this signature.

---

## Step 6 – Construct the JWT

The final JWT becomes:

```text
Header.Payload.Signature
```

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

```text
https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys
```

Applications download these public keys automatically.

---

# Example JWKS

```json
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
```

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

# The `kid` (Key ID)

A JWT header contains a field called `kid`.

```json
{
  "alg": "RS256",
  "kid": "x5teAbc123"
}
```

The Key ID uniquely identifies which Microsoft signing key created the token.

This becomes especially important because Microsoft maintains multiple active signing keys during key rotation.

---

# Why `kid` Is Necessary

Imagine Microsoft's JWKS contains five public keys.

Without a Key ID, an API would have to attempt verification with every key.

Instead, the API performs a simple lookup.

```text
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
```

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

## Step 2 – Read the `kid`

The API reads the Key ID from the JWT header.

Example:

```json
{
  "kid": "x5teAbc123"
}
```

This tells the API exactly which public key should be used.

---

## Step 3 – Retrieve the Public Key

The API downloads (or retrieves from cache) the JWKS document and locates the matching public key using the `kid`.

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

```text
User
```

to

```text
Administrator
```

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
7. The API reads the `kid` from the JWT header.
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

```text
Private Key
        │
Mathematically Linked
        │
Public Key
```

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

```json
{
  "alg": "RS256",
  "kid": "x5teNew987"
}
```

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

```text
❌ Store Microsoft's public key inside the application.
```

This approach breaks as soon as Microsoft rotates its signing keys.

Instead, applications should always retrieve public keys dynamically from the JWKS endpoint.

```text
✔ Read kid
✔ Download JWKS
✔ Select matching key
✔ Validate signature
```

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

```text
Header.Payload.Signature
```

---

## Step 4 – Token Is Sent to the Client

The signed JWT is returned to the application.

The client stores the token securely and includes it in the Authorization header when calling APIs.

Example:

```http
GET https://graph.microsoft.com/v1.0/me
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

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

- Issuer (`iss`)
- Audience (`aud`)
- Expiration (`exp`)
- Not Before (`nbf`)
- Tenant ID (`tid`)
- Required scopes (`scp`)
- Application roles (`roles`)

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
- Validate the `kid` to select the correct public key.
- Verify the issuer (`iss`) matches the expected Microsoft Entra tenant.
- Verify the audience (`aud`) matches your application or API.
- Reject expired tokens by validating the `exp` claim.
- Validate `nbf` (Not Before) to ensure the token is active.
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
8. Microsoft Graph reads the `kid` from the JWT header.
9. Microsoft Graph retrieves the matching public key from the JWKS endpoint.
10. The JWT signature is verified successfully.
11. Microsoft Graph validates the issuer, audience, and token lifetime.
12. The requested user profile is returned.

This workflow allows Microsoft Graph to trust the token without ever having access to Microsoft's private signing key.

---

# Summary

Cryptography is the trust foundation of Microsoft Entra authentication. By combining SHA-256 hashing, RSA public/private key cryptography, digital signatures, and JSON Web Tokens, Microsoft Entra enables applications to verify identity securely without sharing secret keys.

Public keys are published through the JWKS endpoint, allowing APIs to validate signatures independently. The `kid` claim ensures that the correct signing key is selected, while key rotation allows Microsoft to replace signing keys without interrupting running applications.

Together, these mechanisms provide integrity, authenticity, scalability, and operational resilience for millions of authentication requests every day.

---

# Key Takeaways

- SHA-256 produces a fixed-size cryptographic hash used during token signing.
- Microsoft Entra uses asymmetric cryptography based on RSA key pairs.
- Private keys sign JWTs and never leave Microsoft infrastructure.
- Public keys are published through the JWKS endpoint for signature verification.
- Digital signatures ensure that JWTs are authentic and have not been modified.
- The `kid` claim identifies which public key should be used for verification.
- Key rotation replaces signing keys securely without affecting existing applications.
- Applications should always validate JWT signatures before trusting token claims.
- Public keys should be obtained dynamically from the JWKS endpoint rather than hardcoded.
