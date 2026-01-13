# Authentication System Documentation

## Overview

This project implements a complete authentication system using **bcrypt** for password hashing and **JWT (JSON Web Tokens)** for secure session management.

## Backend Setup

### 1. Installation

All required packages have been added to `package.json`:

- `bcrypt`: Password hashing
- `jsonwebtoken`: JWT token generation and verification
- `express-validator`: Input validation

### 2. Configuration

Create a `.env` file in the `server/` directory based on `.env.example`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
DB_NAME=my_database
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
```

> **Important**: Change `JWT_SECRET` to a strong, random string in production!

### 3. Database Setup

The user table is already created by migration `002-create-userTable.js`. It includes:

- `Id`: Primary key
- `Email`: User email (unique)
- `PasswordHash`: Bcrypt hashed password
- `UserName`: User's display name
- `Balance`: User balance (default: 0)
- `CreatedAt` / `UpdatedAt`: Timestamps

### 4. API Endpoints

#### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "userName": "John Doe",
  "password": "securePassword123"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "userName": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "userName": "John Doe",
      "balance": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get User Profile (Protected)

```bash
GET /api/auth/profile
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "data": {
    "id": 1,
    "email": "user@example.com",
    "userName": "John Doe",
    "balance": 0
  }
}
```

#### Logout

```bash
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

### 5. Backend File Structure

```
server/src/
├── services/authService.js       # Authentication logic
├── controllers/authController.js # Request handlers
├── middlewares/authMiddleware.js # JWT verification middleware
├── routes/authRoutes.js          # Authentication endpoints
├── models/userModel.js           # User data model
├── repositories/userRepo.js      # Database queries
```

## Frontend Setup

### 1. Authentication Context

Located at `src/contexts/AuthContext.tsx`, this provides:

- User state management
- Login/Register functions
- Token storage/retrieval
- Authentication state (`isAuthenticated`, `isLoading`)

### 2. Usage in Components

```typescript
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { user, token, login, logout, isAuthenticated } = useAuth();

  // Use authentication state and methods
}
```

### 3. Authentication Pages

#### Login Page

- Path: `/login`
- File: `src/routes/auth/Login.tsx`
- Features:
  - Email and password input
  - Error handling
  - Loading state
  - Redirect to home on success

#### Register Page

- Path: `/register`
- File: `src/routes/auth/Register.tsx`
- Features:
  - Email, username, password input
  - Password confirmation
  - Validation (min 6 characters)
  - Error handling
  - Redirect to home on success

### 4. Protected Routes

Use the `ProtectedRoute` component to secure routes:

```typescript
import { ProtectedRoute } from "../components/ProtectedRoute";

// In your route config:
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>;
```

### 5. Token Storage

Tokens are stored in:

- **localStorage**: For persistence across page reloads
- **React State**: For fast access during the session

```typescript
// Token is automatically managed by AuthContext
const { token } = useAuth();

// Making authenticated requests:
fetch("/api/protected", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### 6. API Communication

All authenticated requests should include the Bearer token:

```typescript
const response = await fetch("http://localhost:3000/api/auth/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

## Security Best Practices

### Backend

1. ✅ Passwords are hashed with bcrypt (10 rounds)
2. ✅ JWT tokens have expiration time
3. ✅ Input validation on all endpoints
4. ✅ Middleware to verify tokens on protected routes
5. **TODO**: Add HTTPS in production
6. **TODO**: Implement refresh tokens
7. **TODO**: Add rate limiting

### Frontend

1. ✅ Token stored in localStorage
2. ✅ Automatic token inclusion in requests
3. ✅ Protected routes redirect to login
4. **TODO**: Implement automatic token refresh
5. **TODO**: Add logout on token expiration
6. **TODO**: Secure token storage (consider using httpOnly cookies via backend)

## Password Requirements

Current implementation:

- Minimum 6 characters
- Hashed with bcrypt before storage

**Recommendation for production:**

- Minimum 8-12 characters
- Mix of uppercase, lowercase, numbers, and special characters
- Password strength meter on frontend

## Environment Variables

Create `.env` in `server/` directory:

```env
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
JWT_EXPIRE=7d
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_PORT=3306
DB_NAME=my_database
```

## Running the Application

### Backend

```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:3000`

### Frontend

```bash
cd web
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Testing

### Test Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "userName": "Test User",
    "password": "password123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Route

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Future Enhancements

1. **Refresh Tokens**: Implement separate refresh tokens with longer expiration
2. **OAuth Integration**: Add Google, GitHub, Facebook login
3. **Email Verification**: Verify email addresses on registration
4. **Password Reset**: Implement forgot password flow
5. **Two-Factor Authentication**: Add 2FA support
6. **Session Management**: Track active sessions and allow logout from all devices
7. **Audit Logging**: Log all authentication events
8. **Rate Limiting**: Prevent brute force attacks
9. **CSRF Protection**: Add CSRF tokens for form submissions
10. **Role-Based Access Control**: Implement user roles and permissions

## Troubleshooting

### "Invalid or expired token" error

- Verify token is being sent with `Authorization: Bearer <token>` format
- Check JWT_SECRET matches between .env and authService.js
- Check token hasn't expired (default 7 days)

### Login fails with "User not found"

- Verify email address is correct
- Check user exists in database
- Ensure case-sensitive email matching

### Password hash errors

- Ensure bcrypt is properly installed: `npm install bcrypt`
- Check bcrypt version compatibility with Node.js version

## Support

For issues or questions, check:

1. Server logs: `npm run dev` output
2. Browser console: Frontend errors
3. Database: Verify user table exists and has data
4. Environment variables: Verify .env file is correctly configured
