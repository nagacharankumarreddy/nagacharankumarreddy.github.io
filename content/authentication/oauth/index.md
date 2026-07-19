# OAuth 2.0

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
