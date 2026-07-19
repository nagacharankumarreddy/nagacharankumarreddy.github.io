# Key Vault

Azure Key Vault centralizes secrets, keys, and certificates so applications never hardcode sensitive values.

## Core Concepts

- **Secrets** — arbitrary key-value pairs (connection strings, API keys).
- **Keys** — cryptographic keys used for signing and encryption operations.
- **Certificates** — managed X.509 certificates with automatic renewal support.

## Access Control

Access is granted via Azure RBAC or legacy access policies — prefer RBAC for consistency with the rest of your Azure resources.
