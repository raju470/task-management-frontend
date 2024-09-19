# Task Management Application - Frontend

This is the frontend of the Task Management Application, built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to manage tasks with features like user authentication, task creation, update, deletion,filter the task and mark complete to task.

## Features
- **User Registration and Login**: Register new users and login with credentials.
- **Task Management**: Create, update, delete, and toggle the status of tasks.
- **Responsive UI**: The application is fully responsive, ensuring a good user experience on mobile, tablet, and desktop devices.
- **API Communication**: Uses Axios to interact with the backend API for data fetching and CRUD operations.
- **Task Status**: Different icons and styles indicate task status (pending or completed).
  
## Technologies Used
- **React**: Frontend framework
- **Material-UI (MUI)**: UI components for building responsive designs
- **Axios**: Promise-based HTTP client for making API requests
- **React Router DOM**: For navigation between pages
- **JavaScript (ES6+)**
- **CSS (with MUI styling)**

## Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
- **Node.js**: v14 or higher
- **npm**: Comes with Node.js, used for installing dependencies
- **A running backend API**: The app assumes the backend API is running on `http://localhost:5000` or the URL specified in the environment variables.

### Installation
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-username/task-management-frontend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd task-management-frontend
    ```
3. Install the project dependencies:
    ```bash
    npm install
    ```

### Environment Variables
Create a `.env` file in the root of your project and add the following environment variables:

You can replace the URL with your backend's production URL if needed.

### Running the Application
To run the development server:
```bash
npm start
```

This will run the app in development mode. Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

Building for Production
To create a production build:
```bash
npm run build
```
This will bundle the application into static files for deployment.

Folder Structure
Here's an overview of the project structure:
```bash
├── public                  # Public files (HTML, favicon, etc.)
├── src                     # Source code for the frontend
│   ├── api.js              # API request definitions using Axios
│   ├── components          # Reusable React components
│   │   ├── AuthForm.js     # Form for login and registration
│   │   ├── TaskCard.js     # Component for displaying individual tasks
│   │   ├── Navbar.js       # Navigation bar component
│   │   └── TaskFormModal.js # Modal for creating/updating tasks
│   ├── constants           # Constant files (messages, status codes, etc.)
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point of the app
│   ├── styles              # Shared styles for the app
│   └── utils               # Utility functions (form validation, helpers, etc.)
└── .env                    # Environment variables
```
