import React from 'react';
import { ConsultationData } from '../ConsultationTool';
import { Info } from 'lucide-react';

interface Props {
  data: ConsultationData;
  updateData: (data: Partial<ConsultationData>) => void;
}

export default function TechnologyAssessment({ data, updateData }: Props) {
  const infrastructureOptions = [
    'On-premises Servers',
    'Cloud Infrastructure',
    'Hybrid Environment',
    'Data Centers',
    'Edge Computing',
    'IoT Devices'
  ];

  const applicationTypes = [
    'Web Applications',
    'Mobile Apps',
    'Desktop Applications',
    'APIs',
    'Databases',
    'Legacy Systems',
    'Custom Software',
    'Third-party Solutions'
  ];

  const cloudServices = [
    'AWS',
    'Microsoft Azure',
    'Google Cloud',
    'Oracle Cloud',
    'IBM Cloud',
    'Private Cloud',
    'SaaS Applications'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Technology Assessment</h3>
        <p className="text-gray-600">Help us understand your technical environment and infrastructure.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Infrastructure Components
          </label>
          <div className="space-y-2">
            {infrastructureOptions.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={option}
                  checked={data.infrastructure.includes(option)}
                  onChange={(e) => {
                    const newInfra = e.target.checked
                      ? [...data.infrastructure, option]
                      : data.infrastructure.filter(i => i !== option);
                    updateData({ infrastructure: newInfra });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={option} className="ml-2 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Types
          </label>
          <div className="space-y-2">
            {applicationTypes.map(type => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  checked={data.applications.includes(type)}
                  onChange={(e) => {
                    const newApps = e.target.checked
                      ? [...data.applications, type]
                      : data.applications.filter(a => a !== type);
                    updateData({ applications: newApps });
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remote Work Environment
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.remoteWork === true}
                onChange={() => updateData({ remoteWork: true })}
                className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.remoteWork === false}
                onChange={() => updateData({ remoteWork: false })}
                className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cloud Services Used
          </label>
          <div className="space-y-2">
            {cloudServices.map(service => (
              <div key={service} className="flex items-center">
                <input
                  type="checkbox"
                  id={service}
                  checked={data.cloudServices.includes(service)}
                  onChange={(e) => {
                    const newServices = e.target.checked
                      ? [...data.cloudServices, service]
                      : data.cloudServices.filter(s => s !== service);
                    updateData({ cloudServices: newServices });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={service} className="ml-2 text-gray-700">
                  {service}
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
              Understanding your technology stack helps us identify potential security gaps and recommend
              appropriate security controls for your specific environment. Different technologies require
              different security approaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}