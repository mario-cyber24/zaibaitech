import React, { useState } from 'react';
import { Shield, Code, Lock, ChevronRight, CheckCircle, ExternalLink, Globe, Clock, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [email, setEmail] = useState('');

  const tools = [
    {
      icon: <Shield className="w-12 h-12 text-[#3e92cc]" />,
      title: "Security Assessment",
      description: "Analyze your website's security posture and get detailed recommendations.",
      features: ["Vulnerability scanning", "Security score", "Detailed reports"]
    },
    {
      icon: <Lock className="w-12 h-12 text-[#3e92cc]" />,
      title: "AI Security Consultation",
      description: "Get personalized security guidance powered by advanced AI.",
      features: ["Custom recommendations", "Risk assessment", "Security roadmap"]
    },
    {
      icon: <Code className="w-12 h-12 text-[#3e92cc]" />,
      title: "Secure Website Builder",
      description: "Build secure websites with pre-configured security features.",
      features: ["Security templates", "Best practices", "Configuration tools"]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 28h-3v-3h3v3zm-9-6h3v3h-3v-3zm-9 6h3v3h-3v-3zm-9-6h3v3h-3v-3zm-9 6h3v3h-3v-3zm-9-6h3v3h-3v-3zm48 12h-3v-3h3v3zm-9-6h3v3h-3v-3zm-9 6h3v3h-3v-3zm-9-6h3v3h-3v-3zm-9 6h3v3h-3v-3zm-9-6h3v3h-3v-3z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Security Tools for the Digital Future
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Our interactive security tools help you assess, plan, and implement your security strategy without the need for expensive consultants.
            </p>
            <Link
              to="/tools"
              className="group bg-[#ff8c42] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e67e3b] transition-all duration-300 transform hover:scale-105 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              <Shield className="w-5 h-5 mr-2 transform transition-transform group-hover:rotate-12" />
              Try Our Tools
              <ChevronRight className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#212529]">Interactive Security Tools</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center group hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#0a2463]">{tool.title}</h3>
                <p className="text-gray-600 mb-6">{tool.description}</p>
                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#3e92cc] mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/tools" 
                  className="text-[#3e92cc] font-semibold hover:text-[#0a2463] transition-colors inline-flex items-center"
                >
                  Try Now
                  <ChevronRight className="ml-1 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0a2463] mb-4">Why Choose Our Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our automated security tools make enterprise-grade security accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a2463]/30 to-transparent rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                alt="Security Tools"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              {[
                {
                  text: "Automated security analysis",
                  icon: <Zap className="w-6 h-6 text-[#3e92cc]" />
                },
                {
                  text: "AI-powered recommendations",
                  icon: <Award className="w-6 h-6 text-[#3e92cc]" />
                },
                {
                  text: "Instant security insights",
                  icon: <Globe className="w-6 h-6 text-[#3e92cc]" />
                },
                {
                  text: "Regular tool updates",
                  icon: <Clock className="w-6 h-6 text-[#3e92cc]" />
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  {feature.icon}
                  <span className="text-lg text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0a2463]">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Tool",
                description: "Select from our suite of security tools based on your needs."
              },
              {
                step: "2",
                title: "Get Instant Analysis",
                description: "Receive automated security analysis and recommendations."
              },
              {
                step: "3",
                title: "Implement Solutions",
                description: "Follow our guided steps to enhance your security posture."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[#3e92cc] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#0a2463]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to enhance your security posture?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start with our free interactive tools and take control of your security today.
          </p>
          <Link 
            to="/tools"
            className="bg-[#ff8c42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors inline-flex items-center"
          >
            Try Our Tools Now
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}