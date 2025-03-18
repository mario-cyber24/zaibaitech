import React from 'react';
import { BuilderData } from '../WebsiteBuilder';
import { Shield, Info } from 'lucide-react';

interface Props {
  data: BuilderData;
  updateData: (data: Partial<BuilderData>) => void;
}

export default function SecurityConfig({ data, updateData }: Props) {
  const securityFeatures = [
    'Content Security Policy',
    'HTTPS Enforcement',
    'XSS Protection',
    'CSRF Protection',
    'SQL Injection Prevention',
    'Rate Limiting',
    'File Upload Protection',
    'Security Headers',
    'Cookie Security',
    'Input Validation'
  ];

  const dataTypes = [
    'Personal Information',
    'Payment Data',
    'Healthcare Records',
    'Business Data',
    'User Credentials',
    'API Keys',
    'Session Data',
    'File Uploads'
  ];

  const securityLevels = [
    {
      id: 'basic',
      name: 'Basic Security',
      description: 'Essential security features for simple websites',
      suitable: 'Small business sites, blogs, portfolios'
    },
    {
      id: 'advanced',
      name: 'Advanced Security',
      description: 'Enhanced security for business applications',
      suitable: 'E-commerce, business applications, member portals'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Security',
      description: 'Maximum security for sensitive data',
      suitable: 'Healthcare, financial services, government'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Security Configuration</h3>
        <p className="text-gray-600">Configure security features for your website.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Level
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {securityLevels.map(level => (
              <div
                key={level.id}
                className={`
                  border-2 rounded-lg p-4 cursor-pointer transition-all
                  ${data.securityLevel === level.id
                    ? 'border-[#3e92cc] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => updateData({ securityLevel: level.id as BuilderData['securityLevel'] })}
              >
                <h4 className="font-semibold text-[#0a2463] mb-1">{level.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{level.description}</p>
                <p className="text-xs text-gray-500">Best for: {level.suitable}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Security Features
          </label>
          <div className="grid md:grid-cols-2 gap-2">
            {securityFeatures.map(feature => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  id={feature}
                  checked={data.features.includes(feature)}
                  onChange={(e) => {
                    const newFeatures = e.target.checked
                      ? [...data.features, feature]
                      : data.features.filter(f => f !== feature);
                    updateData({ features: newFeatures });
                  }}
                  className="h-4 w-4 text-[#3e92cc] focus:ring-[#3e92cc] border-gray-300 rounded"
                />
                <label htmlFor={feature} className="ml-2 text-gray-700">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Types to Protect
          </label>
          <div className="grid md:grid-cols-2 gap-2">
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
            <p className="font-medium mb-1">Security Configuration</p>
            <p>
              Your selections will determine the security measures implemented in your website.
              We recommend selecting all relevant features for your use case to ensure maximum
              protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}