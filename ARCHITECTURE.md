# 🏗️ Authentication System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              AuthContext (State Management)              │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ useAuth() Hook                                      │ │  │
│  │  │ - user: User | null                                 │ │  │
│  │  │ - token: string | null                              │ │  │
│  │  │ - login(email, password)                            │ │  │
│  │  │ - register(email, userName, password)               │ │  │
│  │  │ - logout()                                          │ │  │
│  │  │ - isAuthenticated: boolean                          │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↑                                     │
│                           │ HTTP Requests                       │
│                           │ (with Authorization header)         │
│                           ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         UI Components (Login, Register, Profile)         │  │
│  │  - Login.tsx: Email & Password input                     │  │
│  │  - Register.tsx: Email, Username, Password input         │  │
│  │  - ProtectedRoute.tsx: Route guard                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
              ┌─────────────────────────────┐
              │  HTTP API (Express Backend) │
              └─────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER (Node.js)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Routes Layer (authRoutes.js)               │  │
│  │  POST   /api/auth/register  ─────────────────┐          │  │
│  │  POST   /api/auth/login     ─────────────────┤          │  │
│  │  GET    /api/auth/profile   ─────────────────┼──────┐   │  │
│  │  POST   /api/auth/logout    ─────────────────┤      │   │  │
│  │                                               │      │   │  │
│  │                  authMiddleware.js           │      │   │  │
│  │                  (JWT Verification)          │      │   │  │
│  └───────────────────────────────────────────────┼──────┼───┘  │
│                                                   ↓      ↓      │
│  ┌──────────────────────────────┐  ┌──────────────────────────┐ │
│  │  Middleware Layer            │  │  Controller Layer        │ │
│  │                              │  │  (authController.js)     │ │
│  │  verifyAuth()                │  │                          │ │
│  │  - Extract token from header │  │  - register()            │ │
│  │  - Verify JWT signature      │  │  - login()               │ │
│  │  - Decode token              │  │  - getProfile()          │ │
│  │  - Attach user to request    │  │  - logout()              │ │
│  └──────────────────────────────┘  └──────────────────────────┘ │
│                                                   ↓              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │       Service Layer (authService.js)                    │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ register(email, userName, password)                 │ │  │
│  │  │  ├─ Validate email doesn't exist                    │ │  │
│  │  │  ├─ Hash password with bcrypt (10 rounds)           │ │  │
│  │  │  ├─ Create user in database                         │ │  │
│  │  │  └─ Generate JWT token                              │ │  │
│  │  │                                                     │ │  │
│  │  │ login(email, password)                              │ │  │
│  │  │  ├─ Find user by email                              │ │  │
│  │  │  ├─ Compare password with bcrypt hash               │ │  │
│  │  │  └─ Generate JWT token                              │ │  │
│  │  │                                                     │ │  │
│  │  │ verifyToken(token)                                  │ │  │
│  │  │  └─ Decode JWT and validate signature               │ │  │
│  │  │                                                     │ │  │
│  │  │ generateToken(userId)                               │ │  │
│  │  │  └─ Create JWT with userId as payload               │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                   ↓              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │    Repository Layer (userRepo.js)                       │  │
│  │  - findByEmail(email)                                   │  │
│  │  - findById(id)                                         │  │
│  │  - create(user)                                         │  │
│  │  - update(user)                                         │  │
│  │  - delete(id)                                           │  │
│  │  - findAll()                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                   ↓              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              MySQL Database                             │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │ UserTable                                          │ │  │
│  │  │ ┌──────┬────────────┬──────────────┬─────────────┐ │ │  │
│  │  │ │ Id   │ Email      │ PasswordHash │ UserName    │ │ │  │
│  │  │ ├──────┼────────────┼──────────────┼─────────────┤ │ │  │
│  │  │ │ 1    │ user@ex.   │ $2b$10$...   │ John Doe    │ │ │  │
│  │  │ │      │ com        │ (bcrypt)     │             │ │ │  │
│  │  │ └──────┴────────────┴──────────────┴─────────────┘ │ │  │
│  │  │ + Balance, CreatedAt, UpdatedAt                     │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

### Registration Flow

```
User Input (Email, Username, Password)
              ↓
    AuthContext.register()
              ↓
    POST /api/auth/register
              ↓
    authController.register()
              ↓
    authService.register()
              ├─→ Check if email exists
              ├─→ Hash password with bcrypt
              ├─→ Save user to database
              └─→ Generate JWT token
              ↓
    Return: { user, token }
              ↓
    Store in localStorage & React state
              ↓
    Redirect to home
```

### Login Flow

