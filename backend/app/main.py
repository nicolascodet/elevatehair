from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Elevate Salon API",
    description="API for managing salon appointments",
    version="1.0.0",
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Service(BaseModel):
    name: str
    duration_minutes: int
    price: float

class AppointmentBase(BaseModel):
    client_name: str
    email: EmailStr
    phone: str
    service_type: str
    datetime: datetime
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(AppointmentBase):
    pass

class AppointmentStatusUpdate(BaseModel):
    status: str

class Appointment(AppointmentBase):
    id: int
    created_at: datetime
    status: str = "pending"

# In-memory storage
appointments: List[Appointment] = []
services = [
    Service(name="Haircut", duration_minutes=60, price=50),
    Service(name="Color", duration_minutes=120, price=100),
    Service(name="Styling", duration_minutes=45, price=40),
]

# Helper function to check for time conflicts
def check_time_conflict(new_datetime: datetime, duration_minutes: int, exclude_id: Optional[int] = None) -> bool:
    new_end_time = new_datetime + timedelta(minutes=duration_minutes)
    
    for appointment in appointments:
        if exclude_id and appointment.id == exclude_id:
            continue
            
        if appointment.status != "approved":
            continue
            
        service = next((s for s in services if s.name.lower() == appointment.service_type.lower()), None)
        if not service:
            continue
            
        existing_end_time = appointment.datetime + timedelta(minutes=service.duration_minutes)
        
        if (new_datetime < existing_end_time and new_end_time > appointment.datetime):
            return True
            
    return False

# Endpoints
@app.get("/services", response_model=List[Service])
async def get_services():
    return services

@app.post("/appointments", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    # Validate service type
    service = next((s for s in services if s.name.lower() == appointment.service_type.lower()), None)
    if not service:
        raise HTTPException(status_code=400, detail="Invalid service type")
    
    # Check for time conflicts
    if check_time_conflict(appointment.datetime, service.duration_minutes):
        raise HTTPException(status_code=400, detail="Time slot already booked")
    
    # Create appointment
    new_appointment = Appointment(
        id=len(appointments) + 1,
        created_at=datetime.now(),
        **appointment.dict()
    )
    appointments.append(new_appointment)
    return new_appointment

@app.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    return appointments

@app.get("/appointments/{appointment_id}", response_model=Appointment)
async def get_appointment(appointment_id: int):
    appointment = next((a for a in appointments if a.id == appointment_id), None)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@app.put("/appointments/{appointment_id}", response_model=Appointment)
async def update_appointment(appointment_id: int, appointment_update: AppointmentUpdate):
    appointment = next((a for a in appointments if a.id == appointment_id), None)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Validate service type
    service = next((s for s in services if s.name.lower() == appointment_update.service_type.lower()), None)
    if not service:
        raise HTTPException(status_code=400, detail="Invalid service type")
    
    # Check for time conflicts
    if check_time_conflict(appointment_update.datetime, service.duration_minutes, appointment_id):
        raise HTTPException(status_code=400, detail="Time slot already booked")
    
    # Update appointment
    for key, value in appointment_update.dict().items():
        setattr(appointment, key, value)
    
    return appointment

@app.put("/appointments/{appointment_id}/status", response_model=Appointment)
async def update_appointment_status(appointment_id: int, status_update: AppointmentStatusUpdate):
    appointment = next((a for a in appointments if a.id == appointment_id), None)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if status_update.status not in ["pending", "approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    # If approving, check for conflicts
    if status_update.status == "approved":
        service = next((s for s in services if s.name.lower() == appointment.service_type.lower()), None)
        if service and check_time_conflict(appointment.datetime, service.duration_minutes, appointment_id):
            raise HTTPException(status_code=400, detail="Time slot already booked")
    
    appointment.status = status_update.status
    return appointment

@app.delete("/appointments/{appointment_id}")
async def delete_appointment(appointment_id: int):
    appointment = next((a for a in appointments if a.id == appointment_id), None)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    appointments.remove(appointment)
    return {"message": "Appointment deleted successfully"} 