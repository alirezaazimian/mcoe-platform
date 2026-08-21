# MCOE Platform

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)
![Django](https://img.shields.io/badge/Backend-Django-092E20?logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/API-Django_REST_Framework-A30000)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![License](https://img.shields.io/badge/Status-Active_Development-orange)

A full-stack educational website and content management platform built with **React, Vite, Django, and Django REST Framework**.

MCOE Platform provides a modern public-facing educational website backed by an independent REST API, authentication system, content management backend, and administrative infrastructure.

The project originally started with a Base44-generated frontend and has since been migrated to an independent architecture. Base44 runtime dependencies, authentication, hosted entities, media references, and build plugins have been removed.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running the Project](#running-the-project)
- [Build and Validation](#build-and-validation)
- [Migration Status](#migration-status)
- [Development Roadmap](#development-roadmap)
- [Security Notes](#security-notes)

---

## Overview

MCOE Platform is an educational web platform designed to combine a modern public website with a maintainable backend architecture.

The frontend is implemented with **React and Vite**, while application data, authentication, content management, and file uploads are handled through a **Django REST Framework API**.

The migration strategy intentionally preserved the original frontend design and user experience while progressively replacing platform-specific services with independently managed infrastructure.

### Current architecture

```text
┌─────────────────────────────┐
│        React + Vite         │
│          Frontend           │
└──────────────┬──────────────┘
               │
               │ REST / JSON
               │ JWT
               ▼
┌─────────────────────────────┐
│ Django REST Framework API   │
│                             │
│  • Authentication           │
│  • Content APIs             │
│  • File Uploads             │
│  • Permissions              │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│           Django            │
│                             │
│       Django Admin          │
│       Application Logic     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         Database            │
│                             │
│ SQLite      Development     │
│ PostgreSQL  Production Plan │
└─────────────────────────────┘
```

---

## Architecture

The project is separated into two main applications:

```text
React / Vite Frontend
        │
        │ HTTP
        ▼
Django REST API
        │
        ├── Content Management
        ├── JWT Authentication
        ├── Password Reset
        ├── File Uploads
        └── Django Admin
```

The frontend communicates with Django exclusively through REST APIs.

This separation makes it possible to independently deploy, scale, test, and maintain the frontend and backend.

---

## Technology Stack

### Frontend

- React
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Radix UI
- Lucide Icons
- JavaScript

### Backend

- Python
- Django 5
- Django REST Framework
- Simple JWT
- Django Admin
- django-cors-headers
- python-dotenv

### Authentication

- JWT Access Tokens
- JWT Refresh Tokens
- Refresh Token Rotation
- Refresh Token Blacklisting
- Django Password Validation
- Django Password Reset Tokens

### Database

Current development database:

```text
SQLite
```

Production target:

```text
PostgreSQL
```

---

## Features

### Public Website

The frontend currently includes:

- Home
- About
- Complex History
- Educational Space
- Education Levels
- Working Groups
- Working Group Details
- Student Associations
- Articles
- Article Details
- News
- News Details
- Events
- Event Details
- Collaboration Requests
- Search
- Authentication Pages

### Content Management

The Django backend currently manages:

- Working Groups
- Working Group Members
- News
- Articles
- Events
- Hero Slides
- Collaboration Requests

### Media

Application media previously hosted by the original platform has been localized and is now served independently.

Uploaded backend media is handled through Django.

---

## Authentication

Authentication is handled entirely by Django.

The previous platform authentication layer has been removed.

Implemented authentication features include:

- User Registration
- Email / Password Login
- JWT Access Tokens
- JWT Refresh Tokens
- Automatic Access Token Refresh
- Current User Endpoint
- Logout
- Refresh Token Blacklisting
- Password Reset Request
- Secure Password Reset Confirmation

### Authentication flow

```text
User Login
    │
    ▼
Django Authentication
    │
    ▼
Access Token + Refresh Token
    │
    ▼
React Auth Context
    │
    ├── Authenticated Requests
    │
    └── Automatic Token Refresh
```

---

## Project Structure

```text
mcoe-platform/
│
├── backend/
│   ├── accounts/
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── content/
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── media/
│   ├── manage.py
│   └── requirements.txt
│
├── public/
│   └── media/
│       └── site/
│
├── src/
│   ├── api/
│   │   ├── authApi.js
│   │   └── djangoApi.js
│   │
│   ├── components/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.local
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

> Some generated or environment-specific files are intentionally excluded from version control.

---

# Local Development

## Prerequisites

Make sure the following are installed:

```text
Python 3
Node.js
npm
Git
```

Recommended:

```text
Python 3.12+
Node.js 20+
```

Clone the repository:

```bash
git clone git@github.com:alirezaazimian/mcoe-platform.git
```

Enter the project:

```bash
cd mcoe-platform
```

---

# Backend Setup

Move to the Django backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate it on Linux or macOS:

```bash
source .venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Create an administrator account:

```bash
python manage.py createsuperuser
```

Run Django:

```bash
python manage.py runserver
```

The backend will be available at:

```text
http://127.0.0.1:8000/
```

API:

```text
http://127.0.0.1:8000/api/
```

Django Admin:

```text
http://127.0.0.1:8000/admin/
```

---

# Frontend Setup

Open another terminal and return to the project root:

```bash
cd mcoe-platform
```

Install frontend dependencies:

```bash
npm install
```

For reproducible dependency installation from the lock file:

```bash
npm ci
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173/
```

---

# Environment Variables

## Frontend

Create:

```text
.env.local
```

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## Backend

Create:

```text
backend/.env
```

At minimum, production deployments should provide a Django secret key.

Example:

```env
SECRET_KEY=replace-with-a-secure-secret-key
```

Development password-reset emails currently support Django's console email backend.

Example:

```env
FRONTEND_URL=http://localhost:5173
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@mcoe.ir
```

> Never commit production secrets or credentials to Git.

---

# API Endpoints

Base API URL:

```text
http://127.0.0.1:8000/api/
```

## Authentication

### Register

```http
POST /api/auth/register/
```

### Login

```http
POST /api/auth/login/
```

### Refresh Access Token

```http
POST /api/auth/refresh/
```

### Current User

```http
GET /api/auth/me/
```

### Logout

```http
POST /api/auth/logout/
```

### Request Password Reset

```http
POST /api/auth/password-reset/
```

### Confirm Password Reset

```http
POST /api/auth/password-reset/confirm/
```

---

## Content APIs

Available Django-backed resources include:

```text
Working Groups
Working Group Members
News
Articles
Events
Hero Slides
Collaboration Requests
```

The frontend API abstraction is located in:

```text
src/api/djangoApi.js
```

Authentication requests are handled separately in:

```text
src/api/authApi.js
```

---

# Running the Project

The application requires two development processes.

## Terminal 1 — Django

```bash
cd backend
source .venv/bin/activate
python manage.py runserver
```

## Terminal 2 — React

```bash
npm run dev
```

Then open:

```text
http://localhost:5173/
```

---

# Build and Validation

Create a production frontend build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run frontend linting:

```bash
npm run lint
```

Run Django system checks:

```bash
cd backend
source .venv/bin/activate
python manage.py check
```

Check pending Django migrations:

```bash
python manage.py makemigrations --check
```

---

# Migration Status

The project was incrementally migrated away from its original platform architecture.

## Completed

| Component | Status |
|---|---|
| Working Groups | ✅ Migrated |
| Working Group Members | ✅ Migrated |
| News | ✅ Migrated |
| Articles | ✅ Migrated |
| Events | ✅ Migrated |
| Hero Slides | ✅ Migrated |
| Collaboration Requests | ✅ Migrated |
| File Uploads | ✅ Migrated |
| Authentication | ✅ Migrated |
| Password Reset | ✅ Migrated |
| Hosted Media | ✅ Localized |
| Frontend Build System | ✅ Independent |
| Platform SDK | ✅ Removed |
| Platform Vite Plugin | ✅ Removed |

The React application can now build independently without the original platform SDK or build plugin.

---

# Development Roadmap

Planned development includes:

### Backend

- PostgreSQL production database
- Extended permissions and roles
- Student management
- Teacher management
- Online class management
- Site settings
- Media management
- Email infrastructure
- Production deployment configuration

### Authentication

Planned authentication improvements:

- Role-based access control
- Student and teacher roles
- Email verification
- Production email delivery
- Authentication security hardening

### Administration

A dedicated React administration dashboard is planned for application-specific workflows.

Django Admin will remain available for technical administration and backend management.

### Infrastructure

Production infrastructure will eventually include:

```text
React Production Build
        │
        ▼
Reverse Proxy
        │
        ├── Static Frontend
        │
        └── Django API
                │
                ▼
             Gunicorn
                │
                ▼
           PostgreSQL
```

---

# Security Notes

The application currently uses JWT authentication.

Development tokens are currently handled client-side as part of the migration architecture.

Before production deployment, authentication storage and cookie strategy should be reviewed and hardened where appropriate.

Other production requirements include:

- Secure Django `SECRET_KEY`
- `DEBUG=False`
- Restricted `ALLOWED_HOSTS`
- Restricted CORS origins
- HTTPS
- Secure email configuration
- PostgreSQL credentials through environment variables
- Regular dependency auditing
- Production media and static file configuration

---

# Development Philosophy

The project follows an incremental migration strategy.

Instead of rewriting the original frontend from scratch, each platform-specific dependency was progressively replaced while preserving the existing UI and application behavior.

The migration included:

```text
Hosted Entities
      ↓
Django Models + REST APIs

Platform Authentication
      ↓
Django + JWT

Hosted Media
      ↓
Local / Django-managed Media

Platform Build Plugin
      ↓
Standard Vite Configuration

Platform SDK
      ↓
Independent API Layer
```

This approach minimizes unnecessary frontend rewrites while moving the application toward a maintainable and independently deployable architecture.

---

## Repository Status

The project is under active development.

Current focus:

```text
Architecture Cleanup
        ↓
Authentication Hardening
        ↓
Role & Permission System
        ↓
PostgreSQL
        ↓
Administration Dashboard
        ↓
Production Deployment
```