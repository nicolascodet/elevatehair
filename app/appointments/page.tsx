import dynamic from 'next/dynamic'

const BookingForm = dynamic(() => import('./booking-form'), {
  ssr: false,
})

export default function AppointmentsPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-text mb-8">Book Your Appointment</h1>
      <BookingForm />
    </div>
  )
} 