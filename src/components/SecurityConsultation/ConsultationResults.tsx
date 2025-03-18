import React, { useState } from 'react';
import { ConsultationData } from './ConsultationTool';
import { Shield, AlertTriangle, CheckCircle, Download, ArrowRight, ExternalLink } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Props {
  data: ConsultationData;
}

interface Recommendation {
  title: string;
  description: string;
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
  difficulty: 'Easy' | 'Moderate' | 'Complex';
  steps: string[];
  resources: Array<{ title: string; url: string }>;
}

export default function ConsultationResults({ data }: Props) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  // Calculate security maturity score
  const calculateScore = () => {
    let score = 0;
    const maxScore = 100;

    // Basic security measures
    score += data.existingMeasures.length * 5; // Up to 50 points
    
    // Security team
    if (data.securityTeam.includes('10+')) score += 10;
    else if (data.securityTeam.includes('6-10')) score += 8;
    else if (data.securityTeam.includes('3-5')) score += 6;
    else if (data.securityTeam.includes('1-2')) score += 4;
    
    // Incident response and training
    if (data.incidentResponse) score += 10;
    if (data.securityTraining) score += 10;
    
    // Compliance and audits
    score += data.regulations.length * 2;
    if (data.auditHistory.includes('last year')) score += 10;
    
    return Math.min(Math.round(score), maxScore);
  };

  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Check for basic security measures
    if (!data.existingMeasures.includes('Multi-factor Authentication')) {
      recommendations.push({
        title: 'Implement Multi-Factor Authentication',
        description: 'Strengthen access security by requiring multiple forms of verification.',
        importance: 'Critical',
        difficulty: 'Easy',
        steps: [
          'Identify critical systems requiring MFA',
          'Select an MFA solution provider',
          'Plan phased rollout to users',
          'Conduct user training'
        ],
        resources: [
          {
            title: 'NIST MFA Guidelines',
            url: 'https://pages.nist.gov/800-63-3/sp800-63b.html'
          }
        ]
      });
    }

    // Check for incident response
    if (!data.incidentResponse) {
      recommendations.push({
        title: 'Develop Incident Response Plan',
        description: 'Create and implement a comprehensive incident response strategy.',
        importance: 'High',
        difficulty: 'Moderate',
        steps: [
          'Form incident response team',
          'Define incident categories and responses',
          'Create communication protocols',
          'Conduct regular drills'
        ],
        resources: [
          {
            title: "SANS Incident Handler\'s Handbook",
            url: 'https://www.sans.org/white-papers/33901/'
          }
        ]
      });
    }

    // Add more recommendations based on assessment...
    return recommendations;
  };

  const recommendations = generateRecommendations();
  const score = calculateScore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit to Netlify forms
    const submitData = new FormData();
    submitData.append('form-name', 'security-consultation');
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(submitData as any).toString()
      });
      
      setShowLeadForm(false);
      setShowThankYou(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(10, 36, 99); // #0a2463
    doc.text('Security Assessment Report', pageWidth / 2, yPos, { align: 'center' });

    // Add maturity score
    yPos += 20;
    doc.setFontSize(16);
    doc.text(`Security Maturity Score: ${score}/100`, 20, yPos);

    // Add recommendations
    yPos += 20;
    doc.setFontSize(14);
    doc.text('Key Recommendations:', 20, yPos);

    recommendations.forEach(rec => {
      yPos += 15;
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(12);
      doc.text(`• ${rec.title} (${rec.importance})`, 20, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      const description = doc.splitTextToSize(rec.description, pageWidth - 40);
      description.forEach((line: string) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 30, yPos);
        yPos += 7;
      });
    });

    // Add footer
    doc.setFontSize(10);
    doc.text('Generated by ZaiBai Technology Security Consultation Tool', pageWidth / 2, 280, { align: 'center' });

    // Save the PDF
    doc.save('security-consultation-report.pdf');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-8 text-white">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Shield className="w-12 h-12" />
          <h2 className="text-3xl font-bold">Security Assessment Results</h2>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Maturity Score */}
        <div className="text-center">
          <div className="inline-block bg-gray-50 rounded-full p-8">
            <div className={`text-4xl font-bold ${
              score >= 80 ? 'text-green-500' :
              score >= 60 ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {score}
            </div>
            <div className="text-gray-600">Security Maturity Score</div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#0a2463]">Key Recommendations</h3>
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-[#0a2463]">{rec.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.importance === 'Critical' ? 'bg-red-100 text-red-800' :
                      rec.importance === 'High' ? 'bg-orange-100 text-orange-800' :
                      rec.importance === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.importance}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      rec.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {rec.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{rec.description}</p>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-[#0a2463] mb-2">Implementation Steps:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {rec.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-[#0a2463] mb-2">Resources:</h5>
                  <div className="space-y-1">
                    {rec.resources.map((resource, i) => (
                      <a
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#3e92cc] hover:text-[#0a2463]"
                      >
                        {resource.title}
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={generatePDF}
            className="flex items-center justify-center px-6 py-3 bg-[#3e92cc] text-white rounded-lg hover:bg-[#357eaf] transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Basic Report
          </button>
          <button
            onClick={() => setShowLeadForm(true)}
            className="flex items-center justify-center px-6 py-3 bg-[#ff8c42] text-white rounded-lg hover:bg-[#e67e3b] transition-colors"
          >
            Get Detailed Analysis
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Lead Form */}
        {showLeadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-xl font-semibold text-[#0a2463] mb-4">
                Get Your Detailed Security Analysis
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#ff8c42] text-white rounded-lg hover:bg-[#e67e3b] transition-colors"
                  >
                    Get Analysis
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {showThankYou && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#0a2463] mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-6">
                We'll send your detailed security analysis shortly. Our team will contact you
                to discuss your security needs and provide personalized recommendations.
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="px-6 py-2 bg-[#3e92cc] text-white rounded-lg hover:bg-[#357eaf] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}