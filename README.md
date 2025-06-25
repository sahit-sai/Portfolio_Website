<div align="center">
  <h1 style="font-size: 4rem; font-weight: bold;">Freelancer Portfolio</h1>
  <p style="font-size: 1.5rem;">A Full Stack MERN Application</p>

  <div>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  </div>
</div>

---

This is a comprehensive and dynamic personal portfolio website built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with TypeScript. It features a modern, responsive frontend and a robust backend with a secure admin dashboard for managing content dynamically.

## ✨ Key Features

### 👨‍💻 Public-Facing Website
- **Modern & Responsive UI**: Built with React, TypeScript, and Tailwind CSS for a beautiful experience on all devices.
- **Dynamic Content**: All major sections like Projects, Blog, Testimonials, and Timeline are fetched from the backend.
- **Interactive Sections**:
  - **Hero**: A stunning introduction.
  - **About**: Detailed bio, skills, and professional journey.
  - **Portfolio**: Showcase of projects with images, descriptions, and links.
  - **Services**: What I offer to clients.
  - **Timeline**: Professional experience and education history.
  - **Testimonials**: Client feedback carousel.
  - **Blog**: A section for articles and posts.
  - **Contact Form**: A functional form for user inquiries.

### 🔐 Admin Dashboard
- **Secure Authentication**: JWT-based login system to protect admin routes.
- **Content Management**: Full CRUD (Create, Read, Update, Delete) functionality for:
  - **Projects**: Add, edit, or remove portfolio projects, including image uploads.
  - **Blog Posts**: Create and manage blog articles.
  - **Testimonials**: Manage client testimonials.
  - **Timeline**: Update work experience and education history.
- **User-Friendly Interface**: An intuitive dashboard to manage all website content without touching the code.

## 🚀 Tech Stack

- **Frontend**:
  - **Framework**: React.js
  - **Language**: TypeScript
  - **Build Tool**: Vite
  - **Styling**: Tailwind CSS & Shadcn UI
  - **State Management**: Redux Toolkit
  - **HTTP Client**: Axios

- **Backend**:
  - **Runtime**: Node.js
  - **Framework**: Express.js
  - **Database**: MongoDB with Mongoose ODM
  - **Authentication**: JSON Web Tokens (JWT)
  - **File Handling**: Multer for image uploads

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Git
- A MongoDB instance (local or a free Atlas cluster)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd freelancer-portfolio
    ```

2.  **Setup the Backend (`/Server`):**
    ```sh
    cd Server
    npm install
    ```
    - Create a `.env` file in the `Server` directory and add the following variables:
      ```env
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_strong_jwt_secret
      PORT=3001
      ```
    - Start the backend server:
      ```sh
      npm run dev
      ```
    - The server will be running on `http://localhost:3001`.

3.  **Setup the Frontend (`/Client`):**
    ```sh
    cd ../Client
    npm install
    ```
    - Create a `.env` file in the `Client` directory and add the API URL:
      ```env
      VITE_API_URL=http://localhost:3001/api
      ```
    - Start the frontend development server:
      ```sh
      npm run dev
      ```
    - The application will be available at `http://localhost:5173`.

## 📝 API Documentation

For detailed information about the available API endpoints, please refer to the `Server/API-Documentation.md` file.

---

<div align="center">
  Built with ❤️ by Krishna Chavan.
</div>
