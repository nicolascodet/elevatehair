#!/bin/bash

# Kill background processes on exit
trap 'kill $(jobs -p)' EXIT

# Start backend server
cd backend
source venv/bin/activate
cd app
uvicorn main:app --reload &

# Wait a bit for backend to start
sleep 2

# Start frontend server
cd ../../frontend
npm run dev &

# Wait for both processes
wait 