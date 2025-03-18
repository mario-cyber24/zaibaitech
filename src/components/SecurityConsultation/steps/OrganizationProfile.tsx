import React from 'react';
import { ConsultationData } from '../ConsultationTool';
import { Info } from 'lucide-react';

interface Props {
  data: ConsultationData;
  updateData: (data: Partial<ConsultationData>) => void;
}

export default function OrganizationProfile({ data, updateData }: Props) {
  const organizationSizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  const industries = [
    'Healthcare',
    'Financial Services',
    'Technology',
    'E-commerce',
    'Manufacturing',
    'Education',
    'Government',
    'Non-profit',
    'Other'
  ];

  const dataTypes = [
    'Personal Identifiable Information (PII)',
    'Payment Card Data',
    'Healthcare Records',
    'Intellectual Property',
    'Customer Data',
    'Employee Data',
    'Financial Records',
    'Government Data'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Organization Profile</h3>
        <p className="text-gray-600">Tell us about your organization to help us understand your security needs.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization Size
          </label>
          <select
            value={data.organizationSize}
            onChange={(e) => updateData({ organizationSize: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
          >
            <option value="">Select size...</option>
            {organizationSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            value={data.industry}
            onChange={(e) => updateData({ industry: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
          >
            <option value="">Select industry...</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Types of Data Handled
          </label>
          <div className="space-y-2">
            {dataTypes.map(type => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  checked={data.dataTypes.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...data.dataTypes, type]
                      : data.dataTypes.filter(t => t !== type);
                    updateData({ dataTypes: newTypes });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={type} className="ml-2 text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Why we ask this</p>
            <p>
              Your organization's size, industry, and data types help us understand your security requirements
              and regulatory obligations. This information ensures our recommendations are relevant and
              aligned with industry standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}