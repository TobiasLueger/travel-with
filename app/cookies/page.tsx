import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, Shield, BarChart, Users, Globe } from 'lucide-react';

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Essential Cookies",
      description: "Required for basic website functionality",
      examples: [
        "Authentication and login status",
        "Security tokens and CSRF protection",
        "Session management",
        "Language and region preferences"
      ],
      canDisable: false,
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Analytics Cookies",
      description: "Help us understand how users interact with our platform",
      examples: [
        "Page views and user journeys",
        "Feature usage statistics",
        "Performance monitoring",
        "Error tracking and debugging"
      ],
      canDisable: true,
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Functional Cookies",
      description: "Enhance your experience with personalized features",
      examples: [
        "Search preferences and filters",
        "Dashboard customization",
        "Notification settings",
        "Theme and display preferences"
      ],
      canDisable: true,
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Third-Party Cookies",
      description: "Set by external services we integrate with",
      examples: [
        "Authentication providers (Clerk)",
        "Payment processing (Stripe)",
        "Maps and location services",
        "Social media integrations"
      ],
      canDisable: true,
      color: "from-orange-600 to-red-600"
    }
  ];

  const cookieDetails = [
    {
      name: "__clerk_session",
      purpose: "User authentication and session management",
      duration: "Session",
      type: "Essential"
    },
    {
      name: "theme",
      purpose: "Remember your dark/light mode preference",
      duration: "1 year",
      type: "Functional"
    },
    {
      name: "_ga",
      purpose: "Google Analytics - distinguish users",
      duration: "2 years",
      type: "Analytics"
    },
    {
      name: "search_preferences",
      purpose: "Remember your search filters and preferences",
      duration: "30 days",
      type: "Functional"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn about how we use cookies and similar technologies to improve your experience on Travel-with.de.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: January 8, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What are cookies?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and helping us understand how you use our platform.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use both first-party cookies (set by Travel-with.de) and third-party cookies (set by our partners and service providers) to enhance your experience and provide our services.
            </p>
          </CardContent>
        </Card>

        {/* Cookie Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mr-3 text-white`}>
                        {type.icon}
                      </div>
                      {type.title}
                    </div>
                    {type.canDisable ? (
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded">
                        Optional
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {type.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {type.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cookie Details Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Cookie Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Cookie Name</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Purpose</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Duration</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieDetails.map((cookie, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-2">
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                          {cookie.name}
                        </code>
                      </td>
                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{cookie.purpose}</td>
                      <td className="py-3 px-2 text-gray-700 dark:text-gray-300">{cookie.duration}</td>
                      <td className="py-3 px-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          cookie.type === 'Essential' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {cookie.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Managing Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Managing Your Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Browser Settings</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">View and delete existing cookies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">Block cookies from specific sites</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">Block third-party cookies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">Clear cookies when you close your browser</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Platform Settings</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You can also manage your cookie preferences directly on our platform:
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Manage Cookie Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We integrate with several third-party services that may set their own cookies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Clerk (Authentication)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Manages user authentication and sessions
                </p>
                <a href="https://clerk.com/privacy" className="text-purple-600 hover:text-purple-700 text-sm">
                  View Clerk's Privacy Policy →
                </a>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Stripe (Payments)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Processes premium subscriptions securely
                </p>
                <a href="https://stripe.com/privacy" className="text-purple-600 hover:text-purple-700 text-sm">
                  View Stripe's Privacy Policy →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact of Disabling */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Impact of Disabling Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
              <p className="text-yellow-800 dark:text-yellow-400 text-sm">
                <strong>Please note:</strong> Disabling certain cookies may affect your experience on our platform.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Essential Cookies</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Cannot be disabled. Without these, core features like login and ride creation won't work.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics Cookies</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Disabling these won't affect functionality but prevents us from improving the platform based on usage data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Functional Cookies</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You'll lose personalized features like saved preferences and customized dashboard settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Questions About Cookies?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about our use of cookies or this policy, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> privacy@travel-with.de
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Subject:</strong> Cookie Policy Inquiry
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}