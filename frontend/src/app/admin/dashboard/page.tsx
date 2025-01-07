"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Appointment {
  id: number;
  client_name: string;
  email: string;
  phone: string;
  service_type: string;
  datetime: string;
  status: string;
}

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`);
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await axios.put(`${API_URL}/appointments/${id}`, { status: 'approved' });
      fetchAppointments();
    } catch (err) {
      console.error('Error approving appointment:', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.put(`${API_URL}/appointments/${id}`, { status: 'rejected' });
      fetchAppointments();
    } catch (err) {
      console.error('Error rejecting appointment:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-100">Appointments</h2>
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No appointments found</p>
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-gray-700 rounded-lg p-4 sm:flex justify-between items-start space-y-4 sm:space-y-0"
                >
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-100">{appointment.client_name}</p>
                    <p className="text-sm text-gray-300">{appointment.email}</p>
                    <p className="text-sm text-gray-300">{appointment.phone}</p>
                    <p className="text-sm text-gray-300">
                      Service: {appointment.service_type}
                    </p>
                    <p className="text-sm text-gray-300">
                      Date: {new Date(appointment.datetime).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'approved' 
                          ? 'bg-green-900 text-green-100' 
                          : appointment.status === 'rejected'
                          ? 'bg-red-900 text-red-100'
                          : 'bg-yellow-900 text-yellow-100'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleApprove(appointment.id.toString())}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(appointment.id.toString())}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 