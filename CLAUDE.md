# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MERNnote is a full-stack notes application built with the MERN stack (MongoDB, Express, React, Node.js). It features user authentication via SuperTokens, rate limiting with Upstash Redis, and supports both email/password and OAuth (Google, GitHub) authentication.

## Architecture

### Backend (`/backend`)
- **Entry Point**: `src/server.js` - Express server with SuperTokens middleware
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: SuperTokens with email/password and OAuth providers
- **Rate Limiting**: Upstash Redis for API rate limiting
- **Models**: `models/Note.js` - Mongoose schema for notes with user association
- **Controllers**: `src/controllers/notesController.js` - CRUD operations for notes
- **Routes**: `src/routes/notesRoutes.js` - Express routes for notes API
- **Config**: 
  - `config/db.js` - MongoDB connection
  - `config/supertokens.js` - Authentication configuration
  - `config/upstash.js` - Redis rate limiting setup

### Frontend (`/frontend`)
- **Framework**: React with Vite build tool
- **Routing**: React Router for SPA navigation
- **Styling**: Tailwind CSS with DaisyUI components
- **Authentication**: SuperTokens React integration
- **HTTP Client**: Axios with automatic session handling
- **Components**: 
  - `components/AuthUI.jsx` - Authentication interface
  - `components/NavBar.jsx` - Navigation component
  - `components/NoteCard.jsx` - Note display component
- **Pages**:
  - `pages/HomePage.jsx` - Notes listing
  - `pages/CreatePage.jsx` - Note creation
  - `pages/NoteEditorPage.jsx` - Note editing

## Common Development Commands

### Root Level Commands
```bash
# Install all dependencies (both frontend and backend)
npm run install-all

# Build entire application for production
npm run build

# Start production server
npm start

# Development mode (runs both frontend and backend)  
npm run dev
```

### Backend Commands (`/backend`)
```bash
# Development with hot reload
npm run dev

# Production server
npm start
```

### Frontend Commands (`/frontend`)
```bash
# Development server (Vite)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Environment Configuration

### Backend Environment Variables (.env in /backend)
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5001)
- `UPSTASH_REDIS_REST_URL` - Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - Redis authentication token
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - GitHub OAuth
- `SUPERTOKENS_CONNECTION_URI` - SuperTokens service URL
- `SUPERTOKENS_API_KEY` - SuperTokens API key
- `API_DOMAIN` - Backend domain (dev: http://localhost:5001)
- `WEBSITE_DOMAIN` - Frontend domain (dev: http://localhost:5173)
- `NODE_ENV` - Environment (development/production)

### Frontend Environment Variables
- `VITE_API_DOMAIN` - Backend API URL
- `VITE_WEBSITE_DOMAIN` - Frontend URL

## Key Technical Details

### Authentication Flow
- SuperTokens handles both email/password and OAuth authentication
- Sessions are managed with HTTP-only cookies
- Protected routes use `SessionAuth` wrapper component
- Axios interceptor automatically redirects to `/auth` on 401 responses

### Database Schema
- Notes are associated with users via `userId` field
- All note operations are scoped to the authenticated user
- MongoDB indexes on `userId` for performance

### API Structure
- All note endpoints under `/api/notes`
- CRUD operations: GET, POST, PUT, DELETE
- User isolation enforced at controller level using session `userId`

### Development Workflow
1. Start development: `npm run dev` from root
2. Backend runs on port 5001, frontend on 5173
3. Vite proxy handles API requests in development
4. Hot reload enabled for both frontend and backend

### Production Deployment
- Backend serves static frontend files from `/frontend/dist`
- All routes fallback to `index.html` for SPA routing
- CORS configured differently for production vs development