import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, MessageCircle, Mail, Phone, Search, Users, Car, Shield } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I create a ride?",
      answer: "To create a ride, sign in to your account and click 'Create New Ride' from your dashboard. Fill in your departure and destination locations, date, time, and available seats. Your ride will be visible to other users immediately."
    },
    {
      question: "How do I join a ride?",
      answer: "Browse available rides using our search feature. When you find a suitable ride, click 'Join Ride' and send a message to the ride creator. They will review your request and either accept or decline it."
    },
    {
      question: "Are rides really free?",
      answer: "Yes! All rides on Travel-with.de are offered for free as part of our community spirit. However, travelers can voluntarily share costs like gas or train tickets among themselves."
    },
    {
      question: "How do I contact other travelers?",
      answer: "Once your join request is accepted, you'll receive contact information to coordinate with other travelers. We facilitate the initial connection, and you can arrange meeting points and details directly."
    },
    {
      question: "What if I need to cancel my ride?",
      answer: "You can cancel your ride anytime from your dashboard. Please cancel as early as possible to give other travelers time to make alternative arrangements. We encourage responsible cancellation practices."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "User safety is our priority. If you encounter inappropriate behavior, please contact our support team immediately at hello@travel-with.de or use the report feature in the app."
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "24/7"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: "Response within 24h"
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto mt-36 px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>

        {/* Quick Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Creating & Managing Rides
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Learn how to create, edit, and manage your rides
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Joining Rides
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Find and join rides that match your travel plans
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Safety & Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Stay safe while traveling with our community
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Still need help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {option.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {option.available}
                  </p>
                  <Button className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <Input type="text" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <Input type="text" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Describe your issue or question in detail..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}