import React, { useState } from 'react';
import { BuilderData } from './WebsiteBuilder';
import { Shield, Download, Code, ExternalLink, Copy, Check, AlertTriangle } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { jsPDF } from 'jspdf';

interface Props {
  data: BuilderData;
}

export default function BuilderResults({ data }: Props) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const generateConfigs = () => {
    const configs: Record<string, string> = {
      'security-headers.conf': getSecurityHeaders(),
      'csp-config.conf': getCSPConfig(),
      'server-config.conf': getServerConfig()
    };
    return configs;
  };

  const getSecurityHeaders = () => {
    switch (data.serverConfig.type) {
      case 'Apache':
        return `
# Security Headers for Apache
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
        `.trim();
      
      case 'Nginx':
        return `
# Security Headers for Nginx
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
        `.trim();
      
      default:
        return '# Security headers configuration will be generated based on your server type';
    }
  };

  const getCSPConfig = () => {
    return `
# Content Security Policy Configuration
Content-Security-Policy: default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self';
    media-src 'self';
    object-src 'none';
    frame-src 'self';
    worker-src 'self';
    form-action 'self';
    base-uri 'self';
    frame-ancestors 'self'
    `.trim();
  };

  const getServerConfig = () => {
    switch (data.serverConfig.type) {
      case 'Apache':
        return `
# Apache Security Configuration
<Directory />
    Options -Indexes +FollowSymLinks
    AllowOverride None
    Require all denied
</Directory>

# Enable mod_security
<IfModule mod_security2.c>
    SecRuleEngine On
    SecRequestBodyAccess On
    SecResponseBodyAccess On
    SecResponseBodyMimeType text/plain text/html text/xml application/json
    SecDefaultAction "phase:2,deny,log,status:403"
</IfModule>

# Rate Limiting
<IfModule mod_evasive20.c>
    DOSHashTableSize 3097
    DOSPageCount 2
    DOSSiteCount 50
    DOSPageInterval 1
    DOSSiteInterval 1
    DOSBlockingPeriod 10
</IfModule>
        `.trim();
      
      case 'Nginx':
        return `
# Nginx Security Configuration
# Rate Limiting
limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
limit_req zone=one burst=10 nodelay;

# Security Settings
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    # Enable OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # Additional Security Headers
    include /etc/nginx/security-headers.conf;
}
        `.trim();
      
      default:
        return '# Server configuration will be generated based on your server type';
    }
  };

  const handleCopy = (content: string, fileName: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(10, 36, 99); // #0a2463
    doc.text('Security Implementation Checklist', pageWidth / 2, yPos, { align: 'center' });

    // Add configuration details
    yPos += 20;
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text('Template: ' + data.template, 20, yPos);
    yPos += 10;
    doc.text('Platform: ' + data.platform, 20, yPos);
    yPos += 10;
    doc.text('Security Level: ' + data.securityLevel, 20, yPos);

    // Add security features
    yPos += 20;
    doc.setFontSize(14);
    doc.setTextColor(10, 36, 99);
    doc.text('Security Features:', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    data.features.forEach(feature => {
      doc.text('• ' + feature, 30, yPos);
      yPos += 10;
    });

    // Add implementation steps
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(10, 36, 99);
    doc.text('Implementation Steps:', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    [
      'Review and customize security configurations',
      'Test in staging environment',
      'Update SSL/TLS certificates',
      'Configure security monitoring',
      'Document security procedures'
    ].forEach(step => {
      doc.text('• ' + step, 30, yPos);
      yPos += 10;
    });

    doc.save('security-implementation-checklist.pdf');
  };

  const configs = generateConfigs();

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-8 text-white">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Shield className="w-12 h-12" />
          <h2 className="text-3xl font-bold">Your Secure Website Template</h2>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Configuration Files */}
        <div>
          <h3 className="text-xl font-semibold text-[#0a2463] mb-4">Security Configurations</h3>
          <div className="space-y-6">
            {Object.entries(configs).map(([fileName, content]) => (
              <div key={fileName} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                  <span className="font-mono text-sm text-gray-600">{fileName}</span>
                  <button
                    onClick={() => handleCopy(content, fileName)}
                    className="text-gray-500 hover:text-[#0a2463] p-1"
                  >
                    {copiedFile === fileName ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="p-4">
                  <SyntaxHighlighter
                    language="apache"
                    style={githubGist}
                    customStyle={{ background: 'transparent' }}
                  >
                    {content}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Options */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={generatePDF}
            className="flex items-center justify-center px-6 py-3 bg-[#3e92cc]
              text-white rounded-lg hover:bg-[#357eaf] transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Checklist
          </button>
          <button
            onClick={() => setShowDownloadOptions(true)}
            className="flex items-center justify-center px-6 py-3 bg-[#ff8c42]
              text-white rounded-lg hover:bg-[#e67e3b] transition-colors"
          >
            <Code className="w-5 h-5 mr-2" />
            Download Template
          </button>
        </div>

        {/* Warning Notice */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="text-sm text-yellow-700">
              <p className="font-medium mb-1">Important Security Notice</p>
              <p>
                While these configurations provide a strong security foundation, we recommend:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Regular security assessments</li>
                <li>Keeping all software and dependencies updated</li>
                <li>Implementing monitoring and logging</li>
                <li>Training staff on security best practices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Services CTA */}
        <div className="bg-[#0a2463] text-white rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Need Professional Security Implementation?</h3>
          <p className="text-gray-300 mb-4">
            Our team can help you implement, customize, and maintain your secure website.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#ff8c42] text-white rounded-lg
              hover:bg-[#e67e3b] transition-colors"
          >
            Contact Our Security Experts
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}