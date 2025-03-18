import React from 'react';
import { Shield, ChevronRight, CheckCircle, ExternalLink, Lock, Code, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  const projects = [
    {
      name: "Infinite Engineering",
      type: "Security Implementation & Web Development",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
      description: "Complete digital transformation with security at its core",
      results: [
        "99.9% uptime achieved",
        "Zero security incidents post-implementation",
        "50% reduction in page load times",
        "Enhanced user authentication system"
      ],
      technologies: ["React", "Node.js", "AWS", "Security Hardening"],
      icon: <Shield className="w-8 h-8" />
    },
    {
      name: "SecureHealth Solutions",
      type: "Healthcare Security Compliance",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      description: "HIPAA-compliant healthcare platform development",
      results: [
        "Full HIPAA compliance achieved",
        "Secure patient data management",
        "Automated security monitoring",
        "Real-time threat detection"
      ],
      technologies: ["Vue.js", "Python", "Azure", "HIPAA Controls"],
      icon: <Lock className="w-8 h-8" />
    },
    {
      name: "TechStart Innovation",
      type: "Secure E-commerce Platform",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: "Building a secure foundation for online retail",
      results: [
        "PCI DSS compliance implementation",
        "Secure payment processing",
        "Advanced fraud detection",
        "Mobile-first security"
      ],
      technologies: ["Next.js", "GraphQL", "Stripe", "Security Testing"],
      icon: <Globe className="w-8 h-8" />
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Success Stories
            </h1>
            <p className="text-xl text-gray-300">
              Discover how we've helped businesses achieve their security and development goals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-[#3e92cc]" />
                  <h2 className="text-2xl font-bold text-[#0a2463]">Infinite Engineering</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    A comprehensive security and development project that transformed Infinite Engineering's digital presence while ensuring maximum protection of sensitive data.
                  </p>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#0a2463]">Key Achievements:</h3>
                    <ul className="space-y-2">
                      {projects[0].results.map((result, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3e92cc]" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0a2463] mb-2">Technologies Used:</h3>
                    <div className="flex flex-wrap gap-2">
                      {projects[0].technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-[#f8f9fa] px-3 py-1 rounded-full text-sm text-[#0a2463]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to="/tools"
                  className="inline-flex items-center text-[#3e92cc] font-semibold hover:text-[#0a2463] transition-colors"
                >
                  View Full Case Study
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="bg-[#f8f9fa] p-8 flex items-center justify-center">
                <img
                  src={projects[0].image}
                  alt="Infinite Engineering Project"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0a2463]">More Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(1).map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-[#3e92cc]">{project.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2463]">{project.name}</h3>
                      <p className="text-gray-600">{project.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#0a2463] mb-2">Key Results:</h4>
                      <ul className="space-y-2">
                        {project.results.slice(0, 2).map((result, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#3e92cc]" />
                            <span className="text-gray-600">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0a2463] mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-[#f8f9fa] px-3 py-1 rounded-full text-sm text-[#0a2463]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/tools"
                    className="inline-flex items-center mt-6 text-[#3e92cc] font-semibold hover:text-[#0a2463] transition-colors"
                  >
                    Learn More
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Be Our Next Success Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help secure your digital presence and accelerate your business growth.
          </p>
          <Link
            to="/tools"
            className="bg-[#ff8c42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors inline-flex items-center"
          >
            Start Your Project
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}