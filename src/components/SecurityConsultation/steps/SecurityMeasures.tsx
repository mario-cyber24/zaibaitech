import React from 'react';
import { ConsultationData } from '../ConsultationTool';
import { Info } from 'lucide-react';

interface Props {
  data: ConsultationData;
  updateData: (data: Partial<ConsultationData>) => void;
}

export default function SecurityMeasures({ data, updateData }: Props) {
  const securityMeasures = [
    'Firewalls',
    'Antivirus Software',
    'Encryption',
    'Multi-factor Authentication',
    'VPN',
    'Security Monitoring',
    'Backup Solutions',
    'Access Control',
    'Security Policies',
    'Patch Management'
  ];

  const teamSizes = [
    'No dedicated team',
    '1-2 security staff',
    '3-5 security staff',
    '6-10 security staff',
    '10+ security staff',
    'Outsourced security'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Current Security Measures</h3>
        <p className="text-gray-600">Tell us about your existing security controls and practices.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Existing Security Measures
          </label>
          <div className="space-y-2">
            {securityMeasures.map(measure => (
              <div key={measure} className="flex items-center">
                <input
                  type="checkbox"
                  id={measure}
                  checked={data.existingMeasures.includes(measure)}
                  onChange={(e) => {
                    const newMeasures = e.target.checked
                      ? [...data.existingMeasures, measure]
                      : data.existingMeasures.filter(m => m !== measure);
                    updateData({ existingMeasures: newMeasures });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={measure} className="ml-2 text-gray-700">
                  {measure}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Security Team Size
          </label>
          <select
            value={data.securityTeam}
            onChange={(e) => updateData({ securityTeam: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
          >
            <option value="">Select team size...</option>
            {teamSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Incident Response Plan
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.incidentResponse === true}
                onChange={() => updateData({ incidentResponse: true })}
                className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.incidentResponse === false}
                onChange={() => updateData({ incidentResponse: false })}
                className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Security Awareness Training
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.securityTraining === true}
                onChange={() => updateData({ securityTraining: true })}
                className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.securityTraining === false}
                onChange={() => updateData({ securityTraining: false })}
                className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Why we ask this</p>
            <p>
              Understanding your current security posture helps us identify gaps and recommend
              improvements that build upon your existing measures. This ensures our recommendations
              are practical and complement your security program.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}