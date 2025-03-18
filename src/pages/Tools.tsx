import React, { useState } from 'react';
import { Shield, Code, Lock, ChevronRight, CheckCircle, Info } from 'lucide-react';
import SecurityAssessmentTool from '../components/SecurityAssessmentTool/SecurityAssessmentTool';
import ConsultationTool from '../components/SecurityConsultation/ConsultationTool';
import WebsiteBuilder from '../components/SecureWebsiteBuilder/WebsiteBuilder';

export default function Tools() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'consultation' | 'builder'>('assessment');
  const [showIntro, setShowIntro] = useState(true);

  const tools = [
    {
      id: 'assessment',
      name: 'Security Assessment',
      description: 'Analyze your security posture and get detailed recommendations.',
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

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#0a2463] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Interactive Security Tools
            </h1>
            <p className="text-xl text-gray-300">
              Powerful tools to assess, plan, and implement your security strategy without the need for expensive consultants.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          {showIntro ? (
            <div className="max-w-4xl mx-auto">
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
                    <p className="font-medium mb-1">About Our Tools</p>
                    <p>
                      Our interactive security tools are designed to help you take control of your security strategy.
                      Each tool provides immediate value and actionable insights, making enterprise-grade security
                      accessible to everyone. Start with any tool that matches your current needs.
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
    </>
  );
}