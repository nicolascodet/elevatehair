import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Elevate Hair Salon',
  description: 'Book your next appointment at Elevate Hair Salon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-gradient-metallic shadow-elegant">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-2xl font-semibold text-text">
                    Elevate Hair Salon
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/appointments" className="text-text-light hover:text-accent transition-colors">
                    Book Appointment
                  </a>
                  <a href="/services" className="text-text-light hover:text-accent transition-colors">
                    Services
                  </a>
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <footer className="bg-primary-dark text-text-light mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center">
                <p>© 2024 Elevate Hair Salon. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
} 