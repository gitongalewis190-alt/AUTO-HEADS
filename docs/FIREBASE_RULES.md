# AUTO HEADS — Firebase Security Rules

## Firestore Rules (`firestore.rules`)

### Philosophy
- **Deny by default** — no rule means no access
- **Two enforcement layers**: middleware (page-level) + Firestore rules (data-level)
- **Role stored in Firestore** — never trust client-side claims

### Rule Breakdown

| Collection | Read | Write |
|---|---|---|
| `users` | Any authenticated user | Own doc only (or admin) |
| `projects` | Public (guests can read) | Creator only (or admin) |
| `comments` | Public | Authenticated users |
| `transactions` | Buyer or seller or admin | Never (Cloud Functions only) |
| `interactions` | Initiator or recipient or admin | Authenticated users |
| `supporters` | Public | Admin only |
| `settings` | Public | Admin only |

### Admin Role Check

```javascript
function isAdmin() {
  return isAuthenticated() &&
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

This reads the Firestore document on every write that requires admin access. Firebase caches these reads, so performance impact is minimal.

## Storage Rules (`storage.rules`)

| Path | Read | Write |
|---|---|---|
| `users/{uid}/logo/*` | Public | Owner only, images only, <50MB |
| `projects/{uid}/{projectId}/*` | Public | Owner only, image/video/doc, <200MB |
| `supporters/*` | Public | Never (admin uploads via Cloud Function) |

### MIME Type Validation

```javascript
function isValidImageType() {
  return request.resource.contentType.matches('image/.*');
}
function isValidVideoType() {
  return request.resource.contentType.matches('video/.*');
}
```

MIME type is validated by Firebase Storage — not by the client. Clients cannot spoof this.
