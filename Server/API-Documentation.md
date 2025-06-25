# API Documentation

This document provides detailed information about the API endpoints for the Freelancer Portfolio application.

**Base URL**: `/api`

---

## 🔐 Authentication (`/api/auth`)

Handles user authentication and registration.

### 1. Register Admin
- **Endpoint**: `POST /register`
- **Description**: Registers a new admin user. This is typically a one-time setup.
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "yoursecurepassword"
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Admin registered successfully"
  }
  ```

### 2. Login Admin
- **Endpoint**: `POST /login`
- **Description**: Authenticates an admin user and returns a JWT.
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "yoursecurepassword"
  }
  ```
- **Success Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

---

## 🖼️ Projects (`/api/projects`)

Manages the portfolio projects.

### 1. Get All Projects
- **Endpoint**: `GET /`
- **Description**: Retrieves a list of all projects.
- **Auth Required**: No

### 2. Create a Project
- **Endpoint**: `POST /`
- **Description**: Adds a new project. Requires image upload (multipart/form-data).
- **Auth Required**: Yes
- **Request Body** (form-data):
  - `title`: String
  - `description`: String
  - `technologies`: String (comma-separated)
  - `link`: String
  - `image`: File

### 3. Update a Project
- **Endpoint**: `PUT /:id`
- **Description**: Updates an existing project.
- **Auth Required**: Yes
- **Request Body** (JSON):
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description.",
    "technologies": ["React", "Node.js"],
    "link": "http://example.com"
  }
  ```

### 4. Delete a Project
- **Endpoint**: `DELETE /:id`
- **Description**: Deletes a project by its ID.
- **Auth Required**: Yes

---

## ✍️ Blogs (`/api/blogs`)

Manages blog posts.

### 1. Get All Blog Posts
- **Endpoint**: `GET /`
- **Description**: Retrieves a list of all blog posts.
- **Auth Required**: No

### 2. Create a Blog Post
- **Endpoint**: `POST /`
- **Description**: Adds a new blog post.
- **Auth Required**: Yes
- **Request Body** (JSON):
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of the blog post.",
    "author": "Admin"
  }
  ```

### 3. Update a Blog Post
- **Endpoint**: `PUT /:id`
- **Description**: Updates an existing blog post.
- **Auth Required**: Yes

### 4. Delete a Blog Post
- **Endpoint**: `DELETE /:id`
- **Description**: Deletes a blog post by its ID.
- **Auth Required**: Yes

---

## ⭐ Testimonials (`/api/testimonials`)

Manages client testimonials.

### 1. Get All Testimonials
- **Endpoint**: `GET /`
- **Description**: Retrieves a list of all testimonials.
- **Auth Required**: No

### 2. Create a Testimonial
- **Endpoint**: `POST /`
- **Description**: Adds a new testimonial.
- **Auth Required**: Yes
- **Request Body** (JSON):
  ```json
  {
    "name": "Satisfied Client",
    "quote": "This developer is amazing!",
    "company": "Client Inc."
  }
  ```

### 3. Update a Testimonial
- **Endpoint**: `PUT /:id`
- **Description**: Updates an existing testimonial.
- **Auth Required**: Yes

### 4. Delete a Testimonial
- **Endpoint**: `DELETE /:id`
- **Description**: Deletes a testimonial by its ID.
- **Auth Required**: Yes

---

## 📞 Contact (`/api/contact`)

Handles the contact form submission.

### 1. Submit Contact Form
- **Endpoint**: `POST /`
- **Description**: Submits the contact form and sends an email notification.
- **Auth Required**: No
- **Request Body** (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "message": "I would like to inquire about your services."
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Message sent successfully!"
  }
  ```
