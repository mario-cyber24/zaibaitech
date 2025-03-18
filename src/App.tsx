import React from 'react';
import { Shield, Code, Lock, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Navigation */}
      <nav className="bg-[#0a2463] text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span className="text-xl font-bold">ZaiBai Technology</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-[#ff8c42] transition-colors">Home</a>
            <a href="#" className="hover:text-[#ff8c42] transition-colors">Services</a>
            <a href="#" className="hover:text-[#ff8c42] transition-colors">About</a>
            <a href="#" className="hover:text-[#ff8c42] transition-colors">Portfolio</a>
            <a href="#" className="hover:text-[#ff8c42] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Secure Development for the Digital Future
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              We combine cutting-edge web development with enterprise-grade security to protect your digital assets and accelerate your business growth.
            </p>
            <button className="bg-[#ff8c42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors flex items-center mx-auto">
              Get Secure
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#212529]">Our Core Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-[#3e92cc]" />,
                title: "Website Security Assessment",
                description: "Comprehensive vulnerability scanning and security audits to protect your digital assets."
              },
              {
                icon: <Code className="w-12 h-12 text-[#3e92cc]" />,
                title: "Secure Website Development",
                description: "Security-first web development ensuring your applications are built with protection in mind."
              },
              {
                icon: <Lock className="w-12 h-12 text-[#3e92cc]" />,
                title: "Cybersecurity Consultation",
                description: "Expert guidance on implementing robust security measures for your business."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#0a2463]">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="#" className="text-[#3e92cc] font-semibold hover:text-[#0a2463] transition-colors inline-flex items-center">
                  Learn More
                  <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#212529]">Why Choose ZaiBai Technology</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                alt="Cybersecurity Illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              {[
                "Security-first approach in every project",
                "Certified cybersecurity experts",
                "Proven track record of successful implementations",
                "Continuous security monitoring and updates"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#3e92cc]" />
                  <span className="text-lg text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#212529]">Featured Project</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-[#0a2463]">Infinite Engineering</h3>
                <p className="text-gray-600 mb-6">
                  Implemented comprehensive security measures and modern web development solutions, resulting in a 99.9% uptime and zero security incidents.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#3e92cc]" />
                    <span>Enhanced security protocols</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#3e92cc]" />
                    <span>Improved performance metrics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#3e92cc]" />
                    <span>24/7 security monitoring</span>
                  </div>
                </div>
                <a href="#" className="inline-flex items-center mt-6 text-[#3e92cc] font-semibold hover:text-[#0a2463]">
                  View Case Study
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
              <div className="bg-[#0a2463] p-8 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                  alt="Project Screenshot"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Digital Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free security assessment and discover how we can protect your business in the digital landscape.
          </p>
          <button className="bg-[#ff8c42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors inline-flex items-center">
            Contact Us Now
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#212529] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6" />
                <span className="text-xl font-bold">ZaiBai Technology</span>
              </div>
              <p className="text-gray-400">
                Secure Development for the Digital Future
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security Assessment</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consultation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ZaiBai Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;