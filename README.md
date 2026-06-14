# Event Registration Platform

## Project Overview

A full-stack Event Registration Platform built using React.js and Django REST Framework. The application allows users to register, login using JWT authentication, browse events, register for events, and view their registrations.

## Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT Authentication
* Protected Routes

### Event Management

* View All Events
* Event Details Page
* Event Registration
* Prevent Duplicate Registrations
* My Registrations Page

### UI Features

* Responsive Design
* Search Events
* Dashboard
* Loading Spinners
* Toast Notifications
* Form Validation
* Modern User Interface

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* React Toastify
* React Icons
* Bootstrap

### Backend

* Django
* Django REST Framework
* JWT Authentication (Simple JWT)

### Database

* SQLite

## API Endpoints

### Authentication

POST /api/register/

POST /api/login/

POST /api/token/refresh/

### Events

GET /api/events/

GET /api/events/:id/

POST /api/events/:id/register/

### Registrations

GET /api/my-registrations/

## Installation

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Database Setup

```bash
python manage.py makemigrations

python manage.py migrate
```

## Screenshots

Add screenshots of:

* Login Page
* Register Page
* Dashboard
* Event List
* Event Details
* My Registrations

## Future Improvements

* Pagination
* Dark Mode
* Event Categories
* Admin Event Management
* Email Notifications

## Author

Angitha KP
