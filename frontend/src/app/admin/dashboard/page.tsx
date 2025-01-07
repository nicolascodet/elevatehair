"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Appointment = {
  id: number;
  client_name: string;
  email: string;
  phone: string;
  service_type: string;
  datetime: string;
  notes: string;
  status: "pending" | "approved" | "rejected";
};

type Service = {
  name: string;
  duration_minutes: number;
  price: number;
};

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      router.push("/admin");
      return;
    }

    // Fetch appointments and services
    const fetchData = async () => {
      try {
        const [appointmentsRes, servicesRes] = await Promise.all([
          axios.get("http://localhost:8000/appointments"),
          axios.get("http://localhost:8000/services"),
        ]);
        setAppointments(appointmentsRes.data);
        setServices(servicesRes.data);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleAppointmentAction = async (id: number, action: "approve" | "reject") => {
    try {
      await axios.put(`http://localhost:8000/appointments/${id}/status`, { status: action });
      // Refresh appointments after action
      const response = await axios.get("http://localhost:8000/appointments");
      setAppointments(response.data);
    } catch (error) {
      setError("Failed to update appointment status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pending Appointments</h2>
        <div className="space-y-4">
          {appointments
            .filter((apt) => apt.status === "pending")
            .map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {appointment.client_name} - {appointment.service_type}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(appointment.datetime).toLocaleString()}
                  </p>
                  <p className="text-gray-600">{appointment.email}</p>
                  <p className="text-gray-600">{appointment.phone}</p>
                  {appointment.notes && (
                    <p className="text-gray-600 mt-2">Notes: {appointment.notes}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAppointmentAction(appointment.id, "approve")}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAppointmentAction(appointment.id, "reject")}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          {appointments.filter((apt) => apt.status === "pending").length === 0 && (
            <p className="text-gray-600 text-center py-4">No pending appointments</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`border rounded-lg p-4 ${
                appointment.status === "approved"
                  ? "bg-green-50"
                  : appointment.status === "rejected"
                  ? "bg-red-50"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {appointment.client_name} - {appointment.service_type}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(appointment.datetime).toLocaleString()}
                  </p>
                  <p className="text-gray-600">{appointment.email}</p>
                  <p className="text-gray-600">{appointment.phone}</p>
                  {appointment.notes && (
                    <p className="text-gray-600 mt-2">Notes: {appointment.notes}</p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
          {appointments.length === 0 && (
            <p className="text-gray-600 text-center py-4">No appointments</p>
          )}
        </div>
      </div>
    </div>
  );
} 