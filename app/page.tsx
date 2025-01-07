import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative -mt-8">
        <div className="bg-gradient-metallic py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
              Experience Elegance at Elevate
            </h1>
            <p className="text-xl text-text-light mb-8">
              Where style meets sophistication. Book your transformation today.
            </p>
            <Link 
              href="/appointments"
              className="inline-block bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3 rounded-md shadow-elegant transition-all hover:shadow-elegant-lg"
            >
              Book Your Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-text text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.name}
              className="bg-white p-6 rounded-lg shadow-elegant hover:shadow-elegant-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-text mb-2">
                {service.name}
              </h3>
              <p className="text-text-light mb-4">
                {service.description}
              </p>
              <p className="text-accent font-semibold">
                From ${service.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-accent py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for a New Look?
          </h2>
          <p className="text-white/90 mb-8">
            Join us at Elevate Hair Salon and let our expert stylists transform your look.
          </p>
          <Link 
            href="/appointments"
            className="inline-block bg-white text-accent hover:bg-background font-semibold px-8 py-3 rounded-md shadow-elegant transition-all hover:shadow-elegant-lg"
          >
            Schedule Now
          </Link>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    name: "Signature Haircut",
    description: "Expert cutting and styling tailored to your unique features and preferences.",
    price: 50
  },
  {
    name: "Color Treatment",
    description: "From subtle highlights to bold transformations, achieve your perfect shade.",
    price: 100
  },
  {
    name: "Styling Session",
    description: "Professional styling for any occasion, from casual to formal events.",
    price: 40
  }
] 