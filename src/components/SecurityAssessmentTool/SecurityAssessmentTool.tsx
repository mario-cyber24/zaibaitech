import React, { useState } from 'react';
import { Shield, ChevronRight, AlertTriangle, Info, Clock } from 'lucide-react';
import { performSecurityCheck } from '../../utils/securityChecks';
import SecurityScore from './SecurityScore';
import SecurityFindings from './SecurityFindings';
import SecurityReport from './SecurityReport';

interface FormData {
  url: string;
  email: string;
  isAuthorized: boolean;
  acceptsTerms: boolean;
}

export default function SecurityAssessmentTool() {
  const [step, setStep] = useState<'form' | 'scanning' | 'results'>('form');
  const [formData, setFormData] = useState<FormData>({
    url: '',
    email: '',
    isAuthorized: false,
    acceptsTerms: false
  });
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const scanSteps = [
    'Initializing security scan...',
    'Checking HTTPS implementation...',
    'Analyzing security headers...',
    'Evaluating SSL/TLS configuration...',
    'Checking cookie security...',
    'Analyzing server configuration...',
    'Compiling results...'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('scanning');
    setError(null);
    setScanProgress(0);

    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Perform security check
      const results = await performSecurityCheck(formData.url);
      
      // Complete progress and show results
      clearInterval(progressInterval);
      setScanProgress(100);
      setResults(results);
      setStep('results');
    } catch (error) {
      console.error('Security check failed:', error);
      setError('Failed to complete security scan. Please try again.');
      setStep('form');
    }
  };

  const renderForm = () => (
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website URL *
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          placeholder="https://example.com"
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
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
        />
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
            I confirm that I am authorized to perform security testing on this website.
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
            any issues arising from the security assessment.
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
            <div className="text-red-700">{error}</div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-6">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          Scan takes approximately 45 seconds
        </div>
        <button
          type="submit"
          disabled={!formData.isAuthorized || !formData.acceptsTerms}
          className={`
            px-8 py-3 rounded-lg font-semibold flex items-center
            ${!formData.isAuthorized || !formData.acceptsTerms
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#ff8c42] text-white hover:bg-[#e67e3b] transition-colors'
            }
          `}
        >
          Start Security Scan
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </form>
  );

  const renderScanning = () => (
    <div className="text-center py-12">
      <div className="mb-8">
        <div className="text-lg text-gray-600 mb-4">
          {scanSteps[Math.floor((scanProgress / 100) * (scanSteps.length - 1))]}
        </div>
        <div className="max-w-md mx-auto bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#3e92cc] h-2 rounded-full transition-all duration-300"
            style={{ width: `${scanProgress}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 inline-block">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700 text-left">
            <p className="font-medium mb-1">While we scan...</p>
            <p>
              Our scanner checks multiple security aspects including HTTPS implementation,
              security headers, cookie configuration, and server information disclosure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-8">
      <SecurityScore score={results.score} />
      <SecurityFindings findings={results.findings} />
      <SecurityReport
        score={results.score}
        findings={results.findings}
        url={formData.url}
        scanDate={new Date().toISOString()}
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-8 text-white">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Shield className="w-12 h-12" />
          <h2 className="text-3xl font-bold">Website Security Scanner</h2>
        </div>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          Our comprehensive security scanner analyzes your website's security configuration
          and provides detailed recommendations for improvement.
        </p>
      </div>

      <div className="p-8">
        {step === 'form' && renderForm()}
        {step === 'scanning' && renderScanning()}
        {step === 'results' && renderResults()}
      </div>
    </div>
  );
}