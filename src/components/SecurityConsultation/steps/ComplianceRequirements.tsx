import React from 'react';
import { ConsultationData } from '../ConsultationTool';
import { Info } from 'lucide-react';

interface Props {
  data: ConsultationData;
  updateData: (data: Partial<ConsultationData>) => void;
}

export default function ComplianceRequirements({ data, updateData }: Props) {
  const regulations = [
    'GDPR',
    'HIPAA',
    'PCI DSS',
    'SOX',
    'CCPA',
    'NIST',
    'ISO 27001',
    'FedRAMP'
  ];

  const certifications = [
    'ISO 27001',
    'SOC 2',
    'PCI DSS',
    'HITRUST',
    'FedRAMP',
    'CMMC',
    'CSA STAR'
  ];

  const auditHistory = [
    'Never been audited',
    'Audited within last year',
    'Audited 1-2 years ago',
    'Audited 2+ years ago',
    'Regular internal audits only'
  ];

  const deadlines = [
    'Immediate (0-3 months)',
    'Short-term (3-6 months)',
    'Medium-term (6-12 months)',
    'Long-term (12+ months)',
    'No specific deadline'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Compliance Requirements</h3>
        <p className="text-gray-600">Tell us about your regulatory compliance needs.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Applicable Regulations
          </label>
          <div className="space-y-2">
            {regulations.map(regulation => (
              <div key={regulation} className="flex items-center">
                <input
                  type="checkbox"
                  id={regulation}
                  checked={data.regulations.includes(regulation)}
                  onChange={(e) => {
                    const newRegs = e.target.checked
                      ? [...data.regulations, regulation]
                      : data.regulations.filter(r => r !== regulation);
                    updateData({ regulations: newRegs });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={regulation} className="ml-2 text-gray-700">
                  {regulation}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required Certifications
          </label>
          <div className="space-y-2">
            {certifications.map(cert => (
              <div key={cert} className="flex items-center">
                <input
                  type="checkbox"
                  id={cert}
                  checked={data.certifications.includes(cert)}
                  onChange={(e) => {
                    const newCerts = e.target.checked
                      ? [...data.certifications, cert]
                      : data.certifications.filter(c => c !== cert);
                    updateData({ certifications: newCerts });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={cert} className="ml-2 text-gray-700">
                  {cert}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Security Audit
          </label>
          <select
            value={data.auditHistory}
            onChange={(e) => updateData({ auditHistory: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
          >
            <option value="">Select audit history...</option>
            {auditHistory.map(history => (
              <option key={history} value={history}>{history}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Compliance Deadline
          </label>
          <select
            value={data.complianceDeadlines}
            onChange={(e) => updateData({ complianceDeadlines: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
          >
            <option value="">Select deadline...</option>
            {deadlines.map(deadline => (
              <option key={deadline} value={deadline}>{deadline}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Why we ask this</p>
            <p>
              Understanding your compliance requirements helps us ensure our recommendations align with
              relevant regulations and standards. This information is crucial for developing a
              compliant security program.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}