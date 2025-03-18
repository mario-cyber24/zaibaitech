import React from 'react';
import { Shield, Award, Users, Laptop, ChevronRight, GraduationCap, Target, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      icon: <Shield className="w-12 h-12 text-[#3e92cc]" />,
      title: "Innovation Through Technology",
      description: "We believe in making security accessible through innovative tools and automation."
    },
    {
      icon: <Users className="w-12 h-12 text-[#3e92cc]" />,
      title: "User Empowerment",
      description: "Our tools empower users to take control of their security without requiring deep expertise."
    },
    {
      icon: <Target className="w-12 h-12 text-[#3e92cc]" />,
      title: "Continuous Improvement",
      description: "We constantly enhance our tools to stay ahead of evolving security challenges."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-300">
              Making enterprise-grade security accessible through innovative tools.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#0a2463]">The ZaiBai Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2023, ZaiBai Tech emerged from a simple yet powerful vision: making enterprise-grade security accessible to everyone through innovative tools and automation.
                </p>
                <p>
                  Our team combines deep security expertise with advanced technology to create tools that empower organizations to take control of their security posture without the need for expensive consultants.
                </p>
                <p>
                  Today, we're proud to offer a suite of security tools that help businesses of all sizes assess, plan, and implement their security strategies effectively and efficiently.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <Award className="w-12 h-12 text-[#ff8c42]" />
                  <div>
                    <p className="text-2xl font-bold text-[#0a2463]">1000+</p>
                    <p className="text-gray-600">Security Scans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0a2463]">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-[#0a2463]">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Tools */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[#0a2463]">Our Tools</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <Shield className="w-8 h-8 text-[#3e92cc]" />
                    <h3 className="text-xl font-semibold text-[#0a2463]">Security Assessment Tool</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Comprehensive security scanning and analysis to identify vulnerabilities and provide actionable recommendations.
                  </p>
                  <Link to="/tools" className="text-[#3e92cc] hover:text-[#0a2463] font-semibold flex items-center">
                    Try Now <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <Laptop className="w-8 h-8 text-[#3e92cc]" />
                    <h3 className="text-xl font-semibold text-[#0a2463]">AI Security Consultation</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    AI-powered security guidance and recommendations tailored to your specific needs and environment.
                  </p>
                  <Link to="/tools" className="text-[#3e92cc] hover:text-[#0a2463] font-semibold flex items-center">
                    Try Now <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <Code className="w-8 h-8 text-[#3e92cc]" />
                    <h3 className="text-xl font-semibold text-[#0a2463]">Secure Website Builder</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Build secure websites with pre-configured security features and best practices built in.
                  </p>
                  <Link to="/tools" className="text-[#3e92cc] hover:text-[#0a2463] font-semibold flex items-center">
                    Try Now <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800"
                alt="Security tools"
                className="rounded-lg shadow-lg"
              />
              <div className="bg-[#0a2463] p-8 rounded-lg text-white">
                <h3 className="text-2xl font-bold mb-4">Innovation Through Technology</h3>
                <p className="mb-6">
                  Our mission is to democratize security through innovative tools that make enterprise-grade protection accessible to everyone.
                </p>
                <Link 
                  to="/tools"
                  className="bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors inline-flex items-center"
                >
                  Try Our Tools
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Security?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start using our security tools today and see the difference automation can make.
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