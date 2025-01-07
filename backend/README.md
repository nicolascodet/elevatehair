# Elevate Salon API

FastAPI backend for the Elevate Salon appointment scheduling system.

## Features

- Appointment management (CRUD operations)
- Service catalog
- Time slot conflict prevention
- Email validation
- Swagger documentation

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
cd app
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

- `GET /services` - List all available services
- `GET /appointments` - List all appointments
- `POST /appointments` - Create a new appointment
- `GET /appointments/{id}` - Get appointment details
- `PUT /appointments/{id}` - Update an appointment
- `DELETE /appointments/{id}` - Delete an appointment 