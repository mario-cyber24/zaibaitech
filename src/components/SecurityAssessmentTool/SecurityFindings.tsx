import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Copy, Check, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface SecurityCheckResult {
  status: 'pass' | 'fail' | 'warning';
  details: string;
  importance?: string;
  recommendations?: string[];
  resources?: Array<{ title: string; url: string }>;
  remediation?: {
    apache: string;
    nginx: string;
    iis: string;
  };
}

interface SecurityFindingsProps {
  findings: Record<string, SecurityCheckResult>;
}

export default function SecurityFindings({ findings }: SecurityFindingsProps) {
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);
  const [selectedServer, setSelectedServer] = useState<'apache' | 'nginx' | 'iis'>('nginx');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'fail': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(findings).map(([key, finding]) => (
        <div key={key} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedFinding(expandedFinding === key ? null : key)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getStatusColor(finding.status)}`}>
                  {getStatusIcon(finding.status)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0a2463]">{key}</h3>
                  <p className="text-gray-600 text-sm">{finding.details}</p>
                </div>
              </div>
              {expandedFinding === key ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>

          {expandedFinding === key && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="space-y-6">
                {finding.importance && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-1">Why This Matters</h4>
                        <p className="text-blue-600">{finding.importance}</p>
                      </div>
                    </div>
                  </div>
                )}

                {finding.recommendations && finding.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#0a2463] mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {finding.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-[#3e92cc] mt-0.5" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {finding.remediation && (
                  <div>
                    <h4 className="font-semibold text-[#0a2463] mb-4">Implementation Guide</h4>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex border-b border-gray-200">
                        {(['nginx', 'apache', 'iis'] as const).map((server) => (
                          <button
                            key={server}
                            onClick={() => setSelectedServer(server)}
                            className={`flex-1 px-4 py-2 text-sm font-medium ${
                              selectedServer === server
                                ? 'bg-[#3e92cc] text-white'
                                : 'text-gray-500 hover:text-[#0a2463] hover:bg-gray-50'
                            }`}
                          >
                            {server.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <div className="p-4 relative">
                        <SyntaxHighlighter 
                          language="apache"
                          style={githubGist}
                          customStyle={{ background: 'transparent' }}
                        >
                          {finding.remediation[selectedServer]}
                        </SyntaxHighlighter>
                        <button
                          onClick={() => handleCopyCode(finding.remediation[selectedServer])}
                          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#0a2463]"
                        >
                          {copiedCode === finding.remediation[selectedServer] ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {finding.resources && finding.resources.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-[#0a2463] mb-3">Learn More</h4>
                    <div className="space-y-2">
                      {finding.resources.map((resource, index) => (
                        <a
                          key={index}
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
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}