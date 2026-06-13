# AUTO HEADS — API Reference

All routes are under `/api/`. Auth is via session cookie set on login.

---

## Projects

### `GET /api/projects`
Returns a paginated list of projects.

**Query params**: `cursor`, `category`, `status`, `limit` (default 12)  
**Auth**: Not required  
**Response**: `PaginatedResponse<Project>`

---

### `GET /api/projects/[id]`
Returns a single project by ID.

**Auth**: Not required  
**Response**: `ApiResponse<Project>`

---

### `PATCH /api/projects/[id]`
Updates a project. Only creator or admin.

**Auth**: Required  
**Body**: Partial `Project`  
**Response**: `ApiResponse<Project>`

---

### `DELETE /api/projects/[id]`
Deletes a project and all associated Storage files. Only creator or admin.

**Auth**: Required  
**Response**: `ApiResponse<{ deleted: true }>`

---

## Upload

### `POST /api/upload`
Validates file type and size, returns a signed Firebase Storage upload URL.

**Auth**: Required  
**Body**: `{ fileName, fileType, fileSize, path }`  
**Response**: `ApiResponse<{ uploadUrl: string; downloadUrl: string }>`

---

## Payments

### `POST /api/payments/stripe`
Creates a Stripe PaymentIntent.

**Auth**: Required  
**Body**: `{ amount: number, currency: string }`  
**Response**: `{ clientSecret: string }`

---

### `POST /api/payments/mpesa`
Triggers an M-Pesa STK push.

**Auth**: Required  
**Body**: `{ phone: string, amount: number, reference: string }`  
**Response**: Daraja API response

---

### `POST /api/payments/webhook`
Stripe webhook — processes payment confirmation.

**Auth**: Stripe signature (not session cookie)  
**Body**: Stripe webhook event (raw)  
**Response**: `{ received: true }`

---

## Interactions

### `POST /api/interactions`
Logs a contact interaction event.

**Auth**: Required  
**Body**: `Interaction` object  
**Response**: `ApiResponse<{ id: string }>`

---

## Admin

### `GET /api/admin`
Returns platform settings.

**Auth**: Required (admin only)  
**Response**: `ApiResponse<PlatformSettings>`

### `POST /api/admin`
Performs admin actions (bulk delete, settings update).

**Auth**: Required (admin only)  
**Body**: `{ action: string, payload: unknown }`  
**Response**: `ApiResponse<unknown>`
