import React, { useState } from 'react';
import { Shield, ArrowLeft, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface Props {
  onBack: () => void;
}

export default function WebsiteScanner({ onBack }: Props) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    website: '',
    isAuthorized: false,
    acceptsTerms: false
  });
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);

    // Simulate website security assessment
    setTimeout(() => {
      setResults({
        score: 85,
        findings: [
          {
            category: 'HTTPS',
            status: 'pass',
            details: 'HTTPS is properly implemented',
            recommendation: 'Continue monitoring SSL/TLS configuration'
          },
          {
            category: 'Security Headers',
            status: 'warning',
            details: 'Some security headers are missing',
            recommendation: 'Implement missing security headers: CSP, HSTS'
          },
          {
            category: 'Content Security',
            status: 'pass',
            details: 'Content security measures are in place',
            recommendation: 'Regularly review and update CSP policies'
          }
        ]
      });
      setScanning(false);
    }, 2000);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Website Security Assessment Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Website: ${formData.website}`, 20, 40);
    doc.text(`Security Score: ${results.score}/100`, 20, 50);
    doc.text('Findings:', 20, 70);
    
    let y = 80;
    results.findings.forEach((finding: any) => {
      doc.setFontSize(14);
      doc.text(`${finding.category} (${finding.status})`, 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(finding.details, 20, y);
      y += 10;
      doc.text(`Recommendation: ${finding.recommendation}`, 20, y);
      y += 20;
    });

    doc.save('website-security-report.pdf');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-[#3e92cc] hover:text-[#0a2463] font-semibold flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Scanners
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-4 mb-6">
          <Shield className="w-8 h-8 text-[#3e92cc]" />
          <h2 className="text-2xl font-bold text-[#0a2463]">Website Security Assessment</h2>
        </div>

        {!results ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="text-yellow-800 font-semibold mb-2">Important Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    Security testing without proper authorization may violate laws and regulations.
                    Please ensure you have ownership or explicit permission to test the website.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL *
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  required
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={formData.isAuthorized}
                    onChange={(e) => setFormData({ ...formData, isAuthorized: e.target.checked })}
                    className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                  />
                </div>
                <label className="ml-3 text-sm text-gray-700">
                  I confirm that I am authorized to perform security testing on this website and have
                  the necessary permissions.
                </label>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={formData.acceptsTerms}
                    onChange={(e) => setFormData({ ...formData, acceptsTerms: e.target.checked })}
                    className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                  />
                </div>
                <label className="ml-3 text-sm text-gray-700">
                  I accept the terms of service and understand that ZaiBai Tech is not liable for
                  any issues arising from the security assessment. I also consent to being contacted
                  about security services.
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center text-sm text-gray-600">
                <Info className="w-4 h-4 mr-2" />
                Analysis takes approximately 45 seconds
              </div>
              <button
                type="submit"
                disabled={scanning || !formData.isAuthorized || !formData.acceptsTerms}
                className={`
                  px-8 py-3 rounded-lg font-semibold flex items-center
                  ${scanning || !formData.isAuthorized || !formData.acceptsTerms
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#ff8c42] text-white hover:bg-[#e67e3b] transition-colors'
                  }
                `}
              >
                {scanning ? 'Scanning...' : 'Proceed to Scan'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{
                color: results.score >= 80 ? '#22c55e' : results.score >= 60 ? '#eab308' : '#ef4444'
              }}>
                {results.score}/100
              </div>
              <p className="text-gray-600">Security Score</p>
            </div>

            <div className="space-y-4">
              {results.findings.map((finding: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    {finding.status === 'fail' ? (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    ) : finding.status === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-[#0a2463]">{finding.category}</h3>
                      <p className="text-gray-600 text-sm mb-2">{finding.details}</p>
                      <p className="text-sm font-medium">Recommendation:</p>
                      <p className="text-gray-600 text-sm">{finding.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={generateReport}
              className="w-full bg-[#3e92cc] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#357eaf] transition-colors"
            >
              Download Report (PDF)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}