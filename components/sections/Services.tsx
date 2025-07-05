'use client';

import { Building, Wrench, Hammer, PaintBucket, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Services() {
  const services = [
    {
      icon: Building,
      title: "Civil Construction",
      description: "Complete civil construction services from foundation to finishing with modern techniques and quality materials.",
      features: ["Foundation Work", "Structural Design", "Quality Control", "Timely Delivery"]
    },
    {
      icon: Hammer,
      title: "Building Construction",
      description: "Residential and commercial building construction with architectural excellence and structural integrity.",
      features: ["Residential Buildings", "Commercial Spaces", "Modern Architecture", "Energy Efficient"]
    },
    {
      icon: Wrench,
      title: "Renovation & Remodeling",
      description: "Transform your existing spaces with our expert renovation and remodeling services.",
      features: ["Home Renovation", "Office Remodeling", "Kitchen & Bathroom", "Interior Upgrade"]
    },
    {
      icon: PaintBucket,
      title: "Interior Design",
      description: "Professional interior design services to create beautiful and functional spaces.",
      features: ["Space Planning", "Color Consultation", "Furniture Selection", "Lighting Design"]
    },
    {
      icon: Zap,
      title: "Electrical Works",
      description: "Complete electrical installation and maintenance services for residential and commercial properties.",
      features: ["Wiring Installation", "Panel Upgrades", "Safety Inspections", "Emergency Repairs"]
    },
    {
      icon: Shield,
      title: "Maintenance Services",
      description: "Regular maintenance and repair services to keep your property in perfect condition.",
      features: ["Preventive Maintenance", "Emergency Repairs", "Annual Contracts", "24/7 Support"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive construction and maintenance services with quality workmanship 
            and attention to detail in every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}