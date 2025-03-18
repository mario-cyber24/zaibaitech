import React, { useState } from 'react';
import { Code, Download, Shield, Server, ChevronRight, AlertTriangle, Info } from 'lucide-react';
import TemplateSelector from './steps/TemplateSelector';
import SecurityConfig from './steps/SecurityConfig';
import ChecklistGenerator from './steps/ChecklistGenerator';
import BuilderResults from './BuilderResults';

export interface BuilderData {
  template: string;
  platform: string;
  features: string[];
  securityLevel: 'basic' | 'advanced' | 'enterprise';
  dataTypes: string[];
  serverConfig: {
    type: string;
    features: string[];
  };
}

const initialData: BuilderData = {
  template: '',
  platform: '',
  features: [],
  securityLevel: 'basic',
  dataTypes: [],
  serverConfig: {
    type: '',
    features: []
  }
};

export default function WebsiteBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BuilderData>(initialData);
  const [showResults, setShowResults] = useState(false);

  const steps = [
    { title: 'Select Template', component: TemplateSelector },
    { title: 'Security Configuration', component: SecurityConfig },
    { title: 'Generate Checklist', component: ChecklistGenerator }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const updateData = (newData: Partial<BuilderData>) => {
    setData({ ...data, ...newData });
  };

  if (showResults) {
    return <BuilderResults data={data} />;
  }

  const CurrentStepComponent = steps[step].component;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-8 text-white">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Code className="w-12 h-12" />
          <h2 className="text-3xl font-bold">Secure Website Builder</h2>
        </div>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          Build secure websites with our pre-configured templates and security best practices.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-8 pt-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${i <= step ? 'bg-[#3e92cc] text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-full h-1 mx-2 ${i < step ? 'bg-[#3e92cc]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          {steps.map((s, i) => (
            <span key={i} className="w-32 text-center">{s.title}</span>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="p-8">
        <CurrentStepComponent data={data} updateData={updateData} />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold
              ${step === 0 ? 'invisible' : 'text-gray-600 hover:text-[#0a2463]'}`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors flex items-center"
          >
            {step === steps.length - 1 ? 'Generate Website' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 p-4 border-t border-blue-100">
        <div className="flex items-start space-x-3 text-sm text-blue-700">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            Our builder generates secure website templates with built-in security features.
            For a fully customized secure website solution, consider our professional development services.
          </p>
        </div>
      </div>
    </div>
  );
}