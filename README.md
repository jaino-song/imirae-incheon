# Imirae Incheon Back Office Web Application

This is a full-stack web application built with a modern JavaScript stack, featuring a React frontend and an Express.js backend. The core functionality revolves around digital document management, leveraging an integration with the eFormSign API.

## ✨ Key Features

-   **📄 Document Management**: The application allows users to create, submit, and manage digital forms and documents seamlessly through the eFormSign API.
-   **✍️ Content Creation**: Includes features for creating and editing text content directly within the application.
-   **🎨 Modern & Responsive UI**: The user interface is built with responsiveness in mind, using custom components styled with Emotion for a clean and modern look.
-   **⚡️ Efficient State Management**: Utilizes Zustand for lightweight, centralized state management on the frontend, ensuring a predictable and maintainable application state.
-   **⚙️ Secure API Backend**: The backend is built on Express.js and provides secure RESTful API endpoints to handle form data, business logic, and communication with the eFormSign service.
-   **🚀 Fast Development Experience**: The frontend is powered by Vite, offering a fast development server with hot module replacement (HMR) and an optimized build process.

## 📂 Project Structure

The project is organized into a monorepo structure with two main packages: `client` for the frontend application and `server` for the backend.

imirae-incheon/
├── client/ # Frontend React application
│ ├── src/
│ │ ├── assets/ # Static assets like images and logos
│ │ ├── components/ # Reusable React components (NavBar, Buttons, FormContainer, etc.)
│ │ ├── store/ # Zustand state management store and actions
│ │ ├── hooks/ # Custom React hooks for reusable logic
│ │ └── main.jsx # Main application entry point
│ ├── vite.config.js # Vite build and development server configuration
│ └── package.json # Frontend dependencies and scripts
│
└── server/ # Backend Express.js application
├── routes/ # API route handlers (e.g., eformsign.js)
├── server.js # Express server entry point and configuration
└── package.json # Backend dependencies and scripts

## 🛠️ Technology Stack

| Category     | Technology                                                      |
| :----------- | :-------------------------------------------------------------- |
| **Frontend** | React 19, Vite, React Router, TypeScript (Under work)           |
| **Backend**  | Node.js, Express.js                                             |
| **Styling**  | Emotion (CSS-in-JS)                                             |
| **State**    | Zustand                                                         |
| **API**      | eFormSign API, REST     