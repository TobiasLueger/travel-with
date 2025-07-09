import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Shield, AlertTriangle, Scale, Gavel } from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Accounts and Responsibilities",
      content: [
        "You must be at least 18 years old to use our service",
        "Provide accurate and complete information when creating your account",
        "Keep your account credentials secure and confidential",
        "You are responsible for all activities under your account",
        "Notify us immediately of any unauthorized use of your account"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Ride Sharing Guidelines",
      content: [
        "All rides offered on the platform are free of charge",
        "Travelers may voluntarily share costs (gas, tolls, etc.)",
        "Ride creators are responsible for their vehicle's safety and insurance",
        "All participants must follow local traffic laws and regulations",
        "Discrimination based on race, gender, religion, or other factors is prohibited"
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Prohibited Activities",
      content: [
        "Using the platform for commercial transportation services",
        "Posting false, misleading, or fraudulent ride information",
        "Harassment, threats, or inappropriate behavior toward other users",
        "Sharing contact information for purposes outside of ride coordination",
        "Attempting to circumvent safety measures or platform rules"
      ]
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Liability and Disclaimers",
      content: [
        "Travel-with.de is a platform connecting users; we don't provide transportation",
        "Users participate in ride sharing at their own risk",
        "We are not liable for accidents, injuries, or damages during rides",
        "Users should verify insurance coverage before participating",
        "The platform is provided 'as is' without warranties of any kind"
      ]
    },
    {
      icon: <Gavel className="h-6 w-6" />,
      title: "Enforcement and Termination",
      content: [
        "We reserve the right to suspend or terminate accounts for violations",
        "Users may delete their accounts at any time",
        "We may modify or discontinue the service with reasonable notice",
        "Violations may result in permanent bans from the platform",
        "Serious violations may be reported to appropriate authorities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using Travel-with.de. By using our service, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: January 8, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Travel-with.de. These Terms of Service ("Terms") govern your use of our ride-sharing platform and services. By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the service.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By creating an account or using Travel-with.de, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all users of the service, including ride creators and passengers.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                <strong>Important:</strong> These Terms constitute a legally binding agreement between you and Travel-with.de GmbH.
              </p>
            </div>
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

        {/* Safety Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Safety Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
              <p className="text-yellow-800 dark:text-yellow-400 text-sm font-medium">
                Your safety is our top priority. Please follow these guidelines:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">For Ride Creators</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Ensure your vehicle is roadworthy and insured</li>
                  <li>• Verify passenger identities before departure</li>
                  <li>• Share your route and expected arrival time</li>
                  <li>• Don't exceed your vehicle's capacity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">For Passengers</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Verify the driver's identity and vehicle details</li>
                  <li>• Share your travel plans with someone you trust</li>
                  <li>• Trust your instincts and report suspicious behavior</li>
                  <li>• Respect the driver's vehicle and rules</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The Travel-with.de platform, including its design, functionality, and content, is owned by Travel-with.de GmbH and protected by intellectual property laws. You may not:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Copy, modify, or distribute our platform or content</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Use our trademarks or branding without permission</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 dark:text-gray-300">Reverse engineer or attempt to extract source code</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Governing Law and Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These Terms are governed by German law. Any disputes arising from these Terms or your use of the service will be resolved through:
            </p>
            <ol className="space-y-2">
              <li className="flex items-start">
                <span className="font-semibold text-purple-600 mr-3">1.</span>
                <span className="text-gray-700 dark:text-gray-300">Good faith negotiations between the parties</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-purple-600 mr-3">2.</span>
                <span className="text-gray-700 dark:text-gray-300">Mediation through a recognized mediation service</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-purple-600 mr-3">3.</span>
                <span className="text-gray-700 dark:text-gray-300">German courts with jurisdiction in Berlin</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> legal@travel-with.de
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Address:</strong> Travel-with.de GmbH, Musterstraße 123, 10115 Berlin, Germany
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Phone:</strong> +49 30 12345678
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of the service after changes constitutes acceptance of the new Terms.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}