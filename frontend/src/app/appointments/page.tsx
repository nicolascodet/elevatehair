"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type AppointmentFormData = {
  client_name: string;
  email: string;
  phone: string;
  service_type: string;
  datetime: string;
  notes: string;
};

export default function AppointmentsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>();

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      await axios.post("http://localhost:8000/appointments", {
        ...data,
        datetime: new Date(data.datetime).toISOString(),
      });
      setSubmitSuccess(true);
      reset();
    } catch (error: any) {
      setSubmitError(error.response?.data?.detail || "Failed to book appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Book an Appointment</h1>
        <p className="text-gray-600">
          Request your preferred appointment time. We'll review your request and confirm
          via email once approved. For immediate assistance, please text us.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="client_name"
            {...register("client_name", { required: "Name is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.client_name && (
            <p className="mt-1 text-sm text-red-600">{errors.client_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", { required: "Phone number is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            id="service_type"
            {...register("service_type", { required: "Service type is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          >
            <option value="">Select a service</option>
            <option value="haircut">Haircut</option>
            <option value="color">Color</option>
            <option value="styling">Styling</option>
          </select>
          {errors.service_type && (
            <p className="mt-1 text-sm text-red-600">{errors.service_type.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="datetime" className="block text-sm font-medium text-gray-700">
            Preferred Date & Time
          </label>
          <input
            type="datetime-local"
            id="datetime"
            {...register("datetime", { required: "Date and time are required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
          {errors.datetime && (
            <p className="mt-1 text-sm text-red-600">{errors.datetime.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            placeholder="Any specific requests or additional information..."
          />
        </div>

        {submitError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}

        {submitSuccess && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-700">
              Your appointment request has been submitted! We'll review your request and send
              a confirmation email once approved. For immediate assistance, please text us.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-md font-medium hover:from-gray-900 hover:to-black transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting Request..." : "Request Appointment"}
        </button>
      </form>
    </div>
  );
} 