import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Loader2, ExternalLink, Lock, Globe, Server, FileCode, ChevronRight, Info, Clock, ArrowRight } from 'lucide-react';
import { performSecurityCheck } from '../utils/securityChecks';
import SecurityScore from './SecurityAssessmentTool/SecurityScore';
import SecurityFindings from './SecurityAssessmentTool/SecurityFindings';
import SecurityReport from './SecurityAssessmentTool/SecurityReport';

interface AuthFormData {
  fullName: string;
  email: string;
  company: string;
  website: string;
  isAuthorized: boolean;
  acceptsTerms: boolean;
}

interface Finding {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  importance: string;
  resources: Array<{ title: string; url: string }>;
  remediation: {
    apache: string;
    nginx: string;
    iis: string;
  };
}

export default function SecurityAssessmentTool() {
  const [showAuth, setShowAuth] = useState(true);
  const [authData, setAuthData] = useState<AuthFormData>({
    fullName: '',
    email: '',
    company: '',
    website: '',
    isAuthorized: false,
    acceptsTerms: false
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [securityScore, setSecurityScore] = useState(0);
  const [previousScore, setPreviousScore] = useState<number | undefined>();
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [scanDate, setScanDate] = useState('');
  const [findings, setFindings] = useState<Finding[]>([]);

  const scanSteps = [
    'Initializing security scan...',
    'Checking HTTPS implementation...',
    'Analyzing security headers...',
    'Evaluating SSL/TLS configuration...',
    'Checking cookie security...',
    'Analyzing server configuration...',
    'Checking DNS security...',
    'Scanning for mixed content...',
    'Compiling results...'
  ];

  useEffect(() => {
    // Load previous score from localStorage
    const savedScore = localStorage.getItem('previousSecurityScore');
    if (savedScore) {
      setPreviousScore(parseInt(savedScore, 10));
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authData.isAuthorized || !authData.acceptsTerms) {
      alert('Please confirm authorization and accept the terms to proceed.');
      return;
    }
    setShowAuth(false);
  };

  const handleScan = async () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setShowLeadForm(false);
    setShowThankYou(false);
    setCurrentStep(0);

    try {
      const url = authData.website;
      const results = await performSecurityCheck(url);
      
      // Save current score as previous score for next time
      localStorage.setItem('previousSecurityScore', securityScore.toString());

      // Transform results into findings
      const newFindings: Finding[] = [
        {
          name: 'HTTPS Implementation',
          status: results.https.status,
          description: 'Checks for secure HTTPS protocol implementation and certificate validity',
          importance: 'HTTPS is crucial for protecting data in transit and maintaining user trust.',
          resources: [
            { 
              title: 'SSL Labs SSL Server Test',
              url: 'https://www.ssllabs.com/ssltest/'
            },
            {
              title: 'Let\'s Encrypt - Free SSL Certificates',
              url: 'https://letsencrypt.org/'
            }
          ],
          remediation: {
            apache: `# Enable SSL in Apache
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
</VirtualHost>`,
            nginx: `# Enable SSL in Nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
}`,
            iis: `# Enable SSL in IIS (via web.config)
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="HTTP to HTTPS">
                    <match url="(.*)" />
                    <conditions>
                        <add input="{HTTPS}" pattern="off" />
                    </conditions>
                    <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>`
          }
        },
        {
          name: 'Security Headers',
          status: results.headers.status,
          description: 'Evaluates essential security headers that protect against common web vulnerabilities',
          importance: 'Security headers provide an additional layer of protection against various attacks like XSS, clickjacking, and MIME-type confusion.',
          resources: [
            {
              title: 'OWASP Secure Headers Project',
              url: 'https://owasp.org/www-project-secure-headers/'
            },
            {
              title: 'Mozilla Observatory',
              url: 'https://observatory.mozilla.org/'
            }
          ],
          remediation: {
            apache: `# Add security headers in Apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "default-src 'self'"
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>`,
            nginx: `# Add security headers in Nginx
add_header Content-Security-Policy "default-src 'self'" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;`,
            iis: `# Add security headers in IIS (via web.config)
<configuration>
    <system.webServer>
        <httpProtocol>
            <customHeaders>
                <add name="Content-Security-Policy" value="default-src 'self'" />
                <add name="X-Content-Type-Options" value="nosniff" />
                <add name="X-Frame-Options" value="SAMEORIGIN" />
                <add name="X-XSS-Protection" value="1; mode=block" />
                <add name="Strict-Transport-Security" value="max-age=31536000; includeSubDomains" />
            </customHeaders>
        </httpProtocol>
    </system.webServer>
</configuration>`
          }
        },
        {
          name: 'Cookie Security',
          status: results.cookies.status,
          description: 'Analyzes cookie security attributes and configuration',
          importance: 'Secure cookies prevent session hijacking and protect sensitive user data.',
          resources: [
            {
              title: 'OWASP Session Management Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html'
            }
          ],
          remediation: {
            apache: `# Set secure cookie flags in Apache
Header edit Set-Cookie ^(.*)$ $1;HttpOnly;Secure;SameSite=Strict`,
            nginx: `# Set secure cookie flags in Nginx
proxy_cookie_path / "/; HttpOnly; Secure; SameSite=Strict";`,
            iis: `# Set secure cookie flags in IIS (via web.config)
<configuration>
    <system.web>
        <httpCookies requireSSL="true" httpOnlyCookies="true" />
    </system.web>
</configuration>`
          }
        }
      ];

      setFindings(newFindings);
      setScanDate(new Date().toLocaleString());
      setSecurityScore(calculateScore(newFindings));
      
      const stepInterval = setInterval(() => {
        setCurrentStep(step => {
          if (step >= scanSteps.length - 1) {
            clearInterval(stepInterval);
            setIsAnalyzing(false);
            setShowResults(true);
            return step;
          }
          return step + 1;
        });
      }, 500);

    } catch (error) {
      console.error('Security check failed:', error);
      setIsAnalyzing(false);
      alert('Failed to perform security check. Please try again.');
    }
  };

  const calculateScore = (findings: Finding[]): number => {
    const weights = { pass: 1, warning: 0.5, fail: 0 };
    const totalWeight = findings.length;
    const score = findings.reduce((acc, finding) => {
      return acc + weights[finding.status];
    }, 0);
    return Math.round((score / totalWeight) * 100);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('form-name', 'security-assessment');
    formData.append('name', authData.fullName);
    formData.append('email', authData.email);
    formData.append('company', authData.company);
    formData.append('website', authData.website);
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });
      
      setShowLeadForm(false);
      setShowThankYou(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  if (showAuth) {
    return (
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-8 text-white">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Shield className="w-12 h-12" />
            <h2 className="text-3xl font-bold">Website Security Scanner</h2>
          </div>
          <p className="text-center text-gray-300 max-w-2xl mx-auto">
            Our advanced security scanner performs comprehensive checks on your website's security configuration and provides detailed recommendations.
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleAuthSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
              <h3 className="text-yellow-800 font-semibold mb-2 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Important Notice
              </h3>
              <p className="text-yellow-700 text-sm">
                Security testing without proper authorization may violate laws and regulations. 
                Please ensure you have ownership or explicit permission to test the website.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={authData.fullName}
                  onChange={(e) => setAuthData({...authData, fullName: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={authData.email}
                  onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  value={authData.company}
                  onChange={(e) => setAuthData({...authData, company: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL *
                </label>
                <input
                  type="url"
                  id="website"
                  value={authData.website}
                  onChange={(e) => setAuthData({...authData, website: e.target.value})}
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
                    id="authorized"
                    checked={authData.isAuthorized}
                    onChange={(e) => setAuthData({...authData, isAuthorized: e.target.checked})}
                    className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                  />
                </div>
                <label htmlFor="authorized" className="ml-3 text-sm text-gray-700">
                  I confirm that I am authorized to perform security testing on this website and have the necessary permissions.
                </label>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={authData.acceptsTerms}
                    onChange={(e) => setAuthData({...authData, acceptsTerms: e.target.checked})}
                    className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                  />
                </div>
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  I accept the terms of service and understand that ZaiBai Technology is not liable for any issues arising from the security assessment. I also consent to being contacted about security services.
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Analysis takes approximately 45 seconds
              </div>
              <button
                type="submit"
                className="bg-[#ff8c42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors flex items-center"
              >
                Proceed to Scan
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-8 text-white">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Shield className="w-12 h-12" />
          <h2 className="text-3xl font-bold">Advanced Security Scanner</h2>
        </div>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          Our comprehensive security scanner evaluates multiple aspects of your website's security posture,
          providing detailed insights and actionable recommendations.
        </p>
      </div>

      <div className="p-8">
        {/* URL Display and Scan Button */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Target Website</div>
              <div className="font-medium">{authData.website}</div>
            </div>
            <button
              onClick={handleScan}
              disabled={isAnalyzing}
              className="bg-[#ff8c42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {isAnalyzing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Analyze Now
                  <ChevronRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-[#3e92cc] animate-spin mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-4">{scanSteps[currentStep]}</p>
            <div className="max-w-md mx-auto bg-gray-100 rounded-full h-2">
              <div 
                className="bg-[#3e92cc] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / (scanSteps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div className="space-y-8">
            <SecurityScore score={securityScore} previousScore={previousScore} />
            <SecurityFindings findings={findings} />
            <SecurityReport 
              score={securityScore}
              findings={findings}
              url={authData.website}
              scanDate={scanDate}
            />

            {/* Lead Form */}
            {showLeadForm && (
              <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-[#0a2463] mb-4">
                  Get Your Detailed Security Report
                </h3>
                <p className="text-gray-600 mb-6">
                  Our comprehensive report includes:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Detailed vulnerability analysis
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Prioritized recommendations
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Technical remediation steps
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Executive summary
                  </li>
                </ul>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <button
                    type="submit"
                    className="w-full bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors flex items-center justify-center"
                  >
                    Download Full Report
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {/* Thank You Message */}
            {showThankYou && (
              <div className="max-w-md mx-auto text-center bg-green-50 p-6 rounded-lg">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-700">
                  We'll send your detailed security report shortly. Our team will also contact you to discuss your security needs and provide personalized recommendations.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-sm text-gray-500 text-center max-w-2xl mx-auto">
              <p>
                This is an initial security assessment. For a comprehensive security audit, including penetration testing 
                and advanced vulnerability scanning, please request our full assessment service.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}