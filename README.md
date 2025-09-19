# E-Commerce API

## Overview
A RESTful e-commerce API for managing products and users with MongoDB integration and GitHub OAuth authentication.

## Features
- **Product Management**: Create, read, update, and delete products
- **User Management**: Manage user accounts with different roles
- **GitHub OAuth**: Secure authentication using GitHub accounts
- **Input Validation**: Comprehensive validation for all inputs
- **Swagger Documentation**: Interactive API documentation
- **MongoDB Integration**: NoSQL database for flexible data storage

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with GitHub OAuth
- **Validation**: Express-validator
- **Documentation**: Swagger/OpenAPI
- **Testing**: REST client files for testing

## Project Structure
```
├── controllers/
│   ├── products.js    # Product CRUD operations
│   └── users.js       # User management operations
├── data/
│   └── database.js    # MongoDB connection setup
├── middleware/
│   └── authenticate.js # Authentication middleware
├── models/
│   ├── products.js    # Product schema definition
│   └── users.js       # User schema definition
├── routes/
│   ├── index.js       # Main router and authentication
│   ├── products.js    # Product routes
│   ├── swagger.js     # Swagger documentation routes
│   └── users.js       # User routes
├── validation/
│   ├── product-validation.js # Product validation rules
│   └── user-validation.js    # User validation rules
├── server.js          # Main application setup
└── swagger.js         # Swagger documentation generator
```

## Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd project-directory
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CALLBACK_URL=your_callback_url
PORT=3000
```

4. Start the application:
```bash
npm start
```

## API Documentation
Access interactive Swagger documentation at: `http://localhost:3000/api-docs`

## Authentication
Uses GitHub OAuth for authentication:
- Access `/login` to initiate GitHub authentication
- Protected routes require `isAuthenticated` middleware

## API Endpoints

### Products
- `GET /products` - Get all products (authenticated)
- `POST /products` - Create a new product (authenticated + validation)
- `PUT /products/:id` - Update a product (authenticated + validation)
- `DELETE /products/:id` - Delete a product

### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user (authenticated + validation)
- `PUT /users/:id` - Update a user (authenticated + validation)
- `DELETE /users/:id` - Delete a user (authenticated)

## Data Models

### Product Model
```javascript
{
  name: String (required),
  price: Number (required, min: 0),
  stock: Number (required, min: 0),
  category: String (required),
  description: String,
  brand: String (required),
  rating: Boolean,
  color: String
}
```

### User Model
```javascript
{
  name: String (required),
  email: String (required),
  age: Number (required),
  role: String (required)
}
```

## Validation
The API includes comprehensive validation:
- Product creation/updates require: name, price, category, stock
- User creation/updates require: name, email, age, role
- Email validation ensures proper email format
- Numeric validation for price, stock, and age fields

## Testing
Test endpoints using the included `routes.rest` file or tools like Postman.

## Dependencies
- express, mongodb, mongoose
- passport, passport-github2
- express-session, express-validator
- swagger-ui-express, swagger-autogen
- dotenv, cors

## Development
Generate updated Swagger docs: `node swagger.js`

## Deployment
Configure environment variables for MongoDB and GitHub OAuth credentials. The application is ready for deployment on platforms like Render.
