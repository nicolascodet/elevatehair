"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

type Service = {
  name: string;
  duration_minutes: number;
  price: number;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/services");
        setServices(response.data);
      } catch (error) {
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We offer a range of professional hair services to help you look and feel your best.
          Each service is performed by our experienced stylists using premium products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{service.name}</h2>
              <div className="flex justify-between items-center text-gray-600 mb-4">
                <span className="text-lg">${service.price}</span>
                <span>{service.duration_minutes} minutes</span>
              </div>
              <div className="mt-6">
                <Link
                  href="/appointments"
                  className="block w-full text-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-md hover:from-gray-900 hover:to-black transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">
          Not sure which service is right for you? Contact us for a consultation.
        </p>
        <Link
          href="/appointments"
          className="inline-block bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-colors duration-200"
        >
          Schedule Consultation
        </Link>
      </div>
    </div>
  );
} 