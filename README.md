# TechTrek Users Backend

A beginner-friendly Node.js/Express/MongoDB project implementing:

- Users CRUD
- User validation
- Password hashing
- Login with JWT
- Admin/Owner authorization
- Avatar upload
- `/api/users`
- `/api/users/:id`

## 1. Requirements

Install:

- Node.js
- MongoDB Community Server (or use MongoDB Atlas)
- VS Code
- Postman (recommended for testing)

## 2. Open in VS Code

Open the folder `techtrek-users-backend`.

You should see:

```text
techtrek-users-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── scripts/
│   │   └── seedAdmin.js
│   ├── validators/
│   │   └── userValidators.js
│   ├── app.js
│   └── server.js
├── uploads/
│   └── avatars/
│       └── .gitkeep
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 3. Install packages

Open the VS Code terminal inside the project and run:

```bash
npm install
```

## 4. Create `.env`

Copy `.env.example` and rename the copy to `.env`.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/techtrek_users
JWT_SECRET=my_super_secret_key_123456789

ADMIN_NAME=TechTrek Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin123!
```

## 5. Start MongoDB

If you installed MongoDB locally, make sure the MongoDB service is running.

If you use MongoDB Atlas, put your Atlas connection string in `MONGODB_URI`.

## 6. Create the first admin

Run:

```bash
npm run seed:admin
```

Expected result:

```text
Admin created successfully
Email: admin@example.com
```

## 7. Run the server

```bash
npm run dev
```

Expected result:

```text
MongoDB connected
Server running on http://localhost:5000
```

Open:

```text
http://localhost:5000/
```

You should receive a JSON message.

---

# Main request flow

```text
Client/Postman
    ↓
Route
    ↓
Validation / Authentication / Authorization middleware
    ↓
Controller
    ↓
User Model
    ↓
MongoDB
    ↓
JSON Response
```

---

# Authentication

## Login

### POST `/api/auth/login`

Body:

```json
{
  "email": "admin@example.com",
  "password": "Admin123!"
}
```

Copy the returned `token`.

For protected requests in Postman:

1. Open Authorization.
2. Choose **Bearer Token**.
3. Paste the token.

---

# Users API

## 1. Create user — Admin only

### POST `/api/users`

Headers:

```text
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

Body:

```json
{
  "name": "Sara Ahmed",
  "email": "sara@example.com",
  "password": "Sara1234!",
  "role": "user"
}
```

---

## 2. Get all users — Admin only

### GET `/api/users`

Header:

```text
Authorization: Bearer YOUR_ADMIN_TOKEN
```

---

## 3. Get one user — Admin or that same user

### GET `/api/users/:id`

Example:

```text
GET /api/users/68c1234567890abcdef1234
```

---

## 4. Update user — Admin or owner

### PATCH `/api/users/:id`

Normal users can update their own name/email/password.
Only an admin can change `role`.

Example body:

```json
{
  "name": "Sara Mohamed"
}
```

---

## 5. Delete user — Admin or owner

### DELETE `/api/users/:id`

---

## 6. Upload avatar — Admin or owner

### PATCH `/api/users/:id/avatar`

In Postman:

1. Body
2. form-data
3. key = `avatar`
4. change key type from Text to File
5. select a JPG, JPEG, PNG, or WEBP image

Maximum file size: 2 MB.

The saved avatar URL will look like:

```text
/uploads/avatars/avatar-USERID-TIMESTAMP.jpg
```

---

# What each file does

## `src/server.js`

Starts the application and connects to MongoDB.

## `src/app.js`

Creates the Express app and connects the main routes.

## `src/models/User.js`

Defines what a user looks like in MongoDB.

Important fields:

- `name`
- `email`
- `password`
- `role`
- `avatar`

It also hashes passwords before saving.

## `src/routes/userRoutes.js`

Maps HTTP requests to controller functions.

Examples:

```text
POST   /api/users
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
```

## `src/controllers/userController.js`

Contains the actual CRUD logic.

## `src/validators/userValidators.js`

Checks user input before the controller runs.

## `src/middleware/authMiddleware.js`

Checks the JWT and decides:

- Is this user logged in?
- Is this user an admin?
- Is this user the owner of this resource?

## `src/middleware/uploadMiddleware.js`

Controls avatar file uploads.

## `src/controllers/authController.js`

Checks email/password and creates the login token.

---

# Easy explanation for your discussion

## CRUD

CRUD means:

```text
Create  = POST
Read    = GET
Update  = PATCH
Delete  = DELETE
```

## Authentication vs Authorization

Authentication:

```text
Who are you?
```

Example: logging in with email/password.

Authorization:

```text
Are you allowed to do this action?
```

Example: only an admin can see all users.

## Admin or Owner

An **admin** can manage users.

An **owner** means the logged-in user is trying to access their own user record.

Example:

```text
Logged-in user id = 123
Requested /api/users/123
```

That user is the owner.

## Validation

Validation rejects bad data before it reaches the database.

Examples:

- invalid email
- short password
- missing name
- invalid MongoDB id

## Avatar upload

The request is sent as `multipart/form-data`.
Multer saves the image in `uploads/avatars`.
The user document stores the image URL.

---

# Recommended demo order

1. Start MongoDB.
2. Run `npm run dev`.
3. Login as admin.
4. Create a user.
5. Get all users.
6. Get one user.
7. Update that user.
8. Upload an avatar.
9. Login as that normal user.
10. Show that the normal user can access their own record.
11. Show that the normal user cannot access another user's record.
12. Delete a user.

This demonstrates CRUD + validation + authentication + authorization + avatar upload in one project.
