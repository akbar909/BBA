import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BBA</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Baloch Brothers Association</h3>
                <p className="text-gray-400">Construction & Civil Contractors</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              We are a leading construction company providing quality civil work, 
              construction, and maintenance services across Pakistan. With years of 
              experience, we deliver projects on time and within budget.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Civil Construction</Link></li>
              <li><Link href="#" className="hover:text-white">Building Construction</Link></li>
              <li><Link href="#" className="hover:text-white">Renovation</Link></li>
              <li><Link href="#" className="hover:text-white">Maintenance</Link></li>
              <li><Link href="#" className="hover:text-white">Interior Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>info@balochbrothers.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Baloch Brothers Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}