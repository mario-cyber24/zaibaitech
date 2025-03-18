import React from 'react';
import { BuilderData } from '../WebsiteBuilder';
import { Info, AlertTriangle } from 'lucide-react';

interface Props {
  data: BuilderData;
  updateData: (data: Partial<BuilderData>) => void;
}

export default function ChecklistGenerator({ data, updateData }: Props) {
  const serverTypes = [
    'Apache',
    'Nginx',
    'IIS',
    'Node.js'
  ];

  const serverFeatures = {
    Apache: [
      'mod_security',
      'mod_evasive',
      'mod_ssl',
      'mod_headers'
    ],
    Nginx: [
      'rate_limiting',
      'ssl_module',
      'headers_more',
      'security_headers'
    ],
    IIS: [
      'URL Rewrite',
      'Request Filtering',
      'IP Restrictions',
      'SSL Settings'
    ],
    'Node.js': [
      'helmet',
      'cors',
      'rate-limiter',
      'body-parser'
    ]
  };

  const handleServerTypeChange = (type: string) => {
    updateData({
      serverConfig: {
        type,
        features: []
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Security Checklist</h3>
        <p className="text-gray-600">Configure server-specific security settings.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Server Type
          </label>
          <select
            value={data.serverConfig.type}
            onChange={(e) => handleServerTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
          >
            <option value="">Select server type...</option>
            {serverTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {data.serverConfig.type && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Server Security Features
            </label>
            <div className="space-y-2">
              {serverFeatures[data.serverConfig.type as keyof typeof serverFeatures].map(feature => (
                <div key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    id={feature}
                    checked={data.serverConfig.features.includes(feature)}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...data.serverConfig.features, feature]
                        : data.serverConfig.features.filter(f => f !== feature);
                      updateData({
                        serverConfig: {
                          ...data.serverConfig,
                          features: newFeatures
                        }
                      });
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
        )}

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="text-sm text-yellow-700">
              <p className="font-medium mb-1">Important Security Notice</p>
              <p>
                The generated configuration will include recommended security settings,
                but you should review and test them in a staging environment before
                deploying to production.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Next Steps</p>
            <p>
              After generating your secure website template, you'll receive:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Complete source code with security configurations</li>
              <li>Server configuration files</li>
              <li>Security implementation checklist</li>
              <li>Documentation and best practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}