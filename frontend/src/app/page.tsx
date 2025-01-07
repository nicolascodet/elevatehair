import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] -mt-8 mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/salon-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Elevate Your Style
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Experience luxury hair care in the heart of San Francisco.
              Our expert stylists are dedicated to helping you look and feel your best.
            </p>
            <Link
              href="/appointments"
              className="inline-block bg-gradient-to-r from-gray-100 to-white text-gray-900 px-8 py-3 rounded-md text-lg font-medium hover:from-white hover:to-gray-100 transition-all duration-200 shadow-lg"
            >
              Book Your Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From classic cuts to modern styles, our experienced stylists deliver exceptional results
            tailored to your unique preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Haircut</h3>
              <p className="text-gray-600 mb-4">
                Precision cuts tailored to your face shape and style preferences.
              </p>
              <div className="flex justify-between items-center text-gray-800">
                <span className="text-lg font-medium">$50</span>
                <span>60 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Color</h3>
              <p className="text-gray-600 mb-4">
                Full color, highlights, or balayage using premium products.
              </p>
              <div className="flex justify-between items-center text-gray-800">
                <span className="text-lg font-medium">$100</span>
                <span>120 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Styling</h3>
              <p className="text-gray-600 mb-4">
                Special occasion styling, blowouts, and updos.
              </p>
              <div className="flex justify-between items-center text-gray-800">
                <span className="text-lg font-medium">$40</span>
                <span>45 minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-md hover:from-gray-900 hover:to-black transition-all duration-200"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 rounded-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Why Choose Elevate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Stylists</h3>
              <p className="text-gray-600">
                Our team of experienced professionals stays up-to-date with the latest trends.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Products</h3>
              <p className="text-gray-600">
                We use only the highest quality products for the best results.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority. We ensure you love your new look.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Ready to Transform Your Look?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Book your appointment today and experience the Elevate difference.
          Our team is ready to help you achieve your perfect style.
        </p>
        <Link
          href="/appointments"
          className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-md text-lg font-medium hover:from-gray-900 hover:to-black transition-all duration-200"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}
