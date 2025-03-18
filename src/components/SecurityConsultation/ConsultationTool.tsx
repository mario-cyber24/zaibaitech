import React, { useState } from 'react';
import { Shield, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import OrganizationProfile from './steps/OrganizationProfile';
import TechnologyAssessment from './steps/TechnologyAssessment';
import SecurityMeasures from './steps/SecurityMeasures';
import RiskAssessment from './steps/RiskAssessment';
import ComplianceRequirements from './steps/ComplianceRequirements';
import ConsultationResults from './ConsultationResults';

export interface ConsultationData {
  // Organization Profile
  organizationSize: string;
  industry: string;
  dataTypes: string[];
  
  // Technology Assessment
  infrastructure: string[];
  applications: string[];
  remoteWork: boolean;
  cloudServices: string[];
  
  // Security Measures
  existingMeasures: string[];
  securityTeam: string;
  incidentResponse: boolean;
  securityTraining: boolean;
  
  // Risk Assessment
  topThreats: string[];
  securityConcerns: string[];
  priorities: string[];
  budget: string;
  
  // Compliance Requirements
  regulations: string[];
  certifications: string[];
  auditHistory: string;
  complianceDeadlines: string;
}

const initialData: ConsultationData = {
  organizationSize: '',
  industry: '',
  dataTypes: [],
  infrastructure: [],
  applications: [],
  remoteWork: false,
  cloudServices: [],
  existingMeasures: [],
  securityTeam: '',
  incidentResponse: false,
  securityTraining: false,
  topThreats: [],
  securityConcerns: [],
  priorities: [],
  budget: '',
  regulations: [],
  certifications: [],
  auditHistory: '',
  complianceDeadlines: ''
};

export default function ConsultationTool() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ConsultationData>(initialData);
  const [showResults, setShowResults] = useState(false);

  const steps = [
    { title: 'Organization Profile', component: OrganizationProfile },
    { title: 'Technology Assessment', component: TechnologyAssessment },
    { title: 'Security Measures', component: SecurityMeasures },
    { title: 'Risk Assessment', component: RiskAssessment },
    { title: 'Compliance Requirements', component: ComplianceRequirements }
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

  const updateData = (newData: Partial<ConsultationData>) => {
    setData({ ...data, ...newData });
  };

  if (showResults) {
    return <ConsultationResults data={data} />;
  }

  const CurrentStepComponent = steps[step].component;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2463] to-[#1e3a8a] p-8 text-white">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Shield className="w-12 h-12" />
          <h2 className="text-3xl font-bold">AI Security Consultation</h2>
        </div>
        <p className="text-center text-gray-300 max-w-2xl mx-auto">
          Get personalized security recommendations based on your organization's unique needs and challenges.
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
                {i < step ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-full h-1 mx-2 ${i < step ? 'bg-[#3e92cc]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          {steps.map((s, i) => (
            <span key={i} className="w-20 text-center">{s.title}</span>
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
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e67e3b] transition-colors flex items-center"
          >
            {step === steps.length - 1 ? 'Get Recommendations' : 'Next'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 p-4 border-t border-blue-100">
        <div className="flex items-start space-x-3 text-sm text-blue-700">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            Your responses help us generate tailored security recommendations. 
            All information is processed locally and not stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}