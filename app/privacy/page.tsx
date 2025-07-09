import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Users, Database, Globe } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Information We Collect",
      content: [
        "Account information (name, email address, profile picture)",
        "Ride details (departure/destination locations, dates, times)",
        "Communication data (messages between users)",
        "Usage data (how you interact with our platform)",
        "Device information (IP address, browser type, operating system)"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "How We Use Your Information",
      content: [
        "Facilitate ride sharing and connections between users",
        "Provide customer support and respond to inquiries",
        "Improve our services and develop new features",
        "Send important updates about your account or rides",
        "Ensure platform safety and prevent fraudulent activity"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Information Sharing",
      content: [
        "We share ride details with other users to facilitate connections",
        "Contact information is shared only after ride requests are accepted",
        "We never sell your personal data to third parties",
        "Anonymous usage statistics may be shared with partners",
        "Legal authorities may access data when required by law"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Data Security",
      content: [
        "All data is encrypted in transit and at rest",
        "Regular security audits and vulnerability assessments",
        "Secure authentication using industry-standard protocols",
        "Limited access to personal data by authorized personnel only",
        "Automatic logout and session management for account security"
      ]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "International Transfers",
      content: [
        "Your data may be processed in countries outside the EU",
        "We ensure adequate protection through appropriate safeguards",
        "Data transfers comply with GDPR and other applicable regulations",
        "You can request information about specific transfer mechanisms",
        "We regularly review our international data handling practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: January 8, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Travel-with.de ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ride-sharing platform. By using our service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3 text-white">
                    {section.icon}
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Your Rights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Rights and Choices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Access & Portability</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Request a copy of your personal data and download your information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Correction</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Update or correct inaccurate personal information in your account.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Deletion</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Request deletion of your account and associated personal data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Objection</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Object to certain processing activities or withdraw consent.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this policy:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Account information: Until you delete your account</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Ride history: 2 years after completion for safety purposes</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Communication data: 1 year after the last message</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Usage analytics: Anonymized after 6 months</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> privacy@travel-with.de
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Address:</strong> Travel-with.de GmbH, Musterstraße 123, 10115 Berlin, Germany
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Data Protection Officer:</strong> dpo@travel-with.de
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}