# Notes Transformer - Presentation Builder

A fullstack application to create and manage presentations from notes. This app solves the problem of organizing scattered notes into structured, professional presentations with multiple content types and themes.

## Features
- Create, read, update, delete presentations
- User management
- Slide management per presentation
- Search and sort presentations
- Auto-refresh data
- Responsive UI with loading and error states

## Tech Stack
- Frontend: React with Vite
- Backend: Express.js
- Database: MongoDB Atlas
- Deployment: Ready for cloud deployment

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repo-url>
   cd notes-transformer
   ```

2. Install dependencies:
   ```
   npm run install-client
   npm run install-server
   ```

3. Set up environment variables:
   - Copy `.env` and update `MONGODB_URI` with your MongoDB Atlas connection string
   - Ensure no hardcoded credentials

4. Seed the database:
   ```
   cd server
   npm run seed
   cd ..
   ```

5. Start the application:
   ```
   npm run dev
   ```
   This will start both frontend (http://localhost:5173) and backend (http://localhost:5000) concurrently.

## API Endpoints
- GET /api/presentations - Get all presentations
- POST /api/presentations - Create presentation
- PUT /api/presentations/:id - Update presentation
- DELETE /api/presentations/:id - Delete presentation
- GET /api/slides/presentation/:presentationId - Get slides for presentation
- GET /api/presentations/stats/total-slides - Get total slides count

## Database Schema
- Users: name, email
- Presentations: title, description, userId, theme
- Slides: presentationId, title, content, contentType, order

Relationships: Presentation.userId -> User._id, Slide.presentationId -> Presentation._id