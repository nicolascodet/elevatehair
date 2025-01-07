"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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

interface Service {
  name: string;
  duration: number;
  price: number;
}

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [_services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{appointment.client_name}</p>
                <p className="text-sm text-gray-600">{appointment.email}</p>
                <p className="text-sm text-gray-600">{appointment.phone}</p>
                <p className="text-sm text-gray-600">
                  Service: {appointment.service_type}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(appointment.datetime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {appointment.status}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(appointment.id.toString())}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(appointment.id.toString())}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 