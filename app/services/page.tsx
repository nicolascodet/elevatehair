import Link from 'next/link'

const services = [
  {
    name: "Signature Haircut",
    description: "Expert cutting and styling tailored to your unique features and preferences. Our experienced stylists will work with you to create the perfect look.",
    price: 50,
    duration: 60,
    features: [
      "Consultation",
      "Shampoo and conditioning",
      "Precision cut",
      "Styling",
      "Product recommendations"
    ]
  },
  {
    name: "Color Treatment",
    description: "From subtle highlights to bold transformations, achieve your perfect shade with our professional color services.",
    price: 100,
    duration: 120,
    features: [
      "Color consultation",
      "Custom color mixing",
      "Professional application",
      "Processing time",
      "Toner (if needed)",
      "Style finish"
    ]
  },
  {
    name: "Styling Session",
    description: "Professional styling for any occasion, from casual elegance to formal events. Let us create the perfect look for your special moment.",
    price: 40,
    duration: 45,
    features: [
      "Style consultation",
      "Shampoo and conditioning",
      "Professional styling",
      "Long-lasting hold",
      "Event-ready finish"
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text mb-4">Our Services</h1>
        <p className="text-text-light text-lg max-w-2xl mx-auto">
          Experience the perfect blend of expertise and elegance with our comprehensive range of hair services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white rounded-lg shadow-elegant hover:shadow-elegant-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-text mb-2">{service.name}</h2>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-accent">${service.price}</span>
                <span className="text-text-light ml-2">/ {service.duration} min</span>
              </div>
              <p className="text-text-light mb-6">{service.description}</p>
              
              <div className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-text-light">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/appointments?service=${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block w-full bg-accent hover:bg-accent-light text-white text-center font-semibold py-3 rounded-md shadow-elegant transition-all hover:shadow-elegant-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-text-light mb-6">
          Not sure which service is right for you? We're here to help!
        </p>
        <Link
          href="/appointments"
          className="inline-block bg-primary hover:bg-primary-light text-text font-semibold px-8 py-3 rounded-md shadow-elegant transition-all hover:shadow-elegant-lg"
        >
          Schedule a Consultation
        </Link>
      </div>
    </div>
  )
} 