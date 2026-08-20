# MCOE Educational Platform

A full-stack educational website and content management platform built with React, Vite, Django, and Django REST Framework.

The project originally started with a Base44-generated frontend and is currently being migrated to an independent architecture with a custom Django backend and REST API.

The main goal is to preserve the existing frontend design and user experience while gradually removing the application's dependency on Base44.

---

## Overview

MCOE is an educational platform that combines a modern public-facing website with a Django-based backend for content management and future administrative workflows.

The project is being migrated incrementally instead of being rewritten from scratch.

Each Base44 entity is being replaced with a Django model and REST API while keeping the React frontend structure and visual design intact.

---

## Current Migration Status

### Migrated to Django

- Working Groups
- Working Group Members
- News
- Articles
- Events
- Hero Slides

### Planned

- Partners
- Collaboration Requests
- Site Content and Settings
- Media Management
- Custom Administration Dashboard
- Authentication and Permissions
- Student Management
- Teacher Management
- Online Classes
- PostgreSQL Production Database
- Production Deployment

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- React Markdown

### Backend

- Python
- Django
- Django REST Framework
- Django Admin
- django-cors-headers
- Pillow

### Database

Current local development:

- SQLite

Planned production environment:

- PostgreSQL

---

## Architecture

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      MCOE Web       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │       Django        │
                    │ Django REST Framework
                    │    Django Admin     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Database       │
                    │ SQLite / PostgreSQL │
                    └─────────────────────┘

A separate React administration dashboard is planned to communicate with the same Django backend.


Current REST API

/api/working-groups/
/api/working-group-members/
/api/news/
/api/articles/
/api/events/
/api/hero-slides/

Public content is exposed through read-only REST endpoints.

Administrative create, update, and delete operations are currently handled through Django Admin.

A custom React administration dashboard will later use authenticated management endpoints.

Project Structure

mcoe/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   └── main.jsx
│
├── backend/
│   ├── config/
│   ├── content/
│   ├── manage.py
│   └── requirements.txt
│
├── public/
│
├── package.json
├── vite.config.js
└── README.md

Local Development
1. Clone the repository
git clone https://github.com/alirezaazimian/mcoe-platform.git
cd mcoe-platform
Frontend Setup

Install frontend dependencies:

npm install

Create a file named:

.env.local

in the project root.

Add:

VITE_API_BASE_URL=http://127.0.0.1:8000/api

Run the frontend:

npm run dev

The Vite development server will normally be available at:

http://localhost:5173/
Backend Setup

Move to the backend directory:

cd backend

Create a Python virtual environment:

python3 -m venv .venv

Activate it:

source .venv/bin/activate

Install backend dependencies:

pip install -r requirements.txt

Create:

backend/.env

and define the Django secret key:

DJANGO_SECRET_KEY=your-development-secret-key

Apply database migrations:

python manage.py migrate

Run Django:

python manage.py runserver

The backend API will be available at:

http://127.0.0.1:8000/api/

Django Admin will be available at:

http://127.0.0.1:8000/admin/
Creating a Django Admin User

Create a local administrator account with:

cd backend
source .venv/bin/activate
python manage.py createsuperuser

Then log in at:

http://127.0.0.1:8000/admin/
Production Build

Run frontend lint checks:

npm run lint

Create the production frontend build:

npm run build

The production output is generated in:

dist/
Development Workflow

The project is being migrated away from Base44 incrementally.

For each feature, the migration process follows this structure:

Existing React UI
        ↓
Identify Base44 dependency
        ↓
Create Django model
        ↓
Create database migration
        ↓
Create serializer
        ↓
Create REST API
        ↓
Connect React to Django
        ↓
Remove Base44 entity dependency
        ↓
Run lint and build checks
        ↓
Commit and push

This approach preserves the existing frontend while replacing the backend layer feature by feature.

Current Migration Progress
Working Groups          ✅ Django
Working Group Members   ✅ Django
News                    ✅ Django
Articles                ✅ Django
Events                  ✅ Django
Hero Slides             ✅ Django


Partners                ⏳ Planned
Collaboration Requests  ⏳ Planned
Site Content            ⏳ Planned
Admin Dashboard         ⏳ Planned
Authentication          ⏳ Planned
PostgreSQL              ⏳ Planned
Production Deployment   ⏳ Planned
Base44 Migration Strategy

The original frontend was generated using Base44.

The project is not being rewritten from scratch.

Instead, existing UI components are preserved while Base44 data access is gradually replaced.

For example:

base44.entities.News.list()

is replaced with:

djangoApi.news.list()

and:

base44.entities.Event.filter(...)

is replaced with:

djangoApi.events.list(...)

This allows the visual design to remain stable while the backend becomes independent.

Backend Content Models

The current Django backend includes models for:

Working Groups
Working Group Members
News
Articles
Events
Hero Slides

Additional models will be introduced as the migration continues.

Media Handling

Uploaded images are managed through Django media storage.

During local development:

backend/media/

is used for uploaded files.

Media files are intentionally excluded from Git version control.

Production media storage will be configured separately during deployment.

Security

Sensitive development files are excluded from version control.

Examples include:

.env
.env.local
backend/.env
backend/.venv/
backend/db.sqlite3
backend/media/
node_modules/
dist/

Django's secret key is loaded from an environment variable:

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]

Secrets must never be committed directly to the repository.

Git Workflow

Development is committed incrementally so the repository reflects the real evolution of the platform.

Typical workflow:

git status
git add .
git commit -m "feat: describe the completed feature"
git push

Examples of project commits include:

feat: migrate working groups from Base44 to Django API
feat: migrate news from Base44 to Django API
feat: migrate articles from Base44 to Django API
feat: add events model and REST API
feat: migrate events from Base44 to Django API
feat: migrate hero slides from Base44 to Django API
security: move Django secret key to environment
Roadmap

The planned architecture is:

Base44-generated React Frontend
              ↓
Django REST Backend
              ↓
Content Migration
              ↓
Custom React Admin Dashboard
              ↓
Authentication and Permissions
              ↓
Student and Teacher Management
              ↓
Online Classes
              ↓
PostgreSQL
              ↓
Production Deployment
Planned Administration Dashboard

A separate React administration dashboard is planned.

The architecture will use the same Django backend:

                    ┌───────────────────┐
                    │   Public Website  │
                    │       React       │
                    └─────────┬─────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │     Django      │
                     │    REST API     │
                     │ Authentication  │
                     └────────┬────────┘
                              ▲
                              │
                    ┌─────────┴─────────┐
                    │ Admin Dashboard   │
                    │       React       │
                    └───────────────────┘

The administration dashboard is planned to support:

News management
Article management
Event management
Working group management
Hero slide management
Student management
Teacher management
Online classes
Site content management
Media management
Authentication
Role-based permissions
Future Production Architecture

The planned production stack includes:

React / Vite
      ↓
Django REST Framework
      ↓
PostgreSQL
      ↓
Production Web Server

Additional production configuration will include:

Environment-based Django settings
Production CORS configuration
Static file handling
Media storage
HTTPS
Production database configuration
Error logging
Backup strategy
Project Goals

The main goals of the MCOE platform are:

Maintain a modern bilingual educational website
Centralize content management
Remove dependency on third-party application builders
Provide a custom administrative interface
Support future student and teacher workflows
Maintain a clean REST API architecture
Support independent deployment and infrastructure
Preserve a clear Git development history
Development Status

This project is actively under development.

The current focus is the migration of the existing Base44 data layer to Django REST Framework while preserving the existing React frontend.

License

This project is currently maintained as an educational platform project.

Licensing terms may be defined later.