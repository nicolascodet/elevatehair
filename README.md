# Elevate Hair Salon

A modern appointment scheduling system for Elevate Hair Salon built with FastAPI and Next.js.

## Features

- Online appointment booking system
- Admin dashboard for appointment management
- Service catalog
- Time slot conflict prevention
- Email validation
- Responsive design with metallic theme

## Tech Stack

### Backend
- FastAPI
- Python 3.11+
- Pydantic
- Uvicorn

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form

## Setup

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use: .\venv\Scripts\activate
pip install -r requirements.txt
cd app
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Running Both Services
```bash
chmod +x run.sh
./run.sh
```

## Development URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Deployment

### Backend Deployment
The backend can be deployed to any platform that supports Python/FastAPI applications:
- Heroku
- DigitalOcean
- AWS
- Google Cloud

### Frontend Deployment
The frontend is optimized for Vercel deployment:
1. Push to GitHub
2. Connect repository to Vercel
3. Vercel will automatically detect Next.js and deploy

## Environment Variables

### Backend (.env)
```
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=your_backend_url
```

## Admin Access
- URL: /admin
- Username: elevate
- Password: admin

## License
MIT 