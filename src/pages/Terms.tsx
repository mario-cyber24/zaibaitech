import React from 'react';
import { Shield } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="w-8 h-8 text-[#3e92cc]" />
            <h1 className="text-3xl font-bold text-[#0a2463]">Terms of Service</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600">
                By accessing or using the services provided by ZaiBai Tech ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">2. Services</h2>
              <p className="text-gray-600">
                We provide cybersecurity and web development services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                <li>Security assessments and audits</li>
                <li>Secure web development</li>
                <li>Cybersecurity consultation</li>
                <li>Ongoing security monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">3. Your Obligations</h2>
              <div className="space-y-4">
                <p className="text-gray-600">You agree to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use our services in compliance with applicable laws</li>
                  <li>Notify us of any unauthorized use or security breaches</li>
                  <li>Pay all fees and charges associated with your use of our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600">
                All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are owned by ZaiBai Tech and are protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-600">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">6. Termination</h2>
              <p className="text-gray-600">
                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">7. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">8. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">9. Contact Information</h2>
              <p className="text-gray-600">
                For any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-2 text-gray-600">
                <p>Email: legal@zaibai.tech</p>
                <p>Address: 100 Technology Drive, Suite 200, San Francisco, CA 94105</p>
              </div>
            </section>

            <div className="text-sm text-gray-500 mt-8">
              Last updated: March 15, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}