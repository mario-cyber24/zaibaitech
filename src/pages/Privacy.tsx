import React from 'react';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="w-8 h-8 text-[#3e92cc]" />
            <h1 className="text-3xl font-bold text-[#0a2463]">Privacy Policy</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">1. Introduction</h2>
              <p className="text-gray-600">
                This Privacy Policy describes how ZaiBai Tech ("we," "our," or "us") collects, uses, and shares your personal information when you visit our website, use our services, or interact with us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="font-semibold text-[#0a2463]">2.1 Information You Provide</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Company information</li>
                  <li>Messages and communication content</li>
                  <li>Service preferences and requirements</li>
                </ul>

                <h3 className="font-semibold text-[#0a2463]">2.2 Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and improve our services</li>
                <li>To communicate with you about our services</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To analyze and improve our website performance</li>
                <li>To protect our legal rights and prevent misuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">4. Information Sharing</h2>
              <p className="text-gray-600">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                <li>Service providers who assist in our operations</li>
                <li>Professional advisors and auditors</li>
                <li>Law enforcement when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">5. Your Rights</h2>
              <p className="text-gray-600">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">6. Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">7. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-2 text-gray-600">
                <p>Email: privacy@zaibai.tech</p>
                <p>Address: 100 Technology Drive, Suite 200, San Francisco, CA 94105</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#0a2463] mb-4">8. Updates to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last revised" date and the updated version will be effective as soon as it is accessible.
              </p>
            </section>

            <div className="text-sm text-gray-500 mt-8">
              Last revised: March 15, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}