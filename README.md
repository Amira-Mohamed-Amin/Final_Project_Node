# Blog System & User Management API

A RESTful API for a Blog System and User Management built with **Node.js, Express, MongoDB (Mongoose), JWT Authentication, bcrypt, and Joi Validation**.

The project follows the **MVC (Model–View–Controller)** architecture.

## Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Joi
* dotenv
* Nodemon

## Project Structure

```text
project-root/
├── config/
│   └── db.js
├── controllers/
│   └── auth.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── validate.middleware.js
├── models/
│   └── User.model.js
├── routes/
│   └── auth.routes.js
├── validations/
│   └── auth.validation.js
├── .env
├── .gitignore
├── app.js
├── server.js
└── package.json
```

## Features

### Authentication

* User registration
* User login
* Password hashing using bcrypt
* JWT token generation
* JWT authentication middleware
* Joi request validation
* Protected authentication routes

### User Model

The User model contains:

* `name`
* `email`
* `password`
* `role`
* `avatar`
* `createdAt`
* `updatedAt`

The user role can be:

* `user`
* `admin`

The default role is `user`.

## Authentication Endpoints

### Register

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "Amira",
  "email": "amira@example.com",
  "password": "123456"
}
```

### Login

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "amira@example.com",
  "password": "123456"
}
```

A successful login returns a JWT token.

## Authentication

Protected routes use the following HTTP header:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token and attaches the authenticated user's payload to:

```text
req.user
```

## Validation

Joi is used to validate incoming requests.

### Register Validation

* `name`: required, minimum 3 characters
* `email`: required, valid email
* `password`: required, minimum 6 characters

### Login Validation

* `email`: required, valid email
* `password`: required

Invalid requests return:

```http
400 Bad Request
```

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/final_project
PORT=3000
JWT_SECRET=your_secret_key
```

> Do not commit the `.env` file to GitHub.

## Running the Project

Start the development server:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:3000
```

## Testing

The API can be tested using **Postman**.

Authentication endpoints:

```text
POST http://localhost:3000/api/auth/register
POST http://localhost:3000/api/auth/login
```

## Project Status

The project is being developed as a team project. Authentication and User Model implementation are completed, while the remaining Blog and User Management features are being developed.
