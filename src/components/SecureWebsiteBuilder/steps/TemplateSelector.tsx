import React from 'react';
import { BuilderData } from '../WebsiteBuilder';
import { Globe, Server, Code, Info } from 'lucide-react';

interface Props {
  data: BuilderData;
  updateData: (data: Partial<BuilderData>) => void;
}

export default function TemplateSelector({ data, updateData }: Props) {
  const templates = [
    {
      id: 'static',
      name: 'Static Website',
      icon: Globe,
      description: 'Secure static website template with built-in security headers and CSP configuration.',
      features: ['Pre-configured security headers', 'Content Security Policy', 'SSL/TLS ready', 'XSS protection']
    },
    {
      id: 'node',
      name: 'Node.js Application',
      icon: Server,
      description: 'Secure Node.js application template with Express.js and security middleware.',
      features: ['Helmet.js security', 'Rate limiting', 'CORS configuration', 'Input validation']
    },
    {
      id: 'wordpress',
      name: 'WordPress Site',
      icon: Code,
      description: 'Hardened WordPress template with security plugins and configurations.',
      features: ['Security plugin suite', 'Hardened wp-config.php', 'Login protection', 'File permissions']
    }
  ];

  const platforms = [
    'Apache',
    'Nginx',
    'IIS',
    'Node.js',
    'WordPress',
    'Static Hosting'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-[#0a2463] mb-2">Choose Your Template</h3>
        <p className="text-gray-600">Select a secure website template that matches your needs.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              className={`
                border-2 rounded-lg p-6 cursor-pointer transition-all
                ${data.template === template.id
                  ? 'border-[#3e92cc] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => updateData({ template: template.id })}
            >
              <Icon className="w-12 h-12 text-[#3e92cc] mb-4" />
              <h4 className="text-lg font-semibold text-[#0a2463] mb-2">{template.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              <ul className="space-y-2">
                {template.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#3e92cc] rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deployment Platform
        </label>
        <select
          value={data.platform}
          onChange={(e) => updateData({ platform: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3e92cc] focus:border-transparent"
        >
          <option value="">Select platform...</option>
          {platforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Security First</p>
            <p>
              All our templates come pre-configured with security best practices and are regularly
              updated to address new security concerns. Choose the template that best fits your
              needs, and we'll help you maintain a secure website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}