```
User Input (Email, Password)
              ↓
    AuthContext.login()
              ↓
    POST /api/auth/login
              ↓
    authController.login()
              ↓
    authService.login()
              ├─→ Find user by email
              ├─→ Compare password with bcrypt hash
              └─→ Generate JWT token
              ↓
    Return: { user, token }
              ↓
    Store in localStorage & React state
              ↓
    Redirect to home
```

### Protected Route Access

```
Client Request (with Authorization header)
              ↓
    authMiddleware.verifyAuth()
              ├─→ Extract token from header
              ├─→ Verify JWT signature
              ├─→ Decode token
              └─→ Attach user to request
              ↓
    If valid: Continue to route handler
    If invalid: Return 401 Unauthorized
```

## Token Format (JWT)

```
Authorization: Bearer <token>

Token Structure:
┌─────────────────┬──────────────────────┬────────────────────┐
│  Header         │  Payload             │  Signature         │
├─────────────────┼──────────────────────┼────────────────────┤
│ {               │ {                    │ HMACSHA256(        │
│   "alg":        │   "userId": 1,       │   base64(header) + │
│     "HS256",    │   "iat": 1234567890, │   "." +            │
│   "typ":        │   "exp": 1234654290  │   base64(payload), │
│     "JWT"       │ }                    │   secret           │
│ }              │                       │ )                  │
└─────────────────┴──────────────────────┴────────────────────┘

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjEsImlhdCI6MTY3MzYwMDAwMCwiZXhwIjoxNjc0MjA0ODAwfQ.
kK7Qz3XY2hL9mN5pR8sT1uV6wX3yZ0aB2cD4eF5gH6i
```

## Security Layers

```
┌──────────────────────────────────────────────────────┐
│         Security & Authentication Layers             │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Layer 1: Input Validation (Frontend & Backend)      │
│  ✓ Email format validation                          │
│  ✓ Password length validation (min 6)               │
│  ✓ Required field validation                        │
│                                                      │
│ Layer 2: Password Hashing (Backend)                 │
│  ✓ bcrypt with 10 salt rounds                       │
│  ✓ Passwords never stored in plaintext              │
│  ✓ One-way hashing (cannot be reversed)             │
│                                                      │
│ Layer 3: Token Generation (Backend)                 │
│  ✓ JWT signed with secret key                       │
│  ✓ Token expiration (7 days by default)             │
│  ✓ Unique userId in payload                         │
│                                                      │
│ Layer 4: Token Verification (Backend)               │
│  ✓ Middleware validates every protected request     │
│  ✓ Checks JWT signature integrity                   │
│  ✓ Verifies token hasn't expired                    │
│                                                      │
│ Layer 5: Token Storage (Frontend)                   │
│  ✓ localStorage for persistence                     │
│  ✓ Never exposed in URLs                            │
│  ✓ Included in Authorization header                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## Data Models

### User Model

```javascript
User {
  id: number              // Primary key
  email: string           // Unique
  passwordHash: string    // Bcrypt hash
  userName: string        // Display name
  balance: number         // User balance
  created_at: timestamp   // Creation time
  updated_at: timestamp   // Last update
}
```

### JWT Payload

```javascript
{
  userId: number; // User ID
  iat: number; // Issued at (timestamp)
  exp: number; // Expires at (timestamp)
}
```

### Auth Response

```javascript
{
  user: {
    id: number
    email: string
    userName: string
    balance?: number
  },
  token: string          // JWT token
}
```

## Error Handling

```
Frontend → Backend Errors:

400 Bad Request
├─ Invalid email format
├─ Password too short
├─ Missing required fields
└─ User already exists (registration)

401 Unauthorized
├─ Invalid credentials (login)
├─ No token provided
├─ Invalid/expired token
└─ User not found

500 Server Error
└─ Database connection issues
```

## Performance Optimization

1. **Token Caching**: Tokens stored in localStorage, no re-fetch needed
2. **Middleware Efficiency**: JWT verification is fast (no database lookup)
3. **Password Hashing**: Asynchronous, non-blocking operations
4. **Connection Pooling**: MySQL connection pool for database efficiency

## Scalability Considerations

1. **Horizontal Scaling**: Shared JWT_SECRET ensures consistency across servers
2. **Database**: Each user query indexed by email for O(1) lookup
3. **Load Balancing**: Stateless authentication works with any load balancer
4. **Token Refresh**: Can implement without session storage

---

This architecture ensures:

- ✅ Security: Encrypted passwords, signed tokens
- ✅ Scalability: Stateless authentication
- ✅ Maintainability: Clear separation of concerns
- ✅ Performance: Fast lookups and verification
- ✅ User Experience: Seamless login/logout flows
