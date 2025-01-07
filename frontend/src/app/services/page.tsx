"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Service {
  name: string;
  duration: number;
  price: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services`);
        setServices(response.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
          Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">{service.name}</h2>
              <div className="space-y-2">
                <p className="text-gray-300 flex justify-between items-center">
                  <span>Duration:</span>
                  <span className="font-semibold">{service.duration} min</span>
                </p>
                <p className="text-gray-300 flex justify-between items-center">
                  <span>Price:</span>
                  <span className="font-semibold text-xl">${service.price}</span>
                </p>
              </div>
              <button 
                onClick={() => window.location.href = '/appointments'}
                className="w-full mt-6 bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 