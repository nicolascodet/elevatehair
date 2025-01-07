'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import * as Dialog from '@radix-ui/react-dialog'
import * as Label from '@radix-ui/react-label'
import * as Select from '@radix-ui/react-select'
import axios from 'axios'
import 'react-day-picker/dist/style.css'

// Form validation schema
const bookingSchema = z.object({
  client_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  service_type: z.string(),
  datetime: z.date(),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)
    try {
      const response = await axios.post('http://localhost:8000/appointments', {
        ...data,
        datetime: new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`),
      })
      setShowConfirmation(true)
      reset()
      setSelectedDate(undefined)
      setSelectedTime(undefined)
    } catch (error) {
      console.error('Booking failed:', error)
      // TODO: Add error toast notification
    }
    setIsSubmitting(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-elegant p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <Label.Root className="block text-sm font-medium text-text mb-1">
              Name
            </Label.Root>
            <input
              {...register('client_name')}
              className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your name"
            />
            {errors.client_name && (
              <p className="mt-1 text-sm text-red-600">{errors.client_name.message}</p>
            )}
          </div>

          <div>
            <Label.Root className="block text-sm font-medium text-text mb-1">
              Email
            </Label.Root>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label.Root className="block text-sm font-medium text-text mb-1">
              Phone
            </Label.Root>
            <input
              {...register('phone')}
              className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <Label.Root className="block text-sm font-medium text-text mb-1">
            Service
          </Label.Root>
          <Select.Root onValueChange={(value) => register('service_type').onChange({ target: { value } })}>
            <Select.Trigger className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent">
              <Select.Value placeholder="Select a service" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white rounded-md shadow-lg">
                <Select.Viewport>
                  <Select.Item value="haircut" className="px-3 py-2 hover:bg-background cursor-pointer">
                    <Select.ItemText>Haircut ($50)</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="color" className="px-3 py-2 hover:bg-background cursor-pointer">
                    <Select.ItemText>Color Treatment ($100)</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="styling" className="px-3 py-2 hover:bg-background cursor-pointer">
                    <Select.ItemText>Styling ($40)</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          {errors.service_type && (
            <p className="mt-1 text-sm text-red-600">{errors.service_type.message}</p>
          )}
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label.Root className="block text-sm font-medium text-text mb-1">
              Date
            </Label.Root>
            <div className="border border-primary rounded-md p-4">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  if (date) {
                    register('datetime').onChange({ target: { value: date } })
                  }
                }}
                className="mx-auto"
                disabled={{ before: new Date() }}
              />
            </div>
          </div>

          <div>
            <Label.Root className="block text-sm font-medium text-text mb-1">
              Time
            </Label.Root>
            <Select.Root onValueChange={setSelectedTime}>
              <Select.Trigger className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent">
                <Select.Value placeholder="Select a time" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white rounded-md shadow-lg">
                  <Select.Viewport>
                    {generateTimeSlots().map((time) => (
                      <Select.Item
                        key={time}
                        value={time}
                        className="px-3 py-2 hover:bg-background cursor-pointer"
                      >
                        <Select.ItemText>{time}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label.Root className="block text-sm font-medium text-text mb-1">
            Notes (Optional)
          </Label.Root>
          <textarea
            {...register('notes')}
            className="w-full px-3 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            rows={3}
            placeholder="Any special requests or notes?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !selectedDate || !selectedTime}
          className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-3 rounded-md shadow-elegant transition-all hover:shadow-elegant-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog.Root open={showConfirmation} onOpenChange={setShowConfirmation}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-elegant-lg w-full max-w-md animate-slide-up">
            <Dialog.Title className="text-xl font-semibold text-text mb-4">
              Booking Confirmed!
            </Dialog.Title>
            <Dialog.Description className="text-text-light mb-6">
              Your appointment has been successfully booked. We'll send you a confirmation email shortly.
            </Dialog.Description>
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-2 rounded-md shadow-elegant transition-all hover:shadow-elegant-lg"
            >
              Close
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

// Helper function to generate time slots
function generateTimeSlots() {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`)
    slots.push(`${hour.toString().padStart(2, '0')}:30`)
  }
  return slots
} 