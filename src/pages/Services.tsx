import React, { useState } from 'react';
import { Shield, Code, Lock, ChevronRight, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import SecurityAssessmentTool from '../components/SecurityAssessmentTool';
import ConsultationTool from '../components/SecurityConsultation/ConsultationTool';
import WebsiteBuilder from '../components/SecureWebsiteBuilder/WebsiteBuilder';

export default function Services() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'consultation' | 'builder'>('assessment');
  const [showIntro, setShowIntro] = useState(true);

  const tools = [
    {
      id: 'assessment',
      name: 'Security Assessment',
      description: 'Analyze your website\'s security posture and get detailed recommendations.',
      icon: Shield,
      features: [
        'Comprehensive security scanning',
        'Detailed vulnerability reports',
        'Actionable recommendations',
        'Security score tracking'
      ]
    },
    {
      id: 'consultation',
      name: 'AI Security Consultation',
      description: 'Get personalized security guidance powered by advanced AI.',
      icon: Lock,
      features: [
        'Custom security strategy',
        'Risk assessment',
        'Compliance guidance',
        'Security roadmap'
      ]
    },
    {
      id: 'builder',
      name: 'Secure Website Builder',
      description: 'Build secure websites with pre-configured security features.',
      icon: Code,
      features: [
        'Security-first templates',
        'Built-in security features',
        'Configuration generator',
        'Best practices guide'
      ]
    }
  ];

  const services = [
    {
      id: "web-development",
      icon: <Code className="w-16 h-16 text-[#3e92cc]" />,
      title: "Secure Website Development",
      description: "Security-first approach to web application development",
      features: [
        "Secure coding practices",
        "Built-in security features",
        "Regular security updates",
        "Performance optimization",
        "Responsive design implementation"
      ],
      benefits: [
        "Protection against common vulnerabilities",
        "Scalable and maintainable codebase",
        "Enhanced user experience",
        "Reduced security incidents"
      ]
    },
    {
      id: "consultation",
      icon: <Lock className="w-16 h-16 text-[#3e92cc]" />,
      title: "Cybersecurity Consultation",
      description: "Expert guidance for your security needs",
      features: [
        "Security strategy development",
        "Risk assessment and management",
        "Security awareness training",
        "Incident response planning",
        "Security policy development"
      ],
      benefits: [
        "Proactive security approach",
        "Reduced security risks",
        "Improved security awareness",
        "Better incident preparedness"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Security Solutions Hub
            </h1>
            <p className="text-xl text-gray-300">
              Explore our comprehensive suite of security tools and services designed to protect your digital assets.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          {showIntro ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#0a2463] mb-4">Interactive Security Tools</h2>
                <p className="text-xl text-gray-600">
                  Get started with our powerful security tools designed to help you assess, plan, and implement your security strategy.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div key={tool.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex justify-center mb-4">
                        <Icon className="w-12 h-12 text-[#3e92cc]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#0a2463] mb-3 text-center">{tool.name}</h3>
                      <p className="text-gray-600 mb-4 text-center">{tool.description}</p>
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <CheckCircle className="w-4 h-4 text-[#3e92cc] mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          setActiveTab(tool.id as typeof activeTab);
                          setShowIntro(false);
                        }}
                        className="w-full bg-[#ff8c42] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors flex items-center justify-center"
                      >
                        Try {tool.name}
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Why Use Our Tools?</p>
                    <p>
                      Our interactive tools provide immediate value while helping you understand your security needs.
                      They're designed to complement our professional services, offering a starting point for your
                      security journey. For comprehensive security solutions, consider our full range of professional services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setShowIntro(true)}
                  className="text-[#3e92cc] font-semibold hover:text-[#0a2463] transition-colors"
                >
                  ← Back to Tools
                </button>
                <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
                  {tools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTab(tool.id as typeof activeTab)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        activeTab === tool.id
                          ? 'bg-[#3e92cc] text-white'
                          : 'text-gray-600 hover:text-[#0a2463]'
                      }`}
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === 'assessment' ? (
                <SecurityAssessmentTool />
              ) : activeTab === 'consultation' ? (
                <ConsultationTool />
              ) : (
                <WebsiteBuilder />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Professional Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0a2463] mb-4">Professional Security Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beyond our interactive tools, we offer comprehensive professional services to ensure
              your digital assets are fully protected.
            </p>
          </div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={index} id={service.id} className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      {service.icon}
                      <h3 className="text-3xl font-bold text-[#0a2463]">{service.title}</h3>
                    </div>
                    <p className="text-xl text-gray-600 mb-8">{service.description}</p>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold mb-4 text-[#0a2463]">Key Features</h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-3">
                              <CheckCircle className="w-5 h-5 text-[#3e92cc]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-[#f8f9fa] rounded-lg p-6">
                      <h4 className="text-xl font-semibold mb-4 text-[#0a2463]">Benefits</h4>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-[#3e92cc]" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <form
                        name="service-request"
                        method="POST"
                        data-netlify="true"
                        className="bg-white p-6 rounded-lg shadow-lg"
                      >
                        <input type="hidden" name="form-name" value="service-request" />
                        <input type="hidden" name="service" value={service.title} />
                        <h3 className="text-xl font-semibold mb-4 text-[#0a2463]">Request This Service</h3>
                        <div className="space-y-4">
                          <div>
                            <input
                              type="text"
                              name="name"
                              placeholder="Your Name"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              name="email"
                              placeholder="Your Email"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <textarea
                              name="message"
                              placeholder="Tell us about your needs..."
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                            ></textarea>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors flex items-center justify-center"
                          >
                            Get Started
                            <ChevronRight className="ml-2 w-5 h-5" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0a2463] mb-4">Why Choose Our Security Services?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge tools with expert services to provide comprehensive security solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-[#3e92cc]" />,
                title: "Comprehensive Protection",
                description: "From automated tools to expert consultations, we provide end-to-end security solutions."
              },
              {
                icon: <Code className="w-12 h-12 text-[#3e92cc]" />,
                title: "Security-First Development",
                description: "We build security into every aspect of your digital presence from the ground up."
              },
              {
                icon: <AlertTriangle className="w-12 h-12 text-[#3e92cc]" />,
                title: "Proactive Security",
                description: "We help you stay ahead of threats with continuous monitoring and updates."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#0a2463]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Digital Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start with our interactive tools or contact us for a comprehensive security solution.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-[#ff8c42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors inline-flex items-center justify-center"
            >
              Contact Our Experts
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <button
              onClick={() => {
                setShowIntro(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white text-[#0a2463] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Try Our Tools
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}