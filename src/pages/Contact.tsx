import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface LocationState {
  email?: string;
}

export default function Contact() {
  const location = useLocation();
  const state = location.state as LocationState;

  const [formData, setFormData] = useState({
    name: '',
    email: state?.email || '',
    company: '',
    service: 'security-assessment',
    message: ''
  });

  useEffect(() => {
    if (state?.email) {
      setFormData(prev => ({
        ...prev,
        email: state.email
      }));
    }
  }, [state?.email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get the form element
    const form = e.currentTarget;
    
    // Create FormData object
    const data = new FormData(form);
    
    // Submit the form data to Netlify
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as any).toString(),
    })
      .then(() => {
        // Clear form
        setFormData({
          name: '',
          email: '',
          company: '',
          service: 'security-assessment',
          message: ''
        });
        alert('Thank you for your message. We will get back to you soon!');
      })
      .catch((error) => {
        alert('Oops! There was a problem submitting your form. Please try again.');
        console.error(error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const locations = [
    {
      city: "San Francisco",
      address: "100 Technology Drive, Suite 200",
      state: "CA 94105",
      phone: "+1 (415) 555-0123",
      email: "sf@zaibai.tech",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM PST"
    },
    {
      city: "New York",
      address: "350 Madison Avenue, 15th Floor",
      state: "NY 10017",
      phone: "+1 (212) 555-0123",
      email: "ny@zaibai.tech",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM EST"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Secure Your Digital Future
            </h1>
            <p className="text-xl text-gray-300">
              Get in touch with our security experts to discuss your project needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[#0a2463]">Send Us a Message</h2>
              <form 
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                  >
                    <option value="security-assessment">Security Assessment</option>
                    <option value="web-development">Secure Web Development</option>
                    <option value="consultation">Security Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors inline-flex items-center"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-[#f8f9fa] p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-[#0a2463]">Our Locations</h2>
                <div className="space-y-8">
                  {locations.map((location, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#0a2463]">{location.city} Office</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-[#3e92cc] mt-1" />
                          <div>
                            <p>{location.address}</p>
                            <p>{location.state}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-[#3e92cc]" />
                          <p>{location.phone}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-[#3e92cc]" />
                          <p>{location.email}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-[#3e92cc]" />
                          <p>{location.hours}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-[#0a2463]">Request Security Assessment</h3>
                <form 
                  name="security-assessment"
                  method="POST"
                  data-netlify="true"
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="security-assessment" />
                  <div>
                    <input
                      type="text"
                      name="quick-name"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="quick-email"
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#3e92cc] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#357eaf] transition-colors"
                  >
                    Request Assessment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0a2463]">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0a2463]">What is your typical response time?</h3>
              <p className="text-gray-600">
                We aim to respond to all inquiries within 24 hours during business days. For emergency support, our team is available 24/7.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0a2463]">Do you offer remote services?</h3>
              <p className="text-gray-600">
                Yes, we provide remote security assessments and consultations. Our team can work with clients worldwide.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0a2463]">What industries do you serve?</h3>
              <p className="text-gray-600">
                We work with clients across various sectors, including healthcare, finance, technology, and e-commerce.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-[#0a2463]">How do you handle confidential information?</h3>
              <p className="text-gray-600">
                We follow strict security protocols and sign NDAs to ensure your sensitive information remains protected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}