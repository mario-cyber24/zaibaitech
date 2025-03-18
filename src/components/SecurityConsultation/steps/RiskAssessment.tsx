import React from 'react';
import { ConsultationData } from '../ConsultationTool';
import { Info } from 'lucide-react';

interface Props {
  data: ConsultationData;
  updateData: (data: Partial<ConsultationData>) => void;
}

export default function RiskAssessment({ data, updateData }: Props) {
  const threats = [
    'Ransomware',
    'Phishing',
    'Data Breaches',
    'Insider Threats',
    'DDoS Attacks',
    'Supply Chain Attacks',
    'Social Engineering',
    'Zero-day Exploits'
  ];

  const concerns = [
    'Data Privacy',
    'Regulatory Compliance',
    'Business Continuity',
    'Reputation Management',
    'Customer Trust',
    'Operational Disruption',
    'Financial Loss',
    'Intellectual Property Theft'
  ];

  const priorities = [
    'Strengthen Access Controls',
    'Improve Incident Response',
    'Enhance Data Protection',
    'Update Security Policies',
    'Implement Security Training',
    'Upgrade Infrastructure Security',
    'Improve Third-party Risk Management',
    'Enhance Cloud Security'
  ];

  const budgetRanges = [
    'Less than $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $500,000',
    'More than $500,000'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Risk Assessment</h3>
        <p className="text-gray-600">Help us understand your security concerns and priorities.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Top Security Threats
          </label>
          <p className="text-sm text-gray-500 mb-2">Select up to 3 threats that concern you most</p>
          <div className="space-y-2">
            {threats.map(threat => (
              <div key={threat} className="flex items-center">
                <input
                  type="checkbox"
                  id={threat}
                  checked={data.topThreats.includes(threat)}
                  onChange={(e) => {
                    const newThreats = e.target.checked
                      ? [...data.topThreats, threat].slice(0, 3)
                      : data.topThreats.filter(t => t !== threat);
                    updateData({ topThreats: newThreats });
                  }}
                  disabled={!data.topThreats.includes(threat) && data.topThreats.length >= 3}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={threat} className="ml-2 text-gray-700">
                  {threat}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Security Concerns
          </label>
          <div className="space-y-2">
            {concerns.map(concern => (
              <div key={concern} className="flex items-center">
                <input
                  type="checkbox"
                  id={concern}
                  checked={data.securityConcerns.includes(concern)}
                  onChange={(e) => {
                    const newConcerns = e.target.checked
                      ? [...data.securityConcerns, concern]
                      : data.securityConcerns.filter(c => c !== concern);
                    updateData({ securityConcerns: newConcerns });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={concern} className="ml-2 text-gray-700">
                  {concern}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Security Priorities
          </label>
          <div className="space-y-2">
            {priorities.map(priority => (
              <div key={priority} className="flex items-center">
                <input
                  type="checkbox"
                  id={priority}
                  checked={data.priorities.includes(priority)}
                  onChange={(e) => {
                    const newPriorities = e.target.checked
                      ? [...data.priorities, priority]
                      : data.priorities.filter(p => p !== priority);
                    updateData({ priorities: newPriorities });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={priority} className="ml-2 text-gray-700">
                  {priority}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Security Budget (Annual)
          </label>
          <select
            value={data.budget}
            onChange={(e) => updateData({ budget: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
          >
            <option value="">Select budget range...</option>
            {budgetRanges.map(range => (
              <option key={range} value={range}>{range}</option>
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
              Understanding your specific security concerns and priorities helps us tailor our
              recommendations to address your most pressing needs while staying within your budget
              constraints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}