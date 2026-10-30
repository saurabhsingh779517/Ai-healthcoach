# Ai-healthcoach
AI - powered health coach application with personalized health guidance


An AI-powered health and wellness application designed to help users track their health information, monitor daily activities, and work toward their fitness goals.

## About the Project

AI Health Coach is a college mini project built to explore full-stack web development, user authentication, health calculations, and personalized health tracking.

## Tech Stack

### Frontend
- React
- JavaScript
- HTML and CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Other Technologies
- JWT for authentication (if implemented)
- Nodemailer for email verification (if implemented)

## Features

### Authentication
- [ ] User registration
- [ ] User login
- [ ] Password hashing
- [ ] JWT-based authentication
- [ ] Email verification
- [ ] Resend verification email
- [ ] Protected dashboard

### Health Management
- [ ] Health profile
- [ ] BMI calculation
- [ ] BMR and TDEE calculation
- [ ] Daily health logs
- [ ] Progress tracking

### AI Health Features
- [ ] AI-powered health guidance
- [ ] Personalized recommendations

> Update the checkboxes only after verifying the corresponding features.

## Project Structure

    Ai health coach/
    ├── client/
    ├── server/
    ├── README.md
    └── .gitignore

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB

### Backend Setup

    cd server
    npm install

Create a `.env` file using the environment variables required by the backend.

Start the backend using the script configured in `server/package.json`.

### Frontend Setup

Open another terminal:

    cd client/aihealthcoach client
    npm install
    npm run dev

Follow the local URL displayed by Vite.

## Environment Variables

Document the required variable names without publishing their secret values.

Example:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `EMAIL_USER`
- `EMAIL_PASS`

The actual variable names must match your code.

## API Documentation

Document API endpoints, request bodies, authentication requirements, and example responses here or in a separate API documentation file.

## Current Development Status

Update this section as the project progresses.

- Completed:
- In progress:
- Pending:

## Future Improvements

- Improve application security.
- Add health progress visualizations.
- Implement personalized health recommendations.
- Improve automated testing.

## Author

Saurabh Singh

College Mini Project — AI Health Coach
