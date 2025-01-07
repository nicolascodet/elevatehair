import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elevate Hair Salon",
  description: "Book your next hair appointment at Elevate Hair Salon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}>
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                  ELEVATE
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/services" className="hover:text-gray-300 transition-colors">
                  Services
                </Link>
                <Link href="/appointments" className="hover:text-gray-300 transition-colors">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-300">123 Main Street</p>
                <p className="text-gray-300">San Francisco, CA 94105</p>
                <p className="text-gray-300">Phone: (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-300 mb-4">&copy; 2024 Elevate Hair Salon. All rights reserved.</p>
              <Link 
                href="/admin" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
