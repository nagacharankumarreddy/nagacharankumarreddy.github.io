# Entra Authentication

Notes on authenticating applications and users against Azure Entra ID.

## App Registrations

Every application that needs to authenticate against Entra ID starts with an app registration, which defines its identity, redirect URIs, and requested permissions.

## Token Types

- **ID tokens** identify the signed-in user.
- **Access tokens** authorize calls to a specific API.
- **Refresh tokens** obtain new access tokens without re-prompting the user.
