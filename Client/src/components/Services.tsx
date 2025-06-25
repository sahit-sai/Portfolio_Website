import { Button } from "@/components/ui/button";
import { Code, Smartphone, Settings, Bug, FileText, Globe, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Globe,
      title: "Website Development",
      description: "Complete frontend and backend web development using MERN stack, creating responsive and scalable web applications.",
      features: ["React.js Frontend", "Node.js Backend", "MongoDB Database", "Responsive Design"],
      price: "Starting from ₹5,000",
      deliveryTime: "7-14 days"
    },
    {
      icon: Smartphone,
      title: "Application Development", 
      description: "Full stack application development with modern technologies, focusing on user experience and performance.",
      features: ["Full Stack Development", "API Integration", "Database Design", "User Authentication"],
      price: "Starting from ₹15,000",
      deliveryTime: "10-21 days"
    },
    {
      icon: Settings,
      title: "CRM Software Maintenance",
      description: "Comprehensive maintenance and enhancement of Customer Relationship Management systems for optimal performance.",
      features: ["System Updates", "Performance Optimization", "Feature Enhancement", "Data Migration"],
      price: "Starting from ₹5,000",
      deliveryTime: "3-7 days"
    },
    {
      icon: Bug,
      title: "Error Fixing & Debugging",
      description: "Expert debugging services to identify and resolve technical issues in existing applications quickly and efficiently.",
      features: ["Bug Identification", "Code Review", "Performance Issues", "Quick Turnaround"],
      price: "Starting from ₹2,000",
      deliveryTime: "1-3 days"
    },
    {
      icon: FileText,
      title: "Technical Documentation",
      description: "Professional technical documentation services using LaTeX for clear, well-structured, and professional documents.",
      features: ["LaTeX Expertise", "API Documentation", "User Manuals", "Technical Reports"],
      price: "Starting from ₹600",
      deliveryTime: "3-5 days"
    },
    {
      icon: Code,
      title: "Custom Solutions",
      description: "Tailored software solutions designed to meet specific business requirements and challenges.",
      features: ["Custom Development", "Business Logic", "Third-party Integrations", "Scalable Architecture"],
      price: "Quote Based",
      deliveryTime: "Varies"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            SERVICES
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            What I Can Do For You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive web development and technical services to transform your business ideas into powerful digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                hoveredService === index ? 'scale-105 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Pricing & Timeline */}
                <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
                    <p className="font-semibold text-gray-900">{service.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Delivery</p>
                    <p className="font-semibold text-gray-900">{service.deliveryTime}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <a href="https://wa.me/919284769125" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 group-hover:shadow-lg">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </a>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Need Something Custom?</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Don't see exactly what you need? Let's discuss your unique requirements and create a tailored solution.
            </p>
            <a href="https://wa.me/919284769125" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium">
                Let's Talk
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
